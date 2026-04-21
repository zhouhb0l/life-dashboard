(function () {
  "use strict";

  var STORAGE_KEY = "life-dashboard.tingxie.library.v2";
  var DEFAULT_SAMPLE = {
    title: "Primary Chinese Dictation",
    rawText: [
      "\u5b66\u6821 | School",
      "\u8001\u5e08 | Teacher",
      "\u6211\u4eec\u4e00\u8d77\u5b66\u4e60\u3002 | We learn together.",
      "\u4eca\u5929\u7684\u5929\u6c14\u5f88\u597d\u3002 | The weather is very good today.",
      "\u8bf7\u4f60\u628a\u4f5c\u4e1a\u4ea4\u7ed9\u8001\u5e08\u3002 | Please give your homework to the teacher."
    ].join("\n")
  };

  function createId() {
    return "set-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function readStorage() {
    try {
      var parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (!parsed || !Array.isArray(parsed.sets)) {
        return null;
      }
      return {
        selectedId: parsed.selectedId || "",
        sets: parsed.sets
          .filter(function (set) {
            return set && typeof set.id === "string";
          })
          .map(function (set) {
            return {
              id: set.id,
              title: String(set.title || "Untitled Set"),
              rawText: String(set.rawText || ""),
              updatedAt: typeof set.updatedAt === "number" ? set.updatedAt : Date.now()
            };
          })
      };
    } catch (error) {
      return null;
    }
  }

  function writeStorage(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function cleanLines(rawText) {
    return String(rawText || "")
      .replace(/\r\n/g, "\n")
      .split("\n");
  }

  function parseItems(rawText) {
    return cleanLines(rawText)
      .map(function (line) {
        return line.trim();
      })
      .filter(function (line) {
        return line && !line.startsWith("#") && !/^title:/i.test(line);
      })
      .map(function (line) {
        var dividerIndex = line.indexOf("|");
        if (dividerIndex === -1) {
          return {
            text: line,
            clue: ""
          };
        }

        return {
          text: line.slice(0, dividerIndex).trim(),
          clue: line.slice(dividerIndex + 1).trim()
        };
      })
      .filter(function (item) {
        return item.text;
      });
  }

  function countCharacters(text) {
    return Array.from(String(text || "").replace(/\s+/g, "")).length;
  }

  function blankBoxCount(text) {
    var count = countCharacters(text);
    if (count <= 4) {
      return 8;
    }
    if (count <= 8) {
      return 12;
    }
    return Math.min(count + 4, 20);
  }

  function makeEmptySet(index) {
    return {
      id: createId(),
      title: "Tingxie " + index,
      rawText: "",
      updatedAt: Date.now()
    };
  }

  function summarizeSet(set) {
    var items = parseItems(set.rawText);
    return {
      itemCount: items.length,
      charCount: items.reduce(function (sum, item) {
        return sum + countCharacters(item.text);
      }, 0)
    };
  }

  async function loadDefaultSet() {
    try {
      var response = await fetch("./dictation_items.txt");
      if (!response.ok) {
        throw new Error("Default file unavailable");
      }

      var fileText = await response.text();
      var lines = cleanLines(fileText);
      var title = DEFAULT_SAMPLE.title;
      var bodyLines = [];

      lines.forEach(function (line) {
        var trimmed = line.trim();
        if (!trimmed) {
          return;
        }
        if (/^title:/i.test(trimmed)) {
          title = trimmed.split(":").slice(1).join(":").trim() || title;
          return;
        }
        bodyLines.push(trimmed);
      });

      return {
        id: createId(),
        title: title,
        rawText: bodyLines.join("\n"),
        updatedAt: Date.now()
      };
    } catch (error) {
      return {
        id: createId(),
        title: DEFAULT_SAMPLE.title,
        rawText: DEFAULT_SAMPLE.rawText,
        updatedAt: Date.now()
      };
    }
  }

  async function ensureState() {
    var stored = readStorage();
    if (stored && stored.sets.length) {
      if (!stored.selectedId || !stored.sets.some(function (set) { return set.id === stored.selectedId; })) {
        stored.selectedId = stored.sets[0].id;
        writeStorage(stored);
      }
      return stored;
    }

    var seeded = await loadDefaultSet();
    var freshState = {
      selectedId: seeded.id,
      sets: [seeded]
    };
    writeStorage(freshState);
    return freshState;
  }

  function findSet(state, setId) {
    return state.sets.find(function (set) {
      return set.id === setId;
    }) || null;
  }

  function exportLibrary(state) {
    var payload = {
      exportedAt: new Date().toISOString(),
      sets: state.sets
    };
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = "tingxie-library.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function normalizeImportedSet(set, index) {
    return {
      id: typeof set.id === "string" && set.id ? set.id : createId(),
      title: String(set.title || "Imported Set " + (index + 1)),
      rawText: String(set.rawText || ""),
      updatedAt: Date.now()
    };
  }

  function renderSetCard(set, selectedId) {
    var summary = summarizeSet(set);
    var isActive = set.id === selectedId;
    var previewItems = parseItems(set.rawText)
      .slice(0, 2)
      .map(function (item) { return item.text; })
      .join(" / ");

    return [
      '<button class="set-card' + (isActive ? " active" : "") + '" type="button" data-set-id="' + escapeHtml(set.id) + '">',
      "<strong>" + escapeHtml(set.title) + "</strong>",
      "<span>" + summary.itemCount + " items</span>",
      "<span>" + (previewItems ? escapeHtml(previewItems) : "No content yet") + "</span>",
      "</button>"
    ].join("");
  }

  function buildEditorMarkup(set) {
    if (!set) {
      return '<div class="empty-state">No dictation set is selected yet. Add a set from the left and it will open here automatically.</div>';
    }

    return [
      '<div class="form-grid">',
      '<label>Set Title<input id="setTitleInput" type="text" value="' + escapeHtml(set.title) + '" placeholder="Example: Week 3 Tingxie"></label>',
      '<label>Chinese Words Or Sentences<textarea id="setItemsInput" placeholder="One item per line&#10;Optional clue: 中文 | school">' + escapeHtml(set.rawText) + "</textarea></label>",
      '<div class="action-row">',
      '<button class="primary" id="openWorksheetButton" type="button">Open Student Worksheet</button>',
      '<button class="secondary" id="openAnswersButton" type="button">Open All Answers</button>',
      '<button class="secondary" id="duplicateSetButton" type="button">Duplicate Set</button>',
      '<button class="danger" id="deleteSetButton" type="button">Delete Set</button>',
      "</div>",
      "</div>",
      '<div class="stats" id="setStats"></div>',
      '<div class="tip-box">',
      "<h2>How It Works</h2>",
      "<p>The worksheet prints one selected set on a compact single page. The answer pack combines every saved set into a smaller-font printable sheet to save paper.</p>",
      "</div>"
    ].join("");
  }

  function renderStats(set) {
    var statsHost = document.getElementById("setStats");
    if (!statsHost || !set) {
      return;
    }

    var items = parseItems(set.rawText);
    var hintCount = items.filter(function (item) {
      return !!item.clue;
    }).length;
    var charCount = items.reduce(function (sum, item) {
      return sum + countCharacters(item.text);
    }, 0);
    var longest = items.reduce(function (max, item) {
      return Math.max(max, countCharacters(item.text));
    }, 0);

    statsHost.innerHTML = [
      '<div class="stat"><strong>' + items.length + '</strong><span>Items in this set</span></div>',
      '<div class="stat"><strong>' + hintCount + '</strong><span>Items with clues</span></div>',
      '<div class="stat"><strong>' + charCount + '</strong><span>Total visible characters</span></div>',
      '<div class="stat"><strong>' + longest + '</strong><span>Longest item length</span></div>'
    ].join("");
  }

  function setSaveStatus(message) {
    var status = document.getElementById("saveStatus");
    if (status) {
      status.textContent = message;
    }
  }

  function setHeroCount(count) {
    var node = document.getElementById("heroCount");
    if (node) {
      node.textContent = count + (count === 1 ? " set" : " sets");
    }
  }

  function syncHash(setId) {
    if (setId) {
      history.replaceState(null, "", "#set=" + encodeURIComponent(setId));
    } else {
      history.replaceState(null, "", location.pathname);
    }
  }

  async function initIndexPage() {
    var state = await ensureState();
    var setList = document.getElementById("setList");
    var editorContent = document.getElementById("editorContent");
    var addSetButton = document.getElementById("addSetButton");
    var exportButton = document.getElementById("exportButton");
    var importButton = document.getElementById("importButton");
    var importFile = document.getElementById("importFile");
    var hashMatch = location.hash.match(/set=([^&]+)/);

    if (hashMatch) {
      var requestedId = decodeURIComponent(hashMatch[1]);
      if (findSet(state, requestedId)) {
        state.selectedId = requestedId;
      }
    }

    function persist() {
      writeStorage(state);
      setSaveStatus("Saved in browser");
      setHeroCount(state.sets.length);
      syncHash(state.selectedId);
    }

    function render() {
      setList.innerHTML = state.sets.map(function (set) {
        return renderSetCard(set, state.selectedId);
      }).join("");

      var activeSet = findSet(state, state.selectedId);
      editorContent.innerHTML = buildEditorMarkup(activeSet);
      setHeroCount(state.sets.length);
      renderStats(activeSet);

      if (!activeSet) {
        return;
      }

      var titleInput = document.getElementById("setTitleInput");
      var itemsInput = document.getElementById("setItemsInput");
      var openWorksheetButton = document.getElementById("openWorksheetButton");
      var openAnswersButton = document.getElementById("openAnswersButton");
      var duplicateSetButton = document.getElementById("duplicateSetButton");
      var deleteSetButton = document.getElementById("deleteSetButton");

      function saveActiveSet() {
        activeSet.title = titleInput.value.trim() || "Untitled Set";
        activeSet.rawText = itemsInput.value.replace(/\r\n/g, "\n");
        activeSet.updatedAt = Date.now();
        persist();
        renderStats(activeSet);
        setList.innerHTML = state.sets.map(function (set) {
          return renderSetCard(set, state.selectedId);
        }).join("");
      }

      titleInput.addEventListener("input", saveActiveSet);
      itemsInput.addEventListener("input", saveActiveSet);

      openWorksheetButton.addEventListener("click", function () {
        saveActiveSet();
        window.open("./worksheet.html?set=" + encodeURIComponent(activeSet.id), "_blank");
      });

      openAnswersButton.addEventListener("click", function () {
        saveActiveSet();
        window.open("./answers.html", "_blank");
      });

      duplicateSetButton.addEventListener("click", function () {
        saveActiveSet();
        var copy = {
          id: createId(),
          title: activeSet.title + " Copy",
          rawText: activeSet.rawText,
          updatedAt: Date.now()
        };
        state.sets.unshift(copy);
        state.selectedId = copy.id;
        persist();
        render();
      });

      deleteSetButton.addEventListener("click", function () {
        if (state.sets.length === 1) {
          activeSet.title = "Untitled Set";
          activeSet.rawText = "";
          activeSet.updatedAt = Date.now();
          persist();
          render();
          return;
        }

        state.sets = state.sets.filter(function (set) {
          return set.id !== activeSet.id;
        });
        state.selectedId = state.sets[0].id;
        persist();
        render();
      });
    }

    setList.addEventListener("click", function (event) {
      var card = event.target.closest("[data-set-id]");
      if (!card) {
        return;
      }
      state.selectedId = card.getAttribute("data-set-id");
      persist();
      render();
    });

    addSetButton.addEventListener("click", function () {
      var next = makeEmptySet(state.sets.length + 1);
      state.sets.unshift(next);
      state.selectedId = next.id;
      persist();
      render();
    });

    exportButton.addEventListener("click", function () {
      persist();
      exportLibrary(state);
      setSaveStatus("Library exported");
      window.setTimeout(function () {
        setSaveStatus("Saved in browser");
      }, 1800);
    });

    importButton.addEventListener("click", function () {
      importFile.click();
    });

    importFile.addEventListener("change", function () {
      var file = importFile.files && importFile.files[0];
      if (!file) {
        return;
      }

      var reader = new FileReader();
      reader.onload = function () {
        try {
          var parsed = JSON.parse(String(reader.result || "{}"));
          if (!parsed || !Array.isArray(parsed.sets) || !parsed.sets.length) {
            throw new Error("Invalid library");
          }

          state.sets = parsed.sets.map(normalizeImportedSet);
          state.selectedId = state.sets[0].id;
          persist();
          render();
          setSaveStatus("Library imported");
          window.setTimeout(function () {
            setSaveStatus("Saved in browser");
          }, 1800);
        } catch (error) {
          setSaveStatus("Import failed");
          window.setTimeout(function () {
            setSaveStatus("Saved in browser");
          }, 1800);
        }
      };
      reader.readAsText(file, "utf-8");
      importFile.value = "";
    });

    persist();
    render();
  }

  function worksheetClue(item, index) {
    if (item.clue) {
      return item.clue;
    }
    if (countCharacters(item.text) <= 4) {
      return "Listen and write the word";
    }
    return "Listen and write the sentence";
  }

  function renderWorksheetItem(item, index) {
    var boxes = new Array(blankBoxCount(item.text))
      .fill('<span class="write-box" aria-hidden="true"></span>')
      .join("");

    return [
      '<section class="entry">',
      '<div class="entry-head">',
      '<div class="entry-number">' + (index + 1) + '.</div>',
      '<div class="entry-prompt">',
      '<div class="clue">' + escapeHtml(worksheetClue(item, index)) + '</div>',
      '<div class="fallback">' + escapeHtml(item.text.length > 18 ? "Long sentence layout enabled" : "Compact writing boxes") + '</div>',
      "</div>",
      "</div>",
      '<div class="write-grid">' + boxes + "</div>",
      "</section>"
    ].join("");
  }

  function chooseWorksheetColumns(itemCount) {
    return itemCount <= 5 ? 1 : 2;
  }

  function fitWorksheet(sheet, body, itemCount) {
    var scaleCandidates = itemCount > 12
      ? [0.9, 0.86, 0.82, 0.78, 0.74]
      : [1, 0.96, 0.92, 0.88, 0.84, 0.8];

    for (var i = 0; i < scaleCandidates.length; i += 1) {
      sheet.style.setProperty("--fit-scale", String(scaleCandidates[i]));
      if (body.scrollHeight <= body.clientHeight + 2) {
        break;
      }
    }
  }

  async function initWorksheetPage() {
    var state = await ensureState();
    var params = new URLSearchParams(location.search);
    var requestedId = params.get("set") || state.selectedId;
    var set = findSet(state, requestedId);
    var titleNode = document.getElementById("worksheetTitle");
    var subtitleNode = document.getElementById("worksheetSubtitle");
    var metaNode = document.getElementById("worksheetMeta");
    var toolbarTitle = document.getElementById("toolbarTitle");
    var grid = document.getElementById("worksheetGrid");
    var sheet = document.getElementById("worksheetSheet");
    var body = document.getElementById("worksheetBody");
    var printButton = document.getElementById("printButton");

    printButton.addEventListener("click", function () {
      window.print();
    });

    if (!set) {
      titleNode.textContent = "Set not found";
      subtitleNode.textContent = "Open the editor and create a set first.";
      metaNode.textContent = "No printable content";
      toolbarTitle.textContent = "Student Worksheet";
      grid.innerHTML = '<div class="empty-message">This dictation set does not exist in the current browser yet. Open the editor, create or import your sets, then come back to print.</div>';
      return;
    }

    var items = parseItems(set.rawText);
    titleNode.textContent = set.title;
    subtitleNode.textContent = "Student Worksheet";
    metaNode.textContent = items.length + (items.length === 1 ? " item" : " items") + " arranged for one-page printing";
    toolbarTitle.textContent = set.title;
    grid.innerHTML = items.length
      ? items.map(renderWorksheetItem).join("")
      : '<div class="empty-message">This set is empty. Go back to the editor, add some Chinese words or sentences, then reopen the worksheet.</div>';

    sheet.style.setProperty("--columns", String(chooseWorksheetColumns(items.length)));
    fitWorksheet(sheet, body, items.length);
  }

  function renderAnswerSet(set) {
    var items = parseItems(set.rawText);
    if (!items.length) {
      return "";
    }

    var rows = items.map(function (item, index) {
      var hint = item.clue ? '<div class="hint">' + escapeHtml(item.clue) + "</div>" : "";
      return [
        '<div class="answer-row">',
        "<strong>" + (index + 1) + ".</strong>",
        "<span>" + escapeHtml(item.text) + hint + "</span>",
        "</div>"
      ].join("");
    }).join("");

    return [
      '<section class="set-answer">',
      "<h2>" + escapeHtml(set.title) + "</h2>",
      '<div class="answer-list">' + rows + "</div>",
      "</section>"
    ].join("");
  }

  async function initAnswersPage() {
    var state = await ensureState();
    var columns = document.getElementById("answersColumns");
    var subtitle = document.getElementById("answersSubtitle");
    var toolbarTitle = document.getElementById("answersToolbarTitle");
    var printButton = document.getElementById("printAnswersButton");
    var setsWithContent = state.sets.filter(function (set) {
      return parseItems(set.rawText).length;
    });

    printButton.addEventListener("click", function () {
      window.print();
    });

    toolbarTitle.textContent = "Compact Answer Pack";
    subtitle.textContent = setsWithContent.length + (setsWithContent.length === 1 ? " set" : " sets") + " in a paper-saving layout";

    columns.innerHTML = setsWithContent.length
      ? setsWithContent.map(renderAnswerSet).join("")
      : '<div class="empty-message">There are no saved answers yet. Open the editor, create a few dictation sets, and the answer pack will appear here automatically.</div>';
  }

  function init() {
    var page = document.body && document.body.dataset ? document.body.dataset.page : "";
    if (page === "index") {
      initIndexPage();
      return;
    }
    if (page === "worksheet") {
      initWorksheetPage();
      return;
    }
    if (page === "answers") {
      initAnswersPage();
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
