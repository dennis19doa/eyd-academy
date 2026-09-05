const courses = [
  { id:'mentoring', eyebrow:'Teacher development', title:'Mentoring for Teachers', short:'Mentoring', img:'assets/mentoring.jpg', desc:'Build stronger classes, clearer feedback and a more sustainable teaching practice.', lessons:['Teaching framework','Class structure','Feedback & coaching','Professionalization'], accent:'01' },
  { id:'fundamentals', eyebrow:'Technique', title:'Bachata Fundamentals', short:'Fundamentals', img:'assets/fundamentals.jpg', desc:'Timing, posture, connection and the mechanics behind clean, confident basics.', lessons:['Posture & alignment','Timing & weight transfer','Connection principles','Quality of basics'], accent:'02' },
  { id:'body1', eyebrow:'Body control', title:'Body Movement I', short:'Body I', img:'assets/body1.jpg', desc:'Posture, isolations, waves and hip rolls with deliberate control and clear mechanics.', lessons:['Body posture','Rib cage isolations','Waves','Hip rolls'], accent:'03' },
  { id:'body2', eyebrow:'Body control', title:'Body Movement II', short:'Body II', img:'assets/body2.jpg', desc:'Cambrés, head rolls, chest rolls and advanced isolation pathways.', lessons:['Cambré mechanics','Head rolls','Chest rolls','Isolation combinations'], accent:'04' },
  { id:'combined', eyebrow:'Integration', title:'Body Movement Combined', short:'Combined', img:'assets/combined.jpg', desc:'Connect the vocabulary from Body Movement I & II into transitions and combinations.', lessons:['Transition principles','Upper ↔ lower body','Dynamic pathways','Full combinations'], accent:'05' }
];

const plans = [
  { name:'Course access', tag:'OWN WHAT YOU BUY', price:'One-time', text:'Perfect for intensives and standalone programs. The course stays attached to your account.', bullets:['Permanent course entitlement','Progress & notes saved','Future updates can stay attached'] },
  { name:'Academy membership', tag:'GROW CONTINUOUSLY', price:'Monthly', text:'For dancers who want an evolving library instead of buying each program separately.', bullets:['Included-course library','New releases can be added','Cancel / resume without losing history'], featured:true },
  { name:'Mentoring cohort', tag:'GUIDED ACCESS', price:'By program', text:'Time-bound or invite-only access for teacher mentoring, cohorts and certification-style programs.', bullets:['Private modules','Cohort resources','Admin-controlled access window'] }
];

const seedUsers = [
  { id:1, name:'Academy Admin', email:'admin@eyd-preview.local', role:'admin', plan:'Admin', access:['mentoring','fundamentals','body1','body2','combined'] },
  { id:2, name:'Demo Student', email:'student@eyd-preview.local', role:'student', plan:'Academy Membership', access:['fundamentals','body1'] },
  { id:3, name:'New Student', email:'newstudent@example.com', role:'student', plan:'Course Access', access:['fundamentals'] }
];

let state = {
  route:'home',
  session:null,
  users:JSON.parse(localStorage.getItem('eyd_preview_users') || 'null') || seedUsers
};

function save(){ localStorage.setItem('eyd_preview_users', JSON.stringify(state.users)); }
function esc(value){ return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function initials(name){ return name.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase(); }
function currentUser(){ return state.session ? state.users.find(u=>u.id===state.session.id) : null; }

function nav(){
  const user = currentUser();
  return `
    <header class="siteNav">
      <div class="navShell">
        <button class="brand" onclick="go('home')" aria-label="EYD Academy home">
          <span class="brandMark"><img src="assets/eyd-logo.png" alt=""></span>
          <span class="brandWords"><b>EYD</b><small>ACADEMY</small></span>
        </button>
        <nav class="navLinks" aria-label="Main navigation">
          <button onclick="go('home');setTimeout(()=>document.getElementById('programs')?.scrollIntoView({behavior:'smooth'}),0)">Programs</button>
          <button onclick="go('home');setTimeout(()=>document.getElementById('access')?.scrollIntoView({behavior:'smooth'}),0)">Access</button>
          <button onclick="go('home');setTimeout(()=>document.getElementById('method')?.scrollIntoView({behavior:'smooth'}),0)">How it works</button>
        </nav>
        <div class="navActions">
          ${user
            ? `<button class="textButton" onclick="go('${user.role==='admin'?'admin':'dashboard'}')">${user.role==='admin'?'Admin':'My academy'}</button><button class="profileButton" onclick="go('${user.role==='admin'?'admin':'dashboard'}')">${initials(user.name)}</button>`
            : `<button class="textButton" onclick="go('login')">Log in</button><button class="button light compact" onclick="go('register')">Create account</button>`}
        </div>
      </div>
    </header>`;
}

function footer(){
  return `<footer class="footer"><div class="footerShell"><div class="footerBrand"><span>EYD</span><p>Structured bachata education by Elena & Dennis.</p></div><div><b>Academy</b><button onclick="go('home')">Programs</button><button onclick="go('login')">Student login</button></div><div><b>Contact</b><a href="mailto:elenadennisbachata@yahoo.com">elenadennisbachata@yahoo.com</a><span>Berlin · Online</span></div><div><b>Legal</b><span>Privacy</span><span>Imprint</span></div></div><div class="footerBottom">© 2026 Elena & Dennis Academy <span>Preview redesign · authentication is not live yet</span></div></footer>`;
}

function home(){
  const user = currentUser();
  return `${nav()}
    <main>
      <section class="hero">
        <div class="heroGlow"></div>
        <div class="heroGrid shell">
          <div class="heroCopy">
            <p class="micro">ELENA & DENNIS · DIGITAL ACADEMY</p>
            <h1>Dance education<br>that <em>stays with you.</em></h1>
            <p class="heroLead">A focused learning space for dancers and teachers who want more than workshop notes: technique, structure, progress and a clear next step.</p>
            <div class="heroActions">
              <button class="button light" onclick="go('${user ? (user.role==='admin'?'admin':'dashboard') : 'register'}')">${user?'Open my academy':'Start your academy'} <span>↗</span></button>
              <button class="button outline" onclick="document.getElementById('programs').scrollIntoView({behavior:'smooth'})">Explore programs</button>
            </div>
            <div class="heroProof">
              <div><strong>01</strong><span>One account</span></div>
              <div><strong>02</strong><span>Your purchased access</span></div>
              <div><strong>03</strong><span>Your progress remembered</span></div>
            </div>
          </div>
          <div class="heroStage">
            <div class="stageFrame">
              <img src="assets/couple.jpg" alt="EYD Academy dance training">
              <div class="stageShade"></div>
              <div class="stageLabel"><span>EYD METHOD</span><b>Technique · Clarity · Growth</b></div>
            </div>
            <div class="floatCard progressCard"><span>Current path</span><b>Body Movement I</b><div class="progressTrack"><i style="width:68%"></i></div><small>68% complete</small></div>
            <div class="floatCard lessonCard"><span>Continue</span><b>Rib cage isolations</b><small>12 min · Lesson 02</small></div>
          </div>
        </div>
      </section>

      <section class="manifesto"><div class="shell manifestoGrid"><p>NOT ANOTHER FOLDER OF VIDEOS.</p><h2>Learn the idea. Understand the body. <em>Return with a purpose.</em></h2><div><p>Every program has a beginning, a sequence and a visible next step. The platform remembers where you stopped so the education keeps moving with you.</p><button class="arrowLink" onclick="go('register')">See how access works <span>→</span></button></div></div></section>

      <section id="programs" class="section shell">
        <div class="sectionHead"><div><p class="micro">THE LIBRARY</p><h2>Different goals.<br><em>One learning system.</em></h2></div><p>Courses can be owned individually, included in a membership, or assigned as part of a mentoring cohort.</p></div>
        <div class="programGrid">${courses.map((c,i)=>courseCard(c,false,i)).join('')}</div>
      </section>

      <section class="darkBand" id="method"><div class="shell">
        <div class="bandIntro"><p class="micro">THE EYD FLOW</p><h2>From class to practice<br>without losing the thread.</h2></div>
        <div class="steps">
          <article><span>01</span><h3>Join</h3><p>Create one EYD account. It becomes the home for every course you buy or are assigned.</p></article>
          <article><span>02</span><h3>Unlock</h3><p>A purchase, membership or admin approval creates access to the correct program.</p></article>
          <article><span>03</span><h3>Train</h3><p>Watch lessons in sequence, save notes, mark practice and continue from where you stopped.</p></article>
          <article><span>04</span><h3>Grow</h3><p>New courses, cohorts and resources appear inside the same account over time.</p></article>
        </div>
      </div></section>

      <section id="access" class="section shell">
        <div class="sectionHead accessHead"><div><p class="micro">ACCESS MODEL</p><h2>One academy.<br><em>Three ways in.</em></h2></div><p>The member system is designed around entitlements, so EYD can sell one-time courses now and add memberships or cohorts later without rebuilding student accounts.</p></div>
        <div class="planGrid">${plans.map(plan=>`<article class="plan ${plan.featured?'featured':''}">${plan.featured?'<div class="planFlag">BEST FOR REGULAR TRAINING</div>':''}<p class="micro">${plan.tag}</p><h3>${plan.name}</h3><strong>${plan.price}</strong><p>${plan.text}</p><ul>${plan.bullets.map(x=>`<li><span>✓</span>${x}</li>`).join('')}</ul><button class="button ${plan.featured?'light':'outline'}" onclick="go('register')">Create academy account</button></article>`).join('')}</div>
      </section>

      <section class="closing"><div class="shell closingInner"><p class="micro">YOUR NEXT STEP</p><h2>Keep the work<br><em>after the workshop.</em></h2><button class="button light" onclick="go('register')">Enter EYD Academy <span>↗</span></button></div></section>
    </main>${footer()}`;
}

function courseCard(c, dashboard=false, index=0){
  const u = currentUser();
  const open = !!u && (u.role==='admin' || u.access.includes(c.id));
  return `<article class="programCard ${dashboard?'dashboardCard':''}">
    <div class="programImage"><img src="${c.img}" alt="${esc(c.title)}"><span class="programNumber">${c.accent}</span><span class="accessChip ${open?'open':''}">${open?'UNLOCKED':'PROGRAM'}</span></div>
    <div class="programBody"><p class="micro">${c.eyebrow}</p><h3>${c.title}</h3><p>${c.desc}</p><div class="programMeta"><span>${c.lessons.length} core lessons</span><span>${open?'Access active':'Available to unlock'}</span></div>
    ${dashboard?`<button class="cardAction ${open?'active':''}" ${open?`onclick="openCourse('${c.id}')"`:'disabled'}>${open?'Continue course →':'Locked'}</button>`:''}</div>
  </article>`;
}

function auth(mode){
  const register = mode==='register';
  return `${nav()}<main class="authPage"><section class="authVisual"><div class="authVisualInner"><p class="micro">EYD ACADEMY</p><h1>${register?'Your training.<br><em>One account.</em>':'Welcome<br><em>back.</em>'}</h1><p>${register?'Create your account once. Courses, memberships, mentoring access and future programs can all attach to the same profile.':'Continue exactly where you stopped. Your course access, progress and notes stay connected to your profile.'}</p><div class="authVisualCard"><span>${register?'AFTER SIGN-UP':'YOUR SPACE'}</span><b>${register?'Verify email → unlock purchase → start training':'Courses → progress → notes → next lesson'}</b></div></div></section><section class="authPanel"><div class="authBox"><button class="authBack" onclick="go('home')">← Back to academy</button><p class="micro">${register?'CREATE ACCOUNT':'MEMBER LOGIN'}</p><h2>${register?'Join EYD Academy':'Log in'}</h2><p class="authIntro">${register?'No course is automatically unlocked by registration alone. Access comes from a purchase, active membership or an EYD admin grant.':'Use the preview student or admin account below. Production authentication will be server-side.'}</p>
    ${register?'<label>Full name<input id="name" placeholder="Your name"></label>':''}
    <label>Email<input id="email" autocomplete="email" placeholder="you@example.com"></label>
    <label>Password<input id="password" type="password" autocomplete="current-password" placeholder="••••••••••"></label>
    ${!register?'<button class="forgot" onclick="previewReset()">Forgot password?</button>':''}
    <button class="button light full" onclick="${register?'registerDemo()':'loginDemo()'}">${register?'Create preview account':'Log in'} <span>→</span></button>
    <div id="authError" class="authError"></div>
    ${!register?'<div class="demoCredentials"><b>Preview only</b><span>Student · student@eyd-preview.local · PreviewStudent26!</span><span>Admin · admin@eyd-preview.local · PreviewAdmin26!</span></div>':''}
    <p class="authSwitch">${register?'Already have an account?':'New to EYD Academy?'} <button onclick="go('${register?'login':'register'}')">${register?'Log in':'Create account'}</button></p>
  </div></section></main>`;
}

function loginDemo(){
  const email = document.getElementById('email').value.trim().toLowerCase();
  const pass = document.getElementById('password').value;
  let u;
  if(email==='admin@eyd-preview.local' && pass==='PreviewAdmin26!') u=state.users.find(x=>x.role==='admin');
  if(email==='student@eyd-preview.local' && pass==='PreviewStudent26!') u=state.users.find(x=>x.email==='student@eyd-preview.local');
  if(!u){ document.getElementById('authError').textContent='Use one of the preview accounts shown below.'; return; }
  state.session={id:u.id,role:u.role};
  go(u.role==='admin'?'admin':'dashboard');
}

function registerDemo(){
  const name=(document.getElementById('name').value||'New Student').trim();
  const email=document.getElementById('email').value.trim().toLowerCase();
  if(!email){ document.getElementById('authError').textContent='Enter an email address.'; return; }
  const id=Math.max(...state.users.map(u=>u.id))+1;
  state.users.push({id,name,email,role:'student',plan:'No active access',access:[]}); save(); state.session={id,role:'student'}; go('dashboard');
}

function previewReset(){ toast('Production: a secure, expiring reset link would be sent by email.'); }

function memberShell(content, active='home'){
  const u=currentUser();
  return `<div class="memberApp"><aside class="memberSide"><button class="brand memberBrand" onclick="go('home')"><span class="brandMark"><img src="assets/eyd-logo.png" alt=""></span><span class="brandWords"><b>EYD</b><small>ACADEMY</small></span></button><div class="sideLabel">MY LEARNING</div><nav><button class="${active==='home'?'active':''}" onclick="go('dashboard')"><span>⌂</span>Overview</button><button class="${active==='courses'?'active':''}" onclick="go('dashboard')"><span>▤</span>My programs</button><button onclick="toast('Journey view is part of the next build.')"><span>↗</span>My journey</button></nav><div class="sideLabel">MY SPACE</div><nav><button onclick="toast('Saved lessons will persist per user in production.')"><span>☆</span>Saved lessons</button><button onclick="toast('Account & security screen comes with production auth.')"><span>⚙</span>Account & security</button></nav><div class="memberUser"><div class="avatar">${initials(u.name)}</div><div><b>${esc(u.name)}</b><span>${esc(u.plan||'Student')}</span></div><button onclick="logout()">↗</button></div></aside><div class="memberMain"><header class="memberTop"><div><span class="mobileEyebrow">EYD ACADEMY</span></div><div class="memberTopActions"><button class="searchButton">⌕ <span>Search academy</span></button><button class="notification">○</button></div></header>${content}</div></div>`;
}

function dashboard(){
  if(!state.session) return auth('login');
  if(state.session.role==='admin') return admin();
  const u=currentUser();
  const openCourses=courses.filter(c=>u.access.includes(c.id));
  const next=openCourses[0] || courses[0];
  const content=`<main class="dashboard"><section class="dashboardHero"><div><p class="micro">MY ACADEMY</p><h1>Good to see you,<br><em>${esc(u.name.split(' ')[0])}.</em></h1><p>Pick up where you stopped or choose another unlocked program.</p></div><div class="membershipBadge"><span>CURRENT ACCESS</span><b>${esc(u.plan||'Student')}</b><small>${openCourses.length} program${openCourses.length===1?'':'s'} unlocked</small></div></section>
    <section class="continueGrid"><article class="continueCard"><div class="continueMedia"><img src="${next.img}" alt=""><span>CONTINUE LEARNING</span></div><div class="continueCopy"><p class="micro">${next.eyebrow}</p><h2>${next.title}</h2><p>Next: ${next.lessons[1]||next.lessons[0]}</p><div class="continueProgress"><span><b>38%</b> complete</span><div class="progressTrack"><i style="width:38%"></i></div></div><button class="button light" onclick="openCourse('${next.id}')">Continue lesson →</button></div></article><aside class="weekCard"><p class="micro">THIS WEEK</p><strong>3</strong><span>lessons completed</span><div class="weekRule"></div><strong>42</strong><span>minutes practiced</span><button onclick="toast('Practice tracking will be stored per student in production.')">View activity →</button></aside></section>
    <section class="dashboardLibrary"><div class="dashboardTitle"><div><p class="micro">YOUR LIBRARY</p><h2>Programs</h2></div><span>${openCourses.length} unlocked · ${courses.length-openCourses.length} available</span></div><div class="programGrid memberPrograms">${courses.map((c,i)=>courseCard(c,true,i)).join('')}</div></section></main>`;
  return memberShell(content,'home');
}

function coursePage(id){
  const c=courses.find(x=>x.id===id); const u=currentUser();
  if(!u) return auth('login');
  const open=u.role==='admin'||u.access.includes(id); if(!open) return dashboard();
  const content=`<main class="courseView"><button class="backButton" onclick="go('${u.role==='admin'?'admin':'dashboard'}')">← Back to ${u.role==='admin'?'admin':'my academy'}</button><section class="courseViewHero"><div><p class="micro">${c.eyebrow} · ACCESS ACTIVE</p><h1>${c.title}</h1><p>${c.desc}</p><div class="courseFacts"><span>${c.lessons.length} lessons</span><span>Self-paced</span><span>Progress saved</span></div></div><div class="courseCover"><img src="${c.img}" alt="${esc(c.title)}"><span>${c.accent}</span></div></section><section class="lessonLayout"><div class="videoPanel"><div class="videoPlaceholder"><button>▶</button><span>Protected lesson video</span></div><div class="lessonInfo"><p class="micro">LESSON 02</p><h2>${c.lessons[1]||c.lessons[0]}</h2><p>Video access will be generated only after the server confirms this student's entitlement.</p></div></div><aside class="curriculum"><div class="curriculumHead"><p class="micro">CURRICULUM</p><strong>Course lessons</strong></div>${c.lessons.map((lesson,i)=>`<button class="lessonRow ${i===1?'current':''}"><span>${String(i+1).padStart(2,'0')}</span><div><b>${lesson}</b><small>${i===0?'Completed':i===1?'Continue here':'Available'}</small></div><i>${i===0?'✓':i===1?'▶':'→'}</i></button>`).join('')}</aside></section></main>`;
  return memberShell(content,'courses');
}

function admin(){
  if(!state.session||state.session.role!=='admin') return auth('login');
  const students=state.users.filter(u=>u.role==='student');
  const content=`<main class="adminPage"><section class="adminHead"><div><p class="micro">EYD ADMINISTRATION</p><h1>Access control</h1><p>Manage students, plans and course entitlements from one place.</p></div><button class="button outline" onclick="resetPreview()">Reset preview</button></section><div class="adminStats"><article><span>Students</span><strong>${students.length}</strong><small>Academy profiles</small></article><article><span>Programs</span><strong>${courses.length}</strong><small>Published modules</small></article><article><span>Active grants</span><strong>${students.reduce((a,u)=>a+u.access.length,0)}</strong><small>Course entitlements</small></article></div><section class="adminPanel"><div class="adminPanelHead"><div><p class="micro">STUDENT ACCESS</p><h2>Members</h2></div><div class="adminTools"><input placeholder="Search students" oninput="filterUsers(this.value)"><button class="button light compact" onclick="addDemoStudent()">+ Add student</button></div></div><div class="adminNotice">Preview behavior only. Production access will be enforced by the server/database, not browser storage.</div><div id="userList">${students.map(userRow).join('')}</div></section></main>`;
  return memberShell(content,'admin');
}

function userRow(u){
  return `<article class="userCard" data-search="${esc((u.name+' '+u.email).toLowerCase())}"><div class="userIdentity"><div class="avatar">${initials(u.name)}</div><div><b>${esc(u.name)}</b><span>${esc(u.email)}</span></div></div><div class="userPlan"><span>ACCESS TYPE</span><b>${esc(u.plan||'Course Access')}</b></div><div class="entitlements">${courses.map(c=>`<button class="entitlement ${u.access.includes(c.id)?'yes':''}" onclick="toggleAccess(${u.id},'${c.id}')"><span>${c.short}</span><i>${u.access.includes(c.id)?'✓':'+'}</i></button>`).join('')}</div><button class="previewStudent" onclick="previewStudent(${u.id})">Preview →</button></article>`;
}

function toggleAccess(uid,cid){ const u=state.users.find(x=>x.id===uid); u.access=u.access.includes(cid)?u.access.filter(x=>x!==cid):[...u.access,cid]; save(); render(); }
function previewStudent(uid){ const u=state.users.find(x=>x.id===uid); state.session={id:u.id,role:'student'}; go('dashboard'); }
function addDemoStudent(){ const n=state.users.filter(x=>x.role==='student').length+1; state.users.push({id:Math.max(...state.users.map(x=>x.id))+1,name:`Demo Student ${n}`,email:`student${n}@example.com`,role:'student',plan:'No active access',access:[]}); save(); render(); }
function filterUsers(q){ document.querySelectorAll('.userCard').forEach(el=>el.style.display=el.dataset.search.includes(q.toLowerCase())?'':'none'); }
function resetPreview(){ localStorage.removeItem('eyd_preview_users'); state.users=JSON.parse(JSON.stringify(seedUsers)); render(); }
function logout(){ state.session=null; go('home'); }
function openCourse(id){ state.route='course:'+id; render(); window.scrollTo(0,0); }
function go(route){ state.route=route; render(); window.scrollTo(0,0); }
function toast(message){ const t=document.getElementById('toast'); t.textContent=message; t.classList.add('show'); clearTimeout(window.__toastTimer); window.__toastTimer=setTimeout(()=>t.classList.remove('show'),3200); }

function render(){
  let html;
  if(state.route==='home') html=home();
  else if(state.route==='login') html=auth('login');
  else if(state.route==='register') html=auth('register');
  else if(state.route==='dashboard') html=dashboard();
  else if(state.route==='admin') html=admin();
  else if(state.route.startsWith('course:')) html=coursePage(state.route.split(':')[1]);
  else html=home();
  document.getElementById('app').innerHTML=html;
}

const qp=new URLSearchParams(location.search);
if(qp.get('view')==='admin'){
  const a=state.users.find(x=>x.role==='admin'); state.session={id:a.id,role:'admin'}; state.route='admin';
}else if(qp.get('view')==='student'){
  const u=state.users.find(x=>x.email==='student@eyd-preview.local'); state.session={id:u.id,role:'student'}; state.route='dashboard';
}
render();
