# Operations Support Frontline WebApp v0.0.00

Mobile-first static MVP for reporting STW1/STW2 issues.

## Features
- Plant: STW1 / STW2
- Material: 05mm / 10mm / 20mm
- Issue types: Mechanical, IT System, Replenishment
- Bilingual UI and Chinese-default WhatsApp copy
- Photo preview
- Impact status colors
- Browser-local Open Issues list

## Important limitation
This v0.0.00 is a static MVP. Reports use browser localStorage, so records are not shared between phones or computers. Photo files are previewed only and are not permanently uploaded. Connect a shared backend (Supabase, PocketBase, Firebase, etc.) in a later version for shared records.

## GitHub Pages
1. Create a new GitHub repository.
2. Upload all files in this folder to the repository root.
3. Open Settings > Pages.
4. Under Build and deployment, choose Deploy from a branch.
5. Select main and /(root), then Save.
6. Wait for the deployment link.

## Local preview
Open index.html directly, or run a local server:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080
