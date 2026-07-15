// ime.js — Aksharapad core logic
// Shared, byte-identical, between site/app.html (web/PWA) and app/index.html (native app)

/* ---------------- Theme switcher ---------------- */
const themeButtons = document.querySelectorAll('.theme-switch button');
themeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const choice = btn.dataset.themeChoice;
    if (choice === 'system') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', choice);
    }
    themeButtons.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
  });
});

/* ---------------- Scheme selector ---------------- */
const schemeButtons = document.querySelectorAll('.scheme-btn');
let currentScheme = 'IAST';
schemeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentScheme = btn.dataset.scheme;
    schemeButtons.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
  });
});

/* ---------------- IME conversion ---------------- */
const composer = document.getElementById('composer');
const statusEl = document.getElementById('statusEl');

function setStatus(message, kind) {
  statusEl.classList.toggle('error', kind === 'error');
  statusEl.innerHTML = kind === 'loading' ? '<span class="spinner"></span> ' + message : (message || '');
}

let engine = null;
let converting = false;

function findWordStart(value, cursor) {
  let i = cursor - 1;
  while (i >= 0 && value[i] !== ' ' && value[i] !== '\n') i--;
  return i + 1;
}

async function convertPendingWord(triggerChar) {
  if (!engine || converting) return;
  const cursor = composer.selectionStart;
  const value = composer.value;
  const wordStart = findWordStart(value, cursor);
  const wordRaw = value.slice(wordStart, cursor);

  if (!wordRaw.trim()) {
    // Nothing pending to convert — just insert the trigger character normally
    // (we already preventDefault()'d it in the keydown handler).
    const newValue = value.slice(0, cursor) + triggerChar + value.slice(cursor);
    const newCursor = cursor + triggerChar.length;
    composer.value = newValue;
    composer.setSelectionRange(newCursor, newCursor);
    return;
  }

  converting = true;
  composer.disabled = true;
  try {
    const converted = await engine.processAsync(currentScheme, 'Devanagari', wordRaw);
    const newValue = value.slice(0, wordStart) + converted + triggerChar + value.slice(cursor);
    const newCursor = wordStart + converted.length + triggerChar.length;
    composer.value = newValue;
    composer.setSelectionRange(newCursor, newCursor);
    setStatus('', null);
  } catch (err) {
    setStatus('Conversion failed for the last word.', 'error');
    console.error(err);
  } finally {
    converting = false;
    composer.disabled = false;
    composer.focus();
  }
}

composer.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'Enter') {
    // Only intercept when the cursor is at the end of the pending (untranslated) word,
    // i.e. normal forward typing — avoids surprises when editing mid-text.
    e.preventDefault();
    convertPendingWord(e.key === 'Enter' ? '\n' : ' ');
    return;
  }

  // Immediate (non-buffered) Vedic accent shortcuts, inspired by Lexilogos's
  // Vedic keyboard. Kept to characters with no meaning in IAST/HK/ITRANS/Velthuis
  // (notably NOT '.', which is core Velthuis syntax — .r, .m, .h, etc.)
  if (e.key === '_') {
    e.preventDefault();
    insertAtCursor('\u0952'); // anudātta
    return;
  }
  if (e.key === "'") {
    e.preventDefault();
    insertAtCursor('\u093D'); // avagraha
    return;
  }
  if (e.key === '+') {
    e.preventDefault();
    const cursor = composer.selectionStart;
    const value = composer.value;
    if (cursor > 0 && value[cursor - 1] === '\u0951') {
      // second '+' right after an udātta upgrades it to double svarita
      composer.value = value.slice(0, cursor - 1) + '\u1CDA' + value.slice(cursor);
      composer.setSelectionRange(cursor, cursor);
    } else {
      insertAtCursor('\u0951'); // udātta / svarita
    }
    return;
  }
});

/* ---------------- Copy / Clear ---------------- */
document.getElementById('clearBtn').addEventListener('click', () => {
  composer.value = '';
  setStatus('', null);
  composer.focus();
});

document.getElementById('copyBtn').addEventListener('click', async (e) => {
  if (!composer.value) return;
  const btn = e.currentTarget;
  try {
    await navigator.clipboard.writeText(composer.value);
    btn.classList.add('copied');
    setTimeout(() => btn.classList.remove('copied'), 1200);
  } catch {
    composer.select();
    document.execCommand('copy');
  }
});

/* ---------------- Special characters (Unicode Vedic Extensions) ---------------- */
const cantillationChars = [
  ["\uA8E0", "COMBINING DEVANAGARI DIGIT ZERO"],
  ["\uA8E1", "COMBINING DEVANAGARI DIGIT ONE"],
  ["\uA8E2", "COMBINING DEVANAGARI DIGIT TWO"],
  ["\uA8E3", "COMBINING DEVANAGARI DIGIT THREE"],
  ["\uA8E4", "COMBINING DEVANAGARI DIGIT FOUR"],
  ["\uA8E5", "COMBINING DEVANAGARI DIGIT FIVE"],
  ["\uA8E6", "COMBINING DEVANAGARI DIGIT SIX"],
  ["\uA8E7", "COMBINING DEVANAGARI DIGIT SEVEN"],
  ["\uA8E8", "COMBINING DEVANAGARI DIGIT EIGHT"],
  ["\uA8E9", "COMBINING DEVANAGARI DIGIT NINE"],
  ["\uA8EA", "COMBINING DEVANAGARI LETTER A"],
  ["\uA8EB", "COMBINING DEVANAGARI LETTER U"],
  ["\uA8EC", "COMBINING DEVANAGARI LETTER KA"],
  ["\uA8ED", "COMBINING DEVANAGARI LETTER NA"],
  ["\uA8EE", "COMBINING DEVANAGARI LETTER PA"],
  ["\uA8EF", "COMBINING DEVANAGARI LETTER RA"],
  ["\uA8F0", "COMBINING DEVANAGARI LETTER VI"],
  ["\uA8F1", "COMBINING DEVANAGARI SIGN AVAGRAHA"],
];

const vedicAccentChars = [
  ["\uA8F2", "DEVANAGARI SIGN SPACING CANDRABINDU"],
  ["\uA8F3", "DEVANAGARI SIGN CANDRABINDU VIRAMA"],
  ["\uA8F4", "DEVANAGARI SIGN DOUBLE CANDRABINDU VIRAMA"],
  ["\uA8F5", "DEVANAGARI SIGN CANDRABINDU TWO"],
  ["\uA8F6", "DEVANAGARI SIGN CANDRABINDU THREE"],
  ["\uA8F7", "DEVANAGARI SIGN CANDRABINDU AVAGRAHA"],
  ["\uA8F8", "DEVANAGARI SIGN PUSHPIKA"],
  ["\uA8F9", "DEVANAGARI GAP FILLER"],
  ["\uA8FA", "DEVANAGARI CARET"],
  ["\uA8FB", "DEVANAGARI HEADSTROKE"],
  ["\uA8FC", "DEVANAGARI SIGN SIDDHAM"],
  ["\uA8FD", "DEVANAGARI JAIN OM"],
  ["\u1CD0", "VEDIC TONE KARSHANA"],
  ["\u1CD1", "VEDIC TONE SHARA"],
  ["\u1CD2", "VEDIC TONE PRENKHA"],
  ["\u1CD3", "VEDIC SIGN NIHSHVASA"],
  ["\u1CD4", "VEDIC SIGN YAJURVEDIC MIDLINE SVARITA"],
  ["\u1CD5", "VEDIC TONE YAJURVEDIC AGGRAVATED INDEPENDENT SVARITA"],
  ["\u1CD6", "VEDIC TONE YAJURVEDIC INDEPENDENT SVARITA"],
  ["\u1CD7", "VEDIC TONE YAJURVEDIC KATHAKA INDEPENDENT SVARITA"],
  ["\u1CD8", "VEDIC TONE CANDRA BELOW"],
  ["\u1CD9", "VEDIC TONE YAJURVEDIC KATHAKA INDEPENDENT SVARITA SCHROEDER"],
  ["\u1CDA", "VEDIC TONE DOUBLE SVARITA"],
  ["\u1CDB", "VEDIC TONE TRIPLE SVARITA"],
  ["\u1CDC", "VEDIC TONE KATHAKA ANUDATTA"],
  ["\u1CDD", "VEDIC TONE DOT BELOW"],
  ["\u1CDE", "VEDIC TONE TWO DOTS BELOW"],
  ["\u1CDF", "VEDIC TONE THREE DOTS BELOW"],
  ["\u1CE0", "VEDIC TONE RIGVEDIC KASHMIRI INDEPENDENT SVARITA"],
  ["\u1CE1", "VEDIC TONE ATHARVAVEDIC INDEPENDENT SVARITA"],
  ["\u1CE2", "VEDIC SIGN VISARGA SVARITA"],
  ["\u1CE3", "VEDIC SIGN VISARGA UDATTA"],
  ["\u1CE4", "VEDIC SIGN REVERSED VISARGA UDATTA"],
  ["\u1CE5", "VEDIC SIGN VISARGA ANUDATTA"],
  ["\u1CE6", "VEDIC SIGN REVERSED VISARGA ANUDATTA"],
  ["\u1CE7", "VEDIC SIGN VISARGA UDATTA WITH TAIL"],
  ["\u1CE8", "VEDIC SIGN VISARGA ANUDATTA WITH TAIL"],
  ["\u1CE9", "VEDIC SIGN ANUSVARA ANTARGOMUKHA"],
  ["\u1CEA", "VEDIC SIGN ANUSVARA BAHIRGOMUKHA"],
  ["\u1CEB", "VEDIC SIGN ANUSVARA VAMAGOMUKHA"],
  ["\u1CEC", "VEDIC SIGN ANUSVARA VAMAGOMUKHA WITH TAIL"],
  ["\u1CED", "VEDIC SIGN TIRYAK"],
  ["\u1CEE", "VEDIC SIGN HEXIFORM LONG ANUSVARA"],
  ["\u1CEF", "VEDIC SIGN LONG ANUSVARA"],
  ["\u1CF0", "VEDIC SIGN RTHANG LONG ANUSVARA"],
  ["\u1CF1", "VEDIC SIGN ANUSVARA UBHAYATO MUKHA"],
  ["\u1CF2", "VEDIC SIGN ARDHAVISARGA"],
  ["\u1CF3", "VEDIC SIGN ROTATED ARDHAVISARGA"],
  ["\u1CF4", "VEDIC TONE CANDRA ABOVE"],
  ["\u1CF5", "VEDIC SIGN JIHVAMULIYA"],
  ["\u1CF6", "VEDIC SIGN UPADHMANIYA"],
  ["\u1CF7", "VEDIC SIGN ATIKRAMA"],
  ["\u1CF8", "VEDIC TONE RING ABOVE"],
  ["\u1CF9", "VEDIC TONE DOUBLE RING ABOVE"],
];

const latinCombiningChars = [
  ["\u0310", "COMBINING CANDRABINDU"],
  ["\u030D", "COMBINING VERTICAL LINE ABOVE"],
  ["\u030E", "COMBINING DOUBLE VERTICAL LINE ABOVE"],
  ["\u0331", "COMBINING MACRON BELOW"],
];

function insertAtCursor(ch) {
  const start = composer.selectionStart;
  const end = composer.selectionEnd;
  const value = composer.value;
  composer.value = value.slice(0, start) + ch + value.slice(end);
  const newCursor = start + ch.length;
  composer.setSelectionRange(newCursor, newCursor);
  composer.focus();
}

function renderCharGrid(gridEl, chars) {
  chars.forEach(([ch, name]) => {
    const codePoint = ch.codePointAt(0).toString(16).toUpperCase().padStart(4, '0');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'special-btn';
    btn.textContent = '\u25CC' + ch; // dotted circle base so combining marks are visible
    btn.title = name + ' (U+' + codePoint + ')';
    btn.setAttribute('aria-label', name);
    btn.addEventListener('click', () => insertAtCursor(ch));
    gridEl.appendChild(btn);
  });
}

renderCharGrid(document.getElementById('cantillationGrid'), cantillationChars);
renderCharGrid(document.getElementById('vedicAccentGrid'), vedicAccentChars);
renderCharGrid(document.getElementById('latinCombiningGrid'), latinCombiningChars);

/* ---------------- Toggle panels ---------------- */
function wireToggle(btnId, panelId) {
  const btn = document.getElementById(btnId);
  const panel = document.getElementById(panelId);
  btn.addEventListener('click', () => {
    const open = panel.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
}
wireToggle('specialToggle', 'specialPanel');

/* ---------------- Engine boot ---------------- */
async function init() {
  try {
    engine = await Aksharamukha.new();
    composer.disabled = false;
    composer.placeholder = 'Type here — e.g. namaste, then press space…';
    setStatus('', null);
    composer.focus();
  } catch (err) {
    setStatus('Could not load the transliteration engine. Check your connection and reload.', 'error');
    console.error(err);
  }
}
init();
