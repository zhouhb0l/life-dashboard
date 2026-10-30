(function (root, factory) {
  const model = factory();
  if (typeof module === 'object' && module.exports) module.exports = model;
  if (root) root.PaperTrackerModel = model;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const DAY = 86400000;
  const PHASES = Object.freeze({
    writing: { label: 'Research & writing', color: '#128c82' },
    preparation: { label: 'Submission preparation', color: '#8854c7' },
    review: { label: 'Journal review', color: '#d4a244' },
    response: { label: 'Author response', color: '#587fc3' },
    production: { label: 'Publication production', color: '#71985d' },
    complete: { label: 'Published', color: '#71985d' },
    unscheduled: { label: 'No timeline yet', color: '#9b9b96' }
  });
  const MILESTONES = Object.freeze([
    { type: 'initialized', label: 'Initialization', phase: 'writing', stage: 'Initial draft & figures', nextAction: 'Complete the initial draft and figures' },
    { type: 'initial_draft', label: 'Initial draft & figures done', phase: 'writing', stage: 'Self revision', nextAction: 'Complete your first revision' },
    { type: 'self_revision', label: 'Self revision done', phase: 'writing', stage: 'Finalizing the first draft', nextAction: 'Finalize the first draft' },
    { type: 'first_draft', label: 'First draft complete', phase: 'preparation', stage: 'Preparing submission', nextAction: 'Complete the submission package and cover letter' },
    { type: 'submission_package', label: 'Submission package ready', phase: 'preparation', stage: 'Ready to submit', nextAction: 'Submit the manuscript' },
    { type: 'submitted', label: 'Submitted', phase: 'review', stage: 'Under journal review', nextAction: 'Await the journal decision' },
    { type: 'acknowledged', label: 'Journal acknowledgment', phase: 'review', stage: 'Journal process', nextAction: 'Await journal decision' },
    { type: 'editorial_decision', label: 'Editorial decision received', phase: 'preparation', stage: 'Editorial decision received', nextAction: 'Respond to editorial decision or arrange transfer' },
    { type: 'transferred', label: 'Journal transfer', phase: 'review', stage: 'Under review after journal transfer', nextAction: 'Await journal decision' },
    { type: 'reviews_received', label: 'Reviewer response received', phase: 'response', stage: 'Preparing reviewer response', nextAction: 'Revise the manuscript and submit your response' },
    { type: 'revision_requested', label: 'Revision requested', phase: 'response', stage: 'Preparing manuscript revision', nextAction: 'Revise the manuscript and submit your response' },
    { type: 'response_submitted', label: 'Response submitted', phase: 'review', stage: 'Revised manuscript under review', nextAction: 'Await the next journal decision' },
    { type: 'amendment_requested', label: 'Submission amendment requested', phase: 'response', stage: 'Preparing submission amendment', nextAction: 'Complete the requested submission amendment' },
    { type: 'amendment_submitted', label: 'Submission amendment submitted', phase: 'review', stage: 'Amended submission with journal', nextAction: 'Await journal decision' },
    { type: 'rejected', label: 'Rejected', phase: 'preparation', stage: 'Preparing a new submission', nextAction: 'Prepare the next submission package' },
    { type: 'accepted', label: 'Accepted', phase: 'production', stage: 'Proofreading', nextAction: 'Complete proofreading' },
    { type: 'publishing_rights', label: 'In publishing and rights', phase: 'production', stage: 'In publishing and rights', nextAction: 'Complete the publishing rights agreement' },
    { type: 'rights_complete', label: 'Publishing and rights complete', phase: 'production', stage: 'Publishing and rights complete', nextAction: 'Await proofs and complete proofreading' },
    { type: 'proofread', label: 'Proofreading done', phase: 'production', stage: 'Awaiting publication', nextAction: 'Record the publication date' },
    { type: 'published', label: 'Published', phase: 'complete', stage: 'Published', nextAction: 'Publication complete' }
  ]);
  const TYPES = new Map(MILESTONES.map(item => [item.type, item]));
  const SUBMITTED_TYPES = new Set(['submitted', 'acknowledged', 'editorial_decision', 'transferred', 'reviews_received', 'revision_requested',
    'response_submitted', 'amendment_requested', 'amendment_submitted', 'rejected', 'accepted', 'publishing_rights', 'rights_complete', 'proofread', 'published']);

  function today() {
    const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Singapore', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
    const value = Object.fromEntries(parts.map(part => [part.type, part.value]));
    return `${value.year}-${value.month}-${value.day}`;
  }
  function dateToDay(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return NaN;
    const [year, month, day] = value.split('-').map(Number);
    if (year < 1000 || year > 9999 || month < 1 || month > 12 || day < 1 || day > 31) return NaN;
    const time = Date.UTC(year, month - 1, day);
    const date = new Date(time);
    return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day ? time / DAY : NaN;
  }
  function dayToDate(value) {
    if (!Number.isFinite(value)) return '';
    const date = new Date(Math.round(value) * DAY);
    return Number.isFinite(date.getTime()) ? date.toISOString().slice(0, 10) : '';
  }
  function daysBetween(start, end) { return dateToDay(end) - dateToDay(start); }
  function createId() {
    return typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID() : `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
  }
  function sortEvents(events) {
    return (events || []).map((event, index) => ({ event, index }))
      .sort((a, b) => a.event.date.localeCompare(b.event.date) || a.index - b.index).map(item => item.event);
  }
  function journeyMilestones(project) {
    const events = sortEvents(project?.events);
    return [
      { type: 'initialized', label: 'Initialization', shortLabel: 'Initialized', symbol: '○' },
      { type: 'submitted', label: 'First journal submission', shortLabel: 'First submitted', symbol: '↑' },
      { type: 'accepted', label: 'Accepted', shortLabel: 'Accepted', symbol: '★' },
      { type: 'published', label: 'Published', shortLabel: 'Published', symbol: '✓' }
    ].map(descriptor => ({ ...descriptor, event: events.find(event => event.type === descriptor.type) || null }));
  }
  function knownPublicationYear(project, asOf) {
    return Number.isInteger(project.publicationYear) && project.publicationYear >= 1000
      && project.publicationYear <= Number(asOf.slice(0, 4));
  }
  function hasSubmissionEvidence(project, asOf, events) {
    return knownPublicationYear(project, asOf) || events.some(event => SUBMITTED_TYPES.has(event.type))
      || (SUBMITTED_TYPES.has(project.currentStatus) && Number.isFinite(dateToDay(project.statusAsOf)) && project.statusAsOf <= asOf);
  }
  function statusContext(project, asOf, events) {
    const latest = events.at(-1);
    const current = TYPES.get(project.currentStatus);
    const confirmed = Number.isFinite(dateToDay(project.statusAsOf)) && project.statusAsOf <= asOf;
    const effective = Boolean(current && confirmed && (!latest || project.statusAsOf > latest.date
      || (project.statusAsOf === latest.date && project.currentStatus === latest.type)));
    return { effective, milestone: effective ? current : latest ? TYPES.get(latest.type) : null,
      undated: effective && latest?.type !== project.currentStatus, asOf: effective ? project.statusAsOf : '' };
  }
  function segments(project, asOf = today()) {
    const events = sortEvents(project.events);
    const unknownPublicationDate = knownPublicationYear(project, asOf) && !events.some(event => event.type === 'published');
    const status = statusContext(project, asOf, events);
    return events.flatMap((event, index) => {
      const milestone = TYPES.get(event.type);
      if (!milestone || milestone.phase === 'complete') return [];
      const next = events[index + 1];
      // A published bibliography entry has no open work period. Its unknown final
      // interval cannot be measured from a year alone, so retain only closed spans.
      if (!next && (unknownPublicationDate || status.undated)) return [];
      const end = next ? next.date : asOf;
      return [{ start: event.date, end, days: Math.max(0, daysBetween(event.date, end)), phase: milestone.phase,
        label: PHASES[milestone.phase].label, event, ongoing: !next }];
    });
  }
  function summarize(project, asOf = today()) {
    const events = sortEvents(project.events);
    const latestEvent = events.at(-1) || null;
    const status = statusContext(project, asOf, events);
    const milestone = status.milestone;
    const totals = { writing: 0, preparation: 0, review: 0, response: 0, production: 0 };
    for (const segment of segments(project, asOf)) totals[segment.phase] += segment.days;
    const publishedMetadata = knownPublicationYear(project, asOf);
    const complete = latestEvent?.type === 'published' || publishedMetadata || (status.effective && project.currentStatus === 'published');
    const stage = status.effective && project.statusLabel ? project.statusLabel : milestone?.stage;
    return {
      stage: complete ? (status.effective && project.currentStatus === 'published' ? stage : 'Published') : stage || 'No timeline yet',
      phase: complete ? 'complete' : milestone?.phase || 'unscheduled',
      nextAction: complete ? 'Publication complete' : milestone?.nextAction || 'Add the first milestone', latestEvent,
      statusUndated: status.undated, statusAsOf: status.asOf, statusType: complete ? 'published' : milestone?.type || '',
      startedOn: events[0]?.date || null,
      elapsedDays: status.undated ? null : latestEvent ? Math.max(0, daysBetween(latestEvent.date, complete ? latestEvent.date : asOf)) : 0,
      totalDays: events.length ? Math.max(0, daysBetween(events[0].date, complete || status.undated ? latestEvent.date : asOf)) : 0,
      reviewDays: totals.review, responseDays: totals.response, writingDays: totals.writing,
      preparationDays: totals.preparation, productionDays: totals.production,
      submissionCount: events.filter(event => event.type === 'submitted').length,
      responseCount: events.filter(event => event.type === 'response_submitted').length,
      amendmentCount: events.filter(event => event.type === 'amendment_submitted').length,
      transferCount: events.filter(event => event.type === 'transferred').length,
      submissionState: ['not_submitted', 'submitted'].includes(project.submissionState) ? project.submissionState
        : hasSubmissionEvidence(project, asOf, events) ? 'submitted' : '', complete
    };
  }

  function sortProjects(projects, asOf = today()) {
    const items = (projects || []).map((project, index) => {
      const summary = summarize(project, asOf);
      const records = sortEvents(project.records);
      const rank = summary.complete ? 3 : summary.statusAsOf ? 0 : !summary.latestEvent && !records.length ? 1 : 2;
      const publication = sortEvents(project.events).findLast(event => event.type === 'published');
      // A year sort key is intentionally not turned into a fabricated milestone date.
      const newest = summary.complete
        ? publication?.date || (project.publicationYear ? `${project.publicationYear}-00-00` : summary.statusAsOf)
        : summary.statusAsOf || [summary.latestEvent?.date || '', records.at(-1)?.date || ''].sort().at(-1);
      return { project, index, rank, newest };
    });
    return items.sort((a, b) => a.rank - b.rank || b.newest.localeCompare(a.newest) || a.index - b.index)
      .map(item => item.project);
  }

  function timelineBounds(projects, asOf = today(), range = 'auto') {
    let endDay = dateToDay(asOf);
    if (!Number.isFinite(endDay)) throw new RangeError('Timeline end must be a valid YYYY-MM-DD date.');
    const allProjects = projects || [];
    const datesFor = project => {
      const dates = [...(project.events || []), ...(project.records || [])].map(event => dateToDay(event.date)).filter(Number.isFinite);
      if (Number.isInteger(project.publicationYear) && project.publicationYear >= 1000
        && project.publicationYear <= Number(asOf.slice(0, 4))) {
        dates.push(dateToDay(`${project.publicationYear}-01-01`));
      }
      return dates.filter(day => day <= endDay);
    };
    const oldestOf = candidates => {
      let earliest = Infinity;
      for (const project of candidates) for (const day of datesFor(project)) earliest = Math.min(earliest, day);
      return Number.isFinite(earliest) ? earliest : endDay - 180;
    };
    let startDay;
    if (['180', '365', '730'].includes(String(range))) startDay = endDay - Number(range);
    else if (range === 'all') startDay = Math.min(endDay - 180, oldestOf(allProjects));
    else {
      const active = allProjects.filter(project => !summarize(project, asOf).complete);
      const hasWorkDates = project => (project.events || []).length > 0 || (project.records || []).length > 0;
      const datedActive = active.filter(hasWorkDates);
      const minimumRecentDays = active.some(project => !hasWorkDates(project)) ? 730 : 180;
      if (!active.length && allProjects.length) {
        let latestPublication = -Infinity;
        for (const project of allProjects) {
          const exact = sortEvents(project.events).findLast(event => event.type === 'published');
          const latest = exact ? dateToDay(exact.date) : knownPublicationYear(project, asOf)
            ? dateToDay(`${project.publicationYear}-12-31`) : NaN;
          if (Number.isFinite(latest)) latestPublication = Math.max(latestPublication, latest);
        }
        // Padding is a viewing window only; it never becomes a project milestone.
        if (Number.isFinite(latestPublication)) endDay = Math.min(endDay, latestPublication + 30);
      }
      startDay = datedActive.length
        ? Math.max(endDay - 730, Math.min(endDay - minimumRecentDays, oldestOf(datedActive)))
        : active.length ? endDay - 730 : Math.min(endDay - 180, oldestOf(allProjects));
    }
    return { start: dayToDate(startDay), end: dayToDate(endDay), startDay, endDay, days: endDay - startDay };
  }

  function referenceText(value) { return typeof value === 'string' ? value.trim() : ''; }
  function safeWebUrl(value, httpsOnly = false) {
    const text = referenceText(value);
    if (!text || /[\u0000-\u001f\u007f]/.test(text)) return '';
    try {
      const url = new URL(text);
      if (!(httpsOnly ? url.protocol === 'https:' : ['http:', 'https:'].includes(url.protocol))
        || !url.hostname || url.username || url.password) return '';
      return url.href;
    } catch (_) { return ''; }
  }
  function doiUrl(value) {
    const doi = referenceText(value);
    if (!/^10\.\d{4,9}\/[\x21-\x7E]+$/.test(doi)) return '';
    const path = doi.split('/').map(part => encodeURIComponent(part)
      .replace(/[!'()*]/g, char => `%${char.charCodeAt(0).toString(16).toUpperCase()}`)).join('/');
    return `https://doi.org/${path}`;
  }
  function publicationLink(project) {
    return safeWebUrl(project.publicationUrl, true) || doiUrl(project.doi) || safeWebUrl(project.sourceUrl);
  }
  function journalReference(project) {
    const journal = referenceText(project.journal), volume = referenceText(project.volume), issue = referenceText(project.issue);
    const pages = referenceText(project.pages), articleNumber = referenceText(project.articleNumber);
    const numbering = volume + (issue ? `(${issue})` : '');
    const journalVolume = [journal, numbering].filter(Boolean).join(' ');
    const location = pages || (articleNumber ? `Article ${articleNumber}` : '');
    const body = [journalVolume, location].filter(Boolean).join(', ');
    const publication = sortEvents(project.events).findLast(event => event.type === 'published' && Number.isFinite(dateToDay(event.date)));
    const year = Number.isInteger(project.publicationYear) ? project.publicationYear : publication?.date.slice(0, 4);
    return [body, year ? `(${year})` : ''].filter(Boolean).join(' ');
  }
  function formatReference(project) {
    const authors = (Array.isArray(project.authors) ? project.authors : []).map(referenceText).filter(Boolean).join(', ');
    const sentences = [authors, referenceText(project.title), journalReference(project)].filter(Boolean)
      .map(text => /[.!?。！？]$/.test(text) ? text : text + '.');
    const link = doiUrl(project.doi) || publicationLink(project);
    return [...sentences, link].filter(Boolean).join(' ');
  }

  const ALIASES = {
    initialized: ['initialized', 'initialization', 'initialisation', 'start', 'started', 'project start', 'paper start', '开始', '启动', '立项', '初始化'],
    initial_draft: ['initial draft', 'initial draft done', 'initial draft complete', 'initial draft and figures', 'initial draft and figures done', 'initial draft figures done', 'initial draft figures', 'draft and figures', 'initial figures', '初稿和图', '初稿与图完成', '初步草稿完成', '初始草稿', '初稿完成'],
    self_revision: ['self revision', 'self revision done', 'self revision complete', 'first self revision', 'first round of revision', 'first round revision', 'my revision', '个人修改完成', '自己修改完成', '自修完成', '自修', '第一轮修改', '第一轮自修'],
    first_draft: ['first draft', 'first draft done', 'first draft complete', 'full draft', 'complete draft', '完整初稿完成', '正式初稿完成', '第一稿完成'],
    submission_package: ['submission package', 'submission package done', 'submission package ready', 'package', 'cover letter', 'package ready', '投稿材料完成', '投稿包完成', '投稿准备完成', '投稿材料'],
    submitted: ['submitted', 'submission', 'submit', 'resubmitted', 'resubmission', '投稿', '已投稿', '重新投稿'],
    acknowledged: ['acknowledged', 'acknowledgment', 'acknowledgement', 'journal acknowledgment', 'journal acknowledgement', 'submission acknowledged', 'journal receipt', '期刊确认', '期刊回执', '收稿确认'],
    editorial_decision: ['editorial decision', 'editorial decision received', 'editor decision', 'editor decision received', 'decision', '编辑决定', '收到编辑决定', '编辑处理决定'],
    transferred: ['transferred', 'transfer', 'journal transfer', 'transferred to another journal', '转投', '期刊转投', '转稿', '已转稿'],
    reviews_received: ['reviews received', 'review received', 'reviewers response', 'reviewer response', 'reviewer response received', 'reviewer response back', 'reviews back', 'review back', '审稿意见', '收到审稿意见', '审稿返回', '审稿意见返回'],
    revision_requested: ['revision requested', 'manuscript revision requested', 'reviewer revision requested', 'minor revision requested', 'major revision requested', '修订要求', '要求修改', '返修要求', '修回要求'],
    response_submitted: ['response submitted', 'first response submitted', 'revision submitted', 'revision received', 'revised manuscript submitted', 'rebuttal submitted', 'author response submitted', '回复提交', '回复已提交', '修回', '返修提交', '答复提交'],
    amendment_requested: ['amendment requested', 'amendments requested', 'submission amendment requested', 'technical amendment requested', 'technical correction requested', 'format correction requested', '编辑要求补件', '补件要求', '格式修改要求'],
    amendment_submitted: ['amendment submitted', 'amendment received', 'amendments submitted', 'submission amendment submitted', 'technical amendment submitted', 'amended files submitted', '补件提交', '补件已提交', '格式修改提交'],
    rejected: ['rejected', 'reject', 'rejection', 'desk rejected', '拒稿', '被拒'],
    accepted: ['accepted', 'accept', 'acceptance', 'submission accepted', '录用', '接受', '已接收'],
    publishing_rights: ['publishing rights', 'publishing and rights', 'in publishing and rights', 'submission is in publishing and rights', 'publishing agreement received', 'publishing agreement requested', 'publication rights requested', '出版及版权处理中', '进入出版和版权阶段', '出版协议收到', '版权协议收到'],
    rights_complete: ['rights complete', 'rights completed', 'publishing rights complete', 'publishing rights completed', 'publishing and rights complete', 'publishing agreement complete', 'publishing agreement completed', 'copyright agreement completed', 'copyright complete', '出版协议完成', '出版及版权完成', '版权协议完成', '版权签署完成'],
    proofread: ['proofread', 'proofreading', 'proofreading done', 'proofs done', 'proof corrected', '校样完成', '校对完成'],
    published: ['published', 'publication', 'publication date', 'online', '发表', '已发表', '出版', '在线发表']
  };
  function normalizeLabel(label) {
    return label.toLowerCase().replace(/&/g, ' and ').replace(/[_–—-]+/g, ' ')
      .replace(/\([^)]*\)/g, ' ').replace(/（[^）]*）/g, ' ')
      .replace(/\bround\s*\d+\b/g, '').replace(/第[一二三四五六七八九十\d]+轮/g, '')
      .replace(/[.,:;!?：；，。]+$/g, '').replace(/\s+/g, ' ').trim();
  }
  const LABELS = new Map();
  for (const milestone of MILESTONES) {
    for (const label of [milestone.type, milestone.label, ...ALIASES[milestone.type]]) LABELS.set(normalizeLabel(label), milestone.type);
  }
  function resolveLabel(label) {
    const clean = normalizeLabel(label);
    if (LABELS.has(clean)) return { type: LABELS.get(clean), journal: '' };
    const journalMatch = label.trim().match(/^(submitted|submission|resubmitted|resubmission|transferred|transfer|投稿|已投稿|重新投稿|转投|转稿|已转稿)\s+(?:to\s+)?(.+)$/i);
    return journalMatch ? { type: /^(transferred|transfer|转投|转稿|已转稿)$/i.test(journalMatch[1]) ? 'transferred' : 'submitted', journal: journalMatch[2] } : null;
  }
  function parseTimeline(text, options = {}) {
    const asOf = options.today || today();
    const errors = [], events = [];
    if (typeof text !== 'string') return { events, errors: [{ line: 0, text: '', message: 'Timeline must be text.' }] };
    if (text.length > 200000) return { events, errors: [{ line: 0, text: '', message: 'Timeline is too long (maximum 200,000 characters).' }] };
    text.split(/\r?\n/).forEach((raw, index) => {
      const line = raw.trim();
      if (!line) return;
      const error = message => errors.push({ line: index + 1, text: raw, message });
      let date, label, note = '', journal = '';
      if (line.includes('|')) {
        const parts = line.split('|').map(part => part.trim());
        if (parts.length < 2 || parts.length > 4) return error('Use date | milestone | optional note | optional journal.');
        if (/^\d{4}-\d{2}-\d{2}$/.test(parts[0])) [date, label, note = '', journal = ''] = parts;
        else if (/^\d{4}-\d{2}-\d{2}$/.test(parts[1])) [label, date, note = '', journal = ''] = parts;
        else return error('Use a date in YYYY-MM-DD format.');
      } else {
        const first = line.match(/^(\d{4}-\d{2}-\d{2})\s*(?:[:：,，;；]\s*|\s+)(.+)$/);
        const last = line.match(/^(.+?)\s*[:：]\s*(\d{4}-\d{2}-\d{2})\s*$/);
        if (first) [, date, label] = first;
        else if (last) [, label, date] = last;
        else return error('Use YYYY-MM-DD | milestone | optional note.');
      }
      if (!Number.isFinite(dateToDay(date))) return error('This is not a valid calendar date.');
      if (date > asOf) return error('Milestones record completed events; the date cannot be in the future.');
      const resolved = resolveLabel(label);
      if (!resolved) return error(`Unknown milestone “${label}”. Choose one of the listed stages.`);
      if (note.length > 10000 || journal.length > 300) return error('The note or journal name is too long.');
      events.push({ id: createId(), type: resolved.type, date, note, journal: journal || resolved.journal });
    });
    return { events: sortEvents(events), errors };
  }

  function validateProject(input, options = {}) {
    const errors = [];
    const asOf = options.today || today();
    if (!input || typeof input !== 'object' || Array.isArray(input)) return { valid: false, errors: ['Project must be an object.'], value: null };
    const stringField = (object, key, required, maximum) => {
      const value = object[key];
      if (value == null && !required) return '';
      if (typeof value !== 'string' || (required && !value.trim()) || value.length > maximum) {
        errors.push(`${key} must be ${required ? 'a nonempty' : 'a'} string of at most ${maximum} characters.`);
        return '';
      }
      return value.trim();
    };
    const id = stringField(input, 'id', true, 200);
    const title = stringField(input, 'title', true, 300);
    const shortName = stringField(input, 'shortName', false, 100);
    const journal = stringField(input, 'journal', false, 300);
    const notes = stringField(input, 'notes', false, 20000);
    const doi = stringField(input, 'doi', false, 300);
    const sourceUrl = stringField(input, 'sourceUrl', false, 2000);
    const sourceNote = stringField(input, 'sourceNote', false, 10000);
    const volume = stringField(input, 'volume', false, 500);
    const issue = stringField(input, 'issue', false, 500);
    const pages = stringField(input, 'pages', false, 500);
    const articleNumber = stringField(input, 'articleNumber', false, 500);
    const publisher = stringField(input, 'publisher', false, 500);
    const publicationUrl = stringField(input, 'publicationUrl', false, 2000);
    const metadataSource = stringField(input, 'metadataSource', false, 500);
    const metadataVerifiedOn = stringField(input, 'metadataVerifiedOn', false, 10);
    const currentStatus = stringField(input, 'currentStatus', false, 100);
    const statusLabel = stringField(input, 'statusLabel', false, 150);
    const statusAsOf = stringField(input, 'statusAsOf', false, 10);
    const statusNote = stringField(input, 'statusNote', false, 10000);
    const manuscriptId = stringField(input, 'manuscriptId', false, 200);
    const submissionState = stringField(input, 'submissionState', false, 30);
    const projectKind = input.projectKind == null ? 'paper' : input.projectKind;
    if (!['paper', 'book'].includes(projectKind)) errors.push('projectKind must be paper or book.');
    if (!['', 'not_submitted', 'submitted'].includes(submissionState)) errors.push('submissionState must be empty, not_submitted, or submitted.');
    if (currentStatus && !TYPES.has(currentStatus)) errors.push('currentStatus must be a known milestone type or empty.');
    if ((currentStatus && !statusAsOf) || (statusAsOf && (!Number.isFinite(dateToDay(statusAsOf)) || statusAsOf > asOf))) {
      errors.push('statusAsOf must be a valid nonfuture YYYY-MM-DD date when currentStatus is set.');
    }
    if (publicationUrl && !safeWebUrl(publicationUrl)) errors.push('publicationUrl must be an http or https URL without credentials.');
    if (metadataVerifiedOn && (!Number.isFinite(dateToDay(metadataVerifiedOn)) || metadataVerifiedOn > asOf)) {
      errors.push('metadataVerifiedOn must be a completed verification date in YYYY-MM-DD format.');
    }
    const authorship = input.authorship == null ? 'unknown' : input.authorship;
    if (!['first', 'coauthor', 'unknown'].includes(authorship)) errors.push('authorship must be first, coauthor, or unknown.');
    const authors = [];
    if (input.authors != null) {
      if (!Array.isArray(input.authors) || input.authors.length > 1000) errors.push('authors must be an array with at most 1,000 names.');
      else input.authors.forEach((author, index) => {
        if (typeof author !== 'string' || !author.trim() || author.length > 300) errors.push(`Author ${index + 1}: must be a nonempty name of at most 300 characters.`);
        else authors.push(author.trim());
      });
    }
    const publicationYear = input.publicationYear == null ? null : input.publicationYear;
    if (publicationYear !== null && (!Number.isInteger(publicationYear) || publicationYear < 1000 || publicationYear > Number(asOf.slice(0, 4)))) {
      errors.push(`publicationYear must be an integer from 1000 through ${asOf.slice(0, 4)}, or null.`);
    }
    if (input.focus != null && typeof input.focus !== 'boolean') errors.push('focus must be true or false.');
    const events = [];
    if (!Array.isArray(input.events) || input.events.length > 2000) errors.push('events must be an array with at most 2,000 milestones.');
    else {
      const seenIds = new Set();
      input.events.forEach((event, index) => {
        const prefix = `Milestone ${index + 1}: `;
        if (!event || typeof event !== 'object' || Array.isArray(event)) { errors.push(prefix + 'must be an object.'); return; }
        const before = errors.length;
        const eventId = stringField(event, 'id', true, 200);
        if (seenIds.has(eventId)) errors.push(prefix + 'duplicate milestone ID.');
        seenIds.add(eventId);
        if (!TYPES.has(event.type)) errors.push(prefix + 'unknown milestone type.');
        if (!Number.isFinite(dateToDay(event.date))) errors.push(prefix + 'invalid date; use YYYY-MM-DD.');
        else if (event.date > asOf) errors.push(prefix + 'date is in the future; record completed events only.');
        const note = stringField(event, 'note', false, 10000);
        const eventJournal = stringField(event, 'journal', false, 300);
        if (errors.length === before) events.push({ id: eventId, type: event.type, date: event.date, note, journal: eventJournal });
      });
    }
    const initialized = events.find(event => event.type === 'initialized');
    if (initialized && events.some(event => event.date < initialized.date)) errors.push('A milestone occurs before initialization. Correct the dates or remove initialization.');
    const published = events.find(event => event.type === 'published');
    if (published && events.some(event => event.date > published.date)) errors.push('A milestone occurs after publication. Correct the dates or remove publication.');
    if (submissionState === 'not_submitted' && hasSubmissionEvidence({ publicationYear, currentStatus, statusAsOf }, asOf, events)) {
      errors.push('submissionState not_submitted conflicts with recorded submission, editorial, review, acceptance, or publication evidence.');
    }
    const records = [];
    if (input.records != null) {
      if (!Array.isArray(input.records) || input.records.length > 2000) errors.push('records must be an array with at most 2,000 dated work records.');
      else {
        const seenIds = new Set();
        input.records.forEach((record, index) => {
          const prefix = `Work record ${index + 1}: `;
          if (!record || typeof record !== 'object' || Array.isArray(record)) { errors.push(prefix + 'must be an object.'); return; }
          const before = errors.length;
          const recordId = stringField(record, 'id', true, 200);
          const label = stringField(record, 'label', true, 200);
          const source = stringField(record, 'source', false, 2000);
          const note = stringField(record, 'note', false, 10000);
          if (seenIds.has(recordId)) errors.push(prefix + 'duplicate work record ID.');
          seenIds.add(recordId);
          if (!Number.isFinite(dateToDay(record.date)) || record.date > asOf) errors.push(prefix + 'date must be a valid nonfuture YYYY-MM-DD date.');
          if (errors.length === before) records.push({ id: recordId, label, date: record.date, source, note });
        });
      }
    }
    return { valid: errors.length === 0, errors, value: errors.length ? null : {
      id, title, shortName, journal, focus: input.focus === true, notes, authorship, authors,
      publicationYear, doi, sourceUrl, sourceNote, volume, issue, pages, articleNumber, publisher,
      publicationUrl, metadataSource, metadataVerifiedOn, currentStatus, statusLabel, statusAsOf, statusNote,
      manuscriptId, projectKind, submissionState, records: sortEvents(records), events: sortEvents(events)
    } };
  }
  function validateBackup(input, options = {}) {
    const errors = [];
    let source = input;
    if (typeof source === 'string') {
      if (source.length > 15000000) return { valid: false, errors: ['Backup is too large (maximum 15 MB).'], value: null };
      try { source = JSON.parse(source); } catch (_) { return { valid: false, errors: ['Backup is not valid JSON.'], value: null }; }
    }
    if (!source || typeof source !== 'object' || Array.isArray(source)) return { valid: false, errors: ['Backup must be an object with version: 1 and projects.'], value: null };
    if ((source.version ?? source.schemaVersion) !== 1) errors.push('Unsupported backup version. Expected version: 1.');
    const projects = [], seen = new Set();
    if (!Array.isArray(source.projects) || source.projects.length > 500) errors.push('projects must be an array with at most 500 papers.');
    else source.projects.forEach((project, index) => {
      const checked = validateProject(project, options);
      if (!checked.valid) errors.push(...checked.errors.map(message => `Project ${index + 1}: ${message}`));
      else {
        if (seen.has(checked.value.id)) errors.push(`Project ${index + 1}: duplicate project ID.`);
        seen.add(checked.value.id);
        projects.push(checked.value);
      }
    });
    return { valid: errors.length === 0, errors, value: errors.length ? null : { version: 1, projects } };
  }

  function demoEvent(type, date, note = '', journal = '') { return { id: `demo-${type}-${date}`, type, date, note, journal }; }
  const DEMO_PROJECTS = [
    { id: 'demo-1', title: 'Example · Nanoscale heat transport', shortName: 'Heat transport', journal: 'Example Journal A', focus: true,
      notes: 'Fictional example. Draft the point-by-point response and update Figure 3.', events: [
        demoEvent('initialized', '2026-04-06'), demoEvent('initial_draft', '2026-05-14'), demoEvent('self_revision', '2026-05-28'), demoEvent('first_draft', '2026-06-08'),
        demoEvent('submission_package', '2026-06-12'), demoEvent('submitted', '2026-06-15', '', 'Example Journal A'), demoEvent('reviews_received', '2026-08-04'),
        demoEvent('response_submitted', '2026-08-25'), demoEvent('reviews_received', '2026-10-12', 'Second review round') ] },
    { id: 'demo-2', title: 'Example · Interfacial charge dynamics', shortName: 'Charge dynamics', journal: 'Example Journal C', focus: false,
      notes: 'Fictional example showing rejection and a fresh journal submission.', events: [
        demoEvent('initialized', '2026-03-02'), demoEvent('initial_draft', '2026-04-13'), demoEvent('first_draft', '2026-05-05'), demoEvent('submission_package', '2026-05-11'),
        demoEvent('submitted', '2026-05-13', '', 'Example Journal B'), demoEvent('rejected', '2026-06-22', 'Record every journal attempt'),
        demoEvent('submission_package', '2026-07-08'), demoEvent('submitted', '2026-07-10', '', 'Example Journal C') ] },
    { id: 'demo-3', title: 'Example · Fluctuations in molecular junctions', shortName: 'Molecular fluctuations', journal: '', focus: true,
      notes: 'Fictional example. Finish the initial figures and draft.', events: [demoEvent('initialized', '2026-08-03'), demoEvent('initial_draft', '2026-10-05')] },
    { id: 'demo-4', title: 'Example · Collective vibrational modes', shortName: 'Vibrational modes', journal: 'Example Journal D', focus: false,
      notes: 'Fictional example with the complete publication lifecycle.', events: [
        demoEvent('initialized', '2026-01-12'), demoEvent('initial_draft', '2026-02-10'), demoEvent('self_revision', '2026-02-20'), demoEvent('first_draft', '2026-03-02'),
        demoEvent('submission_package', '2026-03-05'), demoEvent('submitted', '2026-03-09'), demoEvent('reviews_received', '2026-04-23'),
        demoEvent('response_submitted', '2026-05-08'), demoEvent('accepted', '2026-06-10'), demoEvent('proofread', '2026-06-18'), demoEvent('published', '2026-07-02') ] }
  ];
  return { MILESTONES, PHASES, DEMO_PROJECTS, today, dateToDay, dayToDate, daysBetween, createId, sortEvents, sortProjects, journeyMilestones,
    timelineBounds, segments, summarize, parseTimeline, validateProject, validateBackup,
    journalReference, formatReference, publicationLink };
});
