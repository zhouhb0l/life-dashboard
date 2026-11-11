(() => {
  "use strict";

  const slidesRoot = document.querySelector(".slides");
  const progressFill = document.getElementById("deck-progress-fill");
  const counter = document.getElementById("deck-counter");
  const sections = Array.from(slidesRoot.querySelectorAll(":scope > section"));
  let mathErrors = 0;

  const updateChrome = () => {
    const index = Reveal.getIndices().h || 0;
    const current = sections[index];
    const label = current?.dataset.section || "Slide " + (index + 1);
    const appendix = current?.classList.contains("appendix-slide");
    progressFill.style.width = (((index + 1) / sections.length) * 100) + "%";
    counter.textContent = (appendix ? "APP · " : "") + String(index + 1).padStart(2, "0") + " / " + String(sections.length).padStart(2, "0") + " · " + label;
  };

  const renderMath = () => {
    if (typeof renderMathInElement !== "function") {
      document.documentElement.dataset.mathStatus = "unavailable";
      return;
    }

    renderMathInElement(slidesRoot, {
      delimiters: [
        { left: "\\[", right: "\\]", display: true },
        { left: "\\(", right: "\\)", display: false }
      ],
      throwOnError: false,
      strict: "warn",
      errorCallback: (message) => {
        mathErrors += 1;
        console.error("KaTeX: " + message);
      }
    });
    document.documentElement.dataset.mathStatus = mathErrors ? "errors-" + mathErrors : "ready";
  };

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || window.parent === window) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.parent.postMessage({ type: "group-meeting:return-to-overview" }, "*");
  }, true);

  const start = async () => {
    renderMath();
    await Reveal.initialize({
      width: 1600,
      height: 900,
      margin: 0,
      minScale: 0.2,
      maxScale: 1.5,
      center: false,
      controls: true,
      controlsTutorial: false,
      progress: false,
      slideNumber: false,
      hash: false,
      history: false,
      keyboard: true,
      overview: false,
      touch: true,
      transition: "fade",
      backgroundTransition: "fade",
      plugins: [RevealNotes]
    });

    Reveal.on("slidechanged", updateChrome);
    Reveal.on("ready", updateChrome);
    updateChrome();
    document.documentElement.dataset.deckStatus = "ready";
  };

  start().catch((error) => {
    document.documentElement.dataset.deckStatus = "failed";
    console.error("Non-Gaussian-fluctuation deck initialization failed.", error);
  });
})();
