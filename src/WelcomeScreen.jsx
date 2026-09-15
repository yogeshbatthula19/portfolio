import React,{useEffect,useRef,useState} from 'react';
import './WelcomeScreen.css';
import WelcomeNotifications from './WelcomeNotifications.jsx';

export default function WelcomeScreen({children}){
  const [time,setTime]=useState(()=>new Date());
  const [entered,setEntered]=useState(false);
  const [leaving,setLeaving]=useState(false);
  const [avatar]=useState(()=>{
    let previous=-1;
    try{previous=Number(sessionStorage.getItem('welcome-avatar')??-1);}catch{}
    const choices=[0,1,2,3].filter(index=>index!==previous);
    const next=choices[Math.floor(Math.random()*choices.length)];
    try{sessionStorage.setItem('welcome-avatar',String(next));}catch{}
    return next;
  });
  const timer=useRef(null);
  const desktop=useRef(null);
  useEffect(()=>{const clock=setInterval(()=>setTime(new Date()),1000);return()=>{clearInterval(clock);clearTimeout(timer.current);};},[]);
  useEffect(()=>{if(entered)desktop.current?.focus();},[entered]);
  const enter=()=>{
    if(leaving)return;
    setLeaving(true);
    timer.current=setTimeout(()=>setEntered(true),window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:480);
  };
  if(entered)return <div ref={desktop} tabIndex={-1} className="welcome-desktop">{children}</div>;
  return <main className={`welcome-screen${leaving?' is-entering':''}`} aria-label="Welcome to Yogesh’s portfolio">
    <div className="welcome-aurora" aria-hidden="true"/>
    <WelcomeNotifications/>
    <div className="welcome-clock"><p>{time.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}</p><time dateTime={time.toISOString()}>{time.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'}) .replace(/\s?[AP]M/,'')}</time></div>
    <div className="welcome-profile"><button onClick={enter} disabled={leaving} aria-label="Enter Yogesh Battula’s portfolio"><span className="welcome-avatar" style={{backgroundPosition:`${avatar%2*100}% ${Math.floor(avatar/2)*100}%`}} aria-hidden="true"/><strong>Yogesh Battula</strong><span className="welcome-enter">Click to enter <span aria-hidden="true">→</span></span></button></div>
  </main>;
}
