/* Acceptance tests for the Mechanism Reel, Phase 2 figure 1: dogma, per §7 of the brief plus T21-T27.
   A copy of mechanism-reel-tests.js with dogma's own travellers, beats, labels and end screen.
   Programmatic assertions throughout; the only screenshot is T3 (plus one per FAIL).
   T3's comparison: python3 t3-compare-dogma.py after this run (writes the two-up image). */
const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const OUT=__dirname;  /* screenshots and results-dogma.json land here */
const BASE='http://127.0.0.1:8765/biology/tools/mechanism-reel.html';
const URL=BASE+'?anim=dogma';
const KEYS=['gpcr','rtk','transport','etc','dogma','cloning'];
const ENABLED={gpcr:true,dogma:true};
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
  /* a transition waiting out its delay is listed by getAnimations() but moves nothing yet; T17 counts only the active ones */
  let active=true;try{const ct=a.effect.getComputedTiming();active=a.currentTime!=null&&a.currentTime>=(ct.delay||0);}catch(e){}
  return {props:[...props],id,active,inStage:!!(a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('#stage')),pseudo:a.effect&&a.effect.pseudoElement||null};});
const STRIP=/©\s*2026|Nirenberg 1961|Crick 1970|Berget & Sharp 1977|Bio Tool #22|DE BIO 101/gi;

(async()=>{
  const br=await chromium.launch();
  for(const vp of [{width:1180,height:820},{width:390,height:844}]){
    const tag=`${vp.width}x${vp.height}`;
    const {ctx,pg}=await fresh(br,vp);
    /* T1: six deep links; gpcr and dogma open, the four placeholders assert as disabled, not missing */
    for(const k of KEYS){await open(pg,`${BASE}?fig=${k}`);const fig=await pg.evaluate(()=>__MR.fig());
      const info=await pg.evaluate(k=>{const f=__MR.figs().find(x=>x.key===k);const b=document.querySelector(`.selbtn[data-fig="${k}"]`);return {present:!!f,enabled:f&&f.enabled,btn:!!b,disabled:b&&b.disabled};},k);
      if(ENABLED[k]){res('T1',fig===k&&info.btn&&!info.disabled,`${tag}: ?fig=${k} gave ${fig}`);}
      else{res('T1',fig==='gpcr'&&info.present&&info.enabled===false&&info.btn&&info.disabled===true,`${tag}: ?fig=${k} entry present=${info.present} disabled=${info.disabled} fig=${fig}`);}}
    await open(pg,BASE);await pg.click('.selbtn[data-fig="dogma"]');res('T1',(await pg.evaluate(()=>__MR.fig()))==='dogma',`${tag}: selector click on dogma`);
    /* per-step links, and the last step of a figure with no run-on */
    await open(pg,`${BASE}?anim=dogma&step=3`);const s3=await pg.evaluate(()=>({step:__MR.step(),done:__MR.done(3),url:location.search,level:__MR.level()}));
    res('T1',s3.step===3&&!s3.done&&/anim=dogma/.test(s3.url)&&/step=3/.test(s3.url)&&/level=sol/.test(s3.url)&&s3.level==='sol',`${tag}: ?anim=dogma&step=3 gave ${JSON.stringify(s3)}`);
    await open(pg,`${BASE}?anim=dogma&step=4&level=de`);const s4=await pg.evaluate(()=>({step:__MR.step(),level:__MR.level(),url:location.search}));
    res('T1',s4.step===4&&s4.level==='de'&&/level=de/.test(s4.url),`${tag}: &level=de gave ${JSON.stringify(s4)}`);
    await open(pg,`${BASE}?anim=dogma&step=6&runon=paused`);await sleep(600);
    const last=await pg.evaluate(()=>({step:__MR.step(),playing:__MR.playing(),count:__MR.loopCount(),ring:[...document.querySelectorAll('.next')].map(e=>e.id),readout:__MR.readout(),counter:__MR.counter(),playDisabled:document.getElementById('play').disabled,end:!!document.getElementById('endscreen')}));
    res('T1',last.step===6&&!last.playing&&last.count===null&&last.ring.length===1&&last.ring[0]==='blankBtn'&&last.readout===''&&last.counter===''&&last.playDisabled&&last.end,`${tag}: last step gave ${JSON.stringify(last)}`);
    note('T1',`${tag}: ?anim=dogma&step=n opens state n unlit; &level=de holds; no run-on, so at step 6 Play is disabled, the counter and readout are empty and the ring is on Label it from memory`);
    /* T15: order and bridges */
    await open(pg);
    const selText=await pg.evaluate(()=>[...document.querySelectorAll('#sel > li')].map(l=>l.textContent.trim()));
    const titleIdx=TITLES.map(t=>selText.findIndex(s=>s.includes(t)));
    const ordered=titleIdx.every((v,i)=>v>=0&&(i===0||v>titleIdx[i-1]));
    const bridgesOk=BRIDGES.every((b,i)=>{const j=selText.findIndex(s=>s===b);return j===titleIdx[i]+1;});
    const soon=await pg.evaluate(()=>[...document.querySelectorAll('.selbtn')].filter(b=>b.disabled).map(b=>b.dataset.fig));
    res('T15',ordered&&bridgesOk&&soon.join(',')==='rtk,transport,etc,cloning',`${tag}: order ${JSON.stringify(titleIdx)} bridges ${bridgesOk} soon=${soon}`);
    /* T2 */
    const w=await walkT2(pg,tag);res('T2',w.ok,w.why);
    /* T4: every step, both levels */
    let minPx=Infinity,minRun=Infinity,minAt='';
    for(const lv of ['sol','de']){await pg.evaluate(l=>__MR.setLevel(l),lv);
      for(let i=0;i<=6;i++){await go(pg,i);const L=await pg.evaluate(()=>__MR.labels());
        L.forEach(l=>{if(l.px<minPx){minPx=l.px;minAt=`"${l.text.slice(0,30)}" step ${i}`;}if(l.minRunPx<minRun)minRun=l.minRunPx;});}}
    await pg.evaluate(()=>__MR.setLevel('sol'));
    res('T4',minPx>=18,`${tag}: min label ${minPx}px (${minAt})`);note('T4',`${tag}: min label ${minPx} px at a 1000 px stage; smallest sub/superscript run ${minRun} px`);
    /* T9: the switch is present on dogma and changes captions and labels. "Absent on the other four" cannot be asserted while they are placeholders */
    const capsSol=await pg.evaluate(()=>{__MR.setLevel('sol');return __MR.captions().join('|');});
    const capsDe=await pg.evaluate(()=>{__MR.setLevel('de');return __MR.captions().join('|');});
    await go(pg,6);const lbDe=await pg.evaluate(()=>__MR.labels().filter(l=>l.visible).map(l=>l.text).join('|'));
    await pg.evaluate(()=>__MR.setLevel('sol'));const lbSol=await pg.evaluate(()=>__MR.labels().filter(l=>l.visible).map(l=>l.text).join('|'));
    const lvPresent=await pg.evaluate(()=>!!document.getElementById('levelrow')&&document.getElementById('levelrow').isConnected&&document.querySelectorAll('#levelrow [data-lv]').length===2);
    const solWords=/first copy/.test(lbSol)&&/extra piece/.test(lbSol)&&/messenger RNA/.test(lbSol)&&/matching piece/.test(lbSol)&&!/intron|anticodon|pre-mRNA/.test(lbSol);
    const deWords=/pre-mRNA/.test(lbDe)&&/intron/.test(lbDe)&&/anticodon/.test(lbDe)&&/tRNA/.test(lbDe);
    res('T9',lvPresent&&capsSol!==capsDe&&lbDe!==lbSol&&solWords&&deWords,`${tag}: control present=${lvPresent} captions differ=${capsSol!==capsDe} labels differ=${lbDe!==lbSol} solWords=${solWords} deWords=${deWords}`);
    note('T9',`${tag}: level switch present on dogma; SOL and DE captions and labels differ (first copy / pre-mRNA, extra piece / intron, matching piece / anticodon, transfer RNA / tRNA)`);
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
    res('T6',endRing.length===1&&endRing[0]==='blankBtn',`${tag}: ring at final state ${JSON.stringify(endRing)}`);
    /* a jump does not count as finishing */
    await pg.evaluate(()=>__MR.reset());await settle(pg);await go(pg,3);
    const jumpDone=await pg.evaluate(()=>({d:__MR.done(3),lit:document.querySelector('#dots button:nth-child(3)').classList.contains('done')}));
    res('T5',!jumpDone.d&&!jumpDone.lit,`${tag}: jumping to step 3 marked it done`);
    /* T14 + T17 + T18: forward transitions, sampled */
    await go(pg,0);const timing=await pg.evaluate(()=>__MR.timing());
    const badProps=new Set();let t17ok=true,t17why='',t18ok=true,t18why='';
    /* travellers, and the moment from which each must be visible (the message's exons appear in the nucleus first; the first bead appears at the ribosome end) */
    const travellers={1:[['pol',0]],3:[['ex2',700],['cap',1300],['tail',1300]],4:[['rL',0],['rS',0],['tA',0]],5:[['tB',0],['tC',1400]],6:[['bead0',400],['bead3',1000]]};
    for(let k=1;k<=6;k++){await pg.evaluate(k=>__MR.goStep(k),k);const t0=Date.now();const dur=timing.dur[k];
      const beat=timing.beats[k];const samples=[];
      while(Date.now()-t0<dur+150){const el=Date.now()-t0;const A=await pg.evaluate(animProps);
        A.forEach(a=>a.props.forEach(p=>{if(p!=='transform'&&p!=='opacity')badProps.add(p+'@'+(a.id||a.pseudo||'?'));}));
        if(beat&&el>beat.from+60&&el<beat.to-120){A.filter(a=>a.inStage&&a.active).forEach(a=>{if(!beat.ids.includes(a.id)){t17ok=false;t17why=`${tag}: during beat ${k} (${beat.name}) ${a.id} was animating at ${el}ms`;}});}
        for(const [id,from] of travellers[k]||[]){if(el<from)continue;const o=await pg.evaluate(id=>__MR.el(id).opacity,id);if(o<0.05){t18ok=false;t18why=`${tag}: ${id} opacity ${o} at ${el}ms of transition ${k}`;}}
        samples.push(A.length);await sleep(60);}
      await settle(pg);
      if(k===1||k===3||k===5){const moved=samples.some(n=>n>0);if(!moved)note('T14',`${tag}: no running animations were sampled in step ${k} (sampling too coarse?)`);}}
    res('T14',badProps.size===0,`${tag}: animated properties beyond transform/opacity: ${[...badProps].join(', ')}`);
    const d=timing.dur;res('T17',d[3]>d[2]&&d[3]>d[4]&&d[5]>d[4]&&d[5]>d[6]&&t17ok,`${tag}: dur=${JSON.stringify(d)} ${t17why}`);
    note('T17',`${tag}: step durations ms ${JSON.stringify(d.slice(1))}; beats at steps 3 (the copy leaves the nucleus) and 5 (the anticodon seats)`);
    res('T18',t18ok,t18why);
    /* T16: no counts or orders of magnitude; the gene unchanged from step 1 to the last state; no run-on and no counter (D8) */
    const numRe=/\b\d+\s*(x|×|fold|times|molecules?|ions?|copies|thousand|million|billion|per)\b|10\^|10[⁰¹²³⁴⁵⁶⁷⁸⁹]|\d+,\d{3}|\d+e\d|\b\d{4,}\b(?!\s*(J\.|·|,))|\b\d{2,3}\b(?!\s*(of|%|J\.))/i;
    let t16ok=true,t16why='';
    for(const lv of ['sol','de']){await pg.evaluate(l=>__MR.setLevel(l),lv);
      for(let i=0;i<=6;i++){await go(pg,i);const txt=await pg.evaluate(()=>__MR.text());const m=txt.replace(STRIP,'').match(numRe);
        if(m){t16ok=false;t16why=`${tag}: ${lv} step ${i} text has "${m[0]}"`;break;}}}
    const dna1=await (async()=>{await go(pg,1);return pg.evaluate(()=>__MR.el('dna').transform);})();
    await go(pg,6);await sleep(600);const dna6=await pg.evaluate(()=>({t:__MR.el('dna').transform,counter:__MR.counter(),loop:__MR.loopCount(),playing:__MR.playing()}));
    res('T16',t16ok&&dna1===dna6.t&&dna1!==''&&dna6.counter===''&&dna6.loop===null&&!dna6.playing,`${t16why} gene step1="${dna1}" final="${dna6.t}" counter="${dna6.counter}" loop=${dna6.loop}`);
    note('T16',`${tag}: no count or order of magnitude at any step, either level; the gene's transform is unchanged from step 1 to 6; no counter and no run-on`);
    await pg.evaluate(()=>__MR.setLevel('sol'));
    /* T13: Teaching view and Fill screen */
    await go(pg,2);
    await pg.click('#teach');const tv=await pg.evaluate(()=>({pressed:document.getElementById('teach').getAttribute('aria-pressed'),teach:__MR.teach(),caps:[...document.querySelectorAll('#card .cap')].filter(c=>c.getBoundingClientRect().height>0).length,prompt:!!document.querySelector('#predict')}));
    await pg.click('#teach');
    await pg.click('#fill');const fv=await pg.evaluate(()=>({attr:document.documentElement.getAttribute('data-fill'),fill:__MR.fill(),introHidden:getComputedStyle(document.getElementById('intro')).display==='none',label:document.getElementById('fill').textContent}));
    await pg.click('#fill');const fv2=await pg.evaluate(()=>document.documentElement.getAttribute('data-fill'));
    res('T13',tv.pressed==='true'&&tv.teach&&tv.caps===6&&!tv.prompt&&fv.attr==='1'&&fv.fill&&fv.introHidden&&fv.label==='Restore page'&&fv2==='0',`${tag}: teach=${JSON.stringify(tv)} fill=${JSON.stringify(fv)} after=${fv2}`);
    /* T10: no horizontal overflow, every step */
    let ovf=true,ovfWhy='';for(let i=0;i<=6;i++){await go(pg,i);const o=await pg.evaluate(()=>({sw:document.documentElement.scrollWidth,iw:window.innerWidth}));if(o.sw>o.iw){ovf=false;ovfWhy=`${tag}: step ${i} scrollWidth ${o.sw} > ${o.iw}`;}}
    res('T10',ovf,ovfWhy);
    if(R.T10===false)await shot(pg,`FAIL-T10-dogma-${tag}`);
    /* T21: focus on the active step: scaled movers, dimmed rest, settled after (step 4: the ribosome closes around the message) */
    {await pg.evaluate(()=>__MR.setLevel('de'));await go(pg,3);await pg.evaluate(()=>__MR.goStep(4));await sleep(450);
      const mid=await pg.evaluate(()=>({f:__MR.focus(),live:!!document.querySelector('#card .cap.live'),pol:__MR.el('pol').opacity}));
      await settle(pg);await sleep(450);const after=await pg.evaluate(()=>({f:__MR.focus(),live:!!document.querySelector('#card .cap.live'),pol:__MR.el('pol').opacity}));
      const ok=mid.f.live&&mid.f.scaled.includes('rL')&&mid.f.scaled.includes('rS')&&mid.f.scaled.includes('b4')&&mid.f.scaled.includes('lg4')&&mid.f.dimmedCount>20&&mid.pol<0.6&&mid.live&&!after.f.live&&after.f.scaled.length===0&&after.f.dimmedCount===0&&after.pol>0.99&&!after.live;
      res('T21',ok,`${tag}: mid=${JSON.stringify({scaled:mid.f.scaled,dimmed:mid.f.dimmedCount,pol:mid.pol,live:mid.live})} after=${JSON.stringify({scaled:after.f.scaled,dimmed:after.f.dimmedCount,pol:after.pol})}`);
      note('T21',`${tag}: during step 4, ${mid.f.scaled.length} parts scaled and ${mid.f.dimmedCount} of ${mid.f.topCount} drawing parts dimmed to half; all settled after`);}
    /* T22: committed predictions: 2-3 buttons of 44 px, Next never blocked, "You predicted" beside "What happened" */
    {await pg.evaluate(()=>__MR.setLevel('sol'));await pg.evaluate(()=>__MR.reset());await settle(pg);
      const b=await pg.evaluate(()=>[...document.querySelectorAll('#predict .choices .opt')].map(x=>({t:x.textContent,h:x.getBoundingClientRect().height})));
      await pg.click('#next');await settle(pg);const noChoice=await pg.evaluate(()=>({step:__MR.step(),line:(document.getElementById('predline')||{}).textContent||''}));
      const b2=await pg.evaluate(()=>[...document.querySelectorAll('#predict .choices .opt')].length);
      await pg.click('#predict .choices .opt:nth-child(2)');const pressed=await pg.evaluate(()=>document.querySelector('#predict .choices .opt:nth-child(2)').getAttribute('aria-pressed'));
      await pg.click('#next');await settle(pg);const withChoice=await pg.evaluate(()=>({step:__MR.step(),pred:__MR.pred(2),line:(document.getElementById('predline')||{}).textContent||'',stored:(()=>{try{return JSON.parse(localStorage.getItem('mechreel')).per.dogma.pred['2'];}catch(e){return 'err';}})()}));
      const teach=await pg.evaluate(()=>{__MR.setTeach(true);const n=document.querySelectorAll('#card .opt').length;__MR.setTeach(false);return n;});
      /* every prompt, both levels, has 2 or 3 choices */
      const counts=await pg.evaluate(()=>{const out=[];for(const l of['sol','de']){__MR.setLevel(l);for(let k=1;k<=6;k++)out.push(__MR.choices(k).length);}__MR.setLevel('sol');return out;});
      const ok=b.length>=2&&b.length<=3&&b.every(x=>x.h>=44)&&noChoice.step===1&&/What happened/.test(noChoice.line)&&!/You predicted/.test(noChoice.line)&&b2>=2&&pressed==='true'&&withChoice.step===2&&withChoice.pred===1&&/You predicted: Yes, it goes straight to a ribosome/.test(withChoice.line)&&/What happened/.test(withChoice.line)&&withChoice.stored===1&&teach===0&&counts.every(n=>n>=2&&n<=3);
      res('T22',ok,`${tag}: buttons=${JSON.stringify(b)} noChoice=${JSON.stringify(noChoice)} pressed=${pressed} withChoice=${JSON.stringify(withChoice)} teachButtons=${teach} counts=${counts}`);
      /* D9: at step 3 one choice has the DNA itself leaving */
      const dnaChoice=await pg.evaluate(()=>__MR.choices(3).some(c=>/DNA itself/.test(c)));res('T22',dnaChoice,`${tag}: step 3 has no "DNA itself" choice`);}
    /* T23: products labelled when made: pre-mRNA at step 1, mRNA at 3, codon and ribosome at 4, tRNA and anticodon at 5, the polypeptide at 6; DNA always */
    {let ok=true,why='';const WANT={lblPre:1,lblM:3,lblCodon:4,lblRib:4,lblT:5,lblAnti:5,lblPoly:6,lblDna:0,lblNuc:0,lblPore:0};
      for(const lv of ['sol','de']){await pg.evaluate(l=>__MR.setLevel(l),lv);
        for(let i=0;i<=6&&ok;i++){await go(pg,i);await sleep(400);const o=await pg.evaluate(ids=>Object.fromEntries(ids.map(id=>[id,__MR.el(id)?__MR.el(id).opacity:null])),Object.keys(WANT));
          for(const id in WANT){const want=i>=WANT[id]?1:0;if(o[id]==null||Math.abs(o[id]-want)>0.02){ok=false;why=`${tag}: ${lv} step ${i} ${id}=${o[id]} wanted ${want}`;break;}}}}
      await pg.evaluate(()=>__MR.setLevel('sol'));res('T23',ok,why);}
    /* T24: the amplification counter is gpcr's. dogma has none (D8): assert nothing counts at the last step */
    {await go(pg,5);await go(pg,6);await sleep(1500);const c=await pg.evaluate(()=>({counter:__MR.counter(),loop:__MR.loopCount(),readout:__MR.readout(),playing:__MR.playing(),playDisabled:document.getElementById('play').disabled}));
      const ok=c.counter===''&&c.loop===null&&c.readout===''&&!c.playing&&c.playDisabled;
      if(ok){R.T24='N/A';NOTE.T24=`${tag}: no counter and no run-on on dogma (D8); counter empty, Play disabled at the last step`;}else res('T24',false,`${tag}: ${JSON.stringify(c)}`);}
    /* T25: the end screen: free text kept on the device, the misconception check, and label-it-from-memory */
    {const es=await pg.evaluate(()=>({end:!!document.getElementById('endscreen'),ta:!!document.getElementById('explain'),q:[...document.querySelectorAll('#endscreen .q')].map(e=>e.textContent).join('|'),yn:[...document.querySelectorAll('#enterRow .opt')].map(b=>b.textContent),blank:!!document.getElementById('blankBtn'),ans:!!document.getElementById('enterAnswer')}));
      await pg.fill('#explain','The gene stays put; a copy of it leaves the nucleus and the ribosome reads the copy.');
      await pg.click('#enterRow .opt:nth-child(2)');
      const after=await pg.evaluate(()=>({ans:(document.getElementById('enterAnswer')||{}).textContent||'',enter:__MR.enter(),stored:(()=>{try{const p=JSON.parse(localStorage.getItem('mechreel')).per.dogma;return {e:p.explain,n:p.enter};}catch(e){return null;}})()}));
      await pg.click('#blankBtn');await sleep(200);
      const bl=await pg.evaluate(()=>({blank:__MR.blank(),shown:__MR.blanks().map(b=>b.shown),n:__MR.blanks().length,url:location.search,reveal:!!document.getElementById('reveal'),ring:[...document.querySelectorAll('.next')].map(e=>e.id),legend:__MR.el('lg4').opacity,in2:(document.querySelector('#stage #lblIn2')||{}).textContent}));
      const lbl=await pg.evaluate(()=>__MR.labels());const minBlank=Math.min(...lbl.map(l=>l.px));
      await pg.click('#reveal');await sleep(200);
      const rv=await pg.evaluate(()=>({blank:__MR.blank(),shown:__MR.blanks().map(b=>b.shown),revealed:!!document.getElementById('revealed'),items:document.querySelectorAll('#revealed li').length,url:location.search}));
      const ok=es.end&&es.ta&&/Does the DNA leave the nucleus\?/.test(es.q)&&es.yn.join('|')==='Yes|No'&&es.blank&&!es.ans&&/^No\. The gene never leaves/.test(after.ans)&&after.enter==='no'&&after.stored&&after.stored.n==='no'&&/stays put/.test(after.stored.e)
        &&bl.blank&&bl.n>=10&&bl.shown.every((t,i)=>t===`( ${i+1} )`)&&bl.in2===''&&/labels=blank/.test(bl.url)&&bl.reveal&&bl.ring[0]==='reveal'&&bl.legend<0.01&&minBlank>=18
        &&!rv.blank&&rv.shown.every(t=>!/^\( \d+ \)$/.test(t))&&rv.revealed&&rv.items===bl.n&&!/labels=blank/.test(rv.url);
      res('T25',ok,`${tag}: es=${JSON.stringify(es)} after=${JSON.stringify(after)} blank=${JSON.stringify({n:bl.n,first:bl.shown[0],url:bl.url,ring:bl.ring,legend:bl.legend,minPx:minBlank,in2:bl.in2})} reveal=${JSON.stringify({items:rv.items,url:rv.url})}`);
      note('T25',`${tag}: ${bl.n} labels blanked at >= ${minBlank} px; reveal lists them all; the check is "Does the DNA leave the nucleus?"`);
      /* &labels=blank as a link, at DE */
      await open(pg,`${BASE}?anim=dogma&labels=blank&level=de`);const bl2=await pg.evaluate(()=>({blank:__MR.blank(),step:__MR.step(),n:__MR.blanks().length,first:__MR.blanks()[0].shown}));
      res('T25',bl2.blank&&bl2.step===6&&bl2.n>=10&&bl2.first==='( 1 )',`${tag}: &labels=blank gave ${JSON.stringify(bl2)}`);
      await open(pg);}
    /* T26: Slow runs at half speed and is remembered on the device */
    {await pg.evaluate(()=>{__MR.setTeach(false);document.getElementById('revealed')&&document.querySelector('#revealed button').click();});
      const t1=await pg.evaluate(()=>__MR.timing().dur[2]);await pg.click('#slow');const t2=await pg.evaluate(()=>({d:__MR.timing().dur[2],p:document.getElementById('slow').getAttribute('aria-pressed'),beat:__MR.timing().beats[3]}));
      await go(pg,1);const t0=Date.now();await pg.evaluate(()=>__MR.goStep(2));await settle(pg);const took=Date.now()-t0;
      await pg.reload({waitUntil:'load'});await pg.waitForFunction(()=>window.__MR&&window.__MR.fig());const kept=await pg.evaluate(()=>({slow:__MR.slow(),p:document.getElementById('slow').getAttribute('aria-pressed'),fig:__MR.fig()}));
      await pg.click('#slow');const off=await pg.evaluate(()=>__MR.slow());
      const ok=t2.d===t1*2&&t2.p==='true'&&t2.beat.from===2400&&t2.beat.to===4200&&took>=1400&&kept.slow&&kept.p==='true'&&kept.fig==='dogma'&&!off;
      res('T26',ok,`${tag}: dur2 ${t1}->${t2.d} pressed=${t2.p} beat3=${JSON.stringify(t2.beat)} step2 took ${took}ms kept=${JSON.stringify(kept)} off=${off}`);note('T26',`${tag}: step 2 took ${took} ms at half speed (750 ms at full)`);}
    /* T8: reduced motion */
    await ctx.close();
    {const {ctx:c2,pg:p2}=await fresh(br,vp,{reducedMotion:'reduce'});await open(p2);
      const red=await p2.evaluate(()=>__MR.reduced());let anims=0,capOk=true;
      await go(p2,0);const caps=await p2.evaluate(()=>__MR.captions());
      for(let k=1;k<=6;k++){await p2.evaluate(k=>__MR.goStep(k),k);anims+=await p2.evaluate(()=>document.getAnimations().filter(a=>a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('#stage')).length);await settle(p2);
        const t=await p2.evaluate(()=>document.querySelector('#card').textContent);if(!t.includes(caps[k-1]))capOk=false;
        const stageCap=await p2.evaluate(k=>__MR.el('lg'+k).opacity,k);if(stageCap<0.99)capOk=false;}
      const w2=await walkT2(p2,tag+' reduced');
      res('T8',red&&anims===0&&capOk&&w2.ok,`${tag}: reduced=${red} stage animations during transitions=${anims} captions intact=${capOk} ${w2.why}`);
      await c2.close();}
    /* T11: storage throws */
    {const {ctx:c3,pg:p3}=await fresh(br,vp);
      await p3.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('storage blocked');}});});
      await open(p3);const ok=await p3.evaluate(()=>__MR.fig()==='dogma'&&!!document.querySelector('#stage svg')&&document.querySelectorAll('#dots button').length===6);
      const w3=await walkT2(p3,tag+' no-storage');res('T11',ok&&w3.ok,`${tag}: renders=${ok} ${w3.why}`);await c3.close();}
  }
  /* T27: Fill screen on a 16:9 frame: the stage and the panel use the whole height */
  {const {ctx,pg}=await fresh(br,{width:1920,height:1080});await open(pg);await go(pg,3);await pg.click('#fill');await sleep(300);
    const m=await pg.evaluate(()=>{const s=document.querySelector('#stage svg').getBoundingClientRect(),b=document.getElementById('build').getBoundingClientRect(),c=document.getElementById('card').getBoundingClientRect();
      return {svgH:Math.round(s.height),svgW:Math.round(s.width),buildH:Math.round(b.height),cardW:Math.round(c.width),cardRight:Math.round(c.right),sw:document.documentElement.scrollWidth,iw:window.innerWidth,ih:window.innerHeight};});
    await pg.click('#fill');
    res('T27',m.svgH>=0.72*m.ih&&m.buildH>=0.95*m.ih&&m.cardW>=300&&m.cardRight<=m.iw&&m.sw<=m.iw,`1920x1080 fill: ${JSON.stringify(m)}`);note('T27',`1920x1080 fill: stage ${m.svgW}x${m.svgH} of ${m.iw}x${m.ih}, panel ${m.cardW} px wide`);await ctx.close();}
  /* T3: the one real visual test, at 1600 px wide so it lines up with the 1600 px reference. DE is the still's wording; SOL is shot too, for the record */
  {const {ctx,pg}=await fresh(br,{width:1700,height:1200});await open(pg);await pg.evaluate(()=>__MR.setLevel('de'));
    await pg.addStyleTag({content:'.build{display:block!important}.stagerow{max-width:none!important;margin:0!important}.stage{width:1600px!important;height:1000px!important;border:none!important;border-radius:0!important}.stage svg{width:1600px!important;height:1000px!important}.wrap{max-width:none!important;padding:0!important}'});
    await go(pg,5);await go(pg,6);await pg.evaluate(()=>document.fonts.ready);await sleep(400);
    const r=await pg.evaluate(()=>{const b=document.querySelector('#stage svg').getBoundingClientRect();return {x:b.x+window.scrollX,y:b.y+window.scrollY};});
    const clip={x:Math.round(r.x),y:Math.round(r.y),width:1600,height:1000};
    await pg.screenshot({path:`${OUT}/T3-dogma-final-step.png`,clip,fullPage:true});
    await pg.evaluate(()=>__MR.setLevel('sol'));await sleep(400);await pg.screenshot({path:`${OUT}/T3-dogma-final-step-sol.png`,clip,fullPage:true});
    await ctx.close();}
  await br.close();
  /* T12 */
  const errs=consoleErrs.filter(e=>!/fonts\.g(oogleapis|static)\.com/.test(e));
  res('T12',errs.length===0,`console: ${errs.slice(0,3).join(' || ')}`);
  R.T19='N/A';NOTE.T19='No ATP is spent in dogma; applies to transport, etc and rtk';
  R.T20='N/A';NOTE.T20='rtk only';
  fs.writeFileSync(`${OUT}/results-dogma.json`,JSON.stringify({R,NOTE},null,1));
  for(let i=1;i<=27;i++){const t='T'+i;console.log(t,R[t]===true?'PASS':R[t]===false?'FAIL':R[t]||'not run',NOTE[t]?' -- '+NOTE[t]:'');}
})().catch(e=>{console.error(e);process.exit(1);});
