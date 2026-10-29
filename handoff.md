# Project Handoff

This document is the continuity guide for another developer, AI assistant, or chat. Keep it current whenever the project’s purpose, UX decisions, architecture, release state, or validation status changes. Update the relevant sections rather than adding a chronological transcript.

## Project at a glance

- **Product:** Operations Support Frontline WebApp.
- **Purpose:** A lightweight, phone-friendly tool for frontline staff to report plant/material issues, record operational impact, and follow up on open and completed issues.
- **Current app release:** `v0.8.11`.
- **App source folder:** `ops_v0.8.03` (the folder name is historical and does not indicate the current app release).
- **Implementation:** Static HTML, CSS, and vanilla JavaScript; no package manifest, framework, or build step was found in the app folder.
- **Data model and persistence:** Reports are stored in the browser’s `localStorage`, under `ops_issues_v080`. Data is local to that browser/device; it is not centrally synchronized.
- **Accounts and backend:** The current project is a frontend-only app. It has no implemented login, account system, API, or server-side report storage. Do not describe locally stored data as shared, backed up, or protected by an account.
- **Deployment:** The project is intended for GitHub Pages from the repository root. See `DEPLOYMENT.md`.
- **Current handoff date:** 2026-10-29.

## Product and UX decisions

Treat these as established user preferences unless the user changes them:

1. **Audience and priority:** Optimize for frontline staff completing and checking reports quickly, especially on a phone. Keep screens clear, readable, accessible, and focused on useful actions.
2. **Dashboard:** Keep the view clean and actionable. Show open work and suspended operations; do not add a “Reports submitted” metric as if it were a frontline KPI. Do not duplicate the History action beside Recent Reports when History is already in the bottom navigation.
3. **Report action:** Keep report creation easy to reach and visually prominent in the bottom navigation.
4. **Language:** Provide English and Traditional Chinese (`zh-HK`) as an app-wide preference in Settings. Show one language at a time across the app, not English and Chinese together. The choice is saved in browser `localStorage` with key `ops_language` (`en` or `zh`); the default is English. The language options themselves both remain visible in Settings.
5. **History:** Filter by **incident date**, not submission date. Keep the compact presets All, Day, W, M, and Custom, plus issue-status filters. Week means Monday through Sunday; Month means the current calendar month. No separate YTD preset is needed because custom dates cover it. Keep the selected date range and validation feedback clear.
6. **Bilingual report content:** The selected app language controls the interface and displayed issue details. The Success page has a separate language choice for the outgoing report message; preserve that distinction.
7. **Accessibility and mobile:** Preserve semantic labels/landmarks, visible keyboard focus, readable contrast, touch-friendly controls, skip links, and layouts without horizontal overflow at narrow phone widths. Do not disable browser zoom.
8. **Versioning:** A code change does not automatically create a release. Prepare and validate a release, then update all versioned assets and release metadata together.

## Project structure

All current app files are in the root of `ops_v0.8.03`; no nested folders were present at handoff.

| File | Responsibility |
|---|---|
| `index.html` | Dashboard, actionable summary cards, recent reports, and primary navigation. |
| `report.html` | New-report form structure, labels, accessible controls, and update prompt markup. |
| `report.js` | Form behavior, dynamic issue choices, validation guidance, preview, photo selection, and report creation/storage. |
| `issues.html` | Open-issue list and navigation. |
| `history.html` | Incident-date and issue-status filters, custom date range, and report history list. |
| `completed.html` | Completed-issue view and empty state. |
| `edit.html` | Existing report details and workflow/impact update form. |
| `success.html` | Submission confirmation, reference, outgoing-message language selection, copy/share actions. |
| `settings.html` | English / Traditional Chinese app-language selector and return navigation. |
| `app.js` | Shared startup logic, release version, saved-language application, page titles, Settings link, date formatting, data helpers, update check, and Service Worker registration. |
| `config.js` | Plant, material, issue-type, and bilingual issue-choice configuration. |
| `styles.css` | Shared design system, layout, responsive rules, navigation, accessibility, and language visibility. It is compacted and has accumulated overrides; inspect the full relevant cascade before changing styles. |
| `service-worker.js` | Offline application shell, network-first handling for navigation/CSS/JS, and versioned cache lifecycle. |
| `version.json` | Deployed version, minimum version, forced-update flag, and update messages. |
| `manifest.webmanifest` | Installable web app metadata. |
| `README.md` | User-facing project overview and release history. |
| `DEPLOYMENT.md` | GitHub Pages upload and deployment checklist. |
| `handoff.md` | This continuity guide; keep updated after meaningful project changes. |

## Important implementation details

- `OPS_CONFIG` in `config.js` defines the configured plants/materials and English/Chinese issue choices.
- Shared report storage is exposed via `OPS` in `app.js`; the records key is `ops_issues_v080`. Preserve compatibility with existing browser data unless a migration is planned and explicitly validated.
- The language preference is separate from the report-storage key. A setting on one device/browser does not synchronize to another.
- `app.js` applies `lang` and `body[data-language]`, sets localized document titles and placeholders, adjusts supported accessible attributes, and adds a Settings shortcut to page headers other than Settings itself.
- `settings.html` saves the language, then returns to the allow-listed page and query string recorded in `sessionStorage`; otherwise it returns to the dashboard.
- English/Chinese markup uses `.bilingual-en` and `.bilingual-zh`; CSS hides the inactive language. Preserve this pattern and check generated controls as well as static HTML.
- The date display in `OPS.fmt()` is language-aware. History filter dates are ISO date strings for filtering and range display.
- The Success page’s outgoing-message language is independent from the app UI preference by design.
- Service Worker cache and HTML asset query parameters use `v0.8.11`. `settings.html` is part of the application shell.
- Existing history mentions v0.8.03 in the folder name; do not rename the folder as part of routine release work.

## Release and deployment checklist

For the next release after `v0.8.11`:

1. Make and review the requested change without undoing unrelated user edits.
2. Update the release version consistently in:
   - `app.js` (`V`);
   - HTML page titles, visible version labels, and CSS/JS query strings;
   - `service-worker.js` cache name and versioned asset URLs;
   - `version.json` (`version`, `minimumVersion`, and update messages as appropriate);
   - `README.md` release history and current version;
   - `DEPLOYMENT.md` release/cache instructions.
3. Confirm the Service Worker shell contains every page needed offline, especially `settings.html`.
4. Validate before describing the change as released. Deployment still requires uploading all files and allowing GitHub Pages to redeploy.
5. Add a concise release entry to `README.md`, and update this handoff with the new current version, behavior, file map changes, and validation status.

## Validation guidance

There is no app-specific automated test suite or package/build setup in the project folder. At the previous validation, `node` was not available in the PowerShell environment, so do not claim command-line syntax checks passed unless they are actually run successfully.

Use the integrated browser when available:

- Exercise language selection from Settings, including persistence and return to the originating page.
- Inspect all pages in both English and Traditional Chinese; check dynamic report choices, validation, previews, History filtering, edit flow, and Success-page outgoing-message language.
- Watch for browser-console/page errors and verify app content remains in one selected language.
- Check narrow phone sizes (at least 320px) and a desktop width for horizontal overflow and control wrapping.
- Avoid leaving test reports in the user’s browser storage. If test data is needed, record the initial state and restore it after testing.
- Validate the intended behavior, not just page loading. Record which flows and viewport widths were checked.

## Current state at v0.8.11

- Settings-based app-wide English/Traditional Chinese selection is implemented.
- Browser testing confirmed language switching, return to the originating page, localized page titles and main content across all app pages, form issue choices/preview, and History custom-date validation.
- At 320px, the pages checked had no horizontal overflow. Browser page-error checks reported no JavaScript errors during the tested flows.
- Release metadata and Service Worker cache shell were checked for v0.8.11 and for inclusion of `settings.html`.
- A Node.js CLI syntax check could not run because `node` was not available in PowerShell. Browser execution was used for functional smoke checks instead.
- The Settings page should not show a redundant Settings shortcut to itself.
- Fixed the mobile header collision reported after v0.8.11: below 520px, Settings and the version badge share a top row, with the localized app title beneath them. Browser bounding-box checks at 320px confirmed no overlap in English or Traditional Chinese; the desktop header layout remains unchanged.
- Deploying v0.8.11 to GitHub Pages was not performed as part of the local implementation; consult `DEPLOYMENT.md` before release.

## Working instructions for the next AI or developer

- Read this file and `README.md` before making changes; inspect the relevant existing HTML/CSS/JS first.
- Preserve the established user decisions above. Ask before changing product behavior that is not specified, especially storage, account/login, cross-device synchronization, data retention, or report submission workflow.
- Make changes in the existing static-app style. Avoid adding frameworks, packages, or build tooling unless the user requests them or a concrete need is established.
- Keep English and Traditional Chinese content accurate and consistent; ensure every static and dynamically generated user-facing string respects the selected app language.
- Maintain keyboard and screen-reader access when changing controls. Do not rely on color alone to communicate status.
- Do not silently hide errors or turn failed operations into success-shaped behavior.
- After meaningful changes, update this `handoff.md` so the next chat knows the new state, decisions, touched areas, checks performed, and any remaining work.
- Be explicit about whether a change is merely local, prepared as a versioned release, or actually deployed. Never imply GitHub Pages was updated without performing deployment.
