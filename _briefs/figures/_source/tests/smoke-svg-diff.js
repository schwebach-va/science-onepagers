const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const URL='http://127.0.0.1:8765/biology/tools/mechanism-reel.html';
(async()=>{
  const br=await chromium.launch();
  const pg=await br.newPage({viewport:{width:1180,height:820}});
  const errs=[];pg.on('console',m=>{if(m.type()==='error')errs.push(m.text());});pg.on('pageerror',e=>errs.push('PAGEERROR '+e.message));
  await pg.goto(URL,{waitUntil:'load'});
  await pg.waitForFunction(()=>window.__MR&&window.__MR.fig());
  await pg.evaluate(()=>__MR.setLevel('de'));
  console.log('fig',await pg.evaluate(()=>__MR.fig()),'steps',await pg.evaluate(()=>__MR.steps()));
  await pg.evaluate(()=>__MR.goStep(6));
  await pg.waitForFunction(()=>!__MR.busy());
  await pg.evaluate(()=>__MR.stopLoop());
  const svg=await pg.evaluate(()=>document.querySelector('#stage svg').outerHTML);
  console.log('console errors:',errs);
  const norm=s=>s.split('\n').map(l=>l.trim()).filter(Boolean)
    .filter(l=>!/^<\/?(svg|title|desc|metadata|style|defs|g)\b/.test(l)&&!/^<\/?(rdf|cc|dc)/.test(l)&&!/^@font-face|^text\{|^\.(key|lab|min|soft|ttl|eyebrow)\{|^<\?xml|^<text id="ttl"|^<title/.test(l))
    .map(l=>l.replace(/ id="[^"]*"/g,'').replace(/ class="mv"/g,'').replace(/ style="[^"]*"/g,'').replace(/><\/(rect|circle|polygon|line|path)>/g,"/>").replace(/<\/g>$/,"").replace(/\s+\/>/g,'/>').replace(/\s+>/g,'>'))
    .filter(l=>l&&l!=='<g>');
  const still=norm(fs.readFileSync('/home/user/science-onepagers/_briefs/figures/01-gpcr-pathway.svg','utf8'));
  const ours=norm(svg);
  const count=a=>{const m=new Map();a.forEach(x=>m.set(x,(m.get(x)||0)+1));return m;};
  const A=count(still),B=count(ours);
  const onlyStill=[],onlyOurs=[];
  for(const[k,v]of A){const w=B.get(k)||0;if(w<v)onlyStill.push(`${v-w}x ${k}`);}
  for(const[k,v]of B){const w=A.get(k)||0;if(w<v)onlyOurs.push(`${v-w}x ${k}`);}
  console.log('lines still',still.length,'ours',ours.length);
  console.log('--- only in still ---');onlyStill.forEach(l=>console.log(l));
  console.log('--- only in ours ---');onlyOurs.forEach(l=>console.log(l));
  await br.close();
})().catch(e=>{console.error(e);process.exit(1);});
