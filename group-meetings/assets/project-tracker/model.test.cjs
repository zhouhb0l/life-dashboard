const assert = require('node:assert/strict');
const M = require('./model.js');
const AS_OF = '2026-10-30';
const event = (type, date, id = `${type}-${date}`) => ({ id, type, date });
const paper = events => ({ id: 'p', title: 'Test paper', focus: false, notes: '', events });

assert.equal(M.daysBetween('2024-02-28', '2024-03-01'), 2, 'leap day is counted');
assert.equal(M.daysBetween('2026-03-08', '2026-03-09'), 1, 'calendar dates do not depend on DST');
assert.ok(Number.isNaN(M.dateToDay('2026-02-29')));
assert.ok(Number.isNaN(M.dateToDay('2026-04-31')));
assert.equal(M.dayToDate(M.dateToDay('2024-02-29')), '2024-02-29');

const repeated = paper([
  event('initialized', '2026-01-01'), event('submitted', '2026-02-01'), event('rejected', '2026-02-11'),
  event('submission_package', '2026-02-20'), event('submitted', '2026-02-21'), event('reviews_received', '2026-03-03'),
  event('response_submitted', '2026-03-08'), event('reviews_received', '2026-03-18'), event('response_submitted', '2026-03-20'),
  event('accepted', '2026-03-30'), event('proofread', '2026-04-02'), event('published', '2026-04-10')
]);
assert.equal(M.validateProject(repeated, { today: AS_OF }).valid, true);
const summary = M.summarize(repeated, AS_OF);
assert.equal(summary.reviewDays, 40, 'all four review periods are accumulated');
assert.equal(summary.responseDays, 7, 'two author response periods are accumulated');
assert.equal(summary.writingDays, 31);
assert.equal(summary.preparationDays, 10);
assert.equal(summary.productionDays, 11);
assert.equal(summary.totalDays, 99, 'published papers stop accumulating time');
assert.equal(summary.submissionCount, 2);
assert.equal(summary.responseCount, 2);
assert.equal(summary.complete, true);
assert.equal(summary.phase, 'complete');
assert.equal(summary.elapsedDays, 0);
assert.equal(M.segments(repeated, AS_OF).at(-1).end, '2026-04-10');
assert.equal(M.segments(repeated, AS_OF).at(-1).ongoing, false);

const review = paper([event('submitted', '2026-10-01')]);
assert.equal(M.summarize(review, AS_OF).reviewDays, 29);
assert.equal(M.summarize(review, AS_OF).elapsedDays, 29);
assert.equal(M.segments(review, AS_OF)[0].ongoing, true);
const sameDay = paper([event('submitted', '2026-10-01'), event('reviews_received', '2026-10-01')]);
assert.equal(M.summarize(sameDay, AS_OF).phase, 'response', 'same-day input order remains meaningful');
assert.equal(M.sortEvents(sameDay.events)[0].type, 'submitted');
assert.equal(M.summarize(paper([]), AS_OF).stage, 'No timeline yet');

const parsed = M.parseTimeline('2026-01-01 | Initialization\n2026-02-01 Initial draft & figures done\nSelf revision: 2026-02-12\n2026-03-01 | submitted | note | Journal X\n2026-03-20 | 收到审稿意见\n2026-04-01 | response submitted (round 1)\n2026-04-18 | 审稿返回\n2026-04-26 | 回复提交', { today: AS_OF });
assert.deepEqual(parsed.errors, []);
assert.equal(parsed.events.length, 8);
assert.equal(parsed.events[3].journal, 'Journal X');
assert.equal(parsed.events[3].note, 'note');
assert.deepEqual(parsed.events.map(item => item.type), ['initialized', 'initial_draft', 'self_revision', 'submitted', 'reviews_received', 'response_submitted', 'reviews_received', 'response_submitted']);
const badLines = M.parseTimeline('2026-02-30 | submitted\n2027-01-01 | accepted\n2026-01-01 | mystery\nunknown', { today: AS_OF });
assert.equal(badLines.errors.length, 4, 'every invalid nonempty line is reported');
assert.equal(badLines.events.length, 0);
assert.equal(M.parseTimeline('2026-02-01 | Initial draft complete', { today: AS_OF }).events[0].type, 'initial_draft');
assert.equal(M.parseTimeline('2026-02-01 | Submitted to Example Journal X', { today: AS_OF }).events[0].journal, 'Example Journal X');

assert.equal(M.validateProject(paper([event('initialized', '2026-10-01'), event('submitted', '2026-09-01')]), { today: AS_OF }).valid, false);
assert.equal(M.validateProject(paper([event('published', '2026-10-01'), event('accepted', '2026-10-02')]), { today: AS_OF }).valid, false);
assert.equal(M.validateProject(paper([event('submitted', '2027-01-01')]), { today: AS_OF }).valid, false);
assert.equal(M.validateProject(paper([event('submitted', '2026-10-01', 'same'), event('reviews_received', '2026-10-10', 'same')]), { today: AS_OF }).valid, false);
assert.equal(M.validateProject({ ...paper([]), title: '<img src=x onerror=alert(1)>' }, { today: AS_OF }).valid, true, 'model preserves text; UI must escape it');
assert.equal(M.validateProject({ ...paper([]), focus: 'yes' }, { today: AS_OF }).valid, false);
assert.equal(M.validateBackup('{bad json').valid, false);
assert.equal(M.validateBackup({ version: 2, projects: [] }).valid, false);
assert.equal(M.validateBackup({ version: 1, projects: [paper([]), paper([])] }).valid, false);
assert.equal(M.validateBackup(JSON.stringify({ version: 1, projects: [repeated] }), { today: AS_OF }).valid, true);
assert.equal(M.validateBackup({ schemaVersion: 1, projects: [] }).value.version, 1);
assert.equal(M.validateBackup({ version: 1, projects: M.DEMO_PROJECTS }, { today: AS_OF }).valid, true);

const bibliography = { ...paper([]), id: 'b2014', title: 'Published bibliography entry', authorship: 'first', authors: ['Example Author', 'Second Author'],
  publicationYear: 2014, doi: '10.1234/example', sourceUrl: 'https://example.org/paper', sourceNote: 'Year from publisher record.' };
const yearSummary = M.summarize(bibliography, AS_OF);
assert.equal(yearSummary.complete, true, 'publication metadata without milestones is completed work');
assert.equal(yearSummary.phase, 'complete');
assert.equal(yearSummary.stage, 'Published');
assert.equal(yearSummary.nextAction, 'Publication complete');
assert.equal(yearSummary.startedOn, null, 'a publication year does not invent a start date');
assert.equal(yearSummary.latestEvent, null, 'a publication year does not invent a publication milestone');
assert.equal(yearSummary.totalDays, 0);
assert.equal(yearSummary.elapsedDays, 0);
assert.equal(yearSummary.reviewDays, 0);
assert.equal(M.segments(bibliography, AS_OF).length, 0, 'year-only records have no duration bars');
const incompletePublishedHistory = { ...bibliography, publicationYear: 2020, events: [
  event('initialized', '2019-01-01'), event('submitted', '2019-02-01'), event('accepted', '2020-01-01')
] };
const historicSummary = M.summarize(incompletePublishedHistory, AS_OF);
assert.equal(historicSummary.complete, true, 'publication metadata overrides an incomplete historic milestone trail');
assert.equal(historicSummary.phase, 'complete');
assert.equal(historicSummary.stage, 'Published');
assert.equal(historicSummary.nextAction, 'Publication complete');
assert.equal(historicSummary.elapsedDays, 0);
assert.equal(historicSummary.latestEvent.type, 'accepted', 'the latest known event is preserved without inventing a publication event');
assert.equal(historicSummary.reviewDays, 334, 'closed known review intervals remain measured');
assert.equal(historicSummary.productionDays, 0, 'unknown acceptance-to-publication time is not extended through today');
assert.equal(historicSummary.totalDays, 365, 'only the known historic date span is measured');
assert.equal(M.segments(incompletePublishedHistory, AS_OF).length, 2);
assert.equal(M.segments(incompletePublishedHistory, AS_OF).some(segment => segment.ongoing), false);
assert.equal(M.summarize({ ...bibliography, publicationYear: 2020, events: [event('submitted', '2019-01-01')] }, AS_OF).reviewDays, 0, 'an unclosed review period has unknown duration for a published record');
const checkedBibliography = M.validateBackup(JSON.stringify({ version: 1, projects: [bibliography] }), { today: AS_OF });
assert.equal(checkedBibliography.valid, true);
for (const field of ['authorship', 'authors', 'publicationYear', 'doi', 'sourceUrl', 'sourceNote']) {
  assert.deepEqual(checkedBibliography.value.projects[0][field], bibliography[field], `${field} survives a backup round trip`);
}
const legacy = M.validateProject(paper([]), { today: AS_OF }).value;
assert.equal(legacy.authorship, 'unknown');
assert.deepEqual(legacy.authors, []);
assert.equal(legacy.publicationYear, null);
assert.equal(legacy.doi, '');
assert.equal(M.validateProject({ ...bibliography, publicationYear: 2027 }, { today: AS_OF }).valid, false);
assert.equal(M.validateProject({ ...bibliography, publicationYear: '2014' }, { today: AS_OF }).valid, false);
assert.equal(M.validateProject({ ...bibliography, publicationYear: 999 }, { today: AS_OF }).valid, false);
assert.equal(M.validateProject({ ...bibliography, authorship: 'last' }, { today: AS_OF }).valid, false);
assert.equal(M.validateProject({ ...bibliography, authors: ['Valid', 42] }, { today: AS_OF }).valid, false);
assert.equal(M.validateProject({ ...bibliography, sourceNote: {} }, { today: AS_OF }).valid, false);
assert.equal(M.summarize({ ...bibliography, events: [event('published', '2014-05-21')] }, AS_OF).latestEvent.date, '2014-05-21', 'exact publication date remains exact');

const activeRecent = { ...paper([event('initialized', '2026-09-01')]), id: 'active-recent' };
const activeOld = { ...paper([event('initialized', '2014-01-01')]), id: 'active-old' };
const activeUndated = { ...paper([]), id: 'active-undated' };
const pub2026 = { ...bibliography, id: 'b2026', publicationYear: 2026 };
const pub2025 = { ...bibliography, id: 'b2025', publicationYear: 2025 };
assert.deepEqual(M.sortProjects([bibliography, activeOld, pub2025, activeRecent, pub2026, activeUndated], AS_OF).map(p => p.id),
  ['active-undated', 'active-recent', 'active-old', 'b2026', 'b2025', 'b2014'], 'undated active first, then newest active, then newest published');
const exact2026 = { ...pub2026, id: 'exact2026', events: [event('published', '2026-04-01')] };
assert.deepEqual(M.sortProjects([pub2026, exact2026], AS_OF).map(p => p.id), ['exact2026', 'b2026'], 'exact dates sort before same-year approximate records');
assert.equal(M.timelineBounds([bibliography, activeRecent], AS_OF, 'auto').days, 180, 'old publications do not compress the active work view');
assert.equal(M.timelineBounds([bibliography, activeRecent], AS_OF, 'all').start, '2014-01-01', 'all history includes the known publication year');
assert.equal(M.timelineBounds([bibliography], AS_OF, 'auto').start, '2014-01-01', 'all-published view shows visible publication history');
assert.equal(M.timelineBounds([bibliography], AS_OF, 'auto').end, '2015-01-30', 'year-only publication view ends thirty days beyond its known year');
const exact2014 = { ...bibliography, events: [event('published', '2014-05-21')] };
const exact2014Bounds = M.timelineBounds([exact2014], AS_OF, 'auto');
assert.equal(exact2014Bounds.end, '2014-06-20', 'a single historic publication is framed near its actual date');
assert.equal(exact2014Bounds.days, 180, 'historic publication views retain a readable minimum span');
assert.equal(exact2014Bounds.endDay, M.dateToDay(exact2014Bounds.end));
assert.equal(M.summarize(exact2014, AS_OF).totalDays, 0, 'view padding creates no duration');
assert.equal(exact2014.events.length, 1, 'view padding creates no milestones');
assert.equal(M.timelineBounds([exact2014], AS_OF, 'all').end, AS_OF, 'explicit full history still ends today');
assert.equal(M.timelineBounds([exact2014], AS_OF, '365').end, AS_OF, 'fixed ranges still end today');
assert.equal(M.timelineBounds([activeUndated, bibliography], AS_OF, 'auto').days, 730, 'undated current work gets two recent years despite older publications');
assert.equal(M.timelineBounds([activeUndated], AS_OF, 'auto').days, 730);
assert.equal(M.timelineBounds([activeUndated, activeRecent, bibliography], AS_OF, 'auto').days, 730, 'any undated active paper keeps recent two-year intervals in view');
const before2014 = { ...bibliography, id: 'b2010', publicationYear: 2010 };
assert.equal(M.timelineBounds([before2014], AS_OF, 'all').start, '2010-01-01', 'full history is not hardcoded to 2014');
assert.equal(M.timelineBounds([incompletePublishedHistory], AS_OF, 'auto').start, '2019-01-01', 'published records with partial history do not become active');
assert.equal(M.timelineBounds([activeOld], AS_OF, 'auto').days, 730, 'active automatic view caps at 24 months');
assert.equal(M.timelineBounds([activeOld], AS_OF, 'all').start, '2014-01-01');
for (const range of ['180', '365', '730']) assert.equal(M.timelineBounds([bibliography], AS_OF, range).days, Number(range));
assert.equal(M.timelineBounds([], AS_OF, 'auto').days, 180);
assert.equal(M.timelineBounds([bibliography], AS_OF, 'all').end, AS_OF);
assert.throws(() => M.timelineBounds([], '2026-02-30'), RangeError);

const fullReference = { ...bibliography, title: 'A complete reference', journal: 'Example Journal', volume: '12', issue: '3',
  pages: '123–129', articleNumber: 'e456', publisher: 'Example Publisher', publicationUrl: 'https://publisher.example/paper',
  metadataSource: 'Publisher landing page', metadataVerifiedOn: AS_OF };
const checkedFullReference = M.validateBackup(JSON.stringify({ version: 1, projects: [fullReference] }), { today: AS_OF });
assert.equal(checkedFullReference.valid, true);
for (const field of ['volume', 'issue', 'pages', 'articleNumber', 'publisher', 'publicationUrl', 'metadataSource', 'metadataVerifiedOn']) {
  assert.equal(checkedFullReference.value.projects[0][field], fullReference[field], `${field} survives backup validation`);
  assert.equal(legacy[field], '', `${field} defaults to an empty string for old workspaces`);
}
assert.equal(M.journalReference(fullReference), 'Example Journal 12(3), 123–129 (2014)');
assert.equal(M.journalReference({ ...fullReference, pages: '' }), 'Example Journal 12(3), Article e456 (2014)', 'article numbers are labeled when pages are absent');
assert.equal(M.journalReference({ ...fullReference, pages: '', articleNumber: '', issue: '' }), 'Example Journal 12 (2014)');
assert.equal(M.journalReference({ ...fullReference, publicationYear: null, events: [event('published', '2014-05-21')] }), 'Example Journal 12(3), 123–129 (2014)', 'exact publication events supply a missing citation year');
assert.equal(M.formatReference(fullReference), 'Example Author, Second Author. A complete reference. Example Journal 12(3), 123–129 (2014). https://doi.org/10.1234/example');
assert.ok(M.formatReference({ ...fullReference, authors: ['Last-listed', 'First-listed'] }).startsWith('Last-listed, First-listed.'), 'author order is never rearranged');
assert.equal(M.publicationLink(fullReference), 'https://publisher.example/paper', 'the secure publication landing page is preferred');
assert.equal(M.publicationLink({ ...fullReference, publicationUrl: '' }), 'https://doi.org/10.1234/example');
assert.equal(M.publicationLink({ sourceUrl: 'http://example.org/paper' }), 'http://example.org/paper');
const htmlTitle = '<img src=x onerror=alert(1)>';
assert.ok(M.formatReference({ ...fullReference, title: htmlTitle }).includes(htmlTitle), 'references are plain text; the UI is responsible for escaping HTML');
for (const publicationUrl of ['javascript:alert(1)', 'data:text/html,<script>alert(1)</script>', 'file:///etc/passwd', 'https://user:password@example.org', 'https://example.org/\nunsafe']) {
  assert.equal(M.validateProject({ ...fullReference, publicationUrl }, { today: AS_OF }).valid, false, 'unsafe publication URL is rejected');
  assert.equal(M.publicationLink({ publicationUrl }), '', 'unsafe link is never returned');
}
assert.equal(M.publicationLink({ doi: 'javascript:alert(1)', sourceUrl: 'javascript:alert(2)' }), '');
assert.equal(M.publicationLink({ doi: '10.1234/a\"<b>?c#d\'e' }), 'https://doi.org/10.1234/a%22%3Cb%3E%3Fc%23d%27e', 'DOI punctuation cannot become HTML or URL syntax');
assert.equal(M.publicationLink({ doi: '10x1234/a' }), '');
assert.equal(M.publicationLink({ doi: '10.123/a' }), '');
assert.equal(M.validateProject({ ...fullReference, volume: '1'.repeat(501) }, { today: AS_OF }).valid, false);
assert.equal(M.validateProject({ ...fullReference, metadataVerifiedOn: '2026-02-30' }, { today: AS_OF }).valid, false);
assert.equal(M.validateProject({ ...fullReference, metadataVerifiedOn: '2026-11-01' }, { today: AS_OF }).valid, false);
assert.equal(M.validateProject({ ...fullReference, publicationUrl: 'http://publisher.example/paper' }, { today: AS_OF }).valid, true, 'http remains a supported stored bibliographic URL');

const record = (id, date, label = 'Dated manuscript artifact') => ({ id, date, label, source: 'C:\\project\\paper\\draft.tex', note: 'Artifact date, not a completion milestone.' });
const acceptedUndated = { ...paper([event('initialized', '2026-01-01'), event('first_draft', '2026-02-01'), event('submitted', '2026-02-10')]),
  currentStatus: 'accepted', statusLabel: 'Accepted · awaiting proofs', statusAsOf: AS_OF, statusNote: 'Author confirms acceptance; exact date unknown.',
  manuscriptId: 'EXAMPLE-2026-1', records: [record('r1', '2026-01-20')], projectKind: 'paper' };
const acceptedSummary = M.summarize(acceptedUndated, AS_OF);
assert.equal(acceptedSummary.stage, 'Accepted · awaiting proofs');
assert.equal(acceptedSummary.phase, 'production');
assert.equal(acceptedSummary.complete, false, 'accepted is not published');
assert.equal(acceptedSummary.nextAction, 'Complete proofreading');
assert.equal(acceptedSummary.latestEvent.type, 'submitted', 'snapshot does not fabricate an acceptance event');
assert.equal(acceptedSummary.statusUndated, true);
assert.equal(acceptedSummary.statusAsOf, AS_OF);
assert.equal(acceptedSummary.elapsedDays, null, 'unknown stage start yields no invented days');
assert.equal(acceptedSummary.reviewDays, 0, 'old open review is not extended after undated acceptance');
assert.equal(acceptedSummary.writingDays, 31, 'closed intervals remain counted');
assert.equal(acceptedSummary.preparationDays, 9);
assert.equal(acceptedSummary.totalDays, 40, 'known total span ends at the latest actual event');
assert.equal(M.segments(acceptedUndated, AS_OF).length, 2);
assert.equal(M.segments(acceptedUndated, AS_OF).some(item => item.ongoing), false);
const recordedResponse = { ...paper([]), id: 'response-now', currentStatus: 'response_submitted', statusAsOf: AS_OF,
  statusLabel: 'Response submitted · awaiting decision', records: [record('response-cover', '2026-10-26', 'Revision cover letter')] };
const responseSnapshotSummary = M.summarize(recordedResponse, AS_OF);
assert.equal(responseSnapshotSummary.phase, 'review');
assert.equal(responseSnapshotSummary.stage, 'Response submitted · awaiting decision');
assert.equal(responseSnapshotSummary.elapsedDays, null);
assert.equal(responseSnapshotSummary.latestEvent, null);
assert.equal(responseSnapshotSummary.totalDays, 0);
assert.equal(responseSnapshotSummary.responseCount, 0, 'a current-state assertion is not a dated response milestone');
assert.equal(M.segments(recordedResponse, AS_OF).length, 0, 'artifact dates create no duration bars');
const firstDraftSnapshot = { ...recordedResponse, currentStatus: 'first_draft', statusLabel: '' };
assert.equal(M.summarize(firstDraftSnapshot, AS_OF).phase, 'preparation', 'a finished first draft is distinct from peer-review response');
assert.equal(M.summarize({ ...recordedResponse, currentStatus: 'initial_draft', statusLabel: '' }, AS_OF).phase, 'writing');
assert.equal(M.summarize({ ...recordedResponse, currentStatus: 'published', statusLabel: '' }, AS_OF).complete, true);

const staleSnapshot = { ...paper([event('submitted', '2026-10-01'), event('reviews_received', '2026-10-05')]),
  currentStatus: 'submitted', statusLabel: 'Old under-review label', statusAsOf: '2026-10-01' };
assert.equal(M.summarize(staleSnapshot, AS_OF).phase, 'response', 'a newer milestone supersedes a stale status assertion');
assert.equal(M.summarize(staleSnapshot, AS_OF).stage, 'Preparing reviewer response');
assert.equal(M.summarize(staleSnapshot, AS_OF).statusUndated, false);
assert.equal(M.summarize(staleSnapshot, AS_OF).statusAsOf, '', 'stale confirmations are not reported as the effective status date');
assert.equal(M.summarize(staleSnapshot, AS_OF).elapsedDays, 25);
assert.equal(M.summarize({ ...staleSnapshot, statusAsOf: '2026-10-05' }, AS_OF).phase, 'response', 'a same-day different milestone wins');
const sameTypeSnapshot = { ...staleSnapshot, currentStatus: 'reviews_received', statusAsOf: AS_OF, statusLabel: 'Working through reviewer comments' };
assert.equal(M.summarize(sameTypeSnapshot, AS_OF).stage, 'Working through reviewer comments');
assert.equal(M.summarize(sameTypeSnapshot, AS_OF).elapsedDays, 25, 'matching actual milestone supplies a known stage start');
assert.equal(M.summarize(sameTypeSnapshot, AS_OF).statusUndated, false);
assert.equal(M.segments(sameTypeSnapshot, AS_OF).at(-1).ongoing, true);
assert.equal(M.summarize({ ...sameTypeSnapshot, statusAsOf: '2026-10-05' }, AS_OF).stage, 'Working through reviewer comments', 'same-day matching status may customize the label');

const book = { ...paper([]), id: 'book', projectKind: 'book', currentStatus: 'initial_draft', statusLabel: 'Book revision', statusAsOf: AS_OF,
  records: [record('book-early', '2023-09-01'), record('book-recent', '2026-10-15')] };
assert.equal(M.timelineBounds([book], AS_OF, 'auto').days, 730, 'older book records cap the adaptive view at two years');
assert.equal(M.timelineBounds([book], AS_OF, 'all').start, '2023-09-01', 'full history includes real work records');
assert.equal(M.timelineBounds([recordedResponse], AS_OF, 'auto').days, 180, 'recent work records count as dated evidence rather than triggering undated fallback');
assert.equal(M.summarize(book, AS_OF).totalDays, 0, 'book records create no elapsed research duration');
assert.deepEqual(M.sortProjects([bibliography, activeUndated, { ...recordedResponse, id: 'older-status', statusAsOf: '2026-10-01' }, recordedResponse, activeRecent], AS_OF).map(p => p.id),
  ['response-now', 'older-status', 'active-undated', 'active-recent', 'b2014'], 'authoritative active statuses precede placeholders and sort newest first');

const stateBackup = M.validateBackup(JSON.stringify({ version: 1, projects: [acceptedUndated, recordedResponse, book] }), { today: AS_OF });
assert.equal(stateBackup.valid, true);
for (const field of ['currentStatus', 'statusLabel', 'statusAsOf', 'statusNote', 'manuscriptId', 'projectKind', 'records']) {
  assert.deepEqual(stateBackup.value.projects[0][field], acceptedUndated[field], `${field} survives backup validation`);
}
const normalizedLegacy = M.validateProject(paper([]), { today: AS_OF }).value;
assert.equal(normalizedLegacy.currentStatus, '');
assert.equal(normalizedLegacy.statusAsOf, '');
assert.equal(normalizedLegacy.projectKind, 'paper');
assert.deepEqual(normalizedLegacy.records, []);
assert.equal(M.validateProject({ ...book, projectKind: 'report' }, { today: AS_OF }).valid, false);
assert.equal(M.validateProject({ ...book, currentStatus: 'work_recorded' }, { today: AS_OF }).valid, false, 'records are not milestone types');
assert.equal(M.validateProject({ ...book, statusAsOf: '' }, { today: AS_OF }).valid, false);
assert.equal(M.validateProject({ ...book, statusAsOf: '2026-11-01' }, { today: AS_OF }).valid, false);
assert.equal(M.validateProject({ ...book, statusLabel: 'x'.repeat(151) }, { today: AS_OF }).valid, false);
assert.equal(M.validateProject({ ...book, records: [record('same', '2026-01-01'), record('same', '2026-02-01')] }, { today: AS_OF }).valid, false);
assert.equal(M.validateProject({ ...book, records: [record('future', '2026-11-01')] }, { today: AS_OF }).valid, false);
assert.equal(M.validateProject({ ...book, records: [record('bad', '2026-02-30')] }, { today: AS_OF }).valid, false);
assert.equal(M.summarize({ ...acceptedUndated, currentStatus: 'proofread', statusLabel: '' }, AS_OF).statusType, 'proofread', 'effective proofreading-complete status remains distinguishable from the earlier accepted event');
const neverSubmitted = { ...paper([]), id: 'preparing', currentStatus: 'initial_draft', statusAsOf: AS_OF,
  submissionState: 'not_submitted', records: [record('preparation-record', '2026-10-01')] };
assert.equal(M.validateProject(neverSubmitted, { today: AS_OF }).valid, true);
assert.equal(M.summarize(neverSubmitted, AS_OF).submissionState, 'not_submitted', 'known submission state is separate from unknown phase start date');
assert.equal(M.summarize({ ...neverSubmitted, submissionState: '' }, AS_OF).submissionState, '', 'preparation alone does not prove never submitted');
assert.equal(M.summarize(paper([event('submitted', '2026-10-01')]), AS_OF).submissionState, 'submitted');
assert.equal(M.summarize(recordedResponse, AS_OF).submissionState, 'submitted', 'an undated current response confirms an earlier submission');
assert.equal(M.summarize(acceptedUndated, AS_OF).submissionState, 'submitted');
assert.equal(M.summarize(bibliography, AS_OF).submissionState, 'submitted');
for (const type of ['submitted', 'acknowledged', 'response_submitted', 'reviews_received', 'editorial_decision', 'transferred', 'rejected', 'accepted', 'proofread', 'published']) {
  assert.equal(M.validateProject({ ...neverSubmitted, events: [event(type, '2026-10-01')] }, { today: AS_OF }).valid, false, `not_submitted contradicts ${type} history`);
  assert.equal(M.validateProject({ ...neverSubmitted, currentStatus: type }, { today: AS_OF }).valid, false, `not_submitted contradicts current ${type}`);
}
assert.equal(M.validateProject({ ...neverSubmitted, publicationYear: 2025 }, { today: AS_OF }).valid, false);
assert.equal(M.validateProject({ ...neverSubmitted, submissionState: 'pending' }, { today: AS_OF }).valid, false);
assert.equal(M.validateProject(paper([]), { today: AS_OF }).value.submissionState, '');
assert.equal(M.validateBackup({ version: 1, projects: [neverSubmitted] }, { today: AS_OF }).value.projects[0].submissionState, 'not_submitted');

const transferredPaper = { ...paper([
  { ...event('acknowledged', '2026-09-10'), journal: 'Physical Review Letters' },
  event('editorial_decision', '2026-09-22'), { ...event('transferred', '2026-09-25'), journal: 'Physical Review B' }
]), currentStatus: 'transferred', statusAsOf: AS_OF, records: [
  record('author-files-received', '2026-09-24', 'Author response and files received'),
  record('prb-ack', '2026-09-28', 'PRB acknowledgment'), record('referee-invitation', '2026-10-14', 'Referee invitation response')
] };
assert.equal(M.validateProject(transferredPaper, { today: AS_OF }).valid, true);
const transferSegments = M.segments(transferredPaper, AS_OF);
assert.equal(transferSegments[0].phase, 'review');
assert.equal(transferSegments[0].days, 12, 'journal acknowledgment starts a known process interval without inventing the earlier upload date');
assert.equal(transferSegments[1].phase, 'preparation');
assert.equal(transferSegments[1].days, 3, 'editorial decision to transfer is preparation, not author response to reviewer reports');
assert.equal(transferSegments.at(-1).phase, 'review');
assert.equal(transferSegments.at(-1).days, 35, 'a dated journal transfer starts its known review interval');
const transferSummary = M.summarize(transferredPaper, AS_OF);
assert.equal(transferSummary.stage, 'Under review after journal transfer');
assert.equal(transferSummary.statusType, 'transferred');
assert.equal(transferSummary.phase, 'review');
assert.equal(transferSummary.elapsedDays, 35);
assert.equal(transferSummary.submissionCount, 0, 'acknowledgment and transfer do not fabricate an initial submission event');
assert.equal(transferSummary.transferCount, 1);
assert.equal(transferSummary.responseCount, 0, 'an author-files receipt record does not imply a reviewer-response milestone');
assert.equal(transferSummary.submissionState, 'submitted');
assert.equal(transferSummary.preparationDays, 3);
assert.equal(transferSummary.reviewDays, 47);
assert.equal(transferSummary.totalDays, 50);
assert.equal(transferredPaper.events.some(item => ['reviews_received', 'response_submitted'].includes(item.type)), false);
const explicitResponsePeriod = M.segments(paper([event('editorial_decision', '2026-09-22'), event('response_submitted', '2026-09-24')]), AS_OF);
assert.equal(explicitResponsePeriod[0].days, 2);
assert.equal(explicitResponsePeriod[0].phase, 'preparation');
const transferParsed = M.parseTimeline('2026-09-10 | Journal acknowledgment\n2026-09-22 | Editorial decision received\n2026-09-25 | Transferred to Physical Review B\n2026-09-26 | 编辑决定\n2026-09-27 | 转稿', { today: AS_OF });
assert.deepEqual(transferParsed.errors, []);
assert.deepEqual(transferParsed.events.map(item => item.type), ['acknowledged', 'editorial_decision', 'transferred', 'editorial_decision', 'transferred']);
assert.equal(transferParsed.events[2].journal, 'Physical Review B');
assert.equal(M.parseTimeline('2026-09-22 | decision', { today: AS_OF }).events[0].type, 'editorial_decision', 'an unspecified decision does not imply reviewer reports');
const recessedContact = { ...paper([
  event('submitted', '2026-07-17'), event('revision_requested', '2026-08-25'), event('response_submitted', '2026-09-08'),
  event('amendment_requested', '2026-09-09'), event('amendment_submitted', '2026-09-09'),
  event('amendment_requested', '2026-09-10'), event('amendment_submitted', '2026-09-10'),
  event('revision_requested', '2026-09-30'), event('response_submitted', '2026-10-14'), event('amendment_requested', '2026-10-14'),
  event('amendment_submitted', '2026-10-15'), event('accepted', '2026-10-15'),
  event('publishing_rights', '2026-10-24'), event('rights_complete', '2026-10-26')
]), id: 'recessed-contact', title: 'Recessed contact', currentStatus: 'rights_complete', statusAsOf: AS_OF };
const recessedChecked = M.validateProject(recessedContact, { today: AS_OF });
assert.equal(recessedChecked.valid, true);
const recessedSummary = M.summarize(recessedContact, AS_OF);
assert.equal(recessedSummary.responseDays, 29, 'two scientific revisions plus the overnight amendment count only known author-work periods');
assert.equal(recessedSummary.reviewDays, 61, 'journal intervals resume after scientific responses and technical amendments');
assert.equal(recessedSummary.productionDays, 15, 'production begins on acceptance and continues through rights completion');
assert.equal(recessedSummary.totalDays, 105);
assert.equal(recessedSummary.responseCount, 2, 'technical amendments do not inflate the two scientific response rounds');
assert.equal(recessedSummary.amendmentCount, 3);
assert.equal(recessedSummary.submissionCount, 1);
assert.equal(recessedSummary.phase, 'production');
assert.equal(recessedSummary.statusType, 'rights_complete');
assert.equal(recessedSummary.stage, 'Publishing and rights complete');
assert.equal(recessedSummary.nextAction, 'Await proofs and complete proofreading');
assert.equal(recessedSummary.elapsedDays, 4);
assert.equal(recessedSummary.complete, false, 'publishing rights completion is neither proofreading nor publication');
assert.equal(recessedSummary.submissionState, 'submitted');
assert.equal(recessedContact.events.some(item => ['proofread', 'published'].includes(item.type)), false);
const recessedPeriods = M.segments(recessedContact, AS_OF);
assert.equal(recessedPeriods.reduce((sum, item) => sum + item.days, 0), 105, 'same-day transitions do not double-count days');
assert.deepEqual(M.sortEvents(recessedContact.events).filter(item => item.date === '2026-10-15').map(item => item.type),
  ['amendment_submitted', 'accepted'], 'same-day amendment receipt precedes acceptance as supplied');
assert.equal(recessedPeriods.find(item => item.event.id === 'amendment_requested-2026-09-09').days, 0);
assert.equal(recessedPeriods.find(item => item.event.id === 'amendment_requested-2026-10-14').days, 1);
const recessedBackup = M.validateBackup(JSON.stringify({ version: 1, projects: [recessedContact] }), { today: AS_OF });
assert.equal(recessedBackup.valid, true);
assert.deepEqual(recessedBackup.value.projects[0].events.map(item => item.type), recessedContact.events.map(item => item.type));
for (const type of ['revision_requested', 'amendment_requested', 'amendment_submitted', 'publishing_rights', 'rights_complete']) {
  assert.equal(M.validateProject({ ...neverSubmitted, events: [event(type, '2026-10-01')] }, { today: AS_OF }).valid, false, `not_submitted contradicts ${type}`);
  assert.equal(M.validateProject({ ...neverSubmitted, currentStatus: type }, { today: AS_OF }).valid, false);
}
const productionPaste = M.parseTimeline('2026-08-25 | Revision requested\n2026-09-09 | Amendment requested\n2026-09-09 | Amendment submitted\n2026-10-24 | In publishing and rights\n2026-10-26 | Publishing and rights complete', { today: AS_OF });
assert.deepEqual(productionPaste.errors, []);
assert.deepEqual(productionPaste.events.map(item => item.type), ['revision_requested', 'amendment_requested', 'amendment_submitted', 'publishing_rights', 'rights_complete']);
assert.equal(M.parseTimeline('2026-08-25 | reviews received', { today: AS_OF }).events[0].type, 'reviews_received', 'reviewer-report receipt remains a distinct event');
assert.equal(M.parseTimeline('2026-10-26 | 版权协议完成', { today: AS_OF }).events[0].type, 'rights_complete');
const portalPhrases = M.parseTimeline('2026-09-08 | Revision received\n2026-09-09 | Amendment received\n2026-10-15 | Submission accepted\n2026-10-24 | Submission is in publishing and rights', { today: AS_OF });
assert.deepEqual(portalPhrases.errors, []);
assert.deepEqual(portalPhrases.events.map(item => item.type), ['response_submitted', 'amendment_submitted', 'accepted', 'publishing_rights']);
assert.deepEqual(portalPhrases.events.map(item => item.date), ['2026-09-08', '2026-09-09', '2026-10-15', '2026-10-24']);
const journeyProject = { ...paper([
  event('submitted', '2026-04-01'), event('accepted', '2026-09-10'), event('initialized', '2026-01-03'),
  event('acknowledged', '2026-01-05'), event('transferred', '2026-01-08'), event('response_submitted', '2026-02-01'),
  event('submitted', '2026-03-01'), event('published', '2026-10-01'), event('accepted', '2026-09-15')
]), publicationYear: 2026, currentStatus: 'published', statusAsOf: AS_OF, records: [record('old-work', '2025-01-01')] };
const journey = M.journeyMilestones(journeyProject);
assert.deepEqual(journey.map(item => item.type), ['initialized', 'submitted', 'accepted', 'published']);
assert.deepEqual(journey.map(item => item.event.date), ['2026-01-03', '2026-03-01', '2026-09-10', '2026-10-01'], 'key milestones use earliest actual events and first journal submission, excluding acknowledgment, transfer, and response');
assert.equal(journey[1].label, 'First journal submission');
assert.equal(journey[1].shortLabel, 'First submitted');
assert.deepEqual(journey.map(item => item.shortLabel), ['Initialized', 'First submitted', 'Accepted', 'Published']);
assert.deepEqual(journey.map(item => item.symbol), ['○', '↑', '★', '✓']);
assert.ok(journey.every(item => typeof item.label === 'string' && typeof item.shortLabel === 'string' && typeof item.symbol === 'string'));
assert.deepEqual(M.journeyMilestones({ ...book, publicationYear: 2026, currentStatus: 'published' }).map(item => item.event), [null, null, null, null], 'record dates, year, and status confirmation never fabricate key milestone dates');
assert.equal(M.journeyMilestones(transferredPaper).find(item => item.type === 'submitted').event, null, 'a known transfer does not supply an unknown original submission date');
assert.deepEqual(M.journeyMilestones({ events: [] }).map(item => item.event), [null, null, null, null]);
assert.equal(M.journeyMilestones(recessedContact).find(item => item.type === 'accepted').event.date, '2026-10-15');
assert.equal(M.journeyMilestones(recessedContact).find(item => item.type === 'published').event, null, 'publishing rights completion does not become publication');
console.log('Paper tracker model: all lifecycle, duration, parser, and backup checks passed.');
