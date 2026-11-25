/* 负责人：果核镇共同团队 · 共享数据加载、双语状态 {ko, zh}、值班算法、跨页语言同步与事件总线 */

const LANG_STORAGE_KEY = 'guohe_lang_v1';
let dataPromise = null;
let currentLang = readSavedLang();
let toastTimer = null;

function readSavedLang() {
  try {
    const saved = sessionStorage.getItem(LANG_STORAGE_KEY);
    return saved === 'ko' ? 'ko' : 'zh';
  } catch {
    return 'zh';
  }
}

document.documentElement.lang = currentLang === 'ko' ? 'ko' : 'zh-CN';

export function loadTeamData() {
  if (!dataPromise) {
    dataPromise = fetch('./data/team.json').then((res) => {
      if (!res.ok) {
        throw new Error(`无法加载 data/team.json (HTTP ${res.status})`);
      }
      return res.json();
    });
  }
  return dataPromise;
}

export function getLang() {
  return currentLang;
}

export function setLang(nextLang) {
  const normalized = nextLang === 'ko' ? 'ko' : 'zh';
  if (normalized === currentLang) return;
  currentLang = normalized;
  document.documentElement.lang = currentLang === 'ko' ? 'ko' : 'zh-CN';
  try {
    sessionStorage.setItem(LANG_STORAGE_KEY, currentLang);
  } catch {
    /* 隐私模式忽略写入 */
  }
  window.dispatchEvent(new CustomEvent('guohe:langchange', { detail: { lang: currentLang } }));
}

export function onLangChange(handler) {
  window.addEventListener('guohe:langchange', (e) => handler(e.detail.lang));
}

export function t(bilingual) {
  if (!bilingual) return '';
  if (typeof bilingual === 'string') return bilingual;
  return bilingual[currentLang] || bilingual.zh || bilingual.ko || '';
}

export function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* PRD §4.4：按用户本地日历日期转 UTC 零点计算 8 天循环值班索引，避免跨时区与夏令时漂移 */
export function getTodayDutyIndex(epochStr = '2026-01-01', count = 8) {
  const now = new Date();
  const localAsUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const parts = String(epochStr).split('-').map(Number);
  const epochUtc = Date.UTC(parts[0] || 2026, (parts[1] || 1) - 1, parts[2] || 1);
  const dayDiff = Math.floor((localAsUtc - epochUtc) / 86400000);
  return ((dayDiff % count) + count) % count;
}

export function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* 温和的绘本翻页式滚动浮现（开启减少动态时立即可见） */
export function observeReveals(root = document) {
  const nodes = root.querySelectorAll('.reveal-up');
  if (!nodes.length) return;
  if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
    nodes.forEach((el) => el.classList.add('is-revealed'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px 40px 0px', threshold: 0.01 }
  );
  nodes.forEach((el) => io.observe(el));
}

export function getCssToken(tokenName) {
  return getComputedStyle(document.documentElement).getPropertyValue(tokenName).trim();
}

const CUSTOM_ROOM_URLS = {
  bergamot: './characters/foxiaogan/index.html'
};

export function getCustomRoomUrl(roleId) {
  return CUSTOM_ROOM_URLS[roleId] || null;
}

export function getRoomUrl(roleId) {
  return CUSTOM_ROOM_URLS[roleId] || `./room.html?role=${encodeURIComponent(roleId)}`;
}

export function dispatchAction(name, detail = {}) {
  window.dispatchEvent(new CustomEvent(`guohe:${name}`, { detail }));
}

export function onAction(name, handler) {
  window.addEventListener(`guohe:${name}`, (e) => handler(e.detail || {}));
}

export function hideToast() {
  const root = document.getElementById('toast-root');
  clearTimeout(toastTimer);
  if (root) root.classList.remove('is-visible');
}

export function showToast(message) {
  const root = document.getElementById('toast-root');
  if (!root) return;
  root.innerHTML = `${iconSvg('sparkle')}<span>${escapeHtml(message)}</span>`;
  root.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    root.classList.remove('is-visible');
  }, 2600);
}

/* 纯原生矢量图标（全部继承 currentColor，严禁硬编码颜色值） */
const SVG_PATHS = {
  leaf: '<path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8Z"/>',
  verified: '<path d="M12 2 14.9 4.2l3.6-.3.9 3.5 3.1 1.9-1.3 3.4 1.3 3.4-3.1 1.9-.9 3.5-3.6-.3L12 22l-2.9-2.2-3.6.3-.9-3.5-3.1-1.9 1.3-3.4-1.3-3.4 3.1-1.9.9-3.5 3.6.3L12 2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="m8.8 12.2 2.2 2.2 4.4-4.4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  door: '<path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M3 21h18M15 12h.01" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  arrowDown: '<path d="M12 5v14m0 0-5-5m5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  arrowRight: '<path d="M5 12h14m0 0-5-5m5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  arrowLeft: '<path d="M19 12H5m0 0 5-5m-5 5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  arrowUp: '<path d="M12 19V5m0 0-5 5m5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  chevronDown: '<path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
  book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  heart: '<path d="M12 20.5s-7.5-4.7-9.3-9A5.4 5.4 0 0 1 12 6.4a5.4 5.4 0 0 1 9.3 5.1c-1.8 4.3-9.3 9-9.3 9Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  close: '<path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  globe: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  sparkle: '<path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" fill="currentColor"/>',
  shield: '<path d="M12 3 5 6v6c0 4.5 3 7.8 7 9 4-1.2 7-4.5 7-9V6l-7-3Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  hand: '<path d="M18 11V6a1.5 1.5 0 0 0-3 0v4m0-5a1.5 1.5 0 0 0-3 0v5m0-4a1.5 1.5 0 0 0-3 0v6.5L7.6 11a1.5 1.5 0 0 0-2.3 1.9l3.9 5.5A5 5 0 0 0 13.3 21H15a5 5 0 0 0 5-5v-5a1.5 1.5 0 0 0-2 0Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  download: '<path d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  stamp: '<path d="M5 20h14M6 17h12v-1a3 3 0 0 0-3-3h-1V9a3 3 0 1 0-4 0v4H9a3 3 0 0 0-3 3v1Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>'
};

export function iconSvg(name, large = false) {
  const path = SVG_PATHS[name] || SVG_PATHS.sparkle;
  const cls = large ? 'icon-svg icon-svg--lg' : 'icon-svg';
  const fillAttr = name === 'leaf' || name === 'sparkle' ? 'currentColor' : 'none';
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="${fillAttr}" aria-hidden="true">${path}</svg>`;
}
