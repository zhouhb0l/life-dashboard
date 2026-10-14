/* Current 15 October portfolio metadata. Earlier science content remains in project-data.js. */
window.AUGUST_PROJECT_STATUS = Object.freeze({
  updated: "14 October 2026",
  projects: [
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
    },
    {
      id: "recessed-contact",
      contentProjectId: "recessed-contact",
      name: "Recessed Contact",
      shortName: "RC",
      status: "Second review",
      phase: "Revision submitted",
      progress: 85,
      summary: "Second-round revision submitted."
    },
    {
      id: "tan-manuscript",
      meetingFocus: true,
      contentProjectId: "tan-manuscript",
      name: "TaN thermal",
      shortName: "TaN",
      status: "Second review",
      phase: "Second-round review",
      progress: 100,
      summary: "TaN thermal is in second-round review."
    },
    {
      id: "negf-phonon",
      contentProjectId: "negf-phonon",
      name: "NEGF phonon–phonon",
      shortName: "NEGF p–p",
      status: "Active",
      phase: "N_{q} = 1 calculation",
      progress: 35,
      summary: "Running the N_{q} = 1 calculation.",
      externalDeck: {
        src: "assets/decks/meeting-2026-10-15/projects/negf-phonon/roadmap/index.html",
        title: "NEGFPy roadmap",
        sourceLabel: "Imported snapshot",
        sourceDate: "5 August 2026",
        slideCount: 10,
        sourceNote: "Imported from the independent NEGFPy roadmap deck dated 5 August 2026. The copied snapshot contains ten screens; use its own arrows or keyboard controls.",
        sourceSha256: "a24cad82b63211816fe1d8167cfbe73e771b1d92d2392f5671f29fe2cfca222c"
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
      id: "phonon-susceptibility",
      contentProjectId: "phonon-susceptibility",
      name: "Phonon susceptibility",
      shortName: "Phonon susc.",
      status: "Under review",
      phase: "Under review",
      progress: 70,
      summary: "The phonon-susceptibility manuscript is under review."
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
        src: "assets/decks/meeting-2026-10-15/projects/non-gaussian-fluctuation-bounds/conference/index.html",
        title: "Universal Bounds on Non-Gaussian Fluctuations",
        sourceLabel: "Prepared paper deck",
        sourceDate: "19 August 2026",
        slideCount: 10,
        sourceNote: "Condensed manuscript-aligned conference deck with full speaker notes. The ten-screen story follows the theorem and Figure 2 from model to exclusion, mechanism support, and experimental decision."
      }
    },
    {
      id: "wte2-phonon-topology",
      meetingFocus: true,
      contentProjectId: "wte2-phonon-topology",
      name: "WTe₂ moiré phonons",
      shortName: "WTe₂",
      status: "Active",
      phase: "Manuscript preparation",
      progress: 70,
      summary: "Bloch character reconstruction and thermal transport; manuscript preparation."
    }
  ]
});
