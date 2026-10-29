(function(){
var W=[["olma","uzum","baxt","tosh","bola","dala","gilam","sabzi"],["kitob","qalam","daryo","bahor","devor","bozor","tuman","shahar"],["maktab","tarvuz","daftar","ertalab","mashina","bolalar","mehmon","darslik"]];
var lvl=0,words=[],i=0,score=0,left=60,timer,tiles=[],ans=[],hinted=0,busy=false;
function start(l){lvl=l;words=shuf(W[l]).slice(0,6);i=0;score=0;$("end").hidden=true;lvMark(l);$("sc").textContent=0;load()}
function load(){var w=words[i];hinted=0;ans=[];busy=false;var t=w.split("");do{t=shuf(t)}while(t.join("")==w);
 tiles=t.map(function(c){return{c:c,u:false}});left=60+lvl*15;$("pg").textContent=(i+1)+"/"+words.length;msg("");draw();
 clearInterval(timer);tick();timer=setInterval(tick,1000)}
function tick(){$("tm").textContent=left;if(left<=0){clearInterval(timer);busy=true;msg("Vaqt tugadi. So‘z: "+words[i]);setTimeout(next,1500);return}left--}
function msg(t){$("msg").textContent=t}
function draw(cls){var w=words[i],a=$("ans");a.className="row"+(cls?" "+cls:"");a.innerHTML="";
 for(var k=0;k<w.length;k++){var d=document.createElement("div");d.className="sl"+(ans[k]!==undefined?" f":"");d.textContent=ans[k]!==undefined?tiles[ans[k]].c:"";a.appendChild(d)}
 var t=$("tiles");t.className="row";t.innerHTML="";tiles.forEach(function(x,k){var b=document.createElement("button");b.className="t";b.textContent=x.c;b.disabled=x.u;b.onclick=function(){pick(k)};t.appendChild(b)})}
function pick(k){if(busy||tiles[k].u||ans.length>=words[i].length)return;tiles[k].u=true;ans.push(k);draw()}
function back(){if(busy||!ans.length)return;tiles[ans.pop()].u=false;draw()}
function reset(){ans=[];tiles.forEach(function(x){x.u=false})}
function check(){if(busy)return;var w=words[i];if(ans.length<w.length){msg("Barcha harflarni joylang.");return}
 var g=ans.map(function(k){return tiles[k].c}).join("");
 if(g==w||W[lvl].indexOf(g)>=0){busy=true;clearInterval(timer);var p=Math.max(5,w.length*10+Math.max(0,left)-hinted*5);score+=p;$("sc").textContent=score;draw("ok");msg("To‘g‘ri! +"+p+" ball");setTimeout(next,1000)}
 else{draw("no");msg("Noto‘g‘ri, qayta urinib ko‘ring.");setTimeout(function(){reset();draw();msg("")},700)}}
function next(){i++;if(i>=words.length){clearInterval(timer);busy=true;$("end").hidden=false;$("et").textContent="O‘yin tugadi!";$("ep").textContent="Jami ball: "+score}else load()}
$("chk").onclick=check;$("bk").onclick=back;
$("sh").onclick=function(){if(busy)return;reset();tiles=shuf(tiles);draw()};
$("hn").onclick=function(){if(busy)return;var w=words[i],n=ans.length;if(n>=w.length)return;reset();ans=[];
 for(var q=0;q<=n;q++){var k=tiles.findIndex(function(x){return!x.u&&x.c==w[q]});if(k<0)break;tiles[k].u=true;ans.push(k)}
 hinted++;draw();msg("Maslahat ishlatildi (−5 ball).")};
$("sk").onclick=function(){if(busy)return;clearInterval(timer);busy=true;msg("So‘z: "+words[i]);setTimeout(next,1200)};
$("again").onclick=function(){start(lvl)};
document.addEventListener("keydown",function(e){if(e.key=="Enter")return check();if(e.key=="Backspace")return back();
 var c=e.key.toLowerCase();var k=tiles.findIndex(function(x){return!x.u&&x.c==c});if(k>=0)pick(k)});
lvButtons(["1-daraja","2-daraja","3-daraja"],start);start(0);
})();
