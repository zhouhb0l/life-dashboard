# Au–MoS₂ rod and top-contact presentation — 28 October 2026

The meeting presentation in `index.html` adapts the imported five-slide
presentation into the user's requested three-slide, figure-led sequence.
The original presentation and its evidence remain available locally.

## Preserved original snapshot

- Upstream repository: https://github.com/zhouhb0l/AuMoS2
- Pinned commit: `d2554ed06a847f8173ef9f8d3cb58d7c03aceeb2`
- Source: `presentations/rod15_sbh_reveal/AuMoS2_SBH.html`
- Source link: https://github.com/zhouhb0l/AuMoS2/blob/d2554ed06a847f8173ef9f8d3cb58d7c03aceeb2/presentations/rod15_sbh_reveal/AuMoS2_SBH.html
- Git blob SHA-1: `ed1d8c993aeff94a2aac790641906002450b8a7d`
- Original file SHA-256: `3d3ccecaeb133ef88f443c17eacc67ced8b494c04fbf68db17ecafea69a64b64`
- Exact file size: 2,841,599 bytes
- Source footer date: 26 October 2026; adapted meeting: 28 October 2026.
- Byte-exact local original: `source/AuMoS2_SBH.original.html`.

The commit, blob, size and SHA-256 above identify the preserved original,
not the subsequently edited meeting `index.html`.

The local numbered workspace mirror `3. AuMoS2` did not contain the current
rod presentation. Its Git remote identified the repository above; the current
source was retrieved through the connected GitHub account. The editable
upstream `index.html` is an older one-slide source, so the documented expanded
standalone `AuMoS2_SBH.html` was the imported meeting source. No source
project file or earlier meeting was edited. No Au-specific AGENTS.md was found in
the local mirror or pinned repository tree.

## Requested three-slide sequence

1. **Four electron-SBH results and atomic structures.**
   `figures/electron-sbh-summary.svg` shows the four original regional
   far-core electron-offset baselines. Whiskers span the minimum and
   maximum over the 81 primary extraction settings. The accompanying
   `figures/atomic-structures.svg` shows the actual F10, R10, F15 and R15
   coordinates on the same x–z scale.
2. **F10/R10 evidence.** `figures/10-contour-electron.svg` presents the
   electron-side viewport of the original spatial PDOS contour;
   `figures/10-pdos-electron.svg` shows PDOS against energy relative to the
   Fermi level; `figures/10-sensitivity-range.svg` visualizes the paired
   F-minus-R electron-offset sensitivity.
3. **F15/R15 evidence.** The equivalent three figures are
   `figures/15-contour-electron.svg`, `figures/15-pdos-electron.svg` and
   `figures/15-sensitivity-range.svg`.

Only electron SBH is displayed. Hole SBH and the separate spatial-fit
numerical estimates are not shown. Technical validation and extraction
settings are retained in the original snapshot and source data rather than
the slide narrative.

## Numerical values and estimator consistency

All four summary points use the **original regional far-core estimator**,
not the separate native-strip spatial-fit estimator. The latter gives an
F10 electron estimate near 0.189 eV; mixing it with the original regional
sensitivity envelope would change the estimator. The contour's spatial
edge guides remain contextual evidence, not the numerical summary source.

| Case | Original electron baseline (eV) | 81-setting primary envelope (eV) |
|---|---:|---:|
| F10 | 0.1895485214738834 | 0.1723707928496094–0.20635080480544277 |
| R10 | 0.1450891876549322 | 0.12019743420821576–0.14538196004822956 |
| F15 | 0.16526194106999498 | 0.13812569291992818–0.17486535588696184 |
| R15 | 0.09775615996891075 | 0.07991034950800345–0.12017703943351386 |

Paired F-minus-R differences use matched settings, not independent extrema
of the two case envelopes:

| Series | Baseline difference (meV) | Matched primary range (meV) |
|---|---:|---:|
| F10 − R10 | 44.4593338189512 | 44.302680828910646–66.18539459718584 |
| F15 − R15 | 67.50578110108423 | 54.500826848892306–74.09920199464219 |

The summaries and sensitivity graphics derive from exact pinned source
files in `source/analysis/`. Their upstream paths, Git blob hashes and
SHA-256 hashes are recorded in `source/analysis/SOURCE.json`:

- `10-slide_data.json` and `15-slide_data.json` preserve the original
  baseline, raw far-core PDOS, primary matched settings and envelopes.
- `10-analysis_summary.json` and `15-analysis_summary.json` preserve the
  associated analysis reports.

**Extraction sensitivity is method dependence.** The whiskers are
min–max envelopes, not symmetric error bars, standard deviations,
confidence intervals, independent statistical samples or total physical
uncertainty. The 81 primary settings preserve a lower R electron offset
within each series. This statement does not apply to every broader stress
test; the broader 15-series stress set includes ordering reversals. The
primary envelopes and broader stress tests must not be conflated.

## Preserved and adapted figures

Six original embedded SVGs were extracted without modification from the
preserved standalone HTML:

- `figures/10-pdos.svg`, `figures/15-pdos.svg`;
- `figures/10-sensitivity.svg`, `figures/15-sensitivity.svg`;
- `figures/10-contour.svg`, `figures/15-contour.svg`.

The electron-side presentation viewports and simplified plots have separate
filenames; the six originals remain unchanged. New plots select and present
the existing evidence. No new SCF/DOS calculation or fresh SBH extraction
is implied. The PDOS contour is a Mo+S atomic projection, not a continuous
real-space LDOS integral. Its source spatial-edge guides are contextual;
they do not replace the regional far-core summary estimator.

## Atomic structure provenance and dimensions

`source/structures/` preserves four coordinate files and a `SOURCE.json`
manifest. F10/R10 are copied from the accepted local workspace coordinates
and match pinned Git blobs; F15/R15 are retrieved from the pinned source
repository. `atomic-structures.svg` draws every source atom once in a true
x–z projection, with y used only for depth order. All four cases use the
same physical scale. No atoms, bonds, wrapping or replicated cells were
added. Circle radii distinguish species and are illustrative; circle
centres derive directly from the coordinates.

**10 and 15 are structure labels, not literal 10 nm and 15 nm widths.**
Actual Au widths are F10 1.106 nm, R10 0.902 nm, F15 1.506 nm and R15
1.317 nm. All four cells are 44.246 × 19.155 × 40 Å. Au counts differ
(150, 105, 200 and 225 respectively), so these comparisons do not isolate
a shape-only or facet-only causal effect.

## Interpretation and use

Open the presentation from the 28 October meeting's Au–MoS₂ project entry.
Figures and the inherited presentation runtime are local for offline use;
external source links require internet when opened. The presentation
reports equilibrium electronic spectral offsets in the exposed-sheet
region. For the first three rod slides, an under-contact band edge, vertical tunnelling barrier, transport
activation energy, contact resistance or size-converged bulk-like channel
is not established by these figures. These source limits are preserved.

## Appended archived Au top-contact results (slides 4–6)

The original three rod-contact slide sections remain byte-identical. Three screens append the earlier Au top-contact evidence from the nonlocal-SBH project. The user selected raw vertical PDOS with “vertical SBH unresolved” because no unique covered-region conduction onset or defensible uncertainty can be extracted from these spectra.

### Atomic structures

Source: local `NSCCscratch/DeviceStudioProject/AuMoS2Au/AuMoS2SBH/{P,F0,F10}/Device/{scf.input,NanodcalObject.json}`, matched to the Au plotting pipeline in `P7. NonlocalSBH/dataAnalysis/PLot_For_publication_Au/fittedLDOS.py`. P has 66 Mo, 132 S and 120 Au; each defect cell has 66 Mo, 130 S and 120 Au. Two symmetric top-S sites are removed, one near each contact. Au has five metal layers at each end. `figures/top-contact-structures.svg` uses actual Cartesian x–z positions at one scale, no added atoms or bonds. Both missing sites are marked with hollow circles. Coordinates, input hashes and source paths are in `source/top-contact/structures/`.

Raw Cartesian x cell: 120.641 Å. The archived plotting pipeline rotates positions by 30°. F0→F2 displacement is 5.484 Å in original Cartesian x, while the final-paper nominal 2d label is 6.3 Å. The slide retains 0d…10d as source case labels without converting this axis to nanometres. No channel length, interface plane or corrected manuscript fit is inferred.

### Lateral electron SBH

Definition: Φlat = ECchannel(0+) − ECcovered(0−), the channel-to-covered conduction-edge step at the contact edge. This differs from the rod exposed-sheet EC−EF proxy; the datasets are not plotted as one estimator.

| Case | Midpoint (eV) | Archived extraction bracket (eV) |
|---|---:|---:|
| Pristine | 0.150 | equal source endpoints; uncertainty unresolved |
| 0d | 0.675 | 0.650–0.700 |
| 2d | 0.425 | 0.400–0.450 |
| 4d | 0.295 | 0.280–0.310 |
| 6d | 0.200 | 0.180–0.220 |
| 8d | 0.160 | 0.140–0.180 |
| 10d | 0.165 | 0.130–0.200 |

Numeric source: `P7. NonlocalSBH/Figures/dft_sbh_prediction/scripts/SBHcurve_errorBar.py`, lines 25–49. Byte-exact script is preserved as `source/top-contact/SBHcurve_errorBar.original.py`; SHA-256 is recorded in `lateral-sbh.json`. The figure is reproduced by `build-top-contact-figures.mjs`. Dots are bracket midpoints; whiskers are the exact LDOS extraction bounds, not standard deviations or confidence intervals. Pristine is a reference line without a claimed error range. Lines between vacancy points guide the eye and are not a fit.

The final manuscript/figure rounds near/far Au values to about 0.68/0.16 eV. Reference: Zhou and Zhang, *Nonlocal Electrostatic Origin of Schottky-Barrier Variability in 2D Contacts*, Nano Letters **26**, 13130–13135 (2026), https://doi.org/10.1021/acs.nanolett.6c03959.

### Vertical PDOS and unresolved barrier

Source atom-PDOS: `AuMoS2SBH/{P,F0,F10}/Device/DOS/DensityOfStates.json`, with matching geometry. Mean over five interior covered Mo atoms at the left Au contact after the original 30° coordinate rotation. Native energies and DOS are converted from Hartree to eV consistently; EF=0 is the source energy reference. The full 200-point ±2 eV curves, unit conversions, selected atom indices, source SHA-256 hashes and coordinates are recorded in `source/top-contact/vertical-pdos.json`. The figure shows the native samples near EF, without smoothing, baseline subtraction or zeroing of spectral tails.

Finite covered-region PDOS through EF prevents a unique zero-DOS conduction-onset assignment. A numerical vertical SBH/error bar is therefore not shown. The older approximately 0.10 eV benchmark value has no archived uncertainty; the `phi_a` values in the old plotting script are hand-chosen drawing guides. Neither is reused as extracted vertical data. This does not establish a zero barrier or a transport activation energy. Contact/region variation and geometry conventions require validation before assigning a quantitative vertical onset.
