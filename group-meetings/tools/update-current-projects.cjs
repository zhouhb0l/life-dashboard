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
const publicationSource=JSON.parse(fs.readFileSync(path.join(folder,'publications-source.json'),'utf8'));
const scholarProfile=JSON.parse(fs.readFileSync(path.join(folder,'scholar-profile-2026-10-30.json'),'utf8'));
const scholarJournal=JSON.parse(fs.readFileSync(path.join(folder,'scholar-additions-journal.json'),'utf8'));
const scholarRelated=JSON.parse(fs.readFileSync(path.join(folder,'scholar-additions-related.json'),'utf8'));
const doiKey=value=>String(value||'').trim().replace(/^https?:\/\/(?:dx\.)?doi\.org\//i,'').toLowerCase();
for(const source of [...publicationSource.publications,...scholarJournal.projects,...scholarRelated.projects]){
 const previous=[...projects.values()].find(project=>doiKey(project.doi)===doiKey(source.doi))||projects.get(source.id)||{};
 const merged={...previous,...source,id:previous.id||source.id,shortName:previous.shortName||source.shortName||'',
  focus:previous.focus===true,notes:previous.notes||source.notes||'',publicationType:source.publicationType||'journal_article',
  events:previous.events?.length?previous.events:(source.events||[]),relatedPublications:previous.relatedPublications||[]};
 const checked=M.validateProject(merged);
 if(!checked.valid)throw Error(`Publication ${source.doi}: ${checked.errors.join('; ')}`);
 projects.set(checked.value.id,checked.value);
}
const publicationFor=doi=>[...projects.values()].find(project=>doiKey(project.doi)===doiKey(doi));
const attach=(parentDoi,related)=>{
 const parent=publicationFor(parentDoi);if(!parent)throw Error('Missing related-publication parent: '+parentDoi);
 const entries=parent.relatedPublications||[];
 const key=related.doi?doiKey(related.doi):related.publicationUrl||related.sourceUrl;
 const exists=entries.some(item=>(item.doi?doiKey(item.doi):item.publicationUrl||item.sourceUrl)===key);
 const checked=M.validateProject({...parent,relatedPublications:exists?entries:[...entries,related]});
 if(!checked.valid)throw Error('Related publication: '+checked.errors.join('; '));
 projects.set(parent.id,checked.value);
};
for(const related of scholarRelated.relatedPublications)attach(related.relatedDoi,{...related,
 relation:related.publicationType==='author_correction'?'correction':'cover',publishedOn:related.publicationDate||''});
const preprint=scholarRelated.preprintRelationships[0];
attach(preprint.candidatePublishedRecord.doi,{...preprint.preprint,relation:'preprint',publicationYear:2022,journal:'arXiv',
 publicationUrl:preprint.preprint.sourceUrl,publisher:'arXiv',publishedOn:preprint.preprint.date,
 sourceNote:'Possible earlier version of this paper; the formal relationship is not verified. '+preprint.evidence});
const inse=publicationFor('10.1039/c7nr07779c');
attach(inse.doi,{relation:'supplement',title:'Supporting information of “Unusual phonon behavior and ultra-low thermal conductance of monolayer InSe”',
 authors:inse.authors,publicationYear:inse.publicationYear,journal:inse.journal,publisher:inse.publisher,
 publicationUrl:inse.publicationUrl||inse.sourceUrl,sourceUrl:inse.publicationUrl||inse.sourceUrl,
 sourceNote:'Supplementary material belonging to the original InSe article. Access it through the publisher article page; it is not another independent research paper and no separate DOI or publication day is asserted.'});
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
const auditMatches={1:'10.1021/acs.nanolett.6c03959',2:'10.1021/acs.jpcc.4c06240',3:'10.1039/d5nr02232k',4:'10.1039/d4cp03686g',5:'10.1007/s40820-024-01335-2',6:'10.1021/acsami.4c02294',7:'10.1002/aelm.202201252',8:'10.1557/s43577-022-00456-6',9:'10.1038/s41598-022-22913-7',10:'10.1103/PhysRevB.106.195435',11:'10.1038/s41598-022-22913-7',12:'10.1080/10408436.2021.1935212',13:'10.1103/PhysRevB.106.195435',15:'10.1039/d2nr01131j',16:'10.1016/j.mtphys.2021.100346',17:'10.1021/acs.nanolett.0c03135',18:'10.1103/PhysRevB.101.235305',19:'10.1088/1361-6528/ab8ee1',20:'10.1088/1361-6528/ab824c',21:'10.1039/d0cp02894k',22:'10.1039/d0ra04737f',24:'10.1002/pssb.201900122',25:'10.1021/acsomega.9b00534',26:'10.1038/s41524-019-0183-2',27:'10.1063/1.5054323',28:'10.1002/adfm.201801685',29:'10.1002/adfm.201801685',30:'10.1088/1674-1056/27/3/034401',31:'10.1088/1674-1056/27/3/034401',32:'10.1039/c7nr07779c',33:'10.1038/s41699-017-0018-2',34:'10.1016/B978-0-32-346240-2.00001-7',35:'10.1016/B978-0-32-346240-2.00001-7',36:'10.1021/acs.chemmater.6b03539',37:'10.1103/PhysRevE.94.052123',38:'10.1557/jmr.2016.333',39:'10.1103/PhysRevB.94.045423',41:'10.1063/1.4917017',42:'10.1103/PhysRevB.91.045410',43:'10.1038/srep14870',44:'10.1063/1.4901274',45:'10.1039/c7nr07779c'};
const decisions={
 9:['related','Author Correction, Scientific Reports 12, 21086, DOI 10.1038/s41598-022-25621-4. Linked to the original article (entry 11); not a second research project.',['https://www.nature.com/articles/s41598-022-25621-4']],
 11:['added','Missing original journal article added with its complete publisher reference.'],
 12:['added','Missing review added. Citation/issue year 2022 is distinct from first-online date 7 June 2021.'],
 13:['preprint','Preprint retained as a possible earlier version of the existing PRB paper. Identical author order and related content suggest a match, but neither arXiv nor Crossref formally links them. Not counted as another published paper.',['https://arxiv.org/abs/2202.11037']],
 14:['misattributed','The cited pages 9278–9285 identify a silver-nanoprism paper by Kosuke Sugawa and colleagues, DOI 10.1039/D2NR01725C; Hangbo Zhou is not an author. “rsc.li/nanoscale” is journal boilerplate, not a paper title. Existing Nanoscale review pages 9209–9217 remain correct.',['https://pubs.rsc.org/en/content/articlepdf/2022/nr/d2nr01725c']],
 16:['added','Missing journal article added. March 2021 issue is verified; exact first-online day remains unknown.'],
 23:['misattributed','Conflicting record: the Auxeticity title belongs to DOI 10.1002/pssb.201800122, volume 256(1), 1800122, by Duc Tam Ho, Cao Thang Nguyen, Soon-Yong Kwon, and Sung Youb Kim. Hangbo Zhou is not an author. The supplied volume/article number and coauthors instead belong to the hydrogenated boron-nanotube paper (entry 24), which is already included.',['https://onlinelibrary.wiley.com/doi/full/10.1002/pssb.201800122','https://onlinelibrary.wiley.com/doi/10.1002/pssb.201900122']],
 28:['related','Distinct DOI 10.1002/adfm.201870213 is a Cover Picture for the existing research article 1801685 (entry 29). Full cover citation linked to that paper; not another study.',['https://advanced.onlinelibrary.wiley.com/doi/abs/10.1002/adfm.201870213']],
 30:['duplicate','Duplicate of entry 31: same title, journal, volume and article 034401. Abbreviated journal and reversed/transliterated author forms do not create another paper.'],
 32:['already_present','Already included. First online publication was 29 November 2017; the journal issue/citation year is 2018. Both are retained.'],
 34:['book_container','This is the complete volume edited by Gang Zhang, not a separate Hangbo Zhou authored book. The authored chapter (entry 35) is included.',['https://www.sciencedirect.com/book/edited-volume/9780323462402/thermal-transport-in-carbon-based-nanomaterials']],
 35:['added','Missing authored book chapter added: Hangbo Zhou and Gang Zhang, pages 1–18. Publisher-registered DOI is 10.1016/B978-0-32-346240-2.00001-7; only the year 2017 is verified.'],
 40:['thesis','Thesis/dissertation entry, retained in this audit and excluded from the journal-paper/chapter count. Earlier local thesis PDFs were also excluded from that count.'],
 45:['supplement','Supporting information for the original InSe article (entry 32). Linked through its publisher article page; not an independent paper.']
};
const rows=scholarProfile.entries.map(entry=>{
 const parent=auditMatches[entry.number]?publicationFor(auditMatches[entry.number]):null;
 const [status,decision,verificationUrls]=decisions[entry.number]||['already_present','Already present with a matching title and publisher DOI.'];
 if(!decisions[entry.number]&&!parent)throw Error('Unmapped Scholar entry '+entry.number);
 return {...entry,status,decision,projectId:parent?.id||'',targetDoi:parent?.doi||'',verificationUrls:verificationUrls||[parent?.publicationUrl||parent?.sourceUrl].filter(Boolean)};
});
if(rows.length!==45||new Set(rows.map(row=>row.number)).size!==45||rows.some((row,index)=>row.number!==index+1))throw Error('Every one of the 45 Scholar entries must be reconciled exactly once.');
const published=output.projects.filter(project=>M.summarize(project).complete);
const doiSeen=new Set();for(const project of output.projects){if(!project.doi)continue;const key=doiKey(project.doi);if(doiSeen.has(key))throw Error('Duplicate project DOI '+project.doi);doiSeen.add(key);}
const audit={version:1,verifiedOn:'2026-10-30',source:scholarProfile.source,profile:scholarProfile.profile,
 summary:{scholarEntries:rows.length,alreadyPresent:rows.filter(row=>row.status==='already_present').length,added:rows.filter(row=>row.status==='added').length,publishedWorks:published.length,journalArticles:published.filter(project=>project.publicationType!=='book_chapter').length,bookChapters:published.filter(project=>project.publicationType==='book_chapter').length,companionPublications:rows.filter(row=>row.status==='related').length},entries:rows};
fs.writeFileSync(path.join(folder,'scholar-audit-2026-10-30.json'),JSON.stringify(audit,null,2)+'\n');
fs.writeFileSync(path.join(folder,'seed-data.js'),'/* Published references, reviewed project evidence, and the 45-entry Scholar reconciliation.\n   Source updates retain browser edits and milestone history. */\nwindow.PAPER_TRACKER_SEED_REVISION = "scholar-audit-2026-10-30-v6";\nwindow.PAPER_TRACKER_CURRENT_SOURCE_REVISION = "recessed-history-2026-10-30-v5";\nwindow.PAPER_TRACKER_CURRENT_UPDATE_IDS = '+JSON.stringify(updateIds)+';\nwindow.PAPER_TRACKER_EVENT_CORRECTIONS = '+JSON.stringify(eventCorrections)+';\nwindow.PAPER_TRACKER_SCHOLAR_AUDIT = '+JSON.stringify(audit,null,2)+';\nwindow.PAPER_TRACKER_SEED = '+JSON.stringify(output,null,2)+';\n');
fs.writeFileSync(path.join(folder,'paper-progress-library.json'),JSON.stringify(output,null,2)+'\n');
fs.writeFileSync(path.join(folder,'current-projects.json'),JSON.stringify({version:1,verifiedOn:'2026-10-30',projects:output.projects.filter(project=>updateIds.includes(project.id))},null,2)+'\n');
console.log(JSON.stringify({projects:output.projects.length,published:output.projects.filter(project=>M.summarize(project).complete).length,current:updateIds.length,milestones:output.projects.reduce((n,project)=>n+project.events.length,0),workRecords:output.projects.reduce((n,project)=>n+project.records.length,0)}));
for(const project of output.projects.filter(project=>updateIds.includes(project.id))){const summary=M.summarize(project);console.log(`${project.shortName}: ${summary.stage}; ${project.authorship}; ${project.events.length} milestones; ${project.records.length} documents; stage days ${summary.elapsedDays===null?'unknown':summary.elapsedDays}`);}
