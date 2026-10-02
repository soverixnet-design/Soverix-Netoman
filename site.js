(async function(){
  const q=s=>document.querySelector(s);
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const lines=v=>esc(v).replace(/\n/g,'<br>');
  const attr=v=>esc(v);
  try{
    const r=await fetch('site-data.json?cache='+Date.now());
    if(!r.ok)return;
    const d=await r.json();
    document.title=d.siteTitle||document.title;
    const meta=q('meta[name="description"]');if(meta&&d.siteDescription)meta.content=d.siteDescription;
    if(q('.brand'))q('.brand').textContent=d.brand||'SOVERIX NET';
    const nav=q('.navlinks')?.querySelectorAll('a')||[];
    if(nav[0])nav[0].textContent=d.nav?.packages||'প্যাকেজ';
    if(nav[1])nav[1].textContent=d.nav?.setup||'সেটআপ';
    if(nav[2])nav[2].textContent=d.nav?.faq||'প্রশ্ন ও উত্তর';
    const banner=q('main > .wa img');
    if(banner){banner.src=d.banner?.src||'oman-banner.png';banner.alt=d.banner?.alt||''}
    const hero=q('.hero');
    if(hero){
      const e=hero.querySelector('.eyebrow');if(e)e.textContent=d.hero?.eyebrow||'';
      const h=hero.querySelector('h1');if(h)h.innerHTML=lines(d.hero?.title);
      const ps=hero.querySelectorAll('p');if(ps[0])ps[0].textContent=d.hero?.description||'';if(ps[1])ps[1].textContent=d.hero?.small||'';
    }
    const service=q('.service');
    if(service){
      const label=service.querySelector('.service-top strong');if(label)label.textContent=d.service?.label||'';
      const h=service.querySelector('h2');if(h)h.innerHTML=lines(d.service?.title);
      const ul=service.querySelector('ul');if(ul)ul.innerHTML=(d.service?.items||[]).map(x=>'<li>'+esc(x)+'</li>').join('');
      const b=service.querySelector('.btn');if(b){b.textContent=d.service?.button||'';b.dataset.message=d.service?.message||''}
    }
    const strip=q('.strip');if(strip)(d.strip||[]).forEach((x,i)=>{if(strip.children[i])strip.children[i].textContent=x});
    const packageSection=q('#packages');
    if(packageSection){
      const e=packageSection.querySelector('.eyebrow');if(e)e.textContent=d.packages?.eyebrow||'';
      const h=packageSection.querySelector('h2');if(h)h.textContent=d.packages?.title||'';
      const intro=packageSection.querySelector('.section-intro');if(intro)intro.textContent=d.packages?.intro||'';
      const grid=packageSection.querySelector('.grid');
      if(grid)grid.innerHTML=(d.packages?.items||[]).map(p=>'<article class="card"><div class="tag">'+esc(p.tag)+'</div><h3>'+esc(p.title)+'</h3><p>'+esc(p.description)+'</p><p class="price">'+esc(p.price)+'</p><a class="btn '+(p.style==='secondary'?'secondary':'')+' wa" data-message="'+attr(p.message)+'">'+esc(p.button)+'</a></article>').join('');
    }
    const setup=q('#setup');
    if(setup){
      const e=setup.querySelector('.eyebrow');if(e)e.textContent=d.setup?.eyebrow||'';
      const h=setup.querySelector('h2');if(h)h.textContent=d.setup?.title||'';
      const steps=setup.querySelector('.steps');
      if(steps)steps.innerHTML=(d.setup?.items||[]).map(s=>'<article><span class="number">'+esc(s.number)+'</span><h3>'+esc(s.title)+'</h3><p>'+esc(s.description)+'</p></article>').join('');
    }
    const faq=q('#faq');
    if(faq){
      const h=faq.querySelector('h2');if(h)h.textContent=d.faq?.title||'';
      faq.querySelectorAll('details').forEach(x=>x.remove());
      (d.faq?.items||[]).forEach(x=>{const el=document.createElement('details');el.innerHTML='<summary>'+esc(x.question)+'</summary><p>'+esc(x.answer)+'</p>';faq.appendChild(el)});
    }
    const contact=q('.contact');
    if(contact){
      const h=contact.querySelector('h2');if(h)h.textContent=d.contact?.title||'';
      const p=contact.querySelector('p');if(p)p.textContent=d.contact?.description||'';
      const b=contact.querySelector('.btn');if(b){b.textContent=d.contact?.button||'';b.dataset.message=d.contact?.message||''}
    }
    const foot=q('footer');
    if(foot){const spans=foot.querySelectorAll('.foot span');if(spans[0])spans[0].textContent=d.footer?.copyright||'';if(spans[1])spans[1].textContent=d.footer?.note||''}
    document.querySelectorAll('.wa').forEach(a=>{a.href='https://wa.me/'+String(d.whatsapp||'').replace(/\D/g,'')+'?text='+encodeURIComponent(a.dataset.message||'');a.target='_blank';a.rel='noopener noreferrer'});
  }catch(_){/* Keep the built-in page if the editable data file is unavailable. */}
})();
