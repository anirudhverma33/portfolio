# Research portfolio

Personal research site built with [Astro](https://astro.build): static HTML, with small islands of TypeScript for the interactive figures. No framework runtime ships to the browser.

## Run locally

```sh
npm install
npm run dev      # http://localhost:4321
npm test         # checks transcribed data against the thesis values, plus the simulator
npm run build    # writes dist/
```

## Content rules

Every number on the site lives in `src/lib/claims.ts`, with its kind (measured, theoretical bound, algebraic limit, analytical, simulated, model, projection), its source and the exact sentence it is quoted from. Pages show numbers only through `<Claim id="…" />` and `<ResultsTable ids={[…]} />`.

- A claim marked `needs-confirmation` fails the production build.
- Projections are never rendered.
- A case study without a contribution statement fails the build.
- Data tables in `src/data/` are transcribed from the BS thesis. `tests/sources.test.ts` recomputes the thesis values from them (for example S = 2.729230425 from Table 5.1).

To add a result: add it to `claims.ts` with its quote, then reference its id from the page.

## CV

The nav shows a CV link only when `public/cv.pdf` exists. Replace that file to update the CV.

## Deploy on GitHub Pages

1. Create a GitHub repository and push this project to its `main` branch.
2. In the repository, open Settings → Pages and set Source to **GitHub Actions**.
3. Each push to `main` runs the tests, builds the site and deploys it (`.github/workflows/deploy.yml`).

The site address follows the repository name:

- `anirudhverma33.github.io` → `https://anirudhverma33.github.io/`
- any other name, e.g. `portfolio` → `https://anirudhverma33.github.io/portfolio/`

Renaming the repository later, or adding a custom domain in Settings → Pages, needs no code change: the workflow passes the address to the build.

`documents/` (transcripts, certificates, the original CV) is git-ignored and never published.

## Licences

STIX Two and Instrument Sans are under the SIL Open Font License. Figures from published papers are reproduced with citation; the Phys. Rev. A figures are © American Physical Society.
