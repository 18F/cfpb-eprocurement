require 'date'
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

COMPLETE = "complete"
APPROVE = "approve"
APPROVED = "approved"
PENDING = "pending"

module CFPB
  module Procurement

    def update_procurement_dates(pr)

      milestones = pr[MILESTONES]
      milestones.each do |milestone|

        docs = milestone[DOCUMENTS]
        docs.each do |doc|
          events = doc[EVENTS]
          executor = doc[EXECUTOR]
          executor[APPROVED] = false
          unless events.empty?
            doc[ACTUAL_START_DATE] = events.first[DATE]
            doc[STATUS] = events.last[ACTION]

            events.each do |event|
              if event[ACTION] == executor[ACTION]
                doc[ACTUAL_END_DATE] = event[DATE]
                executor[APPROVED] = true
              end
            end

            reviewers = doc[REVIEWERS]
            unless reviewers.empty?
              reviewers.each do |reviewer|
                reviews = events
                  .select { |event| event[ACTOR] == reviewer["name"] }
                  .select { |event| event[ACTION] == APPROVE }
                reviewer[APPROVED] = reviews.size > 0
              end
            end
          end
        end

        unless docs.empty?
          milestone[ACTUAL_START_DATE] = docs.first[ACTUAL_START_DATE]
          if docs.all? { |doc| doc[ACTUAL_END_DATE] }
            last = docs.last
            if last[ACTION] == last[EXECUTOR][ACTION]
              milestone[ACTUAL_END_DATE] = last[ACTUAL_END_DATE]
            end
          end
        end
      end

      unless milestones.empty?
        pr[ACTUAL_START_DATE] = milestones.first[ACTUAL_START_DATE]
        pr[ACTUAL_END_DATE] = milestones.last[ACTUAL_END_DATE]
        pr[TARGET_START_DATE] = milestones.first[TARGET_START_DATE]
        pr[TARGET_END_DATE] = milestones.last[TARGET_END_DATE]
      end

      return pr
    end

    def get_procurement_status(pr)
      if pr[ACTUAL_END_DATE]
        return COMPLETE
      end
      last = pr[EVENTS] ? pr[EVENTS].last : nil
      return last ? last[ACTION] : PENDING
    end

  end
end

Liquid::Template.register_filter(CFPB::Procurement)
