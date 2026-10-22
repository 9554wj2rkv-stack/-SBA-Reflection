# Moon Reflection

**By Soul Blueprint Astrology**: your personal space beneath the stars.

Moon Reflection offers guided reflection at every New Moon and Full Moon. It includes true-sky Sun and Moon placements and a private journal that stays on the device.

It is a Progressive Web App. Plain HTML, CSS and JavaScript, with no build step, no server and no external services.

---

## Publish on GitHub Pages

1. Create a new repository on GitHub, for example `moon-reflection`.
2. Upload **everything inside this folder** to the root of the repository, keeping the folders (`css`, `js`, `assets`, `icons`). In the GitHub web uploader, drag the whole folder contents in.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, then select **`main`** and **`/ (root)`**, and click **Save**.
5. After a minute the app is live at `https://<your-username>.github.io/moon-reflection/`.

**Install on iPhone:** open the link in Safari, tap **Share**, then tap **Add to Home Screen**.

### Publishing an update

1. Upload the changed files.
2. Open `sw.js` and bump `CACHE_VERSION`, for example to `'v1.2.1'`.

Users get the new version the next time they open the app while online.

---

## Important: journal data

- **Reflections live only in the browser on each device.** They are stored in `localStorage` and are not uploaded anywhere.
- **Data belongs to one address.** Reflections written in the old single-file version, or at another address, **do not carry over automatically**. To move them, use **Settings → Export backup** in the old version, then **Import a backup** in the new one.
- **Updating the app never touches the journal.** Updates replace only app files. The storage keys (`sba.moonReflection.journal.v1`) must never be renamed.
- **Don't change the repository name or address later.** Changing it creates a new origin, and saved reflections would not appear there.

---

## Folder structure

```
index.html               App shell
manifest.webmanifest     Name, colours and icons for "Add to Home Screen"
sw.js                    Offline support (caches app files only)
.nojekyll                Optional — not needed for this app

css/styles.css           All styling (design tokens at the top)

js/config.js             ← Settings you may edit (website URL, contact link)
js/content.js            ← Guidance text and SBA interpretations
js/sky-data.js           True-sky Sun & Moon placements 2020–2045 (generated)
js/app.js                App logic: screens, journal, autosave, backup

assets/images/           Artwork (galaxy, moon, mountains, cards)
assets/fonts/            Cormorant Garamond, Cormorant SC, Jost + licences

icons/                   Web and home-screen icons
icons/app-store-icon-1024.png   Apple App Store icon (1024×1024, no transparency)
ios/AppIcon.appiconset/         Ready-made Xcode icon set for the iOS app
```

### Common edits

| What | Where |
|---|---|
| Connect the SBA website | `js/config.js` → `SBA_WEBSITE_URL: 'https://…'` |
| Add a contact link | `js/config.js` → `CONTACT_URL: 'mailto:…'` or `'https://…'` |
| Add official SBA guidance for a Moon | `js/content.js` → `SBA_INTERPRETATIONS`, keyed by event ID, e.g. `'full-moon-2026-10-26'` |
| Change constellation themes | `js/content.js` → `CONSTELLATION_THEMES` |
| Replace artwork with full-resolution originals | `assets/images/` (keep the same file names) |

---

## Apple App Store icon

`icons/app-store-icon-1024.png` meets Apple's requirements:

- 1024 × 1024 px
- PNG
- sRGB
- no transparency
- square corners (iOS rounds them automatically)

When the app is packaged for iOS with Capacitor, copy `ios/AppIcon.appiconset/` over the `AppIcon.appiconset` folder in the Xcode project. It's at `ios/App/App/Assets.xcassets/`.

---

## Astronomical data

- **Event times:** New and Full Moon times are calculated on the device using the Meeus lunar-phase algorithm. They are typically within 1–2 minutes of published times.
- **Placements:** Sun and Moon constellations use the IAU constellation boundaries (the true sky), not the tropical zodiac. They were computed with Astropy and independently cross-checked with Skyfield and the JPL DE421 ephemeris.
- **Verification:** a placement is shown only when both calculations agree. Otherwise the app shows *Position pending verification*.
- **Coverage:** 2020–2045.

---

## Testing locally

Some browsers block fonts and offline support for files opened directly from disk. To test before uploading, run a small local server from this folder, then open <http://localhost:8000>:

```
python3 -m http.server 8000
```

---

## Credits

Fonts: Cormorant Garamond and Cormorant SC (The Cormorant Project Authors) and Jost (The Jost Project Authors), all under the SIL Open Font License 1.1. The licence texts are in `assets/fonts/`.
