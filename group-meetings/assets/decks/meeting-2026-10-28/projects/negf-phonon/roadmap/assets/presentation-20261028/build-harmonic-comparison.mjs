import fs from 'node:fs/promises';
const root=new URL('./',import.meta.url);
const data=JSON.parse(await fs.readFile(new URL('harmonic-comparison-20261028.json',root),'utf8'));
const sampled=JSON.parse(await fs.readFile(new URL('../converged-20261028/updates/2ef67f5292b7/data/converged-results.json',root),'utf8'));
const q14=sampled.records.find(r=>r.id==='q14').currents_w.left*1e9;
const blue='#176b87',gray='#637381',orange='#d96b27',ink='#173b57';
const x=n=>160+(n-600)/600*480,y=j=>407-(j-3.85)/.05*307;
const text=(xx,yy,s,size=20,attrs='')=>`<text x="${xx}" y="${yy}" font-size="${size}" ${attrs}>${s}</text>`;
let body=`<rect width="760" height="500" fill="white"/><g font-family="Arial,Helvetica,sans-serif" fill="${ink}">`;
body+=`<rect x="98" y="21" width="11" height="11" fill="white" stroke="${gray}" stroke-width="2.5"/>`+text(122,34,'Harmonic · 3IFC off',21);
body+=`<circle cx="103.5" cy="59" r="5.5" fill="${blue}"/>`+text(122,66,'SCBA · cubic interaction scale g = 0.03',21);
for(const v of [3.85,3.86,3.87,3.88,3.89,3.90])body+=`<line x1="100" x2="715" y1="${y(v)}" y2="${y(v)}" stroke="#dce5eb"/>`+text(86,y(v)+7,v.toFixed(2),20,'text-anchor="end"');
body+=`<path d="M100 100V407H715" fill="none" stroke="${ink}" stroke-width="1.7"/>`;
for(const n of data.harmonic.frequency_intervals)body+=`<line x1="${x(n)}" x2="${x(n)}" y1="407" y2="414" stroke="${ink}"/>`+text(x(n),442,String(n),22,'text-anchor="middle"');
body+=text(408,485,'Frequency intervals (Nω − 1)',23,'text-anchor="middle"');
body+=text(30,255,'Heat current (nW)',24,'text-anchor="middle" transform="rotate(-90 30 255)"');
for(const kind of ['harmonic','scba']){
 const ns=data.harmonic.frequency_intervals;
 const values=kind==='harmonic'?data.harmonic.heat_currents_nW:data.scba.records.map(r=>r.heat_current_nW);
 const color=kind==='harmonic'?gray:blue;
 body+=`<path d="${values.map((v,i)=>(i?'L':'M')+x(ns[i])+' '+y(v)).join(' ')}" fill="none" stroke="${color}" stroke-width="2.8"/>`;
 values.forEach((v,i)=>{
  const xx=x(ns[i]),yy=y(v);
  body+=kind==='harmonic'?`<rect x="${xx-7}" y="${yy-7}" width="14" height="14" fill="none" stroke="${color}" stroke-width="2.4"/>`:`<circle cx="${xx}" cy="${yy}" r="6" fill="${color}"/>`;
  body+=text(xx,yy+(kind==='harmonic'?-20:27),v.toFixed(kind==='harmonic'?data.harmonic.reported_precision_decimal_places:6),20,`text-anchor="middle" fill="${color}" font-weight="700" stroke="white" stroke-width="4" paint-order="stroke"`);
  body+=text(xx,yy+(kind==='harmonic'?-41:49),'q = (4,1)',16,`text-anchor="middle" fill="${color}" stroke="white" stroke-width="3" paint-order="stroke"`);
 });
}
const qx=x(600),qy=y(q14);
body+=`<path d="M${qx} ${qy-8}L${qx+8} ${qy}L${qx} ${qy+8}L${qx-8} ${qy}Z" fill="none" stroke="${orange}" stroke-width="2.6"/><path d="M${qx+4} ${qy+7}L210 375H232" fill="none" stroke="${orange}" stroke-width="1.6"/>`;
body+=text(240,382,'q = (1,4)',19,`fill="${orange}"`);
body+='</g>';
await fs.writeFile(new URL('harmonic-scba-comparison.svg',root),`<svg xmlns="http://www.w3.org/2000/svg" width="760" height="500" viewBox="0 0 760 500" role="img"><title>Confirmed harmonic heat currents and SCBA currents with cubic amplitude scaled by 0.03, at 600, 900 and 1200 frequency intervals; all main samples use q=(4,1), and the q=(1,4) control overlaps the SCBA sample at 600.</title>${body}</svg>`);
