const imgs = {
  mentoring:`assets/mentoring.jpg`,
  fundamentals:`assets/fundamentals.jpg`,
  body1:`assets/body1.jpg`,
  body2:`assets/body2.jpg`,
  combined:`assets/combined.jpg`
};
const state = JSON.parse(localStorage.getItem('eyd_v3_state')||'null') || {
  xp:740, streak:5, week:3,
  access:{mentoring:true,fundamentals:true,body1:true,body2:false,combined:false},
  progress:{mentoring:68,fundamentals:72,body1:35,body2:0,combined:0},
  completed:{brand:true,value:true,visibility:false,community:false,professional:false},
  notes:{},
  saved:['brand']
};
function save(){localStorage.setItem('eyd_v3_state',JSON.stringify(state));}
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.style.opacity=1;clearTimeout(window._tt);window._tt=setTimeout(()=>t.style.opacity=0,1800);}

const courseData = [
 ['mentoring','Mentoring Program','Teaching, communication, community and professional development.','Block 6 · Marketing'],
 ['fundamentals','Fundamentals','Technical foundations for better posture, connection and movement.','12 lessons'],
 ['body1','Body Movement I','Body awareness, isolation, coordination and control.','11 lessons'],
 ['body2','Body Movement II','Advanced layering, elasticity and movement quality.','Locked'],
 ['combined','Body Movement Combined','Integrate the complete body movement system.','Locked']
];

function courseTile(c){
  const [k,t,d,meta]=c, on=state.access[k], p=state.progress[k]||0;
  const tag=on?'a':'div';
  return `<${tag} class="courseTile" ${on?`href="${k==='mentoring'?'#mentoring':'#course'}"`:''}>
    <div class="img"><img src="${imgs[k]}">${!on?'<div class="lockOverlay">🔒 Not unlocked yet</div>':''}</div>
    <div class="body">
      <div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start">
        <h3>${t}</h3>
        <span class="pill ${on?'green':'amber'}">${on?'In your account':'Not unlocked'}</span>
      </div>
      <p>${d}</p>
      ${on?`<div class="meta"><span>${meta}</span><b>${p}% complete</b></div><div class="progress"><i style="width:${p}%"></i></div><div class="progressExplain">${p===0?'Ready to start.':`You have completed ${p}% of this program. Your progress is saved automatically.`}</div>`:`<div class="meta"><span>Not in your account yet</span><span>🔒</span></div><div class="progressExplain">This program becomes available after purchase or when the EYD team assigns it to your account.</div>`}
    </div>
  </${tag}>`;
}

function pageGuide(title){
  if(title.includes('Welcome back')) return 'Start here: “Recommended next” always takes you to the exact lesson you should continue.';
  if(title.includes('My programs')) return 'Each program card shows whether it is in your account and exactly what its percentage means.';
  if(title.includes('learning journey')) return 'This is your long-term roadmap. Green steps are active/completed; grey steps are future milestones.';
  if(title.includes('Mentoring')) return 'Course progress is based on completed chapters. Open a chapter on the left, then work through Overview → Practice → My notes.';
  if(title.includes('Fundamentals')) return 'This percentage is based on completed lessons. Your current lesson is highlighted in the course list.';
  if(title.includes('Saved')) return 'Saving a lesson creates a shortcut only. It does not change your course progress.';
  if(title.includes('Account')) return 'Your purchases control course access. Passwords are never visible to the EYD team—forgotten passwords are reset securely by email.';
  if(title.includes('Admin')) return 'Access controls whether a student can open a course. Progress separately records how much they have completed.';
  return '';
}
function shellPage(title,subtitle,actions,body){
 const guide=pageGuide(title);
 return `<div class="pageWrap"><div class="pageTitle"><div><div class="kicker">EYD Academy</div><h1>${title}</h1><p>${subtitle}</p></div>${actions||''}</div>${guide?`<div class="pageGuide"><span class="guideIcon">i</span><div><b>How this page works</b><p>${guide}</p></div></div>`:''}${body}</div>`;
}
