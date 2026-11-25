/* 负责人：团队介绍与留声板分块 · 填充 #team（8果全家福展示、透明3D抠图回执头像、无计数本地贴纸留声板） */
import {
  loadTeamData,
  onLangChange,
  t,
  observeReveals,
  iconSvg,
  escapeHtml
} from './store.js';

const mount = document.getElementById('team');
const STORAGE_KEY = 'guohe_echo_stickers_v1';
let teamData = null;
let hasRevealedOnce = false;

function readStickersState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveStickersState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* 隐私模式忽略写入 */
  }
}

function render() {
  if (!mount || !teamData) return;
  const sec = teamData.teamSection;
  const stampedMap = readStickersState();

  const revealCls = hasRevealedOnce ? '' : ' reveal-up';

  const echoesHtml = sec.echoes
    .map((echo, idx) => {
      const char = teamData.characters.find((c) => c.id === echo.characterId) || teamData.characters[0];
      const stickersHtml = sec.stickers
        .map((st) => {
          const key = `${echo.id}:${st.id}`;
          const isStamped = Boolean(stampedMap[key]);
          return `
            <button
              type="button"
              class="sticker-btn${isStamped ? ' is-stamped' : ''}"
              data-sticker-key="${key}"
              aria-pressed="${isStamped}"
            >
              ${escapeHtml(t(st.label))}
            </button>
          `;
        })
        .join('');

      return `
        <article class="echo-card${revealCls}"${hasRevealedOnce ? '' : ` style="--reveal-delay: ${idx * 75}ms"`} data-role="${char.id}">
          <span class="echo-card__postmark">
            ${iconSvg('leaf')}
            <span>GUOHE POST · ${escapeHtml(t(char.roomName))}</span>
          </span>
          <p class="echo-card__story">“${escapeHtml(t(echo.story))}”</p>

          <div class="echo-card__reply">
            <span class="echo-card__avatar-wrap">
              <img class="echo-card__avatar" src="${char.cutout}" alt="${escapeHtml(t(char.name))}" loading="lazy" width="38" height="44">
            </span>
            <div>
              <span class="echo-card__reply-name">${escapeHtml(t(char.name))} · ${escapeHtml(t(char.roomName))}</span>
              <p class="echo-card__reply-text">${escapeHtml(t(echo.reply))}</p>
            </div>
          </div>

          <div class="echo-card__stickers" role="group" aria-label="无计数共鸣贴纸">
            ${stickersHtml}
          </div>
        </article>
      `;
    })
    .join('');

  mount.innerHTML = `
    <div class="section-team">
      <div class="container">
        <div class="storybook-divider" aria-hidden="true">${iconSvg('leaf')}</div>
        <!-- 团队介绍 + 8 角色全景全家福 -->
        <div class="team-showcase${revealCls}">
          <div class="team-showcase__media">
            <img
              class="team-showcase__img"
              src="${sec.groupImage}"
              alt="${escapeHtml(t(sec.groupImageAlt))}"
              loading="lazy"
            >
          </div>
          <div class="team-showcase__info">
            <span class="section-kicker">
              <span class="section-kicker__dot" aria-hidden="true"></span>
              <span>${escapeHtml(t(sec.kicker))}</span>
            </span>
            <h2 class="origin-title">${escapeHtml(t(sec.title))}</h2>
            <p class="origin-body">${escapeHtml(t(sec.desc))}</p>
          </div>
        </div>

        <!-- 果核留声板（精选无压共鸣明信片，无评论、无排行、无计数） -->
        <div class="echoes-header">
          <span class="section-kicker">
            <span class="section-kicker__dot section-kicker__dot--moss" aria-hidden="true"></span>
            <span>${escapeHtml(t(sec.echoesKicker))}</span>
          </span>
          <h3 class="charter-title">${escapeHtml(t(sec.echoesTitle))}</h3>
          <p class="section-lead">${escapeHtml(t(sec.echoesLead))}</p>
        </div>

        <div class="echoes-grid">
          ${echoesHtml}
        </div>
      </div>
    </div>
  `;

  mount.querySelectorAll('[data-sticker-key]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-sticker-key');
      const next = readStickersState();
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = true;
      }
      saveStickersState(next);
      render();
    });
  });

  if (!hasRevealedOnce) {
    observeReveals(mount);
    hasRevealedOnce = true;
  }
}

loadTeamData()
  .then((data) => {
    teamData = data;
    render();
    onLangChange(render);
  })
  .catch((err) => {
    console.error('[team.js]', err);
  });
