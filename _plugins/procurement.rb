require 'date'
require 'set'
require 'liquid'

NOW = DateTime.now

DATE = "date"
EVENTS = "events"
MILESTONES = "milestones"
DOCUMENTS = "documents"
EXECUTOR = "executor"
REVIEWERS = "reviewers"

TARGET_START_DATE = "target_start_date"
ACTUAL_START_DATE = "actual_start_date"
TARGET_END_DATE = "target_end_date"
ACTUAL_END_DATE = "actual_end_date"

STATUS = "status"
ACTION = "action"
ACTOR = "actor"
ACTORS = "actors"
NAME = "name"

COMPLETE = "complete"
APPROVE = "approve"
APPROVED = "approved"
PENDING = "pending"

def get_sorted(list, key, type=Date)
  return list
    .map { |d| d[key] }
    .select { |d| d.is_a? type }
    .sort
end

module CFPB
  module Procurement

    def number_to_currency(number)
      return "N/A" unless number

      amount = format("%.2f", number)
      while amount.sub!(/(\d+)(\d\d\d)/,'\1,\2'); end

      amount
    end

    def prepare_for_jsonify(data)
      # always coerce the data to a Hash
      # (Jekyll 3.3 apparently needs this)
      data = data.to_h

      # XXX if these are set, then they will cause stack overflows
      # when you try to jsonify the object
      data["next"] = nil
      data["previous"] = nil
      data["content"] = nil
      data["output"] = nil
      return data
    end

    def prepare_procurement(pr)
      pr = prepare_for_jsonify(pr)

      actors = Set.new

      milestones = pr[MILESTONES] || []
      milestones.each do |milestone|

        milestone_actors = Set.new

        docs = milestone[DOCUMENTS] || []
        docs.each do |doc|
          events = doc[EVENTS]
          executor = doc[EXECUTOR]
          executor[APPROVED] = false
          unless !events or events.empty?
            doc[ACTUAL_START_DATE] = events.first[DATE]
            doc[STATUS] = events.last[ACTION]

            events.each do |event|
              if event[ACTION] == executor[ACTION]
                doc[ACTUAL_END_DATE] = event[DATE]
                executor[APPROVED] = true
                milestone_actors.add(executor[NAME])
              end
            end

            reviewers = doc[REVIEWERS]
            unless !reviewers or reviewers.empty?
              reviewers.each do |reviewer|
                reviews = events
                  .select { |event| event[ACTOR] == reviewer[NAME] }
                if reviews.size > 0
                  milestone_actors.add(reviewer[NAME])
                end
                reviewers = reviewers
                  .select { |event| event[ACTION] == APPROVE }
                reviewer[APPROVED] = reviews.size > 0
              end
            end
          end

          milestone[ACTORS] = milestone_actors.to_a
          actors = actors + milestone_actors
        end

        # the milestone's actors
        milestone[ACTORS] = actors.to_a

        milestone[STATUS] = PENDING
        # FIXME if milestone has dependencies, mark as pending completion of
        # those milestones
        unless docs.empty?
          milestone[ACTUAL_START_DATE] = get_sorted(docs, ACTUAL_START_DATE).first
          milestone[TARGET_START_DATE] = get_sorted(docs, TARGET_START_DATE).first
          milestone[TARGET_END_DATE] = get_sorted(docs, TARGET_END_DATE).last

          working_docs = docs.select { |doc| !doc[ACTUAL_END_DATE] }
          if working_docs.empty?
            docs_by_end_date = docs
              .select { |doc| doc[ACTUAL_END_DATE] }
              .sort { |a, b| a[ACTUAL_END_DATE] - b[ACTUAL_END_DATE] }
            last = docs_by_end_date.last
            if last[ACTION] == last[EXECUTOR][ACTION]
              milestone[ACTUAL_END_DATE] = last[ACTUAL_END_DATE]
            end
            # FIXME: does this go into the if statement above?
            milestone[STATUS] = APPROVED
          else
            milestone[STATUS] = working_docs.first[STATUS]
          end
        end
      end

      pr[ACTORS] = actors.to_a

      pr[STATUS] = PENDING
      unless milestones.empty?
        # the procurement's actual start date is that of the earliest
        # started milestone
        pr[ACTUAL_START_DATE] = get_sorted(milestones, ACTUAL_START_DATE).first
        # the procurement's actual end date is that of the last
        # complete milestone
        pr[ACTUAL_END_DATE] = get_sorted(milestones, ACTUAL_END_DATE).last
        # the procurement's target start date is the earliest
        # of its milestones' target start dates
        pr[TARGET_START_DATE] = get_sorted(milestones, TARGET_START_DATE).first
        # the procurement's target end date is the latest
        # of its milestones' target end dates (may be nil)
        pr[TARGET_END_DATE] = get_sorted(milestones, TARGET_END_DATE).last

        # get a list of the incomplete milestones
        incomplete = milestones
          .select { |milestone| !milestone[ACTUAL_END_DATE] }

        if incomplete.empty?
          # if there are no incomplete milestones,
          # the procurement is complete!
          pr[STATUS] = COMPLETE
        else
          # otherwise, the procurement's status is that of
          # the *first* incomplete milestone
          pr[STATUS] = get_sorted(incomplete, ACTUAL_START_DATE).first
        end
      end

      return pr
    end

  end
end

Liquid::Template.register_filter(CFPB::Procurement)
