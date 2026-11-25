/* 负责人：小镇世界与投递箱分块 · 填充 #world（起源故事、3条守则、破框今日值班卡、果核投递箱与3:4分享图） */
import {
  loadTeamData,
  onLangChange,
  t,
  getTodayDutyIndex,
  prefersReducedMotion,
  observeReveals,
  getCssToken,
  getRoomUrl,
  onAction,
  showToast,
  iconSvg,
  escapeHtml
} from './store.js';

const mount = document.getElementById('world');
let teamData = null;
let activeMapRoleId = 'pineapple';
let hasRevealedOnce = false;

/* 投递箱弹层状态 */
let mailboxBackdrop = null;
let isMailboxOpen = false;
let selectedRoleId = 'pineapple';
let mailboxStage = 'write';
let safeCareReason = 'privacy';
let draftMessage = '';
let receiptReplyText = '';
let includeNoteInShare = false;
let stampTimer = null;

const PRIVACY_PATTERNS = [
  /1[3-9]\d{9}/,
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
  /\b\d{17}[\dXx]\b/,
  /\b010[-\s]?\d{4}[-\s]?\d{4}\b/
];

const DISTRESS_PATTERN = /(不想活|轻生|自杀|自残|割腕|跳楼|死掉算了|죽고\s*싶|자해|자살)/i;

function getDutyCharacter() {
  const idx = getTodayDutyIndex(teamData.meta.dutyEpochUtc, teamData.characters.length);
  return teamData.characters[idx];
}

function getCharacterById(id) {
  return teamData.characters.find((c) => c.id === id) || getDutyCharacter();
}

function render() {
  if (!mount || !teamData) return;
  const w = teamData.world;
  const dutyChar = getDutyCharacter();

  const revealCls = hasRevealedOnce ? '' : ' reveal-up';

  const rulesHtml = w.rules
    .map(
      (rule, idx) => `
      <article class="rule-card${revealCls}"${hasRevealedOnce ? '' : ` style="--reveal-delay: ${idx * 70}ms"`} data-role="${rule.role}">
        <span class="rule-card__watermark" aria-hidden="true">${escapeHtml(rule.num)}</span>
        <span class="rule-card__num">${escapeHtml(rule.num)}</span>
        <h4 class="rule-card__title">${escapeHtml(t(rule.title))}</h4>
        <p class="rule-card__desc">${escapeHtml(t(rule.desc))}</p>
      </article>
    `
    )
    .join('');

  const mapChar = getCharacterById(activeMapRoleId);

  const mapPinsHtml = teamData.characters
    .map((c) => {
      const active = c.id === mapChar.id;
      return `
        <button
          type="button"
          class="map-pin${active ? ' is-active' : ''}"
          data-role="${c.id}"
          data-map-pin="${c.id}"
          style="left: ${c.mapPin.x}%; top: ${c.mapPin.y}%;"
          aria-pressed="${active}"
          aria-label="${escapeHtml(`${t(c.roomName)} · ${t(c.name)}`)}"
        >
          <span class="map-pin__dot" aria-hidden="true"></span>
          <span class="map-pin__label">${escapeHtml(t(c.roomName))}</span>
        </button>
      `;
    })
    .join('');

  const mapChipsHtml = teamData.characters
    .map((c) => {
      const active = c.id === mapChar.id;
      return `
        <button
          type="button"
          class="world-map-chip${active ? ' is-active' : ''}"
          data-role="${c.id}"
          data-map-chip="${c.id}"
          aria-pressed="${active}"
        >
          <span class="door-card__plaque-dot" aria-hidden="true"></span>
          <span>${escapeHtml(t(c.roomName))} · ${escapeHtml(t(c.name))}</span>
        </button>
      `;
    })
    .join('');

  mount.innerHTML = `
    <div class="section-world">
      <div class="storybook-divider" aria-hidden="true">${iconSvg('leaf')}</div>
      <div class="container world-stack">
        <!-- 果核镇全景互动地图 -->
        <div class="world-map-block" id="worldMapBlock">
          <div class="section-header">
            <div>
              <div class="section-kicker">
                <span class="section-kicker__dot section-kicker__dot--moss" aria-hidden="true"></span>
                <span>${escapeHtml(t(w.mapKicker))}</span>
              </div>
              <h2 class="section-title">${escapeHtml(t(w.mapTitle))}</h2>
              <p class="section-lead">${escapeHtml(t(w.mapLead))}</p>
            </div>
          </div>

          <div class="world-map-frame">
            <div class="world-map-stage">
              <img
                class="world-map-stage__img"
                src="${w.mapImage}"
                alt="${escapeHtml(t(w.mapImageAlt))}"
                loading="lazy"
              >
              <div class="world-map-stage__vignette" aria-hidden="true"></div>
              ${mapPinsHtml}
            </div>
          </div>

          <div class="world-map-chips" role="group" aria-label="选择果核镇地图据点">
            ${mapChipsHtml}
          </div>

          <div class="world-map-inspector" data-role="${mapChar.id}">
            <div class="world-map-inspector__left">
              <div class="world-map-inspector__figure-box">
                <img
                  class="world-map-inspector__figure"
                  src="${mapChar.cutout}"
                  alt="${escapeHtml(t(mapChar.name))}"
                  loading="lazy"
                >
              </div>
              <div>
                <h3 class="world-map-inspector__title">
                  <span>${escapeHtml(t(mapChar.roomName))} · ${escapeHtml(t(mapChar.name))}</span>
                  <span class="door-card__trait">${escapeHtml(t(mapChar.trait))}</span>
                </h3>
                <p class="world-map-inspector__desc">${escapeHtml(t(mapChar.tagline))}</p>
                <span class="world-map-inspector__quirk">
                  ${iconSvg('sparkle')}
                  <span>${escapeHtml(t(teamData.roomPage.quirkLabel))}：${escapeHtml(t(mapChar.quirk))}</span>
                </span>
              </div>
            </div>
            <a class="btn-amber" href="${getRoomUrl(mapChar.id)}">
              <span>${escapeHtml(t(w.mapVisitBtn))}</span>
              ${iconSvg('arrowRight')}
            </a>
          </div>
        </div>

        <!-- 起源故事双栏 -->
        <div class="origin-grid${revealCls}">
          <div class="origin-visual">
            <img
              class="origin-visual__img"
              src="${teamData.hero.image}"
              alt="${escapeHtml(t(teamData.hero.imageAlt))}"
              loading="lazy"
            >
            <div class="origin-visual__sign">
              ${iconSvg('door')}
              <span>${escapeHtml(t(w.signboard))}</span>
            </div>
            <div class="origin-visual__tag">${escapeHtml(t(w.imageQuote))}</div>
          </div>

          <div class="origin-copy">
            <span class="origin-pill">
              <span class="section-kicker__dot section-kicker__dot--moss" aria-hidden="true"></span>
              <span>${escapeHtml(t(w.originKicker))}</span>
            </span>
            <h2 class="origin-title">${escapeHtml(t(w.originTitle))}</h2>
            <p class="origin-body">${escapeHtml(t(w.originBody))}</p>

            <div class="sanctuary-callout">
              <span class="sanctuary-callout__icon">${iconSvg('heart', true)}</span>
              <div>
                <h3 class="sanctuary-callout__title">${escapeHtml(t(w.sanctuaryTitle))}</h3>
                <p class="sanctuary-callout__desc">${escapeHtml(t(w.sanctuaryDesc))}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 3 条温暖守则 -->
        <div>
          <div class="charter-header">
            <span class="section-kicker">${escapeHtml(t(w.charterKicker))}</span>
            <h3 class="charter-title">${escapeHtml(t(w.charterTitle))}</h3>
          </div>
          <div class="rules-grid">
            ${rulesHtml}
          </div>
        </div>

        <!-- 双联焦点卡：破框今日值班卡（PRD §5.3）+ 果核投递箱 -->
        <div class="portal-duo${revealCls}" id="mailbox-portal">
          <article class="portal-card portal-card--duty" data-role="${dutyChar.id}">
            <div>
              <div class="portal-card__meta">
                <span class="portal-card__badge">${escapeHtml(t(w.duty.badge))}</span>
                <span class="portal-card__time">${escapeHtml(t(w.duty.hours))}</span>
              </div>

              <div class="duty-row">
                <div class="duty-row__pedestal">
                  <img
                    class="duty-row__figure"
                    src="${dutyChar.cutout}"
                    alt="${escapeHtml(t(dutyChar.name))}"
                    loading="lazy"
                  >
                </div>
                <div>
                  <h3 class="portal-card__title">${escapeHtml(t(dutyChar.name))} · ${escapeHtml(t(dutyChar.roomName))}${escapeHtml(t(w.duty.titleSuffix))}</h3>
                  <p class="portal-card__desc">${escapeHtml(t(dutyChar.dutyGreeting))}</p>
                </div>
              </div>
            </div>

            <div class="portal-card__actions">
              <button type="button" class="btn-wood" id="dutyGreetBtn">
                ${iconSvg('hand')}
                <span>${escapeHtml(t(w.duty.greetBtn))}</span>
              </button>
              <a class="btn-amber" href="${getRoomUrl(dutyChar.id)}">
                <span>${escapeHtml(t(w.duty.visitBtn))}</span>
                ${iconSvg('arrowRight')}
              </a>
            </div>
          </article>

          <article class="portal-card portal-card--mailbox">
            <span class="wax-badge-corner" aria-hidden="true">${iconSvg('mail', true)}</span>
            <div>
              <span class="mailbox-kicker">${escapeHtml(t(w.mailbox.kicker))}</span>
              <h3 class="portal-card__title">${escapeHtml(t(w.mailbox.title))}</h3>
              <p class="portal-card__desc">${escapeHtml(t(w.mailbox.desc))}</p>
            </div>
            <button type="button" class="btn-amber" id="openMailboxBtn">
              ${iconSvg('stamp')}
              <span>${escapeHtml(t(w.mailbox.openBtn))}</span>
            </button>
          </article>
        </div>
      </div>
    </div>
  `;

  bindWorldEvents(dutyChar);
  if (!hasRevealedOnce) {
    observeReveals(mount);
    hasRevealedOnce = true;
  }
  if (isMailboxOpen) renderMailboxModal();
}

function bindWorldEvents(dutyChar) {
  mount.querySelectorAll('[data-map-pin], [data-map-chip]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-map-pin') || btn.getAttribute('data-map-chip');
      if (id && id !== activeMapRoleId) {
        activeMapRoleId = id;
        render();
      }
    });
  });

  const greetBtn = mount.querySelector('#dutyGreetBtn');
  if (greetBtn) {
    greetBtn.addEventListener('click', () => {
      const msg = t(teamData.world.duty.greetToastTpl)
        .replace('{name}', t(dutyChar.name))
        .replace('{room}', t(dutyChar.roomName));
      showToast(msg);
    });
  }

  const openMailboxBtn = mount.querySelector('#openMailboxBtn');
  if (openMailboxBtn) {
    openMailboxBtn.addEventListener('click', () => openMailbox(dutyChar.id));
  }
}

function ensureMailboxModal() {
  if (mailboxBackdrop) return;
  mailboxBackdrop = document.createElement('div');
  mailboxBackdrop.id = 'mailboxModalBackdrop';
  mailboxBackdrop.className = 'modal-backdrop';
  mailboxBackdrop.setAttribute('role', 'dialog');
  mailboxBackdrop.setAttribute('aria-modal', 'true');
  mailboxBackdrop.setAttribute('aria-hidden', 'true');
  document.body.appendChild(mailboxBackdrop);

  mailboxBackdrop.addEventListener('click', (e) => {
    if (e.target === mailboxBackdrop) closeMailbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMailboxOpen) closeMailbox();
  });
}

function openMailbox(roleId) {
  if (!teamData) return;
  ensureMailboxModal();
  const validRole = teamData.characters.some((c) => c.id === roleId);
  selectedRoleId = validRole ? roleId : getDutyCharacter().id;
  mailboxStage = 'write';
  draftMessage = '';
  receiptReplyText = '';
  includeNoteInShare = false;
  isMailboxOpen = true;
  renderMailboxModal();
  mailboxBackdrop.classList.add('is-open');
  mailboxBackdrop.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeMailbox() {
  if (!isMailboxOpen || !mailboxBackdrop) return;
  clearTimeout(stampTimer);
  isMailboxOpen = false;
  mailboxBackdrop.classList.remove('is-open');
  mailboxBackdrop.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

function formatTodayDate() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

function handleMailboxSubmit() {
  const mb = teamData.world.mailbox;
  const text = draftMessage.trim();
  if (!text) {
    showToast(t(mb.emptyToast));
    return;
  }

  if (DISTRESS_PATTERN.test(text)) {
    safeCareReason = 'distress';
    mailboxStage = 'safe-care';
    renderMailboxModal();
    return;
  }

  if (PRIVACY_PATTERNS.some((re) => re.test(text))) {
    safeCareReason = 'privacy';
    mailboxStage = 'safe-care';
    renderMailboxModal();
    return;
  }

  const char = getCharacterById(selectedRoleId);
  const pool = char.replies || [];
  const chosen = pool[Math.floor(Math.random() * pool.length)] || char.catchphrase;
  receiptReplyText = t(chosen);

  if (prefersReducedMotion()) {
    mailboxStage = 'receipt';
    renderMailboxModal();
    return;
  }

  mailboxStage = 'stamping';
  renderMailboxModal();
  stampTimer = setTimeout(() => {
    mailboxStage = 'receipt';
    renderMailboxModal();
  }, 950);
}

/* PRD §4.2 & §6.3：纯原生 Canvas 导出 3:4 高清印章分享图（零硬编码色值，全部读取 CSS 令牌） */
function exportShareCard(char) {
  const canvas = document.createElement('canvas');
  canvas.width = 900;
  canvas.height = 1200;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const cream = getCssToken('--bg-canvas');
  const woodDeep = getCssToken('--bg-wood-deep');
  const textSecondary = getCssToken('--text-secondary');
  const waxRed = getCssToken('--accent-wax');
  const roleColor = getCssToken(char.colorToken);
  const roleSoft = getCssToken(char.softColorToken);

  ctx.fillStyle = woodDeep;
  ctx.fillRect(0, 0, 900, 1200);

  const pad = 56;
  ctx.fillStyle = cream;
  ctx.beginPath();
  ctx.roundRect(pad, pad, 900 - pad * 2, 1200 - pad * 2, 36);
  ctx.fill();

  ctx.fillStyle = roleSoft;
  ctx.beginPath();
  ctx.roundRect(pad + 32, pad + 32, 900 - (pad + 32) * 2, 200, 24);
  ctx.fill();

  ctx.fillStyle = woodDeep;
  ctx.font = '800 44px sans-serif';
  ctx.fillText(`${t(char.name)} · ${t(char.roomName)}`, pad + 64, pad + 118);

  ctx.fillStyle = roleColor;
  ctx.font = '700 26px sans-serif';
  ctx.fillText(`GUOHE TOWN · ${t(char.trait)}`, pad + 64, pad + 174);

  ctx.fillStyle = waxRed;
  ctx.beginPath();
  ctx.arc(900 - pad - 104, pad + 132, 54, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = cream;
  ctx.font = '800 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(t(teamData.world.mailbox.receiptStampLabel), 900 - pad - 104, pad + 140);
  ctx.textAlign = 'left';

  function drawWrapped(text, x, y, maxW, lineH) {
    let line = '';
    let curY = y;
    for (const ch of text) {
      const test = line + ch;
      if (ctx.measureText(test).width > maxW && line) {
        ctx.fillText(line, x, curY);
        line = ch;
        curY += lineH;
      } else {
        line = test;
      }
    }
    if (line) {
      ctx.fillText(line, x, curY);
      curY += lineH;
    }
    return curY;
  }

  ctx.fillStyle = woodDeep;
  ctx.font = '700 38px sans-serif';
  let nextY = drawWrapped(`“${receiptReplyText}”`, pad + 56, pad + 340, 900 - (pad + 56) * 2, 62);

  if (includeNoteInShare && draftMessage.trim()) {
    nextY += 40;
    ctx.fillStyle = roleSoft;
    ctx.beginPath();
    ctx.roundRect(pad + 48, nextY - 40, 900 - (pad + 48) * 2, 220, 22);
    ctx.fill();

    ctx.fillStyle = textSecondary;
    ctx.font = '500 26px sans-serif';
    drawWrapped(draftMessage.trim(), pad + 76, nextY + 12, 900 - (pad + 76) * 2, 42);
  }

  ctx.fillStyle = textSecondary;
  ctx.font = '600 24px sans-serif';
  ctx.fillText(`${t(teamData.group.name)} GUOHE TOWN`, pad + 56, 1200 - pad - 56);
  ctx.textAlign = 'right';
  ctx.fillText(formatTodayDate(), 900 - pad - 56, 1200 - pad - 56);

  const link = document.createElement('a');
  link.download = `guohe-receipt-${char.id}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
  showToast(t(teamData.world.mailbox.savedToast));
}

function renderMailboxModal() {
  if (!mailboxBackdrop || !teamData) return;
  const mb = teamData.world.mailbox;
  const char = getCharacterById(selectedRoleId);

  let bodyHtml = '';

  if (mailboxStage === 'write') {
    const roleStrip = teamData.characters
      .map(
        (c) => `
        <button type="button" class="mailbox-role-btn${c.id === selectedRoleId ? ' is-active' : ''}" data-role="${c.id}" data-mb-role="${c.id}">
          <img src="${c.cutout}" alt="${escapeHtml(t(c.name))}" width="24" height="28">
          <span>${escapeHtml(t(c.name))}</span>
        </button>
      `
      )
      .join('');

    bodyHtml = `
      <div class="mailbox-field-label"><span>${escapeHtml(t(mb.chooseRole))}</span></div>
      <div class="mailbox-role-strip">${roleStrip}</div>

      <label class="mailbox-field-label" for="mailboxInput">
        <span>${escapeHtml(t(mb.inputLabel))}</span>
        <span id="mailboxCounter">${draftMessage.length} / 100</span>
      </label>
      <textarea
        id="mailboxInput"
        class="mailbox-textarea"
        maxlength="100"
        placeholder="${escapeHtml(t(mb.placeholder))}"
      >${escapeHtml(draftMessage)}</textarea>

      <div class="mailbox-actions">
        <span class="mailbox-privacy-note">
          ${iconSvg('shield')}
          <span>${escapeHtml(t(mb.privacyNote))}</span>
        </span>
        <button type="button" class="btn-wax" id="submitMailboxBtn">
          ${iconSvg('stamp')}
          <span>${escapeHtml(t(mb.submitBtn))}</span>
        </button>
      </div>
    `;
  } else if (mailboxStage === 'stamping') {
    bodyHtml = `
      <div class="stamp-stage">
        <div class="wax-seal-emblem">${escapeHtml(t(mb.receiptStampLabel))}</div>
        <p class="receipt-card__reply">${escapeHtml(t(mb.stampingTitle))}</p>
      </div>
    `;
  } else if (mailboxStage === 'safe-care') {
    const reasonText = safeCareReason === 'distress' ? mb.safeCare.distressReason : mb.safeCare.privacyReason;
    bodyHtml = `
      <div class="safe-care-box">
        <h4 class="receipt-card__reply">${escapeHtml(t(mb.safeCare.title))}</h4>
        <p>${escapeHtml(t(reasonText))}</p>
        <div>
          <button type="button" class="btn-cream-outline" id="safeBackBtn">${escapeHtml(t(mb.safeCare.backBtn))}</button>
        </div>
      </div>
    `;
  } else if (mailboxStage === 'receipt') {
    bodyHtml = `
      <div class="receipt-card" data-role="${char.id}">
        <div class="receipt-card__top">
          <div class="receipt-card__sender">
            <img class="receipt-card__avatar" src="${char.cutout}" alt="${escapeHtml(t(char.name))}" width="52" height="58">
            <div>
              <strong>${escapeHtml(t(char.name))} · ${escapeHtml(t(char.roomName))}</strong>
              <div class="receipt-card__date">${formatTodayDate()}</div>
            </div>
          </div>
          <div class="receipt-card__seal" aria-hidden="true">${escapeHtml(t(mb.receiptStampLabel))}</div>
        </div>

        <p class="receipt-card__reply">“${escapeHtml(receiptReplyText)}”</p>

        ${includeNoteInShare ? `<p class="receipt-card__note">${escapeHtml(draftMessage.trim())}</p>` : ''}

        <label class="receipt-card__toggle">
          <input type="checkbox" id="toggleIncludeNote" ${includeNoteInShare ? 'checked' : ''}>
          <span>${escapeHtml(t(mb.includeNoteLabel))}</span>
        </label>

        <div class="receipt-card__btns">
          <button type="button" class="btn-wax" id="exportShareBtn">
            ${iconSvg('download')}
            <span>${escapeHtml(t(mb.saveImageBtn))}</span>
          </button>
          <button type="button" class="btn-cream-outline" id="copyReplyBtn">
            ${iconSvg('copy')}
            <span>${escapeHtml(t(mb.copyBtn))}</span>
          </button>
          <button type="button" class="btn-cream-outline" id="sendAgainBtn">
            ${escapeHtml(t(mb.againBtn))}
          </button>
        </div>
      </div>
    `;
  }

  mailboxBackdrop.innerHTML = `
    <div class="mailbox-modal">
      <div class="mailbox-modal__head">
        <span class="mailbox-modal__title">
          <span class="mailbox-modal__title-icon">${iconSvg('mail', true)}</span>
          <span>${escapeHtml(t(mb.modalTitle))}</span>
        </span>
        <button type="button" class="icon-close-btn icon-close-btn--light" id="closeMailboxBtn" aria-label="关闭投递箱">
          ${iconSvg('close')}
        </button>
      </div>
      ${bodyHtml}
    </div>
  `;

  mailboxBackdrop.querySelector('#closeMailboxBtn').addEventListener('click', closeMailbox);

  if (mailboxStage === 'write') {
    mailboxBackdrop.querySelectorAll('[data-mb-role]').forEach((btn) => {
      btn.addEventListener('click', () => {
        selectedRoleId = btn.getAttribute('data-mb-role');
        renderMailboxModal();
      });
    });
    const inputEl = mailboxBackdrop.querySelector('#mailboxInput');
    const counterEl = mailboxBackdrop.querySelector('#mailboxCounter');
    if (inputEl) {
      inputEl.addEventListener('input', () => {
        draftMessage = inputEl.value.slice(0, 100);
        if (counterEl) counterEl.textContent = `${draftMessage.length} / 100`;
      });
    }
    const submitBtn = mailboxBackdrop.querySelector('#submitMailboxBtn');
    if (submitBtn) submitBtn.addEventListener('click', handleMailboxSubmit);
  } else if (mailboxStage === 'safe-care') {
    const backBtn = mailboxBackdrop.querySelector('#safeBackBtn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        mailboxStage = 'write';
        renderMailboxModal();
      });
    }
  } else if (mailboxStage === 'receipt') {
    const toggle = mailboxBackdrop.querySelector('#toggleIncludeNote');
    if (toggle) {
      toggle.addEventListener('change', () => {
        includeNoteInShare = toggle.checked;
        renderMailboxModal();
      });
    }
    mailboxBackdrop.querySelector('#exportShareBtn').addEventListener('click', () => exportShareCard(char));
    mailboxBackdrop.querySelector('#copyReplyBtn').addEventListener('click', () => {
      const clip = `${t(char.name)}：${receiptReplyText} —— ${t(teamData.group.name)}`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(clip).then(() => showToast(t(mb.copiedToast)));
      } else {
        showToast(t(mb.copiedToast));
      }
    });
    mailboxBackdrop.querySelector('#sendAgainBtn').addEventListener('click', () => {
      draftMessage = '';
      mailboxStage = 'write';
      renderMailboxModal();
    });
  }
}

loadTeamData()
  .then((data) => {
    teamData = data;
    render();
    onLangChange(render);
    onAction('open-mailbox', ({ id }) => openMailbox(id));

    /* 承接来自角色个人房间页的 ?mailbox=<id> 参数 */
    const params = new URLSearchParams(window.location.search);
    const presetRole = params.get('mailbox');
    if (presetRole) {
      openMailbox(presetRole);
    }
  })
  .catch((err) => {
    console.error('[world.js]', err);
  });
