import React,{useEffect,useRef} from 'react';
import blocks from './trosky-document.json';
import './TroskyStory.css';
import './TroskyNewsroom.css';

export function TroskyCover(){return <div className="trosky-cover"><small>Trosky 365 · UX case study</small><strong>Coach in<br/>your pocket.</strong><span>From daily assignments to daily conversations ↗</span></div>}

export default function TroskyStory({ onClose }){
  const articleRef=useRef(null);
  useEffect(()=>{
    const root=articleRef.current;
    if(!root || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const targets=root.querySelectorAll('.trosky-chapter-heading, .trosky-chapter-content>*, .trosky-metric');
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.classList.remove('trosky-reveal-pending');observer.unobserve(entry.target);}
      });
    },{threshold:0,rootMargin:'0px 0px -24px 0px'});
    targets.forEach(target=>{target.classList.add('trosky-reveal','trosky-reveal-pending');observer.observe(target);});
    return ()=>{observer.disconnect();targets.forEach(target=>target.classList.remove('trosky-reveal-pending'));};
  },[]);
  const sections=[];
  let body=[];
  for(let i=9;i<blocks.length;i++){
    const block=blocks[i];
    if(block.type==='h2'){
      body=[];sections.push({title:block.text,body});
    }else if(block.type==='li'){
      const items=[block.text];
      while(blocks[i+1]?.type==='li')items.push(blocks[++i].text);
      body.push(<ul key={i}>{items.map((text,j)=><li key={j}>{text}</li>)}</ul>);
    }else if(block.type==='image'){
      const caption=blocks[i+1]?.type==='p'?blocks[++i].text:'';
      body.push(<figure key={i}><a href={block.src} target="_blank" rel="noreferrer" aria-label={`Open image: ${caption}`}><img src={block.src} alt={caption} loading="lazy"/></a>{caption&&<figcaption>{caption}</figcaption>}</figure>);
    }else if(block.type==='gallery'){
      body.push(<figure key={i} className="trosky-image-sequence">{block.images.map((src,j)=><a href={src} key={src} target="_blank" rel="noreferrer" aria-label={`Open Ask Trosky step ${j+1}`}><img src={src} alt={`Ask Trosky drill flow — step ${j+1}`} loading="lazy"/></a>)}</figure>);
    }else if(block.type==='table'){
      if(block.rows.length===1)body.push(<p key={i} className="trosky-summary">{block.rows[0].join('\n')}</p>);
      else body.push(<div key={i} className="trosky-details">{block.rows.slice(1).map(([title,text])=><div key={title}><h4>{title}</h4><p>{text}</p></div>)}</div>);
    }else{
      const Tag=block.type;
      const keyLine=block.text.startsWith('The three-step pattern:') || block.text.startsWith('The twelfth round') || (sections.at(-1)?.title==='Results');
      body.push(<Tag key={i} className={keyLine?'trosky-key-line':undefined}>{block.text}</Tag>);
    }
  }
  return <article ref={articleRef} className="trosky-document"><nav className="trosky-news-nav" aria-label="Case study navigation"><strong>Case studies</strong><a href="/" onClick={e=>{if(onClose){e.preventDefault();onClose();}}}>Yogesh’s portfolio ↗</a></nav><header className="trosky-hero"><small>UX CASE STUDY</small><span className="trosky-article-byline">Trosky 365 · Product design</span><h1>Coach in Your Pocket</h1><p>{blocks[2].text}</p></header><figure className="trosky-lead-media"><div><img src="/case-studies/trosky/42e00451045c32de61f9c68b53c46469d07f6129.jpg" alt="Trosky 365 redesigned home screen"/><img src="/case-studies/trosky/63ea32689bae5f7abe97987209c88a5db9b65343.jpg" alt="Character Launch Checklist coaching interaction"/><img src="/case-studies/trosky/a19f6d0017e788a2b739f1cae3474f3c0de51a69.jpg" alt="Home screen after a completed rep"/></div><figcaption>The redesigned home screen and the Ask Trosky coaching experience.</figcaption></figure><div className="trosky-project-meta">{blocks.slice(4,9).map(b=>{const n=b.text.indexOf(':');return <div key={b.text}><small>{b.text.slice(0,n)}</small><p>{b.text.slice(n+1).trim()}</p></div>})}</div><div className="trosky-metrics" aria-label="Project metrics"><div className="trosky-metric"><small>Design process</small><strong>12</strong><p>Design iterations</p><span>Working sessions with Coach Matt and Coach Trosky.</span></div><div className="trosky-metric"><small>Delivery</small><strong>Same day</strong><p>Approved and shipped</p><span>The final iteration was approved and implemented the same day.</span></div><div className="trosky-metric"><small>Early completion signal</small><strong>~30%</strong><p>More daily reps completed</p><span>Internal before/after estimate. Not a controlled A/B test.</span></div></div><div className="trosky-document-body">{sections.map((section,i)=><section className="trosky-chapter" key={section.title}><div className="trosky-chapter-heading"><span>{String(i+1).padStart(2,'0')}</span><h2>{section.title}</h2></div><div className="trosky-chapter-content">{section.body}</div></section>)}</div></article>;
}
