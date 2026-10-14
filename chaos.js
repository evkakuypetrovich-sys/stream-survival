/* Stream Survival — авто-хаос. 50+ событий сами по себе, эскалация, лимит 8 одновременно, пауза на скрытой вкладке, тумблер «хватит». */
(()=>{const D=document,J=window.JOKES||{news:[],ach:[],excuses:[],chat:[],users:[],reviews:[],patch:[]},RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const P=a=>a[Math.random()*a.length|0],R=(a,b)=>a+Math.random()*(b-a);
const css=D.createElement('style');css.textContent=`
.cx{position:fixed;z-index:9000;pointer-events:none}
.cxrun{bottom:40px;font-size:44px;pointer-events:auto;cursor:pointer;animation:cxr linear forwards}.cxrun.rtl{animation-name:cxl}
.cxrun .bub{position:absolute;bottom:100%;left:50%;transform:translateX(-50%);white-space:nowrap;background:#000;color:#e8d24a;border:2px solid #b5562a;font:11px/1.3 monospace;padding:3px 6px}
.cxrun.rtl>i{display:inline-block;transform:scaleX(-1)}
@keyframes cxr{from{left:-90px}to{left:calc(100vw + 90px)}}@keyframes cxl{from{left:calc(100vw + 90px)}to{left:-90px}}
.cxbig{inset:0;display:flex;align-items:center;justify-content:center;z-index:9500}.cxbig b{font:900 clamp(30px,9vw,120px)/1.05 Impact,'Arial Black',sans-serif;text-align:center;max-width:94vw;-webkit-text-stroke:2px #000;text-shadow:4px 4px 0 #000;animation:cxin .6s cubic-bezier(.2,1.6,.4,1)}@keyframes cxin{from{transform:scale(3);opacity:0}}
.cxtint{inset:0;z-index:8900;mix-blend-mode:multiply;animation:cxf 4s forwards}@keyframes cxf{0%,100%{opacity:0}15%,80%{opacity:1}}
.cxfall{top:-60px;font-size:30px;animation:cxfa linear forwards}@keyframes cxfa{to{transform:translateY(112vh) rotate(540deg)}}
.cxcard{left:12px;bottom:46px;max-width:min(300px,78vw);background:#1f2417;color:#d8d3bd;border:3px solid #b5562a;padding:8px 12px;font:14px/1.35 "Pixelify",monospace;box-shadow:3px 3px 0 #000;animation:cxsl .4s;pointer-events:auto}
.cxcard.r{left:auto;right:12px;bottom:110px;animation-name:cxsr}.cxcard h4{margin:0 0 4px;font:10px "PS2P";color:#e8d24a}
@keyframes cxsl{from{transform:translateX(-120%)}}@keyframes cxsr{from{transform:translateX(120%)}}
.cxdon{top:70px;left:50%;transform:translateX(-50%);background:linear-gradient(#5b2a8a,#2a0f4a);color:#fff;border:3px solid #e8d24a;padding:10px 18px;text-align:center;font:12px/1.6 "PS2P";animation:cxin .5s}
.cxwasted{inset:0;z-index:9600;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55);animation:cxf 3.2s forwards}.cxwasted b{color:#c8102e;font:900 clamp(34px,10vw,130px) Impact,sans-serif;text-shadow:3px 3px 0 #000}
html.cxgray body>*:not(.cx){filter:grayscale(1)}
.cxbroken{animation:cxbrk .5s forwards!important}@keyframes cxbrk{to{transform:rotate(7deg) translateY(14px);filter:brightness(.6) sepia(.6)}}
.cxfix{animation:cxfx .6s}@keyframes cxfx{from{transform:rotate(7deg) translateY(14px)}}
.cxham{font-size:34px;animation:cxh .25s infinite alternate}@keyframes cxh{to{transform:rotate(-35deg)}}
html.cxshake body{animation:shk .4s 2}html.cxtilt body{transform:rotate(-1.5deg);transition:transform .5s}html body{transition:transform .5s}
html.cxinv body{filter:invert(1) hue-rotate(180deg)}html.cxblur main{filter:blur(2px)}html.cxupside .hero h1{transform:rotate(180deg)}html.cxcomic body{font-family:"Comic Sans MS",cursive!important}
.cxfloat{font-size:28px;animation:cxup 3s ease-out forwards}@keyframes cxup{to{transform:translateY(-60vh);opacity:0}}
.cxeyes{right:20px;top:45%;font-size:40px;animation:cxf 4s forwards}
#cxctl{position:fixed;left:8px;top:58px;z-index:9700;background:#000;color:#e8d24a;border:2px solid #b5562a;font:10px "PS2P";padding:6px 8px;cursor:pointer}
@media(max-width:640px){.cxrun{font-size:34px}#cxctl{top:auto;bottom:44px}}`;D.head.appendChild(css);
// state
let mode=localStorage.getItem('ss-chaos')||'chaos',live=0,t0=Date.now();const MAX=8;
const ctl=D.createElement('button');ctl.id='cxctl';D.body.appendChild(ctl);
const lbl={chaos:'🔥 ХАОС',calm:'😌 СПОКОЙНО',off:'🛑 ХВАТИТ'},nxt={chaos:'calm',calm:'off',off:'chaos'};
const upd=()=>{ctl.textContent=lbl[mode]+(mode==='chaos'?' x'+lvl().toFixed(1):'');ctl.title='Нажми: '+lbl[nxt[mode]]};
ctl.onclick=()=>{mode=nxt[mode];localStorage.setItem('ss-chaos',mode);upd();T(mode==='off'?'Ладно-ладно. Хаос выключен. (Чат недоволен)':mode==='calm'?'Режим «спокойно»: хаос на минималках':'ХАОС ВКЛЮЧЁН. Удачи.')};
const lvl=()=>Math.min(1+(Date.now()-t0)/60000,6); // escalates over 5 min
setInterval(upd,3000);upd();
// helpers
const B=(f,d,t)=>window.beep&&beep(f,d,t),T=m=>window.toast?toast(m):0;
function el(cls,html,ms,style){if(live>=MAX)return null;live++;const e=D.createElement('div');e.className='cx '+cls;if(html!=null)e.innerHTML=html;if(style)Object.assign(e.style,style);D.body.appendChild(e);setTimeout(()=>{e.remove();live--},ms);return e}
const txt=s=>{const d=D.createElement('div');d.textContent=s;return d.innerHTML};
const big=(t,c='#e8d24a',ms=2200)=>el('cxbig',`<b style="color:${c}">${txt(t)}</b>`,ms);
const flash=(c,ms=4000)=>el('cxtint','',ms,{background:c});
const hcls=(c,ms)=>{if(RM)return;D.documentElement.classList.add(c);setTimeout(()=>D.documentElement.classList.remove(c),ms)};
const rain=(list,n)=>{n=RM?Math.min(n,6):n;for(let i=0;i<n;i++)el('cxfall',txt(P(list)),5200,{left:R(0,98)+'vw',animationDuration:R(2,4.5)+'s',animationDelay:R(0,1.2)+'s'})};
const run=(emo,say,rtl=Math.random()<.5,dur=R(6,10))=>{const e=el('cxrun'+(rtl?' rtl':''),`<span class="bub">${txt(say)}</span><i>${emo}</i>`,dur*1000+300,{animationDuration:dur+'s'});if(e)e.onclick=()=>{e.querySelector('.bub').textContent=P(J.excuses)||'ой';B(200,.2,'sawtooth')}};
const card=(h,b,right,ms=7000)=>el('cxcard'+(right?' r':''),`<h4>${txt(h)}</h4>${txt(b)}`,ms);
const donate=(n,sum,msg)=>{el('cxdon',`💸 ${txt(n)} задонатил ${sum} ₽<br><small style="font:13px Pixelify">${txt(msg)}</small>`,4500);B(880,.1,'triangle');setTimeout(()=>B(1320,.15,'triangle'),120)};
const float=(e,n=8)=>{for(let i=0;i<n;i++)el('cxfloat',e,3200,{left:R(5,95)+'vw',bottom:'40px',animationDelay:R(0,1)+'s'})};
const targets=()=>[...D.querySelectorAll('.card,.stat,.meme,.gallery img,h2,.btn:not(#runaway)')].filter(x=>{const r=x.getBoundingClientRect();return r.top>60&&r.bottom<innerHeight-40});
const U=()=>P(J.users)||'chatter';
// ===== events (weight, fn) =====
const E=[
[5,()=>run('🧟','иду обниматься')],[4,()=>run('🧟‍♀️','где стример?')],[3,()=>run('👻','бу. ну пожалуйста, бу')],
[3,()=>run('🚗','би-бип, я из !car',false,R(3,5))],[3,()=>run('👷','прораб: «█████!»')],[3,()=>run('🐔','курица-босс идёт')],
[2,()=>run('🐟','рыба сбежала из !fish')],[2,()=>run('🧍','воздухан идёт за инструментом',undefined,16)],
[2,()=>run('🦆','кря (радиоактивно)')],[2,()=>run('🐈','котость подтверждена')],[2,()=>run('📦','сундук ушёл сам')],
[2,()=>{for(let i=0;i<4;i++)setTimeout(()=>run('🧟','ОРДА',false,R(5,7)),i*500)}],
[2,()=>run('🌿','черемша мигрирует')],[2,()=>run('🤖','бот_вася модерирует')],
[3,()=>{flash('rgba(200,0,0,.45)');big('🌕 КРОВАВАЯ ЛУНА','#ff3030');B(90,.8,'sawtooth')}],
[3,()=>{flash('rgba(0,0,40,.75)',3500);big('🌙 ЧАТ КУПИЛ !night','#9ad')}],
[2,()=>{flash('rgba(0,0,0,.85)',3000);el('cxeyes','👀',4000);T('!darkness. Кто-то смотрит.')}],
[2,()=>{flash('rgba(120,160,255,.35)');rain(['💧','💧','⚡'],18);big('⛈ !storm','#bdf')}],
[2,()=>{flash('rgba(150,255,0,.3)');rain(['☢'],12);T('☢ Выброс! Прячьтесь в бункер (в футер)')}],
[3,()=>{big('⚠ РЕЙД ЧАТА ⚠','#ff8a3d');for(let i=0;i<5;i++)setTimeout(()=>run(P(['🧟','👻','🧍','🐔']),U()+': РЕЙД!',true,R(4,6)),i*350)}],
[4,()=>donate(U(),P([5,67,100,228,500,1000]),P(J.chat)||'!zombie')],
[2,()=>donate('аноним',1,'на черемшу')],[2,()=>donate(U(),67,'6-7 🤷')],
[2,()=>{hcls('cxgray',3200);el('cxwasted','<b>СТРИМЕР УМЕР</b>',3200);B(150,.6,'sawtooth')}],
[1,()=>{hcls('cxgray',3200);el('cxwasted','<b>ТЫ ЗАБУРМАЛДЕН</b>',3200)}],
[3,()=>{rain(['🪙','🪙','💰'],20);T('Монеты чата падают с неба! (поймать нельзя)')}],
[2,()=>rain(['🧟','👻'],16)],[1,()=>rain(['🌿'],14)],[1,()=>rain(['🐔'],10)],[1,()=>rain(['█████'],10)],
[4,()=>card('📻 РАДИО КПК',P(J.news))],[3,()=>card('📟 ЛИЧНОЕ СООБЩЕНИЕ',P(['Сталкер, принеси черемшу. Награда: 6-7 монет','Прораб ищет тебя. Причина: █████','Житель просит задание. Или перекур','Бункер №3 открыт. Внутри палка'])  ,true)],
[3,()=>card(P(J.ach)||'🏆','Получено автоматически. Ты ничего не делал.',true,5000)],
[3,()=>card('📝 ПАТЧ-НОУТ',P(J.patch))],[2,()=>card('⭐ ОТЗЫВ',P(J.reviews),true)],
[3,()=>card('🙅 ОТМАЗКА ЖИТЕЛЯ',P(J.excuses))],
[3,()=>{const t=P(targets());if(!t)return;const r=t.getBoundingClientRect();const h=el('cxham','🔨',2600,{left:r.left+r.width/2+'px',top:r.top-30+'px'});if(!h)return;B(300,.05);t.classList.add('cxbroken');T('Прораб «чинит» элемент. █████');setTimeout(()=>{t.classList.remove('cxbroken');t.classList.add('cxfix');setTimeout(()=>t.classList.remove('cxfix'),700)},2400)}],
[2,()=>{const ts=targets().slice(0,3);ts.forEach(t=>t.classList.add('cxbroken'));T('💥 Зомби сломал страницу');setTimeout(()=>{ts.forEach(t=>{t.classList.remove('cxbroken');t.classList.add('cxfix')});T('👷 Жители отстроили. Прогресс 100% (честно)')},3000)}],
[2,()=>{hcls('cxshake',900);T('Землетрясение! (это буря)')}],[1,()=>{hcls('cxtilt',3000);T('Сайт накренился. Прораб: «так задумано»')}],
[1,()=>{hcls('cxinv',1200);T('Радиация инвертировала цвета')}],[1,()=>{hcls('cxblur',2000);T('Туман с болота')}],
[1,()=>{hcls('cxupside',3000);T('Заголовок перевернулся. Австралийский сервер')}],[1,()=>{hcls('cxcomic',3500);T('Шрифт заражён. Comic Sans детектед')}],
[3,()=>float('❤️',8)],[2,()=>float('💀',6)],[2,()=>float('🗿',5)],[2,()=>float('+1 аура',4)],
[3,()=>big(P(['6-7','МОЖНО. А ЗАЧЕМ?','БУРМАЛДА','ВОЗДУХАН','СИГМА','█████!','ЧАТ ВИНОВАТ','ЧЕРЕМША']),P(['#e8d24a','#ff8a3d','#9bd34a','#ff4fd8']),1600)],
[3,()=>T(P(J.news))],[2,()=>T(U()+': '+(P(J.chat)||'!zombie'))],[1,()=>{const o=D.title;D.title='🧟 ЗОМБИ В ВКЛАДКЕ';setTimeout(()=>D.title=o,4000)}],
[1,()=>T('Сохранение… Ошибка: сохранять нечего')],[1,()=>T('Обновление 0.3.1 скачано на 67%… отменено чатом')],
[1,()=>card('📞 ВХОДЯЩИЙ','Прораб звонит. Сбросили за тебя.',true,4000)],[1,()=>card('🛒 МАГАЗИН','Скидка 100% на !zombie. Только для зомби.')],
[2,()=>{const s=D.querySelector('.stat b');if(s){s.textContent=(Math.random()*1e7|0).toLocaleString('ru-RU');T('Статистика пересчитана на глаз')}}],
[1,()=>{float('🎉',10);T('Юбилей: 1000-й зомби обиделся')}],
];
const W=E.reduce((s,e)=>s+e[0],0);
function fire(){let r=Math.random()*W;for(const [w,f] of E){if((r-=w)<0){try{f()}catch(e){}return}}}
function loop(){const L=lvl();const base=mode==='chaos'?R(2500,6000)/L:mode==='calm'?R(25000,45000):3000;
 setTimeout(()=>{if(mode!=='off'&&!D.hidden&&live<MAX){fire();if(mode==='chaos'&&L>3&&Math.random()<.4)setTimeout(fire,700);if(mode==='chaos'&&L>5&&Math.random()<.3)setTimeout(fire,1400)}loop()},Math.max(base,700))}
setTimeout(loop,1500);if(location.search.includes("shot")){setTimeout(()=>{E[0][1]();E[13][1]();E[19][1]();E[25][1]();E[27][1]();E[19][1]()},300)}
window.CHAOS={fire,E,count:E.length};
})();
