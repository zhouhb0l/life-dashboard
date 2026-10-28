# NEGFPy group-meeting section — 28 October 2026

Open `index.html` in this folder. Arrow keys, Page Up/Down, Space and the
navigation buttons move through the slides; Home/End jump to the first/last
slide. Browser print exports one slide per page.

## Scientific structure

The section has twelve screens, adapted from the existing deck:

1. Physical meanings of Green functions, self-energy and the cubic bubble, with visible Dyson/Keldysh relations and the bubble formula linked directly to decay/combination and Born/SCBA feedback.
2. Phonon scattering, transverse momentum and energy conservation.
3. Restored seven-method approximation overview: harmonic, Guo Born/SCBA, Wang branches and Mingo Eq. (27).
4. Illustrated central-region length, phonon scattering length and ballistic/diffusive conductivity scaling.
5. Wang literature benchmark: three-atom FPU-alpha junction, Hamiltonian, parameters and matched approximation schemes.
6. Wang literature comparison: harmonic conductance and selected second-order/selective-mean-field checkpoints.
7. The software's scientific development roadmap.
8. Silicon before interacting transport: FC2 bands/DOS and intrinsic SMRTA population relaxation time versus frequency.
9. Silicon results first: user-supplied harmonic heat currents versus the fitted-model SCBA currents, frequency/q sampling, the completed 1×4 control and the model lengths.
10. Supporting evidence: nonlinear-self-energy convergence, defined energy-balance checks and current reproduction.
11. Bulk-conductivity BTE and finite-device NEGF: diffusion, explicit reservoirs, phase and the no-scattering limit.
12. BTE limitations and their named extensions, compared with the unified NEGF treatment of the same physical features.

This reorganization supersedes the earlier append-only layout of the current
28 October section. Earlier meeting decks remain separate and unchanged.
The existing figures and source material are reused rather than rebuilding
the presentation from scratch.

The silicon reference uses the archived intrinsic three-phonon population
lifetime scatter plot on the 11×11×11 q mesh at the release's 300 K
temperature. Its axes are phonon frequency (THz) and relaxation time (ps,
log scale). The earlier conductivity figure's x-axis was the uniform
q-mesh size (3³, 5³, 11³), not frequency; that figure remains in the assets.
The lifetime plot is also available as a standalone, self-contained SVG
under `assets/presentation-20261028/silicon-smrta-lifetime.svg`.

On the second silicon SCBA screen (screen 10), the three convergence curves are the
nonlinear phonon–phonon self-energy components Sigma_pp^r, Sigma_pp^< and
Sigma_pp^>. The right plot defines collision power P_pp, contact imbalance
J_L + J_R, and full balance J_L + J_R + P_pp. Both contact currents are
positive into the device. Each displayed balance error is an absolute
magnitude divided by its original tolerance, so a ratio at or below 1
passes. Horizontal tolerance lines are omitted; marker-only legends above
the axes identify the curves without appearing to be flat data. Collision
power uses blue circles and contact imbalance uses open orange squares.
The slide defines spectral C_pp(omega), its integral P_pp, and the signed
cancellation that makes the total imbalance smaller. Energy-balance errors
are already tiny before the self-energy fixed point is reached. The scalar bundle does
not contain a separate retarded Green-function convergence history or the
frequency-resolved Green/self-energy fields; no such G^r curve is inferred.

The first SCBA screen (screen 9) presents the results before this evidence.
It compares harmonic and interacting heat currents at 600, 900 and 1200
frequency intervals. The user's latest correction explicitly multiplies
the initially reported harmonic numbers by ten. The displayed harmonic
**heat currents in nW**, at q = (4,1) and 305/295 K, are therefore:

| Frequency intervals | Harmonic current (nW) | SCBA current (nW) |
|---|---:|---:|
| 600 | 3.866 | 3.865724715832432 |
| 900 | 3.889 | 3.861928382784723 |
| 1200 | 3.892 | 3.888387717211064 |

The original reported values were 0.3866, 0.3889 and 0.3892. The explicit
user-directed factor of ten supersedes the earlier unit clarification and
the temporary tenfold-mismatch interpretation. The corrected harmonic
currents are close to the SCBA currents. Their raw result file has not yet
been supplied, and no physical enhancement is inferred from this numerical
comparison alone. Both the initial values and latest correction are retained
in assets/presentation-20261028/harmonic-comparison-20261028.json; the figure
is assets/presentation-20261028/harmonic-scba-comparison.svg.

The results screen labels the SCBA frequency-study points
q = (4,1). Its displayed 600, 900 and 1200 values are frequency intervals
N_omega - 1, corresponding to the original 601, 901 and 1201 frequency
nodes. An additional orange hollow diamond labels q = (1,4) at 600
intervals; its current overlaps q = (4,1) at the displayed precision.
The new current is 3.865724715832378 nW, from a converged 601-node run
with 13 maps, zero rejected maps and all six original SCBA checks passed.
The extra visible percentage-difference explanations remain removed;
source data retain those derived comparisons. The tuple-form q table
places completed (1,4) beside (4,1), retains completed (1,2), and marks
only (4,2) running. The roadmap reflects the same completed/ongoing split.

## Evidence and interpretation

The latest October results are pinned to GitHub commit
[`2ef67f5292b7aa448eff2cc0aa71a36155af4d0a`](https://github.com/zhouhb0l/negfpy/commit/2ef67f5292b7aa448eff2cc0aa71a36155af4d0a).
The latest README, scalar JSON/CSV and q-direction comparison SVG are
preserved under `assets/converged-20261028/updates/2ef67f5292b7/`.
The original five-job snapshot at
[`5258b8899d34360096f63ef77fa5ba5c012c398e`](https://github.com/zhouhb0l/negfpy/commit/5258b8899d34360096f63ef77fa5ba5c012c398e)
remains unchanged in `assets/converged-20261028/`, including its original
convergence trace and frequency figures; the model guide is
`complete_energy_scba.md`. The latest six-job bundle supersedes the earlier
1×4-running status, rather than replacing that original snapshot.
Wang comparison data are in `assets/toy-literature/wang2006/`; the unchanged
`assets/historical_paper_benchmarks.png` supplies the literature comparison.
Earlier independent toy-validation figures remain in `assets/toy-validation/`
as supporting validation assets. See `SOURCE.md` for identities, literature
references and scope.

The first three screens provide theory context. Screen 1 connects an
annotated cubic self-energy bubble directly to the physical decay and
combination channels. Green functions describe how a disturbance propagates
with amplitude and phase; their statistical components describe fluctuations
and occupations. The self-energy describes how interactions shift, damp and
exchange energy with that motion. A visual read-as/cut guide relates the
two internal propagators to the two participating phonons; it does not
interpret the loop as spatial routes. Born uses harmonic/contact-dressed
G0G0, while SCBA feeds dressed GG back into the same bubble. The visible
Dyson relation connects the retarded Green function and interaction
self-energy, with the harmonic/contact-dressed G0 inverse explicitly
defined. The visible Keldysh relation includes contact and interaction
statistical self-energies. The full-index lesser/greater bubble formula,
with the i hbar/2 prefactor and signed-frequency convolution, is shown
alongside its physical interpretation and is retained on screen 2 as well.
The mass-normalized Hamiltonian and detailed coordinate/Green-function
normalizations remain in the slide notes. These equations follow Guo 2021,
Eqs. 1–4, and the existing NEGFPy toy-model report's production conventions.
Self-consistency does not include every higher-order vertex diagram.
The restored approximation overview
adapts the earlier deck's Table 1 and Figure 2. Wang/Mingo entries retain
historical-source scope rather than claiming new October certification.
Wang's original cubic tensor T is relabeled V to distinguish it from
temperature. Transverse q coupling is a momentum extension, and SMRTA is
a separate bulk approximation.

The two toy slides now follow the literature benchmark rather than the
independent-oracle presentation. They illustrate Wang's three-atom junction,
the harmonic and internal-bond cubic Hamiltonian, and the exact approximation
used for each comparison. NEGFPy agrees with the extracted Wang harmonic
curve and selected anharmonic checkpoints, conditional on the inferred
onsite-unit convention. This does not uniquely recover every original run
input. Literature curves are figure-extracted vector paths, not author raw
data. No matched Mingo interacting result is claimed.

The added length-scales illustration is a native editable conceptual SVG,
not a calculated or fitted length series. It distinguishes central length
L from a representative, mode-dependent scattering length. The displayed
effective conductivity is kappa_eff = G L/A, with G = J/DeltaT, for fixed
cross-section and linear response: ballistic transport gives alpha = 1,
while ordinary diffusive transport gives alpha = 0. Harmonic/anharmonic
boundaries are model partitions; complete cubic-vertex endpoint support is
retained. Contact resistance can affect an apparent finite-length exponent.

Screen 11 uses a transport picture for a nontechnical transport audience.
The conventional bulk population-BTE side relates diffusion down a local
temperature gradient to bulk conductivity. Without resistive scattering,
the ideal bulk conductivity diverges. The finite-device NEGF side follows
heat flow between explicit hot and cold reservoirs in the Landauer picture;
removing anharmonic scattering recovers a finite harmonic ballistic result.
Population BTE averages away phase information, whereas NEGF retains wave
propagation and correlations together with inelastic exchange within its
chosen approximation. This does not assert that each microscopic BTE
collision completely destroys phase, or that an approximate NEGF solver
contains every possible collision process. Finite-device BTE can also
describe ballistic transport.

Screens 12–13 connect broad control variables to specific research tests.
Screen 12 now presents each BTE limitation with its named extension:
small-bias linearization to nonlinear BTE, bulk conductivity to finite-device
BTE, fixed spectra to renormalized/self-consistent BTE, classical occupations
to quantum/Bose BTE, bulk transport to boundary/interface BTE, diagonal
populations to coherence/Wigner extensions, and sharp modes to generalized
quantum kinetics. These limitations belong to the stated simplifying
assumptions, rather than to every phonon BTE. A visible footnote states that
Bose statistics already belongs to standard phonon BTE.

The NEGF column emphasizes that finite bias, contacts, geometry, quantum
populations, wave propagation and the spectral/scattering feedback are
treated together in the same open-device equations. This is a framework
advantage within the chosen Hamiltonian and self-energy approximation,
not a claim that every correction is exact or that the present silicon
calculations validate all seven regimes. Static/quartic contributions and
higher-order vertices omitted from cubic-bubble SCBA are not added
automatically. Screen 13 retains the proposed, controlled research tests.

The proposed tests ask whether collisions lift an interference blockade,
whether loss of coherence occurs at the same length as the ballistic–diffusive
crossover, and whether large bias reshapes resonances or produces rectification
in an asymmetric device. A symmetric control and matched nonlinear BTE
comparison are required for the last question. These are future questions,
not current findings or novelty claims. Frequency/q convergence, the intended
physical interaction model and SCBA validity must be established first.

The completed October calculations establish numerical self-consistency for
a declared fitted complete-center-energy model and sampled grids. The
2.14147% bulk FC3 fit residual is not a heat-current error bound. Frequency
comparisons and directional q samples do not establish full 2D q convergence
or physical-interface accuracy.

The completed 1×4 result agrees with 4×1 for the same number of q points
and frequency nodes. This is an equal-Nq axis control, not a refinement
or certification of two-dimensional q convergence. Only 4×2 remains marked
ongoing from the user's 28 October update; no completed 4×2 result is in
the latest bundle, and its live scheduler state was not queried. Proposed
beyond-population-BTE findings are research directions, not demonstrated
results or novelty claims. Wigner/coherence extensions are distinguished
from conventional diagonal-population BTE.

Keep the local `assets/` directory with this HTML file. Formulas use the
locally bundled KaTeX runtime and render offline. Presentation viewports and
SVG derivatives are documented separately from the preserved source figures
in `SOURCE.md`.


Screen 9 also states the nominal anharmonic-center length, **2.72 nm**
(five conventional Si cells), and the full device length, **4.89 nm**
(nine cells). A phonon mean free path is not an input or a fitted result.
Complete cubic endpoint support is retained beyond the selected centers;
see SOURCE.md and the pinned silicon-reference-context.json.
Both silicon screens visibly state that the cubic interaction amplitude is
scaled by **g = 0.03 (3%) to facilitate SCBA convergence**. This is a
weak-coupling fitted-model calculation, not full-strength silicon
anharmonicity. The bubble image carries g squared at fixed Green functions;
neither the self-energy nor the current is simply multiplied by 0.03.

The earlier harmonic-data deferral is superseded by the user's confirmed
heat-current values above. The archived GitHub bundle itself remains
unchanged, and the new harmonic values retain their separate user provenance.

The final proposed-research-questions slide was removed at the user’s request before publication. The visible NEGF section ends at slide12.
