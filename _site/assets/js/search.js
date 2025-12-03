/* Simple client-side search that fetches /api/posts.json and /api/tags.json
   - supports search by text (title, excerpt, content) and tag filter
   - renders results into #search-results
*/
(function () {
  async function fetchJSON(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('fetch failed');
      return await res.json();
    } catch (e) {
      console.error('Failed to fetch', url, e);
      return null;
    }
  }

  function normalize(s){ return (s||'').toString().toLowerCase(); }

  async function initSearch() {
    const postsResp = await fetchJSON('/api/posts.json');
    const tagsResp = await fetchJSON('/api/tags.json');
    const posts = (postsResp && postsResp.posts) || [];

    const queryInput = document.getElementById('search-query');
    const tagSelect = document.getElementById('search-tag');
    const resultsEl = document.getElementById('search-results');

    // populate tag select
    if (tagSelect && tagsResp && tagsResp.tags) {
      // empty option
      const emptyOpt = document.createElement('option'); emptyOpt.value=''; emptyOpt.textContent='--'; tagSelect.appendChild(emptyOpt);
      Object.keys(tagsResp.tags).sort().forEach(t => {
        const opt = document.createElement('option'); opt.value = t; opt.textContent = t; tagSelect.appendChild(opt);
      });
    }

    function renderResults(list){
      if (!resultsEl) return;
      resultsEl.innerHTML = '';
      if (!list || list.length === 0) {
        resultsEl.innerHTML = '<p>No results.</p>';
        return;
      }
      const ul = document.createElement('div');
      ul.className = 'list-group';
      list.forEach(p => {
        const item = document.createElement('a');
        item.className = 'list-group-item list-group-item-action';
        item.href = p.url;
        item.innerHTML = `<h5>${p.title}</h5><p>${(p.excerpt||'').substring(0,200)}</p>`;
        ul.appendChild(item);
      });
      resultsEl.appendChild(ul);
    }

    function doSearch(){
      const q = normalize(queryInput && queryInput.value);
      const tag = tagSelect && tagSelect.value;
      const filtered = posts.filter(p => {
        if (tag && (!p.tags || (p.tags.indexOf(tag) === -1))) return false;
        if (!q) return true;
        return normalize(p.title).includes(q) || normalize(p.excerpt).includes(q) || normalize(p.content).includes(q) || (p.tags && p.tags.join(' ').toLowerCase().includes(q));
      });
      renderResults(filtered);
    }

    if (queryInput) queryInput.addEventListener('input', doSearch);
    if (tagSelect) tagSelect.addEventListener('change', doSearch);

    // initial render - show latest posts
    renderResults(posts.slice(0, 10));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initSearch);
  else initSearch();
})();
