(function(){
var L=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
var b,lvl=2,over,sc={x:0,d:0,o:0};
function res(bd){for(var k=0;k<8;k++){var l=L[k];if(bd[l[0]]&&bd[l[0]]==bd[l[1]]&&bd[l[0]]==bd[l[2]])return{w:bd[l[0]],l:l}}return bd.every(Boolean)?{w:"d"}:null}
function mm(bd,p){var r=res(bd);if(r)return r.w=="O"?1:r.w=="X"?-1:0;var best=p=="O"?-2:2;
 for(var i=0;i<9;i++)if(!bd[i]){bd[i]=p;var v=mm(bd,p=="O"?"X":"O");bd[i]="";best=p=="O"?Math.max(best,v):Math.min(best,v)}return best}
function empty(){var e=[];b.forEach(function(x,i){if(!x)e.push(i)});return e}
function tryWin(p){var e=empty();for(var k=0;k<e.length;k++){b[e[k]]=p;var r=res(b);b[e[k]]="";if(r&&r.w==p)return e[k]}return -1}
function comp(){var e=empty(),m;
 if(lvl==2){var bs=-2;e.forEach(function(i){b[i]="O";var v=mm(b,"X");b[i]="";if(v>bs){bs=v;m=i}})}
 else if(lvl==1){m=tryWin("O");if(m<0)m=tryWin("X");if(m<0)m=e[rnd(e.length)]}
 else m=e[rnd(e.length)];
 b[m]="O";draw();fin()}
function fin(){var r=res(b);if(!r)return false;over=true;
 if(r.w=="X"){sc.x++;msg("Siz yutdingiz! 🎉")}else if(r.w=="O"){sc.o++;msg("Kompyuter yutdi.")}else{sc.d++;msg("Durang.")}
 $("wx").textContent=sc.x;$("wd").textContent=sc.d;$("wo").textContent=sc.o;draw(r.l);return true}
function msg(t){$("msg").textContent=t}
function draw(win){var bd=$("board");bd.innerHTML="";b.forEach(function(v,i){var c=document.createElement("button");c.className="xc"+(v?" "+v.toLowerCase():"")+(win&&win.indexOf(i)>=0?" win":"");
 c.textContent=v;c.disabled=!!v||over;c.setAttribute("aria-label","Katak "+(i+1));c.onclick=function(){play(i)};bd.appendChild(c)})}
function play(i){if(over||b[i])return;b[i]="X";draw();if(fin())return;msg("Kompyuter o‘ylamoqda…");setTimeout(function(){if(!over){comp();if(!over)msg("Sizning navbatingiz")}},350)}
function start(){b=Array(9).fill("");over=false;msg("Sizning navbatingiz (X)");draw()}
lvButtons(["Oson","O‘rta","Qiyin"],function(l){lvl=l;lvMark(l);start()});lvMark(2);
$("again").onclick=start;start();
})();
