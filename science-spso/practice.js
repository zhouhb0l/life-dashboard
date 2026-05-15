(function () {
  var STORAGE_KEY = "science-spso-practice-v1";
  var MIXED_SLUG = "interdisciplinary-challenge-set";
  var FORMAL_TEST = {
    year: 2026,
    month: 5,
    day: 19,
    label: "Formal Test",
    display: "Tuesday, 19 May 2026"
  };
  var root = document.getElementById("appRoot");
  var resetButton = document.getElementById("resetProgress");
  var coreTopics = QUESTION_TOPICS.filter(function (topic) {
    return topic.slug !== MIXED_SLUG;
  });
  var mixedTopic = QUESTION_TOPICS.find(function (topic) {
    return topic.slug === MIXED_SLUG;
  });
  var questionById = {};
  var activeSession = null;
  var notice = "";

  QUESTION_BANK.forEach(function (question) {
    questionById[question.id] = question;
  });

  function esc(value) {
    return String(value || "").replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      }[char];
    });
  }

  function pad2(value) {
    return String(value).padStart(2, "0");
  }

  function localDateKey(date) {
    return date.getFullYear() + "-" + pad2(date.getMonth() + 1) + "-" + pad2(date.getDate());
  }

  function todayKey() {
    return localDateKey(new Date());
  }

  function datePlus(days) {
    var date = new Date();
    date.setDate(date.getDate() + days);
    return localDateKey(date);
  }

  function yesterdayKey() {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    return localDateKey(date);
  }

  function formalTestDate() {
    return new Date(FORMAL_TEST.year, FORMAL_TEST.month - 1, FORMAL_TEST.day);
  }

  function startOfLocalDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function daysUntilFormalTest() {
    var today = startOfLocalDay(new Date());
    var exam = startOfLocalDay(formalTestDate());
    return Math.round((exam.getTime() - today.getTime()) / 86400000);
  }

  function examPhase() {
    var daysLeft = daysUntilFormalTest();
    if (daysLeft > 3) {
      return {
        daysLeft: daysLeft,
        label: "Foundation Sprint",
        focus: "Map weak areas, build accuracy, and keep mixed cases active.",
        dailyTargets: [5, 11, 16],
        sprintSize: 22,
        tasks: ["Diagnostic Sprint", "Daily Quest", "Weak Topic Drill"]
      };
    }
    if (daysLeft === 3) {
      return {
        daysLeft: daysLeft,
        label: "Weakness Repair",
        focus: "Prioritize mistakes, weak topics, and short mixed reasoning sets.",
        dailyTargets: [6, 13, 18],
        sprintSize: 20,
        tasks: ["Daily Quest", "Mistake Review", "Mixed Missions"]
      };
    }
    if (daysLeft === 2) {
      return {
        daysLeft: daysLeft,
        label: "Mock And Review",
        focus: "Run one mock-style set, then review every miss carefully.",
        dailyTargets: [6, 13, 18],
        sprintSize: 40,
        tasks: ["Mock Test", "Mistake Review", "Daily Quest"]
      };
    }
    if (daysLeft === 1) {
      return {
        daysLeft: daysLeft,
        label: "Light Consolidation",
        focus: "Keep it calm: review errors, confidence, and core mechanisms.",
        dailyTargets: [5, 8, 10],
        sprintSize: 12,
        tasks: ["Mistake Review", "Daily Quest", "Mixed Missions"]
      };
    }
    if (daysLeft === 0) {
      return {
        daysLeft: daysLeft,
        label: "Test-Day Warm-Up",
        focus: "Short warm-up only. Protect attention and confidence.",
        dailyTargets: [3, 6, 8],
        sprintSize: 8,
        tasks: ["Daily Quest", "Mistake Review"]
      };
    }
    return {
      daysLeft: daysLeft,
      label: "Post-Test Reflection",
      focus: "Review what was difficult and keep useful science habits alive.",
      dailyTargets: [4, 8, 10],
      sprintSize: 12,
      tasks: ["Mistake Review", "Mixed Missions"]
    };
  }

  function emptyState() {
    return {
      version: 1,
      attempts: {},
      sessions: [],
      daily: null,
      streak: { count: 0, last: "" }
    };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return emptyState();
      }
      var parsed = JSON.parse(raw);
      if (!parsed || parsed.version !== 1) {
        return emptyState();
      }
      parsed.attempts = parsed.attempts || {};
      parsed.sessions = parsed.sessions || [];
      parsed.streak = parsed.streak || { count: 0, last: "" };
      return parsed;
    } catch (error) {
      return emptyState();
    }
  }

  var state = loadState();

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function hashValue(text) {
    var hash = 2166136261;
    for (var index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return Math.abs(hash >>> 0);
  }

  function randomRank(id, seed) {
    return hashValue(seed + ":" + id) / 4294967295;
  }

  function answerLetter(index) {
    return String.fromCharCode(65 + index);
  }

  function attemptFor(id) {
    return state.attempts[id] || {
      seen: 0,
      correct: 0,
      wrong: 0,
      box: 0,
      last: "",
      nextDue: "",
      confidence: "think",
      lastChoice: null,
      reasons: {},
      recovered: 0
    };
  }

  function dueNow(id) {
    var attempt = attemptFor(id);
    return attempt.seen > 0 && attempt.nextDue && attempt.nextDue <= todayKey();
  }

  function questionRank(question, seed) {
    var attempt = attemptFor(question.id);
    var dueBoost = dueNow(question.id) ? -120 : 0;
    var weakBoost = attempt.wrong > attempt.correct ? -80 : 0;
    var unseenBoost = attempt.seen === 0 ? -45 : 0;
    return dueBoost + weakBoost + unseenBoost + attempt.box * 22 + attempt.seen * 4 + randomRank(question.id, seed);
  }

  function rankedQuestions(pool, seed) {
    return pool.slice().sort(function (a, b) {
      return questionRank(a, seed) - questionRank(b, seed);
    });
  }

  function addUnique(target, pool, count, seed) {
    rankedQuestions(pool, seed).forEach(function (question) {
      if (target.length >= count) {
        return;
      }
      if (target.indexOf(question.id) === -1) {
        target.push(question.id);
      }
    });
  }

  function topicQuestions(slug) {
    return QUESTION_BANK.filter(function (question) {
      return question.topicSlug === slug;
    });
  }

  function coreQuestions() {
    return QUESTION_BANK.filter(function (question) {
      return question.topicSlug !== MIXED_SLUG;
    });
  }

  function mixedQuestions() {
    return QUESTION_BANK.filter(function (question) {
      return question.topicSlug === MIXED_SLUG;
    });
  }

  function weakTopicSlugs() {
    return coreTopics.slice().sort(function (a, b) {
      return topicMastery(a.slug).percent - topicMastery(b.slug).percent;
    }).slice(0, 8).map(function (topic) {
      return topic.slug;
    });
  }

  function weakQuestionPool() {
    var weak = weakTopicSlugs();
    return coreQuestions().filter(function (question) {
      return weak.indexOf(question.topicSlug) !== -1;
    });
  }

  function dueQuestionPool() {
    return QUESTION_BANK.filter(function (question) {
      return dueNow(question.id) || attemptFor(question.id).wrong > attemptFor(question.id).correct;
    });
  }

  function generateDailyIds() {
    var today = todayKey();
    var phase = examPhase();
    if (state.daily && state.daily.date === today && state.daily.phase === phase.label) {
      var valid = state.daily.ids.filter(function (id) {
        return questionById[id];
      });
      if (valid.length) {
        return valid;
      }
    }

    var ids = [];
    addUnique(ids, dueQuestionPool(), phase.dailyTargets[0], today + ":due");
    addUnique(ids, weakQuestionPool(), phase.dailyTargets[1], today + ":weak");
    addUnique(ids, mixedQuestions(), phase.dailyTargets[2], today + ":mixed");
    addUnique(ids, QUESTION_BANK, phase.dailyTargets[2], today + ":fill");

    state.daily = { date: today, phase: phase.label, ids: ids };
    saveState();
    return ids;
  }

  function generateExamSprintIds() {
    var today = todayKey();
    var phase = examPhase();
    var ids = [];

    if (phase.daysLeft <= 0) {
      addUnique(ids, dueQuestionPool(), 3, today + ":exam:due");
      addUnique(ids, weakQuestionPool(), 6, today + ":exam:weak");
      addUnique(ids, mixedQuestions(), phase.sprintSize, today + ":exam:mixed");
      addUnique(ids, QUESTION_BANK, phase.sprintSize, today + ":exam:fill");
      return ids.slice(0, phase.sprintSize);
    }

    if (phase.daysLeft === 1) {
      addUnique(ids, dueQuestionPool(), 5, today + ":exam:due");
      addUnique(ids, weakQuestionPool(), 9, today + ":exam:weak");
      addUnique(ids, mixedQuestions(), phase.sprintSize, today + ":exam:mixed");
      addUnique(ids, QUESTION_BANK, phase.sprintSize, today + ":exam:fill");
      return ids.slice(0, phase.sprintSize);
    }

    if (phase.daysLeft === 2) {
      addUnique(ids, dueQuestionPool(), 8, today + ":exam:due");
      addUnique(ids, weakQuestionPool(), 24, today + ":exam:weak");
      addUnique(ids, mixedQuestions(), phase.sprintSize, today + ":exam:mixed");
      addUnique(ids, QUESTION_BANK, phase.sprintSize, today + ":exam:fill");
      return ids.slice(0, phase.sprintSize);
    }

    addUnique(ids, dueQuestionPool(), 6, today + ":exam:due");
    addUnique(ids, weakQuestionPool(), 14, today + ":exam:weak");
    addUnique(ids, mixedQuestions(), phase.sprintSize, today + ":exam:mixed");
    addUnique(ids, QUESTION_BANK, phase.sprintSize, today + ":exam:fill");
    return ids.slice(0, phase.sprintSize);
  }

  function generateDiagnosticIds() {
    var ids = [];
    coreTopics.forEach(function (topic, index) {
      if (ids.length < 16) {
        addUnique(ids, topicQuestions(topic.slug), ids.length + 1, "diagnostic:" + index);
      }
    });
    addUnique(ids, mixedQuestions(), 20, "diagnostic:mixed");
    return ids.slice(0, 20);
  }

  function generateSessionIds(mode, topicSlug) {
    var today = todayKey();
    var ids = [];

    if (mode === "daily") {
      return generateDailyIds();
    }

    if (mode === "exam") {
      return generateExamSprintIds();
    }

    if (mode === "diagnostic") {
      return generateDiagnosticIds();
    }

    if (mode === "topic") {
      addUnique(ids, topicQuestions(topicSlug), 12, today + ":topic:" + topicSlug);
      return ids;
    }

    if (mode === "mixed") {
      addUnique(ids, mixedQuestions(), 12, today + ":mixed");
      return ids;
    }

    if (mode === "mistakes") {
      addUnique(ids, dueQuestionPool(), 14, today + ":mistakes");
      return ids;
    }

    if (mode === "mock") {
      addUnique(ids, dueQuestionPool(), 8, today + ":mock:due");
      addUnique(ids, weakQuestionPool(), 24, today + ":mock:weak");
      addUnique(ids, mixedQuestions(), 40, today + ":mock:mixed");
      addUnique(ids, QUESTION_BANK, 40, today + ":mock:fill");
      return ids.slice(0, 40);
    }

    return ids;
  }

  function sessionTitle(mode, topicSlug) {
    if (mode === "daily") {
      return "Daily Quest - " + examPhase().label;
    }
    if (mode === "exam") {
      return "Formal Test Sprint";
    }
    if (mode === "diagnostic") {
      return "Diagnostic Sprint";
    }
    if (mode === "mixed") {
      return "Mixed Missions";
    }
    if (mode === "mistakes") {
      return "Mistake Review";
    }
    if (mode === "mock") {
      return "Mock Test";
    }
    var topic = QUESTION_TOPICS.find(function (item) {
      return item.slug === topicSlug;
    });
    return topic ? topic.label + ": " + topic.title : "Topic Practice";
  }

  function startSession(mode, topicSlug) {
    var ids = generateSessionIds(mode, topicSlug).filter(function (id) {
      return questionById[id];
    });

    if (!ids.length) {
      notice = "No due questions yet. Try Daily Quest or Topic Practice first.";
      activeSession = null;
      render();
      return;
    }

    activeSession = {
      mode: mode,
      topicSlug: topicSlug || "",
      title: sessionTitle(mode, topicSlug),
      ids: ids,
      index: 0,
      answers: {},
      confidence: {},
      hints: {},
      started: new Date().toISOString(),
      awardSnapshot: earnedAwardIds(),
      finished: false
    };
    notice = "";
    render();
  }

  function recordAnswer(question, choice, confidence) {
    var id = question.id;
    var attempt = attemptFor(id);
    var correct = choice === question.answer;
    var wasWrongBefore = attempt.wrong > 0 && attempt.box < 3;

    attempt.seen += 1;
    attempt.last = todayKey();
    attempt.lastChoice = choice;
    attempt.confidence = confidence;

    if (correct) {
      attempt.correct += 1;
      attempt.box = Math.min(3, attempt.box + (confidence === "sure" ? 2 : 1));
      attempt.nextDue = datePlus(confidence === "guess" ? 1 : confidence === "think" ? 3 : 7);
      if (wasWrongBefore) {
        attempt.recovered += 1;
      }
    } else {
      attempt.wrong += 1;
      attempt.box = Math.max(0, attempt.box - 1);
      attempt.nextDue = datePlus(1);
    }

    state.attempts[id] = attempt;
    activeSession.answers[id] = {
      choice: choice,
      correct: correct,
      confidence: confidence
    };
    saveState();
  }

  function recordReason(questionId, reason) {
    var attempt = attemptFor(questionId);
    attempt.reasons = attempt.reasons || {};
    attempt.reasons[reason] = (attempt.reasons[reason] || 0) + 1;
    state.attempts[questionId] = attempt;
    saveState();
    render();
  }

  function completeActiveSession() {
    if (!activeSession || activeSession.finished) {
      return;
    }

    var answerList = activeSession.ids.map(function (id) {
      return activeSession.answers[id];
    }).filter(Boolean);
    var correct = answerList.filter(function (answer) {
      return answer.correct;
    }).length;

    activeSession.finished = true;
    activeSession.summary = {
      total: activeSession.ids.length,
      answered: answerList.length,
      correct: correct,
      accuracy: answerList.length ? Math.round(correct * 100 / answerList.length) : 0,
      newAwards: earnedAwards().filter(function (award) {
        return activeSession.awardSnapshot.indexOf(award.id) === -1;
      })
    };

    state.sessions.unshift({
      mode: activeSession.mode,
      title: activeSession.title,
      date: todayKey(),
      total: activeSession.summary.total,
      answered: activeSession.summary.answered,
      correct: activeSession.summary.correct,
      accuracy: activeSession.summary.accuracy
    });
    state.sessions = state.sessions.slice(0, 20);

    if (activeSession.mode === "daily") {
      if (state.streak.last === yesterdayKey()) {
        state.streak.count += 1;
      } else if (state.streak.last !== todayKey()) {
        state.streak.count = 1;
      }
      state.streak.last = todayKey();
    }

    saveState();
    render();
  }

  function topicMastery(slug) {
    var questions = topicQuestions(slug);
    if (!questions.length) {
      return { percent: 0, attempted: 0, mastered: 0 };
    }

    var score = 0;
    var attempted = 0;
    var mastered = 0;
    questions.forEach(function (question) {
      var attempt = attemptFor(question.id);
      score += attempt.box || 0;
      if (attempt.seen) {
        attempted += 1;
      }
      if (attempt.box >= 3) {
        mastered += 1;
      }
    });

    return {
      percent: Math.round(score * 100 / (questions.length * 3)),
      attempted: attempted,
      mastered: mastered
    };
  }

  function globalStats() {
    var ids = Object.keys(state.attempts).filter(function (id) {
      return questionById[id];
    });
    var seen = 0;
    var correct = 0;
    var mastered = 0;
    var sureTotal = 0;
    var sureCorrect = 0;
    var recovered = 0;
    ids.forEach(function (id) {
      var attempt = attemptFor(id);
      seen += attempt.seen;
      correct += attempt.correct;
      recovered += attempt.recovered || 0;
      if (attempt.confidence === "sure") {
        sureTotal += 1;
        if (attempt.lastChoice === questionById[id].answer) {
          sureCorrect += 1;
        }
      }
      if (attempt.box >= 3) {
        mastered += 1;
      }
    });

    return {
      attemptedQuestions: ids.length,
      seen: seen,
      correct: correct,
      accuracy: seen ? Math.round(correct * 100 / seen) : 0,
      mastered: mastered,
      recovered: recovered,
      sureTotal: sureTotal,
      sureAccuracy: sureTotal ? Math.round(sureCorrect * 100 / sureTotal) : 0,
      due: dueQuestionPool().length,
      streak: state.streak.count || 0
    };
  }

  function masteredTopicCount(threshold) {
    return coreTopics.filter(function (topic) {
      return topicMastery(topic.slug).percent >= threshold;
    }).length;
  }

  function mixedAttemptCount() {
    return mixedQuestions().filter(function (question) {
      return attemptFor(question.id).seen > 0;
    }).length;
  }

  function mixedAccuracy() {
    var seen = 0;
    var correct = 0;
    mixedQuestions().forEach(function (question) {
      var attempt = attemptFor(question.id);
      seen += attempt.seen;
      correct += attempt.correct;
    });
    return seen ? Math.round(correct * 100 / seen) : 0;
  }

  function awardCatalog() {
    var stats = globalStats();
    var mastered70 = masteredTopicCount(70);
    var mastered90 = masteredTopicCount(90);
    var mixedTried = mixedAttemptCount();
    var mixedAcc = mixedAccuracy();
    return [
      {
        id: "first-step",
        name: "First Step",
        group: "Engagement",
        detail: "Answered the first practice question.",
        earned: stats.attemptedQuestions >= 1,
        progress: Math.min(1, stats.attemptedQuestions)
      },
      {
        id: "daily-three",
        name: "Three-Day Spark",
        group: "Engagement",
        detail: "Completed Daily Quest on three days.",
        earned: stats.streak >= 3,
        progress: Math.min(3, stats.streak),
        target: 3
      },
      {
        id: "daily-seven",
        name: "Seven-Day Flame",
        group: "Engagement",
        detail: "Built a seven-day Daily Quest streak.",
        earned: stats.streak >= 7,
        progress: Math.min(7, stats.streak),
        target: 7
      },
      {
        id: "hundred",
        name: "Hundred Questions",
        group: "Engagement",
        detail: "Tried 100 different questions.",
        earned: stats.attemptedQuestions >= 100,
        progress: Math.min(100, stats.attemptedQuestions),
        target: 100
      },
      {
        id: "accuracy-80",
        name: "Sharp Thinker",
        group: "Accuracy",
        detail: "Reached 80% overall accuracy after at least 30 attempts.",
        earned: stats.seen >= 30 && stats.accuracy >= 80,
        progress: stats.seen < 30 ? stats.seen : Math.min(80, stats.accuracy),
        target: stats.seen < 30 ? 30 : 80
      },
      {
        id: "accuracy-90",
        name: "Precision Scientist",
        group: "Accuracy",
        detail: "Reached 90% overall accuracy after at least 60 attempts.",
        earned: stats.seen >= 60 && stats.accuracy >= 90,
        progress: stats.seen < 60 ? stats.seen : Math.min(90, stats.accuracy),
        target: stats.seen < 60 ? 60 : 90
      },
      {
        id: "sure-calibrated",
        name: "Calibrated Confidence",
        group: "Accuracy",
        detail: "At least 85% correct on questions marked Sure.",
        earned: stats.sureTotal >= 20 && stats.sureAccuracy >= 85,
        progress: stats.sureTotal < 20 ? stats.sureTotal : Math.min(85, stats.sureAccuracy),
        target: stats.sureTotal < 20 ? 20 : 85
      },
      {
        id: "mistake-recovery",
        name: "Mistake Alchemist",
        group: "Recovery",
        detail: "Recovered 10 previously missed questions.",
        earned: stats.recovered >= 10,
        progress: Math.min(10, stats.recovered),
        target: 10
      },
      {
        id: "topic-70-five",
        name: "Five Topic Builder",
        group: "Mastery",
        detail: "Reached 70% mastery in five core topics.",
        earned: mastered70 >= 5,
        progress: Math.min(5, mastered70),
        target: 5
      },
      {
        id: "topic-90-three",
        name: "Three Topic Master",
        group: "Mastery",
        detail: "Reached 90% mastery in three core topics.",
        earned: mastered90 >= 3,
        progress: Math.min(3, mastered90),
        target: 3
      },
      {
        id: "mixed-50",
        name: "Case Explorer",
        group: "Mixed Reasoning",
        detail: "Tried 50 mixed case questions.",
        earned: mixedTried >= 50,
        progress: Math.min(50, mixedTried),
        target: 50
      },
      {
        id: "mixed-strong",
        name: "Systems Thinker",
        group: "Mixed Reasoning",
        detail: "Reached 75% accuracy on mixed cases after 40 attempts.",
        earned: mixedTried >= 40 && mixedAcc >= 75,
        progress: mixedTried < 40 ? mixedTried : Math.min(75, mixedAcc),
        target: mixedTried < 40 ? 40 : 75
      }
    ];
  }

  function earnedAwards() {
    return awardCatalog().filter(function (award) {
      return award.earned;
    });
  }

  function earnedAwardIds() {
    return earnedAwards().map(function (award) {
      return award.id;
    });
  }

  function renderAwardCard(award, compact) {
    var target = award.target || 1;
    var progress = award.earned ? target : Math.min(target, award.progress || 0);
    var percent = award.earned ? 100 : Math.round(progress * 100 / target);
    return '<div class="award-card ' + (award.earned ? "earned" : "locked") + '">' +
      '<div class="award-mark">' + (award.earned ? "*" : "") + '</div>' +
      '<div>' +
        '<strong>' + esc(award.name) + '</strong>' +
        '<span>' + esc(award.group) + '</span>' +
        (compact ? "" : '<p>' + esc(award.detail) + '</p>') +
        '<div class="award-progress"><span style="width:' + percent + '%"></span></div>' +
      '</div>' +
    '</div>';
  }

  function recentMistakes() {
    return Object.keys(state.attempts).map(function (id) {
      return { question: questionById[id], attempt: attemptFor(id) };
    }).filter(function (item) {
      return item.question && item.attempt.wrong > 0 && item.attempt.lastChoice !== item.question.answer;
    }).sort(function (a, b) {
      return String(b.attempt.last).localeCompare(String(a.attempt.last));
    }).slice(0, 6);
  }

  function commonReasons() {
    var counts = {};
    Object.keys(state.attempts).forEach(function (id) {
      var reasons = attemptFor(id).reasons || {};
      Object.keys(reasons).forEach(function (reason) {
        counts[reason] = (counts[reason] || 0) + reasons[reason];
      });
    });
    return Object.keys(counts).sort(function (a, b) {
      return counts[b] - counts[a];
    }).slice(0, 4).map(function (reason) {
      return { reason: reason, count: counts[reason] };
    });
  }

  function renderExamPanel() {
    var phase = examPhase();
    var countdown = phase.daysLeft > 0
      ? phase.daysLeft + " days left"
      : phase.daysLeft === 0
        ? "Test day"
        : "Test completed";
    var tasks = phase.tasks.map(function (task) {
      return '<span class="exam-task">' + esc(task) + '</span>';
    }).join("");

    return '<section class="panel exam-panel">' +
      '<div>' +
        '<span class="eyebrow">' + esc(FORMAL_TEST.label) + '</span>' +
        '<h2>' + esc(FORMAL_TEST.display) + '</h2>' +
        '<p>' + esc(phase.focus) + '</p>' +
      '</div>' +
      '<div class="exam-grid">' +
        '<div class="exam-count"><strong>' + esc(countdown) + '</strong><span>' + esc(phase.label) + '</span></div>' +
        '<div><strong>Today</strong><div class="exam-tasks">' + tasks + '</div></div>' +
        '<button class="primary-button" type="button" data-start="exam">Start Formal Test Sprint</button>' +
      '</div>' +
    '</section>';
  }

  function renderDashboard() {
    var stats = globalStats();
    var weak = weakTopicSlugs();
    var awards = awardCatalog();
    var earned = awards.filter(function (award) {
      return award.earned;
    });
    var nextAwards = awards.filter(function (award) {
      return !award.earned;
    }).slice(0, 4);
    var topicOptions = coreTopics.map(function (topic) {
      return '<option value="' + esc(topic.slug) + '">' + esc(topic.label + ": " + topic.title) + '</option>';
    }).join("");
    var masteryRows = coreTopics.map(function (topic) {
      var mastery = topicMastery(topic.slug);
      return '<div class="mastery-row">' +
        '<strong>' + esc(topic.label) + '</strong>' +
        '<div class="bar" aria-label="' + esc(topic.title) + ' mastery"><span style="width:' + mastery.percent + '%"></span></div>' +
        '<em>' + mastery.percent + '%</em>' +
      '</div>';
    }).join("");
    var mistakeItems = recentMistakes().map(function (item) {
      return '<div class="mini-item"><strong>' + esc(item.question.topicLabel + ": " + item.question.topicTitle) + '</strong>' +
        esc(item.question.prompt.slice(0, 150)) + (item.question.prompt.length > 150 ? "..." : "") + '</div>';
    }).join("");
    var reasonItems = commonReasons().map(function (item) {
      return '<div class="mini-item"><strong>' + esc(item.reason) + '</strong>' + item.count + ' marked</div>';
    }).join("");
    var earnedAwardItems = earned.slice(0, 6).map(function (award) {
      return renderAwardCard(award, true);
    }).join("");
    var nextAwardItems = nextAwards.map(function (award) {
      return renderAwardCard(award, true);
    }).join("");
    var noticeMarkup = notice ? '<div class="empty-state">' + esc(notice) + '</div>' : "";

    root.innerHTML = '<section class="dashboard">' +
      '<div class="main-stack">' +
        noticeMarkup +
        renderExamPanel() +
        '<section class="panel">' +
          '<div class="stat-grid">' +
            '<div class="stat green"><strong>' + stats.accuracy + '%</strong><span>Accuracy</span></div>' +
            '<div class="stat"><strong>' + stats.attemptedQuestions + '</strong><span>Questions tried</span></div>' +
            '<div class="stat gold"><strong>' + stats.mastered + '</strong><span>Mastered</span></div>' +
            '<div class="stat red"><strong>' + stats.due + '</strong><span>Due review</span></div>' +
            '<div class="stat gold"><strong>' + earned.length + '</strong><span>Awards earned</span></div>' +
          '</div>' +
        '</section>' +

        '<section class="panel">' +
          '<h2>Practice Modes</h2>' +
          '<div class="mode-grid">' +
            '<button class="mode-button" type="button" data-start="daily"><strong>Daily Quest</strong><span>Weak topics, due reviews, and mixed cases.</span></button>' +
            '<button class="mode-button" type="button" data-start="exam"><strong>Formal Test Sprint</strong><span>' + esc(examPhase().label) + ': ' + esc(examPhase().focus) + '</span></button>' +
            '<button class="mode-button" type="button" data-start="diagnostic"><strong>Diagnostic Sprint</strong><span>Quick map of current strengths.</span></button>' +
            '<button class="mode-button" type="button" data-start="mixed"><strong>Mixed Missions</strong><span>Case questions using the whole science set.</span></button>' +
            '<button class="mode-button" type="button" data-start="mistakes"><strong>Mistake Review</strong><span>Recover questions that previously hurt.</span></button>' +
            '<button class="mode-button" type="button" data-start="mock"><strong>Mock Test</strong><span>Forty-question exam-style run, best before 18 May 2026.</span></button>' +
            '<button class="mode-button" type="button" data-start="weak"><strong>Weak Topic Drill</strong><span>' + esc(weak.slice(0, 3).map(function (slug) { return QUESTION_TOPICS.find(function (topic) { return topic.slug === slug; }).label; }).join(", ")) + '</span></button>' +
          '</div>' +
        '</section>' +

        '<section class="panel">' +
          '<h2>Topic Practice</h2>' +
          '<div class="topic-launch">' +
            '<label for="topicSelect">Topic<select id="topicSelect">' + topicOptions + '</select></label>' +
            '<button class="primary-button" type="button" data-start="topic">Start Topic</button>' +
          '</div>' +
        '</section>' +

        '<section class="panel">' +
          '<h2>Mastery Map</h2>' +
          '<div class="mastery-list">' + masteryRows + '</div>' +
        '</section>' +
      '</div>' +

      '<aside class="side-stack">' +
        '<section class="panel">' +
          '<h2>Streak</h2>' +
          '<div class="stat green"><strong>' + stats.streak + '</strong><span>Daily quests</span></div>' +
        '</section>' +
        '<section class="panel">' +
          '<h2>Awards</h2>' +
          '<div class="award-list">' + (earnedAwardItems || '<div class="empty-state">Earn your first award by answering a question.</div>') + '</div>' +
        '</section>' +
        '<section class="panel">' +
          '<h2>Next Awards</h2>' +
          '<div class="award-list">' + nextAwardItems + '</div>' +
        '</section>' +
        '<section class="panel">' +
          '<h2>Recent Mistakes</h2>' +
          '<div class="mistake-list">' + (mistakeItems || '<div class="empty-state">No mistakes recorded yet.</div>') + '</div>' +
        '</section>' +
        '<section class="panel">' +
          '<h2>Mistake Reasons</h2>' +
          '<div class="mini-list">' + (reasonItems || '<div class="empty-state">Reason tags appear after review.</div>') + '</div>' +
        '</section>' +
      '</aside>' +
    '</section>';
  }

  function currentQuestion() {
    if (!activeSession) {
      return null;
    }
    return questionById[activeSession.ids[activeSession.index]];
  }

  function hintList(question) {
    var wrongIndex = question.options.findIndex(function (_option, index) {
      return index !== question.answer;
    });
    var explanationLead = question.explanation.split(".")[0];
    return [
      "Topic: " + question.topicTitle + ".",
      "Look for the mechanism: " + explanationLead + ".",
      "Try removing option " + answerLetter(wrongIndex) + "; it is not the best-supported choice."
    ];
  }

  function renderSession() {
    if (!activeSession) {
      renderDashboard();
      return;
    }

    if (activeSession.finished) {
      renderComplete();
      return;
    }

    var question = currentQuestion();
    var answer = activeSession.answers[question.id];
    var confidence = activeSession.confidence[question.id] || "think";
    var hintsShown = activeSession.hints[question.id] || 0;
    var progress = Math.round((activeSession.index) * 100 / activeSession.ids.length);
    var hints = hintList(question).slice(0, hintsShown);
    var choiceMarkup = question.options.map(function (option, index) {
      var className = "choice-button";
      if (answer && index === question.answer) {
        className += " correct";
      }
      if (answer && index === answer.choice && index !== question.answer) {
        className += " wrong";
      }
      return '<li><button class="' + className + '" type="button" data-choice="' + index + '"' + (answer ? " disabled" : "") + '>' +
        '<span class="choice-letter">' + answerLetter(index) + '</span><span>' + esc(option) + '</span></button></li>';
    }).join("");
    var hintMarkup = hints.map(function (hint) {
      return '<div class="hint-box">' + esc(hint) + '</div>';
    }).join("");
    var feedbackMarkup = answer ? renderFeedback(question, answer) : "";

    root.innerHTML = '<section class="session-shell">' +
      '<div class="session-top">' +
        '<div>' +
          '<h2 class="session-title">' + esc(activeSession.title) + '</h2>' +
          '<p class="muted">Question ' + (activeSession.index + 1) + ' of ' + activeSession.ids.length + '</p>' +
          '<div class="progress-track"><span style="width:' + progress + '%"></span></div>' +
        '</div>' +
        '<button class="ghost-button" type="button" data-exit="1">Exit</button>' +
      '</div>' +

      '<article class="question-panel">' +
        '<div class="question-meta">' +
          '<span class="pill">Q' + question.number + '</span>' +
          '<span class="pill">' + esc(question.topicLabel) + '</span>' +
          '<span class="pill">' + esc(question.topicTitle) + '</span>' +
        '</div>' +
        '<p class="prompt">' + esc(question.prompt) + '</p>' +
        '<div class="confidence-row">' +
          '<button class="chip-button ' + (confidence === "sure" ? "active" : "") + '" type="button" data-confidence="sure"' + (answer ? " disabled" : "") + '>Sure</button>' +
          '<button class="chip-button ' + (confidence === "think" ? "active" : "") + '" type="button" data-confidence="think"' + (answer ? " disabled" : "") + '>Think</button>' +
          '<button class="chip-button ' + (confidence === "guess" ? "active" : "") + '" type="button" data-confidence="guess"' + (answer ? " disabled" : "") + '>Guess</button>' +
        '</div>' +
        '<ol class="choices">' + choiceMarkup + '</ol>' +
        '<div class="tool-row">' +
          '<button class="ghost-button" type="button" data-hint="1"' + (answer || hintsShown >= 3 ? " disabled" : "") + '>Hint</button>' +
        '</div>' +
        (hintMarkup ? '<div class="main-stack">' + hintMarkup + '</div>' : "") +
      '</article>' +
      feedbackMarkup +
    '</section>';
  }

  function renderFeedback(question, answer) {
    var correct = answer.correct;
    var attempt = attemptFor(question.id);
    var reasonButtons = ["Concept", "Keyword", "Reasoning", "Data", "Guessed"].map(function (reason) {
      return '<button class="chip-button" type="button" data-reason="' + esc(reason) + '">' + esc(reason) + '</button>';
    }).join("");
    return '<section class="feedback-panel ' + (correct ? "correct" : "wrong") + '">' +
      '<h3>' + (correct ? "Correct" : "Not yet") + '</h3>' +
      '<p><strong>Answer ' + answerLetter(question.answer) + '.</strong> ' + esc(question.explanation) + '</p>' +
      '<p class="muted">Review due: ' + esc(attempt.nextDue || "later") + ' | Mastery box: ' + attempt.box + '/3</p>' +
      (!correct ? '<div><p class="muted">Mistake reason</p><div class="reason-row">' + reasonButtons + '</div></div>' : "") +
      '<div class="next-row">' +
        '<button class="primary-button" type="button" data-next="1">' + (activeSession.index + 1 >= activeSession.ids.length ? "Finish" : "Next") + '</button>' +
      '</div>' +
    '</section>';
  }

  function renderComplete() {
    var summary = activeSession.summary;
    var awardMarkup = summary.newAwards.length ? summary.newAwards.map(function (award) {
      return renderAwardCard(award, false);
    }).join("") : '<div class="empty-state">No new award this time. The next one is closer now.</div>';
    root.innerHTML = '<section class="complete-panel">' +
      '<div>' +
        '<span class="eyebrow">Session Complete</span>' +
        '<h2>' + esc(activeSession.title) + '</h2>' +
      '</div>' +
      '<div class="complete-grid">' +
        '<div class="stat green"><strong>' + summary.accuracy + '%</strong><span>Accuracy</span></div>' +
        '<div class="stat"><strong>' + summary.correct + '</strong><span>Correct</span></div>' +
        '<div class="stat gold"><strong>' + summary.answered + '</strong><span>Answered</span></div>' +
      '</div>' +
      '<section class="panel award-celebration">' +
        '<h2>New Awards</h2>' +
        '<div class="award-grid">' + awardMarkup + '</div>' +
      '</section>' +
      '<div class="next-row">' +
        '<button class="primary-button" type="button" data-start="daily">Daily Quest</button>' +
        '<button class="ghost-button" type="button" data-start="mistakes">Mistake Review</button>' +
        '<button class="ghost-button" type="button" data-dashboard="1">Dashboard</button>' +
      '</div>' +
    '</section>';
  }

  function render() {
    if (activeSession) {
      renderSession();
    } else {
      renderDashboard();
    }
  }

  root.addEventListener("click", function (event) {
    var startButton = event.target.closest("[data-start]");
    if (startButton) {
      var mode = startButton.dataset.start;
      if (mode === "weak") {
        startSession("topic", weakTopicSlugs()[0]);
        return;
      }
      if (mode === "topic") {
        var select = document.getElementById("topicSelect");
        startSession("topic", select ? select.value : coreTopics[0].slug);
        return;
      }
      startSession(mode);
      return;
    }

    if (event.target.closest("[data-dashboard]")) {
      activeSession = null;
      render();
      return;
    }

    if (event.target.closest("[data-exit]")) {
      activeSession = null;
      render();
      return;
    }

    var confidenceButton = event.target.closest("[data-confidence]");
    if (confidenceButton && activeSession) {
      var questionForConfidence = currentQuestion();
      activeSession.confidence[questionForConfidence.id] = confidenceButton.dataset.confidence;
      render();
      return;
    }

    var hintButton = event.target.closest("[data-hint]");
    if (hintButton && activeSession) {
      var hintQuestion = currentQuestion();
      activeSession.hints[hintQuestion.id] = Math.min(3, (activeSession.hints[hintQuestion.id] || 0) + 1);
      render();
      return;
    }

    var choiceButton = event.target.closest("[data-choice]");
    if (choiceButton && activeSession) {
      var question = currentQuestion();
      if (!activeSession.answers[question.id]) {
        var confidence = activeSession.confidence[question.id] || "think";
        recordAnswer(question, Number(choiceButton.dataset.choice), confidence);
        render();
      }
      return;
    }

    var reasonButton = event.target.closest("[data-reason]");
    if (reasonButton && activeSession) {
      recordReason(currentQuestion().id, reasonButton.dataset.reason);
      return;
    }

    if (event.target.closest("[data-next]") && activeSession) {
      if (activeSession.index + 1 >= activeSession.ids.length) {
        completeActiveSession();
      } else {
        activeSession.index += 1;
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  });

  resetButton.addEventListener("click", function () {
    if (window.confirm("Reset all local SPSO practice progress on this browser?")) {
      state = emptyState();
      activeSession = null;
      notice = "Progress reset.";
      saveState();
      render();
    }
  });

  render();
})();
