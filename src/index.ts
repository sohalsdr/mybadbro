const sorries = [
    // short apologies
    "oops",
    "oopsie",
    "whoops",
    "woopsie daisy",
    "soz",
    "sowwy",
    "mb",
    "my bad",
    "my bad my bad my bad",
    "sorry sorry sorry sorry",

    // ownership
    "that's on me",
    "my fault fr",
    "ok that one's my fault",
    "I did that",
    "I have erred",
    "apologies in advance",
    "apologies in retrospect",
    "a thousand pardons",
    "pardon my mistake",
    "forgive me",

    // disappointment
    "oh no",
    "oh noooooo",
    "ohhhh no no no",
    "yikes",
    "yikes on bikes",
    "welp",
    "well that's not ideal",
    "well that sucks",
    "that's rough buddy",
    "big yikes",

    // reactions
    "bruh",
    "bruhhhhhhh",
    "bro what",
    "dude no",
    "nooooooooo",
    "nah",
    "nahhhhhh",
    "ugh",
    "ughhhhhhhh",
    "blegh",

    // minced oaths
    "sugar",
    "oh fudge",
    "fiddlesticks",
    "dagnabbit",
    "gosh darn it",
    "aw shucks",
    "aw heck",
    "heckin' oops",
    "oh biscuits",
    "great googly moogly",

    // cartoon exclamations
    "jinkies",
    "good grief",
    "oh my stars",
    "holy moly",
    "holy guacamole",
    "jeepers",
    "egads",
    "zoinks",
    "yeesh",
    "cripes",

    // doom
    "F",
    "press F",
    "rip",
    "it's over",
    "we're so back (not)",
    "we're cooked",
    "I'm cooked",
    "cooked",

    // more doom
    "I'm so fried",
    "I'm done for",
    "we're done for",
    "this is fine",
    "this is fine :)",
    "everything is fine",
    "nothing is fine",

    // understatement
    "that did not go as planned",
    "plan did not plan",
    "the plan has failed",
    "slight miscalculation",
    "minor setback (major)",
    "technically a mistake",
    "a mistake was made",
    "mistakes were made",
    "errors were made",
    "regrettably so",

    // mock-formal
    "unfortunate",
    "most unfortunate",
    "how unfortunate",
    "deeply unfortunate",
    "tragic",
    "a tragedy",
    "a travesty",
    "a shame",
    "shame on me",
    "shame shame shame",

    // regret?
    "I regret everything",
    "I regret this",
    "bad idea",

    // corporate
    "my apologies, esteemed colleague",
    "please accept my apology",
    "humblest apologies",
    "a formal apology",
    "official apology issued",
    "apology.pdf attached",
    "per my last mistake",
    "as per my previous error",
    "circling back on my mistake",

    // oh ___
    "oh god",
    "oh geez",
    "oh jeez",
    "oh boy",
    "oh brother",
    "oh dear",
    "oh dear oh dear",
    "oh my",
    "oh wow",
    "oh wow ok",

    // stalling
    "ok so",
    "ok so that happened",
    "ok so about that",
    "so uh",
    "so um",
    "uhhhh",
    "uhhhhhh",
    "um",
    "ummmmmm",
    "erm",

    // confusion
    "hmmmm",
    "hmmmmmm bad",
    "that's not supposed to happen",
    "that wasn't supposed to do that",
    "why did it do that",
    "what did I do",
    "what have I done",
    "what has been done",
    "...",
    "sigh",

    // pain
    "ouch",
    "ow",
    "ow my pride",
    "pain",
    "pain (emotional)",
    "suffering",
    "I am in pain",
    "this hurts",
    "hurts to look at",
    "hard to watch",

    // confessions
    "I messed up",
    "I messed up big",
    "I messed up bad",
    "I screwed up",
    "I goofed",
    "I goofed up",
    "I flubbed it",
    "I fumbled",
    "fumbled the bag",
    "dropped the ball",

    // broken
    "botched it",
    "bungled it",
    "butchered it",
    "ruined it",
    "broke it",
    "I broke it",
    "it broke",
    "it's broken",
    "it's so over",
    "womp womp"
]

export default {
  fetch: () =>
    new Response(sorries[Math.floor(Math.random() * sorries.length)], {
      headers: { "content-type": "text/plain; charset=utf-8" },
    }),
};
