/* global Aksharamukha */

(() => {
  "use strict";

  const storageKey = "aksharapad.preferences";
  const input = document.querySelector("#input-text");
  const output = document.querySelector("#output-text");
  const source = document.querySelector("#source-script");
  const target = document.querySelector("#target-script");
  const status = document.querySelector("#engine-status");
  const count = document.querySelector("#input-count");
  const panels = document.querySelector("#panels");
  const themeButton = document.querySelector("#theme-toggle");

  let engine;
  let latestRequest = 0;
  let conversionTimer;

  function readPreferences() {
    try { return JSON.parse(localStorage.getItem(storageKey)) || {}; } catch { return {}; }
  }

  function savePreferences() {
    localStorage.setItem(storageKey, JSON.stringify({ source: source.value, target: target.value, theme: document.documentElement.dataset.theme }));
  }

  function setStatus(message, state = "") {
    status.textContent = message;
    status.className = `engine-status ${state}`;
  }

  function updateCount() {
    const characters = [...input.value].length;
    count.textContent = `${characters} ${characters === 1 ? "character" : "characters"}`;
  }

  async function convert() {
    const request = ++latestRequest;
    const text = input.value;
    updateCount();
    if (!text) { output.value = ""; return; }
    if (!engine) { return; }
    try {
      const converted = await engine.processAsync(source.value, target.value, text);
      if (request === latestRequest) output.value = converted;
    } catch (error) {
      if (request === latestRequest) {
        output.value = "";
        setStatus("Conversion failed", "error");
        console.error("Akṣarapad conversion error:", error);
      }
    }
  }

  function queueConversion() {
    clearTimeout(conversionTimer);
    conversionTimer = window.setTimeout(convert, 90);
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === "dark" ? "#1e222b" : "#f4f0e8";
  }

  async function copyOutput() {
    if (!output.value) return;
    try {
      await navigator.clipboard.writeText(output.value);
      const button = document.querySelector("#copy-button");
      button.textContent = "Copied";
      window.setTimeout(() => { button.textContent = "Copy"; }, 1250);
    } catch {
      output.select();
      document.execCommand("copy");
    }
  }

  function swap() {
    const sourceValue = source.value;
    source.value = target.value;
    target.value = sourceValue;
    input.value = output.value || input.value;
    output.value = "";
    panels.classList.remove("is-swapping");
    void panels.offsetWidth;
    panels.classList.add("is-swapping");
    savePreferences();
    queueConversion();
    input.focus();
  }

  function restorePreferences() {
    const preferences = readPreferences();
    if (preferences.source && source.querySelector(`option[value="${preferences.source}"]`)) source.value = preferences.source;
    if (preferences.target && target.querySelector(`option[value="${preferences.target}"]`)) target.value = preferences.target;
    applyTheme(preferences.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  }

  input.addEventListener("input", queueConversion);
  [source, target].forEach((select) => select.addEventListener("change", () => { savePreferences(); queueConversion(); }));
  document.querySelector("#swap-button").addEventListener("click", swap);
  document.querySelector("#clear-button").addEventListener("click", () => { input.value = ""; output.value = ""; updateCount(); input.focus(); });
  document.querySelector("#copy-button").addEventListener("click", copyOutput);
  themeButton.addEventListener("click", () => { applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"); savePreferences(); });
  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "Enter") { event.preventDefault(); swap(); }
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "c") { event.preventDefault(); copyOutput(); }
  });

  restorePreferences();
  updateCount();
  Aksharamukha.new().then((instance) => {
    engine = instance;
    setStatus("Ready", "ready");
    queueConversion();
  }).catch((error) => {
    setStatus("Engine unavailable", "error");
    console.error("Akṣarapad engine error:", error);
  });
})();
