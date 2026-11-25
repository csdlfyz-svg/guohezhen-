/* 负责人：果核镇共同团队 · 独立角色个人房间页逻辑（?role=<id> 路由、3D 展台专属互动、5心情切换、4栏手风琴档案与邻里串门） */
import {
  loadTeamData,
  getLang,
  setLang,
  onLangChange,
  t,
  prefersReducedMotion,
  observeReveals,
  getCustomRoomUrl,
  getRoomUrl,
  showToast,
  hideToast,
  iconSvg,
  escapeHtml
} from './store.js';

const navMount = document.getElementById('room-nav');
const mainMount = document.getElementById('room-main');
const footerMount = document.getElementById('room-footer');

let teamData = null;
let currentRoleId = 'pineapple';
let activeMoodKey = 'happy';
let interactResetTimer = null;
let hasRevealedOnce = false;

function readRoleFromUrl(characters) {
  const params = new URLSearchParams(window.location.search);
  const reqId = params.get('role');
  const found = characters.find((c) => c.id === reqId);
  return found ? found.id : characters[0].id;
}

function getCurrentChar() {
  return teamData.characters.find((c) => c.id === currentRoleId) || teamData.characters[0];
}

function switchRole(roleId, pushHistory = true) {
  if (!teamData) return;
  const exists = teamData.characters.some((c) => c.id === roleId);
  if (!exists) return;
  if (getCustomRoomUrl(roleId)) {
    window.location.href = getRoomUrl(roleId);
    return;
  }
  clearTimeout(interactResetTimer);
  hideToast();
  currentRoleId = roleId;
  activeMoodKey = 'happy';
  if (pushHistory) {
    const url = new URL(window.location.href);
    url.searchParams.set('role', roleId);
    window.history.pushState({ roleId }, '', url.toString());
  }
  renderAll();
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

function triggerDioramaReaction() {
  const diorama = mainMount.querySelector('#roomDiorama');
  if (!diorama) return;
  const char = getCurrentChar();
  showToast(`${t(char.name)}：${t(char.interactionLine)}`);
  if (prefersReducedMotion()) return;

  clearTimeout(interactResetTimer);
  diorama.classList.remove('is-interacting');
  void diorama.offsetWidth;
  diorama.classList.add('is-interacting');
  interactResetTimer = setTimeout(() => {
    diorama.classList.remove('is-interacting');
  }, 1500);
}

function renderTopbar(char) {
  const lang = getLang();
  const rp = teamData.roomPage;

  navMount.innerHTML = `
    <div class="room-topbar" data-role="${char.id}">
      <div class="container room-topbar__inner">
        <a class="room-back-link" href="./index.html#lineup">
          ${iconSvg('arrowLeft')}
          <span class="room-back-link__text">${escapeHtml(t(rp.backToLineup))}</span>
        </a>

        <div class="room-topbar__plaque">
          <span class="door-card__plaque-dot" aria-hidden="true"></span>
          <span>${escapeHtml(t(char.roomName))} · ${escapeHtml(t(char.name))}</span>
          <span class="room-topbar__trait">${escapeHtml(t(char.trait))}</span>
        </div>

        <div class="lang-switch" role="group" aria-label="语言切换">
          <button type="button" class="lang-switch__btn${lang === 'zh' ? ' is-active' : ''}" data-room-lang="zh" aria-pressed="${lang === 'zh'}">中</button>
          <button type="button" class="lang-switch__btn${lang === 'ko' ? ' is-active' : ''}" data-room-lang="ko" aria-pressed="${lang === 'ko'}">한</button>
        </div>
      </div>
    </div>
  `;

  navMount.querySelectorAll('[data-room-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-room-lang');
      if (target !== getLang()) {
        setLang(target);
        showToast(teamData.nav.langSwitchToast[target]);
      }
    });
  });
}

function renderMain(char) {
  const rp = teamData.roomPage;
  const sec = teamData.lineupSection;
  const chars = teamData.characters;
  const idx = chars.findIndex((c) => c.id === char.id);
  const prevChar = chars[(idx - 1 + chars.length) % chars.length];
  const nextChar = chars[(idx + 1) % chars.length];
  const leaveNoteText = t(sec.leaveNoteTpl).replace('{name}', t(char.name));

  document.title = `${t(char.name)} · ${t(char.roomName)} | ${t(teamData.group.name)}`;
  mainMount.setAttribute('data-role', char.id);

  const moodsHtml = sec.moodList
    .map(
      (m) => `
      <button
        type="button"
        class="room-mood-pill${m.key === activeMoodKey ? ' is-active' : ''}"
        data-room-mood="${m.key}"
        aria-pressed="${m.key === activeMoodKey}"
      >
        ${escapeHtml(t(m.label))}
      </button>
    `
    )
    .join('');

  /* PRD §3.3：四栏可折叠档案默认全部展开，周边概念展柜明确标注“仅展示·不售卖” */
  const archiveHtml = sec.archiveTabs
    .map((tab, i) => {
      const isMerch = tab.key === 'merch';
      const revealAttr = hasRevealedOnce ? '' : ` style="--reveal-delay: ${i * 55}ms"`;
      return `
        <details open class="archive-accordion${hasRevealedOnce ? '' : ' reveal-up'}"${revealAttr}>
          <summary class="archive-accordion__summary">
            <span class="archive-accordion__head">
              <span class="archive-accordion__num">${escapeHtml(tab.num)}</span>
              <span class="archive-accordion__title">${escapeHtml(t(tab.label))}</span>
              ${isMerch ? `<span class="archive-accordion__badge">${escapeHtml(t(sec.merchBadge))}</span>` : ''}
            </span>
            <span class="archive-accordion__chevron" aria-hidden="true">${iconSvg('chevronDown')}</span>
          </summary>
          <p class="archive-accordion__body">${escapeHtml(t(char.archive[tab.key]))}</p>
        </details>
      `;
    })
    .join('');

  const neighborsHtml = chars
    .map(
      (c) => `
      <button
        type="button"
        class="neighbor-item${c.id === char.id ? ' is-current' : ''}"
        data-role="${c.id}"
        data-hop-role="${c.id}"
        aria-current="${c.id === char.id ? 'page' : 'false'}"
      >
        <img class="neighbor-item__img" src="${c.cutout}" alt="${escapeHtml(t(c.name))}" loading="lazy">
        <span>${escapeHtml(t(c.name))}</span>
      </button>
    `
    )
    .join('');

  mainMount.innerHTML = `
    <div class="container">
      <!-- 房间核心微缩舞台 -->
      <section class="room-hero-card">
        <div class="room-diorama-wrap">
          <div
            class="room-diorama"
            id="roomDiorama"
            data-role="${char.id}"
            data-fx="${char.interactionType}"
            role="button"
            tabindex="0"
            aria-label="${escapeHtml(t(rp.tapToInteract))}"
          >
            <div class="room-diorama__stage">
              <div class="door-card__speech" aria-live="polite">${escapeHtml(t(char.interactionLine))}</div>
              <div class="fx-layer" aria-hidden="true">
                <span class="fx-ring"></span>
                <span class="fx-ring-2"></span>
                <span class="fx-mote fx-mote--1"></span>
                <span class="fx-mote fx-mote--2"></span>
              </div>
              <img
                class="room-figure"
                src="${char.cutout}"
                alt="${escapeHtml(`${t(char.name)}（${t(char.fruit)}）3D 立体形象`)}"
                fetchpriority="high"
              >
              <div class="room-pedestal" aria-hidden="true">
                <div class="room-pedestal__shadow"></div>
              </div>
            </div>
          </div>

          <span class="room-diorama__hint">
            ${iconSvg('sparkle')}
            <span>${escapeHtml(t(rp.tapToInteract))}</span>
          </span>
        </div>

        <div class="room-intro">
          <div class="room-badges">
            <span class="room-badge-wood">
              <span class="door-card__plaque-dot" aria-hidden="true"></span>
              <span>${escapeHtml(t(rp.roomLabel))}：${escapeHtml(t(char.roomName))}</span>
            </span>
            <span class="room-badge-role">${escapeHtml(t(char.trait))}</span>
          </div>

          <h1 class="room-heading">${escapeHtml(t(char.name))}</h1>
          <p class="room-subtitle">${escapeHtml(t(char.title))}</p>

          <div class="room-quirk-box">
            <strong>${escapeHtml(t(rp.quirkLabel))}</strong>
            <span>${escapeHtml(t(char.quirk))}</span>
          </div>

          <div class="room-speech-card">
            <p class="room-speech-card__quote">${escapeHtml(t(char.catchphrase))}</p>
            <p class="room-speech-card__mood">${escapeHtml(t(char.moods[activeMoodKey]))}</p>
          </div>

          <div class="room-mood-block">
            <span class="room-mood-label">${escapeHtml(t(rp.moodSectionTitle))}</span>
            <div class="room-mood-pills" role="group" aria-label="心情状态切换">
              ${moodsHtml}
            </div>
          </div>

          <div class="room-cta-row">
            <a class="btn-amber" href="./index.html?mailbox=${encodeURIComponent(char.id)}#mailbox-portal">
              ${iconSvg('mail')}
              <span>${escapeHtml(leaveNoteText)}</span>
            </a>
            <button type="button" class="btn-wood" id="roomTriggerFxBtn">
              ${iconSvg('sparkle')}
              <span>${escapeHtml(t(rp.triggerBtn))}</span>
            </button>
          </div>
        </div>
      </section>

      <!-- 四栏可折叠房间档案 -->
      <section class="room-archive-section">
        <div class="storybook-divider" aria-hidden="true">${iconSvg('leaf')}</div>
        <div class="section-header">
          <div>
            <div class="section-kicker">
              <span class="section-kicker__dot" aria-hidden="true"></span>
              <span>${escapeHtml(t(rp.archiveSectionKicker))}</span>
            </div>
            <h2 class="section-title">${escapeHtml(t(rp.archiveSectionTitle))}</h2>
          </div>
        </div>

        <div class="room-archive-grid">
          ${archiveHtml}
        </div>
      </section>

      <!-- 串门导航：上一间 / 下一间 + 8位邻居快捷条 -->
      <section class="room-neighbors">
        <div>
          <span class="section-kicker">
            <span class="section-kicker__dot section-kicker__dot--moss" aria-hidden="true"></span>
            <span>${escapeHtml(t(rp.neighborsKicker))}</span>
          </span>
          <h2 class="charter-title">${escapeHtml(t(rp.neighborsTitle))}</h2>
        </div>

        <div class="room-hop-row">
          <button type="button" class="btn-wood" id="prevRoomBtn">
            ${iconSvg('arrowLeft')}
            <span>${escapeHtml(t(rp.prevRoomPrefix))}${escapeHtml(t(prevChar.name))}</span>
          </button>
          <button type="button" class="btn-amber" id="nextRoomBtn">
            <span>${escapeHtml(t(rp.nextRoomPrefix))}${escapeHtml(t(nextChar.name))}</span>
            ${iconSvg('arrowRight')}
          </button>
        </div>

        <div class="neighbor-dock" aria-label="其他角色房间">
          ${neighborsHtml}
        </div>
      </section>
    </div>
  `;

  bindRoomEvents(prevChar.id, nextChar.id);
  if (!hasRevealedOnce) {
    observeReveals(mainMount);
    hasRevealedOnce = true;
  }
}

function bindRoomEvents(prevId, nextId) {
  const diorama = mainMount.querySelector('#roomDiorama');
  if (diorama) {
    diorama.addEventListener('click', triggerDioramaReaction);
    diorama.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerDioramaReaction();
      }
    });

    if (!prefersReducedMotion()) {
      diorama.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return;
        const rect = diorama.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        diorama.style.setProperty('--rx', `${((0.5 - py) * 12).toFixed(2)}deg`);
        diorama.style.setProperty('--ry', `${((px - 0.5) * 14).toFixed(2)}deg`);
      });
      diorama.addEventListener('pointerleave', () => {
        diorama.style.setProperty('--rx', '0deg');
        diorama.style.setProperty('--ry', '0deg');
      });
    }
  }

  const triggerBtn = mainMount.querySelector('#roomTriggerFxBtn');
  if (triggerBtn) triggerBtn.addEventListener('click', triggerDioramaReaction);

  mainMount.querySelectorAll('[data-room-mood]').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeMoodKey = btn.getAttribute('data-room-mood');
      renderMain(getCurrentChar());
    });
  });

  const prevBtn = mainMount.querySelector('#prevRoomBtn');
  const nextBtn = mainMount.querySelector('#nextRoomBtn');
  if (prevBtn) prevBtn.addEventListener('click', () => switchRole(prevId));
  if (nextBtn) nextBtn.addEventListener('click', () => switchRole(nextId));

  mainMount.querySelectorAll('[data-hop-role]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-hop-role');
      if (id !== currentRoleId) switchRole(id);
    });
  });
}

function renderFooter() {
  const ft = teamData.footer;
  footerMount.innerHTML = `
    <div class="site-footer">
      <div class="container footer-inner">
        <div class="footer-brand">
          ${iconSvg('leaf', true)}
          <span>${escapeHtml(t(teamData.group.name))} ${escapeHtml(teamData.group.enName)}</span>
          ${iconSvg('leaf', true)}
        </div>
        <p class="footer-tagline">${escapeHtml(t(teamData.group.tagline))}</p>
        <nav class="footer-nav" aria-label="房间页脚导航">
          <a href="./index.html#hero">${escapeHtml(t(teamData.roomPage.backHome))}</a>
          <a href="./index.html#lineup">${escapeHtml(t(teamData.roomPage.backToLineup))}</a>
          <a href="./index.html#world">${escapeHtml(t(teamData.nav.items[3].label))}</a>
        </nav>
        <div class="footer-divider" aria-hidden="true"></div>
        <div class="footer-bottom">
          <p>${escapeHtml(t(ft.copyright))}</p>
          <span class="footer-shield">
            ${iconSvg('shield')}
            <span>${escapeHtml(t(ft.shield))}</span>
          </span>
        </div>
      </div>
    </div>
  `;
}

function renderAll() {
  if (!teamData) return;
  const char = getCurrentChar();
  renderTopbar(char);
  renderMain(char);
  renderFooter();
}

loadTeamData()
  .then((data) => {
    teamData = data;
    currentRoleId = readRoleFromUrl(data.characters);
    if (getCustomRoomUrl(currentRoleId)) {
      window.location.replace(getRoomUrl(currentRoleId));
      return;
    }
    renderAll();
    onLangChange(renderAll);
    window.addEventListener('popstate', () => {
      currentRoleId = readRoleFromUrl(teamData.characters);
      if (getCustomRoomUrl(currentRoleId)) {
        window.location.replace(getRoomUrl(currentRoleId));
        return;
      }
      activeMoodKey = 'happy';
      renderAll();
    });
  })
  .catch((err) => {
    console.error('[room.js]', err);
  });
