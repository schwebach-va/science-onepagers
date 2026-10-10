# Build brief: animating the six redrawn figures

Six still diagrams, already drawn and verified, turned into six step-through animations on one page.

- **Brief version:** written 2026-10-10 in the DE Bio laboratories and Canvas project, the day the six stills were built. Reid asked for the animations and chose to hand the build to a Claude Code cloud session.
- **Who reads this:** the cloud session that builds the page. This file plus the artwork in `_briefs/figures/` is the whole spec.
- **Where it lives:** `_briefs/figure-animations.md` in `schwebach-va/science-onepagers`. The repo has no `.nojekyll`, so GitHub Pages skips folders starting with `_` and nothing in here is ever served. Do not add a `.nojekyll`.

> **Amended 2026-10-10, after Reid's review of Phase 1.**
> - **Type floor fixed at the source.** `style.py` had `T_MIN = 28` while its own docstring, `check.py` and §2 all say 29. The constant is now 29 and all six stills were re-rendered (SVG and PNG), so the PNGs match the screen and the next five animations inherit 29 from the start. The on-screen `.min` class is 29 units: 18.1 px on a 1000 px stage.
> - **Travel beats pixel-equivalence.** Where a traveller has moved, the final step differs from the still (on `gpcr`: the α subunit ends at phospholipase C, IP₃ ends seated in the ER channel, and the membrane PIP₂ shows the inositol hexagon that detaches as IP₃). Everything else is pixel-identical. T3 reports the percentage; it is not expected to be zero.
> - **Every step has its own link:** `?anim=<key>&step=<n>` (`?fig=` still accepted). `&runon=paused` opens the last step with the amplification run-on waiting on Play, for recording. The page keeps the URL current as the student moves.
> - **The run-on.** Pause stops it; Back or any step number clears it; a readout under the controls says so on screen.
> - **§8:** the six stills are served publicly as the sister images for lesson plans (copies under `biology/figures/`). Hub listings, sitemap, search index and Canvas links stay with Reid, in Cowork. The co-transcriptional splicing variant of `dogma` is held for later.
> - **Phase 2 is held** until Reid has watched `gpcr` on his iPad and computer and says it looks right.

---

## 0. The job, in one screen

> ## BUILD THIS IN TWO PHASES. STOP AFTER PHASE 1.
>
> **Phase 1 — the pilot.** Build the page skeleton, the selector, the control bar, the step engine,
> the level switch, the storage layer, the test hook — and **exactly one animation: `gpcr`.** The
> other five figures appear in the selector, disabled, labelled "coming next". Run the §7 tests
> against `gpcr` only. Commit, push the branch, report, and **STOP**.
>
> **Phase 2 — the other five.** Only after Reid has reviewed Phase 1 and said to continue. By then
> the engine exists and each remaining figure is a repetition against it.
>
> **Why.** `gpcr` is the hardest and the most important of the six — six steps, the amplification
> beat, a membrane, an organelle and mobile molecules — so a page that does `gpcr` well can do the
> rest. It is also the first one Reid needs in class, on 9 and 10 November. Splitting here means he
> finds out early and cheaply whether the approach is right, instead of after six figures of drift.
> Do not get ahead of this and build more than one animation in Phase 1, however easy the others
> look once the engine runs.

1. Build **one new file**: `biology/tools/mechanism-reel.html`. Permanent URL
   `https://scienceonepagers.org/biology/tools/mechanism-reel.html`. Working title **"The Mechanism Reel"**,
   eyebrow **Bio Tool #22**. (Highest live Bio Tool on 2026-10-10 was #21. Confirm against the live
   hub and say in your report what you found; if #22 is taken, use the next free number and say so.
   Do not edit the hub.)
2. It holds **six animations, one per figure**, chosen from a selector, each deep-linkable:
   `?fig=gpcr`, `?fig=rtk`, `?fig=transport`, `?fig=etc`, `?fig=dogma`, `?fig=cloning`.
   Each one is **self-contained** — it can be dropped into its own Canvas unit alone and make
   sense — but the selector presents them in one deliberate order, **signal to cell effect**, with
   a one-line bridge between each pair. See §3.
3. Self-contained: one file, plain HTML/CSS/JS, no build step, no framework, no external script.
   Google Fonts is the only external request, loaded the way `biology/tools/water-patch.html` loads it.
4. **Do not edit any existing file.** Not the hubs, not `sitemap.xml`, not `search-index.js`, not
   `search.html`, not `style.css`. Listing and search come later, after Reid reviews.
5. Commit on a new branch and push that branch. **Do not merge, do not open a PR unless Reid asks.**
   Suggested branch `claude/mechanism-reel`; use the session's own working branch if it assigns one,
   and say which you used.
6. Test with Playwright and Chromium at **1180 x 820** (iPad landscape, the primary target) and
   **390 x 844** (phone). Report every acceptance test in §7 as PASS or FAIL with a one-line reason
   for each FAIL. **Assert programmatically wherever §7 says so, and take screenshots only where it
   asks for one** — see the note at the head of §7. Screenshots are the most expensive thing you can
   do; do not take one to check something the DOM can answer.
7. Nothing publishes without Reid.

**If `git push` is refused** ("not in this session's authorized repository set"), do not hunt for a
workaround. Keep the commit, quote the refusal, and stop. The fix is to restart the task from
claude.ai/code with `schwebach-va/science-onepagers` selected as the repository.

## 1. The artwork you are animating

`_briefs/figures/` holds, for each of the six:

| key | file stem | figure | steps |
|---|---|---|---|
| `gpcr` | `01-gpcr-pathway` | A receptor that never lets the signal in | 6 |
| `rtk` | `02-receptor-tyrosine-kinase` | Two halves, then several answers at once | 4 |
| `transport` | `03-channel-and-pump` | Downhill is free. Uphill is paid for. | 2 (side by side, not a sequence) |
| `etc` | `04-electron-transport-chain` | Electrons buy a gradient. The gradient buys the ATP. | 6 |
| `dogma` | `05-central-dogma` | One message, written out and then read aloud | 6 |
| `cloning` | `06-cloning-a-gene` | Cut both with one enzyme and the ends fit | 5 stages, 3 legend steps |

Each one as `.svg` (live text, the master) and a 1600 px `.png` (the reference render — the animation's
final frame must match it). `_briefs/figures/_source/` holds the Python generators that produced
them: `style.py` carries the palette, the bilayer builder, the chemistry-subscript helper and the
legend strip; `fig1_gpcr.py` … `fig6_cloning.py` build each figure; `check.py` is the type-and-overlap
validator; `render.sh` renders a PNG with headless Chromium.

**Read `_source/style.py` first.** It is the shortest complete statement of the house style and it
names every colour, size and shape rule the animations must keep.

**Rebuild each figure as inline SVG in the page.** Do not `<img>` the SVG files and do not inline them
verbatim: you need `id`s and groups on the things that move. The easiest honest route is to port each
`fig*.py` into the page's JS as a function that emits the same SVG with ids, or to hand-transcribe the
SVG and add ids. Either way the **final step of every animation must be pixel-equivalent to the
delivered PNG** — same positions, same colours, same labels. That is an acceptance test.

## 2. The non-negotiables from the stills

These came from Reid and are already true of the artwork. Keep them.

- **The four classes, always:** carbohydrate `#C98A2E`, protein `#1F7A8C`, lipid `#B85042`,
  nucleic acid `#6B4E8C`. Plus the Membrane Patch shading: phosphate head `#A33A2B`, tail `#E0A070`,
  protein top `#5CA9B8`, protein side `#18606E`, sodium `#BFA58A`, potassium `#8595AB`,
  calcium `#7A6E97`, the "this happens" green `#3F7A55`.
- Paper `#F5F3EE`, card `#FFFFFF`, ink `#1D1A15`, soft ink `#5A544A`, rule `#DDD8CE`.
- Archivo for all labels. **Nothing below 15 pt at slide size, key labels 19 pt.** In the stills that
  is a type floor of 29 user units in a 1600 x 1000 viewBox. Hold the same floor on screen: no label
  under 18 CSS px at a 1000 px-wide stage.
- **Component level, never atomic.** Hexagon = sugar, circle = amino acid or phosphate, pentagon =
  five-carbon sugar or nucleotide, rounded rect = base or protein, capsule = fatty-acid tail.
- **One idea per figure.** The animation does not get to add a second one.
- The level name is **"SOL Bio"**, never "9th Grade SOL Bio".

## 3. The arc, and the three things every animation is about

Reid's direction, 2026-10-10: *move from signal through the pathways to cell effects*, with the
emphasis on **amplification, movement and energy transfer**, and on the memorable physical events —
the concentration gradient, the proteins, the lipids, the second messengers. Pitched for an
introductory college student who wants the mechanism, without going deeper than that.

**The order in the selector**, with its bridges:

| # | key | what it is in the arc | bridge to the next |
|---|---|---|---|
| 1 | `gpcr` | A signal arrives and is never let in | "A different kind of receptor answers in more than one way at once." |
| 2 | `rtk` | The same job, done by a receptor that answers several ways | "Both of those end in things moving across a membrane." |
| 3 | `transport` | What it costs to move something across | "Moving things uphill runs on ATP. Here is where the ATP comes from." |
| 4 | `etc` | Where the cell's energy actually comes from | "A signal can also reach all the way to the genes." |
| 5 | `dogma` | The cell's slowest, largest response: new protein | "And here is how we borrow that machinery ourselves." |
| 6 | `cloning` | What we do with all of it | — |

The bridge is one line of text under the selector, not a transition animation. The six stay
independent; the order is the teaching, not the plumbing.

### The three through-lines

Name them in the interface, consistently, so a student meets the same three ideas six times.
A small tag sits beside the title of each animation showing which of the three it is about.

**Amplification — `gpcr`, `rtk`, `dogma`.** One input, an enormous output. This is the single most
important thing an animation can show that a still cannot, and it is the reason a hormone at a
vanishingly small concentration can change a whole cell.

> **Reid's decision, 2026-10-10: show it visually, with no numbers on screen.** One ligand lands.
> One G protein switches on. Then phospholipase C keeps running and IP3 keeps appearing until the
> cytosol is crowded with it, and calcium floods in. The student should *feel* the scale rather than
> read a figure for it. **Do not put counters, tallies or orders of magnitude on the screen.**

How it reads in each:
- `gpcr` — after step 4 the enzyme does not cut once; it keeps cutting. IP3 accumulates visibly, the
  ER channel opens, and the cytosol fills with calcium. One signal molecule is still sitting on the
  receptor, untouched, the whole time. That contrast is the beat: **keep the original ligand on
  screen and unchanged while the inside fills.**
- `rtk` — amplification by branching rather than by number: one bound pair, three relays, three
  responses, and each response arrow continues off the edge of the frame to suggest what each
  branch goes on to do.
- `dogma` — one gene, several mRNA copies leaving the nucleus, and each one read by more than one
  ribosome. End the animation with two or three ribosomes on the same mRNA, each with its own
  growing chain. Same idea, different currency.

**Movement — all six, but it is the story in `transport` and `dogma`.** Nothing in a cell is
delivered; everything arrives by moving, and the animation should make the *route* visible. Keep
every traveller continuously visible along its path — never fade something out at A and in at B.
The dashed IP3 path in `gpcr`, Q and cytochrome c shuttling in `etc`, the mRNA through the pore in
`dogma`, the gene fragment finding the opened plasmid in `cloning`: in each case, the thing travels.

**Energy transfer — `transport`, `etc`, and the ATP beat in `rtk`.** Where ATP is spent, show it
being spent: the pentagon splits, a phosphate leaves, and the thing that was paid for happens
immediately afterwards, never simultaneously. Order matters here — payment, then result.

### The memorable physical events

These are the things a student should still be able to picture in May. Give each one its own
unhurried beat, slower than the steps around it, and do not let anything else move during it:

1. the **concentration gradient** visibly thinning on one side as the pump works (`transport`);
2. the **proton crowd** above the membrane thickening, then draining through the synthase (`etc`);
3. **PIP2 splitting in two**, one half staying in the membrane and one half leaving (`gpcr`);
4. **calcium flooding** out of the ER (`gpcr`);
5. the **two sticky ends meeting** and the seals appearing (`cloning`);
6. the **anticodon seating on its codon** before the amino acid transfers (`dogma`).

## 3b. How an animation behaves

**A step is a state, not a movie.** Each figure is a short series of states; moving between two
adjacent states is a transition. This is what makes it teachable: Reid can stop on any state and talk.

- Transition 600–900 ms, ease-in-out. Animate **`transform` and `opacity` only** — an iPad will
  drop frames on anything else.
- Use CSS transitions or the Web Animations API. **No SMIL** (`<animate>`, `<animateTransform>`):
  support is uneven and it cannot be scrubbed.
- **`prefers-reduced-motion: reduce`** → jump straight between states with no tween. Every caption,
  label and control stays. Test this; it is an acceptance test.
- Going backwards must work and must look right. Build states as absolute positions, not as
  accumulated deltas, so step 4 looks the same whether you arrived from 3 or from 5.

**The controls, matching the house pattern** (`membrane-patch.html` and `water-patch.html`):

- A row of **step dots**. Any dot opens its step directly. **A dot lights only when its step has been
  finished** — Reid set this rule on 9/22 and teaches from it live.
- **Play / pause**, and a **next** button. The next button the student is meant to press gets a
  **throbbing lime-green / chartreuse ring** — Reid's standing pattern across the tools, because the
  sequence of what to press is the part students lose.
- **Predict before you press.** Before each transition plays, the card shows a one-line prediction
  prompt and the student taps to reveal. This is the Membrane Patch rule and it is what makes the
  thing a tool rather than a video.
- **Teaching view** toggle: shows all captions at once and no prompts, for projecting.
- **Fill screen** toggle.
- The stage stays **pinned** while the card scrolls, on narrow screens; side by side at ≥900 px.
- `localStorage` under key `mechreel`, per figure, in try/catch. The page must render correctly when
  storage throws or returns nothing.

**Captions are already written.** Each still carries a numbered legend strip — those sentences are the
step captions, verbatim. Do not rewrite them. The figure's title is the animation's title and its
footer line is the closing caption.

## 4. What moves, figure by figure

**In Phase 1 you build only `gpcr`.** Read the rest so the engine you write can carry them, but do not build them yet.

Only the listed things move. Everything else holds still; a figure where everything drifts is unreadable.

**`gpcr` — 6 steps.** 1 The signal molecule descends and seats on the receptor. 2 The receptor's ribs
shift; the G protein's α subunit separates from βγ, and GDP flips to GTP. 3 α travels along the inside
face to phospholipase C. 4 PIP₂ splits: the three phosphate circles and the hexagon detach as IP₃ and
move off; DAG stays. 5 IP₃ crosses the cytosol along the dashed path and seats in the ER channel; the
channel opens. 6 Calcium ions rise from the lumen through the channel and scatter into the cytosol;
the green response box fades up. **Then do not stop.** Phospholipase C keeps cutting, IP3 keeps
appearing, and calcium keeps coming until the cytosol is visibly crowded — while the one signal
molecule sits on the receptor, unchanged, the whole time (§3, amplification).

**`rtk` — 4 steps.** The still already shows four stages side by side. The animation shows **one**
receptor pair moving through them in place: 1 two halves apart, ligands descending. 2 the halves slide
together and the ligand bar joins. 3 ATP arrives, the six tyrosines fill in one after another, each
with its phosphate circle, and ADP leaves. 4 three relay proteins arrive and dock, and the three
responses fade up in sequence, each response arrow continuing off the right edge of the frame to
suggest what that branch goes on to do (§3, amplification by branching). Then the DE-level closing
state from §6: the same pair, already joined, no ligand.

**`transport` — 2 steps, and a loop.** Not a sequence: the two panels run as independent loops. Left,
the signal lands, the gate opens, and sodium ions fall inward — then it resets. Right, the pump cycles:
three sodium up and out, ATP splits, two potassium down and in — then it resets. A single **Run both**
control starts them together, which is the whole point of the figure: the left loop costs nothing and
the right one burns an ATP every turn. Put a small ATP counter on the right that ticks up, and none
on the left.

**`etc` — 6 steps.** 1 NADH and FADH₂ hand electrons in; the green path lights from the left.
2 The electrons travel: Q carries them from I to III, cytochrome c from III to IV, along the drawn
path. 3 At each of complexes I, III and IV a proton rises through the complex and joins the crowd
above — Complex II visibly does not pump. 4 Oxygen takes the electrons at IV and water appears.
5 The crowd above thickens, then protons fall back through ATP synthase. 6 The synthase head turns
and ADP + P becomes ATP. Steps 3 and 5 are where the gradient must visibly build and then drain;
make the proton density above the membrane actually change.

**`dogma` — 6 steps.** 1 RNA polymerase slides right along the DNA and the pre-mRNA grows behind it.
2 The introns are already visible in the copy. 3 Cap and tail attach; the two introns loop out and
vanish; the exons close up. 4 The mRNA travels right and through the nuclear pore. 5 The ribosome
assembles around it; a tRNA arrives, its anticodon seats on a codon, and the ribosome advances one
codon. 6 The amino acid transfers to the growing chain and the chain lengthens; repeat the tRNA cycle
two or three times. **Then widen out:** a second and third mRNA copy leave the nucleus, and a second
and third ribosome join the first on the same strand, each with its own growing chain (§3,
amplification in a different currency: one gene, many proteins).

**`cloning` — 5 stages.** 1 Plasmid and donor DNA, the red cut sites marked. 2 The enzyme descends and
both pieces open, leaving the four-base overhangs. 3 The gene fragment travels to the opened plasmid,
the overhangs meet, and the two green seals appear. 4 The recombinant plasmid travels down into the
bacterium. 5 The plate fills in: colonies appear one by one.

## 5. Levels

Two figures serve two courses and get a **SOL Bio / DE Bio** switch, defaulting to SOL Bio:

- `transport` — SOL Bio: "sodium", "the pump", "with the gradient" / "against the gradient".
  DE Bio: "Na⁺", "Na⁺/K⁺-ATPase", "down the electrochemical gradient", and the 3:2 stoichiometry named.
- `dogma` — SOL Bio: "copy", "cut out the introns", "the ribosome reads three bases".
  DE Bio: "transcription", "splicing", "codon and anticodon", "5′ to 3′".

The other four are DE-level only; show no level switch on them rather than showing a dead one.

## 6. One thing to leave alone, and one to offer

**Leave alone.** Reid reviewed all six stills on 2026-10-10 and settled five questions, choosing the
drawn version every time: no ATP tally on `etc`; no cAMP branch drawn on `gpcr`; no 5' and 3' labels,
promoter or template strand on `dogma`; generic Relay A/B/C on `rtk`; ligand-gated sodium on
`transport`. **Do not re-open any of these.** Where a choice is between more content and more
legibility, he takes legibility.

**One change he did make.** The `rtk` still now carries a two-line note at lower left: *"Some of
these receptors are already paired before the signal arrives; it reshapes it."* That is the current
structural picture (Zuo 2026). **Carry the note into the animation** as a final, optional state at
the DE level: the same dimer, already joined, with no ligand, and one line saying the signal changes
the shape of a pair that already exists. It comes after the four numbered steps and is not part of
the count.

**Offer, do not build.** The literature check found one thing an animation could fix for free: in a
real nucleus most splicing happens *while* the RNA is still being transcribed, not after the copy is
finished (Reimer, Mimoso, Adelman & Neugebauer 2021, *Mol Cell* 81:998–1012,
doi:10.1016/j.molcel.2020.12.018). The still cannot show overlapping events; an animation can. Build
`dogma` steps 1–3 **as drawn, in order**, and in your report propose, as a separate follow-up job, a
DE-level variant where the first intron loops out while the polymerase is still moving. Reid decides.

## 7. Acceptance tests

**How to test, and what it costs.** Screenshots are by far the most expensive thing a test run does,
and almost nothing here needs one. The DOM already knows every answer: `getComputedStyle` knows the
font sizes and colours, `getBoundingClientRect` knows the positions and the overflow,
`getAnimations()` knows what is animating and which properties, and a test hook knows the state.
**Default to a programmatic assertion. Take a screenshot only where the table below says SHOT, and
for any FAIL** — a failing test earns one image so Reid can see what went wrong.

**Build the test hook first**, following the house pattern (`window.__WP` in the Water Patch,
`window.__SP` in the Signal Patch). Expose `window.__MR` with at least:

```
__MR.fig()            current figure key
__MR.setFig(k)        switch figure
__MR.step()           current step index
__MR.goStep(i)        jump to a step
__MR.steps()          number of steps in this figure
__MR.done(i)          has step i been finished
__MR.level()          "sol" | "de"
__MR.setLevel(l)      switch level
__MR.labels()         every rendered label: {text, px, x, y, w, h}
__MR.colours()        every fill and stroke in use, as hex
__MR.state()          the serialisable animation state, for the reference comparison
__MR.reduced()        is reduced-motion honoured
```

Everything in the table below except T3 is then a few lines of assertion with no image at all.

| # | Test | How to check | Shot? |
|---|---|---|---|
| T1 | Six figures reachable from the selector and from their six `?fig=` deep links | Load each deep link, assert `__MR.fig()`. In Phase 1 the five disabled entries assert as disabled, not missing | no |
| T2 | Every step reachable forward, backward, and by tapping its dot | Walk `goStep` 0→n→0, then click each dot; assert `__MR.step()` each time | no |
| T3 | **The final step matches the reference PNG** | The one real visual test. Screenshot the stage at the final step, compare against `_briefs/figures/<stem>.png`. Report the pixel-difference percentage and attach the side-by-side | **SHOT** |
| T4 | No label below 18 CSS px at a 1000 px stage | `__MR.labels()`, assert `min(px) >= 18`, every figure, every step, both levels. Report the minimum found | no |
| T5 | A dot lights only after its step is finished | Assert `__MR.done(i)` against the dot's class at each step | no |
| T6 | The chartreuse ring is on the next control, and on only one control | Count elements carrying the ring class; assert exactly 1 and that it is the next control | no |
| T7 | Predict-before-press appears before every transition and dismisses on tap | Assert the prompt element exists before each transition and is gone after a tap | no |
| T8 | `prefers-reduced-motion: reduce` → no tweens, captions intact, every step reachable | Emulate the media feature; assert `getAnimations()` is empty during a transition, caption text unchanged, T2 still passes | no |
| T9 | Level switch changes wording on `transport` and `dogma`, absent on the other four | Diff the caption text across `setLevel`; assert the control is absent elsewhere | no |
| T10 | No horizontal overflow at 390 px | `document.scrollWidth <= innerWidth`, every figure, every step | no |
| T11 | Works with `localStorage` disabled or throwing | Stub it to throw; assert the page renders and T2 passes | no |
| T12 | No console errors beyond the blocked Google Fonts fetch | Collect console events; assert the filtered list is empty | no |
| T13 | Teaching view and Fill screen work on all six | Toggle each; assert the expected class and that captions are all visible in Teaching view | no |
| T14 | Only `transform` and `opacity` animate | During each transition, read `getAnimations()` and assert every animated property name is in `{transform, opacity}`. **This replaces eyeballing the frame rate** | no |
| T15 | The selector shows the six in §3's order, with the bridge lines | Read the selector's text content in DOM order; assert the sequence and that each bridge string is present | no |
| T16 | Amplification reads without numbers on `gpcr`, `rtk`, `dogma` | Regex the full rendered text of those figures at every step for a digit used as a count or an order of magnitude; assert none. Separately assert the `gpcr` ligand element is present and its transform is unchanged from step 1 to the last step | no |
| T17 | Each of the six memorable events gets its own slower beat | Assert the duration of those named transitions exceeds their neighbours', and that no other element has a running animation during them | no |
| T18 | Nothing fades out at one place and in at another | For each traveller, assert opacity never reaches 0 between its start and end states | no |
| T19 | Where ATP is spent, the split happens before what it pays for | Assert the ATP transition's end time is at or before the start time of the transition it funds | no |
| T20 | The `rtk` already-paired note is on the still and as the DE closing state | Phase 2. Assert the note text is present in the DE closing state | no |

**So a clean run produces one screenshot per figure** — the T3 comparison — **plus one per FAIL.**
In Phase 1 that is a single screenshot if everything passes.

Report the table verbatim with PASS or FAIL in a column, a one-line reason for each FAIL, and the
measured minimum label size from T4 and the pixel-difference percentage from T3 even when they pass.

## 8. After the build, for Reid

**First, the Phase 1 review gate.** When Phase 1 reports, Reid looks at the `gpcr` animation and the T3 comparison and decides three things: does the engine feel right on an iPad; is the amplification beat doing what §3 asks; and should Phase 2 run as one job or in batches. Nothing below happens until Phase 2 is finished.

These are **not** part of this job. List them in the report:

- confirm the tool number and title;
- list it on `biology/classroom-tools.html` and `biology/de-biology-101-resources.html`, in ascending
  tool-number order within each unit, with a per-unit gloss;
- add one `<url>` block to `sitemap.xml` and one entry to `search-index.js`;
- decide whether the six static SVGs and PNGs should also be served publicly, and from where;
- link it in the Canvas unit modules, which Reid does himself;
- the co-transcriptional splicing variant of `dogma`, if he wants it.

## 9. Rights — carry these through, do not weaken them

The six stills are **Reid's own work, independently created on 2026-10-10**: drawn from the published
mechanism, in code, from scratch. No published figure was traced, scanned, copied or adapted, and no
figure from any book was consulted as a layout. Every SVG carries that statement in a `<metadata>`
RDF block and in its `<desc>`; every PNG carries it in its metadata chunks; the generator scripts in
`_source/` are the record of independent creation.

The animations are derivative works **of Reid's own stills**, so they are his too. Keep it that way:

1. The page footer asserts `&copy; J. R. Schwebach` and links CC BY-NC 4.0, exactly as every other
   tool page does. Do not drop it, and do not substitute a different licence.
2. **Carry the credit line into each animation.** Every still ends with
   `© 2026 J. R. Schwebach . CC BY-NC 4.0 . drawn from the mechanism, not from any published figure`.
   Keep that line visible on the final state of each animation, at the same size as the stills set it.
3. Put the same rights and origin statement in the page's own `<meta name="author">`, a
   `<meta name="copyright">`, and the JSON-LD block (`"license"`, `"author"`, `"isAccessibleForFree"`),
   matching `biology/tools/water-patch.html`.
4. **Introduce no outside artwork.** No stock icons, no clip art, no SVG lifted from anywhere, no
   image search, no "reference" figure from a textbook, a website or a paper — including the papers
   cited on `biology/figure-sources.html`. Everything you draw must come from the geometry already in
   `_source/` or from shapes you construct yourself. If you think a figure needs an element that is
   not already in the stills, say so in the report and leave it out.
5. **Introduce no outside code** beyond what the house pattern already uses. No framework, no CDN, no
   copied snippet carrying its own licence.
6. Do not describe the figures anywhere in the page, the commit message or the report as redrawn
   from, based on, or adapted from any earlier published figure. They were not. They were drawn from
   the mechanism.
