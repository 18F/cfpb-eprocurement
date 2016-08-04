---
name: EEO Investigators
sprint: 4b

# status is "new", "soon", "over"[due], or "pending"
status: soon

# dollars, specified as a number
obligated_value: 100000

# requested award date in YYYY-MM-DD form
requested_award_date: 2016-08-10

# OPTIONAL: estimated award date in YYYY-MM-DD form
estimated_award_date: 2016-08-20

# activity is a list of messages
activity:
  # each message has:
  # 1. a "message" property, which is markdown, and in which links
  #    "[Document Name]" references will be turned into links
  #    automatically.
  - message: "Final IGCE approved on June 5, 2016 by Merav (CO)."
    # 2. a "date" in YYYY-MM-DD form
    date: 2016-06-05

# tasks is a list of tasks
tasks:
  # each task has:
  # 1. "content", which is markdown, and will be processed in the same
  #    way as activity messages (see above).
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
    href: "/sprint4b/document/?title=Draft+SOW"
---
