'use strict';
/* Moon Reflection — Soul Blueprint Astrology · guidance text (SBA interpretations go here) */

/* Interpretations supplied by Soul Blueprint Astrology, keyed by event ID
   (e.g. 'full-moon-2026-10-26'). They automatically replace demonstration
   content for that event. Guidance items may be plain strings or
   { title, text }. Optional: lessons:{look,go,in} */
const SBA_INTERPRETATIONS = {};

/* ---------------------------------------------------------------------
   DEMONSTRATION constellation themes — symbolic keywords drawn from each
   constellation's traditional figure and imagery. NOT official SBA
   teachings; replace with SBA material when supplied. Always labelled.
   short: a quality · shadow/release/welcome: guidance pieces · q: question
   --------------------------------------------------------------------- */
const CONSTELLATION_THEMES = {
  Aries: { figure: 'the Ram', short: 'courage', theme: 'courage, initiative and independence',
    shadow: ['Impatience.', 'Feeling that everything needs to happen immediately.'], release: ['The need to rush.', 'Not everything has to be resolved today.'], releaseP: 'the need to rush',
    welcome: ['Steady courage.', 'Taking the first brave step without forcing the rest.'], welcomeP: 'steady courage', q: 'Where am I ready to act with courage instead of waiting for permission?' },
  Taurus: { figure: 'the Bull', short: 'steadiness', theme: 'steadiness, comfort and what you truly value',
    shadow: ['Holding on too tightly.', 'Staying with what is familiar even when it no longer serves you.'], release: ['Resistance to change.', 'The belief that security means nothing can move.'], releaseP: 'my resistance to change',
    welcome: ['Grounded calm.', 'Simple pleasures that genuinely nourish you.'], welcomeP: 'grounded calm', q: 'What do I truly value, and am I making room for it?' },
  Gemini: { figure: 'the Twins', short: 'curiosity', theme: 'curiosity, conversation and connection',
    shadow: ['Scattered attention.', 'Saying yes to every idea and finishing none.'], release: ['Mental noise.', 'Thoughts that circle without leading anywhere.'], releaseP: 'mental noise',
    welcome: ['Honest conversation.', 'Listening as fully as you speak.'], welcomeP: 'honest conversation', q: 'Which conversation have I been avoiding that could bring clarity?' },
  Cancer: { figure: 'the Crab', short: 'emotional safety', theme: 'home, belonging and emotional safety',
    shadow: ['Retreating into your shell.', 'Protecting yourself so well that no one can reach you.'], release: ['Old hurts.', 'Memories you keep returning to that only reopen the wound.'], releaseP: 'old hurts',
    welcome: ['Gentle nurture.', 'Caring for yourself with the tenderness you offer others.'], welcomeP: 'gentle nurture', q: 'Where do I feel truly at home, and what would make me feel safer?' },
  Leo: { figure: 'the Lion', short: 'self-expression', theme: 'heart, creativity and self-expression',
    shadow: ['Needing approval.', 'Measuring your worth by how others respond.'], release: ['Hiding your light.', 'Making yourself smaller to keep others comfortable.'], releaseP: 'the habit of hiding my light',
    welcome: ['Warm-hearted confidence.', 'Sharing what you love without apology.'], welcomeP: 'warm-hearted confidence', q: 'What would I create if I were not afraid of being seen?' },
  Virgo: { figure: 'the Maiden', short: 'discernment', theme: 'discernment, health and care in the details',
    shadow: ['Self-criticism.', 'Expecting yourself to be constantly productive.'], release: ['Perfectionism.', 'Your worth is not measured by flawless results.'], releaseP: 'perfectionism',
    welcome: ['Practical self-care.', 'Small, healthy routines that support you.'], welcomeP: 'practical self-care', q: 'Which small daily habit would most support my wellbeing?' },
  Libra: { figure: 'the Scales', short: 'balance', theme: 'balance, fairness and relationships',
    shadow: ['People-pleasing.', 'Keeping the peace at the cost of your own truth.'], release: ['Endless weighing.', 'Waiting for the perfect choice instead of a good one.'], releaseP: 'the need to keep everyone pleased',
    welcome: ['Honest boundaries.', 'Saying no with kindness so you can say yes to yourself.'], welcomeP: 'honest balance', q: 'Where am I putting other people’s needs ahead of my own?' },
  Scorpius: { figure: 'the Scorpion', short: 'depth', theme: 'depth, intensity and transformation',
    shadow: ['Guarding yourself.', 'Testing others before you allow them close.'], release: ['Resentment.', 'Carrying old wounds as protection.'], releaseP: 'resentment I have carried as protection',
    welcome: ['Honest depth.', 'Letting real feelings rise without fear.'], welcomeP: 'honest depth', q: 'What am I holding onto that is ready to be transformed?' },
  Ophiuchus: { figure: 'the Serpent-Bearer', short: 'healing', theme: 'healing, wisdom and integration',
    shadow: ['Trying to fix everyone.', 'Carrying the healing of others while neglecting your own.'], release: ['Old wounds.', 'Pain you no longer need to keep as part of your story.'], releaseP: 'old wounds I no longer need',
    welcome: ['Integration.', 'Allowing what you have learned to become part of who you are.'], welcomeP: 'healing and integration', q: 'What in my life is asking to be healed rather than fixed?' },
  Sagittarius: { figure: 'the Archer', short: 'meaning', theme: 'meaning, freedom and the bigger picture',
    shadow: ['Restlessness.', 'Seeking the next horizon instead of being where you are.'], release: ['Overpromising.', 'Agreeing to more than you can truly give.'], releaseP: 'restlessness',
    welcome: ['A clear aim.', 'Choosing one direction that gives your life meaning.'], welcomeP: 'a clear sense of meaning', q: 'What gives my life its sense of meaning right now?' },
  Capricornus: { figure: 'the Sea-Goat', short: 'perseverance', theme: 'ambition, structure and perseverance',
    shadow: ['Overextending yourself.', 'Trying to prove your strength by doing more instead of recognising when you need rest.'], release: ['Proving yourself.', 'The belief that rest must be earned.'], releaseP: 'the need to keep proving myself',
    welcome: ['Patient progress.', 'Building steadily towards what matters.'], welcomeP: 'patient, steady progress', q: 'What long-term goal deserves my patient effort?' },
  Aquarius: { figure: 'the Water-Bearer', short: 'originality', theme: 'vision, community and originality',
    shadow: ['Emotional distance.', 'Staying in your head to avoid what you feel.'], release: ['Fitting in.', 'Shaping yourself to belong where you do not truly fit.'], releaseP: 'the need to fit in',
    welcome: ['Your own vision.', 'Ideas that serve both you and the people around you.'], welcomeP: 'my own original vision', q: 'Where am I ready to stand apart and trust my own vision?' },
  Pisces: { figure: 'the Fishes', short: 'intuition', theme: 'intuition, compassion and imagination',
    shadow: ['Blurred boundaries.', 'Absorbing other people’s moods as your own.'], release: ['Escaping.', 'Drifting away from what you feel instead of meeting it.'], releaseP: 'the urge to escape',
    welcome: ['Quiet intuition.', 'Trusting the soft inner knowing beneath the noise.'], welcomeP: 'quiet intuition', q: 'What is my intuition telling me that I have not yet listened to?' },
  Cetus: { figure: 'the Sea Creature', short: 'emotional depth', theme: 'the deep, the unknown and hidden strength',
    shadow: ['Fear of the unknown.', 'Avoiding the depths because you cannot see the bottom.'], release: ['Old fears.', 'Stories about danger that belong to the past.'], releaseP: 'old fears',
    welcome: ['Hidden strength.', 'The resilience you discover when you go deeper.'], welcomeP: 'my hidden strength', q: 'What unknown am I ready to meet with curiosity instead of fear?' },
  Orion: { figure: 'the Hunter', short: 'purpose', theme: 'purpose, focus and bold pursuit',
    shadow: ['Chasing too hard.', 'Pursuing goals so intensely that you forget why they matter.'], release: ['Restless striving.', 'The feeling that you are never quite there.'], releaseP: 'restless striving',
    welcome: ['Focused purpose.', 'Pursuing what truly matters with clear intent.'], welcomeP: 'focused purpose', q: 'What am I truly pursuing, and why does it matter to me?' },
  Auriga: { figure: 'the Charioteer', short: 'direction', theme: 'guidance, care and steady direction',
    shadow: ['Pulling every rein.', 'Trying to control every part of the journey.'], release: ['Over-control.', 'The need to steer everything at once.'], releaseP: 'the need to control every rein',
    welcome: ['Steady direction.', 'Guiding your life with a gentle, confident hand.'], welcomeP: 'steady direction', q: 'Where do I need to hold the reins more gently?' },
  Sextans: { figure: 'the Sextant', short: 'perspective', theme: 'orientation, measure and finding your bearings',
    shadow: ['Measuring yourself constantly.', 'Checking your position against everyone else.'], release: ['Comparison.', 'Using other people’s maps to judge your own path.'], releaseP: 'comparison',
    welcome: ['Your own bearings.', 'Knowing where you stand by your own measure.'], welcomeP: 'my own bearings', q: 'By whose measure am I judging my progress?' }
};

/* Generic DEMONSTRATION guidance — used only when a placement is pending
   or not covered, so no placement-specific wording is shown. */
const DEMO_INTERPRETATIONS = {
  full: {
    theme: 'A time for clarity and releasing what no longer fits.',
    intro: 'A Full Moon is a symbolic moment of culmination — a time to notice what has come to light and what you no longer need to carry.',
    lookOut: [
      { title: 'Impatience.', text: 'Feeling that everything needs to happen immediately.' },
      { title: 'Overthinking.', text: 'You may feel pulled between analysis and action.' },
      { title: 'Emotional reactions.', text: 'Speaking or making decisions before understanding what you’re feeling.' }],
    letGo: [
      { title: 'The need to rush.', text: 'Not everything has to be resolved today.' },
      { title: 'Other people’s expectations.', text: 'Choices made to please others rather than to honour yourself.' },
      { title: 'Old self-doubt.', text: 'Stories about what you are not capable of.' }],
    letIn: [
      { title: 'Patience.', text: 'Trust that meaningful things can unfold in their own time.' },
      { title: 'Rest.', text: 'Recovery as part of strength, not a reward for it.' },
      { title: 'Self-trust.', text: 'Making one clear decision that reflects who you are becoming.' }],
    lessons: { look: 'The lesson is to distinguish between genuine ambition and unnecessary pressure.' },
    release: 'I release the need to force what is meant to unfold in its own time. I set down what was never mine to carry.',
    invitation: 'I move with patience and trust. I honour my own needs, and I make choices that bring me closer to the life I want.',
    questions: [
      'What am I forcing that would benefit from patience?',
      'Where am I putting other people’s needs ahead of my own?',
      'What am I ready to stop carrying?',
      'What one decision would bring me closer to the life I want?'
    ]
  },
  new: {
    theme: 'A time for quiet beginnings and clear intention.',
    intro: 'A New Moon is a symbolic pause before something begins — a quiet moment to choose what you would like to nurture next and to plant intentions with care.',
    lookOut: [
      { title: 'Over-planning.', text: 'Preparing so thoroughly that nothing actually begins.' },
      { title: 'Comparison.', text: 'Measuring your starting point against someone else’s progress.' },
      { title: 'Waiting to feel ready.', text: 'Holding back until you feel completely certain.' }],
    letGo: [
      { title: 'The need for certainty.', text: 'You can begin before you know every step.' },
      { title: 'Old stories.', text: 'Beliefs about what you are capable of that no longer fit.' },
      { title: 'Pressure.', text: 'The idea that you must have everything figured out.' }],
    letIn: [
      { title: 'Curiosity.', text: 'Openness to what could be possible.' },
      { title: 'One small step.', text: 'Steady progress over dramatic change.' },
      { title: 'Kindness.', text: 'Gentleness towards yourself as a beginner.' }],
    lessons: { look: 'The lesson is to begin gently, rather than wait for perfect conditions.' },
    release: 'I release the need to be certain before I begin. I let go of old stories that keep me small.',
    invitation: 'I welcome new beginnings with an open heart. I take one clear step towards what matters to me.',
    questions: [
      'What would I like to grow during this lunar cycle?',
      'What small step could I take this week?',
      'What am I ready to stop carrying into this new cycle?',
      'How do I want to feel when this cycle closes?'
    ]
  }
};
const RELEASE_QUESTION_INDEX = 2; // the "ready to stop carrying" question
