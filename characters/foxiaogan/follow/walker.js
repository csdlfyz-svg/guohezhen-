(() => {
  'use strict';

  // P45: One-line drop-in bottom walking companion for My Room (height 80px)
  const HIDE_KEY = 'foshou_walker_hidden';
  const LANG_KEY = 'foshou_room_lang';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const QUOTES = {
    zh: [
      '呀！被你点到啦，记得喝口温茶哦～',
      '我正在房间底下散步呢！',
      '点上面的应用标签，就能陪我喝茶或玩游戏！',
      '呼～茶香暖暖的，真舒服呀。',
    ],
    ko: [
      '앗! 깜짝이야~ 따뜻한 차 한 모금 마셨어?',
      '방 바닥을 천천히 산책하는 중이야!',
      '위 앱 탭에서 차 기록이랑 미니게임도 해 봐!',
      '후~ 차향이 포근해서 기분이 좋아.',
    ],
  };

  function getLang() {
    return localStorage.getItem(LANG_KEY) === 'ko' ? 'ko' : 'zh';
  }

  // Inject minimal self-contained styles (100% tokenized via css/common.css)
  const style = document.createElement('style');
  style.textContent = `
    .fw-wrap {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 76px;
      pointer-events: none;
      z-index: 40;
    }
    .fw-char {
      position: fixed;
      width: 54px;
      height: 72px;
      pointer-events: auto;
      cursor: grab;
      touch-action: none;
      user-select: none;
      -webkit-user-drag: none;
      filter: var(--fg-shadow-tile-img);
      transition: transform 0.12s linear;
    }
    .fw-char:active { cursor: grabbing; }
    .fw-bubble {
      position: fixed;
      background: var(--fg-card-soft);
      border: 1.5px solid var(--fg-border-strong);
      color: var(--fg-ink);
      font-size: 12px;
      font-weight: 700;
      padding: 7px 12px;
      border-radius: 14px;
      box-shadow: var(--fg-shadow-md);
      pointer-events: none;
      max-width: 220px;
      text-align: center;
      z-index: 41;
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    .fw-bubble.show { opacity: 1; }
    .fw-toggle {
      position: fixed;
      right: 14px;
      bottom: 14px;
      z-index: 42;
      min-height: 34px;
      padding: 0 12px;
      border-radius: var(--radius-pill);
      border: 1.5px solid var(--fg-border-strong);
      background: var(--fg-card-translucent);
      backdrop-filter: blur(8px);
      color: var(--fg-ink);
      font-family: inherit;
      font-size: 11.5px;
      font-weight: 800;
      cursor: pointer;
      box-shadow: var(--fg-shadow-sm);
    }
  `;
  document.head.appendChild(style);

  const wrap = document.createElement('div');
  wrap.className = 'fw-wrap';

  const img = document.createElement('img');
  img.className = 'fw-char';
  img.src = './assets/expressions/base.png';
  img.alt = '佛小柑';

  const bubble = document.createElement('div');
  bubble.className = 'fw-bubble';

  const toggleBtn = document.createElement('button');
  toggleBtn.type = 'button';
  toggleBtn.className = 'fw-toggle';

  wrap.appendChild(img);
  wrap.appendChild(bubble);
  document.body.appendChild(wrap);
  document.body.appendChild(toggleBtn);

  let hidden = localStorage.getItem(HIDE_KEY) === '1';

  function updateToggleText() {
    const ko = getLang() === 'ko';
    toggleBtn.textContent = hidden
      ? ko ? '🍋 보이기' : '🍋 显示佛小柑'
      : ko ? '숨기기' : '隐藏';
    wrap.style.display = hidden ? 'none' : 'block';
  }

  toggleBtn.addEventListener('click', () => {
    hidden = !hidden;
    try {
      localStorage.setItem(HIDE_KEY, hidden ? '1' : '0');
    } catch {
      // ignore
    }
    updateToggleText();
  });

  window.addEventListener('foshou-lang-change', updateToggleText);

  // State machine: walk | idle | sleep | drag | fall | surprised
  const st = {
    mode: 'walk',
    x: Math.min(120, Math.max(24, window.innerWidth * 0.2)),
    y: window.innerHeight - 80,
    vy: 0,
    dir: 1,
    timer: 3.5,
    bobPhase: 0,
    dragging: false,
    dragStartX: 0,
    dragStartY: 0,
    movedDuringDrag: false,
  };

  let bubbleTimer = null;
  function say(text) {
    bubble.textContent = text;
    bubble.classList.add('show');
    positionBubble();
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => bubble.classList.remove('show'), 2600);
  }

  function positionBubble() {
    const bw = Math.min(210, bubble.offsetWidth || 160);
    const bx = Math.max(10, Math.min(window.innerWidth - bw - 10, st.x + 32 - bw / 2));
    const by = Math.max(12, st.y - 44);
    bubble.style.left = `${bx}px`;
    bubble.style.top = `${by}px`;
  }

  function floorY() {
    return window.innerHeight - 74;
  }

  function renderChar() {
    const bob = st.mode === 'walk' && !reduceMotion ? Math.abs(Math.sin(st.bobPhase)) * -5 : 0;
    const tilt = st.mode === 'sleep' ? -8 : 0;
    img.style.left = `${st.x}px`;
    img.style.top = `${st.y + bob}px`;
    img.style.transform = `scaleX(${st.dir}) rotate(${tilt}deg)`;
    if (bubble.classList.contains('show')) positionBubble();
  }

  // Click & drag interaction
  img.addEventListener('pointerdown', (e) => {
    st.dragging = true;
    st.movedDuringDrag = false;
    st.dragStartX = e.clientX;
    st.dragStartY = e.clientY;
    st.mode = 'drag';
    img.src = './assets/expressions/surprised.png';
    img.setPointerCapture(e.pointerId);
  });

  img.addEventListener('pointermove', (e) => {
    if (!st.dragging) return;
    if (Math.hypot(e.clientX - st.dragStartX, e.clientY - st.dragStartY) > 6) {
      st.movedDuringDrag = true;
    }
    st.x = Math.max(4, Math.min(window.innerWidth - 68, e.clientX - 32));
    st.y = Math.max(20, Math.min(floorY(), e.clientY - 38));
    renderChar();
  });

  function endDrag() {
    if (!st.dragging) return;
    st.dragging = false;
    if (!st.movedDuringDrag) {
      st.mode = 'surprised';
      st.timer = 1.6;
      img.src = './assets/expressions/surprised.png';
      const list = QUOTES[getLang()];
      say(list[Math.floor(Math.random() * list.length)]);
    } else if (st.y < floorY() - 2) {
      st.mode = 'fall';
      st.vy = 0;
      img.src = './assets/expressions/happy.png';
    } else {
      st.mode = 'walk';
      st.timer = 3.0;
      img.src = './assets/expressions/base.png';
    }
  }

  img.addEventListener('pointerup', endDrag);
  img.addEventListener('pointercancel', endDrag);

  window.addEventListener('resize', () => {
    st.x = Math.max(8, Math.min(window.innerWidth - 76, st.x));
    if (st.mode !== 'drag' && st.mode !== 'fall') {
      st.y = floorY();
    }
    renderChar();
  });

  let lastMs = performance.now();
  function tick(now) {
    const dt = Math.min(0.05, Math.max(0, (now - lastMs) / 1000));
    lastMs = now;

    if (!hidden && !document.hidden) {
      if (st.mode === 'fall') {
        st.vy += 900 * dt;
        st.y += st.vy * dt;
        if (st.y >= floorY()) {
          st.y = floorY();
          st.vy = 0;
          st.mode = 'idle';
          st.timer = 1.4;
          img.src = './assets/expressions/happy.png';
        }
      } else if (!reduceMotion && st.mode !== 'drag') {
        st.timer -= dt;
        if (st.mode === 'walk') {
          st.x += st.dir * 38 * dt;
          st.bobPhase += dt * 9;
          const maxX = Math.max(20, window.innerWidth - 110);
          if (st.x <= 12) {
            st.x = 12;
            st.dir = 1;
          } else if (st.x >= maxX) {
            st.x = maxX;
            st.dir = -1;
          }
          if (st.timer <= 0) {
            const roll = Math.random();
            if (roll < 0.35) {
              st.mode = 'sleep';
              st.timer = 4.0;
              img.src = './assets/expressions/base.png';
              say('Zzz... 🍵');
            } else {
              st.mode = 'idle';
              st.timer = 2.2;
              img.src = './assets/expressions/happy.png';
            }
          }
        } else if (st.mode === 'idle' || st.mode === 'sleep' || st.mode === 'surprised') {
          if (st.timer <= 0) {
            st.mode = 'walk';
            st.timer = 3.0 + Math.random() * 3.0;
            if (Math.random() < 0.5) st.dir *= -1;
            img.src = './assets/expressions/base.png';
          }
        }
      }
      renderChar();
    }

    requestAnimationFrame(tick);
  }

  updateToggleText();
  st.y = floorY();
  renderChar();
  requestAnimationFrame(tick);
})();
