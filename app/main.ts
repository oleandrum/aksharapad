// main.ts — Deno Desktop entrypoint for the native Aksharapad app
//
// Serves index.html (and ime.js) from this folder. Build with the same
// --include flags for both assets, exactly like Lipyantara.

import { serveDir } from "jsr:@std/http/file-server";

Deno.serve((req) => {
  return serveDir(req, {
    fsRoot: import.meta.dirname,
    urlRoot: "",
  });
});
