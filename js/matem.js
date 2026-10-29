(function(){
var lvl=0,score=0,ok=0,left=60,timer,cur,run=false;
function gen(){var m=[20,50,100][lvl],c=[0,9,11][lvl],ops=lvl==0?["+","-"]:lvl==1?["+","-","×"]:["+","-","×","÷"],op=ops[rnd(ops.length)],a,b,r;
 if(op=="+"){a=rnd(m)+1;b=rnd(m)+1;r=a+b}
 else if(op=="-"){a=rnd(m)+1;b=rnd(a)+1;r=a-b}
 else if(op=="×"){a=rnd(c)+2;b=rnd(c)+2;r=a*b}
 else{b=rnd(11)+2;r=rnd(11)+2;a=b*r}
 cur={q:a+" "+op+" "+b+" = ?",r:r};$("q").textContent=cur.q;$("q").className="q"}
function start(l){if(l!==undefined)lvl=l;lvMark(lvl);clearInterval(timer);score=0;ok=0;left=60;run=true;
 $("sc").textContent=0;$("ok").textContent=0;$("tm").textContent=60;$("end").hidden=true;$("in").disabled=false;$("in").value="";$("in").focus();$("go").textContent="Qayta boshlash";gen();
 timer=setInterval(function(){left--;$("tm").textContent=left;if(left<=0)finish()},1000)}
function finish(){clearInterval(timer);run=false;$("in").disabled=true;$("end").hidden=false;$("et").textContent="Vaqt tugadi!";
 var b=0;try{b=+localStorage.getItem("mtBest"+lvl)||0;if(score>b){localStorage.setItem("mtBest"+lvl,score);b=score}}catch(e){}
 $("ep").textContent="Ball: "+score+", to‘g‘ri javoblar: "+ok+". Eng yaxshi natija: "+b}
function submit(){if(!run)return;var v=$("in").value.trim();if(v==="")return;var good=parseInt(v,10)===cur.r;
 if(good){score+=10;ok++;$("sc").textContent=score;$("ok").textContent=ok}
 $("q").className="q "+(good?"ok":"no");$("in").value="";setTimeout(gen,good?150:450);if(!good)$("q").textContent=cur.q.replace("?",cur.r)}
$("in").addEventListener("keydown",function(e){if(e.key=="Enter")submit()});
$("sub").onclick=submit;$("go").onclick=function(){start()};$("again").onclick=function(){start()};
lvButtons(["Oson","O‘rta","Qiyin"],function(l){if(run)start(l);else{lvl=l;lvMark(l)}});lvMark(0);
})();
