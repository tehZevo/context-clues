# Context Clues

A practical, hype-free AI curriculum. Read every course as one page, or present any section with its own slide deck.

**Live site: https://tehzevo.github.io/context-clues/**

## Courses

- **101 · AI Foundations** — what AI, ML, and LLMs actually are: models, tokens, context windows, chat framing, and where the machinery lies.
- 201 Agentic AI, 301 Beyond Text, 401 The Singularity — coming soon.

## Under the hood

TypeScript sources compile to fully self-contained HTML pages (inline CSS + vanilla JS) via `build.mjs` — no runtime dependencies. Each page can be copied anywhere and opened offline; slide decks are plain-HTML files with keyboard/touch navigation.

```
src/
  frame.ts              shared page shell & course tabs
  catalog.ts            course registry
  styles/               tokens, layout, diagrams, deck themes
  components/           venn, flow, chips, chat mock, callouts…
  client/               vanilla slide engine + interactive demos
  content/101/          sections — each exports prose AND slides
build.mjs               bundles everything into dist/*.html
```

## Develop

```sh
npm ci
node build.mjs            # build -> dist/
node build.mjs --serve    # serve dist at http://localhost:4173
npm run typecheck
```

Pushes to `master` deploy to GitHub Pages automatically.
