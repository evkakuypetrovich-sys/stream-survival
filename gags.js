(()=>{const J=window.JOKES;if(!J)return;const $=s=>document.querySelector(s);
const all=[...J.news,...J.excuses,...J.ach,...J.patch,...J.reviews];const N=all.length;
const pick=a=>a[Math.random()*a.length|0];
const T=m=>(typeof toast==='function'?toast(m):console.log(m)),B=(f,d,t)=>{typeof beep==='function'&&beep(f,d,t)};
// random gag button
let seen=new Set();$('#gagbtn').onclick=()=>{const i=Math.random()*N|0;seen.add(i);$('#gagtxt').textContent=all[i];$('#gagn').textContent=`прикол ${i+1} из ${N} · увидено: ${seen.size}`;B(400+Math.random()*400,.08);
 if(seen.size===10)T('🏆 Достижение: «10 приколов — уже зависимость»');if(seen.size===67)T('🏆 6-7 приколов. Ты сигма.')};
// zombie walker
const zombie=()=>{const z=document.createElement('span');z.className='zwalk';z.textContent='🧟';z.title='Не трогай его';z.onclick=()=>{z.textContent='💥';T('Зомби обиделся. Счётчик +1');B(150,.3,'sawtooth')};document.body.appendChild(z);setTimeout(()=>z.remove(),6200);T(pick(['Зомби вызван. Он идёт обниматься','Зомби в пути. Оплата: 5 монет','!zombie активирован (чат одобряет)']));typeof groan==='function'&&groan()};
$('#zbtn').onclick=zombie;
// fake loading bar
$('#loadbtn').onclick=()=>{const L=$('.lbar'),i=L.querySelector('i'),s=L.querySelector('span');L.hidden=false;let p=0;const steps=['Загрузка ауры…','Скачивание черемши…','Уговариваем прораба…','Ищем воздухана…','Почти…','99%…','99%… (ещё)','Ошибка: аура не помещается'];let k=0;
 const t=setInterval(()=>{p=Math.min(p+Math.random()*18,99);i.style.width=p+'%';s.textContent=steps[Math.min(k++,steps.length-1)];if(k>=steps.length){clearInterval(t);i.style.width='100%';T('🏆 Достижение: «Дождаться загрузки, которой нет»')}},600)};
// fake chat feed
const feed=$('#feed');const add=()=>{const d=document.createElement('div');d.innerHTML=`<b>${pick(J.users)}:</b> `;d.append(Math.random()<.15?pick(J.excuses):pick(J.chat));feed.append(d);while(feed.children.length>9)feed.firstChild.remove()};
for(let i=0;i<6;i++)add();setInterval(()=>{if(!document.hidden)add()},1400);
// infinite random popups + achievements
const loop=()=>{setTimeout(()=>{if(!document.hidden)T(Math.random()<.3?pick(J.ach):pick(J.news));loop()},18000+Math.random()*20000)};loop();
// ticker gets bank news
const tk=$('#tick');if(tk)tk.textContent='КПК ☢ '+Array.from({length:25},()=>pick(J.news)).join('   ///   ');
// image clicks
let ic=0;document.querySelectorAll('.gallery img').forEach(im=>im.addEventListener('contextmenu',e=>{e.preventDefault();T('ПКМ? Скриншот защищён прорабом █████')}));
document.addEventListener('click',e=>{if(e.target.matches('.gallery img')){ic++;if(ic%5===0)T(`Ты открыл ${ic} скринов. Житель-воздухан завидует`)}});
// secret words
let buf='';const words={'черемша':'🌿 Черемша найдена! +999 радиации','67':'6-7 🤷 сикс-севен активирован','воздухан':'Воздухан обнаружен: это ты','аура':'+1000 ауры (временно)','прораб':'Прораб: «█████ ██ ████!»','sigma':'Сигма-режим: ВКЛ','бурмалда':'БУРМАЛДА НАЧАЛАСЬ','кот':'Котость: котов нет. Пока.'};
document.addEventListener('keydown',e=>{if(e.key.length!==1)return;buf=(buf+e.key.toLowerCase()).slice(-12);for(const w in words)if(buf.endsWith(w)){T(words[w]);B(900,.2,'triangle');if(w==='бурмалда'){zombie();zombie()}buf=''}});
// scroll to bottom surprise
let bottomed=false;addEventListener('scroll',()=>{if(!bottomed&&innerHeight+scrollY>=document.body.scrollHeight-10){bottomed=true;T('🏆 Достижение: «Пролистать сайт до конца». Награда: ничего');typeof zrain==='function'&&zrain()}},{passive:true});
// idle gag
let idle;const reset=()=>{clearTimeout(idle);idle=setTimeout(()=>{T(pick(['Ты тут? Зомби уже за спиной 🧟','30 секунд бездействия. Ты воздухан.','Житель-воздухан одобряет твой перекур']))},30000)};['mousemove','keydown','touchstart','scroll'].forEach(ev=>addEventListener(ev,reset,{passive:true}));reset();
// tab title
const orig=document.title;document.addEventListener('visibilitychange',()=>{document.title=document.hidden?pick(['🧟 Вернись, зомби скучает','☢ Чат купил !night пока тебя нет','Прораб: «█████, ты где?»','Можно уйти. А зачем?']):orig});
})();
