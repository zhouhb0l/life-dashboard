/* Current 28 October portfolio metadata. Earlier science content remains in project-data.js. */
window.AUGUST_PROJECT_STATUS = Object.freeze({
  updated: "28 October 2026",
  projects: [
    {
      id: "negf-phonon",
      meetingFocus: true,
      contentProjectId: "negf-phonon",
      name: "NEGF phonon–phonon",
      shortName: "NEGF p–p",
      status: "Active",
      phase: "Fitted-model SCBA",
      progress: 35,
      summary: "Converged 1×4 axis control matches 4×1; full q-mesh convergence remains open.",
      externalDeck: {
        src: "assets/decks/meeting-2026-10-28/projects/negf-phonon/roadmap/index.html",
        title: "NEGFPy: theory, validation and silicon transport",
        sourceLabel: "Scientific briefing",
        sourceDate: "28 October 2026",
        slideCount: 12,
        sourceNote: "Reorganized for the 28 October meeting: three theory screens covering the physical Green-function/self-energy/bubble interpretation, conservation and the original seven approximation schemes, an illustrated scattering-length and ballistic/diffusive scaling screen, two Wang literature-benchmark screens covering the model/Hamiltonian/approximation and conditional direct agreement, a software roadmap, a silicon FC2/DOS and frequency-dependent SMRTA lifetime reference, two silicon SCBA result screens, a population-BTE/NEGF comparison, a broad comparison of BTE extensions and unified NEGF treatment. The final proposed-research-questions slide was removed at the user’s request. Current silicon results include GitHub update 2ef67f5292b7aa448eff2cc0aa71a36155af4d0a. The 1×4 axis control has converged; 4×2 remains running according to the user's update. Physical-interface accuracy and full 2D q convergence remain open. The sourceSha256 below records the original August source lineage; this meeting's section has been reorganized at the user's request. Use the embedded deck's arrows or keyboard controls.",
        sourceSha256: "a24cad82b63211816fe1d8167cfbe73e771b1d92d2392f5671f29fe2cfca222c"
      }
    },
    {
      id: "au-mos2",
      meetingFocus: true,
      name: "Au–MoS₂",
      shortName: "Au–MoS₂",
      status: "New",
      phase: "Discussion focus",
      summary: "Rod-contact electron barriers and evidence; one top-contact summary with setup, barriers and pristine/defect PDOS contours.",
      externalDeck: {
        src: "assets/decks/meeting-2026-10-28/projects/au-mos2/rod/index.html",
        title: "Au/MoS₂: electron SBH and PDOS evidence",
        sourceLabel: "Rod and top contacts",
        sourceDate: "28 October 2026",
        slideCount: 4,
        sourceNote: "Adapted for the 28 October meeting from the existing five-slide AuMoS2_SBH.html, pinned to zhouhb0l/AuMoS2 commit d2554ed06a847f8173ef9f8d3cb58d7c03aceeb2 (26 October source). Three figure-led slides: four consistent far-core electron SBHs with primary extraction-sensitivity whiskers and coordinate-based atomic structures; F10/R10 evidence; F15/R15 evidence. The suffixes 10/15 are case labels, with actual Au widths printed on the structures. Each evidence slide shows original electron-side spatial PDOS, native PDOS versus EF, and the matched F−R extraction-sensitivity range. One appended top-contact slide shows the near-edge-vacancy setup in slide1’s side-view atomic style, pristine lateral SBH0.150eV and near-edge-defect lateral SBH0.675±0.025eV with extraction-sensitivity whisker, vertical SBH explicitly unresolved, and pristine/near-edge-defect spatial PDOS contours. The rod exposed-sheet EC−EF proxy and top-contact channel-to-covered band-edge step are distinct. Case labels avoid assigning mismatched raw-coordinate and paper distance conventions. Technical detail remains in M notes. The sourceSha256 records the preserved original HTML at source/AuMoS2_SBH.original.html, not the adapted entry point. These remain exposed-sheet equilibrium spectral proxies. Use arrows or Space, F for fullscreen and M for sources.",
        sourceSha256: "3d3ccecaeb133ef88f443c17eacc67ced8b494c04fbf68db17ecafea69a64b64"
      }
    },
    {
      id: "tan-manuscript",
      contentProjectId: "tan-manuscript",
      name: "TaN thermal",
      shortName: "TaN",
      status: "Response submitted",
      phase: "Second response submitted",
      progress: 100,
      summary: "Second response submitted."
    },
    {
      id: "phonon-susceptibility",
      contentProjectId: "phonon-susceptibility",
      name: "Phonon susceptibility",
      shortName: "Phonon susc.",
      status: "Response submitted",
      phase: "Response submitted",
      progress: 70,
      summary: "Response submitted."
    },
    {
      id: "non-gaussian-fluctuation-bounds",
      name: "Bounds on Non-Gaussian Fluctuations",
      shortName: "Non-Gaussian bounds",
      status: "Under review",
      phase: "PRB review",
      progress: 70,
      summary: "The manuscript is under review at Physical Review B.",
      externalDeck: {
        src: "assets/decks/meeting-2026-10-28/projects/non-gaussian-fluctuation-bounds/conference/index.html",
        title: "Universal Bounds on Non-Gaussian Fluctuations",
        sourceLabel: "Prepared paper deck",
        sourceDate: "19 August 2026",
        slideCount: 10,
        sourceNote: "Condensed manuscript-aligned conference deck with full speaker notes. The ten-screen story follows the theorem and Figure 2 from model to exclusion, mechanism support, and experimental decision."
      }
    },
    {
      id: "wte2-phonon-topology",
      contentProjectId: "wte2-phonon-topology",
      name: "WTe₂ moiré phonons",
      shortName: "WTe₂",
      status: "Active",
      phase: "Manuscript preparation",
      progress: 70,
      summary: "Bloch character reconstruction and thermal transport; manuscript preparation."
    },
    {
      id: "proton-transfer",
      name: "Proton transfer",
      shortName: "Proton transfer",
      status: "New",
      phase: "Not for discussion",
      summary: "Existing briefing on proton-transfer pathways, rate models and quantum master equations.",
      externalDeck: {
        src: "assets/decks/meeting-2026-10-28/projects/proton-transfer/qme/index.html",
        title: "Proton transfer, current and quantum effects",
        sourceLabel: "Existing project slides",
        sourceDate: "28 October 2026",
        slideCount: 37,
        sourceSha256: "ff05aa16d7e516301959c1b6c14e431c139c136f8918bcb9b85333559c8e636c",
        sourceNote: "Copied unchanged on 28 October 2026 from the existing proton-transfer HTML presentation. The original document does not state its author or document date. All 37 slides, embedded figures, equations, notes and navigation are retained. Two optional links to separate project reports are unresolved in the supplied standalone source; they are not required to render the slides. Use the embedded deck controls or arrow keys; the Projects link returns to the meeting board."
      }
    },
    {
      id: "one-d-chain",
      contentProjectId: "one-d-chain",
      name: "Mo₂S₃",
      shortName: "Mo₂S₃",
      status: "Active",
      phase: "Test CDW",
      progress: 62,
      summary: "Testing charge-density-wave behavior in Mo₂S₃."
    },
    {
      id: "recessed-contact",
      contentProjectId: "recessed-contact",
      name: "Recessed Contact",
      shortName: "RC",
      status: "Accepted",
      phase: "Accepted",
      progress: 100,
      summary: "Manuscript accepted."
    },
    {
      id: "nonlocal-sbh",
      contentProjectId: "nonlocal-sbh",
      name: "Nonlocal SBH",
      shortName: "SBH",
      status: "Published",
      phase: "Nano Letters",
      progress: 100,
      summary: "Published in Nano Letters.",
      publication: {
        reference: "Hangbo Zhou and Yong-Wei Zhang, “Nonlocal Electrostatic Origin of Schottky-Barrier Variability in 2D Contacts,” Nano Letters 26 (38), 13130–13135 (2026).",
        doi: "10.1021/acs.nanolett.6c03959",
        url: "https://doi.org/10.1021/acs.nanolett.6c03959"
      }
    }
  ]
});
