# Akṣarapad

Akṣarapad is a private, offline-first Sanskrit transliteration workspace. It converts text in the browser between Devanagari, IAST, Harvard-Kyoto, ITRANS, and Velthuis.

## Use

No build step or server is required. Open `index.html` in a modern browser, enter or paste text, choose the source and target schemes, and copy the result when needed.

Preferences for the selected schemes and colour theme are saved locally in the browser. Text is processed locally; the application does not send entered text to a service.

## Development

The site consists of `index.html`, `style.css`, and `app.js`. Its checked-in browser engine lives in `vendor/aksharamukha/`.

To preview it locally, serve the repository with any static-file server, for example:

```sh
python3 -m http.server
```

Then open <http://localhost:8000>.

## Updating the transliteration engine

Aksharamukha is vendored so the application can run offline. Updating it is a deliberate release task: update the source and regenerate its `dist/` artifacts together, then test the browser application. Dependabot monitors the vendored package manifest, but its pull requests do **not** regenerate `dist/` and should be reviewed as source-dependency updates rather than published-engine upgrades.

## Credits and licence

Akṣarapad uses [Aksharamukha.js](https://github.com/paramsiddharth/aksharamukha.js), which is based on Aksharamukha by Vinodh Rajan. See [NOTICE](NOTICE) for attribution and third-party licence information.

This project is licensed under the GNU General Public License v3.0 only. See [LICENSE](LICENSE).
