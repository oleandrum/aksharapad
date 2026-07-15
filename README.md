# Aksharapad (अक्षरपद)

A personal Devanagari input method (IME): type Sanskrit in **IAST**,
**Harvard-Kyoto**, **ITRANS**, or **Velthuis** and get live, space-triggered
conversion to Devanagari — powered by the real
[Aksharamukha](https://github.com/virtualvinodh/aksharamukha-python)
transliteration engine, running entirely in the browser (or natively on
macOS). Nothing typed here ever leaves the device.

*Akṣarapada* (अक्षरपद, from *akṣara* "syllable/letter" + *pada* "word/foot")
— a keyboard, in Sanskrit's own words. Sibling project to
[Lipyantara](https://github.com/oleandrum/lipyantara).

🔗 **[Live site →](https://oleandrum.github.io/aksharapad/)**
🔗 **[Open the composer →](https://oleandrum.github.io/aksharapad/app.html)**
💾 **[Download for macOS →](https://github.com/oleandrum/aksharapad/releases/latest)**

## Three ways to use it

1. **Web** — the full site at the live link above, composer embedded in the hero.
2. **Installed web app (iPhone/iPad/Android)** — open the
   [composer](https://oleandrum.github.io/aksharapad/app.html), then
   *Share → Add to Home Screen* in Safari. Offline-capable after first load.
3. **Native macOS app** — a real `.app`/`.dmg`, built with
   [`deno desktop`](https://deno.com/blog/v2.9#deno-desktop).
   See [Building the macOS app](#building-the-macos-app) below.

## Features

- **Four keyboard schemes**: IAST, Harvard-Kyoto, ITRANS, and Velthuis —
  switch anytime, mid-sentence
- **Space (or Enter) triggers conversion** — type a word, hit space, it
  becomes Devanagari immediately
- **Insert special characters**: the complete Unicode Vedic Extensions
  block (U+A8E0–U+A8FD, U+1CD0–U+1CF9) — svara/accent marks, anusvara
  variants, avagraha, and more, each labeled with its Unicode name
- Copy and clear controls on the composer
- Light / dark / system theme switcher
- Installable as a PWA on iOS/Android, or as a native app on macOS

## How it works

The engine is the actual [Aksharamukha Python package](https://github.com/virtualvinodh/aksharamukha-python)
by Vinodh Rajan, compiled to WebAssembly via [Pyodide](https://pyodide.org)
and wrapped for browser use by [Aksharamukha.js](https://github.com/paramsiddharth/aksharamukha.js),
loaded once from a CDN (~17 MB) and cached afterward.

The IME behavior itself — buffering what you type and converting on space —
is **not** a special engine feature; Aksharamukha's own web IME implements
this as frontend logic on top of the same conversion call. This project does
the same: `ime.js` tracks the "current word" back to the last space/newline,
calls `engine.processAsync(scheme, 'Devanagari', word)` on that word when you
press space or Enter, and splices the Devanagari result back into the
textarea.

### Why no "Akshara" scheme

Aksharamukha's own web IME offers a fifth scheme, "Akshara" (internally
`RomanReadable`) — a readable ASCII convention (double letters for long
vowels, e.g. *akṣarā* → `AKSHARAA`). It's not included here: testing showed
`engine.processAsync('RomanReadable', 'Devanagari', 'uu')` returns `उउ`
instead of `ऊ` — the reverse direction (`Devanagari → RomanReadable`) works
correctly, suggesting the scheme's forward (input) conversion has a real
bug in the current engine build, independent of anything in this project's
own code. IAST, Harvard-Kyoto, ITRANS, and Velthuis were all verified
correct in both directions and are the four schemes offered here.

## Project structure

```
site/                    deployed to GitHub Pages
├── index.html            marketing page, composer embedded via iframe
├── app.html               the composer — also the PWA start_url
├── ime.js                  shared IME logic (identical to app/ime.js)
├── manifest.json           PWA manifest
├── sw.js                    service worker (offline caching)
├── icons/                    PWA / favicon icons

app/                      native macOS app source (deno desktop)
├── index.html             same composer UI as site/app.html
├── ime.js                  identical to site/ime.js
├── main.ts                  deno desktop entrypoint
├── deno.json                 app name, bundle identifier, icon config
└── icons/
    └── app.icns             macOS app icon
```

`site/{app.html,ime.js}` and `app/{index.html,ime.js}` are intentionally
near-duplicates — kept in sync by hand when making UI/logic changes, exactly
like Lipyantara.

## Running locally

**Web:**
```sh
cd site
python3 -m http.server 8000
```

**Native app (dev mode with hot reload):**
```sh
cd app
deno desktop --hmr --include index.html --include ime.js --include fonts --icon icons/app.icns --allow-read=. main.ts
```

## Building the macOS app

```sh
cd app
deno desktop --include index.html --include ime.js --include fonts --icon icons/app.icns --allow-read=. \
  --output Aksharapad.dmg main.ts
```

Built `.app`/`.dmg` files are **not** committed to this repository — they're
distributed as [GitHub Release](https://github.com/oleandrum/aksharapad/releases)
assets, named `Aksharapad.dmg` so the download links keep working.

`deno desktop` is **experimental** as of Deno 2.9 — expect some rough edges.

## Deployment

The web site (`site/`) deploys via GitHub Pages through
[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).
Set **Settings → Pages → Source** to **GitHub Actions**.

## Credits & license

This repository's own code is licensed under the [MIT License](LICENSE).

The transliteration engine — [Aksharamukha](https://github.com/virtualvinodh/aksharamukha-python)
by [Vinodh Rajan](https://virtualvinodh.com) — is licensed under
**GNU AGPL 3.0** and used here unmodified, loaded at runtime. See
[`NOTICE.md`](NOTICE.md) for full third-party attribution.

The browser port, [Aksharamukha.js](https://github.com/paramsiddharth/aksharamukha.js),
is by Param.
