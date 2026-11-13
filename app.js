const kanji = [
  { char: '予', meaning: '미리 예', reading: 'ヨ', words: '予定（よてい）계획 · 予約（よやく）예약 · 予算（よさん）예산', example: '来週の予定を確認します。', hint: '予는 미리 생각해 두는 모습. 予定·予約처럼 “미리 정함”을 떠올려요.' },
  { char: '定', meaning: '정할 정', reading: 'テイ・さだ(める)', words: '決定（けってい）결정 · 安定（あんてい）안정 · 定休日（ていきゅうび）정기 휴일', example: '集合時間を決めておきましょう。', hint: '定은 정해진 자리에 머무는 지붕 모양으로 연상해요. 予定의 定도 “정하다”.' },
  { char: '変', meaning: '변할 변', reading: 'ヘン・か(わる)', words: '変更（へんこう）변경 · 大変（たいへん）큰일/힘듦 · 変化（へんか）변화', example: '予定が変わったら連絡してください。', hint: '모양이 달라지면 変化, 내용을 바꾸면 変更. “변할 변”을 중심으로 묶어요.' },
  { char: '連', meaning: '이을 련', reading: 'レン・つ(れる)', words: '連絡（れんらく）연락 · 連休（れんきゅう）연휴 · 連れて行く（つれていく）데리고 가다', example: '遅れる場合は、先に連絡します。', hint: '連絡은 소식을 이어 전하는 것. “연결해서 알린다”로 기억해요.' },
  { char: '間', meaning: '사이 간', reading: 'カン・あいだ・ま', words: '時間（じかん）시간 · 間に合う（まにあう）시간에 대다 · しばらくの間（あいだ）잠시 동안', example: '急げば、電車に間に合います。', hint: '시간의 틈에 딱 들어가면 間に合う. 기차 출발 전에 도착하는 장면을 떠올려요.' },
];
const words = [
  { jp: '予定', read: 'よてい · 요테이', ko: '예정, 계획', example: '週末の予定はもう決まりましたか。', translation: '주말 계획은 벌써 정해졌어요?', mnemonic: '予(미리) + 定(정함) = 미리 정해 둔 일정.' },
  { jp: '変更', read: 'へんこう · 헨코-', ko: '변경', example: '会議の時間が変更になりました。', translation: '회의 시간이 변경됐어요.', mnemonic: '変(변하다) + 更(고치다) = 내용을 바꾸어 고침.' },
  { jp: '間に合う', read: 'まにあう · 마니아우', ko: '시간에 대다, 늦지 않다', example: '急げば、最終電車に間に合います。', translation: '서두르면 막차 시간에 맞출 수 있어요.', mnemonic: '시간의 間(틈)에 딱 맞게 들어가다 → 늦지 않다.' },
  { jp: '連絡', read: 'れんらく · 렌라쿠', ko: '연락', example: '着いたら、私に連絡してください。', translation: '도착하면 저에게 연락해 주세요.', mnemonic: '이어(連)서 소식을 알림(絡) → 연락.' },
  { jp: '都合', read: 'つごう · 츠고-', ko: '형편, 사정, 시간 괜찮음', example: '来週の水曜日はご都合いかがですか。', translation: '다음 주 수요일은 시간 괜찮으세요?', mnemonic: '都合은 일정·사정이 서로 맞는지 묻는 말. 약속 잡을 때 자주 써요.' },
];
const expressions = [
  { jp: '予定を立てる', read: 'よていをたてる', ko: '계획을 세우다', example: '旅行の予定を立てています。', translation: '여행 계획을 세우고 있어요.', tip: '予定에는 보통 立てる(세우다)를 써요. “계획을 만들다”라는 자연스러운 짝입니다.', change: '週末の予定を立てています。 → 주말 계획을 세우고 있어요.' },
  { jp: '間に合わない', read: 'まにあわない', ko: '시간에 못 맞추다', example: '今出ないと、電車に間に合わないよ。', translation: '지금 안 나가면 전철 시간에 못 맞춰.', tip: '間に合う의 부정형. 교통편·마감 시간 등 정해진 시각에 늦는 상황에서 써요.', change: '宿題の提出に間に合わなかった。 → 숙제 제출 시간에 못 맞췄어요.' },
  { jp: '〜ことにする', read: '〜ことにする', ko: '∼하기로 하다 (자신이 결정)', example: '毎日、寝る前に単語を復習することにしました。', translation: '매일 자기 전에 단어를 복습하기로 했어요.', tip: '내가 결심하거나 선택한 결정에 써요. 결정된 규칙·상황은 ことになる와 구분해요.', change: '週末は家で勉強することにします。 → 주말에는 집에서 공부하기로 할게요.' },
  { jp: '〜ようにする', read: '〜ようにする', ko: '∼하도록 하다, 노력하다', example: '忘れないように、手帳に書くようにしています。', translation: '잊지 않도록 수첩에 적으려고 하고 있어요.', tip: '한 번의 결정보다 습관적으로 노력하는 뉘앙스예요.', change: 'できるだけ日本語で話すようにしています。 → 되도록 일본어로 말하려고 해요.' },
];
const quizQuestions = [
  { prompt: '電車に（　）ように、早く家を出た。', subtitle: '문맥에 맞는 표현을 고르세요.', answer: '間に合う', options: ['間に合う', '変更する', '連絡する', '予定する'] },
  { prompt: '会議の時間が（　）になりました。', subtitle: '“변경”을 나타내는 말은?', answer: '変更', options: ['経験', '変更', '連休', '都合'] },
  { prompt: '毎日復習する（　）しました。', subtitle: '“복습하기로 했어요”에 알맞은 표현은?', answer: 'ことに', options: ['ようで', 'ために', 'ことに', 'ところで'] },
  { prompt: '着いたら、私に（　）してください。', subtitle: '“연락해 주세요”에 알맞은 말은?', answer: '連絡', options: ['予約', '連絡', '変更', '準備'] },
];

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
  const done = Math.min(state.completed.length, 4);
  const percent = Math.round(done / 4 * 100);
  document.querySelector('#progress-ring').style.background = `conic-gradient(#8272d7 ${percent * 3.6}deg,#f0eff4 ${percent * 3.6}deg)`;
  document.querySelector('#progress-percent').textContent = `${percent}%`;
  document.querySelector('#progress-done').textContent = `${done} / 4`;
  document.querySelector('#progress-left').textContent = `${4 - done}개`;
  document.querySelector('#total-count').textContent = `${done}개`;
  document.querySelector('#streak-count').textContent = `${state.streak}일`;
  document.querySelector('#kana-task').innerHTML = state.completed.includes('kanji') ? '완료 <b>✓</b>' : '시작하기 <b>→</b>';
}
function complete(id) {
  if (!state.completed.includes(id)) state.completed.push(id);
  const date = new Date().toISOString().slice(0, 10);
  if (state.lastStudy !== date) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    state.streak = state.lastStudy === yesterday ? state.streak + 1 : 1;
    state.lastStudy = date;
  }
  save(); updateProgress();
}
const pageNames = { home: '오늘의 학습', kanji: 'N3 한자', words: 'N3 어휘', expressions: '문장·표현', quiz: '실전 퀴즈', music: 'J-pop 듣기' };
function go(page) {
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active-page'));
  document.querySelector(`#page-${page}`).classList.add('active-page');
  document.querySelectorAll('.nav-item').forEach(el => el.classList.toggle('active', el.dataset.page === page));
  document.querySelector('#crumb-title').textContent = pageNames[page];
  if (page === 'quiz') startQuiz();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
document.querySelectorAll('[data-page]').forEach(el => el.addEventListener('click', () => go(el.dataset.page)));
document.querySelectorAll('[data-go]').forEach(el => el.addEventListener('click', () => go(el.dataset.go)));

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
