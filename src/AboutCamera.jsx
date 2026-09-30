import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import portrait from './assets/photo_yogesh_avatar.jpg';

function shutterSound(ctx, reduced) {
 if (!ctx || ctx.state !== 'running') return;
 const burst = (delay, duration, level, frequency) => {
  const source=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();
  const buffer=ctx.createBuffer(1,Math.ceil(ctx.sampleRate*duration),ctx.sampleRate);
  const data=buffer.getChannelData(0);
  for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*Math.sin(Math.PI*i/data.length);
  source.buffer=buffer;filter.type='lowpass';filter.frequency.value=frequency;gain.gain.value=level;
  source.connect(filter);filter.connect(gain);gain.connect(ctx.destination);
  source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();};source.start(ctx.currentTime+delay);
 };
 burst(0,.045,.16,2800);burst(.08,.06,.1,1800);
 if(!reduced)burst(.25,1.1,.035,600);
}
export default function AboutCamera({ onPrinted }) {
 const [phase,setPhase]=useState('ready');
 const reduced=useReducedMotion(),timer=useRef(null),audio=useRef(null),busy=useRef(false);
 useEffect(()=>()=>{clearTimeout(timer.current);audio.current?.close();},[]);
 function takePhoto(){
  if(busy.current)return;
  busy.current=true;
  const Ctx=window.AudioContext||window.webkitAudioContext;
  if(Ctx){try{audio.current ||= new Ctx();const ctx=audio.current;ctx.resume().then(()=>shutterSound(ctx,reduced)).catch(()=>{});}catch{}}
  setPhase('printing');
  timer.current=setTimeout(()=>{setPhase('printed');onPrinted();window.lenis?.resize();},reduced?50:2100);
 }
 return <div className={`about-camera ${phase} ${reduced?'camera-reduced':''}`}>
  <div className="instant-camera-body">
   <img className="instant-camera-image" src="/about-art/instant-camera.png" alt="White Polaroid instant camera" width="746" height="756"/>
   <button type="button" className="camera-shutter" aria-label="Take a photo and reveal my introduction" onClick={takePhoto} disabled={phase!=='ready'} />
   {phase==='printing'&&!reduced&&<span className="camera-flash" aria-hidden="true"/>}
  </div>
  <div className="camera-print-slot" aria-hidden={phase==='ready'}>
   <figure className="camera-polaroid">
    <img src={portrait} alt="Yogesh Battula" width="600" height="800"/>
    <figcaption>Hello, I’m Yogesh.</figcaption>
   </figure>
  </div>
  <p className="camera-prompt" role="status">{phase==='ready'?'Press the red button to meet me.':phase==='printing'?'Developing a little introduction…':'Made of curiosity. Based in Hyderabad.'}</p>
 </div>;
}
