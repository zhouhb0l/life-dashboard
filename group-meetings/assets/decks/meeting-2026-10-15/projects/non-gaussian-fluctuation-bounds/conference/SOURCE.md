# Universal Bounds on Non-Gaussian Fluctuations conference deck

Prepared on 19 August 2026 for the 20 August group meeting. The ten-screen
presentation follows the order of the current manuscript: information gap,
exact corridor, constructive proof, and Figure 2 panels a–e, followed by the
measurement decision and conclusion. Every screen has a full spoken script in
its Reveal speaker notes.

## Canonical scientific source

The deck was prepared from the local P08LMT manuscript snapshot:

    29. P08_LMT/paper/V5

Inputs refreshed after the manuscript's latest 19 August figure revision:

- `main.tex`: `0f78dcf67aecbfd31d38f9d0aeee193e7eb3fa5e99c13ae8d95acae4b5172632`
- `main.pdf`: `ba269bbff6da3db56c63dbb9e4d1e47493a232d295d9719df95309dd4872d776`
- `SM/supplement.tex`: `329fdf1f73038e7e912be1c1c469dfaee7ed631c0e5c77243bc1c042ae948de6`
- `SM/supplement.pdf`: `0964a34bc6fae89d98e034125b67f0ba4e1b9c7305eed8e37d79fe2968ebeada`
- `references_manual.tex`: `19ed95662caa0c21f7202fee29d44169d4689f704dd2a7b8eeb037ba441411c3`
- `figures/Figure1.pdf`: `50853b0a37636a721d4faeaa52383eee8e99dee1488d1b7b5b0bb5693a388175`
- `figures/Figure2.pdf`: `7567be795c4dce549509441fe6eafec85b31a1589e710e7e83ce0e7f57a225de`

The source paper and project files were read and copied only; they were not
edited by the deck work.

## Figure provenance

`assets/source/v5-fig1-universal-bounds.pdf` and
`assets/source/v5-fig2-many-body-evidence.pdf` are exact copies of the current
manuscript figures. The revised two-panel Figure 1 combines the exact
noise-conditioned corridor with the current-weighted transport-strength
profiles that realize its lower face, strict interior, and upper limiting
face. The deck uses lossless PDF crops of Figure 2a, 2b, 2c, and
the combined 2d–e row. Browser PNGs are 300-dpi renders of those vector crops.
Keeping 2d and 2e together preserves every native axis label and annotation.

Figure 2b is presented only over the displayed manuscript domain
`5 <= A <= 15` and `0 <= U/T <= 5`. The deck does not attach earlier coarse-map
cell counts or wider supplemental bounding ranges to this current panel. Its
four labels are reproduced as the paper defines them: Landauer compatible,
non-Gaussian exit only, Gaussian exit only, and both tests exiting.

The distribution and bounded-support diagrams on the motivation and proof
screens are deck schematics derived from the manuscript text and equations;
they are not labelled as paper figure panels. No AI-generated scientific image
or unrelated feasibility memo is used.

The main text and detailed supplement use different solver descriptions for
the weak-coupling campaign. To avoid a false attribution, the presentation
calls Figure 2b a “weak-coupling counted map” and names counted HEOM only for
the nonweak line cut where the provenance is unambiguous.

## Claim boundary

The result concerns stationary long-time, zero-frequency electronic particle
counting between exactly two normal, equal-temperature fermionic terminals at
known positive affinity and positive mean current. It tests compatibility with
fixed, passive, elastic, noninteracting Landauer scattering through the first
three cumulants and an arbitrary finite channel count.

A violation excludes every transmission in that null class. Passing establishes
three-cumulant compatibility only; neither outcome uniquely identifies a
microscopic mechanism.

## Runtime

The deck is self-contained within the group-meeting site:

- Reveal.js 6.0.1 from the local vendor bundle
- KaTeX 0.18.4 with auto-render from the local vendor bundle
- no CDN or remote runtime dependency

Escape posts the established `group-meeting:return-to-overview` message to the
parent meeting deck.
