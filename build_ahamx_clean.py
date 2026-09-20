from pathlib import Path
import random, math
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor as C
from PIL import Image
import build_ahamx_case_study as base

ROOT=Path(__file__).parent
OUT=ROOT/'output/pdf/AhamX_Product_Design_Case_Study.pdf'
S=ROOT/'output/pdf/ahamx-assets/exact'
W,H=960,600
BLACK=C('#1D1D1F'); GRAY=C('#626268'); BG=C('#F5F5F7'); BLUE=C('#0071E3'); WHITE=C('#FFFFFF')
c=canvas.Canvas(str(OUT),pagesize=(W,H),pageCompression=1)
c.setTitle('AhamX | Learning, with continuity');c.setAuthor('Yogesh Battula')
n=0
def txt(s,x,y,size=12,color=BLACK,font='Inter',w=None,leading=None):
 return base.text(c,s,x,y,size,color,font,leading or size*1.4,w)
def start(kicker,title,sub=None):
 global n
 n+=1;c.setFillColor(WHITE);c.rect(0,0,W,H,fill=1,stroke=0)
 txt('AhamX',48,564,10,BLACK,'InterB');txt(kicker,650,564,8,GRAY,w=260)
 ty=txt(title,48,505,28,BLACK,'InterB',w=860,leading=34)
 if sub:txt(sub,48,ty-12,11,GRAY,w=835,leading=16)
 c.setStrokeColor(C('#DEDEE2'));c.setLineWidth(.6);c.line(48,39,912,39)
 txt('Yogesh Battula / Product design',48,23,7,GRAY);txt(f'{n:02}',894,23,7,GRAY)
def end():c.showPage()
def panel(x,y,w,h):
 c.setFillColor(BG);c.roundRect(x,y,w,h,16,stroke=0,fill=1)
def screen(name,x,y,w,maxh=None):
 path=S/(name+'.png');iw,ih=Image.open(path).size
 h=w*ih/iw
 if maxh and h>maxh:h=maxh;w=h*iw/ih
 # Respect the source aspect ratio. Each image is exactly one complete source frame.
 for offset,col in [(5,'#E6E6E9'),(2,'#DADADD')]:
  c.setFillColor(C(col));c.roundRect(x-offset,y-offset,w+2*offset,h+2*offset,10,stroke=0,fill=1)
 c.drawImage(str(path),x,y,w,h,mask='auto')
 return w,h
def caption(s,x,y,w=400):txt(s,x,y,8.5,GRAY,w=w,leading=12)
def bullet(head,body,x,y,w=240):
 txt(head,x,y,15,BLACK,'InterB',w=w);txt(body,x,y-31,11,GRAY,w=w,leading=16)

# Slide 1: Cover
start('PRODUCT CASE STUDY / 2026','Learning, with continuity.','AhamX connects learning, creation and community in one AI-assisted experience.')
txt('My role: Lead Product Designer, working with product and engineering to design end-to-end desktop and mobile experiences.',48,432,10.5,BLACK,'InterB',w=835)
screen('learner',240,95,465)
screen('mobile-learning',747,85,132)
txt('Shipped in 3 months.',48,339,18,BLACK,'InterB',w=162)
txt('Showcased at the India AI Impact Summit 2026.',48,272,13,GRAY,w=158)
txt('Desktop + mobile',48,163,9,BLUE,'InterB');end()

# Slide 2: Context
start('01 / CONTEXT','Three months to build. A summit stage to show it.','Delivering a connected AI skilling ecosystem from concept to national demonstration.')
for x,big,small in [(48,'12 weeks','Rapid design-to-ship production cycle'),(348,'2026','India AI Impact Summit, New Delhi'),(648,'17+ screens','Complete desktop and mobile surface')]:
 panel(x,250,264,135);txt(big,x+21,335,26,BLACK,'InterB');txt(small,x+21,295,11,GRAY,w=220)
txt('Product mission & audiences',48,208,15,BLACK,'InterB')
txt('AhamX is an AI-native learning and skilling platform that unites coursework, community engagement, and course authoring under a single shared identity. It serves students, educators, and enterprise teams by providing personalized learning paths, seamless cohort discussions, and AI-assisted curriculum creation.',48,178,11,GRAY,w=840,leading=16)
txt('Key outcome: Shipped 17+ desktop and mobile screens within 12 weeks, presented live to enterprise partners and national delegates at Bharat Mandapam.',48,118,11.5,BLACK,'InterB',w=840,leading=16)
caption('Showcased at the Google and ARTPARK booths, India AI Impact Summit 2026.',48,65,850);end()

# Slide 3: Problem
start('02 / PROBLEM','Too much to remember.','The central design risk: people must navigate a broad system while remembering their goal, role and unfinished work.')
for x,h,b in [(48,'The learner','After an interruption, finding the right lesson can cost the small window they had to study.'),(348,'The educator','AI can create a draft quickly, but the educator still carries responsibility for accuracy and teaching quality.'),(648,'The administrator','A connection or profile change can affect an organization. Ambiguous identity makes action feel risky.')]:
 panel(x,202,264,199);bullet(h,b,x+20,365,224)
txt('Design question',48,151,10,BLUE,'InterB')
txt('How can every screen help a person understand where they are, what is ready and what to do next?',48,115,22,BLACK,'InterB',w=815,leading=28)
end()

# Slide 4: User Empathy & Assumptions
start('03 / USER EMPATHY','Understand the pressure behind the click.','Working assumptions, to validate with users.')
rows=[('Situation','Hidden concern','Experience response'),
      ('A learner returns after a busy week.','I have forgotten where I stopped.','Show the current course and completion state.'),
      ('An educator reviews AI output.','My name will be attached to this.','Keep editing and review stages explicit.'),
      ('An administrator changes a relationship.','Am I acting for the right organization?','Show identity, relationship type and status.'),
      ('A learner studies on a phone between commitments.','I only have a few minutes.','Keep the learning context readable and reachable.')]
for i,row in enumerate(rows):
 y=389-i*64
 if i%2==0:panel(48,y-40,864,61)
 for j,s in enumerate(row):txt(s,62+j*287,y,10.5,BLACK if i==0 else GRAY,'InterB' if i==0 else 'Inter',w=256,leading=15)
end()

# Slide 5: Working Persona
start('04 / WORKING PERSONA','Ananya. Educator, creator and cohort mentor.',"Working persona, built from the product's role model.")
panel(48,108,260,292);txt('A',132,288,65,BLUE,'InterB');txt('Ananya',78,237,24,BLACK,'InterB')
txt('Accountable for the learning experience, even when AI helps produce it.',78,199,12,GRAY,w=202)
bullet('What success feels like','A course she understands, can improve and feels confident sharing with her students.',350,378,510)
bullet('What creates hesitation','Unclear readiness, repeated setup and uncertainty about which identity is active.',350,280,510)
bullet('What she needs from the product','A visible next step, recoverable work and control over each stage before publishing.',350,182,510)
end()

# Slide 6: Three Decisions That Shaped the Build
start('05 / PROCESS','Three decisions that shaped the build.','Delivering in three months meant ruthlessly prioritizing core journey continuity over peripheral settings.')
for x,k,h,b in [
 (48,'01','Prioritized: One-tap lesson resume','Cut custom dashboard widgets to ensure returning learners resume their in-progress lesson in a single click from any entry point.'),
 (348,'02','Prioritized: Staged AI authoring','Cut one-click full generation to keep outline, script, and media review explicit so educators retain total pedagogical control.'),
 (648,'03','Prioritized: Role & entity clarity','Cut multi-tenant organizational depth to guarantee clear role context and safe approval workflows across entities.')
]:
 panel(x,176,264,227);txt(k,x+20,365,12,BLUE,'InterB');bullet(h,b,x+20,329,224)
end()

# Slide 7: Discovery Plan
start('06 / DISCOVERY',"Discovery plan: what I'd ask next.",'Targeted user research guide to validate workflow assumptions and uncover friction points across roles.')
questions=[('Learners','Tell me about the last time you tried to resume a lesson. What made you stop or search?'),('Educators','Show me the last piece of generated content you changed. What made you doubt it?'),('Organization leads','Walk me through the last request you approved. What did you need to verify?')]
for i,(h,b) in enumerate(questions):
 y=375-i*98;txt(h,48,y,15,BLACK,'InterB');txt(b,275,y,12,GRAY,w=610)
panel(48,64,864,62);txt('Validation loop',65,103,10,BLUE,'InterB');txt('Live user scenario → observed friction → design decision → screen iteration → benchmark metric',225,99,11.5,BLACK,'InterB')
end()

# Slide 8: Concept Mapping
rng=random.Random(73)
def pencil(x1,y1,x2,y2):
 c.setStrokeColor(C('#64635F'));c.setLineWidth(.75)
 p=c.beginPath();p.moveTo(x1,y1)
 for k in range(1,7):
  a=k/6;p.lineTo(x1+(x2-x1)*a+rng.uniform(-1,1),y1+(y2-y1)*a+rng.uniform(-1,1))
 c.drawPath(p)
def box(x,y,w,h):
 for a,b,d,e in [(x,y,x+w,y),(x+w,y,x+w,y+h),(x+w,y+h,x,y+h),(x,y+h,x,y)]:pencil(a,b,d,e)
def hand(s,x,y,size=14):txt(s,x,y,size,C('#4A4945'),'Hand')
start('07 / CONCEPT MAPPING','Early concept mapping.','Low-fidelity wireframes mapping information hierarchy and user flows across four roles before pixel execution.')
c.setFillColor(C('#E9E8E4'));c.roundRect(68,65,830,350,8,fill=1,stroke=0)
c.setFillColor(C('#FFFEF9'));c.rect(76,74,814,344,fill=1,stroke=0)
for y in range(88,410,19):
 c.setStrokeColor(C('#E3E8EC'));c.setLineWidth(.4);c.line(89,y,875,y)
c.setStrokeColor(C('#D8D2C7'));c.line(480,77,480,416)
hand('Where did I stop?',100,390,20)
hand('Dashboard',101,353);box(101,251,157,88);box(112,307,130,20);box(112,265,57,31);box(181,265,61,31)
hand('Feed',284,353);box(284,251,159,88);box(296,297,134,23);box(296,261,134,25)
hand('Course builder',101,216);box(101,102,163,94);box(110,113,39,71);box(157,113,94,71)
hand('Review before publish',287,186);pencil(290,170,417,170);hand('content / script',287,148);hand('audio / video',287,125)
hand('Discussion prompts',504,390,20);hand('What feels unclear?',507,351,17);hand('Can I trust this draft?',507,318,17)
hand('Org relationships',508,269);box(553,225,115,26);box(508,167,72,26);box(614,167,72,26);pencil(610,225,544,193);pencil(610,225,650,193)
hand('Mobile',748,269);box(750,104,86,139);box(760,185,66,29);box(760,126,66,48)
end()

def pair(k,title,sub,a,b,ca,cb):
 start(k,title,sub)
 for name,x,cap in [(a,54,ca),(b,498,cb)]:
  screen(name,x,105,408);caption(cap,x,78,400)
 end()

# Slide 9: Dashboards
pair('08 / SCREENS 01–02','Progress gives people a place to return.','Learner and organization dashboards provide quick orientation and clear next steps.','learner','dashboard','Learner dashboard: the current course sits first, so a returning learner resumes in one tap.','Organization dashboard: team progress and recent cohort updates aggregated at a high level.')

# Slide 10: Community
pair('09 / SCREENS 03–04','Community is anchored in identity.','Discussions carry organizational credibility by attributing every post to verified roles.','feed','profile',"Sarathi, the community feed: every post carries the author's role and department.",'Personal profile: showcases accredited contributions, active cohorts, and peer connections.')

# Slide 11: Outline and Lesson
pair('10 / SCREENS 05–06',"An AI draft still needs an educator's judgment.",'Structuring courses into reviewable lessons ensures instructional rigor before release.','outline','content','Outline: readiness is counted (0/8 lessons ready), so Publish stays disabled until review.','Lesson editor: educators review and refine AI-generated content before advancing.')

# Slide 12: Script and Audio
pair('11 / SCREENS 07–08','Every AI step is visible before the next.','Decoupling script review from audio synthesis gives creators granular control over voice and tone.','script','audio','Script and audio are separate stages, so the educator reviews words before delivery.','Audio synthesis: playback controls let educators audition voice and pacing before media render.')

# Slide 13: Video and Library
pair('12 / SCREENS 09–10','Create once. Reuse often.','Lessons and media assets are saved into a central library for assignment across multiple cohorts.','video','library','Video lesson: final media preview with timestamps, captions, and export options.','Library: concepts saved as draft or completed, ready to assign to cohorts.')

# Slide 14: Hierarchy and Network
pair('13 / SCREENS 11–12','People should see what a request will change.','Transparent organization hierarchies clarify institutional permissions and pending approvals.','hierarchy','network','Hierarchy: visual mapping of parent, department, and collaborator relationships.','Network: each incoming request shows who, what relationship, and when, with Approve and Reject.')

# Slide 15: Registration and Cohorts
pair('14 / SCREENS 13–14','Short setup. Teaching context preserved.','Friction-free onboarding lets academic departments start quickly while preserving course data.','register','cohorts','Registration asks for three fields and lets you update the rest later.','Cohorts: manages student groups, assigned curriculum, and educator mentors in one place.')

# Slide 16: Mobile Screens
start('15 / SCREENS 15–17','The learning context travels with the person.','Responsive mobile experiences ensure uninterrupted study and peer communication.')
for name,x,cap in [('mobile-learning',119,'Bodhi, the learner home: cohorts and learning time on one screen.'),('mobile-profile',396,'Entity profile: organizational context and verified affiliations on mobile.'),('mobile-chat',673,'Cohort discussion: real-time mentor feedback and peer threads on the go.')]:
 screen(name,x,82,157);caption(cap,x,58,220)
end()

# Slide 17: Measurement
start('16 / MEASUREMENT',"How I'd measure confidence.",'Key validation metrics to benchmark usability, clarity, and task success across roles.')
rows=[('Question','Measure','Baseline'),
      ('Can learners resume without help?','Completion rate + time to resume','To be established.'),
      ('Do educators understand readiness?','Correct next-step identification','To be established.'),
      ('Is the active identity clear?','Role comprehension + wrong-role actions','To be established.'),
      ('Can administrators act confidently?','Request success + error rate','To be established.')]
for i,row in enumerate(rows):
 y=385-i*61
 if i%2==0:panel(48,y-37,864,58)
 for j,s in enumerate(row):txt(s,[64,449,760][j],y,10,BLACK if i==0 else GRAY,'InterB' if i==0 else 'Inter',w=[357,287,140][j])
caption('Baseline metrics to be established in post-launch usability trials. Prototype data in screens reflect initial test fixtures.',48,84,840);end()

# Slide 18: Roadmap
start('17 / ROADMAP','A roadmap beyond launch.','Prioritized future evolutions to scale intelligence and credential portability across institutions.')
for x,h,b in [(48,'Strengthen the core','Validate critical tasks, improve accessibility standards, and establish quantitative learning metrics.'),
              (348,'Deepen AI guidance','Introduce contextual tutoring agents and finer editorial controls for AI-generated curriculum.'),
              (648,'Connect credentials','Link verified learning outcomes and institutional attestations into a durable, portable learner profile.')]:
 panel(x,178,264,223);bullet(h,b,x+20,362,225)
txt('What I learned',48,127,10,BLUE,'InterB')
txt('In a three-month build, making the next step obvious mattered more than adding features.',48,90,20,BLACK,'InterB',w=840)
end()

# Slide 19: Credits and Sources
start('18 / CREDITS & SOURCES','Credits and sources.','Attributions, project background, and public references.')
items=[('Product design & deliverables','17 complete original desktop and mobile frames designed across 12 weeks for the AhamX ecosystem.'),
       ('Project execution','Led end-to-end UX architecture and visual design in collaboration with engineering and product leadership.'),
       ('Design methodology','Empathy hypotheses, trade-off frameworks, and measurement roadmaps developed to structure ongoing validation.'),
       ('Public showcase context','Showcased at the Google and ARTPARK booths during the India AI Impact Summit 2026 at Bharat Mandapam, New Delhi.')]
for i,(h,b) in enumerate(items):
 y=422-i*72;txt(h,48,y,12,BLACK,'InterB');txt(b,287,y,10,GRAY,w=617,leading=15)
links=[('ZenteiQ showcase announcement','https://www.linkedin.com/posts/zenteiq_aisummit-ai-enterpriseai-activity-7430156021882380288-QWFA'),
       ('Prime Minister of India: summit coverage','https://www.pmindia.gov.in/en/news_updates/pm-inaugurates-india-ai-impact-summit-2026/')]
for i,(s,u) in enumerate(links):
 y=116-i*20;txt(s,48,y,9,BLUE);c.linkURL(u,(48,y-3,360,y+11),relative=0,thickness=0)
caption('Screen content is prototype data.',48,55,840)
end()
c.save();print(OUT)
