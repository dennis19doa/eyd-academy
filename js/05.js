function toggleAccess(k){state.access[k]=!state.access[k];save();renderAppRoute();toast(state.access[k]?'Course access granted':'Course access removed');}
function toggleSave(k){const i=state.saved.indexOf(k);if(i>=0)state.saved.splice(i,1);else state.saved.push(k);save();renderAppRoute();toast(i>=0?'Removed from saved items':'Saved for later');}
function completeLesson(k){if(!state.completed[k]){state.completed[k]=true;state.progress.mentoring=Math.min(100,state.progress.mentoring+7);state.xp+=40;state.week=Math.min(3,state.week+1);save();toast('Lesson completed · +40 XP');}renderAppRoute();}
function tab(btn,id){btn.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const card=btn.closest('.lessonCard');card.querySelectorAll('.tabPanel').forEach(p=>p.classList.remove('active'));card.querySelector('#tab-'+id).classList.add('active');}
function accountTab(btn,id){document.querySelectorAll('#accountTabs button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('[id^="acc-"]').forEach(p=>p.classList.remove('active'));document.getElementById('acc-'+id).classList.add('active');}

function renderAppRoute(){
 const hash=(location.hash||'#landing').slice(1);
 const app=document.getElementById('app'), landing=document.getElementById('landing'), auth=document.getElementById('auth');
 landing.classList.remove('active');auth.classList.remove('active');app.classList.remove('active');
 if(hash==='landing'||hash===''){landing.classList.add('active');return;}
 if(hash==='auth'){auth.classList.add('active');return;}
 app.classList.add('active');
 const target=document.getElementById('appRoute');
 const pages={dashboard,courses,journey,mentoring,course:genericCourse,saved,account,admin};
 target.innerHTML=(pages[hash]||dashboard)();
 document.querySelectorAll('[data-side]').forEach(a=>a.classList.toggle('active',a.dataset.side===hash));
 window.scrollTo(0,0);
}
window.addEventListener('hashchange',renderAppRoute);

function hideAuthBoxes(){['loginBox','forgotBox','resetSentBox','newPasswordBox','registerBox'].forEach(id=>document.getElementById(id).classList.add('hidden'));}
function showLogin(){hideAuthBoxes();document.getElementById('loginBox').classList.remove('hidden');}
function showForgot(){hideAuthBoxes();document.getElementById('forgotBox').classList.remove('hidden');}
function showResetSent(){hideAuthBoxes();document.getElementById('resetSentBox').classList.remove('hidden');}
function showNewPassword(){hideAuthBoxes();document.getElementById('newPasswordBox').classList.remove('hidden');}
function showRegister(){hideAuthBoxes();document.getElementById('registerBox').classList.remove('hidden');}

renderAppRoute();
