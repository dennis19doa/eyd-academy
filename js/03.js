function mentoring(){
 const nav=lessons.map(([k,t,d,done])=>`<button class="lessonBtn ${k===currentLesson?'active':''} ${state.completed[k]?'done':''}" onclick="currentLesson='${k}';renderAppRoute()"><span class="lessonCheck">${state.completed[k]?'✓':lessons.findIndex(x=>x[0]===k)+1}</span><span><b>${t}</b><small>${d} · ${state.completed[k]?'Completed':'Not completed'}</small></span></button>`).join('');
 const c=lessonContent[currentLesson];
 return shellPage('Mentoring Program','Block 6 · Marketing, communication and sustainable teaching.',
 `<span class="pill violet">${state.progress.mentoring}% complete</span>`,
 `<div class="learningLayout">
   <aside class="card curriculum">
     <div class="currTop"><div class="kicker">Block 6</div><h3>Marketing & Sustainability</h3><p>${Object.values(state.completed).filter(Boolean).length} of 5 chapters completed</p><div class="progress" style="margin-top:12px"><i style="width:${state.progress.mentoring}%"></i></div><div class="progressExplain">${state.progress.mentoring}% complete · finishing a chapter updates this bar.</div></div>
     <div class="moduleTitle">Course content</div>${nav}
   </aside>
   <section class="lessonMain">
     <div class="videoBox"><div class="play">▶</div></div>
     <div class="card lessonCard">
       <div class="lessonTop">
         <div><div class="kicker">Block 6 · Chapter ${lessons.findIndex(x=>x[0]===currentLesson)+1}</div><h1>${c.title}</h1><p>${c.desc}</p></div>
         <button class="btn ghost" onclick="toggleSave('${currentLesson}')">${state.saved.includes(currentLesson)?'★ Saved':'☆ Save'}</button>
       </div>
       <div class="lessonGuide"><b>What to do on this lesson</b><p>1. Watch the lesson. 2. Review the key ideas. 3. Complete the practice. 4. Save notes if useful. 5. Mark the chapter complete.</p></div>
       <div class="lessonTabs">
         <button class="active" onclick="tab(this,'overview')">1. Overview</button>
         <button onclick="tab(this,'practice')">2. Practice</button>
         <button onclick="tab(this,'notes')">3. My notes</button>
       </div>
       <div id="tab-overview" class="tabPanel active">
         <div class="takeaways">${c.take.map(x=>`<div class="takeaway"><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}</div>
         <div style="margin-top:20px;padding:17px;border-left:3px solid var(--violet);background:#faf9ff;border-radius:0 13px 13px 0">
           <b style="font-size:13px">Key reflection</b>
           <p class="muted" style="font-size:12px;line-height:1.55;margin:6px 0 0">What do you want students to remember about the experience of learning with you—not only about your dancing?</p>
         </div>
       </div>
       <div id="tab-practice" class="tabPanel">
         <div class="checklist">
           <label class="checkItem"><input type="checkbox"> Watch the chapter and identify the main idea.</label>
           <label class="checkItem"><input type="checkbox"> Write down one concrete example from your own classes.</label>
           <label class="checkItem"><input type="checkbox"> Choose one action you can test this week.</label>
         </div>
       </div>
       <div id="tab-notes" class="tabPanel">
         <textarea id="noteArea" class="noteBox" placeholder="Write private notes for this lesson...">${state.notes[currentLesson]||''}</textarea>
         <button class="btn soft" style="margin-top:10px" onclick="state.notes[currentLesson]=document.getElementById('noteArea').value;save();toast('Private note saved')">Save note</button>
       </div>
       <div class="completeBar">
         <div><b style="font-size:13px">Ready to continue?</b><div class="small muted">Completing a lesson updates your progress.</div></div>
         <button class="btn ${state.completed[currentLesson]?'success':'primary'}" onclick="completeLesson('${currentLesson}')">${state.completed[currentLesson]?'✓ Completed':'Mark lesson complete'}</button>
       </div>
     </div>
   </section>
 </div>`
 );
}
