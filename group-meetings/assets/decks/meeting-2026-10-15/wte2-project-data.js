window.WTE2_PROJECT_20261015 = {
  "id": "wte2-phonon-topology",
  "name": "WTe₂",
  "shortName": "WTe₂",
  "presentationStyle": "conference",
  "sourceLabel": "Current manuscript",
  "sourceValue": "V2 · 11 Oct 2026",
  "notes": "Source: V2 manuscript and supporting information, 11 October 2026, with V1 Figure 5a-b on slide 5. Main presentation: slides 1-11. Slides 12-13 are backup.",
  "scienceSlides": [
    {
      "kicker": "Structure and zone folding",
      "title": "Twisting creates a moiré cell and a smaller Brillouin zone",
      "lead": "Real-space structure and reciprocal-space geometry at 21.8°.",
      "points": [
        "(a) Rotating the layers by 21.8° creates the dashed moiré unit cell.",
        "(b) Maps show the reported local interlayer distance and atomic displacement during relaxation.",
        "(c) Seven primitive-cell wavevectors fold onto each moiré wavevector."
      ],
      "figures": [
        {
          "src": "assets/decks/meeting-2026-10-15/projects/wte2-2026-10-15/fig1.png",
          "viewport": [
            12,
            12,
            1233,
            510
          ],
          "imageSize": [
            1257,
            915
          ],
          "label": "Structure, relaxation and Brillouin-zone folding",
          "alt": "Manuscript Figure 1, Structure, relaxation and Brillouin-zone folding",
          "annotations": [
            {
              "x": 78,
              "y": 301,
              "text": "Local interlayer distance"
            },
            {
              "x": 337,
              "y": 282,
              "text": "Atomic displacement"
            },
            {
              "x": 337,
              "y": 302,
              "text": "during relaxation"
            }
          ]
        }
      ],
      "layout": "wte2-panels",
      "takeaway": "A larger real-space cell produces a smaller Brillouin zone and folds the phonon branches.",
      "caption": "Figure 1a–c · relaxed structure and reciprocal-space construction",
      "notes": "Source: manuscript V2, 11 October 2026. Structure and geometry, 60 seconds. Panel a shows the twisted structure and dashed moiré cell. Panel b is labeled according to the manuscript caption; its interlayer-distance definition and units remain unverified. The available twisted POSCAR gives a mean W-plane separation of 7.547 angstrom and a facing-Te gap of 3.953 angstrom, neither matching the plotted 9.5–11.0 scale. Do not interpret that scale quantitatively until the plotting source is checked. Panel c relates the two rotated primitive Brillouin zones to the smaller moiré zone. Eigenvector projection and spectral weights are explained on the following slide."
    },
    {
      "kicker": "Bloch projection",
      "title": "Folded modes redistribute their Bloch character",
      "lead": "W_{b} measures the weight of a phonon in a chosen translational phase sector.",
      "points": [
        "Σ_{b} W_{b} = 1 for a normalized eigenvector.",
        "Weight near one identifies a dominant Bloch sector.",
        "Selected folded branches spread their weight across sectors and mix the layer vibrations."
      ],
      "figures": [
        {
          "src": "assets/decks/meeting-2026-10-15/projects/wte2-2026-10-15/fig1.png",
          "viewport": [
            12,
            535,
            592,
            380
          ],
          "imageSize": [
            1257,
            915
          ],
          "label": "Bloch spectral weight",
          "alt": "Manuscript Figure 1, Bloch spectral weight",
          "keyDescription": "Color shows the contribution from the reference Bloch sector (0,0).",
          "colorKey": [
            [
              "Red",
              "W near 1",
              "Mostly (0,0) sector"
            ],
            [
              "Dark purple",
              "W near 0",
              "Mostly other sectors"
            ]
          ]
        },
        {
          "src": "assets/decks/meeting-2026-10-15/projects/wte2-2026-10-15/fig1.png",
          "viewport": [
            604,
            535,
            641,
            380
          ],
          "imageSize": [
            1257,
            915
          ],
          "label": "Layer character",
          "alt": "Manuscript Figure 1, Layer character",
          "keyDescription": "P = (Wtop - Wbottom) / (Wtop + Wbottom)",
          "colorKey": [
            [
              "Red",
              "P near +1",
              "Mainly top layer"
            ],
            [
              "White / pale",
              "P near 0",
              "Similar in both layers"
            ],
            [
              "Blue",
              "P near -1",
              "Mainly bottom layer"
            ]
          ]
        }
      ],
      "layout": "wte2-panels",
      "takeaway": "The projection quantifies the change in translational phase character.",
      "caption": "Figure 1d–e · sector weight and layer polarization of the twisted bilayer",
      "notes": "Source: manuscript V2, 11 October 2026. Projection, 60 seconds. The left panel reports the weight of the reference primitive-cell Bloch sector. The right panel gives (W_top−W_bottom)/(W_top+W_bottom). A small weight in one sector alone does not prove localization. Use the full sector distribution and the group-velocity comparison to interpret mode hybridization."
    },
    {
      "kicker": "Results · Propagation",
      "title": "Bloch-character reconstruction accompanies lower velocity",
      "lead": "Dispersion and group velocity reveal a selective response to twisting.",
      "points": [
        "Top row: untwisted bilayer. Bottom row: 21.8° twist.",
        "Low-frequency modes retain strong Bloch character and comparatively high velocities.",
        "Around 2–3 THz, sector weight redistributes and velocities decrease."
      ],
      "figures": [
        {
          "src": "assets/decks/meeting-2026-10-15/projects/wte2-2026-10-15/fig2.png",
          "viewport": [
            12,
            320,
            1246,
            808
          ],
          "imageSize": [
            1258,
            1128
          ],
          "label": "Dispersion and velocity · 0° above, 21.8° below",
          "alt": "Manuscript Figure 2, Dispersion and velocity · 0° above, 21.8° below"
        }
      ],
      "layout": "wte2-result",
      "takeaway": "The largest propagation changes coincide with the Bloch-sector reconstruction.",
      "caption": "Figure 2b–e · dispersion and group velocity colored by W_(0,0)",
      "notes": "Source: manuscript V2, 11 October 2026. Dispersion and velocity, 100 seconds. Read red as high W_(0,0) and blue as low W_(0,0). First compare the dispersions in the left column, then the velocity maps in the right column. The evidence supports the manuscript interpretation that folding and hybridization lower propagation velocities in selected modes around and above 2 THz. Low weight in one reference sector must be interpreted with the full seven-sector projection and is not a standalone universal velocity predictor."
    },
    {
      "kicker": "Results · Diffusive transport",
      "title": "The conductivity deficit develops above about 2 THz",
      "lead": "At 300 K, κ decreases from 29.13 to 24.51 W m⁻¹ K⁻¹, a 15.9% reduction.",
      "points": [
        "BTE includes three-phonon and four-phonon scattering.",
        "The cumulative conductivities reach similar values near 2 THz.",
        "The untwisted structure gains more conductivity between roughly 2 and 3 THz."
      ],
      "figures": [
        {
          "src": "assets/decks/meeting-2026-10-15/projects/wte2-2026-10-15/fig4.png",
          "viewport": [
            10,
            0,
            1264,
            622
          ],
          "imageSize": [
            1286,
            1573
          ],
          "label": "Cumulative conductivity · 300 K",
          "alt": "Manuscript Figure 4, Cumulative conductivity · 300 K"
        }
      ],
      "layout": "wte2-result",
      "takeaway": "The frequency range of the conductivity loss matches the reconstructed Bloch character and lower velocities.",
      "caption": "Figure 4a · cumulative κ and acoustic/acoustic-like branch insets",
      "notes": "Source: manuscript V2, 11 October 2026. BTE result, 60 seconds. The difference is 4.62 W m⁻¹ K⁻¹, or 15.9% of the untwisted value. Explain the crossing/convergence around 2 THz and the subsequent separation. The coherent 50.5% and diffusive 15.9% reductions describe separate transport limits and should not be directly subtracted."
    },
    {
      "kicker": "Results · Mechanism test",
      "title": "Heat-carrying phonons have longer weighted lifetimes after twisting",
      "lead": "Scattering and lifetime comparisons from V1 and V2.",
      "points": [
        "Top: V1 separates 3ph and 4ph rates and compares conductivity-weighted lifetimes.",
        "Bottom: V2 resolves the density of states and lifetimes in the 2-3 THz window.",
        "The weighted lifetime increases after twisting; the V2 lifetimes show no systematic shortening."
      ],
      "figures": [
        {
          "src": "assets/decks/meeting-2026-10-15/projects/wte2-2026-10-15/fig5-v1.png",
          "viewport": [
            16,
            0,
            681,
            525
          ],
          "imageSize": [
            1305,
            996
          ],
          "label": "V1: 3ph and 4ph scattering rates",
          "alt": "V1 Figure 5a: frequency-dependent three-phonon and four-phonon scattering rates over 0-3 THz"
        },
        {
          "src": "assets/decks/meeting-2026-10-15/projects/wte2-2026-10-15/fig5-v1.png",
          "viewport": [
            697,
            0,
            608,
            525
          ],
          "imageSize": [
            1305,
            996
          ],
          "label": "V1: Conductivity-weighted lifetime",
          "alt": "V1 Figure 5b: conductivity-weighted lifetime for 3ph and 3ph plus 4ph at zero and 21.8 degree twist"
        },
        {
          "src": "assets/decks/meeting-2026-10-15/projects/wte2-2026-10-15/fig4.png",
          "viewport": [
            10,
            625,
            605,
            433
          ],
          "imageSize": [
            1286,
            1573
          ],
          "label": "V2: Density of states",
          "alt": "V2 Figure 4b: original density of states comparison"
        },
        {
          "src": "assets/decks/meeting-2026-10-15/projects/wte2-2026-10-15/fig4.png",
          "viewport": [
            624,
            625,
            650,
            433
          ],
          "imageSize": [
            1286,
            1573
          ],
          "label": "V2: Phonon lifetime, 2-3 THz",
          "alt": "V2 Figure 4c: original phonon lifetime comparison in the 2-3 THz range"
        }
      ],
      "layout": "wte2-panels",
      "takeaway": "The lower conductivity is accompanied by a longer conductivity-weighted lifetime.",
      "caption": "Top: V1 Figure 5a-b. Bottom: V2 Figure 4b-c.",
      "notes": "Source: manuscript V1, 4 October 2026, Figure 5a-b, inserted at user request. Panel a shows scattering rates (inverse picoseconds), not lifetimes, and spans 0-3 THz. Black denotes zero twist and red 21.8 degrees; diamonds denote 3ph and circles 4ph. Panel b shows conductivity-weighted lifetimes in picoseconds: blue squares are 3ph and red diamonds are combined 3ph+4ph. The weighted lifetime is higher in the twisted structure for both scattering models. This aggregate statistic does not imply that every individual phonon lifetime increases, and its conductivity weights also depend on mode transport contributions. The original V2 comparison was limited to the 2-3 THz window. The original V2 density-of-states and lifetime panels are retained in the bottom row. V2 lifetime colors lack a separate legend; do not infer their assignment."
    },
    {
      "kicker": "Results · Low-frequency eigenmodes",
      "title": "The low-frequency modes retain related interlayer motion",
      "lead": "Acoustic and acoustic-like vibrations carry much of the heat in both structures.",
      "points": [
        "The Γ-point diagrams identify the low-frequency symmetry classes and displacement patterns.",
        "Their transport behavior requires both amplitude and Bloch-phase diagnostics."
      ],
      "figures": [
        {
          "src": "assets/decks/meeting-2026-10-15/projects/wte2-2026-10-15/fig2.png",
          "viewport": [
            12,
            0,
            1234,
            310
          ],
          "imageSize": [
            1258,
            1128
          ],
          "label": "Γ-point eigenmodes",
          "alt": "Manuscript Figure 2, Γ-point eigenmodes"
        }
      ],
      "layout": "wte2-result",
      "takeaway": "The six lowest branches provide the basis for the mean-PR comparison.",
      "caption": "Figure 2a · irreducible representations and vibrational eigenmodes",
      "notes": "Source: manuscript V2, 11 October 2026. Main presentation, before the NEGF results. The source panel presents A₂u, E_u, A₁g and E_g patterns. Use this slide if asked which acoustic-like modes enter the PR average. All four main manuscript figures are represented across the talk and backup slides."
    },
    {
      "kicker": "Results · Coherent transport",
      "title": "Twisting reduces coherent conductance by about 51%",
      "lead": "At 300 K, the NEGF calculation shows a broad reduction in spectral conductance.",
      "points": [
        "The cumulative conductance changes from 4.75 to 2.35 on the plotted scale.",
        "Phonons below 3 THz still supply more than 65% of the coherent conductance."
      ],
      "figures": [
        {
          "src": "assets/decks/meeting-2026-10-15/projects/wte2-2026-10-15/fig3.png",
          "viewport": [
            15,
            0,
            843,
            500
          ],
          "imageSize": [
            866,
            887
          ],
          "label": "300 K · x direction",
          "alt": "Manuscript Figure 3, 300 K · x direction"
        }
      ],
      "layout": "wte2-result",
      "takeaway": "The harmonic transport channels already respond strongly to the moiré reconstruction.",
      "caption": "Figure 3a · spectral conductance per area and cumulative inset",
      "notes": "Source: manuscript V2, 11 October 2026. Coherent result, 60 seconds. Relative reduction calculated as (4.75−2.35)/4.75 = 50.5%. The source paragraph omits the 10⁶ factor shown in the spectral-conductance axis, and the cumulative inset omits units. Therefore the slide emphasizes the percentage and labels the two values as the plotted scale. NEGF conductance and BTE conductivity are different observables."
    },
    {
      "kicker": "Results · Real-space eigenstates",
      "title": "Twisting redistributes acoustic vibrational amplitudes",
      "lead": "The mean participation ratio decreases across much of the moiré Brillouin zone.",
      "points": [
        "These maps average the six lowest-frequency branches.",
        "High participation persists near Γ and its periodic equivalents.",
        "Low-frequency modes can show lower PR while retaining strong Bloch character."
      ],
      "figures": [
        {
          "src": "assets/decks/meeting-2026-10-15/projects/wte2-2026-10-15/fig3.png",
          "viewport": [
            15,
            500,
            843,
            387
          ],
          "imageSize": [
            866,
            887
          ],
          "label": "Mean participation ratio",
          "alt": "Manuscript Figure 3, Mean participation ratio"
        }
      ],
      "layout": "wte2-result",
      "takeaway": "PR describes amplitude uniformity; Bloch-sector weights describe translational phase character.",
      "caption": "Figure 3b · mean mass-weighted participation ratio over q_x–q_y",
      "notes": "Source: manuscript V2, 11 October 2026. Participation ratio, 60 seconds. Use the two diagnostics as complementary descriptions. A reduced PR in a periodic moiré cell is evidence of nonuniform amplitude distribution and does not by itself establish loss of propagating Bloch character or Anderson localization. q=0 and q=1 are periodically equivalent."
    },
    {
      "kicker": "Results · Anharmonicity",
      "title": "The weighted Grüneisen parameter does not increase",
      "lead": "The Bose–Einstein-weighted average changes from 1.46 to 1.37 after twisting.",
      "points": [
        "The average anharmonicity indicator decreases slightly.",
        "Together with the lifetime comparison, this supports a mechanism dominated by lower group velocities."
      ],
      "figures": [
        {
          "src": "assets/decks/meeting-2026-10-15/projects/wte2-2026-10-15/fig4.png",
          "viewport": [
            10,
            1060,
            1276,
            513
          ],
          "imageSize": [
            1286,
            1573
          ],
          "label": "0° and 21.8°",
          "alt": "Manuscript Figure 4, 0° and 21.8°"
        }
      ],
      "layout": "wte2-result",
      "takeaway": "The manuscript finds no overall enhancement of anharmonicity at 21.8°.",
      "caption": "Figure 4d · Bose–Einstein-weighted Grüneisen parameter",
      "notes": "Source: manuscript V2, 11 October 2026. Anharmonicity, 45 seconds. The Grüneisen average is supporting evidence, not a complete mode-resolved scattering rate. Combine it with the lifetime and group-velocity comparisons when discussing the dominant mechanism."
    },
    {
      "kicker": "Discussion",
      "title": "Amplitude redistribution and phase reconstruction affect transport differently",
      "lead": "A mode can become spatially nonuniform while retaining substantial propagation velocity.",
      "points": [
        "PR and Bloch-sector weight measure different aspects of the eigenvector.",
        "Their joint frequency dependence explains why lower PR alone does not identify the conductivity bottleneck."
      ],
      "table": {
        "columns": [
          "Frequency range",
          "Eigenstate response",
          "Transport implication"
        ],
        "rows": [
          {
            "cells": [
              "Below ≈2 THz",
              "PR falls while strong Bloch character persists",
              "Relatively high velocities; comparable accumulated κ near 2 THz"
            ]
          },
          {
            "cells": [
              "Around 2–3 THz",
              "Folded sectors hybridize and velocities decrease",
              "The main conductivity deficit develops here"
            ]
          },
          {
            "cells": [
              "Scattering evidence",
              "Comparable lifetimes and no rise in weighted γ",
              "Supports velocity reduction as the dominant explanation"
            ]
          }
        ]
      },
      "layout": "wte2-discussion",
      "takeaway": "The relevant descriptor is the change in eigenstate character within the modes that carry heat.",
      "caption": "Synthesis of Figures 1–4",
      "notes": "Source: manuscript V2, 11 October 2026. Discussion, 60 seconds. These are complementary diagnostics rather than independent causal channels that can be numerically added. The result applies to the modeled periodic AB bilayers at 0° and 21.8°. The manuscript does not establish behavior at arbitrary angles, in disordered samples, or in experiment."
    },
    {
      "kicker": "Conclusion",
      "title": "Moiré phonon engineering can control propagation through Bloch character",
      "lead": "At 21.8°, eigenstate reconstruction reduces thermal transport in both modeled limits.",
      "points": [
        "Low-frequency modes retain strong Bloch character despite lower PR.",
        "Above ≈2 THz, sector mixing accompanies lower velocities and the conductivity deficit.",
        "An angle-dependent study can test how broadly this mechanism applies."
      ],
      "metrics": [
        {
          "label": "Coherent NEGF",
          "value": "≈51% reduction",
          "note": "Room-temperature conductance"
        },
        {
          "label": "Diffusive BTE",
          "value": "15.9% reduction",
          "note": "Room-temperature conductivity"
        },
        {
          "label": "Interpretation",
          "value": "Velocity dominates",
          "note": "Supported by Bloch weights, lifetimes and weighted γ"
        }
      ],
      "layout": "wte2-summary",
      "takeaway": "Thank you · Discussion",
      "caption": "11-slide main talk · computational results for two commensurate angles",
      "notes": "Source: manuscript V2, 11 October 2026. Conclusion, 45 seconds, then allow about 2–3 minutes for discussion. Main talk ends here. Scope: ideal periodic cells, two angles, and separate coherent/diffusive calculations. No experimental validation is included. Acknowledgments in manuscript: NSFC T2550247, Zhejiang LJXSZ26A040002, Singapore NRF T-CRP-2025-0030, and the HPC Center of the Yangtze Delta Region Academy in Jiaxing, BIT."
    },
    {
      "kicker": "Backup · Computational details",
      "title": "The workflow combines harmonic and anharmonic calculations",
      "lead": "A moiré machine-learning force field supplies the large-cell force constants.",
      "points": [
        "Training configurations include the two bilayers studied here.",
        "The supplement compares the phonon spectra with DFT."
      ],
      "table": {
        "columns": [
          "Stage",
          "Implementation"
        ],
        "rows": [
          {
            "cells": [
              "DFT reference",
              "VASP; PAW–PBE; force 10⁻³ eV Å⁻¹; energy 10⁻⁶ eV"
            ]
          },
          {
            "cells": [
              "Harmonic dynamics",
              "DPmoire MLFF; Phonopy second-order force constants; Born correction stated in SI"
            ]
          },
          {
            "cells": [
              "Coherent calculation",
              "NEGF phonon transmission and participation ratio"
            ]
          },
          {
            "cells": [
              "Diffusive calculation",
              "FOURPHONON; iterative three-phonon BTE; four-phonon scattering in RTA"
            ]
          },
          {
            "cells": [
              "IFC cutoff radii",
              "0°: third/fourth order 7.3/4.0 Å; 21.8°: 5.4/3.2 Å"
            ]
          }
        ]
      },
      "layout": "wte2-discussion",
      "takeaway": "NEGF and BTE probe complementary transport limits.",
      "caption": "Supporting information, Section S1 · computational methods",
      "notes": "Source: manuscript V2, 11 October 2026. Backup only. Settings transcribed from V2 SI. SI includes grid/cutoff convergence figures S3 and S4. The phrase Born correction is reported as stated by the authors; the slide does not infer additional details beyond the source."
    },
    {
      "kicker": "Backup · Force-field validation",
      "title": "MLFF and DFT phonon spectra provide a harmonic check",
      "lead": "The supplement compares the two methods for both 0° and 21.8° bilayers.",
      "points": [
        "This checks the force field in the harmonic spectrum relevant to the present structures.",
        "It complements the transport convergence checks in the supplement."
      ],
      "figure": "assets/decks/meeting-2026-10-15/projects/wte2-2026-10-15/validation.png",
      "figureLabel": "SI Figure S2",
      "layout": "wte2-result",
      "takeaway": "The validation supports using the force field for the moiré phonon calculation.",
      "caption": "Supporting information, actual MLFF–DFT dispersion comparison",
      "notes": "Source: manuscript V2, 11 October 2026. Backup only. This is SI word/media/image4.png, the actual MLFF–DFT comparison. The SI duplicates a dispersion caption on a separate PR plot and the main text cites S1 inconsistently. The slide uses the actual relevant image and does not reproduce that mismatch."
    }
  ]
};
