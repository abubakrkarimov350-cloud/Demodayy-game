function $(id){return document.getElementById(id)}
function rnd(n){return Math.floor(Math.random()*n)}
function shuf(a){a=a.slice();for(var k=a.length-1;k>0;k--){var j=rnd(k+1);var t=a[k];a[k]=a[j];a[j]=t}return a}
function lvButtons(names,fn){var box=$("lv");names.forEach(function(n,k){var b=document.createElement("button");b.textContent=n;b.onclick=function(){fn(k)};box.appendChild(b)})}
function lvMark(l){[].forEach.call($("lv").children,function(b,k){b.className=k==l?"on":""})}
