/* vanilla slide engine — no dependencies */
(() => {
  const stage = document.querySelector<HTMLElement>('.deck-stage');
  if (!stage) return;

  const slides = Array.from(stage.querySelectorAll<HTMLElement>('.slide'));
  const counter = document.querySelector<HTMLElement>('.counter');
  const progress = document.querySelector<HTMLElement>('.progress');
  let i = 0;

  function go(n: number): void {
    i = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach((s, k) => s.classList.toggle('active', k === i));
    if (counter) counter.textContent = `${i + 1} / ${slides.length}`;
    if (progress) progress.style.width = `${((i + 1) / slides.length) * 100}%`;
    history.replaceState(null, '', `#${i + 1}`);
  }

  const fromHash = (): number => {
    const n = parseInt(location.hash.slice(1), 10);
    return Number.isFinite(n) ? n - 1 : 0;
  };

  document.querySelector<HTMLButtonElement>('.deck-btn.prev')?.addEventListener('click', () => go(i - 1));
  document.querySelector<HTMLButtonElement>('.deck-btn.next')?.addEventListener('click', () => go(i + 1));
  document.querySelector<HTMLButtonElement>('.deck-btn.fs')?.addEventListener('click', toggleFullscreen);

  function toggleFullscreen(): void {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen().catch(() => {});
  }

  const inField = (el: EventTarget | null): boolean =>
    el instanceof Element && !!el.closest('input, textarea, select, button, a, summary');

  document.addEventListener('keydown', (e) => {
    if (inField(e.target)) return;
    switch (e.key) {
      case 'ArrowRight': case 'PageDown': e.preventDefault(); go(i + 1); break;
      case 'ArrowLeft': case 'PageUp': e.preventDefault(); go(i - 1); break;
      case ' ': e.preventDefault(); go(e.shiftKey ? i - 1 : i + 1); break;
      case 'Home': go(0); break;
      case 'End': go(slides.length - 1); break;
      case 'f': case 'F': toggleFullscreen(); break;
    }
  });

  stage.addEventListener('click', (e) => {
    if (inField(e.target)) return;
    const x = (e as MouseEvent).clientX / window.innerWidth;
    go(x < 0.3 ? i - 1 : i + 1);
  });

  let wheelLock = 0;
  stage.addEventListener('wheel', (e) => {
    if (inField(e.target)) return;
    const now = Date.now();
    if (now - wheelLock < 450 || Math.abs(e.deltaY) < 24) return;
    wheelLock = now;
    go(i + (e.deltaY > 0 ? 1 : -1));
  }, { passive: true });

  let tx = 0;
  let ty = 0;
  stage.addEventListener('touchstart', (e) => {
    tx = e.changedTouches[0].clientX;
    ty = e.changedTouches[0].clientY;
  }, { passive: true });
  stage.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - tx;
    const dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) go(i + (dx < 0 ? 1 : -1));
  }, { passive: true });

  window.addEventListener('hashchange', () => go(fromHash()));
  go(fromHash());
})();
