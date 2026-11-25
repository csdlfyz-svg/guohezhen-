/* 负责人：首屏主视觉分块 · 填充 #hero（树洞推进互动、3层视差、8位3D抠图角色快览条与 reduced-motion 降级） */
import {
  loadTeamData,
  onLangChange,
  t,
  prefersReducedMotion,
  getRoomUrl,
  onAction,
  showToast,
  iconSvg,
  escapeHtml
} from './store.js';

const mount = document.getElementById('hero');
let teamData = null;
let transitionTimer = null;
let isTransitioning = false;
let overlayEl = null;

function ensureOverlay() {
  if (!overlayEl) {
    overlayEl = document.createElement('div');
    overlayEl.id = 'treeHollowTransition';
    overlayEl.className = 'portal-transition';
    overlayEl.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlayEl);
  }
  const tr = teamData.hero.transition;
  overlayEl.innerHTML = `
    <div class="portal-transition__glow"></div>
    <button type="button" class="portal-transition__skip" id="skipPortalBtn">
      ${escapeHtml(t(tr.skip))} ✕
    </button>
    <div class="portal-transition__inner">
      <div class="portal-transition__icon">${iconSvg('door', true)}</div>
      <span class="section-kicker">${escapeHtml(t(tr.kicker))}</span>
      <h2 class="portal-transition__title">${escapeHtml(t(tr.title))}</h2>
      <p class="portal-transition__desc">${escapeHtml(t(tr.desc))}</p>
      <div class="portal-transition__bar"><div class="portal-transition__fill"></div></div>
    </div>
  `;

  const skipBtn = overlayEl.querySelector('#skipPortalBtn');
  if (skipBtn) {
    skipBtn.addEventListener('click', finishPortalTransition);
  }
}

function finishPortalTransition() {
  clearTimeout(transitionTimer);
  const stage = mount.querySelector('#heroPortalStage');
  if (stage) stage.classList.remove('is-pushing');
  if (overlayEl) {
    overlayEl.classList.remove('is-active');
    overlayEl.setAttribute('aria-hidden', 'true');
  }
  const lineupEl = document.getElementById('lineup');
  if (lineupEl) {
    lineupEl.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }
  if (teamData) {
    showToast(t(teamData.hero.transition.doneToast));
  }
  isTransitioning = false;
}

function triggerPortalTransition() {
  if (isTransitioning || !teamData) return;

  if (prefersReducedMotion()) {
    finishPortalTransition();
    return;
  }

  isTransitioning = true;
  ensureOverlay();

  const stage = mount.querySelector('#heroPortalStage');
  if (stage) stage.classList.add('is-pushing');

  requestAnimationFrame(() => {
    overlayEl.classList.add('is-active');
    overlayEl.setAttribute('aria-hidden', 'false');
  });

  transitionTimer = setTimeout(finishPortalTransition, 900);
}

function render() {
  if (!mount || !teamData) return;
  const hero = teamData.hero;

  const castStripHtml = teamData.characters
    .map(
      (char) => `
      <a class="hero__cast-chip" data-role="${char.id}" href="${getRoomUrl(char.id)}">
        <span class="hero__cast-avatar-box">
          <img class="hero__cast-avatar" src="${char.cutout}" alt="${escapeHtml(t(char.name))}" width="34" height="40">
        </span>
        <span>${escapeHtml(t(char.name))}</span>
      </a>
    `
    )
    .join('');

  mount.innerHTML = `
    <div class="hero" id="heroStageWrap">
      <div class="hero__bg" aria-hidden="true">
        <img class="hero__bg-img" id="heroParallaxBg" src="${hero.image}" alt="" fetchpriority="high">
      </div>
      <div class="hero__scrim" aria-hidden="true"></div>
      <div class="hero__radial" aria-hidden="true"></div>
      <div class="hero__dust" id="heroParallaxDust" aria-hidden="true">
        <span class="dust-dot dust-dot--1"></span>
        <span class="dust-dot dust-dot--2"></span>
        <span class="dust-dot dust-dot--3"></span>
        <span class="dust-dot dust-dot--4"></span>
        <span class="dust-dot dust-dot--5"></span>
        <span class="dust-dot dust-dot--6"></span>
      </div>

      <div class="container hero__content">
        <div class="hero__portal-frame" id="heroParallaxFrame">
          <div class="hero__portal-stage" id="heroPortalStage" role="button" tabindex="0" aria-label="${escapeHtml(t(hero.primaryCta))}">
            <img
              class="hero__portal-img"
              src="${hero.image}"
              alt="${escapeHtml(t(hero.imageAlt))}"
              fetchpriority="high"
            >

            <button type="button" class="hero__hotspot" id="heroHotspotBtn">
              <span class="hotspot-pulse" aria-hidden="true"></span>
              <span>${escapeHtml(t(hero.hotspot))}</span>
            </button>

            <div class="hero__caption">
              <div>
                <span class="hero__caption-kicker">${escapeHtml(t(hero.kicker))}</span>
                <h1 class="hero__caption-title">${escapeHtml(t(hero.headline))}</h1>
              </div>
              <div class="hero__resident-badge">
                <span class="hero__resident-dot" aria-hidden="true"></span>
                <span>${escapeHtml(t(hero.residentStatus))}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="hero__cast-strip" aria-label="果核镇8位水果居民快览">
          ${castStripHtml}
        </div>

        <div class="hero__cta-row">
          <button type="button" class="btn-amber hero__cta-primary" id="heroPrimaryCta">
            ${iconSvg('door')}
            <span>${escapeHtml(t(hero.primaryCta))}</span>
            ${iconSvg('arrowDown')}
          </button>
          <a class="btn-wood" href="#world">
            ${iconSvg('book')}
            <span>${escapeHtml(t(hero.secondaryCta))}</span>
          </a>
        </div>
      </div>
    </div>
  `;

  ensureOverlay();
  bindEvents();
}

function bindEvents() {
  const stage = mount.querySelector('#heroPortalStage');
  const hotspot = mount.querySelector('#heroHotspotBtn');
  const primaryCta = mount.querySelector('#heroPrimaryCta');

  if (hotspot) {
    hotspot.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerPortalTransition();
    });
  }

  if (stage) {
    stage.addEventListener('click', triggerPortalTransition);
    stage.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerPortalTransition();
      }
    });
  }

  if (primaryCta) {
    primaryCta.addEventListener('click', triggerPortalTransition);
  }

  const heroWrap = mount.querySelector('#heroStageWrap');
  const bgImg = mount.querySelector('#heroParallaxBg');
  const dust = mount.querySelector('#heroParallaxDust');
  const frame = mount.querySelector('#heroParallaxFrame');

  if (heroWrap && !prefersReducedMotion()) {
    heroWrap.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const rect = heroWrap.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      if (bgImg) bgImg.style.transform = `scale(1.06) translate(${(-nx * 14).toFixed(1)}px, ${(-ny * 10).toFixed(1)}px)`;
      if (dust) dust.style.transform = `translate(${(nx * 12).toFixed(1)}px, ${(ny * 10).toFixed(1)}px)`;
      if (frame) frame.style.transform = `translate(${(nx * 4).toFixed(1)}px, ${(ny * 3).toFixed(1)}px)`;
    });

    heroWrap.addEventListener('pointerleave', () => {
      if (bgImg) bgImg.style.transform = 'scale(1.06)';
      if (dust) dust.style.transform = '';
      if (frame) frame.style.transform = '';
    });
  }
}

loadTeamData()
  .then((data) => {
    teamData = data;
    render();
    onLangChange(render);
    onAction('enter-hollow', triggerPortalTransition);
  })
  .catch((err) => {
    console.error('[hero.js]', err);
  });
