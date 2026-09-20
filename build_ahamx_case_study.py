from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.lib.utils import ImageReader
from PIL import Image

ROOT = Path(__file__).parent
OUT = ROOT / "output" / "pdf" / "AhamX_Product_Design_Case_Study.pdf"
ASSET_DIR = ROOT / "output" / "pdf" / "ahamx-assets"
SCREEN_DIR = ASSET_DIR / "screens"
TMP = Path("/private/tmp/ahamx-review")

W, H = 960, 540
INK = HexColor("#101D2A")
TEAL = HexColor("#1E6A70")
MINT = HexColor("#BDE4DB")
CREAM = HexColor("#F5F0E7")
PAPER = HexColor("#FFFDF8")
BLUE = HexColor("#C9D9F8")
CORAL = HexColor("#FF7B64")
YELLOW = HexColor("#F5CF66")
GREY = HexColor("#6D7782")
PALE = HexColor("#E8ECED")

REG = "/System/Library/Fonts/Supplemental/Arial.ttf"
BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
BLACK = "/System/Library/Fonts/Supplemental/Arial Black.ttf"
ITALIC = "/System/Library/Fonts/Supplemental/Arial Italic.ttf"
HAND = "/System/Library/Fonts/Supplemental/Bradley Hand Bold.ttf"
for name, path in [("Inter", REG), ("InterB", BOLD), ("InterX", BLACK), ("InterI", ITALIC), ("Hand", HAND)]:
    pdfmetrics.registerFont(TTFont(name, path))


def img_size(path):
    with Image.open(path) as im:
        return im.size


def image_cover(c, path, x, y, w, h, radius=0, border=None, border_width=1):
    iw, ih = img_size(path)
    scale = max(w / iw, h / ih)
    dw, dh = iw * scale, ih * scale
    dx, dy = x - (dw - w) / 2, y - (dh - h) / 2
    c.saveState()
    p = c.beginPath()
    if radius:
        p.roundRect(x, y, w, h, radius)
    else:
        p.rect(x, y, w, h)
    c.clipPath(p, stroke=0, fill=0)
    c.drawImage(str(path), dx, dy, dw, dh, preserveAspectRatio=True, mask='auto')
    c.restoreState()
    if border:
        c.setStrokeColor(border); c.setLineWidth(border_width)
        c.roundRect(x, y, w, h, radius, stroke=1, fill=0)


def image_fit(c, path, x, y, w, h):
    iw, ih = img_size(path)
    scale = min(w / iw, h / ih)
    dw, dh = iw * scale, ih * scale
    c.drawImage(str(path), x + (w - dw) / 2, y + (h - dh) / 2, dw, dh, preserveAspectRatio=True, mask='auto')


def text(c, s, x, y, size=16, color=INK, font="Inter", leading=None, maxw=None):
    c.setFillColor(color); c.setFont(font, size)
    if maxw is None:
        c.drawString(x, y, s); return y
    words, lines, line = s.split(), [], ""
    for word in words:
        trial = (line + " " + word).strip()
        if c.stringWidth(trial, font, size) <= maxw:
            line = trial
        else:
            if line: lines.append(line)
            line = word
    if line: lines.append(line)
    step = leading or size * 1.35
    for i, line in enumerate(lines):
        c.drawString(x, y - i * step, line)
    return y - len(lines) * step


def label(c, s, x, y, color=TEAL):
    c.setFillColor(color); c.setFont("InterB", 8.5); c.drawString(x, y, s.upper())


def footer(c, page, dark=False):
    col = HexColor("#B8C5C7") if dark else HexColor("#748086")
    c.setFillColor(col); c.setFont("Inter", 7.5)
    c.drawString(42, 22, "AHAMX / PRODUCT DESIGN CASE STUDY")
    c.drawRightString(W - 42, 22, f"{page:02d}")


def pill(c, s, x, y, bg=MINT, fg=INK, width=None):
    width = width or c.stringWidth(s, "InterB", 8) + 20
    c.setFillColor(bg); c.roundRect(x, y, width, 24, 12, stroke=0, fill=1)
    c.setFillColor(fg); c.setFont("InterB", 8); c.drawCentredString(x + width/2, y + 8, s)
    return width


def browser(c, path, x, y, w, h, bg=white, shadow=True):
    if shadow:
        c.setFillColor(HexColor("#0A1B201F")); c.roundRect(x+8, y-8, w, h, 13, stroke=0, fill=1)
    c.setFillColor(bg); c.roundRect(x, y, w, h, 13, stroke=0, fill=1)
    c.setFillColor(HexColor("#DDE2E6")); c.roundRect(x, y+h-22, w, 22, 13, stroke=0, fill=1)
    c.rect(x, y+h-22, w, 10, stroke=0, fill=1)
    for i, col in enumerate([CORAL, YELLOW, HexColor("#58C46D")]):
        c.setFillColor(col); c.circle(x+14+i*12, y+h-11, 3.3, stroke=0, fill=1)
    image_cover(c, path, x+3, y+3, w-6, h-28, 8)


def phone(c, path, x, y, w, h):
    c.setFillColor(HexColor("#071116")); c.roundRect(x, y, w, h, 24, stroke=0, fill=1)
    image_cover(c, path, x+7, y+8, w-14, h-16, 18)
    c.setFillColor(HexColor("#071116")); c.roundRect(x+w*.34, y+h-13, w*.32, 7, 4, stroke=0, fill=1)


def card(c, x, y, w, h, bg=white, radius=14, stroke=None):
    c.setFillColor(bg)
    if stroke:
        c.setStrokeColor(stroke); c.setLineWidth(1)
        c.roundRect(x, y, w, h, radius, stroke=1, fill=1)
    else:
        c.roundRect(x, y, w, h, radius, stroke=0, fill=1)


def orbit_graphic(c, cx, cy, color, scale=1):
    c.saveState()
    c.setStrokeColor(color); c.setLineWidth(1.2)
    for r in [34, 62, 92]:
        c.circle(cx, cy, r*scale, stroke=1, fill=0)
    for ang in [0, 90, 180, 270]:
        import math
        x = cx + math.cos(math.radians(ang)) * 62 * scale
        y = cy + math.sin(math.radians(ang)) * 62 * scale
        c.setFillColor(color); c.circle(x, y, 4*scale, stroke=0, fill=1)
    c.restoreState()


def rough_rect(c, x, y, w, h, title):
    """Deliberately basic retrospective wireframe."""
    c.setStrokeColor(INK); c.setLineWidth(1.3)
    for dx,dy in [(0,0),(1.2,-.8)]:
        c.rect(x+dx,y+dy,w,h,stroke=1,fill=0)
    c.line(x,y+h-18,x+w,y+h-18)
    c.setFillColor(INK)
    for i in range(3): c.circle(x+10+i*10,y+h-9,2.2,stroke=0,fill=1)
    c.setFont("Hand",12); c.drawString(x+8,y+h+8,title)
    # sidebar + large content blocks
    c.line(x+34,y,x+34,y+h-18)
    c.rect(x+45,y+h-52,w-58,19,stroke=1,fill=0)
    c.rect(x+45,y+18,(w-68)*.56,h-82,stroke=1,fill=0)
    c.rect(x+54+(w-68)*.56,y+18,(w-68)*.34,h-82,stroke=1,fill=0)


def small_source(c, s, x, y, maxw=840, dark=False):
    text(c, s, x, y, 6.7, HexColor("#B9C7C8") if dark else GREY, "InterI", 9, maxw)


def title_block(c, eyebrow, title, sub=None, dark=False):
    fg = PAPER if dark else INK
    label(c, eyebrow, 54, 486, MINT if dark else TEAL)
    text(c, title, 54, 442, 31, fg, "InterX", 37, 780)
    if sub:
        text(c, sub, 54, 386, 12, HexColor("#CAD6D7") if dark else GREY, "Inter", 17, 620)


def page1(c):
    c.setFillColor(INK); c.rect(0,0,W,H,stroke=0,fill=1)
    c.setFillColor(TEAL); c.circle(860, 460, 170, stroke=0, fill=1)
    c.setFillColor(CORAL); c.circle(92, 62, 55, stroke=0, fill=1)
    label(c, "Product design case study / 2026", 54, 490, MINT)
    text(c, "AhamX", 54, 416, 60, PAPER, "InterX")
    text(c, "One connected system for", 54, 367, 25, PAPER, "InterB")
    text(c, "learning, community and creation.", 54, 334, 25, MINT, "InterB")
    text(c, "A portfolio case study reconstructed from the supplied product frames.", 54, 293, 11, HexColor("#CCD7D8"), "Inter", maxw=390)
    pill(c, "LEARN", 54, 241, MINT); pill(c, "CONNECT", 124, 241, BLUE); pill(c, "CREATE", 215, 241, YELLOW); pill(c, "ORGANIZE", 294, 241, CORAL, PAPER)
    browser(c, TMP/"learner.png", 476, 207, 405, 265)
    phone(c, TMP/"mobile-learn.png", 770, 55, 130, 267)
    browser(c, TMP/"feed.png", 425, 48, 320, 190)
    c.setFillColor(PAPER); c.setFont("InterB", 9); c.drawString(54, 110, "CASE STUDY BY")
    c.setFont("Inter", 11); c.drawString(54, 91, "Yogesh Battula")
    footer(c,1,True)


def page2(c):
    c.setFillColor(CREAM); c.rect(0,0,W,H,stroke=0,fill=1)
    title_block(c,"01 / Executive summary","A wide product. One simple promise.","People should be able to learn, share, build and manage without losing their place.")
    blocks=[
        ("THE CHALLENGE","AhamX serves learners, educators and organizations across several dense workflows. The design challenge is to preserve context as people move between them.",CORAL),
        ("THE RESPONSE","A shared shell, visible progress, in-context AI assistance and clear staged creation flows turn a broad platform into a sequence of understandable next steps.",MINT),
        ("THE EVIDENCE","The supplied source contains desktop and mobile frames for community, learning, course creation, profiles, organizations, localization and edge states.",BLUE),
    ]
    for i,(a,b,col) in enumerate(blocks):
        x=54+i*292; card(c,x,170,266,170,PAPER)
        c.setFillColor(col); c.circle(x+28,310,8,stroke=0,fill=1)
        label(c,a,x+18,276,INK); text(c,b,x+18,245,11,INK,"Inter",16,225)
    c.setStrokeColor(HexColor("#B9C4C5")); c.line(54,130,906,130)
    label(c,"SCOPE VISIBLE IN THE FRAMES",54,108)
    text(c,"Experience architecture · Responsive UI · AI-assisted creation · Learning dashboards · Organization relationships",54,83,11,INK,"InterB",maxw=800)
    text(c,"Role, team, timeline and production outcomes are not stated in the source material and are therefore not claimed.",54,56,8.5,GREY,"InterI",maxw=780)
    footer(c,2)


def page3(c):
    c.setFillColor(PAPER); c.rect(0,0,W,H,stroke=0,fill=1)
    title_block(c,"02 / Product model","Four jobs share one identity.","The platform works as an ecosystem. Each area answers a distinct question while using the same account and organizational context.")
    items=[("01","LEARN","What should I do next?","Courses, cohorts, progress and recommendations",MINT),
           ("02","CONNECT","Who can help or inspire me?","Posts, topics, profiles and AI summaries",BLUE),
           ("03","CREATE","How do I turn expertise into learning?","Outline, content, narration, audio and video",YELLOW),
           ("04","ORGANIZE","Where do people and programs belong?","Hierarchy, roles, requests and relationships",CORAL)]
    for i,(n,t,q,d,col) in enumerate(items):
        x=54+i*216; card(c,x,128,196,208,col)
        text(c,n,x+16,306,24,INK,"InterX")
        label(c,t,x+16,276,INK)
        text(c,q,x+16,240,14,INK,"InterB",19,162)
        text(c,d,x+16,173,9,INK,"Inter",13,160)
    c.setStrokeColor(TEAL); c.setLineWidth(2); c.line(110,97,850,97)
    for x in [150,366,582,798]: c.setFillColor(TEAL); c.circle(x,97,6,stroke=0,fill=1)
    text(c,"Shared identity · global navigation · Ask AhamX · responsive behavior",272,68,10,TEAL,"InterB")
    footer(c,3)


def page4(c):
    c.setFillColor(INK); c.rect(0,0,W,H,stroke=0,fill=1)
    title_block(c,"03 / The problem","Breadth creates cognitive load.","The source frames reveal a platform with many valid destinations. The risk is making users remember where they are, what state their work is in and what action comes next.",True)
    points=[("CONTEXT SWITCHING","Learning, community and administration live in different modes. Without common anchors, every transition can feel like starting again."),
            ("STATE VISIBILITY","Course progress, publication readiness and connection requests all depend on status. Hidden state makes confident action harder."),
            ("ROLE COMPLEXITY","One person can be a learner, creator or entity member. The experience must clarify which identity is active at every moment.")]
    for i,(a,b) in enumerate(points):
        y=304-i*105
        c.setFillColor([MINT,BLUE,CORAL][i]); c.circle(72,y+8,12,stroke=0,fill=1)
        label(c,a,102,y+18,PAPER); text(c,b,102,y-5,11,HexColor("#D6E0E0"),"Inter",16,680)
    c.setFillColor(TEAL); c.roundRect(697,75,210,278,22,stroke=0,fill=1)
    text(c,"HOW MIGHT WE",720,314,8.5,MINT,"InterB")
    text(c,"Help people move across a complex learning ecosystem while keeping their next action, progress and active role visible?",720,276,20,PAPER,"InterB",27,160)
    footer(c,4,True)


def page5(c):
    c.setFillColor(CREAM); c.rect(0,0,W,H,stroke=0,fill=1)
    title_block(c,"04 / Reconstructed persona","Meet Ananya, the educator who wears three hats.","This persona is synthesized from roles and tasks visible in the supplied frames. It is not presented as an original interview participant.")
    c.setFillColor(TEAL); c.circle(145,245,90,stroke=0,fill=1)
    c.setFillColor(MINT); c.circle(145,270,31,stroke=0,fill=1)
    c.setFillColor(PAPER); c.roundRect(105,173,80,58,28,stroke=0,fill=1)
    text(c,"ANANYA",92,135,22,INK,"InterX")
    text(c,"Lecturer · course creator · cohort mentor",72,113,9,GREY,"Inter",maxw=180)
    pill(c,"SYNTHESIZED",94,73,YELLOW,INK,105)
    cols=[("GOALS",["Publish a course without losing control","See learner progress at a glance","Stay connected to her academic network"]),
          ("FRICTIONS",["Switching between teaching and admin work","Unclear readiness before publishing","Remembering which role or entity is active"]),
          ("NEEDS",["A visible next step","AI help inside the current task","Status that explains what is ready and why"]) ]
    for i,(head,vals) in enumerate(cols):
        x=280+i*218; card(c,x,120,200,225,PAPER)
        label(c,head,x+18,314)
        yy=274
        for j,v in enumerate(vals):
            c.setFillColor([MINT,BLUE,CORAL][j]); c.circle(x+25,yy+4,5,stroke=0,fill=1)
            yy=text(c,v,x+42,yy,10,INK,"Inter",14,138)-14
    c.setFillColor(INK); c.roundRect(280,68,636,34,17,stroke=0,fill=1)
    text(c,'“Show me what matters now, then let me go deeper when I need to.”',300,80,11,PAPER,"InterI")
    footer(c,5)


def page6(c):
    c.setFillColor(PAPER); c.rect(0,0,W,H,stroke=0,fill=1)
    title_block(c,"05 / Experience strategy","Make the next step the organizing principle.","The solution is less about reducing capability and more about sequencing it.")
    stages=[("ORIENT","See active role, progress and destination."),("ACT","Complete the most relevant task."),("REVIEW","Check status, quality or relationships."),("CONTINUE","Resume with context preserved.")]
    for i,(a,b) in enumerate(stages):
        x=54+i*218
        c.setFillColor([TEAL,HexColor("#3D7EA8"),HexColor("#D39D2D"),CORAL][i]); c.circle(x+29,277,29,stroke=0,fill=1)
        c.setFillColor(PAPER); c.setFont("InterX",13); c.drawCentredString(x+29,272,f"0{i+1}")
        if i<3:
            c.setStrokeColor(HexColor("#C9D2D3")); c.setLineWidth(2); c.line(x+61,277,x+205,277)
        label(c,a,x,228); text(c,b,x,199,11,INK,"Inter",16,176)
    card(c,54,75,852,77,CREAM)
    label(c,"DESIGN PRINCIPLES",74,127)
    text(c,"Visible state",74,97,13,INK,"InterB"); text(c,"Contextual help",270,97,13,INK,"InterB")
    text(c,"Progressive disclosure",480,97,13,INK,"InterB"); text(c,"Cross-role continuity",702,97,13,INK,"InterB")
    footer(c,6)


def page7(c):
    c.setFillColor(CREAM); c.rect(0,0,W,H,stroke=0,fill=1)
    label(c,"06 / EXPLORATION",42,505)
    text(c,"A sketch of the system before the pixels.",42,468,27,INK,"InterX")
    text(c,"Illustrative retrospective wireframes created for this case study; not original project artifacts.",42,443,9,GREY,"InterI")
    image_fit(c,ASSET_DIR/"wireframes.png",42,38,876,388)
    footer(c,7)


def page8(c):
    c.setFillColor(TEAL); c.rect(0,0,W,H,stroke=0,fill=1)
    label(c,"07 / SOLUTION — LEARN",54,490,MINT)
    text(c,"Progress that answers:",54,444,27,PAPER,"InterX")
    text(c,"“What should I do next?”",54,406,27,MINT,"InterX")
    text(c,"The learner dashboard combines completion, streaks, current cohorts and recommendations in one view. Progress bars and lesson counts make state visible; the page still leaves room to explore.",54,348,11,PAPER,"Inter",16,310)
    for i,(h,b) in enumerate([("VISIBLE PROGRESS","Percent and lesson count reinforce each other."),("PERSONAL SIGNAL","AKI score and profile completion create direction."),("CONTINUITY","Continue learning sits beside discovery.")]):
        y=263-i*72; label(c,h,54,y,MINT); text(c,b,54,y-22,9.5,PAPER,"Inter",13,270)
    browser(c,TMP/"learner.png",400,80,505,335)
    footer(c,8,True)


def page9(c):
    c.setFillColor(BLUE); c.rect(0,0,W,H,stroke=0,fill=1)
    label(c,"08 / SOLUTION — CONNECT",54,490,INK)
    text(c,"Community with context built in.",54,448,31,INK,"InterX")
    text(c,"Sarathi brings posts, filters, trending topics and creation into one place. Mobile profile and feed states preserve the same identity and navigation language.",54,403,11,INK,"Inter",16,470)
    browser(c,TMP/"feed.png",54,92,578,290)
    phone(c,TMP/"mobile.png",690,85,155,310)
    c.setFillColor(INK); c.roundRect(667,417,220,64,14,stroke=0,fill=1)
    text(c,"DESIGN MOVE",684,457,8,MINT,"InterB")
    text(c,"Keep search, topics and AI help close to the conversation.",684,437,10,PAPER,"InterB",14,180)
    footer(c,9)


def page10(c):
    c.setFillColor(YELLOW); c.rect(0,0,W,H,stroke=0,fill=1)
    label(c,"09 / SOLUTION — CREATE",54,490,INK)
    text(c,"Turn a blank page into a staged workflow.",54,448,30,INK,"InterX")
    text(c,"Creator Studio externalizes the process: outline → lesson content → narration → audio → video → publish. Readiness counts help authors understand what remains.",54,405,11,INK,"Inter",16,470)
    browser(c,TMP/"studio.png",54,86,520,300)
    browser(c,TMP/"editor.png",601,164,304,222)
    stages=[("01","OUTLINE"),("02","CONTENT"),("03","SCRIPT"),("04","MEDIA"),("05","PUBLISH")]
    for i,(n,s) in enumerate(stages):
        x=604+i*61; c.setFillColor(INK); c.circle(x,111,15,stroke=0,fill=1)
        c.setFillColor(PAPER); c.setFont("InterB",7); c.drawCentredString(x,108,n)
        c.setFillColor(INK); c.setFont("InterB",6.5); c.drawCentredString(x,83,s)
        if i<4: c.setStrokeColor(INK); c.line(x+16,111,x+45,111)
    footer(c,10)


def page11(c):
    c.setFillColor(CORAL); c.rect(0,0,W,H,stroke=0,fill=1)
    label(c,"10 / SOLUTION — ORGANIZE",54,490,PAPER)
    text(c,"Make invisible relationships visible.",54,448,31,INK,"InterX")
    text(c,"The hierarchy graph explains parent, current and collaborating entities. Connection-request states turn structural changes into explicit, reviewable actions.",54,402,11,INK,"Inter",16,405)
    browser(c,TMP/"hierarchy.png",54,84,590,300)
    c.setFillColor(INK); c.roundRect(677,84,228,300,18,stroke=0,fill=1)
    principles=[("LEGEND FIRST","Relationships need a readable key."),("YOU ARE HERE","The current entity receives stronger contrast."),("SAFE CHANGES","Requests expose approve, reject and pending states.")]
    for i,(a,b) in enumerate(principles):
        y=336-i*90; label(c,a,700,y,MINT); text(c,b,700,y-25,10,PAPER,"Inter",14,170)
    footer(c,11,True)


def page12(c):
    c.setFillColor(PAPER); c.rect(0,0,W,H,stroke=0,fill=1)
    title_block(c,"11 / Measurement plan","Define success before claiming it.","No outcome data was supplied. These are proposed validation metrics and targets for the next product cycle—not measured results.")
    metrics=[("TIME TO RESUME","Median time from dashboard load to continuing an active lesson","Baseline: measure","Target: < 15 sec","Event funnel + task test",MINT),
             ("PUBLISH CLARITY","Creators who can identify the next incomplete production step","Baseline: measure","Target: ≥ 90%","Moderated usability test",YELLOW),
             ("ROLE CONFIDENCE","Users who correctly identify their active profile or entity","Baseline: measure","Target: ≥ 95%","First-click + comprehension",BLUE),
             ("TASK SUCCESS","Organization connection requests completed without assistance","Baseline: measure","Target: ≥ 85%","Completion analytics",CORAL)]
    for i,(name,desc,base,target,method,col) in enumerate(metrics):
        y=310-i*70; c.setFillColor(col); c.roundRect(54,y,24,50,8,stroke=0,fill=1)
        c.setFillColor(INK); c.setFont("InterX",9); c.drawCentredString(66,y+20,f"0{i+1}")
        label(c,name,96,y+39); text(c,desc,96,y+17,9.5,INK,"Inter",12,360)
        pill(c,base,486,y+13,PALE,INK,105); pill(c,target,601,y+13,col,INK,105)
        text(c,method,730,y+21,8.5,GREY,"InterB",11,160)
    c.setFillColor(INK); c.roundRect(54,53,852,54,15,stroke=0,fill=1)
    text(c,"Guardrail",74,83,8,MINT,"InterB")
    text(c,"Track error rate and support requests alongside speed. Faster is only better when people remain confident and in control.",146,78,10,PAPER,"Inter",14,720)
    footer(c,12)


def page13(c):
    c.setFillColor(INK); c.rect(0,0,W,H,stroke=0,fill=1)
    label(c,"12 / REFLECTION",54,490,MINT)
    text(c,"A platform can be broad",54,435,37,PAPER,"InterX")
    text(c,"without feeling scattered.",54,390,37,MINT,"InterX")
    text(c,"The strongest pattern across the AhamX frames is continuity: shared navigation, visible state and contextual help turn a multi-role ecosystem into a set of manageable next steps.",54,330,12,HexColor("#D2DEDF"),"Inter",18,500)
    learnings=[("WHAT WORKS","A consistent shell, explicit workflow stages and strong state cues."),("WHAT NEEDS VALIDATION","Navigation comprehension, profile switching and creator readiness."),("WHAT I WOULD DO NEXT","Test three critical journeys with learners, creators and entity administrators; establish baselines; iterate against the proposed targets.")]
    for i,(a,b) in enumerate(learnings):
        x=54+i*286; card(c,x,105,260,145,HexColor("#17313B"))
        label(c,a,x+18,220,MINT); text(c,b,x+18,190,10,PAPER,"Inter",15,218)
    text(c,"Method note",54,70,8,MINT,"InterB")
    text(c,"Structure inspired by established portfolio guidance: clearly frame the problem, show the process and visuals, then separate evidence from proposed validation.",122,70,8,HexColor("#B7C8C9"),"Inter",11,690)
    footer(c,13,True)


# Revised long-form case study requested after the first draft.
def v2_page1(c):
    c.setFillColor(INK); c.rect(0,0,W,H,stroke=0,fill=1)
    c.setFillColor(TEAL); c.circle(850,455,175,stroke=0,fill=1)
    orbit_graphic(c, 835, 438, MINT, .9)
    label(c,"AhamX / Product design case study",54,492,MINT)
    text(c,"Building AhamX:",54,428,39,PAPER,"InterX")
    text(c,"AI learning at scale",54,383,30,MINT,"InterX")
    text(c,"in just 3 months.",54,338,39,PAPER,"InterX")
    text(c,"Selected for the India AI Impact Summit 2026 showcase at the Google pavilion, New Delhi.",54,292,11,PAPER,"InterB",16,350)
    pill(c,"SHIPPED IN 12 WEEKS",54,236,YELLOW,INK,132)
    pill(c,"AI FOR LEARNING & SKILLING",196,236,MINT,INK,172)
    browser(c,SCREEN_DIR/"learner.png",452,206,425,273)
    browser(c,SCREEN_DIR/"feed.png",405,45,336,194)
    phone(c,SCREEN_DIR/"mobile-learn.png",768,55,128,270)
    text(c,"Case study by Yogesh Battula",54,110,11,PAPER,"InterB")
    text(c,"Product experience · Desktop + mobile · AI-assisted creation",54,89,8.5,HexColor("#BBC9CA"),"Inter")
    footer(c,1,True)


def v2_page2(c):
    c.setFillColor(HexColor("#342D6A")); c.rect(0,0,W,H,stroke=0,fill=1)
    orbit_graphic(c, 820, 405, HexColor("#857ED6"), 1.15)
    label(c,"01 / A NATIONAL STAGE",54,490,MINT)
    text(c,"Selected to show what AI",54,438,35,PAPER,"InterX")
    text(c,"could do for learning.",54,397,35,MINT,"InterX")
    text(c,"AhamX was showcased in the Google pavilion’s AI for Learning & Skilling environment at the India AI Impact Summit 2026, held at Bharat Mandapam in New Delhi.",54,343,12,PAPER,"Inter",18,510)
    facts=[("16–20 FEB","Summit week"),("GOOGLE PAVILION","Learning & skilling showcase"),("3 MONTHS","Product shipped"),("GLOBAL STAGE","Government, industry and research")]
    for i,(a,b) in enumerate(facts):
        x=54+i*215; card(c,x,156,194,100,HexColor("#433B7D"))
        text(c,a,x+15,222,17,MINT,"InterX"); text(c,b,x+15,192,9,PAPER,"Inter",13,160)
    c.setFillColor(PAPER); c.roundRect(54,79,852,54,14,stroke=0,fill=1)
    label(c,"PROJECT-TEAM ACCOUNT",72,112,HexColor("#342D6A"))
    text(c,"The client engaged with visiting officials and reports a brief exchange during Prime Minister Narendra Modi’s pavilion visit.",210,107,9.5,INK,"InterB",13,675)
    small_source(c,"Public evidence confirms the Summit and PM participation; public event posts place AhamX in the Google pavilion. The specific client exchange is team-provided context.",54,53,850,True)
    footer(c,2,True)


def v2_page3(c):
    c.setFillColor(CREAM); c.rect(0,0,W,H,stroke=0,fill=1)
    title_block(c,"02 / Executive summary","A wide product. One connected experience.","AhamX brings learning, professional identity, community, creation and organization intelligence into one system.")
    data=[("THE PROBLEM","Breadth created navigation, role and state complexity.",CORAL),
          ("THE RESPONSE","Shared patterns made the next step visible across every role.",MINT),
          ("THE DELIVERY","Core desktop and mobile journeys shipped in 12 weeks.",YELLOW),
          ("THE MOMENT","The work reached a national AI showcase in New Delhi.",BLUE)]
    for i,(a,b,col) in enumerate(data):
        x=54+i*213; card(c,x,170,195,166,PAPER)
        c.setFillColor(col); c.circle(x+24,307,7,stroke=0,fill=1)
        label(c,a,x+18,278,INK); text(c,b,x+18,244,12,INK,"InterB",17,155)
    c.setStrokeColor(HexColor("#C7CFD0"));c.line(54,132,906,132)
    label(c,"PRODUCT SURFACE",54,108)
    text(c,"17+ source screens · Learner and creator journeys · Responsive states · AI assistance · Entity relationships · Localization",54,80,10,INK,"InterB",maxw=820)
    footer(c,3)


def v2_page4(c):
    c.setFillColor(INK); c.rect(0,0,W,H,stroke=0,fill=1)
    label(c,"03 / THE PROBLEM",54,490,MINT)
    text(c,"A powerful platform can still",54,443,34,PAPER,"InterX")
    text(c,"feel fragmented.",54,402,34,MINT,"InterX")
    text(c,"AhamX had to support people who learn, teach, publish, collaborate and represent organizations—sometimes from the same account.",54,356,11,HexColor("#D1DDDE"),"Inter",17,520)
    problems=[("01","ROLE AMBIGUITY","Which identity or entity is active?"),("02","HIDDEN STATE","What is complete, pending or ready?"),("03","CONTEXT LOSS","Where do I continue after switching modes?"),("04","CREATOR LOAD","How do I go from an idea to publishable learning?")]
    for i,(n,a,b) in enumerate(problems):
        x=54+(i%2)*430;y=237-(i//2)*110
        c.setFillColor([CORAL,BLUE,YELLOW,MINT][i]);c.circle(x+18,y+21,17,stroke=0,fill=1)
        c.setFillColor(INK);c.setFont("InterX",8);c.drawCentredString(x+18,y+18,n)
        label(c,a,x+50,y+30,PAPER);text(c,b,x+50,y+5,10,HexColor("#D6E0E0"),"Inter",14,330)
    footer(c,4,True)


def v2_page5(c):
    c.setFillColor(CREAM); c.rect(0,0,W,H,stroke=0,fill=1)
    title_block(c,"04 / Reconstructed persona","Ananya teaches, creates and mentors.","Synthesized from roles and tasks in the supplied frames; not presented as an original interview participant.")
    c.setFillColor(TEAL);c.circle(140,247,82,stroke=0,fill=1)
    c.setFillColor(MINT);c.circle(140,270,29,stroke=0,fill=1)
    c.setFillColor(PAPER);c.roundRect(105,181,70,54,27,stroke=0,fill=1)
    text(c,"ANANYA",91,141,21,INK,"InterX");text(c,"Lecturer · creator · mentor",79,120,9,GREY,"InterB")
    pill(c,"SYNTHESIZED",92,82,YELLOW,INK,98)
    cards=[("GOALS",["Publish with confidence","See learner progress","Stay connected to peers"]),
           ("FRICTIONS",["Many modes and roles","Unclear readiness","Interrupted workflows"]),
           ("NEEDS",["Visible next action","Help in context","State she can trust"]) ]
    for i,(a,vals) in enumerate(cards):
        x=270+i*218;card(c,x,115,200,225,PAPER);label(c,a,x+18,308)
        for j,v in enumerate(vals):
            yy=267-j*59;c.setFillColor([MINT,BLUE,CORAL][j]);c.circle(x+25,yy+4,5,stroke=0,fill=1)
            text(c,v,x+41,yy,10,INK,"InterB",14,138)
    c.setFillColor(INK);c.roundRect(270,67,636,34,17,stroke=0,fill=1)
    text(c,'“Show me what matters now, then let me go deeper.”',295,79,11,PAPER,"InterI")
    footer(c,5)


def v2_page6(c):
    c.setFillColor(PAPER);c.rect(0,0,W,H,stroke=0,fill=1)
    title_block(c,"05 / HOW WE DID IT","Twelve weeks from system framing to ship.","The schedule is reconstructed from the project team’s three-month delivery account and the breadth of the final supplied frames.")
    phases=[("W01–02","FRAME","Prioritize roles, product areas and the summit-ready story.",MINT),
            ("W03–05","STRUCTURE","Unify navigation, profiles, entity context and core flows.",BLUE),
            ("W06–08","DESIGN","Build learner, community, creator and organization journeys.",YELLOW),
            ("W09–10","EXTEND","Add responsive states, localization, AI help and edge cases.",CORAL),
            ("W11–12","HARDEN","Review consistency, readiness, handoff and showcase paths.",HexColor("#BDA7E8"))]
    c.setStrokeColor(TEAL);c.setLineWidth(3);c.line(90,274,868,274)
    for i,(wk,name,desc,col) in enumerate(phases):
        x=90+i*194;c.setFillColor(col);c.circle(x,274,14,stroke=0,fill=1)
        text(c,wk,x-28,316,10,INK,"InterX");label(c,name,x-28,239);text(c,desc,x-28,211,9,INK,"Inter",13,160)
    card(c,54,72,852,76,CREAM)
    label(c,"OPERATING PRINCIPLE",74,121)
    text(c,"Ship the connected spine first: identity → next action → visible state → contextual AI → continuity across roles.",74,92,12,INK,"InterB",16,790)
    footer(c,6)


def v2_page7(c):
    c.setFillColor(PAPER);c.rect(0,0,W,H,stroke=0,fill=1)
    title_block(c,"06 / Product model","Four jobs. One intelligence layer.","Each product area answers a different question while sharing identity, organization context and Ask AhamX.")
    items=[("LEARN","What should I do next?",MINT),("CONNECT","Who can help me?",BLUE),("CREATE","How do I publish expertise?",YELLOW),("ORGANIZE","Where does this work belong?",CORAL)]
    for i,(a,b,col) in enumerate(items):
        x=54+i*213;card(c,x,157,195,176,col);text(c,f"0{i+1}",x+16,301,20,INK,"InterX");label(c,a,x+16,269,INK);text(c,b,x+16,229,13,INK,"InterB",18,155)
    c.setStrokeColor(TEAL);c.setLineWidth(2);c.line(130,114,830,114)
    for x in [150,365,580,795]:c.setFillColor(TEAL);c.circle(x,114,6,stroke=0,fill=1)
    text(c,"Shared identity · roles · entity graph · AI assistance · progress · responsive shell",251,83,10,TEAL,"InterB")
    footer(c,7)


def v2_page8(c):
    c.setFillColor(CREAM);c.rect(0,0,W,H,stroke=0,fill=1)
    label(c,"07 / BASIC WIREFRAMES",54,492,TEAL)
    text(c,"Simple boxes before detailed screens.",54,452,29,INK,"InterX")
    text(c,"Retrospective sketches for this case study—basic frames and names, not claimed as original project artifacts.",54,425,9,GREY,"InterI")
    specs=[("Learn",54,266),("Feed",352,266),("Create post",650,266),("Course builder",54,72),("Org graph",352,72),("Mobile",650,72)]
    for name,x,y in specs:
        rough_rect(c,x,y,256,135,name)
    footer(c,8)


def v2_page9(c):
    c.setFillColor(TEAL);c.rect(0,0,W,H,stroke=0,fill=1)
    label(c,"08 / MOCKUPS — ORIENT",54,490,MINT)
    text(c,"Dashboards make progress visible.",54,450,31,PAPER,"InterX")
    text(c,"Two roles, one visual language: summary first, detail on demand.",54,417,11,PAPER,"Inter")
    browser(c,SCREEN_DIR/"learner.png",54,89,520,305)
    browser(c,SCREEN_DIR/"dashboard.png",603,174,303,220)
    c.setFillColor(INK);c.roundRect(603,89,303,64,14,stroke=0,fill=1)
    text(c,"01 · Learner progress",621,128,9,MINT,"InterB");text(c,"02 · Organization overview",621,105,9,PAPER,"InterB")
    footer(c,9,True)


def v2_page10(c):
    c.setFillColor(BLUE);c.rect(0,0,W,H,stroke=0,fill=1)
    label(c,"09 / MOCKUPS — CONNECT",54,490,INK)
    text(c,"Community that keeps help close.",54,450,31,INK,"InterX")
    browser(c,SCREEN_DIR/"feed.png",54,98,550,300)
    browser(c,SCREEN_DIR/"post-compose.png",636,183,270,215)
    c.setFillColor(INK);c.roundRect(636,98,270,64,14,stroke=0,fill=1)
    text(c,"03 · Sarathi feed",655,136,9,MINT,"InterB");text(c,"04 · Focused post composer",655,113,9,PAPER,"InterB")
    footer(c,10)


def v2_page11(c):
    c.setFillColor(YELLOW);c.rect(0,0,W,H,stroke=0,fill=1)
    label(c,"10 / MOCKUPS — CREATE",54,490,INK)
    text(c,"A staged path from idea to publish.",54,450,31,INK,"InterX")
    browser(c,SCREEN_DIR/"creator-outline.png",54,214,385,220)
    browser(c,SCREEN_DIR/"creator-editor.png",468,214,385,220)
    browser(c,TMP/"editor.png",54,60,300,135)
    browser(c,SCREEN_DIR/"creator-publish.png",382,60,300,135)
    browser(c,SCREEN_DIR/"library.png",710,60,196,135)
    labels=[("05 · Outline",54),("06 · Lesson editor",468),("07 · Content stages",54),("08 · Publish decision",382),("09 · Library",710)]
    for s,x in labels:text(c,s,x,43,7.5,INK,"InterB")
    footer(c,11)


def v2_page12(c):
    c.setFillColor(CORAL);c.rect(0,0,W,H,stroke=0,fill=1)
    label(c,"11 / MOCKUPS — ORGANIZE",54,490,PAPER)
    text(c,"Relationships become reviewable actions.",54,450,31,INK,"InterX")
    browser(c,SCREEN_DIR/"hierarchy.png",54,105,480,295)
    browser(c,TMP/"network.png",563,185,343,215)
    browser(c,SCREEN_DIR/"profile-switch.png",563,70,343,96)
    text(c,"10 · Hierarchy",54,83,8,INK,"InterB");text(c,"11 · Network requests",563,168,8,INK,"InterB");text(c,"12 · Profile switching",563,51,8,INK,"InterB")
    footer(c,12)


def v2_page13(c):
    c.setFillColor(HexColor("#D9E6DE"));c.rect(0,0,W,H,stroke=0,fill=1)
    label(c,"12 / MOCKUPS — REACH",54,490,TEAL)
    text(c,"Responsive, multilingual and reusable.",54,450,31,INK,"InterX")
    phone(c,SCREEN_DIR/"mobile-learn.png",72,90,148,315)
    phone(c,TMP/"mobile.png",262,90,148,315)
    browser(c,SCREEN_DIR/"language.png",464,232,442,173)
    browser(c,SCREEN_DIR/"library.png",464,90,442,122)
    text(c,"13 · Mobile learning",72,68,8,INK,"InterB");text(c,"14 · Mobile entity profile",262,68,8,INK,"InterB")
    text(c,"15 · Language selection",464,215,8,INK,"InterB");text(c,"16 · Reusable content library",464,69,8,INK,"InterB")
    footer(c,13)


def v2_page14(c):
    c.setFillColor(INK);c.rect(0,0,W,H,stroke=0,fill=1)
    label(c,"13 / AI EXPERIENCE",54,490,MINT)
    text(c,"AI appears inside the work,",54,444,34,PAPER,"InterX")
    text(c,"not beside it.",54,403,34,MINT,"InterX")
    text(c,"The frames position Ask AhamX as a persistent assistant, then bring generation and summarization into the task that needs them.",54,351,11,HexColor("#D2DEDF"),"Inter",17,440)
    moves=[("SUMMARIZE","Compress long posts without leaving the feed."),("GENERATE","Turn a teaching topic into a course structure."),("TRANSFORM","Move structured content through script, audio and video."),("GUIDE","Answer questions in the active course or cohort context.")]
    for i,(a,b) in enumerate(moves):
        x=54+(i%2)*440;y=247-(i//2)*105
        c.setFillColor([MINT,BLUE,YELLOW,CORAL][i]);c.roundRect(x,y,36,54,10,stroke=0,fill=1)
        text(c,f"0{i+1}",x+10,y+20,9,INK,"InterX")
        label(c,a,x+55,y+37,PAPER);text(c,b,x+55,y+10,10,HexColor("#D6E0E0"),"Inter",14,330)
    footer(c,14,True)


def v2_page15(c):
    c.setFillColor(PAPER);c.rect(0,0,W,H,stroke=0,fill=1)
    title_block(c,"14 / Measurement plan","Define success before claiming it.","Outcome data was not supplied. These are proposed validation metrics for the next cycle—not measured results.")
    metrics=[("TIME TO RESUME","Dashboard → active lesson","Target < 15 sec",MINT),("PUBLISH CLARITY","Identify next incomplete step","Target ≥ 90%",YELLOW),("ROLE CONFIDENCE","Name active profile/entity","Target ≥ 95%",BLUE),("TASK SUCCESS","Complete connection request","Target ≥ 85%",CORAL)]
    for i,(a,b,t,col) in enumerate(metrics):
        y=302-i*68;c.setFillColor(col);c.roundRect(54,y,32,48,9,stroke=0,fill=1);text(c,f"0{i+1}",63,y+18,8,INK,"InterX")
        label(c,a,105,y+34);text(c,b,105,y+12,10,INK,"InterB");pill(c,"Baseline: measure",460,y+12,PALE,INK,112);pill(c,t,586,y+12,col,INK,112)
        text(c,["Event funnel + task test","Moderated usability test","First-click comprehension","Completion analytics"][i],730,y+20,8,GREY,"InterB")
    c.setFillColor(INK);c.roundRect(54,52,852,50,14,stroke=0,fill=1);text(c,"Guardrail",72,78,8,MINT,"InterB");text(c,"Track error rate, abandonment and support requests alongside speed.",144,73,10,PAPER,"InterB")
    footer(c,15)


def v2_page16(c):
    c.setFillColor(HexColor("#EEE5FA"));c.rect(0,0,W,H,stroke=0,fill=1)
    title_block(c,"15 / LONG ROADMAP","The summit was a milestone, not the finish line.","A long product horizon moves from reliable core journeys toward a portable, AI-assisted learning and capability graph.")
    lanes=[("NOW · 0–3M","Instrument core journeys","Accessibility and quality baseline","Creator readiness signals",MINT),
           ("NEXT · 3–9M","Adaptive learning paths","Multilingual MentorX","Creator co-pilot controls",BLUE),
           ("LATER · 9–18M","Verified skills graph","Organization intelligence","Opportunity matching",YELLOW),
           ("HORIZON · 18M+","Interoperable credentials","Public-sector scale","Ecosystem APIs",CORAL)]
    for i,(head,a,b,d,col) in enumerate(lanes):
        x=54+i*213;card(c,x,132,195,222,col);label(c,head,x+16,324,INK)
        for j,s in enumerate([a,b,d]):
            c.setFillColor(INK);c.circle(x+22,280-j*50,4,stroke=0,fill=1);text(c,s,x+36,276-j*50,9.5,INK,"InterB",13,140)
    c.setStrokeColor(TEAL);c.setLineWidth(2);c.line(73,99,886,99)
    text(c,"Reliable core",54,75,8,TEAL,"InterB");text(c,"Connected intelligence",421,75,8,TEAL,"InterB");text(c,"Portable digital twin",779,75,8,TEAL,"InterB")
    footer(c,16)


def v2_page17(c):
    c.setFillColor(INK);c.rect(0,0,W,H,stroke=0,fill=1)
    orbit_graphic(c,820,400,TEAL,1.1)
    label(c,"16 / REFLECTION",54,490,MINT)
    text(c,"A prestigious stage.",54,430,42,PAPER,"InterX")
    text(c,"A three-month ship.",54,381,42,MINT,"InterX")
    text(c,"A much longer roadmap.",54,332,42,PAPER,"InterX")
    text(c,"AhamX’s strongest idea is continuity: identity, progress and AI assistance travel with the user across learning, creation, community and organizations.",54,271,12,HexColor("#D2DEDF"),"Inter",18,520)
    cards=[("SHIPPED","A connected desktop and mobile product surface."),("SHOWCASED","AhamX at the Google pavilion during India AI Impact Summit 2026."),("NEXT","Validate the journeys, instrument outcomes and grow the intelligence layer responsibly.")]
    for i,(a,b) in enumerate(cards):
        x=54+i*285;card(c,x,105,260,112,HexColor("#17313B"));label(c,a,x+17,185,MINT);text(c,b,x+17,155,9.5,PAPER,"Inter",14,220)
    small_source(c,"Public sources used for summit context: Prime Minister of India; ZenteiQ and public Google pavilion event posts. Product timeline and specific client interactions are project-team supplied.",54,67,830,True)
    footer(c,17,True)


def build():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUT), pagesize=(W,H), pageCompression=1)
    c.setTitle("AhamX Product Design Case Study")
    c.setAuthor("Yogesh Battula")
    for fn in [
        v2_page1, v2_page2, v2_page3, v2_page4, v2_page5, v2_page6,
        v2_page7, v2_page8, v2_page9, v2_page10, v2_page11, v2_page12,
        v2_page13, v2_page14, v2_page15, v2_page16, v2_page17,
    ]:
        fn(c); c.showPage()
    c.save()
    print(OUT)


if __name__ == "__main__":
    build()
