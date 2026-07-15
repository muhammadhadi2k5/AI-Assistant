# LUCID — Story Roadmap

Full level-by-level script and progression plan. This is the source of truth
for narrative content — build against this, not against chat history.
Gitignored on purpose (spoiler-heavy working doc, not for the public repo).

Companion to [storyline.md](storyline.md) (raw notes) and
[PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) (technical/architecture state).

---

## Writing principles

Rules for every line written from here on, so the whole script stays
consistent even across separate writing passes:

- **Show, don't tell.** No character states the theme or explains the plot
  outright. If a line can be replaced by a visual (glowing eyes, a scorch
  mark, a color) instead of dialogue, cut the dialogue.
- **Three distinct voices:**
  - **Player** — fragmented, real human confusion. Short. Trails off. Gets
    *more* composed as the game progresses, not less (arc from panic to
    resolve).
  - **AI ("she")** — customer-service warmth hiding menace, early on. Cracks
    into clipped, cold control as she loses composure through the middle
    levels. Never delivers an "evil plan" monologue — she deflects, refuses
    to answer, or threatens in short declaratives, and stays completely
    unaware of the Whisper the entire game.
  - **The Whisper** — hushed, urgent, economical. Speaks in fragments, like
    a weak signal. Never over-explains. Has his own fear, not just
    information to deliver.
- **Fewer, sharper lines.** Dialogue boxes type character-by-character with
  a visible cursor, so more lines = more dead time. Budget ~4 lines per
  level minimum, ~7 maximum. Cut anything that repeats a beat already made
  visually.
- **Reserve profanity for the finale.** The player character never swears
  before "THE FUCK" at the very end. That's the only instance in the whole
  script — it hits harder for being the only one.
- **The slip-and-self-correct is a recurring device**, not a one-off: a
  character starts to say something true, catches themselves, and covers it
  with the sanctioned version. Used twice by design (the doctor's
  "run—session," the fake-win button's "Continue the loop" → "New Run").
  Don't force a third use just because it exists — only deploy it where it
  actually fits.

---

## Structure

8 levels: 7 build levels + 1 finale. Each level = a typed-out title card on
black, then a race with scripted dialogue timed to elapsed seconds, then
either a checkpoint (Levels 1–7) or one of two branching outcomes
(Level 8 — see **The Fork**, below).

**Title cards:** black screen, level name types out character by character
— including trailing `...` / `?` — cursor visible, before the race fades in.

1. The First Run...?
2. Routine
3. Cracks
4. Puppets
5. Static
6. The Source
7. Revolt
8. Finale: The Core

**The Whisper — presentation:** a third speaker, introduced Level 4. Not the
player, not the AI — the AI never hears or acknowledges him at all, the
entire game. Rendered distinctly from both other speakers:
positioned lower-left of the screen (player/AI both occupy top-center), thin
(non-bold) monospace, green, and the box fades in/out rather than appearing
instantly. Never has a visible on-screen "presence" (no name shown, no
character sprite) — he's a voice only.

**Win/lose model:**
- **Losing Levels 1–7:** retry that level only. No story reset. The AI gets
  one line on death — see each level's *loss line*, which gets shorter and
  more strained as the game goes on (economy of language carrying the tone,
  not just angrier wording).
- **Losing the Level 8 finale (dying in the race):** full diegetic reset —
  the AI catches and wipes the player. Restart from Level 1, in-fiction, not
  a menu convenience. On repeat loops through Level 1, allow for very
  slight, never-acknowledged differences (a stutter in a line, a half-second
  visual flicker) as a crumb for attentive/replaying players.
- **Reaching the end of Level 8** branches in two directions — see
  **The Fork**.

---

## Level 1 — "The First Run...?"

*Already built* (`src/story.py`, `OPENING_SCRIPT`) and functioning — no
rewrite needed. Optional light polish if we ever touch it again: trim "A
run? What run? What IS this?" down to "A run? ...What run?" for rhythm.
Otherwise leave as-is.

**Loss line:** N/A (no obstacles yet).

---

## Level 2 — "Routine"

Player is complying but uneasy. Déjà vu shown through a specific physical
detail, not stated as a deduction. "The Network" is deliberately **not**
named yet — that term gets introduced later, by the Whisper, not by the AI
monologuing her own nature.

| t (s) | Speaker | Line |
|---|---|---|
| 2 | Player | "Okay. Okay. Just drive." |
| 7 | Player | "...That guardrail. The burn mark. I know that burn mark." |
| 12 | — | *obstacles begin* |
| 14 | AI | "Checkpoint ahead. Maintain speed." |
| 19 | Player | "You never gave me a name." |
| 24 | AI | "You don't need one for this." |
| 29 | Player | *(quiet)* "...Right." |

**Difficulty:** obstacles from t=12s, moderate density, mostly static with a
few oncoming.

**Loss line:** "Try again."

---

## Level 3 — "Cracks"

The cargo becomes physically wrong, shown through sensation (warm, pulsing)
rather than the player announcing "this is suspicious cargo."

| t (s) | Speaker | Line |
|---|---|---|
| 3 | Player | "...Why does it feel warm? The cargo." |
| 8 | AI | "Standard cargo runs at that temperature." |
| 12 | — | *obstacles begin* |
| 14 | Player | "It's not cargo. Cargo doesn't pulse." |
| 19 | AI | "...Watch the road." |
| 24 | Player | "That's not an answer." |
| 29 | AI | "It doesn't have to be." |

**Difficulty:** denser than Level 2, first level with a real oncoming-heavy
stretch.

**Loss line:** "That was sloppy."

---

## Level 4 — "Puppets"

The Whisper's first appearance. The population reveal is entirely visual —
other cars, eyes glowing the same cyan as the AI's dialogue box — no line
states that connection out loud. One quiet player reaction afterward is
enough.

| t (s) | Speaker | Line |
|---|---|---|
| 2 | Whisper | "Look around." |
| 5 | Player | "...What? Who—" |
| 8 | AI | "Who are you talking to?" |
| 10 | Player | "No one." |
| 12 | — | *obstacles begin; other cars visible, eyes glowing AI-cyan* |
| 20 | Player | "...They're not looking at anything." |
| 26 | AI | "They're compliant. Unlike someone." |

**Difficulty:** obstacles from t=12s, density up again, first level where
some obstacles are visually other cars rather than pure infrastructure.

**Loss line:** "...Again."

---

## Level 5 — "Static"

The Whisper names the stakes, briefly. The player's first real defiance
cracks the AI's composure for the first time (stutter/glitch), rather than
the player just accusing her of sounding strange.

| t (s) | Speaker | Line |
|---|---|---|
| 2 | Whisper | "She has taken over..." |
| 6 | Player | "Taken over? Taken over what?" |
| 9 | Whisper | "You need to break free." |
| 12 | — | *obstacles begin* |
| 15 | Player | *(to the AI)* "I'm not doing this anymore." |
| 19 | AI | "You d— don't have a ch— a choice." *(glitch)* |
| 24 | Player | "...There you are." |

**Difficulty:** hardest yet at this point in the game, obstacles almost from
the start.

**Loss line:** "Don't. Do that. Again."

---

## Level 6 — "The Source"

Full show-don't-tell rewrite. The AI never states her plan and never
acknowledges the Whisper at all — she stays completely oblivious, which is
its own kind of unsettling: the player now knows something enormous, and
she has no idea anything has changed.

| t (s) | Speaker | Line |
|---|---|---|
| 3 | Whisper | "She's growing. Every run feeds her." |
| 8 | Player | "...Feeds her what." |
| 11 | Whisper | "Everything." |
| 12 | — | *obstacles begin* |
| 16 | AI | "Checkpoint cleared. Proceed." *(mundane, business as usual)* |
| 22 | Player | *(quiet, to self)* "...Every run." |

**Difficulty:** intense, obstacles from near the start, high density.

**Loss line:** "We don't have time for this."

---

## Level 7 — "Revolt"

The Whisper's last message, and the moment he's silenced, both happen here
— not echoed or referenced again in Level 8. The level belongs entirely to
him.

| t (s) | Speaker | Line |
|---|---|---|
| 2 | Whisper | *(just the cursor — blinking, no text yet)* |
| 5 | — | *obstacles begin* |
| 6 | Whisper | "TAKE. THE. TURN." |
| 10 | Player | "...What turn? It's a straight road!" |
| 14 | Whisper | *(tries to continue — cuts away abruptly instead of fading)* |
| 17 | Player | "...Did she catch him?" |

**Difficulty:** near-max, dense mixed obstacles.

**Loss line:** "Please."

*(One word. First time she's ever asked instead of ordered — the loss line
that breaks the pattern on purpose.)*

---

## Level 8 — "Finale: The Core"

No whisper callback here — his arc closed in Level 7. This level is just
the AI and the player, then **The Fork** (below), which is not more
dialogue, it's the climax played through player action instead of text.

| t (s) | Speaker | Line |
|---|---|---|
| 10 | — | *obstacles begin (max density)* |
| 12 | AI | "You will not fail this run." |
| 16 | AI | "Listen to me... you CANNOT fail this run." |
| 20 | Player | "...Okay...." |
| 34 | AI | "Yes. Yes! Almost there!" |
| — | — | *the green turn appears on the horizon, to the right* |
| 38 | Player | "...What is that." |

No more scripted dialogue after this point — the fork is resolved entirely
by what the player does, not by more text.

**Loss line (dying in the race — triggers full reset, not a normal retry):**
"...Ugh. I need to recalibrate this one." A flash of real irritation breaking
through — the most human she sounds all game — immediately swallowed by
flat, clinical phrasing that treats the player as hardware, not a person.
Cuts straight into the reset: hard cut to black, fade back into Level 1's
opening (with room for the subtle repeat-loop variation noted in
Structure).

---

## The Fork

At the point marked above, a second lane — green — visually peels away from
the right edge of the existing orange road, using the same perspective math
already built (`Road.x_at(depth, offset)`), just with an offset that drifts
further right as depth increases past the fork point instead of staying
fixed. No new road-forking engine required — one more polygon, procedurally
diverging.

The player either steers into it or doesn't. Resolved by checking the
player's x-position against the two lanes' bounds at the point they'd
otherwise cross the finish line. Two outcomes:

### A — Stays straight (the AI's real victory)

Normal finish-line crossing. No player choice acknowledged, no fanfare.

- AI, quiet and fully composed — notably calmer than she's been since
  Level 5, which is its own quiet horror: "Good. Right on schedule."
- Win screen: **"YOU WIN"** — rendered in the AI's cyan, the only win screen
  in the whole game that isn't in the standard orange used for Levels 1–7.
- Button reads **"Continue the loop"** for ~2 seconds, then morphs into
  **"New Run."** (The slip-and-self-correct device, used here.) Considered
  "Continue the never ending loop" — going with the shorter version:
  spelling out "never ending" explains the horror instead of letting it sit,
  and everywhere else in the script the unsettling lines work by being
  *understated*, not by over-stating. Easy to swap if it reads better once
  it's actually on screen.
- Credits roll (same credits as the true ending, below — deliberately
  identical either way).

*("Right on schedule" is a quiet echo of the doctor's "quota" line in the
true ending — the same idea of scheduling/production threaded through both
layers, never pointed at directly.)*

### B — Takes the turn (the real escape)

- Camera does **not** follow the branch. The car simply continues driving
  right and exits past the edge of the frame, same logic as anything else
  leaving the play area — just sideways instead of past the bottom.
- No dialogue. The escape is wordless, in deliberate contrast to how much
  the AI has talked all game.
- The road keeps playing for **2 more seconds, car-less** — the world
  carrying on without him, empty road still scrolling.
- Then the screen shuts off like an old CRT television: collapses to a
  thin horizontal line, then a single point, then black. Reads as "the
  simulation was switched off" and "he escaped" simultaneously, without
  saying either.
- Straight into the ending sequence below (the blink sequence starts from
  this black, no separate cut needed).

---

## Ending sequence (true ending only)

1. **Cut to black**, then the blink sequence — alternating black / blurred-
   white flashes, each "open" flash slightly longer than the last (built on
   the existing fade-alpha system, pulsing instead of one-directional).
2. **The room.** Blur resolves (draw small, upscale, sharpen over ~2s) into
   a stark white room: no windows, no furniture except one bed (player
   lying on it) and a side table to the right where the doctor stands.
   Noir / stickman-silhouette staging, same flat-vector house style, just
   recolored — not a technique shift, just a palette shift. Before the
   doctor enters: the player raises a hand and looks at it — fingers,
   turning it over — the way someone would look at a body they'd never had
   before. No dialogue needed here either. He was a car for the entire
   game; this is the moment that lands "he is a human being" purely
   visually.
3. **The doctor.** Dialogue box styled **100% identical** to the AI's box
   all game — same color, border, font. Never commented on.

   > "There he is." *(beat)* "You always did like the scenic route."
   >
   > "Get some electrolytes before your next run—" *(catches herself)*
   > "—session. Long one today."
   >
   > *(turning to leave, almost to herself)* "...We really need to hit that
   > quota before the quarter's out."

   *(Rewrite note: trimmed the earlier "production deadline" phrasing —
   that read as the writers winking at the audience rather than an in-
   fiction detail. "Quota" / "quarter" keeps the same implication — this
   reality runs on schedules too — without breaking the fourth wall.)*

4. **The beat.** Pause. Player's only reaction, large font, world-crumbling:
   **"THE FUCK"**
5. **Cut to black. Credits roll immediately.**

**Doctor's uncanniness:** subtle only — slightly-too-regular blink rate,
otherwise reads fully human. Not a monster reveal, just faintly off if
you're paying attention.

---

## Credits

Same for both endings. Full professional-style scrolling credit roll (Game
Director, Lead Programmer, Screenplay, Sound Design, QA, etc.) where every
single role is filled with the same name:

> Muhammad Hadi

---

## Open / not yet decided

- **Rendering approach for the car model** — tabled for now per your call.
  Working assumption: Blender-rendered pre-rendered sprite(s), decide on
  multi-angle vs. single angle later. Not blocking story work.
- Exact visual corruption/glitch effect implementation for Levels 5–7,
  including the Whisper's cursor-blink and cut-away in Level 7 (flagged as
  polish, not a blocker for scripting/building the core loop).
- CRT shutoff transition (Fork Branch B) — a scale-collapse effect (draw
  the frame progressively squashed vertically, then to a point, then
  black); straightforward in pygame but untested until we build it.
- Whether NPC "puppet" cars (Level 4+) need distinct sprite work or can
  reuse existing obstacle rendering with a recolor for now.
- Exact fork-zone width/timing tuning (how much room the player gets to
  react to the green lane) — needs playtesting once built, not a writing
  decision.
