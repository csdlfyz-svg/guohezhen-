/* 负责人：导航与韩/中切换分块 · 填充 #nav（严格无登录/账号图标） */
import {
  loadTeamData,
  getLang,
  setLang,
  onLangChange,
  t,
  dispatchAction,
  showToast,
  iconSvg,
  escapeHtml
} from './store.js';

const mount = document.getElementById('nav');
let teamData = null;
let activeId = 'hero';
let drawerOpen = false;

function render() {
  if (!mount || !teamData) return;
  const lang = getLang();

  const navLinksHtml = teamData.nav.items
    .map((item) => {
      const activeClass = item.id === activeId ? ' is-active' : '';
      const ariaCurrent = item.id === activeId ? ' aria-current="page"' : '';
      return `<a class="nav-links__item${activeClass}" href="${item.href}" data-nav-id="${item.id}"${ariaCurrent}>${escapeHtml(t(item.label))}</a>`;
    })
    .join('');

  const drawerLinksHtml = teamData.nav.items
    .map(
      (item) =>
        `<a class="nav-drawer__link" href="${item.href}" data-drawer-id="${item.id}"><span>${escapeHtml(t(item.label))}</span>${iconSvg('arrowRight')}</a>`
    )
    .join('');

  mount.innerHTML = `
    <div class="site-nav">
      <div class="container site-nav__inner">
        <a class="brand-mark" href="#hero">
          <span class="brand-mark__emblem">${iconSvg('leaf', true)}</span>
          <span class="brand-mark__text">
            <span class="brand-mark__title">${escapeHtml(t(teamData.group.name))}</span>
            <span class="brand-mark__sub">${escapeHtml(teamData.group.enName)}</span>
          </span>
        </a>

        <nav class="nav-links" aria-label="主导航">
          ${navLinksHtml}
        </nav>

        <div class="nav-actions">
          <div class="lang-switch" role="group" aria-label="语言切换">
            <button type="button" class="lang-switch__btn${lang === 'zh' ? ' is-active' : ''}" data-set-lang="zh" aria-pressed="${lang === 'zh'}">中</button>
            <button type="button" class="lang-switch__btn${lang === 'ko' ? ' is-active' : ''}" data-set-lang="ko" aria-pressed="${lang === 'ko'}">한</button>
          </div>
          <button type="button" class="btn-amber nav-cta-desktop" id="navEnterHollowBtn">
            ${escapeHtml(t(teamData.nav.enterCta))}
          </button>
          <button type="button" class="nav-menu-toggle" id="navMenuToggle" aria-expanded="${drawerOpen}" aria-label="${escapeHtml(t(teamData.nav.menuAria))}">
            ${iconSvg(drawerOpen ? 'close' : 'menu')}
          </button>
        </div>
      </div>

      <div class="nav-drawer${drawerOpen ? ' is-open' : ''}" id="navDrawer">
        ${drawerLinksHtml}
        <button type="button" class="btn-amber" id="drawerEnterHollowBtn">
          ${iconSvg('door')}
          <span>${escapeHtml(t(teamData.nav.enterCta))}</span>
        </button>
      </div>
    </div>
  `;

  bindEvents();
}

function bindEvents() {
  mount.querySelectorAll('[data-set-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-set-lang');
      if (target !== getLang()) {
        setLang(target);
        showToast(teamData.nav.langSwitchToast[target]);
      }
    });
  });

  const enterBtn = mount.querySelector('#navEnterHollowBtn');
  if (enterBtn) {
    enterBtn.addEventListener('click', () => dispatchAction('enter-hollow'));
  }

  const drawerEnterBtn = mount.querySelector('#drawerEnterHollowBtn');
  if (drawerEnterBtn) {
    drawerEnterBtn.addEventListener('click', () => {
      drawerOpen = false;
      render();
      dispatchAction('enter-hollow');
    });
  }

  const menuToggle = mount.querySelector('#navMenuToggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      drawerOpen = !drawerOpen;
      render();
    });
  }

  mount.querySelectorAll('[data-nav-id], [data-drawer-id]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('data-nav-id') || link.getAttribute('data-drawer-id');
      if (id === 'mailbox') {
        e.preventDefault();
        drawerOpen = false;
        render();
        dispatchAction('open-mailbox');
        return;
      }
      if (drawerOpen) {
        drawerOpen = false;
        render();
      }
    });
  });
}

function setupScrollSpy() {
  const sectionIds = ['hero', 'lineup', 'world', 'team'];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && sectionIds.includes(entry.target.id)) {
          if (activeId !== entry.target.id) {
            activeId = entry.target.id;
            mount.querySelectorAll('.nav-links__item').forEach((item) => {
              const match = item.getAttribute('data-nav-id') === activeId;
              item.classList.toggle('is-active', match);
              if (match) {
                item.setAttribute('aria-current', 'page');
              } else {
                item.removeAttribute('aria-current');
              }
            });
          }
        }
      });
    },
    { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 }
  );

  sectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

loadTeamData()
  .then((data) => {
    teamData = data;
    render();
    setupScrollSpy();
    onLangChange(render);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawerOpen) {
        drawerOpen = false;
        render();
      }
    });
  })
  .catch((err) => {
    console.error('[nav.js]', err);
  });
