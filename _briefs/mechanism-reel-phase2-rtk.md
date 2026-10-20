# Phase 2, figure 4 of 6: `rtk` (receptor tyrosine kinase), Bio Tool #24 — plus four page fixes

Opened 2026-10-19 by Reid and Claude. Read with `_briefs/figure-animations.md` (the original brief,
both round amendments at its head), `_briefs/mechanism-reel-handoff.md` (§5 the engine's figure API,
§7 the test suite) and `_briefs/mechanism-reel-transport-revision-1.md` (T28, and the lesson behind
it). Those still govern. This one opens the gate for **one figure** and, in Part B, four small fixes
to the page around the reel.

Built and live on `main`: gpcr #22, transport #25, dogma #27 (revision 1 merged 2026-10-18). The
permanent numbers are gpcr #22, **rtk #24**, transport #25, etc #26, dogma #27, cloning #28. #23 and
#29 belong to other tools. Never renumber.

## Why rtk, and why now

DE Bio 101 **Unit 5, Membrane Transport and Cell Signaling, starts 2 November.** Unit 5 now has gpcr
and transport on the reel and Bio Tool #15 beside them; the still for rtk is tagged
`DE Bio 101 · Unit 5 · Receptor tyrosine kinases`, and Campbell Ch 11 teaches the two receptor
families side by side. It is the only remaining figure with a unit start inside two weeks. `etc`
(DE Units 7–8, lesson builds 22 November and 6 December) follows; `cloning` (Biotechnology) is last.
Reid needs this built, watched on the iPad and the Mac, and merged by **Friday 30 October**.

## The lesson from transport — read this before building

Revision 1 exists because the transport build passed every test and still showed something false:
the pump moved sodium out and potassium in at overlapping times, which is exactly what a pump cannot
do. The suite checked timing and pixels, not mechanism. **rtk has three places where the same thing
can happen**, and each now gets a test (T29–T31 below). Treat them as the figure's content, not as
polish.

1. **Trans-autophosphorylation.** Each half's kinase phosphorylates the *other* half's tail. The
   still says so in caption 3 ("Each half phosphorylates the other, paying with ATP"). Animation
   that fills each tail from its own side teaches the wrong thing while matching the caption.
2. **One ATP per phosphate.** Six phosphates cost six ATP. The still draws one ATP > ADP glyph as a
   token; the animation must not show one ATP paying for six.
3. **Relays dock on phosphotyrosines, after they exist.** A relay arriving before its tyrosine is
   phosphorylated, or docking on bare receptor, is the misconception the figure exists to prevent:
   "No dimer, no phosphates, no answer."

## Decisions — each carries a recommendation, so no answer means take the recommendation

**D1. The still has a geometry defect in stage 4, and it should be fixed before animating.**
In `_briefs/figures/_source/fig2_rtk.py`, stage 4 places the three docked tyrosines at 62 px spacing
(`y = MB + 14 + i*62`) on a tail drawn for 28 px spacing. The third tyrosine, Relay C's, lands below
the end of the receptor tail, so Relay C reads as carrying a piece of the receptor away. Stage 4 also
drops the left half's three phosphates that stage 3 just added; phosphates do not vanish when relays
dock. Because T3 makes the animation end on the still, animating it as-is would make the defect
permanent and moving.
→ **Recommended: re-render the still.** In stage 4 keep all six phosphotyrosines exactly where stage
3 puts them, and dock Relays A, B and C on three of them so that every relay touches a phosphate that
sits on the tail. Stagger the relays horizontally if the 28 px spacing makes 22 px-radius circles
collide; keep the response arrows and labels on the right. Hold the 29 px type floor, run `check.py`
clean, re-render both `_briefs/figures/02-receptor-tyrosine-kinase.*` and
`biology/figures/02-receptor-tyrosine-kinase.*`, keep the PNG text chunks. Report the geometry you
chose with a before/after crop. Nothing else on the still changes (see "Leave alone" in the original
brief: generic Relay A/B/C stays, the pre-paired note stays).

**D2. Trans, not cis.** → Recommended: each phosphate travels from the ATP at one half's kinase
domain to a tyrosine on the **other** half's tail. Alternate sides so the crossing is visible
(left-to-right, right-to-left, …). A short arc from donor to target is honest; a phosphate appearing
in place is not. **New T29** below.

**D3. Six ATP, one slow beat.** → Recommended: step 3 shows six ATP > ADP splits, each one
immediately before the phosphate it pays for (T19 applies per phosphate, not once per step). The
first split is the slow beat (about 1.7 s, gpcr's step 4); the remaining five are quick, so the step
stays near 4 s at normal speed. **No numbers on screen** — T16 covers rtk, and six is shown, not
counted. ADP leaves by drifting, not by fading out in place (T18).

**D4. Relays dock only on a phosphate that already exists.** → Recommended: in step 4, Relays A, B
and C drift in from the cytosol with the same seeded jitter gpcr uses, bump, and seat on their
phosphotyrosines. No relay starts moving before the last phosphate of step 3 has landed. **New T30.**

**D5. DE only — no level switch.** RTKs are not in the SOL Biology standards, the still is tagged DE
Unit 5 only, and T9 already expects the level control to be absent on rtk.
→ Recommended: `levels: null`, wording from the still. Do not list rtk on the Biology I hub.

**D6. Honest motion in the membrane.** → Recommended: the two halves drift laterally in the
membrane, bump, and meet; they do not slide straight at each other. Signal molecules drift down and
bump before they seat, as on gpcr. Seeded, identical every visit.

**D7. The three answers are parallel, not a sequence.** The original brief says the responses "fade
up in sequence." Branching is the point (one signal, several answers *at once*), and a 1-2-3 reveal
reads as a chain.
→ Recommended: the three responses come up together, staggered by no more than 150 ms for
legibility, each arrow continuing off the right edge. The closing line "One signal, several answers"
follows them.

**D8. The DE closing state (T20).** Unchanged from the original brief: after step 4, an optional
final state — the same pair, already joined, no ligand, and one line saying the signal changes its
shape rather than bringing the halves together. It must read as an extension, not a contradiction of
step 2; the line can say "Some receptors are already paired" exactly as the still does.

**D9. End screen.** The three parts gpcr established:
- One-sentence free-text box, device only.
- Misconception check: **"Can one half, on its own, pass the signal inside?"** Yes / No, answered
  from the still's own caption 2: neither works alone.
- Label it from memory, every label blanked, with Reveal.

**D10. Predictions.** Two or three per step; the wrong choices are the common wrong answers. Step 1:
one choice has the signal entering the cell. Step 3: one choice has each half phosphorylating
itself. Step 4: one choice has the relays carrying the signal molecule in.

**D11. No run-on and no counter.** The counter was sanctioned for gpcr alone.

## Part B — four page fixes, separate commit, same branch

Found on 2026-10-19 by rendering the live page at 820×1180 (iPad portrait), 1180×820, 1024×1366
and 1440×900. These are page chrome, not the video-breakout layout, which still waits until all six
figures are built (Reid, 2026-10-17). **Reid can drop Part B at launch; if he does, build Part A
only.**

**B1. The reel is below the first screen on every device.** The stage's top edge measures 1130–1136
px from the top of the page at all four sizes, under the intro, the three idea tags, the fine print
and the six-row selector. On an iPad in portrait only the top 44 px of the stage is visible on
arrival. Every hub link and every Canvas link arrives with `?anim=`, so a student opens a link and
sees no animation.
→ Recommended: when the URL names a figure, open with the intro and fine print collapsed to one line
and the selector collapsed to a single row showing the current tool ("Bio Tool #24 · receptor
tyrosine kinase · one of six — show all"), expanding on tap. With no `?anim=`, the page opens as it
does now. **New T31**: with `?anim=` set, the stage's top edge is within the first 320 px at
1440×900, 1180×820 and 820×1180, and the prediction card for the current step is fully on screen
without scrolling at 1440×900 and 1180×820.

**B2. The back link and footer only know DE.** The back link always reads "← DE Biology 101
Resources" and the footer always says "DE Bio 101 · Units 4 to 6 · NVCC BIO 101", but #22, #25 and
#27 are listed on the Biology I hub (`biology/classroom-tools.html`) and dogma is DE Unit 14 / SOL
Module 4.
→ Recommended: at SOL level the back link reads "← Biology Classroom Tools" and points to
`../classroom-tools.html`; at DE level it stays as is. The footer's course line comes from the
current figure (its eyebrow) instead of a fixed string. Same `level` the page already resolves.

**B3. The sister stills are published but linked from nowhere.** `biology/figures/0[1-6]-*.png|svg`
are public and meant for lesson plans and printing, but no page links them, and
`biology/figure-sources.html` ("Where these diagrams come from") is on no hub and not linked from the
reel.
→ Recommended: on the reel, add one line under the per-figure sources: "Print the still (PNG) ·
Where these diagrams come from", linking the current figure's PNG in `../figures/` and
`../figure-sources.html#<figure>`. On `figure-sources.html`, add a small thumbnail of each still
linking its PNG and SVG beside each figure's block. No other change to that page.

**B4. Two sources lines.** The sources appear inside the still and again under the step row (R6 put
the visible line there on purpose). → Recommended: leave both. Noted here only so nobody "fixes" it.

## Scope

Build `rtk` and Part B. `etc` and `cloning` stay as `SOON(...)`. Add `rtk` to the `BUILT` list at the
head of T1. Do not edit the hubs, `sitemap.xml`, `search-index.js`, `search.html` or `style.css`:
listing #24 on the DE hub (Unit 5, after #22), the sitemap lastmod and the search index are done by
hand after Reid approves. `build-search-index.py` lives on Reid's Mac, not in the repo; its reel
`TITLE_OVERRIDE` gets #24 then. Touch `figure-sources.html` only for B3.

## Tests

Run the §7 suite, T21–T28, and the three new ones against all built figures:

| | What | How |
|---|---|---|
| T29 | Each phosphate on one half's tail comes from the other half | For every tyrosine phosphate in rtk step 3, assert its tween starts at the opposite half's kinase domain (x on the far side of the dimer midline) and ends on the target tail |
| T30 | No relay moves before its phosphotyrosine exists | Assert each relay's first transition starts at or after the end of the phosphate transition for the tyrosine it seats on |
| T31 | The reel is on the first screen when a link names a figure | B1's measurements, with `?anim=` on each built figure |

**T20 applies for the first time.** T19 is per phosphate (D3). T28 is N/A for rtk (no
opposite-direction movers through one protein) but must still PASS on transport. T3 runs against
the **re-rendered** still if D1 is built; report the percentage. transport landed at 0.096 %, gpcr at
0.89 %.

Report every test PASS or FAIL with a one-line reason for each FAIL, T4's minimum label size, the T3
percentage, the step durations, the D1 before/after crop, and anything in D1–D11 you could not build
as written (say so rather than choosing silently, as dogma's D2 did). Commit Part A and Part B
separately. Say which branch you used.

---

# Addendum, 2026-10-20 (1 a.m.): etc was built first. This addendum overrides the brief where they differ.

After this brief was pushed, a separate session built **etc, Bio Tool #26**, on
`claude/mechanism-reel-etc` (`52f1986`, not merged, awaiting Reid's review on the iPad and Mac).
Both figures edit `biology/tools/mechanism-reel.html` and the `BUILT` lists in every suite, so
building rtk beside etc would leave two branches that collide on merge. `claude/mechanism-reel-rtk`
now **contains etc** (merge commit on this branch). Build rtk on top of it.

**A1. etc stays built.** Ignore "`etc` and `cloning` stay as `SOON(...)`" above. Only `cloning`
stays `SOON`. Do not change any part of etc's figure, text or timing. If Part B forces a change near
etc, report it.

**A2. Test numbers move up by one.** etc's suite already defines **T29** (the proton crowd rises in
step 3 and falls in step 5). The three tests this brief calls T29, T30, T31 are therefore:

| Brief said | Now | What |
|---|---|---|
| T29 | **T30** | Each phosphate on one half's tail comes from the other half (trans) |
| T30 | **T31** | No relay moves before its phosphotyrosine exists |
| T31 | **T32** | The reel is on the first screen when a link names a figure (Part B, B1) |

Never renumber etc's T29. T28 must still PASS on transport, T29 on etc.

**A3. The full regression is five figures.** Add `rtk` to `BUILT` (it reads
`['gpcr','dogma','transport','etc']` now) in every suite that carries the list, and update any
hard-coded "soon" list (the transport suite had one; etc's session fixed it for etc). Run gpcr,
dogma, transport, etc and rtk suites at both widths. Reported T3 at last run: gpcr 0.868 %, dogma
0.000 %, transport 0.035 %, etc 0.293 % (fonts from a local TTF; see A5). If any of those moves by
more than a few hundredths, a final position was disturbed: stop and report.

**A4. Part B covers etc too.** B1/T32 measures every built figure, etc included. B2: etc has
`levels:true`, so at SOL level its back link goes to Biology Classroom Tools like the others, and its
footer course line comes from its own eyebrow. B3: etc's still is `03-electron-transport-chain` (check
the filename in `biology/figures/`), linked the same way.

**A5. Test environment, learned on the etc build.**
- Google Fonts is blocked in the cloud sandbox. The suites' console filter now carries each error's
  resource URL so the blocked font fetch is excluded (T12). Keep that filter.
- T3 compares against stills that embed **Archivo** as base64 woff2. Without the font installed,
  Chromium renders a fallback face and T3 fails. Extract it from the still's SVG `<style>` data URI,
  convert to TTF with fontTools, put it in `~/.local/share/fonts` and run `fc-cache -f`.
- Each suite takes 10–15 minutes. Run them in the background and poll the log.

**A6. Merge order for Reid.** etc first, then rtk. If Reid asks for changes to etc after this build,
they go on `claude/mechanism-reel-etc` and get merged into this branch again.

**A7. Accuracy, checked 2026-10-20.** The three mechanism claims above stand as written:
trans-autophosphorylation, one ATP per phosphate (six phosphates on the still, three per tail, so six
ATP), and SH2-type docking only on phosphotyrosines. Ligand-induced dimerization for the step-2
default and the pre-paired closing state (insulin-receptor type) for D8 are both correct. If a
choice you make while building rests on a mechanism claim not in this brief, put it in the report
under "Mechanism claims I made" so it can be checked.
