# NEGFPy section: sources and scientific scope

## Current organization

The 28 October section has twelve screens: three theory screens, one
illustrated length-scales screen, two Wang literature-benchmark screens, one software
roadmap, one silicon FC2/bulk-SMRTA lifetime reference, two current SCBA/result
screens, one BTE–NEGF comparison, one broad-features overview and one
specific research-question screen.
The latest reorganization request supersedes the previous
append-only arrangement for this current deck. Earlier meeting decks and
the NEGFPy source project are not edited.

| Screens | Evidence and scope |
| --- | --- |
| 1: physical scattering and NEGF | An annotated two-vertex cubic bubble is linked directly to decay and combination channels through a read-as/cut guide. Visible Dyson/Keldysh relations, the contact-dressed G0 inverse and the full-index lesser/greater bubble formula connect G and self-energy to that physical picture and the Born G0G0/SCBA GG closures. The mass-weighted Hamiltonian and detailed normalizations remain in notes. The bubble is not a pair of spatial routes. |
| 2: conservation | Guo 2020/2021 provide the cubic interaction self-energy, current and energy-exchange context. Phonon energy, rather than phonon number, is conserved. |
| 3: approximation overview | Seven named schemes restored from the existing Table 1 and Figure 2: harmonic, Guo Born/SCBA, Wang second order/selective mean field/fourth order, and Mingo Eq. (27). Historical Wang/Mingo scope remains distinct from the current cubic-bubble branch. |
| 4: central-region length and scaling | Native editable conceptual SVG illustrates central length L, representative mode-dependent scattering length ell, cubic scattering events and harmonic/anharmonic model partitions. Effective conductivity kappa_eff = G L/A scales as L for ballistic transport and becomes length independent for ordinary diffusive transport under the stated conditions. It is not a computed or fitted length series. |
| 5: Wang model and approximations | Three central atoms between harmonic leads form the FPU-alpha literature junction. Full Hamiltonian decomposition, central harmonic matrix and two internal cubic bonds connect the model to the harmonic, Wang second-order and selective-mean-field comparisons. Author-source spring inputs and an explicitly inferred onsite-unit assignment define the comparison fixture. |
| 6: Wang literature comparison | Panels (a,b) of the unchanged historical comparison figure show the 51-temperature harmonic curve and three second-order/two selective-mean-field checkpoints. Direct CSV errors quantify conditional literature agreement. These are vector-extracted literature curves, not author raw data or a uniquely recovered same-input reproduction. No Mingo interacting match is claimed. |
| 7: roadmap | Existing software/scientific development material, updated to distinguish validated references, current fitted-model SCBA, the completed 1×4 axis control and remaining physical/q-convergence work. Only 4×2 remains ongoing from the user's update. |
| 8: silicon reference | Existing FC2 dispersion/DOS plus the intrinsic three-phonon population lifetime versus frequency from `assets/rates_and_mfp.png`. The lifetime plot is the archived 11³-mesh, 300 K SMRTA reference; it is separate from open-device SCBA. The earlier mesh-versus-conductivity figure is retained as an asset but no longer supplies this screen's third panel. |
| 9: silicon results and comparison | Results precede convergence evidence. The user's latest explicit ×10 correction gives harmonic heat currents 3.866/3.889/3.892 nW at 600/900/1200 intervals, q = (4,1), 305/295 K. These are compared with the pinned SCBA currents on the same scale. The (1,4) control overlaps (4,1) at 600 intervals; the q table and 2.72 nm center / 4.89 nm device lengths remain. The cubic amplitude is g = 0.03 to facilitate convergence. No physical enhancement is inferred from the close numerical comparison alone. |
| 10: SCBA convergence evidence | Pinned October bundle, nonlinear Sigma_pp^r, Sigma_pp^< and Sigma_pp^> residuals, defined collision/contact/full balance checks, and successful current reproduction. A separate G^r convergence trace or frequency-resolved field is not included in the bundle. The same g = 0.03 amplitude scaling is stated. |
| 11: BTE and NEGF | A nontechnical comparison of conventional bulk population-BTE conductivity/diffusion with finite-device NEGF heat flow between explicit reservoirs. Ideal bulk kappa diverges without resistive scattering, while NEGF recovers the finite harmonic Landauer limit. Phase is averaged out in population BTE; NEGF retains waves and inelastic exchange within the chosen approximation. Finite-device BTE and coherence extensions remain explicitly outside this simplified contrast. |
| 12: BTE extensions and unified NEGF | Each row names a specific BTE simplifying assumption and its extension: nonlinear, finite-device, renormalized/self-consistent, quantum/Bose, boundary/interface, coherence/Wigner or generalized quantum kinetics. NEGF treats the corresponding effects in one open-device framework within the chosen Hamiltonian/self-energy approximation. The visible footnote states that Bose statistics is already standard in phonon BTE. |

## Presentation adaptations

Screen 5 uses a native editable schematic of the three-atom Wang junction.
Screen 6 uses a non-destructive SVG viewport `0 0 3150 1125` with an explicit
clip rectangle over the unchanged 3150-by-2250
`assets/historical_paper_benchmarks.png`. It displays only the upper Wang
panels (a,b); the lower Mingo discrepancy/sensitivity panels remain in the
complete source image. The original figure data and artwork are preserved.
Earlier independent-oracle and nine-DOF SCBA PNGs remain unchanged as
supporting validation assets, but no longer supply the main toy slides 5–6.

The two presentation SVG derivatives are distinct from the byte-identical
upstream figures under `assets/converged-20261028/figures/`:

- `assets/presentation-20261028/original-convergence-trace.svg` uses root
  viewBox `0 8 720 290`; its x-axis is "SCBA state." Both horizontal
  tolerance-reference lines are removed at the user's request. The pass
  criterion remains stated as text: absolute error divided by tolerance
  at or below 1 passes. Marker-only legends sit above, outside the data
  axes, with explicit self-energy and absolute collision/contact/total
  residual labels. Blue circles mark collision power and open orange
  squares mark contact imbalance; the lesser self-energy also uses open
  squares. A note identifies nearly overlapping curves. All six scientific
  path coordinates, the eleven marker positions on each curve, axis scales
  and source CSV/JSON data are unchanged. Only reference lines, presentation
  markers and labels change; the original upstream figure remains intact.
- `assets/presentation-20261028/frequency-sensitivity.svg` uses root viewBox
  `0 54 360 244`, displaying only the left current-versus-frequency panel.
  The redundant 2% diagnostic comparison panel is omitted; the diagnostic
  target is not substituted for the scientific SCBA tests. Each displayed
  frequency-study point is annotated q = (4,1). An orange hollow diamond
  adds the completed q = (1,4) equal-Nq axis control at 600 intervals,
  with its own q label; the two 601-node currents overlap at display
  precision. Axis values 600, 900 and 1200 now denote
  intervals N_omega - 1 rather than the original node counts 601, 901 and
  1201. Recorded currents and source data remain unchanged.

Figure limits and relevant footnotes are carried into the visible slide
captions and speaker notes. Local KaTeX renders the formulas offline.

### Silicon SMRTA relaxation time versus frequency

Screen 8 reuses the left panel of
`C:/Users/zhbho/OneDrive/Desktop/workspace/15. NEGFPy/reports/bulk-rta-1.0.0/figures/rates_and_mfp.png`.
The exact 1570-by-648 source raster is copied to `assets/rates_and_mfp.png`:

```text
5017550dbb82abe4bc85309b3ab14b900abf39d6bb3cfd60dac235ca2e4060ef  rates_and_mfp.png
```

The presentation uses a non-destructive left-panel SVG viewport
`0 0 785 648` with an explicit clip rectangle. A standalone
`assets/presentation-20261028/silicon-smrta-lifetime.svg` embeds the same
source raster as a base64 image and clips to that viewport. Neither version
changes scatter coordinates, axes, labels or plotted values. This is reuse
of the archived scientific figure, not a new solver run or a reconstruction
from raster coordinates.

The source renderer, `reports/bulk-rta-1.0.0/scripts/generate_report.py`
lines 1149–1178, reads the 11×11×11 mesh and the first archived temperature.
The x-axis is cyclic phonon frequency in THz. The y-axis is population
lifetime in ps on a logarithmic scale, with
tau = 1/(4 pi gamma), where gamma is the cyclic-frequency HWHM in THz.
Each point represents a phonon mode (q, branch); no single-valued smooth
tau(frequency) fit is implied. Intrinsic normal and Umklapp three-phonon
channels are included; isotope and boundary-disorder scattering are excluded.

The archived figure belongs to the reported certified bulk implementation
release `affdedb1a1262a5ce023a264a4013b01e517ad5b`. Its normalized report state
records `report_certified=true`, `authoritative_release_certified=true`, and
results HDF5 SHA-256
`f0c4ae4eb634418044eb69857b0c8ca44858891f1bff3d1618bc274b705e7e6d`.
The locked-release renderer requires `temperatures_k == [300.0]` (line 833),
supporting the 300 K label from the archived certified report and renderer
contract. The authoritative HDF5 retrieval directory is empty in the current
Windows mirror, so no fresh array-level read or independent revalidation of
that report is claimed.

The renderer omits modes at or below the acoustic cutoff, or with nonpositive
resolved linewidth/lifetime; its default cutoff is 1e-4 THz. The source
loader requires finite arrays. Physical mesh/smearing convergence remains
explicitly unestablished. The earlier conductivity figure uses tick positions
3, 5, 11 labelled 3³, 5³, 11³: these mean complete uniform Brillouin-zone
q meshes of 27, 125 and 1331 points. They are implementation-reference mesh
settings, not frequencies or a certified convergence series.

### Physical scattering and restored approximation schemes

Screen 1 uses a native editable annotated cubic bubble and directly linked
physical-event sketches. The two cubic vertices encode the interaction,
and the internal pair G(omega') G(omega-omega') is summed over intermediate
frequencies and modes. The visual read-as/cut guide relates this pair to
real energy-exchange channels: decay of an external phonon omega into
omega1 + omega2, and combination omega + omega1 into omega2. Combination
is represented by the appropriate negative-frequency/reversed internal
channel and Bose factors, not by assuming that both internal frequencies
are always positive. The retarded bubble also contains dispersive and
off-shell contributions; the sketches are a quasiparticle interpretation,
not a claim that every term is a literal on-shell collision.

Green-function language is physical: the retarded function describes the
causal amplitude and phase of the response to a disturbance, while lesser
and greater functions encode fluctuations and occupation information.
The interaction self-energy describes how other vibrations modify that
propagation. Its retarded real part changes resonances, its imaginary part
gives broadening/damping in the passive positive-frequency range, and its
statistical components describe energy exchange. These are not classical
point-to-point probabilities. The bubble is a correction to propagation,
not two spatial routes or a particle travelling around a loop.

Born evaluates the same dynamic cubic bubble with harmonic/contact-dressed
G0G0. SCBA replaces those internal lines with dressed GG and feeds the
modified propagation and statistics back into the bubble. Repeating this
closure does not add every higher-order vertex diagram. Slide 1 now makes
the basic mathematical relations visible alongside the physical explanation:

```text
G^r = [(G0^r)^(-1) - Sigma_pp^r]^(-1)
(G0^r)^(-1) = (omega + i0^+)^2 I - D - Sigma_L^r - Sigma_R^r
G^{</>} = G^r (Sigma_L^{</>} + Sigma_R^{</>} + Sigma_pp^{</>}) G^a
Sigma_pp,ab^{</>}(omega)
  = (i hbar/2) sum_cdef Psi_acd Psi_bef
    integral_{-infinity}^{infinity} [d omega'/(2 pi)]
      G_ce^{</>}(omega') G_df^{</>}(omega - omega')
```

The bubble equation is the same full-index real-space expression retained
on screen 2. Its two Psi factors correspond to the two cubic vertices,
and its two G factors to the internal propagators. The integral covers
signed angular frequencies, with internal index sums covering all mode
pairs. The displayed lesser/greater formula is not a claim that the
retarded bubble is simply a product of two retarded Green functions.

Primary context is Guo et al., PRB 103, 174306 (2021),
[Eqs. 1–4](https://arxiv.org/pdf/2103.10087). Exact production normalization
is documented in
`C:/Users/zhbho/OneDrive/Desktop/workspace/15. NEGFPy/reports/phonon-phonon-interaction/toy_model_validation_latex/report.tex`:
mass-weighted H3 and Green-function definitions at lines 300–323,
Dyson/Keldysh at lines 336–347, and the cubic bubble at lines 367–380
(when inspected). The convention is H3 = (1/3!) sum Psi u u u,
u_a = sqrt(M_a) Delta r_a, and G^{</>} = -i <u u>/hbar, giving the
unfitted i hbar/2 bubble prefactor. The formal H3 and these detailed
coordinate/Green-function normalizations remain in slide 1's hidden notes.
The native diagrams are conceptual, not new calculated or measured results.

Screen 3 restores the seven schemes from the earlier deck's unchanged
`assets/report-table-1.png` and `assets/report-figure-2.png`. The readable
source is `C:/Users/zhbho/OneDrive/Desktop/workspace/15. NEGFPy/reports/phonon-phonon-interaction/toy_model_validation_latex/report.tex`,
section "Named approximation levels" (lines 539–650 when inspected).
The slide relabels Wang's original cubic tensor T as V, so O(V^2) and
O(V^4) refer to coupling order rather than temperature dependence.

| Scheme | Content and scope |
| --- | --- |
| Harmonic NEGF | No interaction self-energy; contact-dressed G0. |
| Guo one-shot Born | Cubic dynamic bubble evaluated once using G0G0; diagnostic, not generally conserving. |
| Guo SCBA | The same cubic dynamic bubble iterated using dressed GG; current cubic-bubble branch. |
| Wang O(V^2) | Historical contour bubble using G0G0 plus a fixed G0 tadpole/static contribution. |
| Wang selective mean field | Iterated dressed-GG contour bubble plus a fixed G0 tadpole. |
| Wang O(V^4) | Perturbative second-order result plus six fourth-order diagrams; reference-only/unimplemented in the historical source. |
| Mingo Eq. (27) | Paper-convention cubic kernel with intended dressed GG; kernel mapping audited, full paper-specific SCBA reproduction unresolved in the source. |

The Wang/Mingo status labels describe the historical report, not new October
validation or a claim that these branches generated the displayed silicon
results. Static tadpoles describe equilibrium/force-constant shifts; the
dynamic bubble supplies frequency-dependent shifts and damping. The
report's convention-specific Mingo kernel mapping is not a universal
prefactor to insert into the current solver. Transverse q coupling is a
separate momentum extension, not a higher diagram order. SMRTA is a
separate bulk population/lifetime approximation rather than a device SCBA
closure. The original report figures and their recorded hashes are retained.

### Plain-language bulk BTE and finite-device NEGF picture

Screen 11 replaces the technical state-variable/evolution comparison with
four intuitive transport distinctions: geometry and thermal driving,
conductivity versus heat current/conductance, the no-scattering limit, and
phase/collision treatment. The BTE illustration is explicitly the
conventional bulk population picture: many collisions produce diffusion
down a local temperature gradient, and bulk kappa is the material response.
In the ideal bulk limit without resistive scattering, its conductivity
diverges. This does not assert infinite conductance for a finite sample
with contacts or exclude ballistic finite-device BTE solutions.

The NEGF illustration contains explicit hot and cold reservoirs and a
finite device. Removing the anharmonic interaction self-energy recovers
the harmonic Landauer transmission problem and finite ballistic heat
current/conductance for a finite set of channels. NEGF includes contact
coupling, reflection, interference and inelastic exchange within its
declared interaction approximation. It does not imply that cubic-bubble
SCBA includes all possible collision or vertex processes.

Population BTE does not retain intermode phase information; the slide
describes phase averaging rather than claiming that every microscopic
collision necessarily causes complete dephasing. Wigner/coherence extensions
are not part of the simplified bulk-population comparison. No matrix Gij
notation or population-evolution PDE is needed in the visible comparison.
Primary context remains Carrete 2017, Guo 2020/2021, Simoncelli 2022 and the
Maassen–Lundstrom ballistic-to-diffusive discussion listed below.

### Illustrated transport lengths and conductivity scaling

Screen 4 adds a native editable conceptual SVG using the existing deck's
palette. The graphic is an explanatory schematic, not simulated silicon
geometry or a measured, computed or fitted length series. L denotes the
central-region length. The representative ell is a mode/frequency-dependent
phonon scattering length, interpreted as |v_lambda| tau_lambda in a
quasiparticle picture. No numerical scattering length is extracted from
the current convergence results. Marked scattering centers denote cubic
interaction events, not necessarily impurities.

The slide defines G = J/DeltaT and kappa_eff = G L/A. With fixed
cross-section A and linear response, L << ell gives ballistic G approximately
independent of L and kappa_eff proportional to L (alpha = 1). In ordinary
diffusive transport, L >> ell gives G proportional to 1/L and length-independent
kappa_eff (alpha = 0). Contact resistance and finite-length crossover can
affect an apparent exponent; these limits are not an exponent fitted to
the October silicon data. The primary transport reference is Maassen and
Lundstrom (2015), particularly the ballistic/diffusive heat-current limits
on manuscript pages 2–3.

Dashed harmonic/anharmonic boundaries label model partitions, not an
asserted material interface. The pinned `complete_energy_scba.md` guide
states that selected center energies on layers 2–6 retain all required
endpoint derivatives: 132 active coordinates lie within a 216-coordinate
harmonic device. Complete cubic-vertex endpoint support is retained;
selected center-energy layers are not a license to crop interaction
derivatives at an atomically sharp boundary.

The three copied Wang CSVs normalize Windows CRLF line endings to LF.
Their SHA-256 identities then exactly match the archived historical metrics
manifest; numerical rows are unchanged:

```text
b828914893bcb81945c00a8742d8aea052551aafd12bfb074957ff1ca9d08212  wang2006_harmonic.csv
c2acc1de6ce11bde6a878b3719720c0cfb848a613cf0b8687200f5e654ade750  wang2006_published_reference_curves.csv
31c82d7d7827a8fbcb0d64b0aab4f0c259df1d8c883db9b9a6ec45bf158cb555  wang2006_anharmonic_checkpoints.csv
```

## Pinned October results

### Latest 1×4 update

- Repository: [zhouhb0l/negfpy](https://github.com/zhouhb0l/negfpy).
- Branch: `release/preparation-complete-energy-20261026`.
- Latest commit: [`2ef67f5292b7aa448eff2cc0aa71a36155af4d0a`](https://github.com/zhouhb0l/negfpy/commit/2ef67f5292b7aa448eff2cc0aa71a36155af4d0a).
- Bundle: [`docs/research-results/converged-20261028/`](https://github.com/zhouhb0l/negfpy/tree/2ef67f5292b7aa448eff2cc0aa71a36155af4d0a/docs/research-results/converged-20261028).

The latest bundle contains six completed jobs, adding `q14` to the five-job
snapshot below. Four byte-identical source files are preserved separately
under `assets/converged-20261028/updates/2ef67f5292b7/`: `README.md`,
`data/converged-results.json`, `data/converged-currents.csv` and
`figures/q-direction-comparison.svg`. The original snapshot files and their
identities below remain unchanged.

The `q14` equal-size axis-control job is `26033251.pbs101`, with transverse
grid (1,4), four q points and 601 frequency nodes (600 intervals). It starts
from zero, completes 13 maps with zero rejected maps, selects state 13,
and exits successfully with `converged=true`, `passed=true` and
`stop_reason=fixed_point`. All original three unmixed Sigma and three
current checks pass. Its contact currents are
J_L = 3.865724715832378e-9 W and J_R = -3.86572471585172e-9 W;
the collision power is 1.931528019201716e-20 W. The displayed left current
is 3.865724715832378 nW. The completion evidence is
`reports/phonon-phonon-interaction/multiq-q-direction-study-20261028/q14/completion-summary.json`
in the pinned upstream tree.

The (1,4) and (4,1) 601-node results agree at the plotted precision for
the same saved fitted model and total number of q points. This is an
equal-Nq axis control, not a two-dimensional q refinement or a convergence
certification. The six completed cases are `original`, `reproduction`,
`f901`, `f1201`, `q12` and `q14`; no completed (4,2) result is supplied.
Only (4,2) retains the user's ongoing status. This new evidence supersedes
the earlier user-reported (1,4)-running status. No live scheduler query
or transport solve is performed for this update.

### Original five-job snapshot

- Repository: [zhouhb0l/negfpy](https://github.com/zhouhb0l/negfpy).
- Branch: `release/preparation-complete-energy-20261026`.
- Commit: [`5258b8899d34360096f63ef77fa5ba5c012c398e`](https://github.com/zhouhb0l/negfpy/commit/5258b8899d34360096f63ef77fa5ba5c012c398e).
- Bundle: [`docs/research-results/converged-20261028/`](https://github.com/zhouhb0l/negfpy/tree/5258b8899d34360096f63ef77fa5ba5c012c398e/docs/research-results/converged-20261028).
- Model guide: [`docs/complete_energy_scba.md`](https://github.com/zhouhb0l/negfpy/blob/5258b8899d34360096f63ef77fa5ba5c012c398e/docs/complete_energy_scba.md).

The source README, three data files and three SVG figures are byte-identical
copies under `assets/converged-20261028/`; the guide is copied as
`complete_energy_scba.md`. Supplied figures are reused without regenerating
them. Upstream optional PNG previews/generation scripts are not required by
the presentation and are not included in this selected copy.

The five jobs reported in this original snapshot passed the original
three unmixed Sigma and three current screens. The original/fresh-zero
4×1/601-node current is
3.865724716 nW. The 1201-node result is +0.5863% versus 601 and +0.6851%
versus 901. The 1×2/601-node result is +4.1985% versus 4×1/601; it samples
another direction, not a refinement. The 2% comparison target is diagnostic.

These results concern the same saved 728-coefficient fitted complete-center-
energy research model, not a direct raw-FC3 or uniquely reconstructed
physical-interface calculation. Its 2.14147% bulk FC3 Frobenius fit residual
does not bound current error. Full 2D q convergence, interface validity and
production transport accuracy remain open. This original GitHub bundle
contains no harmonic baseline. The later user-supplied reference is recorded
separately below; it does not by itself establish physical anharmonic
suppression or enhancement.

The original job's compact summary omits currents. Its bundled current comes
from the successful reproduction's explicit prior-current reference:
`result.current_comparison.contacts.{left,right}.reference_w`. The original
trace has eleven fresh maps, native states 3–13, from saved state 2; this is
not thirteen fresh zero-start iterations.

### SCBA convergence components and energy-balance definitions

Screen 10 labels the recorded residuals explicitly as nonlinear interaction
self-energy components Sigma_pp^r, Sigma_pp^< and Sigma_pp^>. Retarded is
the r component of that nonlinear self-energy, not a recorded retarded
Green-function convergence curve. The source CSV contains original unmixed
self-energy errors, their normalized screen ratios, and three current
ratios. It does not contain a separate G^r iteration history or saved
frequency-resolved Green/self-energy fields. No G^r history or spectral
curve is reconstructed from these scalar data. A conceptual Dyson/Born
feedback illustration, if shown, is distinct from a measured convergence
curve.

The plotted right-hand quantities are defined using the solver's sign
convention that both contact currents are positive into the device:

- Collision power P_pp is the integrated net energy exchange associated
  with the phonon–phonon self-energy. Its positive-frequency kernel is
  hbar omega Re Tr[Sigma_pp^> G^< - Sigma_pp^< G^>], integrated with
  d omega/(2 pi) and the transverse q weights.
- Contact imbalance is J_L + J_R, the mismatch between reservoir injection
  and extraction.
- Full balance is J_L + J_R + P_pp.

The three plotted errors are absolute magnitudes divided by each original
screen allowance. A ratio <= 1 passes; these plotted ratios are not watts.
For a conserving stationary solution, P_pp and J_L + J_R must separately
approach zero. Full balance alone can be small before self-consistency and
does not replace the self-energy tests. The original trace's current tests
already pass at the earlier displayed states, whereas all three Sigma
tests first pass at state 13.

The definitions were checked against the pinned GitHub implementation at
`5258b8899d34360096f63ef77fa5ba5c012c398e`:
`src/negfpy/anharmonic/current.py` defines energy exchange as positive into
the device and evaluates collision power using the interaction self-energy;
`src/negfpy/anharmonic/types.py` lines 866–872 define contact balance as
left + right and full balance as contact balance + collision power. The
public `complete_energy.py` guide retains the original three Sigma and
three current convergence checks.

### Frequency intervals and pointwise q labels

Screen 9 uses frequency interval counts N_omega - 1 on the displayed
x-axis: 600, 900 and 1200 correspond exactly to the archived 601, 901 and
1201 nodes over the same signed frequency range. This is a display
convention change, not a calculation with altered nodes or currents.
Every frequency-study point is individually annotated q = (4,1), as
specified by `q_grid_transverse` in the source JSON. The latest completed
(1,4) result adds an orange hollow diamond with its own q label at 600
intervals; it overlaps the (4,1) current at the displayed precision.
The (1,2) calculation
is a separate 601-node directional sample and is not relabelled (2,2) or
treated as a refinement of (4,1). Visible percentage-difference commentary
is removed from this screen; exact derived comparisons remain in the
preserved source bundle and the provenance summary above.

The q table uses tuple notation, with completed (1,4) beside (4,1) and
completed (1,2) retained. Only (4,2) remains running according to the user's
28 October update; no completed result or live scheduler state is inferred
for it. Screen 7 likewise moves 1×4 to completed work. The screen count
remains 13 after the broad-features/research-question extension.

### Original snapshot Git blob SHA-1 identities

These identities refer to the preserved `5258b8899d34360096f63ef77fa5ba5c012c398e`
snapshot, not the separate latest-update files.

| Local copy | Git blob SHA-1 |
| --- | --- |
| `assets/converged-20261028/README.md` | `343e988c9d909bd0fa004a7429e849abdb927dc7` |
| `assets/converged-20261028/data/converged-results.json` | `5dff4e5e8575ce7f4759a816725eed37f16b993b` |
| `assets/converged-20261028/data/converged-currents.csv` | `d34e2a0ff1c0c77be5b0b4a7af6c188a865fef2e` |
| `assets/converged-20261028/data/original-continuation-trace.csv` | `67bfffcc56e7cce1e7e04ba7546be48e6cda2339` |
| `assets/converged-20261028/figures/successful-currents.svg` | `78a369219a48e8f4b6d4ec9f0aa1bac853c818dd` |
| `assets/converged-20261028/figures/original-convergence-trace.svg` | `1221c04b211c5296412ae44a8ca35aaec9a0eea5` |
| `assets/converged-20261028/figures/frequency-sensitivity.svg` | `146a1af0befe379d80362d1e4af52c98e1befc53` |
| `complete_energy_scba.md` | `99b6772a85d8af290a897a47228b6e7e553a7745` |

## Wang literature benchmark used on screens 5–6

Primary paper: Wang, Wang and Zeng, *Physical Review B* **74**, 033408 (2006),
[doi:10.1103/PhysRevB.74.033408](https://doi.org/10.1103/PhysRevB.74.033408),
[author manuscript](https://arxiv.org/abs/cond-mat/0605028).
The comparison follows the paper's three-atom FPU-alpha junction and
Figure 2 approximation choices. It does not relabel the production
bubble-only Guo SCBA as Wang's selective mean field.

Readable model source:
`C:/Users/zhbho/OneDrive/Desktop/workspace/15. NEGFPy/negfpy/src/negfpy/anharmonic/toy/historical.py`.
The `_wang_paper_vertex` function builds cubic terms only on central bonds
(0,1) and (1,2), corresponding to
H3 = (t/3) sum_(i=1)^2 (u_i-u_(i+1))^3. The full model consists of harmonic
left/right leads and center, harmonic contact couplings, and this central
cubic interaction. With mass-weighted coordinates, the central harmonic
matrix has diagonal (kL+kC, 2kC, kC+kR), nearest-neighbor elements -kC, and
contact couplings -kL and -kR. Lead onsite blocks are 2kL+pL and 2kR+pR.
The cubic coefficient t is 1.8 eV/(angstrom^3 amu^(3/2)).

The comparison uses the explicitly named inferred author-legacy fixture,
not the separate literal final-caption fixture. Author-source legacy spring
inputs are (kL,kR,kC) = (2.5,2.3,2.2) times
f = 10/(eV_J/angstrom_m^2) = 0.6241509074, giving approximately
(1.5603773,1.4355471,1.3731320) eV/(angstrom^2 amu).
The onsite inputs are f times (0.01,0.02), approximately
(0.00624151,0.01248302) in the same units. Their legacy-unit assignment is
inferred from EPS agreement, not uniquely documented by the recoverable
source. The literal final-caption onsite interpretation does not match the
low-temperature ballistic vector curve. This conditional convention is
explicit in `wang_2006_inferred_author_legacy_figure2_fixture` and in the
local report's "Relationship to Wang and Mingo" section (lines 1071–1115).

The harmonic reference has Sigma_pp = 0. Wang second order uses a dynamic
G0G0 contour bubble plus a fixed-G0 static tadpole. Selective mean field
iterates the dressed-GG dynamic bubble while retaining that fixed-G0
tadpole. In the slides, V denotes the cubic tensor called T in the source;
O(V^2) concerns coupling order. Wang's fourth-order literature curve is not
claimed as an implemented or matched result.

The comparison CSVs are copied from the report's `data/` directory under
`C:/Users/zhbho/OneDrive/Desktop/workspace/15. NEGFPy/reports/phonon-phonon-interaction/toy_model_validation_latex/`
into `assets/toy-literature/wang2006/`, with LF line endings as documented above:

- `wang2006_harmonic.csv`
- `wang2006_published_reference_curves.csv`
- `wang2006_anharmonic_checkpoints.csv`

The byte-preserved `historical_paper_benchmarks_metrics.json` is copied from
the immutable `validated/ad2558961f42e58c15b54a7b2ebdf7219dd6d363/attempt-001/figures/historical/`
directory under the same `phonon-phonon-interaction/` report root.

The harmonic comparison spans 51 extracted temperatures, with
RMS/max differences 0.000123587/0.000277055 nW/K. Wang O(V^2) checkpoints
at 100, 300 and 500 K differ from the interpolated literature path by
-0.487431%, -0.265856% and -0.298343%. Selective-mean-field checkpoints
at 300 and 400 K differ by -0.279287% and -0.745976%. The recorded
anharmonic calculations use mean temperatures T with reservoirs T+5 K
and T-5 K. These demonstrate conditional checkpoint agreement with the
literature approximation, not unique recovery of the original plotted-run
settings or certification of the later silicon SCBA model. Literature
coordinates come from figure-extracted EPS vector paths, not author raw data.

No matching Mingo interacting benchmark is asserted. Its printed-normalized
harmonic Figure 4 result differs by 3.2301 pW/K RMS, while an unnormalized
half-weight sensitivity is noncertifying. No computed Mingo interacting
Figure 8 curve is available in this evidence.

## Retained independent toy-validation evidence

The independent-oracle and nine-DOF SCBA evidence below remains available
as supporting software validation. It is not the literature-comparison
content now shown on main screens 5–6.

Exact local source base:

`C:/Users/zhbho/OneDrive/Desktop/workspace/15. NEGFPy/reports/phonon-phonon-interaction/validated/ad2558961f42e58c15b54a7b2ebdf7219dd6d363/attempt-001/`

The immutable mirror's `README.md`, `PROVENANCE.json`,
`evidence/production_toy_gate.json` and `report-source/report.tex` identify
the dense-toy result at `v0.1.0-rc1`: 28 completed outcomes, 13 open-system
cases, 13 multidimensional cases, 13 scientific checkpoints and no critical
scientific failures. Strict report SHA-256:
`793ad0fa014f9322c73e1ebb84cb3327400e925a14228f3dbe0a0af075e38972`.

The copied PNGs originate from that mirror's `figures/production/`:

| Local copy | SHA-256 |
| --- | --- |
| `assets/toy-validation/figure_open_oracle_born.png` | `c540df3d1d214e0d4cb4a223f4dd101db8ca49638d48fa781bcef8b4893b931f` |
| `assets/toy-validation/figure_scba_validation.png` | `78d73471068fef597325e86a270e20b280333fa4fcbb7ab5297306936829d3aa` |

The three-mode oracle independently evaluates analytic surface spectra, Bose
emission/absorption, adaptive continuum convolution and principal-value
quadrature. Its linewidth is spectral FWHM/population-decay rate; the shift
is the dynamic cubic-bubble shift and excludes static tadpoles.

The nine-DOF SCBA campaign validates required initialization, conservation
and numerical checks. One doubled-lead-eta diagnostic shift comparison
exceeds its threshold; it is retained as nonblocking diagnostic evidence.
The figure must not be captioned “all refinements pass.” Dense-toy success
does not certify the silicon model or a physical interface.

## Primary literature and comparison scope

- Maassen and Lundstrom, *Journal of Applied Physics* **117**, 035104 (2015):
  [doi:10.1063/1.4905590](https://doi.org/10.1063/1.4905590),
  [author manuscript](https://arxiv.org/abs/1408.1631).
- Guo et al., *Physical Review B* **102**, 195412 (2020):
  [doi:10.1103/PhysRevB.102.195412](https://doi.org/10.1103/PhysRevB.102.195412).
- Guo et al., *Physical Review B* **103**, 174306 (2021):
  [doi:10.1103/PhysRevB.103.174306](https://doi.org/10.1103/PhysRevB.103.174306).
- Carrete et al., almaBTE, *Computer Physics Communications* **220**,
  351–362 (2017):
  [doi:10.1016/j.cpc.2017.06.023](https://doi.org/10.1016/j.cpc.2017.06.023).
- Simoncelli, Marzari and Mauri, *Physical Review X* **12**, 041011 (2022):
  [doi:10.1103/PhysRevX.12.041011](https://doi.org/10.1103/PhysRevX.12.041011).

The contrast is with conventional diagonal-population BTE. BTE can include
inelastic collisions, Bose statistics, interfaces and spatial/frequency-
resolved currents; these are not exclusive NEGF capabilities. Wigner and
related coherence extensions must not be grouped with population-only BTE.
Phase-sensitive interference and matrix correlations motivate the proposed
NEGF investigations. No proposed direction is presented as a verified new
finding or an established priority claim.

## Broad physical features and specific research questions

Screens 12–13 replace the former single prospective-question screen. The
first eleven screens are unchanged by this extension. Screen 12 introduces
the user's broad physical control variables before screen 13 identifies
three targeted questions. At the user's further request, screen 12 now
frames its BTE column as a specific simplifying assumption and the extension
required to remove that limitation. The NEGF column emphasizes one unified
open-device formulation, rather than separate transport equations for each
regime. The baseline assumptions differ by row; the table does not claim
that a single standard phonon BTE lacks all seven effects.

| Physical feature | BTE limitation and required extension | Included in the same NEGF framework |
| --- | --- | --- |
| Large temperature bias | Small-bias linearization misses large deviations; nonlinear BTE is the extension. | Hot and cold reservoirs drive occupations and spectra at the applied bias. |
| Ballistic–diffusive crossover | Bulk conductivity alone misses finite-length flow; finite-device BTE is required. | Ballistic harmonic transport and scattering-limited flow follow the same equations. |
| Temperature-dependent spectra | A fixed spectrum misses resonance changes; renormalized/self-consistent BTE extends the inputs and treatment. | Occupations, resonance shifts and broadening evolve together with scattering. |
| Phonon statistics | Classical populations miss Bose occupations; quantum/Bose BTE supplies them. Bose statistics is already standard in phonon BTE, as the visible footnote states. | Bose reservoir occupations and quantum correlations enter directly. |
| Contacts and interfaces | A bulk model has no explicit contacts; boundary/interface BTE supplies reservoir conditions and interface kernels. | Contacts, geometry and interface coupling enter the device model explicitly. |
| Wave interference | Diagonal populations do not retain phase; coherence/Wigner extensions go beyond this restriction. | Wave phase, interference and their modification by phonon collisions are retained. |
| Overlapping resonances | Sharp modes miss broad, overlapping spectra; generalized quantum kinetics is the broader extension. | Broadened spectra and frequency-dependent scattering are treated together. |

The takeaway is that one NEGF framework treats these effects together
without switching transport equations. This is a formulation advantage
within the chosen Hamiltonian and self-energy approximation, not a claim
that every BTE correction becomes exact or that all listed regimes are
validated by the current silicon calculations. The final row names a broad
class of generalized kinetic descriptions, not one uniquely defined BTE
amendment. Cubic-bubble SCBA does not automatically add neglected static
tadpoles, quartic interactions or every higher-order vertex contribution.

The broad features are control knobs, not automatic evidence of physics
that every BTE formulation misses. A useful NEGF research target connects
one of those knobs to a specifically phase-sensitive or spectral mechanism.
The existing fitted-silicon current values do not by themselves demonstrate
such a mechanism.

The three proposed questions on screen 13 are:

1. **Can collisions lift an interference blockade?** Start with a declared
   geometry having a harmonic interference dip. Follow its spectral current,
   resonance/antiresonance contrast and total current as temperature or
   interaction strength changes. Use conservation-checked controls with
   matched geometry and force constants. This is a proposed test, not a
   claim that scattering always enhances transport or a novelty claim.
2. **Does coherence disappear at the same length as ballistic–diffusive
   crossover?** Track an interference measure alongside length-dependent
   current/resistance. Loss of phase coherence and transition between
   ballistic and diffusive population transport are distinct concepts, so
   equality of their length scales must be tested rather than assumed.
3. **Can large bias reshape resonances and produce directional heat flow?**
   Use an asymmetric device, reverse the hot and cold reservoirs at fixed
   mean temperature, and include a symmetric control. Compare the
   bias-dependent spectra and currents with a matched nonlinear BTE
   reference. Large bias, temperature dependence or rectification alone is
   not proof of beyond-population-BTE physics.

Frequency and transverse-q convergence, conservation, the intended physical
interaction model and the validity/stability of the chosen SCBA approximation
come before physical conclusions. The compact GitHub silicon bundle did not
include a matched harmonic or BTE baseline. A user-confirmed harmonic
reference is now shown separately on screen 9, with raw-file provenance and
normalization checks still outstanding; no BTE baseline, interference-device
result or broad-bias validation is supplied. The questions are research
directions, not current findings, established priority or demonstrated novelty.

Primary sources for this scope:

- Li, Wang, Lee and Luo, *npj Computational Materials* **8**, 29 (2022),
  “Physics-informed deep learning for solving phonon Boltzmann transport
  equation with large temperature non-equilibrium,”
  [doi:10.1038/s41524-022-00712-y](https://doi.org/10.1038/s41524-022-00712-y).
  This is a direct counterexample to treating large temperature bias as
  fundamentally inaccessible to BTE.
- Maassen and Lundstrom, *J. Appl. Phys.* **117**, 035104 (2015),
  [doi:10.1063/1.4905590](https://doi.org/10.1063/1.4905590),
  [author manuscript](https://arxiv.org/abs/1408.1631).
  Their finite-bias Bose distribution difference is distinct from its
  small-bias expansion, and the transport solution spans ballistic and
  diffusive regimes with contact temperature jumps.
- Guo et al., *Phys. Rev. B* **102**, 195412 (2020),
  [doi:10.1103/PhysRevB.102.195412](https://doi.org/10.1103/PhysRevB.102.195412).
  NEGF follows populations and coherences together; the paper also obtains
  agreement with BTE in its silicon-film comparison, so small size alone
  does not establish a beyond-BTE mechanism.
- Simoncelli, Marzari and Mauri, *Phys. Rev. X* **12**, 041011 (2022),
  [doi:10.1103/PhysRevX.12.041011](https://doi.org/10.1103/PhysRevX.12.041011).
  Wigner transport extends the diagonal-population picture to include
  wave/coherence contributions.

## Historical August asset lineage

This folder descends from the NEGFPy briefing prepared on 5 August 2026:

- Original: `/home/zhouhb/Desktop/workspace/15. NEGFPy/reports/phonon-phonon-interaction/slides/negfpy-roadmap.html`.
- Original HTML SHA-256: `a24cad82b63211816fe1d8167cfbe73e771b1d92d2392f5671f29fe2cfca222c`.
- Original README SHA-256: `347f327e091445349f237fd24774693418c877e5c9ac51d70a798ac713d1bde2`.

These identify the historical source, not the current reorganized HTML.
The original copied-image identities remain:

```text
8474544cdc4015560fb76c842f66ab1719ae23864bbe490058ee71fe4da74660  report-figure-1.png
e6091154d69ec8280fe772df63703700fc35405755df1aa6b2a08f9fd109d4d3  report-table-1.png
98acae8f82d1a13109173efffbc0e20fd0de7c2555677b3ae887beea0280412a  report-figure-2.png
14c94a06edcbd89a07d59d9c29355e1b8a90689bea41025df76ef2de7715c246  historical_paper_benchmarks.png
adf06cd6050982d640561cd65267c8db49c3616974b53de0747a20afa20e6ad9  band_and_dos.png
695aa0218ef44acdb7d082efdab270b824ae131432dfaeb66f9232c202290380  conductivity_and_cumulative.png
```

The retained historical comparison image now supplies the Wang literature
panels on screen 6 under the explicit conditional convention above. It does
not certify the current silicon calculation. Its Mingo half-weight curve
remains sensitivity evidence, not a validated convention or a claimed match.

This reorganization summarizes existing evidence and user-reported ongoing
work. It performs no transport solve, raw-array replay, new scheduler query,
SSH operation or new HPC validation.


The standalone lifetime SVG embeds the unchanged source raster, clips only
the lifetime panel, and adds a metadata footer below the original plot.
Its PNG export is a browser rendering of that self-contained SVG; no plotted
point, axis scale, limit or rate conversion is modified.

The user clarified that the requested additional retarded Green-function
series should show convergence errors versus SCBA state. At the earlier
inspection, the GitHub branch was checked at
5258b8899d34360096f63ef77fa5ba5c012c398e;
its complete 567-entry tree contains the compact Sigma/current trace but
no G^r convergence history. A per-state G^r error and its normalization or
allowance are required before a separate numerical G^r curve can be added.
The current plot is explicitly labelled as nonlinear self-energy residuals.
The latest q14 scalar-result update does not supply this missing G^r
per-state history, so that pending requirement is unchanged.

### Per-scheme paper references on screen 3

The last column now gives clickable primary-paper references instead of
source-status labels. Harmonic NEGF cites Wang et al., PRB74,033408(2006),
Eq12; Wang second-order, selective mean field and fourth-order rows cite
Eq13, the selective-mean-field discussion and Fig1 of that same paper.
The Guo kernel and SCBA cite PRB102,195412(2020), with AppendixA supporting
the dressed-propagator replacement. The one-shot row is explicitly a
one-shot variant of the cited cubic kernel, not a separately named scheme
claimed to be presented in that paper. Mingo cites PRB74,125402(2006),Eq27.
Historical implementation and validation-status qualifications remain in
the speaker notes and the source discussion above.


### Silicon geometry and user-supplied harmonic comparison (screen 9)

The model uses a nominal five-cell complete-center-energy selection on
zero-based layers 2–6, inside a nine-cell harmonic/Green device. The frozen
transport matrix maps the primitive Si vectors onto a conventional [100]
cell with a = 5.433560030 Angstrom. Hence the nominal center length is
5a = 2.716780015 nm (displayed 2.72 nm), and the full device is
9a = 4.890204027 nm (displayed 4.89 nm). Each principal cell has eight atoms
and 24 Green DOF. The 132 active vertex coordinates retain extra endpoint
atoms in layers 1 and 7; the complete cubic vertex is not cropped at the
five-center selection boundaries. These are geometric model lengths.
No phonon mean free path ell was assigned or extracted from this run.

Pinned proof, transport matrix, primitive vectors, exact length arithmetic
and source links are preserved in
assets/presentation-20261028/silicon-reference-context.json. The frozen
study setup is in upstream commit 13e1ee6d1cd72a2fcc36d287404ca9da433a3d31,
scripts/run_site_energy_convergence.py lines 249–269, and the primitive
crystal fixture is pinned at 2ef67f5292b7aa448eff2cc0aa71a36155af4d0a.

A matched harmonic comparison means FC3 off / Sigma_pp=0 with the same FC2,
contacts, geometry, frequency/q grid and reservoir temperatures. The current
GitHub bundle supplies no numeric harmonic current. Historically the user
requested deferring that comparison until data became available. The user
initially supplied 0.3866, 0.3889 and 0.3892, with q = (4,1), 305/295 K,
at 600/900/1200 intervals. The user subsequently corrected the presentation
explicitly: **the harmonic result should be multiplied by ten**. The current
displayed harmonic heat currents are therefore **3.866, 3.889 and 3.892 nW**.
This latest instruction supersedes the earlier unit clarification. The ×10
factor is an explicit user correction; no separate interpretation of the
initial numbers as conductance is assumed. No raw harmonic file has yet
been provided. Both initial values and correction provenance are stored in
assets/presentation-20261028/harmonic-comparison-20261028.json.

The new figure assets/presentation-20261028/harmonic-scba-comparison.svg
compares those three supplied currents with the recorded SCBA currents
3.865724715832432, 3.861928382784723 and 3.888387717211064 nW. The earlier
frequency-sensitivity.svg is preserved. Every SCBA frequency-study point
has q = (4,1); the equal-Nq q = (1,4) control remains at 600 intervals and
is not presented as a two-dimensional mesh refinement. The q table retains
completed (4,1), (1,4), (1,2) and ongoing (4,2), and the model lengths stay
on the results screen.

After the explicit ×10 correction, the harmonic currents are close to the
SCBA currents. The earlier temporary tenfold-mismatch interpretation is
superseded and must not be carried into the current slides. No division of
the SCBA current by the temperature bias is applied. The plot presents the
corrected user reference and recorded SCBA data neutrally; it does not
establish physical enhancement or independently audit the raw harmonic
calculation. The earlier authenticated zero-input-self-energy file
location and expected hash remain historical retrieval context rather than
the source of the new user-supplied numbers.

### Cubic-interaction scaling shown on both silicon screens

Screens 9 and 10 state that **the cubic interaction amplitude is scaled by
g = 0.03 (3%) to facilitate SCBA convergence**. This describes the declared
weak-coupling fitted complete-center-energy model. It is not a claim to
full-strength silicon anharmonicity and does not change the harmonic FC2.
The equivalent convention is H3 -> g H3 (or Psi -> g Psi). Because the
bubble has two cubic vertices, its image carries g squared = 0.0009 at
fixed Green functions; the self-consistent Green functions, self-energy and
heat current are not simply rescaled after the calculation.

The exact current implementation is pinned at
2ef67f5292b7aa448eff2cc0aa71a36155af4d0a,
src/negfpy/anharmonic/transverse_channel_feedback.py: line 326 says input
R/C/D is already scaled and g squared multiplies the Born image once;
lines 336–337 define coupling and its square; line 463 multiplies born_c
and born_d by that square. Git blob SHA-1 is
31efed2c6454ae26ee63c79b53653b69c6b8df17. The vertex builder explicitly
works before coupling g in site_energy_boundary.py, lines 95 and 256.


### Clarified SCBA convergence figure

The convergence-evidence figure, now on screen 10, removes both grey horizontal tolerance lines
and replaces short line-key legends inside the data axes with marker-only
legends in the header space. Labels explicitly distinguish absolute
collision power, contact imbalance and total imbalance, all divided by the
original tolerance. The lower explanatory text relates spectral collision
energy exchange C_pp(omega) to its integrated net power P_pp and explains
that signed P_pp and J_L + J_R can cancel even though their absolute
magnitudes overlap in the plot. The self-energy residuals still establish
the fixed point; energy-balance errors are already tiny at earlier states.

A read-only before/after audit verified all six scientific line paths and
all 66 marker positions unchanged, both grey reference groups removed,
and SHA-256 identities of the three original scalar CSV/JSON files
unchanged. No physical data, threshold, normalization or SCBA state changed.


### Final publication scope

The user requested removal of the last proposed-research-questions slide before commit/push and GitHub Pages publication. The current NEGF section contains12visible slides and ends with the BTE extensions/unified NEGF comparison. Earlier discussion of specific proposed questions in this source log records the removed draft material, not a currently displayed slide. The remaining12slide sections are unchanged by the removal.
