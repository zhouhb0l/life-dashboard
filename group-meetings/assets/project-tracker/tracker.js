(function () {
  'use strict';
  const M = window.PaperTrackerModel;
  const KEY = 'research-paper-progress.v1';
  const PREVIOUS = KEY + '.previous';
  const $ = id => document.getElementById(id);
  const escape = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const clone = value => JSON.parse(JSON.stringify(value));
  const doiKey = value => String(value||'').trim().replace(/^https?:\/\/(?:dx\.)?doi\.org\//i,'').toLowerCase();
  const webKey = value => {try{const url=new URL(value);url.hash='';return url.href;}catch(_){return '';}};
  const milestone = type => M.MILESTONES.find(item => item.type === type);
  let today = M.today(), workspace = clone(window.PAPER_TRACKER_SEED), demo = false;
  let demoProjects = clone(M.DEMO_PROJECTS), filter = 'all', roleFilter = 'all', editing = null, parsed = null, imported = null;
  let customWindow = null, latestBounds = null;
  let viewingPublication = null;
  let toastTimer, storageWorks = true, recovery = null, priorMemory = null, unreadableCurrent = false;

  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const checked = M.validateBackup(raw);
      if (checked.valid) workspace = checked.value;
      else { recovery = raw; unreadableCurrent = true; }
    }
    if (!recovery) recovery = localStorage.getItem(KEY + '.unreadable');
  } catch (_) { storageWorks = false; }

  function notify(message) {
    $('toast').textContent = message;
    $('toast').hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { $('toast').hidden = true; }, 6000);
  }
  function storageStatus() {
    $('storage-status').textContent = storageWorks ? '● Saved on this device' : '● Memory only — export a backup';
    $('storage-status').title = 'Browser-local data. Export a JSON backup to use another device or browser.';
    $('storage-status').classList.toggle('storage-warning', !storageWorks);
  }
  function save() {
    try {
      if (recovery) localStorage.setItem(KEY + '.unreadable', recovery);
      localStorage.setItem(KEY, JSON.stringify(workspace));
      storageWorks = true;
    } catch (_) { storageWorks = false; }
    storageStatus();
    return storageWorks;
  }
  function remember() {
    priorMemory = clone(workspace);
    try { localStorage.setItem(PREVIOUS, JSON.stringify(workspace)); } catch (_) { /* In-memory recovery still works. */ }
  }
  function currentProjects() { return demo ? demoProjects : workspace.projects; }
  function dateLabel(date, options = {}) {
    return new Intl.DateTimeFormat('en-GB', {day:'numeric',month:'short',year:'numeric',timeZone:'UTC',...options}).format(new Date(M.dateToDay(date) * 86400000));
  }
  function working(summary) { return !['review','complete','unscheduled'].includes(summary.phase) && summary.statusType !== 'proofread'; }
  function showDialog(id) { $(id).showModal(); }
  function closeDialog(id) { $(id).close(); }
  const roleLabel = role => ({first:'First author',coauthor:'Co-author',unknown:'Authorship not set'}[role] || 'Authorship not set');
  function rolePill(project) {const role=project.authorship || 'unknown';return `<span class="role-pill ${role}">${roleLabel(role)}</span>`;}
  function paperEndDate(project){const summary=M.summarize(project,today);if(!summary.complete)return today;const events=M.sortEvents(project.events);return events.findLast(event=>event.type==='published')?.date || (project.publicationYear?`${project.publicationYear}-12-31`:summary.statusAsOf || events.at(-1)?.date || today);}

  function orderImportedEvents(events, sourceEvents) {
    const ordered=M.sortEvents(events);
    const sourceIds=new Map(sourceEvents.map((event,index)=>[event.id,{event,index}]));
    const sourceKeys=new Map();
    sourceEvents.forEach((event,index)=>{const key=`${event.date}|${event.type}`;if(!sourceKeys.has(key))sourceKeys.set(key,index);});
    const rank=event=>{
      const source=sourceIds.get(event.id);
      if(source)return source.event.date===event.date&&source.event.type===event.type?source.index:-1;
      return sourceKeys.get(`${event.date}|${event.type}`)??-1;
    };
    for(let start=0;start<ordered.length;){
      let end=start+1;
      while(end<ordered.length&&ordered[end].date===ordered[start].date)end++;
      // Restore source chronology only in its matching same-day slots. User-only
      // events and edited dates/types retain their positions and complete values.
      const imported=ordered.slice(start,end).filter(event=>rank(event)>=0).sort((a,b)=>rank(a)-rank(b));
      let next=0;
      for(let index=start;index<end;index++)if(rank(ordered[index])>=0)ordered[index]=imported[next++];
      start=end;
    }
    return ordered;
  }

  function syncProjectFile() {
    const revision = window.PAPER_TRACKER_SEED_REVISION;
    if (!revision) return;
    const currentRevision=window.PAPER_TRACKER_CURRENT_SOURCE_REVISION||revision;
    let previousRevision='',previousCurrentRevision='';
    try {
      previousRevision=localStorage.getItem(KEY+'.source-revision')||'';
      if(previousRevision===revision)return;
      previousCurrentRevision=localStorage.getItem(KEY+'.current-source-revision')||(previousRevision===currentRevision?previousRevision:'');
    }catch(_){}
    const checked=M.validateBackup(window.PAPER_TRACKER_SEED,{today});
    if(!checked.valid){notify('Project file data needs attention: '+checked.errors[0]);return;}
    const byId=new Map(workspace.projects.map(project=>[project.id,project]));
    let added=0;const conflicts=[];
    for(const source of checked.value.projects){
      const existing=byId.get(source.id)||(source.doi?[...byId.values()].find(project=>doiKey(project.doi)===doiKey(source.doi)):null);
      if(!existing){byId.set(source.id,clone(source));added++;continue;}
      const corrections=(window.PAPER_TRACKER_EVENT_CORRECTIONS||[]).filter(item=>item.projectId===source.id);
      const retainedEvents=existing.events.filter(event=>!corrections.some(item=>event.id===item.id&&event.type===item.type&&event.date===item.date&&typeof item.expectedNote==='string'&&(event.note||'')===item.expectedNote&&(event.journal||'')===item.expectedJournal));
      const merged={...existing};
      if(source.shortName && existing.title===source.shortName)merged.title=source.title;
      for(const key of ['journal','doi','sourceUrl','sourceNote','publicationYear','shortName','volume','issue','pages','articleNumber','publisher','publicationUrl','metadataSource','metadataVerifiedOn','publicationType']) if(!merged[key] && source[key])merged[key]=source[key];
      merged.relatedPublications=clone(existing.relatedPublications||[]);
      for(const item of source.relatedPublications||[]){
        const urls=[item.publicationUrl,item.sourceUrl].map(webKey).filter(Boolean);
        const matching=merged.relatedPublications.find(record=>{
          if(record.doi&&item.doi)return doiKey(record.doi)===doiKey(item.doi);
          return [record.publicationUrl,record.sourceUrl].map(webKey).some(url=>url&&urls.includes(url));
        });
        if(matching){for(const [key,value] of Object.entries(item))if(matching[key]==null||matching[key]===''||(Array.isArray(matching[key])&&!matching[key].length))matching[key]=clone(value);}
        else merged.relatedPublications.push(clone(item));
      }
      if(!merged.authors?.length)merged.authors=source.authors;
      if(!merged.authorship || merged.authorship==='unknown')merged.authorship=source.authorship;
      const updateCurrent=previousCurrentRevision!==currentRevision&&(window.PAPER_TRACKER_CURRENT_UPDATE_IDS||[]).includes(source.id);
      if(updateCurrent){
        for(const key of ['title','journal','authorship','authors','manuscriptId','projectKind','submissionState'])if(source[key] && (!(Array.isArray(source[key]))||source[key].length))merged[key]=clone(source[key]);
        if(['recessed-contact','tan-thermal','non-gaussian-bounds'].includes(source.id)&&source.sourceNote&&existing.sourceNote!==source.sourceNote&&!existing.sourceNote?.startsWith(source.sourceNote))merged.sourceNote=source.sourceNote+(existing.sourceNote?'\n\nEarlier notes (superseded where corrected above):\n'+existing.sourceNote:'');
        if(!merged.notes&&source.notes)merged.notes=source.notes;
        if(!existing.statusAsOf || source.statusAsOf>=existing.statusAsOf){for(const key of ['currentStatus','statusLabel','statusAsOf','statusNote'])merged[key]=source[key];}
      }
      const recordIds=new Set((existing.records||[]).map(record=>record.id));
      const recordKeys=new Set((existing.records||[]).map(record=>`${record.date}|${record.label}|${record.source}`));
      merged.records=[...(existing.records||[]),...(source.records||[]).filter(record=>!recordIds.has(record.id)&&!recordKeys.has(`${record.date}|${record.label}|${record.source}`))];
      // Existing user-entered milestone history takes priority over imported publisher history.
      if(!retainedEvents.length)merged.events=clone(source.events);
      else if(updateCurrent){
        const events=[...retainedEvents];
        for(const event of source.events)if(!events.some(item=>item.id===event.id||(item.type===event.type&&item.date===event.date)) && !events.some(item=>item.type===event.type && ['initialized','accepted','published'].includes(item.type)))events.push(clone(event));
        merged.events=orderImportedEvents(events,source.events);
      }
      let valid=M.validateProject(merged,{today});
      if(!valid.valid&&updateCurrent){
        merged.events=clone(retainedEvents);
        merged.statusNote=(merged.statusNote||'')+' Imported milestone dates conflict with existing milestone history; the original events were retained for review.';
        valid=M.validateProject(merged,{today});
        conflicts.push(existing.shortName||existing.title);
      }
      if(valid.valid)byId.set(existing.id,valid.value);else if(!conflicts.includes(existing.shortName||existing.title))conflicts.push(existing.shortName||existing.title);
    }
    const next=M.validateBackup({version:1,projects:[...byId.values()]},{today});
    if(!next.valid){notify('Publication import needs attention: '+next.errors[0]);return;}
    remember();workspace=next.value;const saved=save();
    if(saved&&!conflicts.length){try{localStorage.setItem(KEY+'.source-revision',revision);localStorage.setItem(KEY+'.current-source-revision',currentRevision);}catch(_){}}
    if(conflicts.length)notify(`Conflicting imported records need review for: ${conflicts.join(', ')}. Existing history was kept.`);
    else if(added)notify(`${added} project records added. Current statuses and source details were updated; existing edits were preserved.`);
  }

  function render() {
    const projects = currentProjects();
    const summaries = projects.map(project => ({project, summary:M.summarize(project,today)}));
    document.querySelectorAll('[data-role]').forEach(button=>{const role=button.dataset.role;const count=projects.filter(project=>role==='all'||(project.authorship||'unknown')===role).length;button.textContent=`${role==='all'?'All authorships':role==='unknown'?'Not set':roleLabel(role)} · ${count}`;});
    $('today-stamp').textContent = dateLabel(today);
    $('demo-banner').hidden = !demo;
    $('onboarding-banner').hidden = true;
    $('stats').innerHTML = [
      ['▤','Projects tracked',projects.length,'Across your research portfolio'],
      ['↗','In progress',summaries.filter(item => working(item.summary)).length,'Writing, response & preparation'],
      ['◷','In journal review',summaries.filter(item => item.summary.phase === 'review').length,'Waiting for the next decision'],
      ['✓','Published',summaries.filter(item => item.summary.complete).length,'From idea to publication']
    ].map(([icon,label,value,note]) => `<div class="stat-card"><span class="stat-icon" aria-hidden="true">${icon}</span><p class="stat-label">${label}</p><strong class="stat-value">${value.toString().padStart(2,'0')}</strong><p class="stat-note">${note}</p></div>`).join('');
    const focus = summaries.filter(({project,summary}) => project.focus || working(summary)).sort((a,b) => Number(b.project.focus)-Number(a.project.focus));
    $('focus-count').textContent = `${focus.length} ${focus.length === 1 ? 'project' : 'projects'}`;
    $('focus-list').innerHTML = focus.length ? focus.map(({project,summary}) => `<button type="button" class="focus-card" data-edit="${escape(project.id)}"><span class="focus-meta"><span class="pill phase-${summary.phase}">${escape(summary.stage)}</span>${project.focus ? '<span class="focus-star" aria-label="Pinned">★</span>' : ''}</span><strong class="focus-title">${escape(project.shortName || project.title)}</strong><span class="focus-action">${escape(project.notes || summary.nextAction)}</span><span class="focus-footer"><span>${summary.submissionState==='not_submitted' ? 'Not submitted' : summary.statusUndated ? 'Stage start date not recorded' : summary.latestEvent ? `${summary.elapsedDays} ${summary.elapsedDays===1?'day':'days'} in this stage` : summary.complete ? 'Published' : 'Add dates to begin'}</span>${rolePill(project)}<span aria-hidden="true">↗</span></span></button>`).join('') : '<div class="empty-state"><span class="empty-symbol" aria-hidden="true">◎</span><div><strong>Your next step starts here.</strong><p class="empty-copy">Add milestone dates to a paper. Active work will appear here automatically, or pin any paper yourself.</p></div></div>';
    renderTimeline(summaries);
    renderScholarAudit();
    renderPublications();
    $('project-count').textContent = `${projects.length} projects · ${projects.filter(project => project.events.length || project.records?.length).length} with dated records${demo ? ' · Example data' : ''}`;
    storageStatus();
  }

  function renderTimeline(summaries) {
    const query=$('search').value.trim().toLowerCase();
    const byId=new Map(summaries.map(item=>[item.project.id,item]));
    const selected=M.sortProjects(summaries.map(item=>item.project),today).map(project=>byId.get(project.id)).filter(({project,summary})=>
      (!query || `${project.title} ${project.journal} ${project.notes} ${(project.authors||[]).join(' ')}`.toLowerCase().includes(query)) &&
      (roleFilter==='all' || (project.authorship||'unknown')===roleFilter) &&
      (filter==='all' || (filter==='working' && working(summary)) || (filter==='review' && summary.phase==='review') || (filter==='published' && summary.complete)));
    const range=$('date-range').value;
    const bounds=range==='custom' && customWindow ? customWindow : M.timelineBounds(selected.map(item=>item.project),today,range==='custom'?'auto':range);
    latestBounds=bounds;
    $('range-summary').textContent=`${dateLabel(bounds.start)} – ${dateLabel(bounds.end)}`;
    $('range-start').value=bounds.start;$('range-end').value=bounds.end;
    $('period-next').disabled=bounds.end>=today;
    const now=M.dateToDay(today),start=bounds.startDay,end=bounds.endDay+Math.max(3,Math.ceil(bounds.days*.025)),width=end-start;
    const pct=day=>Math.max(0,Math.min(100,100*(day-start)/width));
    const paperEnd=paperEndDate;
    const paperStart=project=>M.sortEvents(project.events)[0]?.date || (project.publicationYear?`${project.publicationYear}-01-01`:today);
    const archived=selected.filter(({project,summary})=>summary.complete && (M.dateToDay(paperEnd(project))<bounds.startDay || M.dateToDay(paperStart(project))>bounds.endDay));
    const pending=selected.filter(({project,summary})=>!summary.complete&&!project.events.length&&!project.records?.length&&!project.currentStatus);
    const visible=selected.filter(item=>!archived.includes(item)&&!pending.includes(item));
    $('timeline-pending').hidden=!pending.length;
    $('timeline-pending').innerHTML=pending.length?`<details><summary>Current projects awaiting dates · ${pending.length} <span>Expand to enter dates and authorship</span></summary>${pending.map(({project})=>`<div class="archive-paper-row"><div><button type="button" class="project-name" data-edit="${escape(project.id)}">${escape(project.title)}</button><span class="project-subtitle">Milestone dates not entered yet</span></div>${rolePill(project)}<button class="button secondary small" type="button" data-edit="${escape(project.id)}">Add dates</button></div>`).join('')}</details>`:'';
    $('timeline-archive').hidden=!archived.length;
    const archiveLabel=archived.every(({project})=>M.dateToDay(paperEnd(project))<bounds.startDay)?'Earlier papers':'Other publications';
    $('timeline-archive').innerHTML=archived.length?`<details><summary>${archiveLabel} · ${archived.length} outside this period <span>Expand or choose Full publication history</span></summary>${archived.map(({project})=>`<div class="archive-paper-row"><div><button type="button" class="project-name" data-edit="${escape(project.id)}">${escape(project.shortName||project.title)}</button><span class="project-subtitle">${escape(project.journal)} · ${project.publicationYear || paperEnd(project).slice(0,4)}</span></div>${rolePill(project)}<button class="button secondary small" type="button" data-period="${escape(project.id)}">View period →</button></div>`).join('')}</details>`:'';
    if(!visible.length){$('timeline').innerHTML=pending.length&&!archived.length?'<div class="timeline-empty"><strong>These projects are ready for their dates.</strong><p>Expand the current projects above and add a milestone to start a horizontal timeline.</p></div>':'<div class="timeline-empty"><strong>No papers in this period.</strong><p>Choose a wider date range, expand the papers outside this period, or change the filters.</p></div>';return;}
    const ticks=[],startDate=new Date(start*86400000),year=startDate.getUTCFullYear(),month=startDate.getUTCMonth();
    const monthSpan=Math.ceil(width/30.4),step=Math.max(1,Math.ceil(monthSpan/9));
    for(let i=0;i<monthSpan+step+1;i+=step){
      const time=Date.UTC(year,month+i,1)/86400000;if(time<start||time>end)continue;
      const label=new Intl.DateTimeFormat('en-GB',width>1095?{year:'numeric',timeZone:'UTC'}:{month:'short',year:'2-digit',timeZone:'UTC'}).format(new Date(time*86400000));
      if(ticks.at(-1)?.label!==label)ticks.push({at:pct(time),label});
    }
    const todayPosition=pct(now),showToday=now>=start&&now<=end;
    const axis=`<div class="timeline-axis"><div class="axis-label">PAPER / ROLE · TIME →</div><div class="axis-track">${ticks.filter(tick=>!showToday||Math.abs(tick.at-todayPosition)>6).map(tick=>`<span class="axis-tick" style="left:${tick.at}%">${tick.label}</span>`).join('')}${showToday?`<span class="today-label" style="left:${todayPosition}%">Today</span>`:''}</div></div>`;
    let previousGroup='';
    $('timeline').innerHTML=axis+visible.map(({project,summary},index)=>{
      const group=summary.complete?'Published papers':'Current projects';
      const heading=group!==previousGroup?`<div class="timeline-group"><strong>${group}</strong><span>${summary.complete?'Newest publications first':'First-author and co-author roles are shown separately'}</span></div>`:'';previousGroup=group;
      const grid=ticks.map(tick=>`<i class="grid-line" style="left:${tick.at}%" aria-hidden="true"></i>`).join('');
      const periods=M.segments(project,today);
      const journey=M.journeyMilestones(project);
      const keyIds=new Set(journey.filter(item=>item.event).map(item=>item.event.id));
      const bars=periods.filter(segment=>M.dateToDay(segment.end)>=start&&M.dateToDay(segment.start)<=bounds.endDay).map(segment=>{
        const left=pct(M.dateToDay(segment.start)),right=pct(Math.min(M.dateToDay(segment.end),bounds.endDay));if(right<=left)return '';
        const details=`${project.title}: ${milestone(segment.event.type).stage}; ${dateLabel(segment.start)} to ${dateLabel(segment.end)}${segment.ongoing?' (ongoing)':''} · ${segment.days} days${segment.event.note?' · '+segment.event.note:''}${segment.event.journal?' · '+segment.event.journal:''}`;
        return `<button type="button" class="timeline-bar phase-${segment.phase}${segment.ongoing?' ongoing':''}" data-edit="${escape(project.id)}" style="left:${left}%;width:${right-left}%" title="${escape(details)}" aria-label="${escape(details)}">${right-left>7?`<span class="bar-label">${segment.days}d</span>`:''}</button>`;
      }).join('');
      const dots=M.sortEvents(project.events).filter(event=>!keyIds.has(event.id)&&M.dateToDay(event.date)>=start&&M.dateToDay(event.date)<=bounds.endDay).map(event=>`<button type="button" class="milestone-dot phase-${milestone(event.type).phase}" data-edit="${escape(project.id)}" style="left:${pct(M.dateToDay(event.date))}%" title="${escape(`${milestone(event.type).label} · ${dateLabel(event.date)}${event.note?' · '+event.note:''}`)}" aria-label="${escape(`${project.title}: ${milestone(event.type).label}, ${dateLabel(event.date)}`)}"></button>`).join('');
      const keyMarkers=journey.filter(item=>item.event&&M.dateToDay(item.event.date)>=start&&M.dateToDay(item.event.date)<=bounds.endDay).map(item=>{
        const event=item.event,position=pct(M.dateToDay(event.date));
        const edge=position<25?' label-after':position>75?' label-before':'';
        const shared=(item.type==='published'&&journey.find(key=>key.type==='accepted').event?.date===event.date)||(item.type==='submitted'&&journey.find(key=>key.type==='initialized').event?.date===event.date);
        const label=item.type==='submitted'?'First submission':item.shortLabel;
        const details=`${project.title}: ${item.type==='submitted'?'First recorded journal submission':item.label} · ${dateLabel(event.date)}${event.note?' · '+event.note:''}${item.type==='submitted'?' · Earliest submission in this recorded history; earlier journal attempts may be missing.':''}`;
        return `<button type="button" class="key-milestone key-${item.type}${edge}${shared?' shared-date':''}" data-edit="${escape(project.id)}" style="left:${position}%" title="${escape(details)}" aria-label="${escape(details)}"><span class="key-milestone-symbol" aria-hidden="true">${escape(item.symbol)}</span><span class="key-milestone-label">${escape(label)} <time datetime="${event.date}">${escape(dateLabel(event.date))}</time></span></button>`;
      }).join('');
      const records=M.sortEvents(project.records||[]).filter(record=>M.dateToDay(record.date)>=start&&M.dateToDay(record.date)<=bounds.endDay).map(record=>`<button type="button" class="record-marker" data-edit="${escape(project.id)}" style="left:${pct(M.dateToDay(record.date))}%" title="${escape(`${record.label} · ${dateLabel(record.date)} · Dated record or journal activity; does not change the measured work phase. ${record.note||''} Source: ${record.source||''}`)}" aria-label="${escape(`${project.title}: ${record.label}, ${dateLabel(record.date)}, documentary evidence`)}"></button>`).join('');
      const snapshot=summary.submissionState==='not_submitted'?'<span class="status-snapshot pill phase-writing">Not submitted</span>':summary.statusUndated?`<span class="status-snapshot pill phase-${summary.phase}" title="${escape(project.statusNote||'Current status confirmed; stage entry date is not documented.')}">Stage date not recorded · confirmed ${escape(dateLabel(summary.statusAsOf,{year:undefined}))}</span>`:'';
      const yearOnly=summary.complete&&project.publicationYear&&!project.events.some(event=>event.type==='published');
      let yearMarker='';
      if(yearOnly){
        const from=M.dateToDay(`${project.publicationYear}-01-01`),to=M.dateToDay(`${project.publicationYear}-12-31`);
        if(to>=start&&from<=bounds.endDay)yearMarker=`<button class="year-marker" type="button" data-edit="${escape(project.id)}" style="left:${pct(Math.max(from,start))}%;width:${Math.max(.8,pct(Math.min(to,bounds.endDay,now))-pct(Math.max(from,start)))}%" title="Published ${project.publicationYear}; exact date unknown. This band is date uncertainty, not duration.">${project.publicationYear} · year only</button>`;
      }
      const info=summary.complete?`Published · ${summary.latestEvent?.type==='published'?dateLabel(summary.latestEvent.date):project.publicationYear||'date not recorded'}`:summary.statusUndated?summary.stage:summary.latestEvent?`${summary.stage} · ${summary.elapsedDays}d`:'Dates not entered';
      const hasIntervals=project.events.some(event=>event.type!=='published');
      const reviewKnown=periods.some(period=>period.phase==='review');
      const responseKnown=periods.some(period=>period.phase==='response');
      const metrics=hasIntervals?`<span class="project-duration" title="A dash means that period's dates are not recorded.">Journal ${reviewKnown?summary.reviewDays+'d':'—'} <span>·</span> Response ${responseKnown?summary.responseDays+'d':'—'}${summary.submissionCount>1?` <span>·</span> ${summary.submissionCount} submissions`:''}${summary.transferCount?` <span>·</span> ${summary.transferCount} transfer${summary.transferCount===1?'':'s'}`:''}</span>`:'';
      const writingKnown=periods.some(period=>period.phase==='writing');
      const initializationKnown=journey.some(item=>item.type==='initialized'&&item.event);
      const preparationKnown=project.events.some(event=>['first_draft','submission_package'].includes(event.type));
      const preparationMeasured=periods.some(period=>period.phase==='preparation');
      const earlyMetrics=writingKnown||preparationKnown?`<span class="project-duration">Writing ${writingKnown?summary.writingDays+'d':'—'} <span>·</span> Prep ${preparationMeasured?summary.preparationDays+'d':'—'}</span>`:'';
      const prompts=summary.complete?'':`<div class="phase-date-prompts" aria-label="Early stages with dates to record">${!initializationKnown?`<button type="button" class="phase-date-prompt phase-writing" data-edit="${escape(project.id)}" data-add-milestone="initialized" aria-label="${escape(`Record initialization date for ${project.title}`)}" title="The initialization date is not recorded. Enter the actual date research began; no date is inferred from documents.">Research &amp; writing · add start date</button>`:''}${!preparationKnown?`<button type="button" class="phase-date-prompt phase-preparation" data-edit="${escape(project.id)}" data-add-milestone="first_draft" aria-label="${escape(`Record first draft completion date for ${project.title}`)}" title="Record first full draft completion when reached. This starts submission preparation; the submission package and cover letter can be recorded separately.">Submission preparation · record date</button>`:''}</div>`;
      const undated=!project.events.length&&!project.records?.length&&!project.currentStatus&&!yearOnly?`<button type="button" class="timeline-undated" data-edit="${escape(project.id)}">＋ Add first milestone</button>`:'';
      const afterWindow=(project.events.length||project.records?.length)&&!bars&&!dots&&!keyMarkers&&!records&&!yearMarker?`<button type="button" class="timeline-hidden-note text-link" data-period="${escape(project.id)}">View this project's dates →</button>`:'';
      return heading+`<div class="timeline-row"><div class="project-cell"><span class="project-code">${String(index+1).padStart(2,'0')}</span><div class="project-cell-copy"><button type="button" class="project-name" data-edit="${escape(project.id)}" title="${escape(project.title)}">${escape(project.shortName||project.title)}${project.focus?'<span class="focus-star" aria-label="Pinned"> ★</span>':''}</button><span class="project-subtitle"><i class="dot phase-${summary.phase}"></i>${escape(info)}</span>${rolePill(project)}${!summary.complete?` <button class="text-link" type="button" data-period="${escape(project.id)}">Fit dates ↔</button>`:''}${earlyMetrics}${metrics}</div></div><div class="timeline-track">${grid}${snapshot}${bars}${dots}${records}${keyMarkers}${yearMarker}${prompts}${undated}${afterWindow}${showToday?`<i class="today-line" style="left:${todayPosition}%" aria-hidden="true"></i>`:''}</div></div>`;
    }).join('');
  }

  function publicationDOILink(project){return M.publicationLink({...project,publicationUrl:'',sourceUrl:''});}
  function relatedPublicationsMarkup(project){
    if(!project.relatedPublications?.length)return '';
    const labels={correction:'Author correction',cover:'Cover feature',preprint:'Related preprint · possible earlier version',supplement:'Supporting information'};
    return `<div class="publication-related"><details><summary>Related publications &amp; material · ${project.relatedPublications.length}</summary>${project.relatedPublications.map(item=>{
      const href=M.publicationLink(item);
      return `<article class="related-publication"><span class="publication-type">${labels[item.relation]}</span><h4>${href?`<a href="${escape(href)}" target="_blank" rel="noopener noreferrer">${escape(item.title)} ↗</a>`:escape(item.title)}</h4><p class="fullauthors">${escape((item.authors||[]).join(', '))}</p><p class="ref">${escape(M.journalReference(item))}${item.publishedOn?' · '+escape(dateLabel(item.publishedOn)):''}</p>${item.doi?`<p class="ref">DOI: ${escape(item.doi)}</p>`:''}<p class="note">${escape(item.sourceNote||'')}</p></article>`;
    }).join('')}</details></div>`;
  }
  function renderScholarAudit(){
    const box=$('scholar-audit'),audit=window.PAPER_TRACKER_SCHOLAR_AUDIT;
    box.hidden=!audit?.entries?.length;if(box.hidden)return;
    const labels={already_present:'Already tracked',added:'Added',related:'Companion notice',duplicate:'Duplicate',preprint:'Preprint',misattributed:'Flagged metadata',book_container:'Book volume',thesis:'Thesis',supplement:'Supplement'};
    box.innerHTML=`<summary>Google Scholar checked · ${audit.entries.length} entries · ${audit.summary.added} missing works added</summary><p class="scholar-audit-summary">The supplied library contains ${audit.summary.journalArticles} journal articles and ${audit.summary.bookChapters} authored book chapter, each with a unique DOI. The correction and cover feature remain linked to their parent papers. The table records the decision for every Scholar entry. Citation years and first-online dates may differ.</p><div class="scholar-audit-scroll" tabindex="0" role="region" aria-label="All Google Scholar comparison decisions"><table class="scholar-audit-table"><thead><tr><th scope="col">Decision</th><th scope="col">Scholar entry</th><th scope="col">What was checked</th></tr></thead><tbody>${audit.entries.map(row=>{
      const project=currentProjects().find(item=>row.targetDoi&&doiKey(item.doi)===doiKey(row.targetDoi));
      const sourceUrl=M.publicationLink({sourceUrl:row.verificationUrls?.[0]||''});
      return `<tr><td>${escape(labels[row.status]||row.status)}</td><td>${row.number}. ${escape(row.title)}<br><small>${escape(row.reference)}</small>${project?`<br><button type="button" class="text-link" data-publication="${escape(project.id)}">View tracked work</button>`:''}</td><td>${escape(row.decision)}${sourceUrl?` <a href="${escape(sourceUrl)}" target="_blank" rel="noopener noreferrer">Source ↗</a>`:''}</td></tr>`;
    }).join('')}</tbody></table></div>`;
  }
  function renderPublications(){
    const published=M.sortProjects(currentProjects(),today).filter(project=>M.summarize(project,today).complete);
    const query=$('publication-search').value.trim().toLowerCase(),role=$('publication-role').value;
    const visible=published.filter(project=>(role==='all'||(project.authorship||'unknown')===role)&&(!query||`${project.title} ${(project.authors||[]).join(' ')} ${project.journal} ${project.doi} ${(project.relatedPublications||[]).map(item=>`${item.title} ${item.doi} ${(item.authors||[]).join(' ')}`).join(' ')}`.toLowerCase().includes(query)));
    $('publication-count').textContent=`${visible.length} of ${published.length} works`;
    $('publication-library').innerHTML=visible.length?visible.map((project,index)=>{
      const href=M.publicationLink(project),doiHref=publicationDOILink(project);
      return `<article class="publication-card"><div class="publication-card-header"><span class="publication-number">${String(index+1).padStart(2,'0')} · ${project.publicationYear || project.events.find(event=>event.type==='published')?.date.slice(0,4) || 'Published'}</span>${rolePill(project)}${project.publicationType==='book_chapter'?'<span class="publication-type">Book chapter</span>':''}</div><h3 class="publication-title">${href?`<a href="${escape(href)}" target="_blank" rel="noopener noreferrer">${escape(project.title)} <span aria-hidden="true">↗</span></a>`:escape(project.title)}</h3><p class="publication-authors">${escape((project.authors||[]).join(', ') || 'Authors not recorded yet.')}</p><p class="publication-reference">${escape(M.journalReference(project))}</p><div class="publication-card-footer">${project.doi?`<span class="publication-doi">DOI: ${doiHref?`<a href="${escape(doiHref)}" target="_blank" rel="noopener noreferrer">${escape(project.doi)}</a>`:escape(project.doi)}</span>`:'<span class="publication-doi">DOI not recorded</span>'}<div class="publication-actions"><button class="button ghost small" type="button" data-copy-citation="${escape(project.id)}">Copy citation</button><button class="button secondary small" type="button" data-publication="${escape(project.id)}">Details</button>${href?`<a class="button secondary small" href="${escape(href)}" target="_blank" rel="noopener noreferrer">Publication page ↗</a>`:''}</div></div>${relatedPublicationsMarkup(project)}</article>`;
    }).join(''):'<div class="empty-state"><strong>No matching publications.</strong><p class="empty-copy">Try another title, author, journal, or authorship.</p></div>';
  }
  function openPublication(id){
    const project=currentProjects().find(item=>item.id===id);if(!project)return;
    viewingPublication=id;
    $('publication-detail-title').textContent=project.title;
    $('publication-detail-authors').textContent=(project.authors||[]).join(', ') || 'Authors not recorded yet.';
    $('publication-detail-role').innerHTML=rolePill(project);
    const pubDate=M.sortEvents(project.events).findLast(event=>event.type==='published')?.date;
    const facts=[['Type',project.publicationType==='book_chapter'?'Book chapter':'Journal article'],[project.publicationType==='book_chapter'?'Book':'Journal',project.journal],['Citation year',project.publicationYear],['Volume',project.volume],['Issue',project.issue],['Pages',project.pages],['Article number',project.articleNumber],['Publisher',project.publisher],['Published online',pubDate?dateLabel(pubDate):'Exact date not recorded'],['DOI',project.doi]];
    $('publication-facts').innerHTML=facts.filter(([,value])=>value).map(([label,value])=>`<div><dt>${label}</dt><dd>${label==='DOI'&&publicationDOILink(project)?`<a href="${escape(publicationDOILink(project))}" target="_blank" rel="noopener noreferrer">${escape(value)}</a>`:escape(value)}</dd></div>`).join('');
    $('publication-citation').value=M.formatReference(project);
    $('publication-detail-related').innerHTML=relatedPublicationsMarkup(project);
    $('publication-detail-history').innerHTML=`<ol>${M.sortEvents(project.events).map(event=>`<li><strong>${escape(dateLabel(event.date))} · ${escape(milestone(event.type).label)}</strong>${event.note?`<p>${escape(event.note)}</p>`:''}</li>`).join('')}</ol>${project.sourceNote?`<p class="form-hint">${escape(project.sourceNote)}</p>`:''}${project.metadataSource?`<p class="form-hint">Citation metadata: ${escape(project.metadataSource)}${project.metadataVerifiedOn?' · checked '+escape(project.metadataVerifiedOn):''}</p>`:''}`;
    const href=M.publicationLink(project);$('detail-publication-link').hidden=!href;if(href)$('detail-publication-link').href=href;else $('detail-publication-link').removeAttribute('href');
    document.querySelector('.publication-detail-history').open=false;
    showDialog('publication-dialog');
  }
  async function copyCitation(id){
    const project=currentProjects().find(item=>item.id===id);if(!project)return;
    try{await navigator.clipboard.writeText(M.formatReference(project));notify('Full citation copied.');}
    catch(_){if(!$('publication-dialog').open)openPublication(id);$('publication-citation').focus();$('publication-citation').select();notify('Citation selected. Press Ctrl+C (or Command+C) to copy it.');}
  }

  function readEvents() {
    return [...$('event-list').children].map(row => ({id:row.dataset.id,type:row.querySelector('select').value,date:row.querySelector('input[type=date]').value,note:row.querySelector('.event-note').value,journal:row.querySelector('.event-journal').value}));
  }
  function updateEditorSummary() {
    const events = readEvents();
    if (events.some(event => !Number.isFinite(M.dateToDay(event.date)))) return;
    const paper={events,publicationYear:$('publication-year').value?Number($('publication-year').value):null,currentStatus:$('project-current-status').value,statusAsOf:$('project-status-date').value,statusLabel:$('project-status-label').value};
    const summary = M.summarize(paper,today);
    const periods = M.segments(paper,today);
    [...$('event-list').children].forEach(row => {
      const period = periods.find(item => item.event.id === row.dataset.id);
      row.querySelector('.event-period').textContent = period ? `${period.label} · ${period.days}d${period.ongoing ? ' · ongoing' : ' until next milestone'}` : row.querySelector('select').value==='published'?'Publication complete':'Period end date not recorded';
    });
    $('editor-summary').textContent = events.length ? `Recorded periods: writing ${summary.writingDays}d · preparation ${summary.preparationDays}d · journal process ${summary.reviewDays}d · response ${summary.responseDays}d · production ${summary.productionDays}d. Dated entries: ${summary.submissionCount} submission(s), ${summary.responseCount} reviewer response(s), ${summary.amendmentCount || 0} technical amendment(s), ${summary.transferCount} transfer(s). Unrecorded stages are excluded.` : 'No milestone dates yet. Dated documents and current submission status remain available above.';
  }
  function addEventRow(event) {
    const row = document.createElement('div');
    row.className = 'event-row';
    row.dataset.id = event.id || M.createId();
    row.innerHTML = `<input type="date" value="${escape(event.date ?? today)}" max="${today}" min="1000-01-01" required aria-label="Milestone date"><select aria-label="Milestone stage">${M.MILESTONES.map(item => `<option value="${item.type}"${item.type===event.type?' selected':''}>${item.label}</option>`).join('')}</select><div class="event-note-fields"><input class="event-note" type="text" value="${escape(event.note || '')}" maxlength="10000" placeholder="Round / optional note" aria-label="Milestone note"><input class="event-journal" type="text" value="${escape(event.journal || '')}" maxlength="300" placeholder="Journal for this round" aria-label="Milestone journal"><span class="event-period"></span></div><button class="icon-button remove-event" type="button" aria-label="Remove milestone">×</button>`;
    $('event-list').append(row);
    updateEditorSummary();
  }
  function openEditor(id,forceEdit=false) {
    const project = currentProjects().find(item => item.id===id);
    if(project&&!forceEdit&&M.summarize(project,today).complete){openPublication(id);return;}
    editing = project ? clone(project) : {id:M.createId(),title:'',journal:'',focus:false,notes:'',events:[]};
    $('editor-title').textContent = project ? (demo ? 'Example paper' : 'Edit paper') : 'New paper';
    $('project-title').value = editing.title;
    $('project-short-name').value = editing.shortName || '';
    $('project-journal').value = editing.journal;
    const statusOptions={initialized:'Research / writing',initial_draft:'Manuscript revision',self_revision:'Finalizing the first draft',first_draft:'Preparing submission package',submission_package:'Ready to submit',submitted:'Submitted / journal process',reviews_received:'Preparing reviewer response',revision_requested:'Revision requested / preparing response',response_submitted:'Response submitted / journal process',amendment_requested:'Technical amendments requested',amendment_submitted:'Technical amendments submitted',rejected:'Preparing resubmission',accepted:'Accepted / production',publishing_rights:'In publishing and rights',rights_complete:'Publishing and rights complete',proofread:'Proofreading done / awaiting publication',published:'Published'};
    $('project-current-status').innerHTML='<option value="">Use dated milestones</option>'+M.MILESTONES.map(item=>`<option value="${item.type}">${statusOptions[item.type]||item.stage}</option>`).join('');
    $('project-current-status').value=editing.currentStatus||'';
    $('project-status-date').value=editing.statusAsOf||'';$('project-status-date').max=today;$('project-status-date').required=!!editing.currentStatus;
    $('project-status-label').value=editing.statusLabel||'';
    $('project-status-note').value=editing.statusNote||'';
    $('project-manuscript-id').value=editing.manuscriptId||'';
    $('project-submission-state').value=editing.submissionState||'';
    $('project-kind').value=editing.projectKind||'paper';
    $('project-authorship').value = editing.authorship || 'unknown';
    $('publication-year').value = editing.publicationYear || '';
    $('publication-year').max = today.slice(0,4);
    $('publication-doi').value = editing.doi || '';
    $('publication-authors').value = (editing.authors || []).join('\n');
    $('publication-source').value = editing.sourceUrl || '';
    $('publication-source-note').value = editing.sourceNote || '';
    document.querySelector('.bibliography-fields').open = false;
    $('project-focus').checked = editing.focus;
    $('project-notes').value = editing.notes;
    $('event-list').replaceChildren();
    M.sortEvents(editing.events).forEach(addEventRow);
    updateEditorSummary();
    const records=M.sortEvents(editing.records||[]);
    $('project-records').hidden=!records.length;$('project-records').open=false;
    $('project-record-count').textContent=`Dated records & journal activity · ${records.length}`;
    $('project-record-list').innerHTML=records.map(record=>`<div class="record-row"><span class="record-date">${escape(dateLabel(record.date))}</span><div><strong class="record-label">${escape(record.label)}</strong>${record.note?`<p class="record-note">${escape(record.note)}</p>`:''}<p class="record-note">Source: ${escape(record.source)}</p></div></div>`).join('');
    $('project-error').textContent = '';
    $('timeline-text').value = '';
    $('text-preview').replaceChildren();
    $('apply-text').hidden = true;
    document.querySelector('.paste-details').open = false;
    parsed = null;
    $('delete-project').hidden = !project;
    showDialog('project-dialog');
  }
  function previewText() {
    parsed = M.parseTimeline($('timeline-text').value,{today});
    $('text-preview').innerHTML = parsed.errors.length ? `<p class="form-error">${parsed.errors.map(error => `Line ${error.line}: ${escape(error.message)}`).join('<br>')}</p>` : parsed.events.length ? parsed.events.map(event => `<div class="preview-row"><span>${escape(event.date)}</span><strong>${escape(milestone(event.type).label)}</strong><span>${escape(event.note || event.journal)}</span></div>`).join('') : '<p class="form-hint">Enter at least one dated milestone above.</p>';
    $('apply-text').hidden = !!parsed.errors.length || !parsed.events.length;
  }
  function exportJSON(value, filename) {
    const blob = new Blob([typeof value==='string'?value:JSON.stringify(value,null,2)],{type:'application/json'});
    const url = URL.createObjectURL(blob), link = document.createElement('a');
    link.href = url; link.download = filename; link.click();
    setTimeout(() => URL.revokeObjectURL(url),1000);
  }
  function exportWorkspace() { exportJSON(workspace,`paper-progress-${today}.json`); notify('Your workspace backup has been exported.'); }
  function mutateWorkspace(next, message) {
    remember(); workspace = clone(next); demo = false;
    const saved = save(); render();
    notify(saved ? message : 'Changes are in memory only. Export a backup to keep them.');
  }

  document.addEventListener('click', event => {
    const edit = event.target.closest('[data-edit]');
    if (edit) {
      openEditor(edit.dataset.edit,Boolean(edit.dataset.addMilestone));
      if(edit.dataset.addMilestone){
        addEventRow({type:edit.dataset.addMilestone,date:''});
        $('editor-summary').textContent='Enter the actual milestone date. The new entry is saved only when you save this paper.';
        $('event-list').lastElementChild.querySelector('input[type="date"]').focus();
      }
    }
    const publication=event.target.closest('[data-publication]');if(publication)openPublication(publication.dataset.publication);
    const citation=event.target.closest('[data-copy-citation]');if(citation)copyCitation(citation.dataset.copyCitation);
    const close = event.target.closest('[data-close]');
    if (close) closeDialog(close.dataset.close);
    const filterButton = event.target.closest('[data-filter]');
    if (filterButton) {
      filter = filterButton.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(button => { button.classList.toggle('active',button===filterButton); button.setAttribute('aria-pressed',String(button===filterButton)); });
      render();
    }
    const roleButton=event.target.closest('[data-role]');
    if(roleButton){roleFilter=roleButton.dataset.role;document.querySelectorAll('[data-role]').forEach(button=>{button.classList.toggle('active',button===roleButton);button.setAttribute('aria-pressed',String(button===roleButton));});render();}
    const periodButton=event.target.closest('[data-period]');
    if(periodButton){
      const paper=currentProjects().find(project=>project.id===periodButton.dataset.period);
      if(paper){const days=[...(paper.events||[]),...(paper.records||[])].map(record=>M.dateToDay(record.date));if(!days.length&&paper.publicationYear)days.push(M.dateToDay(`${paper.publicationYear}-01-01`));const endDay=Math.min(M.dateToDay(today),M.dateToDay(paperEndDate(paper))+7);const earliest=days.length?Math.min(...days):endDay-30;const startDay=Math.min(earliest-7,endDay-30);setCustomWindow(startDay,endDay);}
    }
    if (event.target.closest('.remove-event')) { event.target.closest('.event-row').remove(); updateEditorSummary(); }
  });
  $('new-project').addEventListener('click', () => { if (demo) {demo=false;render();} openEditor(null); });
  $('add-event').addEventListener('click', () => {
    const events = M.sortEvents(readEvents());
    const last = events.at(-1)?.type;
    const next = {rejected:'submission_package',response_submitted:'reviews_received',reviews_received:'response_submitted',revision_requested:'response_submitted',amendment_requested:'amendment_submitted',amendment_submitted:'accepted',publishing_rights:'rights_complete',rights_complete:'proofread',submitted:'reviews_received'}[last] || M.MILESTONES[M.MILESTONES.findIndex(item => item.type===last)+1]?.type || 'initialized';
    addEventRow({type:next,date:today});
    $('event-list').lastElementChild.querySelector('input').focus();
  });
  $('event-list').addEventListener('input',updateEditorSummary);
  $('publication-year').addEventListener('input',updateEditorSummary);
  $('project-current-status').addEventListener('change',()=>{const type=$('project-current-status').value;$('project-status-date').required=!!type;if(type&&!$('project-status-date').value)$('project-status-date').value=today;$('project-status-label').value='';updateEditorSummary();});
  $('project-status-date').addEventListener('input',updateEditorSummary);
  $('preview-text').addEventListener('click',previewText);
  $('timeline-text').addEventListener('input', () => {parsed=null;$('apply-text').hidden=true;$('text-preview').replaceChildren();});
  $('apply-text').addEventListener('click', () => {
    if (!parsed || parsed.errors.length) return;
    const existing = readEvents();
    let count=0;
    for (const event of parsed.events) {
      if (!existing.some(item => item.type===event.type && item.date===event.date && item.note===event.note && item.journal===event.journal)) {addEventRow(event);existing.push(event);count++;}
    }
    $('timeline-text').value='';$('text-preview').textContent=`${count} milestone(s) added to the editor. Save the paper to keep them.`;$('apply-text').hidden=true;parsed=null;
  });
  $('project-form').addEventListener('submit', event => {
    event.preventDefault();
    if ($('timeline-text').value.trim()) { $('project-error').textContent='You have pasted timeline text that has not been added. Preview and append it, or clear the text before saving.';return; }
    const checked = M.validateProject({...editing,title:$('project-title').value,shortName:$('project-short-name').value,journal:$('project-journal').value,authorship:$('project-authorship').value,currentStatus:$('project-current-status').value,statusAsOf:$('project-current-status').value?$('project-status-date').value:'',statusLabel:$('project-status-label').value,statusNote:$('project-status-note').value,manuscriptId:$('project-manuscript-id').value,submissionState:$('project-submission-state').value,projectKind:$('project-kind').value,publicationYear:$('publication-year').value?Number($('publication-year').value):null,doi:$('publication-doi').value,authors:$('publication-authors').value.split('\n').map(name=>name.trim()).filter(Boolean),sourceUrl:$('publication-source').value,sourceNote:$('publication-source-note').value,focus:$('project-focus').checked,notes:$('project-notes').value,events:readEvents()},{today});
    if (!checked.valid) {$('project-error').textContent=checked.errors.join(' ');return;}
    const projects = currentProjects(), index = projects.findIndex(item => item.id===checked.value.id);
    if (index<0 && projects.length>=500) {$('project-error').textContent='This workspace supports up to 500 papers. Export a backup before starting another workspace.';return;}
    if (index<0) projects.push(checked.value); else projects[index]=checked.value;
    closeDialog('project-dialog');
    const saved = demo || save();render();
    notify(demo ? 'Example updated for this preview. Your workspace is unchanged.' : saved ? 'Paper saved on this device.' : 'Paper is in memory only. Export a backup to keep it.');
  });
  $('delete-project').addEventListener('click', () => {
    if (demo) {demoProjects=demoProjects.filter(project => project.id!==editing.id);render();notify('Example paper removed for this preview.');}
    else mutateWorkspace({...workspace,projects:workspace.projects.filter(project => project.id!==editing.id)},'Paper deleted. Restore it from Data & backup if needed.');
    closeDialog('project-dialog');
  });
  function setDemo(value) {demo=value;filter='all';roleFilter='all';$('search').value='';$('date-range').value='auto';$('custom-range').hidden=true;document.querySelector('[data-role="all"]').click();document.querySelector('[data-filter="all"]').click();render();}
  $('demo-button').addEventListener('click', () => setDemo(true));
  $('footer-demo').addEventListener('click', () => setDemo(true));
  $('exit-demo').addEventListener('click', () => setDemo(false));
  $('search').addEventListener('input', () => renderTimeline(currentProjects().map(project => ({project,summary:M.summarize(project,today)}))));
  $('publication-search').addEventListener('input',renderPublications);
  $('publication-role').addEventListener('change',renderPublications);
  $('detail-copy-citation').addEventListener('click',()=>copyCitation(viewingPublication));
  $('detail-edit-paper').addEventListener('click',()=>{closeDialog('publication-dialog');openEditor(viewingPublication,true);});
  $('date-range').addEventListener('change',()=>{$('custom-range').hidden=$('date-range').value!=='custom';render();});
  function setCustomWindow(startDay,endDay){
    customWindow={start:M.dayToDate(startDay),end:M.dayToDate(endDay),startDay,endDay,days:endDay-startDay};
    $('date-range').value='custom';$('custom-range').hidden=false;$('range-error').textContent='';render();
  }
  $('apply-range').addEventListener('click',()=>{
    const start=M.dateToDay($('range-start').value),end=M.dateToDay($('range-end').value);
    if(!Number.isFinite(start)||!Number.isFinite(end)||start>=end||end>M.dateToDay(today)){$('range-error').textContent='Choose a start before the end date; the end must be today or earlier.';return;}
    setCustomWindow(start,end);
  });
  function moveWindow(direction){
    if(!latestBounds)return;
    const span=latestBounds.days,now=M.dateToDay(today),end=Math.min(now,latestBounds.endDay+direction*span);
    const start=end-span;
    if(start<M.dateToDay('1000-01-01'))return;
    setCustomWindow(start,end);
  }
  $('period-prev').addEventListener('click',()=>moveWindow(-1));
  $('period-next').addEventListener('click',()=>moveWindow(1));
  $('export-button').addEventListener('click',exportWorkspace);
  $('data-export').addEventListener('click',exportWorkspace);
  $('data-button').addEventListener('click', () => {$('data-error').textContent='';showDialog('data-dialog');});
  $('restore-seed').addEventListener('click', () => {
    const checked=M.validateBackup(window.PAPER_TRACKER_SEED,{today});
    if (!checked.valid) {$('data-error').textContent=checked.errors.join(' ');return;}
    mutateWorkspace(checked.value,'Project file data loaded. Previous data is available through Restore.');
  });
  $('import-file').addEventListener('change',async () => {
    imported=null;$('import-actions').hidden=true;$('backup-preview').replaceChildren();$('data-error').textContent='';
    const file=$('import-file').files[0];if(!file)return;
    if(file.size>15000000){$('data-error').textContent='Choose a JSON backup smaller than 15 MB.';return;}
    try {
      const checked=M.validateBackup(await file.text(),{today});
      if(!checked.valid){$('data-error').textContent=checked.errors.slice(0,8).join(' ');return;}
      imported=checked.value;
      $('backup-preview').innerHTML=`<p><strong>${imported.projects.length} papers · ${imported.projects.reduce((n,p)=>n+p.events.length,0)} milestones</strong></p>${imported.projects.map(project=>`<div class="preview-row"><strong>${escape(project.title)}</strong><span>${project.events.length} milestones</span></div>`).join('')}<p class="form-hint">Merge replaces papers with matching IDs and keeps other papers. Replace uses only this file.</p>`;
      $('import-actions').hidden=false;
    } catch (_) {$('data-error').textContent='This file could not be read. Please choose a JSON backup again.';}
  });
  $('merge-backup').addEventListener('click', () => {
    if(!imported)return;
    const papers=new Map(workspace.projects.map(project=>[project.id,project]));
    imported.projects.forEach(project=>papers.set(project.id,project));
    const checked=M.validateBackup({version:1,projects:[...papers.values()]},{today});
    if(!checked.valid){$('data-error').textContent=checked.errors.join(' ');return;}
    mutateWorkspace(checked.value,'Backup merged. Previous data is available through Restore.');
    $('import-actions').hidden=true;
  });
  $('replace-backup').addEventListener('click', () => {if(imported){mutateWorkspace(imported,'Workspace replaced. Previous data is available through Restore.');$('import-actions').hidden=true;}});
  $('undo-workspace').addEventListener('click', () => {
    let previous=priorMemory;
    try {if(!previous){const checked=M.validateBackup(localStorage.getItem(PREVIOUS));if(checked.valid)previous=checked.value;}}catch(_){}
    if(!previous){$('data-error').textContent='No previous workspace is available yet.';return;}
    mutateWorkspace(previous,'Previous workspace restored.');
  });
  window.addEventListener('storage', event => {
    if(event.key!==KEY || !event.newValue)return;
    const checked=M.validateBackup(event.newValue);
    if(checked.valid){workspace=checked.value;render();notify('Workspace updated in another tab. An open editor still contains its previous values.');}
  });
  setInterval(() => {const next=M.today();if(next!==today){today=next;render();}},60000);
  syncProjectFile();
  render();
  if(!storageWorks)notify('Browser storage is unavailable. Export a backup to keep changes.');
  if(recovery){
    const button=document.createElement('button');button.type='button';button.className='button secondary';button.textContent='Download unreadable saved data';button.addEventListener('click',()=>exportJSON(recovery,'paper-progress-recovery.json'));$('data-dialog').querySelector('.data-actions').append(button);
    if (unreadableCurrent) notify('Saved data needs attention. The original is available under Data & backup; project file data is shown for now.');
  }
})();
