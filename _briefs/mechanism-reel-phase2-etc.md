# Phase 2, figure 4 of 6: `etc` (the electron transport chain), Bio Tool #26

Opened 2026-10-19 by Reid. Read with `_briefs/figure-animations.md` (the original brief, both round
amendments at its head), `_briefs/mechanism-reel-handoff.md` (§5 is the engine's figure API, §7 the
test suite) and `_briefs/mechanism-reel-transport-revision-1.md` (R5, R6). Those still govern. This
one opens the gate for **one figure** and settles the decisions specific to it.

`gpcr` (#22), `transport` (#25) and `dogma` (#27) are built and merged. The permanent numbers are
gpcr #22, rtk #24, transport #25, **etc #26**, dogma #27, cloning #28, numbered by the selector's
presentation order. #23 and #29 belong to other tools. Never renumber.

**Where this runs.** On Reid's Mac, in Claude Code on the local clone
`~/Documents/Claude/Projects/One Pagers/site-live`. Not a cloud session. The local preview is the
review surface: `npx http-server -p 8765 -s -c-1 .` from the repo root, then
`http://localhost:8765/biology/tools/mechanism-reel.html?anim=etc`.

## Why etc, and why now

- **SOL Bio Unit 3, Energy and Matter, opens Wed 10/21 (Purple) and Mon 10/26 (Black)** and runs
  into November. Cellular respiration is its second half, so a figure finished this week lands
  before the lessons that use it.
- The still is tagged `DE Bio 101 . Unit 7 . cellular respiration`; DE gets it later in the year
  at full depth.
- It is the centre of the arc's energy story (the bridge from `transport`: "Moving things uphill
  runs on ATP. Here is where the ATP comes from.") and the hardest figure left. The original brief
  ordered hardest first.
- The Energy Patch (Bio Tool #11) already covers photosynthesis and respiration at the whole-cell
  level. This figure is the zoom-in on the inner membrane; it should not repeat the Patch.

## The thing that makes this figure different

It is the one figure where **a gradient has to build and then drain**, and the student must see
the density change. From `_briefs/figures/_source/fig4_etc.py`, the legend is:

1. NADH and FADH2 hand the chain electrons.
2. Q and cytochrome c carry them on, lower.
3. Complexes I, III and IV pump protons out.
4. Oxygen takes them last and becomes water.
5. The protons fall back through the synthase.
6. Its turning builds the ATP. Chemiosmosis.

Foot: "No oxygen at the end, no flow. No flow, no gradient. No gradient, no ATP."

Budget closer to gpcr than to transport: six steps, two travellers (Q and cytochrome c), one crowd
that must change density, and a rotating head.

## Decisions — each carries a recommendation, so no answer means take the recommendation

**D1. Six steps, as the brief's table and the legend say.** The §4 description of `etc` governs the
content of each step. → Recommended: keep the six legend lines as the six steps, no merging.

**D2. Two slow beats, and nothing else moves during them** (§3, memorable event 2).
→ Recommended: step 3 is the crowd thickening above the membrane (about 1.7 s, like gpcr step 4),
and step 5 is the crowd draining through the synthase (about 1.7 s). Proton density above the
membrane must measurably change: count proton glyphs in the intermembrane band at the end of step 2,
step 3 and step 5, and assert step 3 > step 2 and step 5 < step 3 in the new test (D9).

**D3. Complex II visibly does not pump.** In step 3 a proton rises through I, III and IV in turn;
II stays still and dimmed. → Recommended: one prediction at step 3 offers "all four complexes pump"
as the common wrong answer.

**D4. Honest motion.** Q and cytochrome c are travellers with seeded waypoints that wander along the
drawn green path, never fade out at A and in at B. Protons in the crowd jitter; a few drift back
the wrong way while the net movement still goes through the synthase. Seeded, identical every visit.

**D5. Payment, then result** (the §3 energy-transfer rule, T19's ordering idea). The synthase head
turns first, then ADP + P becomes ATP. → Recommended: T19's ordering assertion is extended to `etc`
step 6 (rotation starts before the ATP glyph appears).

**D6. No counter and no numbers on screen.** Reid settled "no ATP tally on `etc`" on 2026-10-10.
Do not re-open it. T16 covers this figure.

**D7. Levels. Default SOL Bio, with `&level=de` for DE.** The original brief made `etc` DE-only, but
Unit 3 is why it is being built now, and gpcr and transport both carry real SOL levels.
→ Recommended word pairs (same geometry, change any that will not fit the legend column at the
29 px type floor): *energy carriers* / NADH and FADH2 · *carrier* / Q (ubiquinone) · *carrier* /
cytochrome c · *protein pumps* / Complexes I, III and IV · *hydrogen ions* / protons (H+) ·
*ATP-making enzyme* / ATP synthase · *oxygen* / oxygen (keep) · *water* / water (keep). Captions follow
the same split. The SOL captions stay true at 9th-grade depth; "Chemiosmosis" appears only at DE.
If an SOL level would need geometry the still does not have, report it and build DE-only with no
level switch rather than re-render.

**D8. End screen.** Keep the three parts gpcr established:
- One-sentence free-text box, device only.
- Misconception check: **"Does oxygen make the ATP?"** Yes / No, with a one-line answer built from
  the foot: oxygen pulls the electrons through at the end; the falling protons turn the synthase.
- Label it from memory, blanking every label on the still, with Reveal.

**D9. Predictions.** Two or three per step, written so the wrong choice is the common wrong answer:
step 3 "all four pump"; step 4 "oxygen becomes ATP"; step 6 "ATP is made at Complex IV".

**D10. Loop.** → Recommended: step 6 loops gently (electrons in, protons up, protons down, head
turns) with Pause and the same readout gpcr uses, so the cycle can run while Reid talks. No counter.

**D11. Sources (R6).** Add per-figure sources under the reel, like gpcr and transport.
→ Recommended: Mitchell P. (1961) Coupling of phosphorylation to electron and hydrogen transfer by a
chemi-osmotic type of mechanism. *Nature* 191:144–148; and Boyer P. D. (1997) The ATP synthase — a
splendid molecular machine. *Annual Review of Biochemistry* 66:717–749. Verify both citations before
committing; if either cannot be verified, leave it out and say so in the report.

**D12. The still does not change.** Pixel-equivalence at the final state, as always. Travellers that
end somewhere new follow the "travel beats pixel-equivalence" amendment. If a step needs geometry
the still does not have, report it rather than re-rendering.

## Scope

Build `etc` only. `rtk` and `cloning` stay as `SOON(...)`. Do not edit the hubs,
`sitemap.xml`, `search-index.js`, `search.html` or `style.css` — those are Reid's, done by hand
after review. Add `etc` to `BUILT` at the head of T1 in
`_briefs/figures/_source/tests/mechanism-reel-tests.js` and to `ENABLED` in the dogma and transport
suites. Add a suite `mechanism-reel-tests-etc.js` and `t3-compare-etc.py` on the pattern of the
transport pair, including the D2 density assertions and the D5 ordering.

## Tests

Run every suite (gpcr, dogma, transport, etc) plus T21–T27 against `etc`. T20 stays N/A (rtk).
T3 compares against `_briefs/figures/04-electron-transport-chain.png`; gpcr landed at 0.89 % and
transport at 0.096 %, which are the bars. **Existing T3 baselines must not move**: a moved baseline
is a failure, not a new baseline.

The test scripts `require('/opt/node22/lib/node_modules/playwright')`, a cloud path. On the Mac,
resolve Playwright locally instead (`npm i -D playwright` in a scratch folder outside the repo, or
`npx playwright install chromium`) and point the require at it through an environment variable
rather than editing every suite. Do not commit `node_modules`. The compare scripts need Pillow and
numpy.

Report every test PASS or FAIL with a one-line reason for each FAIL, the measured minimum label size
from T4 and the T3 percentage even when they pass.

## Git

Branch `claude/mechanism-reel-etc` from current `main`. Commit this brief with the build. Push the
branch from the Mac, report, and **stop**. Do not merge and do not open a pull request; Reid reviews
on his iPad and computer first. If the push is refused, keep the commit, quote the refusal, stop.
