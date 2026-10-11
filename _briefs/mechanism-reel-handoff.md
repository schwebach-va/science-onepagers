# Handoff: The Mechanism Reel (Bio Tool #22)

Written 2026-10-11 by the Claude Code cloud session that built Phase 1 and the round-2 review. For Reid, to pick up in Cowork on the desktop.

## 1. Where things stand

| | |
|---|---|
| Branch | `claude/wizardly-ride-iln3oh` in `schwebach-va/science-onepagers`, pushed, fast-forwards onto `main` |
| Head commit | `5f055b2` (page + stills + DE hub listing + sitemap + search index) |
| Pull request | https://github.com/schwebach-va/science-onepagers/pull/6 |
| **Blocked** | The session's permission rules refused `git push origin main` (classed as a production deploy). **Merging the PR publishes.** Or locally: `git checkout main && git merge --ff-only origin/claude/wizardly-ride-iln3oh && git push origin main`. |
| Live after merge | https://scienceonepagers.org/biology/tools/mechanism-reel.html |
| Phase 2 | Held until you have watched `gpcr` on the iPad and the computer and say it looks right |

### Files on the branch

- `biology/tools/mechanism-reel.html`: the page, self-contained, one file.
- `biology/figures/0[1-6]-*.svg|png`: the six stills, served publicly (sister images for lesson plans).
- `_briefs/figures/`: the same stills, the generator source, the validator, `render.sh`, and now `_source/tests/` (see §6).
- `_briefs/figure-animations.md`: the brief, with dated amendments at its head for both review rounds.
- `biology/de-biology-101-resources.html`, `sitemap.xml`, `search-index.js`: the listing (§3).

## 2. What to look at on the iPad and the computer

Open `?anim=gpcr&step=0&level=de` and press through with **Next**. Things to judge, in order:

1. **Focus.** While a step plays, its marker, its legend line and the moving parts grow 1.3x; the rest dims to half; the row in the panel grows. Everything settles 300 ms after the step ends, and the prompt for the next step appears at that moment. If that reads as the prompt arriving a beat early, the settle can be folded into the step's busy time (one change in `goStep`).
2. **Predictions.** Two or three buttons under each prompt. Tap one or don't; Next always works. After the step: "You predicted" beside "What happened". Teaching view hides the buttons.
3. **Honest motion.** The signal molecule drifts and bumps the membrane before it seats. IP₃ wanders. Nothing flies straight. The jitter is seeded, so it is identical every time; if you want it to vary per visit, the seed in `part4` (`rng(11)`) becomes `Date.now()`.
4. **Step 4 and step 6** are the slow beats (1.7 s and 1.8 s); every other step is 0.75 to 1.3 s.
5. **The run-on** after step 6: IP₃ and calcium spread by jitter until the counter holds at 14 and 28. **Pause** (the button labelled "❚❚ Pause") stops it; **Back** or any step number clears it; the readout under the controls says so.
6. **End screen**: the one-sentence box, "Did the signal molecule enter the cell?" Yes/No, and **Label it from memory** (numbered blanks, Reveal).
7. **Levels.** SOL Bio uses Lipid, Lipid half, Messenger, Cutting enzyme, Receptor, Calcium; DE Bio uses the still's words and draws PKC. Default is SOL Bio (the brief's rule). If you want gpcr to default to DE, that is one line (`st.level` in `load()`), or just send students the `&level=de` link.
8. **Slow** halves every duration and is remembered. **Fill screen** at 16:9 uses the whole frame.
9. **Reduced motion** (iPad Settings > Accessibility > Motion): no tweens, no scaling; the dim holds 1.5 s then releases; every caption stays.

### Links for recording and lesson pages

```
?anim=gpcr&step=3&level=de          open at state 3, nothing lit as finished
?anim=gpcr&step=6&runon=paused      last step, crowd empty, ring on Play
?anim=gpcr&labels=blank             the blank-label still with Reveal
?fig=gpcr                           still accepted
```

The address bar follows the student, so any state can be copied as a link.

## 3. Indexing: done and open

**Done on the branch.** DE Bio 101 hub, Unit 5, after Bio Tool #15, linking to `?anim=gpcr&level=de`. One `<url>` in `sitemap.xml` (lastmod 2026-10-11). One entry in `search-index.js` hand-written in the builder's format; your `build-search-index.py` (not in the repo) will regenerate it from the page next time it runs.

**Open, yours to decide.**
- **Biology I hub** (`biology/classroom-tools.html`): the reel now has a real SOL Bio level, so it could sit in Module 2 after Bio Tool #21, but the tag needs the PWCS LT and lesson line. Or keep it DE-only for now.
- **Canvas**: link in the Unit 5 module (DE), and in Module 2 (Biology I) if you list it there. For class on 9 and 10 November the deep links above are the ones to post.
- **Tool videos**: `biology/tool-videos.js` has no entry for #22. Add one when you record.
- **C2PA**: the original stills carried Claude-provenance C2PA manifests (SVG `<c2pa:manifest>`, PNG `caBX`). The re-rendered files do not, since those manifests hash the old bytes. The PNG text chunks (Author, Comment, Copyright, Creation Time, Source) are carried over. If your Cowork pipeline signs files, re-run it on `_briefs/figures/*` and `biology/figures/*`.

## 4. Decisions made, and two wording deviations to confirm

- **Travel over pixel-equivalence** (your call, round 1). The final step differs from the still only where a traveller moved: α at phospholipase C, IP₃ at the ER channel, and the inositol hexagon under the membrane PIP₂. T3 measures 0.89 % of pixels.
- **Type floor 29** at the source: `style.py` `T_MIN = 29`, all six stills re-rendered, `check.py` clean.
- **Caption 3** reads "The alpha subunit, carrying GTP, binds phospholipase C." You asked for "now carrying GTP"; with "now" it wraps to three lines and collides with the legend row below. **Caption 6** reads "Calcium and DAG switch on PKC, and the cell responds." Written out as "protein kinase C" it is three lines too. The step-6 box says "protein kinase C" in full and the enzyme is labelled PKC, so the abbreviation is defined on the page. If you want either sentence verbatim, the legend layout has to change for all six figures (two columns, or a lower cAMP line); say so and it is a Phase 2 job.
- **The counter** is the one sanctioned count, run-on only, overriding §3's no-numbers rule; T16 excludes it.
- **DAG** and its label appear at step 4 in the animation; the still keeps DAG labelled.
- **Not built, by your instruction:** the co-transcriptional splicing variant of `dogma` (held).

## 5. Phase 2, when you say go

The engine is figure-agnostic. Each figure is one object (see `GPCR` in the page): `txt(level)` for words, `svg(level)` for the drawing with ids on movers, `state(k)` for absolute positions per state, `seq` for per-step timing with optional waypoints, `focus[k]` for what scales, `beats` for the slow steps, `loop` for a run-on, `blanks(level)` for label-it-from-memory, `levels` true or null. The five placeholders are the `SOON(...)` entries at the foot of the script; replacing one with a built figure enables it in the selector.

Suggested order, hardest first so the engine gets exercised early: `etc` (proton crowd building and draining, two beats), `dogma` (three ribosomes on one strand, the level switch), `transport` (two independent loops and the ATP beat, T19), `rtk` (four stages in place, the DE closing state, T20), `cloning`. Each is roughly a third of the gpcr effort now that the engine exists. Run as one job or in two batches; your choice at the gate.

## 6. Running the tests yourself

`_briefs/figures/_source/tests/README.md` has the three commands. The suite prints the §7 table plus T21 to T27; the T3 comparison writes a two-up image. A clean run on 2026-10-11: T1 to T18 PASS (T19, T20 N/A for gpcr), T21 to T27 PASS, T3 0.89 %, T4 minimum label 18.13 px.

## 7. If something looks wrong

The page is four concatenated parts (head/CSS, body, engine, figure) kept as one file; edit the file directly. The engine's test hook is `window.__MR` in the console: `__MR.goStep(4)`, `__MR.setLevel('de')`, `__MR.focus()`, `__MR.timing()`, `__MR.state()`, `__MR.setBlank(true)`. Nothing is sent anywhere; `localStorage.mechreel` holds progress, predictions, the sentence and the Slow setting, and `__MR.reset()` clears the figure's progress.
