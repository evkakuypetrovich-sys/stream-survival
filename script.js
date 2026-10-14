const lb=document.getElementById('lightbox'),li=lb.querySelector('img');
document.querySelectorAll('.gallery img').forEach(i=>i.addEventListener('click',()=>{li.src=i.src;li.alt=i.alt;lb.hidden=false}));
lb.addEventListener('click',()=>lb.hidden=true);
document.addEventListener('keydown',e=>{if(e.key==='Escape')lb.hidden=true});
