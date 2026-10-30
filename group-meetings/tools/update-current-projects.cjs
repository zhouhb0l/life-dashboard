// Rebuild the local dataset from reviewed project evidence; never edits research folders.
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const folder=path.join(root,'assets','project-tracker');
const M=require(path.join(folder,'model.js'));
const context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(folder,'seed-data.js'),'utf8'),context);
const sources=['current-projects-contact-tan.json','current-projects-susceptibility-lmt.json','current-projects-wte2-proton.json','current-projects-book-sliding.json'];
const projects=new Map(context.window.PAPER_TRACKER_SEED.projects.map(project=>[project.id,project]));
const editorial=JSON.parse(fs.readFileSync(path.join(folder,'current-projects-editorial-updates.json'),'utf8'));
const editorialById=new Map(editorial.updates.map(project=>[project.id,project]));
const originalProjects=sources.flatMap(filename=>JSON.parse(fs.readFileSync(path.join(folder,filename),'utf8')).projects);
const eventCorrections=editorial.eventCorrections.map(correction=>{
 const event=originalProjects.find(project=>project.id===correction.projectId)?.events?.find(item=>item.id===correction.id);
 if(!event)throw Error('Original imported event not found for correction: '+correction.id);
 return {...correction,expectedNote:(event.note||'').trim(),expectedJournal:(event.journal||'').trim()};
});
const updates=originalProjects.map(project=>{
 const correction=editorialById.get(project.id);
 return correction?{...project,...correction,records:[...(project.records||[]),...(correction.records||[])]}:project;
});
const labels={'recessed-contact':'Accepted','tan-thermal':'Accepted','phonon-susceptibility':'Response submitted','non-gaussian-bounds':'Under review','wte2-moire':'Manuscript in revision','proton-transfer':'Manuscript in revision','negf-method-book':'In writing','interlayer-sliding-graphene-hbn':'Submitted · journal process'};
const tasks={
 'recessed-contact':'Accepted 15 October; publishing and rights completed 26 October. Check proofs and record proofreading completion and publication when confirmed.',
 'tan-thermal':'Accepted on 29 October 2026. Check the co-author production handoff and proofs.',
 'phonon-susceptibility':'Reviewer response submitted; await the National Science Review decision.',
 'non-gaussian-bounds':'Under review at Physical Review B after the 25 September transfer from Physical Review Letters.',
 'wte2-moire':'Revise the Bloch-character and thermal-transport manuscript with the co-authors.',
 'proton-transfer':'Complete internal manuscript revision, theoretical checks, and figure consistency.'
};
const kindLabels={dated_cover_letter_artifact:'Submission cover letter dated',dated_revision_cover_letter_artifact:'Revision cover letter dated',explicit_revision_work_log:'Revision work documented',coauthor_approval_email:'Co-author submission approval',dated_draft_artifact:'Manuscript draft dated',quality_check_artifact:'Manuscript quality check',git_import_artifact:'Repository work recorded'};
for(const source of updates){
 const previous=projects.get(source.id)||{};
 const records=[...(source.records||[])];
 const add=(date,label,sourcePath,note)=>{
  if(!Number.isFinite(M.dateToDay(date)))return;
  if(records.some(record=>record.date===date&&record.source===sourcePath))return;
  records.push({id:`${source.id}-record-${date}-${records.length+1}`,date,label:label.slice(0,200),source:sourcePath||'',note:note||''});
 };
 for(const artifact of source.draftArtifacts||[])add(artifact.date,artifact.label,artifact.path,artifact.note);
 for(const proxy of source.milestoneProxies||[])add(proxy.date,proxy.basis==='dated manuscript artifact'?'Dated manuscript draft':'Manuscript revision documented',proxy.source,proxy.note);
 for(const evidence of source.evidence||[]){
  if(!evidence.date||evidence.kind==='user_status')continue;
  const file=(evidence.source||evidence.path||'').split(/[\\/]/).at(-1);
  const label=kindLabels[evidence.kind] || (file?`Work record · ${file}`:'Dated work evidence');
  add(evidence.date,label,evidence.source||evidence.path,[evidence.finding||evidence.supports||evidence.summary||'',evidence.limitation||'',evidence.excerpt||''].filter(Boolean).join(' '));
 }
 const sourceNotes=[source.sourceNote,source.authorshipNote,source.journalNote,...(source.uncertainties||[])].filter(Boolean).join('\n');
 const merged={...previous,...source,records:M.sortEvents(records),projectKind:source.projectKind||'paper',publicationYear:null,statusLabel:source.statusLabel||labels[source.id]||'',sourceNote:sourceNotes,notes:tasks[source.id]||source.notes||previous.notes||'',focus:false};
 // A dated PRL cover letter does not verify the receiving journal; the older board says PRB.
 if(source.id==='non-gaussian-bounds'&&!source.journalConfirmed){
  merged.journal='';
  merged.sourceNote+='\nThe 9 September cover letter targets Physical Review Letters; the older meeting board mentions Physical Review B. The current receiving journal is not confirmed without a submission receipt.';
 }
 const checked=M.validateProject(merged);
 if(!checked.valid)throw Error(`${source.id}: ${checked.errors.join('; ')}`);
 projects.set(source.id,checked.value);
}
const backup=M.validateBackup({version:1,projects:M.sortProjects([...projects.values()])});
if(!backup.valid)throw Error(backup.errors.join('; '));
const output=backup.value;
const updateIds=updates.map(project=>project.id);
fs.writeFileSync(path.join(folder,'seed-data.js'),'/* Published references and current project evidence. See publications-source.json and current-projects-*.json.\n   A new source revision merges current statuses and records while retaining browser edits and milestone history. */\nwindow.PAPER_TRACKER_SEED_REVISION = "recessed-history-2026-10-30-v5";\nwindow.PAPER_TRACKER_CURRENT_UPDATE_IDS = '+JSON.stringify(updateIds)+';\nwindow.PAPER_TRACKER_EVENT_CORRECTIONS = '+JSON.stringify(eventCorrections)+';\nwindow.PAPER_TRACKER_SEED = '+JSON.stringify(output,null,2)+';\n');
fs.writeFileSync(path.join(folder,'paper-progress-library.json'),JSON.stringify(output,null,2)+'\n');
fs.writeFileSync(path.join(folder,'current-projects.json'),JSON.stringify({version:1,verifiedOn:'2026-10-30',projects:output.projects.filter(project=>updateIds.includes(project.id))},null,2)+'\n');
console.log(JSON.stringify({projects:output.projects.length,published:output.projects.filter(project=>M.summarize(project).complete).length,current:updateIds.length,milestones:output.projects.reduce((n,project)=>n+project.events.length,0),workRecords:output.projects.reduce((n,project)=>n+project.records.length,0)}));
for(const project of output.projects.filter(project=>updateIds.includes(project.id))){const summary=M.summarize(project);console.log(`${project.shortName}: ${summary.stage}; ${project.authorship}; ${project.events.length} milestones; ${project.records.length} documents; stage days ${summary.elapsedDays===null?'unknown':summary.elapsedDays}`);}
