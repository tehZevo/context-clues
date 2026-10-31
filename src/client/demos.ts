/* vanilla interactive demos — no dependencies */
(() => {
  /* token chipifier: type text, see it split into approximate tokens */
  document.querySelectorAll<HTMLElement>('[data-demo="tokens"]').forEach((root) => {
    const input = root.querySelector<HTMLInputElement>('input[type="text"]');
    const chips = root.querySelector<HTMLElement>('.chips-target');
    const countEl = root.querySelector<HTMLElement>('[data-count]');
    if (!input || !chips) return;

    const tokenize = (t: string): { text: string; punct: boolean }[] => {
      const out: { text: string; punct: boolean }[] = [];
      for (const chunk of t.split(/\s+/).filter(Boolean)) {
        for (const m of chunk.match(/[\p{L}\p{N}'-]+|[^\p{L}\p{N}]+/gu) ?? []) {
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
                `<span class="chip${t.punct ? ' punct' : ''}">${t.text.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</span>`,
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
    if (!slider.value || Number(slider.value) > words.length) {
      slider.value = String(Math.ceil(words.length * 0.45));
    }

    const render = (): void => {
      const n = Math.min(Number(slider.value), words.length);
      spans.forEach((s, k) => s.classList.toggle('out', k >= n));
      if (meta) {
        meta.innerHTML =
          `<span>window: first ${n} of ${words.length} words</span>` +
          `<span>${words.length - n > 0 ? `${words.length - n} beyond the window — trimmed or compacted` : 'whole input fits'}</span>`;
      }
    };

    slider.addEventListener('input', render);
    render();
  });

  /* lazy-load deck iframes only when their <details> is opened */
  document.querySelectorAll<HTMLDetailsElement>('details.deckembed').forEach((d) => {
    const f = d.querySelector<HTMLIFrameElement>('iframe[data-src]');
    if (!f) return;
    d.addEventListener('toggle', () => {
      if (d.open && !f.src) f.src = f.dataset.src ?? '';
    });
  });
})();
