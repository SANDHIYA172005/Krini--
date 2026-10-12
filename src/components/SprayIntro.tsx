/**
 * Home's opening, before the hero: on a black screen a gold aerosol mist
 * sweeps from left to right and paints the name, KRINI in gold and CRUDE in
 * warm white, a fine overspray hanging around the letters, while the
 * pressure reads up to 100%; then the letters set solid and the screen lifts
 * away upward. About two and a half seconds; a click, a tap, a key or the
 * wheel skips it. It plays once a visit (sessionStorage), never with reduced
 * motion, and not at all without JavaScript (the overlay only shows once the
 * script has turned it on, so the page never flashes first).
 *
 * The script runs inline, straight after the overlay, so it starts before the
 * rest of the page has painted. It only changes classes on the root (intro-on
 * while it plays, intro-out while it lifts), never the overlay's own markup,
 * so the page wakes up (hydrates) undisturbed. It draws on one canvas: the paint the
 * droplets leave, kept on its own layer and shown only inside the letters
 * (plus a faint overspray), the droplets in flight, and the nozzle's glow.
 */
const SCRIPT = `(function(){
var el=document.getElementById("intro");if(!el)return;
var root=document.documentElement,seen=false;
try{seen=sessionStorage.getItem("kc-intro")==="1"}catch(e){}
if(seen||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
try{sessionStorage.setItem("kc-intro","1")}catch(e){}
root.classList.add("intro-on");
var cv=el.querySelector("canvas"),ctx=cv.getContext("2d"),num=el.querySelector("[data-intro-num]");
var GOLD="212,175,55",BONE="245,239,225";
var W,H,dpr,paint,pc,mask,mc,solid,sc,out,oc,fs,tx,ty,tw,split,parts=[],t0=0,raf=0,done=false;
function mk(){var c=document.createElement("canvas");c.width=cv.width;c.height=cv.height;return c}
function setup(){
dpr=Math.min(2,window.devicePixelRatio||1);W=innerWidth;H=innerHeight;
cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);
paint=mk();pc=paint.getContext("2d");mask=mk();mc=mask.getContext("2d");solid=mk();sc=solid.getContext("2d");out=mk();oc=out.getContext("2d");
var fam=(getComputedStyle(root).getPropertyValue("--font-display")||"").trim()||"Archivo";
var f=function(px){return "800 "+px+"px "+fam+", Archivo, 'Arial Narrow', Arial, sans-serif"};
mc.font=f(100);var w100=mc.measureText("KRINI CRUDE").width;
fs=Math.min((W<640?0.9:0.8)*W/w100*100,190);mc.font=f(fs);
tw=mc.measureText("KRINI CRUDE").width;split=mc.measureText("KRINI ").width;
tx=(W-tw)/2;ty=H/2+fs*0.36;
[mc,sc].forEach(function(c){c.setTransform(dpr,0,0,dpr,0,0);c.font=f(fs);c.textBaseline="alphabetic"});
pc.setTransform(dpr,0,0,dpr,0,0);
mc.fillStyle="#fff";mc.fillText("KRINI CRUDE",tx,ty);
sc.fillStyle="rgb("+GOLD+")";sc.fillText("KRINI",tx,ty);sc.fillStyle="rgb("+BONE+")";sc.fillText("CRUDE",tx+split,ty);
}
function g(){return (Math.random()+Math.random()+Math.random()-1.5)/1.5}
function ease(x){return x<0?0:x>1?1:1-Math.pow(1-x,3)}
function frame(now){
if(!t0)t0=now;var t=(now-t0)/1000;
var u=Math.min(1,Math.max(0,(t-0.1)/1.55)),sweep=u*u*(3-2*u),nx=tx-fs*1.2+sweep*(tw+fs*0.9),ny=ty-fs*1.9;
if(t>0.12&&t<1.85){for(var i=0;i<110;i++){var aimX=nx+fs*0.95+g()*fs*0.5,aimY=ty-fs*0.78+Math.random()*fs*0.95+g()*fs*0.12,mist=Math.random()<0.22;
parts.push({x:nx,y:ny,sx:nx,sy:ny,ax:aimX+(mist?g()*fs*0.5:0),ay:aimY+(mist?g()*fs*0.4:0),b:now,d:110+Math.random()*90,r:0.5+Math.random()*(mist?0.9:2.1),m:mist})}}
ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle="#0c0b09";ctx.fillRect(0,0,cv.width,cv.height);
ctx.setTransform(dpr,0,0,dpr,0,0);
var keep=[];
for(var j=0;j<parts.length;j++){var p=parts[j],k=(now-p.b)/p.d;
if(k>=1){if(!p.m){pc.fillStyle="rgba("+(p.ax<tx+split?GOLD:BONE)+",0.9)";pc.beginPath();pc.arc(p.ax,p.ay,p.r,0,6.283);pc.fill()}continue}
var e=1-Math.pow(1-k,2);p.x=p.sx+(p.ax-p.sx)*e;p.y=p.sy+(p.ay-p.sy)*e+Math.sin(k*3.14)*-6;
ctx.fillStyle="rgba("+GOLD+","+(p.m?0.35:0.75)*(1-k*0.5)+")";ctx.fillRect(p.x,p.y,p.r,p.r);keep.push(p)}
parts=keep;
ctx.setTransform(1,0,0,1,0,0);
ctx.globalAlpha=0.13;ctx.drawImage(paint,0,0);ctx.globalAlpha=1;
oc.globalCompositeOperation="copy";oc.drawImage(paint,0,0);oc.globalCompositeOperation="destination-in";oc.drawImage(mask,0,0);oc.globalCompositeOperation="source-over";
ctx.drawImage(out,0,0);
var s=ease((t-1.55)/0.6);if(s>0){ctx.globalAlpha=s;ctx.drawImage(solid,0,0);ctx.globalAlpha=1}
if(t<1.9){ctx.setTransform(dpr,0,0,dpr,0,0);var gr=ctx.createRadialGradient(nx,ny,0,nx,ny,fs*0.9);gr.addColorStop(0,"rgba("+GOLD+",0.55)");gr.addColorStop(1,"rgba("+GOLD+",0)");ctx.fillStyle=gr;ctx.beginPath();ctx.arc(nx,ny,fs*0.9,0,6.283);ctx.fill();ctx.fillStyle="rgb(255,244,214)";ctx.beginPath();ctx.arc(nx,ny,3,0,6.283);ctx.fill()}
if(num)num.textContent=String(Math.round(ease(t/1.9)*100)).padStart(3,"0");
if(t>2.45)return finish();
raf=requestAnimationFrame(frame);
}
function finish(){if(done)return;done=true;cancelAnimationFrame(raf);if(num)num.textContent="100";
ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle="#0c0b09";ctx.fillRect(0,0,cv.width,cv.height);ctx.drawImage(solid,0,0);
root.classList.add("intro-out");root.classList.remove("intro-on");
["pointerdown","keydown","wheel","touchstart"].forEach(function(n){removeEventListener(n,finish)});
setTimeout(function(){root.classList.remove("intro-out")},1100)}
["pointerdown","keydown","wheel","touchstart"].forEach(function(n){addEventListener(n,finish,{passive:true})});
function go(){if(done)return;setup();raf=requestAnimationFrame(frame)}
var fam0=(getComputedStyle(root).getPropertyValue("--font-display")||"").trim()||"Archivo";
var started=false,start=function(){if(!started){started=true;go()}};
if(document.fonts&&document.fonts.load){document.fonts.load("800 80px "+fam0).then(start,start);setTimeout(start,900)}else start();
setTimeout(finish,6000);
})();`;

export function SprayIntro() {
  return (
    <>
      <div id="intro" className="intro" aria-hidden="true">
        {/* the script sizes the canvas and counts the number before the page wakes up */}
        <canvas suppressHydrationWarning />
        <p className="intro-corner intro-tl label">Chennai, India</p>
        <p className="intro-corner intro-tr label">Lubricants / Construction chemicals / Aerosols</p>
        <p className="intro-corner intro-bl label">
          Pressure <span className="intro-num tabular-nums" data-intro-num suppressHydrationWarning>000</span>%
        </p>
        <p className="intro-corner intro-br label">Tap to skip</p>
      </div>
      <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
    </>
  );
}
