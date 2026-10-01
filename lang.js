/* CiteMind – language switcher (IT / EN) & interaction enhancements */
(function () {
  const STORAGE_KEY = 'citemind_lang';

  let titleIT = '';
  let titleEN = '';

  function extractTitles() {
    const titleEl = document.querySelector('title');
    if (!titleEl) return;
    const raw = titleEl.innerHTML;
    const itMatch = raw.match(/class=["']lang-it["'][^>]*>([\s\S]*?)<\/span>/i);
    const enMatch = raw.match(/class=["']lang-en["'][^>]*>([\s\S]*?)<\/span>/i);
    if (itMatch && enMatch) {
      titleIT = itMatch[1].trim();
      titleEN = enMatch[1].trim();
    } else {
      titleIT = titleEN = titleEl.textContent.trim();
    }
  }

  function getSavedLang() {
    // 1. Check URL query string: ?lang=en or ?lang=it
    try {
      if (window.location.search) {
        const params = new URLSearchParams(window.location.search);
        const qLang = params.get('lang');
        if (qLang === 'en' || qLang === 'it') return qLang;
      }
    } catch (e) {}

    // 2. Check URL hash: #lang=en or #en
    try {
      const hash = (window.location.hash || '').toLowerCase();
      if (hash.includes('lang=en') || hash === '#en') return 'en';
      if (hash.includes('lang=it') || hash === '#it') return 'it';
    } catch (e) {}

    // 3. Check localStorage (for http/https servers)
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'it') return stored;
    } catch (e) {}

    // 4. Check sessionStorage
    try {
      const session = sessionStorage.getItem(STORAGE_KEY);
      if (session === 'en' || session === 'it') return session;
    } catch (e) {}

    return 'it';
  }

  function buildLangHref(href, lang) {
    if (!href || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('#') || href.startsWith('mailto:')) {
      return href;
    }
    const parts = href.split('#');
    const fileAndQuery = parts[0];
    const hash = parts.length > 1 ? '#' + parts[1] : '';
    const file = fileAndQuery.split('?')[0];
    return file + '?lang=' + lang + hash;
  }

  function updateInternalLinks(lang) {
    document.querySelectorAll('a[href]').forEach(function (link) {
      const href = link.getAttribute('href');
      const newHref = buildLangHref(href, lang);
      if (newHref !== href) {
        link.setAttribute('href', newHref);
      }
    });
  }

  function applyLang(lang) {
    const safeLang = (lang === 'en') ? 'en' : 'it';
    const isEN = safeLang === 'en';

    if (document.documentElement) {
      document.documentElement.setAttribute('data-lang', safeLang);
      document.documentElement.setAttribute('lang', safeLang);
      document.documentElement.classList.remove('lang-en', 'lang-it');
    }
    if (document.body) {
      document.body.setAttribute('data-lang', safeLang);
      document.body.classList.remove('lang-en', 'lang-it');
    }

    // Update active button state
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      const active = btn.getAttribute('data-lang') === safeLang;
      btn.classList.toggle('active', active);
    });

    // Update browser tab title
    if (!titleIT && !titleEN) {
      extractTitles();
    }
    if (titleIT || titleEN) {
      document.title = isEN ? (titleEN || titleIT) : (titleIT || titleEN);
    }
  }

  function setLang(lang) {
    const safeLang = (lang === 'en') ? 'en' : 'it';

    // Persist in localStorage and sessionStorage
    try {
      localStorage.setItem(STORAGE_KEY, safeLang);
    } catch (e) {}
    try {
      sessionStorage.setItem(STORAGE_KEY, safeLang);
    } catch (e) {}

    // Update URL query string without reloading page
    try {
      if (window.history && window.history.replaceState) {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', safeLang);
        window.history.replaceState(null, '', url.pathname.split('/').pop() + url.search + url.hash);
      }
    } catch (e) {}

    applyLang(safeLang);
    updateInternalLinks(safeLang);
  }

  // Restore saved preference early (safe for <head> execution, prevents flicker)
  const initialLang = getSavedLang();
  if (document.documentElement) {
    document.documentElement.setAttribute('data-lang', initialLang);
    document.documentElement.setAttribute('lang', initialLang);
    document.documentElement.classList.remove('lang-en', 'lang-it');
  }

  document.addEventListener('DOMContentLoaded', function () {
    extractTitles();
    applyLang(initialLang);
    updateInternalLinks(initialLang);

    // Language switcher buttons
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        setLang(btn.getAttribute('data-lang'));
      });
    });

    // Event delegation: ensure any clicked internal link preserves current language
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href');
      const currentLang = document.documentElement.getAttribute('data-lang') || initialLang;
      const newHref = buildLangHref(href, currentLang);
      if (newHref !== href) {
        link.setAttribute('href', newHref);
      }
    });

    // Dropdown toggle on click (supports mobile and prevents desktop flickering)
    document.querySelectorAll('.dropdown').forEach(function (dropdown) {
      const trigger = dropdown.querySelector('span, a');
      if (trigger) {
        trigger.addEventListener('click', function (e) {
          if (e.target === trigger || trigger.contains(e.target)) {
            const isOpen = dropdown.classList.contains('open');
            document.querySelectorAll('.dropdown.open').forEach(function (d) {
              if (d !== dropdown) d.classList.remove('open');
            });
            dropdown.classList.toggle('open', !isOpen);
          }
        });
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown.open').forEach(function (d) {
          d.classList.remove('open');
        });
      }
    });
  });
})();
