/* 负责人：角色阵容之门分块 · 填充 #lineup（3D 破框壁龛门卡、鼠标微倾视差、8种专属互动后进入个人房间页） */
import {
  loadTeamData,
  onLangChange,
  t,
  prefersReducedMotion,
  observeReveals,
  getRoomUrl,
  iconSvg,
  escapeHtml
} from './store.js';

const mount = document.getElementById('lineup');
let teamData = null;
let activeCategory = 'all';
let activeTraitRoleId = null;
let navigatingTimer = null;
let hasRevealedOnce = false;

function isCardMatched(char) {
  if (activeTraitRoleId) {
    return char.id === activeTraitRoleId;
  }
  if (activeCategory === 'all') return true;
  return char.category === activeCategory;
}

function render() {
  if (!mount || !teamData) return;
  const sec = teamData.lineupSection;
  const hasFilter = activeCategory !== 'all' || Boolean(activeTraitRoleId);

  const categoryHtml = sec.categories
    .map((cat) => {
      const active = !activeTraitRoleId && activeCategory === cat.key;
      return `<button type="button" class="filter-pill${active ? ' is-active' : ''}" data-filter-cat="${cat.key}" aria-pressed="${active}">${escapeHtml(t(cat.label))}</button>`;
    })
    .join('');

  const traitHtml = teamData.characters
    .map((char) => {
      const active = activeTraitRoleId === char.id;
      return `<button type="button" class="trait-chip${active ? ' is-active' : ''}" data-role="${char.id}" data-filter-trait="${char.id}" aria-pressed="${active}">${escapeHtml(t(char.trait))}</button>`;
    })
    .join('');

  const cardsHtml = teamData.characters
    .map((char, idx) => {
      const matched = isCardMatched(char);
      const stateClass = hasFilter ? (matched ? ' is-highlighted' : ' is-dimmed') : '';
      const revealClass = hasRevealedOnce ? '' : ' reveal-up';
      const revealStyle = hasRevealedOnce ? '' : ` style="--reveal-delay: ${idx * 45}ms"`;
      return `
        <article
          class="door-card${stateClass}${revealClass}"${revealStyle}
          data-role="${char.id}"
          data-fx="${char.interactionType}"
          role="link"
          tabindex="0"
          aria-label="${escapeHtml(`${t(char.name)} · ${t(char.roomName)} · ${t(sec.enterRoomBtn)}`)}"
        >
          <div class="door-card__shell">
            <div class="door-card__plaque">
              <span class="door-card__plaque-dot" aria-hidden="true"></span>
              <span>${escapeHtml(t(sec.plaquePrefix))}${escapeHtml(t(char.roomName))}</span>
            </div>

            <div class="door-card__niche">
              <div class="door-card__stage">
                <div class="door-card__speech" aria-live="polite">${escapeHtml(t(char.interactionLine))}</div>
                <div class="fx-layer" aria-hidden="true">
                  <span class="fx-ring"></span>
                  <span class="fx-ring-2"></span>
                  <span class="fx-mote fx-mote--1"></span>
                  <span class="fx-mote fx-mote--2"></span>
                </div>
                <img
                  class="door-card__figure"
                  src="${char.cutout}"
                  alt="${escapeHtml(`${t(char.name)}（${t(char.fruit)}）3D 立体形象`)}"
                  loading="lazy"
                >
                <div class="door-card__pedestal" aria-hidden="true">
                  <div class="door-card__ground-shadow"></div>
                </div>
              </div>
            </div>

            <div class="door-card__meta-row">
              <h3 class="door-card__name">${escapeHtml(t(char.name))}</h3>
              <span class="door-card__trait">${escapeHtml(t(char.trait))}</span>
            </div>

            <p class="door-card__role">${escapeHtml(t(char.title))}</p>

            <div class="door-card__quote">
              <p class="door-card__quote-text">${escapeHtml(t(char.tagline))}</p>
            </div>

            <span class="door-card__cta" aria-hidden="true">
              <span>${escapeHtml(t(sec.enterRoomBtn))}</span>
              ${iconSvg('arrowRight')}
            </span>
          </div>
        </article>
      `;
    })
    .join('');

  mount.innerHTML = `
    <div class="section-lineup">
      <div class="section-lineup__ambient" aria-hidden="true"></div>
      <div class="container">
        <div class="storybook-divider" aria-hidden="true">${iconSvg('leaf')}</div>
        <div class="section-header section-header--split">
          <div>
            <div class="section-kicker">
              <span class="section-kicker__dot" aria-hidden="true"></span>
              <span>${escapeHtml(t(sec.kicker))}</span>
            </div>
            <h2 class="section-title">${escapeHtml(t(sec.title))}</h2>
            <p class="section-lead">${escapeHtml(t(sec.lead))}</p>
          </div>

          <div class="filter-controls">
            <div class="filter-pills" role="group" aria-label="按气质筛选">
              ${categoryHtml}
            </div>
            <div class="trait-pills" role="group" aria-label="我像谁·按性格一词筛选">
              ${traitHtml}
            </div>
          </div>
        </div>

        <div class="door-grid" id="doorCardGrid">
          ${cardsHtml}
        </div>
      </div>
    </div>
  `;

  bindLineupEvents();
  if (!hasRevealedOnce) {
    observeReveals(mount);
    hasRevealedOnce = true;
  }
}

function triggerInteractionAndNavigate(card, roleId) {
  const targetUrl = getRoomUrl(roleId);

  /* PRD §5.4：减少动态效果时跳过专属动画，直接进入角色个人页 */
  if (prefersReducedMotion()) {
    window.location.href = targetUrl;
    return;
  }

  clearTimeout(navigatingTimer);
  mount.querySelectorAll('.door-card.is-interacting').forEach((c) => {
    if (c !== card) c.classList.remove('is-interacting');
  });

  card.classList.remove('is-interacting');
  void card.offsetWidth;
  card.classList.add('is-interacting');

  navigatingTimer = setTimeout(() => {
    window.location.href = targetUrl;
  }, 760);
}

function bindLineupEvents() {
  mount.querySelectorAll('[data-filter-cat]').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeTraitRoleId = null;
      activeCategory = btn.getAttribute('data-filter-cat');
      render();
    });
  });

  mount.querySelectorAll('[data-filter-trait]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-filter-trait');
      if (activeTraitRoleId === id) {
        activeTraitRoleId = null;
      } else {
        activeTraitRoleId = id;
        activeCategory = 'all';
      }
      render();
    });
  });

  const reduced = prefersReducedMotion();

  mount.querySelectorAll('.door-card').forEach((card) => {
    const roleId = card.getAttribute('data-role');
    const shell = card.querySelector('.door-card__shell');

    if (!reduced && shell) {
      card.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return;
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - py) * 14;
        const ry = (px - 0.5) * 16;
        shell.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
        shell.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
        shell.style.setProperty('--sheen-x', `${(px * 100).toFixed(0)}%`);
        shell.style.setProperty('--sheen-y', `${(py * 100).toFixed(0)}%`);
      });

      card.addEventListener('pointerleave', () => {
        shell.style.setProperty('--rx', '0deg');
        shell.style.setProperty('--ry', '0deg');
        shell.style.setProperty('--sheen-x', '50%');
        shell.style.setProperty('--sheen-y', '20%');
      });
    }

    card.addEventListener('click', () => triggerInteractionAndNavigate(card, roleId));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerInteractionAndNavigate(card, roleId);
      }
    });
  });
}

loadTeamData()
  .then((data) => {
    teamData = data;
    render();
    onLangChange(render);
  })
  .catch((err) => {
    console.error('[lineup.js]', err);
  });
