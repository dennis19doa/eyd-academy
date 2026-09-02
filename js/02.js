function dashboard(){
  const courses = courseData.slice(0,4).map(courseTile).join('');
  return shellPage(
    'Welcome back, Alex 👋',
    'This is your learning home. Start with the recommended lesson, then check your programs and weekly progress.',
    `<a class="btn ghost" href="#journey">See my full journey</a>`,
    `<section class="card continueCard">
      <div class="continueInfo">
        <div class="continueImage"><img src="${imgs.mentoring}"></div>
        <div>
          <span class="pill violet">Recommended next</span>
          <h2>Mentoring · Visibility & Social Media</h2>
          <p>This is your next unfinished chapter in Block 6. Estimated time: 18 minutes.</p>
          <a class="btn primary" href="#mentoring">Continue lesson →</a>
        </div>
      </div>
      <div class="continueAside">
        <span class="small muted">Mentoring Program</span>
        <div class="big">${state.progress.mentoring}%</div>
        <div class="progress" style="margin:8px 0 8px"><i style="width:${state.progress.mentoring}%"></i></div>
        <span class="small muted">${state.progress.mentoring}% = completed learning content in this program. Your progress is saved automatically.</span>
      </div>
    </section>
    <div class="statRow">
      <div class="card statCard"><div class="top"><span>Weekly goal</span><span>◎</span></div><strong>${state.week} / 3</strong><small>Goal reached this week</small></div>
      <div class="card statCard"><div class="top"><span>Learning streak</span><span>↗</span></div><strong>${state.streak} days</strong><small>Personal best: 9 days</small></div>
      <div class="card statCard"><div class="top"><span>Academy XP</span><span>✦</span></div><strong>${state.xp}</strong><small>160 XP to Level 7</small></div>
      <div class="card statCard"><div class="top"><span>Course access</span><span>✓</span></div><strong>${Object.values(state.access).filter(Boolean).length}</strong><small>3 active programs</small></div>
    </div>
    <div class="contentGrid">
      <section class="card sectionCard">
        <div class="sectionHeader"><h2>My programs</h2><a href="#courses">View all →</a></div>
        <div class="courseList">${courses}</div>
      </section>
      <aside style="display:grid;gap:18px">
        <section class="card sectionCard">
          <div class="sectionHeader"><h2>This week</h2><span class="pill green">Goal reached</span></div>
          <div class="week">
            <div class="day done">M<br>✓</div><div class="day done">T<br>✓</div><div class="day now">W<br>●</div><div class="day">T</div><div class="day">F</div><div class="day">S</div><div class="day">S</div>
          </div>
          <div class="todayList" style="margin-top:16px">
            <div class="todayItem"><div class="todayIcon">1</div><div><b>Mentoring reflection</b><small>10–15 min · recommended today</small></div></div>
            <div class="todayItem"><div class="todayIcon">2</div><div><b>Body movement drill</b><small>8 min · optional practice</small></div></div>
          </div>
        </section>
        <section class="card sectionCard">
          <div class="sectionHeader"><h2>Recent activity</h2></div>
          <div class="todayList">
            <div class="todayItem"><div class="todayIcon">✓</div><div><b>Communicating Your Value</b><small>Completed yesterday · +40 XP</small></div></div>
            <div class="todayItem"><div class="todayIcon">☆</div><div><b>Brand reflection saved</b><small>2 days ago</small></div></div>
          </div>
        </section>
      </aside>
    </div>`
  );
}

function courses(){
 return shellPage('My programs','Everything connected to your EYD account. Active programs can be opened now; locked programs have not been purchased or assigned yet.',
 `<span class="pill violet">${Object.values(state.access).filter(Boolean).length} active courses</span>`,
 `<section class="card sectionCard"><div class="courseList" style="grid-template-columns:repeat(3,1fr)">${courseData.map(courseTile).join('')}</div></section>`
 );
}

function journey(){
 return shellPage('My learning journey','Your longer-term path across EYD programs: what you completed, what you are working on now and what comes next.',
 '',
 `<div class="contentGrid">
   <section class="card roadmap">
     <div class="sectionHeader"><h2>Academy roadmap</h2><span class="pill violet">Level 6</span></div>
     <div class="roadStep done"><div class="stepDot">✓</div><div><b>Start the academy</b><p>Create account and unlock your first course.</p></div><span class="small muted">Completed</span></div>
     <div class="roadStep done"><div class="stepDot">✓</div><div><b>Fundamentals foundation</b><p>Build posture, connection and basic movement understanding.</p></div><span class="small muted">72%</span></div>
     <div class="roadStep current"><div class="stepDot">3</div><div><b>Mentoring · Block 6</b><p>Develop communication, visibility and sustainable teaching.</p></div><span class="pill violet">Current</span></div>
     <div class="roadStep"><div class="stepDot">4</div><div><b>Body Movement I</b><p>Improve control and coordination.</p></div><span class="small muted">35%</span></div>
     <div class="roadStep"><div class="stepDot">5</div><div><b>Body Movement II</b><p>Unlock after Body Movement I.</p></div><span class="small muted">Locked</span></div>
   </section>
   <aside class="card sectionCard">
     <div class="sectionHeader"><h2>Achievements</h2></div>
     <div class="badgeGrid">
       <div class="card badgeCard"><div class="badgeIcon">✓</div><b>First Step</b><small>First lesson completed</small></div>
       <div class="card badgeCard"><div class="badgeIcon">5</div><b>Consistency</b><small>5-day streak</small></div>
       <div class="card badgeCard"><div class="badgeIcon">✦</div><b>Reflective Learner</b><small>5 reflections saved</small></div>
       <div class="card badgeCard locked"><div class="badgeIcon">♢</div><b>Brand Builder</b><small>2 lessons away</small></div>
     </div>
   </aside>
 </div>`
 );
}

const lessons = [
 ['brand','The Teacher as a Brand','12 min',true],
 ['value','Communicating Your Value','14 min',true],
 ['visibility','Visibility & Social Media','18 min',false],
 ['community','Community & Recommendation','16 min',false],
 ['professional','Professionalization & Sustainability','22 min',false]
];
let currentLesson='brand';

const lessonContent = {
 brand:{title:'The Teacher as a Brand',desc:'Understand the experience students associate with you and how consistency creates trust.',take:[['Experience','Your brand is the feeling people leave with after learning with you.'],['Consistency','Your message online should match the experience inside the class.'],['Trust','Repeated positive experiences are what make students return and recommend you.']]},
 value:{title:'Communicating Your Value',desc:'Help students understand what they can learn with you and how your class will feel.',take:[['Clarity','Good dancing alone does not tell students if your class is right for them.'],['Promise','Communicate the improvement and experience students can expect.'],['Repetition','Familiarity builds confidence before someone attends for the first time.']]},
 visibility:{title:'Visibility & Social Media',desc:'Use social media as a clear introduction to your teaching—not only a highlight reel.',take:[['Identity','Make it easy to understand who you are and what you teach.'],['Teaching','Show how you explain and work with students.'],['Atmosphere','Let people imagine what joining your class feels like.']]},
 community:{title:'Community & Recommendation',desc:'Create relationships between students so the community grows beyond the teacher.',take:[['Connection','Encourage students to know and support one another.'],['Participation','Create space for students to contribute and welcome others.'],['Recommendation','Strong communities naturally create referrals and retention.']]},
 professional:{title:'Professionalization & Sustainability',desc:'Build systems that make your teaching reliable, clear and sustainable over time.',take:[['Reliability','Communicate changes early and fulfill commitments.'],['Clarity','Students should understand the offer, price and expectations.'],['Sustainability','Quality should not require permanent exhaustion.']]}
};
