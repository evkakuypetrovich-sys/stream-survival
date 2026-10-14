const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
// lightbox with navigation
const imgs=$$('.gallery img'),lb=$('#lightbox'),li=lb.querySelector('img'),cap=lb.querySelector('.lbcap');let cur=0;
const show=i=>{cur=(i+imgs.length)%imgs.length;li.src=imgs[cur].src;cap.textContent=imgs[cur].alt;lb.hidden=false};
imgs.forEach((im,i)=>im.addEventListener('click',()=>show(i)));
$('.lbn').onclick=e=>{e.stopPropagation();show(cur+1)};$('.lbp').onclick=e=>{e.stopPropagation();show(cur-1)};
lb.addEventListener('click',e=>{if(e.target===lb||e.target.classList.contains('lbx'))lb.hidden=true});
document.addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')lb.hidden=true;if(e.key==='ArrowRight')show(cur+1);if(e.key==='ArrowLeft')show(cur-1)});
// counters
const io=new IntersectionObserver(es=>es.forEach(en=>{if(!en.isIntersecting)return;const b=en.target,to=+b.dataset.to,suf=b.dataset.suf||'';let t0=null;
const st=t=>{t0??=t;const p=Math.min((t-t0)/1500,1);b.textContent=Math.floor(to*p).toLocaleString('ru-RU')+suf;if(p<1)requestAnimationFrame(st)};requestAnimationFrame(st);io.unobserve(b)}));
$$('.stat b').forEach(b=>io.observe(b));
// PDA ticker
const news=['Зомби подал жалобу на стримера за неуважительный бег','Чат скинулся на !storm, стример скинулся на нервы','Житель xX_Petya_Xx построил сарай вместо вышки и гордится','Прораб снова сказал «█████» — стройка ускорилась на 3%','Машина заспавнилась в озере. Машина довольна','Призрак ищет друзей. Друзья выключили свет','Радиация в пустоши: «норм», по мнению чата','Курс монет чата: 1 !zombie = 1 испорченный вечер','Сундук найден. Внутри палка. Палка не отдаётся','Зритель спросил «можно !night днём?» — можно. А зачем?','Курс черемши вырос на 67%','Прораб объявлен главным воздуханом месяца'];
$('#tick').textContent='КПК ☢ '+news.join('   ///   ');
// radiation meter
setInterval(()=>{const v=Math.floor(20+Math.random()*80);$('#radfill').style.width=v+'%';$('#radval').textContent=v+' мкР/ч · '+(v>80?'АЙ':'норм')},1200);
// runaway download button (escapes once)
const rb=$('#runaway');let ran=false;
const flee=e=>{if(ran)return;ran=true;if(e.type==='touchstart')e.preventDefault();const x=(Math.random()<.5?-1:1)*(120+Math.random()*80),y=-40-Math.random()*40;rb.style.transform=`translate(${x}px,${y}px) rotate(${x>0?8:-8}deg)`;rb.textContent='Не поймаешь! (ладно, жми)';setTimeout(()=>{rb.style.transform='';rb.textContent='⬇ Скачать StreamSurvival.exe'},1400)};
rb.addEventListener('mouseenter',flee);rb.addEventListener('touchstart',flee,{passive:false});
// silly popup
const pops=['Чат проголосовал: вы теперь зомби. Ничего не изменилось.','Прораб передаёт привет: «█████ ███ ██████!»','Обнаружена радиация. Источник: ваш чат.','Зритель купил !darkness. Сайт временно не темнеет, мы его уговорили.'];
const pp=$('#popup');setTimeout(()=>{if(sessionStorage.getItem('pop'))return;sessionStorage.setItem('pop',1);$('#popt').textContent=pops[Math.floor(Math.random()*pops.length)];pp.hidden=false},9000);
$('#popok').onclick=()=>pp.hidden=true;
// Konami zombie rain
const code=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];let k=0;
document.addEventListener('keydown',e=>{k=(e.key===code[k]||e.key.toLowerCase()===code[k])?k+1:(e.key===code[0]?1:0);if(k===code.length){k=0;zrain()}});
let taps=0;$('.logo').addEventListener('click',e=>{if(++taps>=7){taps=0;zrain()}});
function zrain(){const r=$('#rain');for(let i=0;i<60;i++){const d=document.createElement('span');d.className='drop';d.textContent=['🧟','🧟‍♂️','👻','🧟‍♀️'][i%4];d.style.left=Math.random()*100+'vw';d.style.animationDuration=2+Math.random()*3+'s';d.style.animationDelay=Math.random()*2+'s';r.appendChild(d);setTimeout(()=>d.remove(),7500)}}
// themes
const th=$('#theme'),setT=t=>{document.body.className=document.body.className.replace(/\bt-\S+/g,'').trim();document.body.classList.add('t-'+t);localStorage.setItem('ss-theme',t);th.value=t};
setT(localStorage.getItem('ss-theme')||'stalker');th.onchange=()=>{setT(th.value);beep(660,.1);toast('Тема: '+th.options[th.selectedIndex].text)};
// sounds (WebAudio, off by default)
let ac=null,sndOn=localStorage.getItem('ss-snd')==='1';const sb=$('#snd');sb.textContent=sndOn?'🔊':'🔇';
sb.onclick=()=>{sndOn=!sndOn;localStorage.setItem('ss-snd',sndOn?'1':'0');sb.textContent=sndOn?'🔊':'🔇';beep(880,.1)};
function beep(f=440,d=.12,type='square'){if(!sndOn)return;ac??=new (window.AudioContext||window.webkitAudioContext)();const o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(.08,ac.currentTime);g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+d);o.connect(g).connect(ac.destination);o.start();o.stop(ac.currentTime+d)}
const bleep=()=>beep(1000,.35,'sine'),groan=()=>{beep(110,.5,'sawtooth');setTimeout(()=>beep(80,.6,'sawtooth'),200)};
let tt;function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(tt);tt=setTimeout(()=>t.hidden=true,2200)}
let dp=0;$$('.fake').forEach(b=>b.onclick=()=>{toast(b.dataset.msg);b.classList.add('shake');setTimeout(()=>b.classList.remove('shake'),1200);
 if(b.id==='dontpress'){dp++;bleep();if(dp>=3){zrain();groan();toast('Ты сам этого хотел. 🧟')}}else beep(220,.15)});
let last=0;if(matchMedia('(pointer:fine)').matches)document.addEventListener('mousemove',e=>{const n=performance.now();if(n-last<70)return;last=n;const s=document.createElement('span');s.className='spark';s.textContent=['☢','✦','🧟','💀','⛏','🪙'][Math.random()*6|0];s.style.left=e.clientX+'px';s.style.top=e.clientY+'px';document.body.appendChild(s);setTimeout(()=>s.remove(),800)});
document.addEventListener('click',e=>{if(e.target.closest('a,button,select,img'))beep(520,.05)});
let buf='';document.addEventListener('keydown',e=>{if(e.key.length!==1)return;buf=(buf+e.key.toLowerCase()).slice(-8);if(buf.endsWith('zombie')||buf.endsWith('зомби')){zrain();groan();toast('Кто-то написал !zombie 🧟')}});
$('.hero h1').addEventListener('dblclick',()=>{document.body.classList.add('shake');bleep();toast('Прораб: «█████ ███!»');setTimeout(()=>document.body.classList.remove('shake'),1200)});
const rand=['Чат купил !night. Сайт держится.','Житель взял задание и ушёл в отпуск','+1 аура за скролл','Ваш скролл засчитан как кардио','Зомби лайкнул ваш визит ❤️','Ошибка 404: выживание не найдено','Прораб: «кто трогал мой █████?»','Можно. А зачем?','6-7 зомби уже в пути','Обнаружен воздухан: житель опять «идёт за инструментом»','Найдена черемша. Зачем — неизвестно','Бурмалда уровня: чат'];
setInterval(()=>{if(document.hidden)return;toast(rand[Math.random()*rand.length|0]);beep(300,.08)},45000);
