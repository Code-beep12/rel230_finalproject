const screens = document.querySelectorAll('.screen');
const startBtn = document.getElementById('startBtn');
const backToHome = document.getElementById('backToHome');
const characterGrid = document.getElementById('characterGrid');
const characterName = document.getElementById('characterName');
const characterNote = document.getElementById('characterNote');
const scenarioStep = document.getElementById('scenarioStep');
const scenarioTheme = document.getElementById('scenarioTheme');
const scenarioTitle = document.getElementById('scenarioTitle');
const scenarioText = document.getElementById('scenarioText');
const sceneArt = document.getElementById('sceneArt');
const choicesEl = document.getElementById('choices');
const feedbackEl = document.getElementById('feedback');
const meterBar = document.getElementById('meterBar');
const meterValue = document.getElementById('meterValue');
const greedValue = document.getElementById('greedValue');
const compassionValue = document.getElementById('compassionValue');
const wisdomValue = document.getElementById('wisdomValue');
const insightBtn = document.getElementById('insightBtn');
const sourceBtn = document.getElementById('sourceBtn');
const insightPanel = document.getElementById('insightPanel');
const insightContent = document.getElementById('insightContent');
const sourceMode = document.getElementById('sourceMode');
const sourceContent = document.getElementById('sourceContent');
const closeInsight = document.getElementById('closeInsight');
const nextBtn = document.getElementById('nextBtn');
const endTitle = document.getElementById('endTitle');
const endReflection = document.getElementById('endReflection');
const endingReadings = document.getElementById('endingReadings');
const finalSuffering = document.getElementById('finalSuffering');
const letGoCount = document.getElementById('letGoCount');
const dominantAttachment = document.getElementById('dominantAttachment');
const strongestVirtue = document.getElementById('strongestVirtue');
const pathPattern = document.getElementById('pathPattern');
const journalSummary = document.getElementById('journalSummary');
const restartBtn = document.getElementById('restartBtn');

const state = {
  character: null,
  suffering: 0,
  step: 0,
  letGo: 0,
  greed: 0,
  compassion: 0,
  wisdom: 0,
  attachmentFocus: {},
  choiceLocked: false,
  journal: [],
  choices: [],
  activeFlow: []
};

const characters = {
  Prince: {
    note: 'Most sensitive to status, honor, and public image.',
    portrait: 'assets/prince.jpg'
  },
  Merchant: {
    note: 'Most drawn toward wealth, security, and control.',
    portrait: 'assets/merchant.png'
  },
  Student: {
    note: 'Most sensitive to approval, identity, and future success.',
    portrait: 'assets/student.jpg'
  }
};

const attachmentLabels = {
  security: 'security and possession',
  status: 'status and recognition',
  relationship: 'relationships and fear of loss',
  identity: 'identity and public image',
  future: 'future control and ambition',
  duty: 'duty and honor',
  competition: 'competition and control',
  belonging: 'belonging and comparison'
};

const concepts = {
  lack: {
    title: 'Loy: The Sense of Lack',
    text: 'Loy argues that the constructed self feels insecure and tries to make itself real through possessions, achievement, or control.',
    source: 'Connection: wealth and security often become substitutes for inner grounding.'
  },
  anicca: {
    title: 'Anicca (Impermanence)',
    text: 'All experiences arise and pass away. Clinging to what changes intensifies dukkha.',
    source: 'Connection: trying to freeze relationships or outcomes turns change into suffering.'
  },
  anatta: {
    title: 'Anatta (No-Self)',
    text: 'The self is not a fixed essence. Protecting a rigid identity makes suffering sharper.',
    source: 'Connection: Loy describes the self as constructed, unstable, and anxious when defended too tightly.'
  },
  dukkha: {
    title: 'Dukkha (Suffering)',
    text: 'Dukkha includes unease, dissatisfaction, pressure, and instability, not only dramatic pain.',
    source: 'Connection: when comparison or grasping becomes identity, ordinary stress hardens into suffering.'
  },
  ethics: {
    title: 'Harvey: Wholesome Action',
    text: 'Harvey explains that Buddhist ethics asks whether actions arise from greed, ill will, or delusion, or from generosity, compassion, and wisdom.',
    source: 'Connection: motives matter because repeated choices shape character and the path away from suffering.'
  }
};

const commonScenarios = [
  {
    id: 'purse',
    art: 'assets/desire.jpg',
    theme: 'Desire and Security',
    title: 'The Gifted Purse',
    text: 'You receive unexpected wealth, and word travels quickly. The purse feels like safety, but it also seems to promise a more solid version of yourself.',
    concept: 'lack',
    focus: 'security',
    sourceLens:
      'Loy helps here: money can feel like a way to make the self more real. Harvey adds that generosity weakens possessiveness and becomes a wholesome practice.',
    variants: {
      Prince: {
        text: 'After a visit to the palace, an important guest leaves behind a bag of money. Keeping it could give you more freedom, but it would also feel dishonest.'
      },
      Merchant: {
        text: 'A business deal leaves you with extra money, and you quickly start thinking about how to grow it further.'
      },
      Student: {
        text: 'Your financial aid covers more than expected this term, and a refund lands in your account. It feels like relief, but you also start treating it like proof that you are finally getting ahead.'
      }
    },
    branchNotes: {
      security: 'Your earlier value choices suggest that security has started to feel like something you have to hold onto.',
      approval: 'The search for reassurance is beginning to shape how this opportunity feels.',
      generosity: 'A pattern of openness makes this moment less threatening and more shareable.',
      control: 'Your habits of control make sudden good fortune feel difficult to loosen.'
    },
    choices: [
      {
        text: 'Hide the purse and plan how to grow it quickly.',
        variants: {
          Prince: 'Keep the money to yourself and use it to help yourself get ahead.',
          Merchant: 'Reinvest all the money into the business and keep it strictly within operations.',
          Student: 'Hold onto every dollar and start treating the money like proof that one setback would ruin everything.'
        },
        delta: 18,
        feedback: 'The secret becomes a weight. Fear of loss shadows every decision.',
        reflection:
          'This choice shows Loy\'s idea that the self tries to feel secure through possession. The more tightly it clings, the more anxiety it creates.',
        tag: 'attachment',
        path: { greed: 2, wisdom: 0, compassion: 0 },
        journal: 'You treated wealth as protection, and that made loss feel closer.'
      },
      {
        text: 'Share part of it quietly with those in need.',
        variants: {
          Prince: 'Return the money quietly and do not use it to gain anything for yourself.',
          Merchant: 'Use some of the profit to help others instead of treating all of it like business money.',
          Student: 'Cover what you genuinely need, then use a little of it to help someone else instead of letting the money define you.'
        },
        delta: -8,
        feedback: 'Generosity softens the grip of greed. The heart feels lighter.',
        reflection:
          'Harvey describes generosity as a wholesome action that reduces possessiveness. Letting go weakens the illusion that security comes from owning more.',
        tag: 'release',
        path: { greed: 0, wisdom: 1, compassion: 2 },
        journal: 'You practiced generosity before possession hardened into anxiety.'
      }
    ]
  },
  {
    id: 'honor',
    art: 'assets/status.jpg',
    theme: 'Status and Recognition',
    title: 'A Seat of Honor',
    text: 'At a public festival, a place of prestige opens up. You immediately feel the pull of being seen and confirmed by others.',
    concept: 'anatta',
    focus: 'status',
    sourceLens:
      'This scene leans on Loy\'s idea that the self seeks reality through recognition. The more identity depends on being seen, the more fragile it becomes.',
    variants: {
      Prince: {
        text: 'At a royal ceremony, an honored seat opens near the front. Everyone will notice whether you claim it or let it pass.'
      },
      Merchant: {
        text: 'At a meeting with other traders, a seat near the front opens up. Taking it could show everyone that you have moved up.'
      },
      Student: {
        text: 'At a campus event, an open seat appears next to the top award winners. You feel tempted to sit there and be seen with them.'
      }
    },
    branchNotes: {
      approval: 'Because approval has mattered in earlier scenes, this invitation feels unusually powerful.',
      duty: 'Your sense of duty complicates the difference between serving well and being seen.',
      honesty: 'A more honest path lets you notice the ego pull without being ruled by it.',
      control: 'Recognition starts to look like another way of stabilizing the self.'
    },
    choices: [
      {
        text: 'Insist on the front seat so everyone recognizes your status.',
        variants: {
          Prince: 'Claim the honored seat so no one doubts your rank.',
          Merchant: 'Take the front seat so people see how successful you are.',
          Student: 'Move to the open seat so people notice you and see you as successful.'
        },
        delta: 16,
        feedback: 'Pride rises, but so does anxiety about being replaced.',
        reflection:
          'This choice turns identity into a performance that must be defended. Loy would say the self seeks reality through recognition, but never feels secure for long.',
        tag: 'attachment',
        path: { greed: 1, wisdom: 0, compassion: 0 },
        journal: 'You reached for recognition, and the fear of losing it immediately followed.'
      },
      {
        text: 'Choose a simple seat and focus on the ceremony itself.',
        variants: {
          Prince: 'Sit with restraint and let the ceremony matter more than your image.',
          Merchant: 'Take a regular seat and focus on the event instead of your image.',
          Student: 'Stay where you are and focus on the event instead of being noticed.'
        },
        delta: -6,
        feedback: 'Respect remains, but the need to be seen fades.',
        reflection:
          'This choice loosens attachment to public identity. It reflects Buddhist non-self by allowing value to exist without constant self-display.',
        tag: 'release',
        path: { greed: 0, wisdom: 2, compassion: 0 },
        journal: 'You let the moment matter more than the image of yourself inside it.'
      }
    ]
  },
  {
    id: 'loss',
    art: 'assets/loss.png',
    theme: 'Loss and Change',
    title: 'A Loved One Leaves',
    text: 'A close friend moves away, and your daily life changes. The pain is real, but so is the temptation to resist change itself.',
    concept: 'anicca',
    focus: 'relationship',
    sourceLens:
      'Impermanence matters here. The issue is not caring too much, but trying to freeze what cannot stay unchanged. Compassion can remain without becoming control.',
    variants: {
      Prince: {
        text: 'A close companion is sent far away from court. Their absence changes your daily life and leaves you feeling unsettled.'
      },
      Merchant: {
        text: 'A longtime business partner moves to another city. You miss them, and their leaving also makes your life feel less stable.'
      },
      Student: {
        text: 'A close friend transfers away. Their leaving changes your daily life and makes the future feel less familiar.'
      }
    },
    branchNotes: {
      security: 'Because you have been looking for stability, this loss feels especially threatening.',
      compassion: 'Earlier gestures of care make it easier to grieve without grasping.',
      honesty: 'An honest path helps you admit the pain without turning it into resentment.',
      approval: 'When belonging matters deeply, distance can feel like silent judgment.'
    },
    choices: [
      {
        text: 'Cling to daily messages and feel hurt when replies slow.',
        variants: {
          Prince: 'Demand constant updates and feel unsettled when attention fades.',
          Merchant: 'Keep asking for constant updates and feel upset when the contact slows down.',
          Student: 'Watch your messages constantly and take slower replies personally.'
        },
        delta: 20,
        feedback: 'The bond tightens into tension. Distance feels like abandonment.',
        reflection:
          'Impermanence becomes painful when change is treated like betrayal. The suffering here comes not only from loss, but from trying to force the relationship to remain unchanged.',
        tag: 'attachment',
        path: { greed: 1, wisdom: 0, compassion: 0 },
        journal: 'You tried to protect the bond by controlling it, and that deepened the hurt.'
      },
      {
        text: 'Offer gratitude and allow the connection to evolve naturally.',
        variants: {
          Prince: 'Let them go with gratitude, trusting the relationship can endure without constant presence.',
          Merchant: 'Value the relationship without trying to control it or keep it exactly the same.',
          Student: 'Hold onto the friendship, allowing it to adjust naturally over time.'
        },
        delta: -10,
        feedback: 'The relationship stays warm, without becoming a chain.',
        reflection:
          'This response accepts anicca without becoming cold or detached. It keeps care while loosening control, which is closer to mindful compassion.',
        tag: 'release',
        path: { greed: 0, wisdom: 1, compassion: 2 },
        journal: 'You accepted change without turning care into possession.'
      }
    ]
  },
  {
    id: 'image',
    art: 'assets/identity.jpg',
    theme: 'Identity and Performance',
    title: 'The Perfect Image',
    text: 'People admire your accomplishments, and soon your public image feels like something you must protect at all costs.',
    concept: 'anatta',
    focus: 'identity',
    sourceLens:
      'Loy compares the self to a mask: a constructed identity that becomes exhausting when we mistake it for our true ground. This moment tests whether image or honesty leads.',
    variants: {
      Prince: {
        text: 'People start praising your calm image and leadership. Soon you feel like you always have to look composed.'
      },
      Merchant: {
        text: 'People start seeing you as someone who always makes smart decisions. Soon you feel pressure to always look confident and in control.'
      },
      Student: {
        text: 'Teachers and peers start seeing you as someone who always succeeds. The image feels flattering, but also exhausting to maintain.'
      }
    },
    branchNotes: {
      approval: 'Earlier attention to approval makes this image feel harder to release.',
      honesty: 'Your growing honesty gives you room to be imperfect without collapsing inward.',
      growth: 'A growth-centered path turns pressure into practice rather than performance.',
      control: 'The more control you seek, the heavier the mask becomes.'
    },
    choices: [
      {
        text: 'Defend the image of success even when you are exhausted.',
        variants: {
          Prince: 'Acknowledge your limits openly and allow humility to be part of strength.',
          Merchant: 'Act certain all the time so no one sees your doubt or stress.',
          Student: 'Hide your stress so everyone keeps seeing you as successful.'
        },
        delta: 14,
        feedback: 'Keeping the mask intact becomes a daily strain.',
        reflection:
          'Loy compares the self to a mask that tries to hide its insecurity. Protecting that mask turns achievement into exhaustion and reinforces dukkha.',
        tag: 'attachment',
        path: { greed: 1, wisdom: 0, compassion: 0 },
        journal: 'You protected a fixed image, and the image began to control you.'
      },
      {
        text: 'Admit uncertainty and keep learning in public.',
        variants: {
          Prince: 'Acknowledge limits openly and let dignity include humility.',
          Merchant: 'Admit what you do not know and keep learning without shame.',
          Student: 'Be honest about pressure and allow yourself to keep learning in public.'
        },
        delta: -7,
        feedback: 'Honesty invites support and reduces pressure.',
        reflection:
          'This choice releases the need to appear fixed and complete. It reflects wisdom by treating the self as changing rather than something that must always be defended.',
        tag: 'release',
        path: { greed: 0, wisdom: 2, compassion: 1 },
        journal: 'You made room for a self that can change, learn, and remain human.'
      }
    ]
  },
  {
    id: 'future',
    art: 'assets/future.jpg',
    theme: 'Ambition and Intention',
    title: 'The Future Promise',
    text: 'You are offered a path toward a powerful future position. The opportunity could become meaningful effort or a trap of restless striving.',
    concept: 'ethics',
    focus: 'future',
    sourceLens:
      'Harvey is especially useful here: effort is not rejected, but the motive behind it matters. Skillful effort works without turning the future into a cage.',
    variants: {
      Prince: {
        text: 'You hear that a future leadership role may soon be open to you. It brings out both a sense of duty and a strong desire to secure your place.'
      },
      Merchant: {
        text: 'A big chance to grow your business appears. It could shape your future, but it could also take over your whole life.'
      },
      Student: {
        text: 'A prestigious opportunity suddenly feels possible. You start wondering whether your worth depends on getting it.'
      }
    },
    branchNotes: {
      growth: 'Because growth has guided some of your earlier choices, the future can still feel open rather than imprisoning.',
      security: 'Your earlier desire for safety makes this promise especially tempting.',
      duty: 'Duty can steady ambition, but only if it does not harden into self-importance.',
      control: 'The future increasingly looks like something you want to lock into place.'
    },
    choices: [
      {
        text: 'Fixate on the outcome and ignore today\'s needs.',
        variants: {
          Prince: 'Obsess over getting the position and push the rest of your life aside.',
          Merchant: 'Chase the opportunity so hard that everything else in your life becomes secondary.',
          Student: 'Treat the future goal as everything and ignore what you need right now.'
        },
        delta: 17,
        feedback: 'The future becomes a cage. The present feels hollow.',
        reflection:
          'Harvey emphasizes that motives shape the moral quality of action. Here ambition becomes unwholesome because it is driven by grasping rather than wise effort.',
        tag: 'attachment',
        path: { greed: 2, wisdom: 0, compassion: 0 },
        journal: 'You let the future become a test of worth, and the present narrowed around it.'
      },
      {
        text: 'Work steadily but stay open to change.',
        variants: {
          Prince: 'Prepare seriously, but do not cling to the outcome.',
          Merchant: 'Work hard, but do not let the outcome define you.',
          Student: 'Pursue the opportunity sincerely while staying open to other forms of growth.'
        },
        delta: -9,
        feedback: 'Effort remains, but anxiety loosens its grip.',
        reflection:
          'This is a more skillful action in Harvey\'s sense: effort remains, but without total attachment to results. Wisdom works with the future without being trapped by it.',
        tag: 'release',
        path: { greed: 0, wisdom: 2, compassion: 1 },
        journal: 'You stayed committed without turning the future into your only measure of self.'
      }
    ]
  }
];

const exclusiveScenarios = {
  Prince: {
    id: 'prince-exclusive',
    art: 'assets/prince_scene.jpg',
    theme: 'Duty and Shame',
    title: 'The Public Mistake',
    text: 'During a formal public event, you make a small mistake in front of others. The mistake is minor, but the embarrassment feels much bigger.',
    concept: 'anatta',
    focus: 'duty',
    sourceLens:
      'This scene deepens Loy\'s concern with identity. When honor becomes a rigid self-image, even a small public crack can feel unbearable.',
    branchNotes: {
      duty: 'Because duty has mattered to you, this mistake feels morally heavier than it really is.',
      honesty: 'Your honesty gives you a chance to treat the mistake as human rather than catastrophic.',
      approval: 'A strong desire for approval magnifies embarrassment into self-judgment.',
      control: 'The urge to control every impression makes one public crack feel dangerous.'
    },
    choices: [
      {
        text: 'Act even more formal and try to cover the mistake with pride.',
        delta: 15,
        feedback: 'The performance continues, but the tension hardens inside you.',
        reflection:
          'The self often responds to shame by becoming more rigid. This is another form of clinging to a defended identity.',
        tag: 'attachment',
        path: { greed: 1, wisdom: 0, compassion: 0 },
        journal: 'You hid a moment of shame behind performance, and the performance grew heavier.'
      },
      {
        text: 'Admit the mistake, recover calmly, and move on.',
        delta: -8,
        feedback: 'The error passes, and your dignity becomes less brittle.',
        reflection:
          'Humility here becomes a kind of wisdom. The self does not have to be perfect to remain worthy.',
        tag: 'release',
        path: { greed: 0, wisdom: 2, compassion: 1 },
        journal: 'You let dignity include imperfection instead of building a harsher mask.'
      }
    ]
  },
  Merchant: {
    id: 'merchant-exclusive',
    art: 'assets/merchant_scene.jpg',
    theme: 'Competition and Control',
    title: 'The Undercut Offer',
    text: 'A rival offers a lower price and pulls customers away from you. The loss affects your business, but it also feels personal.',
    concept: 'ethics',
    focus: 'competition',
    sourceLens:
      'Harvey is helpful here: the ethical issue is not competition itself, but whether the action is driven by grasping, harm, and delusion, or by skillful restraint.',
    branchNotes: {
      control: 'Your earlier leaning toward control makes this challenge feel harder to absorb.',
      security: 'Because security has mattered to you, a rival can feel like a threat to the self rather than only to profit.',
      honesty: 'An honest path makes it easier to separate loss from ego.',
      compassion: 'Compassion does not remove competition, but it can soften the urge to retaliate.'
    },
    choices: [
      {
        text: 'Damage the rival\'s reputation so you can get control back.',
        delta: 16,
        feedback: 'You recover some leverage, but the mind grows harsher and less settled.',
        reflection:
          'Harvey would call attention to motive here. A victory shaped by ill will strengthens the very roots that sustain suffering.',
        tag: 'attachment',
        path: { greed: 2, wisdom: 0, compassion: 0 },
        journal: 'You answered competition with aggression, and control became harder to put down.'
      },
      {
        text: 'Adjust honestly, improve your offer, and let go of getting even.',
        delta: -7,
        feedback: 'The pressure remains, but it stops swallowing your whole mind.',
        reflection:
          'This is closer to skillful action: effort without malice, discipline without self-poisoning.',
        tag: 'release',
        path: { greed: 0, wisdom: 2, compassion: 1 },
        journal: 'You met pressure with skill instead of revenge, and the mind stayed clearer.'
      }
    ]
  },
  Student: {
    id: 'student-exclusive',
    art: 'assets/student_scene.jpg',
    theme: 'Belonging and Comparison',
    title: 'The Shared Results',
    text: 'A set of results is posted publicly, and you immediately start comparing yourself to everyone else.',
    concept: 'dukkha',
    focus: 'belonging',
    sourceLens:
      'This scene joins Loy and Harvey: comparison feeds the insecure self, while wiser attention asks whether the mind is being shaped by craving or by growth.',
    branchNotes: {
      approval: 'Because approval has mattered earlier, comparison now lands with extra force.',
      growth: 'A growth-centered path helps you see results as information rather than identity.',
      honesty: 'Honesty lets you face disappointment without inventing a worse self-story.',
      compassion: 'Compassion widens the frame beyond competition and shame.'
    },
    choices: [
      {
        text: 'Obsess over your ranking and let it decide how you feel about yourself.',
        delta: 15,
        feedback: 'The numbers stay on the page, but they begin to live inside you.',
        reflection:
          'Dukkha here is not just the result itself. It is the way comparison turns a changing moment into a fixed story about who you are.',
        tag: 'attachment',
        path: { greed: 1, wisdom: 0, compassion: 0 },
        journal: 'You let comparison become identity, and the result followed you inward.'
      },
      {
        text: 'Look at the result honestly, learn from it, and do not let it define you.',
        delta: -8,
        feedback: 'The result still matters, but it no longer decides the meaning of your whole self.',
        reflection:
          'This choice practices both honesty and non-clinging. Growth becomes possible when the result is not mistaken for the self.',
        tag: 'release',
        path: { greed: 0, wisdom: 2, compassion: 1 },
        journal: 'You kept the result in perspective and protected your growth from comparison.'
      }
    ]
  }
};

function showScreen(name) {
  screens.forEach((screen) => {
    screen.classList.toggle('active', screen.dataset.screen === name);
  });
}

function updateMeter() {
  const value = Math.max(0, Math.min(100, state.suffering));
  meterBar.style.width = `${value}%`;
  meterValue.textContent = value.toString();
}

function updatePathQualities() {
  greedValue.textContent = `Greed ${state.greed}`;
  compassionValue.textContent = `Compassion ${state.compassion}`;
  wisdomValue.textContent = `Wisdom ${state.wisdom}`;
}

function getTone() {
  if (state.suffering >= 55 || state.greed > state.compassion + state.wisdom) {
    return 'tense';
  }
  if (state.compassion + state.wisdom >= state.greed + 3) {
    return 'calm';
  }
  return 'balanced';
}

function updateVisualState() {
  document.body.dataset.tone = getTone();
}

function getScenarioView(scenario) {
  const characterKey = state.character;
  const variant = scenario.variants?.[characterKey] || {};

  return {
    ...scenario,
    title: variant.title || scenario.title,
    text: variant.text || scenario.text,
    choices: scenario.choices.map((choice) => ({
      ...choice,
      text: choice.variants?.[characterKey] || choice.text
    }))
  };
}

function scrollInsightIntoView() {
  requestAnimationFrame(() => {
    insightPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function renderScenario() {
  const scenario = state.activeFlow[state.step];
  const view = getScenarioView(scenario);
  scenarioStep.textContent = `Step ${state.step + 1} of ${state.activeFlow.length}`;
  scenarioTheme.textContent = view.theme;
  scenarioTitle.textContent = view.title;
  scenarioText.textContent = view.text;
  sceneArt.src = view.art;
  sceneArt.alt = `Symbolic illustration for ${view.theme}`;
  feedbackEl.textContent = 'Make a choice to see the consequences.';
  nextBtn.disabled = true;
  state.choiceLocked = false;
  insightPanel.classList.remove('active');
  sourceMode.hidden = true;
  insightContent.hidden = false;
  sourceContent.textContent = view.sourceLens;

  choicesEl.innerHTML = '';
  view.choices.forEach((choice) => {
    const btn = document.createElement('button');
    btn.className = `choice ${choice.tag === 'release' ? 'release' : ''}`;
    btn.innerHTML = `
      <span class="icon">${choice.tag === 'release' ? '-' : '+'}</span>
      <span>${choice.text}</span>
    `;
    btn.addEventListener('click', () => handleChoice(choice, view));
    choicesEl.appendChild(btn);
  });

  showInsight(view.concept, false);
  updateVisualState();
}

function handleChoice(choice, scenario) {
  if (state.choiceLocked) {
    return;
  }

  state.choiceLocked = true;
  state.choices.push({
    scenarioId: scenario.id,
    tag: choice.tag,
    focus: scenario.focus
  });

  state.suffering += choice.delta;
  if (choice.tag === 'release') {
    state.letGo += 1;
  }

  state.greed += choice.path.greed;
  state.compassion += choice.path.compassion;
  state.wisdom += choice.path.wisdom;
  state.attachmentFocus[scenario.focus] = (state.attachmentFocus[scenario.focus] || 0) + 1;

  const journalEntry = `<strong>${scenario.theme}:</strong><br><span style="margin-left: 1em;">${choice.journal}</span>`;
  state.journal.push(journalEntry);

  updateMeter();
  updatePathQualities();
  updateVisualState();

  feedbackEl.innerHTML = `
    <strong>${choice.feedback}</strong>
    <p>${choice.reflection}</p>
  `;
  nextBtn.disabled = false;
  Array.from(choicesEl.querySelectorAll('.choice')).forEach((button) => {
    button.disabled = true;
  });

  sourceContent.textContent = scenario.sourceLens;
  showInsight(scenario.concept, true);
}

function showInsight(conceptKey, open = true) {
  if (!conceptKey || !concepts[conceptKey]) {
    return;
  }

  insightContent.innerHTML = `
    <h3>${concepts[conceptKey].title}</h3>
    <p>${concepts[conceptKey].text}</p>
    <p class="insight-source">${concepts[conceptKey].source}</p>
  `;
  sourceMode.hidden = true;
  insightContent.hidden = false;
  insightPanel.classList.toggle('active', open);
  if (open) {
    scrollInsightIntoView();
  }
}

function showSourceMode(text) {
  sourceContent.textContent = text;
  insightContent.hidden = true;
  sourceMode.hidden = false;
  insightPanel.classList.add('active');
  scrollInsightIntoView();
}

function getDominantAttachment() {
  const entries = Object.entries(state.attachmentFocus);
  if (!entries.length) {
    return 'undetermined';
  }

  entries.sort((a, b) => b[1] - a[1]);
  return attachmentLabels[entries[0][0]] || entries[0][0];
}

function getStrongestVirtue() {
  const generosity = state.letGo;

  if (generosity >= state.compassion && generosity >= state.wisdom) {
    return 'generosity';
  }
  if (state.compassion >= state.wisdom) {
    return 'compassion';
  }
  return 'wisdom';
}

function getPathPattern() {
  const totalChoices = state.choices.length || 1;
  const releaseRatio = state.letGo / totalChoices;

  if (releaseRatio >= 0.66) {
    return 'mindful effort';
  }
  if (releaseRatio >= 0.4) {
    return 'mixed motives';
  }
  return 'grasping and defense';
}

function renderJournalSummary() {
  journalSummary.innerHTML = state.journal.length
    ? state.journal.map((entry) => `<li>${entry}</li>`).join('')
    : '<li>No journal entries yet.</li>';
}

function endJourney() {
  const value = Math.max(0, Math.min(100, state.suffering));
  const attachment = getDominantAttachment();
  const virtue = getStrongestVirtue();
  const pattern = getPathPattern();

  finalSuffering.textContent = value.toString();
  letGoCount.textContent = state.letGo.toString();
  dominantAttachment.textContent = attachment;
  strongestVirtue.textContent = virtue;
  pathPattern.textContent = pattern;
  renderJournalSummary();

  if (value <= 35) {
    endTitle.textContent = 'Freedom Achieved';
    endReflection.textContent =
      'By loosening attachment, you reduced dukkha. Your path suggests that freedom grows when identity and desire are held more lightly.';
    endingReadings.innerHTML =
      '<p><strong>Loy</strong> helps explain this result: the self becomes less anxious when it stops trying to secure itself through possessions, image, or control.</p><p><strong>Harvey</strong> helps frame the ethical side: your repeated choices cultivated compassion and wisdom rather than grasping.</p>';
  } else if (value <= 70) {
    endTitle.textContent = 'In Between';
    endReflection.textContent =
      'Some choices leaned toward release, while others protected a more insecure sense of self. The journey shows how mixed motives create mixed results.';
    endingReadings.innerHTML =
      '<p><strong>Loy</strong> would point to the pressure of defending a constructed self.</p><p><strong>Harvey</strong> would note that your path contains real moments of skillful action, but they compete with habits of grasping.</p>';
  } else {
    endTitle.textContent = 'Still Attached';
    endReflection.textContent =
      'Clinging dominated the path, and suffering grew. The journey suggests that the search for security, recognition, or control hardened into greater unease.';
    endingReadings.innerHTML =
      '<p><strong>Loy</strong> argues that the insecure self tries to make itself real through attachment, but this only deepens dissatisfaction.</p><p><strong>Harvey</strong> would describe this as a path shaped more by grasping than by generosity, compassion, or wisdom.</p>';
  }

  showScreen('end');
}

function buildFlow(character) {
  return [...commonScenarios, exclusiveScenarios[character]];
}

function resetState(character) {
  state.character = character;
  state.suffering = 10;
  state.step = 0;
  state.letGo = 0;
  state.greed = 0;
  state.compassion = 0;
  state.wisdom = 0;
  state.attachmentFocus = {};
  state.choiceLocked = false;
  state.journal = [];
  state.choices = [];
  state.activeFlow = buildFlow(character);
  characterName.textContent = character;
  characterNote.textContent = characters[character].note;
  updateMeter();
  updatePathQualities();
  updateVisualState();
}

startBtn.addEventListener('click', () => {
  showScreen('characters');
});

backToHome.addEventListener('click', () => {
  showScreen('home');
});

characterGrid.addEventListener('click', (event) => {
  const card = event.target.closest('[data-character]');
  if (!card) return;

  resetState(card.dataset.character);
  renderScenario();
  showScreen('story');
});

nextBtn.addEventListener('click', () => {
  if (state.step < state.activeFlow.length - 1) {
    state.step += 1;
    renderScenario();
  } else {
    endJourney();
  }
});

insightBtn.addEventListener('click', () => {
  const scenario = state.activeFlow[state.step];
  if (!insightPanel.classList.contains('active') || sourceMode.hidden === false) {
    showInsight(scenario.concept, true);
    return;
  }

  insightPanel.classList.remove('active');
});

sourceBtn.addEventListener('click', () => {
  const scenario = state.activeFlow[state.step];
  if (!insightPanel.classList.contains('active') || sourceMode.hidden) {
    showSourceMode(scenario.sourceLens);
    return;
  }

  insightPanel.classList.remove('active');
});

closeInsight.addEventListener('click', () => {
  insightPanel.classList.remove('active');
});

restartBtn.addEventListener('click', () => {
  showScreen('home');
});

updateVisualState();
showScreen('home');
