function genericCourse(){
 return shellPage('Fundamentals','A focused course experience with video, notes, checkpoints and structured practice.',
 `<span class="pill green">72% complete</span>`,
 `<div class="learningLayout">
   <aside class="card curriculum">
     <div class="currTop"><div class="kicker">Fundamentals</div><h3>Technical foundation</h3><p>9 of 12 lessons completed</p><div class="progress"><i style="width:72%"></i></div><div class="progressExplain">72% = 9 of the 12 available lessons completed.</div></div>
     <div class="moduleTitle">Current module</div>
     <button class="lessonBtn done"><span class="lessonCheck">✓</span><span><b>Posture basics</b><small>Completed</small></span></button>
     <button class="lessonBtn done"><span class="lessonCheck">✓</span><span><b>Frame & connection</b><small>Completed</small></span></button>
     <button class="lessonBtn active"><span class="lessonCheck">9</span><span><b>Energy through the body</b><small>14 min</small></span></button>
     <button class="lessonBtn"><span class="lessonCheck">10</span><span><b>Partner practice</b><small>12 min</small></span></button>
   </aside>
   <section class="lessonMain">
     <div class="videoBox"><div class="play">▶</div></div>
     <div class="card lessonCard"><div class="lessonTop"><div><div class="kicker">Lesson 9</div><h1>Energy through the body</h1><p>Understand how posture, frame and muscular tone influence clear movement and comfortable connection.</p></div><button class="btn ghost">☆ Save</button></div>
     <div class="lessonTabs"><button class="active">Overview</button><button>Practice</button><button>My notes</button></div>
     <div class="tabPanel active"><div class="takeaways"><div class="takeaway"><b>Stacking</b><span>Organize the body so movement can travel without unnecessary tension.</span></div><div class="takeaway"><b>Tone</b><span>Use enough muscular activity for clarity without becoming rigid.</span></div><div class="takeaway"><b>Transfer</b><span>Move energy through the body instead of isolating every action.</span></div></div></div>
     <div class="completeBar"><div><b style="font-size:13px">Lesson in progress</b><div class="small muted">Watch, practice and mark it complete.</div></div><button class="btn primary" onclick="toast('Lesson completed in preview')">Mark lesson complete</button></div>
     </div>
   </section>
 </div>`
 );
}

function saved(){
 const savedCourses=state.saved.map(k=>lessonContent[k]?`<div class="todayItem"><div class="todayIcon">☆</div><div><b>${lessonContent[k].title}</b><small>Mentoring · Block 6</small></div></div>`:'').join('');
 return shellPage('Saved lessons','Everything you bookmarked so you can return to it quickly without searching again.','',
 `<section class="card sectionCard"><div class="sectionHeader"><h2>Your saved learning</h2></div><div class="todayList">${savedCourses||'<p class="muted">Nothing saved yet.</p>'}</div></section>`
 );
}

function account(){
 return shellPage('Account & security','Manage the personal information, purchases and security connected to your EYD account.','',
 `<div class="tabs" id="accountTabs">
   <button class="active" onclick="accountTab(this,'profile')">Profile</button>
   <button onclick="accountTab(this,'purchases')">Purchases</button>
   <button onclick="accountTab(this,'security')">Security</button>
   <button onclick="accountTab(this,'privacy')">Privacy</button>
 </div>
 <section class="card sectionCard" style="margin-top:15px">
  <div id="acc-profile" class="panel active">
    <div class="sectionHeader"><h2>Profile information</h2></div>
    <div class="formGrid"><div class="field"><label>Full name</label><input value="Alex Morgan"></div><div class="field"><label>Email</label><input value="student@eyd-preview.local"></div><div class="field"><label>Preferred language</label><select><option>English</option><option>German</option><option>Spanish</option></select></div><div class="field"><label>Timezone</label><input value="Europe/Berlin"></div></div>
    <button class="btn primary" style="margin-top:16px" onclick="toast('Profile saved')">Save changes</button>
  </div>
  <div id="acc-purchases" class="panel">
    <div class="sectionHeader"><h2>Purchases & access</h2></div>
    <div class="tableWrap"><table><thead><tr><th>Program</th><th>Date</th><th>Status</th><th>Access</th></tr></thead><tbody>
    <tr><td><b>Fundamentals Intensive</b></td><td>14 Aug 2026</td><td><span class="pill green">Paid</span></td><td>Active</td></tr>
    <tr><td><b>Body Movement I</b></td><td>21 Aug 2026</td><td><span class="pill green">Paid</span></td><td>Active</td></tr>
    <tr><td><b>Mentoring Program</b></td><td>02 Jul 2026</td><td><span class="pill green">Paid</span></td><td>Active</td></tr>
    </tbody></table></div>
  </div>
  <div id="acc-security" class="panel">
    <div class="sectionHeader"><h2>Security</h2></div>
    <div class="formGrid"><div class="field"><label>Current password</label><input type="password" value="••••••••••"></div><div class="field"><label>New password</label><input type="password" placeholder="Choose a strong password"></div></div>
    <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap"><button class="btn primary" onclick="toast('Password change simulated')">Change password</button><button class="btn ghost" onclick="location.hash='#auth'">Forgot password flow</button><button class="btn ghost" onclick="toast('Other sessions signed out')">Log out other devices</button></div>
  </div>
  <div id="acc-privacy" class="panel">
    <div class="sectionHeader"><h2>Privacy & data</h2></div>
    <div class="todayList">
      <div class="todayItem"><div class="todayIcon">↓</div><div><b>Download my data</b><small>Request a copy of your account and learning data.</small></div></div>
      <div class="todayItem"><div class="todayIcon">×</div><div><b>Delete account</b><small>Permanent deletion should require email confirmation.</small></div></div>
    </div>
  </div>
 </section>`
 );
}

function admin(){
 const rows=courseData.map(([k,t])=>`<tr><td><b>${t}</b></td><td><button class="toggle ${state.access[k]?'on':''}" onclick="toggleAccess('${k}')">${state.access[k]?'✓ Access':'No access'}</button></td><td>${state.progress[k]||0}%</td></tr>`).join('');
 return shellPage('Admin workspace','Manage student access, content and learning data without editing code.',
 `<a class="btn primary" href="#dashboard">Preview as student →</a>`,
 `<div class="statRow"><div class="card statCard"><div class="top"><span>Students</span></div><strong>128</strong><small>Demo data</small></div><div class="card statCard"><div class="top"><span>Active this week</span></div><strong>83</strong><small>65% engagement</small></div><div class="card statCard"><div class="top"><span>Courses</span></div><strong>5</strong><small>3 active for Alex</small></div><div class="card statCard"><div class="top"><span>Avg. progress</span></div><strong>54%</strong><small>Active learners</small></div></div>
 <div class="contentGrid">
  <section class="card sectionCard">
    <div class="sectionHeader"><div><h2>Alex Morgan</h2><span class="small muted">student@eyd-preview.local</span></div><span class="pill green">Active</span></div>
    <div class="tableWrap"><table><thead><tr><th>Course</th><th>Access</th><th>Progress</th></tr></thead><tbody>${rows}</tbody></table></div>
  </section>
  <aside class="card sectionCard">
    <div class="sectionHeader"><h2>Content builder</h2></div>
    <div class="field"><label>Course</label><select><option>Mentoring Program</option><option>Fundamentals</option><option>Body Movement I</option></select></div>
    <div class="field" style="margin-top:10px"><label>Content type</label><select><option>Lesson</option><option>Module</option><option>Reflection</option><option>Quiz</option><option>Resource</option></select></div>
    <div class="field" style="margin-top:10px"><label>Title</label><input placeholder="New lesson title"></div>
    <button class="btn primary" style="margin-top:12px;width:100%" onclick="toast('Content item created in prototype')">Add content</button>
  </aside>
 </div>`
 );
}
