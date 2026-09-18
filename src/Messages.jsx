import React, {useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {ArrowUp, RotateCcw} from 'lucide-react';
import {useDraggable} from './useDraggable.js';
import {answerProfile} from './profileAnswers.js';
import './Messages.css';

const welcome = {role:'assistant', text:'Hey, I’m Yogesh. ✨\nWelcome to my space! Ask me about my work, my design process, or life outside the screen.', source:'Answers from this portfolio'};
const suggestions = ['Tell me about yourself', 'What have you worked on?', 'What tools do you use?', 'What do you do outside design?'];

export default function Messages({onNavigate}) {
  const dialog=useRef(null), input=useRef(null), trigger=useRef(null), end=useRef(null), timer=useRef(null), topic=useRef(null), minimized=useRef(false);
  const [maximized,setMaximized]=useState(false), [messages,setMessages]=useState([welcome]), [draft,setDraft]=useState(''), [typing,setTyping]=useState(false);
  const {pos,resetPos,dragHandlers}=useDraggable(maximized);
  useEffect(()=>()=>clearTimeout(timer.current),[]);
  useEffect(()=>{end.current?.scrollIntoView({block:'nearest'});},[messages,typing]);
  const open=()=>{if(!minimized.current){setMaximized(false);resetPos();}minimized.current=false;dialog.current.showModal();input.current?.focus();};
  const close=()=>{minimized.current=false;dialog.current.close();trigger.current?.focus();};
  const zoom=()=>{resetPos();setMaximized(v=>!v);};
  const send=(value)=>{
    const text=value.trim();if(!text||typing)return;
    setMessages(m=>[...m,{role:'user',text}]);setDraft('');setTyping(true);
    const answer=answerProfile(text,topic.current);topic.current=answer.id;
    timer.current=setTimeout(()=>{setMessages(m=>[...m,{...answer,role:'assistant'}]);setTyping(false);},420);
    input.current?.focus();
  };
  return <>
    <button ref={trigger} className="dock-item messages-launcher" aria-label="Messages — Ask about Yogesh" onClick={open}><img src="/icons/siri.png" alt="" draggable="false"/><span className="tooltip">Messages</span></button>
    {createPortal(<dialog ref={dialog} aria-labelledby="messages-title" className={'messages-window'+(maximized?' app-fullscreen':'')} style={maximized?undefined:{transform:`translate(${pos.x}px,${pos.y}px)`}} onCancel={e=>{e.preventDefault();close();}}>
      <header className="messages-toolbar" {...dragHandlers} onDoubleClick={e=>{if(!e.target.closest('button'))zoom();}}>
        <div className="mac-window-controls"><button className="red" aria-label="Close Messages" onClick={close}/><button className="yellow" aria-label="Minimize Messages" onClick={()=>{minimized.current=true;dialog.current.close();trigger.current?.focus();}}/><button className="green" aria-label="Toggle maximize Messages" onClick={zoom}/></div>
        <h2 id="messages-title">Messages</h2>
        <button className="messages-reset" aria-label="New conversation" title="New conversation" onClick={()=>{clearTimeout(timer.current);setTyping(false);setMessages([welcome]);setDraft('');topic.current=null;input.current?.focus();}}><RotateCcw size={16}/></button>
      </header>
      <div className="messages-layout">
        <aside className="messages-sidebar"><span className="messages-sidebar-label">CONVERSATIONS</span><div className="messages-conversation"><span className="profile-orb"><img src="/icons/siri.png" alt="" draggable="false"/></span><div><strong>Yogesh Battula</strong><span>Ask me anything</span></div><i/></div><div className="messages-profile"><img src="/images/yogesh-portrait.jpg" alt="Yogesh Battula"/><strong>Yogesh Battula</strong><span>Product Designer</span><small>Hyderabad, India</small></div><p>Get to know the person<br/>behind the pixels.</p></aside>
        <section className="messages-thread" aria-label="Conversation with Yogesh">
          <div className="messages-recipient"><span className="profile-orb"><img src="/icons/siri.png" alt="" draggable="false"/></span><div><strong>Yogesh Battula</strong><span>Product Designer · Hyderabad</span></div></div>
          <div className="messages-history" role="log" aria-label="Messages" aria-live="polite" aria-relevant="additions"><div className="messages-date">Today · Portfolio conversation</div>{messages.map((m,i)=><div key={i} className={'message-row '+m.role}><div className="message-bubble"><span className="sr-only">{m.role==='user'?'You:':'Yogesh:'}</span><p>{m.text}</p>{m.section&&<button onClick={()=>{close();onNavigate(m.section);}}>{m.action} <span aria-hidden="true">↗</span></button>}</div>{m.source&&<small>{m.source}</small>}</div>)}{typing&&<div className="messages-typing" role="status" aria-label="Preparing answer"><i/><i/><i/></div>}<div ref={end}/></div>
          <div className="messages-bottom">{messages.length===1&&<div className="messages-suggestions">{suggestions.map(q=><button key={q} onClick={()=>send(q)}>{q}</button>)}</div>}<form className="messages-composer" onSubmit={e=>{e.preventDefault();send(draft);}}><input ref={input} aria-label="Ask about Yogesh" placeholder="Message Yogesh…" value={draft} maxLength={1000} onChange={e=>setDraft(e.target.value)}/><button type="submit" aria-label="Send message" disabled={!draft.trim()||typing}><ArrowUp size={19}/></button></form><p className="messages-footnote">Automated replies in my voice, based on my portfolio.</p></div>
        </section>
      </div>
    </dialog>,document.body)}
  </>;
}
