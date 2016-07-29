---
name: OCR Investigations BPA
description:  
obligated_value: 38000.00
program_office: Enforcement
target_start_date: 2016-04-25
target_end_date: 2016-10-27
requested_award_date: 2016-10-28
responsible_parties:
  cor: Daniel
  co: Wanda
  cs: Jackie
requisition-number: EN-000-0000   
milestones:
  - name: CFPBuy Request Submitted
    documents:
    - name: CFPBuy Request
      target_start_date: 2016-04-25
      target_end_date: 2016-05-12
      url:
      primary-author: Daniel
      status: complete
      executor:
        name: OCFO
        action: finalize
      events:
        - date: 2016-04-28
          actor: Daniel
          action: draft
          revision-number: 1
        - date: 2016-05-06
          actor: OCFO
          action: finalize
          revision-number: 1
  - name: Independent Government Cost Estimate
    documents:
    - name: Independent Government Cost Estimate
      target_start_date: 2016-04-25
      target_end_date: 2016-04-25
      primary-author: Daniel
      status: complete
      executor:
        name: Stacey
        action: finalize
      reviewers:
        - name: Jackie
      events:
        - date: 2016-04-25
          actor: Daniel
          action: draft
          revision-number: 1
        - date: 2016-05-15
          actor: Jackie
          action: approve
          revision-number: 1
        - date: 2016-05-30
          actor: Stacey
          action: finalize
          revision-number: 1
  - name: OCR - SCC signatures
    documents:
    - name : Service Coding Contract Sheet
      target_start_date: 2016-04-25
      target_end_date: 2016-05-31
      primary-author: Daniel
      status: complete
      executor:
        name: Jackie
        action: finalize
      reviewers:
        - name: Stacey
        - name: Gordon
      events:
      - date: 2016-04-30
        actor: Jackie
        action: draft
        revision-number: 1
      - date: 2016-05-05
        actor: Stacey
        action: review
        revision-number: 1
      - date: 2016-05-27
        actor: Gordon
        action: approve
        revision-number: 1
      - date: 2016-06-03
        actor: Stacey
        action: submit
        revision-number: 1
  - name: Acquisition Plan Draft
    documents:
    - name : Acquisition Plan
      target_start_date: 2016-04-25
      target_end_date: 2016-04-27
      primary-author: Jackie
      status: complete
      events:
        - date: 2016-04-27
          actor: Jackie
          action: draft
          revision-number: 1
        - date: 2016-06-03
          actor: Jackie
          action: revise
          revision-number: 2
  - name: OCR RFI Inputs
    documents:
    - name: OCR RFI Inputs # FIXME
      target_start_date: 2016-04-26
      target_end_date: 2016-04-28
      primary-author: Daniel
      executor:
        name: Stacey
        action: finalize
      events:
      - date: 2016-04-27  
        actor: Stacey
        action: finalize
        revision-number: 1
  - name: Request for Information
    documents:
    - name: RFI form
      target_start_date: 2016-04-29
      target_end_date: 2016-05-04
      predecessors:
        - name: OCR - SCC signatures
        - name: OCR RFI Inputs
        - name: Acquisition Plan Draft
      primary-author: Jackie
      status: complete
      executor:
        name: Jerry
        action: finalize
      reviewers:
        - name: Stacey
      events:
        - date: 2016-05-04
          actor: Jackie
          action: draft
          revision-number: 1
        - date: 2016-05-06
          actor: Stacey
          action: return
          revision-number: 1
        - date: 2016-05-07
          actor: Jackie
          action: revise
          revision-number: 2
        - date: 2016-05-08
          actor: Stacey
          action: approve
          revision-number: 2
        - date: 2016-05-11
          actor: Jerry
          action: finalize
          revision-number: 2
        - date: 2016-05-11
          actor: Jerry
          action: post
          revision-number: 2
  - name: RFI evaluation factors
  - documents:
    - name : Evaluation Factors
      target_start_date: 2016-05-03
      target_end_date: 2016-05-05
      primary-author: Daniel
      status: complete
      executor:
        name: Stacey
        action: finalize
      events:
        - date: 2016-05-04
          actor: Daniel
          action: draft
          revision-number: 1
        - date: 2016-05-06
          actor: Stacey
          action: finalize
          revision-number: 1
        - date: 2016-07-15
          actor: Stacey
          action: submit
          revision-number: 1
  - name: Procurement Compiles Responses
    documents:
    - name: Aggregated Vendor Responses
      target_start_date: 2016-05-24
      target_end_date: 2016-05-24
      executor:
        name: Vanessa
        action: post
      events:
          - date: 2016-05-24
            actor: Vanessa
            action: post
            revision-number: 1
  - name: OCR Reviews Responses & Updates SOW
    documents:
    - name: Scope of Work
      target_start_date: 2016-05-25
      target_end_date: 2016-05-25
      predecessors:
        - name: Procurement Compiles Responses
        - name: Independent Government Cost Estimate
      primary-author: Daniel
      status: complete
      executor:
        name: Jackie
        action: finalize
      reviewers:
        - name: Stacey
      events:
          - date: 2016-05-26
            actor: Daniel
            action: draft
            revision-number: 2
          - date: 2016-05-27
            actor: Stacey
            action: approve
            revision-number: 2
          - date: 2016-06-20
            actor: Jackie
            action: finalize
            revision-number: 2
  - name: Acquisition Plan Signatures
    documents:
    - name: Acquisition Plan
      target_start_date: 2016-06-06
      target_end_date: 2016-06-07
      predecessors:
        - name: Acquisition Plan Draft
      executor:
        name: Vanessa
      events:
        - date: 2016-06-07
          actor: Vanessa
          action: finalize
          revision-number: 1
  - name: IGCE Revisions
    documents:
    - name: Independent Government Cost Estimate
      target_start_date: 2016-06-07
      target_end_date: 2016-06-20
      predecessors:
        - name: RFI Posted
      primary-author: Daniel
      status: complete
      executor:
        name: Stacey
        action: finalize
      events:
        - date: 2016-06-10
          actor: Daniel
          action: revise
          revision-number: 2
        - date: 2016-06-20
          actor: Stacey
          action: finalize
          revision-number: 2
  - name: Procurement submits SCC to OHC
    documents:
    - name: Service Coding Contract Sheet
      target_start_date: 2016-06-22
      target_end_date: 2016-06-28
      predecessors:
        - name: Procurement Compiles Responses
        - name: IGCE Revisions
        - name: OCR - SCC signatures
      status: complete
      executor:
        name: Jackie
        action: submit
      events:
          - date: 2016-07-01
            actor: Jackie
            action: submit
            revision-number: 1
  - name: Source Selection Plan
    documents:
    - name: Source Selection Plan
      target_start_date: 2016-07-18
      target_end_date: 2016-07-20
      predecessors:
        - name: IGCE Revisions
        - name: Acquisition Plan Reviewed & Signed
      primary-author: Jerry
      status: complete
      events:
          - date: 2016-07-22
            actor: Jerry
            action: draft
            revision-number: 1
  - name: Acquisition Package Tier II Review
    documents:
    - name: Acquisition Package
      target_start_date: 2016-07-21
      target_end_date: 2016-07-27
      predecessors:
        - name: SOW Reviewed by Procurement
        - name: OCR develops IGCE
        - name: IGCE Revisions
        - name: Procurement Drafts SSP
        - name: Acquisition Plan Draft
      executor:
        name: TBD
        action: approve
  - name: Acquisition Package Legal Review
    documents:
    - name: Acquisition Package
      target_start_date: 2016-07-28
      target_end_date: 2016-08-10
      predecessors:
        - name: Acquisition Package Tier II Review
      executor:
        name: Angela
        action: approve
  - name: Solicitation Posted
    target_start_date: 2016-08-11
    target_end_date: 2016-09-08
    predecessors:
      - name: Acquisition Package Legal Review
      - name: SOW finalized by Procurement
    executor:
      name: Jerry
      action: post
  - name: Evaluation and Award
    documents:
      - name: Aggregated Proposals
        predecessors:
          - name: Procurement draft Award Docs
        target_start_date: 2016-09-09
        target_end_date: 2016-09-09
        primary-author: Jerry
        executor:
          name: Jerry
          action: distribute
      - name: Procurement Price Evaluation
        target_start_date: 2016-09-09
        target_end_date: 2016-09-12
        predecessors:
          - name: Procurement draft Award Docs
        primary-author: Vanessa
        executor:
          name: Vanessa
          action: finalize
      - name: OCR TEP evaluation
        target_start_date: 2016-09-12
        target_end_date: 2016-09-28
        executor:
          name: Daniel
          action: finalize
        reviewers:
        - name: Vanessa
      - name: Decision document
        target_start_date: 2016-09-29
        target_end_date: 2016-09-30
        predecessors:
          - name: OCR TEP evaluation
        primary-author: Vanessa
      - name: Final Award Package/TEP Report
        target_start_date: 2016-10-04
        target_end_date: 2016-10-21
        predecessors:
          - name: OCR revises TEP report, as needed
          - name: OCR TEP evaluation ends
        primary-author: Vanessa
        executor:
          name: Legal (Angela)
          action: approve
      - name: Contract Award
        target_start_date: 2016-10-24
        target_end_date: 2016-10-27
        predecessors:
          - name: Decision document
        primary-author: Vanessa
---
