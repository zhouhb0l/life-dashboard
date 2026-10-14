(() => {
  "use strict";

  const PASSCODE = "go";
  const ACCESS_KEY = "group-meeting-2026-10-15-access-go";
  const content = window.AUGUST_PROJECT_CONTENT;
  const portfolio = window.AUGUST_PROJECT_STATUS;

  const body = document.body;
  const gate = document.getElementById("gate");
  const form = document.getElementById("gate-form");
  const passcodeInput = document.getElementById("passcode");
  const gateError = document.getElementById("gate-error");
  const toolbar = document.getElementById("deck-toolbar");
  const lockButton = document.getElementById("lock-button");
  const sectionLabel = document.getElementById("section-label");
  const revealElement = document.querySelector(".reveal");
  const slidesRoot = document.getElementById("slides-root");
  const overviewGrid = document.getElementById("overview-grid");

  let overviewMarkup = "";
  let projectMap = new Map();

  let revealStarted = false;
  let currentProjectId = "";
  let lastProjectId = "";
  let openedFromOverview = false;
  let routeInProgress = false;

  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const scientificText = (value) => escapeHtml(value)
    .replace(/\\\(|\\\)/g, "")
    .replace(/\\mathcal\s*T/g, "𝒯")
    .replace(/\\chi/g, "χ")
    .replace(/\\omega/g, "ω")
    .replace(/\\Phi/g, "Φ")
    .replace(/\\Sigma/g, "Σ")
    .replace(/\\to/g, "→")
    .replace(/_\{([^{}]+)\}/g, "<sub>$1</sub>")
    .replace(/\^\{([^{}]+)\}/g, "<sup>$1</sup>")
    .replaceAll("\n", "<br>");

  const statusTone = (status) => String(status || "active")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  const placeholderSlide = (project) => ({
    kicker: `${project.name} | new project`,
    title: project.name,
    lead: "This project was added to the 20 August portfolio.",
    points: [
      "No 25 June project content exists for this new research thread.",
      "The first research update has not yet been added."
    ],
    layout: "motivation-grid",
    takeaway: "Content pending."
  });

  const copiedProjectMap = new Map((content?.projects || []).map((project) => [project.id, project]));
  [window.TAN_PROJECT_20261015, window.WTE2_PROJECT_20261015].filter(Boolean).forEach((project) => {
    copiedProjectMap.set(project.id, project);
  });
  const activeProjects = (portfolio?.projects || []).map((status) => {
    const copiedProject = copiedProjectMap.get(status.contentProjectId || status.id);
    if (!copiedProject) {
      return {
        ...status,
        scienceSlides: [placeholderSlide(status)],
        hasCopiedContent: false
      };
    }

    return {
      ...copiedProject,
      ...status,
      scienceSlides: copiedProject.scienceSlides,
      hasCopiedContent: true
    };
  });

  projectMap = new Map(activeProjects.map((project) => [project.id, project]));

  const renderOverviewCard = (project) => `
    <a class="overview-card${project.meetingFocus ? ' discuss-card' : ''}" href="#project/${encodeURIComponent(project.id)}/0" data-project-link="${escapeHtml(project.id)}" aria-label="Open ${escapeHtml(project.name)} project${project.meetingFocus ? ', presentation focus' : ''}">
      <div class="overview-card-head">
        <h3>${scientificText(project.name)}</h3>
        <span class="overview-status ${statusTone(project.status)}">${scientificText(project.status)}</span>
      </div>
      <p>${scientificText(project.summary)}</p>
      <div class="overview-progress-meta">
        <span>${scientificText(project.phase)}</span>
      </div>
    </a>
  `;

  overviewGrid.innerHTML = activeProjects.map(renderOverviewCard).join("");
  overviewMarkup = slidesRoot.innerHTML;

  const renderPointList = (points) => {
    if (!points?.length) return "";
    return `<ul class="project-points">${points.map((point) => `<li>${scientificText(point)}</li>`).join("")}</ul>`;
  };

  const renderPointGrid = (points) => {
    if (!points?.length) return "";
    return `
      <div class="project-point-grid">
        ${points.map((point, index) => `
          <article>
            <span>${String(index + 1).padStart(2, "0")}</span>
            <p>${scientificText(point)}</p>
          </article>
        `).join("")}
      </div>
    `;
  };

  const figureItems = (slide) => {
    if (slide.figures?.length) return slide.figures;
    if (slide.figure) {
      return [{
        src: slide.figure,
        label: slide.figureLabel || "",
        alt: slide.title
      }];
    }
    return [];
  };

  const renderFigures = (slide) => {
    const figures = figureItems(slide);
    if (!figures.length) return "";
    const countClass = `count-${Math.min(figures.length, 4)}`;
    return `
      <div class="project-figures ${countClass}">
        ${figures.map((figure) => `
          <figure class="${figure.colorKey ? 'has-color-key' : ''}">
            ${figure.label ? `<span>${escapeHtml(figure.label)}</span>` : ""}
            ${figure.colorKey ? `<div class="figure-color-key">${figure.keyDescription ? `<p>${escapeHtml(figure.keyDescription)}</p>` : ''}<table aria-label="Color meaning"><tbody>${figure.colorKey.map(row => `<tr><th>${escapeHtml(row[0])}</th><td>${escapeHtml(row[1])}</td><td>${escapeHtml(row[2])}</td></tr>`).join('')}</tbody></table></div>` : ''}
            ${figure.viewport ? `<svg class="figure-viewport" viewBox="${figure.viewport.join(' ')}" role="img" aria-label="${escapeHtml(figure.alt || figure.label || slide.title)}"><svg x="${figure.viewport[0]}" y="${figure.viewport[1]}" width="${figure.viewport[2]}" height="${figure.viewport[3]}" viewBox="${figure.viewport.join(' ')}" overflow="hidden"><image href="${escapeHtml(figure.src)}" width="${figure.imageSize[0]}" height="${figure.imageSize[1]}" /></svg>${(figure.annotations || []).map(note => `<text x="${note.x}" y="${note.y}" font-family="Arial, sans-serif" font-size="17" fill="#152c35">${escapeHtml(note.text)}</text>`).join("")}</svg>` : `<img src="${escapeHtml(figure.src)}" alt="${escapeHtml(figure.alt || figure.label || slide.title)}">`}
          </figure>
        `).join("")}
      </div>
    `;
  };

  const renderMethodFlow = (steps) => `
    <div class="project-method-flow">
      ${steps.map((step, index) => `
        <article>
          <div><span>${String(index + 1).padStart(2, "0")}</span><small>${scientificText(step.label)}</small></div>
          <h3>${scientificText(step.title)}</h3>
          <p>${scientificText(step.text)}</p>
        </article>
      `).join("")}
    </div>
  `;

  const renderTable = (table) => `
    <div class="project-table-wrap">
      <table>
        <thead><tr>${table.columns.map((column) => `<th>${scientificText(column)}</th>`).join("")}</tr></thead>
        <tbody>
          ${table.rows.map((row) => `
            <tr class="${row.highlight ? "highlight" : ""}">
              ${row.cells.map((cell) => `<td>${scientificText(cell)}</td>`).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;

  const renderMetrics = (metrics) => `
    <div class="project-metrics">
      ${metrics.map((metric) => `
        <article>
          <small>${scientificText(metric.label)}</small>
          <strong>${scientificText(metric.value)}</strong>
          ${metric.note ? `<span>${scientificText(metric.note)}</span>` : ""}
        </article>
      `).join("")}
    </div>
  `;

  const renderEvidence = (slide) => {
    const figures = renderFigures(slide);
    if (slide.table) return renderTable(slide.table);
    if (slide.methodFlow) return renderMethodFlow(slide.methodFlow);
    if (slide.metrics?.length) {
      return `<div class="project-metric-evidence">${figures}${renderMetrics(slide.metrics)}</div>`;
    }
    if (figures) return figures;
    return renderPointGrid(slide.points);
  };

  const renderReviewSlide = (slide) => {
    const figures = renderFigures(slide);
    const responsePoints = slide.responsePoints?.length
      ? `<ul>${slide.responsePoints.map((point) => `<li>${scientificText(point)}</li>`).join("")}</ul>`
      : "";
    return `
      <div class="project-main review-main ${figures ? "has-review-figures" : "review-text-only"} layout-${escapeHtml(slide.layout || "review-response")}">
        <article class="review-comment-card">
          <div class="review-card-label">
            <small>${scientificText(slide.reviewerLabel || "Original reviewer comment")}</small>
            ${slide.commentPart ? `<span>${scientificText(slide.commentPart)}</span>` : ""}
          </div>
          <blockquote>${scientificText(slide.reviewerComment)}</blockquote>
        </article>
        <div class="review-response-panel">
          <article class="review-response-card">
            <small>${scientificText(slide.responseTitle || "Response in brief")}</small>
            ${responsePoints}
            ${slide.takeaway ? `<strong>${scientificText(slide.takeaway)}</strong>` : ""}
          </article>
          ${figures ? `<div class="review-figure-panel">${figures}</div>` : ""}
        </div>
      </div>
    `;
  };

  const renderProjectSlide = (project, slide, index) => {
    const total = project.scienceSlides.length;
    const isReviewSlide = Boolean(slide.reviewerComment);
    const hasVisual = figureItems(slide).length || slide.methodFlow || slide.table || slide.metrics;
    const list = hasVisual ? renderPointList(slide.points) : "";
    const sourceLabel = project.sourceLabel || (project.hasCopiedContent ? "Copied background" : "New project");
    const sourceValue = project.sourceValue || (project.hasCopiedContent ? content.sourceMeeting : "Content pending");
    const fallbackCaption = project.hasCopiedContent
      ? `${escapeHtml(project.name)} · copied project content`
      : `${escapeHtml(project.name)} · first update pending`;
    const baseNotes = slide.notes || project.notes || (project.hasCopiedContent
      ? "Background content copied from 25 June 2026. Return to the status board before selecting another project."
      : "This new project has no 25 June content. Add its first research update when ready.");
    const publicationNotes = project.publication ? `
      <p><strong>Publication reference:</strong> ${escapeHtml(project.publication.reference)}</p>
      <p><strong>DOI:</strong> <a href="${escapeHtml(project.publication.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(project.publication.doi)}</a></p>
      <p><strong>Publication link:</strong> <a href="${escapeHtml(project.publication.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(project.publication.url)}</a></p>
    ` : "";
    const notes = `<p>${scientificText(baseNotes)}</p>${publicationNotes}`;
    return `
      <section class="project-detail-slide ${project.presentationStyle === 'conference' ? 'wte2-conference' : ''}" data-section-label="${escapeHtml(project.shortName || project.name)}" data-project-id="${escapeHtml(project.id)}" data-project-page="${index}">
        <div class="frame project-frame">
          <header class="project-header">
            <a class="project-back" href="#overview" data-back-to-overview>
              <span aria-hidden="true">←</span> Projects
            </a>
            <div class="project-heading">
              <span class="eyebrow">${scientificText(slide.kicker || project.name)}</span>
              <h2 tabindex="-1">${scientificText(slide.title)}</h2>
              <div class="project-status-line">
                <span class="project-status ${statusTone(project.status)}">${scientificText(project.status)}</span>
                <span>${scientificText(project.phase)}</span>
                <strong>${Number(project.progress || 0)}%</strong>
              </div>
            </div>
            <div class="project-source">
              <small>${escapeHtml(sourceLabel)}</small>
              <strong>${escapeHtml(sourceValue)}</strong>
            </div>
          </header>

          ${isReviewSlide ? renderReviewSlide(slide) : `
            <div class="project-main ${hasVisual ? "has-visual" : "text-only"} layout-${escapeHtml(slide.layout || "standard")}">
              <div class="project-copy">
                ${slide.lead ? `<p class="project-lead">${scientificText(slide.lead)}</p>` : ""}
                ${list}
                ${slide.takeaway ? `
                  <div class="project-takeaway">
                    <small>Takeaway</small>
                    <strong>${scientificText(slide.takeaway)}</strong>
                  </div>
                ` : ""}
              </div>
              <div class="project-evidence">${renderEvidence(slide)}</div>
            </div>
          `}

          <footer class="project-footer">
            <span class="project-caption">${slide.caption ? scientificText(slide.caption) : fallbackCaption}</span>
            <span class="project-keyboard">← / → to navigate · Esc for projects</span>
            <strong>${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}</strong>
          </footer>
        </div>
        <aside class="notes">${notes}</aside>
      </section>
    `;
  };

  const renderExternalProject = (project) => {
    const deck = project.externalDeck;
    const sourceLabel = deck.sourceLabel || "Imported snapshot";
    const sourceDate = deck.sourceDate || "Source date not recorded";
    const sourceValue = deck.slideCount
      ? sourceDate + " · " + deck.slideCount + " slides"
      : sourceDate;
    const sourceNote = deck.sourceNote
      || "Imported from the independent " + deck.title + " deck dated " + sourceDate + ". Use its own arrows or keyboard controls.";
    return `
      <section class="external-project-slide" data-section-label="${escapeHtml(project.shortName || project.name)}" data-project-id="${escapeHtml(project.id)}" data-project-page="0">
        <div class="external-project-frame">
          <iframe
            class="external-project-iframe"
            src="${escapeHtml(deck.src)}"
            title="${escapeHtml(deck.title)} presentation, ${escapeHtml(sourceLabel.toLowerCase())} ${escapeHtml(sourceDate)}"
            loading="eager"
            allow="fullscreen"
          ></iframe>
          <div class="external-project-overlay">
            <div class="external-project-source" aria-label="${escapeHtml(sourceLabel)} source">
              <small>${escapeHtml(sourceLabel)}</small>
              <strong>${escapeHtml(sourceValue)}</strong>
            </div>
            <a class="external-project-back" href="#overview" data-back-to-overview>
              <span aria-hidden="true">←</span> Projects
            </a>
          </div>
        </div>
        <aside class="notes">${escapeHtml(sourceNote)} Escape returns to the project list.</aside>
      </section>
    `;
  };

  const renderProject = (project, pageIndex = 0) => {
    if (Reveal.isOverview()) Reveal.toggleOverview(false);
    const needsNewMarkup = currentProjectId !== project.id;
    currentProjectId = project.id;
    lastProjectId = project.id;
    sectionLabel.textContent = project.name;

    if (project.externalDeck) {
      if (needsNewMarkup) {
        slidesRoot.innerHTML = renderExternalProject(project);
        Reveal.sync();
        Reveal.configure({ controls: false, progress: false, slideNumber: false });
      }

      routeInProgress = true;
      Reveal.slide(0);
      Reveal.layout();
      const iframe = slidesRoot.querySelector(".external-project-iframe");
      const focusExternalDeck = () => {
        iframe?.focus({ preventScroll: true });
        iframe?.contentWindow?.focus();
      };
      if (iframe && !iframe.dataset.focusBound) {
        iframe.dataset.focusBound = "true";
        iframe.addEventListener("load", focusExternalDeck, { once: true });
      }
      window.requestAnimationFrame(() => {
        routeInProgress = false;
        focusExternalDeck();
      });
      return;
    }

    const safeIndex = Math.min(Math.max(Number(pageIndex) || 0, 0), project.scienceSlides.length - 1);

    if (needsNewMarkup) {
      slidesRoot.innerHTML = project.scienceSlides
        .map((slide, index) => renderProjectSlide(project, slide, index))
        .join("");
      Reveal.sync();
      Reveal.configure({ controls: true, progress: true, slideNumber: false });
    }

    routeInProgress = true;
    Reveal.slide(safeIndex);
    Reveal.layout();
    window.requestAnimationFrame(() => {
      routeInProgress = false;
      Reveal.getCurrentSlide()?.querySelector("h2")?.focus({ preventScroll: true });
    });
  };

  const renderOverview = () => {
    if (Reveal.isOverview()) Reveal.toggleOverview(false);
    if (currentProjectId || !slidesRoot.querySelector(".status-opening")) {
      currentProjectId = "";
      slidesRoot.innerHTML = overviewMarkup;
      Reveal.sync();
      Reveal.configure({ controls: false, progress: false, slideNumber: false });
      routeInProgress = true;
      Reveal.slide(0);
      Reveal.layout();
      window.requestAnimationFrame(() => {
        routeInProgress = false;
        if (lastProjectId) {
          slidesRoot.querySelector(`[data-project-link="${CSS.escape(lastProjectId)}"]`)?.focus({ preventScroll: true });
        }
      });
    }
    sectionLabel.textContent = "Project status";
  };

  const readRoute = () => {
    const route = window.location.hash.replace(/^#/, "");
    if (!route || route === "overview") return { type: "overview" };
    const match = route.match(/^project\/([^/]+)(?:\/(\d+))?$/);
    if (!match) return { type: "overview", invalid: true };
    let projectId;
    try {
      projectId = decodeURIComponent(match[1]);
    } catch (error) {
      return { type: "overview", invalid: true };
    }
    const project = projectMap.get(projectId);
    if (!project) return { type: "overview", invalid: true };
    return { type: "project", project, pageIndex: Number(match[2] || 0) };
  };

  const syncRoute = () => {
    if (!revealStarted) return;
    const route = readRoute();
    if (route.type === "project") {
      renderProject(route.project, route.pageIndex);
      return;
    }
    renderOverview();
    if (route.invalid) window.history.replaceState(null, "", "#overview");
  };

  const returnToOverview = () => {
    if (!currentProjectId) return;
    if (openedFromOverview && window.history.length > 1) {
      openedFromOverview = false;
      window.history.back();
    } else {
      window.location.hash = "overview";
    }
  };

  const startReveal = async () => {
    if (revealStarted) return;
    revealStarted = true;

    const plugins = typeof RevealNotes === "undefined" ? [] : [RevealNotes];
    await Reveal.initialize({
      width: 1600,
      height: 900,
      margin: 0,
      minScale: 0.2,
      maxScale: 2,
      controls: false,
      controlsTutorial: false,
      progress: false,
      hash: false,
      history: false,
      center: false,
      slideNumber: false,
      transition: "fade",
      backgroundTransition: "fade",
      plugins
    });

    Reveal.on("slidechanged", (event) => {
      const slide = event.currentSlide;
      sectionLabel.textContent = slide?.dataset.sectionLabel || "Group meeting";
      if (!currentProjectId || routeInProgress) return;
      const pageIndex = Reveal.getIndices(slide).h;
      const nextHash = `#project/${encodeURIComponent(currentProjectId)}/${pageIndex}`;
      if (window.location.hash !== nextHash) window.history.replaceState(null, "", nextHash);
    });

    syncRoute();
  };

  const unlock = () => {
    sessionStorage.setItem(ACCESS_KEY, "1");
    body.classList.remove("locked");
    gate.hidden = true;
    toolbar.hidden = false;
    revealElement.setAttribute("aria-hidden", "false");
    startReveal();
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (passcodeInput.value.trim() === PASSCODE) {
      gateError.textContent = "";
      unlock();
      return;
    }

    gateError.textContent = "Incorrect passcode.";
    passcodeInput.select();
  });

  slidesRoot.addEventListener("click", (event) => {
    const projectLink = event.target.closest("[data-project-link]");
    if (projectLink) {
      openedFromOverview = true;
      lastProjectId = projectLink.dataset.projectLink;
      return;
    }

    if (event.target.closest("[data-back-to-overview]")) {
      event.preventDefault();
      returnToOverview();
    }
  });

  window.addEventListener("hashchange", syncRoute);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && currentProjectId) {
      event.preventDefault();
      event.stopImmediatePropagation();
      returnToOverview();
    }
  }, { capture: true });

  window.addEventListener("message", (event) => {
    const iframe = slidesRoot.querySelector(".external-project-iframe");
    if (!iframe || event.source !== iframe.contentWindow) return;
    if (event.origin !== window.location.origin) return;
    if (event.data?.type === "group-meeting:return-to-overview") returnToOverview();
  });

  lockButton.addEventListener("click", () => {
    sessionStorage.removeItem(ACCESS_KEY);
    window.location.hash = "";
    window.location.reload();
  });

  if (!portfolio?.projects?.length || !content?.projects?.length || !projectMap.size) {
    gateError.textContent = "Project content could not be loaded.";
    form.querySelector("button").disabled = true;
  } else if (sessionStorage.getItem(ACCESS_KEY) === "1") {
    unlock();
  } else {
    window.requestAnimationFrame(() => passcodeInput.focus());
  }
})();
