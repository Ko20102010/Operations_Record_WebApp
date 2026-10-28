# Operations Support Frontline WebApp

## Current version

**v0.8.02**

## Version history

### v0.8.02

- Removed the inline SVG pencil icon that could render as an uncontrolled oversized black graphic.
- Replaced it with a fixed 18px CSS pencil inside a 38px light-blue action button.
- Matched the pencil action to the WebApp colour, border-radius and focus style.
- Fixed report-card overflow and improved spacing between Completed and View All.
- Rebuilt this README with the changes for every released version.

### v0.8.01

- Redesigned Recent Reports, Open Issues and Completed Issues cards.
- Added a right-side edit action for each report.
- Replaced the large bottom Edit text button with a compact icon action.
- Added ellipsis handling for long bilingual issue names.

### v0.8.00

- Added Frontline editing and issue updates.
- Added Issue Status: Reported / 已報告, In Progress / 處理中, and Completed / 已完成.
- Allowed Operating Status and update notes to be changed after submission.
- Added Completed Issues and moved completed records out of Open Issues.
- Changed the success page so Back to Home is the last and only button in its row.

### v0.7.04

- Applied the SafetyCulture-inspired colour and component system.
- Removed the plus icon from the Home report card.
- Set the bottom central plus button to 58px with no visible text label.
- Rebuilt navigation with dedicated Home, Report, Open Issues and Success pages.
- Added real HTML links to report.html to prevent JavaScript-only navigation failure.

### v0.7.03

- Added a dedicated report.html page.
- Replaced JavaScript-only Create navigation with real links.
- Added report.html to the Service Worker application shell.

### v0.7.02

- Fixed navigation from the Home report action and central plus button.
- Prevented recursive Open Issues rendering.
- Redesigned the Home dashboard with three compact status cards.
- Reduced the bottom plus button and removed its text label.

### v0.7.01

- Fixed the stale photo selector after Take Photo and Choose Photo were split.
- Correctly cleared camera input, gallery input, preview and filename during reset.

### v0.7.00

- Applied the full interface-copy review.
- Standardised Report an Issue, Recent Reports and local-device wording.
- Updated Emergency Stop Issue, Unable to Identify System, Conveyor Cleaning and Bin Empty.
- Changed Normal Operation to No Operational Impact.
- Corrected the local-only success message.

### v0.6.00

- Added the Home dashboard and bottom page navigation.
- Added Open, Suspended and Today counters.
- Added Recent Reports.
- Renamed Wire Problem to Wire Issue / 「威也」故障.

### v0.5.00

- Added automatic checks against version.json.
- Added optional and required update modes.
- Added Service Worker cache versioning and old-cache cleanup.
- Added draft protection before an update.

### v0.4.00

- Split Photo into Take Photo and Choose Photo actions.
- Added Open Issue editing without creating a duplicate ticket.
- Added photo filename display and Remove Photo.

### v0.3.00

- Split Incident Time into Date and Time fields.
- Standardised the display as `23 Oct 2026 | 17:10`.

### v0.2.00

- Added complete version-history recording.
- Renamed Wire Rope Problem, IT System wording and Stock Empty wording.
- Redesigned Current Impact as Operating Status.
- Added Normal, Limited and Suspended status colour states.

### v0.1.00

- Added required Incident Time.
- Defaulted Incident Time to the current device time.
- Added Incident Time to Preview, Open Issues and copied messages.
- Stored Incident Time separately from Submitted Time.

### v0.0.00

- Initial mobile-first static MVP.
- Added Plant, Material, Issue Type, Related Issue and Operating Status.
- Added bilingual interface, photo preview, report preview and WhatsApp copy.
- Added browser-local Open Issues.

## Current limitations

- Records are stored in the current browser only.
- Records are not shared between devices.
- Photos are previewed locally and are not permanently uploaded.

## GitHub Pages deployment

Upload every file in this package to the repository root. Do not omit HTML, CSS, JavaScript, manifest, version or Service Worker files.
