# Third-Party Notices

This project loads and uses the following third-party software at runtime.
Neither is modified or redistributed as part of this repository — both are
fetched by the browser directly from their published CDN packages.

## Aksharamukha

- **Author:** Vinodh Rajan ([virtualvinodh.com](https://virtualvinodh.com))
- **Source:** https://github.com/virtualvinodh/aksharamukha-python
- **License:** GNU Affero General Public License v3.0 (AGPL-3.0)
- **Role:** The transliteration engine itself — all script conversion logic,
  including the "Akshara" (readable) romanization scheme used as this
  project's default input scheme.

## Aksharamukha.js

- **Author:** Param ([paramsid.com](https://www.paramsid.com))
- **Source:** https://github.com/paramsiddharth/aksharamukha.js
- **npm package:** https://www.npmjs.com/package/aksharamukha
- **Role:** Browser-compatible packaging of the Aksharamukha Python engine
  (via Pyodide/WebAssembly), loaded from jsDelivr CDN
  (`cdn.jsdelivr.net/npm/aksharamukha`).

## Special-character palette

The "Insert special characters" panel offers the complete Unicode Vedic
Extensions ranges (U+A8E0–U+A8FD and U+1CD0–U+1CF9) — publicly defined
Unicode codepoints, not third-party code.

## Fonts

- **Fraunces**, **Source Serif 4**, **JetBrains Mono**, **Noto Sans**, and
  **Shobhika** — served via Google Fonts, licensed under the SIL Open Font
  License 1.1.
- **Tiro Devanagari Sanskrit** — self-hosted from its source repository
  ([indic-transliteration/sanskrit-fonts](https://github.com/indic-transliteration/sanskrit-fonts))
  rather than Google Fonts, because the Google Fonts build of this font
  omits glyphs for the Unicode Vedic Extensions block used by this
  project's special-character palette. Same font, same SIL Open Font
  License 1.1, fuller glyph coverage.

---

If you fork or redistribute this repository, please keep this notice intact
and preserve attribution to the original Aksharamukha project, without which
this project would not exist.
