# Monir Bounadi academic website

A single-page static academic website for `www.monirbounadi.com`, hosted with GitHub Pages.

## Local preview

Open `index.html` in a browser.

## Deploy

Publish the repository root from the `gh-pages` branch of [`monirbounadi/monirbounadi`](https://github.com/monirbounadi/monirbounadi). The `CNAME` file configures the custom domain `www.monirbounadi.com`; keep it in the published root and ensure the domain's DNS records point to GitHub Pages.

Replace `assets/cv/BounadiCV.pdf` with the current CV.

The `tmp/` directory and LaTeX intermediate files in `assets/cv/` (`.aux`, `.dvi`, `.fdb_latexmk`, `.fls`, `.log`, `.out`, and `.synctex.gz`) are ignored and should not be deployed. Keep `BounadiCV.tex` and the generated `BounadiCV.pdf`.

Published articles are stored locally in `assets/publications/`, so their links remain valid when the site replaces the previous build or the domain changes.
