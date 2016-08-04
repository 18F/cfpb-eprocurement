---
name: Enforcement Compliance Orders - BPA Call
sprint: 4b

# status is "new", "soon", "over"[due], or "pending"
status: new

# dollars, specified as a number
obligated_value: 80000

requisition_number: FA-956-XXXX

# requested award date in YYYY-MM-DD form
requested_award_date: 2016-10-10

# OPTIONAL: estimated award date in YYYY-MM-DD form
# estimated_award_date: 2016-08-16

# activity is a list of messages
activity:
  # each message has:
  # 1. a "message" property, which is markdown, and in which links
  #    "[Document Name]" references will be turned into links
  #    automatically.
  - message: "An email was automatically sent to you on August 4, 2016 to
      confirm that your [CFPBuy Request # XXX-XXXX-XXX][CFPBuy Request]
      (**locked**) was approved on July 29, 2016. Your case has been assigned
      to the CFPB Procurement team and Catherine will be the Contracting
      Officer (CO), who will help you with your requisition."
    # 2. a "date" in YYYY-MM-DD form
    date: 2016-08-04

milestones:
  - id: 1
    name: "Pre-Acquisition Tasks and Planning"
    actors: [Myra, Merav]
    status: "complete"
  - id: 2
    name: "Acquisition Package Preparation"
    actors: [Myra, Merav]
    status: "pending"

# tasks is a list of tasks
tasks:
  # each task has:
  # 1. "content", which is markdown, and will be processed in the same
  #    way as activity messages (see above).
  - message: "[CFPBuy Request] (locked) approved by OCFO"
    due_date: 2016-08-01
    milestone_id: 1
    status: complete
  - message: "[Determine milestones and timeline]."
    due_date: 2016-08-10
    milestone_id: 1
    status: complete

# OPTIONAL: links is an optional list of links to include in the
# markdownified activity and task content.
links:
  # each link has:
  # 1. "name", which should match the bracketed names in activity
  #    and task messages above.
  - name: "CFPBuy Request"
    # 2. "href": an absolute URI, e.g. "/sprint4b/documents/..."
    href: "/sprint4b/document/?title=CFPB+Buy+Request+%23+XXX-XXXX-XXX&locked=true"
  - name: "Determine milestones and timeline"
    href: /sprint4b/determine/
---
