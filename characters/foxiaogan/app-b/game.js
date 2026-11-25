(() => {
  'use strict';

  // Single localStorage key (PDF p.41)
  const STORAGE_KEY = 'foshou_app_b_v1';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const EXPRESSIONS = {
    base: '../assets/expressions/base.png',
    happy: '../assets/expressions/happy.png',
    proud: '../assets/expressions/proud.png',
    sad: '../assets/expressions/sad.png',
    surprised: '../assets/expressions/surprised.png',
  };

  // All UI Strings centralized in TEXT = { key: { ko, zh } } (PDF p.47 P32)
  const TEXT = {
    backRoom: { zh: '我的房间', ko: '내 방' },
    scoreLabel: { zh: '茶香得分', ko: '차향 점수' },
    livesLabel: { zh: '温暖值', ko: '따뜻함' },
    bestLabel: { zh: '最高纪录', ko: '최고 기록' },
    gameTitle: { zh: '佛手接茶香', ko: '불수 차받기' },
    gameSub: {
      zh: '左右拖动或按方向键，帮佛小柑接住茶香、躲开冰块与焦叶！',
      ko: '좌우 드래그나 방향키로 불소감과 차향을 받고 얼음을 피해요!',
    },
    ruleGood: {
      zh: '茶叶/茶杯 +1，金佛手 +2，5连击加分',
      ko: '찻잎/찻잔 +1, 불수감 +2, 5콤보 보너스',
    },
    rulePower: {
      zh: '茶壶 5秒护盾双倍 · 暖心茶回1命',
      ko: '주전자 5초 보호막 2배 · 따뜻한 차 회복',
    },
    ruleBad: {
      zh: '冰块/焦叶（弱点）：温暖值 -1',
      ko: '얼음/탄 잎(약점): 따뜻함 -1',
    },
    startBtn: { zh: '开始接茶香', ko: '게임 시작' },
    pausedTitle: { zh: '先歇口气喝口茶', ko: '잠시 쉬어가는 차 타임' },
    pausedSub: {
      zh: '游戏已自动暂停，准备好随时继续～',
      ko: '자동으로 일시정지됐어요. 준비되면 이어서 해요~',
    },
    resumeBtn: { zh: '继续游戏', ko: '계속 하기' },
    overTitle: { zh: '本局泡茶完成！', ko: '한 판 끝!' },
    finalScore: { zh: '本局得分', ko: '이번 점수' },
    newBest: { zh: '新纪录!', ko: '신기록!' },
    maxComboLabel: { zh: '最高连击', ko: '최고 콤보' },
    caughtLabel: { zh: '接住茶香', ko: '받은 차향' },
    timeLabel: { zh: '泡茶时长', ko: '플레이 시간' },
    restartBtn: { zh: '再来一局', ko: '다시 하기' },
    saveCardBtn: { zh: '存战绩图', ko: '카드 저장' },
    controlHint: {
      zh: '拖动画面 / ← → / 按键移动',
      ko: '드래그 / ← → / 버튼으로 이동',
    },
    privacyNote: {
      zh: '🔒 最高纪录只保存在这台手机里',
      ko: '🔒 최고 기록은 이 폰에만 저장돼요',
    },
    cardSaved: { zh: '战绩卡已保存！', ko: '결과 카드가 저장되었어요!' },
    characterName: { zh: '佛小柑', ko: '불소감' },
    comboSuffix: { zh: '连击', ko: '콤보' },
    speedUpBanner: { zh: '⚡ 茶香加速！掉落变快啦', ko: '⚡ 속도 업! 낙하가 빨라졌어요' },
    healBanner: { zh: '💛 暖心热茶！温暖值 +1', ko: '💛 따뜻한 차! 따뜻함 +1' },
    newBestBanner: { zh: '👑 刷新最高纪录啦！', ko: '👑 최고 기록 경신!' },
    tierLow: {
      zh: '哎呀被冰块冻到小手啦～喝口暖茶暖一暖，下局一定更顺手！',
      ko: '아이고, 얼음이 차가웠어~ 따뜻한 차 한 모금 마시고 다시 도전하자!',
    },
    tierMid: {
      zh: '茶香慢慢散开啦！这壶佛手茶泡得真温润呀～',
      ko: '은은한 차향이 퍼지고 있어! 아주 포근하게 잘 우렸네~',
    },
    tierHigh: {
      zh: '哇塞！金黄透亮的茶道大师！连我的佛手瓣都在发光啦！',
      ko: '와아! 황금빛 차 마스터야! 내 불수감 옷까지 반짝반짝해!',
    },
    ariaMute: { zh: '静音开关', ko: '음소거 전환' },
    ariaPause: { zh: '暂停游戏', ko: '게임 일시정지' },
    ariaLang: { zh: '切换语言', ko: '언어 전환' },
    ariaCanvas: { zh: '佛手接茶香游戏画面', ko: '불수 차받기 게임 화면' },
    ariaPad: { zh: '方向按钮', ko: '방향 버튼' },
    ariaLeft: { zh: '向左移动', ko: '왼쪽 이동' },
    ariaRight: { zh: '向右移动', ko: '오른쪽 이동' },
  };

  function loadStorage() {
    let sharedLang = null;
    try {
      const rl = localStorage.getItem('foshou_room_lang');
      if (rl === 'ko' || rl === 'zh') sharedLang = rl;
    } catch {
      // ignore
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { lang: sharedLang || 'zh', highScore: 0, muted: false };
      const parsed = JSON.parse(raw);
      return {
        lang: sharedLang || (parsed.lang === 'ko' ? 'ko' : 'zh'),
        highScore: Number(parsed.highScore) || 0,
        muted: Boolean(parsed.muted),
      };
    } catch {
      return { lang: sharedLang || 'zh', highScore: 0, muted: false };
    }
  }

  function saveStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch {
      // ignore
    }
  }

  const store = loadStorage();

  function t(key) {
    return (TEXT[key] && TEXT[key][store.lang]) || key;
  }

  // DOM refs
  const els = {
    canvas: document.getElementById('gameCanvas'),
    scoreVal: document.getElementById('scoreVal'),
    livesVal: document.getElementById('livesVal'),
    bestVal: document.getElementById('bestVal'),
    speedBadge: document.getElementById('speedBadge'),
    comboBadge: document.getElementById('comboBadge'),
    shieldBadge: document.getElementById('shieldBadge'),
    stageBanner: document.getElementById('stageBanner'),
    langToggle: document.getElementById('langToggle'),
    muteBtn: document.getElementById('muteBtn'),
    pauseBtn: document.getElementById('pauseBtn'),
    startOverlay: document.getElementById('startOverlay'),
    pauseOverlay: document.getElementById('pauseOverlay'),
    overOverlay: document.getElementById('overOverlay'),
    startBtn: document.getElementById('startBtn'),
    resumeBtn: document.getElementById('resumeBtn'),
    pauseRestartBtn: document.getElementById('pauseRestartBtn'),
    restartBtn: document.getElementById('restartBtn'),
    shareScoreBtn: document.getElementById('shareScoreBtn'),
    overCharImg: document.getElementById('overCharImg'),
    finalScoreVal: document.getElementById('finalScoreVal'),
    newBestTag: document.getElementById('newBestTag'),
    maxComboVal: document.getElementById('maxComboVal'),
    caughtVal: document.getElementById('caughtVal'),
    timeVal: document.getElementById('timeVal'),
    overQuote: document.getElementById('overQuote'),
    leftPadBtn: document.getElementById('leftPadBtn'),
    rightPadBtn: document.getElementById('rightPadBtn'),
    toast: document.getElementById('toast'),
  };

  const ctx = els.canvas.getContext('2d');
  const W = 390;
  const H = 540;

  // Retina HiDPI scaling for crisp 3D character sprites and typography
  function setupHiDpiCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    els.canvas.width = W * dpr;
    els.canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  setupHiDpiCanvas();

  // Preload expression sprites
  const sprites = {};
  Object.entries(EXPRESSIONS).forEach(([k, src]) => {
    const img = new Image();
    img.src = src;
    sprites[k] = img;
  });

  // Step 5: Web Audio API pentatonic SFX (initialized ONLY after first user gesture)
  let audioCtx = null;
  const PENTATONIC = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];

  function unlockAudio() {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtx = new AC();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
  }

  function playTone(freq, duration = 0.11, type = 'sine', gainVal = 0.13, slideTo = null) {
    if (store.muted || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      if (slideTo) {
        osc.frequency.exponentialRampToValueAtTime(slideTo, audioCtx.currentTime + duration);
      }
      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // ignore
    }
  }

  function sfxCatch(combo, isBig) {
    const note = PENTATONIC[Math.min(combo, PENTATONIC.length - 1)];
    playTone(note, 0.11, 'triangle', 0.13, isBig ? note * 1.35 : note * 1.18);
  }
  function sfxPower() {
    playTone(523.25, 0.11, 'sine', 0.14, 783.99);
    setTimeout(() => playTone(783.99, 0.16, 'sine', 0.14, 1046.5), 85);
  }
  function sfxHeal() {
    playTone(587.33, 0.1, 'sine', 0.13, 880);
    setTimeout(() => playTone(880, 0.18, 'sine', 0.13, 1174.66), 95);
  }
  function sfxSpeedUp() {
    playTone(440, 0.09, 'triangle', 0.11, 660);
    setTimeout(() => playTone(660, 0.14, 'triangle', 0.11, 880), 85);
  }
  function sfxHurt() {
    playTone(220, 0.2, 'sawtooth', 0.1, 115);
  }
  function sfxOver() {
    playTone(440, 0.15, 'triangle', 0.12, 330);
    setTimeout(() => playTone(330, 0.24, 'triangle', 0.12, 261.63), 140);
  }

  // Ambient drifting clouds & tea-steam motes
  const ambientClouds = [
    { x: 64, y: 78, s: 1.0, vx: 7 },
    { x: 280, y: 122, s: 0.85, vx: 5 },
    { x: 185, y: 52, s: 0.7, vx: 6 },
  ];

  const ambientMotes = Array.from({ length: 14 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: 2.5 + Math.random() * 5,
    vy: -10 - Math.random() * 14,
    phase: Math.random() * Math.PI * 2,
  }));

  // Game state
  const game = {
    mode: 'start', // 'start' | 'playing' | 'paused' | 'over'
    score: 0,
    prevBestAtStart: 0,
    announcedNewBest: false,
    feverAlpha: 0,
    trailTimer: 0,
    lives: 3,
    combo: 0,
    maxCombo: 0,
    caughtCount: 0,
    elapsedSec: 0,
    speedTier: 0,
    speedMultiplier: 1,
    spawnTimer: 0,
    shieldTimer: 0,
    hurtBlinkTimer: 0,
    shakeTimer: 0,
    hurtFlashTimer: 0,
    exprKey: 'base',
    exprTimer: 0,
    player: {
      x: W / 2,
      y: H - 64,
      w: 72, // exact 0.75 ratio matching 537x720 sprite
      h: 96,
      vx: 0,
      speed: 325,
      facing: 1,
      squash: 0,
      walkPhase: 0,
    },
    keys: { left: false, right: false },
    pointerActive: false,
    pointerTargetX: W / 2,
    items: [],
    particles: [],
    popups: [],
    lastFrameMs: 0,
    lastQuoteTier: 'mid',
  };

  // Item catalog mapped from 佛小柑's traits (PDF p.51)
  const ITEM_TYPES = [
    { kind: 'good', emoji: '🍃', points: 1, weight: 36, speed: 150, radius: 19, color: '#68B46B' },
    { kind: 'good', emoji: '🍵', points: 1, weight: 22, speed: 162, radius: 20, color: '#D99512' },
    { kind: 'good', emoji: '🍋', points: 2, weight: 15, speed: 188, radius: 20, color: '#F4B93B' },
    { kind: 'power', emoji: '🫖', points: 2, weight: 6, speed: 172, radius: 21, color: '#4E9F64' },
    { kind: 'heal', emoji: '💛', points: 1, weight: 4, speed: 168, radius: 19, color: '#F59E0B' },
    { kind: 'bad', emoji: '🧊', points: 0, weight: 12, speed: 178, radius: 19, color: '#58A6D8' },
    { kind: 'bad', emoji: '🔥', points: 0, weight: 8, speed: 192, radius: 19, color: '#E05A47' },
  ];

  let bannerTimer = null;
  function showStageBanner(msg) {
    els.stageBanner.textContent = msg;
    els.stageBanner.classList.remove('hidden');
    clearTimeout(bannerTimer);
    bannerTimer = setTimeout(() => els.stageBanner.classList.add('hidden'), 1800);
  }

  function clearInputs() {
    game.keys.left = false;
    game.keys.right = false;
    game.pointerActive = false;
  }

  function pickItemDef() {
    // Only spawn heal heart-tea if player has lost a life
    const pool = ITEM_TYPES.filter((d) => !(d.kind === 'heal' && game.lives >= 3));
    const total = pool.reduce((s, d) => s + d.weight, 0);
    let r = Math.random() * total;
    for (const def of pool) {
      r -= def.weight;
      if (r <= 0) return def;
    }
    return pool[0];
  }

  function applyI18n() {
    document.documentElement.lang = store.lang === 'ko' ? 'ko' : 'zh-CN';
    document.title = store.lang === 'ko' ? '불수 차받기 · 佛手接茶香' : '佛手接茶香 · 불수 차받기';
    els.langToggle.textContent = store.lang === 'ko' ? '中文' : '한국어';
    els.muteBtn.textContent = store.muted ? '🔇' : '🔊';
    els.bestVal.textContent = String(store.highScore);

    document.querySelectorAll('[data-i18n]').forEach((node) => {
      node.textContent = t(node.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((node) => {
      node.setAttribute('aria-label', t(node.getAttribute('data-i18n-aria')));
    });

    if (game.mode === 'over') {
      els.overQuote.textContent = t(game.lastQuoteTier);
    }
    updateHud();
  }

  function updateHud() {
    els.scoreVal.textContent = String(game.score);
    els.livesVal.textContent =
      '❤️'.repeat(Math.max(0, game.lives)) + '🤍'.repeat(Math.max(0, 3 - game.lives));
    els.bestVal.textContent = String(store.highScore);
    els.speedBadge.textContent = `x${game.speedMultiplier.toFixed(2)}`;

    if (game.combo >= 3 && game.mode === 'playing') {
      els.comboBadge.textContent = `🔥 ${game.combo} ${t('comboSuffix')}`;
      els.comboBadge.classList.remove('hidden');
    } else {
      els.comboBadge.classList.add('hidden');
    }

    if (game.shieldTimer > 0 && game.mode === 'playing') {
      els.shieldBadge.textContent = `🫖 ${game.shieldTimer.toFixed(1)}s x2`;
      els.shieldBadge.classList.remove('hidden');
    } else {
      els.shieldBadge.classList.add('hidden');
    }
  }

  function setTempExpr(expr, duration = 0.65) {
    game.exprKey = expr;
    game.exprTimer = duration;
  }

  function spawnBurst(x, y, color, count = 8) {
    if (reduceMotion) return;
    for (let i = 0; i < count; i++) {
      const ang = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const spd = 60 + Math.random() * 110;
      game.particles.push({
        x,
        y,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd - 30,
        r: 3 + Math.random() * 3.5,
        color,
        life: 0.48 + Math.random() * 0.2,
        maxLife: 0.65,
      });
    }
  }

  function addPopup(x, y, text, color) {
    game.popups.push({ x, y, text, color, life: 0.8 });
  }

  function startGame() {
    unlockAudio();
    clearInputs();
    game.mode = 'playing';
    game.score = 0;
    game.prevBestAtStart = store.highScore;
    game.announcedNewBest = false;
    game.feverAlpha = 0;
    game.trailTimer = 0;
    game.lives = 3;
    game.combo = 0;
    game.maxCombo = 0;
    game.caughtCount = 0;
    game.elapsedSec = 0;
    game.speedTier = 0;
    game.speedMultiplier = 1;
    game.spawnTimer = 0.2;
    game.shieldTimer = 0;
    game.hurtBlinkTimer = 0;
    game.shakeTimer = 0;
    game.hurtFlashTimer = 0;
    game.exprKey = 'happy';
    game.exprTimer = 0.55;
    game.player.x = W / 2;
    game.player.vx = 0;
    game.player.squash = 0;
    game.items = [];
    game.particles = [];
    game.popups = [];
    game.lastFrameMs = performance.now();

    els.startOverlay.classList.add('hidden');
    els.pauseOverlay.classList.add('hidden');
    els.overOverlay.classList.add('hidden');
    clearTimeout(bannerTimer);
    els.stageBanner.classList.add('hidden');
    els.pauseBtn.classList.remove('hidden');
    els.newBestTag.classList.add('hidden');
    updateHud();
  }

  function pauseGame() {
    if (game.mode !== 'playing') return;
    clearInputs();
    game.mode = 'paused';
    els.pauseOverlay.classList.remove('hidden');
  }

  function resumeGame() {
    if (game.mode !== 'paused') return;
    unlockAudio();
    game.mode = 'playing';
    game.lastFrameMs = performance.now();
    els.pauseOverlay.classList.add('hidden');
  }

  function endGame() {
    clearInputs();
    game.mode = 'over';
    els.pauseBtn.classList.add('hidden');
    els.stageBanner.classList.add('hidden');
    sfxOver();

    const isNewBest = game.score > store.highScore;
    if (isNewBest) {
      store.highScore = game.score;
      saveStorage();
    }

    let tierKey = 'tierLow';
    let expr = 'sad';
    if (game.score >= 35) {
      tierKey = 'tierHigh';
      expr = 'proud';
    } else if (game.score >= 15) {
      tierKey = 'tierMid';
      expr = 'happy';
    }
    game.lastQuoteTier = tierKey;

    els.overCharImg.src = EXPRESSIONS[expr];
    els.finalScoreVal.textContent = String(game.score);
    els.maxComboVal.textContent = String(game.maxCombo);
    els.caughtVal.textContent = String(game.caughtCount);
    els.timeVal.textContent = `${Math.floor(game.elapsedSec)}s`;
    els.newBestTag.classList.toggle('hidden', !isNewBest);
    els.overQuote.textContent = t(tierKey);
    els.overOverlay.classList.remove('hidden');
    updateHud();
  }

  function spawnItem() {
    const def = pickItemDef();
    const margin = 32;
    let x = margin + Math.random() * (W - margin * 2);

    // Fair spawning: avoid spawning two bad obstacles right next to each other near the top
    if (def.kind === 'bad') {
      const topBads = game.items.filter((i) => i.kind === 'bad' && i.y < 140);
      if (topBads.length >= 2) {
        // Switch to a friendly tea leaf instead of an unfair obstacle wall
        return spawnForcedGood(x);
      }
      for (const b of topBads) {
        if (Math.abs(b.x - x) < 95) {
          x = b.x < W / 2 ? Math.min(W - margin, b.x + 125) : Math.max(margin, b.x - 125);
        }
      }
    }

    game.items.push({
      ...def,
      x,
      y: -26,
      wobblePhase: Math.random() * Math.PI * 2,
      wobbleAmp: def.kind === 'good' ? 14 : 5,
      rot: (Math.random() - 0.5) * 0.35,
      rotSpeed: (Math.random() - 0.5) * 1.4,
    });
  }

  function spawnForcedGood(x) {
    const def = ITEM_TYPES[0];
    game.items.push({
      ...def,
      x,
      y: -26,
      wobblePhase: Math.random() * Math.PI * 2,
      wobbleAmp: 14,
      rot: 0,
      rotSpeed: 0.6,
    });
  }

  function update(dt) {
    // Animate gentle clouds & tea steam even on start/pause
    for (const cl of ambientClouds) {
      cl.x += cl.vx * dt;
      if (cl.x > W + 56) cl.x = -56;
    }
    for (const m of ambientMotes) {
      m.y += m.vy * dt;
      m.phase += dt * 1.2;
      if (m.y < -14) {
        m.y = H + 12;
        m.x = Math.random() * W;
      }
    }

    if (game.mode !== 'playing') return;

    // Smooth golden-hour fever glow when combo >= 5
    const targetFever = game.combo >= 5 ? 1 : 0;
    game.feverAlpha += (targetFever - game.feverAlpha) * Math.min(1, dt * 4);

    game.elapsedSec += dt;
    // Step 3: Every 30 seconds falling speed increases by 15%
    const nextTier = Math.floor(game.elapsedSec / 30);
    if (nextTier > game.speedTier) {
      game.speedTier = nextTier;
      game.speedMultiplier = Math.pow(1.15, nextTier);
      sfxSpeedUp();
      showStageBanner(`${t('speedUpBanner')} (x${game.speedMultiplier.toFixed(2)})`);
      updateHud();
    }

    if (game.shieldTimer > 0) {
      const prevTenths = Math.ceil(game.shieldTimer * 10);
      game.shieldTimer = Math.max(0, game.shieldTimer - dt);
      if (Math.ceil(game.shieldTimer * 10) !== prevTenths || game.shieldTimer === 0) {
        updateHud();
      }
    }
    if (game.hurtBlinkTimer > 0) game.hurtBlinkTimer = Math.max(0, game.hurtBlinkTimer - dt);
    if (game.shakeTimer > 0) game.shakeTimer = Math.max(0, game.shakeTimer - dt);
    if (game.hurtFlashTimer > 0) game.hurtFlashTimer = Math.max(0, game.hurtFlashTimer - dt);
    if (game.exprTimer > 0) {
      game.exprTimer = Math.max(0, game.exprTimer - dt);
      if (game.exprTimer === 0) {
        game.exprKey = game.shieldTimer > 0 ? 'proud' : 'base';
      }
    }

    // Step 1: Smooth player movement with velocity tracking for lean & walk bounce
    const p = game.player;
    const prevX = p.x;
    if (game.keys.left) p.x -= p.speed * dt;
    if (game.keys.right) p.x += p.speed * dt;
    if (game.pointerActive) {
      const dx = game.pointerTargetX - p.x;
      p.x += dx * Math.min(1, dt * 18);
    }
    const halfW = p.w / 2;
    p.x = Math.max(halfW + 6, Math.min(W - halfW - 6, p.x));
    p.vx = dt > 0 ? (p.x - prevX) / dt : 0;
    if (Math.abs(p.x - prevX) > 0.35) {
      p.facing = p.x >= prevX ? 1 : -1;
      p.walkPhase += dt * 16;
    }
    if (p.squash > 0) {
      p.squash = Math.max(0, p.squash - dt * 4.5);
    }

    // Golden sparkle boot trail during combo fever or shield
    if (!reduceMotion && (game.combo >= 5 || game.shieldTimer > 0) && Math.abs(p.vx) > 40) {
      game.trailTimer -= dt;
      if (game.trailTimer <= 0) {
        game.trailTimer = 0.08;
        game.particles.push({
          x: p.x + (Math.random() - 0.5) * 20,
          y: p.y + p.h / 2 - 8,
          vx: -p.vx * 0.1 + (Math.random() - 0.5) * 18,
          vy: -18 - Math.random() * 24,
          r: 2.5 + Math.random() * 2,
          color: '#F5BE3F',
          life: 0.36,
          maxLife: 0.36,
        });
      }
    }

    // Step 2: Spawn & update falling items (delta time)
    game.spawnTimer -= dt;
    if (game.spawnTimer <= 0) {
      spawnItem();
      const baseInterval = Math.max(0.32, 0.84 / game.speedMultiplier);
      game.spawnTimer = baseInterval * (0.76 + Math.random() * 0.44);
    }

    for (let i = game.items.length - 1; i >= 0; i--) {
      const it = game.items[i];
      it.y += it.speed * game.speedMultiplier * dt;
      it.wobblePhase += dt * 2.6;
      const drawX = Math.max(22, Math.min(W - 22, it.x + Math.sin(it.wobblePhase) * it.wobbleAmp));
      it.drawX = drawX;
      it.rot += it.rotSpeed * dt;

      // Forgiving hitbox for good items, fair slightly tighter hitbox for bad obstacles
      const dx = Math.abs(drawX - p.x);
      const dy = Math.abs(it.y - p.y);
      const pad = it.kind === 'bad' ? 0.62 : 0.84;
      if (dx < halfW * pad + it.radius * 0.72 && dy < p.h * 0.42 + it.radius * 0.68) {
        game.items.splice(i, 1);
        handleCatch(it, drawX);
        continue;
      }

      if (it.y > H + 36) {
        game.items.splice(i, 1);
      }
    }

    // Particles
    for (let i = game.particles.length - 1; i >= 0; i--) {
      const pt = game.particles[i];
      pt.x += pt.vx * dt;
      pt.y += pt.vy * dt;
      pt.vy += 260 * dt;
      pt.life -= dt;
      if (pt.life <= 0) game.particles.splice(i, 1);
    }

    // Floating score popups
    for (let i = game.popups.length - 1; i >= 0; i--) {
      const pop = game.popups[i];
      pop.y -= 52 * dt;
      pop.life -= dt;
      if (pop.life <= 0) game.popups.splice(i, 1);
    }
  }

  function checkMidGameRecord() {
    if (
      game.prevBestAtStart > 0 &&
      !game.announcedNewBest &&
      game.score > game.prevBestAtStart
    ) {
      game.announcedNewBest = true;
      sfxPower();
      showStageBanner(t('newBestBanner'));
    }
  }

  function handleCatch(it, hitX) {
    const p = game.player;
    const mult = game.shieldTimer > 0 ? 2 : 1;

    if (it.kind === 'good') {
      game.combo += 1;
      game.caughtCount += 1;
      if (game.combo > game.maxCombo) game.maxCombo = game.combo;

      const comboBonus = game.combo >= 5 && game.combo % 5 === 0 ? 1 : 0;
      const gained = it.points * mult + comboBonus;
      game.score += gained;
      p.squash = 1;

      sfxCatch(game.combo, it.points > 1 || comboBonus > 0);
      setTempExpr(it.points > 1 || game.combo >= 5 ? 'proud' : 'happy', 0.55);
      spawnBurst(hitX, it.y, it.color, it.points > 1 ? 10 : 6);
      const label = comboBonus > 0 ? `+${gained} 🔥` : `+${gained}`;
      addPopup(p.x, p.y - 50, label, '#C87F0A');
      checkMidGameRecord();
      updateHud();
    } else if (it.kind === 'power') {
      game.combo += 1;
      game.caughtCount += 1;
      if (game.combo > game.maxCombo) game.maxCombo = game.combo;
      const gained = it.points * mult;
      game.score += gained;
      game.shieldTimer = 5.0;
      p.squash = 1;

      sfxPower();
      setTempExpr('proud', 1.2);
      spawnBurst(hitX, it.y, '#F4B93B', 14);
      addPopup(p.x, p.y - 54, '🫖 x2!', '#3B8A53');
      checkMidGameRecord();
      updateHud();
    } else if (it.kind === 'heal') {
      game.caughtCount += 1;
      game.score += it.points * mult;
      if (game.lives < 3) {
        game.lives += 1;
        showStageBanner(t('healBanner'));
      }
      p.squash = 1;
      sfxHeal();
      setTempExpr('proud', 0.9);
      spawnBurst(hitX, it.y, '#F59E0B', 12);
      addPopup(p.x, p.y - 52, '+1 ❤️', '#D97706');
      checkMidGameRecord();
      updateHud();
    } else if (it.kind === 'bad') {
      if (game.shieldTimer > 0) {
        sfxCatch(3, false);
        spawnBurst(hitX, it.y, '#93C5FD', 9);
        addPopup(p.x, p.y - 50, '🛡️', '#4E9F64');
        return;
      }
      if (game.hurtBlinkTimer > 0) return;
      game.lives -= 1;
      game.combo = 0;
      game.hurtBlinkTimer = 1.15;
      game.shakeTimer = 0.24;
      game.hurtFlashTimer = 0.26;
      sfxHurt();
      setTempExpr('surprised', 0.85);
      spawnBurst(hitX, it.y, it.color, 10);
      addPopup(p.x, p.y - 50, '-1 ❤️', '#C9443A');
      updateHud();
      if (game.lives <= 0) {
        endGame();
      }
    }
  }

  function draw() {
    ctx.save();

    // Micro screen shake on obstacle hit
    if (game.shakeTimer > 0 && !reduceMotion) {
      const mag = (game.shakeTimer / 0.24) * 5;
      ctx.translate((Math.random() - 0.5) * mag * 2, (Math.random() - 0.5) * mag * 2);
    }

    ctx.clearRect(-10, -10, W + 20, H + 20);

    // Warm sunlit sky + optional golden-hour fever warmth
    const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
    skyGrad.addColorStop(0, '#FFFDF6');
    skyGrad.addColorStop(0.68, '#FFF5D6');
    skyGrad.addColorStop(1, '#FDE3A0');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W, H);

    if (game.feverAlpha > 0.02) {
      const feverGrad = ctx.createRadialGradient(W / 2, H * 0.45, 20, W / 2, H * 0.45, W * 0.85);
      feverGrad.addColorStop(0, `rgba(255, 214, 92, ${0.24 * game.feverAlpha})`);
      feverGrad.addColorStop(1, 'rgba(255, 214, 92, 0)');
      ctx.fillStyle = feverGrad;
      ctx.fillRect(0, 0, W, H);
    }

    // Diagonal soft sunlight beams from top-left window
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.26)';
    ctx.beginPath();
    ctx.moveTo(20, 0);
    ctx.lineTo(130, 0);
    ctx.lineTo(270, H);
    ctx.lineTo(135, H);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(190, 0);
    ctx.lineTo(255, 0);
    ctx.lineTo(395, H);
    ctx.lineTo(315, H);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Soft drifting cream clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    for (const cl of ambientClouds) {
      ctx.save();
      ctx.translate(cl.x, cl.y);
      ctx.scale(cl.s, cl.s);
      ctx.beginPath();
      ctx.arc(-16, 4, 14, 0, Math.PI * 2);
      ctx.arc(0, -2, 18, 0, Math.PI * 2);
      ctx.arc(18, 4, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Rising ambient tea-steam motes
    for (const m of ambientMotes) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.56)';
      ctx.beginPath();
      ctx.arc(m.x + Math.sin(m.phase) * 8, m.y, m.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Layered sage-green & honey-gold tea garden hills
    ctx.fillStyle = 'rgba(122, 184, 134, 0.16)';
    ctx.beginPath();
    ctx.moveTo(0, H - 72);
    ctx.quadraticCurveTo(W * 0.32, H - 118, W * 0.68, H - 76);
    ctx.quadraticCurveTo(W * 0.88, H - 56, W, H - 84);
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'rgba(244, 185, 59, 0.22)';
    ctx.beginPath();
    ctx.moveTo(0, H - 46);
    ctx.quadraticCurveTo(W * 0.25, H - 78, W * 0.58, H - 52);
    ctx.quadraticCurveTo(W * 0.84, H - 34, W, H - 56);
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    ctx.fill();

    // Warm wooden tea-table floor ledge
    const tableGrad = ctx.createLinearGradient(0, H - 34, 0, H);
    tableGrad.addColorStop(0, '#E8C37B');
    tableGrad.addColorStop(1, '#D5A452');
    ctx.fillStyle = tableGrad;
    ctx.fillRect(0, H - 34, W, 34);
    ctx.fillStyle = 'rgba(255, 250, 232, 0.65)';
    ctx.fillRect(0, H - 34, W, 3);

    // Subtle drag guide dot on table ledge when dragging
    if (game.pointerActive && game.mode === 'playing') {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.arc(game.pointerTargetX, H - 17, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Falling items with glossy orb highlight & smooth entry below top HUD badges
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (const it of game.items) {
      const ix = it.drawX != null ? it.drawX : it.x;
      const entryAlpha = Math.max(0, Math.min(1, (it.y - 16) / 30));
      if (entryAlpha <= 0.01) continue;
      ctx.save();
      ctx.globalAlpha = entryAlpha;
      ctx.translate(ix, it.y);
      ctx.rotate(it.rot);

      ctx.beginPath();
      ctx.arc(0, 0, it.radius + 1, 0, Math.PI * 2);
      if (it.kind === 'bad') {
        ctx.fillStyle = 'rgba(232, 74, 60, 0.22)';
        ctx.strokeStyle = 'rgba(220, 62, 48, 0.6)';
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
      } else if (it.kind === 'power' || it.kind === 'heal') {
        ctx.fillStyle = 'rgba(255, 246, 200, 0.96)';
        ctx.strokeStyle = 'rgba(213, 142, 13, 0.85)';
        ctx.lineWidth = 2.5;
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.86)';
        ctx.strokeStyle = 'rgba(235, 212, 157, 0.8)';
        ctx.lineWidth = 1.2;
        ctx.fill();
        ctx.stroke();
      }

      // Glossy top-left bubble specular dot
      ctx.fillStyle = 'rgba(255, 255, 255, 0.72)';
      ctx.beginPath();
      ctx.arc(-it.radius * 0.34, -it.radius * 0.36, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '25px sans-serif';
      ctx.fillText(it.emoji, 0, 1);
      ctx.restore();
    }

    // Burst particles
    for (const pt of game.particles) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, pt.life / pt.maxLife);
      ctx.fillStyle = pt.color;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Player (佛小柑) with squash-and-stretch, run bounce & lean tilt
    const p = game.player;
    ctx.save();
    ctx.translate(p.x, p.y);

    // Ground shadow
    ctx.fillStyle = 'rgba(90, 58, 34, 0.16)';
    ctx.beginPath();
    ctx.ellipse(0, p.h / 2 - 2, 27, 6.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Active golden tea shield + radial countdown arc
    if (game.shieldTimer > 0) {
      const ratio = Math.max(0, Math.min(1, game.shieldTimer / 5.0));
      ctx.fillStyle = 'rgba(244, 185, 59, 0.16)';
      ctx.beginPath();
      ctx.arc(0, 0, 54, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(217, 149, 18, 0.92)';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(0, 0, 54, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ratio);
      ctx.stroke();
    }

    const blinkSkip = game.hurtBlinkTimer > 0 && Math.floor(game.hurtBlinkTimer * 14) % 2 === 0;
    if (!blinkSkip) {
      const sprite = sprites[game.exprKey] || sprites.base;
      if (sprite && sprite.complete && sprite.naturalWidth > 0) {
        const lean = reduceMotion ? 0 : Math.max(-0.14, Math.min(0.14, p.vx / 2200));
        const runBob =
          !reduceMotion && Math.abs(p.vx) > 20 ? -Math.abs(Math.sin(p.walkPhase)) * 4.5 : 0;
        const sx = 1 + p.squash * 0.12;
        const sy = 1 - p.squash * 0.09;

        ctx.translate(0, runBob);
        ctx.rotate(lean);
        ctx.scale(p.facing * sx, sy);
        ctx.drawImage(sprite, -p.w / 2, -p.h / 2, p.w, p.h);
      }
    }
    ctx.restore();

    // Floating score popups
    for (const pop of game.popups) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, pop.life / 0.8));
      ctx.font = '800 20px "Noto Sans SC", "Noto Sans KR", sans-serif';
      ctx.fillStyle = pop.color;
      ctx.textAlign = 'center';
      ctx.fillText(pop.text, pop.x, pop.y);
      ctx.restore();
    }

    // Brief hurt edge vignette
    if (game.hurtFlashTimer > 0) {
      ctx.fillStyle = `rgba(220, 76, 62, ${(game.hurtFlashTimer / 0.26) * 0.22})`;
      ctx.fillRect(0, 0, W, H);
    }

    ctx.restore();
  }

  function loop(nowMs) {
    const dt = Math.min(0.05, Math.max(0, (nowMs - game.lastFrameMs) / 1000));
    game.lastFrameMs = nowMs;
    update(dt);
    draw();
    requestAnimationFrame(loop);
  }

  // Export 1080x1350 Game Result Card via pure Canvas (P31)
  function wrapCenterText(g, text, x, y, maxWidth, lineHeight) {
    const chars = Array.from(text);
    const lines = [];
    let cur = '';
    for (const ch of chars) {
      const next = cur + ch;
      if (g.measureText(next).width > maxWidth && cur) {
        lines.push(cur);
        cur = ch;
      } else {
        cur = next;
      }
    }
    if (cur) lines.push(cur);
    const startY = lines.length > 1 ? y - lineHeight / 3 : y + 10;
    lines.slice(0, 2).forEach((line, i) => g.fillText(line, x, startY + i * lineHeight));
  }

  function exportScoreCard() {
    const c = document.createElement('canvas');
    c.width = 1080;
    c.height = 1350;
    const g = c.getContext('2d');

    const grad = g.createLinearGradient(0, 0, 0, 1350);
    grad.addColorStop(0, '#FFFBF0');
    grad.addColorStop(1, '#FCE7B2');
    g.fillStyle = grad;
    g.fillRect(0, 0, 1080, 1350);

    g.fillStyle = '#FFFFFF';
    g.strokeStyle = '#EFE2C6';
    g.lineWidth = 4;
    g.beginPath();
    g.roundRect(72, 84, 936, 1130, 48);
    g.fill();
    g.stroke();

    g.fillStyle = '#5A3A22';
    g.textAlign = 'center';
    g.font = '800 56px "Noto Sans SC", "Noto Sans KR", sans-serif';
    g.fillText(t('gameTitle'), 540, 185);

    const img =
      game.score >= 35 ? sprites.proud : game.score >= 15 ? sprites.happy : sprites.sad;
    if (img && img.complete && img.naturalWidth > 0) {
      const th = 420;
      const tw = (img.naturalWidth / img.naturalHeight) * th;
      g.drawImage(img, 540 - tw / 2, 232, tw, th);
    }

    g.fillStyle = '#D99512';
    g.font = '800 118px "Noto Sans SC", "Noto Sans KR", sans-serif';
    g.fillText(String(game.score), 540, 785);

    g.fillStyle = '#7C5C43';
    g.font = '700 32px "Noto Sans SC", "Noto Sans KR", sans-serif';
    const meta = `${t('bestLabel')} ${store.highScore}  ·  ${t('maxComboLabel')} ${game.maxCombo}  ·  ${Math.floor(game.elapsedSec)}s`;
    g.fillText(meta, 540, 862);

    g.fillStyle = '#FFFDF7';
    g.strokeStyle = '#EBD49D';
    g.lineWidth = 3;
    g.beginPath();
    g.roundRect(136, 926, 808, 136, 28);
    g.fill();
    g.stroke();

    g.fillStyle = '#5A3A22';
    g.font = '600 32px "Noto Sans SC", "Noto Sans KR", sans-serif';
    wrapCenterText(g, els.overQuote.textContent || '', 540, 990, 740, 46);

    g.fillStyle = '#7C5C43';
    g.font = '600 26px "Noto Sans SC", "Noto Sans KR", sans-serif';
    g.fillText(`${t('gameTitle')} · ${t('characterName')}`, 540, 1280);

    c.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], `foshou-game-${game.score}.png`, { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: t('gameTitle') });
          return;
        } catch {
          // fallback download
        }
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `foshou-game-${game.score}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      showToast(t('cardSaved'));
    }, 'image/png');
  }

  let toastTimer = null;
  function showToast(msg) {
    els.toast.textContent = msg;
    els.toast.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.add('hidden'), 2400);
  }

  // Input Handling: Keyboard + Canvas Drag + On-screen Arrow Pads
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') game.keys.left = true;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') game.keys.right = true;
    if (e.key === 'Escape' || e.key === ' ') {
      if (game.mode === 'playing') {
        e.preventDefault();
        pauseGame();
      } else if (game.mode === 'paused') {
        e.preventDefault();
        resumeGame();
      }
    }
  });

  window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') game.keys.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') game.keys.right = false;
  });

  function bindPadButton(btn, keyName) {
    const down = (e) => {
      e.preventDefault();
      unlockAudio();
      game.keys[keyName] = true;
    };
    const up = () => {
      game.keys[keyName] = false;
    };
    btn.addEventListener('pointerdown', down);
    btn.addEventListener('pointerup', up);
    btn.addEventListener('pointerleave', up);
    btn.addEventListener('pointercancel', up);
  }
  bindPadButton(els.leftPadBtn, 'left');
  bindPadButton(els.rightPadBtn, 'right');

  function updatePointerX(clientX) {
    const rect = els.canvas.getBoundingClientRect();
    if (!rect.width) return;
    game.pointerTargetX = ((clientX - rect.left) / rect.width) * W;
  }

  els.canvas.addEventListener('pointerdown', (e) => {
    unlockAudio();
    game.pointerActive = true;
    updatePointerX(e.clientX);
    els.canvas.setPointerCapture(e.pointerId);
  });

  els.canvas.addEventListener('pointermove', (e) => {
    if (!game.pointerActive) return;
    updatePointerX(e.clientX);
  });

  els.canvas.addEventListener('pointerup', () => {
    game.pointerActive = false;
  });
  els.canvas.addEventListener('pointercancel', () => {
    game.pointerActive = false;
  });

  // UI Buttons
  els.startBtn.addEventListener('click', startGame);
  els.restartBtn.addEventListener('click', startGame);
  els.pauseRestartBtn.addEventListener('click', startGame);
  els.resumeBtn.addEventListener('click', resumeGame);
  els.pauseBtn.addEventListener('click', () => {
    if (game.mode === 'playing') pauseGame();
    else if (game.mode === 'paused') resumeGame();
  });

  els.muteBtn.addEventListener('click', () => {
    unlockAudio();
    store.muted = !store.muted;
    saveStorage();
    els.muteBtn.textContent = store.muted ? '🔇' : '🔊';
  });

  els.langToggle.addEventListener('click', () => {
    store.lang = store.lang === 'zh' ? 'ko' : 'zh';
    try {
      localStorage.setItem('foshou_room_lang', store.lang);
    } catch {
      // ignore
    }
    saveStorage();
    applyI18n();
  });

  els.shareScoreBtn.addEventListener('click', exportScoreCard);

  // Step 5: Auto-pause when leaving page (Page Visibility)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && game.mode === 'playing') {
      pauseGame();
    }
  });
  window.addEventListener('blur', () => {
    if (game.mode === 'playing') pauseGame();
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }

  applyI18n();
  updateHud();
  game.lastFrameMs = performance.now();
  requestAnimationFrame(loop);
})();
