// urlparts v0.2 — micro URL parser/builder (~1 kB gzipped)
// Author: Temirkhan Rustemov (DreamerView) - https://github.com/DreamerView
(function (g,f){typeof module==='object'?module.exports=f():g.UrlParts=f()})(this,function(){'use strict';
const NS={}; // dummy for size
const d=s=>decodeURIComponent(s.replace(/\+/g,'%20'));
const e=s=>encodeURIComponent(s);
const qParse=q=>{q=(q||'').replace(/^\?/,'');if(!q) return {};return q.split('&').reduce((o,p)=>{const[a,b='']=p.split('=');o[d(a)]=d(b);return o;},{});}  ;
const qBuild=o=>Object.keys(o||{}).map(k=>e(k)+'='+e(o[k])).join('&');
function nul(x){return x===undefined?null:x;}
function parse(url){try{const u=new URL(url);return{href:u.href,protocol:nul(u.protocol.replace(':','')),username:nul(u.username)||null,password:nul(u.password)||null,host:nul(u.host),hostname:nul(u.hostname),port:u.port?u.port:null,path:nul(u.pathname),query:qParse(u.search),hash:u.hash?u.hash.replace('#',''):null};}catch(e){const a=document.createElement('a');a.href=url;return parse(a.href);} }
function build(o){const auth=o.username?e(o.username)+(o.password?':'+e(o.password):'')+'@':'';const q=qBuild(o.query);return( (o.protocol?o.protocol+':':'')+'//'+auth+(o.host||(o.hostname+(o.port?':'+o.port:'')))+(o.path||'')+(q?'?'+q:'')+(o.hash?'#'+e(o.hash):'') );}
return{parse,build,qParse,qBuild};});
