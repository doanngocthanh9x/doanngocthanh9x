// Admin page client script
(function(){
  function el(id){return document.getElementById(id)}

  function toBase64(file){
    return new Promise((res, rej)=>{
      const reader = new FileReader();
      reader.onload = ()=>{
        const data = reader.result.split(',')[1];
        res(data);
      };
      reader.onerror = ()=>rej(reader.error);
      reader.readAsDataURL(file);
    })
  }

  async function submit(e){
    e.preventDefault();
    const title = el('title').value.trim();
    const tags = el('tags').value.trim();
    const categories = el('categories').value.trim() || 'blog';
    const content = el('content').value || '';
    const pat = el('pat').value.trim();
    if(!title) return alert('Title is required');
    if(!pat) return alert('A Personal Access Token (PAT) is required to authenticate with GitHub');

    let image_filename = '';
    let image_base64 = '';
    const file = el('image').files && el('image').files[0];
    if(file){
      image_filename = file.name;
      try{ image_base64 = await toBase64(file); } catch(err){ return showResult('Failed to read image: '+err.message, true); }
    }

    showResult('Sending request to GitHub...', false);

    // detect owner/repo from location.host and SITE_BASEURL
    const host = window.location.hostname; // e.g. doanngocthanh9x.github.io
    const owner = host.split('.')[0] || '';
    let repo = (window.SITE_BASEURL || '').replace(/^\//,'');
    if(!owner || !repo){
      const manual = prompt('Could not detect owner or repo automatically. Enter owner/repo (e.g. user/repo):');
      if(!manual) return showResult('Owner/repo required', true);
      repo = manual.split('/')[1] || manual;
    }
    const full = owner + '/' + repo;

    const body = {
      event_type: 'create-post',
      client_payload: {
        title: title,
        content: content,
        tags: tags,
        categories: categories,
      }
    };
    if(image_filename && image_base64){ body.client_payload.image_filename = image_filename; body.client_payload.image_base64 = image_base64 }

    try{
      const res = await fetch('https://api.github.com/repos/'+full+'/dispatches', {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': 'token '+pat,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if(res.status===204){
        showResult('Dispatch sent — workflow will create the post. Check Actions tab for progress.', false);
      } else {
        const txt = await res.text();
        showResult('GitHub API responded: '+res.status+' '+txt, true);
      }
    }catch(err){
      showResult('Request failed: '+err.message, true);
    }
  }

  function showResult(msg, isError){
    const r = el('result');
    r.innerText = msg;
    r.style.color = isError ? 'crimson' : 'green';
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.getElementById('admin-form');
    if(form) form.addEventListener('submit', submit);
  })
})();
