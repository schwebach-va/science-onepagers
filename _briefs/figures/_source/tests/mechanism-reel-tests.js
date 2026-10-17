/* Acceptance tests for the Mechanism Reel, Phase 1 (gpcr only), per §7 of the brief.
   Programmatic assertions throughout; the only screenshot is T3 (plus one per FAIL).
   Revision 1 (2026-10-17): T1 also checks the sources line under the reel (R6). */
const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const OUT=__dirname;  /* screenshots and results.json land here */
const URL='http://127.0.0.1:8765/biology/tools/mechanism-reel.html';
const KEYS=['gpcr','rtk','transport','etc','dogma','cloning'];
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
async function settle(pg){await pg.waitForFunction(()=>!__MR.busy(),null,{timeout:8000});}
async function go(pg,i){await pg.evaluate(i=>__MR.goStep(i),i);await settle(pg);}
async function shot(pg,name){try{await pg.screenshot({path:`${OUT}/${name}.png`});}catch(e){}}
async function walkT2(pg,tag){let ok=true,why='';
  for(let i=0;i<=6;i++){await go(pg,i);const s=await pg.evaluate(()=>__MR.step());if(s!==i){ok=false;why=`forward goStep(${i}) gave ${s}`;break;}}
  if(ok)for(let i=6;i>=0;i--){await go(pg,i);const s=await pg.evaluate(()=>__MR.step());if(s!==i){ok=false;why=`backward goStep(${i}) gave ${s}`;break;}}
  if(ok)for(let i=1;i<=6;i++){await pg.click(`#dots button:nth-child(${i})`);await settle(pg);const s=await pg.evaluate(()=>__MR.step());if(s!==i){ok=false;why=`dot ${i} gave ${s}`;break;}}
  return {ok,why:why?`${tag}: ${why}`:''};}
const animProps=()=>document.getAnimations().map(a=>{const props=new Set();try{a.effect.getKeyframes().forEach(k=>Object.keys(k).forEach(p=>{if(!/^(offset|computedOffset|easing|composite)$/.test(p))props.add(p);}));}catch(e){}
  if(a.transitionProperty)props.add(a.transitionProperty);let t=a.effect&&a.effect.target;let id=null;while(t&&t.nodeType===1){if(t.id){id=t.id;break;}t=t.parentNode;}
  return {props:[...props],id,inStage:!!(a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('#stage')),pseudo:a.effect&&a.effect.pseudoElement||null};});
const sourcesLine=want=>{const p=document.getElementById('sources');if(!p)return {present:false};const r=p.getBoundingClientRect();const links=[...p.querySelectorAll('a')].map(a=>({t:a.textContent,h:a.getAttribute('href')}));
  return {present:true,visible:r.height>0&&getComputedStyle(p).display!=='none'&&getComputedStyle(p).visibility!=='hidden',disclosed:!!p.closest('details,[hidden]'),text:p.textContent,links,inBuild:!!p.closest('#build'),
    matches:want.length===links.length&&want.every(([t,h],i)=>links[i].t===t&&links[i].h===h)&&__MR.sources().length===want.length};};

(async()=>{
  const br=await chromium.launch();
  for(const vp of [{width:1180,height:820},{width:390,height:844}]){
    const tag=`${vp.width}x${vp.height}`;
    const {ctx,pg}=await fresh(br,vp);
    /* T1: six deep links; every figure not yet built asserts as disabled, not missing.
       Add a key to BUILT as each Phase 2 figure lands. */
    const BUILT=['gpcr','dogma','transport'];
    for(const k of KEYS){await open(pg,`${URL}?fig=${k}`);const fig=await pg.evaluate(()=>__MR.fig());
      const info=await pg.evaluate(k=>{const f=__MR.figs().find(x=>x.key===k);const b=document.querySelector(`.selbtn[data-fig="${k}"]`);return {present:!!f,enabled:f&&f.enabled,btn:!!b,disabled:b&&b.disabled};},k);
      if(BUILT.includes(k)){res('T1',fig===k&&info.btn&&!info.disabled,`${tag}: ?fig=${k} gave ${fig}`);}
      else{res('T1',fig==='gpcr'&&info.present&&info.enabled===false&&info.btn&&info.disabled===true,`${tag}: ?fig=${k} entry present=${info.present} disabled=${info.disabled} fig=${fig}`);}}
    await open(pg);await pg.click('.selbtn[data-fig="gpcr"]');res('T1',(await pg.evaluate(()=>__MR.fig()))==='gpcr',`${tag}: selector click`);
    /* per-step links and the paused run-on, for recording */
    await open(pg,`${URL}?anim=gpcr&step=3`);const s3=await pg.evaluate(()=>({step:__MR.step(),done:__MR.done(3),url:location.search}));
    res('T1',s3.step===3&&!s3.done&&/anim=gpcr/.test(s3.url)&&/step=3/.test(s3.url),`${tag}: ?anim=gpcr&step=3 gave ${JSON.stringify(s3)}`);
    await open(pg,`${URL}?anim=gpcr&step=6&runon=paused`);await sleep(1200);
    const held=await pg.evaluate(()=>({step:__MR.step(),playing:__MR.playing(),count:__MR.loopCount(),ring:[...document.querySelectorAll('.next')].map(e=>e.id),readout:__MR.readout(),play:document.getElementById('play').textContent.trim()}));
    res('T1',held.step===6&&!held.playing&&held.count.ip3===1&&held.count.ca===4&&held.ring[0]==='play'&&/paused/i.test(held.readout)&&/Play/.test(held.play),`${tag}: runon=paused gave ${JSON.stringify(held)}`);
    await pg.click('#play');await sleep(1500);
    const run=await pg.evaluate(()=>({playing:__MR.playing(),count:__MR.loopCount(),readout:__MR.readout(),play:document.getElementById('play').textContent.trim()}));
    res('T1',run.playing&&run.count.ip3+run.count.ca>0&&/playing/i.test(run.readout)&&/Pause/.test(run.play),`${tag}: Play after hold gave ${JSON.stringify(run)}`);
    await pg.click('#play');const paused=await pg.evaluate(()=>({playing:__MR.playing(),readout:__MR.readout(),play:document.getElementById('play').textContent.trim()}));
    res('T1',!paused.playing&&/paused/i.test(paused.readout)&&/Play/.test(paused.play),`${tag}: Pause gave ${JSON.stringify(paused)}`);
    await pg.click('#back');await settle(pg);const cleared=await pg.evaluate(()=>({step:__MR.step(),count:__MR.loopCount(),clones:document.querySelectorAll('#ip3Layer > g, #caLayer > g').length,readout:__MR.readout()}));
    res('T1',cleared.step===5&&cleared.clones===0&&cleared.count.ip3===1&&cleared.count.ca===4&&cleared.readout==='',`${tag}: Back from the run-on gave ${JSON.stringify(cleared)}`);
    /* R6: the figure's sources are a visible line under the reel, and they follow the selected figure */
    const srcG=await pg.evaluate(sourcesLine,[['Streb 1983','https://doi.org/10.1038/306067a0'],['Berridge & Irvine 1984','https://doi.org/10.1038/312315a0'],['Rasmussen 2011','https://doi.org/10.1038/nature10361']]);
    await pg.evaluate(()=>__MR.setFig('transport'));const srcT=await pg.evaluate(sourcesLine,[['Skou 1957','https://doi.org/10.1016/0006-3002(57)90343-8']]);
    await pg.evaluate(()=>__MR.setFig('gpcr'));
    res('T1',srcG.present&&srcG.visible&&!srcG.disclosed&&srcG.inBuild&&srcG.matches&&/^Sources: Streb 1983 · Berridge & Irvine 1984 · Rasmussen 2011$/.test(srcG.text.trim())&&srcT.visible&&srcT.matches,`${tag}: sources line gpcr=${JSON.stringify(srcG)} transport=${JSON.stringify(srcT)}`);
    note('T1',`${tag}: ?anim=gpcr&step=n opens state n unlit; &runon=paused holds the run-on on Play; Pause stops it; Back clears it; the sources line under the reel reads "${srcG.text.trim()}" and follows the figure (R6)`);
    /* T15: order and bridges */
    const selText=await pg.evaluate(()=>[...document.querySelectorAll('#sel > li')].map(l=>l.textContent.trim()));
    const titleIdx=TITLES.map(t=>selText.findIndex(s=>s.includes(t)));
    const ordered=titleIdx.every((v,i)=>v>=0&&(i===0||v>titleIdx[i-1]));
    const bridgesOk=BRIDGES.every((b,i)=>{const j=selText.findIndex(s=>s===b);return j===titleIdx[i]+1;});
    res('T15',ordered&&bridgesOk,`${tag}: order ${JSON.stringify(titleIdx)} bridges ${bridgesOk}`);
    /* T2 */
    const w=await walkT2(pg,tag);res('T2',w.ok,w.why);
    /* T4: every step, both levels */
    let minPx=Infinity,minRun=Infinity,minAt='';
    for(const lv of ['sol','de']){await pg.evaluate(l=>__MR.setLevel(l),lv);
      for(let i=0;i<=6;i++){await go(pg,i);const L=await pg.evaluate(()=>__MR.labels());
        L.forEach(l=>{if(l.px<minPx){minPx=l.px;minAt=`"${l.text.slice(0,30)}" step ${i}`;}if(l.minRunPx<minRun)minRun=l.minRunPx;});}}
    await pg.evaluate(()=>__MR.setLevel('sol'));
    res('T4',minPx>=18,`${tag}: min label ${minPx}px (${minAt})`);note('T4',`${tag}: min label ${minPx} px at a 1000 px stage; smallest sub/superscript run ${minRun} px`);
    /* T9: gpcr now carries real levels (Reid, round 2): the control is present and the wording changes; T9's "absent elsewhere" clause waits for Phase 2 */
    const capsSol=await pg.evaluate(()=>{__MR.setLevel('sol');return __MR.captions().join('|');});
    const capsDe=await pg.evaluate(()=>{__MR.setLevel('de');return __MR.captions().join('|');});
    const lbDe=await pg.evaluate(()=>__MR.labels().filter(l=>l.visible).map(l=>l.text).join('|'));
    await pg.evaluate(()=>__MR.setLevel('sol'));const lbSol=await pg.evaluate(()=>__MR.labels().filter(l=>l.visible).map(l=>l.text).join('|'));
    const lvPresent=await pg.evaluate(()=>!!document.getElementById('levelrow')&&document.querySelectorAll('#levelrow [data-lv]').length===2);
    const pkc=await pg.evaluate(()=>{__MR.setLevel('de');const d=!!document.querySelector('#stage #pkc');__MR.setLevel('sol');const s=!!document.querySelector('#stage #pkc');return {de:d,sol:s};});
    res('T9',lvPresent&&capsSol!==capsDe&&lbDe!==lbSol&&/PIP/.test(lbDe)&&!/PIP/.test(lbSol)&&pkc.de&&!pkc.sol,`${tag}: control present=${lvPresent} captions differ=${capsSol!==capsDe} labels differ=${lbDe!==lbSol} pkc=${JSON.stringify(pkc)}`);
    note('T9',`${tag}: level switch present on gpcr; SOL and DE captions and labels differ; PKC drawn at DE only`);
    /* T5 + T7 + T6: press through with the prompt */
    await pg.evaluate(()=>__MR.reset());await settle(pg);
    for(let k=0;k<6;k++){
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
    /* a jump does not count as finishing */
    await pg.evaluate(()=>__MR.reset());await settle(pg);await go(pg,3);
    const jumpDone=await pg.evaluate(()=>({d:__MR.done(3),lit:document.querySelector('#dots button:nth-child(3)').classList.contains('done')}));
    res('T5',!jumpDone.d&&!jumpDone.lit,`${tag}: jumping to step 3 marked it done`);
    /* T14 + T17 + T18: forward transitions, sampled */
    await go(pg,0);const timing=await pg.evaluate(()=>__MR.timing());
    const badProps=new Set();let t17ok=true,t17why='',t18ok=true,t18why='';
    const travellers={1:['lig'],3:['gaO','gaI'],4:['ip3O','ip3I'],5:['ip3O','ip3I'],6:['caA0','caB0','caC0','caA1','caB1','caC1']};
    for(let k=1;k<=6;k++){await pg.evaluate(k=>__MR.goStep(k),k);const t0=Date.now();const dur=timing.dur[k];
      const beat=timing.beats[k];const samples=[];
      while(Date.now()-t0<dur+150){const el=Date.now()-t0;const A=await pg.evaluate(animProps);
        A.forEach(a=>a.props.forEach(p=>{if(p!=='transform'&&p!=='opacity')badProps.add(p+'@'+(a.id||a.pseudo||'?'));}));
        if(beat&&el>beat.from+60&&el<beat.to-120){A.filter(a=>a.inStage).forEach(a=>{if(!beat.ids.includes(a.id)){t17ok=false;t17why=`${tag}: during beat ${k} (${beat.name}) ${a.id} was animating at ${el}ms`;}});}
        for(const id of travellers[k]||[]){const o=await pg.evaluate(id=>__MR.el(id).opacity,id);if(o<0.05){t18ok=false;t18why=`${tag}: ${id} opacity ${o} mid-transition ${k}`;}}
        samples.push(A.length);await sleep(60);}
      await settle(pg);
      if(k===1||k===4||k===6){const moved=samples.some(n=>n>0);if(!moved)note('T14',`${tag}: no running animations were sampled in step ${k} (sampling too coarse?)`);}}
    res('T14',badProps.size===0,`${tag}: animated properties beyond transform/opacity: ${[...badProps].join(', ')}`);
    const d=timing.dur;res('T17',d[4]>d[3]&&d[4]>d[5]&&d[6]>d[5]&&t17ok,`${tag}: dur=${JSON.stringify(d)} ${t17why}`);
    note('T17',`${tag}: step durations ms ${JSON.stringify(d.slice(1))}; beats at steps 4 and 6`);
    res('T18',t18ok,t18why);
    /* T16: no counts or orders of magnitude; ligand unchanged from step 1 to the last state, loop included */
    const numRe=/\b\d+\s*(x|×|fold|times|molecules?|ions?|copies|thousand|million|billion|per)\b|10\^|10[⁰¹²³⁴⁵⁶⁷⁸⁹]|\d+,\d{3}|\d+e\d|\b\d{4,}\b(?!\s*(J\.|·|,))|\b\d{2,3}\b(?!\s*(of|%|J\.))/i;
    let t16ok=true,t16why='';
    for(let i=0;i<=6;i++){await go(pg,i);const txt=await pg.evaluate(()=>__MR.text().replace(document.getElementById('counter').textContent,''));const m=txt.replace(/©\s*2026|Streb 1983|Irvine 1984|Rasmussen 2011|Bio Tool #22|DE BIO 101/gi,'').match(numRe);
      if(m){t16ok=false;t16why=`${tag}: step ${i} text has "${m[0]}"`;break;}}
    const lig1=await (async()=>{await go(pg,1);return pg.evaluate(()=>__MR.el('lig').transform);})();
    await go(pg,6);await sleep(3200);const lig6=await pg.evaluate(()=>__MR.el('lig').transform);const loopCount=await pg.evaluate(()=>__MR.loopCount());
    const txt6=await pg.evaluate(()=>__MR.text().replace(document.getElementById('counter').textContent,''));const m6=txt6.replace(/©\s*2026|Streb 1983|Irvine 1984|Rasmussen 2011|Bio Tool #22|DE BIO 101/gi,'').match(numRe);
    if(m6){t16ok=false;t16why+=` ${tag}: run-on text has "${m6[0]}"`;}
    res('T16',t16ok&&lig1===lig6&&lig1!=='',`${t16why} ligand step1="${lig1}" final="${lig6}"`);
    note('T16',`${tag}: after 3.2 s of run-on the crowd held ${loopCount.ip3} IP3 and ${loopCount.ca} calcium clones; ligand transform unchanged`);
    /* T13: Teaching view and Fill screen */
    await pg.evaluate(()=>__MR.stopLoop());await go(pg,2);
    await pg.click('#teach');const tv=await pg.evaluate(()=>({pressed:document.getElementById('teach').getAttribute('aria-pressed'),teach:__MR.teach(),caps:[...document.querySelectorAll('#card .cap')].filter(c=>c.getBoundingClientRect().height>0).length,prompt:!!document.querySelector('#predict')}));
    await pg.click('#teach');
    await pg.click('#fill');const fv=await pg.evaluate(()=>({attr:document.documentElement.getAttribute('data-fill'),fill:__MR.fill(),introHidden:getComputedStyle(document.getElementById('intro')).display==='none',label:document.getElementById('fill').textContent}));
    await pg.click('#fill');const fv2=await pg.evaluate(()=>document.documentElement.getAttribute('data-fill'));
    res('T13',tv.pressed==='true'&&tv.teach&&tv.caps===6&&!tv.prompt&&fv.attr==='1'&&fv.fill&&fv.introHidden&&fv.label==='Restore page'&&fv2==='0',`${tag}: teach=${JSON.stringify(tv)} fill=${JSON.stringify(fv)} after=${fv2}`);
    /* T10: no horizontal overflow, every step */
    let ovf=true,ovfWhy='';for(let i=0;i<=6;i++){await go(pg,i);const o=await pg.evaluate(()=>({sw:document.documentElement.scrollWidth,iw:window.innerWidth}));if(o.sw>o.iw){ovf=false;ovfWhy=`${tag}: step ${i} scrollWidth ${o.sw} > ${o.iw}`;}}
    res('T10',ovf,ovfWhy);
    if(R.T10===false)await shot(pg,`FAIL-T10-${tag}`);
    /* T21: focus on the active step: scaled movers, dimmed rest, settled after */
    {await pg.evaluate(()=>__MR.setLevel('de'));await go(pg,3);await pg.evaluate(()=>__MR.goStep(4));await sleep(500);
      const mid=await pg.evaluate(()=>({f:__MR.focus(),live:!!document.querySelector('#card .cap.live'),lig:__MR.el('lig').opacity}));
      await settle(pg);await sleep(450);const after=await pg.evaluate(()=>({f:__MR.focus(),live:!!document.querySelector('#card .cap.live'),lig:__MR.el('lig').opacity}));
      const ok=mid.f.live&&mid.f.scaled.includes('ip3I')&&mid.f.scaled.includes('b4')&&mid.f.scaled.includes('lg4')&&mid.f.dimmedCount>20&&mid.lig<0.6&&mid.live&&!after.f.live&&after.f.scaled.length===0&&after.f.dimmedCount===0&&after.lig>0.99&&!after.live;
      res('T21',ok,`${tag}: mid=${JSON.stringify({scaled:mid.f.scaled,dimmed:mid.f.dimmedCount,lig:mid.lig,live:mid.live})} after=${JSON.stringify({scaled:after.f.scaled,dimmed:after.f.dimmedCount,lig:after.lig})}`);
      note('T21',`${tag}: during step 4, ${mid.f.scaled.length} parts scaled and ${mid.f.dimmedCount} of ${mid.f.topCount} drawing parts dimmed to half; all settled after`);}
    /* T22: committed predictions: 2-3 buttons of 44 px, Next never blocked, "You predicted" beside "What happened" */
    {await pg.evaluate(()=>__MR.reset());await settle(pg);
      const b=await pg.evaluate(()=>[...document.querySelectorAll('#predict .choices .opt')].map(x=>({t:x.textContent,h:x.getBoundingClientRect().height})));
      await pg.click('#next');await settle(pg);const noChoice=await pg.evaluate(()=>({step:__MR.step(),line:(document.getElementById('predline')||{}).textContent||''}));
      const b2=await pg.evaluate(()=>[...document.querySelectorAll('#predict .choices .opt')].length);
      await pg.click('#predict .choices .opt:nth-child(2)');const pressed=await pg.evaluate(()=>document.querySelector('#predict .choices .opt:nth-child(2)').getAttribute('aria-pressed'));
      await pg.click('#next');await settle(pg);const withChoice=await pg.evaluate(()=>({step:__MR.step(),pred:__MR.pred(2),line:(document.getElementById('predline')||{}).textContent||'',stored:(()=>{try{return JSON.parse(localStorage.getItem('mechreel')).per.gpcr.pred['2'];}catch(e){return 'err';}})()}));
      const teach=await pg.evaluate(()=>{__MR.setTeach(true);const n=document.querySelectorAll('#card .opt').length;__MR.setTeach(false);return n;});
      const ok=b.length>=2&&b.length<=3&&b.every(x=>x.h>=44)&&noChoice.step===1&&/What happened/.test(noChoice.line)&&!/You predicted/.test(noChoice.line)&&b2>=2&&pressed==='true'&&withChoice.step===2&&withChoice.pred===1&&/You predicted: The G protein/.test(withChoice.line)&&/What happened/.test(withChoice.line)&&withChoice.stored===1&&teach===0;
      res('T22',ok,`${tag}: buttons=${JSON.stringify(b)} noChoice=${JSON.stringify(noChoice)} pressed=${pressed} withChoice=${JSON.stringify(withChoice)} teachButtons=${teach}`);}
    /* T23: products labelled when made: DAG and IP3 labels hidden through step 3, shown from step 4 */
    {let ok=true,why='';for(let i=0;i<=6;i++){await go(pg,i);await sleep(400);const o=await pg.evaluate(()=>({dag:__MR.el('lblDag').opacity,ip3:__MR.el('ip3Label').opacity,pip:__MR.el('lblPip').opacity}));
        const want=i>=4?1:0;if(Math.abs(o.dag-want)>0.02||Math.abs(o.ip3-want)>0.02||o.pip<0.99){ok=false;why=`${tag}: step ${i} dag=${o.dag} ip3=${o.ip3} pip=${o.pip}`;break;}}
      res('T23',ok,why);}
    /* T24: the amplification counter counts up with the crowd and holds at 14 and 28 */
    {await go(pg,5);await go(pg,6);const c0=await pg.evaluate(()=>__MR.counter());await sleep(2500);const c1=await pg.evaluate(()=>__MR.counter());
      const n1=(c1.match(/\d+/g)||[]).map(Number);
      await pg.waitForFunction(()=>{const n=__MR.loopCount();return n&&n.ip3>=14&&n.ca>=28;},null,{timeout:30000}).catch(()=>{});await sleep(400);
      const cEnd=await pg.evaluate(()=>__MR.counter());const nEnd=(cEnd.match(/\d+/g)||[]).map(Number);const lc=await pg.evaluate(()=>__MR.loopCount());
      await pg.evaluate(()=>__MR.setPlaying(false));
      const ok=/Outside: 1 signal molecule/.test(c0)&&/Inside: 1 IP/.test(c0)&&n1[1]>1&&n1[2]>4&&nEnd[1]===14&&nEnd[2]===28&&lc.ip3===14&&lc.ca===28;
      res('T24',ok,`${tag}: start="${c0}" after 2.5s="${c1}" end="${cEnd}"`);note('T24',`${tag}: end "${cEnd}"`);}
    /* T25: the end screen: free text kept on the device, the misconception check, and label-it-from-memory */
    {const es=await pg.evaluate(()=>({end:!!document.getElementById('endscreen'),ta:!!document.getElementById('explain'),yn:[...document.querySelectorAll('#enterRow .opt')].map(b=>b.textContent),blank:!!document.getElementById('blankBtn'),ans:!!document.getElementById('enterAnswer')}));
      await pg.fill('#explain','One signal switches on an enzyme that keeps cutting, so one message becomes many messengers.');
      await pg.click('#enterRow .opt:nth-child(2)');
      const after=await pg.evaluate(()=>({ans:(document.getElementById('enterAnswer')||{}).textContent||'',enter:__MR.enter(),stored:(()=>{try{const p=JSON.parse(localStorage.getItem('mechreel')).per.gpcr;return {e:p.explain,n:p.enter};}catch(e){return null;}})()}));
      await pg.click('#blankBtn');await sleep(200);
      const bl=await pg.evaluate(()=>({blank:__MR.blank(),shown:__MR.blanks().map(b=>b.shown),n:__MR.blanks().length,url:location.search,reveal:!!document.getElementById('reveal'),ring:[...document.querySelectorAll('.next')].map(e=>e.id),legend:__MR.el('lg4').opacity}));
      const lbl=await pg.evaluate(()=>__MR.labels());const minBlank=Math.min(...lbl.map(l=>l.px));
      await pg.click('#reveal');await sleep(200);
      const rv=await pg.evaluate(()=>({blank:__MR.blank(),shown:__MR.blanks().map(b=>b.shown),revealed:!!document.getElementById('revealed'),items:document.querySelectorAll('#revealed li').length,url:location.search}));
      const ok=es.end&&es.ta&&es.yn.join('|')==='Yes|No'&&es.blank&&!es.ans&&/^No\./.test(after.ans)&&after.enter==='no'&&after.stored&&after.stored.n==='no'&&/keeps cutting/.test(after.stored.e)
        &&bl.blank&&bl.n>=10&&bl.shown.every((t,i)=>t===`( ${i+1} )`)&&/labels=blank/.test(bl.url)&&bl.reveal&&bl.ring[0]==='reveal'&&bl.legend<0.01&&minBlank>=18
        &&!rv.blank&&rv.shown.every(t=>!/^\( \d+ \)$/.test(t))&&rv.revealed&&rv.items===bl.n&&!/labels=blank/.test(rv.url);
      res('T25',ok,`${tag}: es=${JSON.stringify(es)} after=${JSON.stringify(after)} blank=${JSON.stringify({n:bl.n,first:bl.shown[0],url:bl.url,ring:bl.ring,legend:bl.legend,minPx:minBlank})} reveal=${JSON.stringify({items:rv.items,url:rv.url})}`);
      note('T25',`${tag}: ${bl.n} labels blanked at >= ${minBlank} px; reveal lists them all`);}
    /* T26: Slow runs at half speed and is remembered on the device */
    {await pg.evaluate(()=>{__MR.setTeach(false);document.getElementById('revealed')&&document.querySelector('#revealed button').click();});
      const t1=await pg.evaluate(()=>__MR.timing().dur[2]);await pg.click('#slow');const t2=await pg.evaluate(()=>({d:__MR.timing().dur[2],p:document.getElementById('slow').getAttribute('aria-pressed'),beat:__MR.timing().beats[4]}));
      await go(pg,1);const t0=Date.now();await pg.evaluate(()=>__MR.goStep(2));await settle(pg);const took=Date.now()-t0;
      await pg.reload({waitUntil:'load'});await pg.waitForFunction(()=>window.__MR&&window.__MR.fig());const kept=await pg.evaluate(()=>({slow:__MR.slow(),p:document.getElementById('slow').getAttribute('aria-pressed')}));
      await pg.click('#slow');const off=await pg.evaluate(()=>__MR.slow());
      const ok=t2.d===t1*2&&t2.p==='true'&&t2.beat.from===800&&took>=1400&&kept.slow&&kept.p==='true'&&!off;
      res('T26',ok,`${tag}: dur2 ${t1}->${t2.d} pressed=${t2.p} step2 took ${took}ms kept=${JSON.stringify(kept)} off=${off}`);note('T26',`${tag}: step 2 took ${took} ms at half speed (750 ms at full)`);}
    /* T8: reduced motion */
    await ctx.close();
    {const {ctx:c2,pg:p2}=await fresh(br,vp,{reducedMotion:'reduce'});await open(p2);
      const red=await p2.evaluate(()=>__MR.reduced());let anims=0,capOk=true;
      await go(p2,0);const caps=await p2.evaluate(()=>__MR.captions());
      for(let k=1;k<=6;k++){await p2.evaluate(k=>__MR.goStep(k),k);anims+=await p2.evaluate(()=>document.getAnimations().length);await settle(p2);
        const t=await p2.evaluate(()=>document.querySelector('#card').textContent);if(!t.includes(caps[k-1]))capOk=false;
        const stageCap=await p2.evaluate(k=>__MR.el('lg'+k).opacity,k);if(stageCap<0.99)capOk=false;}
      const w2=await walkT2(p2,tag+' reduced');
      res('T8',red&&anims===0&&capOk&&w2.ok,`${tag}: reduced=${red} animations during transitions=${anims} captions intact=${capOk} ${w2.why}`);
      await c2.close();}
    /* T11: storage throws */
    {const {ctx:c3,pg:p3}=await fresh(br,vp);
      await p3.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('storage blocked');}});});
      await open(p3);const ok=await p3.evaluate(()=>__MR.fig()==='gpcr'&&!!document.querySelector('#stage svg')&&document.querySelectorAll('#dots button').length===6);
      const w3=await walkT2(p3,tag+' no-storage');res('T11',ok&&w3.ok,`${tag}: renders=${ok} ${w3.why}`);await c3.close();}
  }
  /* T27: Fill screen on a 16:9 frame: the stage and the panel use the whole height */
  {const {ctx,pg}=await fresh(br,{width:1920,height:1080});await open(pg);await go(pg,3);await pg.click('#fill');await sleep(300);
    const m=await pg.evaluate(()=>{const s=document.querySelector('#stage svg').getBoundingClientRect(),b=document.getElementById('build').getBoundingClientRect(),c=document.getElementById('card').getBoundingClientRect();
      return {svgH:Math.round(s.height),svgW:Math.round(s.width),buildH:Math.round(b.height),cardW:Math.round(c.width),cardRight:Math.round(c.right),sw:document.documentElement.scrollWidth,iw:window.innerWidth,ih:window.innerHeight};});
    await pg.click('#fill');
    res('T27',m.svgH>=0.72*m.ih&&m.buildH>=0.95*m.ih&&m.cardW>=300&&m.cardRight<=m.iw&&m.sw<=m.iw,`1920x1080 fill: ${JSON.stringify(m)}`);note('T27',`1920x1080 fill: stage ${m.svgW}x${m.svgH} of ${m.iw}x${m.ih}, panel ${m.cardW} px wide`);await ctx.close();}
  /* T3: the one real visual test, at 1600 px wide so it lines up with the 1600 px reference */
  {const {ctx,pg}=await fresh(br,{width:1700,height:1200});await open(pg);await pg.evaluate(()=>__MR.setLevel('de'));
    await pg.addStyleTag({content:'.build{display:block!important}.stagerow{max-width:none!important;margin:0!important}.stage{width:1600px!important;height:1000px!important;border:none!important;border-radius:0!important}.stage svg{width:1600px!important;height:1000px!important}.wrap{max-width:none!important;padding:0!important}'});
    await go(pg,5);await go(pg,6);await pg.evaluate(()=>__MR.stopLoop());await pg.evaluate(()=>document.fonts.ready);await sleep(300);
    const svg=await pg.$('#stage svg');await svg.screenshot({path:`${OUT}/T3-final-step.png`});
    await pg.addStyleTag({content:'.stage svg .min,.stage svg .eyebrow{font-size:28px!important}'});await sleep(200);
    await svg.screenshot({path:`${OUT}/T3-final-step-28.png`});
    await ctx.close();}
  await br.close();
  /* T12 */
  const errs=consoleErrs.filter(e=>!/fonts\.g(oogleapis|static)\.com/.test(e));
  res('T12',errs.length===0,`console: ${errs.slice(0,3).join(' || ')}`);
  R.T19='N/A';NOTE.T19='No ATP is spent in gpcr; applies to transport, etc and rtk in Phase 2';
  R.T20='N/A';NOTE.T20='Phase 2 (rtk)';
  fs.writeFileSync(`${OUT}/results.json`,JSON.stringify({R,NOTE},null,1));
  for(let i=1;i<=27;i++){const t='T'+i;console.log(t,R[t]===true?'PASS':R[t]===false?'FAIL':R[t]||'not run',NOTE[t]?' -- '+NOTE[t]:'');}
})().catch(e=>{console.error(e);process.exit(1);});
