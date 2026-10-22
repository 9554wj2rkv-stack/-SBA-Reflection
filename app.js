'use strict';
/* =====================================================================
   MOON REFLECTION — Soul Blueprint Astrology · Version 1.2
   Vanilla JS, no build step, no external services.
   Load order (see index.html): config.js → sky-data.js → content.js → app.js
   Journal data is stored ONLY in this browser's localStorage.
   ===================================================================== */

/* ---------- Small helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
/* Safe DOM builder. User text is ALWAYS inserted as text nodes. `html` is only
   ever passed trusted, app-authored markup (icons). */
function h(tag, attrs, ...kids) {
  const el = document.createElement(tag);
  if (attrs) for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'text') el.textContent = v;
    else if (k === 'html') el.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const kid of kids.flat()) {
    if (kid == null || kid === false) continue;
    el.append(kid instanceof Node ? kid : document.createTextNode(String(kid)));
  }
  return el;
}
function uid() {
  try { if (crypto && crypto.randomUUID) return crypto.randomUUID(); } catch (e) {}
  return 'e' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}
const TIME_ZONE = (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'your local time'; } catch (e) { return 'your local time'; } })();
function fmt(d, opts) { try { return new Intl.DateTimeFormat(CONFIG.LOCALE, opts).format(d); } catch (e) { return d.toString(); } }
const fmtDateTime = d => fmt(d, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });
const fmtDate = d => fmt(d, { day: 'numeric', month: 'long', year: 'numeric' });
const fmtShort = d => fmt(d, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const fmtTime = d => fmt(d, { hour: '2-digit', minute: '2-digit' });
const fmtTimeTz = d => fmt(d, { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });
const typeLabel = t => (t === 'full' ? 'Full Moon' : 'New Moon');

/* Line icons (gold, thin stroke) */
const S = (body, sw = 1.3) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
const ICONS = {
  menu: S('<path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17"/>', 1.5),
  back: S('<path d="M15 5l-7 7 7 7"/>', 1.6),
  chev: S('<path d="M9 5l7 7-7 7"/>', 1.6),
  arrowR: S('<path d="M4 12h15M13 6l6 6-6 6"/>', 1.6),
  arrowL: S('<path d="M20 12H5M11 6l-6 6 6 6"/>', 1.6),
  star4: S('<path d="M12 2.5l1.8 7.7 7.7 1.8-7.7 1.8L12 21.5l-1.8-7.7L2.5 12l7.7-1.8z" fill="currentColor"/>', 0.8),
  crescent: S('<path d="M18.5 15.5A8 8 0 1 1 8.5 4.2a6.4 6.4 0 0 0 10 11.3z"/>'),
  crescentFill: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.5 15.5A8 8 0 1 1 8.5 4.2a6.4 6.4 0 0 0 10 11.3z" fill="currentColor"/></svg>',
  bookOpen: S('<path d="M12 6.5C10 5 7 4.5 3.5 4.8v13.4c3.5-.3 6.5.2 8.5 1.8 2-1.6 5-2.1 8.5-1.8V4.8C17 4.5 14 5 12 6.5z"/><path d="M12 6.5V20M6 8.2h3.5M6 11h3.5M6 13.8h3.5M14.5 8.2H18M14.5 11H18M14.5 13.8H18"/>'),
  compass: S('<circle cx="12" cy="12" r="9"/><path d="M12 5.5l1.4 5.1 5.1 1.4-5.1 1.4L12 18.5l-1.4-5.1L5.5 12l5.1-1.4z" fill="currentColor" fill-opacity=".85"/>'),
  globe: S('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9c-2.6-2.6-3.8-5.6-3.8-9S9.4 5.6 12 3z"/>'),
  eye: S('<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3.2"/>'),
  leaf: S('<path d="M5 19c0-8 5-13.5 15-14-.5 10-6 15-14 15"/><path d="M5 19c3-4 6.5-7 10.5-9.5"/>'),
  sparkle: S('<path d="M12 3l1.6 6.4L20 11l-6.4 1.6L12 19l-1.6-6.4L4 11l6.4-1.6z"/><path d="M19 3v3M17.5 4.5h3M5 17v3M3.5 18.5h3"/>'),
  bulb: S('<path d="M9 17.5h6M9.8 20.5h4.4"/><path d="M12 3.5a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V17h5.2v-.7c0-.8.4-1.5 1-2A6 6 0 0 0 12 3.5z"/>'),
  bookmark: S('<path d="M6.5 3.5h11v17l-5.5-4-5.5 4z"/>'),
  check: S('<path d="M4.5 12.5l5 5L19.5 7"/>', 1.8),
  home: S('<path d="M3.5 11 12 3.8 20.5 11"/><path d="M5.5 9.5v11h13v-11"/><path d="M10 20.5v-5h4v5"/>'),
  info: S('<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.6v.2"/>', 1.5),
  gear: S('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
  bell: S('<path d="M6 9.5a6 6 0 1 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15.5 6 9.5z"/><path d="M10 20a2 2 0 0 0 4 0"/>'),
  shield: S('<path d="M12 3l7.5 3v5.5c0 4.7-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.8-7.5-9.5V6z"/><rect x="9" y="10.5" width="6" height="5" rx="1"/><path d="M10.2 10.5V9a1.8 1.8 0 0 1 3.6 0v1.5"/>'),
  contact: S('<path d="M9.5 14.5l5-5"/><path d="M11 6.5l1.4-1.4a4 4 0 0 1 5.6 5.6L16.5 12M13 17.5l-1.4 1.4a4 4 0 0 1-5.6-5.6L7.5 12"/>'),
  person: S('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="9.8" r="3"/><path d="M6.6 18.2c1.2-2.4 3.1-3.5 5.4-3.5s4.2 1.1 5.4 3.5"/>'),
  constellation: S('<path d="M5 7l5-2.5 6 3 2.5 6.5-6 4.5-6.5-3z" stroke-dasharray="2 2"/><circle cx="5" cy="7" r="1.2" fill="currentColor"/><circle cx="10" cy="4.5" r="1.2" fill="currentColor"/><circle cx="16" cy="7.5" r="1.2" fill="currentColor"/><circle cx="18.5" cy="14" r="1.2" fill="currentColor"/><circle cx="12.5" cy="18.5" r="1.2" fill="currentColor"/><circle cx="6" cy="15.5" r="1.2" fill="currentColor"/>')
};
function moonImg(type, cls = '', label) {
  return h('img', { class: 'moon-img ' + (type === 'new' ? 'new ' : 'glow ') + cls, src: ASSETS.moon, alt: label || '', width: '256', height: '256', decoding: 'async' });
}
function ornament() { return h('div', { class: 'ornament', 'aria-hidden': 'true', html: ICONS.star4 }); }
function ci(icon, sm) { return h('span', { class: 'ci' + (sm ? ' sm' : ''), html: ICONS[icon] }); }
function chev() { const s = h('span', { html: ICONS.chev }); s.firstChild.classList.add('chev'); return s.firstChild; }

/* =====================================================================
   2. LUNAR EVENT DATA  (calculations unchanged from v1.0)
   ---------------------------------------------------------------------
   (a) ASTRONOMY — New/Full Moon instants calculated on-device with the
       lunar-phase algorithm from Jean Meeus, "Astronomical Algorithms"
       (2nd ed., ch. 49). Typically within ~1–2 minutes of published times.
       Sun/Moon constellation positions: see section 2b.
   (b) SBA INTERPRETATION — symbolic guidance keyed by event ID.
   ===================================================================== */
const SYNODIC_MONTH = 29.530588861;
const rad = d => d * Math.PI / 180;
const dateToJD = d => d.getTime() / 86400000 + 2440587.5;
const jdeToDate = jde => new Date((jde - 2440587.5) * 86400000 - CONFIG.DELTA_T_SECONDS * 1000);

function meeusTruePhase(k) {
  const T = k / 1236.85, T2 = T * T, T3 = T2 * T, T4 = T3 * T;
  const jde = 2451550.09766 + 29.530588861 * k + 0.00015437 * T2 - 0.000000150 * T3 + 0.00000000073 * T4;
  const E = 1 - 0.002516 * T - 0.0000074 * T2;
  const M = rad(2.5534 + 29.10535670 * k - 0.0000014 * T2 - 0.00000011 * T3);
  const Mp = rad(201.5643 + 385.81693528 * k + 0.0107582 * T2 + 0.00001238 * T3 - 0.000000058 * T4);
  const F = rad(160.7108 + 390.67050284 * k - 0.0016118 * T2 - 0.00000227 * T3 + 0.000000011 * T4);
  const Om = rad(124.7746 - 1.56375588 * k + 0.0020672 * T2 + 0.00000215 * T3);
  const s = Math.sin;
  const isNew = Math.abs(k - Math.floor(k)) < 0.25;
  let c;
  if (isNew) {
    c = -0.40720 * s(Mp) + 0.17241 * E * s(M) + 0.01608 * s(2 * Mp) + 0.01039 * s(2 * F)
      + 0.00739 * E * s(Mp - M) - 0.00514 * E * s(Mp + M) + 0.00208 * E * E * s(2 * M);
  } else {
    c = -0.40614 * s(Mp) + 0.17302 * E * s(M) + 0.01614 * s(2 * Mp) + 0.01043 * s(2 * F)
      + 0.00734 * E * s(Mp - M) - 0.00515 * E * s(Mp + M) + 0.00209 * E * E * s(2 * M);
  }
  c += -0.00111 * s(Mp - 2 * F) - 0.00057 * s(Mp + 2 * F) + 0.00056 * E * s(2 * Mp + M) - 0.00042 * s(3 * Mp)
    + 0.00042 * E * s(M + 2 * F) + 0.00038 * E * s(M - 2 * F) - 0.00024 * E * s(2 * Mp - M) - 0.00017 * s(Om)
    - 0.00007 * s(Mp + 2 * M) + 0.00004 * s(2 * Mp - 2 * F) + 0.00004 * s(3 * M) + 0.00003 * s(Mp + M - 2 * F)
    + 0.00003 * s(2 * Mp + 2 * F) - 0.00003 * s(Mp + M + 2 * F) + 0.00003 * s(Mp - M + 2 * F)
    - 0.00002 * s(Mp - M - 2 * F) - 0.00002 * s(3 * Mp + M) + 0.00002 * s(4 * Mp);
  const A = [[299.77, 0.107408, -0.009173], [251.88, 0.016321], [251.83, 26.651886], [349.42, 36.412478],
    [84.66, 18.206239], [141.74, 53.303771], [207.14, 2.453732], [154.84, 7.306860], [34.52, 27.261239],
    [207.19, 0.121824], [291.34, 1.844379], [161.72, 24.198154], [239.56, 25.513099], [331.55, 3.592518]];
  const coef = [325, 165, 164, 126, 110, 62, 60, 56, 47, 42, 40, 37, 35, 23];
  let a = 0;
  A.forEach((x, i) => { a += coef[i] * 1e-6 * Math.sin(rad(x[0] + x[1] * k + (x[2] || 0) * T2)); });
  return jde + c + a;
}

function astroEvent(k, date) {
  const type = Math.abs(k - Math.floor(k)) < 0.25 ? 'new' : 'full';
  const iso = date.toISOString();
  return { id: `${type}-moon-${iso.slice(0, 10)}`, k, type, date, iso };
}
function lunarEventsBetween(start, end) {
  const k0 = Math.floor((dateToJD(start) - 2451550.09766) / SYNODIC_MONTH) - 1;
  const out = [];
  for (let k = k0; out.length < 400; k += 0.5) {
    const d = jdeToDate(meeusTruePhase(k));
    if (d > end) break;
    if (d >= start) out.push(astroEvent(k, d));
  }
  return out;
}

/* Compose demonstration guidance from BOTH verified placements and how they
   interact. Returns null if either placement is unverified. */
function placementInterpretation(type, sky) {
  const mn = placeName(sky.moon), sn = placeName(sky.sun);
  const M = mn && CONSTELLATION_THEMES[mn], Sn = sn && CONSTELLATION_THEMES[sn];
  if (!M || !Sn) return null;
  const item = (pair, extra) => ({ title: pair[0], text: pair[1] + (extra ? ' ' + extra : '') });
  const same = mn === sn;
  if (type === 'full') {
    return {
      theme: same ? `A time for ${M.theme}.` : `A time to balance ${M.short} with ${Sn.short}.`,
      intro: same
        ? `At this Full Moon the Sun and Moon both stand in ${mn}, ${M.figure}. Its themes of ${M.theme} are fully illuminated, asking you to see clearly what has grown and what is ready to be released.`
        : `At this Full Moon the Moon stands in ${mn}, ${M.figure}, highlighting ${M.theme}. Opposite, the Sun stands in ${sn}, ${Sn.figure}, highlighting ${Sn.theme}. Facing each other across the sky, they invite you to let ${M.short} and ${Sn.short} work together rather than pull you in two directions.`,
      lookOut: [item(M.shadow, `(Moon in ${mn})`), item(Sn.shadow, `(Sun in ${sn})`),
        { title: 'Pulling in two directions.', text: same ? `Pushing ${M.short} so far that it loses its gentleness.` : `Swinging between ${M.short} and ${Sn.short} instead of giving each its place.` }],
      letGo: [item(M.release), item(Sn.release),
        { title: 'Either–or thinking.', text: same ? 'The idea that there is only one right way forward.' : `The belief that you must choose ${M.short} or ${Sn.short}, but not both.` }],
      letIn: [item(M.welcome), item(Sn.welcome),
        { title: 'Integration.', text: same ? `Letting ${M.short} become a calm, natural part of who you are.` : `Allowing ${M.short} and ${Sn.short} to support each other.` }],
      lessons: { look: same ? `The lesson is to honour ${M.short} without forcing it.` : `The lesson is to let ${M.short} and ${Sn.short} complete each other rather than compete.` },
      release: same ? `I release ${M.releaseP}. I set down what was never mine to carry.` : `I release ${M.releaseP} and ${Sn.releaseP}. I no longer need to choose between ${M.short} and ${Sn.short}.`,
      invitation: same ? `I welcome ${M.welcomeP}. I let it guide my next step with patience and trust.` : `I welcome ${M.welcomeP} and ${Sn.welcomeP}. I let them work together as I move towards the life I want.`,
      questions: [M.q, same ? 'Where in my life has something come to completion?' : Sn.q, 'What am I ready to stop carrying?',
        same ? `How could I express ${M.short} more gently?` : `Where am I being asked to balance ${M.short} and ${Sn.short}?`]
    };
  }
  return {
    theme: same ? `A time to begin with ${M.short}.` : `A time to begin with ${M.short} and ${Sn.short}.`,
    intro: same
      ? `At this New Moon the Sun and Moon meet in ${mn}, ${M.figure}, drawing attention to ${M.theme}. It is a symbolic moment to plant an intention rooted in ${M.short}.`
      : `At this New Moon the Moon stands in ${mn}, ${M.figure}, while the Sun stands in ${sn}, ${Sn.figure}. Beginning together, they combine ${M.theme} with ${Sn.theme} — an invitation to plant an intention that draws on both.`,
    lookOut: [item(M.shadow, same ? '' : `(Moon in ${mn})`), same ? { title: 'Waiting to feel ready.', text: 'Holding back until you feel completely certain.' } : item(Sn.shadow, `(Sun in ${sn})`),
      { title: 'Rushing the beginning.', text: 'Expecting a new intention to bloom before it has taken root.' }],
    letGo: [item(M.release), same ? { title: 'The need for certainty.', text: 'You can begin before you know every step.' } : item(Sn.release),
      { title: 'Old starting points.', text: 'Beliefs about where you “should” be by now.' }],
    letIn: [item(M.welcome), same ? { title: 'One small step.', text: 'Steady progress over dramatic change.' } : item(Sn.welcome),
      { title: 'A seed of intention.', text: same ? `One clear intention rooted in ${M.short}.` : `One clear intention where ${M.short} and ${Sn.short} meet.` }],
    lessons: { look: same ? `The lesson is to plant your intention in ${M.short} and let it grow at its own pace.` : `The lesson is to let ${M.short} and ${Sn.short} grow side by side from the same small seed.` },
    release: same ? `I release ${M.releaseP}. I make space for something new to begin.` : `I release ${M.releaseP} and ${Sn.releaseP}. I make space for something new to begin.`,
    invitation: same ? `I welcome ${M.welcomeP}. I take one clear step towards what matters to me.` : `I welcome ${M.welcomeP} and ${Sn.welcomeP}. I take one clear step towards what matters to me.`,
    questions: [same ? `What would I like to grow from ${M.short} during this cycle?` : M.q, same ? M.q : Sn.q, 'What am I ready to stop carrying into this new cycle?',
      same ? 'What small step could I take this week?' : `What intention could unite ${M.short} and ${Sn.short} in my life?`]
  };
}

const normItem = it => (typeof it === 'string' ? { title: '', text: it } : { title: String(it.title || ''), text: String(it.text || '') });
function buildLunarEvent(a) {
  const sba = SBA_INTERPRETATIONS[a.id];
  const sky = skyPositions(a.id);
  const composed = sba ? null : placementInterpretation(a.type, sky);
  const interp = sba || composed || DEMO_INTERPRETATIONS[a.type];
  return {
    id: a.id,
    dateTime: a.iso,
    date: a.date,
    type: a.type,
    astronomy: {
      method: 'Calculated on this device using the Meeus lunar-phase algorithm (Astronomical Algorithms, ch. 49)',
      accuracy: 'typically within 1–2 minutes',
      timeZone: TIME_ZONE,
      constellation: placeName(sky.moon)
    },
    sky,
    interpretationSystem: sba ? 'Soul Blueprint Astrology' : (composed ? 'Demonstration content based on the verified true-sky placements — awaiting SBA interpretations' : 'Demonstration content — awaiting final SBA interpretations'),
    isDemo: !sba,
    placementBased: !!(sba || composed),
    theme: interp.theme,
    intro: interp.intro,
    lookOut: interp.lookOut.map(normItem),
    letGo: interp.letGo.map(normItem),
    letIn: interp.letIn.map(normItem),
    lessons: Object.assign({}, interp.lessons || {}),
    release: interp.release,
    invitation: interp.invitation,
    questions: interp.questions.slice(0, 4)
  };
}

function getLunarContext(now = new Date()) {
  try {
    if (!CONFIG.ASTRONOMY_ENABLED) throw new Error('Astronomy calculations are switched off in configuration.');
    const evts = lunarEventsBetween(new Date(now.getTime() - 40 * 864e5), new Date(now.getTime() + 40 * 864e5));
    const past = evts.filter(e => e.date <= now), future = evts.filter(e => e.date > now);
    if (!past.length || !future.length) throw new Error('Could not determine surrounding lunar events.');
    const last = past[past.length - 1], next = future[0];
    const daysSinceLast = (now - last.date) / 864e5;
    const isCurrent = daysSinceLast <= CONFIG.CURRENT_EVENT_WINDOW_DAYS;
    const chosen = isCurrent ? last : next;
    if (!isFinite(chosen.date.getTime())) throw new Error('Invalid calculated date.');
    return { status: isCurrent ? 'current' : 'upcoming', event: buildLunarEvent(chosen), all: evts };
  } catch (err) {
    return { status: 'unavailable', reason: err.message || String(err) };
  }
}

/* =====================================================================
   3. NAVIGATION
   ===================================================================== */
const ROUTE_TITLES = { home: 'Moon Reflection', moon: 'This Moon', guide: 'This Moon', journal: 'My Reflections', sba: 'Discover SBA',
  world: 'Enter the SBA World', settings: 'Settings', notifications: 'Notifications', privacy: 'Privacy', about: 'About',
  entry: 'Your Reflection', complete: 'Reflection Complete', reflect: 'Your Reflection' };
const TAB_FOR_ROUTE = { home: 'home', moon: 'moon', guide: 'moon', reflect: 'moon', complete: 'moon', journal: 'journal', entry: 'journal', sba: 'sba', world: 'sba' };

function parseRoute() {
  const raw = (location.hash || '#home').slice(1);
  const parts = raw.split('/').map(decodeURIComponent);
  return { name: parts[0] || 'home', args: parts.slice(1) };
}
let navDepth = 0;
function go(path, { replace = false } = {}) {
  const target = '#' + path;
  if (location.hash === target) { render(); return; }
  if (replace) { history.replaceState(null, '', target); render(); }
  else { navDepth++; location.hash = target; }
}
function goBack(fallback = 'home') {
  if (navDepth > 0) { navDepth--; history.back(); } else go(fallback, { replace: true });
}
window.addEventListener('hashchange', render);

/* Interior header: back · TITLE · star (opens menu) */
function header(title, { back = 'home', backLabel = 'Back' } = {}) {
  return h('header', { class: 'hdr' },
    h('button', { class: 'hdr-btn', 'aria-label': backLabel, html: ICONS.back, onclick: () => (typeof back === 'function' ? back() : goBack(back)) }),
    h('div', { class: 'hdr-title' + (title.length > 15 ? ' long' : ''), role: 'heading', 'aria-level': '2', text: title }),
    starButton());
}
function starButton() {
  const b = h('button', { class: 'star-btn', 'aria-label': 'Open menu', onclick: openMenu });
  b.append(h('span', { html: ICONS.star4 }));
  return b;
}

let currentRouteName = null;
function render() {
  const { name, args } = parseRoute();
  if (currentRouteName === 'reflect' && name !== 'reflect') { flushSave(); teardownReflect(); }
  closeMenu(true);
  currentRouteName = name;
  const view = $('#view');
  view.innerHTML = '';
  document.body.classList.toggle('mode-reflect', name === 'reflect');
  $('#scene').classList.toggle('home', name === 'home');
  document.title = (name === 'home' ? '' : (ROUTE_TITLES[name] || '') + ' · ') + 'Moon Reflection';
  document.querySelectorAll('#tabbar button').forEach(b => {
    if (b.dataset.route === TAB_FOR_ROUTE[name]) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
  });
  const screens = { home: renderHome, moon: renderThisMoon, guide: renderGuide, reflect: renderReflect, complete: renderComplete, journal: renderJournal,
    entry: renderEntry, sba: renderDiscover, world: renderWorld, settings: renderSettings, notifications: renderNotifications, privacy: renderPrivacy, about: renderAbout };
  const fn = screens[name] || renderHome;
  try { fn(view, args); }
  catch (err) {
    console.error(err);
    view.append(header('Moon Reflection'), h('section', { class: 'screen' }, h('h1', { class: 'page-title', text: 'Something went wrong' }),
      h('p', { class: 'page-sub', text: 'This screen could not be displayed. Your saved reflections have not been changed.' }),
      h('button', { class: 'btn-gold block', onclick: () => go('home'), text: 'Return home' })));
  }
  if (name !== 'reflect') {
    window.scrollTo(0, 0);
    const heading = view.querySelector('h1');
    if (heading && !view.contains(document.activeElement)) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
  }
}

/* Full-screen menu (reference screen 8) */
let menuReturnFocus = null;
function buildMenu() {
  const list = $('#menuList');
  list.innerHTML = '';
  const cur = parseRoute().name;
  const item = (icon, label, onclick, { route, dim, sub, tail } = {}) => {
    const b = h('button', { class: 'm-item' + (dim ? ' dim' : ''), onclick, html: ICONS[icon] });
    const txt = h('span', null, label);
    if (sub) txt.append(h('span', { class: 'm-sub', text: sub }));
    b.append(txt);
    if (tail) b.append(tail);
    if (route && route === cur) b.setAttribute('aria-current', 'page');
    return b;
  };
  const nav = r => () => { closeMenu(); go(r); };
  const worldLive = SBA_WORLD.isConfigured();
  const contactLive = /^(mailto:|https:\/\/)/i.test((CONFIG.CONTACT_URL || '').trim());
  list.append(
    item('home', 'Home', nav('home'), { route: 'home' }),
    item('crescent', 'This Moon', nav('moon'), { route: 'moon' }),
    item('bookOpen', 'My Reflections', nav('journal'), { route: 'journal' }),
    item('globe', 'Discover SBA', nav('sba'), { route: 'sba' }),
    item('globe', 'Enter the SBA World', () => { closeMenu(); openWorld(); }, { dim: !worldLive, sub: worldLive ? null : 'Coming soon' }),
    h('hr', { class: 'm-sep' }),
    item('info', 'About Moon Reflection', nav('about'), { route: 'about' }),
    item('gear', 'Settings', nav('settings'), { route: 'settings' }),
    item('bell', 'Notifications', nav('notifications'), { route: 'notifications', tail: h('span', { class: 'badge m-tail', text: 'Not yet available' }) }),
    item('shield', 'Privacy', nav('privacy'), { route: 'privacy' }),
    item('contact', 'Contact', () => { closeMenu(); openContact(); }, { dim: !contactLive, sub: contactLive ? null : 'Coming soon' }));
}
function openMenu() {
  buildMenu();
  menuReturnFocus = document.activeElement;
  $('#menuScreen').classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => { const f = $('#menuList .m-item'); f && f.focus({ preventScroll: true }); }, 60);
}
function closeMenu(silent) {
  const m = $('#menuScreen');
  if (!m.classList.contains('open')) return;
  m.classList.remove('open');
  document.body.style.overflow = '';
  if (!silent && menuReturnFocus && menuReturnFocus.focus) menuReturnFocus.focus({ preventScroll: true });
}

/* Modal (returns a Promise with the chosen action value) */
function showModal({ title, body, actions }) {
  return new Promise(resolve => {
    const root = $('#modalRoot');
    const prevFocus = document.activeElement;
    const close = v => { wrap.remove(); document.removeEventListener('keydown', onKey); if (prevFocus && prevFocus.focus) prevFocus.focus({ preventScroll: true }); resolve(v); };
    const onKey = e => { if (e.key === 'Escape') close(null); };
    const bodyEl = h('div', { class: 'm-body' });
    if (body instanceof Node) bodyEl.append(body);
    else (Array.isArray(body) ? body : [body]).forEach(t => t && bodyEl.append(h('p', { text: t })));
    const acts = h('div', { class: 'm-actions' }, (actions || [{ label: 'Close', value: null }]).map(a =>
      h('button', { class: (a.style === 'primary' ? 'btn-gold' : 'btn-line' + (a.style === 'danger' ? ' danger' : '')) + ' block', onclick: () => close(a.value), text: a.label })));
    const modal = h('div', { class: 'modal', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'mTitle' },
      h('h2', { id: 'mTitle', text: title }), bodyEl, acts);
    const wrap = h('div', { class: 'modal-wrap', onclick: e => { if (e.target === wrap) close(null); } }, modal);
    root.append(wrap);
    document.addEventListener('keydown', onKey);
    setTimeout(() => { const f = acts.querySelector('button'); f && f.focus(); }, 30);
  });
}
let toastTimer;
function toast(msg, ms = 2800) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), ms);
}

/* =====================================================================
   4. SCREEN RENDERING
   ===================================================================== */
function storageBanner() {
  if (storageState.available && !storageState.recoveredUnreadable) return null;
  if (!storageState.available) return h('div', { class: 'banner', role: 'alert', text: 'This browser is not allowing local storage (for example, in some private browsing modes). Reflections cannot be saved on this device right now.' });
  return h('div', { class: 'banner', role: 'alert', text: 'Some previously stored journal data could not be read. A copy was kept safely on this device and nothing was deleted.' });
}
function unavailableCard(ctx) {
  return h('div', { class: 'glass strong card', style: 'text-align:center' },
    h('span', { class: 'badge warn', text: 'Lunar information unavailable' }),
    h('h3', { style: 'margin-top:.7rem', text: 'We can’t show lunar dates right now' }),
    h('p', { class: 'muted small', text: 'Accurate New Moon and Full Moon information could not be calculated, so no date is shown rather than a guessed one. Your journal is still available.' }),
    h('p', { class: 'tiny', text: 'Details: ' + ctx.reason }));
}

/* ---------- 1. HOME ---------- */
function renderHome(view) {
  const ctx = getLunarContext();
  const hero = h('section', { class: 'home-hero', 'aria-label': 'Moon Reflection' });
  const top = h('div', { class: 'home-top' },
    h('button', { class: 'hdr-btn', 'aria-label': 'Open menu', html: ICONS.menu, onclick: openMenu }),
    h('div', { class: 'brand' }, h('div', { class: 'b1', text: 'SOUL BLUEPRINT ASTROLOGY' }), h('div', { class: 'b2', text: 'A GREATER PERSPECTIVE' })),
    starButton());
  hero.append(top,
    h('h1', { class: 'hero-title', 'aria-label': 'Moon Reflection' }, h('span', { text: 'Moon' }), h('span', { text: 'Reflection' })),
    h('p', { class: 'hero-sub' }, 'YOUR PERSONAL SPACE', h('br'), 'BENEATH THE STARS'),
    ornament());
  view.append(hero);

  const body = h('section', { class: 'home-body' }, h('div', { class: 'bg-stars', 'aria-hidden': 'true' }));
  const banner = storageBanner(); if (banner) body.append(banner);

  if (ctx.status === 'unavailable') body.append(unavailableCard(ctx));
  else {
    const e = ctx.event;
    const card = h('button', { class: 'event-card', onclick: () => go('moon'), 'aria-label': `${ctx.status === 'current' ? 'This Moon' : 'Upcoming'}: ${typeLabel(e.type)}, ${fmtDateTime(e.date)}. Explore the lunar guidance.` },
      moonImg(e.type),
      h('div', null,
        h('div', { class: 'label', text: ctx.status === 'current' ? 'This Moon' : 'Upcoming' }),
        h('div', { class: 'ev-kind', text: typeLabel(e.type) }),
        h('div', { class: 'ev-date', text: fmt(e.date, { day: 'numeric', month: 'long', year: 'numeric' }) + ' · ' + fmtTime(e.date) }),
        h('div', { class: 'ev-place' + (e.sky.moon.verified && e.sky.sun.verified ? '' : ' pending'), text: placementLine(e.sky) })),
      h('span', { class: 'ev-arrow', html: ICONS.chev }));
    body.append(card);
    const inProgress = Journal.forEvent(e.id).filter(en => !en.completed)[0];
    if (inProgress) body.append(h('div', { class: 'glass card', style: 'display:flex;align-items:center;gap:.9rem;padding:.8rem 1rem' },
      ci('bookmark', true),
      h('div', { style: 'flex:1' }, h('div', { class: 'small', text: 'Your reflection is waiting' }),
        h('div', { class: 'tiny', text: `${Journal.answeredCount(inProgress)} of ${inProgress.questions.length} answered` })),
      h('button', { class: 'btn-line', style: 'min-height:46px;padding:.4rem 1rem', onclick: () => go(`reflect/${inProgress.id}/${inProgress.currentQ || 0}`), text: 'Continue' })));
  }

  const navCard = (icon, title, sub, onclick, soon) => {
    const b = h('button', { class: 'nav-card', onclick });
    if (soon) b.append(h('span', { class: 'soon-tag', text: 'COMING SOON' }));
    b.append(ci(icon), h('strong', { text: title }), h('span', { class: 'nc-sub', text: sub }));
    const c = chev(); c.classList.add('nc-chev'); b.append(c);
    return b;
  };
  body.append(h('div', { class: 'nav-grid' },
    navCard('crescentFill', 'This Moon', 'Guidance, meaning and reflections', () => go('moon')),
    navCard('bookOpen', 'My Reflections', 'Journal, intentions and previous moons', () => go('journal')),
    navCard('star4', 'Discover SBA', 'The sky, the system and your unique blueprint', () => go('sba')),
    navCard('globe', 'Enter the SBA World', 'Go deeper on our website and explore more', openWorld, !SBA_WORLD.isConfigured())));
  const q = h('figure', { class: 'quote-card', style: 'margin-left:0;margin-right:0' },
    h('p', { text: '“The Moon is more than a date on a calendar. It is a rhythm for reflection, a guide for growth and a reminder of your place in something greater.”' }),
    ornament());
  body.append(q);
  view.append(body);
}

/* ---------- 2. THIS MOON — overview ---------- */
function renderThisMoon(view) {
  const ctx = getLunarContext();
  view.append(header('This Moon'));
  const s = h('section', { class: 'screen fade-in' });
  const banner = storageBanner(); if (banner) s.append(banner);
  if (ctx.status === 'unavailable') {
    s.append(h('h1', { class: 'sr-only', text: 'This Moon' }), unavailableCard(ctx),
      h('button', { class: 'btn-line block', onclick: () => go('journal'), text: 'Open my reflections' }));
    view.append(s); return;
  }
  const e = ctx.event;
  s.append(h('div', { class: 'moon-stage' },
    moonImg(e.type, '', typeLabel(e.type)),
    h('h1', { text: typeLabel(e.type) }),
    e.sky.moon.verified ? h('div', { class: 'sub-serif', text: 'in ' + e.sky.moon.constellation }) : null,
    h('p', { class: 'date', text: fmtDate(e.date) + ' · ' + fmtTimeTz(e.date) }),
    h('div', { style: 'margin-top:.7rem' }, h('span', { class: 'badge', text: ctx.status === 'current' ? 'This Moon' : 'Upcoming' }), ' ',
      e.isDemo ? h('span', { class: 'badge demo', text: 'Demo guidance' }) : null)));
  s.append(placementLabels(e.sky));
  s.append(h('p', { class: 'theme', text: e.theme }));
  s.append(h('p', { class: 'intro', text: e.intro }));

  const row = (icon, label, key) => {
    const b = h('button', { class: 'g-row glass', onclick: () => go('guide/' + key) }, ci(icon, true), h('span', { class: 'g-label', text: label }), chev());
    return b;
  };
  s.append(row('eye', 'What to look out for', 'look'), row('leaf', 'What to let go of', 'go'), row('sparkle', 'What to let in', 'in'));
  s.append(reflectionStarter(e));
  if (e.isDemo) s.append(h('p', { class: 'tiny', style: 'text-align:center;margin-top:1rem', text: 'The date is calculated astronomically. The guidance and questions are demonstration content, not official Soul Blueprint Astrology interpretations. Astrological guidance is offered as symbolic reflection, not prediction.' }));
  s.append(skyDetails(e));
  s.append(h('div', { class: 'spacer-art' }));
  view.append(s);
}

function reflectionStarter(e) {
  const entries = Journal.forEvent(e.id);
  const box = h('div', { style: 'margin-top:14px' });
  if (!entries.length) {
    box.append(h('button', { class: 'btn-gold block', onclick: () => startReflection(e), html: '<span>Start my reflection</span>' + ICONS.arrowR }));
  } else {
    const latest = entries[0];
    box.append(h('button', { class: 'btn-gold block', onclick: () => go(`reflect/${latest.id}/${latest.completed ? 0 : (latest.currentQ || 0)}`),
      html: `<span>${latest.completed ? 'Revisit my reflection' : 'Continue my reflection'}</span>` + ICONS.arrowR }));
    box.append(h('div', { class: 'continue-note' }, h('button', { class: 'text-link', onclick: () => startReflection(e, { skipPrompt: true }), text: 'Start a new reflection' })));
    box.append(h('p', { class: 'tiny', style: 'text-align:center', text: 'Starting a new one never replaces an earlier one.' }));
  }
  return box;
}

/* Placement labels (This Moon) and astronomical details */
const SUN_ICON = S('<circle cx="12" cy="12" r="4.2"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7"/>');
function placementLabels(sky) {
  const one = (icon, label, b) => h('div', { class: 'place glass' + (b.verified ? '' : ' pending') },
    h('span', { class: 'place-ic', html: icon }),
    h('div', { class: 'place-txt' }, h('div', { class: 'place-lab', text: label }),
      h('div', { class: 'place-val', text: b.verified ? b.constellation : PENDING_TEXT })));
  return h('div', { class: 'places', role: 'group', 'aria-label': 'True-sky placements' },
    one(ICONS.crescentFill, 'Moon in', sky.moon), one(SUN_ICON, 'Sun in', sky.sun));
}
function skyDetails(e) {
  const sky = e.sky;
  const d = h('details', { class: 'd-row glass sky-details' });
  d.append(h('summary', null, ci('constellation', true), h('span', { class: 'd-label', text: 'Astronomical details' }), chev()));
  const row = (k, v) => h('div', { class: 'sd-row' }, h('span', { class: 'sd-k', text: k }), h('span', { class: 'sd-v', text: v }));
  const deg = x => (x == null ? '—' : x.toFixed(2) + '°');
  const body = h('div', { class: 'd-body sd-body' },
    h('p', { class: 'sd-h', text: 'True sky — used by SBA' }),
    row('Moon constellation', sky.moon.verified ? sky.moon.constellation : PENDING_TEXT),
    row('Sun constellation', sky.sun.verified ? sky.sun.constellation : PENDING_TEXT),
    sky.moon.eclipticLatitude != null ? row('Moon ecliptic latitude', deg(sky.moon.eclipticLatitude)) : null,
    h('p', { class: 'sd-h', text: 'Tropical zodiac — comparison only' }),
    row('Moon sign', sky.moon.tropicalSign || PENDING_TEXT),
    row('Sun sign', sky.sun.tropicalSign || PENDING_TEXT),
    row('Moon ecliptic longitude', deg(sky.moon.eclipticLongitude)),
    row('Sun ecliptic longitude', deg(sky.sun.eclipticLongitude)),
    h('p', { class: 'sd-h', text: 'Method' }),
    h('p', { text: `Event time: ${e.astronomy.method}, ${e.astronomy.accuracy}. Placements: ${SKY_SYSTEM.source}; ${SKY_SYSTEM.boundaries}. ${SKY_SYSTEM.frame}. Verified when both calculations agree and no boundary is crossed within ±5 minutes of the event. Coverage ${SKY_SYSTEM.coverage}.` }),
    e.isDemo ? h('p', { text: 'Guidance: ' + e.interpretationSystem + '. Constellation themes are drawn from each figure’s traditional imagery and offered as symbolic reflection, not prediction.' }) : null);
  d.append(body);
  return d;
}

/* ---------- 3. GUIDANCE DETAILS ---------- */
const GUIDE_SECTIONS = {
  look: { icon: 'eye', title: 'What to look out for', items: e => e.lookOut, lesson: e => e.lessons.look ? { kind: '', text: e.lessons.look } : null },
  go: { icon: 'leaf', title: 'What to let go of', items: e => e.letGo, lesson: e => ({ kind: 'Release statement', text: e.release, statement: true }) },
  in: { icon: 'sparkle', title: 'What to let in', items: e => e.letIn, lesson: e => ({ kind: 'Your invitation', text: e.invitation, statement: true }) }
};
function renderGuide(view, args) {
  const ctx = getLunarContext();
  const key = GUIDE_SECTIONS[args[0]] ? args[0] : 'look';
  const sec = GUIDE_SECTIONS[key];
  view.append(header('This Moon', { back: 'moon' }));
  const s = h('section', { class: 'screen fade-in' });
  if (ctx.status === 'unavailable') { s.append(h('h1', { class: 'sr-only', text: sec.title }), unavailableCard(ctx)); view.append(s); return; }
  const e = ctx.event;
  s.append(h('div', { class: 'gd-head' }, ci(sec.icon), h('h1', { text: sec.title })));
  if (e.isDemo) s.append(h('p', { style: 'margin:-.6rem 0 1rem' }, h('span', { class: 'badge demo', text: 'Demo guidance' })));
  s.append(h('ul', { class: 'gd-list' }, sec.items(e).map(it => h('li', null, it.title ? h('strong', { text: it.title + ' ' }) : null, it.text))));
  const l = sec.lesson(e);
  if (l) s.append(h('div', { class: 'lesson glass' }, ci('sparkle', true),
    h('div', null, l.kind ? h('div', { class: 'lesson-kind', text: l.kind }) : null, h('p', { class: 'l-text' + (l.statement ? ' statement' : ''), text: l.text }))));
  const keys = Object.keys(GUIDE_SECTIONS), i = keys.indexOf(key);
  const nav = h('div', { class: 'gd-nav' });
  if (i > 0) nav.append(h('button', { class: 'btn-line', onclick: () => go('guide/' + keys[i - 1], { replace: true }), text: '← ' + GUIDE_SECTIONS[keys[i - 1]].title.replace('What to ', '') }));
  if (i < keys.length - 1) nav.append(h('button', { class: 'btn-line', onclick: () => go('guide/' + keys[i + 1], { replace: true }), text: GUIDE_SECTIONS[keys[i + 1]].title.replace('What to ', '') + ' →' }));
  s.append(nav, reflectionStarter(e), h('div', { class: 'spacer-art' }));
  view.append(s);
}

/* Continuity: optional, never guilt-based */
async function startReflection(e, { skipPrompt } = {}) {
  if (!skipPrompt && settings.revisitPrompts) {
    const earlier = Journal.all().find(en => en.eventId !== e.id && Journal.answeredCount(en) > 0);
    if (earlier) {
      const aboutRelease = (earlier.answers[RELEASE_QUESTION_INDEX] || '').trim().length > 0;
      const choice = await showModal({
        title: 'Before you begin',
        body: [aboutRelease ? 'Last Moon, you reflected on what you were ready to release. Would you like to revisit your thoughts?' : 'At an earlier Moon, you took a moment to reflect. Would you like to revisit your thoughts?',
          'This is entirely optional.'],
        actions: [{ label: 'Revisit my thoughts', value: 'revisit', style: 'primary' }, { label: 'Not now — begin', value: 'begin' }]
      });
      if (choice === null) return;
      if (choice === 'revisit') {
        const list = h('div');
        list.append(h('p', { class: 'tiny', text: `${typeLabel(earlier.eventType)} · ${fmtDate(new Date(earlier.eventDate))}` }));
        earlier.questions.forEach((q, i) => {
          const a = (earlier.answers[i] || '').trim();
          list.append(h('div', { class: 'qa' }, h('h3', { text: q }), h('p', { class: 'ans' + (a ? '' : ' blank'), text: a || 'Not answered' })));
        });
        const c2 = await showModal({ title: 'Your earlier reflection', body: list,
          actions: [{ label: 'Begin this reflection', value: 'begin', style: 'primary' }, { label: 'Close', value: null }] });
        if (c2 !== 'begin') return;
      }
    }
  }
  const entry = Journal.create(e);
  const res = flushSave(true);
  if (!res) toast('This reflection could not be saved to your device. You can still write, but please export your words before leaving.', 5000);
  go(`reflect/${entry.id}/0`);
}

/* ---------- 4. GUIDED REFLECTION ---------- */
let reflectState = null;
const wordCount = t => ((t || '').trim().match(/\S+/g) || []).length;
function renderReflect(view, args) {
  const entry = Journal.get(args[0]);
  if (!entry) {
    document.body.classList.remove('mode-reflect');
    view.append(header('Your Reflection', { back: 'journal' }), h('section', { class: 'screen' }, h('h1', { class: 'page-title', text: 'Reflection not found' }),
      h('p', { class: 'page-sub', text: 'This reflection does not exist on this device. It may have been deleted, or it was written on another device or browser.' }),
      h('button', { class: 'btn-gold block', onclick: () => go('journal'), text: 'Open my reflections' })));
    return;
  }
  let qi = Math.min(Math.max(parseInt(args[1], 10) || 0, 0), entry.questions.length - 1);
  autosave.entryId = entry.id;
  const total = entry.questions.length;

  const qText = h('h1', { class: 'q-text', id: 'qText', tabindex: '-1' });
  const bar = h('i');
  const countN = h('span', { class: 'n' });
  const dots = h('div', { class: 'dots', role: 'group', 'aria-label': 'Jump to question' });
  const ta = h('textarea', { class: 'answer', id: 'answer', 'aria-labelledby': 'qText', placeholder: 'Write your reflection…', autocomplete: 'off', autocapitalize: 'sentences', spellcheck: 'true' });
  const status = h('span', { class: 'save-status', id: 'saveStatus', 'aria-live': 'polite' });
  const words = h('span', { class: 'wc' });
  const wrap = h('div', { class: 'answer-wrap' }, ta, h('div', { class: 'answer-foot' }, status, words));
  const prevBtn = h('button', { class: 'btn-round', 'aria-label': 'Previous question', html: ICONS.arrowL, onclick: () => moveTo(qi - 1) });
  const nextBtn = h('button', { class: 'btn-gold', onclick: () => (qi < total - 1 ? moveTo(qi + 1) : finish()) });

  const shell = h('div', { class: 'reflect-shell' },
    header('Your Reflection', { back: saveAndClose, backLabel: 'Save and close' }),
    h('div', { class: 'reflect-body' },
      h('div', { class: 'r-moon' }, moonImg(entry.eventType),
        h('div', null, h('div', { class: 'rm-kind', text: typeLabel(entry.eventType) }), h('div', { class: 'rm-date', text: fmtDate(new Date(entry.eventDate)) }),
          h('div', { class: 'rm-place', text: placementLine(skyPositions(entry.eventId)) }))),
      h('div', { class: 'r-progress', role: 'presentation' }, bar),
      h('div', { class: 'r-count' }, countN, dots),
      qText,
      entry.interpretation && entry.interpretation.isDemo ? h('p', { class: 'tiny', style: 'margin:-.6rem 0 .6rem', text: 'Demonstration question' }) : null,
      wrap,
      h('div', { class: 'hint glass' }, ci('bulb', true), h('p', { text: 'Allow yourself to be honest. There are no right or wrong answers. This is your personal space.' }))),
    h('div', { class: 'reflect-foot' }, prevBtn, nextBtn));
  view.append(shell);

  function paint(animate) {
    const apply = () => {
      countN.textContent = `${qi + 1} / ${total}`;
      countN.setAttribute('aria-label', `Question ${qi + 1} of ${total}`);
      bar.style.width = ((qi + 1) / total * 100) + '%';
      qText.textContent = entry.questions[qi];
      ta.value = entry.answers[qi] || '';
      dots.innerHTML = '';
      entry.questions.forEach((_, i) => {
        const d = h('button', { class: 'dot' + (i === qi ? ' current' : '') + ((entry.answers[i] || '').trim() ? ' answered' : ''),
          'aria-label': `Question ${i + 1}${(entry.answers[i] || '').trim() ? ', answered' : ''}`, onclick: () => moveTo(i) });
        if (i === qi) d.setAttribute('aria-current', 'step');
        dots.append(d);
      });
      prevBtn.disabled = qi === 0;
      nextBtn.innerHTML = `<span>${qi === total - 1 ? 'Finish' : 'Next'}</span>` + ICONS.arrowR;
      nextBtn.setAttribute('aria-label', qi === total - 1 ? 'Finish reflection' : ((ta.value || '').trim() ? 'Next question' : 'Skip to next question'));
      updateWords();
      qText.classList.remove('swap-out'); wrap.classList.remove('swap-out');
    };
    if (animate && !motionReduced()) { qText.classList.add('swap-out'); wrap.classList.add('swap-out'); setTimeout(apply, 200); }
    else apply();
  }
  function updateWords() { const n = wordCount(ta.value); words.textContent = n === 1 ? '1 word' : n + ' words'; }
  function moveTo(i) {
    if (i < 0 || i >= total || i === qi) return;
    flushSave();
    qi = i;
    entry.currentQ = qi;
    autosave.dirty = true; flushSave();
    history.replaceState(null, '', `#reflect/${entry.id}/${qi}`);
    paint(true);
    shell.querySelector('.reflect-body').scrollTop = 0;
  }
  function finish() {
    entry.completed = true;
    entry.currentQ = 0;
    entry.updatedAt = new Date().toISOString();
    autosave.dirty = true;
    const ok = flushSave();
    go(`complete/${entry.id}/${ok ? 'saved' : 'unsaved'}`, { replace: true });
  }
  function saveAndClose() {
    const ok = flushSave();
    if (ok) toast('Your reflection is saved. Return whenever you like.');
    go('journal', { replace: true });
  }
  ta.addEventListener('input', () => {
    entry.answers[qi] = ta.value;
    entry.updatedAt = new Date().toISOString();
    scheduleSave();
    updateWords();
    nextBtn.setAttribute('aria-label', qi === total - 1 ? 'Finish reflection' : ((ta.value || '').trim() ? 'Next question' : 'Skip to next question'));
    const d = dots.children[qi]; if (d) d.classList.toggle('answered', !!ta.value.trim());
  });
  ta.addEventListener('blur', () => flushSave());
  ta.addEventListener('focus', () => setTimeout(() => ta.scrollIntoView({ block: 'nearest' }), 300));

  reflectState = { entry };
  setupViewport();
  paint(false);
  const hasText = entry.answers.some(a => (a || '').trim());
  setStatus(hasText ? 'restored' : 'idle', entry.updatedAt);
  setTimeout(() => qText.focus({ preventScroll: true }), 50);
}
function teardownReflect() { reflectState = null; autosave.entryId = null; }

/* Keep the writing area and controls above the iPhone keyboard. */
let vvBound = false;
function setupViewport() {
  const update = () => {
    const vv = window.visualViewport;
    const hgt = vv ? vv.height : window.innerHeight;
    const top = vv ? vv.offsetTop : 0;
    document.documentElement.style.setProperty('--vv-h', hgt + 'px');
    document.documentElement.style.setProperty('--vv-top', top + 'px');
    document.body.classList.toggle('kb-open', !!vv && window.innerHeight - vv.height > 140);
  };
  update();
  if (!vvBound) {
    vvBound = true;
    if (window.visualViewport) { visualViewport.addEventListener('resize', update); visualViewport.addEventListener('scroll', update); }
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', () => setTimeout(update, 300));
  }
}

/* ---------- 5. REFLECTION COMPLETE ---------- */
function crescentArt() {
  return `<svg class="crescent" viewBox="0 0 150 130" aria-hidden="true">
    <defs><radialGradient id="cg" cx="40%" cy="60%" r="70%"><stop offset="0" stop-color="#FBE2AF"/><stop offset="1" stop-color="#E2A956"/></radialGradient></defs>
    <circle cx="75" cy="65" r="44" fill="none" stroke="rgba(231,185,110,.35)" stroke-width=".8"/>
    <path d="M104 86A40 40 0 1 1 63 27a32 32 0 0 0 41 59z" fill="url(#cg)" style="filter:drop-shadow(0 0 12px rgba(246,214,160,.45))"/>
    <g fill="#F4D59C"><path class="tw" d="M22 54l1.4 4 4 1.4-4 1.4-1.4 4-1.4-4-4-1.4 4-1.4z"/><path class="tw" style="animation-delay:1.2s" d="M128 30l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"/>
    <path class="tw" style="animation-delay:2.1s" d="M132 92l1.2 3.4 3.4 1.2-3.4 1.2-1.2 3.4-1.2-3.4-3.4-1.2 3.4-1.2z"/><path class="tw" style="animation-delay:.6s" d="M34 104l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z"/>
    <circle cx="44" cy="22" r="1.2"/><circle cx="112" cy="116" r="1"/><circle cx="16" cy="88" r=".9"/></g></svg>`;
}
const releaseRead = new Set();
function renderComplete(view, args) {
  const entry = Journal.get(args[0]);
  if (!entry) { go('journal', { replace: true }); return; }
  view.append(header('Reflection Complete', { back: 'moon' }));
  const s = h('section', { class: 'screen complete fade-in' });
  const stored = Journal.isStoredAsShown(entry);
  s.insertAdjacentHTML('beforeend', crescentArt());
  s.append(h('h1', null, 'You’ve completed', h('br'), `your ${typeLabel(entry.eventType)} reflection`));
  s.append(h('p', { class: 'thanks', text: 'Thank you for taking this time for yourself.' }));
  if (!stored) s.append(h('div', { class: 'notice warn', style: 'text-align:left;margin-bottom:1rem', text: 'We could not confirm that this reflection was saved to your device storage. Please export a backup from Settings before closing the app.' }));

  const tick = done => { const sp = h('span', { html: done ? ICONS.check : ICONS.chev }); sp.firstChild.classList.add('s-ck'); if (!done) sp.firstChild.classList.add('todo'); return sp.firstChild; };
  const step = (icon, text, done, onclick, label) => {
    const b = h('button', { class: 'step', onclick, 'aria-label': label });
    const ic = h('span', { html: ICONS[icon] }); ic.firstChild.classList.add('s-ic');
    b.append(ic.firstChild, h('span', { class: 's-tx', text }), tick(done));
    return b;
  };
  const answered = Journal.answeredCount(entry);
  const steps = h('div', { class: 'steps glass' }, h('h2', { text: 'Your next steps' }),
    step('bookmark', stored ? `Saved to your journal · ${answered} of ${entry.questions.length} answered` : 'Save your reflections to your journal', stored, () => go('journal'), 'View my reflections'),
    step('leaf', 'Read your release statement', releaseRead.has(entry.id), async () => {
      await showModal({ title: 'My release statement', body: [entry.interpretation.release, entry.interpretation.isDemo ? '(Demonstration statement)' : ''], actions: [{ label: 'Close', value: null }] });
      releaseRead.add(entry.id); render();
    }, 'Read my release statement'),
    step('sparkle', 'Explore what to let in', false, () => go('guide/in'), 'Explore what to let in'));
  s.append(steps);
  s.append(h('button', { class: 'btn-gold block', style: 'max-width:340px;margin:0 auto', onclick: () => go('moon'), html: '<span>Back to This Moon</span>' + ICONS.arrowR }));
  s.append(h('div', { style: 'margin-top:.6rem' }, h('button', { class: 'text-link', onclick: () => go('journal'), text: 'View my reflections' })));
  view.append(s);
}

/* ---------- ENTRY DETAIL ---------- */
function renderEntry(view, args) {
  const entry = Journal.get(args[0]);
  view.append(header('Your Reflection', { back: 'journal' }));
  const s = h('section', { class: 'screen fade-in' });
  if (!entry) {
    s.append(h('h1', { class: 'page-title', text: 'Reflection not found' }), h('p', { class: 'page-sub', text: 'This reflection is not stored on this device.' }),
      h('button', { class: 'btn-gold block', onclick: () => go('journal'), text: 'Back to my reflections' }));
    view.append(s); return;
  }
  s.append(h('div', { class: 'r-moon' }, moonImg(entry.eventType),
    h('div', null, h('h1', { class: 'rm-kind', text: typeLabel(entry.eventType) }), h('div', { class: 'rm-date', text: fmtDate(new Date(entry.eventDate)) }),
      h('div', { class: 'rm-place', text: placementLine(skyPositions(entry.eventId)) }),
      h('div', { class: 'tiny', text: `Last edited ${fmtShort(new Date(entry.updatedAt))}` }))));
  s.append(h('div', { style: 'display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:1rem' },
    h('span', { class: 'badge' + (entry.completed ? ' ok' : ''), text: entry.completed ? 'Complete' : 'In progress' }),
    entry.interpretation.isDemo ? h('span', { class: 'badge demo', text: 'Demo guidance' }) : null));
  if (entry.interpretation.theme) s.append(h('p', { class: 'serif-lead', style: 'margin-bottom:1rem', text: entry.interpretation.theme }));
  const qaCard = h('div', { class: 'glass card' });
  entry.questions.forEach((q, i) => {
    const a = (entry.answers[i] || '').trim();
    qaCard.append(h('div', { class: 'qa' }, h('h3', { text: q }), h('p', { class: 'ans' + (a ? '' : ' blank'), text: a ? entry.answers[i] : 'Not answered yet' })));
  });
  s.append(qaCard);
  if (entry.interpretation.release) s.append(h('div', { class: 'lesson glass' }, ci('leaf', true), h('div', null, h('div', { class: 'lesson-kind', text: 'Release statement' }), h('p', { class: 'l-text statement', text: entry.interpretation.release }))));
  if (entry.interpretation.invitation) s.append(h('div', { class: 'lesson glass' }, ci('sparkle', true), h('div', null, h('div', { class: 'lesson-kind', text: 'Your invitation' }), h('p', { class: 'l-text statement', text: entry.interpretation.invitation }))));
  s.append(h('div', { class: 'stack', style: 'margin:1rem 0' },
    h('button', { class: 'btn-gold block', onclick: () => go(`reflect/${entry.id}/0`), html: '<span>Edit this reflection</span>' + ICONS.arrowR }),
    h('button', { class: 'btn-line danger block', onclick: () => confirmDelete(entry), text: 'Delete this reflection' })));
  s.append(h('div', { class: 'spacer-art' }));
  view.append(s);
}
async function confirmDelete(entry) {
  const v = await showModal({ title: 'Delete this reflection?', body: [`Your ${typeLabel(entry.eventType)} reflection from ${fmtDate(new Date(entry.eventDate))} will be permanently removed from this device.`, 'This cannot be undone unless you have exported a backup.'],
    actions: [{ label: 'Delete reflection', value: 'delete', style: 'danger' }, { label: 'Keep it', value: null }] });
  if (v !== 'delete') return;
  if (Journal.remove(entry.id)) { toast('Reflection deleted.'); go('journal', { replace: true }); }
  else toast('The reflection could not be deleted because device storage did not respond. Nothing was changed.', 5000);
}

/* ---------- 7. DISCOVER SBA ---------- */
function renderDiscover(view) {
  view.append(header('Discover SBA'));
  const s = h('section', { class: 'screen fade-in' });
  s.append(h('div', { class: 'disc-art', role: 'img', 'aria-label': 'Spiral galaxy artwork' }));
  s.append(h('h1', { class: 'disc-title', text: 'A Greater Perspective' }));
  s.append(h('p', { class: 'disc-kicker', text: 'THE SKY · THE SYSTEM · YOU' }));
  s.append(h('p', { class: 'disc-intro', text: 'Soul Blueprint Astrology is a Moon-primary system based on the real astronomical constellations. It offers a different perspective on time, cycles and your unique place within the universe.' }));
  const row = (icon, title, paras) => {
    const d = h('details', { class: 'd-row glass' });
    const sm = h('summary', null, ci(icon, true), h('span', { class: 'd-label', text: title }), chev());
    d.append(sm, h('div', { class: 'd-body' }, paras.map(p => h('p', { text: p }))));
    return d;
  };
  s.append(
    row('star4', 'The Moon-primary system', ['Where much of popular astrology begins with the Sun, Soul Blueprint Astrology places the Moon at the centre of its approach to timing and reflection.', 'The full description of SBA’s lunar method will be added here by Soul Blueprint Astrology.']),
    row('constellation', 'The 13 constellations', ['Astronomically, the Sun’s apparent yearly path across the sky passes through thirteen constellations — the familiar twelve plus Ophiuchus.', 'Moon Reflection shows the Sun and Moon in their true-sky constellations, using the official astronomical boundaries — not the tropical zodiac. How SBA interprets each constellation will be explained here once the SBA material is integrated.']),
    row('person', 'Your personal blueprint', ['In future versions you may be able to add your birth information and explore a personal Soul Blueprint.', 'Nothing personal is calculated in this version, and no birth data is requested or stored.']));
  s.append(worldRow());
  s.append(h('div', { class: 'spacer-art' }));
  view.append(s);
}
function worldRow() {
  const live = SBA_WORLD.isConfigured();
  const b = h(live ? 'a' : 'button', live ? { class: 'world-row glass strong', href: SBA_WORLD.url(), target: '_blank', rel: 'noopener noreferrer' } : { class: 'world-row glass strong', onclick: openWorld });
  if (!live) b.append(h('span', { class: 'soon-tag', text: 'COMING SOON' }));
  b.append(ci('globe', true), h('div', { style: 'flex:1' }, h('div', { class: 'w-title', text: 'Enter the SBA World' }), h('div', { class: 'w-sub', text: 'Explore more on our website.' })), chev());
  return b;
}
function renderWorld(view) {
  view.append(header('Enter the SBA World', { back: 'sba' }));
  const s = h('section', { class: 'screen fade-in' });
  s.append(h('h1', { class: 'page-title', text: 'Your reflection is just the beginning.' }), worldRow());
  if (!SBA_WORLD.isConfigured()) s.append(h('p', { class: 'page-sub', style: 'margin-top:1rem', text: 'The Soul Blueprint Astrology website is being prepared. This card will open it as soon as it is live.' }));
  view.append(s);
}

/* ---------- NOTIFICATIONS / PRIVACY / ABOUT ---------- */
function renderNotifications(view) {
  view.append(header('Notifications'));
  const s = h('section', { class: 'screen fade-in' });
  s.append(h('h1', { class: 'page-title', text: 'Moon reminders' }));
  s.append(h('div', { class: 'notice', style: 'margin-bottom:1rem' }, h('strong', { text: 'Not available yet. ' }),
    'This version runs as a web page and cannot reliably send scheduled reminders. Reminders are planned for the future iPhone app. No reminders are currently set.'));
  const card = h('div', { class: 'glass card' }, h('h3', { text: 'Planned reminders' }));
  [['New Moon approaching', 'A gentle note before each New Moon.'], ['Full Moon approaching', 'A gentle note before each Full Moon.'],
   ['Reflection invitation', 'An optional invitation to sit with this Moon’s questions.'], ['Revisit earlier reflections', 'An optional reminder to look back at a previous Moon.']]
    .forEach(([t, d]) => card.append(h('div', { class: 'planned' }, ci('bell', true), h('div', null, h('div', { text: t }), h('p', { class: 'small muted', text: d }), h('span', { class: 'tiny', text: 'Planned — not active' })))));
  s.append(card, h('div', { class: 'spacer-art' }));
  view.append(s);
}
function renderPrivacy(view) {
  view.append(header('Privacy'));
  const s = h('section', { class: 'screen fade-in' });
  s.append(h('h1', { class: 'page-title', text: 'Your private space' }));
  s.append(h('p', { class: 'page-sub', text: 'Your reflections are personal. Here is exactly how this version handles them.' }));
  const item = (t, ps) => h('div', { class: 'glass card' }, h('h3', { text: t }), ps.map(p => h('p', { class: 'muted small', text: p })));
  s.append(
    item('Stored only on this device', ['Everything you write is saved in this browser’s local storage on this device. It is not sent to Soul Blueprint Astrology, to any server, or to any other service.', 'There is no account, no login and no analytics in this app.']),
    item('Not permanent, not synced', ['Browser storage is not a permanent archive. Reflections can be lost if you clear browser or website data, use private browsing, remove the app, or if the browser frees up space. On iPhone, Safari may remove data for sites you haven’t visited for a while.', 'Reflections do not sync between devices or browsers.']),
    item('Keep your own backup', ['You can export all of your reflections as a backup file and import it again later. Backup files are not encrypted — store them somewhere private.']),
    item('Deleting your data', ['You can delete individual reflections, or everything at once from Settings. Deletion always asks you to confirm first.']));
  s.append(h('button', { class: 'btn-line block', onclick: () => go('settings'), text: 'Open backup & data settings' }), h('div', { class: 'spacer-art' }));
  view.append(s);
}
function renderAbout(view) {
  view.append(header('About'));
  const s = h('section', { class: 'screen fade-in' });
  s.append(h('div', { style: 'text-align:center;margin:.5rem 0 1rem' }, moonImg('full', '', 'Moon')));
  s.querySelector('.moon-img').style.cssText = 'width:110px;margin:0 auto';
  s.append(h('h1', { class: 'page-title', text: 'Moon Reflection' }), h('p', { class: 'page-sub', text: `Version ${CONFIG.VERSION} · Soul Blueprint Astrology` }));
  s.append(h('div', { class: 'glass card' }, h('h3', { text: 'Your personal space beneath the stars' }),
    h('p', { class: 'muted small', text: 'Moon Reflection offers calm, guided reflection at each New Moon and Full Moon, with a private journal kept on your device.' }),
    h('p', { class: 'muted small', text: 'Astrological guidance is offered as symbolic reflection — not as prediction or a scientifically proven psychological effect.' })));
  s.append(h('div', { class: 'glass card' }, h('h3', { text: 'How dates are calculated' }),
    h('p', { class: 'muted small', text: 'New and Full Moon times are calculated on your device using the Meeus lunar-phase algorithm (typically within 1–2 minutes), shown in your time zone (' + TIME_ZONE + '). Sun and Moon placements use the true-sky astronomical constellations (IAU boundaries), computed with ' + SKY_SYSTEM.source + ', for ' + SKY_SYSTEM.coverage + '. Placements that could not be verified show “' + PENDING_TEXT + '”.' }),
    h('p', { class: 'muted small', text: 'Guidance: ' + (Object.keys(SBA_INTERPRETATIONS).length ? 'SBA interpretations where available, demonstration content elsewhere.' : 'demonstration content until SBA interpretations are added.') })));
  s.append(h('div', { class: 'spacer-art' }));
  view.append(s);
}

/* =====================================================================
   5. JOURNAL STATE  (unchanged from v1.0)
   ===================================================================== */
const storageState = { available: false, recoveredUnreadable: false };
let journal = { schema: JOURNAL_SCHEMA, app: 'moon-reflection', entries: {} };

function testStorage() {
  try { const k = 'sba.moonReflection.__test'; localStorage.setItem(k, '1'); const ok = localStorage.getItem(k) === '1'; localStorage.removeItem(k); return ok; }
  catch (e) { return false; }
}
function sanitizeEntry(raw) {
  if (!raw || typeof raw !== 'object' || typeof raw.id !== 'string' || !raw.id) return null;
  const str = (v, d = '') => (typeof v === 'string' ? v : d);
  const questions = Array.isArray(raw.questions) ? raw.questions.filter(q => typeof q === 'string').slice(0, 12) : [];
  if (!questions.length) return null;
  const answers = questions.map((_, i) => (Array.isArray(raw.answers) && typeof raw.answers[i] === 'string') ? raw.answers[i] : '');
  const validDate = v => (typeof v === 'string' && !isNaN(new Date(v).getTime())) ? v : null;
  const ip = raw.interpretation && typeof raw.interpretation === 'object' ? raw.interpretation : {};
  const now = new Date().toISOString();
  return {
    id: raw.id,
    eventId: str(raw.eventId, 'unknown-event'),
    eventType: raw.eventType === 'new' ? 'new' : 'full',
    eventDate: validDate(raw.eventDate) || validDate(raw.createdAt) || now,
    interpretation: { theme: str(ip.theme), release: str(ip.release), invitation: str(ip.invitation), system: str(ip.system), isDemo: ip.isDemo !== false },
    questions, answers,
    currentQ: Number.isInteger(raw.currentQ) ? Math.min(Math.max(raw.currentQ, 0), questions.length - 1) : 0,
    completed: raw.completed === true,
    createdAt: validDate(raw.createdAt) || now,
    updatedAt: validDate(raw.updatedAt) || validDate(raw.createdAt) || now
  };
}
function migrateJournal(data) {
  const out = { schema: JOURNAL_SCHEMA, app: 'moon-reflection', entries: {} };
  const src = data.entries || {};
  const list = Array.isArray(src) ? src : Object.values(src);
  for (const r of list) { const e = sanitizeEntry(r); if (e) out.entries[e.id] = e; }
  return out;
}
function loadJournal() {
  storageState.available = testStorage();
  if (!storageState.available) return;
  let raw = null;
  try { raw = localStorage.getItem(STORAGE_KEYS.journal); } catch (e) { storageState.available = false; return; }
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object' || !data.entries) throw new Error('Unexpected format');
    journal = migrateJournal(data);
  } catch (err) {
    try { localStorage.setItem(STORAGE_KEYS.unreadablePrefix + Date.now(), raw); storageState.recoveredUnreadable = true; } catch (e) {}
    console.warn('Journal data could not be parsed; a copy was preserved.', err);
  }
}
function persistJournal() {
  if (!storageState.available) return false;
  try {
    const s = JSON.stringify(journal);
    localStorage.setItem(STORAGE_KEYS.journal, s);
    return localStorage.getItem(STORAGE_KEYS.journal) === s;
  } catch (e) { console.warn('Save failed', e); return false; }
}

const Journal = {
  all() { return Object.values(journal.entries).sort((a, b) => (b.eventDate.localeCompare(a.eventDate)) || b.updatedAt.localeCompare(a.updatedAt)); },
  get(id) { return journal.entries[id] || null; },
  forEvent(eventId) { return Object.values(journal.entries).filter(e => e.eventId === eventId).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)); },
  answeredCount(e) { return e.answers.filter(a => (a || '').trim()).length; },
  create(ev) {
    const now = new Date().toISOString();
    const entry = {
      id: uid(), eventId: ev.id, eventType: ev.type, eventDate: ev.dateTime,
      interpretation: { theme: ev.theme, release: ev.release, invitation: ev.invitation, system: ev.interpretationSystem, isDemo: ev.isDemo },
      questions: ev.questions.slice(), answers: ev.questions.map(() => ''),
      currentQ: 0, completed: false, createdAt: now, updatedAt: now
    };
    journal.entries[entry.id] = entry;
    autosave.dirty = true;
    return entry;
  },
  remove(id) {
    const backup = journal.entries[id];
    delete journal.entries[id];
    if (persistJournal()) return true;
    journal.entries[id] = backup;
    return false;
  },
  isStoredAsShown(entry) {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.journal) || '{}');
      const st = data.entries && data.entries[entry.id];
      return !!st && JSON.stringify(st.answers) === JSON.stringify(entry.answers);
    } catch (e) { return false; }
  }
};

/* =====================================================================
   6. AUTOSAVING  (unchanged from v1.0)
   ===================================================================== */
const autosave = { timer: null, dirty: false, entryId: null, lastSavedAt: null, lastOK: true };
function scheduleSave() {
  autosave.dirty = true;
  setStatus('saving');
  clearTimeout(autosave.timer);
  autosave.timer = setTimeout(() => flushSave(), CONFIG.AUTOSAVE_DELAY_MS);
}
function flushSave(force) {
  clearTimeout(autosave.timer); autosave.timer = null;
  if (!autosave.dirty && !force) return autosave.lastOK;
  const ok = persistJournal();
  autosave.lastOK = ok;
  if (ok) { autosave.dirty = false; autosave.lastSavedAt = new Date(); setStatus('saved'); }
  else setStatus('error');
  return ok;
}
function setStatus(state, when) {
  const el = document.getElementById('saveStatus');
  if (!el) return;
  el.className = 'save-status';
  if (state === 'saving') { el.textContent = 'Saving…'; }
  else if (state === 'saved') { el.classList.add('saved'); el.innerHTML = ICONS.check; el.append(document.createTextNode(' Saved · ' + fmtTime(autosave.lastSavedAt || new Date()))); }
  else if (state === 'restored') { el.classList.add('saved'); el.innerHTML = ICONS.check; el.append(document.createTextNode(' Saved · ' + fmtShort(new Date(when)))); }
  else if (state === 'error') { el.classList.add('error'); el.textContent = storageState.available ? 'Not saved — storage refused. Export a backup.' : 'Not saved — storage unavailable.'; }
  else { el.textContent = 'Saves automatically'; }
}
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flushSave(); });
window.addEventListener('pagehide', () => flushSave());
window.addEventListener('beforeunload', () => flushSave());

/* =====================================================================
   7. ARCHIVE AND FILTERING
   ===================================================================== */
let journalFilter = 'all';
function renderJournal(view) {
  view.append(header('', { back: 'home' }));
  view.querySelector('.hdr-title').remove();
  view.querySelector('.hdr').insertBefore(h('div'), view.querySelector('.star-btn'));
  const s = h('section', { class: 'screen fade-in' });
  s.append(h('div', { class: 'j-head', html: ICONS.bookOpen }));
  s.querySelector('.j-head').append(h('h1', { text: 'My Reflections' }));
  const banner = storageBanner(); if (banner) s.append(banner);
  const filters = [['all', 'All'], ['full', 'Full Moon'], ['new', 'New Moon']];
  const tabs = h('div', { class: 'pills', role: 'tablist', 'aria-label': 'Filter by lunar phase' });
  const listBox = h('div', { id: 'entryList', role: 'tabpanel' });
  filters.forEach(([key, label]) => tabs.append(h('button', { class: 'pill', role: 'tab', 'aria-selected': String(journalFilter === key),
    onclick: () => { journalFilter = key; tabs.querySelectorAll('.pill').forEach((t, i) => t.setAttribute('aria-selected', String(filters[i][0] === key))); paintList(); }, text: label })));
  s.append(tabs, listBox, h('div', { class: 'spacer-art' }));

  function paintList() {
    listBox.innerHTML = '';
    const all = Journal.all();
    const list = all.filter(e => journalFilter === 'all' || e.eventType === journalFilter);
    if (!list.length) {
      const empty = h('div', { class: 'empty glass', style: 'border-radius:20px' }, moonImg(journalFilter === 'new' ? 'new' : 'full'));
      if (!all.length) {
        empty.append(h('h2', { style: 'font-size:1.5rem;margin-bottom:.4rem', text: 'Your journal is waiting' }),
          h('p', { class: 'muted small', style: 'margin-bottom:1.2rem', text: 'When you reflect with a Moon, your words will gather here — ready to revisit whenever you wish.' }),
          h('button', { class: 'btn-gold', onclick: () => go('moon'), html: '<span>Begin with This Moon</span>' + ICONS.arrowR }));
      } else empty.append(h('p', { class: 'muted', text: `No ${journalFilter === 'full' ? 'Full Moon' : 'New Moon'} reflections yet.` }));
      listBox.append(empty);
      return;
    }
    for (const e of list) {
      const d = new Date(e.eventDate);
      const n = Journal.answeredCount(e);
      listBox.append(h('button', { class: 'e-row glass entry-card', onclick: () => go('entry/' + e.id) },
        moonImg(e.eventType),
        h('div', { class: 'e-main' },
          h('div', { class: 'e-title', text: typeLabel(e.eventType) + (skyPositions(e.eventId).moon.verified ? ' in ' + skyPositions(e.eventId).moon.constellation : '') }),
          h('div', { class: 'e-date', text: fmtDate(d) }),
          !e.completed ? h('div', { class: 'e-state', text: `In progress · ${n} of ${e.questions.length}` }) : null),
        chev()));
    }
  }
  paintList();
  view.append(s);
}

/* =====================================================================
   8. EXPORT AND IMPORT  (unchanged from v1.0)
   ===================================================================== */
function exportJournal() {
  flushSave();
  const entries = Object.values(journal.entries);
  const payload = { format: BACKUP_FORMAT, schema: JOURNAL_SCHEMA, app: CONFIG.APP_NAME, appVersion: CONFIG.VERSION, exportedAt: new Date().toISOString(), entryCount: entries.length, entries };
  const name = `moon-reflection-backup-${new Date().toISOString().slice(0, 10)}.json`;
  try {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = h('a', { href: url, download: name, style: 'display:none' });
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    toast(`Backup created: ${entries.length} reflection${entries.length === 1 ? '' : 's'}. Check your Downloads or Files app.`, 4500);
  } catch (e) { toast('The backup file could not be created in this browser.', 4500); }
}
function pickImportFile() {
  const input = h('input', { type: 'file', accept: 'application/json,.json', style: 'display:none' });
  input.addEventListener('change', () => { const f = input.files && input.files[0]; input.remove(); if (f) readImport(f); });
  document.body.append(input); input.click();
}
function readImport(file) {
  const reader = new FileReader();
  reader.onerror = () => showModal({ title: 'Import failed', body: 'The file could not be read.' });
  reader.onload = async () => {
    let data;
    try { data = JSON.parse(String(reader.result)); } catch (e) { return showModal({ title: 'Not a valid backup', body: 'This file is not a Moon Reflection backup (it is not valid JSON). Nothing was changed.' }); }
    if (!data || data.format !== BACKUP_FORMAT || !Array.isArray(data.entries)) return showModal({ title: 'Not a valid backup', body: 'This file is not a compatible Moon Reflection backup. Nothing was changed.' });
    if (typeof data.schema === 'number' && data.schema > JOURNAL_SCHEMA) return showModal({ title: 'Backup from a newer version', body: 'This backup was created by a newer version of Moon Reflection and cannot be imported here. Nothing was changed.' });
    const incoming = data.entries.map(sanitizeEntry).filter(Boolean);
    const existing = Object.keys(journal.entries).length;
    const overlap = incoming.filter(e => journal.entries[e.id]).length;
    const choice = await showModal({
      title: 'Import backup',
      body: [`This backup contains ${incoming.length} reflection${incoming.length === 1 ? '' : 's'}${data.exportedAt ? ' (exported ' + fmtShort(new Date(data.exportedAt)) + ')' : ''}. You currently have ${existing} on this device.`,
        'Add to my journal: keeps everything you have and adds the backup’s reflections.' + (overlap ? ` ${overlap} reflection${overlap === 1 ? ' exists' : 's exist'} in both — for these, the more recently edited version is kept, which may replace your current text.` : ''),
        'Replace my journal: removes all reflections currently on this device and uses only the backup.'],
      actions: [{ label: 'Add to my journal', value: 'merge', style: 'primary' }, { label: 'Replace my journal', value: 'replace', style: 'danger' }, { label: 'Cancel', value: null }]
    });
    if (!choice) return;
    if (choice === 'replace' && existing > 0) {
      const sure = await showModal({ title: 'Replace all reflections?', body: [`All ${existing} reflection${existing === 1 ? '' : 's'} currently on this device will be replaced by the backup.`, 'A safety copy of your current journal is kept on this device before replacing.'],
        actions: [{ label: 'Yes, replace my journal', value: 'yes', style: 'danger' }, { label: 'Cancel', value: null }] });
      if (sure !== 'yes') return;
    }
    const before = JSON.stringify(journal);
    try { localStorage.setItem(STORAGE_KEYS.preImportBackup, before); } catch (e) {}
    if (choice === 'replace') { journal.entries = {}; incoming.forEach(e => { journal.entries[e.id] = e; }); }
    else incoming.forEach(e => { const cur = journal.entries[e.id]; if (!cur || e.updatedAt > cur.updatedAt) journal.entries[e.id] = e; });
    if (persistJournal()) { toast(`Import complete — ${Object.keys(journal.entries).length} reflections on this device.`, 4000); render(); }
    else { journal = JSON.parse(before); showModal({ title: 'Import not saved', body: 'Device storage did not accept the imported data, so your journal was left exactly as it was.' }); }
  };
  reader.readAsText(file);
}
async function deleteAllData() {
  const n = Object.keys(journal.entries).length;
  const v = await showModal({ title: 'Delete all journal data?', body: [`This permanently removes all ${n} reflection${n === 1 ? '' : 's'} from this device.`, 'Consider exporting a backup first. This cannot be undone.'],
    actions: [{ label: 'Export a backup first', value: 'export', style: 'primary' }, { label: 'Delete everything', value: 'delete', style: 'danger' }, { label: 'Cancel', value: null }] });
  if (v === 'export') { exportJournal(); return; }
  if (v !== 'delete') return;
  const v2 = await showModal({ title: 'Are you sure?', body: 'All reflections will be deleted from this device now.', actions: [{ label: 'Yes, delete all', value: 'yes', style: 'danger' }, { label: 'Cancel', value: null }] });
  if (v2 !== 'yes') return;
  const before = journal.entries;
  journal.entries = {};
  const ok = persistJournal();
  try { localStorage.removeItem(STORAGE_KEYS.preImportBackup); Object.keys(localStorage).filter(k => k.startsWith(STORAGE_KEYS.unreadablePrefix)).forEach(k => localStorage.removeItem(k)); } catch (e) {}
  if (ok) { storageState.recoveredUnreadable = false; toast('All journal data deleted from this device.'); render(); }
  else { journal.entries = before; toast('Deletion failed — device storage did not respond. Nothing was changed.', 5000); }
}

/* =====================================================================
   9. SETTINGS
   ===================================================================== */
let settings = { textSize: 'large', motion: 'system', revisitPrompts: true };
function loadSettings() {
  try { const s = JSON.parse(localStorage.getItem(STORAGE_KEYS.settings) || 'null'); if (s && typeof s === 'object') settings = Object.assign(settings, s); } catch (e) {}
  applySettings();
}
function saveSettings() { try { localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings)); return true; } catch (e) { return false; } }
function applySettings() {
  const root = document.documentElement;
  root.dataset.text = ['standard', 'large', 'xl'].includes(settings.textSize) ? settings.textSize : 'large';
  if (settings.motion === 'reduce') root.dataset.motion = 'reduce'; else delete root.dataset.motion;
}
function motionReduced() { return settings.motion === 'reduce' || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches); }
function renderSettings(view) {
  view.append(header('Settings'));
  const s = h('section', { class: 'screen fade-in' });
  s.append(h('h1', { class: 'sr-only', text: 'Settings' }));
  const banner = storageBanner(); if (banner) s.append(banner);
  const seg = (options, current, onPick, label) => {
    const g = h('div', { class: 'seg', role: 'group', 'aria-label': label });
    options.forEach(([v, l]) => g.append(h('button', { 'aria-pressed': String(current === v), text: l, onclick: () => { onPick(v); g.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-pressed', String(options[i][0] === v))); } })));
    return g;
  };
  s.append(h('div', { class: 'glass card' }, h('h3', { text: 'Reading' }),
    h('p', { class: 'small muted', style: 'margin-bottom:.6rem', text: 'Text size' }),
    seg([['standard', 'Standard'], ['large', 'Large'], ['xl', 'Extra large']], settings.textSize, v => { settings.textSize = v; applySettings(); saveSettings(); }, 'Text size'),
    h('p', { class: 'small muted', style: 'margin:1rem 0 .6rem', text: 'Motion' }),
    seg([['system', 'Follow device'], ['reduce', 'Always reduce']], settings.motion, v => { settings.motion = v; applySettings(); saveSettings(); }, 'Motion')));
  const sw = h('input', { type: 'checkbox', id: 'revisitSw', role: 'switch' });
  sw.checked = !!settings.revisitPrompts;
  sw.addEventListener('change', () => { settings.revisitPrompts = sw.checked; saveSettings(); toast(sw.checked ? 'Revisit invitations on.' : 'Revisit invitations off.'); });
  s.append(h('div', { class: 'glass card' }, h('h3', { text: 'Reflection' }),
    h('div', { class: 'switch-row' }, h('label', { for: 'revisitSw', class: 'small', text: 'Offer to revisit an earlier Moon before I begin' }), h('span', { class: 'switch' }, sw, h('span', { class: 'track' })))));
  const n = Object.keys(journal.entries).length;
  let bytes = 0; try { bytes = (localStorage.getItem(STORAGE_KEYS.journal) || '').length; } catch (e) {}
  const persistLine = h('p', { class: 'tiny', id: 'persistLine' });
  s.append(h('div', { class: 'glass card' }, h('h3', { text: 'Backup & data' }),
    h('p', { class: 'small muted', text: `${n} reflection${n === 1 ? '' : 's'} stored in this browser on this device (${(bytes / 1024).toFixed(1)} KB). Storage: ${storageState.available ? 'available' : 'unavailable'}.` }),
    h('p', { class: 'small muted', text: 'Browser storage can be cleared by you or by the browser, and it does not sync between devices. Export a backup regularly.' }),
    h('div', { class: 'stack', style: 'margin-top:1rem' },
      h('button', { class: 'btn-gold block', onclick: exportJournal, text: 'Export backup (JSON)' }),
      h('button', { class: 'btn-line block', onclick: pickImportFile, text: 'Import a backup' }),
      ('storage' in navigator && navigator.storage.persist) ? h('button', { class: 'btn-line block', onclick: requestPersist, text: 'Ask browser to keep my data' }) : null,
      persistLine,
      h('button', { class: 'btn-line danger block', onclick: deleteAllData, text: 'Delete all journal data' }))));
  s.append(h('div', { class: 'glass card' }, h('h3', { text: 'More' }),
    h('p', { class: 'small muted', text: 'SBA website: ' + (SBA_WORLD.isConfigured() ? 'connected' : 'Coming Soon (not yet configured)') }),
    h('div', { style: 'display:flex;gap:1rem;flex-wrap:wrap;margin-top:.4rem' },
      h('button', { class: 'text-link', onclick: () => go('about'), text: 'About' }),
      h('button', { class: 'text-link', onclick: () => go('privacy'), text: 'Privacy' }),
      h('button', { class: 'text-link', onclick: () => go('notifications'), text: 'Notifications' }))));
  s.append(h('div', { class: 'spacer-art' }));
  view.append(s);
  if (navigator.storage && navigator.storage.persisted) navigator.storage.persisted().then(p => { persistLine.textContent = p ? 'Your browser has agreed to keep this app’s data unless you clear it yourself.' : 'Your browser may clear this data when storage is low or after a period of inactivity.'; }).catch(() => {});
}
async function requestPersist() {
  try {
    const ok = await navigator.storage.persist();
    toast(ok ? 'Your browser agreed to keep this app’s data unless you clear it.' : 'Your browser did not grant this request. Regular backups are recommended.', 4500);
    const pl = $('#persistLine'); if (pl) pl.textContent = ok ? 'Your browser has agreed to keep this app’s data unless you clear it yourself.' : 'Your browser may clear this data when storage is low or after a period of inactivity.';
  } catch (e) { toast('This browser does not support that request.'); }
}

/* =====================================================================
   10. SBA WEBSITE CONFIGURATION  (URL lives in CONFIG.SBA_WEBSITE_URL)
   ===================================================================== */
const SBA_WORLD = {
  url() { return (CONFIG.SBA_WEBSITE_URL || '').trim(); },
  isConfigured() { return /^https:\/\/[^\s/$.?#].[^\s]*$/i.test(this.url()); }
};
function openWorld() {
  if (SBA_WORLD.isConfigured()) {
    const a = h('a', { href: SBA_WORLD.url(), target: '_blank', rel: 'noopener noreferrer', style: 'display:none' });
    document.body.append(a); a.click(); a.remove();
    return;
  }
  showModal({ title: 'Coming Soon', body: ['The Soul Blueprint Astrology website is being prepared.', 'When it is live, this is where your reflection will continue into the wider SBA world.'], actions: [{ label: 'Close', value: null }] });
}
function openContact() {
  const u = (CONFIG.CONTACT_URL || '').trim();
  if (/^(mailto:|https:\/\/)/i.test(u)) { const a = h('a', { href: u, target: '_blank', rel: 'noopener noreferrer', style: 'display:none' }); document.body.append(a); a.click(); a.remove(); return; }
  showModal({ title: 'Coming Soon', body: 'Contact details for Soul Blueprint Astrology will be added here.', actions: [{ label: 'Close', value: null }] });
}

/* =====================================================================
   BOOT
   ===================================================================== */
function boot() {
  loadJournal();
  loadSettings();
  $('#menuBack').addEventListener('click', () => closeMenu());
  $('#menuClose').addEventListener('click', () => closeMenu());
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.querySelectorAll('#tabbar button').forEach(b => b.addEventListener('click', () => go(b.dataset.route)));
  render();
}
boot();

/* =====================================================================
   OFFLINE SUPPORT — service worker (GitHub Pages / https only).
   It caches app files only. Journal data in localStorage is never touched.
   ===================================================================== */
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
  window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(err => console.warn('Offline support unavailable:', err)); });
}
