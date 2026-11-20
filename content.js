'use strict';
/* Moon Reflection — Soul Blueprint Astrology · Moon readings — meaning & guidance (add SBA readings here) */

/* =====================================================================
   2d. MOON READINGS — the meaning and guidance for each Moon
   ---------------------------------------------------------------------
   This is the ONLY place to add or edit readings. The astronomy (dates,
   constellations) is calculated separately and never changes here.

   Each reading is keyed by the Moon's event ID, shown under
   "Astronomical details" on every Moon, e.g. 'new-moon-2026-11-09'.

   Hand-written readings here take priority over the Interpretation Engine
   for that one event. Most Moons need nothing here: the engine builds
   their reading from the library (js/library.js).

   status   'sba'   → an approved Soul Blueprint Astrology interpretation
            'draft' → a draft awaiting review (always labelled as a draft)
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
     questions: ['Question 1?', 'Question 2?', 'Question 3?', 'Question 4?'],

     // Moon-guided reflection: one item per question (matched by its exact text).
     // Shown above the question while the user writes. Three short prompts each.
     reflection: [
       { question: 'Question 1?', focus: 'Awareness & recognition',
         guidance: 'Two or three sentences linking this Moon to the question.',
         starters: ['Prompt 1?', 'Prompt 2?', 'Prompt 3?'] },
       …one for each question
     ]
   },

   Suggested focus for the four questions —
   New Moon:  growth & new beginnings · intentions & practical steps ·
              what to release before starting · how you want to feel
   Full Moon: awareness & recognition · what has reached completion ·
              patterns or burdens to release · what to carry forward

   Use a blank line ("\n\n") inside a text to start a new paragraph.
   ===================================================================== */
const MOON_READINGS = {

  /* ---- DRAFT: New Moon 9 November 2026 · Moon in Libra · Sun in Libra
     Hand-written draft using the traditional symbolism of Libra, the Scales.
     A hand-written reading takes priority over the engine for its event. */
  'new-moon-2026-11-09': {
    status: 'draft',
    version: '2026-11-09 · hand-written draft',
    note: 'Hand-written draft reading using the traditional symbolism of Libra, the Scales. It is awaiting your review and is not yet an approved SBA interpretation. Conventional tropical astrology would place this New Moon in Scorpio.',
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
      'What would I like to grow in my relationships, and in my own sense of balance, during this cycle?',
      'What intention for balance will I set, and what is one practical step I can take this week?',
      'What imbalance — or habit of placing myself last — am I ready to release before this cycle begins?',
      'How do I want to feel in my relationships, and within myself, as this cycle unfolds?'
    ],
    reflection: [
      { question: 'What would I like to grow in my relationships, and in my own sense of balance, during this cycle?',
        focus: 'Growth & new beginnings',
        guidance: 'With the Moon and Sun together in the Scales, this New Moon traditionally turns beginnings towards relationship and balance. Consider what you would like to grow between you and others — and between the different parts of your own life.',
        starters: ['Which relationship would you love to feel easier or more mutual a month from now?', 'Where in your daily life would a little more balance make the biggest difference?', 'What new beginning would feel fair to both you and the people around you?'] },
      { question: 'What intention for balance will I set, and what is one practical step I can take this week?',
        focus: 'Intentions & practical steps',
        guidance: 'The Scales symbolise weighing and choosing. An intention for balance becomes real when it turns into one clear, kind decision you can act on in the days ahead.',
        starters: ['Which decision have you been weighing that one small step could move forward?', 'What would one fair agreement — with yourself or someone else — look like this week?', 'What could you schedule, say or simplify in the next few days?'] },
      { question: 'What imbalance — or habit of placing myself last — am I ready to release before this cycle begins?',
        focus: 'What to release before beginning',
        guidance: 'Traditionally, the shadow of the Scales is keeping the peace at your own expense. Before planting something new, notice where giving has quietly become one-sided.',
        starters: ['Where do you say yes to keep things smooth, even when it costs you?', 'Which arrangement feels uneven, and which part of it is yours to change?', 'Which conversation have you been avoiding for the sake of harmony?'] },
      { question: 'How do I want to feel in my relationships, and within myself, as this cycle unfolds?',
        focus: 'How you want to feel',
        guidance: 'This Moon’s invitation is a harmony that includes you. Imagine the feeling of balance as the cycle grows — not perfect, but fair, kind and at ease.',
        starters: ['What does “at ease” feel like in your body?', 'Which three words describe the relationships you want to nurture?', 'By the next Full Moon, how would you know you had honoured your own needs?'] },

      /* Questions used by this reading before 10 Nov 2026 — kept so earlier
         reflections still receive matching guidance when reopened. */
      { question: 'Where in my life does the balance between giving and receiving feel uneven?',
        focus: 'Awareness of balance',
        guidance: 'The Scales ask you to notice rather than judge. With the Sun and Moon together in Libra, this New Moon traditionally highlights the give-and-take in your relationships and routines.',
        starters: ['Where do you tend to give more than you receive — and where is it the other way round?', 'Which exchange leaves you tired rather than nourished?', 'What would a fairer balance look like in one specific situation?'] },
      { question: 'Which decision have I been weighing for too long, and what would help me choose?',
        focus: 'Intentions & practical steps',
        guidance: 'The Scales symbolise considered judgement — and also the risk of weighing for ever. A New Moon is traditionally a supportive moment to choose a direction.',
        starters: ['What are you waiting to feel certain about?', 'If you had to decide today, which way would you lean?', 'Which small conversation or piece of information would make choosing easier?'] },
      { question: 'In which relationship would I like more honesty, fairness or ease?',
        focus: 'Growth in relationships',
        guidance: 'This Moon’s symbolism centres on relationship. Consider where a new beginning could make a connection feel more honest and mutual.',
        starters: ['What do you wish you could say more freely to someone close to you?', 'Where do you hold back to keep the peace?', 'What would “ease” look like in this relationship?'] },
      { question: 'What intention for balance would I like to plant during this lunar cycle?',
        focus: 'Intention',
        guidance: 'With the Sun and Moon united in the Scales, an intention for balance traditionally has a clear voice this cycle — especially one that includes your own needs.',
        starters: ['What would balance look like in one ordinary day?', 'Which need of your own would this intention honour?', 'How could you phrase it so it feels kind rather than strict?'] }
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
   They are open prompts, not astrological guidance. They follow the
   four-part structure: New Moon — growth, intention, release, feeling;
   Full Moon — awareness, completion, release, carrying forward. */
const GENERAL_SYSTEM = 'General reflection questions — SBA guidance coming soon';
const GENERAL_QUESTIONS = {
  full: [
    'What has this lunar cycle helped me see more clearly?',
    'What has reached completion in my life, or is ready to be completed?',
    'Which pattern or burden am I ready to release?',
    'What do I want to carry forward into the next cycle?'
  ],
  new: [
    'What would I like to grow during this lunar cycle?',
    'What small step could I take this week?',
    'What am I ready to stop carrying into this new cycle?',
    'How do I want to feel when this cycle closes?'
  ]
};

/* General reflection SUPPORT — shown above general questions while writing.
   Clearly labelled as general; never presented as SBA guidance.
   Matched by exact question text (earlier general questions included). */
const GENERAL_REFLECTION = [
  // New Moon
  { question: 'What would I like to grow during this lunar cycle?', focus: 'Growth & new beginnings',
    guidance: 'A New Moon is traditionally a time of beginnings. Let this question point you towards something you would genuinely like to see grow — not what you feel you should want.',
    starters: ['What has been quietly asking for more of your time or attention?', 'If this cycle went well, what would be a little different four weeks from now?', 'Which part of your life feels ready for a fresh start?'] },
  { question: 'What small step could I take this week?', focus: 'Intentions & practical steps',
    guidance: 'An intention becomes real through small, concrete actions. Think in days rather than months.',
    starters: ['What is the smallest step that would still feel meaningful?', 'When this week could you realistically take it?', 'What might get in the way, and how could you make it easier?'] },
  { question: 'What am I ready to stop carrying into this new cycle?', focus: 'What to release before beginning',
    guidance: 'Beginning well often means putting something down first — a habit, a worry or an expectation that takes up room you need.',
    starters: ['What do you keep carrying out of habit rather than choice?', 'What would you stop doing if no one were watching?', 'Which worry has had more of your energy than it deserves?'] },
  { question: 'How do I want to feel when this cycle closes?', focus: 'How you want to feel',
    guidance: 'Intentions are easier to keep when you know the feeling you are moving towards.',
    starters: ['Which three words describe how you would like to feel by the next Full Moon?', 'When did you last feel that way, and what was happening?', 'What could remind you of this feeling on a difficult day?'] },
  // Full Moon
  { question: 'What has this lunar cycle helped me see more clearly?', focus: 'Awareness & recognition',
    guidance: 'A Full Moon is traditionally a moment of illumination — a time to notice what has become clearer, about yourself or your situation.',
    starters: ['What has surprised you about yourself recently?', 'Which situation looks different now than it did a month ago?', 'What have you been noticing but not yet put into words?'] },
  { question: 'What has reached completion in my life, or is ready to be completed?', focus: 'What has reached completion',
    guidance: 'Culmination is a time to recognise what has finished — a project, a phase, a conversation or a way of thinking.',
    starters: ['What have you achieved or lived through since the last New Moon?', 'What feels finished, even if no one has officially ended it?', 'What deserves acknowledgement before you move on?'] },
  { question: 'Which pattern or burden am I ready to release?', focus: 'Patterns & burdens to release',
    guidance: 'Release often begins with simply naming what weighs on you, without needing to solve it at once.',
    starters: ['Which reaction keeps repeating, even though it no longer helps you?', 'What responsibility have you taken on that isn’t truly yours?', 'What would feel lighter if you let it go?'] },
  { question: 'What do I want to carry forward into the next cycle?', focus: 'What to carry forward',
    guidance: 'Not everything needs to be released. Some insights, habits and relationships are worth bringing with you.',
    starters: ['What has supported you well during this cycle?', 'Which insight from this month do you want to remember?', 'What would you like to give more space to next?'] },
  // Earlier general Full Moon questions (from the original brief) — for existing reflections
  { question: 'What am I forcing that would benefit from patience?', focus: 'Awareness & recognition',
    guidance: 'Notice where effort has turned into pressure. Awareness comes before change.',
    starters: ['Where do you feel impatient or tense right now?', 'What would happen if you gave this one more week?', 'What are you afraid will happen if you stop pushing?'] },
  { question: 'Where am I putting other people’s needs ahead of my own?', focus: 'Recognition',
    guidance: 'Recognising an imbalance is the first step to restoring it — gently, and without blame.',
    starters: ['When did you last say yes while meaning no?', 'Whose needs come first by default, and why?', 'Which need of your own have you been postponing?'] },
  { question: 'What am I ready to stop carrying?', focus: 'Patterns & burdens to release',
    guidance: 'Release often begins with simply naming what weighs on you, without needing to solve it at once.',
    starters: ['Which reaction keeps repeating, even though it no longer helps you?', 'What responsibility have you taken on that isn’t truly yours?', 'What would feel lighter if you let it go?'] },
  { question: 'What one decision would bring me closer to the life I want?', focus: 'What to carry forward',
    guidance: 'Let the clarity of the Full Moon point you towards one choice rather than a long list.',
    starters: ['Which decision have you been postponing?', 'Which choice would your future self thank you for?', 'What would make this decision feel smaller and more doable?'] }
];
/* Used only when a question has no matching support at all (e.g. a question
   from a much earlier version). General writing prompts, labelled as such. */
const GENERAL_STARTERS = {
  new: ['What feels most alive in this question for you right now?', 'What would you write if no one else would ever read it?', 'Which small, honest observation could you start with?'],
  full: ['What do you notice first when you read this question?', 'What would you write if no one else would ever read it?', 'Which small, honest observation could you start with?']
};
const GENERAL_THEMES = { new: 'Beginnings and intention', full: 'Awareness and release' };
