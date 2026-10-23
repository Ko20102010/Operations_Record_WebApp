# Deployment Guide v0.4.00

## GitHub Pages
Upload `index.html`, `manifest.webmanifest`, `.nojekyll`, `README.md` and this file to the repository root. Enable GitHub Pages from the `main` branch and `/(root)` folder.

## Netlify
- Sign in to Netlify.
- Add new site > Deploy manually.
- Drag the unzipped project folder into the upload area.
- Netlify creates a public URL.

## Cloudflare Pages
- Push the project to GitHub.
- In Cloudflare Dashboard, open Workers & Pages.
- Create application > Pages > Connect to Git.
- Select the repository.
- Framework preset: None.
- Build command: leave empty.
- Build output directory: `/`.
- Deploy.

## Vercel
- Push the project to GitHub.
- In Vercel, choose Add New > Project.
- Import the repository.
- Framework preset: Other.
- Leave build command empty.
- Output directory: `.`
- Deploy.

## Shared database later
This package does not yet share data across devices. Recommended later options:
- Supabase: managed PostgreSQL, authentication and storage.
- PocketBase: lightweight self-hosted backend.
- Firebase: managed authentication, database and storage.

Never put admin passwords, service-role keys or database secrets inside `index.html` or a public GitHub repository.
