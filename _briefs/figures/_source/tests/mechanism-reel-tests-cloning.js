/* Acceptance tests for the Mechanism Reel, Phase 2 figure 6 of 6: cloning, per §7 of the brief plus T21-T27, T32 and the three new
   tests T33-T35. A copy of mechanism-reel-tests-rtk.js with cloning's own travellers, one beat, two levels, labels and end screen.
   T19 is N/A (no ATP is drawn, D4), T20 N/A (rtk's closing state), T24 N/A (no run-on and no counter, D10), T28-T31 N/A (transport,
   etc and rtk). New T33 (D4): in step 3 each seal's first transition starts at or after the insert's seating transition has ended.
   New T34 (D5): the insert (step 3) and the plasmid copy (step 4) are at opacity >= 0.9 from 150 ms after they set off until they
   arrive, and at the end of step 4 the plasmid's box does not intersect the chromosome's. New T35 (D6): no two colonies start within
   150 ms of each other and each starts at a scale <= 0.3. With cloning built there are no placeholders: T1 and T15 assert that none
   of the six entries is disabled. Programmatic assertions throughout; the only screenshots are T3's (plus one per FAIL).
   T3's comparison: python3 t3-compare-cloning.py after this run (writes the two-up image). */
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const OUT=__dirname;  /* screenshots and results-cloning.json land here */
const BASE='http://127.0.0.1:8765/biology/tools/mechanism-reel.html';
const URL=BASE+'?anim=cloning';
const KEYS=['gpcr','rtk','transport','etc','dogma','cloning'];
const ENABLED={gpcr:true,rtk:true,dogma:true,transport:true,etc:true,cloning:true};   /* all six are built; nothing is a placeholder */
const N=5;
const TITLES=['A receptor that never lets the signal in','Two halves, then several answers at once','Downhill is free. Uphill is paid for.','Electrons buy a gradient. The gradient buys the ATP.','One message, written out and then read aloud','Cut both with one enzyme and the ends fit'];
const BRIDGES=['A different kind of receptor answers in more than one way at once.','Both of those end in things moving across a membrane.','Moving things uphill runs on ATP. Here is where the ATP comes from.','A signal can also reach all the way to the genes.','And here is how we borrow that machinery ourselves.'];
const R={};const NOTE={};const consoleErrs=[];
function res(t,ok,reason){if(R[t]===false)return;R[t]=ok;if(!ok)NOTE[t]=(NOTE[t]?NOTE[t]+' | ':'')+reason;}
function note(t,s){NOTE[t]=(NOTE[t]?NOTE[t]+' | ':'')+s;}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function fresh(br,vp,opts){const ctx=await br.newContext(Object.assign({viewport:vp},opts||{}));const pg=await ctx.newPage();
  pg.on('console',m=>{if(m.type()==='error'){const u=(m.location()||{}).url||'';consoleErrs.push(m.text()+(u?' @ '+u:''));}});pg.on('pageerror',e=>consoleErrs.push('PAGEERROR '+e.message));
  pg.on('requestfailed',q=>{const u=q.url();if(!/fonts\.g(oogleapis|static)\.com/.test(u))consoleErrs.push('REQFAIL '+u);});
  return {ctx,pg};}
async function open(pg,url){await pg.goto(url||URL,{waitUntil:'load'});await pg.waitForFunction(()=>window.__MR&&window.__MR.fig());}
async function settle(pg){await pg.waitForFunction(()=>!__MR.busy(),null,{timeout:12000});}
async function go(pg,i){await pg.evaluate(i=>__MR.goStep(i),i);await settle(pg);}
async function shot(pg,name){try{await pg.screenshot({path:`${OUT}/${name}.png`});}catch(e){}}
async function walkT2(pg,tag){let ok=true,why='';
  for(let i=0;i<=N;i++){await go(pg,i);const s=await pg.evaluate(()=>__MR.step());if(s!==i){ok=false;why=`forward goStep(${i}) gave ${s}`;break;}}
  if(ok)for(let i=N;i>=0;i--){await go(pg,i);const s=await pg.evaluate(()=>__MR.step());if(s!==i){ok=false;why=`backward goStep(${i}) gave ${s}`;break;}}
  if(ok)for(let i=1;i<=N;i++){await pg.click(`#dots button:nth-child(${i})`);await settle(pg);const s=await pg.evaluate(()=>__MR.step());if(s!==i){ok=false;why=`dot ${i} gave ${s}`;break;}}
  return {ok,why:why?`${tag}: ${why}`:''};}
const animProps=()=>document.getAnimations().map(a=>{const props=new Set();try{a.effect.getKeyframes().forEach(k=>Object.keys(k).forEach(p=>{if(!/^(offset|computedOffset|easing|composite)$/.test(p))props.add(p);}));}catch(e){}
  if(a.transitionProperty)props.add(a.transitionProperty);let t=a.effect&&a.effect.target;let id=null;while(t&&t.nodeType===1){if(t.id){id=t.id;break;}t=t.parentNode;}
  /* a transition waiting out its delay is listed by getAnimations() but moves nothing yet; T17 and T19 count only the active ones */
  let active=true;try{const ct=a.effect.getComputedTiming();active=a.currentTime!=null&&a.currentTime>=(ct.delay||0);}catch(e){}
  return {props:[...props],id,active,inStage:!!(a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('#stage')),pseudo:a.effect&&a.effect.pseudoElement||null};});
/* the digits that are the figure's own and not a count: the eyebrow's unit number, the tool number, the two sources, the rights line */
const STRIP=/©\s*2026|Mertz & Davis 1972|Cohen & Boyer 1973|Bio Tool #28|DE BIO 101|DE Bio 101|SOL Bio Unit 4/gi;
const rectOf=id=>{const e=document.querySelector('#stage #'+id);const r=e.getBoundingClientRect();return [Math.round(r.x),Math.round(r.y)];};
const rectsOf=ids=>Object.fromEntries(ids.map(id=>[id,(e=>{const r=e.getBoundingClientRect();return [Math.round(r.x),Math.round(r.y)];})(document.querySelector('#stage #'+id))]));
/* an element's centre in the still's user units (1600 wide), from its rendered rect */
const CENTRE_SRC=`const centreOf=id=>{const svg=document.querySelector('#stage svg');const sb=svg.getBoundingClientRect();const k=1600/sb.width;const r=document.querySelector('#stage #'+id).getBoundingClientRect();return [+((r.x+r.width/2-sb.x)*k).toFixed(1),+((r.y+r.height/2-sb.y)*k).toFixed(1)];};`;
const centresOf=new Function('ids',CENTRE_SRC+'return ids.map(centreOf);');
const centreOf=id=>{const svg=document.querySelector('#stage svg');const sb=svg.getBoundingClientRect();const k=1600/sb.width;const r=document.querySelector('#stage #'+id).getBoundingClientRect();return [+((r.x+r.width/2-sb.x)*k).toFixed(1),+((r.y+r.height/2-sb.y)*k).toFixed(1)];};
/* an element's rendered scale and opacity, from the computed transform matrix */
const scaleOf=id=>{const e=document.querySelector('#stage #'+id);const m=getComputedStyle(e).transform;let s=1;if(m&&m!=='none'){const v=m.match(/matrix\(([^)]+)\)/);if(v){const a=v[1].split(',').map(Number);s=Math.hypot(a[0],a[1]);}}return {s:+s.toFixed(3),o:__MR.el(id).opacity,style:e.style.transform};};
const scalesOf=ids=>ids.map(id=>{const e=document.querySelector('#stage #'+id);const m=getComputedStyle(e).transform;let s=1;if(m&&m!=='none'){const v=m.match(/matrix\(([^)]+)\)/);if(v){const a=v[1].split(',').map(Number);s=Math.hypot(a[0],a[1]);}}return {id,s:+s.toFixed(3),o:__MR.el(id).opacity};});
const sourcesLine=want=>{const p=document.getElementById('sources');if(!p)return {present:false};const r=p.getBoundingClientRect();const links=[...p.querySelectorAll('a')].map(a=>({t:a.textContent,h:a.getAttribute('href')}));
  return {present:true,visible:r.height>0&&getComputedStyle(p).display!=='none'&&getComputedStyle(p).visibility!=='hidden',disclosed:!!p.closest('details,[hidden]'),text:p.textContent,links,inBuild:!!p.closest('#build'),
    matches:want.length===links.length&&want.every(([t,h],i)=>links[i].t===t&&links[i].h===h)&&__MR.sources().length===want.length};};

/* T32 (Part B, B1): when a link names a figure, the reel is on the first screen. Measured on arrival with ?anim=<key> in a fresh
   context (state 0, as the hub and Canvas links arrive): the stage's top edge is within the first 320 px of the page at 1440x900,
   1180x820 and 820x1180, and at the two landscape sizes the prediction card for the current step is fully on screen without
   scrolling. The intro is folded to one line and the selector to one row, and both open on tap. With no ?anim= the page opens as
   before. B2 and B3 ride along, reported under T1: the back link follows the level, the footer's course line is the figure's
   eyebrow, and one line under the sources links the figure's still and the page on where the diagrams come from */
async function t32(br,key){const sizes=[{width:1440,height:900,card:true},{width:1180,height:820,card:true},{width:820,height:1180,card:false}];const out=[];
  for(const vp of sizes){const {ctx,pg}=await fresh(br,vp);const tag=`${vp.width}x${vp.height}`;await open(pg,`${BASE}?anim=${key}`);await sleep(250);
    const m=await pg.evaluate(()=>{const st=document.getElementById('stage').getBoundingClientRect();const p=document.getElementById('predict');const pr=p?p.getBoundingClientRect():null;
      return {stageTop:Math.round(st.top+window.scrollY),scrollY:window.scrollY,ih:window.innerHeight,predict:pr?{top:Math.round(pr.top+window.scrollY),bottom:Math.round(pr.bottom+window.scrollY)}:null,rows:[...document.querySelectorAll('#sel > li.fig')].filter(l=>l.getBoundingClientRect().height>0).length,bridges:document.querySelectorAll('#sel > li.bridge').length,intro:document.getElementById('intro').classList.contains('collapsed'),lede:document.querySelector('#intro .lede').getBoundingClientRect().height,step:__MR.step(),fig:__MR.fig()};});
    const ok=m.fig===key&&m.stageTop<=320&&m.scrollY===0&&m.rows===1&&m.bridges===0&&m.intro&&m.lede===0&&(!vp.card||(m.predict&&m.predict.top>=0&&m.predict.bottom<=m.ih));
    res('T32',ok,`${tag}: ${JSON.stringify(m)}`);out.push(`${tag}: stage top ${m.stageTop} px${vp.card&&m.predict?`, step-${m.step+1} prediction card ${m.predict.top}-${m.predict.bottom} of ${m.ih}`:''}`);
    if(vp.width===1440){
      await open(pg,BASE);const plain=await pg.evaluate(()=>({stageTop:Math.round(document.getElementById('stage').getBoundingClientRect().top+window.scrollY),rows:[...document.querySelectorAll('#sel > li.fig')].filter(l=>l.getBoundingClientRect().height>0).length,bridges:document.querySelectorAll('#sel > li.bridge').length,intro:document.getElementById('intro').classList.contains('collapsed'),lede:document.querySelector('#intro .lede').getBoundingClientRect().height}));
      res('T32',!plain.intro&&plain.rows===6&&plain.bridges===5&&plain.lede>0,`no ?anim=: ${JSON.stringify(plain)}`);out.push(`no ?anim=: stage top ${plain.stageTop} px, all six rows and the intro open`);
      await open(pg,`${BASE}?anim=${key}`);const row=await pg.evaluate(()=>(document.querySelector('.selbtn .showall')||{}).textContent||'');await pg.click('#introMore');await pg.click('.selbtn .showall');
      const opened=await pg.evaluate(()=>({intro:document.getElementById('intro').classList.contains('collapsed'),rows:[...document.querySelectorAll('#sel > li.fig')].filter(l=>l.getBoundingClientRect().height>0).length,bridges:document.querySelectorAll('#sel > li.bridge').length,fig:__MR.fig(),lede:document.querySelector('#intro .lede').getBoundingClientRect().height}));
      res('T32',/one of six/.test(row)&&/show all/.test(row)&&!opened.intro&&opened.rows===6&&opened.bridges===5&&opened.fig===key&&opened.lede>0,`tap to open: row="${row}" ${JSON.stringify(opened)}`);
      /* B2, B3 */
      const ch=await pg.evaluate(()=>{const f=__MR.figs().find(x=>x.key===__MR.fig());const out={levels:f.levels,eyebrow:document.getElementById('eyebrow').textContent};
        if(f.levels){__MR.setLevel('sol');out.sol=__MR.chrome();__MR.setLevel('de');out.de=__MR.chrome();__MR.setLevel('sol');}else out.de=__MR.chrome();return out;});
      const still=ch.de.still;const b2=(!ch.levels||(ch.sol.back==='../classroom-tools.html'&&/Biology Classroom Tools/.test(ch.sol.backText)))&&ch.de.back==='../de-biology-101-resources.html'&&/DE Biology 101 Resources/.test(ch.de.backText)&&ch.eyebrow.indexOf(ch.de.foot)>0&&ch.de.foot.length>10;
      const b3=still.length===2&&still[0][0]==='Print the still (PNG)'&&/^\.\.\/figures\/0[1-6]-[a-z-]+\.png$/.test(still[0][1])&&still[1][0]==='Where these diagrams come from'&&still[1][1]===`../figure-sources.html#${key}`;
      res('T1',b2&&b3,`B2/B3 chrome: ${JSON.stringify(ch)}`);note('T1',`B2: back link ${ch.levels?`"${ch.sol.backText}" → ${ch.sol.back} at SOL, `:''}"${ch.de.backText}" → ${ch.de.back} at DE; footer course line "${ch.de.foot}"; B3: ${still.map(([t,h])=>`"${t}" → ${h}`).join(', ')}`);}
    await ctx.close();}
  note('T32',out.join('; ')+'; the folded intro and selector open on tap');}


(async()=>{
  const br=await chromium.launch();
  for(const vp of [{width:1180,height:820},{width:390,height:844}]){
    const tag=`${vp.width}x${vp.height}`;
    const {ctx,pg}=await fresh(br,vp);
    /* T1: six deep links; all six open, and no entry in the selector is disabled: there are no placeholders left */
    for(const k of KEYS){await open(pg,`${BASE}?fig=${k}`);const fig=await pg.evaluate(()=>__MR.fig());
      const info=await pg.evaluate(k=>{const f=__MR.figs().find(x=>x.key===k);const b=document.querySelector(`.selbtn[data-fig="${k}"]`);return {present:!!f,enabled:f&&f.enabled,btn:!!b,disabled:b&&b.disabled};},k);
      res('T1',ENABLED[k]&&fig===k&&info.present&&info.enabled&&info.btn&&!info.disabled,`${tag}: ?fig=${k} gave ${fig} ${JSON.stringify(info)}`);}
    await open(pg,BASE);const dis=await pg.evaluate(()=>({disabled:[...document.querySelectorAll('.selbtn')].filter(b=>b.disabled).map(b=>b.dataset.fig),soon:document.querySelectorAll('.selbtn .soon').length,n:document.querySelectorAll('.selbtn').length}));
    res('T1',dis.disabled.length===0&&dis.soon===0&&dis.n===6,`${tag}: placeholders remain: ${JSON.stringify(dis)}`);
    await pg.click('.selbtn[data-fig="cloning"]');res('T1',(await pg.evaluate(()=>__MR.fig()))==='cloning',`${tag}: selector click on cloning`);
    /* per-step links carry the level (D1); no run-on, so the last step holds with Play disabled and the ring on Label it from memory (D10); the D7 line is under the closing caption */
    await open(pg,`${BASE}?anim=cloning&step=3`);const s3=await pg.evaluate(()=>({step:__MR.step(),done:__MR.done(3),url:location.search,level:__MR.level(),eyebrow:document.getElementById('eyebrow').textContent}));
    res('T1',s3.step===3&&!s3.done&&/anim=cloning/.test(s3.url)&&/step=3/.test(s3.url)&&/level=sol/.test(s3.url)&&s3.level==='sol'&&/Bio Tool #28/.test(s3.eyebrow),`${tag}: ?anim=cloning&step=3 gave ${JSON.stringify(s3)}`);
    await open(pg,`${BASE}?anim=cloning&step=1&level=de`);const s1=await pg.evaluate(()=>({step:__MR.step(),level:__MR.level(),url:location.search}));
    res('T1',s1.step===1&&s1.level==='de'&&/level=de/.test(s1.url),`${tag}: &level=de gave ${JSON.stringify(s1)}`);
    await open(pg,`${BASE}?anim=cloning&step=5&level=de`);await sleep(600);
    const end=await pg.evaluate(()=>({step:__MR.step(),playing:__MR.playing(),count:__MR.loopCount(),playDisabled:document.getElementById('play').disabled,ring:[...document.querySelectorAll('.next')].map(e=>e.id),readout:__MR.readout(),counter:__MR.counter(),end:!!document.getElementById('endscreen'),coda:!!document.getElementById('codaBtn'),after:(document.querySelector('#card .afterline')||{}).textContent||'',closing:(document.querySelector('#card .closing')||{}).textContent||''}));
    res('T1',end.step===5&&!end.playing&&end.count===null&&end.playDisabled&&end.ring.length===1&&end.ring[0]==='blankBtn'&&end.readout===''&&end.counter===''&&end.end&&!end.coda&&/^Every colony on ampicillin took up a plasmid, but a plasmid cut with one enzyme can also close on itself without the insert/.test(end.after)&&end.closing==='The enzyme makes the ends fit before anything is joined.',`${tag}: ?anim=cloning&step=5 gave ${JSON.stringify(end)}`);
    const afterSol=await pg.evaluate(()=>{__MR.setLevel('sol');return (document.querySelector('#card .afterline')||{}).textContent||'';});await pg.evaluate(()=>__MR.setLevel('de'));
    res('T1',/^Every colony here took up a plasmid\. Some plasmids close back up without the gene/.test(afterSol),`${tag}: SOL after-line "${afterSol}"`);
    /* R6, D11: the still's two sources are the visible line under the reel, and they follow the selected figure */
    const srcC=await pg.evaluate(sourcesLine,[['Mertz & Davis 1972','https://doi.org/10.1073/pnas.69.11.3370'],['Cohen & Boyer 1973','https://doi.org/10.1073/pnas.70.11.3240']]);
    await pg.evaluate(()=>__MR.setFig('rtk'));const srcR=await pg.evaluate(sourcesLine,[['Lemmon & Schlessinger 2010','https://doi.org/10.1016/j.cell.2010.06.011'],['Zuo 2026','https://doi.org/10.1073/pnas.2602436123']]);
    await pg.evaluate(()=>__MR.setFig('cloning'));
    res('T1',srcC.present&&srcC.visible&&!srcC.disclosed&&srcC.inBuild&&srcC.matches&&/^Sources: Mertz & Davis 1972 · Cohen & Boyer 1973$/.test(srcC.text.trim())&&srcR.visible&&srcR.matches,`${tag}: sources line cloning=${JSON.stringify(srcC)} rtk=${JSON.stringify(srcR)}`);
    note('T1',`${tag}: all six deep links open and no selector entry is disabled; ?anim=cloning&step=n opens state n unlit with the level in the link; &level=de holds; step 5 holds with Play disabled, no run-on and no counter, the ring on Label it from memory, the D7 line under the closing caption at both levels; the sources line under the reel reads "${srcC.text.trim()}" and follows the figure (R6)`);
    /* T15: order and bridges, cloning last with no bridge after it, nothing disabled (opened with no ?anim=, since a link that names a figure folds the selector to one row, B1) */
    await open(pg,BASE);
    const selText=await pg.evaluate(()=>[...document.querySelectorAll('#sel > li')].map(l=>l.textContent.trim()));
    const titleIdx=TITLES.map(t=>selText.findIndex(s=>s.includes(t)));
    const ordered=titleIdx.every((v,i)=>v>=0&&(i===0||v>titleIdx[i-1]));
    const bridgesOk=BRIDGES.every((b,i)=>{const j=selText.findIndex(s=>s===b);return j===titleIdx[i]+1;});
    const soon=await pg.evaluate(()=>[...document.querySelectorAll('.selbtn')].filter(b=>b.disabled).map(b=>b.dataset.fig));
    const last=await pg.evaluate(()=>{const li=[...document.querySelectorAll('#sel > li')];const l=li[li.length-1];return {cls:l.className,fig:(l.querySelector('.selbtn')||{}).dataset?l.querySelector('.selbtn').dataset.fig:null,bridges:document.querySelectorAll('#sel > li.bridge').length,rows:li.filter(x=>x.classList.contains('fig')).length};});
    const tags=await pg.evaluate(()=>[...document.querySelectorAll('.selbtn[data-fig="cloning"] .tag')].map(t=>t.textContent));
    const num=await pg.evaluate(()=>document.querySelector('.selbtn[data-fig="cloning"] .idnum').textContent);
    res('T15',ordered&&bridgesOk&&soon.length===0&&last.fig==='cloning'&&last.cls==='fig'&&last.bridges===5&&last.rows===6&&tags.join('|')==='Movement'&&num==='Bio Tool #28',`${tag}: order ${JSON.stringify(titleIdx)} bridges ${bridgesOk} disabled=${JSON.stringify(soon)} last=${JSON.stringify(last)} tags=${tags} num=${num}`);
    note('T15',`${tag}: six rows in the arc's order with the five bridges; cloning is the last row, tagged Movement, numbered Bio Tool #28, with no bridge after it; no entry is disabled`);
    /* T2 */
    const w=await walkT2(pg,tag);res('T2',w.ok,w.why);
    /* T4: every step, both levels */
    let minPx=Infinity,minRun=Infinity,minAt='';
    for(const lv of ['sol','de']){await pg.evaluate(l=>__MR.setLevel(l),lv);
      for(let i=0;i<=N;i++){await go(pg,i);const L=await pg.evaluate(()=>__MR.labels());
        L.forEach(l=>{if(l.px<minPx){minPx=l.px;minAt=`"${l.text.slice(0,30)}" step ${i} ${lv}`;}if(l.minRunPx<minRun)minRun=l.minRunPx;});}}
    await pg.evaluate(()=>__MR.setLevel('sol'));
    res('T4',minPx>=18,`${tag}: min label ${minPx}px (${minAt})`);note('T4',`${tag}: min label ${minPx} px at a 1000 px stage (${minAt}); no sub- or superscript runs on this figure`);
    /* T9 (D1): the switch is present on cloning and changes captions, one drawing label and the prompts; absent on rtk */
    const capsSol=await pg.evaluate(()=>{__MR.setLevel('sol');return __MR.captions().join('|');});
    const capsDe=await pg.evaluate(()=>{__MR.setLevel('de');return __MR.captions().join('|');});
    await go(pg,N);const lbDe=await pg.evaluate(()=>__MR.labels().filter(l=>l.visible).map(l=>l.text).join('|'));
    await pg.evaluate(()=>__MR.setLevel('sol'));const lbSol=await pg.evaluate(()=>__MR.labels().filter(l=>l.visible).map(l=>l.text).join('|'));
    const lvPresent=await pg.evaluate(()=>!!document.getElementById('levelrow')&&document.getElementById('levelrow').isConnected&&document.querySelectorAll('#levelrow [data-lv]').length===2);
    const lvOnRtk=await pg.evaluate(()=>{__MR.setFig('rtk');const on=!!document.getElementById('levelrow')&&document.getElementById('levelrow').isConnected;__MR.setFig('cloning');return on;});
    const lvBack=await pg.evaluate(()=>!!document.getElementById('levelrow')&&document.getElementById('levelrow').isConnected);
    const solWords=/plasmid with the gene/.test(lbSol)&&/One cutting enzyme cuts/.test(lbSol)&&/sealing/.test(lbSol)&&!/recombinant plasmid/.test(lbSol);
    const deWords=/recombinant plasmid/.test(lbDe)&&/One enzyme cuts both,/.test(lbDe)&&/ligase/.test(lbDe)&&!/plasmid with the gene|cutting enzyme|sealing/.test(lbDe);
    const promptWords=await pg.evaluate(()=>{__MR.setLevel('de');const d=[1,2,3].map(k=>__MR.choices(k).join('|')+__MR.happened(k)).join(' ');__MR.setLevel('sol');const s=[1,2,3].map(k=>__MR.choices(k).join('|')+__MR.happened(k)).join(' ');return {de:/restriction enzyme/.test(d)&&/sticky ends/.test(d)&&/[Ll]igase/.test(d)&&!/cutting enzyme|sealing enzyme/.test(d),sol:/cutting enzyme/.test(s)&&/matching ends/.test(s)&&/sealing enzyme/.test(s)&&/ring of DNA/.test(s)&&!/restriction|sticky|recombinant/.test(s)};});
    const urlLv=await pg.evaluate(()=>location.search);
    res('T9',lvPresent&&!lvOnRtk&&lvBack&&capsSol!==capsDe&&lbDe!==lbSol&&solWords&&deWords&&promptWords.de&&promptWords.sol&&/level=/.test(urlLv),`${tag}: control present=${lvPresent} (rtk: ${lvOnRtk}, back: ${lvBack}) captions differ=${capsSol!==capsDe} labels differ=${lbDe!==lbSol} solWords=${solWords} deWords=${deWords} prompts=${JSON.stringify(promptWords)} url=${urlLv}`);
    note('T9',`${tag}: level switch present on cloning and absent on rtk; SOL says cutting enzyme, matching ends, sealing enzyme (ligase), a ring of DNA (plasmid) in captions 2 and 3, the prompts and the start; on the drawing only "recombinant plasmid" changes, to "plasmid with the gene" (D1)`);
    await pg.evaluate(()=>__MR.setLevel('sol'));
    /* T5 + T7 + T6: press through with the prompt */
    await pg.evaluate(()=>__MR.reset());await settle(pg);
    for(let k=0;k<N;k++){
      const before=await pg.evaluate(k=>{const p=document.querySelector('#predict');return {has:!!p,for:p?+p.dataset.for:null,prompt:__MR.prompt(),ring:[...document.querySelectorAll('.next')].map(e=>e.id)};},k);
      res('T7',before.has&&before.for===k+1,`${tag}: no prompt for step ${k+1} at state ${k}`);
      res('T6',before.ring.length===1&&before.ring[0]==='next',`${tag}: ring on ${JSON.stringify(before.ring)} at state ${k}`);
      const doneBefore=await pg.evaluate(k=>__MR.done(k+1),k);
      await pg.click('#next');
      const after=await pg.evaluate(()=>({has:!!document.querySelector('#predict'),ring:[...document.querySelectorAll('.next')].map(e=>e.id),step:__MR.step()}));
      res('T7',!after.has,`${tag}: prompt still present right after tapping Next at state ${k}`);
      res('T6',after.ring.length===1,`${tag}: ${after.ring.length} rings during transition ${k}->${k+1}`);
      await settle(pg);
      const d=await pg.evaluate(k=>({done:__MR.done(k+1),lit:document.querySelector(`#dots button:nth-child(${k+1})`).classList.contains('done'),
        others:[...document.querySelectorAll('#dots button')].map((b,i)=>b.classList.contains('done')===__MR.done(i+1)).every(Boolean)}),k);
      res('T5',!doneBefore&&d.done&&d.lit&&d.others,`${tag}: step ${k+1} doneBefore=${doneBefore} done=${d.done} lit=${d.lit} others=${d.others}`);}
    const endRing=await pg.evaluate(()=>[...document.querySelectorAll('.next')].map(e=>e.id));
    res('T6',endRing.length===1&&endRing[0]==='blankBtn',`${tag}: ring at final state ${JSON.stringify(endRing)}`);
    note('T6',`${tag}: the ring moves Next × 5 → Label it from memory`);
    /* a jump does not count as finishing */
    await pg.evaluate(()=>__MR.reset());await settle(pg);await go(pg,3);
    const jumpDone=await pg.evaluate(()=>({d:__MR.done(3),lit:document.querySelector('#dots button:nth-child(3)').classList.contains('done')}));
    res('T5',!jumpDone.d&&!jumpDone.lit,`${tag}: jumping to step 3 marked it done`);
    /* T14 + T17 + T18: forward transitions, sampled. T19 is N/A: no ATP is drawn (D4) */
    await go(pg,0);const timing=await pg.evaluate(()=>__MR.timing());
    const badProps=new Set();let t17ok=true,t17why='',t18ok=true,t18why='';
    const seq2=timing.seq[2],seq3=timing.seq[3],seq4=timing.seq[4],seq5=timing.seq[5],pairs=timing.pairs,beside=timing.beside,cols=timing.colonies;
    /* travellers, and the moment from which each must be visible: each fades in within 120 ms of setting off; the right cut piece fades in with the strip */
    const travellers={1:[],2:[['enz',seq2.enz.d+150],['cutR',seq2.cutR.d+seq2.cutR.dur/(seq2.cutR.way.length+1)+40]],3:[['ins',seq3.ins.d+150]],4:[['plas',seq4.plas.d+150]],5:[]};
    for(let k=1;k<=N;k++){
      await pg.evaluate(k=>__MR.goStep(k),k);const t0=Date.now();const dur=timing.dur[k];
      const beat=timing.beats[k];const samples=[];
      while(Date.now()-t0<dur+150){const el=Date.now()-t0;const A=await pg.evaluate(animProps);
        A.forEach(a=>a.props.forEach(p=>{if(p!=='transform'&&p!=='opacity')badProps.add(p+'@'+(a.id||a.pseudo||'?'));}));
        if(beat&&el>beat.from+60&&el<beat.to-120){A.filter(a=>a.inStage&&a.active).forEach(a=>{if(!beat.ids.includes(a.id)){t17ok=false;t17why=`${tag}: during beat ${k} (${beat.name}) ${a.id} was animating at ${el}ms`;}});}
        for(const [id,from] of travellers[k]||[]){if(el<from)continue;const o=await pg.evaluate(id=>__MR.el(id).opacity,id);if(o<0.05){t18ok=false;t18why=`${tag}: ${id} opacity ${o} at ${el}ms of transition ${k}`;}}
        samples.push(A.length);await sleep(60);}
      await settle(pg);
      if(k===2||k===3||k===4){const moved=samples.some(n=>n>0);if(!moved)note('T14',`${tag}: no running animations were sampled in step ${k} (sampling too coarse?)`);}}
    res('T14',badProps.size===0,`${tag}: animated properties beyond transform/opacity: ${[...badProps].join(', ')}`);
    const d=timing.dur;res('T17',d[3]>d[2]&&d[3]>d[4]&&d[3]>d[1]&&d[3]>d[5]&&timing.beats[3]&&Object.keys(timing.beats).length===1&&timing.beats[3].to-timing.beats[3].from>=1500&&t17ok,`${tag}: dur=${JSON.stringify(d)} beats=${Object.keys(timing.beats)} ${t17why}`);
    note('T17',`${tag}: step durations ms ${JSON.stringify(d.slice(1))}; the one beat is step 3 (${timing.beats[3].name}, ${timing.beats[3].from}-${timing.beats[3].to} ms); nothing else moved inside it`);
    res('T18',t18ok,t18why);
    R.T19='N/A';NOTE.T19='no ATP is drawn on cloning (D4): nothing is paid for';
    /* T33 (D4): pairing before sealing. From the table: each seal's first transition starts at or after the insert's seating transition has
       ended (`pairs`). Sampled: polled through step 3, the first moment a seal is visible comes no earlier than the seating, and at that
       moment the insert sits within 3 units of its seat; at the end both seals are shown and the insert has not moved */
    {let ok=true,why='';
      if(!pairs||pairs.step!==3||pairs.seals.length!==2){ok=false;why+=` ${tag}: pairs=${JSON.stringify(pairs)}`;}
      else{const ins=seq3[pairs.insert];if(ins.d+ins.dur!==pairs.seatsAt){ok=false;why+=` ${tag}: seatsAt ${pairs.seatsAt} is not the insert's ${ins.d}+${ins.dur}`;}
        pairs.seals.forEach(id=>{const q=seq3[id];if(!q||q.d<pairs.seatsAt){ok=false;why+=` ${tag}: ${id} starts at ${q&&q.d}, before the insert has seated at ${pairs.seatsAt}`;}});}
      await go(pg,3);const seatC=await pg.evaluate(centreOf,'ins');
      await go(pg,2);await pg.evaluate(()=>__MR.goStep(3));const t0=Date.now();let firstSeal=null,insAtSeal=null,sealsEarly=null;
      while(Date.now()-t0<timing.dur[3]+100){const el=Date.now()-t0;const o=await pg.evaluate(ids=>ids.map(id=>__MR.el(id).opacity),pairs.seals);
        if(firstSeal==null&&o.some(v=>v>0.05)){firstSeal=el;insAtSeal=await pg.evaluate(centreOf,'ins');}
        if(el<pairs.seatsAt-150&&o.some(v=>v>0.05)&&sealsEarly==null)sealsEarly=`${el}ms (${o})`;
        await sleep(40);}
      await settle(pg);const fin=await pg.evaluate(ids=>({seals:ids.map(id=>__MR.el(id).opacity),ins:(()=>{const svg=document.querySelector('#stage svg');const sb=svg.getBoundingClientRect();const k=1600/sb.width;const r=document.querySelector('#stage #ins').getBoundingClientRect();return [+((r.x+r.width/2-sb.x)*k).toFixed(1),+((r.y+r.height/2-sb.y)*k).toFixed(1)];})()}),pairs.seals);
      const near=(a,b,t)=>Math.abs(a[0]-b[0])<=t&&Math.abs(a[1]-b[1])<=t;
      if(sealsEarly){ok=false;why+=` ${tag}: a seal was visible at ${sealsEarly}, before the insert had seated`;}
      if(firstSeal==null||firstSeal<pairs.seatsAt-60){ok=false;why+=` ${tag}: first seal seen at ${firstSeal}ms, seating ends at ${pairs.seatsAt}`;}
      if(!insAtSeal||!near(insAtSeal,seatC,3)){ok=false;why+=` ${tag}: when the first seal appeared the insert was at ${JSON.stringify(insAtSeal)}, its seat is ${JSON.stringify(seatC)}`;}
      if(fin.seals.some(v=>v<0.97)||!near(fin.ins,seatC,1)){ok=false;why+=` ${tag}: at the end seals=${fin.seals} insert=${JSON.stringify(fin.ins)}`;}
      res('T33',ok,why);
      note('T33',`${tag}: the insert seats at ${pairs.seatsAt} ms of step 3 (${seq3.ins.d}-${pairs.seatsAt}); the seals start at ${pairs.seals.map(id=>seq3[id].d).join(' and ')} ms; sampled: the first seal was seen at ${firstSeal} ms with the insert at ${JSON.stringify(insAtSeal)} (seat ${JSON.stringify(seatC)})`);
      if(!ok)await shot(pg,`FAIL-T33-cloning-${tag}`);}
    /* T34 (D5): travellers stay visible; the plasmid stays beside the chromosome. Sampled: the insert through step 3 and the plasmid copy
       through step 4 are at opacity >= 0.9 from 150 ms after they set off until they arrive. At the end of step 4 the plasmid's box does not
       intersect the chromosome's; the chromosome's box is the same at steps 3, 4 and 5, and the stage-3 plasmid has not moved */
    {let ok=true,why='';const lows=[];
      const sampleTrav=async(k,id)=>{const q=timing.seq[k][id];await go(pg,k-1);await pg.evaluate(k=>__MR.goStep(k),k);const t0=Date.now();let n=0,min=1;
        while(Date.now()-t0<q.d+q.dur){const el=Date.now()-t0;if(el>=q.d+150){const o=await pg.evaluate(id=>__MR.el(id).opacity,id);n++;if(o<min)min=o;if(o<0.9){lows.push(`${id} ${o} at ${el}ms of step ${k}`);}}await sleep(45);}
        await settle(pg);return {n,min};};
      const si=await sampleTrav(3,beside.travellers[3]);const sp=await sampleTrav(4,beside.travellers[4]);
      if(lows.length){ok=false;why+=` ${tag}: ${lows.slice(0,3).join('; ')}`;}
      if(si.n<10||sp.n<10){ok=false;why+=` ${tag}: too few samples (${si.n}, ${sp.n})`;}
      const rectIn=id=>{const r=document.querySelector('#stage #'+id).getBoundingClientRect();return {x:r.x,y:r.y,r:r.right,b:r.bottom};};
      await go(pg,3);const c3=await pg.evaluate(rectIn,beside.chromosome);const ring3=await pg.evaluate(rectIn,'ring3');
      await go(pg,4);const m4=await pg.evaluate(ids=>{const f=id=>{const r=document.querySelector('#stage #'+id).getBoundingClientRect();return {x:r.x,y:r.y,r:r.right,b:r.bottom};};return {p:f(ids[0]),c:f(ids[1]),e:f(ids[2]),ring3:f('ring3'),plasO:__MR.el(ids[0]).opacity};},[beside.plasmid,beside.chromosome,beside.envelope]);
      await go(pg,5);const c5=await pg.evaluate(rectIn,beside.chromosome);
      const same=(a,b)=>Math.abs(a.x-b.x)<0.5&&Math.abs(a.y-b.y)<0.5&&Math.abs(a.r-b.r)<0.5&&Math.abs(a.b-b.b)<0.5;
      const apart=m4.p.x>m4.c.r||m4.c.x>m4.p.r||m4.p.y>m4.c.b||m4.c.y>m4.p.b;
      const inside=m4.p.x>=m4.e.x&&m4.p.r<=m4.e.r&&m4.p.y>=m4.e.y&&m4.p.b<=m4.e.b;
      if(!apart){ok=false;why+=` ${tag}: at the end of step 4 the plasmid's box ${JSON.stringify(m4.p)} intersects the chromosome's ${JSON.stringify(m4.c)}`;}
      if(!inside){ok=false;why+=` ${tag}: the plasmid ${JSON.stringify(m4.p)} is not inside the cell ${JSON.stringify(m4.e)}`;}
      if(!same(c3,m4.c)||!same(m4.c,c5)){ok=false;why+=` ${tag}: the chromosome moved: ${JSON.stringify([c3,m4.c,c5])}`;}
      if(!same(ring3,m4.ring3)){ok=false;why+=` ${tag}: the stage-3 plasmid moved in step 4`;}
      if(m4.plasO<0.97){ok=false;why+=` ${tag}: plasmid opacity ${m4.plasO} at the end of step 4`;}
      res('T34',ok,why);
      const sc=await pg.evaluate(()=>1600/document.querySelector('#stage svg').getBoundingClientRect().width);
      note('T34',`${tag}: insert sampled ${si.n} times from 150 ms after it set off, min opacity ${si.min}; plasmid copy sampled ${sp.n} times, min opacity ${sp.min}; at the end of step 4 the plasmid's box and the chromosome's are ${Math.round((m4.p.x-m4.c.r)*sc)} units apart, the plasmid inside the cell; the chromosome's box is the same at steps 3, 4 and 5; the stage-3 plasmid did not move`);
      if(!ok)await shot(pg,`FAIL-T34-cloning-${tag}`);}
    /* T35 (D6): colonies grow one at a time. From the table: sorted by start, no two starts within 150 ms, each from a scale <= 0.3, the label
       and the box after the last one has grown. Sampled: 40 ms after each colony sets off its rendered scale is <= 0.3 and the colonies yet
       to start are still at their point; at the end all seven are at full size and shown */
    {let ok=true,why='';
      if(!cols||cols.step!==5||cols.ids.length!==7){ok=false;why+=` ${tag}: colonies=${JSON.stringify(cols)}`;}
      else{const order=cols.ids.map((id,i)=>({id,t:cols.starts[i]})).sort((a,b)=>a.t-b.t);
        for(let i=1;i<order.length;i++){if(order[i].t-order[i-1].t<150){ok=false;why+=` ${tag}: ${order[i-1].id} at ${order[i-1].t} and ${order[i].id} at ${order[i].t} start within 150 ms`;}}
        cols.ids.forEach((id,i)=>{const q=seq5[id];if(!q||q.d!==cols.starts[i]){ok=false;why+=` ${tag}: ${id} table start ${q&&q.d} vs ${cols.starts[i]}`;}});
        if(cols.startScale>0.3){ok=false;why+=` ${tag}: start scale ${cols.startScale}`;}
        cols.after.forEach(id=>{const q=seq5[id];if(!q||q.d<cols.lastEndsAt){ok=false;why+=` ${tag}: ${id} comes up at ${q&&q.d}, before the last colony has grown (${cols.lastEndsAt})`;}});
        await go(pg,4);const pre=await pg.evaluate(scalesOf,cols.ids);
        if(pre.some(p=>p.s>0.3||p.o>0.03)){ok=false;why+=` ${tag}: before step 5 ${JSON.stringify(pre)}`;}
        await pg.evaluate(()=>__MR.goStep(5));const t0=Date.now();const seen=[];
        for(const c of order){while(Date.now()-t0<c.t+40)await sleep(4);const S=await pg.evaluate(scalesOf,cols.ids);const me=S.find(x=>x.id===c.id);const el=Date.now()-t0;seen.push(`${c.id} ${me.s}@${el}ms`);
          if(me.s>0.3){ok=false;why+=` ${tag}: ${c.id} at scale ${me.s} ${el} ms into step 5, ${el-c.t} ms after its start`;}
          const notYet=order.filter(o=>o.t>el+20);notYet.forEach(o=>{const x=S.find(y=>y.id===o.id);if(x.s>0.3||x.o>0.05){ok=false;why+=` ${tag}: ${o.id} (starts ${o.t}) already at scale ${x.s} opacity ${x.o} at ${el} ms`;}});}
        await settle(pg);await sleep(450);const fin=await pg.evaluate(scalesOf,cols.ids);   /* after the focus has settled: the step's parts scale 1.3 while it plays and release to 1 over 300 ms */
        if(fin.some(f=>Math.abs(f.s-1)>0.02||f.o<0.97)){ok=false;why+=` ${tag}: at the end ${JSON.stringify(fin)}`;}
        note('T35',`${tag}: starts ${order.map(o=>`${o.id} ${o.t}`).join(', ')} ms (gaps ${order.slice(1).map((o,i)=>o.t-order[i].t).join('/')}), each from scale ${cols.startScale} over ${cols.grow} ms; the plate label and the box at ${seq5[cols.after[0]].d} ms, after the last has grown at ${cols.lastEndsAt}; sampled: ${seen.join(', ')}`);}
      res('T35',ok,why);
      if(!ok)await shot(pg,`FAIL-T35-cloning-${tag}`);}
    /* T16: no counts or orders of magnitude at any step, no counter (D10). The colonies are shown, not counted; the digits on screen are the step numbers */
    const numRe=/\b\d+\s*(x|×|fold|times|molecules?|ions?|copies|colonies|cells?|thousand|million|billion|per)\b|10\^|10[⁰¹²³⁴⁵⁶⁷⁸⁹]|\d+,\d{3}|\d+e\d|\b\d{4,}\b(?!\s*(J\.|·|,))|\b\d{2,3}\b(?!\s*(of|%|J\.))/i;
    let t16ok=true,t16why='';
    for(const lv of ['sol','de']){await pg.evaluate(l=>__MR.setLevel(l),lv);
      for(let i=0;i<=N;i++){await go(pg,i);const txt=await pg.evaluate(()=>__MR.text());const m=txt.replace(STRIP,'').match(numRe);
        if(m){t16ok=false;t16why=`${tag}: ${lv} step ${i} text has "${m[0]}"`;break;}
        if(i===N){const c=await pg.evaluate(()=>({counter:__MR.counter(),loop:__MR.loopCount()}));if(c.counter!==''||c.loop!==null){t16ok=false;t16why=`${tag}: counter="${c.counter}" loop=${JSON.stringify(c.loop)}`;}}}}
    await pg.evaluate(()=>__MR.setLevel('sol'));
    res('T16',t16ok,t16why);note('T16',`${tag}: no count, tally or order of magnitude at any step at either level; no counter (D10); seven colonies are shown, not counted`);
    /* T13: Teaching view and Fill screen */
    await go(pg,1);
    await pg.click('#teach');const tv=await pg.evaluate(()=>({pressed:document.getElementById('teach').getAttribute('aria-pressed'),teach:__MR.teach(),caps:[...document.querySelectorAll('#card .cap')].filter(c=>c.getBoundingClientRect().height>0).length,prompt:!!document.querySelector('#predict')}));
    await pg.click('#teach');
    await pg.click('#fill');const fv=await pg.evaluate(()=>({attr:document.documentElement.getAttribute('data-fill'),fill:__MR.fill(),introHidden:getComputedStyle(document.getElementById('intro')).display==='none',label:document.getElementById('fill').textContent}));
    await pg.click('#fill');const fv2=await pg.evaluate(()=>document.documentElement.getAttribute('data-fill'));
    res('T13',tv.pressed==='true'&&tv.teach&&tv.caps===N&&!tv.prompt&&fv.attr==='1'&&fv.fill&&fv.introHidden&&fv.label==='Restore page'&&fv2==='0',`${tag}: teach=${JSON.stringify(tv)} fill=${JSON.stringify(fv)} after=${fv2}`);
    /* T10: no horizontal overflow, every step, both levels */
    let ovf=true,ovfWhy='';for(const lv of ['sol','de']){await pg.evaluate(l=>__MR.setLevel(l),lv);for(let i=0;i<=N;i++){await go(pg,i);const o=await pg.evaluate(()=>({sw:document.documentElement.scrollWidth,iw:window.innerWidth}));if(o.sw>o.iw){ovf=false;ovfWhy=`${tag}: ${lv} step ${i} scrollWidth ${o.sw} > ${o.iw}`;}}}
    await pg.evaluate(()=>__MR.setLevel('sol'));
    res('T10',ovf,ovfWhy);
    if(R.T10===false)await shot(pg,`FAIL-T10-cloning-${tag}`);
    /* T21: focus on the active step: during step 3 the insert scales and the rest dims to half, the opened ring holds at full (kept), the seals
       are not yet shown; afterwards everything has settled. The colonies carry their own point scale before step 5, so they are left out of the
       scaled count */
    {await go(pg,2);await pg.evaluate(()=>__MR.goStep(3));await sleep(900);
      const mid=await pg.evaluate(()=>({f:__MR.focus(),live:!!document.querySelector('#card .cap.live'),plasmid:__MR.el('lblPlasmid').opacity,enz:__MR.el('enz').opacity,ring3:__MR.el('ring3').opacity,seal1:__MR.el('seal1').opacity,ins:__MR.el('ins').opacity}));
      await settle(pg);await sleep(450);const after=await pg.evaluate(()=>({f:__MR.focus(),live:!!document.querySelector('#card .cap.live'),plasmid:__MR.el('lblPlasmid').opacity,enz:__MR.el('enz').opacity,seal1:__MR.el('seal1').opacity,seal2:__MR.el('seal2').opacity,ins:__MR.el('ins').transform}));
      const near=(a,b)=>Math.abs(a-b)<0.03;const scaled=f=>f.scaled.filter(id=>!/^col\d$/.test(id));
      const ok=mid.f.live&&scaled(mid.f).includes('ins')&&scaled(mid.f).length>=4&&mid.f.dimmedCount>12&&near(mid.plasmid,0.5)&&near(mid.enz,0.5)&&near(mid.ring3,1)&&mid.seal1<0.03&&mid.ins>0.97&&mid.live
        &&!after.f.live&&scaled(after.f).length===0&&after.f.dimmedCount===0&&near(after.plasmid,1)&&near(after.enz,1)&&after.seal1>0.97&&after.seal2>0.97&&!/scale/.test(after.ins)&&!after.live;
      res('T21',ok,`${tag}: mid=${JSON.stringify({scaled:scaled(mid.f),dimmed:mid.f.dimmedCount,plasmid:mid.plasmid,enz:mid.enz,ring3:mid.ring3,seal1:mid.seal1,ins:mid.ins,live:mid.live})} after=${JSON.stringify({scaled:scaled(after.f),dimmed:after.f.dimmedCount,plasmid:after.plasmid,seal1:after.seal1,ins:after.ins})}`);
      note('T21',`${tag}: during step 3, ${scaled(mid.f).length} parts scaled and ${mid.f.dimmedCount} of ${mid.f.topCount} drawing parts dimmed; the opened ring held at full while the insert crossed; the seals were off until it seated; everything settled after`);}
    /* T22: committed predictions: 2-3 buttons of 44 px, Next never blocked, "You predicted" beside "What happened" */
    {await pg.evaluate(()=>__MR.reset());await settle(pg);
      const b=await pg.evaluate(()=>[...document.querySelectorAll('#predict .choices .opt')].map(x=>({t:x.textContent,h:x.getBoundingClientRect().height})));
      await pg.click('#next');await settle(pg);const noChoice=await pg.evaluate(()=>({step:__MR.step(),line:(document.getElementById('predline')||{}).textContent||''}));
      const b2=await pg.evaluate(()=>[...document.querySelectorAll('#predict .choices .opt')].length);
      await pg.click('#predict .choices .opt:nth-child(2)');const pressed=await pg.evaluate(()=>document.querySelector('#predict .choices .opt:nth-child(2)').getAttribute('aria-pressed'));
      await pg.click('#next');await settle(pg);const withChoice=await pg.evaluate(()=>({step:__MR.step(),pred:__MR.pred(2),line:(document.getElementById('predline')||{}).textContent||'',stored:(()=>{try{return JSON.parse(localStorage.getItem('mechreel')).per.cloning.pred['2'];}catch(e){return 'err';}})()}));
      const teach=await pg.evaluate(()=>{__MR.setTeach(true);const n=document.querySelectorAll('#card .opt').length;__MR.setTeach(false);return n;});
      const counts=await pg.evaluate(()=>{const out=[];for(const l of['sol','de']){__MR.setLevel(l);for(let k=1;k<=5;k++)out.push(__MR.choices(k).length);}__MR.setLevel('sol');return out;});
      const ok=b.length>=2&&b.length<=3&&b.every(x=>x.h>=44)&&noChoice.step===1&&/What happened/.test(noChoice.line)&&!/You predicted/.test(noChoice.line)&&b2>=2&&pressed==='true'&&withChoice.step===2&&withChoice.pred===1&&/You predicted: Any cut ends fit together/.test(withChoice.line)&&/What happened/.test(withChoice.line)&&withChoice.stored===1&&teach===0&&counts.every(n=>n>=2&&n<=3);
      res('T22',ok,`${tag}: buttons=${JSON.stringify(b)} noChoice=${JSON.stringify(noChoice)} pressed=${pressed} withChoice=${JSON.stringify(withChoice)} teachButtons=${teach} counts=${counts}`);
      /* D9: the wrong choices are the common wrong answers, at both levels */
      const d9=await pg.evaluate(()=>{const out={};for(const l of['sol','de']){__MR.setLevel(l);out[l]={one:__MR.choices(1).some(c=>/^Anywhere/.test(c))&&__MR.choices(1).some(c=>/^Only the (plasmid|ring of DNA)/.test(c)),two:__MR.choices(2).some(c=>/^Any cut ends fit/.test(c))&&__MR.choices(2).some(c=>/faster/.test(c)),three:__MR.choices(3).some(c=>/^The base pairs alone/.test(c))&&__MR.choices(3).some(c=>/glues them back/.test(c)),four:__MR.choices(4).some(c=>/^Joined into the chromosome/.test(c))&&__MR.choices(4).some(c=>/read through the wall/.test(c)),five:__MR.choices(5).some(c=>/^All of them/.test(c))&&__MR.choices(5).some(c=>/^Only the cells that took up the gene you want/.test(c))&&__MR.choices(5)[0]==='Only the cells that took up a plasmid'};}__MR.setLevel('sol');return out;});
      const d9ok=['sol','de'].every(l=>Object.values(d9[l]).every(Boolean));
      res('T22',d9ok,`${tag}: D9 choices ${JSON.stringify(d9)}`);
      note('T22',`${tag}: two or three choices per step at both levels; the wrong ones are the common wrong answers (anywhere / only the plasmid; any cut ends fit / faster; the base pairs alone / the cutting enzyme glues; joined into the chromosome / read through the wall; all of them / only the cells that took up the gene)`);}
    /* T23: labelled when it happens: the cut sites, heading and legend line at step 1; the enzyme's arrow and the unpaired-bases line at 2; the plasmid's
       name, the seals and their caption at 3; the chromosome line at 4; the plate label, the box and the closing line at 5; the two pieces' names always */
    {let ok=true,why='';const WANT={site1:1,site3:1,h1:1,lg1:1,arrCut:2,lblBases:2,h2:2,lg2:2,lblRecomb:3,seal1:3,seal2:3,lblSeals:3,h3:3,lg3:3,lblChrom1:4,lblChrom2:4,h4:4,lblPlate:5,box5:5,h5:5,closing:5,lblPlasmid:0,lblDonor:0,lblGene:0,lblRes:0};
      for(let i=0;i<=N&&ok;i++){await go(pg,i);await sleep(400);const o=await pg.evaluate(ids=>Object.fromEntries(ids.map(id=>[id,__MR.el(id)?__MR.el(id).opacity:null])),Object.keys(WANT));
        for(const id in WANT){const want=i>=WANT[id]?1:0;if(o[id]==null||Math.abs(o[id]-want)>0.03){ok=false;why=`${tag}: step ${i} ${id}=${o[id]} wanted ${want}`;break;}}}
      res('T23',ok,why);}
    /* T24: the amplification counter is gpcr's. cloning has no run-on and no counter (D10): the last step holds, Play is disabled, nothing keeps moving */
    {await go(pg,5);await sleep(1500);const c=await pg.evaluate(()=>({counter:__MR.counter(),loop:__MR.loopCount(),readout:__MR.readout(),playing:__MR.playing(),playDisabled:document.getElementById('play').disabled,anims:document.getAnimations().filter(a=>a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('#stage')).length,text:__MR.text()}));
      const ok=c.counter===''&&c.loop===null&&c.readout===''&&!c.playing&&c.playDisabled&&c.anims===0&&!numRe.test(c.text.replace(STRIP,''));
      if(ok){R.T24='N/A';NOTE.T24=`${tag}: no run-on and no counter on cloning (D10); the last step holds still with Play disabled and no number on screen`;}else res('T24',false,`${tag}: ${JSON.stringify({counter:c.counter,loop:c.loop,readout:c.readout,playing:c.playing,playDisabled:c.playDisabled,anims:c.anims})}`);}
    R.T20='N/A';NOTE.T20='rtk only: the already-paired note and its closing state';
    /* T25: the end screen: free text kept on the device, the misconception check "Does ligase make the ends fit?" (D8), and label-it-from-memory */
    {await pg.evaluate(()=>__MR.setLevel('de'));await go(pg,5);const es=await pg.evaluate(()=>({end:!!document.getElementById('endscreen'),ta:!!document.getElementById('explain'),q:[...document.querySelectorAll('#endscreen .q')].map(e=>e.textContent).join('|'),yn:[...document.querySelectorAll('#enterRow .opt')].map(b=>b.textContent),blank:!!document.getElementById('blankBtn'),ans:!!document.getElementById('enterAnswer')}));
      await pg.fill('#explain','The same enzyme leaves the same overhang on both pieces, so the ends can pair before anything is sealed.');
      await pg.click('#enterRow .opt:nth-child(2)');
      const after=await pg.evaluate(()=>({ans:(document.getElementById('enterAnswer')||{}).textContent||'',enter:__MR.enter(),stored:(()=>{try{const p=JSON.parse(localStorage.getItem('mechreel')).per.cloning;return {e:p.explain,n:p.enter};}catch(e){return null;}})()}));
      const solAns=await pg.evaluate(()=>{__MR.setLevel('sol');const a=(document.getElementById('enterAnswer')||{}).textContent||'';__MR.setLevel('de');return a;});
      await pg.click('#blankBtn');await sleep(200);
      const bl=await pg.evaluate(()=>({blank:__MR.blank(),shown:__MR.blanks().map(b=>b.shown),n:__MR.blanks().length,url:location.search,reveal:!!document.getElementById('reveal'),ring:[...document.querySelectorAll('.next')].map(e=>e.id),legend:__MR.el('lg3').opacity,closing:__MR.el('closing').opacity,playDisabled:document.getElementById('play').disabled,cleared:['lblChrom2','lblBox2','lblBox3'].map(id=>document.querySelector('#stage #'+id).textContent),enz:__MR.el('enz').opacity}));
      const lbl=await pg.evaluate(()=>__MR.labels());const minBlank=Math.min(...lbl.map(l=>l.px));
      await pg.click('#reveal');await sleep(200);
      const rv=await pg.evaluate(()=>({blank:__MR.blank(),shown:__MR.blanks().map(b=>b.shown),revealed:!!document.getElementById('revealed'),items:document.querySelectorAll('#revealed li').length,url:location.search}));
      const ok=es.end&&es.ta&&/Does ligase make the ends fit\?/.test(es.q)&&/Explain in one sentence why both pieces are cut with the same enzyme\./.test(es.q)&&es.yn.join('|')==='Yes|No'&&es.blank&&!es.ans&&/^No\. The enzyme made the ends fit when it cut both pieces\. Ligase only seals ends that have already paired\./.test(after.ans)&&after.enter==='no'&&after.stored&&after.stored.n==='no'&&/overhang/.test(after.stored.e)&&/^No\. The cutting enzyme made the ends fit/.test(solAns)
        &&bl.blank&&bl.n>=16&&bl.shown.every((t,i)=>t===`( ${i+1} )`)&&/labels=blank/.test(bl.url)&&bl.reveal&&bl.ring[0]==='reveal'&&bl.legend<0.01&&bl.closing<0.01&&bl.playDisabled&&bl.cleared.every(t=>t==='')&&bl.enz>0.97&&minBlank>=18
        &&!rv.blank&&rv.shown.every(t=>!/^\( \d+ \)$/.test(t))&&rv.revealed&&rv.items===bl.n&&!/labels=blank/.test(rv.url);
      res('T25',ok,`${tag}: es=${JSON.stringify(es)} after=${JSON.stringify(after)} solAns="${solAns}" blank=${JSON.stringify({n:bl.n,first:bl.shown[0],url:bl.url,ring:bl.ring,legend:bl.legend,closing:bl.closing,cleared:bl.cleared,minPx:minBlank,enz:bl.enz})} reveal=${JSON.stringify({items:rv.items,url:rv.url})}`);
      note('T25',`${tag}: ${bl.n} labels blanked at >= ${minBlank} px, the legend and the closing line hidden, the second lines of the two-line labels cleared; reveal lists them all; the check is "Does ligase make the ends fit?" (No, at both levels)`);
      /* &labels=blank as a link */
      await open(pg,`${BASE}?anim=cloning&labels=blank`);const bl2=await pg.evaluate(()=>({blank:__MR.blank(),step:__MR.step(),n:__MR.blanks().length,first:__MR.blanks()[0].shown}));
      res('T25',bl2.blank&&bl2.step===5&&bl2.n>=16&&bl2.first==='( 1 )',`${tag}: &labels=blank gave ${JSON.stringify(bl2)}`);
      await open(pg);}
    /* T26: Slow runs at half speed and is remembered on the device */
    {await pg.evaluate(()=>{__MR.setTeach(false);document.getElementById('revealed')&&document.querySelector('#revealed button').click();});
      const t1=await pg.evaluate(()=>__MR.timing().dur[1]);await pg.click('#slow');const t2=await pg.evaluate(()=>({d:__MR.timing().dur[1],p:document.getElementById('slow').getAttribute('aria-pressed'),beat3:__MR.timing().beats[3],seatsAt:__MR.timing().pairs.seatsAt,starts:__MR.timing().colonies.starts}));
      await go(pg,0);const t0=Date.now();await pg.evaluate(()=>__MR.goStep(1));await settle(pg);const took=Date.now()-t0;
      await pg.reload({waitUntil:'load'});await pg.waitForFunction(()=>window.__MR&&window.__MR.fig());const kept=await pg.evaluate(()=>({slow:__MR.slow(),p:document.getElementById('slow').getAttribute('aria-pressed'),fig:__MR.fig()}));
      await pg.click('#slow');const off=await pg.evaluate(()=>__MR.slow());
      const ok=t2.d===t1*2&&t2.p==='true'&&t2.beat3.from===800&&t2.beat3.to===4200&&t2.seatsAt===4200&&t2.starts.every((s,i)=>s===timing.colonies.starts[i]*2)&&took>=2*t1-200&&kept.slow&&kept.p==='true'&&kept.fig==='cloning'&&!off;
      res('T26',ok,`${tag}: dur1 ${t1}->${t2.d} pressed=${t2.p} beat3=${JSON.stringify(t2.beat3)} seatsAt=${t2.seatsAt} starts=${t2.starts} step1 took ${took}ms kept=${JSON.stringify(kept)} off=${off}`);note('T26',`${tag}: step 1 took ${took} ms at half speed (${t1} ms at full); the beat, the seating time and the colony starts double with it`);}
    /* T8: reduced motion */
    await ctx.close();
    {const {ctx:c2,pg:p2}=await fresh(br,vp,{reducedMotion:'reduce'});await open(p2);
      const red=await p2.evaluate(()=>__MR.reduced());let anims=0,capOk=true;
      await go(p2,0);const caps=await p2.evaluate(()=>__MR.captions());
      for(let k=1;k<=N;k++){await p2.evaluate(k=>__MR.goStep(k),k);anims+=await p2.evaluate(()=>document.getAnimations().filter(a=>a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('#stage')).length);await settle(p2);
        const t=await p2.evaluate(()=>document.querySelector('#card').textContent);if(!t.includes(caps[k-1]))capOk=false;
        const stageCap=await p2.evaluate(k=>__MR.el(k<=3?'lg'+k:k===4?'h4':'closing').opacity,k);if(stageCap<0.99)capOk=false;}
      await sleep(1700);   /* reduced motion holds the focus dim for 1.5 s after a step and then releases it; read the placed parts after that */
      const placed=await p2.evaluate(()=>({ins:__MR.el('ins').transform,plas:__MR.el('plas').transform,col:__MR.el('col0').transform,seals:__MR.el('seal1').opacity}));
      const w2=await walkT2(p2,tag+' reduced');
      res('T8',red&&anims===0&&capOk&&/translate\(0px, 0px\)/.test(placed.ins)&&/translate\(0px, 0px\)/.test(placed.plas)&&!/scale\(0\.15\)/.test(placed.col)&&placed.seals>0.99&&w2.ok,`${tag}: reduced=${red} stage animations during transitions=${anims} captions intact=${capOk} placed=${JSON.stringify(placed)} ${w2.why}`);
      note('T8',`${tag}: reduced motion: no stage animation in any transition; the travellers and the colonies are placed, not moved; captions intact`);
      await c2.close();}
    /* T11: storage throws */
    {const {ctx:c3,pg:p3}=await fresh(br,vp);
      await p3.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('storage blocked');}});});
      await open(p3);const ok=await p3.evaluate(()=>__MR.fig()==='cloning'&&!!document.querySelector('#stage svg')&&document.querySelectorAll('#dots button').length===5);
      const w3=await walkT2(p3,tag+' no-storage');res('T11',ok&&w3.ok,`${tag}: renders=${ok} ${w3.why}`);await c3.close();}
  }
  await t32(br,'cloning');
  /* T27: Fill screen on a 16:9 frame: the stage and the panel use the whole height */
  {const {ctx,pg}=await fresh(br,{width:1920,height:1080});await open(pg);await go(pg,3);await pg.click('#fill');await sleep(300);
    const m=await pg.evaluate(()=>{const s=document.querySelector('#stage svg').getBoundingClientRect(),b=document.getElementById('build').getBoundingClientRect(),c=document.getElementById('card').getBoundingClientRect();
      return {svgH:Math.round(s.height),svgW:Math.round(s.width),buildH:Math.round(b.height),cardW:Math.round(c.width),cardRight:Math.round(c.right),sw:document.documentElement.scrollWidth,iw:window.innerWidth,ih:window.innerHeight};});
    await pg.click('#fill');
    res('T27',m.svgH>=0.72*m.ih&&m.buildH>=0.95*m.ih&&m.cardW>=300&&m.cardRight<=m.iw&&m.sw<=m.iw,`1920x1080 fill: ${JSON.stringify(m)}`);note('T27',`1920x1080 fill: stage ${m.svgW}x${m.svgH} of ${m.iw}x${m.ih}, panel ${m.cardW} px wide`);await ctx.close();}
  /* T3: the one real visual test, at 1600 px wide so it lines up with the 1600 px reference (the unchanged still, D12). DE is the still's wording;
     SOL is shot too, for the record. The throbbing ring on the next control sits just under the stage and its halo can reach the clip's last row
     at some phases, so it is stilled for the shot */
  {const {ctx,pg}=await fresh(br,{width:1700,height:1200});await open(pg);await pg.evaluate(()=>__MR.setLevel('de'));
    await pg.addStyleTag({content:'.next::after{display:none!important}.build{display:block!important}.stagerow{max-width:none!important;margin:0!important}.stage{width:1600px!important;height:1000px!important;border:none!important;border-radius:0!important}.stage svg{width:1600px!important;height:1000px!important}.wrap{max-width:none!important;padding:0!important}'});
    await go(pg,4);await go(pg,5);await pg.evaluate(()=>document.fonts.ready);await sleep(400);
    const r=await pg.evaluate(()=>{const b=document.querySelector('#stage svg').getBoundingClientRect();return {x:b.x+window.scrollX,y:b.y+window.scrollY};});
    const clip={x:Math.round(r.x),y:Math.round(r.y),width:1600,height:1000};
    await pg.screenshot({path:`${OUT}/T3-cloning-final-step.png`,clip,fullPage:true});
    await pg.evaluate(()=>__MR.setLevel('sol'));await sleep(400);await pg.screenshot({path:`${OUT}/T3-cloning-final-step-sol.png`,clip,fullPage:true});
    await ctx.close();}
  await br.close();
  /* T12 */
  const errs=consoleErrs.filter(e=>!/fonts\.g(oogleapis|static)\.com/.test(e));
  res('T12',errs.length===0,`console: ${errs.slice(0,3).join(' || ')}`);
  R.T28='N/A';NOTE.T28='transport only: no protein on cloning moves two ions in opposite directions';
  R.T29='N/A';NOTE.T29='etc only: no proton crowd on cloning';
  R.T30='N/A';NOTE.T30='rtk only: no phosphates cross on cloning';
  R.T31='N/A';NOTE.T31='rtk only: no relays dock on cloning';
  fs.writeFileSync(`${OUT}/results-cloning.json`,JSON.stringify({R,NOTE},null,1));
  for(let i=1;i<=35;i++){const t='T'+i;console.log(t,R[t]===true?'PASS':R[t]===false?'FAIL':R[t]||'not run',NOTE[t]?' -- '+NOTE[t]:'');}
})().catch(e=>{console.error(e);process.exit(1);});
