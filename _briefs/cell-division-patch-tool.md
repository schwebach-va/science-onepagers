# Build brief: Cell Division, The Meiosis, Mitosis, and Chromosome Patch (Bio Tool #33)

Mitosis, meiosis, and the two run side by side, chromosome by chromosome, at an SOL Biology level and a DE level.

- **Brief version:** Leg 2, written 2026-10-25 in the Science OnePagers project from the Unit 5 build outline (https://claude.ai/artifact/MyfBGPYMj3cEq4mdkxpbte). Reid settled the name, the number, the scope and the extras that evening.
- **Checked before the build:** an independent review pass re-answered all 44 bank items (every key held) and checked every science claim, told to assume errors existed. It found 21 problems (wrong facts, inconsistencies between the spec and the tests, unclear wording); all 21 are fixed in this version. A script validated the bank data: the key spread, a `miss` for every wrong option, a `sam` for every DE wrong option, and that the key is not reliably the longest option.
- **Who reads this:** the Claude Code cloud session that builds the page. This file is the whole spec.
- **Where it lives:** `_briefs/cell-division-patch-tool.md` in `schwebach-va/science-onepagers`. GitHub Pages' Jekyll skips folders that start with `_`, so it is never served. Do not add a `.nojekyll`.

---

## 0. The job, in one screen

1. Build **one new file**: `biology/tools/cell-division-patch.html`. The permanent URL is `https://scienceonepagers.org/biology/tools/cell-division-patch.html`. It is **Bio Tool #33**, titled **"Cell Division: The Meiosis, Mitosis, and Chromosome Patch"**. The `<title>` is `Cell Division: The Meiosis, Mitosis, and Chromosome Patch | Science One-Pagers`.
2. Self-contained: plain HTML, CSS and JS in one file, no build step, no framework, no external script. Google Fonts are the only external request, loaded as `biology/tools/organelles-energy.html` loads them.
3. Commit on a new branch and push it. **Do not merge into `main`, and do not open or merge a pull request unless Reid asks.** Use the branch the session assigns (`claude/…`), or **`claude/cell-division-patch`** if you choose. Name the branch in the report.
4. **Do not edit any existing file** (hubs, `sitemap.xml`, `search-index.js`, `search.html`, `style.css`, any other page). Listing and search come after Reid reviews (§11).
5. Test at **1180 × 820 CSS px (iPad landscape)** with Playwright and Chromium, in both device settings and both levels. Report **every acceptance test in §10 as PASS or FAIL**, with a one-line reason for each FAIL. Attach screenshots (§10.3).
6. **If a decision in this brief cannot be built as written** (a layout that does not fit, a motion that contradicts a test), build the nearest honest version, say so in the report, and do not choose silently. The Mechanism Reel's dogma build did this well with its second ribosome.
7. If `git push` is refused, keep the commit, report the refusal word for word, and stop.
8. **Scope if time runs short:** finish the SOL level of all three modules first. Then the DE level. If DE cannot be finished, leave the level switch present with DE disabled and labelled "DE view: coming soon", and report exactly which DE steps are missing. Drop items in this order if needed: the class-count clock input (§6, M1-G1), then egg making (M2-EGG), then the checkpoint step (M1-CHK). Never drop nondisjunction before those, and never drop a test.

## 1. Read these first (the house pattern)

| File | What to take from it |
|---|---|
| `biology/tools/organelles-energy.html` (Bio Tool #11, The Energy Patch) | **The newest pattern. Copy its frame closely.** Rebuilt 10/25 from a class review: the green ring on whatever control each step needs next (the `.next` class and `__EP.next()`), Module 3 stacked rather than a View switch, canvas labels on plates that take the colour of what they sit on (weight 500), the level switch (`nine`/`de`), device switch (iPad/Computer), Fill screen, Hide card, Teaching view with pinned callouts, step dots that light only when a step is finished, `#record`, Go further, footer, localStorage `st` with try/catch, the test hook. |
| `biology/tools/mechanism-reel.html` (Bio Tools #22, #24–#28) | Step-through motion that follows a still. Every animation's final frame matches its printed still; the reel's suites check that with a pixel diff (its T3). Motion rules: one thing moves at a time when the order matters; nothing arrives before what causes it. |
| `biology/tools/membrane-patch.html` (Bio Tool #5) | Reid's iPad rules: the stage stays pinned while text scrolls, any step opens directly from its dot, a dot lights only when that step is finished. |
| `biology/tools/sol-challenge-questions.html` (Bio Tool #8) | The item shape (`stem`, `opts`, `key`, `why`, `miss`, `study`) and the `?q=` filter used in Go further. Its Unit 5 items Q35–Q39 are the source of the openers. |
| `biology/tools/checkpoint-companion.html` (Bio Tool #9) | The `sam` prompt per wrong option, for DE students who build Student-Authored Modules from their misses. |

Match their tone and markup: the `sop-back` link to `../classroom-tools.html`, `sop-eyebrow`, `.lede`, the `.fine` note that nothing is submitted, and the `sop-foot` footer with the CC BY-NC 4.0 licence, "© J. R. Schwebach", and the link to `../../teaching/classroom-tools-note-to-teachers.html`. Use `<link rel="canonical">`, `og:` and `twitter:` meta and a `meta description`, as the Energy Patch does.

## 2. What the tool is (Reid's design, kept as he set it)

One interactive page that shows cell division as moving chromosomes a class can follow at the board, on iPads, or alone. Three modules:

- **Module 1 · Copy and split (mitosis).** One cell grows, copies its chromosomes, coils them, lines them up single file, pulls the copies apart and splits in two. An Animal / Plant switch shows the cleavage furrow or the cell plate. The two new cells are identical to the parent.
- **Module 2 · Copy once, split twice (meiosis).** The cell copies once, the partners of each matching pair line up together and swap pieces, a Shuffle button re-deals the line-up, the partners separate (the count halves here), and a second division with no copying separates the copies. Four sex cells, half the chromosomes, each different. A tally counts the kinds of sex cells made across runs.
- **Module 3 · Side by side.** Both processes start from the same G1 cell in two stacked lanes, mitosis above and meiosis below, copy once together in S, and step in lockstep. A comparison table fills one row at a time as each difference happens on screen. Then fertilization (pick a sperm and an egg, get a zygote), a short step where the zygote divides into specialized body cells, and "Which one?": eight pictures to sort as mitosis, meiosis or fertilization.

**Why Module 3 matters.** The Virginia framework for BIO.5d asks students to differentiate meiosis's products from mitosis's and to say which conditions call for each. Reid's Adv Bio learning target LT 5.4 asks students to compare and contrast the two and to identify mitosis, meiosis and fertilization from a diagram. Biochemistrypedia's lessons (linked from Bio Tool #30) already have a mitosis stepper of still pictures, an onion-root phase counter and a meiosis shuffler. This tool's distinct job is the two processes **in motion against each other at the moment they differ**. Do not rebuild a phase counter.

**Two levels.** **SOL Bio** (Virginia BIO.3c, BIO.3e, BIO.5d; Bio I and Adv Bio Unit 5) and **DE** (NOVA BIO 101 Units 9 and 10, Campbell *Biology in Focus* 3e Ch. 9 and 10). DE shows more structure (kinetochores, cohesin, chiasmata, C-values) and has three "Going further" extras: a checkpoint step, nondisjunction, and egg making.

**One model cell everywhere.** Two pairs of chromosomes (2n = 4): a long pair and a short pair. In each pair, one partner came from the mother and one from the father, drawn in two colours **and two patterns** (§5.4). Each chromosome carries one gene letter: A or a on the long pair, B or b on the short pair, hidden until a **Show genes** switch is on. The letters cost little now and let a Unit 6 allele tool reuse this drawing later.

## 3. Decisions already made (do not reopen)

- **URL, number, title** as in §0. One page with an SOL / DE switch, not two pages.
- **Meiosis stage names at the SOL level are taught and tagged "beyond the SOL."** The Virginia framework says students are not responsible for identifying the stages of meiosis; Reid's Adv Bio targets ask for them. At the SOL level, every meiosis stage name (prophase I … telophase II) appears only inside an element carrying a small **"beyond the SOL"** tag (§7.3). Step headings at SOL use plain words ("Partners pair up and swap pieces") with the tagged stage name as a chip beside them. No SOL bank item requires a meiosis stage name except the two Advanced items, A1 and A2. Mitosis stage names are on the SOL test and are shown untagged.
- **Crossing over** is shown at both levels, named "crossing over" with the plain gloss "swapping pieces", as a switch that **starts on**. The framework says only "recombination"; Reid's target names crossing over.
- **Two chromosome pairs**, not three: four kinds of sex cells is countable by a class, and three pairs crowds the iPad.
- **Both levels in one run** (scope fallback in §0.8).
- **DE "Going further" extras, all three:** nondisjunction (M2-NDJ, and its zygote in M3-FERT at DE), egg making with polar bodies (M2-EGG), and cell-cycle checkpoints (M1-CHK).
- **Specialization (BIO.3e) is one closing step** (M3-SPEC), not a module. Bio Tool #19 and SOL Challenge Q38 carry the rest.
- **The supports switch, the "beyond the SOL" tag, two agree/disagree openers, and an error-report note** are built into this tool from the start (§5.5, §5.8). They come from Reid's 10/25 comparison with Biochemistrypedia; this is the first tool to carry them.
- **Printing.** Each module's last step has a **"Print this step"** button that prints the stage's final frame as an image plus, in Module 3, the full comparison table. The final frame of each module is the printed still (T12).
- **Copyright.** No Pearson or Campbell wording, no traced textbook figures, no VDOE released-item text. Every item in §8–§9 and every text in §6 is original and may be used as written.
- **No video embeds.** Reid records his own narrated video after the lessons are set.

## 4. Science the build must get right

These are the test oracle. Build every readout from the simulation state, and let §10 check against these numbers.

### 4.1 Counts per moment (2n = 4)

"Copies" means sister chromatids. DNA is in C-value units (the G1 diploid cell = 2C) and shows at **DE only**.

| Moment | Cells | Chromosomes per cell | Chromatids per chromosome | Ploidy | DNA per cell (DE) |
|---|---|---|---|---|---|
| G1 (either process) | 1 | 4 | 1 | 2n | 2C |
| After S, G2, prophase, metaphase (mitosis) | 1 | 4 | 2 | 2n | 4C |
| Mitosis, anaphase, once sisters have separated | 1 | 8 (DE readout only; SOL shows "separating") | 1 | — | 4C |
| Mitosis, end (after cytokinesis) | 2 | 4 | 1 | 2n | 2C |
| Meiosis, anaphase I through telophase I (before cytokinesis) | 1 | 4 (the readout adds "2 at each end") | 2 | 2n | 4C |
| Meiosis, after S, through metaphase I | 1 | 4 | 2 | 2n | 4C |
| Meiosis, end of meiosis I (after cytokinesis) | 2 | 2 | 2 | n | 2C |
| Meiosis II, anaphase, once sisters have separated | 2 | 4 (DE readout only; SOL shows "separating") | 1 | — | 2C |
| Meiosis, end | 4 | 2 | 1 | n | 1C |
| Fertilization (zygote) | 1 | 4 | 1 | 2n | 2C |
| DE nondisjunction in meiosis I, end | 4 | 3, 3, 1, 1 | 1 | n+1, n+1, n−1, n−1 | — |
| DE nondisjunction in meiosis II (one cell), end | 4 | 3, 1, 2, 2 | 1 | n+1, n−1, n, n | — |
| DE zygote from an n+1 gamete and a normal gamete | 1 | 5 | 1 | 2n+1 (trisomic) | — |

At the SOL level, the ploidy readout says "Full set (diploid, 2n)" or "Half set (haploid, n)".

### 4.2 The traps (each one has a test)

1. **Count chromosomes by centromeres.** Copying doubles the DNA, not the chromosome number. An X-shaped chromosome is one chromosome of two sister chromatids.
2. **No X shapes before S.** In G1 each chromosome is a single chromatid. In interphase the chromatin is drawn as loose thread inside the nucleus, not as a coiled shape; it coils in prophase.
3. **The number halves at the end of meiosis I, not meiosis II.** The halving event is homologs separating in anaphase I.
4. **No S phase between meiosis I and meiosis II.** Show this explicitly in M2-MET2 (a "Copying? No" stamp on the stage).
5. **Homologs never separate in mitosis. Sister chromatids never separate in meiosis I**; they travel together to the same pole. Sisters separate only in mitotic anaphase and anaphase II.
6. **Line-up in metaphase I is random for each pair, independently.** With 2 pairs there are 2 orientations that give 4 kinds of sex cells. For a person, 2²³ = 8,388,608 (about 8.4 million) combinations per parent from line-up alone; with two parents, about 70 trillion zygote combinations before crossing over.
7. **Crossing over is between non-sister chromatids of a homologous pair, at matching points.** In the model it happens on the long pair only, once per run when the switch is on, at a point between the centromere and gene A, so one maternal and one paternal chromatid each end with the other parent's tip and gene. Result with crossing over on: in every run the four sex cells carry **AB, Ab, aB and ab, one each**, and differ in colour pattern. With crossing over off: one run gives **two kinds, two of each** (AB, AB, ab, ab or Ab, Ab, aB, aB, depending on the line-up). Across line-ups, all four kinds appear.
8. **Cytokinesis is its own event after nuclear division.** Animal cells: a cleavage furrow pinches in (DE label: contractile ring of actin and myosin). Plant cells: a cell plate forms in the middle from vesicles (DE: Golgi-derived) and grows out to the walls. Plant cells have a rectangular wall; draw no centrioles in the plant cell.
9. **Interphase is most of the cycle.** The clock ring (§6, M1-G1) uses SOL Challenge Q37's onion root tip counts: interphase 176, prophase 12, metaphase 5, anaphase 3, telophase 4, out of 200.
10. **The nuclear envelope** breaks down in prophase (DE: prometaphase) and re-forms in telophase. Draw it, at both levels. In meiosis it re-forms in telophase I and breaks down again in prophase II; T27's envelope rules apply per division.
11. **Motion order.** Spindle fibers attach before anything is pulled. In anaphase, sister chromatids (or homologs, in anaphase I) start moving at the same moment and arrive at the poles before the furrow or plate finishes. The partners pair before they swap; they swap before they line up.
12. **DE: cohesin.** Draw cohesin as small bands between sister chromatids along the arms and at the centromere. Anaphase I removes the arm bands only; the centromere bands stay until anaphase II. In mitosis all bands go at anaphase.
13. **DE: kinetochore orientation.** In mitosis and meiosis II, sister kinetochores face opposite poles. In meiosis I, the two sister kinetochores act as one unit facing one pole, and the homolog faces the other; the chiasma holds the pair under tension.
14. **DE: the M checkpoint.** One unattached kinetochore holds the cell at metaphase until it attaches (M1-CHK).
15. **DE: egg making.** Both meiotic divisions split the cytoplasm unequally: one large cell and a small polar body each time. Show the first polar body not dividing, with the caption that it may or may not divide. Result: one egg (n = 2) and two polar bodies. Caption: in humans, meiosis II is completed only after a sperm enters.
16. **No claim that every sex cell is unique in the model without crossing over.** The N13 wording is "with swapping turned on".

## 5. Page, layout and controls

### 5.1 Top of the page (scrolls away)

- `sop-back` link.
- `.topbar` with two `.seg` switches:
  - **Running on:** iPad / Computer, exactly as the Energy Patch (iPad default: DPR cap 2, labels ≥16 CSS px or ≥28 in Teaching view, touch targets aim 48, floor 44; Computer: DPR cap 2.5, mouse hover highlights). The science is identical in both.
  - **Module:** `1 · Mitosis` / `2 · Meiosis` / `3 · Side by side`.
- Eyebrow (§5.6), `<h1>Cell Division</h1>` with the subtitle line "The Meiosis, Mitosis, and Chromosome Patch", a `.lede` per module, the level switch `SOL Bio` / `DE Bio`, the **Help** switch (§5.5), and the `.fine` note: nothing is submitted, progress saves on this device, any step number opens that step, a number lights only for a step you have finished.
- **Before you start** card (above the build, collapsible, open the first time): two agree/disagree statements. Not scored; answers save and are shown again in M3-SORT as "Look back".
  - S1 "A new cell copies its DNA before it does any growing." (Disagree. A new cell grows first, in G1, and copies its DNA in S.)
  - S2 "A sperm cell has the same number of chromosomes as a skin cell." (Disagree. Meiosis gives sperm half the number; fertilization restores it.)
  - The parenthetical answers show only in "Look back".
- The legend: maternal and paternal chromosome swatches (colour plus pattern), spindle, nuclear envelope, and, with Show genes on, the gene tags.

### 5.2 The tool area

Copy the Energy Patch's frame: at ≥900 px landscape, `#build` is `100svh` with the stage column (about 64%) and the card column (about 36%) scrolling internally; Fill screen hides everything outside `#build` and adds compact Module / Level / Help copies; Hide card gives the stage full width with a "Card ▸" tab; below 900 px or in portrait, the stage is sticky above the card. No horizontal page scroll from 360 px up.

**Worlds:** Modules 1 and 2 draw in a 1200 × 800 world. Module 3 draws two lanes, mitosis above meiosis, in a 1200 × 1000 world, each lane labelled at its left edge ("Mitosis" / "Meiosis"). Module 3 opens with the card hidden below 1400 px wide, as the Energy Patch's Module 3 does. Scale to contain, centred.

### 5.3 The drawing

- **Canvas 2D**, one `requestAnimationFrame` loop, paused when the tab is hidden or the stage is off-screen.
- **The cell:** a large round cell (animal) or rounded rectangle with a visible wall (plant, Module 1 only), a nucleus with a double-line envelope in interphase, a soft cytoplasm tint.
- **Interphase chromatin:** loose, thin threads inside the nucleus in the four chromosome colours, so the copying in S can be seen as threads doubling. They coil into compact chromosomes in prophase.
- **A chromosome:** a rounded rod with a centromere constriction. After S, two sister chromatids side by side joined at the centromere (an X or a tight pair of rods). Long pair about 2× the short pair's length. Every moving chromosome is at least 14 world units wide.
- **Spindle:** thin fibers from two poles. DE: centrosomes with centrioles at the poles in animal cells only, and one kinetochore on each sister chromatid at the centromere (two per copied chromosome).
- **Crossing over:** the two partners lie side by side gene for gene; at the crossing point the tips of one maternal and one paternal non-sister chromatid trade places with a short, visible exchange. From then on, the swapped tip keeps its original parent's colour and pattern, so the mix stays visible to the end. DE labels the point "chiasma".
- **Gene tags** (Show genes on): a small white tag with the letter on each chromatid, near the tip of the long chromosomes (A/a) and mid-arm on the short ones (B/b). Maternal carries A and B; paternal carries a and b, before crossing over.
- **The tally** (Module 2): a small panel listing the four kinds of sex cell (by gene letters when Show genes is on, by colour pattern when off) with a count of how many of each the student has made across runs, and a count of runs.
- **Module 3's comparison table** sits under the lanes inside the stage column (not on the canvas), one row revealed per difference as it happens, rows as in the outline: copies DNA first, divisions, line-up at the middle, what separates, chromosome number in each new cell, cells made, alike?, where in the body, what it is for. A "Shared" line lists: both start after one round of copying; both use a spindle; both have prophase, metaphase, anaphase and telophase; both end with cytokinesis.
- Motion must be readable at the board: about 120–200 world units per second at speed 1, each step's animation 3–8 s at 1×.

### 5.4 Colours

Define each colour once with a dark-mode variant where contrast needs one. **Maternal and paternal must differ by pattern as well as colour**, so the model works in greyscale and for colour-blind students (T21).

| Thing | Drawn as | Colour |
|---|---|---|
| Maternal chromosomes (this organism's mother) | solid fill | coral `#D2694B` (dark `#E8957A`) |
| Paternal chromosomes (this organism's father) | fill with light diagonal stripes | blue `#3A6EA5` (dark `#7FA8D6`) |
| The other parent's egg chromosomes (M3-FERT) | solid / striped as above | green `#3F8F5A` solid (dark `#6FC08A`), purple `#7A5AA6` striped (dark `#B69AE0`) |
| Spindle fibers | thin lines | `#8A8F98` |
| Nuclear envelope | double line, dashed while breaking down | `#6B6F76` |
| Cell membrane / plant wall | outline / thick outline | `#5E6A73` / `#6C8A3E` |
| Cytoplasm tint | fill | `#F4F1EA` (dark `#23262B`) |
| Cohesin (DE) | small bands | `#8F7010` (dark `#E0C25A`) |
| Highlight for the moving thing | soft glow | the site's `--bond` teal |

Canvas labels follow the Energy Patch's 10/25 style: weight 500, on a plate that takes the colour of what it sits on, with a thin halo.

### 5.5 Controls

Built per step, as the Energy Patch's `buildCtl()` does.

**Always there:** `▶ Play / ❚❚ Pause`, `◂ Step` / `Step ▸` (to the previous or next motion event), speed `½× 1× 2×`, `Fill screen`, `Reset this step`, `Show genes` (switch).

**Help (the supports switch), at both levels:** `Task only` / `Some help` / `Most help`, also settable by `?supports=0`, `1` or `2` in the URL (the URL value wins on load and is then saved). Default `1`. **The task never changes**: the same steps, goals, items and options at all three settings. Only the help around them changes:

| | Task only (0) | Some help (1) | Most help (2) |
|---|---|---|---|
| Stage labels | the cell and the chromosomes only; tap any part to see its name | the labels in §7 | every label in §7, plus the step's moving part named on the stage |
| "Words in this step" chips | shown, collapsed | shown | shown, first chip open |
| Item hints (SOL bank `hint`) | none | none | a "Hint" button under each SOL item before it is answered |
| Key-idea line after the explanation | none | none | shown (the `idea` line of each step, §6) |

**Module 1:** `Animal / Plant` cell switch. The clock ring (§6, M1-G1). DE: on M1-CHK, `Detach a fiber` / `Reattach`.

**Module 2:** `Crossing over` switch (on by default), `Shuffle the line-up` (from M2-MET1 on; it re-deals each pair's orientation at random and replays from metaphase I), `Run again` on M2-TEL2 (a new run from S, new random line-up). DE: on M2-NDJ, `Normal` / `Fail in meiosis I` / `Fail in meiosis II`; on M2-EGG, `Sperm` / `Egg`.

**Module 3:** `Step both` (the lanes advance together; the top lane waits with a "Done: 2 cells" stamp while the bottom lane finishes meiosis II). On M3-FERT: four sperm (this organism's four sex cells from the most recent Module 2 run, or a default run if Module 2 was never run) and four eggs from the other parent (AB, Ab, aB, ab), tap one of each, then `Fertilize`. DE adds an `n+1 sperm` option that comes from M2-NDJ. On M3-SPEC: tap a cell type to see it. On M3-SORT: the eight cards.

**Teaching view:** as in the Energy Patch: opens every part of the step, lights nothing by itself, enlarges labels to board size, tapping a part pins one big callout.

Every control has an `aria-label`. The green ring marks the next control a student should press in every step, exactly as the Energy Patch's `.next` does, and it is never on a control while the model is moving by itself.

### 5.6 Eyebrow and footer per level

- **SOL:** `Bio Tool #33 · Biology I Unit 5 · SOL BIO.3c, BIO.3e, BIO.5d`. Footer: `Unit 5, Cell Growth, Division and Specialization · Biology I · PWCS LT 5.1–5.4`.
- **DE:** Module 1 `Bio Tool #33 · DE Bio 101 Unit 9 · The Cell Cycle (Campbell Ch. 9)`; Module 2 `Bio Tool #33 · DE Bio 101 Unit 10 · Meiosis and Sexual Life Cycles (Campbell Ch. 10)`; Module 3 `Bio Tool #33 · DE Bio 101 Units 9–10`.

### 5.7 Saving

localStorage key **`celldivpatch`**, holding `st`: `{dev, tab, level, supports, step:[i,i,i], ans, goals, teach, fill, cardHidden, genes, xo, cellType, tally, openers, sort, rec:[…]}`. Validate every field on load and wrap every read and write in try/catch; the page must work with storage blocked.

### 5.8 Below the tool

After `#record`, a **Go further** box:

- **On this site:** [SOL Challenge Questions Q35–Q39](sol-challenge-questions.html?q=35,36,37,38,39) (SOL view only); [The Cancer Pathway](cancer-pathway.html) (Bio Tool #19), for what happens when the cycle's controls fail; [Biochemistrypedia guide, Unit 5](biochemistrypedia-sol-biology.html#unit-5) (Bio Tool #30, SOL view only); [Checkpoint Companion](checkpoint-companion.html) (Bio Tool #9, DE view only); [Biochemistrypedia guide, Units 9 and 10](biochemistrypedia-de-biology.html#unit-9) (Bio Tool #31, DE view only).
- No video links or embeds.

Then a `.fine` **"What the model simplifies"** note: real cells have far more chromosomes (46 in a person); chromosomes are drawn far larger than scale, and everything moves far faster than in a real cell (a real mitosis takes about an hour); the gene letters stand for one gene on each chromosome when real chromosomes carry hundreds to thousands; crossing over is shown once, on one pair, at one point, when real pairs usually cross over one to three times; the clock ring uses one onion root tip count.

Then the **error note**, one line: "Spot something wrong? Tell your teacher, and give them this step's code: CDP-[module]-[step]-[level]." The code updates with the step (for example `CDP-M2-ANA1-SOL`). No email address, no form, no outside link.

## 6. Modules and steps

Each step follows the Energy Patch's step object: `key`, `short`, `head` (per level), `pre` and `post` items, `task`, `goals`, the explanation text (`sol` and `de`), and an `idea` line for Most help. `lv:"de"` marks a DE-only step; its dot is not drawn at SOL. Items with `adv:true` (A1, A2) show at SOL under an "Advanced Biology" badge and never block a step.

**Goals must be detectable from simulation state**, never from a timer alone. Goal ids and their descriptions here are internal. Student-facing goal text is written per level and must pass T6 (no SOL-forbidden word at SOL). `seen` = the step's animation has played through to its final frame at least once.

At SOL, meiosis step heads carry the tagged stage chip given in brackets, for example *Partners pair up and swap pieces* [Prophase I · beyond the SOL].

### Module 1 · Copy and split (mitosis)

**M1-G1 · A new cell grows**
- SOL: pre N1. DE: pre D1. Task: *"Press Play and watch the new cell grow. Then find this moment on the clock ring."* Goals: `seen`; `clock` = the clock ring tapped once.
- **The clock ring** sits beside the cell in Module 1: the cycle as a ring with arcs proportional to Q37's counts (interphase 176/200, prophase 12, metaphase 5, anaphase 3, telophase 4) and a marker at the current step. Interphase is one arc labelled "Interphase (G1, S, G2)", with no claim about how its three parts divide. Under it, an optional "Your class's counts" input (five numbers and a cycle length in hours, default 24) redraws the ring and shows each phase's estimated hours. Caption: "Onion root tip counts, 200 cells (SOL Challenge Q37)." (This input is first to drop if time runs short.)
- **sol:** "A cell made by division starts small. Each of its chromosomes is a single thread, not yet copied. In G1, the first growth phase, it grows, makes proteins and does its job. Its chromosomes are loose threads inside the nucleus, too thin to see as separate shapes. Most of a cell's life is spent in interphase, the time between divisions: in an onion root tip, 176 of every 200 cells are in interphase."
- **de:** "G1 is the first gap phase: growth, protein synthesis and normal function. Chromatin is decondensed, which is what lets genes be transcribed. Interphase (G1, S and G2) dominates the cycle; in the root tip counts, 88% of cells are in interphase, so it takes about 88% of the cycle's time. Cells that stop dividing leave G1 for G0, a non-dividing state, and many mature cells, such as most neurons, stay there."
- idea: "First a new cell grows."

**M1-S · Copying the DNA (S)**
- SOL: pre N2. DE: pre D2. Task: *"Watch each thread make a copy of itself. Then count the chromosomes."* Goals: `seen`; `copies` = every chromosome shows 2 chromatids.
- **sol:** "In S, the cell copies every chromosome. The two copies stay joined at a point called the centromere, so each chromosome becomes a pair of identical sister chromatids. Count the chromosomes by their centromeres: there are still 4. The DNA doubled, but the number of chromosomes did not."
- **de:** "S phase is DNA replication: each chromosome becomes two sister chromatids, each one a complete DNA double helix, held together by cohesin proteins along their length and at the centromere. Chromosome number is unchanged (2n = 4), chromatids double to 8, and DNA content rises from 2C to 4C. Replication happens only here; nothing in M phase copies DNA."
- idea: "Copying doubles the DNA, not the number of chromosomes."

**M1-G2 · Getting ready (G2)**
- SOL: no items. DE: post D3. Task: *"Watch the cell grow again and check its copies."* Goal: `seen`.
- **sol:** "In G2 the cell grows a little more, makes the proteins it needs for dividing, and checks that every chromosome was copied correctly. G1, S and G2 together make up interphase."
- **de:** "G2 is the second gap phase: more growth and the synthesis of proteins for M phase. At the G2 checkpoint, the cell confirms that replication is complete and that DNA damage is repaired before it commits to mitosis; the commitment is driven by the cyclin–Cdk complex called MPF."
- idea: "Grow, copy, grow and check: that is interphase."

**M1-PRO · Prophase** (DE head: "Prophase and prometaphase")
- SOL: post N3. DE: pre D4. Task: *"Watch the threads coil. Then tap one chromosome to see its two chromatids."* Goals: `seen`; `tap` = a chromosome tapped (callout names its two sister chromatids and centromere).
- **sol:** "In prophase the loose threads coil into short, thick chromosomes you could see under a microscope, each one an X of two sister chromatids. The nuclear envelope breaks apart, and spindle fibers grow from the two ends of the cell toward the chromosomes."
- **de:** "In prophase, chromatin condenses into discrete chromosomes and the mitotic spindle begins to form from the centrosomes, which move apart. In prometaphase the nuclear envelope fragments, and spindle microtubules capture the chromosomes at their kinetochores, protein plates at each centromere. Each sister's kinetochore is captured from the opposite pole."
- idea: "Coiled chromosomes can be moved without tangling."

**M1-MET · Metaphase**
- SOL: pre N4. DE: post D5. Task: *"Watch the spindle line the chromosomes up."* Goals: `seen`; `line` = all 4 chromosomes on the middle line.
- **sol:** "In metaphase the spindle fibers pull from both sides until every chromosome sits on the middle line of the cell, single file. Each chromosome's two chromatids face opposite ends, so each new cell will get one copy of every chromosome."
- **de:** "At metaphase the chromosomes are aligned on the metaphase plate, each sister kinetochore attached to microtubules from opposite poles, which puts the chromosome under balanced tension. The spindle assembly (M) checkpoint holds the cell here until every kinetochore is attached."
- idea: "Mitosis lines chromosomes up single file."

**M1-ANA · Anaphase**
- SOL: pre N5. DE: pre D6. Task: *"Watch what the spindle pulls apart."* Goals: `seen`; `apart` = all chromatids at the poles.
- **sol:** "In anaphase the sister chromatids of every chromosome come apart at the same moment and are pulled to opposite ends of the cell. Each end now has one copy of all 4 chromosomes."
- **de:** "Anaphase begins when the cohesin holding sisters together is cleaved, all at once. Each former chromatid is now a chromosome with its own centromere, so the cell briefly holds 8 chromosomes, 4 moving to each pole as kinetochore microtubules shorten. The poles also move apart."
- idea: "In mitosis, the two copies of each chromosome separate."

**M1-TEL · Telophase and cytokinesis**
- SOL: post N6. DE: post D7. Task: *"Watch the two nuclei form and the cell split. Then switch to a plant cell and watch it split."* Goals: `seen`; `both` = the step played through once as Animal and once as Plant.
- **sol:** "In telophase a nuclear envelope forms around each set of chromosomes, and the chromosomes loosen back into threads. Then cytokinesis splits the cytoplasm. An animal cell pinches in the middle; a plant cell, with its stiff wall, builds a cell plate across its middle, which becomes a new wall. The result is two cells, each with 4 chromosomes, identical to each other and to the cell that started."
- **de:** "In telophase, daughter nuclei form and chromatin decondenses. Cytokinesis follows: in animal cells a contractile ring of actin and myosin forms a cleavage furrow; in plant cells, vesicles from the Golgi collect at the middle and fuse into a cell plate that grows outward into a new wall. Each daughter is 2n = 4 with 2C DNA, identical to the parent."
- idea: "Mitosis: two cells, identical to the parent."

**M1-CHK · Checkpoints** (DE only, "Going further")
- DE: pre D8. Task: *"Press Detach a fiber, run the step, and see whether anaphase starts. Then reattach."* Goals: `hold` = with one kinetochore detached, the cell stays at metaphase for ≥5 s of simulation; `release` = after Reattach, anaphase starts.
- **de:** "Three main checkpoints guard the cycle. At G1, the cell decides whether to divide, delay or enter G0. At G2, it checks that DNA is fully replicated and undamaged. At the M checkpoint, anaphase waits until every kinetochore is attached to the spindle. Progress through the cycle is driven by cyclins, which rise and fall, binding cyclin-dependent kinases (Cdks); one cyclin–Cdk complex, MPF, triggers entry into M phase. Cells that ignore these checkpoints are the subject of the Cancer Pathway (Bio Tool #19)."

### Module 2 · Copy once, split twice (meiosis)

**M2-S · Copying the DNA, once**
- SOL: pre N7. DE: pre D9. Task: *"Watch the cell copy its chromosomes. This is the only copying in meiosis."* Goals: `seen`; `copies`.
- **sol:** "Meiosis happens only in the reproductive organs, in cells that will become sperm or eggs. It starts like mitosis: in S the cell copies every chromosome, so each becomes two sister chromatids. This is the only copying. Two divisions follow."
- **de:** "Meiosis occurs only in germ cells in the gonads. Interphase and S phase are as in mitosis: the 2n = 4 cell ends S with 4 chromosomes of two chromatids each, 4C. One replication, then two divisions, is what reduces ploidy."
- idea: "Meiosis: copy once, then split twice."

**M2-PRO1 · Partners pair up and swap pieces** [Prophase I · beyond the SOL]
- SOL: post N8. DE: pre D10. Task: *"Watch the matching partners find each other and swap pieces. Then turn crossing over off and replay to compare."* Goals: `seen`; `pair` = both pairs synapsed; `swap` = the step seen once with crossing over on and once off.
- **sol:** "Each chromosome has a partner: the matching chromosome from the other parent, the same length with the same genes in the same order. The partners, called homologous chromosomes, find each other and line up side by side. Then they swap matching pieces. This is crossing over, and the swapped chromosomes end up a mix of the two parents' genes."
- **de:** "In prophase I, homologs pair gene for gene in synapsis, forming a tetrad (bivalent) of four chromatids. Crossing over exchanges corresponding segments between non-sister chromatids; the crossover sites are visible as chiasmata, which hold the homologs together until anaphase I. Each recombinant chromatid now carries alleles from both parents. Prophase I is the longest phase of meiosis."
- idea: "Crossing over mixes the parents' genes on a chromosome."

**M2-MET1 · Pairs line up at the middle** [Metaphase I · beyond the SOL]
- SOL: pre N9, post A1 (adv). DE: post D11. Task: *"Press Shuffle the line-up three times and watch which partner faces which end."* Goals: `seen`; `shuffle3` = Shuffle pressed 3 times.
- **sol:** "In the first division, the partners stay together and line up as pairs across the middle of the cell. Which partner faces which end is random, separately for each pair. That random line-up is called independent assortment. With 2 pairs there are 4 possible combinations; with a person's 23 pairs there are about 8.4 million."
- **de:** "At metaphase I, tetrads align on the metaphase plate. The two sister kinetochores of each homolog act as one unit facing one pole, and the homolog faces the other. Each pair's orientation is independent of every other pair's, so the number of possible combinations is 2ⁿ: 4 for n = 2, and 2²³ ≈ 8.4 million for humans."
- idea: "Pairs line up in a random arrangement."

**M2-ANA1 · Partners separate** [Anaphase I · beyond the SOL]
- SOL: pre N10. DE: pre D12. Task: *"Watch what separates, and watch the count at each end."* Goals: `seen`; `halve` = each pole holds 2 chromosomes.
- **sol:** "The partners of each pair are pulled to opposite ends. The sister chromatids stay joined and travel together. Each end now has one chromosome from each pair: 2 instead of 4. This is where the chromosome number is cut in half."
- **de:** "In anaphase I, cohesin along the arms is cleaved, the chiasmata resolve, and homologs move to opposite poles. Cohesin at the centromeres is protected, so sister chromatids stay together. Each pole receives a haploid set, n = 2, each chromosome still two chromatids."
- idea: "The number halves when the partners separate."

**M2-TEL1 · Two cells, half the set** [Telophase I · beyond the SOL]
- SOL: post N11. DE: post D13. Task: *"Watch the first split."* Goals: `seen`; `two` = two cells.
- **sol:** "The cell splits in two. Each new cell has 2 chromosomes, one from each pair, and each chromosome is still two sister chromatids. The cells have half the full set: they are haploid."
- **de:** "Telophase I and cytokinesis give two haploid cells, each n = 2 with chromosomes still of two chromatids: 2C. Because of crossing over, the two sisters of a recombinant chromosome are no longer identical."
- idea: "After the first split: two cells, half the set."

**M2-MET2 · The second division begins, with no copying** [Prophase II and metaphase II · beyond the SOL]
- SOL: pre N12. DE: pre D14. Task: *"Watch both cells. Do they copy their DNA first?"* Goals: `seen`; `line2` = both cells' chromosomes on their middle lines. A "Copying? No" stamp shows on the stage at the start of this step.
- **sol:** "Each of the two cells divides again, and this time there is no copying first. In each cell the 2 chromosomes line up single file across the middle, as in mitosis."
- **de:** "There is no S phase between meiosis I and meiosis II. In prophase II a spindle forms; at metaphase II the chromosomes of each haploid cell align singly on the plate, with sister kinetochores facing opposite poles, as in mitosis."
- idea: "No copying between the two divisions."

**M2-ANA2 · The copies separate** [Anaphase II · beyond the SOL]
- SOL: no items. DE: post D15. Task: *"Watch the copies come apart in both cells."* Goals: `seen`; `apart2`.
- **sol:** "In each cell the sister chromatids come apart and move to opposite ends, as in mitosis."
- **de:** "Centromeric cohesin is cleaved and sister chromatids separate. Each cell briefly holds 4 chromosomes, 2 moving to each pole."
- idea: "The second division separates the copies."

**M2-TEL2 · Four sex cells** [Telophase II · beyond the SOL]
- SOL: post N13. DE: post D16. Task: *"Watch the four cells form. Turn on Show genes and read each one. Then press Run again with crossing over off and compare."* Goals: `seen`; `four` = four cells; `compare` = a full run completed with crossing over on and one with it off. The tally panel updates after every run.
- **sol:** "Four cells, each with 2 chromosomes: half the set. With crossing over on, no two are alike, because the swapped pieces and the random line-up shuffled the parents' genes. These cells become sperm or eggs. Turn crossing over off and the four come out as two matching pairs."
- **de:** "Four haploid cells, each 1C, genetically distinct. Three mechanisms make sexual offspring vary: crossing over (prophase I), independent assortment (metaphase I), and random fertilization. The tally shows all four combinations of A/a and B/b appearing across runs."
- idea: "Meiosis: four different cells, each with half the set."

**M2-NDJ · When a pair fails to separate** (DE only, "Going further")
- DE: pre D17. Task: *"Run Fail in meiosis I, then Fail in meiosis II, and compare the four cells each time."* Goals: `ndj1` and `ndj2` = each run completed. The readout lists the four cells' counts (3, 3, 1, 1 and 3, 1, 2, 2).
- **de:** "Nondisjunction is a failure of homologs (in meiosis I) or sister chromatids (in meiosis II) to separate. A failure in meiosis I affects all four gametes, giving two with n + 1 and two with n − 1; a failure in meiosis II affects one of the two cells, giving one n + 1, one n − 1 and two normal. A gamete with an extra chromosome produces a trisomic zygote at fertilization; trisomy 21 is the familiar human example."

**M2-EGG · Making an egg** (DE only, "Going further")
- DE: pre D18. Task: *"Switch to Egg and run it. Compare with Sperm."* Goals: `egg` = an egg run completed; `sperm` = a sperm run completed.
- **de:** "Spermatogenesis divides the cytoplasm evenly, giving four similar cells that become sperm. Oogenesis divides it unequally both times: one large cell keeps nearly all the cytoplasm, and small polar bodies are pinched off. The first polar body may or may not divide. In humans, meiosis I begins before birth and pauses, and meiosis II is completed only if a sperm enters."

### Module 3 · Side by side

Both lanes run the same model cell. **Module 3 always runs with crossing over on, whatever the Module 2 setting.** Every step plays both lanes together; the table row for that step appears when its difference happens on screen.

**M3-START · The same start**
- No items. Task: *"Press Step both and watch both lanes copy their DNA."* Goals: `seen`. Table row: "Copies DNA first?" (Once, in S / Once, in S, and not again).
- **sol:** "Both lanes start with the same cell, and both copy every chromosome once, in S. Up to here, mitosis and meiosis look the same."
- **de:** "Both start from a 2n = 4 cell after S: 4 chromosomes, 8 chromatids, 4C. The divergence begins in prophase, with synapsis in the meiosis lane only."
- idea: "Same start: one round of copying."

**M3-LINE · The line-up**
- SOL: pre N14. DE: pre D19. Task: *"Compare the middle of the two cells."* Goals: `seen`. Table rows: "At the middle of the cell", "Divisions".
- **sol:** "Here the two part ways. In mitosis the chromosomes line up single file. In the first division of meiosis the partners line up as pairs, after swapping pieces."
- **de:** "Mitotic metaphase: chromosomes aligned singly, sister kinetochores bi-oriented. Metaphase I: tetrads aligned in pairs, sister kinetochores co-oriented. Synapsis and crossing over occur only in meiosis."
- idea: "Single file is mitosis; pairs are meiosis."

**M3-SEP · What separates**
- SOL: post A2 (adv). DE: post D20. Task: *"Watch what each lane pulls apart."* Goals: `seen`. Table row: "What separates".
- **sol:** "Mitosis pulls the two sister chromatids of each chromosome apart. The first division of meiosis pulls the partners apart and leaves the sister chromatids joined."
- **de:** "Anaphase of mitosis separates sisters; anaphase I separates homologs, with sisters held together by centromeric cohesin. Meiosis separates sisters only later, in anaphase II."
- idea: "Mitosis splits copies. Meiosis splits partners first."

**M3-END · The results**
- SOL: post N15. DE: post D21. Task: *"Step both until both lanes finish. Count the cells and the chromosomes."* Goals: `seen` (both lanes at their final frames). Table rows: "Chromosome number in each new cell", "Cells made", "Alike?", "Where in the body", "What it is for". The "Shared" line appears.
- **sol:** "Mitosis ends with 2 cells, each with the full set of 4, identical to the parent: cells for growth and repair, made in body cells everywhere. Meiosis ends with 4 cells, each with half the set, all different: sex cells, made only in the reproductive organs."
- **de:** "Mitosis: one division, 2 diploid daughters, genetically identical, for growth, repair and asexual reproduction. Meiosis: two divisions after one replication, 4 haploid products, genetically distinct, only in germ cells. The ploidy readout in each lane shows where 2n becomes n."
- idea: "Mitosis copies; meiosis halves and shuffles."

**M3-FERT · Fertilization**
- SOL: pre N16. DE: pre D22. Task: *"Pick a sperm and an egg, then press Fertilize. Turn on Show genes and read the zygote."* Goals: `fert` = one zygote made. DE adds an `n+1 sperm` choice; goal `trisomy` = a zygote made from it (count 5, readout "2n + 1, trisomic").
- **sol:** "A sperm with half the set joins an egg with half the set. The fertilized egg, called a zygote, has the full set again: 2 + 2 = 4, one of each pair from each parent. Meiosis halves the number so that fertilization can restore it, generation after generation."
- **de:** "Fertilization restores diploidy: n + n = 2n. Random fertilization multiplies the variation: about 8.4 million possible gametes from each parent give about 70 trillion possible zygotes before crossing over. An n + 1 gamete gives a 2n + 1 trisomic zygote."
- idea: "Fertilization brings back the full set."

**M3-SPEC · One cell becomes many kinds**
- SOL: post N17. DE: post D23. Task: *"Watch the zygote divide, then tap three of the cell types."* Goals: `seen`; `spec3` = three cell types tapped. The zygote divides by mitosis to 2, 4 and 8 cells (top lane style), then the stage shows four specialized cells (nerve, muscle, red blood cell, skin), each with the same small 4-chromosome icon, except the red blood cell, drawn with no nucleus and no icon. Tapping one shows a one-line form-and-function caption. The red blood cell's caption notes that it loses its nucleus as it matures.
- **sol:** "Every cell in your body came from the zygote by mitosis, so nearly every body cell carries the same chromosomes. As an embryo grows, each cell switches on a different set of genes, and those genes build the shape and parts its job needs. A nerve cell grows long branches to carry signals; a muscle cell fills with proteins that pull; a red blood cell packs in the protein that carries oxygen. This is specialization."
- **de:** "Somatic cells share the zygote's genome; differentiation comes from differential gene expression, regulated by transcription factors and signals from neighbouring cells. Stem cells retain the ability to divide and to give rise to specialized cells."
- idea: "Same DNA, different genes switched on."

**M3-SORT · Which one?**
- SOL: post N18. DE: post D24. Task: *"Sort the eight pictures: mitosis, meiosis or fertilization."* Goals: `sort` = all eight placed correctly (a wrong placement shows its feedback and can be redone). Then the "Look back" card shows the two openers with the student's original answers and the right answers.
- The parenthetical stage names below are for the builder and are never rendered. Cards carry part labels only (chromosome, spindle), never a process or stage name.
- The eight cards, drawn by the same renderer as small canvases (at DE, the labels on the cards use DE words; the cards are the same):
  1. Pairs side by side across the middle (metaphase I) → meiosis. Feedback: "Partners lined up together: only the first division of meiosis does this."
  2. Four X-shaped chromosomes in a single line (metaphase of mitosis) → mitosis. "Single file with the full set of 4: mitosis."
  3. Two X-shaped chromosomes in a single line, one long and one short (metaphase II) → meiosis. "Single file, but only 2 chromosomes, one of each pair: the second division of meiosis."
  4. A sperm nucleus meeting an egg nucleus → fertilization. "Two half sets joining: fertilization."
  5. Whole X-shaped chromosomes moving apart, partners going opposite ways (anaphase I) → meiosis. "Whole Xs moving and partners parting: the first division of meiosis."
  6. Single chromatids moving apart, 4 to each end (anaphase of mitosis) → mitosis. "Copies separating, 4 to each end: mitosis."
  7. A zygote dividing into two identical cells → mitosis. "A zygote grows by mitosis."
  8. Four small cells, each with 2 chromosomes of different colour patterns → meiosis. "Four different cells with half the set: the end of meiosis."
- **sol:** "Two questions sort almost every picture. Are partners together, or apart in different cells? Is the set full or half? Pairs together, or half sets, mean meiosis. Two half sets joining mean fertilization. A full set dividing into identical cells means mitosis."
- **de:** "Sort by ploidy and by what is paired: tetrads mean meiosis I; a haploid cell with chromosomes aligned singly means meiosis II; a diploid cell with chromosomes aligned singly means mitosis; two haploid nuclei fusing mean fertilization."
- idea: "Ask: pairs together? Full set or half?"

**Readouts per step:** cells; chromosomes per cell (SOL shows "separating" during anaphases); chromatids per chromosome; the ploidy line; at DE, DNA per cell in C. Module 3 shows one readout per lane.

## 7. Words on screen

### 7.1 SOL level

A word may appear only if it is in these lists or is defined where it appears.

- **Met before Unit 5:** cell, nucleus, cytoplasm, cell membrane, cell wall, organelle, protein, DNA, gene, enzyme, ribosome, mitochondria, chloroplast, prokaryote, eukaryote, ATP, plant cell, animal cell, tissue, embryo, offspring, variation, ovaries, testes, bone marrow.
- **Taught in Unit 5** (each defined in its step's "Words in this step" chips): cell cycle, interphase, G1, S, G2, mitosis, prophase, metaphase, anaphase, telophase, cytokinesis, chromosome, sister chromatids, centromere, spindle, spindle fibers, nuclear envelope, cell plate, somatic (body) cell, gamete (sex cell), sperm, egg, zygote, fertilization, diploid, haploid, homologous chromosomes, meiosis, crossing over, independent assortment, specialization, stem cell.
- **Plain glosses to use alongside:** "matching pair" or "partners" for homologous chromosomes; "copies" for sister chromatids; "swapping pieces" for crossing over; "random line-up" for independent assortment; "full set" and "half set" for diploid and haploid.

**Forbidden anywhere in the SOL view** (T6 checks every string `allText("sol")` returns and the rendered DOM, case-insensitive, whole word):

```js
const SOL_FORBIDDEN = ["kinetochore","kinetochores","centrosome","centrosomes","centriole","centrioles","synapsis","synapsed",
 "tetrad","tetrads","bivalent","bivalents","chiasma","chiasmata","cohesin","cohesins","separase","shugoshin","prometaphase",
 "nondisjunction","aneuploid","aneuploidy","trisomy","trisomic","monosomy","monosomic","polar body","polar bodies",
 "oogenesis","spermatogenesis","oocyte","oocytes","cyclin","cyclins","Cdk","Cdks","MPF","kinase","kinases","G0",
 "checkpoint","checkpoints","contractile ring","actin","myosin","Golgi","2C","4C","1C","transcription factor","transcription factors"];
```

### 7.2 DE level

DE uses Campbell's terms, as the DE hub does: chromatin, sister chromatids, centromere, kinetochore, centrosome, centriole, mitotic spindle, metaphase plate, cleavage furrow, contractile ring, cell plate, G0, checkpoint, cyclin, Cdk, MPF, germ cell, gonad, homologs, synapsis, tetrad (bivalent), crossing over, chiasma, independent assortment, random fertilization, cohesin, nondisjunction, aneuploidy, trisomy, polar body, oogenesis, spermatogenesis, n, 2n, C-value.

### 7.3 The "beyond the SOL" tag

- A small pill reading **beyond the SOL**, styled like the Energy Patch's "Advanced Biology" badge but in a neutral colour. Hovering or tapping it shows: "Virginia's SOL test does not ask you to name the stages of meiosis. This course does."
- At the SOL level, every string matching `/\b(pro|meta|ana|telo)phase\s+(I{1,2}|1|2)\b/i` must be rendered inside an element with the tag, and must be returned by `beyondText("sol")` (T8). This applies to step chips, stage labels, the A1–A2 items and their notes, and sort-card feedback if any card names a stage.
- Mitosis stage names are not tagged.
- At the DE level, no tags.

## 8. The SOL bank (N1–N18, A1–A2)

Use this data exactly: stems, option order, keys, and the `why`, `miss`, `hint` and `study` texts. Render items the way the Energy Patch and Bio Tool #8 do: stem and options; once an option is picked the options lock and the right one turns green; a wrong pick turns red and shows its `miss` note, then the `why`; `study` in small type under the `why`.

- `hint` shows only at Most help (§5.5), as a "Hint" button before the item is answered.
- `src` is for Reid and is **never rendered**.
- Keys are spread A 5 · B 5 · C 5 · D 5. A script checked that the key is not reliably the longest option (it is strictly longest in 7 of 20 SOL items and 5 of 24 DE items); keep option lengths comparable if you edit anything.
- A1 and A2 (`adv:true`) show under an "Advanced Biology" badge **and** the "beyond the SOL" tag (§7.3). They are optional and never block a step.

```js
// SOL bank. Permanent numbers: N1–N18, A1–A2. Never renumber; retire with retired:true.
// key = index (0–3) of the right option, options shown in this order. miss = note for each wrong option.
// step/role = where it appears (pre = prediction before the controls unlock; post = check yourself).
// adv:true = Advanced Biology only, tagged beyond the SOL, optional. src = for Reid only; NOT rendered.
const BANKSOL = [
{n:"N1",
 step:"M1-G1",
 role:"pre",
 topic:"What a new cell does first",
 stem:"A cell has just been made by division. It is small, and its DNA has not been copied yet. What does it do next?",
 opts:["It divides again right away",
       "It copies its DNA before doing anything else",
       "It grows and does its normal job",
       "It splits its cytoplasm a second time"],
 key:2,
 why:"A new cell starts in G1, the first growth phase: it grows, makes proteins and does the work that cell type does. Most of a cell's life is spent in this kind of normal work. Copying the DNA (S) comes after G1, and dividing comes last.",
 miss:{0:"A cell that divided right away would get smaller every time. It has to grow and copy its DNA first.",
       1:"Copying (S) comes after the first growth phase, not before it. The cell grows first.",
       3:"Cytokinesis already happened; that is how this cell was made. It splits only once per cycle."},
 hint:"Think about the cell's size. Can a cell that just split in half divide again and stay healthy?",
 study:"G1 growth → S copying → G2 growth and checking → mitosis → cytokinesis.",
 src:"Canvas LT 5.1; SOL Challenge Q36 (37% statewide)"},

{n:"N2",
 step:"M1-S",
 role:"pre",
 topic:"Copying does not change the chromosome count",
 stem:"The model cell has 4 chromosomes. In S it copies its DNA, and each chromosome becomes an X of two joined copies. How many chromosomes does the cell have now?",
 opts:["4, each made of two joined copies",
       "8, because the DNA doubled",
       "2, because copying halves the number",
       "16, because each copy is copied again"],
 key:0,
 why:"Count chromosomes by their joining points (centromeres). Each X is still one chromosome, now made of two identical sister chromatids held together. The DNA doubled, but the number of chromosomes stayed at 4. The count changes only when the copies are pulled apart.",
 miss:{1:"The DNA doubled, but the two copies are still joined into one chromosome. Count the joining points: there are 4.",
       2:"Nothing halves during copying. Halving happens only in meiosis, when partner chromosomes separate.",
       3:"Each chromosome is copied once in S, not twice."},
 hint:"Count the joining points in the middle of each X, not the arms.",
 study:"Copying doubles the DNA. The number of chromosomes stays the same until the copies separate.",
 src:"Canvas LT 5.1 (chromosome structure); common error on counting chromatids"},

{n:"N3",
 step:"M1-PRO",
 role:"post",
 topic:"Why chromosomes coil",
 stem:"In prophase, the long, loose DNA threads coil into short, thick chromosomes. Why does the cell do this before dividing?",
 opts:["Coiling is the step that copies the DNA so each new cell gets a set",
       "Coiling cuts the number of chromosomes in half before the cell divides",
       "Coiled DNA lets the cell read its genes and make proteins faster",
       "Short, thick chromosomes can be moved and sorted without tangling or breaking"],
 key:3,
 why:"Uncoiled, the DNA in one human cell would stretch about two meters. Coiling packs each chromosome into a short, sturdy shape that the spindle can pull across the cell without tangling or snapping it. The cell makes most of its proteins in interphase, while the DNA is loose and can be read.",
 miss:{0:"The copying already happened in S. Coiling only packs the copies that exist.",
       1:"Coiling changes the shape, not the number. The cell still has 4 chromosomes.",
       2:"The cell reads its genes while the DNA is loose. Tightly coiled DNA is hard to read."},
 hint:"Picture moving a long tangle of yarn across a room, then the same yarn wound into a ball.",
 study:"Prophase: chromosomes coil and become visible, the nuclear envelope breaks down, and the spindle forms.",
 src:"Canvas LT 5.2 Mitosis Notes"},

{n:"N4",
 step:"M1-MET",
 role:"pre",
 topic:"Where chromosomes line up in mitosis",
 stem:"Predict: in the next stage of mitosis, where will the chromosomes line up?",
 opts:["In matching pairs, side by side across the middle",
       "In a single line across the middle of the cell",
       "Along the inside of the cell membrane",
       "In two groups, one at each end of the cell"],
 key:1,
 why:"In metaphase, the spindle fibers hold each chromosome on the middle line of the cell, one chromosome after another. That way each chromosome has one copy facing each end, and every new cell will get one copy of every chromosome.",
 miss:{0:"Matching pairs line up side by side only in the first division of meiosis. In mitosis each chromosome lines up on its own.",
       2:"The spindle pulls the chromosomes into the middle of the cell, away from the membrane.",
       3:"The chromosomes reach the two ends later, in anaphase and telophase. First they line up in the middle."},
 hint:"Each new cell needs one copy of every chromosome. Where should each chromosome sit so its two copies face opposite ends?",
 study:"Metaphase: chromosomes line up single file across the middle.",
 src:"Canvas LT 5.2; Mitosis Drag-and-Drop"},

{n:"N5",
 step:"M1-ANA",
 role:"pre",
 topic:"What separates in mitosis",
 stem:"Predict: in anaphase, what will the spindle pull apart?",
 opts:["The matching chromosomes, one from each parent",
       "The two copies (sister chromatids) of each chromosome",
       "The nucleus from the cytoplasm",
       "The genes from the chromosomes"],
 key:1,
 why:"The spindle fibers shorten and pull the two copies of every chromosome toward opposite ends. Each end ends up with one copy of all 4 chromosomes, so the two new cells will be identical to each other and to the parent cell.",
 miss:{0:"Matching partners separate only in the first division of meiosis. In mitosis the partners never leave each other's cell.",
       2:"The nuclear envelope has already broken down. The spindle pulls on chromosomes, not on the nucleus.",
       3:"Genes are parts of the DNA in each chromosome. They move with their chromosome."},
 hint:"Look at one X. What would you pull apart so each end gets one of everything?",
 study:"Anaphase of mitosis: sister chromatids separate and move to opposite ends.",
 src:"Canvas LT 5.2"},

{n:"N6",
 step:"M1-TEL",
 role:"post",
 topic:"What mitosis produces",
 stem:"A skin cell with 46 chromosomes divides by mitosis. What does each of the two new cells have?",
 opts:["23 chromosomes, different from the parent cell",
       "92 chromosomes, because the DNA was copied",
       "46 chromosomes, each one a new mix of the parents' genes",
       "46 chromosomes, identical to the parent cell"],
 key:3,
 why:"Mitosis makes two cells that are copies of the original: same number of chromosomes, same genes. That is what growth and repair need. A cut on your skin heals with skin cells that carry the same DNA as the rest of you.",
 miss:{0:"Halving the number and making different cells is what meiosis does, and only in the reproductive organs.",
       1:"The DNA was copied, then shared equally between the two cells. Each gets 46.",
       2:"Mixing parents' genes happens in meiosis, when partners swap pieces. Mitosis makes exact copies."},
 hint:"Mitosis is for growth and repair. Should a repaired skin cell be different from the rest of your skin?",
 study:"Mitosis: one division, two identical cells, full chromosome number.",
 src:"Canvas LT 5.2 (how many and what type of cell); SOL Challenge Q39 distractors"},

{n:"N7",
 step:"M2-S",
 role:"pre",
 topic:"Meiosis copies once",
 stem:"Meiosis makes four cells through two divisions. How many times does the cell copy its DNA?",
 opts:["Once, before the first division",
       "Twice, once before each division",
       "Four times, once for each new cell",
       "Never; meiosis divides the DNA it already has without copying"],
 key:0,
 why:"The DNA is copied once, in S, before meiosis begins. Then the cell divides twice with no copying in between. Copy once, split twice: that is how the four cells end up with half the chromosomes.",
 miss:{1:"If the cell copied before each division, the chromosome number would never drop. There is no S between the two divisions.",
       2:"There are four cells at the end but only one round of copying at the start.",
       3:"The cell does copy once, in S. Each chromosome enters meiosis as an X of two copies."},
 hint:"If a cell copied before every division, could the chromosome number ever go down?",
 study:"Meiosis: one copy (S), then two divisions.",
 src:"Canvas LT 5.3 Meiosis Notes"},

{n:"N8",
 step:"M2-PRO1",
 role:"post",
 topic:"What crossing over does",
 stem:"The matching chromosomes from the two parents pair up and swap matching pieces (crossing over). What does that change?",
 opts:["The cell now has twice as many chromosomes as before",
       "The two partners become identical copies of each other",
       "Some chromosomes now carry a mix of both parents' genes",
       "The swapped genes are destroyed and then rebuilt"],
 key:2,
 why:"The partners trade matching pieces, so a chromosome that came from one parent now carries part of the other parent's chromosome. The number of chromosomes and genes stays the same. What changes is the combination, and new combinations are one source of variation among offspring.",
 miss:{0:"Swapping trades pieces; it adds nothing. The cell still has 4 chromosomes.",
       1:"They trade only part of their length, so the swapped chromosomes each end up a mix. They do not become copies of each other.",
       3:"Nothing is destroyed. Whole matching pieces change places, genes and all."},
 hint:"Two people trade the second half of their playlists. How many songs does each have now, and whose songs?",
 study:"Crossing over: partners swap matching pieces, making new combinations of genes.",
 src:"Canvas LT 5.3 (processes that promote diversity)"},

{n:"N9",
 step:"M2-MET1",
 role:"pre",
 topic:"How pairs line up in meiosis",
 stem:"Predict: in the first division of meiosis, how will the chromosomes line up?",
 opts:["In a single line, one chromosome after another",
       "All on one side of the cell",
       "They stay scattered; only mitosis lines them up",
       "In matching pairs, side by side across the middle"],
 key:3,
 why:"In the first division of meiosis, each matching pair lines up together on the middle line, one partner facing each end. Which partner faces which end is random for every pair, and that random line-up is the second source of new combinations (independent assortment).",
 miss:{0:"Single file is mitosis, and the second division of meiosis. In the first division, partners stay together as pairs.",
       1:"The spindle centers the chromosomes in the middle of the cell.",
       2:"Both divisions of meiosis line chromosomes up in the middle. The difference is pairs versus single file."},
 hint:"The partners have just paired up and swapped pieces. Do they let go of each other before they line up?",
 study:"First division of meiosis: pairs line up side by side, in a random arrangement.",
 src:"Canvas LT 5.3"},

{n:"N10",
 step:"M2-ANA1",
 role:"pre",
 topic:"What separates in the first division",
 stem:"Predict: in the first division of meiosis, what will be pulled apart?",
 opts:["The two partners of each matching pair",
       "The two copies of each chromosome",
       "Nothing; the pairs move together to one end",
       "The genes that were swapped"],
 key:0,
 why:"The partners separate: one goes to each end, still made of two joined copies. Each end now has one of each pair, 2 chromosomes in the model instead of 4. This is the moment the chromosome number is cut in half.",
 miss:{1:"The copies stay joined in the first division and separate in the second. Pulling copies apart here would make this a mitosis.",
       2:"If a whole pair went to one end, one new cell would get both partners and the other none.",
       3:"The swapped pieces stay on the chromosomes they moved to. They travel with them."},
 hint:"Look at what is sitting side by side on the middle line. That is what the spindle separates.",
 study:"First division of meiosis: partners separate and the chromosome number halves.",
 src:"Canvas LT 5.3; Modeling Meiosis (pop beads)"},

{n:"N11",
 step:"M2-TEL1",
 role:"post",
 topic:"Count after the first division",
 stem:"The model cell started meiosis with 4 chromosomes. After the first division, how many chromosomes does each of the two cells have?",
 opts:["4, the same as the parent cell",
       "1, because the cell divided twice",
       "2, each still made of two joined copies",
       "8, because the DNA was copied"],
 key:2,
 why:"Each cell got one partner from each pair: 2 chromosomes. They are still X-shaped, two copies each, because the copies have not separated yet. That is why the second division can happen without any new copying.",
 miss:{0:"The partners went to different cells, so each cell got only half of them.",
       1:"Only one division has happened so far. The second one does not change the number again; it separates copies.",
       3:"Copying doubled the DNA in each chromosome, not the number of chromosomes."},
 hint:"One of each pair went to each end. How many pairs were there?",
 study:"After the first division: 2 cells, half the chromosomes, each chromosome still two copies.",
 src:"Canvas LT 5.3"},

{n:"N12",
 step:"M2-MET2",
 role:"pre",
 topic:"No copying before the second division",
 stem:"Before the second division of meiosis begins, does the cell copy its DNA again?",
 opts:["Yes, every division needs a round of copying first",
       "No, each chromosome already has two copies to share out",
       "Yes, but it copies only half of the DNA",
       "No, the second division moves the cytoplasm and leaves the chromosomes alone"],
 key:1,
 why:"There is no S between the two divisions. Each chromosome is still an X of two copies, and the second division pulls those copies apart, much like mitosis. Skipping the copy is what keeps the four final cells at half the chromosome number.",
 miss:{0:"Copying again would undo the halving. Meiosis copies once and divides twice.",
       2:"Cells do not copy half their DNA. There is simply no copying here.",
       3:"The second division does separate chromosomes: it pulls the two copies of each one apart."},
 hint:"Look at the chromosomes in the two cells. Are they single strands or Xs?",
 study:"The second division of meiosis separates copies, without copying first.",
 src:"Canvas LT 5.3"},

{n:"N13",
 step:"M2-TEL2",
 role:"post",
 topic:"Four different sex cells",
 stem:"With swapping turned on, the model finishes with four sex cells. How do they compare with each other?",
 opts:["All four are different",
       "All four are identical",
       "There are two pairs of identical cells",
       "They are identical to the parent cell"],
 key:0,
 why:"Swapping pieces made the two copies of the long chromosome different from each other, and the random line-up shuffled which partners went together. The result is four sex cells, each with half the chromosomes and its own combination. Turn swapping off and the four come out as two matching pairs.",
 miss:{1:"Identical cells are what mitosis makes. Meiosis shuffles, so the cells differ.",
       2:"Two matching pairs is what happens with swapping turned off. With it on, the copies differ too.",
       3:"Each sex cell has half the parent's chromosomes, so none can be identical to the parent."},
 hint:"Compare the colors on the chromosomes in each of the four cells.",
 study:"Meiosis: four sex cells, half the chromosomes, genetically different.",
 src:"Canvas LT 5.3; BIO.5d genetic variation"},

{n:"N14",
 step:"M3-LINE",
 role:"pre",
 topic:"The line-up, compared",
 stem:"Both lanes have reached the middle stage. What is different between them?",
 opts:["Mitosis lines up matching pairs; the first division of meiosis lines up single file",
       "Nothing; both lanes line up their chromosomes in a single file",
       "Only the meiosis lane uses a spindle to move its chromosomes",
       "Mitosis lines up single file; the first division of meiosis lines up matching pairs"],
 key:3,
 why:"This is the moment the two processes part ways. In mitosis each chromosome sits on the middle line alone, so its two copies can be split. In the first division of meiosis partners sit together, so the partners can be split.",
 miss:{0:"It is the other way round. Pairs line up together only in meiosis.",
       1:"Look at the meiosis lane: the partners are side by side.",
       2:"Both processes use a spindle to move chromosomes."},
 hint:"Look at the meiosis lane. Are the long chromosomes next to each other?",
 study:"Single file = mitosis (or the second division of meiosis). Pairs side by side = first division of meiosis.",
 src:"Canvas LT 5.4 (compare and contrast)"},

{n:"N15",
 step:"M3-END",
 role:"post",
 topic:"The results, compared",
 stem:"Which statement compares the results of the two processes correctly?",
 opts:["Mitosis: 4 different cells with half the set. Meiosis: 2 identical cells with the full set",
       "Mitosis: 2 identical cells with the full set. Meiosis: 4 different cells with half the set",
       "Both make 2 identical cells, each with the full set of chromosomes",
       "Both make 4 cells, each with half the set of chromosomes"],
 key:1,
 why:"Mitosis divides once and keeps everything the same, for growth and repair. Meiosis divides twice after one copy, halving the number and shuffling the combinations, to make sex cells.",
 miss:{0:"Those results are swapped. Mitosis copies; meiosis halves and shuffles.",
       2:"Only mitosis makes identical cells. Meiosis makes four different ones.",
       3:"Only meiosis halves the set. Body cells made by mitosis keep the full set."},
 hint:"Count the cells at the end of each lane, then count chromosomes in one cell of each.",
 study:"Mitosis: 1 division, 2 identical, full set. Meiosis: 2 divisions, 4 different, half set.",
 src:"Canvas LT 5.4; BIO.5d (differentiate end products)"},

{n:"N16",
 step:"M3-FERT",
 role:"pre",
 topic:"Fertilization restores the number",
 stem:"A sperm with 2 chromosomes joins an egg with 2 chromosomes. How many chromosomes does the zygote (fertilized egg) have?",
 opts:["2, because the sperm and egg share",
       "8, because fertilization doubles everything",
       "4, one of each pair from each parent",
       "1, because the chromosomes pair up and fuse"],
 key:2,
 why:"Each sex cell brings one of each pair, so together they rebuild the full set: 2 + 2 = 4 in the model, 23 + 23 = 46 in a person. Halving in meiosis is what keeps the number steady from one generation to the next.",
 miss:{0:"Nothing is shared or discarded. The zygote keeps every chromosome both sex cells brought.",
       1:"Fertilization adds the two sets; it does not double them.",
       3:"The partners line up later, in meiosis, but they never fuse into one chromosome."},
 hint:"Add what the sperm brings to what the egg brings.",
 study:"Fertilization: n + n = 2n. Meiosis halves; fertilization restores.",
 src:"SOL Challenge Q39 (fertilization distractor); Canvas LT 5.4"},

{n:"N17",
 step:"M3-SPEC",
 role:"post",
 topic:"Same DNA, different cells",
 stem:"A nerve cell and a muscle cell from the same person carry the same DNA. Why do they look and work so differently?",
 opts:["They have different numbers of chromosomes",
       "Different genes are switched on in each kind of cell",
       "One was made by mitosis and the other by meiosis",
       "Each lost a different part of its DNA"],
 key:1,
 why:"Every body cell descends from the zygote by mitosis, so every one carries the same chromosomes. As an embryo develops, each cell switches on a different set of genes, and those genes build the shape and parts that cell's job needs. That is specialization.",
 miss:{0:"Both cells were made by mitosis from the same zygote, so both have 46 chromosomes.",
       2:"Both are body cells made by mitosis. Meiosis makes only sex cells.",
       3:"Body cells keep their DNA. What differs is which genes they use."},
 hint:"What process made every body cell from the zygote, and what does that process keep the same?",
 study:"Specialized cells share the same DNA; they switch on different genes.",
 src:"BIO.3e; SOL Challenge Q38"},

{n:"N18",
 step:"M3-SORT",
 role:"post",
 topic:"Where meiosis happens",
 stem:"Where in your body does meiosis happen?",
 opts:["Only in the reproductive organs, where sex cells are made",
       "In every cell that divides",
       "Anywhere tissue is growing or being repaired",
       "Only in cells that have stopped dividing"],
 key:0,
 why:"Meiosis happens only in the ovaries and testes, in the cells that become eggs and sperm. Everywhere else in the body, cells that divide use mitosis: in the skin, the gut lining, bone marrow and a healing cut.",
 miss:{1:"Most dividing cells use mitosis. Meiosis is limited to cells making sex cells.",
       2:"Growth and repair need identical cells, which is mitosis.",
       3:"Meiosis is a kind of division, so it happens in cells that divide."},
 hint:"Meiosis makes sex cells. Where are sex cells made?",
 study:"Mitosis: body (somatic) cells everywhere. Meiosis: only in the reproductive organs.",
 src:"BIO.5d (conditions for each); Canvas LT 5.4"},

{n:"A1",
 step:"M2-MET1",
 role:"post",
 adv:true,
 topic:"Naming the stage: metaphase I",
 stem:"In which stage of meiosis do the matching pairs line up side by side across the middle of the cell?",
 opts:["Prophase I",
       "Metaphase II",
       "Anaphase II",
       "Metaphase I"],
 key:3,
 why:"Metaphase I is the first division's middle stage, and the only one where partners line up as pairs. In metaphase II, single chromosomes line up as in mitosis.",
 miss:{0:"Prophase I is when partners pair up and swap pieces. They line up on the middle next.",
       1:"In metaphase II the chromosomes line up single file, one after another.",
       2:"In anaphase II the copies are being pulled apart, not lining up."},
 hint:"The middle stage is the meta- stage. Which division has pairs?",
 study:"Prophase I pair and swap · Metaphase I pairs line up · Anaphase I partners separate · Telophase I two cells · then the same four stages again, with single chromosomes.",
 src:"Canvas LT 5.3 (identify each stage of meiosis); beyond the SOL"},

{n:"A2",
 step:"M3-SEP",
 role:"post",
 adv:true,
 topic:"Which anaphase is this?",
 stem:"A drawing shows X-shaped chromosomes being pulled to opposite ends, with one partner of each matching pair going each way. Which stage is it?",
 opts:["Anaphase of mitosis",
       "Anaphase II of meiosis",
       "Anaphase I of meiosis",
       "Telophase of mitosis"],
 key:2,
 why:"If whole X-shaped chromosomes are moving and the partners of each pair are going opposite ways, the copies are still joined, so this is the first division of meiosis: anaphase I. In anaphase of mitosis and anaphase II, single copies are moving.",
 miss:{0:"In anaphase of mitosis, single copies move, not whole X-shaped chromosomes.",
       1:"Anaphase II also moves single copies. The X shapes mean this is the first division.",
       3:"In telophase the chromosomes have already arrived and are uncoiling."},
 hint:"Are the moving chromosomes Xs or single strands?",
 study:"Moving Xs = anaphase I. Moving single strands = anaphase of mitosis or anaphase II.",
 src:"Canvas LT 5.3/5.4; beyond the SOL"}
];
```

## 9. The DE bank (D1–D24)

Same rules as §8, plus: after a wrong first answer, show the `sam` prompt for that option under the `miss` note, titled "Build a SAM from this miss" and linked to `../../teaching/student-authored-modules.html`, as the Energy Patch does. DE items have no `hint`. Keys are spread A 6 · B 6 · C 6 · D 6. D8, D17, D18 and D22 belong to the "Going further" steps; if one of those steps is dropped (§0.8), drop its item and say so.

```js
// DE bank. Permanent numbers: D1–D24. Never renumber; retire with retired:true.
// Same shape as BANKSOL without hint, plus sam = one Student-Authored Module prompt per wrong option.
// unit = DE Bio 101 unit (9 cell cycle, 10 meiosis). src = for Reid only; NOT rendered.
// All wording is original. Nothing here reproduces Checkpoint, clicker, review-question or textbook text.
const BANKDE = [
{n:"D1",
 unit:9,
 step:"M1-G1",
 role:"pre",
 topic:"Most of the cycle is interphase",
 stem:"In a dividing onion root tip, 176 of 200 cells are in interphase. What does that say about interphase?",
 opts:["It is the shortest phase, since cells pass through it quickly",
       "It takes up most of the cycle, about 88% of the time in these cells",
       "Those 176 cells have stopped dividing permanently",
       "It is when the chromosomes are most condensed and easiest to count"],
 key:1,
 why:"In an unsynchronized population, the fraction of cells in a phase is proportional to the fraction of the cycle that phase lasts. 176/200 = 88%, so interphase (G1, S and G2) fills most of the cycle; M phase is the short remainder.",
 miss:{0:"A short phase would hold few cells at any instant. Many cells means a long phase.",
       2:"Cells in G0 have left the cycle, but a growing root tip is full of cycling cells. The count says how long interphase lasts, not that cells stopped.",
       3:"Chromosomes are least condensed in interphase. They condense in prophase and are most compact at metaphase."},
 sam:{0:"Write a SAM question that turns a phase count into a time. Answer it using a 24-hour cycle and the counts 176, 12, 5, 3 and 4.",
       2:"Write a SAM question that distinguishes G0 from G1. Name one cell type that stays in G0 and one that cycles all its life.",
       3:"Write a SAM question on chromatin condensation across the cycle. Sketch one chromosome in G1, G2 and metaphase."},
 src:"SOL Challenge Q37 counts; Campbell Ch. 9 (cell cycle phases)"},

{n:"D2",
 unit:9,
 step:"M1-S",
 role:"pre",
 topic:"Chromosomes, chromatids and DNA in S",
 stem:"A diploid cell with 2n = 4 finishes S phase. How many chromosomes, chromatids and DNA molecules does it now hold?",
 opts:["8 chromosomes, 8 chromatids, 8 DNA molecules",
       "4 chromosomes, 4 chromatids, 8 DNA molecules",
       "4 chromosomes, 8 chromatids, 4 DNA molecules",
       "4 chromosomes, 8 chromatids, 8 DNA molecules"],
 key:3,
 why:"Replication makes each chromosome two sister chromatids held by cohesins, each chromatid one DNA double helix. Chromosomes are counted by centromeres, so the number stays 4 while chromatids and DNA molecules double to 8.",
 miss:{0:"Sister chromatids joined at a centromere count as one chromosome until they separate in anaphase.",
       1:"Each chromatid is one DNA molecule, so chromatids and DNA molecules always match.",
       2:"Each chromatid contains one complete DNA molecule. Eight chromatids hold eight."},
 sam:{0:"Write a SAM question that asks for chromosome, chromatid and DNA-molecule counts at G1, G2 and anaphase. Answer it with a three-row table for 2n = 4.",
       1:"Write a SAM question on what a chromatid is. Answer it by relating one chromatid to one DNA double helix.",
       2:"Write a SAM question that asks when DNA content doubles and when the chromosome count doubles. They are different events."},
 src:"Campbell Ch. 9 (chromosome terms); DE Checkpoint Ch. 9 topic, original wording"},

{n:"D3",
 unit:9,
 step:"M1-G2",
 role:"post",
 topic:"The G2 checkpoint",
 stem:"A cell finishes S with a stretch of DNA left unreplicated. What is the expected result at the G2 checkpoint?",
 opts:["The cell holds in G2 until replication is complete, rather than entering M phase",
       "The cell enters M phase on schedule and finishes replication during prophase",
       "The cell returns to G1 and begins S phase over again from the start",
       "The cell skips mitosis and divides its cytoplasm directly to save time"],
 key:0,
 why:"The G2 checkpoint checks that DNA is fully and correctly replicated. Incomplete or damaged DNA blocks activation of the cyclin–Cdk complex (MPF) that drives entry into M phase, so the cell waits, and repairs if it can.",
 miss:{1:"DNA cannot be replicated once chromosomes condense and the spindle pulls on them. The checkpoint exists to stop exactly this.",
       2:"Cells do not reset S. They hold, repair, or, if the damage is too great, undergo apoptosis.",
       3:"Cytokinesis without mitosis would leave one daughter without a nucleus. The checkpoint blocks both."},
 sam:{1:"Write a SAM question on what each of the three main checkpoints checks. Answer with one line for G1, G2 and M.",
       2:"Write a SAM question on the cell's options when a checkpoint fails: hold, repair or apoptosis.",
       3:"Write a SAM question on why cytokinesis follows mitosis and never precedes it."},
 src:"Campbell Ch. 9 (cell cycle control system)"},

{n:"D4",
 unit:9,
 step:"M1-PRO",
 role:"pre",
 topic:"Where spindle fibers attach",
 stem:"In prometaphase, spindle microtubules reach the chromosomes. Where do they attach, and in what arrangement?",
 opts:["To the centrioles, which ride on each chromosome to the poles",
       "To the nuclear envelope, which drags the chromosomes inward",
       "To the kinetochores, with sister kinetochores facing opposite poles",
       "To both kinetochores from the same pole, so whole chromosomes move together"],
 key:2,
 why:"Each chromatid has a kinetochore at the centromere. In mitosis, the two sister kinetochores capture microtubules from opposite poles (bi-orientation). That tension holds the chromosome on the metaphase plate and lets anaphase split the sisters cleanly.",
 miss:{0:"Centrioles stay at the spindle poles in animal cells. They never travel on chromosomes.",
       1:"The nuclear envelope fragments in prometaphase. Microtubules then reach the chromosomes directly.",
       3:"Sister kinetochores facing the same pole is meiosis I's arrangement. In mitosis they face opposite poles."},
 sam:{0:"Write a SAM question on what the centrosome does and where it sits during mitosis. Note that most plant cells lack centrioles but still build a spindle.",
       1:"Write a SAM question on the events of prometaphase, in order.",
       3:"Write a SAM question contrasting kinetochore orientation in mitosis and in meiosis I, with a sketch of each."},
 src:"Campbell Ch. 9 (mitotic spindle)"},

{n:"D5",
 unit:9,
 step:"M1-MET",
 role:"post",
 topic:"The M checkpoint",
 stem:"One chromosome's kinetochore stays unattached while the others sit on the metaphase plate. What happens?",
 opts:["Anaphase begins on time and the unattached chromosome is left in the cytoplasm",
       "The unattached chromosome is copied again to make up for it",
       "Anaphase waits until every kinetochore is attached to the spindle",
       "The cell skips anaphase and goes straight to cytokinesis"],
 key:2,
 why:"The M (spindle assembly) checkpoint delays anaphase until all kinetochores are attached to the spindle. One unattached kinetochore is enough to hold the signal that blocks separation of all sisters. This prevents daughter cells with missing or extra chromosomes.",
 miss:{0:"Starting anaphase with an unattached chromosome would send both copies to one cell. The checkpoint exists to prevent this.",
       1:"DNA is not re-replicated in M phase. The cell waits for attachment.",
       3:"Cytokinesis without chromosome separation would make one cell with all the chromosomes and one with none."},
 sam:{0:"Write a SAM question that predicts the chromosome counts in two daughters if anaphase started with one unattached chromosome.",
       1:"Write a SAM question on why replication is confined to S phase.",
       3:"Write a SAM question tracing what triggers anaphase once all kinetochores attach."},
 src:"Campbell Ch. 9 (M checkpoint)"},

{n:"D6",
 unit:9,
 step:"M1-ANA",
 role:"pre",
 topic:"Anaphase counts",
 stem:"At anaphase in a cell with 2n = 4, the sister chromatids have just separated. How many chromosomes are in the cell at that moment?",
 opts:["8, because each separated chromatid now counts as a chromosome",
       "4, because separating the copies does not change the count",
       "2, because the chromosome number is cut in half at anaphase",
       "16, because separating the chromatids doubles the DNA again"],
 key:0,
 why:"Once sisters separate, each one has its own centromere and is counted as a chromosome. For that brief stretch a 2n = 4 cell holds 8 chromosomes, 4 headed to each pole. Each daughter ends with 4, the parent's number.",
 miss:{1:"Chromosomes are counted by centromeres. Separation gives each former chromatid its own.",
       2:"Halving happens in meiosis I, when homologs separate. Mitosis keeps the number.",
       3:"Anaphase moves DNA; it makes none. DNA doubled back in S."},
 sam:{1:"Write a SAM question on how to count chromosomes in a drawing. Use the centromere rule on four sketches.",
       2:"Write a SAM question contrasting anaphase of mitosis with anaphase I of meiosis in what separates and what the count does.",
       3:"Write a SAM question on when DNA content changes during the cycle, with a line graph of DNA per cell."},
 src:"Campbell Ch. 9; DE Checkpoint Ch. 9 topic, original wording"},

{n:"D7",
 unit:9,
 step:"M1-TEL",
 role:"post",
 topic:"Cytokinesis in plants and animals",
 stem:"How does cytokinesis differ between an animal cell and a plant cell?",
 opts:["Plant cells pinch in with a ring of actin filaments; animal cells build a cell plate",
       "Both form a cell plate, but plants add a cell wall later",
       "Both pinch in, but plant cells take longer because of the wall",
       "Animal cells furrow with an actin ring; plant cells build a cell plate"],
 key:3,
 why:"In animal cells, a contractile ring of actin and myosin forms a cleavage furrow that pinches the cell in two. A rigid wall makes pinching impossible in plants, so vesicles from the Golgi gather at the middle and fuse into a cell plate, which grows outward into a new wall between the daughters.",
 miss:{0:"Reversed. The wall is why plants cannot pinch.",
       1:"Animal cells have no wall and form no cell plate; they furrow.",
       2:"The cell wall prevents furrowing in plant cells. They build a new wall from the inside out."},
 sam:{0:"Write a SAM question that ties each cytokinesis mechanism to a structure only that cell type has.",
       1:"Write a SAM question on why animal cells, with no wall, furrow instead.",
       2:"Write a SAM question on the cleavage furrow: which proteins and what they do."},
 src:"Campbell Ch. 9 (cytokinesis)"},

{n:"D8",
 unit:9,
 step:"M1-CHK",
 role:"pre",
 topic:"Cyclin and Cdk",
 stem:"Cdk levels stay fairly constant through the cycle, yet Cdk activity rises and falls. Why?",
 opts:["Cdk is made new each cycle in S phase and destroyed at the end of mitosis",
       "Cdk works only when bound to cyclin, which is made and destroyed each cycle",
       "Cdk is active only in G1 and is switched off as soon as DNA replication starts",
       "Cdk activity rises and falls with the cell's supply of ATP"],
 key:1,
 why:"Cdks are cyclin-dependent kinases. Cyclin accumulates through interphase, binds Cdk to form MPF, and drives the cell into M phase; cyclin is then degraded, MPF activity falls, and the cell exits mitosis. The rhythm comes from cyclin, not from Cdk.",
 miss:{0:"Cdk is present at a steady level. Its partner, cyclin, is what is made and destroyed.",
       2:"MPF activity peaks at the G2/M transition, not in G1.",
       3:"Cdk activity is set by cyclin binding and by phosphorylation, not by ATP supply."},
 sam:{0:"Write a SAM question on the cyclin and MPF curves through two cycles. Sketch both on one graph.",
       2:"Write a SAM question on what MPF does at the G2/M transition.",
       3:"Write a SAM question that separates Cdk amount from Cdk activity."},
 src:"Campbell Ch. 9 (cyclins and Cdks); going further"},

{n:"D9",
 unit:10,
 step:"M2-S",
 role:"pre",
 topic:"Ploidy before meiosis",
 stem:"A human germ cell finishes S phase and is about to enter meiosis I. What are its ploidy and its chromosome number?",
 opts:["Diploid, 46 chromosomes, each with two sister chromatids",
       "Tetraploid, 92 chromosomes, since the DNA has doubled",
       "Haploid, 23 chromosomes, each with two sister chromatids",
       "Diploid, 92 chromosomes, each a single chromatid"],
 key:0,
 why:"Replication doubles DNA but not chromosome number or ploidy. The cell still has two sets (2n = 46), now each chromosome made of two sister chromatids. It becomes haploid only when homologs separate in meiosis I.",
 miss:{1:"Ploidy counts sets of chromosomes, and S phase does not add sets. The cell is still 2n.",
       2:"Haploid cells appear only after meiosis I separates homologs.",
       3:"Sister chromatids do not count as separate chromosomes while joined."},
 sam:{1:"Write a SAM question defining ploidy by sets of chromosomes, not by DNA amount.",
       2:"Write a SAM question asking at which step of meiosis a cell first becomes haploid, and why there and not in meiosis II.",
       3:"Write a SAM question on counting chromosomes by centromeres in a 2n = 46 cell after S phase."},
 src:"Campbell Ch. 10 (haploid and diploid)"},

{n:"D10",
 unit:10,
 step:"M2-PRO1",
 role:"pre",
 topic:"Synapsis and crossing over",
 stem:"In prophase I, homologs pair along their length and exchange segments. What exactly is exchanged?",
 opts:["Corresponding segments between the two sister chromatids of one chromosome",
       "Whole chromosomes between two homologous pairs",
       "Corresponding segments between non-sister chromatids of a homologous pair",
       "Segments between non-homologous chromosomes of similar length"],
 key:2,
 why:"During synapsis the homologs align gene for gene. Crossing over breaks and rejoins non-sister chromatids at matching points, so each recombinant chromatid carries alleles from both parents. The X-shaped chiasmata mark where it happened, and they help hold the homologs together until anaphase I.",
 miss:{0:"Sisters are identical, so an exchange between them would change nothing. Crossing over is between non-sisters.",
       1:"Exchanging whole chromosomes would change the chromosome sets. Crossing over swaps matching segments.",
       3:"Exchange between non-homologs is a translocation, a chromosomal error, not crossing over."},
 sam:{0:"Write a SAM question on why crossing over between sister chromatids would produce no new combinations.",
       1:"Write a SAM question contrasting crossing over with independent assortment: what each one shuffles.",
       3:"Write a SAM question defining homologous chromosomes by gene order and centromere position."},
 src:"Campbell Ch. 10 (crossing over)"},

{n:"D11",
 unit:10,
 step:"M2-MET1",
 role:"post",
 topic:"Independent assortment",
 stem:"A human cell has 23 homologous pairs. Counting independent assortment alone, about how many chromosome combinations can its gametes carry?",
 opts:["46 (2 × 23)",
       "About 8.4 million (2²³)",
       "529 (23²)",
       "About 70 trillion (2²³ × 2²³)"],
 key:1,
 why:"Each pair orients on the metaphase I plate independently, with two possible orientations, so the number of combinations is 2ⁿ with n = 23: 8,388,608. About 70 trillion is the number of possible zygotes from two parents, before crossing over adds still more.",
 miss:{0:"Each pair's orientation multiplies the possibilities; it does not add to them.",
       2:"The base is 2, the two orientations per pair, raised to the number of pairs.",
       3:"That counts zygote combinations from two parents. One parent's gametes alone have 2²³."},
 sam:{0:"Write a SAM question that works 2ⁿ for n = 2, 3 and 23, and draws every orientation for n = 2.",
       2:"Write a SAM question on why each pair has exactly two orientations at metaphase I.",
       3:"Write a SAM question separating gamete combinations (one parent) from zygote combinations (two parents)."},
 src:"Campbell Ch. 10 (independent assortment)"},

{n:"D12",
 unit:10,
 step:"M2-ANA1",
 role:"pre",
 topic:"What separates in anaphase I",
 stem:"What separates in anaphase I, and what keeps sister chromatids together while it happens?",
 opts:["Sister chromatids separate; homologs stay joined by chiasmata",
       "Homologs separate after all cohesin is cleaved",
       "Sister chromatids separate after centromeric cohesin is cleaved",
       "Homologs; cohesin at the centromeres keeps sisters joined"],
 key:3,
 why:"In anaphase I, cohesin is cleaved along the chromatid arms, which releases the chiasmata and lets homologs move apart. Cohesin at the centromeres is protected, so sisters stay together and travel to the same pole. That centromeric cohesin is cleaved only in anaphase II.",
 miss:{0:"Sisters separate in anaphase II, and in mitosis. Anaphase I separates homologs.",
       1:"If all cohesin were cleaved, sisters would fall apart too. Only arm cohesin goes in anaphase I.",
       2:"That describes anaphase II and mitotic anaphase, not anaphase I."},
 sam:{0:"Write a SAM question on the two-step loss of cohesin in meiosis: where, and in which anaphase.",
       1:"Write a SAM question on why sister kinetochores face the same pole in meiosis I.",
       2:"Write a SAM question contrasting anaphase I with mitotic anaphase in a two-column sketch."},
 src:"Campbell Ch. 10 (cohesin in meiosis)"},

{n:"D13",
 unit:10,
 step:"M2-TEL1",
 role:"post",
 topic:"DNA content after meiosis I",
 stem:"A diploid cell has DNA content 2C in G1. What is the DNA content of each cell at the end of meiosis I?",
 opts:["1C, haploid, each chromosome a single chromatid",
       "4C, diploid, each chromosome still two chromatids",
       "2C, diploid, each chromosome a single chromatid",
       "2C, haploid, each chromosome still two chromatids"],
 key:3,
 why:"After S the cell holds 4C. Meiosis I divides it between two haploid cells, each with n chromosomes of two chromatids: 2C. Meiosis II then separates the chromatids, leaving 1C in each of four cells.",
 miss:{0:"1C is reached only after meiosis II separates sister chromatids.",
       1:"4C is the cell after S, before any division.",
       2:"The DNA amount is 2C, but the cell is haploid: it holds one chromosome from each pair."},
 sam:{0:"Write a SAM question that tracks C and n from G1 through meiosis II in a table.",
       1:"Write a SAM question explaining why a cell can be haploid and 2C at the same time.",
       2:"Write a SAM question contrasting the end of meiosis I with the end of mitosis in C and n."},
 src:"Campbell Ch. 10; Ch. 9 DNA content graph"},

{n:"D14",
 unit:10,
 step:"M2-MET2",
 role:"pre",
 topic:"Meiosis II resembles mitosis",
 stem:"Meiosis II is often compared with mitosis. Which statement about meiosis II is accurate?",
 opts:["It begins with a round of DNA replication, just as the cell cycle before mitosis does",
       "Sisters separate as in mitosis, but in haploid cells, and sisters may differ",
       "Homologs pair up, swap segments and separate again, just as they did in meiosis I",
       "It produces two diploid cells from each cell, just as mitosis does"],
 key:1,
 why:"Meiosis II follows meiosis I with no S phase. The mechanics match mitosis: chromosomes line up singly and sisters split. The differences: the cells are haploid, and after crossing over the two sisters of a chromosome are usually not identical.",
 miss:{0:"There is no replication between meiosis I and II. That is how the four cells stay haploid.",
       2:"Homologs separated in meiosis I. Each meiosis II cell holds one of each, so there is nothing to pair.",
       3:"Meiosis II produces haploid cells, because its starting cells were already haploid."},
 sam:{0:"Write a SAM question on what would happen to chromosome number if a cell replicated between meiosis I and II.",
       2:"Write a SAM question that lists three ways meiosis II resembles mitosis and two ways it differs.",
       3:"Write a SAM question on why recombinant sister chromatids make the four products differ."},
 src:"Campbell Ch. 10 (meiosis II)"},

{n:"D15",
 unit:10,
 step:"M2-ANA2",
 role:"post",
 topic:"Anaphase II counts",
 stem:"A 2n = 4 organism: during anaphase II, how many chromosomes are in each of the two cells?",
 opts:["4, two headed to each pole",
       "2, one headed to each pole",
       "8, four headed to each pole",
       "1, because the cell is haploid"],
 key:0,
 why:"Each meiosis II cell starts with n = 2 chromosomes of two chromatids. At anaphase II the sisters separate, and each becomes a chromosome: 4 in the cell, 2 moving to each pole. Each resulting cell has n = 2 single-chromatid chromosomes.",
 miss:{1:"Once sisters separate, each counts as a chromosome. 2 chromosomes become 4.",
       2:"8 would need the cell to be diploid and replicated. Meiosis II cells are haploid.",
       3:"Haploid here means n = 2, not 1. The model has two pairs."},
 sam:{1:"Write a SAM question applying the centromere rule at anaphase II.",
       2:"Write a SAM question contrasting chromosome counts at anaphase of mitosis and anaphase II for 2n = 4.",
       3:"Write a SAM question defining n for an organism with 2n = 4, 8 and 46."},
 src:"Campbell Ch. 10; original"},

{n:"D16",
 unit:10,
 step:"M2-TEL2",
 role:"post",
 topic:"Three sources of variation",
 stem:"Which three mechanisms together produce genetic variation in sexually reproducing organisms?",
 opts:["Mitosis, crossing over and DNA replication",
       "Independent assortment, cytokinesis and random fertilization",
       "Crossing over, independent assortment and random fertilization",
       "Crossing over, cohesin cleavage and independent assortment"],
 key:2,
 why:"Crossing over makes recombinant chromosomes, independent assortment shuffles which homolog of each pair goes to a gamete, and random fertilization pairs any sperm with any egg. Mutation is the original source of new alleles; these three reshuffle the alleles each generation.",
 miss:{0:"Mitosis and replication copy chromosomes faithfully; they do not make new combinations.",
       1:"Cytokinesis splits the cytoplasm; it does not change which chromosomes a cell gets.",
       3:"Cohesin cleavage lets chromosomes separate. It does not decide which ones go where."},
 sam:{0:"Write a SAM question that ties each of the three mechanisms to the stage where it happens.",
       1:"Write a SAM question on why cytokinesis does not change which chromosomes a cell receives.",
       3:"Write a SAM question estimating zygote diversity from independent assortment and random fertilization alone."},
 src:"Campbell Ch. 10 (origins of genetic variation)"},

{n:"D17",
 unit:10,
 step:"M2-NDJ",
 role:"pre",
 topic:"Nondisjunction in meiosis I",
 stem:"In a 2n = 4 organism, one homologous pair fails to separate in meiosis I, and meiosis II is normal. What are the chromosome numbers of the four gametes?",
 opts:["3, 1, 2, 2",
       "3, 3, 1, 1",
       "2, 2, 2, 2",
       "4, 4, 0, 0"],
 key:1,
 why:"Both homologs of the failed pair go to one pole, so one meiosis I product has 3 chromosomes and the other 1. Meiosis II then splits each normally, giving two gametes with n + 1 = 3 and two with n − 1 = 1. Nondisjunction in meiosis II instead gives 3, 1, 2, 2.",
 miss:{0:"That pattern comes from nondisjunction in meiosis II, where only one of the two cells is affected.",
       2:"That is normal meiosis. A pair that fails to separate changes every gamete in meiosis I.",
       3:"Only one pair failed. The other pair still separated normally."},
 sam:{0:"Write a SAM question contrasting nondisjunction in meiosis I and meiosis II, with a sketch of each.",
       2:"Write a SAM question on how a gamete with n + 1 leads to trisomy after fertilization.",
       3:"Write a SAM question that counts chromosomes in gametes when two different pairs fail."},
 src:"Campbell Ch. 12 (alterations of chromosome number); going further"},

{n:"D18",
 unit:10,
 step:"M2-EGG",
 role:"pre",
 topic:"Egg making",
 stem:"How does egg production (oogenesis) differ from sperm production in its products?",
 opts:["Unequal splits give one large egg and small polar bodies, not four similar cells",
       "Oogenesis skips meiosis II, so each egg keeps a diploid set of chromosomes",
       "Oogenesis divides evenly into four eggs, each about a quarter of the parent cell's size",
       "Oogenesis uses mitosis only, so each egg is genetically identical to the parent cell"],
 key:0,
 why:"In oogenesis the cytoplasm divides unequally in both meiotic divisions. One cell keeps nearly all the cytoplasm and becomes the egg; the others are small polar bodies that break down. In humans, meiosis II is completed only if a sperm enters the secondary oocyte.",
 miss:{1:"Eggs are haploid. Meiosis II does happen, but in humans it is completed only after fertilization begins.",
       2:"Equal division into four cells is what spermatogenesis does. Oogenesis concentrates the cytoplasm in one cell.",
       3:"Eggs are made by meiosis. A diploid egg plus a sperm would double the chromosome number."},
 sam:{1:"Write a SAM question on when human meiosis II is completed and what triggers it.",
       2:"Write a SAM question on why the egg keeps nearly all the cytoplasm.",
       3:"Write a SAM question contrasting the products of spermatogenesis and oogenesis from one starting cell."},
 src:"Campbell Ch. 36 (gametogenesis); going further"},

{n:"D19",
 unit:10,
 step:"M3-LINE",
 role:"pre",
 topic:"Metaphase compared",
 stem:"Two cells from the same organism are at metaphase. One shows chromosomes in a single row; the other shows tetrads in a double row. Which is which?",
 opts:["Single row: meiosis I. Double row of tetrads: mitosis",
       "Both could be mitosis, depending on the type of cell",
       "Single row: mitosis or meiosis II. Double row of tetrads: meiosis I",
       "The double row is meiosis II, after the cell has divided once"],
 key:2,
 why:"Only metaphase I has synapsed homologs, as tetrads or bivalents, lined up in pairs at the plate. Metaphase of mitosis and metaphase II both line up individual chromosomes; the chromosome count tells those two apart, 2n in mitosis and n in meiosis II.",
 miss:{0:"Reversed. Pairs at the plate are the signature of meiosis I.",
       1:"Mitosis never pairs homologs, in any cell type.",
       3:"After meiosis I, each cell holds one homolog of each pair. There is nothing left to pair in meiosis II."},
 sam:{0:"Write a SAM question on telling metaphase of mitosis from metaphase II using chromosome count alone.",
       1:"Write a SAM question on why homologs never pair in mitosis.",
       3:"Write a SAM question defining a tetrad: how many chromosomes and chromatids."},
 src:"Campbell Ch. 10 (comparison of mitosis and meiosis)"},

{n:"D20",
 unit:10,
 step:"M3-SEP",
 role:"post",
 topic:"Kinetochore orientation",
 stem:"Why do sister chromatids travel to the same pole in anaphase I but to opposite poles in mitosis?",
 opts:["In meiosis I all cohesin is removed at once, while in mitosis the centromeric cohesin stays until telophase",
       "In meiosis I the spindle forms from only one pole, so every chromatid moves the same way",
       "In meiosis I the sister chromatids have not yet been replicated, so there is only one to move",
       "Sister kinetochores face one pole together in meiosis I, opposite poles in mitosis"],
 key:3,
 why:"In meiosis I, the two sister kinetochores are fused into a functional unit that faces one pole, while the homolog faces the other; chiasmata hold the pair under tension. In mitosis, sister kinetochores bi-orient. Orientation, plus which cohesin is cleaved, decides what separates.",
 miss:{0:"Arm cohesin is removed in anaphase I, but centromeric cohesin is protected until anaphase II, and in mitosis cohesin goes at anaphase, not telophase. Removing all of it in anaphase I would split sisters.",
       1:"The meiosis I spindle has two poles; homologs go to opposite ones.",
       2:"Sisters are replicated in S before meiosis I begins."},
 sam:{0:"Write a SAM question that predicts the outcome if sister kinetochores bi-oriented in meiosis I.",
       1:"Write a SAM question tying chiasmata to tension at metaphase I.",
       2:"Write a SAM question on the replication state of chromosomes at the start of meiosis I."},
 src:"Campbell Ch. 10"},

{n:"D21",
 unit:10,
 step:"M3-END",
 role:"post",
 topic:"Products compared",
 stem:"Compare the products of mitosis and meiosis from one diploid cell in a 2n = 4 organism.",
 opts:["Mitosis: 2 cells, 2n = 4, genetically identical. Meiosis: 4 cells, n = 2, genetically distinct",
       "Mitosis: 2 cells, n = 2, genetically distinct. Meiosis: 4 cells, 2n = 4, genetically identical",
       "Mitosis: 4 cells, n = 2, genetically distinct. Meiosis: 2 cells, 2n = 4, identical",
       "Both: 2 cells, 2n = 4; only the meiosis products differ genetically"],
 key:0,
 why:"One division without reduction keeps 2n and identity. Two divisions after one replication halve the number, and crossing over plus independent assortment make the four products distinct.",
 miss:{1:"Mitosis does not reduce ploidy, and meiosis does not produce diploid cells.",
       2:"Reversed: meiosis has two divisions and four products.",
       3:"Meiosis produces four haploid cells, not two diploid ones."},
 sam:{1:"Write a SAM question that builds the full comparison table: divisions, products, ploidy, identity, location, purpose.",
       2:"Write a SAM question counting divisions and products for each process.",
       3:"Write a SAM question on why meiosis needs two divisions to reach four haploid cells."},
 src:"Campbell Ch. 10 (comparison)"},

{n:"D22",
 unit:10,
 step:"M3-FERT",
 role:"pre",
 topic:"A trisomic zygote",
 stem:"A gamete with n + 1 chromosomes is fertilized by a normal gamete. What is the zygote's chromosome condition?",
 opts:["Monosomic, 2n − 1: one copy of one chromosome missing",
       "Triploid, 3n: one extra copy of every chromosome",
       "Normal, because fertilization corrects the count",
       "Trisomic, 2n + 1: three copies of one chromosome"],
 key:3,
 why:"n + 1 plus n gives 2n + 1, with three copies of the chromosome that failed to separate. That is aneuploidy; trisomy 21 is the familiar human example. Triploidy would mean a whole extra set, not one extra chromosome.",
 miss:{0:"Monosomy follows from an n − 1 gamete.",
       1:"Triploidy is an extra full set (3n). One extra chromosome is trisomy.",
       2:"Fertilization adds the two gametes' chromosomes. Nothing removes the extra one."},
 sam:{0:"Write a SAM question tracing an n − 1 gamete to a monosomic zygote.",
       1:"Write a SAM question contrasting aneuploidy with polyploidy.",
       2:"Write a SAM question on why trisomy 21 is usually traced to nondisjunction in the egg."},
 src:"Campbell Ch. 12 (aneuploidy); going further"},

{n:"D23",
 unit:10,
 step:"M3-SPEC",
 role:"post",
 topic:"Same genome, different cells",
 stem:"Muscle and nerve cells in one person share a genome but differ in shape and proteins. What explains this?",
 opts:["Somatic cells lose different sets of genes as they differentiate into each cell type",
       "Differential gene expression: each cell type transcribes a different subset of genes",
       "Each cell type arose from a different gamete, so each carries a different genome",
       "Mitosis distributes genes unequally, so daughters start out with different genes"],
 key:1,
 why:"All somatic cells descend from the zygote by mitosis and carry the same genome. Differentiation depends on which genes each cell expresses, controlled by transcription factors and other regulators, not on which genes it keeps.",
 miss:{0:"With rare exceptions, differentiated cells keep the full genome; cloning by nuclear transfer shows a differentiated nucleus can still direct development.",
       2:"All somatic cells come from one zygote, made from one sperm and one egg.",
       3:"Mitosis distributes identical sets. Unequal distribution would be an error, not differentiation."},
 sam:{0:"Write a SAM question using nuclear transfer as evidence that differentiated cells keep their genome.",
       2:"Write a SAM question tracing every somatic cell back to the zygote.",
       3:"Write a SAM question on what a transcription factor does in differentiation."},
 src:"Campbell Ch. 15/16 (differential gene expression); BIO.3e"},

{n:"D24",
 unit:10,
 step:"M3-SORT",
 role:"post",
 topic:"Life-cycle placement",
 stem:"In the human life cycle, which processes connect the zygote, the adult body and the gametes?",
 opts:["Zygote → meiosis → adult body; adult body cells → mitosis → gametes → fertilization",
       "Zygote → mitosis → gametes; gametes → meiosis → adult body → fertilization",
       "Zygote → mitosis → body; germ cells → meiosis → gametes → fertilization → zygote",
       "Every body cell can undergo meiosis to make gametes, which fuse at fertilization"],
 key:2,
 why:"The human cycle alternates haploid and diploid only at the gamete and zygote stages. Mitosis builds and maintains the diploid body; meiosis, only in germ cells of the gonads, makes haploid gametes; fertilization restores diploidy.",
 miss:{0:"Meiosis would halve the body's chromosome number. Bodies grow by mitosis.",
       1:"Gametes come from meiosis, not mitosis.",
       3:"Only germ cells in the gonads undergo meiosis."},
 sam:{0:"Write a SAM question drawing the human life cycle with n and 2n marked at each stage.",
       1:"Write a SAM question contrasting the animal life cycle with a plant's alternation of generations.",
       3:"Write a SAM question on germ cells versus somatic cells."},
 src:"Campbell Ch. 10 (sexual life cycles)"}
];
```

## 10. Acceptance tests

### 10.1 The test hook

Expose `window.__CD`, as the Energy Patch exposes `window.__EP`. Tests drive the page through it, and it must not change behaviour.

```js
window.__CD = {
  st: () => st,
  setTab(t),                       // 0 Mitosis, 1 Meiosis, 2 Side by side
  goStep(i), curStep(), visSteps(), stepDone(i),
  setLevel("sol"|"de"), setDev("ipad"|"pc"), setSupports(0|1|2), fill(bool), cardHidden(bool),
  set(name, value),                // "xo" bool (crossing over), "genes" bool, "cellType" "animal"|"plant", "speed" 0.5|1|2,
                                   // "teach" bool, "ndj" "none"|"I"|"II" (DE), "gamete" "sperm"|"egg" (DE), "detach" bool (DE)
  shuffle(), runAgain(), stepBoth(),
  fertilize(spermIndex, eggIndex), // spermIndex 0–3, or "n+1" at DE; eggIndex 0–3
  sortCard(i, "mitosis"|"meiosis"|"fertilization"),
  answer(itemId, optionIndex), opener(i, "agree"|"disagree"),
  clockCounts([i,p,m,a,t], hours),
  run(seconds),                    // advance the simulation fast, without drawing
  counts(lane),                    // lane 0 (or the only lane), 1 = Module 3's meiosis lane:
     // { cells, perCell:[{chromosomes, chromatidsPer:[…], ploidy:"2n"|"n"|"2n+1"|…, dnaC}], phase, separating:bool, readout:"…text…" }
  cells(lane),                     // full model: [{id, size, chromosomes:[{id, pair:"L"|"S", origin:"m"|"p"|"egg-m"|"egg-p",
                                   //   chromatids:[{segments:[{from,to,origin}], gene:"A"|"a"|"B"|"b"}], kinetochores:[…]}],
                                   //   envelope:"intact"|"breaking"|"gone"|"forming", condensed:bool}]
  events(),                        // ordered log since the step opened: {t, lane, type, phase, cell, ids}
                                   // type ∈ replicate, condense, decondense, envelopeBreak, envelopeForm, spindleAttach,
                                   // pairUp, crossover, lineUp, anaphaseStart, separateSisters, separateHomologs,
                                   // arrivePole, cytokinesisStart, cytokinesisEnd, fertilize, detach, reattach
  tally(), lineup(),               // tally: {runs, kinds:{AB:n, Ab:n, aB:n, ab:n}}; lineup: per pair, which origin faces pole 0
  printFrame(),                    // the image "Print this step" would print, as a data URL
  layout(), items(level), allText(level), beyondText(level), colours(), next(), errorCode(), fps(), draw()
};
```

### 10.2 The tests

Run every test at **1180 × 820**, in **both** device settings, unless it says otherwise. Report PASS or FAIL with a one-line reason per FAIL, in a table.

| # | Test | How to check |
|---|---|---|
| **T1** | **Counts match §4.1.** | For each row of §4.1 reachable at that level, drive to that moment and compare `counts()` (cells, chromosomes per cell, chromatids per chromosome, ploidy, and `dnaC` at DE). At SOL, during mitotic anaphase and anaphase II, `readout` contains "separating" and no chromosome number; at DE it shows 8 (mitosis) or 4 (anaphase II). From anaphase I through telophase I the readout also shows "2 at each end". Both lanes in Module 3 too. |
| **T2** | **No X before S; copying keeps the count.** | Before the `replicate` event, every chromosome in `cells()` has 1 chromatid and `condensed:false`. After it, the chromosome count is unchanged and every chromosome has 2 chromatids. No chromosome is drawn condensed while `envelope` is "intact" in G1 or S. |
| **T3** | **Halving happens at meiosis I.** | Module 2, with `ndj` "none": chromosomes per cell stays 4 until the `cytokinesisEnd` that follows `separateHomologs`, where it becomes 2. After that it changes only at anaphase II (2 → 4) and at the final `cytokinesisEnd` (4 → 2). |
| **T4** | **One copy, two divisions.** | Exactly one `replicate` event per full meiosis run, before the first `pairUp`. None between the first `cytokinesisEnd` and the end of the run. The "Copying? No" stamp is visible at the start of M2-MET2 (screenshot). |
| **T5** | **The right things separate.** | With `ndj` "none". Module 1 and Module 3's top lane: no `separateHomologs` ever. Meiosis I: no `separateSisters`; for every chromosome, both chromatids arrive at the same pole. Meiosis II and mitosis: the two chromatids of each chromosome arrive at opposite poles. |
| **T6** | **SOL vocabulary.** | For every string in `allText("sol")` and the rendered DOM text of every SOL step, in all three modules and all three Help settings: no `SOL_FORBIDDEN` word (§7.1, case-insensitive, whole word). Every taught word used in a step's text, labels or items appears in that step's "Words in this step" chips. |
| **T7** | **Genetics of the line-up and crossing over.** | With `ndj` "none". (a) 400 × `shuffle()`: each pair's orientation in `lineup()` is between 35% and 65% each way, and the two pairs are independent (each of the 4 combinations 15–35%). (b) Crossing over on, 50 runs: every run's four sex cells carry exactly {AB, Ab, aB, ab}, and their segment patterns in `cells()` are pairwise different. (c) Reset the tally. Crossing over off, 50 runs: every run gives two kinds, two cells each; across those 50 runs, all four kinds appear in `tally()`. (d) Every `crossover` event is between non-sister chromatids of the long pair, at the same position on both, between the centromere and gene A. |
| **T8** | **"Beyond the SOL" tagging.** | At SOL, every string in `allText("sol")` matching `/\b(pro|meta|ana|telo)phase\s+(I{1,2}|1|2)\b/i` is in `beyondText("sol")`, and each matching rendered DOM node has an ancestor carrying the tag. No SOL item other than A1–A2 has a key or stem that needs a meiosis stage name. `beyondText("de")` is empty. |
| **T9** | **Fills an iPad landscape screen.** | `fill(true)` at 1180 × 820 and 1180 × 750, every module, both levels: `scrollHeight <= innerHeight + 1`, `scrollWidth <= innerWidth`, the canvas and every visible control lie inside the viewport. The card column scrolls internally. |
| T10 | No horizontal page scroll | At 360, 768, 1024, 1180 and 1366 px wide, portrait and landscape, `fill(false)`: `scrollWidth <= innerWidth`. |
| T11 | Touch targets | iPad setting: every button, option, step dot, sort card and gamete choice ≥44 × 44. Report any under 48. |
| **T12** | **The final frame is the printed still.** | For each module's last step, at both levels: run to its end, then compare `printFrame()` with the canvas pixels. Mean absolute difference < 0.5%. Re-render the final frame twice: the two are identical. |
| T13 | Banks are intact | `items("sol")` = N1–N18 + A1–A2 and `items("de")` = D1–D24, exactly as §8–§9. Each appears at its `step` and `role`. A wrong answer shows its `miss` (plus `sam` at DE), then `why`. `src` never renders. A1–A2 show the Advanced Biology badge and the beyond-the-SOL tag and never block a step. |
| **T14** | **The ring leads a student through.** | A scripted student who only ever presses what `next()` names (answering items with the key) finishes every step of every module, at both levels and at Help 0, 1 and 2. `set("teach",true)` opens every part of every step and lights no dot by itself. The ring is never on a control while the model is moving by itself. |
| T15 | Levels switch cleanly | Switching SOL ⇄ DE on any step changes labels, text, items and eyebrow without a reload. From a DE-only step, switching to SOL goes to M1-CHK → M1-TEL, M2-NDJ → M2-TEL2, M2-EGG → M2-TEL2. DE-only steps have no SOL dots. |
| **T16** | **Help changes help, not the task.** | For each step: the tasks, goals, items and option lists are identical at Help 0, 1 and 2. SOL hints appear only at 2. Loading `?supports=2` opens at Most help and saves it; `?supports=0` likewise. |
| T17 | Saving | A reload restores level, Help, module, step, answers, goals, fill, card hidden, Show genes, crossing over, cell type, tally, openers and sort. With `localStorage` stubbed to throw, the page loads and runs. |
| T18 | No outside requests | Only the page and Google Fonts. No console errors in any test. |
| T19 | Nothing else changed | `git diff --name-only main...HEAD` lists only `biology/tools/cell-division-patch.html`. |
| T20 | Contrast in both themes | For every pair in `colours()`, light and dark (emulated): labels ≥4.5:1 ink on plate; chromosome fills, egg chromosome fills and cohesin against the cytoplasm ≥3:1. |
| **T21** | **Readable without colour.** | Screenshot Module 2 at M2-TEL2 (crossing over on) and Module 3 at M3-LINE, then convert to greyscale. Maternal and paternal chromatids, and the swapped tips, are distinguishable by pattern alone. Confirm by code review that the paternal fill uses a pattern, not only a colour. Attach both greyscale images. |
| T22 | Nondisjunction (DE) | `set("ndj","I")`, run to the end: the four cells hold 3, 3, 1, 1 chromosomes. `set("ndj","II")`: 3, 1, 2, 2. `set("ndj","none")`: 2, 2, 2, 2. |
| T23 | Egg making (DE) | `set("gamete","egg")`, run to the end: one cell with 2 chromosomes whose area is ≥ 4× each polar body's; two polar bodies; the caption about the first polar body and about meiosis II finishing after a sperm enters is shown. |
| T24 | The M checkpoint (DE) | M1-CHK with `set("detach",true)`: no `anaphaseStart` within `run(30)`. After `set("detach",false)`: `anaphaseStart` within `run(10)`. |
| T25 | Fertilization | `fertilize(i,j)` for all 16 pairs: the zygote has 4 chromosomes, one long and one short from each gamete, with gene letters matching the two gametes. At DE, `fertilize("n+1", j)`: 5 chromosomes, readout "2n + 1". |
| T26 | Which one? | `sortCard` with the keys in §6 marks all eight correct and lights the step. A wrong placement shows that card's feedback and can be redone. |
| **T27** | **Motion order.** | From `events()`: `spindleAttach` for a chromosome precedes any separation of it; in each anaphase, every separating chromosome's movement starts within 100 ms of the first; `pairUp` precedes `crossover` precedes `lineUp` in meiosis I; every `arrivePole` precedes `cytokinesisEnd` for that cell; `envelopeBreak` precedes `lineUp`; `envelopeForm` follows the last `arrivePole`. |
| T28 | Frame rate (informational) | iPad setting, Module 3 playing, 5 s real time: report `fps()`. FAIL only if < 30 in headless Chromium. |
| T29 | Openers and Look back | `opener(0,"agree")`, `opener(1,"disagree")`, reload, then M3-SORT completed: the Look back card shows both original answers and both correct answers. |
| T30 | Error code | `errorCode()` equals `CDP-<module>-<step key without the module prefix>-<SOL|DE>` (for example `CDP-M2-ANA1-SOL`), and the rendered note shows it, on every step. |

### 10.3 The report back

Post one message with:

1. The branch name and commit hash.
2. The T1–T30 table (PASS/FAIL, reason for each FAIL), for the iPad and Computer settings.
3. Screenshots at 1180 × 820: SOL and DE × {M1-ANA, M2-MET1 with the tally, M2-TEL2 with Show genes on, M3-LINE with the table, M3-SORT}, plus one Teaching view callout, plus the two T21 greyscale images.
4. Anything you could not build as written, or built differently, and why. Name any dropped item from §0.8.

Then stop. Do not merge.

## 11. After Reid reviews (not part of this build)

Listed so the builder knows these are deliberately left out.

- **Classroom-tools hub:** list as Bio Tool #33 under Unit 5 · Cell Growth, Division & Specialization, as the first entry, before Bio Tool #19.
- **DE hub:** the first entry under Unit 9 (The Cell Cycle) and Unit 10 (Meiosis and Sexual Life Cycles).
- **SOL Challenge Questions:** add "On this site" links on Q35–Q39 (edit `_build/sol-challenge-questions/bank.js` and rebuild).
- **Sitemap and search:** add the URL to `sitemap.xml`; add the search entry.
- **Canvas:** Adv Bio 425639 Module 5 first (Reid builds Adv Bio before copying to Biology I 425631), then DE 425646 Units 9 and 10.
- **Narrated video:** Reid records it in the booth after the Unit 5 lessons are set.
- **Unit 6:** a later allele tool can reuse this model's chromosomes and gene letters.
