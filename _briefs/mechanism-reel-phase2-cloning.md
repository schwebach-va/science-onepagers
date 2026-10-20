# Phase 2, figure 6 of 6: `cloning` (cloning a gene), Bio Tool #28

Opened 2026-10-20 by Reid and Claude. Read with `_briefs/figure-animations.md` (the original brief, §3
the arc and the memorable beats, §4 "`cloning` — 5 stages"), `_briefs/mechanism-reel-handoff.md` (§5 the
figure API, §7 the tests), `_briefs/mechanism-reel-transport-revision-1.md` (T28 and the lesson behind
it) and `_briefs/mechanism-reel-phase2-rtk.md` with its Addendum (T30–T32, Part B, the sandbox notes).
Those still govern. This brief opens the gate for the **last figure**.

Branch: `claude/mechanism-reel-cloning`, cut from `claude/mechanism-reel-rtk` (`aa0852f`), so it already
contains **etc #26 and rtk #24**, both built and approved by Reid on 2026-10-20 ("Looks wonderful").
Keep every other figure exactly as it is. Build on this branch only.

Permanent numbers: gpcr #22, rtk #24, transport #25, etc #26, dogma #27, **cloning #28**. #23 and #29
belong to other tools. Never renumber.

## Why it matters

The GMU survey put cloning at a 60 % stuck point. The figure's one idea is in its closing line: **"The
enzyme makes the ends fit before anything is joined."** A student who leaves thinking ligase makes the
ends fit, or that any two cut ends will join, has missed it. Biology I Unit 4 (Nucleic Acids & Protein
Synthesis) starts 13 November and carries **BIO.5e, synthetic biology**, so this figure has an SOL
audience as well as DE (see D1).

## Mechanism points: the figure's content, not polish

Transport passed every test and still showed something false. Here are the places cloning can do the same.
Each one gets a test or a decision.

1. **The cut is staggered.** One restriction enzyme cuts the two strands at offset points, leaving four
   unpaired bases on each end. The still's stage-2 strip already draws this: left piece top strand
   592–782, bottom 592–700; right piece top 866–1000, bottom 784–1000. Shifted 84 units left, the
   right piece meets the left exactly (top joins at 782, bottom at 700). So the intact duplex is the right
   piece at x − 84, and the cut is that one duplex coming apart with staggered ends (D3).
2. **Pairing comes before sealing.** The overhangs pair by base pairing on their own. Ligase then
   seals the sugar-phosphate backbone. Ligase does not pull the ends together, and it does not make them
   fit. The seals must not appear until the fragment has seated (**new T33**).
3. **The plasmid sits beside the chromosome.** It does not join it. The still draws it that way; the
   animation must not merge them (D5, **T34**).
4. **Selection on ampicillin finds cells that took up a plasmid, not cells that took up the gene.** A
   plasmid cut once with one enzyme has matching ends of its own and can close back up without the
   insert. Those cells grow on ampicillin too. The still's box says each colony is a clone, which is true;
   it must not be read as every colony carrying the gene you want (D7).

## Decisions: each carries a recommendation, so no answer means take the recommendation

**D1. Two levels, SOL and DE, default SOL.** The original brief made cloning DE only. etc has since
taken an SOL level. BIO.5e (synthetic biology) sits in Biology I Unit 4 next to dogma #27, and that unit
starts 13 November.
→ Recommended: `levels:true`, same geometry, words differ by level. SOL words: "cutting enzyme",
"matching ends", "sealing enzyme (ligase)", "a ring of DNA (plasmid)". DE words are the still's:
"restriction enzyme" in captions and prompts, "sticky ends", "ligase", "recombinant plasmid". If an SOL
label does not fit at the type floor, keep the still's word on the drawing and put the plain word in the
caption, as etc did. Report which labels change. *Reid can drop SOL later by setting `levels:null`.*

**D2. Steps.** Five steps, one per stage, revealed left to right as rtk does. Captions 1–3 are the
still's legend lines, verbatim at DE. Captions 4 and 5 are the stage headings: "Bacteria take it up."
and "Only cells that took one grow." The still's legend has three lines only; do not add legend lines to
the drawing for 4 and 5.

**D3. Step 2: the cut.**
→ Recommended: the strip opens as one intact duplex, with the right piece at x − 84 and no gap. The
enzyme drifts down from above with seeded jitter and bumps the duplex. The duplex comes apart along the
staggered line and the right piece drifts right to the still's position. The red brackets and the line
"four unpaired bases on each end, and they pair" come up after the pieces have parted. The enzyme stays
where the still draws it, because enzymes are not used up. The three white base ticks on each overhang
travel with their piece.

**D4. Step 3: the pairing beat.** This is §3's memorable event 5, "the two sticky ends meeting and the
seals appearing". It is the slow beat: about 1.6 s, with nothing else moving.
→ Recommended: the stage-3 circle opens with a gap where the insert arc (318°–42°) will go. The insert
arc travels in from the left along the stage-2→3 arrow, continuously visible, wanders a little and seats
in the gap. Only after it has seated do the two green seals appear, one at each join (**T33**). Draw
**two** seals, as the still does: one per join. Do not draw four nicks, and do not add an ATP glyph to
ligase. Both would be true, and both are more than this figure carries. Reid takes legibility over
content (original brief §6).

**D5. Step 4: into the bacterium.**
→ Recommended: the dashed path draws on. A copy of the recombinant plasmid leaves stage 3 and travels
down along the path, continuously visible, with jitter. It bumps the cell envelope and settles at the
still's plasmid position (372, 638), beside the chromosome. The chromosome never moves, and the plasmid
never overlaps it (**T34**). The stage-3 plasmid stays where the still draws it.

**D6. Step 5: colonies grow.**
→ Recommended: the plate appears, and the seven colonies grow one at a time from a point at the still's
seven positions. Use transform scale from about 0.15 to 1, plus opacity, in a seeded irregular order,
about 200–350 ms apart. A colony grows from one cell. The box "Each colony grew from one cell…" and the
"ampicillin plate" label come up after the last colony. **No numbers, no counter, no tally** (T16).

**D7. The colony nuance goes in the card, not the still.** Leave the still's box wording alone.
→ Recommended: an `after` line under the closing caption (the R2 pattern) at both levels:
- SOL: "Every colony here took up a plasmid. Some plasmids close back up without the gene, so a lab checks
  colonies to find the ones that carry it."
- DE: "Every colony on ampicillin took up a plasmid, but a plasmid cut with one enzyme can also close on
  itself without the insert, so colonies are screened for the gene next."

Step 5's prediction and "what happened" carry the same point.

**D8. End screen.** Use the three parts gpcr established.
- One-sentence free-text box, kept on the device only: "Explain in one sentence why both pieces are cut
  with the same enzyme."
- Misconception check: **"Does ligase make the ends fit?"** Yes / No. The answer is No: "The enzyme made
  the ends fit when it cut both pieces. Ligase only seals ends that have already paired." That is the
  closing line with the reason stated.
- Label it from memory: every label blanked, with Reveal.

**D9. Predictions.** Two or three choices per step. The wrong choices are the common wrong answers.
- Step 1: where the enzyme will cut. Right: the same sequence in both. Wrong: anywhere; only the plasmid.
- Step 2: why one enzyme. Right: so the ends match and can pair. Wrong: any cut ends fit; it is faster.
- Step 3: what holds the ends for good. Right: ligase seals the backbone after they pair. Wrong: the
  base pairs alone; the cutting enzyme glues them back.
- Step 4: where the plasmid ends up. Right: inside, beside the chromosome. Wrong: joined into the
  chromosome; outside, read through the wall.
- Step 5: which cells grow on ampicillin. Right: only the cells that took up a plasmid. Wrong: all of
  them; only the cells that took up the gene you want.

**D10. No run-on and no counter.** The counter was sanctioned for gpcr alone.

**D11. Sources** are the still's own, per figure, under the reel (R6): Mertz & Davis 1972
(10.1073/pnas.69.11.3370) and "Cohen & Boyer 1973" (Cohen, Chang, Boyer & Helling,
10.1073/pnas.70.11.3240). Keep the still's labels. Never invent a DOI.

**D12. Leave the still alone.** It does not change for this build. If the animation cannot end on it
exactly, report why rather than editing `fig6_cloning.py`.

**D13. Selector.** cloning is the last entry: `bridge:null`, tag Movement. With cloning built there are
no `SOON(...)` entries left. Remove the `SOON` helper only if nothing else uses it, and keep the selector
order.

## Scope

Build `cloning` in `biology/tools/mechanism-reel.html`, plus its own test suite and T3 script. Add
`cloning` to the `BUILT`/`ENABLED` lists in **every** suite. Every suite that asserts "the placeholders
are disabled" (T1, T15) must now pass with **no** placeholders; fix those assertions rather than leaving
a dummy. Do not edit the hubs, `sitemap.xml`, `search-index.js`, `search.html` or `style.css`. Claude
lists #24, #26 and #28 and publishes after the build. Part B from the rtk brief is already in and covers
cloning through the `STILLS` map (`06-cloning-a-gene`). T32 must include cloning.

## Tests

Run the full suite for all **six** figures at both widths: gpcr, rtk, transport, etc, dogma, cloning.
New tests:

| | What | How |
|---|---|---|
| T33 | Pairing before sealing | In step 3, each seal's first transition starts at or after the insert's seating transition has ended (the T19 pattern, `pairs`/`funds`) |
| T34 | Travellers stay visible; the plasmid stays beside the chromosome | Sample the insert (step 3) and the plasmid copy (step 4) through their tweens: opacity ≥ 0.9 after their first 150 ms and until they arrive. At the end of step 4, the plasmid's box does not intersect the chromosome path's box |
| T35 | Colonies grow one at a time | In step 5, no two colonies start within 150 ms of each other, and each starts at a scale ≤ 0.3 |

T19 is N/A for cloning; no ATP is drawn (D4). T28 and T29 stay on transport and etc, T30 and T31 on
rtk. T3 against the unchanged still: report the percentage. rtk read 0.022 % and transport 0.065 % in
the sandbox. Use the A5 sandbox notes in the rtk brief (Archivo from the still's SVG, the console
filter).

Report:
- every test, PASS or FAIL, for every figure, with a one-line reason for each FAIL
- T4's minimum label size and every figure's T3
- the step durations
- which SOL labels changed
- a section headed **"Mechanism claims I made"** for anything biological you decided that this brief did
  not specify
- anything you could not build as written: build the closest honest version, mark it in the code and
  the report, and keep it easy to change

Commit with a why-line. Push the branch only. No PR, no merge, nothing on main.
