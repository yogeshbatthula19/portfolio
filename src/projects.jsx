import React,{useRef,useEffect,useState} from 'react';
import RecoveryStory from './RecoveryStory.jsx';
import TroskyStory,{TroskyCover} from './TroskyStory.jsx';
export const projects=[
  {
    id:'trosky',
    title:'Coach in Your Pocket',
    folderName:'Trosky 365',
    category:'Trosky 365 · UX design',
    summary:'Turning daily baseball assignments into a guided conversation with a coach.',
    visual:'trosky',
    folderColor:'#4ea5eb',
    assets:[
      {type:'photo',src:'/case-studies/trosky/ff7736796fd5c04654ecf72fdb3338c8006a1ef6.jpg',title:'Drill Video',pos:'asset-left'},
      {type:'doc',src:'/case-studies/trosky/42e00451045c32de61f9c68b53c46469d07f6129.jpg',title:'Drill Card',pos:'asset-center'},
      {type:'badge',icon:'/icons/figma.png',title:'UX',pos:'asset-right'}
    ]
  },
  {
    id:'recovery',
    title:'Recovery — Re-Design',
    folderName:'Recovery — Re-Design',
    category:'Healthcare · Product design',
    summary:'Connecting surgeons, physiotherapists, and patients through a shared rehabilitation experience.',
    problem:'The case study describes disconnected onboarding and self-reported progress, leaving care teams with limited visibility between appointments.',
    decisions:['Use a shared recovery workflow across surgeon, physiotherapist, and patient roles.','Make adherence and daily progress visible through structured dashboards and progress charts.','Design for missed days, exceeded targets, and course changes as part of the core experience.','Keep visual patterns consistent across roles while tailoring each information hierarchy.'],
    result:'The design covers patient onboarding, exercise tracking, progress dashboards, and care-team coordination. Detailed adoption and clinical outcome metrics are confidential in the source case study.',
    status:'Senior Product Designer · Case study',
    visual:'recovery',
    url:'https://www.figma.com/design/Mx3waiPzObcJFwYa37M6I4/Recovery-Re-Design?node-id=9245-9457',
    folderColor:'#4ea8de',
    assets:[
      {type:'photo',src:'/case-studies/recovery/cover.png',title:'Surgeon View',pos:'asset-left'},
      {type:'doc',src:'/case-studies/recovery/transformation.png',title:'Patient Progress',pos:'asset-center'},
      {type:'badge',icon:'/icons/figma.png',title:'Care',pos:'asset-right'}
    ]
  },
  {
    id:'workspace',
    title:'A personal workspace',
    folderName:'Workspace',
    category:'Portfolio · Interactive web',
    summary:'A desktop-inspired portfolio that gives familiar interactions a personal purpose.',
    problem:'Make a personal website feel approachable while keeping work and navigation easy to find.',
    decisions:['Use familiar folders and a dock to organize the site.','Keep content scrolling inside the window so navigation remains accessible.','Open project case studies directly from the workspace.'],
    result:'Working responsive prototype with section navigation, native icon assets, and reduced-motion support.',
    status:'Prototype · In this workspace',
    visual:'workspace',
    folderColor:'#5b9be6',
    assets:[
      {type:'photo',src:'/images/welcome-memoji.png',title:'Yogesh',pos:'asset-left'},
      {type:'doc',src:'/images/collage-sticker.png',title:'Desk Art',pos:'asset-center'},
      {type:'badge',icon:'/icons/finder.png',title:'Mac OS',pos:'asset-right'}
    ]
  }
];

function FolderWithAssets({project}){
  return (
    <div className="folder-container-graphic" aria-hidden="true">
      <div className="folder-back-pocket">
        <div className="folder-back-tab"/>
      </div>
      <div className="folder-peeking-assets">
        {project.assets?.map((asset,i)=>(
          <div key={i} className={`folder-peeking-asset ${asset.pos}`}>
            {asset.type==='photo'||asset.type==='doc'?(
              <img src={asset.src} alt={asset.title||''} className="peeking-img"/>
            ):asset.type==='badge'?(
              <div className="peeking-badge">
                <img src={asset.icon} alt="" className="peeking-badge-icon"/>
                <span>{asset.title}</span>
              </div>
            ):null}
          </div>
        ))}
      </div>
      <div className="folder-front-flap">
        <div className="folder-front-sheen"/>
        <span className="folder-asset-count">
          {project.id==='trosky'?'3 files':project.id==='recovery'?'4 files':'3 files'}
        </span>
      </div>
    </div>
  );
}

function Visual({project}){return project.visual==='trosky'?<TroskyCover/>:project.visual==='recovery'?<img className="case-image recovery-cover" src="/case-studies/recovery/cover.png" alt="Recovery rehabilitation app showing surgeon dashboard, patient progress, and patient list"/>:project.visual==='house'?<img className="case-image" src="/images/house-lineup.png" alt="South House concept artwork"/>:<div className="workspace-preview"><img src="/icons/finder.png" alt=""/><div><small>YOGESH’S SPACE</small><strong>A familiar feeling.<br/>A personal touch.</strong></div><img src="/icons/folder.png" alt=""/></div>}

export function ProjectBrowser({query,onPreview}){
  const[selected,setSelected]=useState('trosky');
  const itemsRef=useRef([]);
  const visible=projects.filter(p=>(p.title+' '+(p.folderName||'')+' '+p.category).toLowerCase().includes(query.toLowerCase()));
  const active=projects.find(p=>p.id===selected)||visible[0];

  useEffect(()=>{
    if(visible.length&&!visible.some(p=>p.id===selected)){
      setSelected(visible[0].id);
    }
  },[query,visible,selected]);

  const handleKeyDown=(e,index,project)=>{
    if(e.key==='ArrowRight'||e.key==='ArrowDown'){
      e.preventDefault();
      const nextIndex=(index+1)%visible.length;
      setSelected(visible[nextIndex].id);
      itemsRef.current[nextIndex]?.focus();
    }else if(e.key==='ArrowLeft'||e.key==='ArrowUp'){
      e.preventDefault();
      const prevIndex=(index-1+visible.length)%visible.length;
      setSelected(visible[prevIndex].id);
      itemsRef.current[prevIndex]?.focus();
    }else if(e.key==='Home'){
      e.preventDefault();
      setSelected(visible[0].id);
      itemsRef.current[0]?.focus();
    }else if(e.key==='End'){
      e.preventDefault();
      const lastIndex=visible.length-1;
      setSelected(visible[lastIndex].id);
      itemsRef.current[lastIndex]?.focus();
    }else if(e.code==='Space'||e.key==='Enter'){
      e.preventDefault();
      onPreview(project);
    }
  };

  return (
    <div className="finder-folder-view" role="region" aria-label="Projects Explorer">
      <div className="finder-folder-grid" role="listbox" aria-label="Case study folders. Use arrow keys to navigate.">
        {visible.map((p,idx)=>(
          <div
            key={p.id}
            ref={el=>itemsRef.current[idx]=el}
            className={'finder-folder-item '+(selected===p.id?'is-selected':'')}
            tabIndex={0}
            role="option"
            aria-selected={selected===p.id}
            aria-label={`${p.folderName||p.title}. Folder with ${p.assets?.length||3} files. Use arrow keys to navigate, Space or Enter to open.`}
            onClick={()=>{
              if(selected===p.id&&window.innerWidth<=768){
                onPreview(p);
              }else{
                setSelected(p.id);
              }
            }}
            onDoubleClick={()=>onPreview(p)}
            onKeyDown={e=>handleKeyDown(e,idx,p)}
          >
            <FolderWithAssets project={p}/>
            <span className="finder-folder-name">{p.folderName||p.title}</span>
            <span className="finder-folder-sub">{p.category.split('·')[0].trim()}</span>
          </div>
        ))}
      </div>
      {!visible.length&&<p className="finder-empty-msg">No matching folders found.</p>}
    </div>
  );
}

export function QuickLook({project,onClose}){
  const ref=useRef(null);
  useEffect(()=>{
    const previous=document.activeElement;
    ref.current?.showModal();
    return()=>previous?.focus();
  },[]);

  return (
    <dialog
      className={'quicklook '+(project.id!=='workspace'?'recovery-dialog':'')}
      ref={ref}
      onCancel={onClose}
      onClick={e=>{if(e.target===ref.current)onClose()}}
      onKeyDown={e=>{if((e.code==='Space'||e.key==='Escape')&&e.target===ref.current){e.preventDefault();onClose()}}}
    >
      <div className="quicklook-bar">
        <span>Quick Look — {project.folderName||project.title}</span>
        <button onClick={onClose} aria-label="Close Quick Look" className="quicklook-close-btn">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div className="quicklook-scroll">
        {project.id==='trosky'?<TroskyStory/>:project.id==='recovery'?<RecoveryStory/>:<><Visual project={project}/><div className="quicklook-copy"><small>{project.status}</small><h2>{project.title}</h2><p className="case-summary">{project.summary}</p><section><h3>The problem</h3><p>{project.problem}</p></section><section><h3>Key decisions</h3><ul>{project.decisions.map(d=><li key={d}>{d}</li>)}</ul></section><section><h3>Current outcome</h3><p>{project.result}</p></section>{project.id==='recovery'?<><section><h3>What changed</h3><p>The source case study compares disconnected clinic check-ins with shared onboarding, ongoing progress tracking, and explicit recovery states.</p><a href="/case-studies/recovery/transformation.png" target="_blank" rel="noreferrer"><img className="transformation-image" src="/case-studies/recovery/transformation.png" alt="Recovery case study: before and after comparison and design principles"/></a></section><a className="figma-source" href={project.url} target="_blank" rel="noreferrer">Explore the Figma case study ↗</a><p className="case-disclosure">Summary based on the supplied Recovery design file. Clinical outcome metrics are not disclosed.</p></>:<p className="case-disclosure">Project role, timeline, and measured results are awaiting confirmation.</p>}</div></>}
      </div>
    </dialog>
  );
}
