/* Казино Сталкера — только виртуальные монеты ¤ (localStorage). Не деньги. */
(()=>{const D=document,$=s=>D.querySelector(s),J=window.JOKES||{users:[]},P=a=>a[Math.random()*a.length|0],R=(a,b)=>a+Math.random()*(b-a);
const root=$('#casino');if(!root)return;
const B=(f,d,t)=>window.beep&&beep(f,d,t),T=m=>window.toast&&toast(m);
let bal=+localStorage.getItem('ss-coins')||1000;if(bal<0)bal=0;
const save=()=>{localStorage.setItem('ss-coins',bal);$('#cbal').textContent=bal.toLocaleString('ru-RU')+' ¤';$('#crefill').hidden=bal>=10;board()};
const WIN=['Удача! Прораб в шоке: «█████!»','Сигма-выигрыш. +1000 ауры','Чат: «подкрутка!» (нет)','Можно выиграть? Можно. А зачем? Уже выиграл','Зомби аплодирует (лапами)','Черемша принесла удачу'];
const LOSE=['Проиграл. Это не баг, это казино','Деньги ушли к воздухану','Чат виноват. 100%','Бурмалда. Без комментариев','Сундук забрал ставку и палку','6-7 раз подряд мимо, держись'];
const msg=(id,win,extra='')=>{$(id).textContent=(win?'✅ ':'❌ ')+(win?P(WIN):P(LOSE))+extra};
const bet=id=>{const v=Math.floor(+$(id).value);if(!(v>0)){T('Ставка — целое число > 0');return 0}if(v>bal){T('Не хватает ¤. Жми «Бесплатная добавка»');return 0}bal-=v;save();return v};
const pay=(n,big)=>{bal+=Math.floor(n);save();if(n>0){B(660,.1,'triangle');setTimeout(()=>B(990,.15,'triangle'),110)}if(big)bigwin(n)};
const lose=()=>B(140,.3,'sawtooth');
function bigwin(n){const e=D.createElement('div');e.className='cbig';e.innerHTML='<b>БОЛЬШОЙ ВЫИГРЫШ!<br>+'+Math.floor(n).toLocaleString('ru-RU')+' ¤</b>';D.body.appendChild(e);
 for(let i=0;i<30;i++){const c=D.createElement('span');c.className='cxfall cx';c.textContent='🪙';c.style.left=R(0,98)+'vw';c.style.animationDuration=R(2,4)+'s';c.style.animationDelay=R(0,1)+'s';D.body.appendChild(c);setTimeout(()=>c.remove(),5200)}
 [523,659,784,1046].forEach((f,i)=>setTimeout(()=>B(f,.18,'square'),i*130));setTimeout(()=>e.remove(),2600)}
// leaderboard
const fake=(J.users.length?J.users:['zombie_lover','ded_inside','aura_farmer']).slice(0,9).map(u=>[u,Math.floor(R(200,90000))]);
function board(){const rows=[...fake,['ТЫ',bal]].sort((a,b)=>b[1]-a[1]);$('#cboard').innerHTML=rows.map((r,i)=>`<li class="${r[0]==='ТЫ'?'me':''}"><span>${i+1}. ${r[0]}</span><b>${r[1].toLocaleString('ru-RU')} ¤</b></li>`).join('')}
setInterval(()=>{const f=P(fake);f[1]=Math.max(0,f[1]+Math.floor(R(-3000,3500)));board()},4000);
$('#crefill').onclick=()=>{bal+=1000;save();T('Бесплатная добавка +1000 ¤. Мама разрешила.')};
// 1. slots
const SY=['🧟','👻','☢','🌿','🪙','🚗','💀','7️⃣'];
$('#sl-go').onclick=()=>{const b=bet('#sl-bet');if(!b)return;const reels=[...root.querySelectorAll('.reel')];const res=reels.map(()=>P(SY));
 reels.forEach((r,i)=>{r.classList.add('spin');let k=0;const iv=setInterval(()=>{r.textContent=P(SY);if(k++%2==0)B(300+i*80,.03)},70);setTimeout(()=>{clearInterval(iv);r.classList.remove('spin');r.textContent=res[i];B(500,.06);if(i===2)done()},700+i*450)});
 function done(){const[a,b2,c]=res;let m=0;if(a===b2&&b2===c)m=a==='7️⃣'?50:a==='🪙'?20:10;else if(a===b2||b2===c||a===c)m=2;if(res.includes('💀')&&m<10)m=0;
  if(m){pay(b*m,m>=10);msg('#sl-msg',1,` ×${m} = +${b*m} ¤`)}else{lose();msg('#sl-msg',0)}}};
// 2. roulette
const SRC='https://github.com/evkakuypetrovich-sys/stream-survival/releases/download/v0.3/stream_survival_source.zip';
const forceJP=new URLSearchParams(location.search).get('jackpot')==='1';let jpUsed=false;
function jackpot(){const o=D.createElement('div');o.className='jp';o.innerHTML='<div class="jpin"><div class="jpe">👑☢👑</div><b>ЛЕГЕНДАРНЫЙ ДЖЕКПОТ</b><p>Шанс 0.01% — и он твой! Ты выиграл <u>исходный код игры</u>.</p><p class="jps">Загрузка начнётся автоматически…</p><a class="btn" href="'+SRC+'" download>⬇ Скачать stream_survival_source.zip</a><button class="btn alt jpx">Закрыть</button></div>';D.body.appendChild(o);
 o.querySelector('.jpx').onclick=()=>o.remove();for(let i=0;i<60;i++){const c=D.createElement('span');c.className='cxfall cx';c.textContent=P(['👑','🪙','💎','☢']);c.style.left=R(0,98)+'vw';c.style.animationDuration=R(2,5)+'s';c.style.animationDelay=R(0,2)+'s';D.body.appendChild(c);setTimeout(()=>c.remove(),7500)}
 [523,659,784,1046,1318,1568].forEach((f,i)=>setTimeout(()=>B(f,.25,'square'),i*160));
 setTimeout(()=>{const a=D.createElement('a');a.href=SRC;a.download='stream_survival_source.zip';a.rel='noopener';D.body.appendChild(a);a.click();a.remove();o.querySelector('.jps').textContent='Если загрузка не началась — жми кнопку ниже.'},2500)}
$('#ru-go').onclick=()=>{const b=bet('#ru-bet');if(!b)return;
 if(Math.random()<0.0001||(forceJP&&!jpUsed)){jpUsed=true;const w=$('#ru-wheel');w.style.transform=`rotate(${R(1440,2160)}deg)`;setTimeout(()=>{$('#ru-n').textContent='👑';$('#ru-n').style.background='#c9a400';pay(b*100,false);$('#ru-msg').textContent='👑 ЛЕГЕНДАРНЫЙ СЕКТОР! Исходный код твой';jackpot()},1600);return}const pick=$('#ru-pick').value,n=Math.floor(Math.random()*37),red=[1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(n),col=n===0?'зелёное':red?'красное':'чёрное';
 const w=$('#ru-wheel');w.style.transform=`rotate(${R(1440,2160)}deg)`;B(400,.5,'sine');
 setTimeout(()=>{w.style.transition='none';w.style.transform='rotate(0)';w.offsetWidth;w.style.transition='';$('#ru-n').textContent=n;$('#ru-n').style.background=n===0?'#2a7a2a':red?'#a22':'#111';
  const win=(pick==='red'&&red&&n)||(pick==='black'&&!red&&n)||(pick==='even'&&n&&n%2===0)||(pick==='odd'&&n%2===1)||(pick==='zero'&&n===0);
  if(win){const m=pick==='zero'?36:2;pay(b*m,m>2);msg('#ru-msg',1,` ${n} (${col}) +${b*m} ¤`)}else{lose();msg('#ru-msg',0,` — выпало ${n} (${col})`)}},1600)};
// 3. blackjack
let bj=null;const card=()=>P(['2','3','4','5','6','7','8','9','10','В','Д','К','Т']),val=h=>{let s=0,a=0;h.forEach(c=>{if(c==='Т'){a++;s+=11}else s+=isNaN(c)?10:+c});while(s>21&&a--)s-=10;return s};
const bjshow=(end)=>{$('#bj-p').textContent=bj.p.join(' ')+'  = '+val(bj.p);$('#bj-d').textContent=end?bj.d.join(' ')+'  = '+val(bj.d):bj.d[0]+' 🂠'};
const bjend=r=>{bjshow(1);$('#bj-hit').disabled=$('#bj-stand').disabled=true;$('#bj-go').disabled=false;
 if(r==='win'){pay(bj.b*2,false);msg('#bj-msg',1,' +'+bj.b*2+' ¤')}else if(r==='bj'){pay(bj.b*2.5,true);msg('#bj-msg',1,' БЛЭКДЖЕК!')}else if(r==='push'){pay(bj.b);$('#bj-msg').textContent='🤝 Ничья. Прораб разочарован'}else{lose();msg('#bj-msg',0)}};
$('#bj-go').onclick=()=>{const b=bet('#bj-bet');if(!b)return;bj={b,p:[card(),card()],d:[card(),card()]};$('#bj-go').disabled=true;$('#bj-hit').disabled=$('#bj-stand').disabled=false;$('#bj-msg').textContent='Ещё или хватит?';bjshow();if(val(bj.p)===21)bjend('bj')};
$('#bj-hit').onclick=()=>{bj.p.push(card());B(500,.04);bjshow();if(val(bj.p)>21)bjend('lose')};
$('#bj-stand').onclick=()=>{while(val(bj.d)<17)bj.d.push(card());const p=val(bj.p),d=val(bj.d);bjend(d>21||p>d?'win':p===d?'push':'lose')};
// 4. crash
let cr=null;$('#cr-go').onclick=()=>{if(cr){const m=cr.m;clearInterval(cr.iv);pay(cr.b*m,m>=5);msg('#cr-msg',1,` забрал на ×${m.toFixed(2)} = +${Math.floor(cr.b*m)} ¤`);$('#cr-go').textContent='🚀 Запуск';$('#cr-rocket').style.bottom='0';cr=null;return}
 const b=bet('#cr-bet');if(!b)return;const crash=Math.max(1,0.99/(1-Math.random()));cr={b,m:1};$('#cr-go').textContent='💰 Забрать';
 cr.iv=setInterval(()=>{cr.m*=1.012;$('#cr-m').textContent='×'+cr.m.toFixed(2);$('#cr-rocket').style.bottom=Math.min(85,(cr.m-1)*18)+'%';
  if(cr.m>=crash){clearInterval(cr.iv);$('#cr-m').textContent='💥 ×'+crash.toFixed(2);lose();msg('#cr-msg',0,' Ракета взорвалась');$('#cr-go').textContent='🚀 Запуск';setTimeout(()=>$('#cr-rocket').style.bottom='0',800);cr=null}},60)};
// 5. coin flip
$('#cf-go').onclick=()=>{const b=bet('#cf-bet');if(!b)return;const pick=$('#cf-pick').value,c=$('#cf-coin');const r=Math.random()<.5?'orel':'reshka';c.classList.remove('flip');c.offsetWidth;c.classList.add('flip');B(700,.05);
 setTimeout(()=>{c.textContent=r==='orel'?'🦅':'🧟';if(r===pick){pay(b*2);msg('#cf-msg',1,' +'+b*2+' ¤')}else{lose();msg('#cf-msg',0)}},900)};
// 6. mines
let mn=null;const grid=$('#mn-grid');
const mnEnd=(won)=>{grid.querySelectorAll('button').forEach((x,i)=>{x.disabled=true;if(mn.mines.has(i))x.textContent='🧟'});$('#mn-cash').disabled=true;$('#mn-go').disabled=false;mn=null};
$('#mn-go').onclick=()=>{const b=bet('#mn-bet');if(!b)return;const mines=new Set();while(mines.size<5)mines.add(Math.random()*25|0);mn={b,mines,open:0,m:1};$('#mn-go').disabled=true;$('#mn-cash').disabled=false;$('#mn-msg').textContent='Ищи черемшу, избегай зомби (5 шт)';
 grid.innerHTML='';for(let i=0;i<25;i++){const x=D.createElement('button');x.textContent='?';x.onclick=()=>{if(!mn||x.disabled)return;x.disabled=true;if(mn.mines.has(i)){x.textContent='🧟';lose();msg('#mn-msg',0,' Зомби!');mnEnd()}else{mn.open++;mn.m*=(26-mn.open)/(21-mn.open)*0.97;x.textContent='🌿';B(600+mn.open*30,.05);$('#mn-msg').textContent=`Открыто ${mn.open}, множитель ×${mn.m.toFixed(2)}`}};grid.appendChild(x)}};
$('#mn-cash').onclick=()=>{if(!mn||!mn.open)return;const w=mn.b*mn.m;pay(w,mn.m>=4);msg('#mn-msg',1,` +${Math.floor(w)} ¤`);mnEnd()};
// 7. wheel of fortune
const WH=[['×0','#333',0],['×2','#5b8c2a',2],['×0.5','#7a4a20',.5],['×3','#b5562a',3],['×0','#333',0],['×1.5','#2a5d7a',1.5],['×10','#c9a400',10],['×0','#333',0]];
const wh=$('#wh-wheel');wh.style.background='conic-gradient('+WH.map((s,i)=>`${s[1]} ${i*45}deg ${(i+1)*45}deg`).join(',')+')';wh.innerHTML=WH.map((s,i)=>`<span style="transform:rotate(${i*45+22.5}deg) translateY(-62px)">${s[0]}</span>`).join('');
let whrot=0;$('#wh-go').onclick=()=>{const b=bet('#wh-bet');if(!b)return;const i=Math.random()*8|0;whrot+=1800+(360-(i*45+22.5))-(whrot%360);wh.style.transform=`rotate(${whrot}deg)`;
 for(let k=0;k<12;k++)setTimeout(()=>B(800,.02),k*180);setTimeout(()=>{const m=WH[i][2];if(m>0){pay(b*m,m>=10);msg('#wh-msg',m>=1,` ${WH[i][0]} = ${Math.floor(b*m)} ¤`)}else{lose();msg('#wh-msg',0,' ×0')}},3200)};
save();
})();
