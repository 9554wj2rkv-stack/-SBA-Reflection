'use strict';
/* Moon Reflection — Soul Blueprint Astrology · Moon readings — meaning & guidance (add SBA readings here) */

/* =====================================================================
   2d. MOON READINGS — the meaning and guidance for each Moon
   ---------------------------------------------------------------------
   This is the ONLY place to add or edit readings. The astronomy (dates,
   constellations) is calculated separately and never changes here.

   Each reading is keyed by the Moon's event ID, shown under
   "Astronomical details" on every Moon, e.g. 'new-moon-2026-11-09'.

   status   'sba'  → an approved Soul Blueprint Astrology interpretation
            'demo' → a clearly labelled demonstration (never presented as SBA)
   placements  The constellations the reading was written for. If they do
            not match the verified true-sky placements of that Moon, the
            reading is NOT shown (it protects against pasting a reading
            onto the wrong event).

   TEMPLATE — copy, paste inside MOON_READINGS and fill in:

   'full-moon-2026-11-24': {
     status: 'sba',
     placements: { moon: 'Taurus', sun: 'Scorpius' },
     theme: 'One line that sums up this Moon.',
     meaning: {
       phase:    'What this Full Moon represents…',
       moon:     'Moon in Taurus — emotional and symbolic meaning…',
       sun:      'Sun in Scorpius — what it symbolises…',
       together: 'How the two placements interact…',
       forYou:   'The main life themes to consider…'
     },
     lookOut: [{ title: 'Short title.', text: 'One sentence.' }, …],
     letGo:   [{ title: '…', text: '…' }, …],
     letIn:   [{ title: '…', text: '…' }, …],
     lessons: { look: 'Optional closing line for "What to look out for".' },
     release:    'First-person release statement.',
     invitation: 'Present-tense, positive affirmation.',
     questions: ['Question 1?', 'Question 2?', 'Question 3?', 'Question 4?']
   },

   Use a blank line ("\n\n") inside a text to start a new paragraph.
   ===================================================================== */
const MOON_READINGS = {

  /* ---- DEMONSTRATION: New Moon 9 November 2026 · Moon in Libra · Sun in Libra
     Traditional-astrology symbolism of Libra, the Scales. NOT an SBA reading. */
  'new-moon-2026-11-09': {
    status: 'demo',
    label: 'Traditional astrology demonstration',
    note: 'This demonstration reading uses the traditional symbolism of Libra, the Scales. It is not an official Soul Blueprint Astrology interpretation. Conventional tropical astrology would place this New Moon in Scorpio.',
    placements: { moon: 'Libra', sun: 'Libra' },
    theme: 'A new beginning in balance — choosing a harmony that includes you.',
    meaning: {
      phase: 'A New Moon marks the start of the lunar cycle. The Moon passes between the Earth and the Sun with its sunlit side turned away from us, so the night sky goes dark.\n\nIn traditional astrology this quiet darkness symbolises a seed moment: a time to pause, listen inwards and plant an intention you would like to grow over the coming four weeks — before anything is visible.',
      moon: 'Traditionally, the Moon describes our emotional needs, our instincts and what helps us feel safe. Libra, the Scales, is the only figure of the classical zodiac that is an object rather than a living being — an image of weighing, fairness and equilibrium.\n\nRead symbolically, the Moon here speaks of a need for emotional balance and ease in our closest connections: feeling settled when relationships are fair, and unsettled when the scales tip too far one way. It can also describe a habit of smoothing things over — sensing what others need before naming what we need ourselves.',
      sun: 'The Sun traditionally represents conscious purpose, vitality and the direction in which we choose to grow. In the Scales, that purpose turns towards relationship, cooperation and considered judgement: weighing different needs and viewpoints before acting, and bringing fairness, courtesy and beauty into the way we live and decide.',
      together: 'At this New Moon the Sun and Moon stand together in the same constellation, so their symbolism speaks with one voice. What you feel (the Moon) and what you are consciously aiming for (the Sun) both point towards balance.\n\nTraditionally this is read as a clear moment to set an intention about relationships and harmony — with one important nuance: true balance includes you. The Scales ask not only “Is this fair to others?” but also “Is this fair to me?”',
      forYou: 'This is a gentle invitation to notice where your life feels in or out of balance — between giving and receiving, effort and rest, your own needs and the needs of the people around you.\n\nRather than trying to rebalance everything at once, choose one relationship, agreement or daily rhythm you would like to bring into better balance, and let your intention begin there. A decision you have been weighing for a long time may also deserve attention: a New Moon is a supportive symbolic moment to choose a direction, even before every detail is clear.'
    },
    lookOut: [
      { title: 'People-pleasing.', text: 'Keeping the peace by quietly setting aside what you need.' },
      { title: 'Endless weighing.', text: 'Delaying a decision while waiting for an option that pleases everyone.' },
      { title: 'Keeping score.', text: 'Measuring fairness so closely that generosity and trust begin to disappear.' },
      { title: 'Mirroring others.', text: 'Losing track of your own opinion by adapting to the people around you.' }
    ],
    letGo: [
      { title: 'The need for everyone’s approval.', text: 'Not every choice can satisfy everyone — and it does not have to.' },
      { title: 'One-sided arrangements.', text: 'Relationships or commitments where your effort is consistently unreturned.' },
      { title: 'Avoiding necessary conversations.', text: 'Silence that keeps the surface calm while tension grows underneath.' },
      { title: 'Waiting for perfect certainty.', text: 'The idea that you must know the ideal answer before you can begin.' }
    ],
    letIn: [
      { title: 'Fair agreements.', text: 'Relationships in which both people’s needs are spoken and respected.' },
      { title: 'Your own voice.', text: 'Saying what you want with kindness and clarity.' },
      { title: 'Beauty and harmony.', text: 'Small acts that bring calm and grace into your surroundings and your days.' },
      { title: 'Clear, kind decisions.', text: 'Choosing a direction and allowing it to unfold.' }
    ],
    lessons: { look: 'The lesson is to seek balance without disappearing inside it.' },
    release: 'I release the need to please everyone and the habit of placing myself last. I let go of a balance that only works for others.',
    invitation: 'I welcome relationships that are fair and kind. I honour my own needs as much as the needs of others, and I begin this cycle in harmony with myself.',
    questions: [
      'Where in my life does the balance between giving and receiving feel uneven?',
      'Which decision have I been weighing for too long, and what would help me choose?',
      'In which relationship would I like more honesty, fairness or ease?',
      'What intention for balance would I like to plant during this lunar cycle?'
    ]
  }

  /* Add official SBA readings below, e.g.
  ,'full-moon-2026-11-24': { status: 'sba', placements: { moon: 'Taurus', sun: 'Scorpius' }, … } */
};

/* Earlier versions used SBA_INTERPRETATIONS; entries placed there are still
   read and treated as status 'sba'. New readings belong in MOON_READINGS. */
const SBA_INTERPRETATIONS = {};

/* ---------------------------------------------------------------------
   PREVIEW content for Moons without a reading. Only general, labelled
   lunar-phase symbolism and the constellations' traditional names are
   used — no placement interpretation is invented.
   --------------------------------------------------------------------- */
const PHASE_MEANINGS = {
  new: 'A New Moon begins the lunar cycle. The Moon passes between the Earth and the Sun with its lit side turned away from us, and the night sky is dark. Traditionally it symbolises a seed moment — a time for quiet reflection, new intentions and choosing a direction before anything is visible.',
  full: 'A Full Moon is the peak of the lunar cycle. The Sun and Moon stand on opposite sides of the Earth and the Moon is fully lit. Traditionally it symbolises culmination and illumination — a time to notice what has grown, to evaluate honestly and to release what is no longer needed.'
};
const CONSTELLATION_FIGURES = { Aries: 'the Ram', Taurus: 'the Bull', Gemini: 'the Twins', Cancer: 'the Crab', Leo: 'the Lion', Virgo: 'the Maiden',
  Libra: 'the Scales', Scorpius: 'the Scorpion', Ophiuchus: 'the Serpent-Bearer', Sagittarius: 'the Archer', Capricornus: 'the Sea-Goat',
  Aquarius: 'the Water-Bearer', Pisces: 'the Fishes', Cetus: 'the Sea Monster', Orion: 'the Hunter', Auriga: 'the Charioteer', Sextans: 'the Sextant' };

const RELEASE_QUESTION_INDEX = 2; // the "ready to stop carrying" question

/* General reflection questions — used when a Moon has no reading yet.
   They are open prompts, not astrological guidance.
   (Full Moon questions are the examples from the original Moon Reflection brief.) */
const GENERAL_SYSTEM = 'General reflection questions — SBA guidance coming soon';
const GENERAL_QUESTIONS = {
  full: [
    'What am I forcing that would benefit from patience?',
    'Where am I putting other people’s needs ahead of my own?',
    'What am I ready to stop carrying?',
    'What one decision would bring me closer to the life I want?'
  ],
  new: [
    'What would I like to grow during this lunar cycle?',
    'What small step could I take this week?',
    'What am I ready to stop carrying into this new cycle?',
    'How do I want to feel when this cycle closes?'
  ]
};
