# Operations Support Frontline WebApp

Mobile-first Frontline reporting WebApp for STW1 and STW2.

## Current version

**v0.5.00**

## Features

- Plant: STW1 / STW2
- Material: 05mm / 10mm / 20mm
- Required Incident Time, defaulting to current device time
- Separate incident and submitted timestamps
- Issue types: Mechanical, IT System, Replenishment
- Bilingual interface with Traditional Chinese support
- Chinese-default WhatsApp message; optional English version
- Photo selection and local preview
- Operating-status colors: green, amber and red
- Browser-local Open Issues list
- Mobile-first responsive layout

## Version history

### v0.5.00

- Added automatic checks against `version.json` on app startup, return to foreground, every 15 minutes, and before submit/edit actions.
- Added optional and required update modes.
- Required updates block report submission and editing until the latest version is loaded.
- Added bilingual update banner and full-screen required-update dialog.
- Added `service-worker.js` with versioned cache, old-cache cleanup, `skipWaiting()` and `clients.claim()`.
- Added automatic draft saving before update and draft restoration after reload.
- Added cache-busting version checks using `cache: no-store`.

### v0.4.00

- Split Photo into two clear actions: **Take Photo / 拍攝相片** and **Choose Photo / 選擇相片**.
- Added photo filename display and retained remove-photo control.
- Added **Edit / 編輯** to Open Issues.
- Open reports can now be loaded back into the form and saved without creating a duplicate ticket.
- Included the v0.3.00 split Date/Time design and `23 Oct 2026 | 17:10` format.

### v0.3.00

- Split Incident Time into separate Date and Time fields.
- Standardized display as `23 Oct 2026 | 17:10`.

### v0.2.00

- Added a complete version history to README.
- Renamed **Wire Rope Problem / 鋼絲繩問題** to **Wire Problem / 「威也」問題**.
- Renamed Chinese **資訊系統** to **IT系統** throughout the WebApp.
- Renamed **Out of Stock / 物料缺貨** to **Stock Empty / 清缸**.
- Redesigned **Current Impact / 目前影響** as **Operating Status / 運作情況**.
- Updated operating-status choices to:
  - **Normal Operation / 正常運作** in green.
  - **Limited Operation / 有限度運作** in amber.
  - **Operation Suspended / 暫停運作** in red.
- Updated Preview and copied WhatsApp messages to use the new operating-status wording.

### v0.1.00

- Added required **Incident Time / 事發時間**.
- Defaulted Incident Time to the current device time.
- Allowed Frontline users to adjust the actual Incident Time.
- Prevented future Incident Time submissions.
- Added Incident Time to Preview, Open Issues and copied messages.
- Stored `incidentTime` separately from system-generated `submittedTime`.

### v0.0.00

- Initial static MVP release.
- Added mobile-first homepage and reporting form.
- Added STW1 / STW2 and 05mm / 10mm / 20mm selections.
- Added Mechanical, IT System and Replenishment issue categories.
- Added bilingual labels, required-field indicators and conditional remarks.
- Added photo preview, operating-impact colors and report preview.
- Added Chinese and English WhatsApp message copying.
- Added a browser-local Open Issues list.

## Important limitation

This version is a static MVP. Reports are stored in browser `localStorage`, so records are not shared between phones or computers. Selected photos are previewed locally and are not permanently uploaded. Clearing browser data can remove locally saved reports.

A shared backend is required for:

- Shared reports across users and devices
- Permanent photo storage
- Login and permissions
- Duplicate-issue detection
- Status updates and Outstanding Issues
- KPI and management reports

## GitHub Pages deployment

1. Create a new GitHub repository.
2. Upload all files from this folder to the repository root.
3. Open **Settings > Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select branch **main** and folder **/(root)**.
6. Save and wait for the deployment URL.

## Local preview

```bash
py -m http.server 8080
```

Open `http://localhost:8080` in a browser.

## Security

Do not place passwords, database service keys, API secrets or administrator credentials in `index.html` or a public repository.

## Automatic update configuration

Edit `version.json` for each release.

- `version`: newest deployed version.
- `minimumVersion`: oldest version allowed to submit or edit.
- `forceUpdate`: set `true` to require immediate update.
- `messageEn` and `messageZh`: update notice text.

For a required update, set `version` and `minimumVersion` to the new release and set `forceUpdate` to `true`. For an optional update, keep `minimumVersion` at the older allowed version and set `forceUpdate` to `false`.
