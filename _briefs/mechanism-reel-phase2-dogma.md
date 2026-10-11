# Phase 2, figure 1 of 5: `dogma` (central dogma)

Opened 2026-10-11 by Reid. Read with `_briefs/figure-animations.md` (the original brief, with both
round amendments at its head) and `_briefs/mechanism-reel-handoff.md` (§5 is the engine's figure API).
Those two documents still govern. This one opens the gate for **one figure only** and records the
decisions that are specific to it.

## Why dogma, and not `etc`

The handoff suggested hardest-first. Reid chose by the teaching calendar instead. Biology I Unit 4,
Nucleic Acids and Protein Synthesis, starts **13 November** across six SOL sections — the largest
audience the site has, and the unit where the Mechanism Reel currently has nothing. The same figure
returns later as DE Bio 101 Unit 14, Gene Expression. `etc` serves DE Units 7 and 8, which are not
built until 22 November and 6 December.

Consequence for this build: **the SOL Bio level is not a secondary nicety here, it is the primary
audience.** Where gpcr defaulted to SOL and was mostly read at DE, dogma will be read at SOL first.

## Scope

Build `dogma` only. The other four placeholders stay as `SOON(...)` entries. Do not touch the hubs,
`sitemap.xml`, `search-index.js`, `search.html` or `style.css` — listing stays with Reid in Cowork,
as in Phase 1. Commit on a branch, push the branch, report, stop. Do not merge and do not open a PR.

## The six steps

From `_briefs/figures/_source/fig5_central_dogma.py`, which is the master. The legend lines are:

1. RNA polymerase copies one gene.
2. The first copy still has introns in it.
3. Capped, tailed, spliced, and out it goes.
4. A ribosome reads three bases at a time.
5. Each tRNA brings one matching amino acid.
6. The joined amino acids are the protein.

The figure's closing line is "The gene never leaves. A copy of it does, and the copy is what gets
read." That sentence is the misconception this figure exists to fix, and it drives the end screen
below.

## Decisions — each carries a recommendation, so no answer means take the recommendation

**D1. Co-transcriptional splicing.** The still shows splicing as its own sequential beat (steps 2
and 3). Real splicing starts while polymerase is still transcribing. The variant was held at Phase 1.
→ **Recommended: keep it held.** It is not in the SOL curriculum at all, and in DE it arrives in
Unit 14 where it can be a second version of the figure under the annual-rebuild rule. Build the
sequential beats. Leave the hook: a comment in the figure object naming where the overlap would go.

**D2. How many ribosomes.** Three ribosomes on one message is the polyribosome idea.
→ **Recommended: three at DE, one at SOL.** At SOL the step that matters is that a ribosome reads
three bases at a time; three ribosomes at once adds a second idea on top of a new one. At DE the
crowd is the point. This is a `levels` difference inside `svg(level)` and `state(k)`, the same
mechanism gpcr already uses for PKC.

**D3. Default level.** → **Recommended: SOL Bio**, per the original brief's rule and because Unit 4
reaches it first. The `&level=de` link covers DE, as it does for gpcr.

**D4. Level words.** SOL Bio uses plain names on the same geometry, as gpcr does.
→ Recommended pairs, change any that will not fit the legend column at the 29 px floor:
DNA / DNA · gene / gene · RNA polymerase / RNA polymerase (keep, they meet it in Unit 4) ·
*first copy* / pre-messenger RNA · *extra pieces* / introns · messenger RNA / messenger RNA ·
*three-base word* / codon · *matching piece* / anticodon · transfer RNA / tRNA ·
*building block* / amino acid · protein / polypeptide.
Captions follow the same split. Step 2 at SOL: "The first copy has extra pieces that come out."

**D5. The travel beat.** Honest motion applies: the finished message does not fly out of the nuclear
pore on a line. It drifts and bumps the envelope before it passes, the way the signal molecule bumps
the membrane in gpcr. Same seeded jitter.

**D6. The slow beats.** Two, matching gpcr's structure: **step 3** (the copy leaving the nucleus —
the moment the misconception lives in) and **step 5** (one tRNA seating, so the base pairing is
legible). Every other step 0.75 to 1.3 s.

**D7. End screen.** Keep the three parts gpcr established, with this figure's content:
- One-sentence free-text box, device only.
- Misconception check: **"Does the DNA leave the nucleus?"** Yes / No, one-line answer built from
  the figure's own closing line.
- Label it from memory, blanking every label on the still, with Reveal.

**D8. No run-on, no counter.** gpcr's amplification crowd was sanctioned as the one count on screen.
Nothing here amplifies in that sense. §3's no-numbers rule applies unbroken. T16 is in force with no
exclusion.

**D9. Predictions.** Two or three per step as always. Write them so the wrong choice is the common
wrong answer, not a throwaway — at step 3, one choice has the DNA itself leaving.

## Tests

Run the §7 suite plus T21 to T27 against `dogma`. T19 and T20 stay N/A. T9 asserts the level switch
present on `dogma` as well as `gpcr`. The T3 final-frame comparison runs against
`_briefs/figures/05-central-dogma.png`; gpcr landed at 0.89 %, which is the bar.

Report every test PASS or FAIL with a one-line reason for each FAIL, and say which branch you used.
