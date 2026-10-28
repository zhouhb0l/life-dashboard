# Bounds on Thermal Cumulants conference deck

Prepared on 19 August 2026 for the 20 August group meeting.

The portfolio name is **Bounds on Thermal Cumulants**. The demonstrated P10
result is more precise: a four-temperature divided-difference witness formed
from four steady **mean heat currents**. The deck does not claim a bound on a
stochastic heat cumulant or full-counting-statistics observable.

## Canonical scientific source

The source package was read from the preserved QME Discovery Pipeline:

    26. QME Discovery Pipeline/legacy/source-26-current/Project/P10_Heat_Current_Shape_Witness

Authoritative inputs:

- README.md — executive claim, M14 anchor, numerical gates, and scope.
- theory/theorem.md — Laplace representation, finite-node theorem,
  four-point witness, TLS control, and error certificate.
- literature_and_gap.md — primary-literature boundary and narrow novelty
  proposition.
- data/raw/m14_inverse_beta_shape_receipt_20260808.json — frozen receipt.
- figures/evidence_figure.* and caption — frozen four-panel visual evidence.

The canonical package reports an audit freeze of 8 August 2026 and a
**STRICT GO, narrow** status. Its own MANIFEST.sha256 and fail-closed
evidence verifier passed before this deck was prepared. The canonical source
was not edited.

## Copied evidence

The PNG, PDF, and caption in assets/ are exact copies of the canonical P10
files. assets/SHA256SUMS records their hashes. The slide crops are performed
non-destructively with CSS; no pixels were changed.

## Shape terminology

The motivation slide distinguishes three lower-order failures. Order zero is
current reversal under the chosen hot-to-cold sign convention. Order one is
sampled negative differential thermal conductance: heating the hot bath makes
the current fall. Order two is coordinate-specific loss of convexity in the
hot inverse temperature, not ordinary convexity in temperature.

No broadly established standalone device name was found for the order-two
failure. The deck therefore uses the descriptive phrase **beta-curvature
anomaly** and states explicitly that it can occur while the current and its
differential conductance remain positive. This terminology is not presented
as a literature-coined effect.

## Literature context

The deck follows the P10 literature audit and adds one newer harmonic-Landauer
background source:

J. Dai and Z. Tian, “On the Landauer formula in interfacial thermal
transport,” *MRS Communications* **16**, 710–714 (2026),
doi:10.1557/s43579-026-00941-y.

That paper supports background on the harmonic Landauer comparison class. It
does not support P10's inverse-temperature theorem, numerical evidence, or
priority. A focused search on 19 August 2026 found no exact collision with
the all-order divided-difference hierarchy or the four-temperature first
failure at order three; this is not an absolute priority claim and must be
repeated before submission.

## Application extension

Two application slides were added from an algebraic reinterpretation of the
first four frozen M14 current nodes. With the nodes written symmetrically as
beta-bar minus 3a, beta-bar minus a, beta-bar plus a, and beta-bar plus 3a,
the current swings obey

    W3 = S(3a) - 3 S(a)
    S_on - S_off = W3 / 2

For the frozen HEOM Padé-4/depth-2 anchor, the large-to-small normalized gain
is 0.9497843231, or 5.0216% below triple scaling. Under the specified
equal-dwell, quasistatic inverse-temperature dither protocol, the probe-gain
ratio is 0.9246764846, or 7.5324% attenuation. Davies and K2 M1024
calculations show the same compression and attenuation with closely matching,
but distinct, ratios reported on the slides.

These identities are re-derived from the frozen receipt; no new simulation
data were generated. They support finite-amplitude gain compression and a
quasistatic dither-attenuation protocol. A current plateau, high-contrast
valve, finite-frequency response, control-energy budget, and device
performance in physical units remain prospective.

The design discussion that motivated this operational interpretation is
recorded at:

    https://chatgpt.com/share/6a858af0-7d68-83ec-a0c9-ecc3027babf2

That shared conversation is discussion provenance, not scientific evidence.
Related device context is B. Li, L. Wang, and G. Casati, *Applied Physics
Letters* 88, 143501 (2006), doi:10.1063/1.2191730, and J. Wu, L. Wang, and
B. Li, *Physical Review E* 85, 061112 (2012),
doi:10.1103/PhysRevE.85.061112. Their NDTR/transistor and limiter concepts
are contrasts; P10 does not claim those device functions are demonstrated.

## Runtime

The deck is self-contained within the group-meeting site:

- Reveal.js 6.0.1 (local vendor copy)
- KaTeX 0.18.4 with auto-render (local vendor copy)
- no CDN or remote runtime dependency

Escape posts the established group-meeting:return-to-overview message to the
parent meeting deck.
