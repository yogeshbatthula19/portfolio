import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useMotionValueEvent } from 'framer-motion';
import './about-collections.css';

const roles = [
 ['Paradigm IT', 'Product Designer', 'Aug 2025 — present'],
 ['Prasthana Software Solutions', 'Product Designer', 'Apr 2022 — Dec 2024'],
 ['Buildup Service', 'UI Designer', 'Mar 2021 — Apr 2022'],
 ['Freelance & Contract', 'Junior UI/UX Designer', 'Jan 2021 — Mar 2021'],
];
const copy = roles.map(r => r.join('\n')).join('\n\n');
export function TypewriterExperience() {
 const ref = useRef(null), audio = useRef(null), lastTick = useRef(0), previousCount = useRef(0);
 const reduced = useReducedMotion();
 const [count,setCount] = useState(0);
 const {scrollYProgress} = useScroll({target:ref,offset:['start 20%','end 85%']});
 useMotionValueEvent(scrollYProgress,'change',p=>setCount(Math.floor(Math.max(0,Math.min(1,p*1.2))*copy.length)));
 useEffect(()=>{
  const unlock=()=>{
   const Ctx=window.AudioContext||window.webkitAudioContext;
   if(!Ctx)return;
   audio.current ||= new Ctx();
   audio.current.resume().catch(()=>{});
  };
  window.addEventListener('pointerdown',unlock);
  window.addEventListener('keydown',unlock);
  return ()=>{window.removeEventListener('pointerdown',unlock);window.removeEventListener('keydown',unlock);audio.current?.close();audio.current=null;};
 },[]);
 useEffect(()=>{
  const advancing=count>previousCount.current;
  previousCount.current=count;
  const ctx=audio.current;
  if(!advancing||reduced||!ctx||ctx.state!=='running'||ctx.currentTime-lastTick.current<.055)return;
  lastTick.current=ctx.currentTime;
  const buffer=ctx.createBuffer(1,Math.floor(ctx.sampleRate*.035),ctx.sampleRate),data=buffer.getChannelData(0);
  for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*Math.exp(-i/(ctx.sampleRate*.005));
  const source=ctx.createBufferSource(),gain=ctx.createGain();
  source.buffer=buffer;gain.gain.value=.07;source.connect(gain);gain.connect(ctx.destination);source.onended=()=>{source.disconnect();gain.disconnect();};source.start();
 },[count,reduced]);
 const shown=reduced?copy.length:count;
 return <section ref={ref} className={`about-experience ${reduced?'is-complete':''}`} aria-labelledby="experience-title">
 <div className="experience-sticky"><header className="collection-heading"><span>Experience</span><h2 id="experience-title">A career, one chapter at a time.</h2></header>
 <div className="typewriter-layout"><div className="typewriter-scene" aria-hidden="true"><div className="experience-paper" style={{transform:`translateY(${-12-78*shown/copy.length}%)`}}><span className="paper-kicker">YOGESH BATTULA / EXPERIENCE</span><pre>{copy.slice(0,shown)}{shown<copy.length?'▌':''}</pre></div><img className="typewriter-machine" src="/about-art/typewriter.jpg" alt="" width="736" height="985" loading="lazy" decoding="async"/></div>
 <div className="experience-readable"><ol>{roles.map((r,i)=>{const start=roles.slice(0,i).map(role=>role.join('\n')).join('\n\n').length+(i?2:0);const reveal=reduced?1:Math.max(0,Math.min(1,(shown-start)/r.join('\n').length));return <li key={r[0]} style={{opacity:reveal,transform:`translateY(${(1-reveal)*12}px)`}}><h3>{r[0]}</h3><p>{r[1]}</p><time>{r[2]}</time></li>;})}</ol></div>
 </div></div></section>;
}
const tapes=[['Premalu',84,169,862,126],['John Wick',61,298,870,127],['Captain America: Civil War',68,428,890,127],['Eega',51,557,887,125],['Black Panther',73,685,893,121],['Rangasthalam',46,807,899,121],['F1',75,932,895,120],['Salaar',43,1056,913,125],['Oohalu Gusagusalade',72,1184,886,128],['Baahubali: The Beginning',44,1314,932,126]];
function Cassette({item,index,progress,reduced}){
 const [title,x,y,w,h]=item, start=index*.058;
 const dx=useTransform(progress,[start,start+.35],[(index%2?1:-1)*230,0]);
 const dy=useTransform(progress,[start,start+.35],[-65,0]);
 const rotate=useTransform(progress,[start,start+.35],[(index%2?1:-1)*16,0]);
 const opacity=useTransform(progress,[start,start+.12],[0,1]);
 const id=`about-tape-${index}`;
 return <motion.div className="original-cassette" style={reduced?{x:0,y:0,rotate:0,opacity:1}:{x:dx,y:dy,rotate,opacity}} role="img" aria-label={title}><svg viewBox="0 0 940 126" aria-hidden="true"><defs><clipPath id={id}><rect x={(940-w)/2} y="0" width={w} height={Math.min(h,126)} rx="18"/></clipPath></defs><image href="/about-art/cassettes.jpg" x={-x+(940-w)/2} y={-y} width="1016" height="1548" clipPath={`url(#${id})`}/></svg></motion.div>;
}
export function CassetteCollection(){
 const ref=useRef(null),reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start 70%','end 90%']});
 return <section ref={ref} className={`about-cassettes ${reduced?'is-complete':''}`} aria-labelledby="movies-title"><div className="cassette-sticky"><header className="collection-heading"><h2 id="movies-title">Stories I keep coming back to.</h2></header><div className="cassette-scene"><svg className="cassette-curve" viewBox="0 0 800 800" preserveAspectRatio="none" aria-hidden="true"><motion.path d="M 80 30 C 790 0 790 185 490 210 S -110 340 180 435 S 870 580 700 770" fill="none" stroke="#a6b89c" strokeWidth="3" strokeLinecap="round" style={{pathLength:reduced?1:scrollYProgress}}/></svg><div className="original-stack">{tapes.map((t,i)=><Cassette key={t[0]} item={t} index={i} progress={scrollYProgress} reduced={reduced}/>)}</div></div></div></section>;
}
