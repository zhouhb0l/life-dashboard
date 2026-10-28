/* Independent copy of the 25 June 2026 project content. */
window.AUGUST_PROJECT_CONTENT = Object.freeze(
{
  "sourceMeeting": "25 June 2026",
  "copiedOn": "18 August 2026",
  "projects": [
    {
      "id": "nonlocal-sbh",
      "name": "Nonlocal SBH",
      "shortName": "SBH",
      "status": "Peer review",
      "phase": "Under review",
      "progress": 100,
      "summary": "Manuscript is in peer review; status update only.",
      "progressItems": [
        "Manuscript package is under peer review.",
        "No presentation planned for this meeting.",
        "Next action depends on reviewer or editor response."
      ],
      "messageItems": [
        "The manuscript reframes SBH in 2D top contacts as a nonlocal edge response.",
        "The key result is a finite defect-edge interaction length of about 1.1 nm, validated by Ti-MoS2 and Au-MoS2 DFT-NEGF calculations."
      ],
      "showItems": [
        "Status: in peer review.",
        "No technical slide discussion today."
      ],
      "discussionItems": [
        "No discussion needed unless reviewer comments arrive."
      ],
      "focusItems": [
        "Keep as a status-only update.",
        "Do not reopen technical details during the June 25 meeting."
      ],
      "evidenceItems": [
        "Manuscript is in peer review."
      ],
      "nextItems": [
        "Monitor reviewer or editor response.",
        "Prepare response material only when comments arrive."
      ],
      "decisionItems": [
        "None for this meeting."
      ],
      "scienceSlides": [
        {
          "kicker": "Nonlocal SBH | manuscript v5",
          "title": "SBH Variability Is A Nonlocal Edge Problem",
          "lead": "Manuscript v5 argues that Schottky-barrier height in top-contacted 2D semiconductors is not only a local interface parameter; it can be shifted by defects outside the metal-covered region.",
          "points": [
            "Problem: reported MoS2 SBHs span about 0.05-0.95 eV for Au contacts and 0.05-0.46 eV for Ti contacts.",
            "Conventional view: SBH is usually treated as a local interface property shaped by local pinning, local chemistry, or inhomogeneous-barrier averaging.",
            "New question: because top-contact injection is edge-controlled, can a remote defect in the uncovered channel still modify the measured SBH?"
          ],
          "figure": "assets/decks/meeting-2026-10-28/projects/nonlocal-sbh/v5_figure1_schematic.png",
          "caption": "Manuscript v5 Fig. 1: a remote channel defect perturbs the contact edge and shifts the lateral barrier.",
          "layout": "figure-dominant",
          "takeaway": "The manuscript's central move is to treat the measured SBH as an edge observable coupled to the nearby defect environment."
        },
        {
          "kicker": "Nonlocal SBH | model",
          "title": "Model: Defect-To-Edge Response Kernel",
          "lead": "The lateral SBH is written as the conduction-band step across the contact edge, and its defect-induced shift is controlled by the edge-lineup response.",
          "points": [
            "A defect source s_d(x) in the uncovered channel propagates toward the edge and changes the local lineup J.",
            "The response range is lambda_l = sqrt(kappa/C_ch): larger in-plane dielectric response lets deeper channel defects remain coupled to the edge.",
            "The response amplitude depends on the contact through K_e and chi_e: the metal controls how strongly the incoming perturbation is converted into barrier shift."
          ],
          "figures": [
            {
              "src": "assets/decks/meeting-2026-10-28/projects/nonlocal-sbh/v5_figure2_panel_a_range.png",
              "label": "Range"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/nonlocal-sbh/v5_figure2_panel_b_amplitude.png",
              "label": "Amplitude"
            }
          ],
          "caption": "Manuscript v5 Fig. 2: semiconductor electrostatics sets the length scale; contact stiffness tunes the amplitude.",
          "layout": "wide-panel-row",
          "takeaway": "The model separates the roles cleanly: the channel sets how far the defect influence travels, while the contact sets how large the barrier response is."
        },
        {
          "kicker": "Nonlocal SBH | DFT-NEGF validation",
          "title": "Ti-MoS2 And Au-MoS2 Share A 1.1 nm Interaction Length",
          "lead": "DFT-NEGF calculations validate the nonlocal model by moving a single sulfur vacancy from the contact edge into the MoS2 channel.",
          "points": [
            "Both Ti-MoS2 and Au-MoS2 SBH curves are fit with a shared lambda_l = 1.10 nm.",
            "Independent fits give lambda_l^Ti = 1.12 +/- 0.09 nm and lambda_l^Au = 1.09 +/- 0.07 nm.",
            "The model window captures the Ti experimental spread and a substantial part of the Au spread, supporting nonlocal defect-edge coupling as a major source of SBH variability."
          ],
          "figures": [
            {
              "src": "assets/decks/meeting-2026-10-28/projects/nonlocal-sbh/v5_figure3_panel_a_sbh_distance.png",
              "label": "DFT fit"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/nonlocal-sbh/v5_figure3_panel_b_experiment.png",
              "label": "Experiment window"
            }
          ],
          "caption": "Manuscript v5 Fig. 3a,b: DFT-extracted SBH versus defect-edge distance and comparison with experimental SBH ranges.",
          "layout": "wide-panel-row",
          "takeaway": "The common length scale supports the manuscript's key physical claim: range is mainly governed by the MoS2 channel, not by the metal."
        },
        {
          "kicker": "Nonlocal SBH | LDOS mechanism",
          "title": "LDOS Maps Show The Barrier Shift At The Edge",
          "lead": "The atom-projected LDOS maps make the nonlocal mechanism visible: near-edge vacancies raise the lateral conduction-band step, while far-edge vacancies largely recover the low barrier.",
          "points": [
            "Ti-MoS2: pristine Phi_B^lat = 0.16 eV; near-edge defect gives 0.58 eV; far-edge defect gives 0.17 eV.",
            "Au-MoS2: near-edge defect gives Phi_B^lat = 0.68 eV, while large defect-edge separation gives 0.16 eV.",
            "Thus, the same top-contact geometry can exhibit widely different effective SBHs depending on defect position near the injection edge."
          ],
          "figures": [
            {
              "src": "assets/decks/meeting-2026-10-28/projects/nonlocal-sbh/v5_figure3_ti_ldos.png",
              "label": "Ti-MoS2"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/nonlocal-sbh/v5_figure3_au_ldos.png",
              "label": "Au-MoS2"
            }
          ],
          "caption": "Manuscript v5 Fig. 3d-i: LDOS-derived conduction-band edges for pristine, near-edge-defect, and far-edge-defect cases.",
          "layout": "wide-panel-row",
          "takeaway": "Conclusion: the edge environment and spatial defect distribution are design variables for carrier injection in 2D top contacts."
        }
      ]
    },
    {
      "id": "recessed-contact",
      "name": "Recessed Contact",
      "shortName": "Recessed",
      "status": "Active",
      "phase": "D2/D4 relaxed",
      "progress": 85,
      "summary": "D2 and D4 double-vacancy structures have both relaxed successfully.",
      "progressItems": [
        "Single vacancy: done.",
        "D2 double-vacancy structure: converged at ionic step 169.",
        "D4 double-vacancy structure: converged at total step 193 after the step-114 restart."
      ],
      "messageItems": [
        "The D2/D4 local-cut structures are now usable as relaxed double-vacancy references.",
        "This removes the main relaxation blocker before downstream device construction."
      ],
      "showItems": [
        "Before/after structures for D2 and D4.",
        "Final force and convergence evidence.",
        "Next step: build downstream Nanodcal/device inputs from the relaxed structures."
      ],
      "discussionItems": [
        "Should D2 and D4 now become the two double-vacancy structures for the next transmission comparison?"
      ],
      "focusItems": [
        "Use the single-vacancy case as the current baseline.",
        "Use D2 and D4 as the relaxed double-vacancy checkpoints.",
        "Keep the 280-atom local-cut model with 109 free atoms and 171 fixed atoms."
      ],
      "evidenceItems": [
        "Local cut: 280 atoms.",
        "D2 final free-atom max force: 0.01820 eV/A.",
        "D4 final free-atom max force: 0.01685 eV/A."
      ],
      "nextItems": [
        "Convert relaxed D2 and D4 structures into downstream device geometries.",
        "Compare D2/D4 transmission against the single-vacancy baseline."
      ],
      "decisionItems": [
        "Confirm D2 and D4 as the next double-vacancy transmission cases."
      ],
      "scienceSlides": [
        {
          "kicker": "Recessed Contact | main result",
          "title": "Recessed Geometry Suppresses The Near-Interface SBH Spike",
          "lead": "For single sulfur vacancies, the top contact shows a large barrier penalty when the vacancy is close to the injection interface, while the recessed contact stays much flatter.",
          "points": [
            "Top-contact SBH falls from 0.58 eV at D0 to 0.17 eV at D10.",
            "Recessed-contact SBH remains in a narrower 0.20-0.28 eV window across D0-D10.",
            "Defensible claim: recessed contacts reduce extreme SBH variability from edge-proximal vacancies; they are not universally lower at every vacancy position."
          ],
          "figure": "assets/decks/meeting-2026-10-28/projects/recessed-contact/sbh_top_vs_recessed.png",
          "caption": "Interface SBH from fitted CBM steps, using the common D0-D10 sulfur-vacancy position labels.",
          "layout": "figure-dominant",
          "takeaway": "The strongest current result is robustness: recessed contact geometry makes the barrier less sensitive to vacancy position."
        },
        {
          "kicker": "Recessed Contact | LDOS evidence",
          "title": "LDOS/CBM Maps Show The Barrier Geometry Directly",
          "lead": "Representative fitted CBM envelopes make the top-versus-recessed contrast visible in real-space electronic structure.",
          "points": [
            "At D0, the top-contact CBM step is high, while the recessed-contact CBM edge stays closer to the lower-barrier reference.",
            "At D10, both geometries move toward weaker near-interface perturbation, but the top-contact trend remains more position-sensitive.",
            "These panels are useful as mechanism evidence, while the compact SBH plot carries the main quantitative claim."
          ],
          "figures": [
            {
              "src": "assets/decks/meeting-2026-10-28/projects/recessed-contact/top_D0_ldos_cbm_curve.png",
              "label": "Top D0"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/recessed-contact/recessed_D0_ldos_cbm_curve.png",
              "label": "Recessed D0"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/recessed-contact/top_D10_ldos_cbm_curve.png",
              "label": "Top D10"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/recessed-contact/recessed_D10_ldos_cbm_curve.png",
              "label": "Recessed D10"
            }
          ],
          "caption": "Representative LDOS maps with fitted CBM curves from the clean paper-workspace output.",
          "layout": "wide-panel-row",
          "takeaway": "The LDOS view supports a physical picture: moving or recessing the contact changes how strongly the vacancy perturbs the injection barrier."
        },
        {
          "kicker": "Recessed Contact | transport support",
          "title": "Transmission Supports The Same Vacancy-Position Story",
          "lead": "First-pass transmission spectra and onset metrics support the LDOS/SBH interpretation, but this remains the part most tied to convergence and metric choices.",
          "points": [
            "Representative D0/D6/D10 spectra show recessed contacts carry stronger transmission over the positive-energy window.",
            "The 0-1 eV mean-transmission metric is high for recessed D0 and decays with vacancy position; top-contact values remain much smaller in this first-pass metric.",
            "The onset-energy metric separates top and recessed contact response and should be finalized before manuscript-level claims."
          ],
          "figures": [
            {
              "src": "assets/decks/meeting-2026-10-28/projects/recessed-contact/transmission_representative_spectra.png",
              "label": "Spectra"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/recessed-contact/transmission_metrics_vs_defect_location.png",
              "label": "Metrics"
            }
          ],
          "caption": "Transmission comparison from the reproducible paper workspace.",
          "layout": "wide-panel-row",
          "takeaway": "Single-vacancy results are scientifically coherent; the running double-vacancy model will test whether the conclusion survives stronger disorder."
        },
        {
          "kicker": "Recessed Contact | compact model",
          "title": "Compact Model",
          "lead": "POSCAR -> CONTCAR",
          "points": [
            "Compact POSCAR",
            "Relaxed CONTCAR",
            "Ti + MoS2 distorted",
            "Switch model"
          ],
          "figure": "assets/decks/meeting-2026-10-28/projects/recessed-contact/recessed_story_01_compact_distortion.png",
          "caption": "Compact POSCAR and relaxed CONTCAR from the project folder.",
          "layout": "structure-story",
          "takeaway": "Compact reference not usable."
        },
        {
          "kicker": "Recessed Contact | model change",
          "title": "Double Electrode To Local Cut",
          "lead": "large model -> local model -> distortion again",
          "points": [
            "Double-electrode POSCAR",
            "689 atoms: slow",
            "Local cut: 280 atoms",
            "Latest CONTCAR: drift"
          ],
          "figure": "assets/decks/meeting-2026-10-28/projects/recessed-contact/recessed_story_02_double_electrode_local_cut.png",
          "caption": "Double-electrode POSCAR, local-cut POSCAR, and reconstructed latest CONTCAR.",
          "layout": "structure-story",
          "takeaway": "Problem shifts from size to structural drift."
        },
        {
          "kicker": "Recessed Contact | constrained relaxation",
          "title": "Fixed Far Ti / MoS2",
          "lead": "force data after constraints",
          "points": [
            "Fix far Ti + MoS2",
            "Fix top Ti surface",
            "Free force: ~0.10 eV/A",
            "Target: 0.02 eV/A"
          ],
          "figure": "assets/decks/meeting-2026-10-28/projects/recessed-contact/recessed_story_03_fixed_force_profiles.png",
          "caption": "Force tracking from fixed-region relaxation and restarts.",
          "layout": "wide-panel-row",
          "takeaway": "Forces improve, but this branch is not the final physics model."
        },
        {
          "kicker": "Recessed Contact | D2/D4 update",
          "title": "D2 And D4 Structures Relaxed Successfully",
          "lead": "Both local-cut double-vacancy structures now satisfy the 0.02 eV/A force target for free atoms.",
          "points": [
            "D2: converged at ionic step 169; final free-atom max force = 0.01820 eV/A.",
            "D4: step-114 ZBRENT restart converged at total step 193; final free-atom max force = 0.01685 eV/A.",
            "Both structures keep the same local-cut model: 280 atoms, 109 free atoms, and 171 fixed atoms."
          ],
          "figure": "assets/decks/meeting-2026-10-28/projects/recessed-contact/recessed_d2_d4_relaxed_structures.png",
          "caption": "Before/after XZ projections from the D2 and D4 POSCAR/CONTCAR files.",
          "layout": "result-dominant",
          "takeaway": "The relaxation blocker is cleared; the next step is downstream device construction and D2/D4 transport comparison."
        }
      ]
    },
    {
      "id": "tan-manuscript",
      "name": "TaN thermal",
      "shortName": "TaN",
      "status": "Peer review",
      "phase": "Under review",
      "progress": 100,
      "summary": "TaN work is in peer review; status update only.",
      "progressItems": [
        "TaN work is under peer review.",
        "No presentation planned for this meeting.",
        "Next action depends on reviewer or editor response."
      ],
      "messageItems": [
        "Carrier selection.",
        "Mode localization."
      ],
      "showItems": [
        "Status: in peer review.",
        "No technical slide discussion today."
      ],
      "discussionItems": [
        "No discussion needed unless reviewer comments arrive."
      ],
      "focusItems": [
        "Keep as a status-only update.",
        "Do not reopen technical details during the June 25 meeting."
      ],
      "evidenceItems": [
        "Work is in peer review."
      ],
      "nextItems": [
        "Monitor reviewer or editor response.",
        "Prepare response material only when comments arrive."
      ],
      "decisionItems": [
        "None for this meeting."
      ],
      "scienceSlides": [
        {
          "kicker": "TaN thermal | motivation, background, and gap",
          "title": "From High Thermal Conductivity To Coherent Conductance",
          "lead": "Efficient heat dissipation is essential for scaled electronics and high-power technologies; theta-TaN is a rare metallic nitride with reported ultrahigh thermal conductivity.",
          "points": [
            "Why it matters: rapid heat removal is central to thermal management in micro/nanoelectronics, thin films, and high-power devices.",
            "Why theta-TaN: transition-metal nitride robustness plus predicted ultrahigh thermal conductivity; experiments report >500 W m^-1 K^-1, and high-quality samples exceed 1000 W m^-1 K^-1.",
            "Known bulk picture: theta-TaN thermal conductivity is attributed mainly to phonons, enabled by an acoustic-optical gap, acoustic-branch bunching, suppressed anharmonic scattering, and weak electron-phonon scattering.",
            "Open gaps: carrier-resolved coherent conductance through finite regions is unknown; how N vacancies reshape conductance and carrier selection is also unknown."
          ],
          "layout": "motivation-grid",
          "takeaway": "So we calculate carrier-resolved electronic and phononic conductance in pristine and N-vacancy theta-TaN using DFT-NEGF."
        },
        {
          "kicker": "TaN thermal | approach and workflow",
          "title": "Approach: Carrier-Resolved Coherent Conductance",
          "lead": "We compute electronic and phononic heat conductance for pristine and N-vacancy theta-TaN within one area-normalized coherent-transport convention.",
          "methodFlow": [
            {
              "label": "Structure",
              "title": "VASP / PBE",
              "text": "Relax pristine and N-vacancy theta-TaN; prepare concentration-resolved finite transport geometries."
            },
            {
              "label": "Force field",
              "title": "ML Potential",
              "text": "Use the machine-learning-potential workflow to support large vacancy force-constant preparation and validation."
            },
            {
              "label": "Phonons",
              "title": "phonopy",
              "text": "Build second-order force constants, phonon dispersion, DOS, and acoustic-sum-rule-corrected vacancy IFCs."
            },
            {
              "label": "Transport",
              "title": "negfpy",
              "text": "Convert phonopy IFCs to harmonic phonon NEGF and evaluate transmission with hybrid transverse k sampling."
            },
            {
              "label": "Electrons",
              "title": "NanoDCAL NEGF",
              "text": "Compute electronic transmission and conductance from converged PBE-DZP electronic structures."
            }
          ],
          "points": [
            "Carrier channels: electronic transmission from NanoDCAL; phonon transmission from phonopy -> negfpy.",
            "Vacancy series: pristine, N 3.7%, N 12.5%, and N 25%; transport directions include x, y, and z.",
            "Readouts: G/A, defect-induced conductance loss, spectral conductance, k/q maps, and phonon participation ratio."
          ],
          "layout": "method-workflow",
          "takeaway": "Method logic: VASP/ML potential/phonopy prepare the phonon force constants, negfpy converts them into phonon NEGF transport, and NanoDCAL supplies the electronic NEGF channel."
        },
        {
          "kicker": "TaN thermal | result I",
          "title": "Electrons Dominate Coherent Heat Conductance",
          "lead": "At 300 K, electrons provide the larger coherent thermal conductance in every tested geometry and direction.",
          "points": [
            "Pristine electronic G/A: 5.85e9 along x and 6.40e9 W m^-2 K^-1 along z.",
            "Pristine phonon G/A: 1.15e9 along x and 0.872e9 W m^-2 K^-1 along z.",
            "Electrons account for about 84-88% of pristine coherent conductance."
          ],
          "figure": "assets/decks/meeting-2026-10-28/projects/tan/figure1_panel_b_conductance_asset.png",
          "caption": "Carrier-resolved conductance at 300 K shows an electron-dominant coherent hierarchy.",
          "layout": "figure-dominant",
          "takeaway": "The coherent nanoscale limit reverses the intuition from phonon-enabled bulk thermal conductivity."
        },
        {
          "kicker": "TaN thermal | result II",
          "title": "N Vacancies Are Carrier-Selective Filters",
          "lead": "Vacancies suppress both heat-current channels, but the penalty is strongly carrier dependent.",
          "points": [
            "Electronic conductance loss is moderate: about 35-42%.",
            "Phonon conductance loss is much broader and can reach about 93%.",
            "The same N vacancy filters phonon transport far more strongly than electronic transport."
          ],
          "figure": "assets/decks/meeting-2026-10-28/projects/tan/figure1_panel_c_loss_asset.png",
          "caption": "Defect-induced conductance loss separates the moderate electronic response from the much larger phonon response.",
          "layout": "figure-dominant",
          "takeaway": "N vacancies control both the magnitude and the carrier identity of transmitted heat."
        },
        {
          "kicker": "TaN thermal | electronic mechanism",
          "title": "Electronic Mechanism: Near-Fermi Channels Survive",
          "lead": "The electronic heat-current window remains near the Fermi level; vacancies mainly remove the most transparent k channels.",
          "points": [
            "97.7-100.0% of electronic conductance lies within |E - EF| <= 0.2 eV.",
            "Vacancies lower near-Fermi transmission amplitude rather than shifting the window.",
            "High-transmission channels disappear, while finite metallic background transmission survives."
          ],
          "figures": [
            {
              "src": "assets/decks/meeting-2026-10-28/projects/tan/figure2_revised_panel_a_asset.png",
              "label": "Spectral conductance"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/tan/figure2_revised_panel_c_asset.png",
              "label": "k-space channels"
            }
          ],
          "caption": "Figure 2 links electronic spectral conductance to transverse k-space transmission-channel maps.",
          "layout": "figure-dominant",
          "takeaway": "The electron channel is degraded, not destroyed: that is why its conductance loss is moderate."
        },
        {
          "kicker": "TaN thermal | phonon mechanism",
          "title": "Phonon Mechanism: Spectral Filtering And Localization",
          "lead": "The phonon channel loses extended mid- and high-frequency modes, which explains the larger conductance penalty.",
          "points": [
            "Residual phonon conductance shifts toward lower frequencies after vacancy formation.",
            "Pristine acoustic modes are extended: mean PR = 0.517 with no sampled q point below PR = 0.40.",
            "For modes above 450 cm^-1, localized-mode fraction rises from 0.5% to 20.5%, 50.8%, and 71.9%."
          ],
          "figures": [
            {
              "src": "assets/decks/meeting-2026-10-28/projects/tan/figure2_revised_panel_b_asset.png",
              "label": "Phonon spectrum"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/tan/figure2_revised_panel_d_asset.png",
              "label": "Participation ratio"
            }
          ],
          "caption": "Participation-ratio maps show broad low-PR regions after vacancy formation, especially away from Gamma.",
          "layout": "figure-dominant",
          "takeaway": "Vacancies remove the phonon channels that would otherwise transmit heat efficiently."
        },
        {
          "kicker": "TaN thermal | robustness and conclusion",
          "title": "Robust Carrier Selection Near Room Temperature",
          "lead": "The electron-dominant coherent hierarchy is stable across the 250-350 K thermal-management window.",
          "points": [
            "Electron G/A remains larger than phonon G/A for x and z transport.",
            "This coherent limit describes short regions, interfaces, and defective layers, not bulk diffusive conductivity.",
            "Vacancy engineering can tune both heat-flow magnitude and carrier identity."
          ],
          "figures": [
            {
              "src": "assets/decks/meeting-2026-10-28/projects/tan/figure3_conductance_pristine_slide.png",
              "label": "Pristine"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/tan/figure3_conductance_N3p7pct_slide.png",
              "label": "N 3.7%"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/tan/figure3_conductance_N12p5pct_slide.png",
              "label": "N 12.5%"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/tan/figure3_conductance_N25pct_slide.png",
              "label": "N 25%"
            }
          ],
          "caption": "Figure 3 confirms that the electron-dominant coherent hierarchy is stable from 250 to 350 K.",
          "layout": "wide-panel-row",
          "takeaway": "N vacancies act as carrier-selective filters of coherent heat conductance in metallic theta-TaN."
        }
      ]
    },
    {
      "id": "negf-phonon",
      "name": "NEGF phonon-phonon interaction",
      "shortName": "NEGF p-p",
      "status": "Active",
      "phase": "Code development",
      "progress": 35,
      "summary": "Harmonic IFC-NEGF baseline is working; anharmonic self-energy development is next.",
      "progressItems": [
        "Harmonic IFC-based phonon NEGF workflow is available in negfpy.",
        "Legacy Fortran benchmark matching is documented.",
        "Next milestone: add phonon-phonon self-energies and validate on a toy case."
      ],
      "messageItems": [
        "This is a code-development project with a validated harmonic baseline.",
        "The immediate science target is inelastic phonon transport: decoherence, linewidth broadening, frequency shift, and ballistic-to-diffusive crossover."
      ],
      "showItems": [
        "Harmonic NEGF benchmark against legacy Fortran.",
        "Current material-scale outputs from the IFC workflow.",
        "Anharmonic NEGF implementation path and validation checklist."
      ],
      "discussionItems": [
        "What is the best minimal validation case before trying a realistic material?"
      ],
      "focusItems": [
        "Development target is phonon-phonon interaction inside the NEGF workflow.",
        "A minimal validation case is more important than a full material-scale run now.",
        "The first working version should have a clear benchmark."
      ],
      "evidenceItems": [
        "Current inputs are theory notes and existing NEGF code structure.",
        "Validation should start from a small system where expected behavior is easy to inspect.",
        "Only after validation should the code move to material-scale simulations."
      ],
      "nextItems": [
        "Choose the simplest test system.",
        "Define the validation criterion for the first implementation checkpoint."
      ],
      "decisionItems": [
        "Agree on the first benchmark and what counts as a passing result."
      ],
      "scienceSlides": [
        {
          "kicker": "NEGF phonon-phonon | current result",
          "title": "Harmonic IFC-NEGF Baseline Is Now Usable",
          "lead": "Before adding phonon-phonon interaction, the code has a working harmonic transport baseline from force constants to phonon transmission and thermal conductance.",
          "points": [
            "Existing workflow runs transmission, DOS, dispersion, and FCS directly from IFC files.",
            "Study mode records input snapshots, manifests, reports, config hashes, IFC hashes, and run provenance.",
            "The legacy graphene benchmark has a documented overlay showing agreement between Python negfpy settings and the old Fortran reference."
          ],
          "figure": "assets/decks/meeting-2026-10-28/projects/negf-phonon/Tw_benchmark_match.png",
          "caption": "Benchmark note: mass normalization and numerical symmetry settings recover the legacy Fortran transmission reference.",
          "layout": "figure-dominant",
          "takeaway": "This gives a stable base: the next physics can be added on top of a checked harmonic NEGF engine."
        },
        {
          "kicker": "NEGF phonon-phonon | material workflow",
          "title": "Material-Scale Harmonic Outputs Are Already Available",
          "lead": "The current code can already generate thermal conductance curves for multiple materials and directions, which makes it suitable for later anharmonic comparison.",
          "points": [
            "The same IFC runner has produced graphene, borophene, phosphorene, TaN, stanene, and silicon examples.",
            "TaN direction-resolved conductance outputs are available and match the broader TaN thermal project needs.",
            "These harmonic curves will become the reference limit when phonon-phonon self-energies are added."
          ],
          "figures": [
            {
              "src": "assets/decks/meeting-2026-10-28/projects/negf-phonon/thermal_conductance_multi_material.png",
              "label": "Multi-material"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/negf-phonon/tan_thermal_conductance_xyz.png",
              "label": "TaN x/y/z"
            }
          ],
          "caption": "Application-scale outputs from the current harmonic IFC-NEGF workflow.",
          "layout": "wide-panel-row",
          "takeaway": "The project is no longer only a code skeleton; it has reusable harmonic material results."
        },
        {
          "kicker": "NEGF phonon-phonon | next physics",
          "title": "Anharmonic Extension: Add Phonon-Phonon Self-Energies",
          "lead": "The planned extension replaces purely coherent harmonic transport with a self-consistent inelastic channel inside the NEGF Green's function.",
          "methodFlow": [
            {
              "label": "Baseline",
              "title": "Harmonic NEGF",
              "text": "Use existing IFC K matrix, lead self-energies, and ballistic transmission as the zero-interaction limit."
            },
            {
              "label": "Input",
              "title": "Third-order IFCs",
              "text": "Introduce Phi^(3) as the source of phonon-phonon scattering."
            },
            {
              "label": "SCBA",
              "title": "Sigma_pp",
              "text": "Construct retarded, lesser, and greater phonon-phonon self-energies."
            },
            {
              "label": "Solve",
              "title": "Self-consistency",
              "text": "Iterate frequency convolution and Green's functions until current and spectra are stable."
            },
            {
              "label": "Validate",
              "title": "Crossover",
              "text": "Recover ballistic limit as Phi^(3)->0; check broadening, shifts, and current conservation."
            }
          ],
          "points": [
            "Target Green's function: Gr = [(omega+i eta)^2 I - K - SigmaL - SigmaR - Sigma_pp]^-1.",
            "First validation should be a 1D or reduced model before silicon, graphene, TaN, interfaces, or defects.",
            "Main numerical bottlenecks are frequency convolution, self-consistent iteration, k batching, and parallel frequency loops."
          ],
          "layout": "method-workflow",
          "takeaway": "The most important next result is a minimal anharmonic validation, not a large material run."
        }
      ]
    },
    {
      "id": "one-d-chain",
      "name": "Layered material",
      "shortName": "Layered",
      "status": "Active",
      "phase": "TaSe2 CDW",
      "progress": 62,
      "summary": "TaSe2 CDW calculation added.",
      "progressItems": [
        "Mo2S3: done.",
        "TaSe2: base electronic structure done; finite-q imaginary phonons and K-CDW relaxation evidence added.",
        "Other three candidate structures: pending."
      ],
      "messageItems": [
        "This project is currently a layered-material screening track.",
        "The new TaSe2 result changes the layered reference from a static metallic baseline into a CDW-instability case.",
        "Three pending cases determine whether the trend is general or TaSe2-specific."
      ],
      "showItems": [
        "Mo2S3: structural and electronic results.",
        "TaSe2: metallic band/DOS plus finite-q imaginary phonons.",
        "TaSe2 K-CDW: dense relaxation lowers energy by -28.964 meV/TaSe2.",
        "Three remaining candidates: pending status and expected completion path."
      ],
      "discussionItems": [
        "Should TaSe2 now become a CDW validation story, or stay as one checkpoint inside the broader layered-material screening?"
      ],
      "focusItems": [
        "Mo2S3 calculation is done.",
        "TaSe2 calculation is done.",
        "Three remaining candidate structures are pending."
      ],
      "evidenceItems": [
        "Completed structures can already be compared for relaxation quality and basic trends.",
        "Pending cases are needed before claiming a material-family trend.",
        "The next useful output is a compact status table for all five structures."
      ],
      "nextItems": [
        "Run phonons of the relaxed K-CDW cell.",
        "Monitor the pending structures.",
        "Compare completed structures before deciding whether to narrow the material family."
      ],
      "decisionItems": [
        "Decide whether the next meeting should emphasize TaSe2 CDW physics or the broader screening criterion."
      ],
      "scienceSlides": [
        {
          "kicker": "Layered material | results snapshot",
          "title": "Completed Results: Mo2S3 And TaSe2",
          "lead": "For this meeting, show only the completed results: Mo2S3 as the relaxed quasi-1D candidate and TaSe2 as the completed layered-metal reference.",
          "points": [
            "Mo2S3: structural assignment, relaxation, dispersion, and DOS are available; final maximum force about 0.0087 eV/A.",
            "TaSe2: relaxation, static SCF, band structure, and DOS are available; final maximum force about 0.00018 eV/A.",
            "FePS3, Nb2Se3, and NbSe2 remain pending, so they are not used for scientific comparison today."
          ],
          "figures": [
            {
              "src": "assets/decks/meeting-2026-10-28/projects/layered/1Mo2S3_ab_crop.png",
              "label": "Mo2S3"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/layered/5TaSe2_ab_crop.png",
              "label": "TaSe2"
            }
          ],
          "caption": "Completed structures currently available.",
          "layout": "figure-dominant",
          "takeaway": "The current result set supports a two-material comparison: quasi-1D Mo2S3 versus layered metallic TaSe2."
        },
        {
          "kicker": "Layered material | Mo2S3 structural verification",
          "title": "Observed Mo2S3 Pattern Matches The Structural Model",
          "lead": "Before properties, verify the observed chain-like contrast against the Mo2S3 structural model.",
          "points": [
            "Atomic-pattern check: the observed image and the structural model show the same repeated Mo-S motif and chain ordering.",
            "Length-scale check: the model reference length is about 1.93 nm, close to the 2 nm experimental scale-bar length.",
            "Mo-count check: over this matched length scale, the observed Mo count matches the model."
          ],
          "figures": [
            {
              "src": "assets/decks/meeting-2026-10-28/projects/layered/Mo2S3_experimental_observation_upscaled.png",
              "label": "Experiment | 2 nm"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/layered/Mo2S3_calculated_pattern_crop.png",
              "label": "Model motif | ~1.93 nm"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/layered/Mo2S3_periodic_model_crop.png",
              "label": "Model overview"
            }
          ],
          "caption": "Structural assignment is checked by comparing the experimental image with the model pattern, using the repeated motif and Mo count over nearly the same length scale.",
          "layout": "wide-panel-row",
          "takeaway": "The experimental image validates the structural model used for the Mo2S3 calculations."
        },
        {
          "kicker": "Layered material | Mo2S3 result",
          "title": "Mo2S3: Relaxed Quasi-1D Candidate",
          "lead": "Mo2S3 is the clearest completed chain-like candidate in the current set.",
          "points": [
            "Relaxation converged cleanly with final TOTEN = -75.63704092 eV.",
            "The CIF screening identifies monoclinic Mo2S3 as a likely quasi-1D material with short Mo-Mo contacts near 2.85 A.",
            "Result to keep: Mo2S3 is structurally ready for follow-up electronic, phonon, or strain calculations."
          ],
          "figures": [
            {
              "src": "assets/decks/meeting-2026-10-28/projects/layered/1Mo2S3_ab_crop.png",
              "label": "ab"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/layered/1Mo2S3_ac_crop.png",
              "label": "ac"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/layered/1Mo2S3_bc_crop.png",
              "label": "bc"
            }
          ],
          "caption": "Relaxed Mo2S3 structure projections from the current VASP result.",
          "layout": "figure-dominant",
          "takeaway": "Mo2S3 is ready as the main quasi-1D target for the next round of physical-property calculations."
        },
        {
          "kicker": "Layered material | Mo2S3 electronic structure",
          "title": "Mo2S3: Dispersion And DOS Are Ready",
          "lead": "The electronic-structure result is now available for Mo2S3, using the SCF Fermi level for energy alignment.",
          "points": [
            "Representative continuous band path: Gamma-Y-H-C-E-M1-A-X, aligned to E_F = 9.1954 eV.",
            "Bands approach and cross the Fermi level along the representative path.",
            "The two-plane Brillouin-zone path diagram links the plotted k-axis labels to reciprocal-space directions."
          ],
          "figures": [
            {
              "src": "assets/decks/meeting-2026-10-28/projects/layered/1Mo2S3_bandstructure.png",
              "label": "Band"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/layered/1Mo2S3_dos.png",
              "label": "DOS"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/layered/1Mo2S3_brillouin_path.png",
              "label": "BZ path"
            }
          ],
          "caption": "Mo2S3 band dispersion, total DOS, and two-plane Brillouin-zone path for Gamma-Y-H-C-E-M1-A-X; band and DOS use the SCF Fermi-level alignment.",
          "layout": "wide-panel-row",
          "takeaway": "Mo2S3 structural and electronic evidence is ready."
        },
        {
          "kicker": "Layered material | TaSe2 result",
          "title": "TaSe2: Metallic Band Structure And DOS",
          "lead": "TaSe2 is the completed layered reference, with band and DOS plots aligned to the static-SCF Fermi level.",
          "points": [
            "Band path: Gamma-M-K-Gamma-A-L-H-A with 90 band k-points and 16 bands.",
            "Band 12 crosses the Fermi level in this calculation.",
            "The two-plane Brillouin-zone path diagram clarifies the in-plane and out-of-plane directions used in the plot."
          ],
          "figures": [
            {
              "src": "assets/decks/meeting-2026-10-28/projects/layered/5TaSe2_bandstructure.png",
              "label": "Band"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/layered/5TaSe2_dos.png",
              "label": "DOS"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/layered/5TaSe2_brillouin_path.png",
              "label": "BZ path"
            }
          ],
          "caption": "TaSe2 electronic structure and two-plane Brillouin-zone path for Gamma-M-K-Gamma-A-L-H-A.",
          "layout": "wide-panel-row",
          "takeaway": "TaSe2 provides the metallic layered baseline for comparing against the quasi-1D candidate."
        },
        {
          "kicker": "Layered material | TaSe2 CDW check",
          "title": "TaSe2: Finite-q Soft Modes",
          "lead": "Phonon map",
          "points": [
            "K: -1.5015 THz",
            "qz=0: -1.793 THz",
            "3D q: -2.967 THz"
          ],
          "figures": [
            {
              "src": "assets/decks/meeting-2026-10-28/projects/layered/tase2_cdw_phonon_dispersion.png",
              "label": "Phonon dispersion"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/layered/tase2_cdw_q_scan.png",
              "label": "q scan"
            }
          ],
          "caption": "Finite-q imaginary modes",
          "layout": "wide-panel-row",
          "takeaway": "CDW candidate"
        },
        {
          "kicker": "Layered material | TaSe2 q to supercell",
          "title": "q Points To Supercells",
          "lead": "We use the compact K phase0 supercell for the dense-k CDW relaxation.",
          "table": {
            "columns": [
              "q / soft mode",
              "supercell vector",
              "atoms",
              "status"
            ],
            "rows": [
              {
                "cells": [
                  "K\n(1/3, 1/3, 0)\n-1.501 THz",
                  "[-1, 1, 0]\n[-1, -2, 0]\n[0, 0, 1]",
                  "9",
                  "used\ndense-k relaxed"
                ],
                "highlight": true
              },
              {
                "cells": [
                  "q3d\n(1/4, 3/4, 3/8)\n-2.964 THz",
                  "[0, -1, 2]\n[-4, 0, 0]\n[-1, -2, 2]",
                  "24",
                  "support\nGamma relax"
                ]
              },
              {
                "cells": [
                  "q2d\n(3/11, 5/11, 0)\n-1.792 THz",
                  "[-1, 5, 0]\n[-1, -6, 0]\n[0, 0, 1]",
                  "33",
                  "seeds ready"
                ]
              },
              {
                "cells": [
                  "q2d\n(2/7, 3/7, 0)\n-1.786 THz",
                  "[2, 1, 0]\n[-1, 3, 0]\n[0, 0, 1]",
                  "21",
                  "seeds ready"
                ]
              },
              {
                "cells": [
                  "q2d\n(1/4, 1/2, 0)\n-1.742 THz",
                  "[-2, -1, 0]\n[0, -2, 0]\n[0, 0, 1]",
                  "12",
                  "seeds ready"
                ]
              }
            ]
          },
          "layout": "table-full"
        },
        {
          "kicker": "Layered material | TaSe2 decisive K-CDW",
          "title": "K-CDW Energy Lowering",
          "lead": "The 9-atom K phase0 supercell relaxes into a lower-energy CDW phase.",
          "figure": "assets/decks/meeting-2026-10-28/projects/layered/tase2_cdw_k_cdw_atomic_displacement.png",
          "caption": "Atomic displacement panels replotted from POSCAR and CONTCAR coordinates.",
          "metrics": [
            {
              "label": "Using",
              "value": "K phase0\n9 atoms",
              "note": "q = (1/3, 1/3, 0)"
            },
            {
              "label": "Vector",
              "value": "[-1, 1, 0]\n[-1, -2, 0]\n[0, 0, 1]"
            },
            {
              "label": "Conclusion",
              "value": "-28.964 meV/TaSe2",
              "note": "lower than parent; CDW stable"
            }
          ],
          "layout": "displacement-evidence"
        }
      ]
    },
    {
      "id": "wte2-phonon-topology",
      "name": "WTe2 phonon topology",
      "shortName": "WTe2 topology",
      "status": "Active",
      "phase": "Topology calculation",
      "progress": 70,
      "summary": "WTe2 topology proof set prepared for discussion.",
      "progressItems": [
        "Non-twisted IFC workflow",
        "Bulk parity check",
        "Open-boundary modes",
        "NEGF signal"
      ],
      "messageItems": [
        "Gap 1: corner modes",
        "Gap 2: corner / edge-weighted modes",
        "Q_band = 1/2"
      ],
      "showItems": [
        "Material / PRB",
        "Dispersion / Q",
        "Open boundary / NEGF",
        "Transport / twist"
      ],
      "discussionItems": [
        "Gap 2 wording: edge, corner, or edge-weighted?",
        "Wilson-loop / Wannier-center check?"
      ],
      "focusItems": [
        "Parity invariant",
        "Boundary modes",
        "Transport spike"
      ],
      "evidenceItems": [
        "Gap 1: 3.015-3.685 THz",
        "Gap 2: 5.539-5.685 THz",
        "Q_band: 1/2 for both gaps",
        "N=12 flake: 864 atoms, 2592 DOF"
      ],
      "nextItems": [
        "Topology convention check",
        "Finite-size check",
        "Realistic leads"
      ],
      "decisionItems": [
        "Gap 2 main claim",
        "Gap 1 extra observation"
      ],
      "scienceSlides": [
        {
          "kicker": "WTe2 phonon topology | material",
          "title": "WTe2 And Prior Work",
          "lead": "Non-twisted WTe2 IFC",
          "points": [
            "AB-WTe2",
            "Prior PRB: MoTe2 / WTe2",
            "Fractional quadrupole Q",
            "Nanodisk corner states",
            "NEGF transmission peaks",
            "Corner-state channel"
          ],
          "figure": "assets/decks/meeting-2026-10-28/projects/wte2/wte2_material_prb_professional.png",
          "figureLabel": "Material / PRB",
          "caption": "Atomic structure; prior PRB message",
          "layout": "result-dominant",
          "takeaway": "PRB -> WTe2 topology"
        },
        {
          "kicker": "WTe2 phonon topology | Q",
          "title": "Dispersion, Gaps, Q",
          "lead": "Bulk gaps",
          "points": [
            "Gap 1: 3.015-3.685 THz",
            "Gap 2: 5.539-5.685 THz",
            "Q_band = 1/2",
            "Parity = inversion eigenvalue",
            "Even / odd mode label",
            "TRIM: Gamma and M",
            "Bands below gap",
            "Symmetry-quantized product",
            "Robust gap indicator"
          ],
          "figures": [
            {
              "src": "assets/decks/meeting-2026-10-28/projects/wte2/wte2_nontwisted_bulk_bands.png",
              "label": "Bulk bands"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/wte2/wte2_nontwisted_finite_spectrum_N12.png",
              "label": "Open flake"
            }
          ],
          "caption": "Bulk gaps; finite spectrum",
          "layout": "wte2-evidence",
          "takeaway": "Parity product -> topological Q"
        },
        {
          "kicker": "WTe2 phonon topology | open boundary",
          "title": "Our Calculation: Modes And NEGF",
          "lead": "Measure localization",
          "points": [
            "Open flake: N=12",
            "2592 DOF",
            "Corner / edge / bulk weight",
            "Gap 1: corner pair",
            "Gap 2: edge-weighted",
            "NEGF peak match"
          ],
          "figures": [
            {
              "src": "assets/decks/meeting-2026-10-28/projects/wte2/wte2_gap1_high_map.png",
              "label": "Gap 1 map"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/wte2/wte2_gap1_high_negf.png",
              "label": "Gap 1 NEGF"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/wte2/wte2_gap2_high_map.png",
              "label": "Gap 2 map"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/wte2/wte2_gap2_high_negf.png",
              "label": "Gap 2 NEGF"
            }
          ],
          "caption": "Mode maps; transmission spectra",
          "layout": "wte2-gap",
          "takeaway": "Mode weight and NEGF peaks agree"
        },
        {
          "kicker": "WTe2 phonon topology | twist transport",
          "title": "Pristine And Twisted WTe2",
          "lead": "Twist angle and normalized transport",
          "points": [
            "Twist angle: ~21.8 deg",
            "Transmission / area",
            "Area = width x WTe2 thickness",
            "Vacuum excluded",
            "Bandstructure",
            "Transport contrast"
          ],
          "figures": [
            {
              "src": "assets/decks/meeting-2026-10-28/projects/wte2/wte2_transmission_per_area_pristine_twisted.png",
              "alt": "Area-normalized pristine and twisted WTe2 transmission"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/wte2/wte2_twisted_structure_angle.png",
              "alt": "Twisted WTe2 structure with twist angle"
            },
            {
              "src": "assets/decks/meeting-2026-10-28/projects/wte2/wte2_twisted_dispersion.png",
              "alt": "Twisted WTe2 phonon bandstructure"
            }
          ],
          "caption": "",
          "layout": "wide-panel-row",
          "takeaway": "Twist changes transport per area"
        }
      ]
    },
    {
      "id": "phonon-susceptibility",
      "name": "Phonon susceptibility",
      "shortName": "Phonon susc.",
      "status": "Active",
      "phase": "Paper figures",
      "progress": 70,
      "summary": "Manuscript message and three-example figure story",
      "progressItems": [
        "Transmission-loss susceptibility framework is organized around the current manuscript.",
        "Evidence sequence: 1D toy model, graphene C-13 mass disorder, graphene vacancy disorder.",
        "Claims separate prediction in the independent-defect regime and diagnostic residuals."
      ],
      "messageItems": [
        "One defect becomes a transmission-loss susceptibility for finite defect concentrations.",
        "The same map separates resilient and vulnerable phonon modes."
      ],
      "showItems": [
        "Main message.",
        "Three manuscript examples."
      ],
      "discussionItems": [
        "Does this three-example spine sell the paper clearly?"
      ],
      "focusItems": [
        "Pristine Green's function plus specified local perturbation.",
        "\\(\\chi_{\\mathcal T}(\\omega,k)\\) as the central descriptor.",
        "Common mass-weighted Hilbert space for mass, IFC, and vacancy perturbations."
      ],
      "evidenceItems": [
        "Figure 1: 1D mass and IFC disorder.",
        "Figure 2: graphene C-13 mass disorder.",
        "Figure 3: graphene vacancy disorder."
      ],
      "nextItems": [
        "Keep the main manuscript focused on the three examples.",
        "Move TaN or cross-system summary outside the core story unless needed."
      ],
      "decisionItems": [
        "Confirm paper spine: method, 1D, C-13, vacancy."
      ],
      "scienceSlides": [
        {
          "kicker": "Phonon susceptibility | main message",
          "title": "Main Message",
          "lead": "A single defect can be turned into a transmission-loss susceptibility that predicts how finite defect concentrations suppress phonon transport.",
          "points": [
            "Single defect -> \\(\\chi_{\\mathcal T}(\\omega,k)\\)",
            "Finite-concentration suppression",
            "Resilient phonon modes",
            "Vulnerable phonon modes",
            "Prediction",
            "Diagnostic residual",
            "Pair interaction",
            "Vacancy reconstruction"
          ],
          "layout": "motivation-grid",
          "takeaway": "When one-defect response fails, the discrepancy identifies missing physics."
        },
        {
          "kicker": "Phonon susceptibility | examples",
          "title": "Three Examples",
          "lead": "Each example tests a different part of the same descriptor.",
          "points": [
            "1D mass disorder: algebra",
            "1D IFC disorder: force constants",
            "Graphene C-13: exact mass \\(V_d\\)",
            "Graphene vacancy: ghost embedding"
          ],
          "layout": "motivation-grid",
          "takeaway": "Same descriptor, increasing physics."
        },
        {
          "kicker": "Phonon susceptibility | Figure 1",
          "title": "1D Toy: Mass And IFC Disorder",
          "lead": "Controlled chain tests the hierarchy before materials complications.",
          "points": [
            "Mass disorder",
            "IFC disorder",
            "One-defect exactness",
            "Pair correction",
            "Conductance trend"
          ],
          "figure": "assets/decks/meeting-2026-10-28/projects/phonon-susceptibility/fig1_1d_validation_2x2.svg",
          "caption": "Controlled chain: source susceptibility, loss prediction, conductance trend.",
          "layout": "result-dominant",
          "takeaway": "One-defect susceptibility captures leading loss; pair correction improves finite-concentration conductance."
        },
        {
          "kicker": "Phonon susceptibility | Figure 2",
          "title": "Graphene C-13 Mass Disorder",
          "lead": "C-13 is the clean real-material benchmark because \\(V_d\\) comes from mass change and pristine IFCs.",
          "points": [
            "Updated manuscript data",
            "PL40 ensemble",
            "One-C13 T-matrix",
            "Projected \\(k_x,k_y\\)",
            "PL40 spectrum"
          ],
          "figure": "assets/decks/meeting-2026-10-28/projects/phonon-susceptibility/fig2_graphene_c13_mass_benchmark_2x2.svg",
          "caption": "One-C13 source, k-resolved response, random finite-device benchmark.",
          "layout": "result-dominant",
          "takeaway": "Mass disorder validates the algebra in a material system."
        },
        {
          "kicker": "Phonon susceptibility | Figure 3",
          "title": "Graphene Vacancy Susceptibility",
          "lead": "Vacancy disorder tests common-space embedding and reconstructed IFC perturbation.",
          "points": [
            "Ghost-atom embedding",
            "Reconstructed \\(V_d\\)",
            "Acoustic / optical \\(k\\)-maps",
            "Principal-layer comparison",
            "Residual diagnosis"
          ],
          "figure": "assets/decks/meeting-2026-10-28/projects/phonon-susceptibility/fig3_graphene_vacancy_susceptibility_2x2.svg",
          "caption": "Frequency and momentum vulnerability for graphene vacancy.",
          "layout": "result-dominant",
          "takeaway": "The selling point is channel selectivity with consistent principal-layer comparison."
        }
      ]
    }
  ]
}
);
