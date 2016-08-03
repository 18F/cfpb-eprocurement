---
name: The procurement title

# status is "new", "soon", "over"[due], or "pending"
status: new

# dollars, specified as a number
obligated_amount: 80000

# requested award date in YYYY-MM-DD form
requested_award_date: 2016-08-10

# OPTIONAL: estimated award date in YYYY-MM-DD form
# estimated_award_date: 2016-08-16

# activity is a list of messages
activity:
  # each message has:
  # 1. a "message" property, which is markdown, and in which links
  #    "[Document Name]" references will be turned into links
  #    automatically.
  - message: "An email was automatically sent to you on August 4,
      2016 to confirm that your [CFPBuy Request # XXX-XXXX-XXX]
      approved on July 29, 2016. Your case has been assigned to the
      CFPB Procurement team and Catherine will be the Contracting
      Officer (CO), who will help you with your requisition."
    # 2. a "date" in YYYY-MM-DD form
    date: 2016-08-04

# tasks is a list of tasks
tasks:
  # each task has:
  # 1. "content", which is markdown.
  - message: "Review [Draft SOW] due from you by August 15, 2016."
    # 2. "due_date" in YYYY-MM-DD form
    due_date: 2016-08-15

# OPTIONAL: links is an optional list of links to include in the
# markdownified activity and task content.
links:
  # each link has:
  # 1. "name", which should match the bracketed names in activity
  #    and task messages above.
  - name: Draft SOW
    # 2. "href": an absolute URI, e.g. "/sprint4b/documents/..."
    href: "/sprint4b/documents/?title=Draft+SOW"

    # NOTE: quote the name if it contains "#"
  - name: "CFPBuy Request # XXX-XXXX-XXX"
    # and quote the URL just to be safe
    href: "/sprint4b/document/?title=CFPB+Buy+request+%23+XXX-XXXX-XXX&locked=true"
---
