(() => {
  'use strict';

  const STORAGE_KEY = 'foshou_app_a_v1';
  const DAILY_GOAL = 8;
  const MAX_DAYS_KEEP = 90;

  const EXPRESSIONS = {
    base: '../assets/expressions/base.png',
    happy: '../assets/expressions/happy.png',
    proud: '../assets/expressions/proud.png',
    sad: '../assets/expressions/sad.png',
    surprised: '../assets/expressions/surprised.png',
  };

  // Quick 1-tap drink flavor chips
  const FLAVORS = [
    { id: 'citron', emoji: '🍋', zh: '佛手茶', ko: '불수감차' },
    { id: 'water', emoji: '💧', zh: '温白水', ko: '따뜻한 물' },
    { id: 'green', emoji: '🍵', zh: '清香绿茶', ko: '녹차' },
    { id: 'osmanthus', emoji: '🌼', zh: '桂花茶', ko: '계화차' },
    { id: 'mint', emoji: '🌿', zh: '薄荷水', ko: '민트차' },
  ];

  // All UI Strings centralized in TEXT = { key: { ko, zh } }
  const TEXT = {
    backRoom: { zh: '我的房间', ko: '내 방' },
    installPwa: { zh: '安装主屏', ko: '홈 추가' },
    appTitle: { zh: '佛手喝茶记', ko: '불수 차일기' },
    appSubtitle: {
      zh: '每天 8 杯温茶，陪佛小柑慢慢水润起来',
      ko: '하루 8잔 따뜻한 차, 불소감과 촉촉해지기',
    },
    cupsUnit: { zh: '杯温茶', ko: '잔' },
    cupsShort: { zh: '杯', ko: '잔' },
    daysUnit: { zh: '天', ko: '일' },
    firstCupBtn: { zh: '喝今天的第一杯温茶', ko: '오늘 첫 잔 마시기' },
    drinkOneBtn: { zh: '+1 杯温茶', ko: '+1잔 마시기' },
    drinkMoreBtn: { zh: '再来一杯润润喉', ko: '한 잔 더 마시기' },
    minusOneBtn: { zh: '-1 杯', ko: '-1잔' },
    notePlaceholder: {
      zh: '可选：记一句此刻心情或茶名（60字内）',
      ko: '선택: 지금 기분이나 차 이름 한 줄 (60자 이내)',
    },
    streakLabel: { zh: '连续陪伴', ko: '연속 기록' },
    levelLabel: { zh: '茶香等级', ko: '차향 레벨' },
    totalLabel: { zh: '累计喝茶', ko: '누적 잔수' },
    collectionTitle: { zh: '茶席收藏箱', ko: '다기 수집함' },
    collectionDesc: {
      zh: '每天喝满 8 杯解锁 1 件茶席小物，点击已解锁道具可听佛小柑悄悄话',
      ko: '하루 8잔 채우면 다기 소품 해금! 해금된 소품을 눌러 이야기를 들어 봐요',
    },
    weekTitle: { zh: '近 7 天', ko: '최근 7일' },
    monthTitle: { zh: '本月茶历', ko: '월간 달력' },
    calLegend: { zh: '🍵 打卡 · ⭐ 满8杯', ko: '🍵 기록 · ⭐ 8잔 달성' },
    saveCardBtn: { zh: '存结果图', ko: '결과 카드' },
    todayLogTitle: { zh: '今日记录', ko: '오늘의 기록' },
    backToday: { zh: '回今天', ko: '오늘로' },
    emptyLog: {
      zh: '这一天还没有记录，点上面按钮喝第一口吧～',
      ko: '아직 기록이 없어요. 위 버튼으로 첫 잔을 시작해 봐요~',
    },
    privacyNote: {
      zh: '🔒 记录只保存在这台手机里',
      ko: '🔒 기록은 이 폰에만 저장돼요',
    },
    replayIntro: { zh: '重看佛小柑自我介绍', ko: '불소감 소개 다시 보기' },
    prevCard: { zh: '上一张', ko: '이전' },
    nextCard: { zh: '下一张', ko: '다음' },
    startNow: { zh: '开始泡茶！', ko: '시작하기!' },
    hydrationDry: { zh: '有点干巴巴 (0–2杯)', ko: '살짝 목말라요 (0–2잔)' },
    hydrationNormal: { zh: '渐渐润起来 (3–5杯)', ko: '보통 · 촉촉 중 (3–5잔)' },
    hydrationGlow: { zh: '水润金黄透亮 (6–8杯)', ko: '촉촉 반짝! (6–8잔)' },
    defaultCupNote: { zh: '温温的一杯茶', ko: '따뜻한 차 한 잔' },
    cardSaved: { zh: '结果卡已保存！', ko: '결과 카드가 저장되었어요!' },
    propUnlockedToast: {
      zh: '佛小柑送了新茶具：',
      ko: '불소감이 새 소품을 선물했어요: ',
    },
    undoMsg: {
      zh: '没关系，我帮你把刚才那一杯收起来啦。',
      ko: '괜찮아, 방금 한 잔은 살짝 빼 두었어.',
    },
    characterName: { zh: '佛小柑', ko: '불소감' },
    cardStreakLine: { zh: '连续陪伴', ko: '연속 기록' },
    ariaSound: { zh: '音效开关', ko: '효과음 켜기/끄기' },
    ariaLang: { zh: '切换韩语/中文', ko: '언어 전환' },
    ariaPat: { zh: '轻拍佛小柑', ko: '불소감 쓰다듬기' },
  };

  const LEVELS = [
    { min: 0, zh: 'Lv.1 新芽', ko: 'Lv.1 새싹' },
    { min: 8, zh: 'Lv.2 清香', ko: 'Lv.2 은은향' },
    { min: 24, zh: 'Lv.3 温润', ko: 'Lv.3 포근차' },
    { min: 56, zh: 'Lv.4 金佛手', ko: 'Lv.4 황금불수' },
  ];

  const TEA_PROPS = [
    {
      id: 'citron_slice',
      emoji: '🍋',
      zh: '金佛手干片',
      ko: '건조 불수감',
      lore: {
        zh: '「这是晒过秋阳的金佛手干片，泡水时清香四溢，超润喉！」',
        ko: '“가을 햇볕에 잘 말린 불수감 조각이야. 물에 띄우면 향이 끝내줘!”',
      },
    },
    {
      id: 'celadon_cup',
      emoji: '🍵',
      zh: '青瓷品茗杯',
      ko: '청자 찻잔',
      lore: {
        zh: '「青瓷杯能把温茶保温得刚刚好，捧在手心暖暖的～」',
        ko: '“청자 찻잔은 차를 딱 알맞은 온도로 포근하게 지켜 줘~”',
      },
    },
    {
      id: 'bamboo_scoop',
      emoji: '🎋',
      zh: '竹制茶匙',
      ko: '대나무 차시',
      lore: {
        zh: '「用小竹匙舀一勺茶叶，听着沙沙声心就安静下来啦。」',
        ko: '“대나무 차시로 찻잎을 덜 때 나는 사각사각 소리가 참 좋아.”',
      },
    },
    {
      id: 'tea_pot',
      emoji: '🫖',
      zh: '暖心白瓷壶',
      ko: '백자 주전자',
      lore: {
        zh: '「我最宝贝的白瓷壶！随时都在给你温着一壶好茶哦。」',
        ko: '“내가 제일 아끼는 백자 주전자! 언제든 네 몫을 데워 두고 있어.”',
      },
    },
    {
      id: 'mint_leaf',
      emoji: '🌿',
      zh: '鲜嫩薄荷叶',
      ko: '싱그러운 민트',
      lore: {
        zh: '「午后犯困时丢两片小薄荷，整个人都清清爽爽的！」',
        ko: '“오후에 졸릴 때 민트 잎 두 장 띄우면 머리가 맑아져!”',
      },
    },
    {
      id: 'osmanthus',
      emoji: '🌼',
      zh: '金秋桂花蜜',
      ko: '계화 꿀단지',
      lore: {
        zh: '「甜甜的桂花蜜配佛手茶，是佛小柑最喜欢的限定下午茶！」',
        ko: '“달콤한 계화 꿀과 불수감 차 조합은 불소감의 최애 티타임이야!”',
      },
    },
  ];

  const INTRO_CARDS = [
    {
      expr: 'surprised',
      title: { zh: '你好呀，我是佛小柑！', ko: '안녕, 나는 불소감이야!' },
      body: {
        zh: '我是一只爱泡佛手柑温茶的小茶灵，以后每天都住在你的手机主屏上陪你润润喉。',
        ko: '나는 따뜻한 불수감 차를 좋아하는 작은 친구야. 매일 네 폰 화면에서 함께할게.',
      },
    },
    {
      expr: 'happy',
      title: { zh: '10 秒记一杯，越喝越水润', ko: '10초면 한 잔 기록 끝!' },
      body: {
        zh: '选个快捷茶签或直接点 [+1 杯温茶]，茶汤波浪就会升起来，我也会变得金黄透亮哦。',
        ko: '버튼을 누를 때마다 화면 속 차 물결이 차오르고, 나도 점점 촉촉하게 반짝거려.',
      },
    },
    {
      expr: 'proud',
      title: { zh: '绝不扣分，也没有负罪感', ko: '벌점도, 죄책감도 없어' },
      body: {
        zh: '忙起来忘喝水也没关系，我永远不会离开。喝满 8 杯还会送你一件茶席小道具！',
        ko: '바빠서 못 마신 날도 괜찮아. 8잔을 채우면 내 다기 소품을 하나씩 선물할게!',
      },
    },
  ];

  const REACTIONS = {
    recorded: {
      expr: 'happy',
      anim: 'anim-bounce',
      lines: {
        zh: [
          '嗯～热乎乎的一杯下肚，喉咙舒服多啦！',
          '今天也乖乖记下来了，茶香又浓了一点呢～',
          '慢慢喝别烫着，佛小柑陪你一起润一润！',
          '好棒呀，这杯温茶让我都更有精神了！',
          '咕噜咕噜～又给身体加满一点温柔水分啦。',
        ],
        ko: [
          '음~ 따뜻한 한 잔 덕분에 목이 편안해졌어!',
          '오늘도 차곡차곡 기록했네, 차향이 더 깊어졌어~',
          '천천히 식혀서 마셔, 불소감이 옆에서 함께할게!',
          '잘했어! 방금 한 잔으로 나도 촉촉해진 기분이야.',
          '꿀꺽꿀꺽~ 오늘도 내 몸을 다정하게 챙겼구나.',
        ],
      },
    },
    completed: {
      expr: 'proud',
      anim: 'anim-jump',
      celebrate: true,
      lines: {
        zh: [
          '哇！8 杯全满啦！我就知道你一定行，送你一件小茶具！',
          '今天的茶汤金黄透亮，你把自己照顾得真好呀！',
          '满分水润达成！佛小柑为你鼓掌跳起来啦～',
          '八杯温茶圆满收官，今晚一定会睡得香香的！',
          '太厉害了！连我的佛手瓣都跟着发亮了呢！',
        ],
        ko: [
          '와! 8잔 다 채웠어! 역시 해낼 줄 알았어, 선물 받아줘!',
          '오늘 차빛이 반짝반짝해! 스스로를 정말 잘 챙겼구나.',
          '촉촉 목표 달성! 불소감이 신나서 폴짝 뛰고 있어~',
          '여덟 잔 모두 완료! 오늘 밤은 포근하게 푹 잘 수 있을 거야.',
          '대단해! 내 불수감 옷까지 금빛으로 빛나는 것 같아!',
        ],
      },
    },
    missed_day: {
      expr: 'sad',
      anim: '',
      lines: {
        zh: [
          '昨天是不是有点忙呀？没关系，现在喝一口也刚刚好。',
          '昨天没见到你有点想你，别自责，先润润喉吧～',
          '漏掉一天完全没关系，我的茶壶一直给你温着呢。',
          '辛苦啦～昨天忙完，今天就从这一杯温柔开始吧。',
          '不扣分也不着急，你能回来喝茶我就很开心啦。',
        ],
        ko: [
          '어제는 많이 바빴나 봐? 괜찮아, 지금 한 모금이면 충분해.',
          '어제 못 봐서 살짝 걱정했어. 탓하지 않을게, 차 한 잔부터!',
          '하루 빠져도 전혀 괜찮아, 주전자는 계속 따뜻하게 데워 뒀어.',
          '어제 수고 많았지? 오늘은 이 한 잔으로 부드럽게 시작하자.',
          '벌점 같은 건 없어. 다시 와 준 것만으로도 고마워.',
        ],
      },
    },
    long_time_no_see: {
      expr: 'surprised',
      anim: 'anim-wave',
      lines: {
        zh: [
          '呀！好久不见！快坐下，我刚泡好一壶暖暖的佛手茶！',
          '欢迎回来～隔了几天再见面，茶香还是为你留着哦！',
          '哇是你呀！挥挥小手，今天重新一起喝一杯吧～',
          '好久不见啦！不管隔了几天，茶桌永远留着你的位置。',
          '终于等到你回来！先喝口温水歇歇脚吧～',
        ],
        ko: [
          '앗! 오랜만이야! 어서 앉아, 방금 따뜻한 불수감 차 우렸어!',
          '다시 와 줘서 정말 반가워~ 며칠 만이어도 찻자리는 그대로야!',
          '와, 너구나! 손 흔들며 기다렸어, 오늘 다시 한 잔부터 시작하자~',
          '오랜만이야! 며칠 쉬어도 괜찮아, 언제든 편하게 들러 줘.',
          '드디어 만났네! 따뜻한 물 한 모금 마시고 잠깐 쉬어가자~',
        ],
      },
    },
    first_time: {
      expr: 'surprised',
      anim: 'anim-wave',
      lines: {
        zh: ['点一下大按钮，一起喝今天的第一杯温茶吧～'],
        ko: ['큰 버튼을 눌러 오늘 첫 따뜻한 차를 함께 마셔요~'],
      },
    },
    pet: {
      expr: 'happy',
      anim: 'anim-bounce',
      lines: {
        zh: [
          '嘻嘻～轻拍佛小柑，祝你今天顺顺当当！',
          '暖暖的茶香分你一半，深呼吸放松一下吧～',
          '别忘了偶尔抬头看看窗外，顺便抿一口温水哦！',
        ],
        ko: [
          '히히~ 쓰다듬어 줘서 고마워, 오늘도 좋은 하루 보내!',
          '따뜻한 차향 나눠 줄게, 잠깐 숨 돌리고 가자~',
          '가끔 창밖도 보면서 따뜻한 물 한 모금 잊지 마!',
        ],
      },
    },
  };

  // Gentle Web Audio water-drop / tea chime SFX
  let audioCtx = null;
  function playWaterDrop(isCelebrate = false) {
    if (state.muted) return;
    try {
      if (!audioCtx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) audioCtx = new AC();
      }
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});

      const now = audioCtx.currentTime;
      const playNote = (f1, f2, delay, dur) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f1, now + delay);
        osc.frequency.exponentialRampToValueAtTime(f2, now + delay + dur);
        gain.gain.setValueAtTime(0.001, now + delay);
        gain.gain.linearRampToValueAtTime(0.11, now + delay + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + dur);
      };

      if (isCelebrate) {
        playNote(523.25, 659.25, 0, 0.14);
        playNote(659.25, 783.99, 0.1, 0.16);
        playNote(783.99, 1046.5, 0.2, 0.24);
      } else {
        playNote(480, 820, 0, 0.11);
      }
    } catch {
      // ignore
    }
  }

  // Date helpers
  function getLocalDateKey(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function diffDays(dateStrA, dateStrB) {
    const [ya, ma, da] = dateStrA.split('-').map(Number);
    const [yb, mb, db] = dateStrB.split('-').map(Number);
    return Math.round((Date.UTC(yb, mb - 1, db) - Date.UTC(ya, ma - 1, da)) / 86400000);
  }

  function formatTimeHHMM(date = new Date()) {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  }

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Storage
  function defaultState() {
    return {
      lang: 'zh',
      muted: false,
      seenIntro: false,
      days: {},
      unlockedProps: [],
      lastVisitDate: null,
    };
  }

  function loadState() {
    let sharedLang = null;
    try {
      const rl = localStorage.getItem('foshou_room_lang');
      if (rl === 'ko' || rl === 'zh') sharedLang = rl;
    } catch {
      // ignore
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...defaultState(), lang: sharedLang || 'zh' };
      const parsed = JSON.parse(raw);
      return {
        ...defaultState(),
        ...parsed,
        lang: sharedLang || (parsed.lang === 'ko' ? 'ko' : 'zh'),
        days: parsed && typeof parsed.days === 'object' && parsed.days ? parsed.days : {},
        unlockedProps: Array.isArray(parsed.unlockedProps) ? parsed.unlockedProps : [],
      };
    } catch {
      return { ...defaultState(), lang: sharedLang || 'zh' };
    }
  }

  function pruneOldDays(daysObj) {
    const keys = Object.keys(daysObj).sort();
    if (keys.length <= MAX_DAYS_KEEP) return daysObj;
    const next = {};
    for (const k of keys.slice(keys.length - MAX_DAYS_KEEP)) next[k] = daysObj[k];
    return next;
  }

  function saveState() {
    try {
      state.days = pruneOldDays(state.days);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }

  let state = loadState();
  let currentDateKey = getLocalDateKey();
  let selectedLogDateKey = currentDateKey;
  let historyMode = 'week'; // 'week' | 'month'
  let selectedFlavorId = null;
  let activeReaction = { situation: 'first_time', expr: 'base', text: '' };
  let introStep = 0;
  let deferredInstallPrompt = null;

  function t(key) {
    const entry = TEXT[key];
    return entry ? entry[state.lang] || entry.zh : key;
  }

  function getTodayRecord() {
    if (!state.days[currentDateKey]) {
      state.days[currentDateKey] = { cups: 0, logs: [], rewarded: false };
    }
    return state.days[currentDateKey];
  }

  function getTotalCups() {
    return Object.values(state.days).reduce((sum, d) => sum + (Number(d.cups) || 0), 0);
  }

  function getStreak() {
    let streak = 0;
    const cursor = new Date();
    const todayKey = getLocalDateKey(cursor);
    if ((state.days[todayKey]?.cups || 0) === 0) {
      cursor.setDate(cursor.getDate() - 1);
    }
    while ((state.days[getLocalDateKey(cursor)]?.cups || 0) > 0) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }

  function getLevel(totalCups) {
    let cur = LEVELS[0];
    for (const lv of LEVELS) {
      if (totalCups >= lv.min) cur = lv;
    }
    return cur[state.lang];
  }

  function getHydrationState(cups) {
    if (cups <= 2) return { expr: 'sad', label: t('hydrationDry') };
    if (cups <= 5) return { expr: 'happy', label: t('hydrationNormal') };
    return { expr: 'proud', label: t('hydrationGlow') };
  }

  // DOM refs
  const els = {
    stageCard: document.getElementById('stageCard'),
    langToggle: document.getElementById('langToggle'),
    soundToggle: document.getElementById('soundToggle'),
    installBtn: document.getElementById('installBtn'),
    todayDateBadge: document.getElementById('todayDateBadge'),
    teaWaveWrap: document.getElementById('teaWaveWrap'),
    teaFill: document.getElementById('teaFill'),
    speechText: document.getElementById('speechText'),
    charTapBtn: document.getElementById('charTapBtn'),
    characterImg: document.getElementById('characterImg'),
    starBurst: document.getElementById('starBurst'),
    hydrationPill: document.getElementById('hydrationPill'),
    cupCount: document.getElementById('cupCount'),
    cupDots: document.getElementById('cupDots'),
    flavorRow: document.getElementById('flavorRow'),
    noteRow: document.getElementById('noteRow'),
    noteInput: document.getElementById('noteInput'),
    addCupBtn: document.getElementById('addCupBtn'),
    addCupLabel: document.getElementById('addCupLabel'),
    minusCupBtn: document.getElementById('minusCupBtn'),
    streakNum: document.getElementById('streakNum'),
    levelName: document.getElementById('levelName'),
    totalCupsNum: document.getElementById('totalCupsNum'),
    collectionCount: document.getElementById('collectionCount'),
    propsGrid: document.getElementById('propsGrid'),
    tabWeekBtn: document.getElementById('tabWeekBtn'),
    tabMonthBtn: document.getElementById('tabMonthBtn'),
    weekChart: document.getElementById('weekChart'),
    monthCalWrap: document.getElementById('monthCalWrap'),
    calMonthLabel: document.getElementById('calMonthLabel'),
    calWeekdays: document.getElementById('calWeekdays'),
    calGrid: document.getElementById('calGrid'),
    logHeading: document.getElementById('logHeading'),
    backTodayLogBtn: document.getElementById('backTodayLogBtn'),
    todayLogList: document.getElementById('todayLogList'),
    saveCardBtn: document.getElementById('saveCardBtn'),
    replayIntroBtn: document.getElementById('replayIntroBtn'),
    introModal: document.getElementById('introModal'),
    introDots: document.getElementById('introDots'),
    introImg: document.getElementById('introImg'),
    introTitle: document.getElementById('introTitle'),
    introBody: document.getElementById('introBody'),
    introPrevBtn: document.getElementById('introPrevBtn'),
    introNextBtn: document.getElementById('introNextBtn'),
    toast: document.getElementById('toast'),
  };

  let toastTimer = null;
  function showToast(msg) {
    els.toast.textContent = msg;
    els.toast.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.add('hidden'), 2600);
  }

  // Centralized react() function (PDF p.31 P27)
  function react(situation, customText, options = {}) {
    const rule = REACTIONS[situation];
    if (!rule) return;

    const line = customText || pickRandom(rule.lines[state.lang] || rule.lines.zh);
    activeReaction = { situation, expr: rule.expr, text: line };

    els.characterImg.src = EXPRESSIONS[rule.expr] || EXPRESSIONS.base;
    els.speechText.textContent = line;

    if (options.silent) return;

    els.characterImg.classList.remove('anim-bounce', 'anim-jump', 'anim-wave');
    void els.characterImg.offsetWidth;
    if (rule.anim) els.characterImg.classList.add(rule.anim);

    if (rule.celebrate) {
      els.starBurst.classList.remove('active');
      void els.starBurst.offsetWidth;
      els.starBurst.classList.add('active');
    }
  }

  function detectInitialReaction() {
    const todayRec = getTodayRecord();
    const recordedDates = Object.keys(state.days)
      .filter((k) => (state.days[k]?.cups || 0) > 0 && k < currentDateKey)
      .sort();

    if (recordedDates.length === 0 && todayRec.cups === 0) {
      react('first_time');
      return;
    }

    if (todayRec.cups >= DAILY_GOAL) {
      react('completed', null, { silent: true });
      return;
    }

    if (todayRec.cups > 0) {
      const hyd = getHydrationState(todayRec.cups);
      activeReaction = {
        situation: 'recorded',
        expr: hyd.expr,
        text: pickRandom(REACTIONS.recorded.lines[state.lang]),
      };
      els.characterImg.src = EXPRESSIONS[hyd.expr];
      els.speechText.textContent = activeReaction.text;
      return;
    }

    const lastRecDate = recordedDates[recordedDates.length - 1];
    const gap = diffDays(lastRecDate, currentDateKey);
    if (gap >= 3) react('long_time_no_see');
    else if (gap === 2) react('missed_day');
    else react('first_time');
  }

  function applyStaticI18n() {
    document.documentElement.lang = state.lang === 'ko' ? 'ko' : 'zh-CN';
    document.title = state.lang === 'ko' ? '불수 차일기 · 佛手喝茶记' : '佛手喝茶记 · 불수 차일기';
    els.langToggle.textContent = state.lang === 'ko' ? '中文' : '한국어';
    els.soundToggle.textContent = state.muted ? '🔇' : '🔊';

    document.querySelectorAll('[data-i18n]').forEach((node) => {
      node.textContent = t(node.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
      node.setAttribute('placeholder', t(node.getAttribute('data-i18n-placeholder')));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((node) => {
      node.setAttribute('aria-label', t(node.getAttribute('data-i18n-aria')));
    });
  }

  function renderFlavors() {
    els.flavorRow.innerHTML = '';
    FLAVORS.forEach((fl) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `flavor-chip${selectedFlavorId === fl.id ? ' selected' : ''}`;
      btn.textContent = `${fl.emoji} ${fl[state.lang]}`;
      btn.addEventListener('click', () => {
        selectedFlavorId = selectedFlavorId === fl.id ? null : fl.id;
        renderFlavors();
      });
      els.flavorRow.appendChild(btn);
    });
  }

  function renderMonthCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    els.calMonthLabel.textContent =
      state.lang === 'ko' ? `${year}년 ${month + 1}월` : `${year} 年 ${month + 1} 月`;

    const weekdays =
      state.lang === 'ko'
        ? ['일', '월', '화', '수', '목', '금', '토']
        : ['日', '一', '二', '三', '四', '五', '六'];
    els.calWeekdays.innerHTML = weekdays.map((w) => `<span>${w}</span>`).join('');

    els.calGrid.innerHTML = '';
    for (let i = 0; i < firstDay; i++) {
      const blank = document.createElement('div');
      blank.className = 'cal-cell blank';
      els.calGrid.appendChild(blank);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const cups = state.days[key]?.cups || 0;
      const btn = document.createElement('button');
      btn.type = 'button';
      const classes = ['cal-cell'];
      if (cups >= DAILY_GOAL) classes.push('goal-met');
      else if (cups > 0) classes.push('has-cups');
      if (key === currentDateKey) classes.push('today');
      if (key === selectedLogDateKey) classes.push('selected');
      btn.className = classes.join(' ');
      const stamp = cups >= DAILY_GOAL ? '⭐' : cups > 0 ? '🍵' : '';
      btn.innerHTML = `<span class="cal-day-num">${d}</span><span class="cal-stamp">${stamp}</span>`;
      btn.addEventListener('click', () => {
        selectedLogDateKey = key;
        render();
      });
      els.calGrid.appendChild(btn);
    }
  }

  function render() {
    applyStaticI18n();
    const todayRec = getTodayRecord();
    const cups = todayRec.cups;
    const totalCups = getTotalCups();
    const streak = getStreak();
    const isFreshEmpty = totalCups === 0 && cups === 0;

    els.todayDateBadge.textContent = currentDateKey.slice(5).replace('-', '/');

    // Rising tea wave level (0% -> 84%); pause wave animation when empty
    const pct = Math.min(cups / DAILY_GOAL, 1) * 84;
    els.teaFill.style.height = `${pct}%`;
    if (els.teaWaveWrap) els.teaWaveWrap.classList.toggle('is-empty', cups <= 0);

    const hyd = getHydrationState(cups);
    els.hydrationPill.textContent = hyd.label;

    // Cup count & 8 teacup icons
    els.cupCount.textContent = String(cups);
    els.cupDots.innerHTML = '';
    for (let i = 0; i < DAILY_GOAL; i++) {
      const dot = document.createElement('span');
      dot.className = `cup-dot${i < cups ? ' filled' : ''}`;
      dot.textContent = i < cups ? '🍵' : '·';
      els.cupDots.appendChild(dot);
    }

    if (isFreshEmpty) {
      els.flavorRow.classList.add('hidden');
      els.noteRow.classList.add('hidden');
      els.minusCupBtn.classList.add('hidden');
      els.addCupLabel.textContent = t('firstCupBtn');
    } else {
      els.flavorRow.classList.remove('hidden');
      els.noteRow.classList.remove('hidden');
      els.minusCupBtn.classList.toggle('hidden', cups <= 0);
      els.addCupLabel.textContent = cups >= DAILY_GOAL ? t('drinkMoreBtn') : t('drinkOneBtn');
      renderFlavors();
    }

    // Stats
    els.streakNum.textContent = String(streak);
    els.levelName.textContent = getLevel(totalCups);
    els.totalCupsNum.textContent = String(totalCups);

    // Interactive Collection Props
    els.collectionCount.textContent = `${state.unlockedProps.length} / ${TEA_PROPS.length}`;
    els.propsGrid.innerHTML = '';
    TEA_PROPS.forEach((prop) => {
      const unlocked = state.unlockedProps.includes(prop.id);
      const item = document.createElement('button');
      item.type = 'button';
      item.className = `prop-item${unlocked ? '' : ' locked'}`;
      item.disabled = !unlocked;
      item.innerHTML = `
        <span class="prop-emoji" aria-hidden="true">${unlocked ? prop.emoji : '❓'}</span>
        <span class="prop-name">${unlocked ? prop[state.lang] : '???'}</span>
      `;
      if (unlocked) {
        item.addEventListener('click', () => {
          playWaterDrop(false);
          react('recorded', prop.lore[state.lang]);
          els.stageCard?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
      }
      els.propsGrid.appendChild(item);
    });

    // History view toggle
    els.tabWeekBtn.classList.toggle('active', historyMode === 'week');
    els.tabWeekBtn.setAttribute('aria-selected', String(historyMode === 'week'));
    els.tabMonthBtn.classList.toggle('active', historyMode === 'month');
    els.tabMonthBtn.setAttribute('aria-selected', String(historyMode === 'month'));
    els.weekChart.classList.toggle('hidden', historyMode !== 'week');
    els.monthCalWrap.classList.toggle('hidden', historyMode !== 'month');

    // 7-day bar chart (clickable days!)
    els.weekChart.innerHTML = '';
    const weekdayNames =
      state.lang === 'ko'
        ? ['일', '월', '화', '수', '목', '금', '토']
        : ['日', '一', '二', '三', '四', '五', '六'];
    for (let offset = 6; offset >= 0; offset--) {
      const d = new Date();
      d.setDate(d.getDate() - offset);
      const key = getLocalDateKey(d);
      const count = state.days[key]?.cups || 0;
      const heightPct = Math.min(count / DAILY_GOAL, 1) * 100;
      const col = document.createElement('div');
      col.className = `bar-col${offset === 0 ? ' today' : ''}${key === selectedLogDateKey ? ' selected' : ''}`;
      col.innerHTML = `
        <span class="bar-num">${count}</span>
        <div class="bar-track">
          <div class="bar-fill${count >= DAILY_GOAL ? ' goal-met' : ''}" style="height:${heightPct}%"></div>
        </div>
        <span class="bar-day">${weekdayNames[d.getDay()]}</span>
      `;
      col.addEventListener('click', () => {
        selectedLogDateKey = key;
        render();
      });
      els.weekChart.appendChild(col);
    }

    if (historyMode === 'month') {
      renderMonthCalendar();
    }

    // Selected Day Log
    const viewRec = state.days[selectedLogDateKey] || { cups: 0, logs: [] };
    const isViewingToday = selectedLogDateKey === currentDateKey;
    els.backTodayLogBtn.classList.toggle('hidden', isViewingToday);
    els.logHeading.textContent = isViewingToday
      ? t('todayLogTitle')
      : `${selectedLogDateKey.slice(5)} (${viewRec.cups} ${t('cupsShort')})`;

    els.todayLogList.innerHTML = '';
    if (!viewRec.logs || viewRec.logs.length === 0) {
      const li = document.createElement('li');
      li.className = 'log-item';
      li.textContent = t('emptyLog');
      els.todayLogList.appendChild(li);
    } else {
      viewRec.logs.forEach((entry) => {
        const li = document.createElement('li');
        li.className = 'log-item';
        const timeSpan = document.createElement('span');
        timeSpan.className = 'log-time';
        timeSpan.textContent = entry.time;
        const textSpan = document.createElement('span');
        textSpan.className = 'log-text';
        textSpan.textContent = formatLogEntryNote(entry);
        li.appendChild(timeSpan);
        li.appendChild(textSpan);
        els.todayLogList.appendChild(li);
      });
    }
  }

  function formatLogEntryNote(entry) {
    if (entry.flavorId) {
      const fl = FLAVORS.find((f) => f.id === entry.flavorId);
      const prefix = fl ? `${fl.emoji} ${fl[state.lang]}` : '';
      return [prefix, entry.note].filter(Boolean).join(' · ') || t('defaultCupNote');
    }
    // Backward compatibility: dynamically translate legacy preset flavor labels
    let raw = entry.note || '';
    if (!raw) return t('defaultCupNote');
    for (const fl of FLAVORS) {
      const zhLabel = `${fl.emoji} ${fl.zh}`;
      const koLabel = `${fl.emoji} ${fl.ko}`;
      const target = `${fl.emoji} ${fl[state.lang]}`;
      if (raw === zhLabel || raw === koLabel) return target;
      if (raw.startsWith(`${zhLabel} · `)) return target + raw.slice(zhLabel.length);
      if (raw.startsWith(`${koLabel} · `)) return target + raw.slice(koLabel.length);
    }
    return raw;
  }

  // Actions
  function handleAddCup() {
    checkDateRollover();
    selectedLogDateKey = currentDateKey;
    const todayRec = getTodayRecord();
    const typed = (els.noteInput.value || '').trim().slice(0, 60);

    todayRec.cups += 1;
    todayRec.logs.unshift({
      time: formatTimeHHMM(),
      flavorId: selectedFlavorId || null,
      note: typed,
    });
    els.noteInput.value = '';
    selectedFlavorId = null;
    state.lastVisitDate = currentDateKey;

    if (todayRec.cups === DAILY_GOAL) {
      playWaterDrop(true);
      react('completed');
      if (!todayRec.rewarded) {
        todayRec.rewarded = true;
        const locked = TEA_PROPS.filter((p) => !state.unlockedProps.includes(p.id));
        if (locked.length > 0) {
          const gift = locked[0];
          state.unlockedProps.push(gift.id);
          showToast(`${t('propUnlockedToast')}${gift.emoji} ${gift[state.lang]}`);
        }
      }
    } else if (todayRec.cups > DAILY_GOAL) {
      playWaterDrop(true);
      react('completed');
    } else {
      playWaterDrop(false);
      react('recorded');
      if (todayRec.cups >= 6) {
        els.characterImg.src = EXPRESSIONS.proud;
        activeReaction.expr = 'proud';
      } else {
        els.characterImg.src = EXPRESSIONS.happy;
        activeReaction.expr = 'happy';
      }
    }

    saveState();
    render();
  }

  function handleMinusCup() {
    checkDateRollover();
    selectedLogDateKey = currentDateKey;
    const todayRec = getTodayRecord();
    if (todayRec.cups <= 0) return;
    todayRec.cups -= 1;
    if (todayRec.logs.length > 0) todayRec.logs.shift();
    const hyd = getHydrationState(todayRec.cups);
    activeReaction = { situation: 'recorded', expr: hyd.expr, text: t('undoMsg') };
    els.characterImg.src = EXPRESSIONS[hyd.expr];
    els.speechText.textContent = t('undoMsg');
    saveState();
    render();
  }

  function checkDateRollover() {
    const nowKey = getLocalDateKey();
    if (nowKey !== currentDateKey) {
      currentDateKey = nowKey;
      selectedLogDateKey = nowKey;
      detectInitialReaction();
      render();
    }
  }

  // Onboarding 3 Cards
  function openIntro(step = 0) {
    introStep = step;
    renderIntroCard();
    els.introModal.classList.remove('hidden');
  }

  function renderIntroCard() {
    const card = INTRO_CARDS[introStep];
    els.introImg.src = EXPRESSIONS[card.expr];
    els.introTitle.textContent = card.title[state.lang];
    els.introBody.textContent = card.body[state.lang];
    els.introPrevBtn.classList.toggle('hidden', introStep === 0);
    els.introNextBtn.textContent =
      introStep === INTRO_CARDS.length - 1 ? t('startNow') : t('nextCard');
    Array.from(els.introDots.children).forEach((dot, idx) => {
      dot.classList.toggle('active', idx === introStep);
    });
  }

  function closeIntro() {
    state.seenIntro = true;
    saveState();
    els.introModal.classList.add('hidden');
  }

  // Export 1080x1350 Result Card via pure Canvas
  async function exportResultCard() {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');

    const bgGrad = ctx.createLinearGradient(0, 0, 0, 1350);
    bgGrad.addColorStop(0, '#FFFBF1');
    bgGrad.addColorStop(1, '#FCE5A6');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1080, 1350);

    roundRect(ctx, 72, 84, 936, 1130, 52);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#EAD7AD';
    ctx.stroke();

    const todayRec = getTodayRecord();
    const fillRatio = Math.min(todayRec.cups / DAILY_GOAL, 1);
    if (fillRatio > 0) {
      ctx.save();
      roundRect(ctx, 74, 86, 932, 1126, 50);
      ctx.clip();
      const fillH = Math.round(fillRatio * 460);
      ctx.fillStyle = 'rgba(245, 190, 63, 0.24)';
      ctx.fillRect(74, 1212 - fillH, 932, fillH);
      ctx.restore();
    }

    ctx.fillStyle = '#4F311B';
    ctx.textAlign = 'center';
    ctx.font = '800 54px "Noto Sans SC", "Noto Sans KR", sans-serif';
    ctx.fillText(t('appTitle'), 540, 180);

    ctx.fillStyle = '#7C5C43';
    ctx.font = '600 28px "Noto Sans SC", "Noto Sans KR", sans-serif';
    ctx.fillText(currentDateKey, 540, 232);

    const img = await loadImage(EXPRESSIONS[activeReaction.expr] || EXPRESSIONS.base);
    if (img) {
      const targetH = 420;
      const targetW = (img.width / img.height) * targetH;
      ctx.drawImage(img, 540 - targetW / 2, 266, targetW, targetH);
    }

    roundRect(ctx, 136, 712, 808, 128, 28);
    ctx.fillStyle = '#FFFDF7';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#EAD297';
    ctx.stroke();

    ctx.fillStyle = '#4F311B';
    ctx.font = '700 32px "Noto Sans SC", "Noto Sans KR", sans-serif';
    wrapCenterText(ctx, els.speechText.textContent || '', 540, 766, 740, 44);

    // 8 teacup dots on poster
    const startX = 250;
    for (let i = 0; i < DAILY_GOAL; i++) {
      const cx = startX + i * 82;
      ctx.beginPath();
      ctx.arc(cx, 902, 24, 0, Math.PI * 2);
      ctx.fillStyle = i < todayRec.cups ? '#F5BE3F' : '#F3EBDA';
      ctx.fill();
      if (i < todayRec.cups) {
        ctx.font = '24px sans-serif';
        ctx.fillText('🍵', cx, 910);
      }
    }

    ctx.fillStyle = '#4F311B';
    ctx.font = '800 78px "Noto Sans SC", "Noto Sans KR", sans-serif';
    ctx.fillText(`${todayRec.cups} / ${DAILY_GOAL}`, 540, 1024);

    ctx.fillStyle = '#7C5C43';
    ctx.font = '700 30px "Noto Sans SC", "Noto Sans KR", sans-serif';
    ctx.fillText(
      `${t('cardStreakLine')} ${getStreak()}${t('daysUnit')}  ·  ${getLevel(getTotalCups())}`,
      540,
      1090
    );

    ctx.fillStyle = '#7C5C43';
    ctx.font = '600 26px "Noto Sans SC", "Noto Sans KR", sans-serif';
    ctx.fillText(`${t('appTitle')} · ${t('characterName')}`, 540, 1280);

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], `foshou-tea-${currentDateKey}.png`, { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: t('appTitle') });
          return;
        } catch {
          // fallback download
        }
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `foshou-tea-${currentDateKey}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      showToast(t('cardSaved'));
    }, 'image/png');
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function wrapCenterText(ctx, text, x, y, maxWidth, lineHeight) {
    const chars = Array.from(text);
    const lines = [];
    let current = '';
    for (const ch of chars) {
      const test = current + ch;
      if (ctx.measureText(test).width > maxWidth && current) {
        lines.push(current);
        current = ch;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
    const startY = lines.length > 1 ? y - lineHeight / 3 : y + 14;
    lines.slice(0, 2).forEach((line, i) => ctx.fillText(line, x, startY + i * lineHeight));
  }

  function loadImage(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  // Event Listeners
  els.addCupBtn.addEventListener('click', handleAddCup);
  els.minusCupBtn.addEventListener('click', handleMinusCup);
  els.noteInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCup();
    }
  });

  els.charTapBtn.addEventListener('click', () => {
    playWaterDrop(false);
    react('pet');
  });

  els.soundToggle.addEventListener('click', () => {
    state.muted = !state.muted;
    saveState();
    els.soundToggle.textContent = state.muted ? '🔇' : '🔊';
  });

  els.langToggle.addEventListener('click', () => {
    state.lang = state.lang === 'zh' ? 'ko' : 'zh';
    try {
      localStorage.setItem('foshou_room_lang', state.lang);
    } catch {
      // ignore
    }
    saveState();
    const sit = activeReaction.situation || 'first_time';
    react(sit, null, { silent: true });
    render();
    if (!els.introModal.classList.contains('hidden')) {
      renderIntroCard();
    }
  });

  els.tabWeekBtn.addEventListener('click', () => {
    historyMode = 'week';
    render();
  });
  els.tabMonthBtn.addEventListener('click', () => {
    historyMode = 'month';
    render();
  });
  els.backTodayLogBtn.addEventListener('click', () => {
    selectedLogDateKey = currentDateKey;
    render();
  });

  els.saveCardBtn.addEventListener('click', exportResultCard);
  els.replayIntroBtn.addEventListener('click', () => openIntro(0));

  els.introPrevBtn.addEventListener('click', () => {
    if (introStep > 0) {
      introStep -= 1;
      renderIntroCard();
    }
  });

  els.introNextBtn.addEventListener('click', () => {
    if (introStep < INTRO_CARDS.length - 1) {
      introStep += 1;
      renderIntroCard();
    } else {
      closeIntro();
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) checkDateRollover();
  });

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    els.installBtn.classList.remove('hidden');
  });

  els.installBtn.addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    els.installBtn.classList.add('hidden');
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }

  // Init
  detectInitialReaction();
  render();
  if (!state.seenIntro) {
    openIntro(0);
  }
})();
