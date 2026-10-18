# Phase 2, figure 2 of 5: `transport` (a channel beside a pump), Bio Tool #25

Opened 2026-10-16 by Reid. Read with `_briefs/figure-animations.md` (the original brief, both round
amendments at its head) and `_briefs/mechanism-reel-handoff.md` (§5 is the engine's figure API, §7
the test suite). Those two still govern. This one opens the gate for **one figure** and settles the
decisions specific to it.

`dogma` (#27) is built and merged. The permanent numbers are gpcr #22, rtk #24, **transport #25**,
etc #26, dogma #27, cloning #28, numbered by the selector's presentation order. #23 and #29 belong
to other tools. Never renumber.

## Why transport, and why now

DE Bio 101 **Unit 5, Membrane Transport and Cell Signaling, starts 2 November** — the nearest unit
start left. Unit 5's signaling half already has gpcr and Bio Tool #15; its transport half has
nothing. The still is tagged for **both** courses (`DE Bio 101 Unit 5 · SOL Bio Module 2`), and Bio I
has just finished LT 2.5 Cell Transport with a CER and Canvas Original #33 on the same content, so
the SOL level here is not a courtesy — both levels are real audiences.

## The thing that makes this figure different

Every figure so far has been a sequence. **This one is a comparison**: two sodium-moving proteins in
one membrane, running independently. From `_briefs/figures/_source/fig3_channel_pump.py`, the
legend is:

- **A gated channel** — Down the gradient. No ATP is spent.
  "The gate opens and sodium falls inward, the way it was already leaning. Passive."
- **A pump** — Against the gradient. One ATP per cycle.
  "The pump pushes sodium out into the crowd and potassium in. Active."
- Closing: "Both move the same ion through the same membrane. Only the pump pays."

Budget accordingly. The handoff estimated a repeat figure at about a third of the gpcr effort; this
one exercises parts of the engine neither gpcr nor dogma touched, so plan closer to half.

## Decisions — each carries a recommendation, so no answer means take the recommendation

**D1. Three steps, not two.** The brief's table says 2. Two steps means the student watches each
protein once and never sees them together, which is where "only the pump pays" actually lands.
→ **Recommended: step 1 the channel alone with the pump dimmed, step 2 the pump alone with the
channel dimmed, step 3 both running together.** Step 3 is the comparison and carries the closing
line. If you can make the comparison land in two steps, say how in the report rather than building
a third silently.

**D2. The ATP beat is the slow beat, and T19 governs it.** ATP splits *before* the pump moves
anything — the payment is visible first, then the result. T19 asserts exactly that ordering.
→ Recommended: step 2's ATP split is the slow beat at roughly 1.7 s, matching gpcr's step 4. The
channel's step gets no slow beat; it should feel effortless by comparison, which is the teaching
point.

**D3. Honest motion matters more here than anywhere.** A gradient is statistical, not a current.
→ Recommended: on the channel side, ions jitter and **a few visibly drift the wrong way** while the
net movement is still inward. Seeded, so it is identical every visit. This is the figure's second
teaching idea — net movement is not every particle moving — and it costs one sentence under the
reel. Do not draw the downhill side as a tidy stream.

**D4. A loop on step 3, no counter.** The pump cycles; the channel's gradient runs down.
→ Recommended: step 3 loops gently, the pump cycling while ions keep crossing, with Pause and the
same readout gpcr uses. **No counter and no numbers on screen** — the amplification counter was
sanctioned for gpcr alone. §3's no-numbers rule applies here unbroken.

**D5. Default level SOL Bio**, as with gpcr and dogma; `&level=de` covers DE.
→ Recommended word pairs, change any that will not fit the legend column at the 29 px type floor:
*gated channel* / ligand-gated channel · *pump* / Na⁺/K⁺ ATPase · *crowded outside, scarce inside* /
electrochemical gradient · *energy molecule* / ATP · *passive* / passive (keep, both courses use it) ·
*active* / active. Captions follow the same split.

**D6. End screen.** Keep the three parts gpcr established, with this figure's content:
- One-sentence free-text box, device only.
- Misconception check: **"Does sodium need energy to move through the channel?"** Yes / No, with a
  one-line answer built from the figure's own "the way it was already leaning."
- Label it from memory, blanking every label on the still, with Reveal.

**D7. Predictions.** Two or three per step, written so the wrong choice is the common wrong answer.
At step 2, one choice should have the pump working without ATP; at step 3, one should have both
proteins costing energy.

**D8. The still does not change.** Pixel-equivalence at the final state, as always. If something in
the comparison needs geometry the still does not have, report it rather than re-rendering — that is
what happened with the polyribosome on dogma, and the still stayed.

## Scope

Build `transport` only. `rtk`, `etc` and `cloning` stay as `SOON(...)`. Do not edit the hubs,
`sitemap.xml`, `search-index.js`, `search.html` or `style.css` — those were done by hand on 10/16
and are Reid's. Add `transport` to the `BUILT` list at the head of T1 in
`_briefs/figures/_source/tests/mechanism-reel-tests.js`; that list exists so this is a one-word edit.

## Tests

Run the §7 suite plus T21–T27 against `transport`. **T19 applies to this figure for the first time**
and is the one most likely to fail. T20 stays N/A (rtk). T16's no-numbers assertion covers this
figure under D4. The T3 comparison runs against `_briefs/figures/03-channel-and-pump.png`; gpcr
landed at 0.89 %, which is the bar.

Report every test PASS or FAIL with a one-line reason for each FAIL, the measured minimum label size
from T4 and the T3 percentage even when they pass, and say which branch you used.
