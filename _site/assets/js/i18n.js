/* Small client-side i18n loader.
   - Loads /assets/i18n/{lang}.json
   - Replaces elements with [data-i18n] keys
   - Stores selected language in localStorage
*/
(function () {
  const DEFAULT_LANG = 'vi';
  function getLang() {
    return localStorage.getItem('site_lang') || DEFAULT_LANG;
  }

  async function loadTranslations(lang) {
    try {
      const res = await fetch(new URL(`/assets/i18n/${lang}.json`, window.location.origin));
      if (!res.ok) throw new Error('i18n load failed');
      return await res.json();
    } catch (e) {
      if (lang !== DEFAULT_LANG) return loadTranslations(DEFAULT_LANG);
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
      if (v !== null && v !== undefined) el.textContent = v;
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
        localStorage.setItem('site_lang', next);
        const d = await loadTranslations(next);
        applyTranslations(d);
        setLangAttr(next);
      });
    });
  }

  // init on DOMContentLoaded
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
// Simple client-side i18n loader
(function(){
  const LANG_KEY = 'site_lang';
  const DEFAULT = 'vi';

  function fetchJson(url){
    return fetch(url).then(r=>{ if(!r.ok) throw new Error('Failed to load '+url); return r.json() });
  }

  function applyTranslations(obj){
    // find elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      const parts = key.split('.');
      let v = obj;
      for(const p of parts){ if(v && (p in v)) v = v[p]; else { v = null; break } }
      if(v === null) return;
      // support simple template for year replacement
      if(typeof v === 'string'){
        v = v.replace('{{year}}', new Date().getFullYear());
      }
      if(el.tagName.toLowerCase()==='input' || el.tagName.toLowerCase()==='textarea'){
        el.placeholder = v;
      } else {
        el.innerHTML = v;
      }
    })
  }

  function setLang(lang){
    const url = '/assets/i18n/' + lang + '.json';
    fetchJson(url).then(obj=>{
      applyTranslations(obj);
      localStorage.setItem(LANG_KEY, lang);
      // mark selector
      document.querySelectorAll('[data-lang-select]').forEach(el=>{
        el.classList.toggle('active', el.getAttribute('data-lang')===lang);
      })
    }).catch(err=>{
      console.error('i18n load failed', err);
    })
  }

  window.i18n = { setLang, getCurrent: ()=>localStorage.getItem(LANG_KEY) || DEFAULT };

  document.addEventListener('DOMContentLoaded', ()=>{
    const stored = localStorage.getItem(LANG_KEY) || DEFAULT;
    setLang(stored);

    // attach click handlers for language buttons
    document.querySelectorAll('[data-lang-select]').forEach(btn=>{
      btn.addEventListener('click', e=>{
        e.preventDefault();
        const l = btn.getAttribute('data-lang');
        setLang(l);
      })
    })
  })
})();
