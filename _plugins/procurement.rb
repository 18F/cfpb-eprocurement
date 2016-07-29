require 'date'
require 'set'
require 'liquid'

NOW = DateTime.now.to_date

DATE = "date"
EVENTS = "events"
DOCUMENT = "document"
DOCUMENTS = "documents"
MILESTONE = "milestone"
MILESTONES = "milestones"
URL = "url"
EXECUTOR = "executor"
REVIEWERS = "reviewers"

REQUESTED_AWARD_DATE = "requested_award_date"
DUE_IN_DAYS = "due_in_days"

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
    def past_tensify(action)
      case action
      when 'finalize'
        'finalized'
      when 'submit'
        'submitted'
      when 'return'
        'returned'
      when 'post'
        'posted'
      when 'draft'
        'drafted'
      else
        action
      end
    end

    def number_to_currency(number)
      return "N/A" unless number

      amount = format("%.2f", number)
      while amount.sub!(/(\d+)(\d\d\d)/,'\1,\2'); end

      "$#{amount}"
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
      data
    end

    def prepare_procurement(pr)
      pr = prepare_for_jsonify(pr)

      actors = Set.new

      all_events = []

      milestones = pr[MILESTONES] || []
      milestones.each do |milestone|

        milestone_actors = Set.new

        docs = milestone[DOCUMENTS] || []
        docs.each do |doc|
          events = doc[EVENTS]
          executor = doc[EXECUTOR]
          if not doc[URL]
            doc[URL] = "document/?title=#{doc[NAME]}&procurement=#{pr[NAME]}"
          end

          # XXX always lowercase actions
          if executor[ACTION]
            executor[ACTION] = executor[ACTION].downcase
          end

          executor[APPROVED] = false
          unless !events or events.empty?
            doc[ACTUAL_START_DATE] = events.first[DATE]
            doc[STATUS] = events.last[ACTION]

            if doc[TARGET_END_DATE]
              doc[DUE_IN_DAYS] = (doc[TARGET_END_DATE] - NOW).to_i
            end

            events.each do |event|
              if event[ACTION] == executor[ACTION]
                doc[ACTUAL_END_DATE] = event[DATE]
                doc[STATUS] = COMPLETE
                executor[APPROVED] = true
                milestone_actors.add(executor[NAME])
              end
              event[URL] = doc[URL]
              event[DOCUMENT] = doc[NAME]
              event[MILESTONE] = milestone[NAME]
              all_events.push(event)
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
      pr[EVENTS] = all_events.sort { |a, b| a[DATE] - b[DATE] }

      pr[STATUS] = PENDING
      if pr[REQUESTED_AWARD_DATE]
        pr[DUE_IN_DAYS] = (pr[REQUESTED_AWARD_DATE] - NOW).to_i
      end

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
          incomplete = incomplete
            .select { |milestone| milestone[ACTUAL_START_DATE] }
            .sort { |a, b| a[ACTUAL_START_DATE] - b[ACTUAL_START_DATE] }
          if incomplete.empty?
            pr[STATUS] = PENDING
          else
            pr[STATUS] = incomplete.first[STATUS] || PENDING
          end
        end
      end

      return pr
    end

    def pluralize(num, plural="s", singular="")
      num == 1 ? singular : plural
    end

    def title_case_word(word)
      word[0].upcase + word[1..word.size]
    end

  end
end

Liquid::Template.register_filter(CFPB::Procurement)
