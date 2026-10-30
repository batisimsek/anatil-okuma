/* ANATİL – özgün okuma/yazma çalışma defteri. Kullanıcının çalışma sayfalarından esinlenmiştir. */
(()=>{
'use strict';
const $=s=>document.querySelector(s);
const root=$('#workbook'), tab=$('#modeWorkbook');
if(!root||!tab)return;
const STORAGE='anatil-wb-v2', ALPHABET=[...'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ'];
const SYLLABLES=['an','en','in','na','ne','ni','at','et','it','ta','te','ti','al','el','il','la','le','li','an','en','at','al'];
const WORDS=[
'al','el','il','in','an','en','at','et','it','ne','ile','ele','ala','elli','enli','etli','ille','ilan','lila','lale','ilet','alet','atlet','anlat','telli','tatil','aile','inan',
'Nail','Naile','Nalan','Nil','Ela','Lale','Ali','Altan','Ata','İnal','Lina','Talat','Atilla',
'naneli','taneli','laleli','ellili','atletli','inatla','nane','anne','nene','anneanne','anteni','nal','tel','nine','atla','altta','alttan','anla','anlat','inat','ilan','anten','net','tane','tane','ten','tente','alt','tat','tatlı',
'Anne','Tuna','Lale','Ali','Atila','Alin','Lina','Elin','Neila','Lita','Latif','Nihat',
'elma','masa','masal','kalem','okul','araba','balon','kedi','kitap','baba','dede','top','kuzu','mavi','sarı','ev','su','oyun','çiçek','arkadaş','kalemlik','defter','mantar','deniz','güneş','Doruk','Güneş'
];
const VISUAL=[
{icon:'✋',word:'el',hint:'Parmaklarımızın olduğu yer'},
{icon:'🌷',word:'lale',hint:'Bir çiçek'},
{icon:'🐎',word:'at',hint:'Dört ayaklı bir hayvan'},
{icon:'🧵',word:'tel',hint:'İnce, uzun bir şey'},
{icon:'👨‍👩‍👧‍👦',word:'aile',hint:'Yakınlarımız'},
{icon:'🏃',word:'atlet',hint:'Spor yapan kişi'},
{icon:'🧰',word:'alet',hint:'İş yaparken kullandığımız araç'},
{icon:'🏖️',word:'tatil',hint:'Dinlenme zamanı'},
{icon:'👵',word:'nine',hint:'Büyükannemiz'},
{icon:'🌱',word:'nane',hint:'Güzel kokan bir bitki'},
{icon:'👩',word:'anne',hint:'Ailemizdeki bir kişi'},
{icon:'5️⃣0️⃣',word:'elli',hint:'50 sayısı'},
{icon:'📡',word:'anten',hint:'Sinyal alan nesne'},
{icon:'🍎',word:'elma',hint:'Kırmızı veya yeşil bir meyve'},
{icon:'🐈',word:'kedi',hint:'Miyavlayan hayvan'},
{icon:'⚽',word:'top',hint:'Oyun aracı'},
{icon:'🐟',word:'balık',hint:'Suda yaşayan hayvan'},
{icon:'📖',word:'kitap',hint:'Okumak için açarız'},
{icon:'🌞',word:'güneş',hint:'Gökyüzünde ışık ve ısı verir'},
{icon:'🏠',word:'ev',hint:'Yaşadığımız yer'}
];
const SENTENCES=[
'Talat ata nal al.','Ali ile Lale el ele.','Nil, elli lila lale al.','Nalan, telli alet al.','Ali, lale al.','Talat, lila atlet al.',
'Ela, lale al.','Nail, alttan in.','Nil, lale al.','Talat, atlet al.','Anne, lale al.','Lale ile Ali el ele.',
'Ela, aileni anlat.','Nalan, aileni anlat.','Nail, telli alet al.','Talat, ata nal al.',
'Ela, nane al.','Ali, nane al.','Nil ile Ela el ele.','Nail, ilet.','Ela, ilanı anlat.','Ali, anla.',
'Talat, lale al.','Nalan, elli tane lale al.','Nail, atla.','Ali, atla.','Ela, inan.','Nil, anne ile el ele.',
'Anne, tane tane anlat.','Ali, anneye lale al.','Ela, laleli atlet al.','Nalan, lila lale al.',
'Lale, annene lale al.','Talat, aileyi anlat.','Ali, aileyi anlat.','Anne, naneli tat al.',
'Nalan ile Lale el ele.','Ali ile Nil el ele.','Nail, el ele atla.','Anne, alet al.',
'Nene, lale al.','Ata, el ele atla.','Ali, anten al.','Nalan, anneye lale al.',
'Anne, elma al.','Ali, kalem al.','Lale, kitap al.','Güneş, top al.','Doruk, top at.',
'Kedi, mama ye.','Baba, eve gel.','Anne, bana bak.','Dede, masal anlat.','Ela, okula git.',
'Güneş, güzel bir çiçek al.','Küçük kedi eve gel.','Doruk, mavi topu al.'
];
const GAPS=[
['Talat ata ____ al.','nal'],['Nil, ____ lale al.','elli'],['Ali, ____ al.','lale'],['Talat, lila ____ al.','atlet'],
['Nalan, ____ alet al.','telli'],['Ela, ____ anlat.','aileni'],['Nail, ____ in.','alttan'],['Anne, ____ al.','lale'],
['Nil ile Lale el ____.','ele'],['Talat, ata ____ al.','nal'],['Ali ile Ela el ____.','ele'],['Nil, lila ____ al.','lale'],
['Nalan, ____ tane lale al.','elli'],['Ali, ____ al.','nane'],['Nail, ____ al.','anten'],['Ela, lila ____ al.','atlet'],
['Anne, ____ al.','elma'],['Dede, ____ anlat.','masal'],['Güneş, ____ al.','top'],['Ali, ____ al.','kalem']
].map(([pre,answer])=>({pre,answer}));
const MODE=[
{id:'syllable',name:'🔤 Hece',title:'Heceleri 3 Kez Oku',help:'Her okumadan sonra bir kalbe dokun.'},
{id:'word',name:'📖 Kelime',title:'Kelime Okuma',help:'Kelimeyi önce kendin oku. Sonra sesini dinleyebilirsin.'},
{id:'visual',name:'🖼️ Görsel',title:'Görsel Dikte',help:'Resme bakarak kelimeyi yaz.'},
{id:'gap',name:'🧩 Eksik Kelime',title:'Eksik Kelimeyi Bul',help:'Cümleyi tamamlayan kelimeyi seç.'},
{id:'order',name:'🔀 Cümle Kur',title:'Cümleyi Oluştur',help:'Kelimelere doğru sırayla dokun.'},
{id:'copy',name:'✍️ Yazı',title:'Oku ve Yaz',help:'Cümleyi oku, ardından kalemle veya klavyeyle yaz.'}
];
const mk=(tag,cls,value)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(value!==undefined)e.textContent=String(value);return e};
const append=(parent,...elems)=>{elems.forEach(x=>{if(x!=null)parent.append(typeof x==='string'?document.createTextNode(x):x)});return parent};
const btn=(text,cls,handler)=>{const e=mk('button',cls,text);e.type='button';if(handler)e.addEventListener('click',handler);return e};
const action=(...b)=>append(mk('div','wb-actions'),...b);
let state={};try{state=JSON.parse(localStorage.getItem(STORAGE))||{}}catch{}
if(!state||typeof state!=='object')state={};
state.stats=state.stats||{done:0,right:0,wrong:0,reads:0};
state.queues=state.queues||{};
let mode='syllable',current=null,heart=0,done=false,wrong=false,picks=[],selected=[],deck=[],typed='',writingMode='draw',lastMessage='';
function save(){try{localStorage.setItem(STORAGE,JSON.stringify(state))}catch{}}
function enabled(){try{const s=JSON.parse(localStorage.getItem('anatil-letters'));if(Array.isArray(s))return s;return ['A','N','E','T','İ','L']}catch{return ['A','N','E','T','İ','L']}}
function allowed(str){const set=new Set(enabled());return [...str.toLocaleUpperCase('tr-TR')].filter(c=>ALPHABET.includes(c)).every(c=>set.has(c))}
function normalize(str){return String(str).trim().replace(/[.!?,]+$/g,'').replace(/\s+/g,' ').toLocaleLowerCase('tr-TR')}
function shuffle(values){const a=[...values];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function pool(){
 switch(mode){
 case 'syllable':return [...new Set(SYLLABLES)].filter(allowed);
 case 'word':return [...new Set(WORDS)].filter(allowed);
 case 'visual':return VISUAL.filter(x=>allowed(x.word));
 case 'gap':return GAPS.filter(x=>allowed(x.pre.replace('____','')+x.answer));
 case 'order': case 'copy':return [...new Set(SENTENCES)].filter(allowed);
 default:return [];
 }
}
function itemKey(item){return typeof item==='string'?item:('pre'in item?item.pre+'|'+item.answer:item.word)}
function nextItem(){
 const collection=pool();
 if(!collection.length){current=null;return}
 const sig=mode+'|'+[...enabled()].sort().join('');
 let remaining=state.queues[sig];
 const keys=collection.map(itemKey);
 if(!Array.isArray(remaining)||remaining.length===0)remaining=shuffle(keys);
 remaining=remaining.filter(k=>keys.includes(k));
 if(!remaining.length)remaining=shuffle(keys);
 const picked=remaining.shift();
 state.queues[sig]=remaining;save();
 current=collection.find(x=>itemKey(x)===picked)||collection[0];
 heart=0;done=false;wrong=false;picks=[];selected=[];deck=[];typed='';lastMessage='';
}
function setFeedback(message,success=false){
 lastMessage=message;
 const e=$('#wbFeedback');if(e){e.textContent=message;e.style.color=success?'#087d5a':'#a44b31'}
}
function stats(){
 const e=$('#wbStat');if(e)e.textContent='⭐ '+(state.stats.done||0)+' tamamlanan • '+pool().length+' çalışma';
 const p=$('#wbParentStats');if(p)p.textContent='Çalışma defteri: '+(state.stats.done||0)+' tamamlanan, '+(state.stats.right||0)+' doğru, '+(state.stats.wrong||0)+' yanlış deneme, '+(state.stats.reads||0)+' tekrar okuma.';
}
function markCompleted(message){if(done)return;done=true;state.stats.done++;save();setFeedback(message,true);stats()}
function score(correct){
 if(done)return;
 if(correct){done=true;state.stats.done++;state.stats.right++;save();setFeedback('🌟 Harika! Başardın!',true)}
 else {state.stats.wrong++;save();setFeedback('🌱 Bir daha deneyebilirsin!')}
 stats();
}
function listen(str){
 if(!('speechSynthesis'in window)){setFeedback('Bu cihaz sesli okumayı desteklemiyor.');return}
 const ss=window.speechSynthesis,voice=ss.getVoices().find(v=>v.lang.toLowerCase().startsWith('tr'));
 if(!voice){setFeedback('Türkçe ses bulunamadı. Bir yetişkin okuyabilir.');return}
 ss.cancel();const utterance=new SpeechSynthesisUtterance(String(str).toLocaleLowerCase('tr-TR'));utterance.voice=voice;utterance.lang='tr-TR';utterance.rate=.75;ss.speak(utterance);
}
function next(){nextItem();render()}
function nextButton(){return btn('➡️ Sonraki','primary',next)}
function redrawStatus(){const old=lastMessage;render();if(old)setFeedback(old,done)}
function createOptions(answer){
 const candidates=[...new Set(WORDS)].filter(w=>allowed(w)&&normalize(w)!==normalize(answer));
 const different=shuffle(candidates.filter(w=>Math.abs(w.length-answer.length)<=2));
 return shuffle([answer,...different.slice(0,3)]);
}
function render(){
 const host=$('#wbContent');host.replaceChildren();
 const meta=MODE.find(x=>x.id===mode);
 $('#wbTitle').textContent=meta.title;$('#wbTip').textContent=meta.help;
 $('#wbModeButtons').replaceChildren(...MODE.map(m=>btn(m.name,m.id===mode?'chosen':'',()=>select(m.id))));
 $('#wbFeedback').textContent='';stats();
 if(!current){
  append(host,mk('div','wb-stage','Bu bölümde öğrenilmiş seslerle uygun çalışma bulunamadı.'),mk('p','wb-help','Fotoğraflardaki etkinlikler için A, N, E, T, İ ve L seslerini ebeveyn panelinden seçebilirsin.'));return;
 }
 const stage=mk('div','wb-stage'),control=mk('div');
 if(mode==='syllable'){
  append(stage,mk('div','wb-big',current.toLocaleLowerCase('tr-TR')));
  const hearts=mk('div','wb-hearts');
  for(let i=0;i<3;i++){
   const h=btn(i<heart?'❤️':'♡','wb-heart',()=>{
    if(done||heart!==i)return;
    heart++;state.stats.reads++;save();
    if(heart===3)markCompleted('🌟 Üç tekrar tamamlandı!');else setFeedback('Güzel! Bir kez daha oku.',true);
    redrawStatus()
   });
   h.disabled=done||heart!==i;h.setAttribute('aria-label',(i+1)+'. tekrar');hearts.append(h)
  }
  append(control,hearts,action(btn('🔊 Dinle','',()=>listen(current)),nextButton()));
 }else if(mode==='word'){
  append(stage,mk('div','wb-big',current));
  append(control,action(btn('🔊 Dinle','',()=>listen(current)),btn('⭐ Okudum!','primary',()=>{markCompleted('🌟 Okuma tamamlandı!');redrawStatus()}),nextButton()));
 }else if(mode==='visual'){
  append(stage,mk('div','wb-emoji',current.icon),mk('p','wb-help','Bu nedir?'));
  const input=mk('input','wb-writeinput');input.type='text';input.autocomplete='off';input.autocapitalize='off';input.placeholder='Kelimeyi buraya yaz';input.value=typed;
  input.setAttribute('aria-label','Görseldeki kelime');
  input.addEventListener('input',()=>{typed=input.value});
  const check=()=>{if(done)return;if(normalize(typed)===normalize(current.word)){score(true);input.disabled=true}else score(false)};
  input.addEventListener('keydown',e=>{if(e.key==='Enter')check()});
  append(control,input,action(btn('💡 İpucu','',()=>setFeedback(current.hint)),btn('✅ Kontrol Et','primary',check),nextButton()));
 }else if(mode==='gap'){
  append(stage,mk('div','wb-target',current.pre.replace('____','______')));
  if(!picks.length)picks=createOptions(current.answer);
  const grid=mk('div','wb-choicegrid');
  picks.forEach(p=>grid.append(btn(p,'wb-choice',()=>{
   if(done)return;
   if(normalize(p)===normalize(current.answer)){score(true);redrawStatus()}else score(false);
  })));
  append(control,grid,action(nextButton()));
 }else if(mode==='order'){
  const parts=current.split(/\s+/);
  if(!deck.length)deck=shuffle(parts.map((_,i)=>i));
  append(stage,mk('p','wb-help','Kelimelere doğru sırayla dokun.'),mk('div','wb-target',selected.map(i=>parts[i]).join(' ')||'...'));
  const tiles=mk('div','wb-letters');
  for(const index of deck){
   if(selected.includes(index))continue;
   tiles.append(btn(parts[index],'wb-letter',()=>{if(done)return;selected.push(index);redrawStatus()}));
  }
  const check=()=>{if(done)return;if(selected.length!==parts.length){setFeedback('Bütün kelimeleri seç.');return}
   score(selected.map(i=>parts[i]).join(' ')===current)};
  append(control,tiles,action(btn('↩️ Geri Al','',()=>{selected.pop();redrawStatus()}),btn('✅ Kontrol Et','primary',check),nextButton()));
 }else if(mode==='copy'){
  append(stage,mk('div','wb-target',current));
  const switcher=mk('div','wb-switch');
  append(switcher,btn('✏️ Kalemle Yaz',writingMode==='draw'?'chosen':'',()=>{writingMode='draw';redrawStatus()}),
   btn('⌨️ Klavyeyle Yaz',writingMode==='type'?'chosen':'',()=>{writingMode='type';redrawStatus()}));
  control.append(switcher);
  if(writingMode==='type'){
   const input=mk('textarea','wb-writeinput');input.rows=2;input.placeholder='Cümleyi buraya yaz';input.value=typed;
   input.addEventListener('input',()=>typed=input.value);
   append(control,input,action(btn('✅ Kontrol Et','primary',()=>{if(!done)score(normalize(typed)===normalize(current))}),nextButton()));
  }else{
   const canvas=mk('canvas','wb-canvas');canvas.setAttribute('aria-label','Parmağınla veya kalemle yazı alanı');
   const note=mk('p','wb-footnote','El yazısını bir yetişkin kontrol eder. Cevap otomatik tanınmaz.');
   control.append(canvas,note);
   append(control,action(btn('🧽 Temizle','',()=>clearCanvas(canvas)),btn('⭐ Yazdım!','primary',()=>{markCompleted('🌟 Yazdım! Bir yetişkin yazını kontrol etsin.')}),nextButton()));
   requestAnimationFrame(()=>setupCanvas(canvas));
  }
 }
 host.append(stage,control);
}
function clearCanvas(canvas){const ctx=canvas.getContext('2d');ctx.clearRect(0,0,canvas.width,canvas.height)}
function setupCanvas(canvas){
 if(!canvas.isConnected)return;
 const rect=canvas.getBoundingClientRect(),scale=Math.max(1,Math.min(devicePixelRatio||1,3));
 canvas.width=Math.round(rect.width*scale);canvas.height=Math.round(rect.height*scale);
 const ctx=canvas.getContext('2d');ctx.setTransform(scale,0,0,scale,0,0);ctx.strokeStyle='#263959';ctx.lineCap='round';ctx.lineJoin='round';ctx.lineWidth=3.3;
 let painting=false;
 const xy=e=>{const r=canvas.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top}};
 canvas.addEventListener('pointerdown',e=>{e.preventDefault();painting=true;canvas.setPointerCapture(e.pointerId);const p=xy(e);ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x+.1,p.y+.1);ctx.stroke()});
 canvas.addEventListener('pointermove',e=>{if(!painting)return;e.preventDefault();const p=xy(e);ctx.lineTo(p.x,p.y);ctx.stroke()});
 canvas.addEventListener('pointerup',()=>painting=false);
 canvas.addEventListener('pointercancel',()=>painting=false)
}
function select(value){if(!MODE.some(m=>m.id===value))return;mode=value;nextItem();render()}
tab.addEventListener('click',()=>{root.classList.remove('hidden');$('#game').classList.add('hidden');$('#reading').classList.add('hidden');$('#modeWrite').classList.remove('active');$('#modeRead').classList.remove('active');tab.classList.add('active');nextItem();render()});
for(const id of ['modeWrite','modeRead'])$('#'+id).addEventListener('click',()=>{root.classList.add('hidden');tab.classList.remove('active')});
$('#parentBtn').addEventListener('click',()=>root.classList.add('hidden'));
$('#close').addEventListener('click',()=>{if(tab.classList.contains('active')){$('#game').classList.add('hidden');$('#reading').classList.add('hidden');root.classList.remove('hidden');nextItem();render()}});
const reset=$('#resetExercises');
reset.addEventListener('click',()=>{
 state.queues={};state.stats={done:0,right:0,wrong:0,reads:0};save();stats();
 for(const key of Object.keys(localStorage)){if(key.startsWith('gunes-write-v4')||key.startsWith('gunes-reading-v4'))localStorage.removeItem(key)}
});
const parent=$('#parents');
if(parent){
 const box=mk('div','wb-status');
 append(box,mk('h3',null,'📚 ANATİL çalışma defteri'),mk('p','muted','Fotoğraflardan uyarlanan etkinlikler ve yeni kelime/cümleler.'),
  btn('📖 A N E T İ L seslerini aç','',()=>{
   const old=new Set(enabled());
   for(const letter of ['A','N','E','T','İ','L']){
    if(old.has(letter))continue;
    const button=[...document.querySelectorAll('#letters button')].find(b=>b.textContent.trim().startsWith(letter+' '));
    if(button)button.click();
   }
   const desc=$('#availableInfo');if(desc)desc.textContent='A N E T İ L etkinleştirildi. Yeni çalışmalar hazır.';
   stats();
  }));
 const info=mk('p','wb-progress');info.id='wbParentStats';
 append(box,info);
 const anchor=$('#resetExercises');anchor.parentElement.insertBefore(box,anchor);
}
nextItem();render();
})();