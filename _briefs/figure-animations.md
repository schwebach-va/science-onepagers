# Build brief: animating the six redrawn figures

Six still diagrams, already drawn and verified, turned into six step-through animations on one page.

- **Brief version:** written 2026-10-10 in the DE Bio laboratories and Canvas project, the day the six stills were built. Reid asked for the animations and chose to hand the build to a Claude Code cloud session.
- **Who reads this:** the cloud session that builds the page. This file plus the artwork in `_briefs/figures/` is the whole spec.
- **Where it lives:** `_briefs/figure-animations.md` in `schwebach-va/science-onepagers`. The repo has no `.nojekyll`, so GitHub Pages skips folders starting with `_` and nothing in here is ever served. Do not add a `.nojekyll`.

---

## 0. The job, in one screen

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
   for each FAIL. Attach screenshots of every figure at its final step.
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

Report each as PASS or FAIL.

1. Six figures reachable from the selector and from their six `?fig=` deep links.
2. For each figure: every step reachable forward, backward, and by tapping its dot.
3. For each figure: the **final step matches the reference PNG** in `_briefs/figures/` — same elements,
   same positions, same colours, same label text. Attach a side-by-side.
4. No label renders below 18 CSS px at a 1000 px-wide stage, on any figure, at any step, at either level.
5. A dot lights only after its step has been finished, never before.
6. The next-step control carries the chartreuse throbbing ring, and only one control has it at a time.
7. Predict-before-press appears before every transition and can be dismissed by tapping.
8. `prefers-reduced-motion: reduce` → no tweens, all captions and controls intact, every step reachable.
9. Level switch changes wording on `transport` and `dogma` and is absent on the other four.
10. No horizontal overflow at 390 px on any figure at any step.
11. Works with `localStorage` disabled or throwing.
12. No console errors beyond the sandbox's blocked Google Fonts fetch.
13. Teaching view and Fill screen both work on all six.
14. Runs at a steady frame rate on the 1180 x 820 target — no transition animating anything but
    `transform` and `opacity`.
15. The selector presents the six in the signal-to-effect order of §3, with its bridge lines.
16. Amplification reads without numbers on `gpcr`, `rtk` and `dogma`: no counter, tally or order of
    magnitude appears anywhere on screen. On `gpcr` the original ligand stays visible and unchanged
    while the cytosol fills.
17. Each of the six memorable events in §3 gets its own beat, slower than its neighbours, with
    nothing else moving during it.
18. Nothing fades out at one place and in at another: every traveller stays visible along its route.
19. Where ATP is spent, the split happens *before* the thing it pays for, never at the same time.
20. The `rtk` already-paired note appears on the still and as the DE-level closing state.

## 8. After the build, for Reid

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
