/* 26 November discussion: NEGFphph silicon. The Non-Gaussian reviewer report updates the 12 November status baseline. */
window.AUGUST_PROJECT_STATUS = Object.freeze({
  "updated": "12 November 2026",
  "projects": [
    {
      "id": "negf-phonon",
      "meetingFocus": true,
      "contentProjectId": "negf-phonon",
      "name": "NEGFphph",
      "shortName": "NEGFphph",
      "status": "Active",
      "phase": "Silicon · six result sections",
      "progress": 35,
      "summary": "Silicon results cover q-mesh, combined η and solver tolerance, 4 × 4 temperature bias, conductance versus temperature, effective conductivity versus length, and low-temperature conductivity.",
      "externalDeck": {
        "src": "assets/decks/meeting-2026-11-26/projects/negf-phonon/index.html",
        "title": "NEGFphph project board",
        "sourceLabel": "Project board",
        "sourceDate": "26 November 2026",
        "sourceNote": "The 20-slide silicon deck includes 14 background slides from 12 November and six result slides. They cover q-mesh, combined lead broadening and solver tolerance, 4 × 4 temperature bias, conductance versus temperature, effective conductivity versus length, and low-temperature conductivity. The long-device series uses thermal closure with same-temperature strict SCBA donors. See the result slides for source dates and data coverage. The sourceSha256 identifies the copied source deck. Escape returns through the project navigation.",
        "sourceSha256": "a24cad82b63211816fe1d8167cfbe73e771b1d92d2392f5671f29fe2cfca222c",
        "deckCount": 6
      },
      "deckCollection": {
        "focusDeckId": "silicon",
        "decks": [
          {
            "id": "software",
            "title": "Theory and software development",
            "src": "assets/decks/meeting-2026-11-26/projects/negf-phonon/decks/deck-1-software.html",
            "slideCount": 13
          },
          {
            "id": "silicon",
            "title": "Silicon results",
            "src": "assets/decks/meeting-2026-11-26/projects/negf-phonon/roadmap/index.html",
            "slideCount": 20
          },
          {
            "id": "materials",
            "title": "Other material calculations",
            "src": "assets/decks/meeting-2026-11-26/projects/negf-phonon/decks/deck-3-materials.html",
            "slideCount": 7
          },
          {
            "id": "q1",
            "title": "Q1 · Microscopic information and heat flow",
            "src": "assets/decks/meeting-2026-11-26/projects/negf-phonon/decks/deck-4-q1.html",
            "slideCount": 17
          },
          {
            "id": "q2",
            "title": "Q2 · The spatial approach to Fourier transport",
            "src": "assets/decks/meeting-2026-11-26/projects/negf-phonon/decks/deck-5-q2.html",
            "slideCount": 17
          },
          {
            "id": "q3",
            "title": "Q3 · Time dependence and memory",
            "src": "assets/decks/meeting-2026-11-26/projects/negf-phonon/decks/deck-6-q3.html",
            "slideCount": 18
          },
          {
            "id": "archive",
            "title": "28 October presentation",
            "src": "assets/decks/meeting-2026-11-26/projects/negf-phonon/roadmap/background-2026-10-28.html",
            "slideCount": 12
          }
        ]
      }
    },
    {
      "id": "au-mos2",
      "meetingFocus": false,
      "name": "Au–MoS₂",
      "shortName": "Au–MoS₂",
      "status": "Pending",
      "phase": "Pending",
      "summary": "Rod-contact electron barriers and evidence; one top-contact summary with setup, barriers and pristine/defect PDOS contours.",
      "externalDeck": {
        "src": "assets/decks/meeting-2026-11-26/projects/au-mos2/rod/index.html",
        "title": "Au/MoS₂: electron SBH and PDOS evidence",
        "sourceLabel": "Rod and top contacts",
        "sourceDate": "28 October 2026",
        "slideCount": 4,
        "sourceNote": "Adapted for the 28 October meeting from the existing five-slide AuMoS2_SBH.html, pinned to zhouhb0l/AuMoS2 commit d2554ed06a847f8173ef9f8d3cb58d7c03aceeb2 (26 October source). Three figure-led slides: four consistent far-core electron SBHs with primary extraction-sensitivity whiskers and coordinate-based atomic structures; F10/R10 evidence; F15/R15 evidence. The suffixes 10/15 are case labels, with actual Au widths printed on the structures. Each evidence slide shows original electron-side spatial PDOS, native PDOS versus EF, and the matched F−R extraction-sensitivity range. One appended top-contact slide shows the near-edge-vacancy setup in slide1’s side-view atomic style, pristine lateral SBH0.150eV and near-edge-defect lateral SBH0.675±0.025eV with extraction-sensitivity whisker, vertical SBH explicitly unresolved, and the existing published Figure3(g,h) pristine/near-edge-defect PDOS contour panels with original band-edge guides and LDOS colors. The rod exposed-sheet EC−EF proxy and top-contact channel-to-covered band-edge step are distinct. Case labels avoid assigning mismatched raw-coordinate and paper distance conventions. Technical detail remains in M notes. The sourceSha256 records the preserved original HTML at source/AuMoS2_SBH.original.html, not the adapted entry point. These remain exposed-sheet equilibrium spectral proxies. Use arrows or Space, F for fullscreen and M for sources.",
        "sourceSha256": "3d3ccecaeb133ef88f443c17eacc67ced8b494c04fbf68db17ecafea69a64b64"
      }
    },
    {
      "id": "phonon-susceptibility",
      "contentProjectId": "phonon-susceptibility",
      "name": "Phonon susceptibility",
      "shortName": "Phonon susc.",
      "status": "Response submitted",
      "phase": "Response submitted",
      "progress": 70,
      "summary": "Response submitted.",
      "meetingFocus": false
    },
    {
      "id": "non-gaussian-fluctuation-bounds",
      "name": "Bounds on Non-Gaussian Fluctuations",
      "shortName": "Non-Gaussian bounds",
      "status": "Report received",
      "phase": "PRB review",
      "progress": 70,
      "summary": "The Physical Review B reviewer report has arrived.",
      "externalDeck": {
        "src": "assets/decks/meeting-2026-11-26/projects/non-gaussian-fluctuation-bounds/conference/index.html",
        "title": "Universal Bounds on Non-Gaussian Fluctuations",
        "sourceLabel": "Prepared paper deck",
        "sourceDate": "19 August 2026",
        "slideCount": 10,
        "sourceNote": "Condensed manuscript-aligned conference deck with full speaker notes. The ten-screen story follows the theorem and Figure 2 from model to exclusion, mechanism support, and experimental decision."
      },
      "meetingFocus": false
    },
    {
      "id": "wte2-phonon-topology",
      "contentProjectId": "wte2-phonon-topology",
      "name": "WTe₂ moiré phonons",
      "shortName": "WTe₂",
      "status": "Submitted",
      "phase": "Submitted",
      "progress": 70,
      "summary": "Manuscript submitted.",
      "meetingFocus": false
    },
    {
      "id": "proton-transfer",
      "name": "Proton transfer",
      "shortName": "Proton transfer",
      "status": "Manuscript preparation",
      "phase": "Manuscript preparation",
      "summary": "Manuscript in preparation.",
      "externalDeck": {
        "src": "assets/decks/meeting-2026-11-26/projects/proton-transfer/qme/index.html",
        "title": "Proton transfer, current and quantum effects",
        "sourceLabel": "Existing project slides",
        "sourceDate": "28 October 2026",
        "slideCount": 37,
        "sourceSha256": "ff05aa16d7e516301959c1b6c14e431c139c136f8918bcb9b85333559c8e636c",
        "sourceNote": "Copied unchanged on 28 October 2026 from the existing proton-transfer HTML presentation. The original document does not state its author or document date. All 37 slides, embedded figures, equations, notes and navigation are retained. Two optional links to separate project reports are unresolved in the supplied standalone source; they are not required to render the slides. Use the embedded deck controls or arrow keys; the Projects link returns to the meeting board."
      },
      "meetingFocus": false
    },
    {
      "id": "one-d-chain",
      "contentProjectId": "one-d-chain",
      "name": "Mo₂S₃",
      "shortName": "Mo₂S₃",
      "status": "Active",
      "phase": "CDW & transport",
      "progress": 62,
      "summary": "Bulk CDW and electronic / thermoelectric results updated.",
      "meetingFocus": false,
      "externalDeck": {
        "title": "Mo₂S₃ · 3D bulk properties",
        "src": "assets/decks/meeting-2026-11-26/projects/layered/mo2s3-3d/index.html",
        "sourceLabel": "Work update",
        "sourceDate": "12 November 2026",
        "slideCount": 19,
        "sourceNote": "A complete 3D Mo₂S₃ work update. Earlier TaSe₂ results are retained at the end. Use the deck’s own arrows or keyboard controls; Escape returns to Projects."
      }
    },
    {
      "id": "tan-manuscript",
      "contentProjectId": "tan-manuscript",
      "name": "TaN thermal",
      "shortName": "TaN",
      "status": "Proof submitted",
      "phase": "Proof submitted",
      "progress": 100,
      "summary": "Manuscript accepted; proof submitted.",
      "meetingFocus": false
    },
    {
      "id": "recessed-contact",
      "contentProjectId": "recessed-contact",
      "name": "Recessed Contact",
      "shortName": "RC",
      "status": "Accepted",
      "phase": "Accepted",
      "progress": 100,
      "summary": "Manuscript accepted.",
      "meetingFocus": false
    },
    {
      "id": "nonlocal-sbh",
      "contentProjectId": "nonlocal-sbh",
      "name": "Nonlocal SBH",
      "shortName": "SBH",
      "status": "Published",
      "phase": "Nano Letters",
      "progress": 100,
      "summary": "Published in Nano Letters.",
      "publication": {
        "reference": "Hangbo Zhou and Yong-Wei Zhang, “Nonlocal Electrostatic Origin of Schottky-Barrier Variability in 2D Contacts,” Nano Letters 26 (38), 13130–13135 (2026).",
        "doi": "10.1021/acs.nanolett.6c03959",
        "url": "https://doi.org/10.1021/acs.nanolett.6c03959"
      },
      "meetingFocus": false
    }
  ]
});
