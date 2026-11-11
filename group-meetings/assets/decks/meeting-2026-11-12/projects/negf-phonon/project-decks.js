/* Six independent presentation tracks in the 12 November project snapshot. */
window.NEGF_PROJECT = Object.freeze({
  meeting: '12 November 2026',
  meetingPage: '../../../../../meeting-2026-11-12.html',
  decks: [
    { id:'software', number:1, group:'development', title:'Theory and software development', description:'Harmonic NEGF, SCBA theory and inputs / outputs, and long-region techniques.', purpose:'Software presentation', status:'Theory and capabilities', src:'decks/deck-1-software.html', slideCount:13, updated:'12 Nov 2026' },
    { id:'silicon', number:2, group:'development', title:'Silicon results', description:'Converged silicon, microscopic benchmarks and the path to long scattering regions.', purpose:'Thursday’s presentation', status:'Meeting ready', src:'roadmap/index.html', slideCount:14, updated:'12 Nov 2026', frozen:true },
    { id:'materials', number:3, group:'development', title:'Other material calculations', description:'MoS₂, graphene and diamond: calculation results, comparisons and remaining work.', purpose:'Calculation progress', status:'Working draft', src:'decks/deck-3-materials.html', slideCount:7, updated:'12 Nov 2026' },
    { id:'q1', number:4, group:'papers', title:'Q1 · Microscopic information and heat flow', description:'Which microscopic correlations must a thermal description retain?', purpose:'Standalone paper study', status:'Working draft', src:'decks/deck-4-q1.html', slideCount:17, updated:'12 Nov 2026' },
    { id:'q2', number:5, group:'papers', title:'Q2 · The spatial approach to Fourier transport', description:'How does finite-length transport approach the local, long-length limit?', purpose:'Standalone paper study', status:'Working draft', src:'decks/deck-5-q2.html', slideCount:17, updated:'12 Nov 2026' },
    { id:'q3', number:6, group:'papers', title:'Q3 · Time dependence and memory', description:'When do transient heat-flow predictions need information beyond static coefficients?', purpose:'Standalone paper study', status:'Working draft', src:'decks/deck-6-q3.html', slideCount:18, updated:'12 Nov 2026' }
  ],
  archive: { id:'archive', title:'28 October presentation', src:'roadmap/background-2026-10-28.html', slideCount:12, date:'28 Oct 2026' }
});
