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

sections:
  - id: 1
    name: "Pre-Acquisition Tasks and Planning"
    actors: [Myra, Merav]
    status: "complete"
  - id: 2
    name: "Acquisition Package Preparation"
    actors: [Myra, Merav]
    status: "pending"
  - id: 3
    name: "Acquisition Package Finalization"
    actors: [Myra, Merav]
    status: "new"
    depends_on: "Acquisition Package Preparation"
  - id: 4
    name: "Internal Reviews"
    actors: [Myra, Merav]
    status: "new"
    depends_on: "Acquisition Package Finalization"
  - id: 5
    name: "Solicitation"
    actors: [Myra, Merav]
    status: "new"
    depends_on: "Internal Reviews"
  - id: 5
    name: "Evaluation & Award"
    actors: [Myra, Merav]
    status: "new"
    depends_on: "Solicitation"

milestones:
  - id: 1
    name: "Draft IGCE"
    actors: []
    status: pending
    section_id: 2
    history: [
      "Draft ICGE v.1 submitted by Myra (COR) on August 2, 2016"
    ]
  - id: 2
    name: "Draft Performance Work Statement"
    actors: []
    status: new
    section_id: 2
    history: []
  - id: 3
    name: "Draft Source Selection Plan"
    actors: []
    status: new
    section_id: 2
    history: []
  - id: 4
    name: "Draft Service Contract Coding Worksheet"
    actors: []
    status: new
    section_id: 2
    history: []
  - id: 5
    name: CFPBuy Request
    actors: []
    status: complete
    section_id: 1
    history: [
      "CFPBuy Request # xxx-xxxx-xxx approved by OCFO on July 29, 2016.",
      "CFPBuy Request submitted by Myra (COR) on July 15, 2016."
    ]

# tasks is a list of tasks
tasks:
  # each task has:
  # 1. "content", which is markdown, and will be processed in the same
  #    way as activity messages (see above).
  - message: "[CFPBuy Request] (locked) approved by OCFO"
    due_date: 2016-08-03
    milestone_id: 5
    status: complete
  - message: "[Determine milestones and timeline]"
    due_date: 2016-08-01
    milestone_id: 5
    status: complete
  - message: "[Draft ICGE v.1] submitted by Myra (COR)"
    due_date: 2016-08-02
    milestone_id: 1
    status: complete
    upcoming_message: "[Draft IGCE v.1] awaiting review by Catherine (CO)"
    upcoming_due_date: 2016-08-10
    upcoming_status: pending
  - message: "[Draft Performance Work Statement] due from Myra (COR)"
    due_date: 2016-08-06
    milestone_id: 2
    status: new
  - message: "[Draft Source Selection Plan] due from Myra (COR)"
    due_date: 2016-08-29
    milestone_id: 3
    status: new
  - message: "[Draft Service Contract Coding Worksheet] due from Myra (COR)"
    due_date: 2016-08-29
    milestone_id: 4
    status: new

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
  - name: "Draft ICGE v.1"
    href: "/sprint4b/document?title=Draft+ICGE+Timeline&version=1"
  - name: "Draft Performance Work Statement"
    href: /sprint4b/document?title=Draft+Performance+Work+Statement
  - name: "Draft Source Selection Plan"
    href: /sprint4b/document?title=Draft+Source+Selection+Plan
  - name: "Draft Service Contract Coding Worksheet"
    href: /sprint4b/document?title=Draft+Service+Contract+Coding+Worksheet
---
