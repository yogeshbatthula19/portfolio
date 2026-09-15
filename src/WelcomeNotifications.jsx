import React,{useEffect,useState} from 'react';
import './WelcomeNotifications.css';

const messages=[
  {app:'Notes',icon:'notes',title:'A little food for thought',text:'Good design starts with “what if?” There’s plenty of that inside.'},
  {app:'Figma',icon:'figma',title:'Fresh from the design kitchen',text:'Ideas, a few wrong turns, and the details that made it work. Come take a look.'},
  {app:'Finder',icon:'finder',title:'Your next rabbit hole is ready',text:'Case studies, favourite films, and a little of my world. Click my profile to explore.'},
];

export default function WelcomeNotifications(){
  const [visible,setVisible]=useState([]);
  useEffect(()=>{
    const timers=messages.map((_,index)=>setTimeout(()=>setVisible(ids=>[...ids,index]),1400+index*3200));
    return()=>timers.forEach(clearTimeout);
  },[]);
  return <aside className="welcome-notifications" aria-label="Portfolio notifications"><div aria-live="polite" aria-relevant="additions">{visible.map(id=>{const message=messages[id];return <section className="welcome-notification" key={id}><img src={`/icons/${message.icon}.png`} alt=""/><div className="welcome-notification-copy"><div className="welcome-notification-meta"><span>{message.app}</span><span>now</span></div><h2>{message.title}</h2><p>{message.text}</p></div><button className="welcome-notification-close" aria-label={`Dismiss ${message.app} notification`} onClick={()=>setVisible(ids=>ids.filter(value=>value!==id))}>×</button></section>;})}</div></aside>;
}
