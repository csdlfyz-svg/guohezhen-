/* 负责人：页脚与右下角双语胶囊分块 · 填充 #footer（严禁学号与真实姓名） */
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

const mount = document.getElementById('footer');
let teamData = null;

function render() {
  if (!mount || !teamData) return;
  const lang = getLang();
  const ft = teamData.footer;

  const quickLinksHtml = teamData.nav.items
    .map((item) => `<a href="${item.href}" data-footer-nav="${item.id}">${escapeHtml(t(item.label))}</a>`)
    .join('');

  mount.innerHTML = `
    <div class="site-footer">
      <div class="container footer-inner">
        <div class="footer-brand">
          ${iconSvg('leaf', true)}
          <span>${escapeHtml(t(teamData.group.name))} ${escapeHtml(teamData.group.enName)}</span>
          ${iconSvg('leaf', true)}
        </div>

        <p class="footer-tagline">${escapeHtml(t(teamData.group.tagline))}</p>

        <nav class="footer-nav" aria-label="页脚导航">
          ${quickLinksHtml}
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

    <div class="floating-lang-pill">
      <button type="button" class="floating-lang-pill__btn" id="floatingLangBtn">
        ${iconSvg('globe')}
        <span>${escapeHtml(ft.floatingLang[lang])}</span>
      </button>
      <button type="button" class="floating-lang-pill__top" id="backToTopBtn" aria-label="${escapeHtml(t(ft.backToTopAria))}">
        ${iconSvg('arrowUp')}
      </button>
    </div>
  `;

  mount.querySelectorAll('[data-footer-nav="mailbox"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      dispatchAction('open-mailbox');
    });
  });

  const floatBtn = mount.querySelector('#floatingLangBtn');
  if (floatBtn) {
    floatBtn.addEventListener('click', () => {
      const next = getLang() === 'zh' ? 'ko' : 'zh';
      setLang(next);
      showToast(teamData.nav.langSwitchToast[next]);
    });
  }

  const topBtn = mount.querySelector('#backToTopBtn');
  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

loadTeamData()
  .then((data) => {
    teamData = data;
    render();
    onLangChange(render);
  })
  .catch((err) => {
    console.error('[footer.js]', err);
  });
