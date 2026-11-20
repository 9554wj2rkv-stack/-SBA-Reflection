'use strict';
/* Moon Reflection — Soul Blueprint Astrology · SBA Interpretation Library — edit meanings and approve entries here */

/* =====================================================================
   2c-lib. SBA INTERPRETATION LIBRARY
   ---------------------------------------------------------------------
   The meanings the Interpretation Engine combines into a reading for
   every New and Full Moon. Edit the text here; the engine and the app
   pick it up automatically. Astronomy is never changed by this file.

   APPROVAL — nothing here is approved yet. Every entry starts as
     status: 'draft'     → shown with "Draft interpretation · awaiting review"
   Change an entry to
     status: 'approved'  → only after you have reviewed it as SBA content.
   A generated reading is labelled "Approved SBA interpretation" ONLY when
   the Moon's entry, the Sun's entry, the phase rules AND the combination
   rules are all approved (see INTERPRETATION_APPROVAL below).

   BASIS
     'traditional' → draft based on traditional symbolism of the figure
     'proposed'    → proposed SBA content, NOT established traditional
                     zodiac doctrine (Ophiuchus, and the four off-zodiac
                     constellations the Moon occasionally passes through)

   FIELDS (one entry per constellation)
     figure        traditional name of the figure, e.g. 'the Ram'
     keyword       one short noun phrase, used inside sentences
                   ("…around courage", "…let courage and balance…")
     essence       three-part phrase: 'courage, initiative and independence'
     core          core symbolic meaning (one or two sentences)
     moon          emotional themes when the MOON is here (a paragraph)
     sun           conscious themes when the SUN is here (a paragraph)
     strengths     three strengths & opportunities (noun phrases)
     challenges    three potential challenges, written so they read after
                   "a pattern of …" / "can show up as …"
     lookOut, letGo, letIn   three { title, text } items each
     releaseP      used in first-person release statements: "I release …"
     welcomeP      used in guidance: "…invites you to welcome …"
     invite        { new, full } one sentence each — what this Moon invites
     reflection    { new: [growth question, intention question],
                     full: [awareness question, completion question] }
     affirmations  three positive, present-tense sentences
     starters      nine thought starters:
                   1–3 explore · 4–6 act / intend · 7–9 patterns / release

   LIBRARY_VERSION is saved with every new reflection, so an older entry
   always reopens with the interpretation it was written with. Change it
   whenever you edit the library.
   ===================================================================== */
const LIBRARY_VERSION = '2026-11-20 · draft 1';

/* Approval of the engine's own rules (phase themes + how two placements
   are combined). 'draft' until you have reviewed them. */
const INTERPRETATION_APPROVAL = {
  phaseRules: 'draft',
  combinationRules: 'draft'
};

/* ---- Lunar phase interpretation rules (symbolic, not scientific) ---- */
const PHASE_RULES = {
  new: {
    themes: ['new beginnings', 'setting intentions', 'renewal', 'personal growth', 'what to welcome into the next cycle'],
    focus: ['New beginnings & growth', 'Setting intentions', 'Renewal', 'What to welcome'],
    meaning: 'A New Moon begins the lunar cycle. The Moon passes between the Earth and the Sun with its lit side turned away from us, and the night sky is dark.\n\nSymbolically, a New Moon is a time of new beginnings, setting intentions, renewal, personal growth and choosing what to welcome into the next cycle. These are symbolic themes, not scientifically established effects.'
  },
  full: {
    themes: ['awareness', 'completion', 'emotional reflection', 'recognising patterns', 'releasing what no longer serves'],
    focus: ['Awareness & emotional reflection', 'Completion', 'Recognising patterns', 'Releasing what no longer serves'],
    meaning: 'A Full Moon is the peak of the lunar cycle. The Sun and Moon stand on opposite sides of the Earth and the Moon is fully lit.\n\nSymbolically, a Full Moon is a time of awareness, completion, emotional reflection, recognising patterns and releasing what no longer serves you. These are symbolic themes, not scientifically established effects.'
  }
};

/* Optional extra sentence for a specific Moon + Sun pairing, added to
   "The Moon and Sun together". Key: 'phase|MoonConstellation|SunConstellation'.
   Example: 'full|Taurus|Scorpius': 'Your own sentence…' */
const PAIR_NOTES = {};

const CONSTELLATION_LIBRARY = {

  Aries: {
    status: 'draft', basis: 'traditional',
    figure: 'the Ram', keyword: 'courage', essence: 'courage, initiative and independence',
    core: 'Aries, the Ram, has long symbolised courage, initiative and the spark that sets things in motion — the first push of new life.',
    moon: 'With the Moon here, feelings tend to be quick, direct and honest. There can be a strong emotional need for independence and for acting on what you feel — and a restlessness when life moves slowly. At its best, this placement brings the courage to name what you need.',
    sun: 'With the Sun in Aries, conscious attention turns towards initiative, self-direction and the willingness to begin. It favours taking the first step, standing up for what matters and trusting your own drive.',
    strengths: ['honest courage', 'a willingness to begin', 'clear, direct energy'],
    challenges: ['rushing ahead before you are ready', 'reacting before you understand what you feel', 'pushing through when rest is needed'],
    lookOut: [
      { title: 'Impatience.', text: 'Feeling that everything needs to happen immediately.' },
      { title: 'Quick reactions.', text: 'Speaking or deciding before you understand what you feel.' },
      { title: 'Going it alone.', text: 'Refusing help to prove that you can manage by yourself.' }],
    letGo: [
      { title: 'The need to rush.', text: 'Not everything has to be resolved today.' },
      { title: 'Proving yourself.', text: 'Measuring your worth by how fast or how hard you push.' },
      { title: 'Old frustrations.', text: 'Anger you have carried long after the moment has passed.' }],
    letIn: [
      { title: 'Steady courage.', text: 'Taking the first brave step without forcing the rest.' },
      { title: 'Honest directness.', text: 'Saying what you need, simply and kindly.' },
      { title: 'Energy with rest.', text: 'Letting recovery be part of your strength.' }],
    releaseP: 'the need to rush', welcomeP: 'steady, patient courage',
    invite: { new: 'Consider where you would like to act with more courage — not by forcing, but by taking one honest first step.',
      full: 'Notice where courage has carried you this cycle, and where it may have tipped into impatience.' },
    reflection: {
      new: ['Where in my life am I ready to begin something with courage?', 'What first step could I take without waiting for perfect conditions?'],
      full: ['What has this cycle shown me about how I use my energy and drive?', 'What did I start with courage that is now ready to be finished or acknowledged?'] },
    affirmations: ['I act with courage and patience.', 'I trust my own drive and take one clear step at a time.', 'I can be strong and still allow myself to rest.'],
    starters: ['Which idea gives you a spark of energy right now?', 'Where have you been waiting for permission?', 'What would you begin if you trusted yourself a little more?',
      'What is the smallest brave action you could take this week?', 'Who could you ask for support, even though you could manage alone?', 'How will you know that you have started?',
      'When do you feel the urge to rush, and what is underneath it?', 'What happens in your body just before you react?', 'Where could a pause make your courage wiser?']
  },

  Taurus: {
    status: 'draft', basis: 'traditional',
    figure: 'the Bull', keyword: 'steadiness', essence: 'steadiness, comfort and lasting value',
    core: 'Taurus, the Bull, has long symbolised steadiness, patience and the slow strength that builds things to last — along with the pleasures of the body and the natural world.',
    moon: 'With the Moon here, emotional security often comes through routine, comfort and things you can touch. Feelings may move slowly but deeply, and there can be a strong need for stability. At its best, this placement brings calm, loyalty and a grounded presence.',
    sun: 'With the Sun in Taurus, conscious attention turns towards building, sustaining and enjoying what truly has value — resources, health, home and simple pleasures.',
    strengths: ['grounded patience', 'loyal steadiness', 'an eye for what truly has value'],
    challenges: ['holding on too tightly to what is familiar', 'resisting change even when it would help you', 'seeking comfort instead of facing a feeling'],
    lookOut: [
      { title: 'Holding on too tightly.', text: 'Staying with what is familiar even when it no longer serves you.' },
      { title: 'Stubbornness.', text: 'Digging in your heels to avoid an uncomfortable change.' },
      { title: 'Comfort as escape.', text: 'Reaching for food, shopping or routine to avoid a feeling.' }],
    letGo: [
      { title: 'Resistance to change.', text: 'The belief that security means nothing can move.' },
      { title: 'Scarcity thinking.', text: 'The fear that there will never be enough.' },
      { title: 'Unnecessary clutter.', text: 'Things, habits or commitments you keep only out of habit.' }],
    letIn: [
      { title: 'Grounded calm.', text: 'Simple, steady routines that genuinely nourish you.' },
      { title: 'Patient progress.', text: 'Trusting that slow growth is still growth.' },
      { title: 'Pleasure without guilt.', text: 'Enjoying beauty, food and rest in a way that restores you.' }],
    releaseP: 'my resistance to change', welcomeP: 'grounded, patient calm',
    invite: { new: 'Consider what you would like to build slowly and steadily — something that will still feel good months from now.',
      full: 'Notice what has given you real security this cycle, and what you have been holding on to out of habit.' },
    reflection: {
      new: ['What would I like to build slowly and steadily over the coming weeks?', 'Which simple daily habit would make me feel more grounded?'],
      full: ['What has truly given me a sense of security this cycle?', 'What have I been holding on to that is ready to be completed or set down?'] },
    affirmations: ['I build my life steadily, one patient step at a time.', 'I am safe to change and still feel grounded.', 'I enjoy what nourishes me and release what no longer does.'],
    starters: ['What feels most solid and dependable in your life right now?', 'What would you like to still be enjoying six months from now?', 'Which resource — time, energy or money — would you like to tend more carefully?',
      'What is one small routine you could start tomorrow?', 'What would make that routine pleasant rather than strict?', 'Where in your home or body would a little care make a difference?',
      'Which change have you been resisting, and what are you afraid of losing?', 'When do you reach for comfort instead of listening to a feeling?', 'What would feel lighter to own, keep or carry less of?']
  },

  Gemini: {
    status: 'draft', basis: 'traditional',
    figure: 'the Twins', keyword: 'curiosity', essence: 'curiosity, communication and connection',
    core: 'Gemini, the Twins, has long symbolised curiosity, conversation and the meeting of two perspectives — the mind that wants to learn, connect and understand.',
    moon: 'With the Moon here, feelings are often processed by talking, writing and thinking things through. There can be an emotional need for variety and mental stimulation, and a tendency to explain feelings rather than feel them. At its best, this placement brings lightness, wit and an open mind.',
    sun: 'With the Sun in Gemini, conscious attention turns towards learning, communicating and connecting ideas and people. It favours questions, conversations and staying flexible.',
    strengths: ['an open, curious mind', 'the gift of honest conversation', 'flexibility in the face of change'],
    challenges: ['scattering your attention across too many things', 'talking about feelings instead of feeling them', 'overthinking until you cannot decide'],
    lookOut: [
      { title: 'Scattered attention.', text: 'Saying yes to every idea and finishing none.' },
      { title: 'Mental noise.', text: 'Thoughts that circle without leading anywhere.' },
      { title: 'Staying on the surface.', text: 'Keeping conversations light to avoid what really matters.' }],
    letGo: [
      { title: 'Overthinking.', text: 'Analysing a situation long after it has stopped helping you.' },
      { title: 'Information overload.', text: 'Taking in more than you can meaningfully absorb.' },
      { title: 'Gossip and comparison.', text: 'Conversations that leave you feeling smaller or more anxious.' }],
    letIn: [
      { title: 'Honest conversation.', text: 'Listening as fully as you speak.' },
      { title: 'Focused curiosity.', text: 'Exploring one idea deeply instead of many briefly.' },
      { title: 'Playful learning.', text: 'Letting yourself be a beginner again.' }],
    releaseP: 'the mental noise that keeps me from listening to myself', welcomeP: 'focused, open curiosity',
    invite: { new: 'Consider what you would genuinely like to learn or explore this cycle — and which conversation could open a new door.',
      full: 'Notice what your thoughts and conversations have revealed this cycle, and which ones have only kept you busy.' },
    reflection: {
      new: ['What am I curious to learn or explore during this cycle?', 'Which conversation could I begin that would move something forward?'],
      full: ['What have my recent conversations revealed about what I really think and feel?', 'Which idea or plan has run its course and is ready to be completed or let go?'] },
    affirmations: ['I listen to myself as carefully as I listen to others.', 'I choose where my attention goes.', 'I stay curious, open and clear.'],
    starters: ['Which topic have you been wanting to know more about?', 'Which question keeps returning to you lately?', 'Who do you always learn something from?',
      'What would you like to say that you have not yet said?', 'How could you make that conversation feel easier?', 'What could you read, ask or try this week?',
      'Which thought keeps looping, and what might it be trying to tell you?', 'Where are you thinking when you would rather be feeling?', 'What could you stop following, reading or worrying about?']
  },

  Cancer: {
    status: 'draft', basis: 'traditional',
    figure: 'the Crab', keyword: 'emotional safety', essence: 'home, belonging and emotional safety',
    core: 'Cancer, the Crab, has long symbolised home, care and belonging — the protective shell and the soft heart inside it.',
    moon: 'With the Moon here — traditionally its own home — feelings run deep and are closely tied to memory, family and the people you care for. There can be a strong need to nurture and be nurtured, and a tendency to retreat when you feel hurt. At its best, this placement brings warmth, empathy and a deep capacity for care.',
    sun: 'With the Sun in Cancer, conscious attention turns towards home, family, belonging and caring for what you love. It favours creating safety — for yourself as well as for others.',
    strengths: ['a warm, caring heart', 'deep emotional understanding', 'the gift of making others feel at home'],
    challenges: ['withdrawing into your shell when you feel hurt', 'caring for everyone except yourself', 'holding on to old hurts'],
    lookOut: [
      { title: 'Retreating into your shell.', text: 'Protecting yourself so well that no one can reach you.' },
      { title: 'Over-caring.', text: 'Looking after everyone else while your own needs wait.' },
      { title: 'Living in the past.', text: 'Returning to old memories that only reopen the wound.' }],
    letGo: [
      { title: 'Old hurts.', text: 'Memories you keep revisiting that no longer help you heal.' },
      { title: 'Guilt about your needs.', text: 'The belief that caring for yourself is selfish.' },
      { title: 'Withdrawal as protection.', text: 'Going quiet instead of saying what you feel.' }],
    letIn: [
      { title: 'Gentle nurture.', text: 'Caring for yourself with the tenderness you offer others.' },
      { title: 'Safe connection.', text: 'Letting trusted people see how you really feel.' },
      { title: 'A sense of home.', text: 'Creating a space — inside and around you — where you can rest.' }],
    releaseP: 'old hurts I no longer need to carry', welcomeP: 'gentle, nourishing care for yourself',
    invite: { new: 'Consider what would help you feel more at home in your life — and how you could offer yourself the care you so readily give.',
      full: 'Notice where you have felt safe this cycle, and where you have felt the need to withdraw.' },
    reflection: {
      new: ['What would help me feel more at home in my life during this cycle?', 'How could I care for myself as kindly as I care for others?'],
      full: ['What has this cycle shown me about where I truly feel safe?', 'Which caring role or old memory is ready to be completed or set down?'] },
    affirmations: ['I care for myself with the same tenderness I give to others.', 'I am safe to feel and safe to share what I feel.', 'I create a home within myself wherever I am.'],
    starters: ['Where, and with whom, do you feel most at home?', 'What did feeling safe look like when you were young?', 'What would make your home feel more like a refuge?',
      'What is one caring thing you could do for yourself this week?', 'Which need of yours tends to go unspoken?', 'Who could you let in a little closer?',
      'When did you last withdraw instead of saying what you felt?', 'Which memory keeps returning, and what does it ask of you?', 'What would it mean to put one burden of care down?']
  },

  Leo: {
    status: 'draft', basis: 'traditional',
    figure: 'the Lion', keyword: 'self-expression', essence: 'heart, creativity and self-expression',
    core: 'Leo, the Lion, has long symbolised the heart, courage and creative self-expression — the warmth and generosity of the Sun itself.',
    moon: 'With the Moon here, there can be an emotional need to be seen, appreciated and loved for who you are. Feelings are often expressed warmly and generously, and hurt can come from feeling overlooked. At its best, this placement brings loyalty, playfulness and a big heart.',
    sun: 'With the Sun in Leo — traditionally its own home — conscious attention turns towards creativity, joy, leadership and expressing who you are with confidence.',
    strengths: ['a warm, generous heart', 'creative confidence', 'the courage to be seen'],
    challenges: ['needing approval to feel worthy', 'hiding your light to avoid judgement', 'taking things personally'],
    lookOut: [
      { title: 'Needing approval.', text: 'Measuring your worth by how others respond.' },
      { title: 'Hiding your light.', text: 'Making yourself smaller to keep others comfortable.' },
      { title: 'Pride after hurt.', text: 'Turning away when you feel overlooked, instead of saying so.' }],
    letGo: [
      { title: 'Fear of being seen.', text: 'The worry that showing who you are will be too much.' },
      { title: 'Comparison.', text: 'Measuring your creativity against someone else’s.' },
      { title: 'The need for applause.', text: 'Waiting for recognition before you allow yourself to enjoy what you do.' }],
    letIn: [
      { title: 'Warm-hearted confidence.', text: 'Sharing what you love without apology.' },
      { title: 'Creative play.', text: 'Making something simply for the joy of it.' },
      { title: 'Generous recognition.', text: 'Celebrating others — and yourself.' }],
    releaseP: 'the habit of hiding my light', welcomeP: 'warm-hearted, playful confidence',
    invite: { new: 'Consider what you would love to create or express this cycle — something that comes from your heart rather than from the need to impress.',
      full: 'Notice where you have shone this cycle, and where you have waited for approval before allowing yourself to shine.' },
    reflection: {
      new: ['What would I love to create or express during this cycle?', 'How could I bring more joy and play into my week?'],
      full: ['When did I feel truly seen and appreciated this cycle — and when did I not?', 'Which creative project or role has reached a moment to be celebrated or completed?'] },
    affirmations: ['I let myself be seen, just as I am.', 'I create from joy, not from the need to impress.', 'My heart is generous, and I include myself in its warmth.'],
    starters: ['What did you love to do as a child, simply for fun?', 'Where do you feel most alive and expressive?', 'What would you make if no one would judge it?',
      'What is one small creative act you could do this week?', 'Who brings out your playful side?', 'Where could you take the lead in a gentle way?',
      'When did you last wait for approval before enjoying something?', 'Where do you make yourself smaller to keep others comfortable?', 'What would you do differently if you trusted your own worth?']
  },

  Virgo: {
    status: 'draft', basis: 'traditional',
    figure: 'the Maiden', keyword: 'discernment', essence: 'discernment, health and care in the details',
    core: 'Virgo, the Maiden — often shown holding an ear of wheat — has long symbolised harvest, discernment and careful, devoted work.',
    moon: 'With the Moon here, emotional security often comes from order, usefulness and knowing that things are taken care of. Feelings may be processed through analysis and quiet, practical help, and there can be a tendency towards worry or self-criticism. At its best, this placement brings kindness, reliability and attentive care.',
    sun: 'With the Sun in Virgo, conscious attention turns towards health, daily routines, skill and improvement — making things work well, and being of service.',
    strengths: ['careful discernment', 'practical, devoted care', 'a gift for making things better'],
    challenges: ['criticising yourself for not being perfect', 'worrying about details you cannot control', 'staying busy instead of resting'],
    lookOut: [
      { title: 'Self-criticism.', text: 'Expecting yourself to be constantly productive.' },
      { title: 'Overthinking details.', text: 'Losing the bigger picture in small worries.' },
      { title: 'Busy as a habit.', text: 'Filling every moment so you never have to slow down.' }],
    letGo: [
      { title: 'Perfectionism.', text: 'Your worth is not measured by flawless results.' },
      { title: 'Unnecessary worry.', text: 'Concerns about things that are not yours to control.' },
      { title: 'Over-giving.', text: 'Helping in ways that leave you depleted.' }],
    letIn: [
      { title: 'Practical self-care.', text: 'Small, healthy routines that support you.' },
      { title: 'Good enough.', text: 'Allowing things to be useful rather than perfect.' },
      { title: 'Gentle attention.', text: 'Noticing your body’s needs with kindness.' }],
    releaseP: 'perfectionism', welcomeP: 'practical, gentle self-care',
    invite: { new: 'Consider one small, practical habit that would genuinely support your wellbeing — and let it be good enough rather than perfect.',
      full: 'Notice what your efforts have harvested this cycle, and where your high standards may have become harsh.' },
    reflection: {
      new: ['Which small daily habit would most support my wellbeing this cycle?', 'What would I like to improve — gently, and without perfectionism?'],
      full: ['What has my body or my daily routine been telling me this cycle?', 'What have I harvested from my efforts, and what is ready to be called complete?'] },
    affirmations: ['I am enough, even when things are not perfect.', 'I care for my body and my days with kindness.', 'My efforts are valuable, and so is my rest.'],
    starters: ['Which part of your daily routine feels most supportive?', 'What does your body need more of right now?', 'Where would a little more order bring you ease?',
      'What is one habit small enough to begin tomorrow?', 'How could you make it easy and kind rather than strict?', 'What would “good enough” look like here?',
      'When do you criticise yourself most harshly?', 'Which worry is not actually yours to solve?', 'Where are you busy because slowing down feels uncomfortable?']
  },

  Libra: {
    status: 'draft', basis: 'traditional',
    figure: 'the Scales', keyword: 'balance', essence: 'balance, fairness and relationship',
    core: 'Libra, the Scales, is the only figure of the classical zodiac that is an object rather than a living being — an image of weighing, fairness and equilibrium.',
    moon: 'With the Moon here, there can be an emotional need for harmony and ease in close relationships: feeling settled when things are fair, and unsettled when the scales tip too far one way. It can also describe a habit of smoothing things over — sensing what others need before naming your own needs.',
    sun: 'With the Sun in Libra, conscious attention turns towards relationship, cooperation and considered judgement — weighing different needs and viewpoints, and bringing fairness and beauty into the way you live.',
    strengths: ['a strong sense of fairness', 'the gift of seeing more than one side', 'grace in relationships'],
    challenges: ['keeping the peace at your own expense', 'weighing a decision for too long', 'adapting so much that you lose your own view'],
    lookOut: [
      { title: 'People-pleasing.', text: 'Keeping the peace by quietly setting aside what you need.' },
      { title: 'Endless weighing.', text: 'Waiting for an option that pleases everyone.' },
      { title: 'Mirroring others.', text: 'Losing track of your own opinion by adapting to the people around you.' }],
    letGo: [
      { title: 'The need for everyone’s approval.', text: 'Not every choice can satisfy everyone — and it does not have to.' },
      { title: 'One-sided arrangements.', text: 'Relationships or commitments where your effort is consistently unreturned.' },
      { title: 'Avoiding necessary conversations.', text: 'Silence that keeps the surface calm while tension grows underneath.' }],
    letIn: [
      { title: 'Fair agreements.', text: 'Relationships in which both people’s needs are spoken and respected.' },
      { title: 'Your own voice.', text: 'Saying what you want with kindness and clarity.' },
      { title: 'Beauty and harmony.', text: 'Small acts that bring calm and grace into your days.' }],
    releaseP: 'the need to please everyone', welcomeP: 'a balance that includes your own needs',
    invite: { new: 'Consider one relationship, agreement or daily rhythm you would like to bring into better balance — remembering that true balance includes you.',
      full: 'Notice where your relationships and commitments feel fair, and where giving has quietly become one-sided.' },
    reflection: {
      new: ['What would I like to grow in my relationships during this cycle?', 'What intention for balance will I set, and what is one practical step towards it?'],
      full: ['Where in my life does the balance between giving and receiving feel uneven?', 'Which decision or agreement have I weighed long enough, and is ready to be settled?'] },
    affirmations: ['I honour my own needs as much as the needs of others.', 'I make fair, kind decisions and trust them.', 'I welcome relationships that are mutual and at ease.'],
    starters: ['Which relationship would you love to feel easier or more mutual?', 'Where in your daily life would a little more balance help most?', 'What does “fair” mean to you right now?',
      'Which decision have you been weighing that one small step could move forward?', 'What would one fair agreement — with yourself or someone else — look like?', 'What could you say, schedule or simplify this week?',
      'Where do you say yes to keep things smooth, even when it costs you?', 'Which arrangement feels uneven, and which part of it is yours to change?', 'Which conversation have you been avoiding for the sake of harmony?']
  },

  Scorpius: {
    status: 'draft', basis: 'traditional',
    figure: 'the Scorpion', keyword: 'depth', essence: 'depth, intensity and transformation',
    core: 'Scorpius, the Scorpion, has long symbolised depth, intensity and transformation — what lies beneath the surface, and the power to renew.',
    moon: 'With the Moon here, feelings tend to be intense, private and deeply held. There can be an emotional need for trust and loyalty, and a tendency to guard yourself until it feels safe. At its best, this placement brings emotional honesty, resilience and the courage to look at what others avoid.',
    sun: 'With the Sun in Scorpius, conscious attention turns towards depth, truth, intimacy and transformation — understanding what drives you, and letting go so that something new can grow.',
    strengths: ['honest emotional depth', 'resilience through change', 'the courage to look beneath the surface'],
    challenges: ['guarding yourself so closely that no one can reach you', 'holding on to resentment as protection', 'needing control to feel safe'],
    lookOut: [
      { title: 'Guarding yourself.', text: 'Testing others before you allow them close.' },
      { title: 'Holding a grudge.', text: 'Carrying old wounds as a kind of armour.' },
      { title: 'All or nothing.', text: 'Swinging between complete trust and complete withdrawal.' }],
    letGo: [
      { title: 'Resentment.', text: 'Old hurts you keep alive as protection.' },
      { title: 'The need for control.', text: 'Trying to secure every outcome so you never feel exposed.' },
      { title: 'Secrets that weigh on you.', text: 'Things you carry alone that could be shared with someone you trust.' }],
    letIn: [
      { title: 'Honest depth.', text: 'Letting real feelings rise without fear.' },
      { title: 'Trust, step by step.', text: 'Allowing closeness to grow at a pace that feels safe.' },
      { title: 'Renewal.', text: 'Trusting that endings can make room for something new.' }],
    releaseP: 'resentment I have carried as protection', welcomeP: 'honest, trusting depth',
    invite: { new: 'Consider what you are ready to transform — something you would like to approach more honestly and deeply this cycle.',
      full: 'Notice what has surfaced from beneath this cycle, and what you are holding on to more tightly than you need to.' },
    reflection: {
      new: ['What am I ready to transform or renew in my life?', 'Where would I like to allow more honesty and trust?'],
      full: ['Which feelings have come to the surface for me this cycle?', 'What has ended or changed, and what is it making room for?'] },
    affirmations: ['I trust myself to meet my feelings honestly.', 'I let go, and I make room for renewal.', 'I am strong enough to be open.'],
    starters: ['What have you been avoiding looking at more closely?', 'Where do you feel the pull towards change?', 'What would “starting fresh” mean in this area?',
      'Who do you trust enough to share something real with?', 'What would make it feel safe to open up a little?', 'What could you face this week that you have postponed?',
      'When do you hold on most tightly, and why?', 'Which old hurt still shapes how you react?', 'What would loosening your grip feel like?']
  },

  Ophiuchus: {
    status: 'draft', basis: 'proposed',
    figure: 'the Serpent-Bearer', keyword: 'healing', essence: 'healing, wisdom and integration',
    core: 'Ophiuchus, the Serpent-Bearer, is a large constellation the Sun passes through each year between Scorpius and Sagittarius. It is not part of the traditional twelve-sign zodiac, so this entry is proposed SBA content, drawing on its classical image of a figure holding a serpent — long associated with healing.',
    moon: 'With the Moon here, the proposed reading is an emotional need to understand, heal and make whole — both yourself and others. There can be a tendency to carry other people’s pain, and a deep wish to turn difficult experience into wisdom.',
    sun: 'With the Sun in Ophiuchus, the proposed reading is a conscious focus on healing, learning and integration — bringing together what you have lived and what you know, and using it with care.',
    strengths: ['a healing presence', 'the ability to learn from difficult experience', 'wisdom that joins head and heart'],
    challenges: ['trying to fix everyone', 'carrying the healing of others while neglecting your own', 'holding on to old wounds as part of who you are'],
    lookOut: [
      { title: 'Trying to fix everyone.', text: 'Taking responsibility for healing that belongs to others.' },
      { title: 'Neglecting your own care.', text: 'Tending to others while your own needs wait.' },
      { title: 'Defined by old pain.', text: 'Letting past wounds become the whole story of who you are.' }],
    letGo: [
      { title: 'Old wounds.', text: 'Pain you no longer need to keep as part of your story.' },
      { title: 'Rescuing.', text: 'The belief that you must save others to be worthy.' },
      { title: 'Knowing without living.', text: 'Understanding something deeply but not yet letting it change you.' }],
    letIn: [
      { title: 'Integration.', text: 'Allowing what you have learned to become part of who you are.' },
      { title: 'Healing for yourself.', text: 'Receiving the care you offer others.' },
      { title: 'Wise boundaries.', text: 'Helping in ways that leave you whole.' }],
    releaseP: 'old wounds I no longer need', welcomeP: 'healing and integration',
    invite: { new: 'Consider what in your life is asking to be healed or made whole — beginning with yourself.',
      full: 'Notice what this cycle has taught you, and where you have been carrying healing that is not yours to carry.' },
    reflection: {
      new: ['What in my life is asking to be healed rather than fixed?', 'How could I bring what I have learned into my everyday life this cycle?'],
      full: ['What has this cycle taught me about my own healing?', 'Which story about an old wound is ready to be completed?'] },
    affirmations: ['I allow myself to heal, gently and in my own time.', 'I help others without losing myself.', 'I turn what I have lived into wisdom.'],
    starters: ['Where in your life do you feel most in need of care?', 'Which experience has taught you the most?', 'What would “whole” feel like for you?',
      'What is one way you could receive care this week?', 'Which lesson do you know but have not yet lived?', 'Where could a boundary help you help others better?',
      'Whose healing have you been trying to carry?', 'Which old story do you tell about yourself?', 'What would change if you no longer needed to rescue anyone?']
  },

  Sagittarius: {
    status: 'draft', basis: 'traditional',
    figure: 'the Archer', keyword: 'a sense of meaning', essence: 'meaning, freedom and the bigger picture',
    core: 'Sagittarius, the Archer, has long symbolised the search for meaning, freedom and the bigger picture — aiming the arrow towards a distant horizon.',
    moon: 'With the Moon here, there can be an emotional need for freedom, optimism and room to explore. Feelings are often lifted by adventure, learning and hope, and restlessness can appear when life feels small. At its best, this placement brings generosity, honesty and an uplifting spirit.',
    sun: 'With the Sun in Sagittarius, conscious attention turns towards meaning, belief, learning and growth — exploring ideas, places and perspectives that widen your view.',
    strengths: ['hopeful optimism', 'an adventurous, open spirit', 'honesty about what really matters'],
    challenges: ['seeking the next horizon instead of being where you are', 'promising more than you can give', 'avoiding details that feel restrictive'],
    lookOut: [
      { title: 'Restlessness.', text: 'Seeking the next horizon instead of being where you are.' },
      { title: 'Overpromising.', text: 'Agreeing to more than you can truly give.' },
      { title: 'Blunt certainty.', text: 'Being so sure you are right that you stop listening.' }],
    letGo: [
      { title: 'The fear of missing out.', text: 'The sense that life is always better somewhere else.' },
      { title: 'Overcommitment.', text: 'Plans made in enthusiasm that now feel heavy.' },
      { title: 'Beliefs you have outgrown.', text: 'Ideas that once guided you but no longer fit.' }],
    letIn: [
      { title: 'A clear aim.', text: 'Choosing one direction that gives your life meaning.' },
      { title: 'Freedom with roots.', text: 'Exploring while staying connected to what matters.' },
      { title: 'Learning.', text: 'Opening your mind to a new perspective.' }],
    releaseP: 'restlessness', welcomeP: 'a clear sense of meaning',
    invite: { new: 'Consider what gives your life a sense of meaning right now, and where you would like to aim your arrow this cycle.',
      full: 'Notice where you have grown this cycle, and where enthusiasm may have carried you further than you meant to go.' },
    reflection: {
      new: ['What gives my life its sense of meaning right now?', 'Where would I like to aim my energy during this cycle?'],
      full: ['What have I learned or discovered about myself this cycle?', 'Which plan, belief or commitment has run its course?'] },
    affirmations: ['I aim my life towards what truly matters to me.', 'I grow freely and stay rooted.', 'I trust that I am exactly where I need to be to take the next step.'],
    starters: ['When do you feel most free and alive?', 'What would you love to learn, see or explore?', 'Which belief has shaped your choices the most?',
      'Which one aim would make this month feel meaningful?', 'What would you need to say no to, in order to say yes to it?', 'Which small adventure could you take this week?',
      'Where are you looking ahead instead of being here?', 'Which promise feels heavier now than when you made it?', 'Which belief might you have outgrown?']
  },

  Capricornus: {
    status: 'draft', basis: 'traditional',
    figure: 'the Sea-Goat', keyword: 'perseverance', essence: 'ambition, structure and perseverance',
    core: 'Capricornus, the Sea-Goat — part goat, part fish — has long symbolised ambition, discipline and perseverance: the patient climb from the depths to the mountaintop.',
    moon: 'With the Moon here, emotional security often comes from responsibility, structure and feeling capable. Feelings may be held privately or set aside in order to get things done. At its best, this placement brings steadiness, reliability and quiet strength.',
    sun: 'With the Sun in Capricornus, conscious attention turns towards long-term goals, responsibility and building something that lasts — work, reputation and commitment.',
    strengths: ['quiet, reliable strength', 'patient, long-term vision', 'the ability to build things that last'],
    challenges: ['proving your worth by doing more', 'setting feelings aside to stay in control', 'being harder on yourself than on anyone else'],
    lookOut: [
      { title: 'Overextending yourself.', text: 'Proving your strength by doing more instead of recognising when you need rest.' },
      { title: 'Emotional distance.', text: 'Keeping feelings at arm’s length so you can keep functioning.' },
      { title: 'Harsh standards.', text: 'Expecting more of yourself than you would of anyone else.' }],
    letGo: [
      { title: 'Proving yourself.', text: 'The belief that rest must be earned.' },
      { title: 'Carrying it all.', text: 'Responsibilities that could be shared or put down.' },
      { title: 'Fear of failure.', text: 'Waiting until you are sure of success before you start.' }],
    letIn: [
      { title: 'Patient progress.', text: 'Building steadily towards what matters.' },
      { title: 'Rest as strength.', text: 'Recognising recovery as part of achievement.' },
      { title: 'Support.', text: 'Letting others help you carry the load.' }],
    releaseP: 'the need to keep proving myself', welcomeP: 'patient, steady progress',
    invite: { new: 'Consider which long-term goal truly matters to you, and what a steady, realistic first step towards it would be.',
      full: 'Notice what you have achieved this cycle, and which responsibilities are ready to be shared or put down.' },
    reflection: {
      new: ['Which long-term goal deserves my patient effort this cycle?', 'What realistic structure or routine would help me move towards it?'],
      full: ['What have I achieved or carried this cycle that deserves recognition?', 'Which responsibility is ready to be completed, shared or set down?'] },
    affirmations: ['I build steadily towards what matters to me.', 'I am worthy of rest, whatever I achieve.', 'I let others support me as I climb.'],
    starters: ['Which goal would you be proud to reach a year from now?', 'What does success truly mean to you — not to others?', 'Where do you already show quiet strength?',
      'What is one realistic step you could take this week?', 'Which structure would make that step easier?', 'Who could you ask for help or advice?',
      'When did you last rest without feeling guilty?', 'Which responsibility have you never questioned?', 'What would you do differently if you were not afraid of failing?']
  },

  Aquarius: {
    status: 'draft', basis: 'traditional',
    figure: 'the Water-Bearer', keyword: 'originality', essence: 'vision, community and originality',
    core: 'Aquarius, the Water-Bearer, has long symbolised vision, community and originality — pouring out what is needed for the good of many.',
    moon: 'With the Moon here, there can be an emotional need for freedom, friendship and space to be yourself. Feelings may be approached through ideas and principles, and there can be a tendency to step back from intense emotion. At its best, this placement brings openness, fairness and loyal friendship.',
    sun: 'With the Sun in Aquarius, conscious attention turns towards the future, community, ideals and individuality — thinking differently and contributing to something larger than yourself.',
    strengths: ['original, independent thinking', 'loyal friendship', 'a vision for a better future'],
    challenges: ['staying in your head to avoid what you feel', 'keeping your distance in order to feel free', 'shaping yourself to belong where you do not fit'],
    lookOut: [
      { title: 'Emotional distance.', text: 'Staying in your head to avoid what you feel.' },
      { title: 'Detachment as freedom.', text: 'Keeping people at a distance so you never feel tied down.' },
      { title: 'Fitting in.', text: 'Shaping yourself to belong where you do not truly fit.' }],
    letGo: [
      { title: 'The need to fit in.', text: 'Trying to be like everyone else.' },
      { title: 'Overthinking feelings.', text: 'Explaining emotions instead of allowing them.' },
      { title: 'Isolation.', text: 'Going it alone when connection would help.' }],
    letIn: [
      { title: 'Your own vision.', text: 'Ideas that serve both you and the people around you.' },
      { title: 'True community.', text: 'Connections where you can be fully yourself.' },
      { title: 'Felt experience.', text: 'Allowing feelings, not only thoughts, to guide you.' }],
    releaseP: 'the need to fit in', welcomeP: 'your own original vision',
    invite: { new: 'Consider what you would like to create for your future — and which people or communities help you be fully yourself.',
      full: 'Notice where you have felt free and connected this cycle, and where you may have kept your distance from your own feelings.' },
    reflection: {
      new: ['Which vision for my future would I like to take a step towards?', 'Where would I like to contribute, or connect with people who share my values?'],
      full: ['Where have I been thinking about my feelings instead of feeling them?', 'Which group, role or idea has served its purpose in my life?'] },
    affirmations: ['I trust my own vision.', 'I belong as myself, without needing to fit in.', 'I am free and connected at the same time.'],
    starters: ['Which future would you love to help create?', 'Where do you feel most like yourself with others?', 'Which idea of yours feels ahead of its time?',
      'Who shares your values, and how could you connect with them?', 'What is one small way you could contribute this week?', 'Where could you try something new or unconventional?',
      'When do you step back from a feeling?', 'Where are you shaping yourself to belong?', 'What would freedom look like if it included closeness?']
  },

  Pisces: {
    status: 'draft', basis: 'traditional',
    figure: 'the Fishes', keyword: 'intuition', essence: 'intuition, compassion and imagination',
    core: 'Pisces, the Fishes — two fish joined by a cord — has long symbolised intuition, compassion and imagination: the ocean of feeling that connects us all.',
    moon: 'With the Moon here, feelings tend to be fluid, sensitive and easily influenced by the moods of others. There can be a deep emotional need for peace, beauty and spiritual connection, and a tendency to drift away when life feels too harsh. At its best, this placement brings compassion, creativity and a strong inner knowing.',
    sun: 'With the Sun in Pisces, conscious attention turns towards imagination, compassion and inner life — dreams, creativity and a sense of connection with others.',
    strengths: ['deep compassion', 'a vivid imagination', 'quiet, intuitive wisdom'],
    challenges: ['absorbing other people’s moods as your own', 'drifting away from what you feel', 'losing yourself in other people’s needs'],
    lookOut: [
      { title: 'Blurred boundaries.', text: 'Absorbing other people’s moods as your own.' },
      { title: 'Escaping.', text: 'Drifting away from what you feel instead of meeting it.' },
      { title: 'Self-sacrifice.', text: 'Giving so much that little is left for you.' }],
    letGo: [
      { title: 'The urge to escape.', text: 'Distractions that keep you from what you feel.' },
      { title: 'Taking on others’ pain.', text: 'Emotions that are not yours to carry.' },
      { title: 'Waiting for clarity.', text: 'Needing complete certainty before you trust yourself.' }],
    letIn: [
      { title: 'Quiet intuition.', text: 'Trusting the soft inner knowing beneath the noise.' },
      { title: 'Creative flow.', text: 'Music, art or writing that lets feelings move.' },
      { title: 'Compassionate boundaries.', text: 'Caring deeply while staying yourself.' }],
    releaseP: 'the urge to escape', welcomeP: 'quiet, trusted intuition',
    invite: { new: 'Consider what your intuition has been quietly telling you, and which dream you would like to give a little more room this cycle.',
      full: 'Notice what you have felt and sensed this cycle — and which of those feelings were truly yours.' },
    reflection: {
      new: ['What is my intuition telling me that I have not yet listened to?', 'Which dream or creative idea would I like to give more room this cycle?'],
      full: ['Which feelings have I absorbed from others, and which are truly mine?', 'What am I ready to forgive, release or let dissolve?'] },
    affirmations: ['I trust my inner knowing.', 'I care deeply and remain myself.', 'I let my feelings flow without being swept away.'],
    starters: ['When do you feel most at peace?', 'What has your intuition been hinting at lately?', 'Which dream keeps returning to you?',
      'Which creative or quiet practice helps you listen inwards?', 'Where could you give your imagination more space this week?', 'What would you do if you trusted yourself completely?',
      'Whose mood tends to become your mood?', 'What do you reach for when feelings become too much?', 'What could you forgive — in yourself or in someone else?']
  },

  /* ---- Off-zodiac constellations. The Sun never passes through these;
     the Moon occasionally does when its path dips furthest from the Sun’s
     (about 3% of New and Full Moons). All four are PROPOSED SBA content. ---- */

  Cetus: {
    status: 'draft', basis: 'proposed',
    figure: 'the Sea Monster', keyword: 'trust in the unknown', essence: 'the deep, the unknown and hidden strength',
    core: 'Cetus, the Sea Monster, lies just south of the zodiac, and the Moon passes through it only occasionally. It is not part of the traditional zodiac, so this entry is proposed SBA content, inspired by its classical image of a great creature of the deep sea.',
    moon: 'With the Moon here, the proposed reading is an encounter with the emotional depths — feelings that rise from far below the surface, and the fear or fascination they can bring. At its best, it speaks of discovering strength you did not know you had.',
    sun: 'The Sun does not pass through Cetus. For reference, its proposed conscious theme is meeting the unknown with curiosity rather than fear.',
    strengths: ['hidden resilience', 'the courage to face the unknown', 'depth of feeling'],
    challenges: ['avoiding the depths because you cannot see the bottom', 'imagining the worst about what you do not yet know', 'hiding your own strength'],
    lookOut: [
      { title: 'Fear of the unknown.', text: 'Avoiding something important because you cannot see where it leads.' },
      { title: 'Imagining the worst.', text: 'Letting uncertainty fill up with old fears.' },
      { title: 'Hiding your power.', text: 'Keeping your strength submerged so it does not unsettle anyone.' }],
    letGo: [
      { title: 'Old fears.', text: 'Stories about danger that belong to the past.' },
      { title: 'The need to see the bottom.', text: 'Waiting for certainty before you go deeper.' },
      { title: 'Shame about intensity.', text: 'The belief that strong feelings are too much.' }],
    letIn: [
      { title: 'Hidden strength.', text: 'The resilience you discover when you go deeper.' },
      { title: 'Curiosity about the unknown.', text: 'Meeting uncertainty with interest instead of fear.' },
      { title: 'Trust in your depths.', text: 'Letting strong feelings teach you.' }],
    releaseP: 'old fears of the unknown', welcomeP: 'your hidden strength',
    invite: { new: 'Consider which unknown you are ready to meet with curiosity — and what strength might rise to meet it.',
      full: 'Notice which deep feelings have surfaced this cycle, and what they reveal about your hidden strength.' },
    reflection: {
      new: ['Which unknown am I ready to meet with curiosity instead of fear?', 'Which hidden strength would I like to draw on this cycle?'],
      full: ['What has surfaced from my emotional depths this cycle?', 'Which old fear has done its job and is ready to be released?'] },
    affirmations: ['I meet the unknown with curiosity and courage.', 'I trust the strength that lives in my depths.', 'My feelings are deep, and I am safe within them.'],
    starters: ['What feels uncertain in your life right now?', 'When have you surprised yourself with your own strength?', 'What would you explore if fear were not in charge?',
      'Which small step into the unknown could you take?', 'Who helps you feel brave?', 'What would you need in order to feel safe enough to go deeper?',
      'Which fear has followed you for a long time?', 'What do you imagine would happen if you stopped avoiding it?', 'Where are you keeping your strength hidden?']
  },

  Orion: {
    status: 'draft', basis: 'proposed',
    figure: 'the Hunter', keyword: 'purpose', essence: 'purpose, focus and bold pursuit',
    core: 'Orion, the Hunter, borders the zodiac between Taurus and Gemini, and the Moon only rarely crosses its northern edge. It is not part of the traditional zodiac, so this entry is proposed SBA content, inspired by the classical image of the hunter with his belt and bow.',
    moon: 'With the Moon here, the proposed reading is an emotional need for purpose — to pursue something that matters, and to feel strong and focused while doing so. Restlessness can appear when that sense of purpose is missing.',
    sun: 'The Sun does not pass through Orion. For reference, its proposed conscious theme is bold, focused pursuit of what you truly value.',
    strengths: ['focused purpose', 'bold determination', 'the courage to pursue what matters'],
    challenges: ['chasing goals so hard that you forget why they matter', 'pursuing what others admire rather than what you want', 'never feeling that you have arrived'],
    lookOut: [
      { title: 'Chasing too hard.', text: 'Pursuing goals so intensely that you forget why they matter.' },
      { title: 'Borrowed goals.', text: 'Hunting for what others admire rather than what you want.' },
      { title: 'Never arriving.', text: 'Moving on before you have noticed what you achieved.' }],
    letGo: [
      { title: 'Restless striving.', text: 'The feeling that you are never quite there.' },
      { title: 'Goals that are not yours.', text: 'Ambitions you adopted to impress others.' },
      { title: 'All-or-nothing effort.', text: 'Pushing hard, then burning out.' }],
    letIn: [
      { title: 'Focused purpose.', text: 'Pursuing what truly matters with clear intent.' },
      { title: 'Pausing to notice.', text: 'Recognising progress as you go.' },
      { title: 'Steady determination.', text: 'Effort that you can sustain.' }],
    releaseP: 'restless striving', welcomeP: 'focused purpose',
    invite: { new: 'Consider what you truly want to pursue this cycle — and why it matters to you.',
      full: 'Notice what you have been pursuing this cycle, and whether it still feels like your own aim.' },
    reflection: {
      new: ['What do I truly want to pursue, and why does it matter to me?', 'How could I pursue it with focus rather than force?'],
      full: ['What have I been chasing this cycle, and is it still my own aim?', 'What have I already achieved that I have not yet acknowledged?'] },
    affirmations: ['I pursue what truly matters to me.', 'I move with focus, not force.', 'I notice and honour how far I have come.'],
    starters: ['Which goal makes you feel most alive?', 'Whose approval are you hoping to earn?', 'What would you pursue if no one were watching?',
      'What is one focused action you could take this week?', 'What could you stop doing to make room for it?', 'How will you know you are on track?',
      'When does effort turn into striving for you?', 'What have you achieved recently that you hurried past?', 'Which goal might belong to someone else’s expectations?']
  },

  Auriga: {
    status: 'draft', basis: 'proposed',
    figure: 'the Charioteer', keyword: 'direction', essence: 'guidance, care and steady direction',
    core: 'Auriga, the Charioteer, lies just north of the zodiac between Taurus and Gemini, and the Moon only rarely crosses its southern edge. It is not part of the traditional zodiac, so this entry is proposed SBA content, inspired by the classical image of a charioteer who carries a young goat in his arms — guidance combined with care.',
    moon: 'With the Moon here, the proposed reading is an emotional need to steer your life with a steady hand — feeling in charge of your direction while still caring for what is vulnerable.',
    sun: 'The Sun does not pass through Auriga. For reference, its proposed conscious theme is guiding your life with clear direction and gentle care.',
    strengths: ['steady direction', 'protective care', 'the ability to guide without force'],
    challenges: ['trying to control every part of the journey', 'holding the reins too tightly', 'carrying others instead of guiding them'],
    lookOut: [
      { title: 'Pulling every rein.', text: 'Trying to control every part of the journey.' },
      { title: 'Over-protecting.', text: 'Shielding others from experiences they need to have.' },
      { title: 'No time to steer.', text: 'Letting life drive you instead of choosing your direction.' }],
    letGo: [
      { title: 'Over-control.', text: 'The need to steer everything at once.' },
      { title: 'Carrying everyone.', text: 'Guiding is not the same as carrying.' },
      { title: 'Rigid plans.', text: 'Routes that no longer lead where you want to go.' }],
    letIn: [
      { title: 'Steady direction.', text: 'Guiding your life with a gentle, confident hand.' },
      { title: 'Trust in the journey.', text: 'Allowing some things to unfold.' },
      { title: 'Care with boundaries.', text: 'Protecting what matters without holding it too tightly.' }],
    releaseP: 'the need to control every rein', welcomeP: 'steady, trusting direction',
    invite: { new: 'Consider which direction you would like to steer your life in this cycle — and where you could hold the reins more gently.',
      full: 'Notice where you have steered well this cycle, and where you have been holding on too tightly.' },
    reflection: {
      new: ['Which direction would I like to steer my life in this cycle?', 'Where could I hold the reins more gently?'],
      full: ['Where have I been trying to control too much this cycle?', 'Which route or plan is ready to be changed or completed?'] },
    affirmations: ['I guide my life with a steady, gentle hand.', 'I trust the journey as well as the destination.', 'I care for others without carrying them.'],
    starters: ['Where would you like to be heading by the next New Moon?', 'Which part of your life feels steered by you, and which by others?', 'What, or who, do you feel responsible for protecting?',
      'Which one choice would set a clearer direction?', 'Where could you loosen your grip a little?', 'Who could you trust to share the reins?',
      'What happens in you when you are not in control?', 'Whose journey are you trying to steer?', 'Which plan are you following out of habit?']
  },

  Sextans: {
    status: 'draft', basis: 'proposed',
    figure: 'the Sextant', keyword: 'perspective', essence: 'orientation, measure and finding your bearings',
    core: 'Sextans, the Sextant, is a faint modern constellation just south of the zodiac near Leo, and the Moon only rarely passes through it. It is not part of the traditional zodiac, so this entry is proposed SBA content, inspired by the navigational instrument it represents — measuring your position against the stars.',
    moon: 'With the Moon here, the proposed reading is an emotional need to find your bearings — to understand where you stand before deciding where to go next.',
    sun: 'The Sun does not pass through Sextans. For reference, its proposed conscious theme is orienting yourself by your own values rather than by other people’s measures.',
    strengths: ['clear perspective', 'the ability to take stock calmly', 'navigating by your own values'],
    challenges: ['measuring yourself constantly against others', 'losing your bearings when plans change', 'waiting for perfect information before you move'],
    lookOut: [
      { title: 'Measuring yourself constantly.', text: 'Checking your position against everyone else.' },
      { title: 'Losing your bearings.', text: 'Feeling lost when a plan changes.' },
      { title: 'Over-calculating.', text: 'Waiting for perfect information before taking a step.' }],
    letGo: [
      { title: 'Comparison.', text: 'Using other people’s maps to judge your own path.' },
      { title: 'Fixed routes.', text: 'Plans that no longer match where you want to go.' },
      { title: 'Feeling behind.', text: 'The fear that you should be further along by now.' }],
    letIn: [
      { title: 'Your own bearings.', text: 'Knowing where you stand by your own measure.' },
      { title: 'Perspective.', text: 'Seeing your life from a wider view.' },
      { title: 'Adjusting course.', text: 'Small corrections instead of starting over.' }],
    releaseP: 'comparison', welcomeP: 'your own bearings',
    invite: { new: 'Consider where you stand right now, by your own measure — and which small adjustment would set a truer course.',
      full: 'Notice how far you have come this cycle, measured by your own values rather than anyone else’s.' },
    reflection: {
      new: ['Where do I stand right now, measured by my own values?', 'Which small adjustment would set a truer course for this cycle?'],
      full: ['By whose measure have I been judging my progress this cycle?', 'What have I navigated or completed that I can now acknowledge?'] },
    affirmations: ['I find my bearings by my own values.', 'I adjust my course with calm and patience.', 'I am exactly where I am, and that is a good place to start.'],
    starters: ['How would you describe where you are in your life right now?', 'Which values are your “north star”?', 'What has changed since the last New Moon?',
      'Which small correction would make the biggest difference?', 'Which map or plan needs updating?', 'Who helps you see your situation clearly?',
      'Whose progress do you compare yourself to?', 'When do you feel “behind”, and behind what?', 'What would your path look like on your own map?']
  }
};
