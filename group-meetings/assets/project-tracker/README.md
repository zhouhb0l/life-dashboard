# Local paper progress tracker

Open `../../project-progress.html` in a modern browser and enter **go**, the same passcode as the group meeting pages. It runs offline without installation or a build. Access is remembered for the current tab session; **Lock** returns to the passcode screen. This is the same lightweight browser gate used by the meeting pages, not server-side authentication or encryption of the static files.

An optional stable local preview is available from the repository root:

```powershell
node tools/preview-project-tracker.cjs
```

Then open `http://127.0.0.1:4173/project-progress.html`. Keep using the same browser and URL for the same saved workspace. File URLs, localhost ports, and different browsers have separate storage. Stop the preview with Ctrl+C.

The supplied workspace contains **47 projects**: 36 main published works, eight reviewed current projects, and three earlier undated project placeholders. The published works comprise **35 journal articles and one book chapter**, with 19 first-author works (including explicitly shared first authorship) and 17 co-author works. Sources include 31 article PDFs in `workspace/My Published papers`, existing publisher metadata for the 2026 Nonlocal SBH paper, and a 45-entry Google Scholar reconciliation checked against primary publishers. Two local theses were excluded from the published-paper library.

There are **121 dated milestones**: 101 publication-history dates, 14 Recessed Contact milestones, two TaN milestones, three LMT milestones, and the graphene/h-BN submission. There are also **70 dated document/work records**, which are evidence of activity rather than completed lifecycle stages. The Scholar additions contribute two exact publication dates; the year-only article and chapter do not create fabricated day-level milestones. The earlier secondary TaN review-return note for 14 October is retained as a work record, not a confirmed milestone. Initialization, draft completion, and missing reviewer-return or response dates were not invented.

Publication evidence is in [publications-source.json](publications-source.json); the consolidated current-project data is in [current-projects.json](current-projects.json). The original four evidence manifests are [contact and TaN](current-projects-contact-tan.json), [susceptibility and LMT](current-projects-susceptibility-lmt.json), [WTe₂ and proton transfer](current-projects-wte2-proton.json), and [book and graphene/h-BN](current-projects-book-sliding.json). [Editorial updates](current-projects-editorial-updates.json) applies the later user-supplied Recessed Contact journal history, TaN portal row, and LMT APS history while retaining the original provenance. [paper-progress-library.json](paper-progress-library.json) is the complete importable tracker backup. The example workspace remains fictional and separate from your data. No meeting deck, dated deck asset, or research file outside this repository was edited.

## Current project facts

These are status confirmations **as of 30 October 2026**, not dates on which each stage began. “Accepted” does not mean “Published”.

| Project | Role | Confirmed status and date precision |
| --- | --- | --- |
| Recessed Contact | First author | Accepted 15 October; publishing and rights complete 26 October. Proofreading completion and publication remain unconfirmed. Journal: npj 2D Materials and Applications. |
| TaN thermal | Co-author | Materials Today Physics manuscript MTP-D-26-02001R2: initially submitted 24 August and accepted 29 October. Acceptance is one day before the status date; individual review/response dates remain unknown. |
| Phonon susceptibility | First author | Response submitted; exact response-submission date unknown. Awaiting National Science Review decision. |
| Universal non-Gaussian bounds (LMT) | First author | Under review at Physical Review B after transfer from PRL on 25 September: 35 days since transfer. PRL acknowledgment 10 September and editorial decision 22 September are separately recorded; exact initial upload date is unknown. |
| WTe₂ moiré phonons | Co-author | **Not submitted**; manuscript in internal revision. Initial-draft completion date unknown. Hangbo Zhou is also a corresponding author. |
| Proton transfer | Co-author | **Not submitted**; manuscript in internal revision, supported by coauthor comments. Initial-draft completion date unknown. |
| NEGF method book | Co-author | **Not submitted**; in writing. Dated manuscript/work records do not establish completion dates. |
| Interlayer sliding · graphene/h-BN | Co-author | Submitted to Chinese Physics Letters on 2 October 2026; in the journal process. |

The supplied **On your desk** view contains five active projects: the two accepted papers awaiting proofs/production, the two manuscripts in revision, and the book. Three projects are in the journal process: phonon susceptibility, LMT, and the Chinese Physics Letters submission. The other three placeholders retain unknown dates and roles.

TaN's authoritative dates come from the completed-submissions portal row supplied by the user on 30 October: initial submission 24 August, status/final disposition 29 October, “Completed - Accept”. The portal requires login in the assistant's session, so the row is attributed to the user rather than represented as independently retrieved. The R2 manuscript suffix does not date either response upload.

LMT's user-supplied APS history resolves the earlier PRL-cover-letter/PRB-board uncertainty. The 24 September author reply and files, 28 September PRB acknowledgment, and October invitations, reminders, correspondence, and messages remain work records. The 14 and 19 October messages are explicitly not referee reports. No external reviewer-return or revised-manuscript response-submission milestone is inferred from these entries.

## Recessed Contact journal history

All **23 user-supplied entries** are preserved in [current-projects-editorial-updates.json](current-projects-editorial-updates.json): 13 phase milestones and 10 documentary records. Together with the independently sourced publisher receipt on 17 July, the paper has 14 milestones. The two previously known milestones (receipt and acceptance) are retained rather than duplicated, so this update adds 12 milestones to the previous global total of 107 and 10 records to the previous total of 60.

| Author or production step | Dates in 2026 | Calendar days |
| --- | --- | --- |
| Scientific revision round 1 | Revision requested 25 August → revised manuscript received 8 September | 14 |
| Technical amendment cycle 1 | Requested and received 9 September | 0 |
| Technical amendment cycle 2 | Requested and received 10 September | 0 |
| Scientific revision round 2 | Revision requested 30 September → revised manuscript received 14 October | 14 |
| Technical amendment cycle 3 | Requested 14 October → received 15 October | 1 |
| Acceptance | 15 October, after amendment receipt and technical check | — |
| Publishing and rights | Entered 24 October → complete 26 October | 2 |

Scientific responses therefore took **28 days across two rounds**; technical amendments took **one day across three cycles**. The response-phase total includes both, while `responseCount` counts two scientific responses and `amendmentCount` counts three amendments. Same-day transitions retain the supplied sequence and contribute zero calendar days.

Reports reached the journal on 10 August and 12 September. These remain documentary records: the author's revision periods begin only when revision was requested on 25 August and 30 September. Editorial assignment, referee invitations/acceptance, and technical-check statuses also remain records. Referee acceptance of an invitation is distinct from manuscript acceptance. Publishing and rights completion on 26 October is a production milestone; it establishes neither proofreading completion nor online publication.

## Publication details and citations

The **Published works** library displays every main published work with its complete title, ordered author list, journal or book, volume, issue, pages or article number, citation year, DOI, and authorship. A publication-type badge distinguishes the book chapter. Search by title, author, journal, or DOI, and filter first-author/co-author works separately. The library is independent of the timeline's date window, so older references remain accessible.

Select a title or **Publication page** to visit its publisher in a new tab. **Details**, or selecting a published paper's name in the timeline, opens its full reference, publisher, publication date, DOI, and recorded history. **Copy citation** copies the formatted full reference; if browser clipboard access is unavailable, the citation is selected for manual copying. **Edit paper / timeline** retains access to the existing editor.

Volume, issue, pages/article number, and publisher URLs for the initial 32 papers were checked against publisher-deposited Crossref records. [publication-metadata.json](publication-metadata.json) retains those verification responses and notes, including two date discrepancies with the original PDFs. [scholar-additions-journal.json](scholar-additions-journal.json) and [scholar-additions-related.json](scholar-additions-related.json) retain the later publisher checks and selected metadata snapshots. Bibliography fields and related-publication metadata survive export/import along with the original data.

## Google Scholar reconciliation

The expandable **Google Scholar checked · 45 entries** audit records a decision for every entry in the user's [pasted profile list](scholar-profile-2026-10-30.json); [scholar-audit-2026-10-30.json](scholar-audit-2026-10-30.json) retains the structured reconciliation. The 45 rows comprise 32 matched works, four new works, two companion notices (correction and cover), and seven other entries requiring duplicate/type/metadata decisions. It adds three missing journal articles and one authored book chapter:

| Added work | Bibliographic year and timeline precision |
| --- | --- |
| The effects of point defect type, location, and density on the Schottky barrier height of Au/MoS₂ heterojunction: a first-principles study | Scientific Reports 12, 18001 (2022); first online 26 October 2022. |
| Recent progress on 2D materials-based artificial synapses | Critical Reviews in Solid State and Materials Sciences 47, 665–690 (2022); first online 7 June 2021. The citation year and timeline date remain distinct. |
| High thermal conductivity in covalently bonded bi-layer honeycomb boron arsenide | Materials Today Physics 17, 100346 (2021); year only, without an invented publication day. |
| Thermal Transport Theory | Chapter in Thermal Transport in Carbon-Based Nanomaterials, pp. 1–18 (2017); year only. Registered DOI: `10.1016/B978-0-32-346240-2.00001-7`. |

Corrections, cover pictures, preprints, and supporting information are shown under **Related publications** for the corresponding work rather than counted as additional research projects. The Scientific Reports author correction is linked to its original article; the Advanced Functional Materials cover is linked to the existing borophene research paper. The arXiv 2202.11037 association with the existing 2022 PRB localized-phonon paper remains a **tentative relationship**, since no formal publisher/arXiv link was verified. Supporting information is a companion to the InSe paper.

The audit also identifies the duplicated Chinese Physics B entry, the whole edited book as distinct from Hangbo's authored chapter, and the thesis as a separate work type outside this published library. Two incorrect entries are excluded: “rsc.li/nanoscale” points to an unrelated article whose authors do not include Hangbo Zhou, and “Auxeticity in Metals…” is a wrong-title attribution rather than a second boron-nanotube paper. These decisions preserve the supplied list without inflating the main publication count.

## Enter dates

Click a project name, a colored period, or **New paper**. Add completed milestones with dates, optional notes, and a journal for each round. The page sorts milestones by date on save; events on the same date retain their entered order. Missing historical milestones are allowed. Dates after today are not allowed because this page records completed events.

The stages cover initialization, initial draft and figures completed, self revision completed, first full draft completed, submission package ready (including the cover letter), submitted, journal acknowledgment, editorial decision received, journal transfer, reviews received/revision requested, response submitted, technical amendment requested/submitted, rejected, accepted, publishing and rights/rights complete, proofreading done, and published. Add repeated submission, revision-request, and response milestones for later rounds. After rejection, add another package and submission instead of changing the original submission date. Acknowledgment does not replace an unknown initial upload date; an editorial decision does not automatically mean external referee reports were received. Transfers are counted separately through `transferCount`, rather than added to the count of initial submissions. Technical amendments and publishing rights remain distinct from scientific revision responses and proofreading.

Use the editor's **Current status** fields when the present stage is known but its entry date is missing. `statusAsOf` records when that status was confirmed; it does not create a milestone on that date. A status snapshot can therefore report “Manuscript in revision” or “Accepted” while its stage duration remains unknown. The editor also retains read-only dated document/work records and their source notes. A dated manuscript, cover letter, internal audit, or repository snapshot is not automatically a completed draft, a journal submission, or a reviewer decision.

The separate `submissionState` field accepts `not_submitted`, `submitted`, or an empty unknown state. WTe₂, proton transfer, and the NEGF book explicitly use `not_submitted`; their cards and timeline badges say **Not submitted**, while their revision/writing tasks remain visible. Submission-state validation rejects a “not submitted” state that conflicts with recorded submission, editorial, review, acceptance, or publication evidence.

You can also expand **Paste a timeline instead** in the editor:

```text
2026-04-01 | initialized
2026-05-12 | initial draft
2026-05-28 | self revision
2026-06-05 | first draft
2026-06-12 | submission package
2026-06-15 | submitted | Round 1 | Journal A
2026-08-04 | reviews received
2026-08-25 | response submitted
2026-10-12 | reviews received | Round 2
```

Use **Preview dates**, inspect every line, then **Append milestones** and **Save paper**. Unknown labels and invalid dates are reported and must be corrected before appending. ISO event keys and common English/Chinese stage labels are supported; this is a deterministic date importer, not a freeform AI parser. You can send less structured notes in chat for help preparing the data.

## Read the timeline

The calendar runs horizontally, with sticky paper names while scrolling. Published papers sort newest first, placing the earliest paper from 2014 at the bottom. First-author and co-author filters separate workload; roles also appear on each paper and in its editable details. The summary is a compact strip and the current-focus area retains its layout.

Adaptive mode uses active papers' milestone and work-record dates, with a 180–730 day window. Projects without either use a recent two-year window and are listed in an expandable section above the chart. With only published papers selected, adaptive mode fits their publication history through 30 days after the latest publication, capped at today. Full history (currently from 2014 through today), six months, one year, two years, custom date ranges, and previous/next window controls are available. Publications outside the selected window are expandable below the chart. **View period** fits an individual paper using its actual dates, work records, and relevant current status; a short paper-specific window can be as little as 40 days.

Large labeled symbols identify four key dates: **○ Initialization**, **↑ First submission**, **★ Accepted**, and **✓ Published**. Labels include the recorded date and use separate lanes; shared-date initialization/submission or acceptance/publication symbols remain distinct. Only key dates inside the selected window appear on the calendar. “First submission” means the earliest `submitted` milestone in this recorded history, not necessarily the first-ever journal attempt. An acknowledgment, transfer, or dated cover letter does not fill an unknown initial submission date. Publisher receipt caveats remain in the marker's detailed description.

White diamonds mark the other dated milestones; hollow gray triangles mark dated documents and journal activity. These records can establish that work existed or a journal action occurred without changing the measured work phase. A status badge is a separate confirmation of the current stage. Each colored period starts at a recorded milestone and ends at the next recorded milestone, or today only when an ongoing interval is supported. A long bar means more calendar days. Hover for exact dates and duration; click to inspect or edit. An unknown stage-entry date produces `elapsedDays: null` and no invented open period. Published papers stop accumulating time. A known publication year without an exact date is shown as an uncertainty band, never a fabricated day or duration. If only partial historical milestones exist, the unknown terminal interval is not extended to today.

The supplied data has no dated initialization, initial-draft, self-revision, first-full-draft, or submission-package milestones. Earlier documents and known writing/revision statuses do not establish those completion dates, so the chart cannot yet measure those early research periods. The existing purple preparation period follows a documented editorial decision. Teal and purple prompts make the missing early dates visible without drawing a duration bar: **Research & writing · add start date** records initialization, while **Submission preparation · record date** records first full draft completion when that step has actually been reached. Submission-package and cover-letter readiness can be entered separately. These prompts appear only on current, unpublished projects; they do not assert that an unfinished step is complete.

Selecting a prompt opens the paper editor with the relevant milestone selected and its date blank. Enter the actual date, then choose **Save paper** to keep it; **Cancel** discards the new entry. No document date, status-confirmation date, or today's date is substituted automatically. Once sufficient dated milestones exist, the chart shows their measured writing/preparation periods and totals.

Publisher Received dates are explicitly identified as receipt dates, which may differ from the author's submission date. Journal-process totals can include unrecorded author revision time; response durations cannot be separated without reviewer-return dates. A dash in a paper's duration row means the period's dates are missing, not zero days.

The current-focus area includes active writing, preparation, author responses, and accepted work awaiting proofreading/production; waiting for a journal decision or for publication after proofreading is excluded unless pinned. Project notes describe the current task. Pin any project to keep it visible.

## Save, back up, and fill data from chat

Changes are saved to `localStorage` under `research-paper-progress.v1`. They stay on this browser/device and are not synchronized to a server or written back to the source files. A storage failure is shown in the header; use Export to retain in-memory changes. Export regularly, particularly before clearing browser data.

**Data & backup** imports JSON backups after validation. Merge replaces papers with matching IDs and retains other papers. Replace uses only the imported file. A copy of the previous workspace is retained before imports, loading file data, and deletions; **Restore the previous workspace** recovers it. A later recovery action replaces that single previous snapshot.

For assistant-assisted updates, send paper names and dates in chat, or supply an exported JSON. Reviewed current-project evidence can be updated in the original manifests and the later editorial-updates file, then consolidated from the repository root with:

```powershell
node tools/update-current-projects.cjs
```

[update-current-projects.cjs](../../tools/update-current-projects.cjs) rebuilds `current-projects.json`, `seed-data.js`, and `paper-progress-library.json` from the reviewed evidence, applying the editorial overrides after the original manifests. It retires the secondary TaN review-return milestone while preserving that note as documentary evidence. It does not edit research folders. The source revision should change when publishing a revised dataset to an existing browser workspace.

A new source revision automatically adds new records and fills missing metadata, including current status/evidence updates, while retaining existing manual history and notes. A previous-workspace snapshot is kept. **Data & backup → Load project file data** explicitly replaces the browser workspace with the supplied dataset and retains one previous snapshot; export your latest data first when combining source changes with your own edits.

Backup shape:

```json
{"version":1,"projects":[{"id":"paper-1","title":"Paper title","shortName":"","journal":"","focus":true,"notes":"Next task","events":[{"id":"event-1","type":"initialized","date":"2026-04-01","note":"","journal":""}]}]}
```

Projects may additionally retain authorship, full bibliography, `publicationType`, linked `relatedPublications`, `currentStatus`, `statusLabel`, `statusAsOf`, `statusNote`, `submissionState`, manuscript ID, project kind, and dated `records` with their labels, sources, and notes. These bibliography/status/evidence fields survive export/import independently of milestone history.

## Verification

```powershell
node assets/project-tracker/model.test.cjs
node --check assets/project-tracker/tracker.js
```

Tests cover lifecycle durations, repeated review/rejection rounds, acknowledgment/editorial-decision/transfer milestones, separate transfer counts, scientific revisions versus technical amendments, same-day transitions, rights completion without invented proofreading/publication, calendar dates, text parsing, backup metadata, year-only publications, adaptive historical ranges, newest-first sorting, status snapshots with unknown stage starts, accepted-versus-published classification, submission-state validation, and status/work-record backup preservation. Browser checks cover desktop/phone layouts, horizontal scrolling without whole-page overflow, author filters, custom windows, calendar navigation, paper-specific fitting, evidence markers, current statuses, publication details, and saving across reloads.
