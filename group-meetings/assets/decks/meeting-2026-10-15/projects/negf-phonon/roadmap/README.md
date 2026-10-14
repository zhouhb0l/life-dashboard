# NEGFPy roadmap slides

Open `negfpy-roadmap.html` in a browser. Use the arrow keys, Page Up/Page
Down, Space, Home, and End to navigate. Browser print can export the deck as
one slide per page.

The equation blocks use MathJax LaTeX rendering from the jsDelivr CDN. If the
browser is offline, the same equations remain visible in a typographic HTML
fallback.

The deck uses report figures by relative path, so keep the `slides/` folder
inside `reports/phonon-phonon-interaction/`. It is written for an external
audience and deliberately distinguishes:

- the published Wang/Mingo toy-model benchmark context;
- the 0.2.0 bulk FC2/FC3 reference quantities;
- the separate bulk-SMRTA/RTA conductivity track; and
- the in-progress 0.3.0 and planned 0.4.0 device work.

Primary benchmark sources are the Wang/Mingo comparison figure, the
phono3py Si-PBEsol reference, and `reports/bulk-rta-1.0.0/`.

The method-context slide retains the toy report's exact Table 1 and Figure 2
approximation-scheme material. Rendered crops of Figure 1, Table 1, and
Figure 2 are retained under `slides/assets/` as source material. Internal
toy-gate metrics are intentionally omitted from the presentation.

Slide 2 also contains an inline SVG Dyson/Feynman-diagram map for the bare
propagator G₀, successive G₀Σ<sub>pp</sub> insertions, the resummed dressed G,
and the cubic-bubble distinction between Born and SCBA. Tadpole/quartic
branches excluded from the first production release are noted below the map.

The deck is intentionally concise for presentation use; slide 4 gives the
Wang/Mingo literature figure most of the available space.
