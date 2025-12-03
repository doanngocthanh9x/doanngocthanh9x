/* Client-side i18n loader (single consolidated implementation)
   - Respects site baseurl via window.SITE_BASEURL (injected by layout)
   - Loads /assets/i18n/{lang}.json (prefixed with baseurl when present)
   - Replaces elements with [data-i18n] keys
   - Stores selected language in localStorage
*/
(function () {
  const DEFAULT_LANG = 'vi';
  const LANG_KEY = 'site_lang';

  function getLang() {
    return localStorage.getItem(LANG_KEY) || DEFAULT_LANG;
  }

  function sitePath(path) {
    // window.SITE_BASEURL should be set in layout (e.g. '/repo-name' or '')
    const base = (window.SITE_BASEURL || '').replace(/\/$/, '');
    if (!path.startsWith('/')) path = '/' + path;
    return (base ? base + path : path);
  }

  async function fetchJson(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load ' + url);
    return res.json();
  }

  async function loadTranslations(lang) {
    try {
      const url = sitePath('/assets/i18n/' + lang + '.json');
      return await fetchJson(url);
    } catch (e) {
      if (lang !== DEFAULT_LANG) return loadTranslations(DEFAULT_LANG);
      console.error('i18n load failed', e);
      return {};
    }
  }

  function applyTranslations(obj) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const parts = key.split('.');
      let v = obj;
      for (let p of parts) {
        if (v && (p in v)) v = v[p]; else { v = null; break; }
      }
      if (v === null) return;
      if (typeof v === 'string') v = v.replace('{{year}}', new Date().getFullYear());
      if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
        el.placeholder = v;
      } else {
        el.textContent = v;
      }
    });
  }

  function setLangAttr(lang) {
    try { document.documentElement.lang = lang; } catch (e) {}
  }

  async function init() {
    const lang = getLang();
    const data = await loadTranslations(lang);
    applyTranslations(data);
    setLangAttr(lang);

    // wire up language selector links
    document.querySelectorAll('[data-lang-select]').forEach(a => {
      a.addEventListener('click', async (ev) => {
        ev.preventDefault();
        const next = a.getAttribute('data-lang');
        localStorage.setItem(LANG_KEY, next);
        const d = await loadTranslations(next);
        applyTranslations(d);
        setLangAttr(next);
        // mark selector
        document.querySelectorAll('[data-lang-select]').forEach(el=>{
          el.classList.toggle('active', el.getAttribute('data-lang')===next);
        })
      });
    });
  }

  // init on DOMContentLoaded
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
