// Site-wide behaviour: appearance control, navigation state and entrance animations. No dependencies.

type Theme = 'system' | 'light' | 'dark';
const THEME_KEY = 'macpump-theme';
const root = document.documentElement;

function readTheme(): Theme {
  try {
    const t = localStorage.getItem(THEME_KEY);
    return t === 'light' || t === 'dark' ? t : 'system';
  } catch {
    return 'system';
  }
}

function applyTheme(theme: Theme) {
  if (theme === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', theme);
  try {
    if (theme === 'system') localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* Storage can be unavailable (private windows); the choice then lasts for this page only. */
  }
  document.querySelectorAll<HTMLButtonElement>('[data-theme-value]').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.themeValue === theme));
  });
}

applyTheme(readTheme());
document.querySelectorAll<HTMLButtonElement>('[data-theme-value]').forEach((b) => {
  b.addEventListener('click', () => applyTheme(b.dataset.themeValue as Theme));
});

// Navigation: a firmer glass once the page has scrolled, and the small-screen menu sheet.
const navEl = document.querySelector<HTMLElement>('[data-nav]');
const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-button]');
const menu = document.querySelector<HTMLElement>('[data-menu]');

if (navEl) {
  const onScroll = () => navEl.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function setMenu(open: boolean) {
  if (!menuButton || !menu) return;
  menuButton.setAttribute('aria-expanded', String(open));
  menu.hidden = !open;
}

menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
menu?.addEventListener('click', (e) => {
  if ((e.target as HTMLElement).closest('a')) setMenu(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 861px)').addEventListener('change', (e) => {
  if (e.matches) setMenu(false);
});

// Entrance animations: each [data-reveal] fades up once, the first time it scrolls into view.
const revealables = document.querySelectorAll<HTMLElement>('[data-reveal]');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  revealables.forEach((el) => io.observe(el));
} else {
  revealables.forEach((el) => el.classList.add('is-visible'));
}
