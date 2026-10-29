(function(){
var E=["🍎","🍋","🍇","🐱","🐶","🐟","🌻","⭐","🚗","🎈","🔔","🍀"];
var P=[6,8,12],lv=0,first=null,lock=false,moves=0,found=0,sec=0,timer,started=false;
function best(){try{return localStorage.getItem("rt"+lv)}catch(e){return null}}
function start(l){lv=l;clearInterval(timer);started=false;first=null;lock=false;moves=0;found=0;sec=0;
 $("mv").textContent=0;$("tm").textContent=0;$("pr").textContent="0/"+P[l];$("end").hidden=true;lvMark(l);
 var g=$("grid");g.innerHTML="";
 shuf(E.slice(0,P[l]).concat(E.slice(0,P[l]))).forEach(function(e){var b=document.createElement("button");b.className="c";b.dataset.e=e;b.setAttribute("aria-label","Yopiq karta");b.onclick=function(){flip(b)};g.appendChild(b)})}
function flip(b){if(lock||b===first||b.classList.contains("dn")||b.classList.contains("up"))return;
 if(!started){started=true;timer=setInterval(function(){sec++;$("tm").textContent=sec},1000)}
 b.classList.add("up");b.textContent=b.dataset.e;
 if(!first){first=b;return}
 moves++;$("mv").textContent=moves;var a=first;first=null;
 if(a.dataset.e==b.dataset.e){a.classList.replace("up","dn");b.classList.replace("up","dn");found++;$("pr").textContent=found+"/"+P[lv];if(found==P[lv])win()}
 else{lock=true;setTimeout(function(){[a,b].forEach(function(x){x.classList.remove("up");x.textContent=""});lock=false},800)}}
function win(){clearInterval(timer);var o=best(),txt="Natija: "+moves+" yurish, "+sec+" soniya.";
 if(o===null||moves<+o){try{localStorage.setItem("rt"+lv,moves)}catch(e){}txt+=" Yangi rekord!"}else txt+=" Eng yaxshi natija: "+o+" yurish.";
 $("et").textContent="Barcha juftliklar topildi!";$("ep").textContent=txt;$("end").hidden=false}
lvButtons(["Oson","O‘rta","Qiyin"],start);$("again").onclick=function(){start(lv)};start(0);
})();
