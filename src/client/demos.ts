/* vanilla interactive demos — no dependencies */
(() => {
  /* token chipifier: type text, see it split into approximate tokens */
  document.querySelectorAll<HTMLElement>('[data-demo="tokens"]').forEach((root) => {
    const input = root.querySelector<HTMLInputElement>('input[type="text"]');
    const chips = root.querySelector<HTMLElement>('.chips-target');
    const countEl = root.querySelector<HTMLElement>('[data-count]');
    if (!input || !chips) return;

    const GLUE = '\u2060';
    const tokenize = (t: string): { text: string; punct: boolean }[] => {
      const out: { text: string; punct: boolean }[] = [];
      const glued = t
        .replace(/\bnew\s+york\b/gi, (m) => m.replace(/\s+/g, GLUE))
        .replace(/(unbeliev)able/gi, '$1 able');
      for (const chunk of glued.split(/\s+/).filter(Boolean)) {
        for (const m of chunk.match(/[\p{L}\p{N}'\u2060-]+|[^\p{L}\p{N}]+/gu) ?? []) {
          out.push({ text: m, punct: !/[\p{L}\p{N}]/u.test(m) });
        }
      }
      return out;
    };

    const render = (): void => {
      const tokens = tokenize(input.value);
      chips.innerHTML = tokens.length
        ? tokens
            .map(
              (t) =>
                `<span class="chip${t.punct ? ' punct' : ''}">${t.text.replace(/\u2060/g, ' ').replace(/&/g, '&amp;').replace(/</g, '&lt;')}</span>`,
            )
            .join('')
        : '<span class="chips-note">type something above…</span>';
      if (countEl) countEl.textContent = `≈ ${tokens.length} tokens`;
    };

    input.addEventListener('input', render);
    render();
  });

  /* context-window trimmer: a fixed-size window sees only part of the input */
  document.querySelectorAll<HTMLElement>('[data-demo="ctxwin"]').forEach((root) => {
    const text = root.querySelector<HTMLElement>('.ctx-text');
    const slider = root.querySelector<HTMLInputElement>('input[type="range"]');
    const meta = root.querySelector<HTMLElement>('.cw-meta');
    if (!text || !slider) return;

    const words = (text.textContent ?? '').split(/\s+/).filter(Boolean);
    const spans: HTMLSpanElement[] = [];
    text.textContent = '';
    for (const w of words) {
      const s = document.createElement('span');
      s.textContent = `${w} `;
      text.appendChild(s);
      spans.push(s);
    }

    slider.max = String(words.length);
    slider.min = String(Math.max(4, Math.floor(words.length / 6)));
    slider.value = String(words.length);

    const render = (): void => {
      const n = Math.min(Number(slider.value), words.length);
      spans.forEach((s, k) => s.classList.toggle('out', k >= n));
      if (meta) {
        meta.innerHTML =
          `<span>window: last ${words.length - n} word${words.length - n === 1 ? '' : 's'} dropped from the end</span>` +
          `<span>${words.length - n > 0 ? `${n} of ${words.length} still in the window` : 'whole input fits — drag left to drop words'}</span>`;
      }
    };

    slider.addEventListener('input', render);
    render();
  });

  /* mobile hamburger for the TOC */
  const toc = document.querySelector<HTMLElement>('.toc');
  const tocToggle = document.querySelector<HTMLButtonElement>('.toc-toggle');
  if (toc && tocToggle) {
    const setOpen = (v: boolean): void => {
      toc.classList.toggle('open', v);
      tocToggle.setAttribute('aria-expanded', String(v));
    };
    tocToggle.addEventListener('click', () => setOpen(!toc.classList.contains('open')));
    for (const l of toc.querySelectorAll('.toc-link')) l.addEventListener('click', () => setOpen(false));
    document.addEventListener('click', (e) => {
      if (!(e.target instanceof Element) || !e.target.closest('.toc')) setOpen(false);
    });
  }

  /* scrollspy for the sticky course sidebar */
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.toc-link'));
  if (links.length) {
    const byId = new Map<string, HTMLAnchorElement>();
    for (const a of links) {
      const sec = document.getElementById(a.getAttribute('href')!.slice(1));
      if (sec) byId.set(sec.id, a);
    }
    const spy = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          links.forEach((l) => l.classList.remove('active'));
          byId.get(e.target.id)?.classList.add('active');
        }
      },
      { rootMargin: '-12% 0px -70% 0px' },
    );
    for (const id of byId.keys()) spy.observe(document.getElementById(id)!);
  }
})();
