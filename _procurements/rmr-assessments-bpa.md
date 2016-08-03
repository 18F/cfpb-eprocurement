---
name: RMR Assessments BPA
sprint: 4b

# status is "new", "soon", "over"[due], or "pending"
status: pending

# dollars, specified as a number
obligated_value: 525000

# requested award date in YYYY-MM-DD form
requested_award_date: 2016-10-10

# OPTIONAL: estimated award date in YYYY-MM-DD form
estimated_award_date: 2016-10-10

# activity is a list of messages
activity:
  # each message has:
  # 1. a "message" property, which is markdown, and in which links
  #    "[Document Name]" references will be turned into links
  #    automatically.
  - message: "The [Acquisition Package] was submitted for Legal Review on July 26, 2016. Legal Review feedback due on or before August 8, 2016."
    # 2. a "date" in YYYY-MM-DD form
    date: 2016-08-08

# tasks is a list of tasks
tasks:
  # each task has:
  # 1. "content", which is markdown.
  - message: "Awaiting outcome of Legal Review."
    # 2. "due_date" in YYYY-MM-DD form
    due_date: 2016-08-08

# OPTIONAL: links is an optional list of links to include in the
# markdownified activity and task content.
links:
  # each link has:
  # 1. "name", which should match the bracketed names in activity
  #    and task messages above.
  - name: Acquisition Package
    # 2. "href": an absolute URI, e.g. "/sprint4b/documents/..."
    href: "/sprint4b/documents/?title=Acquisition+Package+%23+XXX-XXXX-XXX&locked=true"

    # NOTE: quote the name if it contains "#"

#  - name: "CFPBuy Request # XXX-XXXX-XXX"

    # and quote the URL just to be safe
#    href: "/sprint4b/document/?title=CFPB+Buy+request+%23+XXX-XXXX-XXX&locked=true"
---
