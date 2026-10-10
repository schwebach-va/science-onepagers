/* Tool walk-through videos: the one list to keep current.
   Each video lives in three places: YouTube (the full version, for home), Mr. Schwebach's
   Canvas (the Canvas Studio copy, for school), and here, which only points to the other two.
   Add a video: one entry below, then <div data-sop-video="ID"></div> under the tool's lede and
   a "walk-through video" link on the hub entry. The hub lists build themselves from this file.
   (c) J. R. Schwebach, CC BY-NC 4.0 */
(function(){
var BIO='Biology I and Advanced Biology I', DE='DE Bio 101';
var V=[
 {id:'cell-check',tool:'Bio Tool #13',name:'Cell Check',page:'cell-check-diagnostic.html',yt:'rD5_JWUGtsQ',len:'3½ min',
  title:'Watch me take Cell Check, missing some on purpose',
  canvas:{bio:'Module 2 → Lesson 7 → Cell Check — the two targets to study before the Module 2 test',
          de:'Unit 4 → Q1 Review · Chapter 4 → Cell Check — find which of the six ideas is costing you the others'}},
 {id:'checkpoint-companion',tool:'Bio Tool #9',name:'Checkpoint Companion',page:'checkpoint-companion.html',yt:'_Nm4dwPhHgk',len:'4½ min',
  title:'A wrong answer is a SAM: watch me turn a miss into a finished SAM',
  canvas:{de:'Module 0A → Checkpoint Companion — watch a wrong answer become a SAM'}},
 {id:'membrane-patch',tool:'Bio Tool #5',name:'The Membrane Patch',page:'membrane-patch.html',yt:'cCRfwicuFIU',len:'4 min',
  title:'Watch me build the membrane, predicting before every step',
  canvas:{bio:'Module 2 → Lesson 5 → The Membrane Patch — build it, turn it, run it',
          de:'Unit 5 → The Membrane Patch — build it, turn it, run it (posted when Unit 5 opens)'}},
 {id:'protein-route',tool:'Bio Tool #18',name:'The Protein Route',page:'protein-route.html',yt:'kSFTNMwHOEQ',len:'3½ min',
  title:'Watch me run the Protein Route at the SOL Bio level',
  canvas:{bio:'Module 2 → Lesson 6 → The Protein Route — insulin out of the cell'}}
];
window.SOP_VIDEOS=V;
var WARN='<b>At Battlefield, or on any Prince William County iPad or network,</b> watch it in Mr. Schwebach’s Canvas, where it plays from Canvas Studio.';
var HOME='<b>At home only,</b> on your own device and off the county network:';
var css='.sop-vid{margin:.4rem 0 1.2rem;border:1px solid var(--rule,#DDD8CE);border-left:5px solid var(--bond,#1F7A8C);border-radius:8px;background:var(--card,#fff);padding:.75rem 1rem;max-width:46rem;font-family:Archivo,"Helvetica Neue",Arial,sans-serif;font-size:.92rem;line-height:1.45;color:var(--ink,#1D1A15)}'+
'.sop-vid h4,.sop-vid .h{margin:0 0 .35rem;font-size:1rem;font-weight:600}.sop-vid .h span{font-weight:500;color:var(--ink-soft,#5A544A);font-size:.88rem}'+
'.sop-vid p{margin:.3rem 0}.sop-vid ul{margin:.25rem 0 .35rem;padding-left:1.15rem}.sop-vid li{margin:.15rem 0}'+
'.sop-vid a{color:var(--bond,#1F7A8C);font-weight:600}.sop-vid .where{color:var(--ink-soft,#5A544A)}'+
'.sop-vid .item{border-top:1px solid var(--rule,#DDD8CE);padding:.55rem 0 .2rem;margin-top:.5rem}.sop-vid .item:first-of-type{border-top:0}';
function addCss(){if(document.getElementById('sop-vid-css'))return;var s=document.createElement('style');s.id='sop-vid-css';s.textContent=css;document.head.appendChild(s)}
function yt(v){return '<a href="https://youtu.be/'+v.yt+'" target="_blank" rel="noopener">watch it on YouTube ↗</a>'}
function where(v,only){var o=[];if(v.canvas.bio&&(!only||only==='bio'))o.push('<li><b>'+BIO+':</b> <span class="where">'+v.canvas.bio+'</span></li>');
 if(v.canvas.de&&(!only||only==='de'))o.push('<li><b>'+DE+':</b> <span class="where">'+v.canvas.de+'</span></li>');return '<ul>'+o.join('')+'</ul>'}
function render(){
 addCss();
 document.querySelectorAll('[data-sop-video]').forEach(function(el){var v=V.filter(function(x){return x.id===el.getAttribute('data-sop-video')})[0];if(!v)return;
  el.className='sop-vid';el.innerHTML='<p class="h">▶ '+v.title+' <span>· '+v.len+', captions on</span></p><p>'+WARN+'</p>'+where(v)+'<p>'+HOME+' '+yt(v)+'</p>'});
 document.querySelectorAll('[data-sop-videos]').forEach(function(el){var c=el.getAttribute('data-sop-videos');
  var list=V.filter(function(v){return v.canvas[c]});
  el.className='sop-vid';el.id=el.id||'videos';
  el.innerHTML='<h4>Walk-through videos: watch me use the tools</h4><p>'+WARN+' '+HOME.replace(':','')+', use the YouTube link.</p>'+
   list.map(function(v){return '<div class="item"><p><b>'+v.tool+' · <a href="tools/'+v.page+'">'+v.name+'</a></b> — '+v.title+' ('+v.len+')</p><p class="where">In Canvas: '+v.canvas[c]+'</p><p>At home: '+yt(v)+'</p></div>'}).join('')});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
})();
