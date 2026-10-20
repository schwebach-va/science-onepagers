/* Acceptance tests for the Mechanism Reel, Phase 2 figure 5: rtk, per §7 of the brief plus T21-T27 and T30-T31.
   A copy of mechanism-reel-tests-etc.js with rtk's own travellers, one beat, labels, closing state and end screen.
   T19 is per phosphate (D3): each of the six ATP has docked before its own phosphate leaves it. T20 applies for the
   first time (D8): the already-paired note is on the still and is the DE closing state. T24 is N/A (no run-on and
   no counter, D11); T28 and T29 are N/A (transport's pump, etc's crowd). New T30 (D2): every phosphate's tween starts
   at the opposite half's kinase domain and ends on the target tail. New T31 (D4): no relay moves before the
   phosphotyrosine it seats on exists. T32 (Part B, B1): the reel is on the first screen when a link names a figure.
   Programmatic assertions throughout; the only screenshot is T3 (plus one per FAIL).
   T3's comparison: python3 t3-compare-rtk.py after this run (writes the two-up image). */
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const OUT=__dirname;  /* screenshots and results-rtk.json land here */
const BASE='http://127.0.0.1:8765/biology/tools/mechanism-reel.html';
const URL=BASE+'?anim=rtk';
const KEYS=['gpcr','rtk','transport','etc','dogma','cloning'];
const ENABLED={gpcr:true,rtk:true,dogma:true,transport:true,etc:true,cloning:true};   /* all six are built; nothing is a placeholder */
const N=4;
const TITLES=['A receptor that never lets the signal in','Two halves, then several answers at once','Downhill is free. Uphill is paid for.','Electrons buy a gradient. The gradient buys the ATP.','One message, written out and then read aloud','Cut both with one enzyme and the ends fit'];
const BRIDGES=['A different kind of receptor answers in more than one way at once.','Both of those end in things moving across a membrane.','Moving things uphill runs on ATP. Here is where the ATP comes from.','A signal can also reach all the way to the genes.','And here is how we borrow that machinery ourselves.'];
const NOTE_TEXT='Some of these receptors are already paired';
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
const STRIP=/©\s*2026|Lemmon & Schlessinger 2010|Zuo 2026|Bio Tool #24|DE BIO 101|Unit 5|DE Bio 101 Unit 5/gi;
const rectOf=id=>{const e=document.querySelector('#stage #'+id);const r=e.getBoundingClientRect();return [Math.round(r.x),Math.round(r.y)];};
const rectsOf=ids=>Object.fromEntries(ids.map(id=>[id,(e=>{const r=e.getBoundingClientRect();return [Math.round(r.x),Math.round(r.y)];})(document.querySelector('#stage #'+id))]));
/* an element's centre in the still's user units (1600 wide), from its rendered rect */
const CENTRE_SRC=`const centreOf=id=>{const svg=document.querySelector('#stage svg');const sb=svg.getBoundingClientRect();const k=1600/sb.width;const r=document.querySelector('#stage #'+id).getBoundingClientRect();return [+((r.x+r.width/2-sb.x)*k).toFixed(1),+((r.y+r.height/2-sb.y)*k).toFixed(1)];};`;
const centresOf=new Function('ids',CENTRE_SRC+'return ids.map(centreOf);');
/* the first phosphate's offset from the pentagon it rides under: zero while the ATP carries it, non-zero once it has left */
const phRel=new Function(CENTRE_SRC+"const a=centreOf('ph0'),b=centreOf('adp0');return [Math.round(a[0]-b[0]),Math.round(a[1]-b[1])];");
const centreOf=id=>{const svg=document.querySelector('#stage svg');const sb=svg.getBoundingClientRect();const k=1600/sb.width;const r=document.querySelector('#stage #'+id).getBoundingClientRect();return [+((r.x+r.width/2-sb.x)*k).toFixed(1),+((r.y+r.height/2-sb.y)*k).toFixed(1)];};
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
    /* T1: six deep links; all six open, and no selector entry is disabled (the placeholder branch below never fires now) */
    for(const k of KEYS){await open(pg,`${BASE}?fig=${k}`);const fig=await pg.evaluate(()=>__MR.fig());
      const info=await pg.evaluate(k=>{const f=__MR.figs().find(x=>x.key===k);const b=document.querySelector(`.selbtn[data-fig="${k}"]`);return {present:!!f,enabled:f&&f.enabled,btn:!!b,disabled:b&&b.disabled};},k);
      if(ENABLED[k]){res('T1',fig===k&&info.btn&&!info.disabled,`${tag}: ?fig=${k} gave ${fig}`);}
      else{res('T1',fig==='gpcr'&&info.present&&info.enabled===false&&info.btn&&info.disabled===true,`${tag}: ?fig=${k} entry present=${info.present} disabled=${info.disabled} fig=${fig}`);}}
    await open(pg,BASE);const dis=await pg.evaluate(()=>[...document.querySelectorAll('.selbtn')].filter(b=>b.disabled).map(b=>b.dataset.fig));
    res('T1',dis.length===0,`${tag}: selector entries still disabled: ${dis}`);   /* with cloning built there are no placeholders */
    await open(pg,BASE);await pg.click('.selbtn[data-fig="rtk"]');res('T1',(await pg.evaluate(()=>__MR.fig()))==='rtk',`${tag}: selector click on rtk`);
    /* per-step links; no level in the link (D5); no run-on, so the last step holds with no Play (D11); the closing state has its own link */
    await open(pg,`${BASE}?anim=rtk&step=3`);const s3=await pg.evaluate(()=>({step:__MR.step(),done:__MR.done(3),url:location.search,eyebrow:document.getElementById('eyebrow').textContent,coda:__MR.coda()}));
    res('T1',s3.step===3&&!s3.done&&/anim=rtk/.test(s3.url)&&/step=3/.test(s3.url)&&!/level=/.test(s3.url)&&/Bio Tool #24/.test(s3.eyebrow)&&!s3.coda,`${tag}: ?anim=rtk&step=3 gave ${JSON.stringify(s3)}`);
    await open(pg,`${BASE}?anim=rtk&step=4`);await sleep(600);
    const end=await pg.evaluate(()=>({step:__MR.step(),playing:__MR.playing(),count:__MR.loopCount(),playDisabled:document.getElementById('play').disabled,ring:[...document.querySelectorAll('.next')].map(e=>e.id),readout:__MR.readout(),counter:__MR.counter(),end:!!document.getElementById('endscreen'),coda:__MR.coda(),codaBtn:!!document.getElementById('codaBtn')}));
    res('T1',end.step===4&&!end.playing&&end.count===null&&end.playDisabled&&end.ring.length===1&&end.ring[0]==='codaBtn'&&end.readout===''&&end.counter===''&&end.end&&!end.coda&&end.codaBtn,`${tag}: ?anim=rtk&step=4 gave ${JSON.stringify(end)}`);
    await open(pg,`${BASE}?anim=rtk&coda=1`);await sleep(300);
    const cl=await pg.evaluate(()=>({step:__MR.step(),coda:__MR.coda(),url:location.search,line:!!document.querySelector('#coda .codaline'),busy:__MR.busy()}));
    res('T1',cl.step===4&&cl.coda&&/coda=1/.test(cl.url)&&cl.line,`${tag}: ?anim=rtk&coda=1 gave ${JSON.stringify(cl)}`);
    await pg.click('#back');await settle(pg);const cleared=await pg.evaluate(()=>({step:__MR.step(),coda:__MR.coda(),url:location.search}));
    res('T1',cleared.step===3&&!cleared.coda&&!/coda/.test(cleared.url),`${tag}: Back from the closing state gave ${JSON.stringify(cleared)}`);
    /* R6: the figure's sources are a visible line under the reel, and they follow the selected figure */
    const srcR=await pg.evaluate(sourcesLine,[['Lemmon & Schlessinger 2010','https://doi.org/10.1016/j.cell.2010.06.011'],['Zuo 2026','https://doi.org/10.1073/pnas.2602436123']]);
    await pg.evaluate(()=>__MR.setFig('transport'));const srcT=await pg.evaluate(sourcesLine,[['Skou 1957','https://doi.org/10.1016/0006-3002(57)90343-8']]);
    await pg.evaluate(()=>__MR.setFig('rtk'));
    res('T1',srcR.present&&srcR.visible&&!srcR.disclosed&&srcR.inBuild&&srcR.matches&&/^Sources: Lemmon & Schlessinger 2010 · Zuo 2026$/.test(srcR.text.trim())&&srcT.visible&&srcT.matches,`${tag}: sources line rtk=${JSON.stringify(srcR)} transport=${JSON.stringify(srcT)}`);
    note('T1',`${tag}: ?anim=rtk&step=n opens state n unlit with no level in the link; step 4 holds with Play disabled, no run-on and no counter, the ring on the closing-state button; &coda=1 opens the closing state; Back clears it; the sources line under the reel reads "${srcR.text.trim()}" and follows the figure (R6)`);
    /* T15: order and bridges; nothing disabled (opened with no ?anim=, since a link that names a figure folds the selector to one row, B1) */
    await open(pg,BASE);
    const selText=await pg.evaluate(()=>[...document.querySelectorAll('#sel > li')].map(l=>l.textContent.trim()));
    const titleIdx=TITLES.map(t=>selText.findIndex(s=>s.includes(t)));
    const ordered=titleIdx.every((v,i)=>v>=0&&(i===0||v>titleIdx[i-1]));
    const bridgesOk=BRIDGES.every((b,i)=>{const j=selText.findIndex(s=>s===b);return j===titleIdx[i]+1;});
    const soon=await pg.evaluate(()=>[...document.querySelectorAll('.selbtn')].filter(b=>b.disabled).map(b=>b.dataset.fig));
    const tags=await pg.evaluate(()=>[...document.querySelectorAll('.selbtn[data-fig="rtk"] .tag')].map(t=>t.textContent));
    const num=await pg.evaluate(()=>document.querySelector('.selbtn[data-fig="rtk"] .idnum').textContent);
    res('T15',ordered&&bridgesOk&&soon.length===0&&tags.join('|')==='Amplification'&&num==='Bio Tool #24',`${tag}: order ${JSON.stringify(titleIdx)} bridges ${bridgesOk} soon=${soon} tags=${tags} num=${num}`);
    /* T2 */
    const w=await walkT2(pg,tag);res('T2',w.ok,w.why);
    /* T4: every step, the closing state included; one level */
    let minPx=Infinity,minAt='';
    for(let i=0;i<=N;i++){await go(pg,i);const L=await pg.evaluate(()=>__MR.labels());L.forEach(l=>{if(l.px<minPx){minPx=l.px;minAt=`"${l.text.slice(0,30)}" step ${i}`;}});}
    await pg.evaluate(()=>__MR.setCoda(true));await settle(pg);{const L=await pg.evaluate(()=>__MR.labels());L.forEach(l=>{if(l.px<minPx){minPx=l.px;minAt=`"${l.text.slice(0,30)}" closing state`;}});}
    await pg.evaluate(()=>__MR.setCoda(false));await settle(pg);
    res('T4',minPx>=18,`${tag}: min label ${minPx}px (${minAt})`);note('T4',`${tag}: min label ${minPx} px at a 1000 px stage (${minAt}); no sub- or superscript runs on this figure`);
    /* T9: no level switch on rtk (D5), and the words do not change with the level */
    const capsSol=await pg.evaluate(()=>{__MR.setLevel('sol');return __MR.captions().join('|');});
    const capsDe=await pg.evaluate(()=>{__MR.setLevel('de');return __MR.captions().join('|');});
    const lvPresent=await pg.evaluate(()=>!!document.getElementById('levelrow')&&document.getElementById('levelrow').isConnected);
    const lvOnEtc=await pg.evaluate(()=>{__MR.setFig('etc');const on=!!document.getElementById('levelrow')&&document.getElementById('levelrow').isConnected;__MR.setFig('rtk');return on;});
    const lvBack=await pg.evaluate(()=>!!document.getElementById('levelrow')&&document.getElementById('levelrow').isConnected);
    const urlLv=await pg.evaluate(()=>location.search);
    res('T9',!lvPresent&&capsSol===capsDe&&lvOnEtc&&!lvBack&&!/level=/.test(urlLv),`${tag}: control present=${lvPresent} (etc: ${lvOnEtc}, back on rtk: ${lvBack}) captions same=${capsSol===capsDe} url=${urlLv}`);
    note('T9',`${tag}: level control absent on rtk (present on etc, gone again on return); the still's words at either level; no level in the link`);
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
    res('T6',endRing.length===1&&endRing[0]==='codaBtn',`${tag}: ring at final state ${JSON.stringify(endRing)}`);
    await pg.click('#codaBtn');await settle(pg);const codaRing=await pg.evaluate(()=>[...document.querySelectorAll('.next')].map(e=>e.id));
    res('T6',codaRing.length===1&&codaRing[0]==='blankBtn',`${tag}: ring in the closing state ${JSON.stringify(codaRing)}`);
    note('T6',`${tag}: the ring moves Next → Next → Next → Next → the closing-state button → Label it from memory`);
    /* a jump does not count as finishing */
    await pg.evaluate(()=>__MR.reset());await settle(pg);await go(pg,3);
    const jumpDone=await pg.evaluate(()=>({d:__MR.done(3),lit:document.querySelector('#dots button:nth-child(3)').classList.contains('done')}));
    res('T5',!jumpDone.d&&!jumpDone.lit,`${tag}: jumping to step 3 marked it done`);
    /* T14 + T17 + T18 + T19: forward transitions, sampled */
    await go(pg,0);const timing=await pg.evaluate(()=>__MR.timing());
    const badProps=new Set();let t17ok=true,t17why='',t18ok=true,t18why='',t19ok=true,t19why='';
    const trans=timing.trans,rel=timing.relays,pays=timing.pays,seq3=timing.seq[3],seq4=timing.seq[4];
    /* travellers, and the moment from which each must be visible: the stage-2 halves and each ATP appear as they set off */
    const travellers={1:[['ligA',0],['ligB',0]],2:[['h2L',seq3&&seq3.h2L?0:400],['h2R',400]],3:[],4:[]};
    trans.list.forEach(p=>{travellers[3].push([p.atp,seq3[p.atp].d+seq3[p.atp].dur/5+40],[p.ph,seq3[p.ph].d],[p.adp,seq3[p.adp].d]);});
    rel.list.forEach(r=>{travellers[4].push([r.relay,seq4[r.relay].d+seq4[r.relay].dur/5+40]);});
    /* T19 from the timing table, per phosphate (D3): every ATP has docked (paidAt = its travel's end) before its own phosphate leaves it,
       and every ADP leaves no earlier than that */
    if(!pays||pays.step!==3||!pays.each||pays.each.length!==6){t19ok=false;t19why=`${tag}: pays=${JSON.stringify(pays)}`;}
    else pays.each.forEach((p,i)=>{const a=seq3[p.atp],f=seq3[p.funds[0]],d=seq3['adp'+i];
      if(!a||!f||a.d+a.dur>p.paidAt||f.d<p.paidAt||(d&&d.d<p.paidAt)){t19ok=false;t19why+=` ${tag}: phosphate ${i}: ATP ${a&&a.d}-${a&&a.d+a.dur}, paidAt ${p.paidAt}, phosphate leaves at ${f&&f.d}, ADP at ${d&&d.d}`;}});
    const first=pays.each[0];let ph0Start=null,ph0Early=null,ph0Late=false,atp0Moved=false;
    for(let k=1;k<=N;k++){
      if(k===3){await go(pg,2);ph0Start=await pg.evaluate(phRel);}
      await pg.evaluate(k=>__MR.goStep(k),k);const t0=Date.now();const dur=timing.dur[k];
      const beat=timing.beats[k];const samples=[];let atp0Start=null;
      while(Date.now()-t0<dur+150){const el=Date.now()-t0;const A=await pg.evaluate(animProps);
        A.forEach(a=>a.props.forEach(p=>{if(p!=='transform'&&p!=='opacity')badProps.add(p+'@'+(a.id||a.pseudo||'?'));}));
        if(beat&&el>beat.from+60&&el<beat.to-120){A.filter(a=>a.inStage&&a.active).forEach(a=>{if(!beat.ids.includes(a.id)){t17ok=false;t17why=`${tag}: during beat ${k} (${beat.name}) ${a.id} was animating at ${el}ms`;}});}
        for(const [id,from] of travellers[k]||[]){if(el<from)continue;const o=await pg.evaluate(id=>__MR.el(id).opacity,id);if(o<0.05){t18ok=false;t18why=`${tag}: ${id} opacity ${o} at ${el}ms of transition ${k}`;}}
        if(k===3){const now=await pg.evaluate(phRel);const moved=Math.abs(now[0]-ph0Start[0])>1||Math.abs(now[1]-ph0Start[1])>1;
          if(el<first.paidAt-80&&moved&&ph0Early==null)ph0Early=`${el}ms`;if(el>first.paidAt+400&&moved)ph0Late=true;
          if(el>first.paidAt*0.5){const a=await pg.evaluate(centreOf,first.atp);if(!atp0Start)atp0Start=a;else if(Math.abs(a[0]-atp0Start[0])>2||Math.abs(a[1]-atp0Start[1])>2)atp0Moved=true;}}
        samples.push(A.length);await sleep(60);}
      await settle(pg);
      if(k===3){if(ph0Early){t19ok=false;t19why+=` ${tag}: the first phosphate moved before its ATP had docked: ${ph0Early}`;}
        if(!atp0Moved||!ph0Late){t19ok=false;t19why+=` ${tag}: sampling saw the first ATP move=${atp0Moved}, its phosphate move after the dock=${ph0Late}`;}}
      if(k===2||k===3){const moved=samples.some(n=>n>0);if(!moved)note('T14',`${tag}: no running animations were sampled in step ${k} (sampling too coarse?)`);}}
    res('T14',badProps.size===0,`${tag}: animated properties beyond transform/opacity: ${[...badProps].join(', ')}`);
    const d=timing.dur;res('T17',d[3]>d[2]&&d[3]>d[4]&&d[3]>d[1]&&timing.beats[3]&&!timing.beats[1]&&!timing.beats[2]&&!timing.beats[4]&&t17ok,`${tag}: dur=${JSON.stringify(d)} beats=${Object.keys(timing.beats)} ${t17why}`);
    note('T17',`${tag}: step durations ms ${JSON.stringify(d.slice(1))}; the one beat is step 3 (${timing.beats[3].name}, ${timing.beats[3].from}-${timing.beats[3].to} ms); nothing else moved inside it; the closing state takes ${timing.coda.dur} ms`);
    res('T18',t18ok,t18why);
    res('T19',t19ok,t19why);
    note('T19',`${tag}: six ATP, one per phosphate: ${pays.each.map((p,i)=>`ATP ${i} docks at ${p.paidAt}, its phosphate leaves at ${seq3[p.funds[0]].d}`).join('; ')}; sampled: the first phosphate stayed under its ATP until ${first.paidAt} ms and left it after`);
    /* T30 (D2): each phosphate on one half's tail comes from the other half. From the table: the ATP it leaves docks at the far side of the
       midline from its target. Sampled: just before each phosphate's tween starts, its centre x is on the far side of the midline; at the
       end of the step it sits on its target tail at the still's x. Sides alternate */
    {let ok=true,why='';const mid=trans.mid;const order=trans.list.slice().sort((a,b)=>seq3[a.ph].d-seq3[b.ph].d);
      order.forEach(p=>{const far=p.side==='L'?p.fromX>mid:p.fromX<mid;const tgt=p.side==='L'?p.targetX<mid:p.targetX>mid;if(!far||!tgt){ok=false;why+=` ${tag}: ${p.ph} table: from x ${p.fromX} target x ${p.targetX} mid ${mid}`;}});
      const sides=order.map(p=>p.side).join('');if(!/^(LR){3}$|^(RL){3}$/.test(sides)){ok=false;why+=` ${tag}: sides do not alternate: ${sides}`;}
      await go(pg,2);await pg.evaluate(()=>__MR.goStep(3));const t0=Date.now();const seen=[];
      for(const p of order){const at=seq3[p.ph].d-45;while(Date.now()-t0<at)await sleep(5);const c=await pg.evaluate(centreOf,p.ph);
        const far=p.side==='L'?c[0]>mid+10:c[0]<mid-10;if(!far){ok=false;why+=` ${tag}: ${p.ph} at ${Date.now()-t0}ms sits at x ${c[0]}, not on the far side of ${mid} from its ${p.side} target`;}seen.push([p.ph,c[0]]);}
      await settle(pg);const ends=await pg.evaluate(centresOf,order.map(p=>p.ph));
      order.forEach((p,i)=>{if(Math.abs(ends[i][0]-p.targetX)>2){ok=false;why+=` ${tag}: ${p.ph} ended at x ${ends[i][0]}, target ${p.targetX}`;}});
      res('T30',ok,why);
      note('T30',`${tag}: midline x ${mid}; ${seen.map(([id,x],i)=>`${id} left x ${x} for the ${order[i].side==='L'?'left':'right'} tail at ${order[i].targetX}`).join('; ')}; sides ${sides}`);
      if(!ok)await shot(pg,`FAIL-T30-rtk-${tag}`);}
    /* T31 (D4): no relay moves before its phosphotyrosine exists. From the table: every relay's first transition starts after stage 4's
       phosphotyrosines are shown (the panel's fade has ended) and after the last phosphate of step 3 has landed (step 3 is over before step 4
       begins, and its last landing is inside step 3). Sampled: at the moment the first relay sets off, every stage-4 phosphate is fully
       shown and all six of step 3's phosphates sit on their tails; no relay has moved before its own start */
    {let ok=true,why='';const panel=seq4[rel.panel];const panelShown=panel.d+panel.dur;
      rel.list.forEach(r=>{const q=seq4[r.relay];if(!q||q.d<panelShown){ok=false;why+=` ${tag}: ${r.relay} starts at ${q&&q.d}, stage 4's phosphates are shown by ${panelShown}`;}});
      if(rel.lastPhosphateLandsAt>timing.dur[3]){ok=false;why+=` ${tag}: the last phosphate lands at ${rel.lastPhosphateLandsAt}, after step 3 ends at ${timing.dur[3]}`;}
      const firstGo=Math.min(...rel.list.map(r=>seq4[r.relay].d));
      await go(pg,3);const tyrs=await pg.evaluate(()=>['tyr0','tyr1','tyr2','tyr3','tyr4','tyr5'].map(id=>__MR.el(id).opacity));
      const phEnd=await pg.evaluate(centresOf,trans.list.map(p=>p.ph));
      const relStart=await pg.evaluate(rectsOf,rel.list.map(r=>r.relay));
      await pg.evaluate(()=>__MR.goStep(4));const t0=Date.now();
      while(Date.now()-t0<firstGo-30)await sleep(5);
      const atGo=await pg.evaluate(ids=>({panel:__MR.el('p4').opacity,rel:Object.fromEntries(ids.map(id=>[id,(e=>{const r=e.getBoundingClientRect();return [Math.round(r.x),Math.round(r.y)];})(document.querySelector('#stage #'+id))]))}),rel.list.map(r=>r.relay));
      await settle(pg);
      const relMoved=rel.list.filter(r=>Math.abs(atGo.rel[r.relay][0]-relStart[r.relay][0])>1||Math.abs(atGo.rel[r.relay][1]-relStart[r.relay][1])>1);
      if(tyrs.some(o=>o<0.99)){ok=false;why+=` ${tag}: at the end of step 3 a phosphotyrosine is not shown: ${tyrs}`;}
      trans.list.forEach((p,i)=>{if(Math.abs(phEnd[i][0]-p.targetX)>2){ok=false;why+=` ${tag}: ${p.ph} not on its tail at the end of step 3 (x ${phEnd[i][0]})`;}});
      if(atGo.panel<0.99){ok=false;why+=` ${tag}: stage 4's phosphates at opacity ${atGo.panel} when the first relay set off`;}
      if(relMoved.length){ok=false;why+=` ${tag}: ${relMoved.map(r=>r.relay).join(',')} had moved before the first relay's start`;}
      res('T31',ok,why);
      note('T31',`${tag}: stage 4's six phosphotyrosines are shown by ${panelShown} ms of step 4; the relays set off at ${rel.list.map(r=>seq4[r.relay].d).join(', ')} ms; step 3's last phosphate landed at ${rel.lastPhosphateLandsAt} ms of step 3 (${timing.dur[3]} ms long); sampled: all six step-3 phosphates on their tails and the stage-4 panel at opacity ${atGo.panel} when the first relay set off`);
      if(!ok)await shot(pg,`FAIL-T31-rtk-${tag}`);}
    /* T16: no counts or orders of magnitude at any step, the closing state included; no counter (D11). The relays are lettered, not numbered */
    const numRe=/\b\d+\s*(x|×|fold|times|molecules?|ions?|copies|thousand|million|billion|per)\b|10\^|10[⁰¹²³⁴⁵⁶⁷⁸⁹]|\d+,\d{3}|\d+e\d|\b\d{4,}\b(?!\s*(J\.|·|,))|\b\d{2,3}\b(?!\s*(of|%|J\.))/i;
    let t16ok=true,t16why='';
    for(let i=0;i<=N;i++){await go(pg,i);const txt=await pg.evaluate(()=>__MR.text());const m=txt.replace(STRIP,'').match(numRe);
      if(m){t16ok=false;t16why=`${tag}: step ${i} text has "${m[0]}"`;break;}
      if(i===N){const c=await pg.evaluate(()=>({counter:__MR.counter(),loop:__MR.loopCount()}));if(c.counter!==''||c.loop!==null){t16ok=false;t16why=`${tag}: counter="${c.counter}" loop=${JSON.stringify(c.loop)}`;}
        await pg.evaluate(()=>__MR.setCoda(true));await settle(pg);const t2=await pg.evaluate(()=>__MR.text());const m2=t2.replace(STRIP,'').match(numRe);if(m2){t16ok=false;t16why=`${tag}: closing state text has "${m2[0]}"`;}
        await pg.evaluate(()=>__MR.setCoda(false));await settle(pg);}}
    res('T16',t16ok,t16why);note('T16',`${tag}: no count or order of magnitude at any step or in the closing state; no counter (D11); six ATP are shown, not counted; the digits on screen are the step numbers`);
    /* T13: Teaching view and Fill screen */
    await go(pg,1);
    await pg.click('#teach');const tv=await pg.evaluate(()=>({pressed:document.getElementById('teach').getAttribute('aria-pressed'),teach:__MR.teach(),caps:[...document.querySelectorAll('#card .cap')].filter(c=>c.getBoundingClientRect().height>0).length,prompt:!!document.querySelector('#predict')}));
    await pg.click('#teach');
    await pg.click('#fill');const fv=await pg.evaluate(()=>({attr:document.documentElement.getAttribute('data-fill'),fill:__MR.fill(),introHidden:getComputedStyle(document.getElementById('intro')).display==='none',label:document.getElementById('fill').textContent}));
    await pg.click('#fill');const fv2=await pg.evaluate(()=>document.documentElement.getAttribute('data-fill'));
    res('T13',tv.pressed==='true'&&tv.teach&&tv.caps===N&&!tv.prompt&&fv.attr==='1'&&fv.fill&&fv.introHidden&&fv.label==='Restore page'&&fv2==='0',`${tag}: teach=${JSON.stringify(tv)} fill=${JSON.stringify(fv)} after=${fv2}`);
    /* T10: no horizontal overflow, every step and the closing state */
    let ovf=true,ovfWhy='';for(let i=0;i<=N;i++){await go(pg,i);const o=await pg.evaluate(()=>({sw:document.documentElement.scrollWidth,iw:window.innerWidth}));if(o.sw>o.iw){ovf=false;ovfWhy=`${tag}: step ${i} scrollWidth ${o.sw} > ${o.iw}`;}}
    await pg.evaluate(()=>__MR.setCoda(true));await settle(pg);{const o=await pg.evaluate(()=>({sw:document.documentElement.scrollWidth,iw:window.innerWidth}));if(o.sw>o.iw){ovf=false;ovfWhy=`${tag}: closing state scrollWidth ${o.sw} > ${o.iw}`;}}
    await pg.evaluate(()=>__MR.setCoda(false));await settle(pg);
    res('T10',ovf,ovfWhy);
    if(R.T10===false)await shot(pg,`FAIL-T10-rtk-${tag}`);
    /* T21: focus on the active step: scaled movers, dimmed rest, settled after. During step 3 the first phosphate and ADP scale, stage 1 dims to half,
       the dimer being phosphorylated holds at full (it is kept, not dimmed), and the phosphorylated tyrosine shows only when its phosphate lands */
    {await go(pg,2);await pg.evaluate(()=>__MR.goStep(3));await sleep(700);
      const mid=await pg.evaluate(()=>({f:__MR.focus(),live:!!document.querySelector('#card .cap.live'),h1:__MR.el('h1L').opacity,t1:__MR.el('t1').opacity,p3:__MR.el('p3').opacity,tyr0:__MR.el('tyr0').opacity,pool:__MR.el('atpPool').opacity}));
      await sleep(1550);const landed=await pg.evaluate(()=>({tyr0:__MR.el('tyr0').opacity,tyr1:__MR.el('tyr1').opacity}));   /* ~2.25 s: tyr0's fade ended at 2090, tyr1's starts at 2540 */
      await settle(pg);await sleep(450);const after=await pg.evaluate(()=>({f:__MR.focus(),live:!!document.querySelector('#card .cap.live'),h1:__MR.el('h1L').opacity,t1:__MR.el('t1').opacity,tyr:[0,1,2,3,4,5].map(i=>__MR.el('tyr'+i).opacity)}));
      const near=(a,b)=>Math.abs(a-b)<0.03;
      const ok=mid.f.live&&mid.f.scaled.includes('ph0')&&mid.f.scaled.includes('adp0')&&mid.f.scaled.length>=12&&mid.f.dimmedCount>12&&near(mid.h1,0.5)&&near(mid.t1,0.5)&&near(mid.p3,1)&&near(mid.pool,1)&&mid.tyr0<0.03&&mid.live
        &&landed.tyr0>0.97&&landed.tyr1<0.03&&!after.f.live&&after.f.scaled.length===0&&after.f.dimmedCount===0&&near(after.h1,1)&&near(after.t1,1)&&after.tyr.every(o=>o>0.97)&&!after.live;
      res('T21',ok,`${tag}: mid=${JSON.stringify({scaled:mid.f.scaled.length,dimmed:mid.f.dimmedCount,h1:mid.h1,t1:mid.t1,p3:mid.p3,tyr0:mid.tyr0,live:mid.live})} landed=${JSON.stringify(landed)} after=${JSON.stringify({scaled:after.f.scaled,dimmed:after.f.dimmedCount,h1:after.h1,tyr:after.tyr})}`);
      note('T21',`${tag}: during step 3, ${mid.f.scaled.length} parts scaled and ${mid.f.dimmedCount} of ${mid.f.topCount} drawing parts dimmed; the dimer held at full while the first phosphate crossed; the first phosphorylated tyrosine showed only when its phosphate landed (at 2.25 s it was on, the second still off)`);}
    /* T22: committed predictions: 2-3 buttons of 44 px, Next never blocked, "You predicted" beside "What happened" */
    {await pg.evaluate(()=>__MR.reset());await settle(pg);
      const b=await pg.evaluate(()=>[...document.querySelectorAll('#predict .choices .opt')].map(x=>({t:x.textContent,h:x.getBoundingClientRect().height})));
      await pg.click('#next');await settle(pg);const noChoice=await pg.evaluate(()=>({step:__MR.step(),line:(document.getElementById('predline')||{}).textContent||''}));
      const b2=await pg.evaluate(()=>[...document.querySelectorAll('#predict .choices .opt')].length);
      await pg.click('#predict .choices .opt:nth-child(2)');const pressed=await pg.evaluate(()=>document.querySelector('#predict .choices .opt:nth-child(2)').getAttribute('aria-pressed'));
      await pg.click('#next');await settle(pg);const withChoice=await pg.evaluate(()=>({step:__MR.step(),pred:__MR.pred(2),line:(document.getElementById('predline')||{}).textContent||'',stored:(()=>{try{return JSON.parse(localStorage.getItem('mechreel')).per.rtk.pred['2'];}catch(e){return 'err';}})()}));
      const teach=await pg.evaluate(()=>{__MR.setTeach(true);const n=document.querySelectorAll('#card .opt').length;__MR.setTeach(false);return n;});
      const counts=await pg.evaluate(()=>{const out=[];for(let k=1;k<=4;k++)out.push(__MR.choices(k).length);return out;});
      const ok=b.length>=2&&b.length<=3&&b.every(x=>x.h>=44)&&noChoice.step===1&&/What happened/.test(noChoice.line)&&!/You predicted/.test(noChoice.line)&&b2>=2&&pressed==='true'&&withChoice.step===2&&withChoice.pred===1&&/You predicted: One half passes the signal inside on its own/.test(withChoice.line)&&/What happened/.test(withChoice.line)&&withChoice.stored===1&&teach===0&&counts.every(n=>n>=2&&n<=3);
      res('T22',ok,`${tag}: buttons=${JSON.stringify(b)} noChoice=${JSON.stringify(noChoice)} pressed=${pressed} withChoice=${JSON.stringify(withChoice)} teachButtons=${teach} counts=${counts}`);
      /* D10: step 1 has the signal entering the cell; step 3 has each half phosphorylating itself; step 4 has the relays carrying the signal in */
      const d10=await pg.evaluate(()=>({one:__MR.choices(1).some(c=>/^Inside the cell/.test(c)),three:__MR.choices(3).some(c=>/^Its own tail/.test(c)),four:__MR.choices(4).some(c=>/^Carry the signal molecule into the cell/.test(c))}));
      res('T22',d10.one&&d10.three&&d10.four,`${tag}: D10 choices ${JSON.stringify(d10)}`);}
    /* T23: labelled when it happens: "Two separate halves" at step 1, "One dimer" at 2, "ATP > ADP" at 3, the relay names, the responses, the green box, the closing line
       and the already-paired note at 4; "Signal", "Outside the cell" and "Cytosol" always */
    {let ok=true,why='';const WANT={t1:1,t2:2,lblAtp:3,arrAtp:3,lblRelA:4,lblRelB:4,lblRelC:4,lblRespA:4,lblRespB:4,lblRespC:4,box4:4,closing:4,note1:4,note2:4,lblSig:0,lblOut:0,lblCyt:0};
      for(let i=0;i<=N&&ok;i++){await go(pg,i);await sleep(400);const o=await pg.evaluate(ids=>Object.fromEntries(ids.map(id=>[id,__MR.el(id)?__MR.el(id).opacity:null])),Object.keys(WANT));
        for(const id in WANT){const want=i>=WANT[id]?1:0;if(o[id]==null||Math.abs(o[id]-want)>0.03){ok=false;why=`${tag}: step ${i} ${id}=${o[id]} wanted ${want}`;break;}}}
      res('T23',ok,why);}
    /* T24: the amplification counter is gpcr's. rtk has no run-on and no counter (D11): the last step holds, Play is disabled, and nothing keeps moving */
    {await go(pg,4);await sleep(1500);const c=await pg.evaluate(()=>({counter:__MR.counter(),loop:__MR.loopCount(),readout:__MR.readout(),playing:__MR.playing(),playDisabled:document.getElementById('play').disabled,anims:document.getAnimations().filter(a=>a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('#stage')).length,text:__MR.text()}));
      const ok=c.counter===''&&c.loop===null&&c.readout===''&&!c.playing&&c.playDisabled&&c.anims===0&&!numRe.test(c.text.replace(STRIP,''));
      if(ok){R.T24='N/A';NOTE.T24=`${tag}: no run-on and no counter on rtk (D11); the last step holds still with Play disabled and no number on screen`;}else res('T24',false,`${tag}: ${JSON.stringify({counter:c.counter,loop:c.loop,readout:c.readout,playing:c.playing,playDisabled:c.playDisabled,anims:c.anims})}`);}
    /* T20 (D8): the already-paired note is on the still and is the closing state. The note's two lines are on the stage at the last step; the closing-state
       button opens an uncounted state in which stage 1's two halves have moved together, the two signals have moved away from them, the arrowheads and
       "Two separate halves" are gone, the card carries the one line, and no fifth dot exists; Back to the four steps restores everything */
    {await go(pg,4);const before=await pg.evaluate(()=>{const ro=id=>{const sb=document.querySelector('#stage svg').getBoundingClientRect();const r=document.querySelector('#stage #'+id).getBoundingClientRect();return [Math.round(r.x-sb.x),Math.round(r.y-sb.y)];};return {note:document.querySelector('#stage #note1').textContent+' '+document.querySelector('#stage #note2').textContent,noteO:__MR.el('note1').opacity,h1L:ro('h1L'),h1R:ro('h1R'),ligA:ro('ligA'),ligB:ro('ligB'),dots:document.querySelectorAll('#dots button').length,btn:!!document.getElementById('codaBtn'),card:document.getElementById('card').textContent};});
      await pg.click('#codaBtn');const during=await pg.evaluate(()=>({busy:__MR.busy(),coda:__MR.coda(),line:(document.querySelector('#coda .codaline')||{}).textContent||'',off:!!document.getElementById('codaOff')}));await settle(pg);await sleep(400);
      const on=await pg.evaluate(()=>{const ro=id=>{const sb=document.querySelector('#stage svg').getBoundingClientRect();const r=document.querySelector('#stage #'+id).getBoundingClientRect();return [Math.round(r.x-sb.x),Math.round(r.y-sb.y)];};return {coda:__MR.coda(),step:__MR.step(),url:location.search,h1L:ro('h1L'),h1R:ro('h1R'),ligA:ro('ligA'),ligB:ro('ligB'),arrA:__MR.el('arrA').opacity,t1:__MR.el('t1').opacity,noteO:__MR.el('note1').opacity,
        line:(document.querySelector('#coda .codaline')||{}).textContent||'',label:(document.querySelector('#coda .sub')||{}).textContent||'',off:!!document.getElementById('codaOff'),dots:document.querySelectorAll('#dots button').length,done4:__MR.done(4),focus:__MR.focus(),end:!!document.getElementById('endscreen'),stageText:document.getElementById('stage').textContent};});
      await pg.click('#codaOff');await settle(pg);
      const back=await pg.evaluate(()=>{const ro=id=>{const sb=document.querySelector('#stage svg').getBoundingClientRect();const r=document.querySelector('#stage #'+id).getBoundingClientRect();return [Math.round(r.x-sb.x),Math.round(r.y-sb.y)];};return {coda:__MR.coda(),url:location.search,h1L:ro('h1L'),ligA:ro('ligA'),arrA:__MR.el('arrA').opacity,t1:__MR.el('t1').opacity,btn:!!document.getElementById('codaBtn')};});
      const dx=(a,b)=>b[0]-a[0],dy=(a,b)=>b[1]-a[1];
      const scale=await pg.evaluate(()=>document.querySelector('#stage svg').getBoundingClientRect().width/1600);
      const ok=/already paired/.test(before.note)&&before.noteO>0.97&&before.btn&&!/already paired before the signal arrives\. The signal/.test(before.card)&&before.dots===4
        &&during.coda&&/already paired/.test(during.line)&&!during.off
        &&on.coda&&on.step===4&&/coda=1/.test(on.url)&&dx(before.h1L,on.h1L)>20*scale&&dx(before.h1R,on.h1R)<-20*scale&&dy(before.ligA,on.ligA)<-24*scale&&dy(before.ligB,on.ligB)<-24*scale&&dx(before.ligA,on.ligA)<-18*scale&&dx(before.ligB,on.ligB)>18*scale
        &&on.arrA<0.03&&on.t1<0.03&&on.noteO>0.97&&/already paired before the signal arrives/.test(on.line)&&/reshapes a pair that already exists/.test(on.line)&&on.label==='Some receptors are already paired'&&on.off&&on.dots===4&&!on.focus.live&&on.end&&/already paired/.test(on.stageText)
        &&!back.coda&&!/coda/.test(back.url)&&back.h1L[0]===before.h1L[0]&&back.ligA[1]===before.ligA[1]&&back.arrA>0.97&&back.t1>0.97&&back.btn;
      res('T20',ok,`${tag}: before=${JSON.stringify({note:before.note.slice(0,50),noteO:before.noteO,btn:before.btn,dots:before.dots})} during=${JSON.stringify(during)} on=${JSON.stringify({coda:on.coda,url:on.url,h1L:[before.h1L,on.h1L],h1R:[before.h1R,on.h1R],ligA:[before.ligA,on.ligA],arrA:on.arrA,t1:on.t1,label:on.label,line:on.line.slice(0,60),off:on.off,dots:on.dots,focusLive:on.focus.live})} back=${JSON.stringify(back)}`);
      note('T20',`${tag}: the note "${before.note}" is on the still at step 4; the closing state (button "${on.label}", uncounted: still four dots) moves stage 1's halves together by ${Math.round(dx(before.h1L,on.h1L)/scale)} and ${Math.round(dx(before.h1R,on.h1R)/scale)} units, lifts the two signals off them, hides the arrowheads and "Two separate halves", and says: "${on.line}"; Back to the four steps restores the still`);
      if(!ok)await shot(pg,`FAIL-T20-rtk-${tag}`);}
    /* T25: the end screen: free text kept on the device, the misconception check, and label-it-from-memory */
    {await go(pg,4);const es=await pg.evaluate(()=>({end:!!document.getElementById('endscreen'),ta:!!document.getElementById('explain'),q:[...document.querySelectorAll('#endscreen .q')].map(e=>e.textContent).join('|'),yn:[...document.querySelectorAll('#enterRow .opt')].map(b=>b.textContent),blank:!!document.getElementById('blankBtn'),ans:!!document.getElementById('enterAnswer')}));
      await pg.fill('#explain','One bound pair carries six phosphates, and each phosphate is a different docking site, so several relays start at once.');
      await pg.click('#enterRow .opt:nth-child(2)');
      const after=await pg.evaluate(()=>({ans:(document.getElementById('enterAnswer')||{}).textContent||'',enter:__MR.enter(),stored:(()=>{try{const p=JSON.parse(localStorage.getItem('mechreel')).per.rtk;return {e:p.explain,n:p.enter};}catch(e){return null;}})()}));
      await pg.evaluate(()=>__MR.setCoda(true));await settle(pg);   /* from the closing state, so the blank still clears it */
      await pg.click('#blankBtn');await sleep(200);
      const bl=await pg.evaluate(()=>({blank:__MR.blank(),coda:__MR.coda(),shown:__MR.blanks().map(b=>b.shown),n:__MR.blanks().length,url:location.search,reveal:!!document.getElementById('reveal'),ring:[...document.querySelectorAll('.next')].map(e=>e.id),legend:__MR.el('lg3').opacity,closing:__MR.el('closing').opacity,note:__MR.el('note1').opacity,playDisabled:document.getElementById('play').disabled,h1L:document.querySelector('#stage #h1L').getBoundingClientRect().x,t1:__MR.el('t1').opacity}));
      const lbl=await pg.evaluate(()=>__MR.labels());const minBlank=Math.min(...lbl.map(l=>l.px));
      await pg.click('#reveal');await sleep(200);
      const rv=await pg.evaluate(()=>({blank:__MR.blank(),shown:__MR.blanks().map(b=>b.shown),revealed:!!document.getElementById('revealed'),items:document.querySelectorAll('#revealed li').length,url:location.search}));
      const ok=es.end&&es.ta&&/Can one half, on its own, pass the signal inside\?/.test(es.q)&&es.yn.join('|')==='Yes|No'&&es.blank&&!es.ans&&/^No\. Neither works alone\./.test(after.ans)&&after.enter==='no'&&after.stored&&after.stored.n==='no'&&/docking site/.test(after.stored.e)
        &&bl.blank&&!bl.coda&&bl.n>=13&&bl.shown.every((t,i)=>t===`( ${i+1} )`)&&/labels=blank/.test(bl.url)&&!/coda/.test(bl.url)&&bl.reveal&&bl.ring[0]==='reveal'&&bl.legend<0.01&&bl.closing<0.01&&bl.note<0.01&&bl.playDisabled&&bl.t1>0.97&&minBlank>=18
        &&!rv.blank&&rv.shown.every(t=>!/^\( \d+ \)$/.test(t))&&rv.revealed&&rv.items===bl.n&&!/labels=blank/.test(rv.url);
      res('T25',ok,`${tag}: es=${JSON.stringify(es)} after=${JSON.stringify(after)} blank=${JSON.stringify({n:bl.n,coda:bl.coda,first:bl.shown[0],url:bl.url,ring:bl.ring,legend:bl.legend,closing:bl.closing,note:bl.note,minPx:minBlank,t1:bl.t1})} reveal=${JSON.stringify({items:rv.items,url:rv.url})}`);
      note('T25',`${tag}: ${bl.n} labels blanked at >= ${minBlank} px, the legend, the closing line and the note hidden, the closing state cleared; reveal lists them all; the check is "Can one half, on its own, pass the signal inside?"`);
      /* &labels=blank as a link */
      await open(pg,`${BASE}?anim=rtk&labels=blank`);const bl2=await pg.evaluate(()=>({blank:__MR.blank(),step:__MR.step(),n:__MR.blanks().length,first:__MR.blanks()[0].shown}));
      res('T25',bl2.blank&&bl2.step===4&&bl2.n>=13&&bl2.first==='( 1 )',`${tag}: &labels=blank gave ${JSON.stringify(bl2)}`);
      await open(pg);}
    /* T26: Slow runs at half speed and is remembered on the device */
    {await pg.evaluate(()=>{__MR.setTeach(false);document.getElementById('revealed')&&document.querySelector('#revealed button').click();});
      const t1=await pg.evaluate(()=>__MR.timing().dur[1]);await pg.click('#slow');const t2=await pg.evaluate(()=>({d:__MR.timing().dur[1],p:document.getElementById('slow').getAttribute('aria-pressed'),beat3:__MR.timing().beats[3],paidAt:__MR.timing().pays.paidAt,each5:__MR.timing().pays.each[5].paidAt,coda:__MR.timing().coda.dur}));
      await go(pg,0);const t0=Date.now();await pg.evaluate(()=>__MR.goStep(1));await settle(pg);const took=Date.now()-t0;
      await pg.reload({waitUntil:'load'});await pg.waitForFunction(()=>window.__MR&&window.__MR.fig());const kept=await pg.evaluate(()=>({slow:__MR.slow(),p:document.getElementById('slow').getAttribute('aria-pressed'),fig:__MR.fig()}));
      await pg.click('#slow');const off=await pg.evaluate(()=>__MR.slow());
      const ok=t2.d===t1*2&&t2.p==='true'&&t2.beat3.from===800&&t2.beat3.to===4000&&t2.paidAt===2200&&t2.each5===7340&&t2.coda===2600&&took>=2*t1-200&&kept.slow&&kept.p==='true'&&kept.fig==='rtk'&&!off;
      res('T26',ok,`${tag}: dur1 ${t1}->${t2.d} pressed=${t2.p} beat3=${JSON.stringify(t2.beat3)} paidAt=${t2.paidAt} each5=${t2.each5} coda=${t2.coda} step1 took ${took}ms kept=${JSON.stringify(kept)} off=${off}`);note('T26',`${tag}: step 1 took ${took} ms at half speed (${t1} ms at full); the beat, all six paidAt and the closing state double with it`);}
    /* T8: reduced motion */
    await ctx.close();
    {const {ctx:c2,pg:p2}=await fresh(br,vp,{reducedMotion:'reduce'});await open(p2);
      const red=await p2.evaluate(()=>__MR.reduced());let anims=0,capOk=true;
      await go(p2,0);const caps=await p2.evaluate(()=>__MR.captions());
      for(let k=1;k<=N;k++){await p2.evaluate(k=>__MR.goStep(k),k);anims+=await p2.evaluate(()=>document.getAnimations().filter(a=>a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('#stage')).length);await settle(p2);
        const t=await p2.evaluate(()=>document.querySelector('#card').textContent);if(!t.includes(caps[k-1]))capOk=false;
        const stageCap=await p2.evaluate(k=>__MR.el(k===4?'closing':'lg'+k).opacity,k);if(stageCap<0.99)capOk=false;}
      /* the closing state under reduced motion jumps, with no tween */
      await p2.evaluate(()=>__MR.setCoda(true));const redCoda=await p2.evaluate(()=>({coda:__MR.coda(),anims:document.getAnimations().filter(a=>a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('#stage')).length,h1L:__MR.el('h1L').transform,line:!!document.querySelector('#coda .codaline')}));
      await settle(p2);await p2.evaluate(()=>__MR.setCoda(false));await settle(p2);
      const w2=await walkT2(p2,tag+' reduced');
      res('T8',red&&anims===0&&capOk&&redCoda.coda&&redCoda.anims===0&&/translate\(28px/.test(redCoda.h1L)&&redCoda.line&&w2.ok,`${tag}: reduced=${red} stage animations during transitions=${anims} captions intact=${capOk} closing state=${JSON.stringify(redCoda)} ${w2.why}`);
      note('T8',`${tag}: reduced motion: no stage animation in any transition or in the closing state (placed, not moved); captions intact`);
      await c2.close();}
    /* T11: storage throws */
    {const {ctx:c3,pg:p3}=await fresh(br,vp);
      await p3.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('storage blocked');}});});
      await open(p3);const ok=await p3.evaluate(()=>__MR.fig()==='rtk'&&!!document.querySelector('#stage svg')&&document.querySelectorAll('#dots button').length===4);
      const w3=await walkT2(p3,tag+' no-storage');res('T11',ok&&w3.ok,`${tag}: renders=${ok} ${w3.why}`);await c3.close();}
  }
  await t32(br,'rtk');
  /* T27: Fill screen on a 16:9 frame: the stage and the panel use the whole height */
  {const {ctx,pg}=await fresh(br,{width:1920,height:1080});await open(pg);await go(pg,3);await pg.click('#fill');await sleep(300);
    const m=await pg.evaluate(()=>{const s=document.querySelector('#stage svg').getBoundingClientRect(),b=document.getElementById('build').getBoundingClientRect(),c=document.getElementById('card').getBoundingClientRect();
      return {svgH:Math.round(s.height),svgW:Math.round(s.width),buildH:Math.round(b.height),cardW:Math.round(c.width),cardRight:Math.round(c.right),sw:document.documentElement.scrollWidth,iw:window.innerWidth,ih:window.innerHeight};});
    await pg.click('#fill');
    res('T27',m.svgH>=0.72*m.ih&&m.buildH>=0.95*m.ih&&m.cardW>=300&&m.cardRight<=m.iw&&m.sw<=m.iw,`1920x1080 fill: ${JSON.stringify(m)}`);note('T27',`1920x1080 fill: stage ${m.svgW}x${m.svgH} of ${m.iw}x${m.ih}, panel ${m.cardW} px wide`);await ctx.close();}
  /* T3: the one real visual test, at 1600 px wide so it lines up with the 1600 px reference (the re-rendered still, D1). One level.
     The throbbing ring on the next control sits just under the stage and its halo can reach the clip's last row at some phases, so it is stilled for the shot */
  {const {ctx,pg}=await fresh(br,{width:1700,height:1200});await open(pg);
    await pg.addStyleTag({content:'.next::after{display:none!important}.build{display:block!important}.stagerow{max-width:none!important;margin:0!important}.stage{width:1600px!important;height:1000px!important;border:none!important;border-radius:0!important}.stage svg{width:1600px!important;height:1000px!important}.wrap{max-width:none!important;padding:0!important}'});
    await go(pg,3);await go(pg,4);await pg.evaluate(()=>document.fonts.ready);await sleep(400);
    const r=await pg.evaluate(()=>{const b=document.querySelector('#stage svg').getBoundingClientRect();return {x:b.x+window.scrollX,y:b.y+window.scrollY};});
    const clip={x:Math.round(r.x),y:Math.round(r.y),width:1600,height:1000};
    await pg.screenshot({path:`${OUT}/T3-rtk-final-step.png`,clip,fullPage:true});
    await ctx.close();}
  await br.close();
  /* T12 */
  const errs=consoleErrs.filter(e=>!/fonts\.g(oogleapis|static)\.com/.test(e));
  res('T12',errs.length===0,`console: ${errs.slice(0,3).join(' || ')}`);
  R.T28='N/A';NOTE.T28='transport only: no protein on rtk moves two ions in opposite directions';
  R.T29='N/A';NOTE.T29='etc only: no proton crowd on rtk';
  fs.writeFileSync(`${OUT}/results-rtk.json`,JSON.stringify({R,NOTE},null,1));
  for(let i=1;i<=32;i++){const t='T'+i;console.log(t,R[t]===true?'PASS':R[t]===false?'FAIL':R[t]||'not run',NOTE[t]?' -- '+NOTE[t]:'');}
})().catch(e=>{console.error(e);process.exit(1);});
