(function(){
var cv=$("cv"),cx=cv.getContext("2d"),N=20,S=cv.width/N;
var snake,dir,nd,food,score,run=false,over=false,best=0,tm;
try{best=+localStorage.getItem("ilonBest")||0}catch(e){}
$("best").textContent=best;
function css(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim()}
function place(){do{food={x:rnd(N),y:rnd(N)}}while(snake.some(function(s){return s.x==food.x&&s.y==food.y}))}
function reset(){snake=[{x:10,y:10},{x:9,y:10},{x:8,y:10}];dir={x:1,y:0};nd=dir;score=0;over=false;place();$("sc").textContent=0;$("st").textContent="Tayyor";draw()}
function draw(){cx.fillStyle=css("--bg")||"#eee";cx.fillRect(0,0,cv.width,cv.height);
 cx.fillStyle="#e0524d";cx.beginPath();cx.arc(food.x*S+S/2,food.y*S+S/2,S/2-3,0,7);cx.fill();
 snake.forEach(function(s,k){cx.fillStyle=k?"#2e9e4f":"#1f7a3a";cx.fillRect(s.x*S+1,s.y*S+1,S-2,S-2)})}
function end(){run=false;over=true;$("st").textContent="Tugadi";$("go").textContent="Qayta boshlash";
 if(score>best){best=score;$("best").textContent=best;try{localStorage.setItem("ilonBest",best)}catch(e){}}draw()}
function step(){dir=nd;var h={x:snake[0].x+dir.x,y:snake[0].y+dir.y};
 if(h.x<0||h.y<0||h.x>=N||h.y>=N||snake.some(function(s){return s.x==h.x&&s.y==h.y}))return end();
 snake.unshift(h);if(h.x==food.x&&h.y==food.y){score++;$("sc").textContent=score;place()}else snake.pop();draw()}
function loop(){if(!run)return;step();if(run)tm=setTimeout(loop,Math.max(70,140-score*3))}
function toggle(){if(over)reset();if(run){run=false;clearTimeout(tm);$("st").textContent="To‘xtatildi";$("go").textContent="Davom etish"}
 else{run=true;$("st").textContent="O‘ynalmoqda";$("go").textContent="To‘xtatish";loop()}}
function setDir(x,y){if(x==-dir.x&&y==-dir.y)return;nd={x:x,y:y};if(!run)toggle()}
var K={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0],w:[0,-1],s:[0,1],a:[-1,0],d:[1,0]};
document.addEventListener("keydown",function(e){var d=K[e.key];if(d){e.preventDefault();setDir(d[0],d[1])}else if(e.key==" "){e.preventDefault();toggle()}});
[].forEach.call(document.querySelectorAll("[data-d]"),function(b){b.onclick=function(){var d=b.dataset.d.split(",");setDir(+d[0],+d[1])}});
var sx,sy;cv.addEventListener("touchstart",function(e){sx=e.touches[0].clientX;sy=e.touches[0].clientY});
cv.addEventListener("touchend",function(e){var dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;
 if(Math.abs(dx)<20&&Math.abs(dy)<20)return;if(Math.abs(dx)>Math.abs(dy))setDir(dx>0?1:-1,0);else setDir(0,dy>0?1:-1)});
$("go").onclick=toggle;reset();
})();
