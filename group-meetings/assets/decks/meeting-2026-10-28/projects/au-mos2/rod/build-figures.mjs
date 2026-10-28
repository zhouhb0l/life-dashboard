import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.dirname(fileURLToPath(import.meta.url));
const read=async p=>JSON.parse(await fs.readFile(path.join(root,p),'utf8'));
const save=(p,s)=>fs.writeFile(path.join(root,'figures',p),s);
const summaries={10:await read('source/analysis/10-analysis_summary.json'),15:await read('source/analysis/15-analysis_summary.json')};
const ink='#182636',muted='#5b6773',F='#1864ab',R='#c2472d',rule='#d7dce1';
const text=(x,y,s,size=21,extra='')=>`<text x="${x}" y="${y}" font-size="${size}" ${extra}>${s}</text>`;
const svg=(w,h,body,title)=>`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img"><title>${title}</title><g font-family="Arial,Helvetica,sans-serif" fill="${ink}">${body}</g></svg>`;

// All four baselines use onset of the averaged far-core PDOS. Whiskers are
// primary extraction-setting extrema, not standard deviations or confidence intervals.
const cases=[['F10',10,'F'],['R10',10,'R'],['F15',15,'F'],['R15',15,'R']].map(([label,n,k])=>({label,n,k,value:summaries[n].baseline[k].phi_n_eV,range:summaries[n].cases[k].primary_sensitivity.phi_n_eV}));
let b='';const y=v=>294-v/0.24*244;
for(const t of [0,.05,.10,.15,.20])b+=`<line x1="110" x2="1390" y1="${y(t)}" y2="${y(t)}" stroke="${rule}"/>`+text(94,y(t)+7,t.toFixed(2),21,'text-anchor="end"');
b+=text(26,172,'Electron SBH (eV)',23,'text-anchor="middle" transform="rotate(-90 26 172)"');
b+=text(1390,23,'Whiskers: extraction sensitivity',21,`text-anchor="end" fill="${muted}"`);
for(const [i,c]of cases.entries()){
 const x=180+i*360,color=c.k==='F'?F:R;
 b+=`<rect x="${x-58}" y="${y(c.value)}" width="116" height="${294-y(c.value)}" fill="${color}" fill-opacity=".88"/>`;
 b+=`<path d="M${x} ${y(c.range.min)}V${y(c.range.max)}M${x-15} ${y(c.range.min)}H${x+15}M${x-15} ${y(c.range.max)}H${x+15}" fill="none" stroke="${ink}" stroke-width="2.5"/>`;
 b+=text(x,y(c.range.max)-14,c.value.toFixed(3),30,'text-anchor="middle" font-weight="700"');
 b+=text(x,327,c.label,24,`text-anchor="middle" font-weight="700" fill="${color}"`);
}
b+=`<line x1="720" x2="720" y1="44" y2="294" stroke="${rule}" stroke-dasharray="5 7"/>`;
await save('electron-sbh-summary.svg',svg(1440,346,b,'Four electron Schottky barriers and extraction-sensitivity ranges'));

for(const n of [10,15]){
 const a=summaries[n],raw=await read(`source/analysis/${n}-slide_data.json`);
 // Native 5-meV data are plotted without smoothing. A zero breaks the log path.
 const x0=100,x1=790,y0=38,y1=260,x=e=>x0+(e+.05)/.4*(x1-x0),yp=v=>y1-(Math.log10(v)+6)/(Math.log10(2)+6)*(y1-y0);
 let p='';
 for(const v of [1e-6,1e-4,1e-2,1])p+=`<line x1="${x0}" x2="${x1}" y1="${yp(v)}" y2="${yp(v)}" stroke="${rule}"/>`+text(x0-12,yp(v)+6,v===1?'1':`10<tspan baseline-shift="super" font-size="13">${Math.log10(v)}</tspan>`,19,'text-anchor="end"');
 for(const e of [0,.1,.2,.3])p+=text(x(e),290,e.toFixed(1),19,'text-anchor="middle"');
 p+=`<path d="M${x0} ${y0}V${y1}H${x1}" fill="none" stroke="${ink}" stroke-width="1.6"/><line x1="${x(0)}" x2="${x(0)}" y1="${y0}" y2="${y1}" stroke="${muted}" stroke-dasharray="5 5"/>`;
 p+=text(x(0)-10,29,'Eꜰ = 0',18,`fill="${muted}" text-anchor="end"`);
 p+=text(445,321,'E − Eꜰ (eV)',23,'text-anchor="middle"');
 p+=text(24,150,'MoS₂ PDOS',22,'text-anchor="middle" transform="rotate(-90 24 150)"');
 p+=text(46,150,'(states / eV / f.u.)',15,'text-anchor="middle" transform="rotate(-90 46 150)"');
 p+=`<defs><clipPath id="pdos-window"><rect x="${x0}" y="${y0}" width="${x1-x0}" height="${y1-y0}"/></clipPath></defs>`;
 for(const k of ['F','R']){
  const color=k==='F'?F:R;let d='',open=false;
  for(let i=0;i<raw.energy_eV.length;i++){
   const e=raw.energy_eV[i],v=raw.raw_far_core_PDOS_states_per_eV_per_fu[k][i];
   if(e<-.0500001||e>.3500001||!(v>0)){open=false;continue;}
   d+=`${open?'L':'M'}${x(e).toFixed(4)} ${yp(v).toFixed(4)} `;open=true;
  }
  p+=`<path d="${d}" fill="none" stroke="${color}" stroke-width="3" clip-path="url(#pdos-window)"/>`;
  const onset=a.baseline[k].phi_n_eV;
  p+=`<line x1="${x(onset)}" x2="${x(onset)}" y1="${y0}" y2="${y1}" stroke="${color}" stroke-width="1.4" stroke-dasharray="5 5"/>`;
  p+=text(x(onset)+(k==='F'?8:-8),28,`${k}${n}: ${onset.toFixed(3)} eV`,19,`text-anchor="${k==='F'?'start':'end'}" fill="${color}" font-weight="700"`);
 }
 await save(`${n}-pdos-electron.svg`,svg(820,340,p,`F${n} and R${n} native electron-side MoS2 PDOS versus energy relative to Fermi level`));

 const diff=a.primary_matched_electron_barrier_difference,lo=-diff.max_eV*1000,hi=-diff.min_eV*1000,base=-diff.R_minus_F_baseline_eV*1000;
 const xs=v=>70+v/80*460;let q='';
 q+=text(310,46,`${base.toFixed(1)} meV lower in R${n}`,31,`text-anchor="middle" font-weight="700" fill="${R}"`);
 q+=`<line x1="70" x2="70" y1="83" y2="232" stroke="${muted}" stroke-dasharray="5 6"/>`;
 q+=text(79,99,'No difference',16,`fill="${muted}"`);
 q+=`<line x1="${xs(lo)}" x2="${xs(hi)}" y1="154" y2="154" stroke="${R}" stroke-opacity=".3" stroke-width="18"/><path d="M${xs(lo)} 137V171M${xs(hi)} 137V171" stroke="${R}" stroke-width="3"/><circle cx="${xs(base)}" cy="154" r="9" fill="${R}" stroke="white" stroke-width="2"/>`;
 q+=text(xs((lo+hi)/2),202,`${lo.toFixed(1)}–${hi.toFixed(1)} meV`,22,'text-anchor="middle"');
 q+=`<line x1="70" x2="530" y1="232" y2="232" stroke="${ink}"/>`;
 for(const v of [0,20,40,60,80])q+=`<line x1="${xs(v)}" x2="${xs(v)}" y1="232" y2="239" stroke="${ink}"/>`+text(xs(v),261,String(v),18,'text-anchor="middle"');
 q+=text(300,294,'Electron-SBH reduction: F − R (meV)',21,'text-anchor="middle"');
 q+=text(300,329,'Range: extraction sensitivity · dot: reference',17,`text-anchor="middle" fill="${muted}"`);
 await save(`${n}-sensitivity-range.svg`,svg(600,340,q,`F${n} minus R${n} electron barrier stays positive over all 81 primary extraction settings`));
}

function group(s,id){const start=s.indexOf(`<g id="${id}"`);if(start<0)throw Error(id);const re=/<g\b[^>]*>|<\/g>/g;re.lastIndex=start;let depth=0,m;while((m=re.exec(s))){depth+=m[0].startsWith('</')?-1:(/\/>$/.test(m[0])?0:1);if(depth===0)return s.slice(start,re.lastIndex);}throw Error(`unbalanced ${id}`);}
function stripText(s){for(const id of [...s.matchAll(/<g id="(text_\d+)"/g)].map(m=>m[1]))s=s.replace(group(s,id),'');return s;}
for(const n of [10,15]){
 const source=await fs.readFile(path.join(root,'figures',`${n}-contour.svg`),'utf8');
 const defs=[...source.matchAll(/<defs>[\s\S]*?<\/defs>/g)].map(m=>m[0]).join('');
 const nativeY=44.952,nativeH=116.688,s=1.32757,H=nativeH*s;
 let p=defs+`<defs><clipPath id="electron-contour-left"><rect x="80" y="48" width="580.0" height="${H}"/></clipPath><clipPath id="electron-contour-right"><rect x="790" y="48" width="580.0" height="${H}"/></clipPath></defs>`;
 for(const [j,nativeX,destX,k]of [[1,60.911875,80,'F'],[2,550.457535,790,'R']]){
  let a=stripText(group(source,`axes_${j}`));
  for(const id of [...a.matchAll(/<g id="(matplotlib.axis_\d+)"/g)].map(m=>m[1]))a=a.replace(group(a,id),'');
  p+=`<g clip-path="url(#electron-contour-${j===1?'left':'right'})"><g transform="translate(${destX} 48) scale(${s}) translate(${-nativeX} ${-nativeY})">${a}</g></g>`;
  p+=text(destX,29,`${k}${n}`,24,`font-weight="700" fill="${k==='F'?F:R}"`);
  p+=`<rect x="${destX}" y="48" width="580" height="${H}" fill="none" stroke="${muted}" stroke-width=".8"/>`;
  for(const e of [-.2,0,.2,.4,.6]){const yy=48+(.6-e)*137.28*s;p+=text(destX-10,yy+6,e.toFixed(1),17,'text-anchor="end"');}
  for(const x of [0,1,2,3,4]){const xx=destX+x*98.787312*s;p+=text(xx,232,String(x),17,'text-anchor="middle"');}
  p+=text(destX+290,260,'Position across MoS₂ (nm)',20,'text-anchor="middle"');
 }
 p+=text(20,126,'E − Eꜰ (eV)',20,'text-anchor="middle" transform="rotate(-90 20 126)"');
 // Preserve the original color strip and its original tick positions. Only
 // remove text and re-label for readability at the new viewport size.
 const color=group(source,'axes_3'),scaleY=H/308.88;
 p+=`<g transform="translate(1396 48) scale(.8 ${scaleY}) translate(-1013.385475 -38.088)">${stripText(color)}</g>`;
 const ticks=[...color.matchAll(/<use[^>]*x="1032\.479875" y="([^"]+)"/g)].map(m=>Number(m[1]));
 for(const [i,yy]of ticks.entries()){if(i<6)p+=text(1423,48+(yy-38.088)*scaleY+5,`10<tspan baseline-shift="super" font-size="10">${i-5}</tspan>`,14);}
 p+=text(1410,29,'PDOS',15,'text-anchor="middle"');
 await save(`${n}-contour-electron.svg`,svg(1460,278,p,`Original F${n} and R${n} MoS2 spatial PDOS, electron-side viewport from minus 0.25 to plus 0.60 eV`));
}
