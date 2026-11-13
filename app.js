const selectedDay=Math.min(14,Math.max(1,Number(localStorage.getItem('haru-current-day')||1)));
const lesson=window.N3_LESSONS[selectedDay-1];
const kanji=lesson.kanji, words=lesson.words, expressions=lesson.expressions, quizQuestions=lesson.quiz;

const defaultState = { completed: [], quizBest: 0, lastStudy: null, streak: 0 };
let state;
try {
  state = { ...defaultState, ...JSON.parse(localStorage.getItem('haru-study') || '{}') };
  state.completed = [...new Set((state.completed || []).map(id => id === 'kana' ? 'kanji' : id))];
} catch { state = { ...defaultState }; }
const save = () => localStorage.setItem('haru-study', JSON.stringify(state));
const today = new Date();
document.querySelector('#today-date').textContent = new Intl.DateTimeFormat('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' }).format(today);

function updateProgress() {
  const todayPrefix = "D"+selectedDay+":";
  const todayCompleted = state.completed.filter(id => id.startsWith(todayPrefix));
  const done = Math.min(todayCompleted.length, 4);
  const percent = Math.round(done / 4 * 100);
  document.querySelector('#progress-ring').style.background = `conic-gradient(#8272d7 ${percent * 3.6}deg,#f0eff4 ${percent * 3.6}deg)`;
  document.querySelector('#progress-percent').textContent = `${percent}%`;
  document.querySelector('#progress-done').textContent = `${done} / 4`;
  document.querySelector('#progress-left').textContent = `${4 - done}개`;
  document.querySelector('#total-count').textContent = `${state.completed.length}개`;
  document.querySelector('#course-completed').textContent = new Set(state.completed.map(id => id.split(':')[0])).size;
  document.querySelector('#streak-count').textContent = `${state.streak}일`;
  document.querySelector('#kana-task').innerHTML = todayCompleted.includes(`${todayPrefix}kanji`) ? '완료 <b>✓</b>' : '시작하기 <b>→</b>';
}
function complete(id) {
  const scopedId = `D${selectedDay}:${id}`;
  if (!state.completed.includes(scopedId)) state.completed.push(scopedId);
  const date = new Date().toISOString().slice(0, 10);
  if (state.lastStudy !== date) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    state.streak = state.lastStudy === yesterday ? state.streak + 1 : 1;
    state.lastStudy = date;
  }
  save(); updateProgress();
}
const pageNames = { course: '14일 학습 코스', home: '오늘의 학습', kanji: 'N3 한자', words: 'N3 어휘', expressions: '문장·표현', quiz: '실전 퀴즈', music: 'J-pop 듣기' };
function go(page) {
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active-page'));
  document.querySelector(`#page-${page}`).classList.add('active-page');
  document.querySelectorAll('.nav-item').forEach(el => el.classList.toggle('active', el.dataset.page === page));
  document.querySelector('#crumb-title').textContent = pageNames[page];
  if (page === 'quiz') startQuiz();
  if (page === 'course') renderCourse();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
document.querySelectorAll('[data-page]').forEach(el => el.addEventListener('click', () => go(el.dataset.page)));
document.querySelectorAll('[data-go]').forEach(el => el.addEventListener('click', () => go(el.dataset.go)));
function renderCourse(){const grid=document.querySelector('#course-grid');grid.replaceChildren();window.N3_LESSONS.forEach((item,index)=>{const day=index+1,card=document.createElement('button');const done=['kanji','words','expressions','quiz'].every(id=>state.completed.includes('D'+day+':'+id));card.className='course-day-card'+(day===selectedDay?' current':'')+(done?' done':'');card.innerHTML='<span class="course-day-number">DAY '+String(day).padStart(2,'0')+'</span><strong>'+item.title+'</strong><span class="course-day-focus">'+item.focus+'</span><small>'+item.kanji.length+' 한자 · '+item.words.length+' 어휘 · '+item.expressions.length+' 표현</small><span class="course-day-status">'+(done?'완료 ✓':day===selectedDay?'학습 중':'시작 →')+'</span>';card.addEventListener('click',()=>{localStorage.setItem('haru-current-day',String(day));location.reload()});grid.append(card)})}
function updateLessonLabels(){document.querySelector('.lesson-tag').innerHTML="TODAY'S N3 LESSON <span>"+String(selectedDay).padStart(2,'0')+'</span>';document.querySelector('.hero-copy h2').textContent=lesson.focus.split(' · ')[0];document.querySelector('.hero-copy p').innerHTML=lesson.focus+'<br />'+lesson.summary;document.querySelector('#kanji-title').textContent=lesson.title+'의 한자';document.querySelector('#kanji-count').textContent='N3 어휘 · '+lesson.kanji.length+'자';document.querySelector('#kanji-focus').textContent=lesson.kanji.map(x=>x.char).join(' · ');document.querySelector('#kanji-summary').innerHTML=lesson.summary+'에 자주 쓰는 한자예요.<br />카드를 눌러 읽기와 암기 힌트를 확인하세요.';document.querySelector('#page-words h1').textContent=lesson.title+' 어휘';document.querySelector('#page-words .lesson-chip').textContent='오늘의 어휘 '+lesson.words.length+'개';document.querySelector('#page-expressions .lesson-chip').textContent='표현 '+lesson.expressions.length+'개 · 바꿔 말하기'}


updateLessonLabels();renderCourse();
const kanjiGrid = document.querySelector('#kana-grid');
kanji.forEach(item => {
  const card = document.createElement('button');
  card.className = 'kana-card kanji-card';
  card.innerHTML = `<span class="kana">${item.char}</span><span class="romaji">${item.meaning}</span><span class="hangul">${item.reading}</span><span class="play-mark">단어와 예문 보기</span><div class="kanji-detail hidden"><b>${item.words}</b><br />${item.example}<br /><small>🧠 ${item.hint}</small></div>`;
  card.addEventListener('click', () => {
    card.classList.toggle('selected');
    card.querySelector('.kanji-detail').classList.toggle('hidden');
    document.querySelector('#kana-feedback').textContent = `${item.char} · ${item.meaning} — 구성 단어와 문장으로 기억해요.`;
  });
  kanjiGrid.append(card);
});
document.querySelector('#finish-kana').addEventListener('click', () => { complete('kanji'); document.querySelector('#kana-feedback').textContent = '좋아요! 오늘의 N3 한자를 학습 완료했어요. 🌱'; });

const wordList = document.querySelector('#word-list');
words.forEach((item, i) => {
  const card = document.createElement('button');
  card.className = 'word-card';
  card.innerHTML = `<span class="word-num">0${i + 1}</span><span class="word-card-content"><span class="word-hidden">${item.jp}<span class="word-reading">${item.read}</span></span><span class="word-translation hidden">${item.ko}<br /><span class="word-example">${item.example}<br />${item.translation}</span><br /><span class="mnemonic">🧠 ${item.mnemonic}</span></span></span><span class="reveal-hint">뜻 보기 ＋</span>`;
  card.addEventListener('click', () => {
    card.classList.add('revealed');
    card.querySelector('.word-hidden').classList.add('hidden');
    card.querySelector('.word-translation').classList.remove('hidden');
    card.querySelector('.reveal-hint').textContent = '확인 ✓';
  });
  wordList.append(card);
});
document.querySelector('#finish-words').addEventListener('click', () => { complete('words'); document.querySelector('#word-feedback').textContent = '좋아요! 어휘를 예문과 연상 힌트로 익혔어요. 🌱'; });

const expressionList = document.querySelector('#expression-list');
expressions.forEach((item, i) => {
  const card = document.createElement('button');
  card.className = 'word-card expression-card';
  card.innerHTML = `<span class="word-num">0${i + 1}</span><span class="word-card-content"><span class="word-japanese">${item.jp}</span><span class="word-reading">${item.read} · ${item.ko}</span><span class="word-example">${item.example}<br />${item.translation}</span><span class="mnemonic hidden">💬 ${item.tip}<br /><b>내 문장으로 바꾸기:</b> ${item.change}</span></span><span class="reveal-hint">활용 팁 ＋</span>`;
  card.addEventListener('click', () => {
    card.classList.toggle('revealed');
    card.querySelector('.mnemonic').classList.toggle('hidden');
    card.querySelector('.reveal-hint').textContent = card.classList.contains('revealed') ? '접기 −' : '활용 팁 ＋';
  });
  expressionList.append(card);
});
document.querySelector('#finish-expressions').addEventListener('click', () => { complete('expressions'); document.querySelector('#expression-feedback').textContent = '좋아요! 표현을 문장으로 활용해봤어요. 🌱'; });

let questionIndex = 0;
let quizScore = 0;
function startQuiz() {
  questionIndex = 0; quizScore = 0;
  document.querySelector('#quiz-result').classList.add('hidden');
  document.querySelector('#quiz-card').classList.remove('hidden');
  renderQuestion();
}
function renderQuestion() {
  const q = quizQuestions[questionIndex];
  document.querySelector('#quiz-step').textContent = `${questionIndex + 1} / ${quizQuestions.length}`;
  const card = document.querySelector('#quiz-card');
  card.innerHTML = `<span class="quiz-label">JLPT N3 · QUESTION 0${questionIndex + 1}</span><div class="quiz-prompt quiz-sentence">${q.prompt}</div><div class="quiz-subtitle">${q.subtitle}</div><div class="quiz-options">${q.options.map(option => `<button class="quiz-option">${option}</button>`).join('')}</div><div class="quiz-next hidden"><button class="primary-button">다음 문제 <span>→</span></button></div>`;
  card.querySelectorAll('.quiz-option').forEach(button => button.addEventListener('click', () => {
    card.querySelectorAll('.quiz-option').forEach(option => { option.disabled = true; if (option.textContent === q.answer) option.classList.add('correct'); });
    if (button.textContent === q.answer) quizScore++; else button.classList.add('wrong');
    card.querySelector('.quiz-next').classList.remove('hidden');
    const next = card.querySelector('.quiz-next button');
    next.innerHTML = questionIndex === quizQuestions.length - 1 ? '결과 보기 <span>✓</span>' : '다음 문제 <span>→</span>';
    next.addEventListener('click', () => questionIndex < quizQuestions.length - 1 ? (questionIndex++, renderQuestion()) : showResult(), { once: true });
  }, { once: true }));
}
function showResult() {
  document.querySelector('#quiz-card').classList.add('hidden');
  const result = document.querySelector('#quiz-result');
  result.classList.remove('hidden');
  result.innerHTML = `<div class="score">${quizScore} / ${quizQuestions.length}</div><h2>${quizScore === quizQuestions.length ? '완벽해요!' : '잘했어요!'}</h2><p>뜻을 아는 데서 그치지 않고 문맥 속에서 골랐어요.</p><button class="primary-button" id="retry-quiz">다시 풀기 <span>↻</span></button>`;
  complete('quiz');
  document.querySelector('#retry-quiz').addEventListener('click', startQuiz);
}

const musicForm = document.querySelector('#music-search');
const musicResults = document.querySelector('#music-results');
const musicStatus = document.querySelector('#music-status');
let selectedVideoId = null;
let listeningNotes = {};
try { listeningNotes = JSON.parse(localStorage.getItem('haru-listening-notes') || '{}'); } catch { listeningNotes = {}; }

musicForm.addEventListener('submit', async event => {
  event.preventDefault();
  const query = document.querySelector('#music-query').value.trim();
  if (!query) return;
  if (location.hostname.endsWith('.github.io')) {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    window.open(searchUrl, '_blank', 'noopener');
    musicStatus.textContent = 'YouTube 검색을 새 탭에서 열었어요. 영상 링크를 복사해 아래 칸에 붙여넣으면 앱 안에서 재생할 수 있습니다.';
    return;
  }
  musicStatus.textContent = 'YouTube에서 영상을 찾고 있어요…';
  musicResults.replaceChildren();
  const loading = document.createElement('div');
  loading.className = 'empty-music';
  loading.textContent = '검색 중…';
  musicResults.append(loading);
  try {
    const response = await fetch(`/api/youtube/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || '검색 요청을 처리하지 못했어요.');
    if (!data.items?.length) {
      musicStatus.textContent = '검색 결과가 없어요. 다른 곡이나 아티스트 이름으로 찾아보세요.';
      musicResults.replaceChildren();
      return;
    }
    musicStatus.textContent = `${data.items.length}개의 영상을 찾았어요. 듣고 싶은 영상을 선택하세요.`;
    musicResults.replaceChildren();
    data.items.forEach(item => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'music-result-card';
      const image = document.createElement('img');
      image.src = item.thumbnail;
      image.alt = '';
      image.loading = 'lazy';
      const info = document.createElement('span');
      info.className = 'music-result-info';
      const title = document.createElement('strong');
      title.textContent = item.title;
      const channel = document.createElement('small');
      channel.textContent = item.channelTitle;
      info.append(title, channel);
      card.append(image, info);
      card.addEventListener('click', () => selectMusicVideo(item));
      musicResults.append(card);
    });
  } catch (error) {
    musicResults.replaceChildren();
    const message = document.createElement('div');
    message.className = 'empty-music';
    message.textContent = error.message;
    musicResults.append(message);
    musicStatus.textContent = '검색을 완료하지 못했어요.';
  }
});

function selectMusicVideo(item) {
  if (!/^[a-zA-Z0-9_-]{6,}$/.test(item.videoId)) return;
  selectedVideoId = item.videoId;
  const player = document.querySelector('#music-player');
  player.classList.remove('hidden');
  const frame = document.querySelector('#player-frame');
  frame.replaceChildren();
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(item.videoId)}`;
  iframe.title = item.title;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.allowFullscreen = true;
  frame.append(iframe);
  const external = document.querySelector('#youtube-link');
  external.href = `https://www.youtube.com/watch?v=${encodeURIComponent(item.videoId)}`;
  const memo = document.querySelector('#listening-note');
  memo.value = listeningNotes[selectedVideoId] || '';
  document.querySelectorAll('.music-result-card').forEach(card => card.classList.remove('selected'));
  [...document.querySelectorAll('.music-result-card')].find(card => card.querySelector('strong')?.textContent === item.title)?.classList.add('selected');
}

document.querySelector('#save-listening-note').addEventListener('click', () => {
  if (!selectedVideoId) {
    document.querySelector('#note-saved').textContent = '먼저 검색 결과에서 영상을 선택해 주세요.';
    return;
  }
  listeningNotes[selectedVideoId] = document.querySelector('#listening-note').value;
  localStorage.setItem('haru-listening-notes', JSON.stringify(listeningNotes));
  document.querySelector('#note-saved').textContent = '이 영상의 듣기 메모를 저장했어요.';
});

document.querySelector('#music-link-form').addEventListener('submit', event => {
  event.preventDefault();
  const raw = document.querySelector('#youtube-url').value.trim();
  let parsed;
  try { parsed = new URL(raw); } catch { parsed = null; }
  const allowedHosts = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be', 'www.youtu.be', 'youtube-nocookie.com', 'www.youtube-nocookie.com']);
  if (!parsed || !allowedHosts.has(parsed.hostname.toLowerCase())) {
    document.querySelector('#music-status').textContent = 'youtube.com 또는 youtu.be 영상 링크를 붙여넣어 주세요.';
    return;
  }
  const parts = parsed.pathname.split('/').filter(Boolean);
  const videoId = parsed.hostname.includes('youtu.be')
    ? parts[0]
    : parsed.searchParams.get('v') || (['embed', 'shorts', 'live'].includes(parts[0]) ? parts[1] : null);
  if (!videoId || !/^[a-zA-Z0-9_-]{6,}$/.test(videoId)) {
    document.querySelector('#music-status').textContent = '영상 ID를 찾지 못했어요. 일반 YouTube 영상 링크를 확인해 주세요.';
    return;
  }
  selectMusicVideo({ videoId, title: '선택한 YouTube 영상', channelTitle: '' });
  document.querySelector('#music-status').textContent = '영상을 연결했어요. 듣기 연습을 시작해보세요.';
});

let deferredInstallPrompt = null;
const installButton = document.querySelector('#install-app');
installButton.addEventListener('click', async () => {
  if (!deferredInstallPrompt) {
    const isAppleMobile = /iPhone|iPad|iPod/.test(navigator.userAgent);
    window.alert(isAppleMobile
      ? 'Safari의 공유 버튼을 누른 뒤 “홈 화면에 추가”를 선택해 주세요.'
      : '브라우저 메뉴에서 “앱 설치” 또는 “홈 화면에 추가”를 선택해 주세요. HTTPS 또는 localhost에서 사용할 수 있습니다.');
    return;
  }
  deferredInstallPrompt.prompt();
  const choice = await deferredInstallPrompt.userChoice;
  if (choice.outcome === 'accepted') installButton.classList.add('hidden');
  deferredInstallPrompt = null;
});
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  deferredInstallPrompt = event;
});
window.addEventListener('appinstalled', () => installButton.classList.add('hidden'));

if ('serviceWorker' in navigator && (location.protocol === 'https:' || ['localhost', '127.0.0.1'].includes(location.hostname))) {
  window.addEventListener('load', () => navigator.serviceWorker.register(new URL('sw.js', location.href)).catch(error => console.warn('Offline support could not be enabled.', error)));
}
updateProgress();
