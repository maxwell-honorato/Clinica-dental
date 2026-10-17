/* ── Nav sticky ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('sticky', scrollY > 60));

/* ── Hamburger ── */
const ham = document.getElementById('ham');
const mob = document.getElementById('mobMenu');
let open = false;
ham.addEventListener('click', () => {
  open = !open;
  mob.classList.toggle('open', open);
  const s = ham.querySelectorAll('span');
  if (open) { s[0].style.transform='rotate(45deg)translate(4px,4px)'; s[1].style.opacity='0'; s[2].style.transform='rotate(-45deg)translate(4px,-4px)'; }
  else { s.forEach(x => { x.style.transform=''; x.style.opacity=''; }); }
});
function closeMob() {
  open = false; mob.classList.remove('open');
  ham.querySelectorAll('span').forEach(x => { x.style.transform=''; x.style.opacity=''; });
}

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('up'); });
}, { threshold: 0.1 });
revealEls.forEach(el => ro.observe(el));

/* ── Counter ── */
function animCount(el, target, suffix='', prefix='') {
  const dur = 1600; const start = performance.now();
  const isInt = target % 1 === 0;
  (function step(ts) {
    const p = Math.min((ts-start)/dur,1);
    const ease = 1-Math.pow(1-p,3);
    const val = isInt ? Math.round(ease*target) : (ease*target).toFixed(1);
    el.textContent = prefix + val + suffix;
    if(p<1) requestAnimationFrame(step);
  })(performance.now());
}
const co = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      const el=e.target, t=parseFloat(el.dataset.target), s=el.dataset.suffix||'', p=el.dataset.prefix||'';
      animCount(el,t,s,p); co.unobserve(el);
    }
  });
}, {threshold:.5});
document.querySelectorAll('[data-target]').forEach(el => co.observe(el));

/* ── Slots ── */
document.querySelectorAll('.slot').forEach(s => {
  s.addEventListener('click', () => { document.querySelectorAll('.slot').forEach(x=>x.classList.remove('active')); s.classList.add('active'); });
});

/* ── Lightbox ── */
function openLightbox(src) {
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('keydown', e => { if(e.key==='Escape') closeLightbox(); });

/* ── Form ── */
function submitForm() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'), 4000);
}
