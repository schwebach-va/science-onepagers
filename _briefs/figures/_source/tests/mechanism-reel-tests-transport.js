/* Acceptance tests for the Mechanism Reel, Phase 2 figure 2: transport, per §7 of the brief plus T21-T27.
   A copy of mechanism-reel-tests-dogma.js with transport's own travellers, beat, labels, run-on and end
   screen, and the first real T19 (ATP is spent before what it pays for moves).
   Programmatic assertions throughout; the only screenshot is T3 (plus one per FAIL).
   T3's comparison: python3 t3-compare-transport.py after this run (writes the two-up image). */
const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const OUT=__dirname;  /* screenshots and results-transport.json land here */
const BASE='http://127.0.0.1:8765/biology/tools/mechanism-reel.html';
const URL=BASE+'?anim=transport';
const KEYS=['gpcr','rtk','transport','etc','dogma','cloning'];
const ENABLED={gpcr:true,dogma:true,transport:true};
const N=3;   /* transport has three states (D1) */
const TITLES=['A receptor that never lets the signal in','Two halves, then several answers at once','Downhill is free. Uphill is paid for.','Electrons buy a gradient. The gradient buys the ATP.','One message, written out and then read aloud','Cut both with one enzyme and the ends fit'];
const BRIDGES=['A different kind of receptor answers in more than one way at once.','Both of those end in things moving across a membrane.','Moving things uphill runs on ATP. Here is where the ATP comes from.','A signal can also reach all the way to the genes.','And here is how we borrow that machinery ourselves.'];
const R={};const NOTE={};const consoleErrs=[];
function res(t,ok,reason){if(R[t]===false)return;R[t]=ok;if(!ok)NOTE[t]=(NOTE[t]?NOTE[t]+' | ':'')+reason;}
function note(t,s){NOTE[t]=(NOTE[t]?NOTE[t]+' | ':'')+s;}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function fresh(br,vp,opts){const ctx=await br.newContext(Object.assign({viewport:vp},opts||{}));const pg=await ctx.newPage();
  pg.on('console',m=>{if(m.type()==='error')consoleErrs.push(m.text());});pg.on('pageerror',e=>consoleErrs.push('PAGEERROR '+e.message));
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
const STRIP=/©\s*2026|Skou 1957|Bio Tool #25|DE BIO 101|SOL BIO MODULE 2/gi;
const rectOf=id=>{const e=document.querySelector('#stage #'+id);const r=e.getBoundingClientRect();return [Math.round(r.x),Math.round(r.y)];};

(async()=>{
  const br=await chromium.launch();
  for(const vp of [{width:1180,height:820},{width:390,height:844}]){
    const tag=`${vp.width}x${vp.height}`;
    const {ctx,pg}=await fresh(br,vp);
    /* T1: six deep links; gpcr, dogma and transport open, the three placeholders assert as disabled, not missing */
    for(const k of KEYS){await open(pg,`${BASE}?fig=${k}`);const fig=await pg.evaluate(()=>__MR.fig());
      const info=await pg.evaluate(k=>{const f=__MR.figs().find(x=>x.key===k);const b=document.querySelector(`.selbtn[data-fig="${k}"]`);return {present:!!f,enabled:f&&f.enabled,btn:!!b,disabled:b&&b.disabled};},k);
      if(ENABLED[k]){res('T1',fig===k&&info.btn&&!info.disabled,`${tag}: ?fig=${k} gave ${fig}`);}
      else{res('T1',fig==='gpcr'&&info.present&&info.enabled===false&&info.btn&&info.disabled===true,`${tag}: ?fig=${k} entry present=${info.present} disabled=${info.disabled} fig=${fig}`);}}
    await open(pg,BASE);await pg.click('.selbtn[data-fig="transport"]');res('T1',(await pg.evaluate(()=>__MR.fig()))==='transport',`${tag}: selector click on transport`);
    /* per-step links, and the paused run-on, for recording */
    await open(pg,`${BASE}?anim=transport&step=2`);const s2=await pg.evaluate(()=>({step:__MR.step(),done:__MR.done(2),url:location.search,level:__MR.level(),eyebrow:document.getElementById('eyebrow').textContent}));
    res('T1',s2.step===2&&!s2.done&&/anim=transport/.test(s2.url)&&/step=2/.test(s2.url)&&/level=sol/.test(s2.url)&&s2.level==='sol'&&/Bio Tool #25/.test(s2.eyebrow),`${tag}: ?anim=transport&step=2 gave ${JSON.stringify(s2)}`);
    await open(pg,`${BASE}?anim=transport&step=1&level=de`);const s1=await pg.evaluate(()=>({step:__MR.step(),level:__MR.level(),url:location.search}));
    res('T1',s1.step===1&&s1.level==='de'&&/level=de/.test(s1.url),`${tag}: &level=de gave ${JSON.stringify(s1)}`);
    await open(pg,`${BASE}?anim=transport&step=3&runon=paused`);await sleep(1200);
    const held=await pg.evaluate(()=>({step:__MR.step(),playing:__MR.playing(),count:__MR.loopCount(),clones:document.querySelectorAll('#runLayer > g').length,ring:[...document.querySelectorAll('.next')].map(e=>e.id),readout:__MR.readout(),counter:__MR.counter(),play:document.getElementById('play').textContent.trim(),end:!!document.getElementById('endscreen')}));
    res('T1',held.step===3&&!held.playing&&held.count===null&&held.clones===0&&held.ring.length===1&&held.ring[0]==='play'&&/^Paused\. Play runs both again/.test(held.readout)&&held.counter===''&&/Play/.test(held.play)&&held.end,`${tag}: runon=paused gave ${JSON.stringify(held)}`);
    await pg.click('#play');await sleep(2200);
    const run=await pg.evaluate(()=>({playing:__MR.playing(),clones:document.querySelectorAll('#runLayer > g').length,readout:__MR.readout(),counter:__MR.counter(),play:document.getElementById('play').textContent.trim()}));
    res('T1',run.playing&&run.clones>0&&/^Both running/.test(run.readout)&&run.counter===''&&/Pause/.test(run.play),`${tag}: Play after hold gave ${JSON.stringify(run)}`);
    await pg.click('#play');const paused=await pg.evaluate(()=>({playing:__MR.playing(),readout:__MR.readout(),play:document.getElementById('play').textContent.trim()}));
    res('T1',!paused.playing&&/^Paused/.test(paused.readout)&&/Play/.test(paused.play),`${tag}: Pause gave ${JSON.stringify(paused)}`);
    await pg.click('#back');await settle(pg);const cleared=await pg.evaluate(()=>({step:__MR.step(),clones:document.querySelectorAll('#runLayer > g').length,readout:__MR.readout(),ji1:__MR.el('ji1').transform}));
    res('T1',cleared.step===2&&cleared.clones===0&&cleared.readout===''&&/translate\(0px, 0px\)/.test(cleared.ji1),`${tag}: Back from the run-on gave ${JSON.stringify(cleared)}`);
    note('T1',`${tag}: ?anim=transport&step=n opens state n unlit; &level=de holds; &runon=paused holds the run-on on Play with its own readout; Pause stops it; Back clears the clones and the wandering ion`);
    /* T15: order and bridges; the three placeholders */
    await open(pg);
    const selText=await pg.evaluate(()=>[...document.querySelectorAll('#sel > li')].map(l=>l.textContent.trim()));
    const titleIdx=TITLES.map(t=>selText.findIndex(s=>s.includes(t)));
    const ordered=titleIdx.every((v,i)=>v>=0&&(i===0||v>titleIdx[i-1]));
    const bridgesOk=BRIDGES.every((b,i)=>{const j=selText.findIndex(s=>s===b);return j===titleIdx[i]+1;});
    const soon=await pg.evaluate(()=>[...document.querySelectorAll('.selbtn')].filter(b=>b.disabled).map(b=>b.dataset.fig));
    const tags=await pg.evaluate(()=>[...document.querySelectorAll('.selbtn[data-fig="transport"] .tag')].map(t=>t.textContent));
    res('T15',ordered&&bridgesOk&&soon.join(',')==='rtk,etc,cloning'&&tags.join('|')==='Movement|Energy transfer',`${tag}: order ${JSON.stringify(titleIdx)} bridges ${bridgesOk} soon=${soon} tags=${tags}`);
    /* T2 */
    const w=await walkT2(pg,tag);res('T2',w.ok,w.why);
    /* T4: every step, both levels */
    let minPx=Infinity,minRun=Infinity,minAt='';
    for(const lv of ['sol','de']){await pg.evaluate(l=>__MR.setLevel(l),lv);
      for(let i=0;i<=N;i++){await go(pg,i);const L=await pg.evaluate(()=>__MR.labels());
        L.forEach(l=>{if(l.px<minPx){minPx=l.px;minAt=`"${l.text.slice(0,30)}" step ${i}`;}if(l.minRunPx<minRun)minRun=l.minRunPx;});}}
    await pg.evaluate(()=>__MR.setLevel('sol'));
    res('T4',minPx>=18,`${tag}: min label ${minPx}px (${minAt})`);note('T4',`${tag}: min label ${minPx} px at a 1000 px stage; smallest sub/superscript run ${minRun} px (the ⁺ on Na⁺ and K⁺, as on gpcr's Ca²⁺)`);
    /* T9: the switch is present on transport and changes captions and labels (D5). "Absent on the other four" cannot be asserted while they are placeholders */
    const capsSol=await pg.evaluate(()=>{__MR.setLevel('sol');return __MR.captions().join('|');});
    const capsDe=await pg.evaluate(()=>{__MR.setLevel('de');return __MR.captions().join('|');});
    await go(pg,N);await pg.evaluate(()=>__MR.stopLoop());const lbDe=await pg.evaluate(()=>__MR.labels().filter(l=>l.visible).map(l=>l.text).join('|'));
    await pg.evaluate(()=>__MR.setLevel('sol'));await pg.evaluate(()=>__MR.stopLoop());const lbSol=await pg.evaluate(()=>__MR.labels().filter(l=>l.visible).map(l=>l.text).join('|'));
    const lvPresent=await pg.evaluate(()=>!!document.getElementById('levelrow')&&document.getElementById('levelrow').isConnected&&document.querySelectorAll('#levelrow [data-lv]').length===2);
    const solWords=/\|gated channel\|/.test(lbSol)&&/\|pump\|/.test(lbSol)&&/3 sodium out/.test(lbSol)&&/2 potassium in/.test(lbSol)&&!/ligand-gated|sodium-potassium|Na\+|K\+/.test(lbSol);
    const deWords=/ligand-gated channel/.test(lbDe)&&/sodium-potassium/.test(lbDe)&&/3 Na\+ out/.test(lbDe)&&/2 K\+ in/.test(lbDe);
    const promptWords=await pg.evaluate(()=>{__MR.setLevel('de');const d=__MR.choices(1).join('|')+__MR.happened(3);__MR.setLevel('sol');const s=__MR.choices(1).join('|')+__MR.happened(3);return {de:/electrochemical gradient/.test(d)&&/ATPase/.test(d),sol:/crowded to scarce/.test(s)&&/energy molecule/.test(s)&&!/electrochemical|ATPase/.test(s)};});
    res('T9',lvPresent&&capsSol!==capsDe&&lbDe!==lbSol&&solWords&&deWords&&promptWords.de&&promptWords.sol,`${tag}: control present=${lvPresent} captions differ=${capsSol!==capsDe} labels differ=${lbDe!==lbSol} solWords=${solWords} deWords=${deWords} prompts=${JSON.stringify(promptWords)}`);
    note('T9',`${tag}: level switch present on transport; SOL and DE captions and labels differ (gated channel / ligand-gated channel, pump / sodium-potassium pump, 3 sodium out / 3 Na⁺ out; crowded-to-scarce and energy molecule / electrochemical gradient and Na⁺/K⁺ ATPase in the prompts)`);
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
    res('T6',endRing.length===1&&endRing[0]==='play',`${tag}: ring at final state ${JSON.stringify(endRing)}`);
    await pg.evaluate(()=>__MR.stopLoop());
    /* a jump does not count as finishing */
    await pg.evaluate(()=>__MR.reset());await settle(pg);await go(pg,2);
    const jumpDone=await pg.evaluate(()=>({d:__MR.done(2),lit:document.querySelector('#dots button:nth-child(2)').classList.contains('done')}));
    res('T5',!jumpDone.d&&!jumpDone.lit,`${tag}: jumping to step 2 marked it done`);
    /* T14 + T17 + T18 + T19: forward transitions, sampled */
    await go(pg,0);const timing=await pg.evaluate(()=>__MR.timing());
    const badProps=new Set();let t17ok=true,t17why='',t18ok=true,t18why='',t19ok=true,t19why='';
    /* travellers, and the moment from which each must be visible (all of transport's are on stage from the start) */
    const travellers={1:[['sig',0],['ionC0',0],['ionC1',0],['ionC2',0],['ji1',0]],2:[['pi',0],['naP0',0],['naP1',0],['kA',0],['kC',0]],3:[]};
    /* T19 from the timing table: the payment has landed at paidAt, and nothing it funds starts before that */
    const pays=timing.pays;const seq2=timing.seq[pays.step];
    const funded=pays.funds.map(id=>[id,seq2[id]?seq2[id].d:null]);
    if(!pays||pays.atp!=='pi'||timing.beats[2].to!==pays.paidAt){t19ok=false;t19why=`${tag}: pays=${JSON.stringify(pays)} beat2=${JSON.stringify(timing.beats[2])}`;}
    funded.forEach(([id,d])=>{if(d==null||d<pays.paidAt){t19ok=false;t19why+=` ${tag}: ${id} starts at ${d} before the payment lands at ${pays.paidAt}`;}});
    const startRects={};
    for(let k=1;k<=N;k++){
      if(k===2){await go(pg,1);for(const id of pays.funds.concat(['pi']))startRects[id]=await pg.evaluate(rectOf,id);}
      await pg.evaluate(k=>__MR.goStep(k),k);const t0=Date.now();const dur=timing.dur[k];
      const beat=timing.beats[k];const samples=[];let piMoved=false,fundedMovedEarly=null,fundedMovedLate=false;
      while(Date.now()-t0<dur+150){const el=Date.now()-t0;const A=await pg.evaluate(animProps);
        A.forEach(a=>a.props.forEach(p=>{if(p!=='transform'&&p!=='opacity')badProps.add(p+'@'+(a.id||a.pseudo||'?'));}));
        if(beat&&el>beat.from+60&&el<beat.to-120){A.filter(a=>a.inStage&&a.active).forEach(a=>{if(!beat.ids.includes(a.id)){t17ok=false;t17why=`${tag}: during beat ${k} (${beat.name}) ${a.id} was animating at ${el}ms`;}});}
        for(const [id,from] of travellers[k]||[]){if(el<from)continue;const o=await pg.evaluate(id=>__MR.el(id).opacity,id);if(o<0.05){t18ok=false;t18why=`${tag}: ${id} opacity ${o} at ${el}ms of transition ${k}`;}}
        if(k===pays.step){const rects=await pg.evaluate(ids=>Object.fromEntries(ids.map(id=>[id,(e=>{const r=e.getBoundingClientRect();return [Math.round(r.x),Math.round(r.y)];})(document.querySelector('#stage #'+id))])),pays.funds.concat(['pi']));
          const moved=id=>Math.abs(rects[id][0]-startRects[id][0])>2||Math.abs(rects[id][1]-startRects[id][1])>2;
          if(el>pays.paidAt*0.5&&moved('pi'))piMoved=true;
          const anyFunded=pays.funds.filter(moved);
          if(el<pays.paidAt-80&&anyFunded.length&&fundedMovedEarly==null)fundedMovedEarly=`${anyFunded.join(',')} at ${el}ms`;
          if(el>pays.paidAt+400&&anyFunded.length)fundedMovedLate=true;}
        samples.push(A.length);await sleep(60);}
      await settle(pg);
      if(k===pays.step){if(fundedMovedEarly){t19ok=false;t19why+=` ${tag}: funded part moved before the payment landed: ${fundedMovedEarly}`;}
        if(!piMoved||!fundedMovedLate){t19ok=false;t19why+=` ${tag}: sampling saw pi moved=${piMoved}, funded parts moved after payment=${fundedMovedLate}`;}}
      if(k===1||k===2){const moved=samples.some(n=>n>0);if(!moved)note('T14',`${tag}: no running animations were sampled in step ${k} (sampling too coarse?)`);}}
    await pg.evaluate(()=>__MR.stopLoop());
    res('T14',badProps.size===0,`${tag}: animated properties beyond transform/opacity: ${[...badProps].join(', ')}`);
    const d=timing.dur;res('T17',d[2]>d[1]&&d[2]>d[3]&&timing.beats[2]&&!timing.beats[1]&&t17ok,`${tag}: dur=${JSON.stringify(d)} beats=${Object.keys(timing.beats)} ${t17why}`);
    note('T17',`${tag}: step durations ms ${JSON.stringify(d.slice(1))}; the one beat is step 2 (${timing.beats[2].name}, ${timing.beats[2].from}-${timing.beats[2].to} ms); step 1 has none, so the channel feels effortless by comparison (D2)`);
    res('T18',t18ok,t18why);
    res('T19',t19ok,t19why);
    note('T19',`${tag}: the phosphate lands on the pump at ${pays.paidAt} ms; ${funded.map(([id,d])=>`${id} starts at ${d}`).join(', ')}; sampled: nothing funded moved before ${pays.paidAt} ms`);
    /* T16: no counts or orders of magnitude at any step, either level; no counter and no numbers in the run-on (D4). The still's own "3 Na⁺ out / 2 K⁺ in" is its stoichiometry, not a tally */
    const numRe=/\b\d+\s*(x|×|fold|times|molecules?|ions?|copies|thousand|million|billion|per)\b|10\^|10[⁰¹²³⁴⁵⁶⁷⁸⁹]|\d+,\d{3}|\d+e\d|\b\d{4,}\b(?!\s*(J\.|·|,))|\b\d{2,3}\b(?!\s*(of|%|J\.))/i;
    let t16ok=true,t16why='';
    for(const lv of ['sol','de']){await pg.evaluate(l=>__MR.setLevel(l),lv);
      for(let i=0;i<=N;i++){await go(pg,i);if(i===N){await sleep(2500);}const txt=await pg.evaluate(()=>__MR.text());const m=txt.replace(STRIP,'').match(numRe);
        if(m){t16ok=false;t16why=`${tag}: ${lv} step ${i} text has "${m[0]}"`;break;}
        if(i===N){const c=await pg.evaluate(()=>({counter:__MR.counter(),loop:__MR.loopCount(),clones:document.querySelectorAll('#runLayer > g').length}));
          if(c.counter!==''||c.loop!==null){t16ok=false;t16why=`${tag}: ${lv} run-on counter="${c.counter}" loop=${JSON.stringify(c.loop)}`;}
          await pg.evaluate(()=>__MR.stopLoop());}}}
    await pg.evaluate(()=>__MR.setLevel('sol'));
    res('T16',t16ok,t16why);note('T16',`${tag}: no count or order of magnitude at any step, either level, run-on included; no counter; the digits on screen are the still's 3 Na⁺ out and 2 K⁺ in and the step numbers`);
    /* T13: Teaching view and Fill screen */
    await go(pg,1);
    await pg.click('#teach');const tv=await pg.evaluate(()=>({pressed:document.getElementById('teach').getAttribute('aria-pressed'),teach:__MR.teach(),caps:[...document.querySelectorAll('#card .cap')].filter(c=>c.getBoundingClientRect().height>0).length,prompt:!!document.querySelector('#predict')}));
    await pg.click('#teach');
    await pg.click('#fill');const fv=await pg.evaluate(()=>({attr:document.documentElement.getAttribute('data-fill'),fill:__MR.fill(),introHidden:getComputedStyle(document.getElementById('intro')).display==='none',label:document.getElementById('fill').textContent}));
    await pg.click('#fill');const fv2=await pg.evaluate(()=>document.documentElement.getAttribute('data-fill'));
    res('T13',tv.pressed==='true'&&tv.teach&&tv.caps===N&&!tv.prompt&&fv.attr==='1'&&fv.fill&&fv.introHidden&&fv.label==='Restore page'&&fv2==='0',`${tag}: teach=${JSON.stringify(tv)} fill=${JSON.stringify(fv)} after=${fv2}`);
    /* T10: no horizontal overflow, every step, run-on included */
    let ovf=true,ovfWhy='';for(let i=0;i<=N;i++){await go(pg,i);if(i===N)await sleep(1500);const o=await pg.evaluate(()=>({sw:document.documentElement.scrollWidth,iw:window.innerWidth}));if(o.sw>o.iw){ovf=false;ovfWhy=`${tag}: step ${i} scrollWidth ${o.sw} > ${o.iw}`;}}
    await pg.evaluate(()=>__MR.stopLoop());
    res('T10',ovf,ovfWhy);
    if(R.T10===false)await shot(pg,`FAIL-T10-transport-${tag}`);
    /* T21: focus on the active step: scaled movers, dimmed rest, settled after; and D1's held dims: the pump at half in state 1, the channel at half in state 2, both full in state 3 */
    {await pg.evaluate(()=>__MR.setLevel('de'));await go(pg,0);await sleep(450);const s0=await pg.evaluate(()=>({chan:__MR.el('chanG').opacity,pump:__MR.el('pumpG').opacity}));
      await go(pg,1);await sleep(450);const s1=await pg.evaluate(()=>({chan:__MR.el('chanG').opacity,pump:__MR.el('pumpG').opacity}));
      await pg.evaluate(()=>__MR.goStep(2));await sleep(2200);
      const mid=await pg.evaluate(()=>({f:__MR.focus(),live:!!document.querySelector('#card .cap.live'),sig:__MR.el('sig').opacity,chan:__MR.el('chanG').opacity,pump:__MR.el('pumpG').opacity}));
      await settle(pg);await sleep(450);const after=await pg.evaluate(()=>({f:__MR.focus(),live:!!document.querySelector('#card .cap.live'),sig:__MR.el('sig').opacity,chan:__MR.el('chanG').opacity,pump:__MR.el('pumpG').opacity}));
      await go(pg,3);await pg.evaluate(()=>__MR.stopLoop());await sleep(400);const s3=await pg.evaluate(()=>({chan:__MR.el('chanG').opacity,pump:__MR.el('pumpG').opacity}));
      const near=(a,b)=>Math.abs(a-b)<0.03;
      const ok=mid.f.live&&mid.f.scaled.includes('pi')&&mid.f.scaled.includes('naP0')&&mid.f.scaled.includes('b2')&&mid.f.dimmedCount>20&&mid.sig<0.3&&near(mid.pump,1)&&mid.live&&!after.f.live&&after.f.scaled.length===0&&after.f.dimmedCount===0&&near(after.sig,0.5)&&near(after.chan,0.5)&&near(after.pump,1)&&!after.live
        &&near(s0.chan,1)&&near(s0.pump,1)&&near(s1.chan,1)&&near(s1.pump,0.5)&&near(s3.chan,1)&&near(s3.pump,1);
      res('T21',ok,`${tag}: s0=${JSON.stringify(s0)} s1=${JSON.stringify(s1)} mid=${JSON.stringify({scaled:mid.f.scaled,dimmed:mid.f.dimmedCount,sig:mid.sig,pump:mid.pump,live:mid.live})} after=${JSON.stringify({scaled:after.f.scaled,dimmed:after.f.dimmedCount,sig:after.sig,chan:after.chan,pump:after.pump})} s3=${JSON.stringify(s3)}`);
      note('T21',`${tag}: during step 2, ${mid.f.scaled.length} parts scaled and ${mid.f.dimmedCount} of ${mid.f.topCount} drawing parts dimmed; the channel side held at half through state 2 (D1), the pump side at half through state 1, both full at state 3`);}
    /* T22: committed predictions: 2-3 buttons of 44 px, Next never blocked, "You predicted" beside "What happened" */
    {await pg.evaluate(()=>__MR.setLevel('sol'));await pg.evaluate(()=>__MR.reset());await settle(pg);
      const b=await pg.evaluate(()=>[...document.querySelectorAll('#predict .choices .opt')].map(x=>({t:x.textContent,h:x.getBoundingClientRect().height})));
      await pg.click('#next');await settle(pg);const noChoice=await pg.evaluate(()=>({step:__MR.step(),line:(document.getElementById('predline')||{}).textContent||''}));
      const b2=await pg.evaluate(()=>[...document.querySelectorAll('#predict .choices .opt')].length);
      await pg.click('#predict .choices .opt:nth-child(2)');const pressed=await pg.evaluate(()=>document.querySelector('#predict .choices .opt:nth-child(2)').getAttribute('aria-pressed'));
      await pg.click('#next');await settle(pg);const withChoice=await pg.evaluate(()=>({step:__MR.step(),pred:__MR.pred(2),line:(document.getElementById('predline')||{}).textContent||'',stored:(()=>{try{return JSON.parse(localStorage.getItem('mechreel')).per.transport.pred['2'];}catch(e){return 'err';}})()}));
      const teach=await pg.evaluate(()=>{__MR.setTeach(true);const n=document.querySelectorAll('#card .opt').length;__MR.setTeach(false);return n;});
      /* every prompt, both levels, has 2 or 3 choices */
      const counts=await pg.evaluate(()=>{const out=[];for(const l of['sol','de']){__MR.setLevel(l);for(let k=1;k<=3;k++)out.push(__MR.choices(k).length);}__MR.setLevel('sol');return out;});
      const ok=b.length>=2&&b.length<=3&&b.every(x=>x.h>=44)&&noChoice.step===1&&/What happened/.test(noChoice.line)&&!/You predicted/.test(noChoice.line)&&b2>=2&&pressed==='true'&&withChoice.step===2&&withChoice.pred===1&&/You predicted: The pump moves the ions; it needs no energy/.test(withChoice.line)&&/What happened/.test(withChoice.line)&&withChoice.stored===1&&teach===0&&counts.every(n=>n>=2&&n<=3);
      res('T22',ok,`${tag}: buttons=${JSON.stringify(b)} noChoice=${JSON.stringify(noChoice)} pressed=${pressed} withChoice=${JSON.stringify(withChoice)} teachButtons=${teach} counts=${counts}`);
      /* D7: at step 2 one choice has the pump working without ATP; at step 3 one has both proteins costing energy, both levels */
      const d7=await pg.evaluate(()=>{const out={};for(const l of['sol','de']){__MR.setLevel(l);out[l]={two:__MR.choices(2).some(c=>/no ATP is needed|needs no energy/.test(c)),three:__MR.choices(3).some(c=>/^Both the channel and the pump$/.test(c))};}__MR.setLevel('sol');return out;});
      res('T22',d7.sol.two&&d7.sol.three&&d7.de.two&&d7.de.three,`${tag}: D7 choices ${JSON.stringify(d7)}`);}
    /* T23: labelled when it happens: "a signal opens it" and the channel's bottom line at step 1, the 3 Na⁺ out / 2 K⁺ in labels and the pump's bottom line at step 2, the closing line at step 3; the protein names and ATP always */
    {let ok=true,why='';const WANT={lblSig:1,goLine:1,lblNaOut:2,lblKIn:2,flagLine:2,closing:3,lblCh:0,lblPump:0,lblAtp:0,lblSplit:0,lblOut:0,lblIn:0,lblChTitle:0,lblPumpTitle:0};
      for(const lv of ['sol','de']){await pg.evaluate(l=>__MR.setLevel(l),lv);
        for(let i=0;i<=N&&ok;i++){await go(pg,i);if(i===N)await pg.evaluate(()=>__MR.stopLoop());await sleep(400);const o=await pg.evaluate(ids=>Object.fromEntries(ids.map(id=>[id,__MR.el(id)?__MR.el(id).opacity:null])),Object.keys(WANT));
          for(const id in WANT){const side=/Sig|goLine|lblCh/.test(id)?(i===2?0.5:1):/NaOut|KIn|flagLine|lblPump|lblAtp|lblSplit/.test(id)?(i===1?0.5:1):1;const want=(i>=WANT[id]?1:0)*side;if(o[id]==null||Math.abs(o[id]-want)>0.03){ok=false;why=`${tag}: ${lv} step ${i} ${id}=${o[id]} wanted ${want}`;break;}}}}
      await pg.evaluate(()=>__MR.setLevel('sol'));res('T23',ok,why);}
    /* T24: the amplification counter is gpcr's. transport has none (D4): the run-on plays with no counter and no numbers, clones appear on both sides, and it holds at its caps */
    {await go(pg,2);await go(pg,3);await sleep(2600);const c=await pg.evaluate(()=>({counter:__MR.counter(),loop:__MR.loopCount(),readout:__MR.readout(),playing:__MR.playing(),clones:document.querySelectorAll('#runLayer > g').length,na:document.querySelectorAll('#runLayer > g circle[fill="#BFA58A"]').length,k:document.querySelectorAll('#runLayer > g circle[fill="#8595AB"]').length,pi:document.querySelectorAll('#runLayer > g circle[fill="#6B4E8C"]').length}));
      await pg.waitForFunction(()=>document.querySelectorAll('#runLayer > g').length>=18,null,{timeout:20000}).catch(()=>{});await sleep(4200);
      const end=await pg.evaluate(()=>({clones:document.querySelectorAll('#runLayer > g').length,na:document.querySelectorAll('#runLayer > g circle[fill="#BFA58A"]').length,k:document.querySelectorAll('#runLayer > g circle[fill="#8595AB"]').length,pi:document.querySelectorAll('#runLayer > g circle[fill="#6B4E8C"]').length,counter:__MR.counter(),playing:__MR.playing(),text:__MR.text()}));
      await pg.evaluate(()=>__MR.setPlaying(false));
      const ok=c.counter===''&&c.loop===null&&/^Both running/.test(c.readout)&&c.playing&&c.clones>0&&c.na>0&&c.pi>0&&end.counter===''&&end.clones===18&&end.na===12&&end.k===4&&end.pi===2&&!numRe.test(end.text.replace(STRIP,''));
      if(ok){R.T24='N/A';NOTE.T24=`${tag}: no counter on transport (D4); the run-on ran both sides, ${c.clones} clones after 2.6 s, held at ${end.clones} (${end.na} sodium, ${end.k} potassium, ${end.pi} phosphate), no number on screen`;}else res('T24',false,`${tag}: start=${JSON.stringify(c)} end=${JSON.stringify({clones:end.clones,na:end.na,k:end.k,pi:end.pi,counter:end.counter})}`);}
    /* T25: the end screen: free text kept on the device, the misconception check, and label-it-from-memory */
    {const es=await pg.evaluate(()=>({end:!!document.getElementById('endscreen'),ta:!!document.getElementById('explain'),q:[...document.querySelectorAll('#endscreen .q')].map(e=>e.textContent).join('|'),yn:[...document.querySelectorAll('#enterRow .opt')].map(b=>b.textContent),blank:!!document.getElementById('blankBtn'),ans:!!document.getElementById('enterAnswer')}));
      await pg.fill('#explain','The pump pushes sodium uphill against the gradient, so it needs ATP; the channel just lets sodium fall downhill.');
      await pg.click('#enterRow .opt:nth-child(2)');
      const after=await pg.evaluate(()=>({ans:(document.getElementById('enterAnswer')||{}).textContent||'',enter:__MR.enter(),stored:(()=>{try{const p=JSON.parse(localStorage.getItem('mechreel')).per.transport;return {e:p.explain,n:p.enter};}catch(e){return null;}})()}));
      await pg.click('#blankBtn');await sleep(200);
      const bl=await pg.evaluate(()=>({blank:__MR.blank(),shown:__MR.blanks().map(b=>b.shown),n:__MR.blanks().length,url:location.search,reveal:!!document.getElementById('reveal'),ring:[...document.querySelectorAll('.next')].map(e=>e.id),legend:__MR.el('lg2').opacity,closing:__MR.el('closing').opacity,pump2:(document.querySelector('#stage #lblPump2')||{textContent:''}).textContent,clones:document.querySelectorAll('#runLayer > g').length,playDisabled:document.getElementById('play').disabled}));
      const lbl=await pg.evaluate(()=>__MR.labels());const minBlank=Math.min(...lbl.map(l=>l.px));
      await pg.click('#reveal');await sleep(200);
      const rv=await pg.evaluate(()=>({blank:__MR.blank(),shown:__MR.blanks().map(b=>b.shown),revealed:!!document.getElementById('revealed'),items:document.querySelectorAll('#revealed li').length,url:location.search}));
      const ok=es.end&&es.ta&&/Does sodium need energy to move through the channel\?/.test(es.q)&&es.yn.join('|')==='Yes|No'&&es.blank&&!es.ans&&/^No\. It falls inward the way it was already leaning/.test(after.ans)&&after.enter==='no'&&after.stored&&after.stored.n==='no'&&/uphill/.test(after.stored.e)
        &&bl.blank&&bl.n>=12&&bl.shown.every((t,i)=>t===`( ${i+1} )`)&&bl.pump2===''&&/labels=blank/.test(bl.url)&&bl.reveal&&bl.ring[0]==='reveal'&&bl.legend<0.01&&bl.closing<0.01&&bl.clones===0&&bl.playDisabled&&minBlank>=18
        &&!rv.blank&&rv.shown.every(t=>!/^\( \d+ \)$/.test(t))&&rv.revealed&&rv.items===bl.n&&!/labels=blank/.test(rv.url);
      res('T25',ok,`${tag}: es=${JSON.stringify(es)} after=${JSON.stringify(after)} blank=${JSON.stringify({n:bl.n,first:bl.shown[0],url:bl.url,ring:bl.ring,legend:bl.legend,closing:bl.closing,minPx:minBlank,pump2:bl.pump2,clones:bl.clones})} reveal=${JSON.stringify({items:rv.items,url:rv.url})}`);
      note('T25',`${tag}: ${bl.n} labels blanked at >= ${minBlank} px with the run-on cleared; reveal lists them all; the check is "Does sodium need energy to move through the channel?"`);
      /* &labels=blank as a link, at DE */
      await open(pg,`${BASE}?anim=transport&labels=blank&level=de`);const bl2=await pg.evaluate(()=>({blank:__MR.blank(),step:__MR.step(),n:__MR.blanks().length,first:__MR.blanks()[0].shown,clones:document.querySelectorAll('#runLayer > g').length}));
      res('T25',bl2.blank&&bl2.step===3&&bl2.n>=12&&bl2.first==='( 1 )'&&bl2.clones===0,`${tag}: &labels=blank gave ${JSON.stringify(bl2)}`);
      await open(pg);}
    /* T26: Slow runs at half speed and is remembered on the device */
    {await pg.evaluate(()=>{__MR.setTeach(false);document.getElementById('revealed')&&document.querySelector('#revealed button').click();});
      const t1=await pg.evaluate(()=>__MR.timing().dur[1]);await pg.click('#slow');const t2=await pg.evaluate(()=>({d:__MR.timing().dur[1],p:document.getElementById('slow').getAttribute('aria-pressed'),beat:__MR.timing().beats[2],paidAt:__MR.timing().pays.paidAt}));
      await go(pg,0);const t0=Date.now();await pg.evaluate(()=>__MR.goStep(1));await settle(pg);const took=Date.now()-t0;
      await pg.reload({waitUntil:'load'});await pg.waitForFunction(()=>window.__MR&&window.__MR.fig());const kept=await pg.evaluate(()=>({slow:__MR.slow(),p:document.getElementById('slow').getAttribute('aria-pressed'),fig:__MR.fig()}));
      await pg.click('#slow');const off=await pg.evaluate(()=>__MR.slow());
      const ok=t2.d===t1*2&&t2.p==='true'&&t2.beat.from===800&&t2.beat.to===3400&&t2.paidAt===3400&&took>=2*t1-200&&kept.slow&&kept.p==='true'&&kept.fig==='transport'&&!off;
      res('T26',ok,`${tag}: dur1 ${t1}->${t2.d} pressed=${t2.p} beat2=${JSON.stringify(t2.beat)} paidAt=${t2.paidAt} step1 took ${took}ms kept=${JSON.stringify(kept)} off=${off}`);note('T26',`${tag}: step 1 took ${took} ms at half speed (${t1} ms at full); the ATP beat and paidAt double with it`);}
    /* T8: reduced motion */
    await ctx.close();
    {const {ctx:c2,pg:p2}=await fresh(br,vp,{reducedMotion:'reduce'});await open(p2);
      const red=await p2.evaluate(()=>__MR.reduced());let anims=0,capOk=true;
      await go(p2,0);const caps=await p2.evaluate(()=>__MR.captions());
      for(let k=1;k<=N;k++){await p2.evaluate(k=>__MR.goStep(k),k);anims+=await p2.evaluate(()=>document.getAnimations().filter(a=>a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('#stage')).length);await settle(p2);
        const t=await p2.evaluate(()=>document.querySelector('#card').textContent);if(!t.includes(caps[k-1]))capOk=false;
        const stageCap=await p2.evaluate(k=>__MR.el(k===3?'closing':'lg'+k).opacity,k);if(stageCap<0.99)capOk=false;}
      /* the run-on under reduced motion places its clones rather than moving them, and still runs */
      await sleep(2500);const redLoop=await p2.evaluate(()=>({clones:document.querySelectorAll('#runLayer > g').length,anims:document.getAnimations().filter(a=>a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('#stage')).length}));
      await p2.evaluate(()=>__MR.stopLoop());
      const w2=await walkT2(p2,tag+' reduced');
      res('T8',red&&anims===0&&capOk&&redLoop.clones>0&&redLoop.anims===0&&w2.ok,`${tag}: reduced=${red} stage animations during transitions=${anims} captions intact=${capOk} run-on clones=${redLoop.clones} run-on animations=${redLoop.anims} ${w2.why}`);
      note('T8',`${tag}: reduced motion: no stage animation in any transition or in the run-on (${redLoop.clones} clones placed, not moved); captions intact`);
      await c2.close();}
    /* T11: storage throws */
    {const {ctx:c3,pg:p3}=await fresh(br,vp);
      await p3.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('storage blocked');}});});
      await open(p3);const ok=await p3.evaluate(()=>__MR.fig()==='transport'&&!!document.querySelector('#stage svg')&&document.querySelectorAll('#dots button').length===3);
      const w3=await walkT2(p3,tag+' no-storage');res('T11',ok&&w3.ok,`${tag}: renders=${ok} ${w3.why}`);await c3.close();}
  }
  /* T27: Fill screen on a 16:9 frame: the stage and the panel use the whole height */
  {const {ctx,pg}=await fresh(br,{width:1920,height:1080});await open(pg);await go(pg,2);await pg.click('#fill');await sleep(300);
    const m=await pg.evaluate(()=>{const s=document.querySelector('#stage svg').getBoundingClientRect(),b=document.getElementById('build').getBoundingClientRect(),c=document.getElementById('card').getBoundingClientRect();
      return {svgH:Math.round(s.height),svgW:Math.round(s.width),buildH:Math.round(b.height),cardW:Math.round(c.width),cardRight:Math.round(c.right),sw:document.documentElement.scrollWidth,iw:window.innerWidth,ih:window.innerHeight};});
    await pg.click('#fill');
    res('T27',m.svgH>=0.72*m.ih&&m.buildH>=0.95*m.ih&&m.cardW>=300&&m.cardRight<=m.iw&&m.sw<=m.iw,`1920x1080 fill: ${JSON.stringify(m)}`);note('T27',`1920x1080 fill: stage ${m.svgW}x${m.svgH} of ${m.iw}x${m.ih}, panel ${m.cardW} px wide`);await ctx.close();}
  /* T3: the one real visual test, at 1600 px wide so it lines up with the 1600 px reference. DE is the still's wording; SOL is shot too, for the record */
  {const {ctx,pg}=await fresh(br,{width:1700,height:1200});await open(pg);await pg.evaluate(()=>__MR.setLevel('de'));
    await pg.addStyleTag({content:'.build{display:block!important}.stagerow{max-width:none!important;margin:0!important}.stage{width:1600px!important;height:1000px!important;border:none!important;border-radius:0!important}.stage svg{width:1600px!important;height:1000px!important}.wrap{max-width:none!important;padding:0!important}'});
    await go(pg,2);await go(pg,3);await pg.evaluate(()=>__MR.stopLoop());await pg.evaluate(()=>document.fonts.ready);await sleep(400);
    const r=await pg.evaluate(()=>{const b=document.querySelector('#stage svg').getBoundingClientRect();return {x:b.x+window.scrollX,y:b.y+window.scrollY};});
    const clip={x:Math.round(r.x),y:Math.round(r.y),width:1600,height:1000};
    await pg.screenshot({path:`${OUT}/T3-transport-final-step.png`,clip,fullPage:true});
    await pg.evaluate(()=>__MR.setLevel('sol'));await pg.evaluate(()=>__MR.stopLoop());await sleep(400);await pg.screenshot({path:`${OUT}/T3-transport-final-step-sol.png`,clip,fullPage:true});
    await ctx.close();}
  await br.close();
  /* T12 */
  const errs=consoleErrs.filter(e=>!/fonts\.g(oogleapis|static)\.com/.test(e));
  res('T12',errs.length===0,`console: ${errs.slice(0,3).join(' || ')}`);
  R.T20='N/A';NOTE.T20='rtk only';
  fs.writeFileSync(`${OUT}/results-transport.json`,JSON.stringify({R,NOTE},null,1));
  for(let i=1;i<=27;i++){const t='T'+i;console.log(t,R[t]===true?'PASS':R[t]===false?'FAIL':R[t]||'not run',NOTE[t]?' -- '+NOTE[t]:'');}
})().catch(e=>{console.error(e);process.exit(1);});
