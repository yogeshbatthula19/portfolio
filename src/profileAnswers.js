// Curated answers grounded in AboutMe.jsx, Experience.jsx and projects.jsx.
const topics = [
  {id:'contact', match:/contact|email|phone|reach|hire|available|availability|salary|rate|linkedin/i, text:'Interested in working together? I haven’t published my contact details or availability here yet. You can take a look at my résumé in the meantime.', section:'Resume', action:'View résumé', source:'Contact'},
  {id:'resume', match:/resume|résumé|cv|download/i, text:'My résumé is available right here in the workspace. Open it to read or download the PDF.', section:'Resume', action:'Open résumé', source:'Résumé'},
  {id:'recovery', match:/recovery|rehab|health|patient|surgeon/i, text:'Recovery is a clinical rehabilitation platform connecting surgeons, physiotherapists, and patients. My case study covers shared onboarding, exercise tracking, progress dashboards, and care-team coordination. Detailed outcome metrics aren’t published.', section:'Projects', action:'Explore case studies', source:'Recovery case study'},
  {id:'trosky', match:/trosky|baseball|coach/i, text:'Trosky 365 is an AI-guided baseball coaching experience. I designed a conversational training companion that turns daily assignments and complex athletic mechanics into a guided coaching journey.', section:'Projects', action:'Explore case studies', source:'Trosky 365 · About'},
  {id:'experience', match:/experience|compan|career|worked|working|job|paradigm|prasthana|scrum|build up/i, text:'I’m a Product Designer at ParadigmIT (Aug 2025–present). Previously, I worked as a freelance Scrum Master (Jan–Aug 2025), Sr. Product Designer / Scrum Master & UX Designer at Prasthana Software Solutions (May 2022–Dec 2024), and UI Designer intern at BUILD UP (Jan–Apr 2022).', section:'Experience', action:'View experience', source:'Experience'},
  {id:'tools', match:/tool|figma|code|skill|photoshop|jira|stack|design system/i, text:'My favorite tools are Figma and code. I also use Jira, Photoshop, Android Studio, Claude, Codex, and Antigravity. My work spans product strategy, user flows, wireframes, prototypes, web and mobile interfaces, and design systems.', section:'About me', action:'More about me', source:'About · Applications'},
  {id:'location', match:/where|location|based|hyderabad|city|from/i, text:'I’m based in Hyderabad, India. The Charminar in my portfolio is a little nod to home.', section:'About me', action:'More about me', source:'About'},
  {id:'interests', match:/hobb|interest|outside|fun|movie|coffee|car|drone|passion/i, text:'Outside design, I enjoy cars, tech gadgets, 4×4 adventures, FPV drones, and coffee. I’m into sci-fi and crime movies, and I love craft and micro-details.', section:'About me', action:'More about me', source:'About'},
  {id:'projects', match:/project|work|portfolio|case stud|built|made/i, text:'Start with Recovery, a connected rehabilitation platform, and Trosky 365, a conversational baseball coaching experience. This desktop-inspired portfolio is also a project: familiar folders, windows, and a Dock make exploring my work feel personal.', section:'Projects', action:'Open projects', source:'Projects'},
  {id:'about', match:/yogesh|profile|about|who|what do you do|introduc|designer|background|yourself/i, text:'I’m Yogesh Battula, a Product Designer based in Hyderabad. I’ve spent 4+ years turning complex workflows into thoughtful digital experiences, with a focus on systems, micro-interactions, and human psychology.', section:'About me', action:'More about me', source:'About'},
];
export function answerProfile(question, previousTopic) {
  const q = question.toLowerCase().replace(/[’']/g,'');
  if (/^(hi|hello|hey|thanks|thank you)[!.\s]*$/.test(q)) return {text:'Hey! I’m Yogesh. Ask me about my projects, experience, skills, or life outside design.', source:'My portfolio'};
  if (/^(tell me more|more|go on|explain more)[!.\s]*$/.test(q) && previousTopic) {
    const topic = topics.find(t=>t.id===previousTopic);
    if(topic) return {...topic, text:`You can explore the full details in ${topic.source}. ${topic.text}`};
  }
  return topics.find(t=>t.match.test(q)) || {text:'I don’t have that detail in my portfolio yet. You can ask me about my experience, projects, tools, location, interests, or résumé.', source:'My portfolio'};
}
