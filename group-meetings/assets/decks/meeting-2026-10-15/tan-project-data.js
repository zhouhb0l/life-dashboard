window.TAN_PROJECT_20261015 = {
  "id": "tan-manuscript",
  "name": "TaN thermal",
  "shortName": "TaN",
  "status": "Second review",
  "phase": "Second-round review",
  "progress": 100,
  "summary": "TaN manuscript is in second-round review; two conceptual comments remain from Reviewer 1.",
  "sourceLabel": "Latest verified source",
  "sourceValue": "Audited manuscript · 30 Sep 2026",
  "notes": "Source: 14. TaN/manuscript/audited_20260930/revised_manuscript. The audited 30 September package is the synchronized verified manuscript, supplement and response set.",
  "scienceSlides": [
    {
      "kicker": "TaN · Central claims",
      "title": "Vacancies change the carrier balance in θ-TaN",
      "metrics": [
        {
          "label": "Pristine TaN",
          "value": "Phonons dominate",
          "note": "Near room temperature"
        },
        {
          "label": "Periodic N vacancies",
          "value": "Electrons dominate",
          "note": "In the selected vacancy structures"
        },
        {
          "label": "Effect of vacancies",
          "value": "Higher Gₑ, lower Gₚₕ",
          "note": "Relative to pristine TaN"
        }
      ],
      "layout": "tan-claims",
      "caption": "Independent coherent electron and phonon transport · corrected manuscript results",
      "notes": "Source: 14. TaN/manuscript/audited_20260930/revised_manuscript. The audited 30 September package is the synchronized verified manuscript, supplement and response set. Three central claims only. The scope is selected periodic vacancy structures near room temperature. Along z at 300 K, the electron fraction is 24.9% for pristine and 74.3–93.2% for vacancy structures."
    },
    {
      "kicker": "Main manuscript · Figure 1",
      "title": "The old electronic calculation was wrong",
      "lead": "Hartree energies were treated as eV. The corrected integration changes the carrier balance.",
      "points": [
        "Old result: electrons dominate pristine TaN and vacancies lower electronic conductance.",
        "Corrected result: pristine TaN is phonon dominated; vacancies raise electronic conductance."
      ],
      "figures": [
        {
          "src": "assets/decks/meeting-2026-10-15/projects/tan-2026-10-15/M1-old-electronic-incorrect.png",
          "label": "Older Figure 1b · incorrect electronic result",
          "alt": "Older Figure 1b · incorrect electronic result"
        },
        {
          "src": "assets/decks/meeting-2026-10-15/projects/tan-2026-10-15/M1.png",
          "label": "Current Figure 1 · corrected result",
          "alt": "Current Figure 1 · corrected result"
        }
      ],
      "layout": "tan-figure-comparison",
      "caption": "Left: older Figure 1b from the 20 August deck. Right: current full Figure 1.",
      "notes": "Source: 14. TaN/manuscript/audited_20260930/revised_manuscript. The audited 30 September package is the synchronized verified manuscript, supplement and response set. The old panel is preserved as historical evidence and explicitly marked incorrect. Source for the error: audited_20260930/response_letter/response_letter.tex, revision overview, and revision_figure_correction_notes.md. Stored energy coordinates were in Hartree but interpreted as eV. Convert with 1 Ha = 27.211386245988 eV and recompute the electronic Landauer integrals. Transmission counts were unchanged. This is not a uniform rescaling of conductance. Current pristine electronic G/A at 300 K is 0.403003 (x) and 0.259527 (z), in 10^9 W m^-2 K^-1, below phonon values 0.812086 and 0.783644. The old phonon panel also predates later phonon revisions; the comparison should not imply that the electronic unit correction explains every phonon change."
    },
    {
      "kicker": "TaN thermal | Figure 2",
      "title": "Vacancy structures carry more electronic heat",
      "points": [
        "Most electronic heat transport comes from within ±0.2 eV of the Fermi level.",
        "The vacancy structures have higher integrated electronic conductance."
      ],
      "figure": "assets/decks/meeting-2026-10-15/projects/tan-2026-10-15/M2.png",
      "figureLabel": "Main Figure 2",
      "layout": "tan-main-figure",
      "caption": "Main Figure 2 · electronic spectra and transmission maps",
      "notes": "Source: 14. TaN/manuscript/audited_20260930/revised_manuscript. The audited 30 September package is the synchronized verified manuscript, supplement and response set. The corrected electronic spectra retain a near-Fermi heat-current window but show a larger integrated conductance for the vacancy structures. The electronic increase is real in the stored spectra, while its microscopic origin still needs finer sampling and additional electronic analysis. Approximately 96.8–98.5% of z-direction electronic conductance lies within |E − E_F| ≤ 0.2 eV. Vacancy maps have lower isolated peaks but a higher mesh-averaged transmission background than pristine TaN. The maps use each supercell's own fractional Brillouin zone; visual differences alone do not establish scattering or localization."
    },
    {
      "kicker": "TaN thermal | Figure 3",
      "title": "Vacancies suppress phonon transport",
      "points": [
        "Low-frequency phonons supply most of the absolute conductance loss.",
        "Participation ratios describe mode amplitudes; they do not measure scattering rates."
      ],
      "figure": "assets/decks/meeting-2026-10-15/projects/tan-2026-10-15/M3.png",
      "figureLabel": "Main Figure 3",
      "layout": "tan-main-figure",
      "caption": "Main Figure 3 · phonon spectra and participation ratios",
      "notes": "Source: 14. TaN/manuscript/audited_20260930/revised_manuscript. The audited 30 September package is the synchronized verified manuscript, supplement and response set. Frequency-resolved conductance establishes the phonon reduction. Participation ratios describe within-cell mode amplitudes but do not measure scattering rates. Describe the result as redistribution and suppression of periodic phonon channels, with no random-defect scattering rate inferred. At 25% vacancies along z, contributions below and above 300 cm⁻¹ fall by 76.7% and 93.0%, respectively. The lower-frequency band supplies 77.9% of the total loss because it dominates pristine heat transport. Corrected PR maps do not support broad acoustic localization; PR alone cannot assign the transport-loss mechanism."
    },
    {
      "kicker": "TaN thermal | Figure 4",
      "title": "The carrier contrast persists over the evaluated temperature range",
      "points": [
        "Vacancy structures remain electron dominated in the fixed-spectrum calculation.",
        "Pristine TaN remains phonon dominated near room temperature."
      ],
      "figure": "assets/decks/meeting-2026-10-15/projects/tan-2026-10-15/M4.png",
      "figureLabel": "Main Figure 4",
      "layout": "tan-main-figure",
      "caption": "Main Figure 4 · 20–600 K with fixed spectra; low-temperature electronic values are interpolation estimates",
      "notes": "Source: 14. TaN/manuscript/audited_20260930/revised_manuscript. The audited 30 September package is the synchronized verified manuscript, supplement and response set. Reweighting the saved spectra extends the z-direction carrier comparison while exposing the native electronic-grid limit. The broad temperature plot is a fixed-spectrum consistency test, not a converged low-temperature crossover prediction. All three vacancy structures remain electron dominated across the evaluated interval within the fixed-spectrum model. Pristine TaN is phonon dominated over most of the range, including 300 and 600 K. At low temperature, the 50 meV electronic spacing is much larger than k_BT; electronic curves are interpolation estimates. Temperature-dependent electron–phonon and anharmonic scattering are excluded."
    },
    {
      "kicker": "TaN thermal | Figure 5",
      "title": "Two vacancy arrangements preserve the qualitative trend",
      "points": [
        "Both 25% vacancy arrangements have higher electronic and lower phononic conductance than pristine.",
        "This is a limited configuration test, not a random-vacancy average."
      ],
      "figure": "assets/decks/meeting-2026-10-15/projects/tan-2026-10-15/M5.png",
      "figureLabel": "Main Figure 5",
      "layout": "tan-main-figure",
      "caption": "Main Figure 5 · two 25% vacancy arrangements in the same parent cell",
      "notes": "Source: 14. TaN/manuscript/audited_20260930/revised_manuscript. The audited 30 September package is the synchronized verified manuscript, supplement and response set. A same-parent-cell comparison tests configuration sensitivity without claiming an ensemble average. The two tested arrangements preserve higher electronic and lower phononic conductance than pristine, within stated numerical limits. Configuration B exceeds A electronically by 22.9% along x and 0.9% along z. Both configurations retain much lower phonon conductance than pristine TaN. The two phonon runs use different force-constant reconstruction settings, so their numerical difference cannot be assigned solely to arrangement. Two deterministic structures do not establish configuration independence or random-disorder behavior."
    },
    {
      "kicker": "First-round revision · 1 of 4",
      "title": "NEGF setup and central-region length",
      "lead": "We clarified the device geometry and added a length check.",
      "points": [
        "The phonon leads and centre share the same periodic vacancy structure.",
        "Reported z lengths: 34.7 nm for pristine and 5.2 nm for the vacancy models.",
        "The pristine length test is stable; the 12.5% vacancy series has not fully converged."
      ],
      "figures": [
        {
          "src": "assets/decks/meeting-2026-10-15/projects/tan-2026-10-15/R1.png",
          "label": "Phonon NEGF geometry",
          "alt": "Phonon NEGF geometry"
        },
        {
          "src": "assets/decks/meeting-2026-10-15/projects/tan-2026-10-15/R2.png",
          "label": "Central-length sensitivity",
          "alt": "Central-length sensitivity"
        }
      ],
      "layout": "tan-r1-setup",
      "caption": "Merged R1 comments 1 and 5; R2 comment 3 · response figures R1–R2",
      "notes": "First-round revision summary, merged by topic. Source: audited_20260930/response_letter/response_letter.tex. Pristine Lx/Lz = 35.3/34.7 nm; vacancy Lx/Lz = 5.3/5.2 nm. Pristine length variation 0.073%; the tested 12.5% vacancy series decreases by 6.49% and has not plateaued. The electronic calculation is periodic bulk and does not share a finite central-device length. This summary does not claim full convergence."
    },
    {
      "kicker": "First-round revision · 2 of 4",
      "title": "Vacancy distribution and configuration sensitivity",
      "lead": "We compared two 25% vacancy arrangements in the same parent cell.",
      "points": [
        "Both arrangements retain the same qualitative carrier trend.",
        "We clarified the periodic vacancy distribution and the role of supercell choice.",
        "The calculation does not establish random-disorder behavior or configuration independence."
      ],
      "figure": "assets/decks/meeting-2026-10-15/projects/tan-2026-10-15/R3.png",
      "figureLabel": "Two vacancy configurations",
      "layout": "tan-r1-summary",
      "caption": "Merged R1 comment 2; R2 comment 1; R3 comment 2 · response figure R3",
      "notes": "First-round revision summary, merged by topic. Source: audited_20260930/response_letter/response_letter.tex. The test uses two inequivalent arrangements in a 2×2×2 parent cell at 25% N vacancies. Electronic B/A changes are 22.9% along x and 0.9% along z. Different phonon force-constant reconstruction settings limit attribution of quantitative A/B differences solely to vacancy arrangement."
    },
    {
      "kicker": "First-round revision · 3 of 4",
      "title": "Temperature range extended to 20–600 K",
      "lead": "We extended the original 250–350 K comparison using the saved spectra.",
      "points": [
        "Recomputed electronic and phononic occupation weighting along z.",
        "The selected vacancy structures remain electron dominated in this model.",
        "We stated the low-temperature sampling limit and the absence of temperature-dependent scattering."
      ],
      "figure": "assets/decks/meeting-2026-10-15/projects/tan-2026-10-15/R8.png",
      "figureLabel": "Extended temperature comparison",
      "layout": "tan-r1-summary",
      "caption": "Merged R2 comment 3 and R3 comment 3 · response figure R8",
      "notes": "First-round revision summary, merged by topic. Source: audited_20260930/response_letter/response_letter.tex. The extension reweights fixed spectra. Native electronic energy spacing is about 50 meV, so low-temperature electronic conductance is an interpolation estimate. The curves do not establish a converged low-temperature crossover or include electron–phonon/anharmonic scattering."
    },
    {
      "kicker": "First-round revision · 4 of 4",
      "title": "Scope clarified: electron–phonon coupling and SOC",
      "lead": "We made the omitted physics explicit and limited the interpretation.",
      "table": {
        "columns": [
          "Issue",
          "What we addressed",
          "Remaining calculation"
        ],
        "rows": [
          {
            "cells": [
              "Electron–phonon coupling",
              "Stated that electrons and phonons are independent coherent channels; discussed effects at higher temperature and longer length.",
              "Coupled inelastic transport"
            ]
          },
          {
            "cells": [
              "Spin–orbit coupling",
              "Stated that SOC is omitted; discussed its possible effects on electronic bands and phonon force constants.",
              "Matched SOC transport calculations"
            ]
          }
        ]
      },
      "layout": "tan-r1-scope",
      "caption": "Merged R1 comment 6; R3 comment 3; R5 comments 1–2 · scope discussion",
      "notes": "First-round revision summary, merged by topic. Source: audited_20260930/response_letter/response_letter.tex. These comments were addressed through disclosure and discussion of scope, not by performing electron–phonon or SOC calculations. SOC is especially relevant to Ta-containing electronic bands; its magnitude is unresolved."
    },
    {
      "kicker": "Second-round review | Reviewer 1 assessment",
      "title": "Another Major Revision Is Requested",
      "reviewerLabel": "Original second-round assessment · 11 October 2026",
      "reviewerComment": "The authors have adequately addressed some of the reviewers' comments, and the manuscript has been improved through more detailed descriptions of the computational methods and additional analyses. However, the calculated electronic thermal conductance has changed substantially in this revision, fundamentally altering one of the central conclusions of the study. Nevertheless, the revised manuscript still contains numerous physical interpretations based on the previous results and statements that are inconsistent with the new calculations. Thus, I consider that another major revision is necessary. The specific points that should be addressed are as follows:",
      "responseTitle": "Possible response",
      "responsePoints": [
        "Acknowledge that the electronic error changes the central interpretation.",
        "State the corrected vacancy-dependent carrier balance.",
        "Submit a consistent manuscript and a traceable before/after correction summary."
      ],
      "layout": "review-detailed",
      "caption": "Second round · Reviewer 1 requests another major revision.",
      "takeaway": "Proposed response plan; the R2 response has not yet been finalized.",
      "notes": "Source: 14. TaN/manuscript/revisionR2/MTP-D-26-02001-reviews.pdf, received 14 October 2026. Reviewer wording is reproduced verbatim apart from PDF line-break normalization. Response wording on these slides is proposed for discussion and has not been submitted."
    },
    {
      "kicker": "Second-round review | Reviewer 1 · Comment 1",
      "title": "R2 comment 1: revise the central claim",
      "reviewerLabel": "Original second-round comment 1",
      "commentPart": "Part 1 of 2",
      "reviewerComment": "1. The revised results no longer support one of the central claims of the manuscript, namely, the transport-regime-dependent carrier hierarchy. In the original manuscript, a major conclusion was that the bulk thermal conductivity of pristine θ-TaN is phonon-dominated, whereas its nanoscale coherent thermal conductance is electron-dominated. However, according to the revised calculations, the coherent thermal conductance of pristine θ-TaN is also phonon-dominated, and electron dominance is observed only in the N-vacancy-containing structures. Therefore, the present results demonstrate a change in the relative contributions of electrons and phonons upon the introduction of N vacancies, rather than a reversal of the carrier hierarchy caused by a change in the transport regime. This distinction is fundamental to the physical interpretation of the study and cannot be treated as a simple numerical correction.",
      "responseTitle": "Possible response",
      "responsePoints": [
        "“We agree that the original transport-regime-dependent hierarchy is not supported.”",
        "“The corrected result is phonon dominance in pristine TaN and electron dominance in the selected periodic vacancy structures.”",
        "Revise the title, abstract, introduction and conclusion around this carrier-balance change."
      ],
      "figures": [
        {
          "src": "assets/decks/meeting-2026-10-15/projects/tan-2026-10-15/M1.png",
          "label": "Current Fig. 1 · corrected balance",
          "alt": "Current Fig. 1 · corrected balance"
        }
      ],
      "layout": "review-detailed",
      "caption": "Second-round Comment 1, part 1 · the new result changes the physical claim.",
      "takeaway": "Support the revised claim with corrected Figure 1 and explicit model scope.",
      "notes": "Source: 14. TaN/manuscript/revisionR2/MTP-D-26-02001-reviews.pdf, received 14 October 2026. Reviewer wording is reproduced verbatim apart from PDF line-break normalization. Response wording on these slides is proposed for discussion and has not been submitted."
    },
    {
      "kicker": "Second-round review | Reviewer 1 · Comment 1",
      "title": "R2 comment 1: explain the error and revise the mechanism",
      "reviewerLabel": "Original second-round comment 1",
      "commentPart": "Part 2 of 2",
      "reviewerComment": "Furthermore, the revised manuscript still contains explanations based on the previous results, in which the electronic thermal conductance decreases upon the introduction of vacancies, whereas the revised calculations actually show a substantial increase in electronic thermal conductance. For example, Section II states that vacancies reduce both the electronic and phononic conductances, while Section III retains the explanation that the suppression of high-transmission electronic channels leads to a conductance loss. These statements are inconsistent with the revised results. The authors should clearly explain the reasons for the substantial changes in the calculated electronic thermal conductance and reconsider the physical interpretation based on the new results. Since a central conclusion of the study has changed, the authors should thoroughly revise the arguments and their supporting evidence throughout the manuscript, including the Abstract, Introduction, Results, Discussion, and Conclusion.",
      "responseTitle": "Possible response",
      "responsePoints": [
        "“We identified an energy-unit error: Hartree coordinates were treated as electronvolts.”",
        "Document the conversion, recomputed integrals and old/new Figure 1 values.",
        "Remove claims of electronic suppression by vacancies; revise the mechanism using the corrected spectra."
      ],
      "figures": [
        {
          "src": "assets/decks/meeting-2026-10-15/projects/tan-2026-10-15/M2.png",
          "label": "Current Fig. 2 · corrected electronic spectra",
          "alt": "Current Fig. 2 · corrected electronic spectra"
        }
      ],
      "layout": "review-detailed",
      "caption": "Second-round Comment 1, part 2 · numerical correction, mechanism and full-text consistency.",
      "takeaway": "Audit all sections, captions and supplementary text against the corrected results.",
      "notes": "Source: 14. TaN/manuscript/revisionR2/MTP-D-26-02001-reviews.pdf, received 14 October 2026. Reviewer wording is reproduced verbatim apart from PDF line-break normalization. Response wording on these slides is proposed for discussion and has not been submitted."
    },
    {
      "kicker": "Second-round review | Reviewer 1 · Comment 2",
      "title": "R2 comment 2: interpret transport in a periodic structure",
      "reviewerLabel": "Original second-round comment 2",
      "reviewerComment": "2. Regarding my previous Comment 5, although the geometry used in the NEGF calculations has been clarified, the physical interpretation in terms of vacancy-induced scattering remains problematic. According to the authors' response, the left and right leads and the central region in the phonon NEGF calculations have the same vacancy concentration and periodic vacancy arrangement. Thus, the same periodic structure extends continuously throughout the entire system. Consequently, unlike a system in which a vacancy-containing scattering region is placed between pristine leads, these calculations do not directly evaluate the additional scattering caused by vacancies. The calculated changes in transmission should instead be understood in terms of changes in phonon dispersion and the available propagating channels arising from the periodic vacancy arrangement.",
      "responseTitle": "Possible response",
      "responsePoints": [
        "“We agree that identical periodic leads and centre do not isolate additional vacancy-scattering resistance.”",
        "Describe transmission changes through periodic dispersion and the available propagating channels.",
        "Revise scattering/localization wording and state that isolated-defect resistance requires a different device model."
      ],
      "figures": [
        {
          "src": "assets/decks/meeting-2026-10-15/projects/tan-2026-10-15/R1.png",
          "label": "R1 · same vacancies in leads and centre",
          "alt": "R1 · same vacancies in leads and centre"
        }
      ],
      "layout": "review-detailed",
      "caption": "Second-round Comment 2 · interpretation must match the material-matched lead/centre model.",
      "takeaway": "Use Figure 1a and the phonon spectra to keep the interpretation consistent with the geometry.",
      "notes": "Source: 14. TaN/manuscript/revisionR2/MTP-D-26-02001-reviews.pdf, received 14 October 2026. Reviewer wording is reproduced verbatim apart from PDF line-break normalization. Response wording on these slides is proposed for discussion and has not been submitted."
    },
    {
      "kicker": "Second-round review | all reviewer positions",
      "title": "Two Reviewers Recommend Acceptance; Reviewer 1 Requests Major Revision",
      "lead": "The new package contains explicit Revision 1 positions from Reviewers 1, 2 and 3; Reviewer 5 has no second-round follow-up entry.",
      "points": [
        "Reviewer 1: another major revision is necessary.",
        "Reviewer 2: accepts the response.",
        "Reviewer 3: accepts the response."
      ],
      "table": {
        "columns": [
          "Reviewer",
          "Revision 1 position"
        ],
        "rows": [
          {
            "cells": [
              "Reviewer 1 · 11 Oct",
              "Another major revision: correct the carrier-hierarchy narrative and periodic-channel interpretation."
            ]
          },
          {
            "cells": [
              "Reviewer 2 · 12 Oct",
              "“The authors have addressed reviewers' comments in this revision. I would like to recommend the acceptance of the paper.”"
            ],
            "highlight": true
          },
          {
            "cells": [
              "Reviewer 3 · 7 Oct",
              "“The comments have been well answered, the current version can be accepted.”"
            ],
            "highlight": true
          },
          {
            "cells": [
              "Reviewer 5",
              "No Revision 1 follow-up appears in the review package."
            ]
          }
        ]
      },
      "layout": "review-outcomes",
      "caption": "Second-round positions reproduced from the 14 October review package.",
      "takeaway": "The next revision should focus tightly on Reviewer 1's two remaining conceptual inconsistencies.",
      "notes": "Source: 14. TaN/manuscript/revisionR2/MTP-D-26-02001-reviews.pdf, received 14 October 2026. Reviewer wording is reproduced verbatim apart from PDF line-break normalization. Response wording on these slides is proposed for discussion and has not been submitted."
    },
    {
      "kicker": "TaN thermal | second-round action plan",
      "title": "Proposed R2 response: two changes and a consistency check",
      "lead": "Explain the numerical correction and align the physical interpretation with the periodic model.",
      "points": [
        "Prepare an old/new Figure 1 comparison and a concise correction table.",
        "Track each revised claim through the main text, captions and supplement."
      ],
      "table": {
        "columns": [
          "Workstream",
          "Required edit",
          "Primary evidence"
        ],
        "rows": [
          {
            "cells": [
              "Electronic recalculation",
              "Document Hartree→eV correction, integration convention and changed conductance values",
              "Fig. 1; Fig. 2; numerical audit"
            ]
          },
          {
            "cells": [
              "Carrier hierarchy",
              "Use vacancy-dependent balance throughout all sections",
              "24.9% pristine vs 74.3–93.2% vacancy electrons along z"
            ]
          },
          {
            "cells": [
              "Phonon interpretation",
              "Use periodic dispersion / propagating-channel language",
              "Fig. 1a; Fig. 3; matched-parent controls"
            ]
          },
          {
            "cells": [
              "Consistency gate",
              "Audit abstract, body, captions, supplement and conclusion",
              "Reviewer 1 Comment 1 wording"
            ]
          }
        ]
      },
      "layout": "r2-action-table",
      "caption": "Proposed discussion plan for the second-round response.",
      "takeaway": "These are proposed responses for discussion, not completed R2 revisions.",
      "notes": "Source: 14. TaN/manuscript/revisionR2/MTP-D-26-02001-reviews.pdf, received 14 October 2026. Reviewer wording is reproduced verbatim apart from PDF line-break normalization. Response wording on these slides is proposed for discussion and has not been submitted."
    }
  ]
};
