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
        name: Daniel
        action: Post
      events:
        - date: 2016-04-28
          actor: Daniel
          action: draft
          revision-number: 1
        - date: 2016-05-06
          actor: Daniel
          action: post
          revision-number: 1
  - name: OCR develops IGCE
    documents:
    - name: Independent Government Cost Estimate
      target_start_date: 2016-04-25
      target_end_date: 2016-04-25
      primary-author: Daniel
      status: complete
      executor:
        name: Stacey
        action: finalize
      events:
        - date: 2016-04-25
          actor: Daniel
          action: draft
          revision-number: 1
        - date: 2016-04-25
          actor: Stacey
          action: approve
          revision-number: 1
        - date: 2016-05-15
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
    documents: Acquisition Plan
    target_start_date: 2016-04-25
    target_end_date: 2016-04-27
    primary-author: Jackie
    status: complete
    events:
      - date: 2016-04-27
        actor: Jackie
        action: draft
        revision-number: 1
  - name: OCR RFI Inputs
    target_start_date: 2016-04-26
    target_end_date: 2016-04-28
    primary-author: Daniel
    status: complete
  - name: Procurement Draft RFI
    documents: RFI form
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
  - name: OCR submits evaluation factors
    target_start_date: 2016-05-03
    target_end_date: 2016-05-05
    responsible_parties:
      - name: Daniel
      - name: Stacey
    documents: []
  - name: RFI Posted
    target_start_date: 2016-05-11
    target_end_date: 2016-05-24
    predecessors:
      - name: OCR submits evaluation factors
    responsible_parties:
      - name: Jerry
    documents: []
  - name: Requisition Received
    target_start_date: 2016-05-13
    target_end_date: 2016-05-13
    predecessors:
      - name: CFPBuy Request Submitted
    responsible_parties:
      - name: OCFO
    documents: []
  - name: IGCE Review
    target_start_date: 2016-05-16
    target_end_date: 2016-06-06
    predecessors:
      - name: Acquisition Plan Draft
    responsible_parties:
      - name: Jackie
    documents: []
  - name: Procurement Compiles Responses
    target_start_date: 2016-05-24
    target_end_date: 2016-05-24
    responsible_parties:
      - name: Vanessa
    documents: []
  - name: OCR Reviews Responses & Updates SOW
    target_start_date: 2016-05-25
    target_end_date: 2016-05-25
    predecessors:
      - name: Procurement Update & Post RFI
    responsible_parties:
      - name: Daniel
      - name: Stacey
    documents: []
  - name: Update Acquisition Plan
    target_start_date: 2016-06-01
    target_end_date: 2016-06-03
    predecessors:
      - name: IGCE Review
    responsible_parties:
      - name: Jackie
      - name: Vanessa
    documents: []
  - name: SOW Reviewed by Procurement
    target_start_date: 2016-06-01
    target_end_date: 2016-06-06
    predecessors:
      - name: IGCE Review
    responsible_parties:
      - name: Jackie
    documents: []
  - name: Evaluation Factors Submitted
    target_start_date: 2016-06-01
    target_end_date: 2016-07-15
    predecessors:
      - name: IGCE Review
    responsible_parties:
      - name: Stacey
    documents: []
  - name: Acquisition Plan Reviewed & Signed
    target_start_date: 2016-06-06
    target_end_date: 2016-06-07
    predecessors:
      - name: Update Acquisition Plan
    responsible_parties:
      - name: Vanessa
    documents: []
  - name: IGCE Revisions
    target_start_date: 2016-06-07
    target_end_date: 2016-06-20
    predecessors:
      - name: RFI Posted
    responsible_parties:
      - name: Daniel
      - name: Stacey
    documents: []
  - name: SOW finalized by Procurement
    target_start_date: 2016-06-16
    target_end_date: 2016-06-21
    predecessors:
      - name: Evaluation Factors Submitted
      - name: IGCE Review
    responsible_parties:
      - name: Jerry
      - name: Vanessa
    documents: []
  - name: Procurement submits SCC to OHC
    target_start_date: 2016-06-22
    target_end_date: 2016-06-28
    predecessors:
      - name: Procurement Compiles Responses
      - name: IGCE Revisions
    responsible_parties:
      - name: SCC
    documents: []
  - name: Procurement Drafts SSP
    target_start_date: 2016-07-18
    target_end_date: 2016-07-20
    predecessors:
      - name: IGCE Revisions
      - name: Acquisition Plan Reviewed & Signed
    responsible_parties:
      - name: Jerry
      - name: Vanessa
    documents: []
  - name: Acquisition Package Sent for Tier II Review
    target_start_date: 2016-07-21
    target_end_date: 2016-07-27
    predecessors:
      - name: SOW Reviewed by Procurement
      - name: OCR develops IGCE
      - name: IGCE Revisions
      - name: Procurement Drafts SSP
      - name: Acquisition Plan Draft
    responsible_parties:
      - name: TBD
    documents: []
  - name: Acquisition Package Sent for Legal Review
    target_start_date: 2016-07-28
    target_end_date: 2016-08-10
    predecessors:
      - name: Acquisition Package Sent for Tier II Review
    responsible_parties:
      - name: Angela
    documents: []
  - name: Solicitation Posted
    target_start_date: 2016-08-11
    target_end_date: 2016-09-08
    predecessors:
      - name: Acquisition Package Sent for Legal Review
      - name: SOW finalized by Procurement
    responsible_parties:
      - name: Jerry
    documents: []
  - name: Proposals Distributed to OCR TEP
    target_start_date: 2016-09-09
    target_end_date: 2016-09-09
    predecessors:
      - name: Procurement draft Award Docs
    responsible_parties:
      - name: Jerry
    documents: []
  - name: Procurement Price Evaluation
    target_start_date: 2016-09-09
    target_end_date: 2016-09-12
    predecessors:
      - name: Procurement draft Award Docs
    responsible_parties:
      - name: Vanessa
    documents: []
  - name: OCR TEP evaluation begins
    target_start_date: 2016-09-12
    target_end_date: 2016-09-21
    predecessors:
      - name: Proposals Due
    responsible_parties:
      - name: Daniel
    documents: []
  - name: OCR TEP evaluation ends
    target_start_date: 2016-09-21
    target_end_date: 2016-09-21
    predecessors:
      - name: Proposals Distributed to OCR TEP
    responsible_parties:
      - name: Daniel
    documents: []
  - name: Procurement reviews TEP report
    target_start_date: 2016-09-22
    target_end_date: 2016-09-28
    predecessors:
      - name: Procurement Price Evaluation
    responsible_parties:
      - name: Vanessa
    documents: []
  - name: Procurement drafts decision document
    target_start_date: 2016-09-29
    target_end_date: 2016-09-30
    predecessors:
      - name: Procurement reviews TEP report
    responsible_parties:
      - name: Vanessa
    documents: []
  - name: OCR revises TEP report, as needed
    target_start_date: 2016-09-29
    target_end_date: 2016-10-03
    predecessors:
      - name: Procurement reviews TEP report
    responsible_parties:
      - name: Daniel
      - name: Stacey
    documents: []
  - name: Procurement finalizes Award Package/TEP Report
    target_start_date: 2016-10-04
    target_end_date: 2016-10-07
    predecessors:
      - name: OCR revises TEP report, as needed
      - name: OCR TEP evaluation ends
    responsible_parties:
      - name: Vanessa
    documents: []
  - name: Procurement sends Award Package to Legal
    target_start_date: 2016-10-10
    target_end_date: 2016-10-21
    predecessors:
      - name: Procurement finalizes Award Package/TEP Report
    responsible_parties:
      - name: Angela
    documents: []
  - name: Contract Award
    target_start_date: 2016-10-24
    target_end_date: 2016-10-27
    predecessors:
      - name: Procurement sends Award Package to Legal
    responsible_parties:
      - name: Vanessa
---
