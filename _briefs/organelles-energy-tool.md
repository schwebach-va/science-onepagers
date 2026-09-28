# Build brief: The Energy Patch (Bio Tool #11)

Chloroplast and mitochondrion, animated molecule by molecule, at a 9th-grade level and a DE level.

- **Brief version:** Leg 3 of the organelles relay, written 2026-09-27 in the Science OnePagers project from handoff card v4. Reid settled the URL and number in that session, and accepted every recommendation in the card's Proposals section.
- **Checked in Leg 3:** an independent review pass re-answered all 45 keys, and its corrections are in this version. A script validated the bank data: the key spread, a `miss` for every wrong option, a `sam` for every DE wrong option, the 9th-grade forbidden-word list and the no-36–38 rule.
- **Who reads this:** the Claude Code cloud session that builds the page. This file is the whole spec. The build needs nothing else from the handoff card.
- **Where it lives:** `_briefs/organelles-energy-tool.md` in `schwebach-va/science-onepagers`. The repo has no `.nojekyll`, so GitHub Pages' Jekyll skips folders that start with `_`, and this file is never served. Do not add a `.nojekyll`.

---

## 0. The job, in one screen

1. Build **one new file**: `biology/tools/organelles-energy.html`. The permanent URL is `https://scienceonepagers.org/biology/tools/organelles-energy.html`. It is Bio Tool #11, and the title is "The Energy Patch".
2. It must be self-contained: plain HTML, CSS and JS in one file, with no build step, no framework and no external script. Google Fonts are the only external request, loaded the same way `biology/tools/water-patch.html` loads them.
3. Commit it on a new branch and push that branch. **Do not merge into `main`, and do not open or merge a pull request unless Reid asks.** On the branch name:
   - If the session assigns you a working branch (Claude Code cloud sessions usually name one `claude/…`), use that branch.
   - If you are free to choose, use **`claude/organelles-energy-tool`**.
   - Say which branch you used in the report.
4. **Do not edit any existing file.** That includes the classroom-tools hub (`biology/classroom-tools.html`), the DE hub (`biology/de-biology-101-resources.html`), `sitemap.xml`, `search-index.js`, `search.html`, `style.css` and every other page. Listing the tool on the hubs and adding it to search come after Reid reviews it, in a separate job (§11).
5. Test at **1180 × 820 CSS px (iPad, landscape)** with Playwright and Chromium. Cover single-organelle and side-by-side view, 9th Grade and DE levels, and both device settings (iPad and Computer, §5.1). Report **every acceptance test in §10 as PASS or FAIL**, with a one-line reason for each FAIL. Attach screenshots.
6. Nothing publishes without Reid. The branch is for his review.

**How the push works.** The Water Patch build (Bio Tool #10) came from a Claude Code cloud session started at claude.ai/code with this repository selected. It pushed its own branch, `claude/practical-goodall-vzd4oa`, which Reid reviewed and merged as PR #1. Start the build the same way.

On 2026-09-27, a session opened from Cowork, where the repository was not the session's source, could clone the repo but got this from the git proxy on push: *"not in this session's authorized repository set"*.

**If `git push` is refused, do not hunt for a workaround.** Keep the commit, report the refusal word for word, and stop. The fix is to restart the task with `schwebach-va/science-onepagers` selected as its repository.

## 1. Read these first (the house pattern)

| File | What to take from it |
|---|---|
| `biology/tools/water-patch.html` (Bio Tool #10) | **The newest pattern. Copy it closely.** It has the `:root` colour tokens with the dark-mode blocks; the `.topbar` of `.seg` switches (device, module); the level switch; the `.build` grid (60/40 at ≥900px) with the sticky `.stagecol`; step `.dots`; the "Teaching view" button; `.card` with `.bar`, `.meta`, `.prompt`, `.goals`, `.opts`/`.opt.right/.wrong`, `.why`, `.explain .deep`; the `#record` section; the footer; the localStorage `st` object with `save()` in try/catch; `goStep`/`setTab`/`setLevel`/`setDev`; and the test hook `window.__WP`. |
| `biology/tools/membrane-patch.html` (Bio Tool #5) | The iPad rules Reid set on 9/22: the stage stays pinned while text scrolls, **any step opens directly** from its dot, and **a step's dot lights only when that step is finished**. He teaches from it live. |
| `biology/tools/sol-challenge-questions.html` (Bio Tool #8) | The question-item shape: `stem`, `opts`, `key`, `why`, and `miss` (one note per wrong option). It also has the `?q=` filter. The banks in §8–§9 use this shape. |
| `biology/tools/checkpoint-companion.html` (Bio Tool #9) | The `sam` prompt per wrong option, for DE students who build Student-Authored Modules from their misses. DE items in §9 carry `sam`. |

Match their tone and markup: the `sop-back` link to `../classroom-tools.html`, the `sop-eyebrow`, the `.lede`, the `.fine` note that nothing is submitted, and the `sop-foot` footer with the CC BY-NC 4.0 licence and the link to `../../teaching/classroom-tools-note-to-teachers.html`. Use a `<link rel="canonical">`, `og:` and `twitter:` meta and a `meta description`, as Water Patch does.

## 2. What the tool is (Reid's design, kept as he gave it)

One interactive page that animates the two main energy reactions of life as a cartoon you can follow molecule by molecule. Photosynthesis runs in the chloroplast, and cellular respiration runs in the mitochondrion. It has two depths: **9th Grade** (Virginia SOL Biology, BIO.2e) and **DE** (NOVA BIO 101, Campbell *Biology in Focus* 3e, Ch. 7 and 8). Pressing DE shows more detailed illustrations and a harder question bank. Students can manipulate it, and a teaching mode lets Reid freeze any stage at the board.

**Chloroplast.**

- A beam of light visibly hits the chloroplast.
- A cartoon reaction center is hit and bounces an electron out. It replaces that electron by stripping one from a water molecule, and the water becomes oxygen, which leaves.
- H⁺ builds up inside the thylakoid, making it acidic. That H⁺ drives ATP synthase, and the ATP (with NADPH) drives the Calvin cycle.
- The Calvin cycle spins, so students can see carbons becoming three-carbon compounds. Track the CO₂ coming in and the three-carbon sugar coming out.

**Mitochondrion, drawn to look and move the same way.**

- In the cytoplasm, a six-carbon ring breaks into two three-carbon pieces.
- Follow one three-carbon piece into the mitochondrion. It is trimmed to a two-carbon piece, and CO₂ leaves.
- Count all the CO₂ leaving as the carbons come in.
- Show that it depends on oxygen. O₂ flows **into** the mitochondrion, while the chloroplast **gives off** O₂.

**Both together.** The two can run at the same time. Oxygen from the chloroplast travels over to the mitochondrion, and three-carbon sugars from the chloroplast become six-carbon sugars that reach the mitochondrion. **The picture is not two organelles inside one cell.** It shows how the two organelles relate.

**Two levels.** At 9th grade, the mitochondrion is simply the place that makes a lot of CO₂ and where ATP synthase gets powered. At DE, the illustrations go further: the chloroplast shows the Z scheme and cyclic flow, and the mitochondrion shows where the electron transport chain sits and how it moves.

**Screen.** The models are large and fill the whole iPad screen. A setting switches between one organelle and both side by side. Everything runs on scienceonepagers.org, which is static and served by GitHub Pages.

## 3. Decisions already made (do not reopen)

- **URL, number and title.** The URL is `biology/tools/organelles-energy.html`, the number is Bio Tool #11, and the page title is "The Energy Patch". The `<title>` is `The Energy Patch | Science One-Pagers`. The eyebrow changes with level and module (§5.6).
- **One page, with a 9th / DE switch.** It is not two pages.
- **The water loop is shown in side-by-side view.** The mitochondrion makes water at the end of its chain, and the chloroplast splits water.
- **Where the six-carbon sugar forms in side-by-side view.** Two three-carbon sugars leave the chloroplast, join on the way across, and arrive as the glucose ring that the mitochondrion's cytoplasm step breaks.
- **Colours.** Keep Reid's macromolecule palette where it applies: glucose and sugars are carbohydrate gold `#C98A2E`, and ATP is nucleic-acid purple `#6B4E8C` (ATP is a nucleotide). Gases and water take the colours students use on packet p. 19: CO₂ red, O₂ pink and water light blue. The full table is in §5.4.
- **Light and CO₂ sliders in the chloroplast**, at both levels. There is also a **light-colour selector** (white, red, blue, green). It is shown at DE and is optional at 9th, which gets a "More" disclosure.
- **No stage names at 9th grade.** Plain descriptions only. "Glycolysis", "Krebs", "citric acid cycle" and "electron transport chain" appear only in DE.
- **DE labels use the deck's own words:** thylakoid space (not lumen), cytochrome complex, Pq, Pc, Fd, NADP⁺ reductase, citric acid cycle, and proton-motive force.
- **The cyclic-flow switch is DE only, marked "Going further".**
- **The fermentation branch is DE only** (lactate or alcohol) and appears when O₂ is off. At 9th, O₂ off just shows "far less ATP", with no branch drawn.
- **A pH readout in both organelles, DE only.**
- **Two energy panels, DE only**, each one tap away: the respiratory chain's free-energy staircase, and the linear-flow energy diagram labelled "Z scheme". Draw them fresh; do not trace a textbook figure.
- **An uncoupler switch, DE only, lowest priority.** If the build runs long, drop it along with item D14, and say so in the report.
- **Build both levels in one pass.** If time runs short, ship the 9th-grade view complete. Leave the DE switch present but disabled, labelled "DE view: coming Nov 30", and report it.
- **The question banks** are §8 (9th grade, 16 core items plus 2 Advanced) and §9 (DE, 27 items). Their numbers are permanent, like Bio Tool #8's.
- **Copyright.** No Pearson wording: nothing from the Campbell decks, clicker decks, review documents or the NOVA Checkpoints, and no traced Pearson figures. No VDOE released-item text either. Every item in §8–§9 is original and may be used as written.

## 4. Science the build must get right

These numbers are the test oracle. Build every counter from them, and let the acceptance tests check against them.

**Per glucose, photosynthesis side (chloroplast):**

| Quantity | Value | Note |
|---|---|---|
| CO₂ fixed | **6** | 3 per three-carbon sugar (G3P); two G3P make one glucose |
| G3P leaving the Calvin cycle | 2 | each G3P takes 3 turns: 3 CO₂ + 3 RuBP (5C) → 6 three-carbon → 1 out, 5 rebuilt into 3 RuBP |
| ATP used by the Calvin cycle | 18 | **9 per G3P** |
| NADPH used | 12 | **6 per G3P** |
| Water split at PS II | **12** | 2 H₂O → 4 e⁻ + 4 H⁺ + 1 O₂ |
| O₂ released | **6** | each O₂ comes from 2 water molecules |
| Electrons moved, linear flow | 24 | 2 per NADPH |

**Per glucose, respiration side:**

| Stage (DE name) | Where | CO₂ out | ATP (substrate-level) | NADH | FADH₂ |
|---|---|---|---|---|---|
| Glycolysis | cytosol (9th: "cytoplasm") | **0** | 2 net | 2 | 0 |
| Pyruvate oxidation | matrix | **2** (1 per pyruvate) | 0 | 2 | 0 |
| Citric acid cycle (2 turns) | matrix | **4** (2 per turn) | 2 | 6 | 2 |
| Electron transport and chemiosmosis | inner membrane / cristae | 0 | about 26–28 by ATP synthase | — | — |
| **Total with O₂** | | **6** | **"up to about 32"** | | |
| O₂ used at complex IV | | **6 O₂** | | | |
| Water made at complex IV | | **12 H₂O** | | | |

**Fermentation, O₂ off, DE only.** Glycolysis gives 2 ATP. The lactate branch releases 0 CO₂. The alcohol branch releases **1 CO₂ per pyruvate, so 2 per glucose**, and pyruvate oxidation and the citric acid cycle release none. ATP is **2**.

**Water, the trap.** The balanced equation shows 6 H₂O, but atom for atom the chloroplast splits **12** H₂O to release 6 O₂, and the mitochondrion's chain makes **12** H₂O from 6 O₂. The net 6 appears because the Calvin cycle and the citric acid cycle move water around internally. **Never show a counter reading "6 H₂O split → 6 O₂"**: 6 waters hold only 6 oxygen atoms, enough for 3 O₂. At 9th grade, do not count water; show water drops arriving and leaving. At DE, count 12 split and 12 made, and add a one-line note: "The overall equation shows 6 H₂O because the cycles use and release some water internally."

**Other science checks:**

- **The same layout in both organelles.** H⁺ piles into the **thylakoid space** (chloroplast) and the **intermembrane space** (mitochondrion). ATP synthase lets it back through, and ATP forms where it is used: the **stroma** and the **matrix**. Draw the two identically: same ATP synthase sprite, same H⁺ dots, same motion.
- **pH (DE).** When running, the thylakoid space sits near **pH 5** and the stroma near **pH 8**. The intermembrane space sits near **pH 7.0** and the matrix near **7.8**; the matrix pH **rises** while the chain runs. When the source stops (light off, O₂ off, uncoupler on), the gradient relaxes toward equal.
- **Linear electron flow order:** water → PS II (P680) → Pq → cytochrome complex (pumps H⁺ into the thylakoid space) → Pc → PS I (P700) → Fd → NADP⁺ reductase → NADPH, made on the stroma side. The excited electron leaves the reaction center **first**, and water fills the hole it leaves.
- **Cyclic flow runs on PS I, not PS II:** PS I → Fd → cytochrome complex → Pc → PS I. It pumps H⁺ and makes **ATP only**, with **no NADPH, no water split and no O₂**. PS II sits idle. A "PS II alone" mode would be wrong.
- **Oxygen is used only at the end of the chain** (complex IV), where O₂ + electrons + H⁺ → water. With O₂ off, complex IV stalls, the chain backs up, H⁺ pumping stops, ATP synthase slows to a stop as the gradient runs down, and NADH cannot be recycled. Glycolysis continues **only** through fermentation (DE) or "the glucose ring still breaks, with far less ATP" (9th).
- **ETC location.** Complexes I–IV, with Q and cytochrome c, sit in the inner membrane and cristae. They pump H⁺ into the intermembrane space. ATP synthase's head faces the matrix.
- **Light off with CO₂ steady (DE):** RuBP falls and 3-phosphoglycerate builds up, because fixation keeps going for a moment while the ATP- and NADPH-dependent steps stall. Then the cycle stops.
- **Light intensity:** the rate rises, then levels off (saturation). **CO₂:** the rate rises, then levels off. **Light colour:** red and blue drive photosynthesis best and green worst. At equal intensity, use relative rates of about red 1.0, blue 0.9, white 0.8 (white light includes green, which is used poorly) and green 0.3. Below saturation the rate scales with intensity times that factor.
- **Uncoupler (DE):** H⁺ leaks back across the inner membrane without going through ATP synthase. ATP made falls, electron flow and O₂ use continue (or rise), and a heat readout rises. This is how brown fat warms a newborn.
- **ATP numbers.** 9th grade: never an ATP-per-glucose yield. The wording is "far more ATP with oxygen than without", and the ATP readout is a gauge. Counting the ATP tokens a student can watch pop out of ATP synthase is fine in a task ("Make four ATP: 2 of 4"). DE: **"up to about 32"** with O₂, and **2** for fermentation. **No screen, label, explanation or item may ever say 36 or 38 ATP.**
- **9th grade and the SOL.** The Virginia framework says students "are not expected to know the complex multistep processes of photosynthesis and respiration." The 9th view may *show* the steps as pictures, but no 9th-grade question may require a step's name. The Advanced items A1–A2 are the one exception, and they are marked.

## 5. Page, layout and controls

### 5.1 Top of the page (scrolls away)

- `sop-back` link.
- `.topbar` with three `.seg` switches:
  - **Running on:** iPad / Computer. Build both. Reid confirmed on 9/27 that a separate iPad version and Computer version is the right answer wherever resolution or frame rate is a problem, as it was for the Water Patch.
    - **iPad** (the default) is tuned for 1180 × 820 landscape:
      - devicePixelRatio capped at 2;
      - no more than about 60 moving tokens on screen per organelle (about 100 side by side);
      - no shadows or blur filters in the loop;
      - every touch target ≥48px;
      - labels ≥16 CSS px, or ≥28 in Teaching view.
    - **Computer** raises the DPR cap to 2.5, allows about 2.5× the tokens (denser H⁺ clouds and more light-harvesting pigments), and tightens the controls for a mouse, with hover highlights on stage parts.
    - The **science is identical** in both: the same counters, steps and banks. Only the drawing density and control sizes change.
    - It must hold **≥50 fps** on iPad settings in side-by-side view with Run both on (checked by T14).
    - Touch targets: aim for **48px** on iPad. **44px is the floor** that T11 fails below.
  - **Module:** `1 · Chloroplast` / `2 · Mitochondrion` / `3 · Both together`.
  - **View:** `One organelle` / `Side by side`.
- Eyebrow, `<h1>The Energy Patch</h1>`, a `.lede` per module, and the level switch: `9th Grade SOL Bio` / `DE Bio`. There is no Chemistry level. The `.fine` note says nothing is submitted, progress saves on this device, and any step number opens that step. Then the legend.

### 5.2 The tool area fills the iPad screen

This is the one real departure from Water Patch, and Reid asked for it: the models are large and fill the screen.

- At **≥900px wide in landscape**, `#build` is `height:100svh` (`100vh` fallback), a two-column grid.
  - **Stage column, left, about 64%:**
    - the stage canvas, filling all the height the controls leave;
    - the controls row (§5.5);
    - the readout line;
    - the step dots, with "Teaching view" and "Hide card".
  - **Card column, right, about 36%:** the `.card`, with `overflow-y:auto` **inside the column**. The page itself does not scroll while you work.
- A **"Fill screen"** button sits in the controls row.
  - It hides **everything outside `#build`**: the back link, topbar, intro, `#record`, Go further and footer. It does this with a `data-fill="1"` attribute on `<html>`, so only the tool shows and the page has nothing to scroll. The Module, View and Level switches it hides get compact copies inside `#build`, at the top of the stage column.
  - It also calls `requestFullscreen` / `webkitRequestFullscreen` on `#build` where that API exists. iPad Safari support is patchy, so the layout must work without it.
  - Tapping it again restores the page.
  - The build opens with it **off** so the intro can be read; the setting persists in `st`.
- **"Hide card"** collapses the card column so the stage takes the full width.
  - **Side by side starts with the card hidden** at <1400px wide, so each organelle stays large.
  - A slim tab at the right edge ("Card ▸") brings the card back as an overlay panel, 380px wide, over the stage.
- **Below 900px wide**, or in portrait, use Water Patch's stacked layout: the stage is pinned (`position:sticky`) above the card, and the card scrolls under it.
- **The canvas has no fixed aspect ratio.** Size it to its box, times devicePixelRatio (capped at 2 on iPad, as in Water Patch). Draw in world units and scale to *contain*, centred.
  - One organelle: a 1200 × 800 world.
  - Side by side: a 2000 × 800 world, with the chloroplast on the left and the mitochondrion on the right.
- There is **no horizontal page scroll at any width from 360px up.**

### 5.3 The drawing

- **Canvas 2D**, one `requestAnimationFrame` loop. Stop drawing when the tab is hidden or the stage is off-screen, as Water Patch does.
- **Chloroplast:**
  - a large rounded lens with a double envelope;
  - three or four grana (stacks of thylakoid discs) joined by lamellae;
  - stroma filling the rest;
  - one thylakoid membrane drawn as the **"working patch"**: a magnified inset band where the reaction center, carriers and ATP synthase sit. That magnified patch is where the molecule-by-molecule action happens; the whole organelle stays visible around it.
- **Mitochondrion:**
  - a large capsule with outer and inner membranes;
  - the inner membrane folded into cristae;
  - the matrix inside;
  - one crista drawn as the **working patch**, at the same scale and layout as the chloroplast's.
  - The cytoplasm sits outside, where glucose breaks.
- **The two working patches are mirror twins.** Membrane horizontal; H⁺ reservoir above (thylakoid space / intermembrane space); ATP-forming side below (stroma / matrix); ATP synthase at the right end with its head below. In side-by-side view they sit at the same height, so the parallel reads at a glance.
- **Side-by-side background:** plain, with **no cell membrane drawn around both**. Transfer lanes run between the organelles:
  - O₂ from left to right;
  - sugar from left to right, two three-carbon sugars joining into a glucose ring on the way;
  - CO₂ from right to left;
  - water from right to left.
- A small caption on the stage reads: *"Not a map of one cell: how the two organelles feed each other."*
- Motion must be readable at the board. Tokens move at a pace the eye can follow (about 150–250 world units per second at speed 1). Every moving token is at least 14 world units across.

### 5.4 Tokens and colours

Define each colour once as a constant, and give it a dark-mode variant where contrast needs one.

| Token | Drawn as | Colour |
|---|---|---|
| Carbon | a bead, the **same bead everywhere**, so carbons can be counted across every step | charcoal `#3B3631` (dark mode `#D9D2C6`) |
| CO₂ | one carbon bead with two small O circles | O circles and a thin halo in CO₂ red `#D2382F` |
| Glucose | a ring of 6 carbon beads on a gold hexagon | `#C98A2E` |
| Three-carbon sugar (G3P) / three-carbon piece (pyruvate) | a short chain of 3 beads on a gold capsule | `#C98A2E` at 70% |
| Two-carbon piece (acetyl) | a chain of 2 beads | gold, on a small grey "CoA" handle at DE only |
| O₂ | two joined circles | pink `#E58FB0` |
| Water | a light-blue drop | `#8FC7E8` |
| H⁺ | a small "+" dot | teal `#1F7A8C` (the site's `--bond`) |
| Electron | a small glowing dot with a trail | yellow `#F2C230` |
| Light | a beam (a band with photons) | yellow; tinted when a light colour is chosen |
| ATP / ADP | a nucleotide shape with 3 / 2 phosphate circles | purple `#6B4E8C` |
| NADPH / NADH / FADH₂ (DE) | a small "shuttle" capsule labelled on it | slate `#44607A`, filled when loaded and outlined when empty |
| Chlorophyll / organelle tint | chloroplast body | greens `#3F7A55` / `#E2EDE6` (dark `#7FC395` / `#18291E`) |
| Mitochondrion tint | mitochondrion body | warm `#B8704F` outline, `#F6EAE2` fill (dark `#E0A080` / `#2A1D17`) |

### 5.5 Controls (below the stage)

Build the controls per step, the way Water Patch's `buildCtl()` does.

**Always there:**

- `▶ Play / ❚❚ Pause`
- `◂ Step` / `Step ▸`: pause, then move the clock to the previous or next token event
- speed `½× 1× 2×`
- `Fill screen`
- `Reset this step`

**Chloroplast:** it builds whenever the light and CO₂ are above 0, with no extra button.

- **Light** slider, 0–100%.
- **CO₂** slider, 0–100%.
- **Light colour** `White / Red / Blue / Green`. Shown at DE; behind "More" at 9th.
- **Cyclic flow** toggle, DE only. Styled "Going further".
- **Energy panel: Z scheme**, DE only. It opens an overlay on the stage.

**Mitochondrion:**

- **Feed one glucose**. This drops a glucose ring into the cytoplasm, and M1–M3 use it. While the mitochondrion runs continuously, it is fed automatically at a rate set by Run both, or at one glucose every 8 s in single view.
- **O₂** toggle `On / Off`.
- **Fermentation** `Lactate / Alcohol`, DE only. It shows only while O₂ is off.
- **Uncoupler** toggle, DE only, "Going further".
- **Energy panel: the chain's staircase**, DE only.

**Both together:** all of the above for whichever organelle the step names, plus **Run both**, which runs both organelles continuously and draws the transfer lanes.

**Teaching view:**

- As in Water Patch, it opens every part of the step. Turning it on lights nothing by itself: a step lights only when its prediction, goals and checks are actually done.
- It also **enlarges labels to board size** (≥28 CSS px at 1180 wide).
- **Tapping a label or part in the stage pins a big callout for that part alone**, so one label shows at a time.
- It adds `Hide card` for a full-width stage.

Every control has an `aria-label`. Sliders get `<output>` values and large thumbs on iPad (Water Patch's `html[data-dev="ipad"] .slider` rules).

### 5.6 Eyebrow and footer per level

- **9th:**
  - `Bio Tool #11 · Biology I Unit 3 · SOL BIO.2e`
  - Footer: `Unit 3, Cell Energetics · Biology I, SOL BIO.2e · PWCS LT 3.1–3.3`
- **DE:**
  - Module 1: `Bio Tool #11 · DE Bio 101 Unit 8 · Photosynthesis (Campbell Ch. 8)`
  - Module 2: `Bio Tool #11 · DE Bio 101 Unit 7 · Cellular Respiration and Fermentation (Campbell Ch. 7)`
  - Module 3: `Bio Tool #11 · DE Bio 101 Units 7–8`

### 5.7 Saving

- localStorage key **`energypatch`**, holding an `st` object: `{dev, tab, view, level, step:[i,i,i], ans, goals, cnt, teach, fill, cardHidden, rec:[…]}`.
- Validate every field on load, exactly as Water Patch does. Wrap every read and write in try/catch.
- The page must work with storage blocked.

### 5.8 Below the tool

After `#record` (Water Patch's "Your record" table, one per module), add a `.do.further` box, **"Go further"**, with these entries:

- **On this site:**
  - [SOL Challenge Questions Q27–Q29](sol-challenge-questions.html?q=27,28,29) (the 9th view only);
  - [Checkpoint Companion](checkpoint-companion.html) (the DE view only);
  - [The Membrane Patch](membrane-patch.html), for ATP synthase's membrane;
  - [The Water Patch](water-patch.html), for enzymes.
- **Real structures, on Mol\*,** in the same link format as Water Patch:
  - 3WU2, photosystem II with its water-splitting cluster;
  - 1JB0, photosystem I;
  - 8RUC, rubisco;
  - 5ARA, a mitochondrial ATP synthase;
  - 1OCC, cytochrome c oxidase (complex IV).
  - **Open each ID once before committing.** If one does not load the named structure, leave it out and say so in the report. Do not guess a replacement.
- **Do not link or embed videos.** Reid's pencasts PC 6 and PC 7, and the LabXchange/BioVisions mitochondria video, are linked from Canvas, and whether the school filter passes the YouTube embed is unchecked.

Then add a `.fine` **"What the model simplifies"** note, covering:

- the organelles are drawn flat and far larger than scale;
- one magnified patch of membrane stands for thousands of chains and ATP synthases;
- token speeds are slowed so they can be followed;
- rates are relative, not measured;
- the ATP count per glucose is a maximum, and real cells often get less.

## 6. Modules and steps

This follows Water Patch's step object:

- `key`, `short`, `head`, `pre` (the prediction item, answered before the controls unlock), `post` (check-yourself items shown after the explanation), `task`, `goals`, and the explanation text.
- Here each step has `nine` and `de` text instead of Water Patch's `bio`/`chem`/`de`, and a `head` for each level where they differ.
- The level decides which text, labels and bank the step shows.
- `lv:"de"` marks a DE-only step; at 9th its dot is not drawn.
- Items with `adv:true` (A1, A2) show at 9th grade under an "Advanced Biology" badge. They are **optional**: they never block a step from lighting up.

**Changing view.** Switching One organelle / Side by side never resets progress. Module 3 needs Side by side: opening a Module 3 step switches the view and shows a one-line note. In Modules 1–2, Side by side shows both organelles, with the current module's organelle active and full-colour, and the other one running at 50% opacity.

**Goals must be detectable from the simulation state**, not from a timer alone. Each goal names the counter or event that satisfies it, so the test hook can drive it.

The explanation texts below are written to the 9th-grade vocabulary rule (§7). Use them as written. If a sentence has to change to fit the animation, keep the numbers and the vocabulary rule.

### Module 1 · Chloroplast

**C1 · Light hits the chloroplast** (both levels)

- **9th:** pre N1, post N2.
  - Task: *"Turn the light up and watch the beam hit the reaction center. Then turn it down and watch what slows."*
  - Goals: `beam` = 3 photon hits on a reaction center; `dim` = light taken below 20% and back above 60%.
- **DE:** pre D15, post D24.
  - Task: *"Turn the light up, then try red, blue and green light and watch the rate readout."*
  - Goals: `beam` = 3; `colours` = red, blue and green each tried for ≥2 s.
- **nine:** "Sunlight is the energy source for everything that follows. Chlorophyll, the green pigment packed into the chloroplast's stacked membrane sacs (thylakoids), absorbs the light. At the reaction center (the chlorophyll that gives up an electron when light hits it), the light's energy knocks an electron loose. An electron is a tiny negative particle, and this one now carries energy the chloroplast will store in sugar. Turn the light down and fewer electrons move. Turn it up and more do, until the chloroplast is working as fast as it can."
- **de:** "Pigment molecules in light-harvesting complexes absorb light and pass the energy from one to the next until it reaches a special pair of chlorophyll a molecules at the reaction center. There the energy is not passed on again. It lifts an electron to a higher energy level, and the primary electron acceptor captures it. That transfer, from P680 in photosystem II, is the first redox step: the reaction center is oxidized, and the acceptor is reduced. Chlorophylls absorb strongly in the blue and the red and reflect green, which is why green light drives photosynthesis poorly."

**C2 · Water fills the hole, and oxygen leaves** (both)

- **9th:** pre N3, post A1 (Advanced).
  - Task: *"Watch a water molecule split each time the reaction center loses an electron. Count the oxygen that leaves."*
  - Goal: `o2` = 2 O₂ released.
- **DE:** pre D16, post D17.
  - Same task. The water counter shows split / O₂ released, and must read 2 : 1.
  - Goal: `o2` = 2.
- **nine:** "The reaction center has lost an electron and must replace it. It takes one from water. Pulling water molecules apart gives up electrons, hydrogen ions (H⁺: hydrogen that has lost its electron) and oxygen. The oxygen atoms pair up as oxygen gas, O₂, and leave the chloroplast. It takes two water molecules to release one O₂. Every breath of oxygen you take was released this way, from water split inside a chloroplast."
- **de:** "P680⁺ is the strongest biological oxidizing agent known, strong enough to pull electrons from water. On the thylakoid-space side of photosystem II, a manganese-containing cluster splits 2 H₂O into 4 e⁻, 4 H⁺ and one O₂, and feeds the electrons one at a time into P680's hole. The H⁺ stays in the thylakoid space and adds to the gradient. The O₂ comes from water, not from CO₂: give a plant water labelled with heavy oxygen, and the label turns up in the O₂ it releases. Per glucose, the chloroplast splits 12 H₂O and releases 6 O₂."

**C3 · Hydrogen ions pile up and turn ATP synthase** (both)

- **9th:** pre N6, post N7.
  - Task: *"Watch hydrogen ions pile up inside the stacked sacs, then flow out through ATP synthase. Make four ATP."*
  - Goal: `atp` = 4 ATP made.
- **DE:** head "Linear electron flow and chemiosmosis"; pre D18, post D19.
  - Task: *"Follow one electron from water to NADPH, then open the Z scheme panel."*
  - Goals: `atp` = 4; `nadph` = 2; `zpanel` = energy panel opened once.
- **nine:** "As the electron is passed along the membrane, its energy is used to push hydrogen ions (H⁺) into the stacked membrane sacs, and splitting water adds more. The H⁺ piles up until the inside is acidic. The only way back out is through ATP synthase, a spinning protein that makes ATP. As the H⁺ flows through, it turns the protein the way running water turns a mill wheel, and each turn joins a phosphate to ADP to make ATP. ATP is the cell's rechargeable battery: giving up its last phosphate releases usable energy for work. At the end of the line, the electron is handed to a carrier molecule that takes it, with its energy, to the sugar-building cycle."
- **de:** "Linear electron flow runs PS II → Pq → cytochrome complex → Pc → PS I → Fd → NADP⁺ reductase. Light strikes PS I (P700) too, and re-energizes the electron so that it can reduce NADP⁺ to NADPH on the stroma side. The cytochrome complex uses the electrons' fall in energy to pump H⁺ into the thylakoid space. Water splitting adds H⁺ there, and making NADPH removes H⁺ from the stroma, so the thylakoid space falls to about pH 5 while the stroma sits near pH 8. That proton-motive force drives H⁺ back through ATP synthase into the stroma. This is photophosphorylation by chemiosmosis. ATP and NADPH are both released into the stroma, where the Calvin cycle uses them. Open the Z scheme panel to see each electron's energy along the way."

**C3x · Going further: cyclic flow** (`lv:"de"` only)

- Pre D20.
- Task: *"Switch cyclic flow on. Watch which counters stop and which keep going. Then switch back."*
- Goals: `cyc` = cyclic on for ≥3 s with ATP still rising; `lin` = switched back to linear.
- **de:** "Photosystem I can run on its own. Its excited electron goes from Fd back to the cytochrome complex, then through Pc to P700 again, instead of on to NADP⁺ reductase. The loop still pumps H⁺, so ATP synthase keeps turning. But no NADPH forms, no water is split and no O₂ leaves; photosystem II sits idle. Why bother? The Calvin cycle spends 3 ATP for every 2 NADPH, and linear flow alone makes a little less ATP than that, so cyclic flow tops up the ATP. Many courses teach linear flow first; this step goes further."

**C4 · The sugar-building cycle takes in CO₂** (both)

- **9th:** pre N4, post N5, N16, A2 (Advanced).
  - Task: *"Build two three-carbon pieces and watch them join into glucose. Then turn the CO₂ down and back up."*
  - Goals: `sugar` = 2 three-carbon pieces out; `co2low` = CO₂ taken below 20% and back above 60%.
- **DE:** head "The Calvin cycle"; pre D22, post D21, D23.
  - Task: *"Build one G3P and check the counter: CO₂ in, ATP and NADPH spent. Then turn the light off with CO₂ steady and watch the RuBP and 3-phosphoglycerate bars."*
  - Goals: `sugar` = 1 G3P out; `dark` = light at 0 for ≥3 s while CO₂ ≥50%.
  - Show two small **pool bars** at DE: RuBP and 3-phosphoglycerate.
- **nine:** "In the fluid around the stacked sacs, the Calvin cycle, the sugar-building cycle, runs on the ATP and energized carriers that light has made. Each turn attaches one carbon dioxide molecule, one carbon bead, to a five-carbon molecule, and spends ATP turning the result into three-carbon pieces. For every three CO₂ that come in, one three-carbon piece leaves the cycle; the rest are rebuilt so that the cycle can keep turning. Two three-carbon pieces join to make one glucose ring of six carbons, so building one glucose takes six CO₂. Glucose the plant doesn't use right away can be stored as starch. Turn down the CO₂, and the cycle slows. Turn it up, and the cycle speeds up, then levels off, because it is already working as fast as the light allows."
- **de:** "The Calvin cycle runs in three phases in the stroma.
  - *Fixation:* rubisco attaches CO₂ to RuBP (5C), and the unstable 6C product splits into two 3-phosphoglycerate.
  - *Reduction:* each 3-phosphoglycerate is phosphorylated by ATP and reduced by NADPH to G3P.
  - *Regeneration:* five of every six G3P are rearranged, using 3 more ATP, back into three RuBP.

  Net, for one G3P out: 3 CO₂, 9 ATP and 6 NADPH. The bead counter shows it: three beads in, one three-bead chain out. Two G3P make one glucose, so it takes 6 CO₂, 18 ATP and 12 NADPH per glucose. Rubisco does this in every plant, C3, C4 and CAM alike; C4 and CAM plants change only where and when CO₂ is delivered to it. Turn the light off with CO₂ steady and watch the pools: RuBP falls and 3-phosphoglycerate builds up, because fixation needs no light but the next steps do."

### Module 2 · Mitochondrion

**M1** (both levels)

- **9th:** head "The glucose ring breaks in the cytoplasm"; pre N8.
  - Task: *"Drop a glucose ring into the cytoplasm and watch it break. Count the beads in each piece."*
  - Goal: `split` = 1 glucose broken.
- **DE:** head "Glycolysis in the cytosol"; pre D1.
  - Same goal. The ATP tally shows −2 then +4 = net 2, and the NADH tally 2.
- **nine:** "Cellular respiration starts outside the mitochondrion. In the cytoplasm, a glucose ring of six carbons is broken into two three-carbon pieces. This releases a small amount of energy, enough for a little ATP, and it needs no oxygen. Count the beads: six carbons go in, and two pieces of three come out. No carbon dioxide leaves here."
- **de:** "Glycolysis takes place in the cytosol and needs no O₂. An energy-investment phase spends 2 ATP to phosphorylate glucose and split it into two three-carbon sugars. The payoff phase oxidizes them, reducing 2 NAD⁺ to 2 NADH, and makes 4 ATP by substrate-level phosphorylation. Net per glucose: 2 pyruvate, 2 ATP and 2 NADH, and no CO₂. Every carbon is still there, in the two pyruvates. Glycolysis runs the same with or without oxygen; what O₂ decides is what happens to the pyruvate and the NADH next."

**M2** (both)

- **9th:** head "A three-carbon piece goes in and loses a carbon"; pre N9.
  - Task: *"Follow one three-carbon piece into the mitochondrion and watch what leaves."*
  - Goal: `enter` = 1 piece trimmed, with 1 CO₂ out.
- **DE:** head "Pyruvate oxidation"; pre D2.
  - Same goal. The NADH tally rises by 1 per pyruvate.
- **nine:** "Follow one three-carbon piece as it crosses both of the mitochondrion's membranes to the inside of the mitochondrion. There it is trimmed: one carbon leaves as carbon dioxide, and a two-carbon piece is left to be broken down further. The electrons pulled off along the way are handed to carrier molecules, which take their energy to the inner membrane. This is the first carbon dioxide the mitochondrion gives off."
- **de:** "Pyruvate enters the matrix through a transport protein in the inner membrane. There the pyruvate dehydrogenase complex removes one carbon as CO₂, oxidizes the remaining two-carbon fragment while reducing NAD⁺ to NADH, and attaches the fragment to coenzyme A as acetyl CoA. That is 1 CO₂ and 1 NADH per pyruvate, and 2 CO₂ and 2 NADH per glucose. The acetyl group, two carbon beads, is what enters the citric acid cycle."

**M3** (both)

- **9th:** head "Count every carbon dioxide"; pre N10.
  - Task: *"Run one whole glucose through and watch the carbon dioxide counter."*
  - Goal: `six` = the counter reaches 6 CO₂ out for one glucose, with 0 carbons left inside.
- **DE:** head "The citric acid cycle"; pre D3, post D4.
  - Same goal. The tallies show NADH 10, FADH₂ 2 and ATP 4 (2 + 2) per glucose so far.
- **nine:** "Inside the mitochondrion, each two-carbon piece is taken apart completely in a cycle of reactions, and both of its carbons leave as carbon dioxide. Add it up for one glucose. Two carbons left when the two three-carbon pieces were trimmed, and four more leave here. Six carbons came in as one glucose, and six carbon dioxide molecules go out. No carbon is lost or created, only moved. That is why the mitochondrion is where your cells make most of the carbon dioxide you breathe out."
- **de:** "Acetyl CoA's two carbons join oxaloacetate (4C) to make citrate (6C). Over one turn of the citric acid cycle (also called the Krebs cycle), two carbons leave as CO₂ and oxaloacetate is regenerated. One turn yields 3 NADH, 1 FADH₂ and 1 ATP by substrate-level phosphorylation, so two turns per glucose give 4 CO₂, 6 NADH, 2 FADH₂ and 2 ATP. Strictly, the two carbons that leave in a turn are not the two that just entered, but the count per turn is exact. Add pyruvate oxidation and it comes to 6 CO₂ per glucose: all of glucose's carbon is gone, and only 4 ATP have been made. Where is the rest of the energy? Step 4 follows it."

**M4** (both)

- **9th:** head "Oxygen keeps the line running"; pre N11, post N12.
  - Task: *"Make four ATP. Then turn the oxygen off, watch what stops, and turn it back on."*
  - Goals: `atpM` = 4; `o2off` = O₂ off for ≥3 s, then on.
- **DE:** head "The electron transport chain and chemiosmosis"; pre D6, post D7, D8, D5, D13, D10.
  - Task: *"Follow one NADH's electrons down the chain to O₂. Watch the pH readouts and the ATP tally, and open the staircase panel."*
  - Goals: `atpM` = 4; `water` = 2 H₂O formed at complex IV; `stairs` = panel opened once.
- **nine:** "The carriers bring their electrons to the inner membrane. As the electrons pass along it, their energy pumps hydrogen ions (H⁺) out of the inside of the mitochondrion and into the narrow space between its two membranes. The H⁺ flows back through ATP synthase, the same kind of spinning protein as in the chloroplast. This is where the mitochondrion makes far more ATP than the cytoplasm did. At the end of the line the electrons need somewhere to go: they join oxygen and hydrogen ions to make water. Turn the oxygen off. The line stops, the H⁺ stops piling up, and carbon dioxide and ATP stop coming out. Without oxygen the cell falls back on fermentation, which gets far less usable energy from each glucose."
- **de:** "NADH hands its electrons to complex I, and FADH₂ hands its electrons to complex II. They pass through ubiquinone (Q), complex III, cytochrome c and complex IV, each carrier more electronegative than the last: a staircase of falling free energy (open the panel). Complexes I, III and IV use that fall to pump H⁺ from the matrix into the intermembrane space. At complex IV, ½ O₂ + 2 e⁻ + 2 H⁺ → H₂O, so per glucose 6 O₂ become 12 H₂O. The proton-motive force drives H⁺ back through ATP synthase into the matrix. This is oxidative phosphorylation, about 26 to 28 ATP, almost 90% of the total. Watch the pH: the matrix rises toward 7.8 as H⁺ leaves it. In all, up to about 32 ATP per glucose."

**M5 · No oxygen: fermentation** (`lv:"de"` only)

- Pre D9, post D11, D12.
- Task: *"Turn O₂ off. Run the lactate branch, then the alcohol branch, and compare the CO₂ and ATP counters."*
- Goals: `o2off` = O₂ off for ≥3 s; `lac` = 1 glucose through lactate; `alc` = 1 glucose through alcohol.
- **de:** "Turn O₂ off. Complex IV has nowhere to pass electrons, so the chain stalls, pumping stops, the H⁺ gradient runs down, and ATP synthase slows to a stop. NADH can no longer be oxidized, so NAD⁺ runs out, and glycolysis would stop too. Fermentation keeps glycolysis going by handing NADH's electrons to an organic molecule. In muscle, pyruvate is reduced to lactate, and no CO₂ is released. In yeast, pyruvate loses one CO₂ to become acetaldehyde, which is reduced to ethanol. Either way, the only ATP is glycolysis's 2 per glucose. Run both branches and watch the CO₂ counter."

**M6 · Going further: an uncoupler** (`lv:"de"` only; lowest priority, drop with D14 if needed)

- Pre D14.
- Task: *"Switch the uncoupler on. Watch the ATP rate, the O₂ use and the heat readout."*
- Goal: `unc` = uncoupler on for ≥3 s.
- **de:** "An uncoupler lets H⁺ leak back into the matrix without passing through ATP synthase. The chain keeps running, and O₂ use holds steady or even rises as the cell tries to restore the gradient, but ATP synthesis falls and the energy leaves as heat. Brown fat does this on purpose, with an uncoupling protein called thermogenin (UCP1), to keep newborns and hibernating mammals warm. It shows plainly that the gradient, not the electrons themselves, turns ATP synthase."

### Module 3 · Both together (Side by side view)

**B1** (both levels)

- **9th:** head "What travels between the two"; pre N13, post N14, N15.
  - Task: *"Press Run both. Follow one glucose from the chloroplast into the mitochondrion, and watch where the oxygen goes."*
  - Goals: `loop` = one glucose built on the left and broken down on the right; `o2trip` = 3 O₂ carried across.
- **DE:** head "Two processes, opposite redox"; pre D27, post D26.
  - Same goals.
- **nine:** "Run both. The chloroplast gives off oxygen and builds sugar. The mitochondrion takes in oxygen, breaks the sugar down, and gives off carbon dioxide and water, which the chloroplast takes back in. The products of one are the raw materials of the other, so the two can be thought of as a cycle. Energy does not cycle. It comes in as light, is stored in sugar and captured in ATP, and most of it ends as heat. Plant cells have both organelles and run both processes; animal cells have mitochondria only. This picture is not a map of one cell; it shows how the two organelles depend on each other."
- **de:** "Side by side, the two run electrons in opposite directions. Photosynthesis oxidizes water and reduces CO₂, using light to push electrons uphill into sugar. Respiration oxidizes glucose and reduces O₂, letting the electrons fall back downhill to water and capturing part of the fall as ATP. Matter cycles: 6 CO₂ and 6 O₂ go around the loop with every glucose, and 12 water molecules are split on one side and made on the other. Energy does not cycle. About a third of glucose's energy ends up in ATP, and the rest leaves as heat."

**B2 · The same machine, twice** (both)

- **9th:** no prediction.
  - Task: *"Watch both ATP synthases turn at once."*
  - Goal: `both` = ATP made on both sides, 3 each.
- **DE:** pre D25.
  - Task: *"Compare the two pH readouts and the two working patches."*
  - Goal: `both` = 3 each.
- **nine:** "Look at the two working patches together. In both, a flow of electrons pumps hydrogen ions to one side of a membrane, and the hydrogen ions flow back through ATP synthase, the same kind of spinning protein, to make ATP on the other side. The difference is where the electrons come from: in the chloroplast, from water energized by light; in the mitochondrion, from food."
- **de:** "This is chemiosmosis, drawn identically on both sides. In the chloroplast, H⁺ goes into the thylakoid space and ATP is made in the stroma. In the mitochondrion, H⁺ goes into the intermembrane space and ATP is made in the matrix. In a plant cell, ATP synthase sits in both the thylakoid membranes and the inner mitochondrial membranes: the same kind of enzyme doing the same job. What differs is the electron source: water energized by light on one side, and food, delivered by NADH and FADH₂, on the other."

**Readouts per step:**

- the **bead counter** at both levels: CO₂ in, CO₂ out, and carbons in transit, with sugar shown as beads;
- O₂ released / O₂ used;
- ATP, at 9th as a gauge with no yield number, at DE as a number;
- a **"Sugar-building speed"** gauge in the chloroplast at 9th (no number), which becomes the numeric rate readout at DE. N16 and T13 use it;
- at DE also: NADPH / NADH / FADH₂ tallies, the water counters, the pH readouts and the rate readout.

## 7. Words on screen

**9th grade.** A word may appear only if it is in these lists or is defined where it appears.

- **Met before Unit 3:**
  - hydrogen bond, covalent bond, polar molecule, macromolecule, monomer, polymer;
  - carbohydrate, lipid, protein, nucleic acid, nucleotide, amino acid;
  - enzyme, active site, substrate, catalyst, activation energy, reactant, product, metabolism, pH;
  - cell membrane, cytoplasm, organelles, chloroplast, mitochondria, nucleus, ribosomes, prokaryotes, eukaryotes;
  - diffusion, osmosis, passive transport, active transport, selectively permeable;
  - phospholipid bilayer, hydrophilic, hydrophobic, integral protein, homeostasis.
- **Taught in Unit 3:**
  - ATP, ADP, phosphate, energy, glucose;
  - autotroph, heterotroph, producer, chlorophyll, pigment;
  - photosynthesis, cellular respiration, aerobic, anaerobic, fermentation, lactic acid;
  - carbon dioxide, oxygen, carbon cycle, starch.
- **Advanced only, and only in A1–A2 and their notes:** thylakoid, stroma, light-dependent, light-independent.
- **Tool-native, defined on screen in every step that uses them.** Any step can be opened first, so a definition in C1 does not cover M2.
  - Each 9th-grade card opens with a **"Words in this step"** row of chips, one per tool-native word the step's text, labels or items use. Tapping a chip shows its definition.
  - The first use in each explanation also carries the definition inline, as the §6 texts already do for most of them.
  - The words:
    - electron: "a tiny negative particle";
    - hydrogen ion (H⁺): "hydrogen that has lost its electron; piling them up makes a space acidic";
    - ATP synthase: "a spinning protein that makes ATP";
    - Calvin cycle: "the sugar-building cycle";
    - reaction center: "the chlorophyll that gives up an electron when light hits it";
    - thylakoids: "stacked membrane sacs";
    - carrier: "a molecule that carries electrons and their energy".
- **Plain substitutes:** say "three-carbon piece", never pyruvate or G3P. Say "inside the mitochondrion", never matrix. Say "the space between its two membranes", never intermembrane space. Say "cytoplasm", never cytosol.

**9th-grade stage labels:** Light · Chlorophyll · Reaction center · Stacked membrane sacs (thylakoids) · Water · Oxygen (O₂) · Hydrogen ions (H⁺) · ATP synthase · ATP · ADP · Sugar-building (Calvin) cycle · Carbon dioxide (CO₂) · Three-carbon piece · Glucose · Cytoplasm · Outer membrane · Inner membrane · Inside the mitochondrion · Carrier · Electron.

**DE stage labels (the deck's words):** Light-harvesting complex · Photosystem II (P680) · Photosystem I (P700) · Primary electron acceptor · Pq · Cytochrome complex · Pc · Fd · NADP⁺ reductase · NADPH · Thylakoid membrane · Thylakoid space · Stroma · Rubisco · RuBP · 3-phosphoglycerate · G3P · ATP synthase · Cytosol · Outer membrane · Inner membrane · Cristae · Intermembrane space · Matrix · Pyruvate · Acetyl CoA · Citric acid cycle · Complex I · Complex II · Q · Complex III · Cytochrome c · Complex IV · NADH · FADH₂ · O₂ · H₂O · CO₂ · Lactate · Ethanol.

**Forbidden anywhere in the 9th-grade view** (acceptance test T6 checks this with a case-insensitive whole-word regex over every string the 9th view can show):

```js
const NINTH_FORBIDDEN = ["NADPH","NADH","NADP","NAD","FADH","FADH2","FADH₂","G3P","PGA","3-phosphoglycerate","phosphoglycerate","RuBP","rubisco",
 "acetyl","CoA","coenzyme","pyruvate","Krebs","citric acid","citrate","oxaloacetate","glycolysis","electron transport","complex I","complex II",
 "complex III","complex IV","P680","P700","photosystem","PS I","PS II","PSI","PSII","plastoquinone","plastocyanin","ferredoxin","Pq","Pc","Fd",
 "cytochrome","ubiquinone","lumen","intermembrane","cristae","matrix","cytosol","chemiosmosis","chemiosmotic","oxidative phosphorylation",
 "photophosphorylation","substrate-level","proton-motive","Z scheme","Z-scheme","cyclic flow","cyclic electron","lactate","ethanol",
 "redox","oxidize","oxidized","oxidizes","oxidation","uncoupler","thermogenin"];
// "thylakoid"/"thylakoids" is allowed only in a string that also contains "stacked membrane sac", or in A1/A2 and their notes.
// "stroma" is allowed only in A1/A2 and their notes.
```

**Every level:** no string may match `/\b3[68]\s*(ATP|–|-|to)/i` or `/\b36\s*[-–]\s*38\b/`. The DE ATP wording is "up to about 32", and fermentation is "2".

## 8. The 9th-grade bank (N1–N16, A1–A2)

Use this data exactly: the stems, the option order, the keys, and the `why`, `miss`, `va` and `study` texts. Render it the way Water Patch and Bio Tool #8 render items:

- the stem and the options;
- once an option is picked, the options lock and the right option turns green;
- a wrong pick turns red and shows its `miss` note, then the `why`;
- `va` and `study` go in small type under the `why`.

**`src` is for Reid and is never rendered.** Keys are spread A 4 · B 5 · C 5 · D 4.

```js
// 9th-grade bank. Permanent numbers: N1–N16, A1–A2. Never renumber; retire with retired:true.
// key = index (0–3) of the right option, options shown in this order. miss = note for each wrong option.
// step/role = where it appears (pre = prediction before the controls unlock; post = check yourself).
// adv:true = Advanced Biology only: shown with an "Advanced Biology" badge, optional, never blocks a step.
// va = shown under the answer, as Bio Tool #8 does. src = for Reid only; NOT rendered on the page.
const BANK9 = [
{n:"N1", step:"C1", role:"pre", topic:"The energy source for photosynthesis",
 stem:"What supplies the energy a chloroplast uses to build sugar?",
 opts:["Nutrients from the soil","Oxygen from the air","Sunlight","ATP made in the mitochondrion"], key:2,
 why:"Photosynthesis is powered by light. Chlorophyll in the chloroplast absorbs sunlight, and that energy is what the chloroplast stores in the bonds of sugar. Carbon dioxide and water supply the atoms, not the energy.",
 miss:{0:"Soil supplies water and a few minerals, not energy. Most of a plant's mass comes from carbon dioxide in the air, and its energy comes from light.",
       1:"Oxygen is a product of photosynthesis, released when water is split. It does not power the process.",
       3:"ATP from the mitochondrion powers other work in the cell. The chloroplast makes its own ATP using light, and spends it building sugar."},
 study:"Photosynthesis changes light energy into chemical energy stored in sugar.",
 src:"Canvas Photosynthesis Review (source of energy); packet p. 19"},

{n:"N2", step:"C1", role:"post", topic:"The pigment that absorbs light",
 stem:"Which pigment inside the chloroplast absorbs the light?",
 opts:["Starch","Protein","Glucose","Chlorophyll"], key:3,
 why:"Chlorophyll is the green pigment in the chloroplast. It absorbs red and blue light and reflects green, which is why leaves look green. The light it absorbs is what knocks electrons loose at the reaction center.",
 miss:{0:"Starch is how the plant stores the sugar it builds. It absorbs no light.",
       1:"Proteins hold the chlorophyll in place, but the pigment that absorbs the light is chlorophyll itself.",
       2:"Glucose is the sugar the chloroplast builds. It stores energy, but it absorbs no light."},
 study:"Chlorophyll in the chloroplast absorbs light energy.",
 src:"Canvas Module 3 Study Guide; SOL framework (chlorophyll)"},

{n:"N3", step:"C2", role:"pre", topic:"Splitting water releases oxygen",
 stem:"In the animation, a water molecule is pulled apart inside the chloroplast. Which gas leaves the chloroplast as a result?",
 opts:["Oxygen","Carbon dioxide","Nitrogen","Hydrogen"], key:0,
 why:"Water is pulled apart to replace the electrons that light knocks loose. Its hydrogen stays behind as hydrogen ions, and its oxygen atoms pair up as oxygen gas, which leaves the chloroplast. Two water molecules give one O₂.",
 miss:{1:"Carbon dioxide goes into the chloroplast, not out. It supplies the carbon for sugar.",
       2:"Nitrogen is not part of a water molecule, so splitting water cannot release it.",
       3:"The hydrogen stays in the chloroplast as hydrogen ions (H⁺), and they are what drive ATP synthase. Only the oxygen leaves as a gas."},
 study:"Photosynthesis splits water and releases oxygen gas.",
 src:"Canvas Photosynthesis Review; packet p. 20 Q6"},

{n:"N4", step:"C4", role:"pre", topic:"Where the carbon in sugar comes from",
 stem:"Which molecule entering the chloroplast supplies the carbon atoms that end up in sugar?",
 opts:["Water","Oxygen","Carbon dioxide","ATP"], key:2,
 why:"Every carbon atom in the sugar comes from carbon dioxide taken in from the air. The sugar-building (Calvin) cycle attaches one CO₂ at a time. Water supplies electrons and hydrogen, and ATP supplies energy; neither is built into the sugar's carbon chain.",
 miss:{0:"Water (H₂O) has no carbon in it. It supplies electrons and hydrogen.",
       1:"Oxygen gas (O₂) has no carbon, and the chloroplast releases it rather than taking it in.",
       3:"ATP is spent as energy for building sugar. It is not built into the sugar."},
 study:"The reactants of photosynthesis are carbon dioxide and water; the carbon in sugar comes from carbon dioxide.",
 src:"packet p. 19 (reactants); packet p. 20 Q4"},

{n:"N5", step:"C4", role:"post", topic:"Counting carbons into one glucose",
 stem:"Each bead is one carbon atom. How many carbon dioxide molecules must the chloroplast take in to build one glucose ring of 6 beads?",
 opts:["1","2","3","6"], key:3,
 why:"Each CO₂ brings in exactly one carbon bead, and a glucose ring holds six. So six CO₂ go in for every glucose built. In the animation, three CO₂ make one three-carbon piece, and two pieces join into one glucose.",
 miss:{0:"One CO₂ carries only one carbon. Count the beads in the glucose ring: six.",
       1:"Two CO₂ bring only two carbons, a third of a glucose ring.",
       2:"Three CO₂ make one three-carbon piece, which is half a glucose. It takes two pieces."},
 study:"6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂: matter is conserved.",
 src:"packet p. 19 equation; tool-native counting (matter-conservation LT)"},

{n:"N6", step:"C3", role:"pre", topic:"What ATP synthase makes",
 stem:"In both organelles, hydrogen ions pile up on one side of a membrane and then flow back through a spinning protein. What does that protein make?",
 opts:["ATP","Glucose","Oxygen","Water"], key:0,
 why:"ATP synthase is a spinning protein that makes ATP. Hydrogen ions piled up on one side of a membrane can flow back only through it, and as they flow they turn it, joining a phosphate to ADP. The chloroplast and the mitochondrion both use the same kind of machine.",
 miss:{1:"Glucose is built by the sugar-building cycle in the chloroplast, not by this protein.",
       2:"Oxygen comes from splitting water in the chloroplast. ATP synthase does not make it.",
       3:"Water is split in the chloroplast and made at the end of the line in the mitochondrion, not by ATP synthase."},
 study:"Chloroplasts and mitochondria both capture energy in ATP.",
 src:"Reid's design (goes past the SOL; kept because the 9th view shows ATP synthase)"},

{n:"N7", step:"C3", role:"post", topic:"ATP as a rechargeable battery",
 stem:"When ATP gives up its last phosphate and becomes ADP, what does the cell gain?",
 opts:["A new glucose molecule","Usable energy for work","Oxygen","Carbon dioxide"], key:1,
 why:"ATP is like a charged battery. Breaking off its last phosphate releases energy the cell can use right away, to contract a muscle, move molecules across a membrane or build a protein. The ADP and phosphate left over are recharged into ATP by ATP synthase.",
 miss:{0:"Glucose is built by the sugar-building cycle. Breaking ATP down releases energy; it does not build sugar.",
       2:"No oxygen is released when ATP gives up a phosphate. What comes off is a phosphate group.",
       3:"Carbon dioxide comes from breaking down sugar in the mitochondrion, not from ATP."},
 study:"ATP stores energy in its phosphate bonds; ATP → ADP + phosphate releases usable energy.",
 src:"packet p. 20 county LT 5.7 Prelude item 1 (modeled); Canvas Study Guide battery analogy"},

{n:"N8", step:"M1", role:"pre", topic:"Glucose breaks in the cytoplasm",
 stem:"Before anything enters the mitochondrion, a glucose ring of 6 carbons is broken apart in the cytoplasm. What does it break into?",
 opts:["Six carbon dioxide molecules","Two 3-carbon pieces","Three 2-carbon pieces","One 5-carbon piece and one carbon dioxide"], key:1,
 why:"A glucose ring of six carbons breaks into two pieces of three. Count the beads: 6 in, 3 + 3 out. No carbon leaves as carbon dioxide yet, and no oxygen is needed. A little ATP is made here.",
 miss:{0:"Glucose is not broken down all at once. It breaks in half first, and carbon dioxide leaves later, inside the mitochondrion.",
       2:"Three pieces of two would also add up to six, but the ring breaks in half: two pieces of three.",
       3:"No carbon dioxide leaves in the cytoplasm. The first carbon dioxide leaves inside the mitochondrion."},
 study:"Cellular respiration begins in the cytoplasm and is completed in the mitochondria.",
 src:"Canvas Study Guide (cytoplasm and mitochondria); tool-native counting"},

{n:"N9", step:"M2", role:"pre", topic:"Carbon dioxide leaves the mitochondrion",
 stem:"As the carbon pieces are broken down inside the mitochondrion, which gas leaves?",
 opts:["Oxygen","Glucose","Carbon dioxide","Chlorophyll"], key:2,
 why:"Inside the mitochondrion the carbon pieces are taken apart, and each carbon leaves as carbon dioxide. That is the carbon dioxide your blood carries to your lungs and you breathe out.",
 miss:{0:"Oxygen goes into the mitochondrion, not out. It is used at the end of the line.",
       1:"Glucose is what is being broken down, and it is not a gas.",
       3:"Chlorophyll is the pigment in chloroplasts. Mitochondria have none, and it is not a gas."},
 study:"Cellular respiration releases carbon dioxide and water.",
 src:"packet p. 19 cartoon; Canvas Study Guide"},

{n:"N10", step:"M3", role:"pre", topic:"Counting carbon dioxide out of one glucose",
 stem:"One glucose molecule is broken down completely. How many carbon dioxide molecules leave in all?",
 opts:["2","3","6","12"], key:2,
 why:"One glucose holds six carbons, and every one of them leaves as carbon dioxide: two when the three-carbon pieces are trimmed, and four more as the two-carbon pieces are taken apart. Six carbons in, six carbon dioxide out. Matter is conserved.",
 miss:{0:"Two is only the carbon dioxide from trimming the two three-carbon pieces. Four more leave after that.",
       1:"Three would leave half the carbon unaccounted for. Count the beads: six.",
       3:"Each carbon dioxide carries one carbon, and glucose has only six to give. Twelve would need carbon from nowhere."},
 study:"C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy: matter is conserved.",
 src:"tool-native; Canvas LT (matter conserved in photosynthesis and respiration)"},

{n:"N11", step:"M4", role:"pre", topic:"Oxygen and ATP output",
 stem:"Oxygen stops flowing into the mitochondrion. What happens to the ATP it makes?",
 opts:["It drops sharply","It increases","It does not change","The mitochondrion starts making glucose instead"], key:0,
 why:"Oxygen waits at the end of the line to take the used electrons. Without it the line backs up, hydrogen ions stop being pumped, and ATP synthase stops turning. The cell is left with the little ATP made in the cytoplasm, far less than before.",
 miss:{1:"Oxygen is what lets the mitochondrion make most of its ATP, so removing it cannot raise the output.",
       2:"Watch the ATP gauge when you switch the oxygen off: it drops, because the line stops.",
       3:"Mitochondria break sugar down; they never build it. Only chloroplasts build sugar."},
 study:"The presence of oxygen affects how much energy is available to an organism.",
 src:"SOL essential knowledge (oxygen and energy); same idea as Bio Tool #8 Q29, not reused"},

{n:"N12", step:"M4", role:"post", topic:"Energy without oxygen",
 stem:"Yeast cells sealed in a jar with no oxygen keep breaking down sugar. Compared with the same yeast given oxygen, how much energy do they get from each sugar molecule?",
 opts:["More usable energy, because they work faster","Exactly the same energy","Oxygen instead of energy","Far less usable energy"], key:3,
 why:"Without oxygen the yeast can break each sugar down only partway, by fermentation. The leftover pieces still hold most of the sugar's energy, so the yeast get far less usable energy from each sugar molecule than they would with oxygen. That is why fermenting cells use sugar up so quickly.",
 miss:{0:"Working faster is not the same as getting more. Fermentation is fast, but it leaves most of the energy in the leftovers.",
       1:"The sugar is the same, but how far it is broken down is not. Oxygen lets a cell finish the job.",
       2:"Fermentation makes no oxygen. The yeast get a little energy, plus leftover molecules: alcohol and carbon dioxide."},
 va:"Modeled on a 2026 Virginia released item about breaking down sugar without oxygen, answered correctly by about 46% of Virginia students.",
 study:"Anaerobic respiration (fermentation) releases far less energy per glucose than aerobic respiration.",
 src:"modeled on 2026 released item (46%); Canvas Study Guide aerobic vs anaerobic"},

{n:"N13", step:"B1", role:"pre", topic:"What travels between the two organelles",
 stem:"Which statement describes what travels between the two organelles?",
 opts:["The mitochondrion sends oxygen and sugar; the chloroplast sends back carbon dioxide and water",
       "Both send oxygen to each other",
       "Nothing travels; each makes everything it needs",
       "The chloroplast sends oxygen and sugar; the mitochondrion sends back carbon dioxide and water"], key:3,
 why:"The chloroplast releases oxygen and builds sugar. The mitochondrion uses both and gives back carbon dioxide and water, the chloroplast's raw materials. The products of one process are the reactants of the other.",
 miss:{0:"Reversed. The chloroplast is the one that releases oxygen and makes sugar.",
       1:"Only the chloroplast releases oxygen. The mitochondrion uses it up.",
       2:"Neither can run alone for long: each uses what the other makes."},
 va:"Modeled on a 2026 Virginia released item on the two equations as one relationship, answered correctly by about 72% of Virginia students.",
 study:"Photosynthesis and cellular respiration are linked: the products of one are the reactants of the other.",
 src:"modeled on 2026 released item (72%); packet p. 20 LT 5.7 item 2; Canvas Formula Click and Drag"},

{n:"N14", step:"B1", role:"post", topic:"Products of cellular respiration",
 stem:"Which list names the products of cellular respiration?",
 opts:["Glucose and oxygen","Carbon dioxide, water and usable energy (ATP)","Sunlight and chlorophyll","Carbon dioxide and water, with no energy released"], key:1,
 why:"Cellular respiration breaks glucose down with oxygen, so its products are carbon dioxide, water and usable energy captured in ATP. Glucose and oxygen are its reactants, the things it uses up.",
 miss:{0:"Glucose and oxygen are what respiration uses up: its reactants. They are the products of photosynthesis.",
       2:"Sunlight and chlorophyll belong to photosynthesis in the chloroplast.",
       3:"Releasing energy is the whole point of respiration. Some is captured in ATP, and most of the rest leaves as heat."},
 va:"Modeled on a 2026 Virginia released item on reactants and products, answered correctly by about 58% of Virginia students.",
 study:"Cellular respiration: glucose + oxygen → carbon dioxide + water + energy (ATP).",
 src:"modeled on 2026 released TEI (58%); Canvas Warm Up 10/29"},

{n:"N15", step:"B1", role:"post", topic:"Plant cells have both organelles",
 stem:"A student says plant cells have chloroplasts instead of mitochondria. Which reply is correct?",
 opts:["Right: plants make their own sugar, so they do not need mitochondria",
       "Plant cells have both, and they break down the sugar they make in their mitochondria",
       "Plant cells have neither; they get their energy straight from sunlight","Only animal cells have chloroplasts; plant cells have mitochondria only"], key:1,
 why:"Plant cells have both. The chloroplast builds sugar in the light, and the plant's mitochondria break that sugar down for ATP, day and night, just as an animal's do. Photosynthesis makes the food; respiration releases its energy.",
 miss:{0:"Making sugar is not the same as using it. A plant still needs ATP, and its mitochondria make it from the sugar.",
       2:"Plant cells are eukaryotic and have both organelles. Light energy has to be stored in sugar and then released as ATP before a cell can use it.",
       3:"Backwards. Chloroplasts are found in plants and algae; animal cells have mitochondria only."},
 study:"Both plant and animal cells carry out cellular respiration; only producers carry out photosynthesis.",
 src:"packet p. 9 chart; Canvas Study Guide"},

{n:"N16", step:"C4", role:"post", topic:"Carbon dioxide and the rate of photosynthesis",
 stem:"As the carbon dioxide around a plant increases, what happens to the rate of photosynthesis?",
 opts:["It rises, then levels off","It keeps rising forever","It falls","It does not change"], key:0,
 why:"More CO₂ gives the sugar-building cycle more carbon to attach, so the rate rises. Then it levels off, because something else runs short: the light, the ATP and carriers the light supplies, or the enzyme itself. Try it: turn the CO₂ slider up in steps and watch the rate readout.",
 miss:{1:"Every process has a top speed. Once another factor runs short, more CO₂ does not help.",
       2:"Carbon dioxide is a raw material, so more of it cannot slow the cycle.",
       3:"Turn the CO₂ slider and watch: the rate changes, at least until it levels off."},
 study:"Reading rate graphs: the rate of photosynthesis rises with light or CO₂, then levels off.",
 src:"Canvas Study Guide LT 3.2; LT 3.3 Photosynthesis Practice graphs (needs the CO₂ slider)"},

{n:"A1", adv:true, step:"C2", role:"post", topic:"Where light is captured (Advanced)",
 stem:"In which part of the chloroplast is light captured and water split?",
 opts:["Stroma","Thylakoid","Cytoplasm","Cell wall"], key:1,
 why:"Light is captured and water is split in the thylakoids, the stacked membrane sacs where the chlorophyll and ATP synthase sit. These are the light-dependent reactions.",
 miss:{0:"The stroma is the fluid around the thylakoids, where carbon dioxide is fixed. No light is captured there.",
       2:"The cytoplasm lies outside the chloroplast.",
       3:"The cell wall supports the plant cell. It does not capture light."},
 study:"Light-dependent reactions: thylakoid. Light-independent reactions (Calvin cycle): stroma.",
 src:"Canvas Study Guide key table; Canvas Photosynthesis Review"},

{n:"A2", adv:true, step:"C4", role:"post", topic:"Where carbon dioxide is fixed (Advanced)",
 stem:"Where does carbon dioxide join the sugar-building (Calvin) cycle?",
 opts:["Thylakoid","Nucleus","Stroma","The mitochondrion's inner membrane"], key:2,
 why:"Carbon dioxide joins the sugar-building (Calvin) cycle in the stroma, the fluid around the thylakoids. These are the light-independent reactions: they need no light directly, but they run on the ATP and carriers that the light-dependent reactions make.",
 miss:{0:"The thylakoids capture light and split water. The sugar is built in the fluid around them.",
       1:"The nucleus holds DNA. It takes no part in photosynthesis.",
       3:"The mitochondrion releases carbon dioxide. It does not take it in."},
 study:"Light-dependent reactions: thylakoid. Light-independent reactions (Calvin cycle): stroma.",
 src:"Canvas Study Guide key table; Canvas Photosynthesis Review"}
];
```

## 9. The DE bank (D1–D27)

Same rules as §8, with one addition: after a wrong first answer, show the `sam` prompt for that option under the `miss` note. Title it "Build a SAM from this miss", and link it to `../../teaching/student-authored-modules.html` the way Bio Tool #9 does. Keys are spread A 7 · B 6 · C 7 · D 7. The distractors were lengthened in Leg 3 so that the key is not reliably the longest option. D18 is the exception: its options are chains, so the full chain is naturally the longest. Keep option lengths comparable if you edit anything. Items with `ctl` depend on that control existing. If a control is dropped (only the uncoupler may be), drop its item and step too, and report it.

**Coverage, for the report:** the bank touches all six content clusters of the NOVA Checkpoint for Ch. 7, and all of Ch. 8 except C3/C4/CAM and photorespiration, autotrophs, and starch storage. Those stay with Bio Tool #9.

```js
// DE bank. Permanent numbers: D1–D27. Never renumber; retire with retired:true.
// Same shape as BANK9, plus sam = one Student-Authored Module prompt per wrong option (Bio Tool #9's form),
// shown under the miss note after a wrong first answer. unit = DE Bio 101 unit (7 respiration, 8 photosynthesis).
// ctl = the item needs that control to exist on screen. src = for Reid only; NOT rendered.
// All wording is original. Nothing here reproduces Checkpoint, clicker, review-question or deck text.
const BANKDE = [
// ── Mitochondrion ──
{n:"D1", unit:7, step:"M1", role:"pre", topic:"Where glycolysis runs, and whether it needs O₂",
 stem:"A six-carbon glucose ring breaks into two three-carbon pyruvates before anything enters the mitochondrion. Where does that happen, and does it need oxygen?",
 opts:["In the matrix; it needs O₂","On the inner membrane; it needs O₂","In the cytosol; it runs with or without O₂","In the intermembrane space; it stops without O₂"], key:2,
 why:"Glycolysis runs in the cytosol, outside the mitochondrion, and uses no O₂ at all: its oxidizing agent is NAD⁺. That is why it runs the same with or without oxygen, and why it is thought to be the oldest energy pathway, older than an oxygen atmosphere.",
 miss:{0:"The matrix hosts pyruvate oxidation and the citric acid cycle. Glucose never enters the mitochondrion; pyruvate does.",
       1:"The inner membrane holds the electron transport chain. Glycolysis's enzymes are dissolved in the cytosol.",
       3:"Nothing breaks glucose in the intermembrane space. And glycolysis does not stop just because O₂ is gone; without O₂, what stops it is a shortage of NAD⁺."},
 sam:{0:"Write a SAM question that asks where each stage of respiration happens. Answer it with a sketch of a cell and one mitochondrion, labelling cytosol, matrix and inner membrane with the stage that runs in each.",
      1:"Write a SAM question that separates enzymes dissolved in a compartment from complexes built into a membrane. Name which stages use each, and why the chain has to sit in a membrane.",
      3:"Write a SAM question: 'What actually stops glycolysis when O₂ runs out?' Answer it by tracing NAD⁺ and NADH through glycolysis, with and without fermentation."},
 src:"CP7 5, 25, 26 · Deck Ch. 7 slides 29, 39–40"},

{n:"D2", unit:7, step:"M2", role:"pre", topic:"Pyruvate oxidation",
 stem:"One pyruvate (three beads) crosses into the matrix. Before its carbons join the citric acid cycle, what happens?",
 opts:["One carbon leaves as CO₂, NAD⁺ is reduced to NADH, and a two-carbon acetyl group enters on coenzyme A",
       "All three carbons leave as CO₂ at once, and the energy released makes ATP directly in the matrix",
       "Pyruvate joins oxaloacetate whole, and no CO₂ leaves until the electron transport chain has run",
       "Pyruvate is reduced to lactate by NADH, so that NAD⁺ is regenerated for the next round"], key:0,
 why:"The pyruvate dehydrogenase complex does three things to each pyruvate. It removes one carbon as CO₂, oxidizes the two-carbon remainder while reducing NAD⁺ to NADH, and attaches that remainder to coenzyme A. Acetyl CoA, not pyruvate, is what feeds the citric acid cycle.",
 miss:{1:"Only one of pyruvate's three carbons leaves here; the other two leave in the citric acid cycle. No ATP is made in this step.",
       2:"Acetyl CoA, not pyruvate, joins oxaloacetate, and one CO₂ has already left before it does. The electron transport chain releases no CO₂ at all.",
       3:"Pyruvate becomes lactate only in fermentation, in the cytosol, when O₂ is absent. In the matrix it is oxidized."},
 sam:{1:"Write a SAM question that asks where each of pyruvate's three carbons ends up. Answer it with a bead drawing: one to CO₂ in pyruvate oxidation, two into acetyl CoA.",
      2:"Write a SAM question on why the electron transport chain releases no CO₂. Answer it by listing what enters and what leaves the chain.",
      3:"Write a SAM question that compares pyruvate's fate with and without O₂: location, products and ATP for each."},
 src:"CP7 13, 14 · Deck slide 55"},

{n:"D3", unit:7, step:"M3", role:"pre", topic:"Where the six CO₂ come from",
 stem:"One glucose is broken down completely with O₂ present. How are its six CO₂ split between the two steps in the matrix?",
 opts:["All 6 from the citric acid cycle, none before it","3 from pyruvate oxidation, 3 from the citric acid cycle","2 from pyruvate oxidation, 4 from the citric acid cycle","2 from glycolysis, 4 from the citric acid cycle"], key:2,
 why:"Pyruvate oxidation removes one carbon from each of the two pyruvates, giving 2 CO₂, and the two turns of the citric acid cycle release the other four, 2 per turn. Glycolysis releases none.",
 miss:{0:"Two carbons leave before the cycle, one from each pyruvate as it becomes acetyl CoA.",
       1:"Each pyruvate loses only one carbon in pyruvate oxidation, so that step gives 2, not 3.",
       3:"Glycolysis releases no CO₂. All six carbons are still in the two pyruvates when it ends."},
 sam:{0:"Write a SAM question that counts CO₂ stage by stage for one glucose. Answer it with a table: stage, CO₂ out, running total.",
      1:"Write a SAM question on what happens to one pyruvate in the matrix, counting carbons in and carbons out.",
      3:"Write a SAM question that asks what glycolysis releases and what it does not. Answer it with its net inputs and outputs per glucose."},
 src:"CP7 14, 15, 37 · Deck slides 55–61 · §4 carbon accounting"},

{n:"D4", unit:7, step:"M3", role:"post", topic:"Where the energy is after the citric acid cycle",
 stem:"Once glucose has been fully broken down to CO₂ in glycolysis and the matrix, only 4 ATP have been made per glucose. Where is most of glucose's energy now?",
 opts:["In the CO₂ that left","In the oxaloacetate that restarts the cycle","As heat in the matrix","In the electrons carried by NADH and FADH₂"], key:3,
 why:"By the end of the citric acid cycle all six carbons have left as CO₂, but only 4 ATP have been made. Most of glucose's energy went, with its electrons, to NAD⁺ and FAD: 10 NADH and 2 FADH₂ per glucose. The electron transport chain and ATP synthase turn that into most of the ATP.",
 miss:{0:"CO₂ is fully oxidized carbon, a low-energy end product. Almost no usable energy leaves with it.",
       1:"Oxaloacetate is regenerated each turn and leaves the cycle unchanged. It is not an energy store.",
       2:"Some energy is lost as heat at every step, but at this point most of it is still held in NADH and FADH₂."},
 sam:{0:"Write a SAM question: 'Why does CO₂ carry so little energy?' Answer it by comparing the C–H bonds in glucose with the C=O bonds in CO₂.",
      1:"Write a SAM question on what the citric acid cycle regenerates each turn, and why that makes it a cycle.",
      2:"Write a SAM question that tallies ATP, NADH and FADH₂ after each stage and shows where the energy sits."},
 src:"CP7 6, 18 · Deck slide 74"},

{n:"D5", unit:7, step:"M4", role:"post", topic:"The overall redox change in respiration",
 stem:"Follow the electrons from glucose to the end of the chain. Which describes the overall redox change?",
 opts:["Glucose is reduced and O₂ is oxidized","Glucose is oxidized, and O₂ is reduced to water","CO₂ is reduced and water is oxidized","No electrons change hands; only phosphate groups move"], key:1,
 why:"Respiration is a redox process. Glucose loses electrons, together with hydrogen, and is oxidized to CO₂; O₂ gains them and is reduced to water. Moving electrons toward oxygen, which pulls on them harder, releases the energy the cell captures.",
 miss:{0:"Reversed. Glucose loses electrons, so it is oxidized; O₂ gains them, so it is reduced.",
       2:"That is photosynthesis, where water is oxidized and CO₂ is reduced.",
       3:"Phosphate transfers make ATP, but the energy for them comes from electrons changing hands."},
 sam:{0:"Write a SAM question: 'How can I tell which molecule is oxidized?' Answer it with OIL RIG and the glucose-to-CO₂ example.",
      2:"Write a SAM question that sets the redox of photosynthesis and respiration side by side: what is oxidized and what is reduced in each.",
      3:"Write a SAM question on how electron transfer and ATP synthesis are linked, from NADH to ATP synthase."},
 src:"CP7 1, 2, 3, 7, 20 · Deck slides 11–20"},

{n:"D6", unit:7, step:"M4", role:"pre", topic:"Where H⁺ piles up in the mitochondrion",
 stem:"As electrons pass down the chain, H⁺ piles up on one side of a membrane. Where?",
 opts:["In the intermembrane space, pumped out of the matrix across the inner membrane","In the matrix, pumped in from the intermembrane space across the inner membrane","In the cytosol, pumped out across both mitochondrial membranes","Evenly on both sides of the inner membrane, so neither side changes"], key:0,
 why:"Complexes I, III and IV pump H⁺ out of the matrix, across the inner membrane, into the intermembrane space. The intermembrane space becomes more acidic and more positive than the matrix, and that difference is the proton-motive force.",
 miss:{1:"Reversed. The pumps move H⁺ out of the matrix, so its pH rises; the H⁺ piles up on the other side of the inner membrane.",
       2:"Small ions pass the outer membrane fairly freely, but the pumps sit in the inner membrane and face the intermembrane space. The gradient that matters is across the inner membrane.",
       3:"An even spread stores no energy. The chain's job is to make the two sides unequal."},
 sam:{1:"Write a SAM question that asks which side of the inner membrane gains H⁺. Answer it with a labelled sketch of a crista, with arrows for the pumps.",
      2:"Write a SAM question on why the gradient has to be across the inner membrane, not the outer one.",
      3:"Write a SAM question: 'Where is the energy stored in a gradient?' Answer it with the water-behind-a-dam comparison and the pH numbers on each side."},
 src:"CP7 16, 21, 23 · Deck slides 75, 82, 92–95"},

{n:"D7", unit:7, step:"M4", role:"post", topic:"What turns ATP synthase",
 stem:"What turns ATP synthase?",
 opts:["H⁺ flowing down its gradient from the intermembrane space back into the matrix","Electrons passing through it on the way to O₂ at the end of the chain","ATP breaking down inside the matrix and releasing energy to turn it","H⁺ being pumped against its gradient into the intermembrane space"], key:0,
 why:"ATP synthase is turned by H⁺ flowing down its concentration and charge gradient, from the intermembrane space back into the matrix. The flow spins its rotor, and the changes of shape in its head join ADP and phosphate. No electrons pass through it.",
 miss:{1:"Electrons stop at O₂, at complex IV. They never pass through ATP synthase, which runs on H⁺.",
       2:"ATP synthase makes ATP. Breaking ATP down would run it backwards, as an H⁺ pump.",
       3:"Pumping H⁺ against the gradient is what the chain complexes do. ATP synthase uses the flow back down."},
 sam:{1:"Write a SAM question that separates the electron path from the H⁺ path in the inner membrane. Answer it with two coloured arrows on one sketch.",
      2:"Write a SAM question: 'Can ATP synthase run backwards?' Answer it from what happens when the gradient is gone and ATP is plentiful.",
      3:"Write a SAM question that contrasts the chain complexes with ATP synthase: which moves H⁺ uphill, and which lets it flow downhill."},
 src:"CP7 17, 22, 24, 31 · Deck slides 83–89"},

{n:"D8", unit:7, step:"M4", role:"post", topic:"Matrix pH while the chain runs",
 stem:"While the chain runs, what happens to the pH of the matrix?",
 opts:["It rises, because H⁺ is being moved out of the matrix","It falls, because H⁺ piles up in the matrix","It stays at 7, because the membrane keeps it steady","It falls, because ATP is an acid"], key:0,
 why:"pH measures H⁺ concentration. As the chain pumps H⁺ out of the matrix, the H⁺ concentration there falls and the pH rises, toward about 7.8, while the intermembrane space falls toward about 7.0. Watch both readouts.",
 miss:{1:"H⁺ piles up in the intermembrane space, not the matrix, so the matrix becomes less acidic.",
       2:"The membrane is what lets the difference build. A steady matrix pH would mean there was no gradient.",
       3:"ATP does not set the pH here. H⁺ pumping does."},
 sam:{1:"Write a SAM question that asks how the pH changes on each side of the inner membrane while the chain runs. Answer it with a before-and-after table.",
      2:"Write a SAM question on what a membrane does to make a gradient possible, using the phospholipid bilayer's barrier to ions.",
      3:"Write a SAM question: 'What sets the pH of a compartment?' Answer it with H⁺ concentration and one example from the matrix."},
 src:"CP7 36 · Deck slide 82 · §4 same layout"},

{n:"D9", unit:7, step:"M5", role:"pre", topic:"What stops first without O₂",
 stem:"Turn O₂ off. What stops first, and why does the whole line back up?",
 opts:["Glycolysis stops first, because it needs O₂ to split glucose, and the chain then runs out of NADH","ATP synthase stops first, because O₂ is what turns it, and the complexes then stop pumping",
       "Complex IV has nowhere to pass electrons, so the chain stalls, H⁺ pumping stops, and NADH can't be turned back into NAD⁺",
       "Nothing stops, because the chain passes its electrons to CO₂ instead and keeps pumping H⁺"], key:2,
 why:"O₂ is the final electron acceptor at complex IV. Without it, complex IV keeps its electrons, the carriers upstream stay loaded, the chain stops, and H⁺ pumping stops. NADH can no longer hand off its electrons, so no NAD⁺ comes back, and glycolysis would stall too unless fermentation regenerates NAD⁺.",
 miss:{0:"Glycolysis uses no O₂. It stops only if NAD⁺ runs out, and fermentation prevents that.",
       1:"O₂ does not turn ATP synthase; the H⁺ gradient does. ATP synthase slows only after the gradient runs down.",
       3:"Nothing in the chain can hand its electrons to CO₂. Without O₂ the chain simply stops."},
 sam:{0:"Write a SAM question: 'Which stages need O₂ directly, and which only indirectly?' Answer it stage by stage.",
      1:"Write a SAM question that puts in order what stops when O₂ is removed, from complex IV back to glycolysis.",
      3:"Write a SAM question on why O₂ makes such a good final electron acceptor, using electronegativity."},
 src:"CP7 19, 34 · Deck slides 77, 104–105"},

{n:"D10", unit:7, step:"M4", role:"post", topic:"What becomes of the O₂",
 stem:"What happens to the O₂ that flows into the mitochondrion?",
 opts:["It is built into the CO₂ that leaves the matrix during the citric acid cycle","It is attached to glucose in glycolysis before the ring is split","It is pumped into the intermembrane space along with the H⁺","It accepts electrons at the end of the chain and, with H⁺, becomes water"], key:3,
 why:"At complex IV each O₂ takes 4 electrons and 4 H⁺ and becomes 2 H₂O; per glucose, 6 O₂ become 12 H₂O. The oxygen atoms in the CO₂ you breathe out come from glucose and water, not from the O₂ you breathe in.",
 miss:{0:"The oxygen in CO₂ comes from glucose and water, added in the matrix. The O₂ ends up in water.",
       1:"Glycolysis uses no O₂.",
       2:"O₂ is not pumped. It diffuses in and is reduced at complex IV."},
 sam:{0:"Write a SAM question: 'Where does the oxygen we breathe in end up?' Answer it with the complex IV reaction and a heavy-oxygen labelling experiment.",
      1:"Write a SAM question that lists each stage's O₂ use. Only one stage uses it.",
      2:"Write a SAM question that contrasts what is pumped across the inner membrane (H⁺) with what diffuses across it (O₂, CO₂)."},
 src:"CP7 19, 34 · Deck slide 77 · sets up the water loop"},

{n:"D11", unit:7, step:"M5", role:"post", topic:"Fermentation regenerates NAD⁺",
 stem:"With O₂ still off, glycolysis keeps running in a muscle cell. What keeps it going?",
 opts:["The citric acid cycle, which keeps running without O₂ and returns NAD⁺ to glycolysis","Fermentation, which hands NADH's electrons to pyruvate (making lactate) so NAD⁺ is free for glycolysis again","Extra ATP from the electron transport chain, which switches to a backup electron acceptor in muscle","Oxygen stored in the cytosol, released by myoglobin whenever the supply from the blood stops"], key:1,
 why:"Fermentation regenerates NAD⁺. In muscle, NADH's electrons are passed to pyruvate, which becomes lactate, and the freed NAD⁺ goes back to glycolysis's oxidation step. Glycolysis keeps making its 2 ATP per glucose; nothing else does.",
 miss:{0:"The citric acid cycle uses NAD⁺ rather than returning it, and it stops too once NAD⁺ runs out.",
       2:"Muscle has no backup acceptor for the chain. Without O₂ it is stalled and makes no ATP.",
       3:"Cells store almost no free O₂. Muscle's myoglobin holds a little, and it runs out within moments of hard work."},
 sam:{0:"Write a SAM question: 'Why does the citric acid cycle stop without O₂ even though it uses none?' Answer it with NAD⁺.",
      2:"Write a SAM question that compares where the ATP comes from in aerobic respiration and in fermentation.",
      3:"Write a SAM question on what fermentation really produces (NAD⁺), and why lactate is only where the electrons are left."},
 src:"CP7 27, 29, 32, 35 · Deck slides 104–114"},

{n:"D12", unit:7, step:"M5", role:"post", ctl:"ATP tally", topic:"ATP with and without O₂",
 stem:"Compare one glucose broken down with O₂ and one fermented without it. About how much ATP does each give?",
 opts:["About 4 with O₂; 2 without","About 2 with O₂; about 32 without","The same amount; O₂ only speeds things up","Up to about 32 with O₂; 2 without"], key:3,
 why:"With O₂, glycolysis, the citric acid cycle and oxidative phosphorylation together give up to about 32 ATP per glucose. Without O₂, fermentation leaves only glycolysis's net 2 ATP, and most of the energy stays in the lactate or ethanol.",
 miss:{0:"4 is only the substrate-level ATP from glycolysis and the citric acid cycle. Oxidative phosphorylation adds far more.",
       1:"Reversed. Fermentation gives 2.",
       2:"O₂ does not just speed things up. It is what lets the chain and ATP synthase run at all."},
 sam:{0:"Write a SAM question that builds the ATP total stage by stage and shows where 'up to about 32' comes from.",
      1:"Write a SAM question on why fermenting cells burn through glucose so fast.",
      2:"Write a SAM question: 'Why does oxygen raise the ATP yield about sixteenfold?'"},
 src:"Deck slides 38, 96, 117 · CP7 11, 27"},

{n:"D13", unit:7, step:"M4", role:"post", topic:"Where most of the ATP comes from",
 stem:"Of the ATP made per glucose with O₂, where does most of it come from?",
 opts:["Oxidative phosphorylation: ATP synthase driven by the H⁺ gradient (almost 90%)","Substrate-level phosphorylation in glycolysis, which runs fastest and needs no O₂","Substrate-level phosphorylation in the citric acid cycle, two turns per glucose","The electron transport complexes themselves, which add phosphate to ADP as electrons pass"], key:0,
 why:"Substrate-level phosphorylation makes 4 ATP per glucose, 2 in glycolysis and 2 in the citric acid cycle. ATP synthase, driven by the H⁺ gradient, makes about 26 to 28: almost 90% of the total of up to about 32.",
 miss:{1:"Glycolysis gives only 2 net ATP by substrate-level phosphorylation.",
       2:"The citric acid cycle makes only 2 ATP per glucose directly. Its big contribution is NADH and FADH₂.",
       3:"The complexes pump H⁺. They make no ATP themselves."},
 sam:{1:"Write a SAM question that defines substrate-level and oxidative phosphorylation, with one example of each.",
      2:"Write a SAM question: 'What does the citric acid cycle really make?' Answer it with its outputs per turn.",
      3:"Write a SAM question that separates what the chain complexes do from what ATP synthase does."},
 src:"CP7 9, 17 · Deck slides 35–36, 74, 77 · Canvas gap analysis"},

{n:"D14", unit:7, step:"M6", role:"pre", ctl:"uncoupler", topic:"An uncoupler (going further)",
 stem:"A drug lets H⁺ leak back across the inner membrane without passing through ATP synthase; brown fat does this on purpose. What happens?",
 opts:["ATP synthesis rises, because H⁺ crosses the membrane faster, and O₂ use falls","ATP synthesis falls, O₂ use continues or rises, and the energy leaves as heat","ATP synthesis and O₂ use both stop, because the chain needs a gradient to run","Nothing changes, because the chain still pumps H⁺ at the same rate"], key:1,
 why:"An uncoupler lets H⁺ back into the matrix without passing through ATP synthase. The chain still runs, so O₂ is still used, often faster, because the gradient never builds up enough to slow the pumps. ATP synthesis falls, and the gradient's energy is released as heat. Brown fat's thermogenin works this way.",
 miss:{0:"ATP synthesis depends on H⁺ passing through ATP synthase. A leak robs it, so ATP falls.",
       2:"The chain does not need ATP synthase in order to run; it needs NADH and O₂. So O₂ use continues.",
       3:"The chain still pumps, but the H⁺ leaks straight back, so the gradient never drives ATP synthase."},
 sam:{0:"Write a SAM question on how to tell, from O₂ use and ATP output, whether a drug blocks the chain or uncouples it.",
      2:"Write a SAM question: 'What keeps the chain running when ATP synthase is bypassed?' Answer it with the chain's inputs.",
      3:"Write a SAM question on why brown fat makes heat, with the H⁺ path drawn."},
 src:"Deck slides 84, 97 · clicker deck coverage only · CP7 24 · drop with M6 if the build runs long"},

// ── Chloroplast ──
{n:"D15", unit:8, step:"C1", role:"pre", topic:"What antenna pigments do",
 stem:"The light beam hits pigments that are not the reaction center. What do they do?",
 opts:["Split water to replace the electrons they lose to the light","Make ATP directly, using the light energy they absorb","Pass the absorbed energy along until it reaches the reaction-center chlorophyll","Fix CO₂ onto the five-carbon sugar in the stroma"], key:2,
 why:"The pigments of a light-harvesting complex do not give up electrons. They pass the absorbed energy from molecule to molecule until it reaches the reaction-center chlorophyll pair, where an electron is finally boosted to the primary acceptor.",
 miss:{0:"Water is split at photosystem II, pulled apart to fill the reaction center's electron hole, not by the antenna pigments.",
       1:"ATP is made by ATP synthase in the thylakoid membrane, not by pigments.",
       3:"CO₂ is fixed by rubisco in the stroma, using ATP and NADPH. Pigments never touch CO₂."},
 sam:{0:"Write a SAM question that lists what the antenna pigments do and what the reaction center does.",
      1:"Write a SAM question that traces energy from a photon to ATP, naming every stage.",
      3:"Write a SAM question that separates the light reactions from the Calvin cycle by location and product."},
 src:"CP8 6, 7, 42 · Deck slides 60–64"},

{n:"D16", unit:8, step:"C2", role:"pre", topic:"What refills P680",
 stem:"The reaction center of photosystem II (P680) bounces an excited electron to its primary acceptor. What fills the hole it leaves?",
 opts:["An electron from NADPH, sent back from the end of the chain","An electron stripped from water, which splits into H⁺ and O₂","An electron from photosystem I, passed back along the chain","An electron from CO₂, taken in from the air"], key:1,
 why:"When P680 gives its excited electron to the primary acceptor it becomes P680⁺, a strong oxidizing agent. It takes an electron from water. Every 2 H₂O split gives 4 e⁻, 4 H⁺ and one O₂.",
 miss:{0:"NADPH is made at the far end of the chain, after PS I. Its electrons do not flow back to PS II.",
       2:"Electrons go from PS II to PS I through the chain, not the other way round.",
       3:"CO₂ accepts electrons in the Calvin cycle: it is reduced. It does not give them up."},
 sam:{0:"Write a SAM question on the direction of electron flow from water to NADPH. Answer it with a line drawing.",
      2:"Write a SAM question that asks which photosystem comes first in linear flow, and why their numbers do not match their order.",
      3:"Write a SAM question: 'Which molecule is oxidized and which is reduced in photosynthesis?'"},
 src:"CP8 8, 11 · Deck slides 65, 68"},

{n:"D17", unit:8, step:"C2", role:"post", topic:"Where the released O₂ comes from",
 stem:"Scientists gave a plant water made with a heavy form of oxygen. Where did the heavy oxygen turn up?",
 opts:["In the O₂ the plant released","In the sugar the plant made","In the CO₂ the plant took in","Split evenly between the sugar and the O₂"], key:0,
 why:"The O₂ a plant releases comes from water. Label the oxygen in water and the label appears in the O₂. Label the oxygen in CO₂ instead, and it ends up in the sugar and in water, not in the O₂.",
 miss:{1:"The oxygen in the sugar comes from CO₂, not water.",
       2:"The plant takes CO₂ in from the air; it does not make it from the labelled water.",
       3:"None of the labelled water's oxygen goes into the sugar. The O₂ gets all of it."},
 sam:{1:"Write a SAM question that tracks each atom of the photosynthesis equation to where it ends up.",
      2:"Write a SAM question that describes the labelling experiment and what each possible result would have meant.",
      3:"Write a SAM question: 'Why does the equation need 12 H₂O on the left to be correct atom for atom?'"},
 src:"Deck slides 26–27 · CP8 4"},

{n:"D18", unit:8, step:"C3", role:"pre", topic:"Linear electron flow, in order",
 stem:"Put linear electron flow in order, starting from water.",
 opts:["Water → PS I → Fd → PS II → NADPH","NADPH → PS I → Pc → PS II → water","Water → PS II → NADP⁺ reductase → PS I → ATP synthase","Water → PS II → Pq → cytochrome complex → Pc → PS I → Fd → NADP⁺ reductase → NADPH"], key:3,
 why:"Water gives electrons to PS II (P680). They pass through Pq, the cytochrome complex (which pumps H⁺) and Pc to PS I (P700). Light boosts them again there, and they go through Fd to NADP⁺ reductase, which makes NADPH.",
 miss:{0:"PS II comes first and PS I second, even though PS I was discovered and named first.",
       1:"That runs the chain backwards, from product to source.",
       2:"NADP⁺ reductase sits at the end, after PS I, and ATP synthase is not on the electron path at all."},
 sam:{0:"Write a SAM question on why the photosystem numbers don't match their order in the chain.",
      1:"Write a SAM question that labels an energy diagram of the Z scheme from water to NADPH.",
      2:"Write a SAM question that separates the electron path from the H⁺ path in the thylakoid membrane."},
 src:"CP8 9, 37 · Deck slides 67–79"},

{n:"D19", unit:8, step:"C3", role:"post", topic:"H⁺ and ATP in the chloroplast",
 stem:"Where does H⁺ pile up in the chloroplast, and where is ATP made?",
 opts:["H⁺ in the stroma; ATP in the thylakoid space, next to the pigments","H⁺ in the thylakoid space; ATP in the stroma, where the Calvin cycle uses it","H⁺ between the two envelope membranes; ATP in the cytosol outside","H⁺ and ATP both in the thylakoid space, where light is captured"], key:1,
 why:"H⁺ piles up in the thylakoid space, from water splitting and from pumping by the cytochrome complex. It flows back through ATP synthase into the stroma, where ATP is made and where the Calvin cycle uses it.",
 miss:{0:"Reversed. The stroma is the low-H⁺ side, where ATP is made.",
       2:"The gradient is held by the thylakoid membrane, not the envelope, and the ATP is made inside the chloroplast.",
       3:"ATP synthase's head faces the stroma, so the ATP is released there."},
 sam:{0:"Write a SAM question that compares the pH of the thylakoid space and the stroma, with numbers.",
      2:"Write a SAM question on why the thylakoid membrane, not the envelope, holds the gradient.",
      3:"Write a SAM question: 'Where is ATP needed in the chloroplast, and how does ATP synthase's orientation deliver it there?'"},
 src:"CP8 15, 17 · Deck slides 69, 82, 86–89"},

{n:"D20", unit:8, step:"C3x", role:"pre", ctl:"cyclic switch", topic:"Cyclic electron flow (going further)",
 stem:"Switch the chloroplast to cyclic electron flow. What still happens?",
 opts:["O₂ release and NADPH both continue, because PS I still passes electrons to NADP⁺ reductase","NADPH is still made from PS I's electrons, but ATP stops because nothing pumps H⁺","Everything stops, because PS II is off and PS I has no electrons to pass","H⁺ is still pumped and ATP is still made, but no NADPH forms, no water is split and no O₂ leaves"], key:3,
 why:"In cyclic flow, electrons from PS I go through Fd back to the cytochrome complex and on to P700 again. The complex still pumps H⁺, so ATP synthase makes ATP. But no electrons reach NADP⁺ reductase and PS II sits idle, so there is no NADPH and no O₂.",
 miss:{0:"To make NADPH, electrons have to leave the loop and reach NADP⁺ reductase. Cyclic flow keeps them in the loop.",
       1:"Reversed. ATP continues and NADPH stops.",
       2:"PS II is idle, but PS I keeps the loop running, and H⁺ pumping continues."},
 sam:{0:"Write a SAM question that contrasts the products of linear and cyclic flow in a table.",
      1:"Write a SAM question: 'Why does the Calvin cycle need extra ATP?' Answer it with the ratio of 3 ATP to 2 NADPH.",
      2:"Write a SAM question on which photosystem runs cyclic flow and why PS II is not needed."},
 src:"CP8 12, 13 · §4 (the deck does not teach cyclic flow)"},

{n:"D21", unit:8, step:"C4", role:"post", topic:"The cost of one G3P",
 stem:"For one three-carbon sugar (G3P) to leave the Calvin cycle, how many CO₂ are fixed, and what does it cost?",
 opts:["1 CO₂; 3 ATP and 2 NADPH","6 CO₂; 18 ATP and 12 NADPH","3 CO₂; 6 ATP and 9 NADPH","3 CO₂; 9 ATP and 6 NADPH"], key:3,
 why:"Three turns fix 3 CO₂ onto 3 RuBP, giving six three-carbon molecules. Reducing them costs 6 ATP and 6 NADPH. One G3P leaves, and rebuilding 3 RuBP from the other five costs 3 more ATP: 9 ATP and 6 NADPH per G3P.",
 miss:{0:"One CO₂ brings one carbon, and G3P has three.",
       1:"That is the cost per glucose, which is two G3P, not per G3P.",
       2:"The ATP and NADPH numbers are swapped. It is 9 ATP and 6 NADPH."},
 sam:{0:"Write a SAM question that counts carbons through three turns of the Calvin cycle, with beads.",
      1:"Write a SAM question: 'What does one glucose cost the Calvin cycle?' Show the doubling.",
      2:"Write a SAM question that sets out the three phases of the cycle and what each one spends."},
 src:"CP8 24, 32 · Deck slides 92–99"},

{n:"D22", unit:8, step:"C4", role:"pre", topic:"Carbon fixation by rubisco",
 stem:"Which enzyme attaches CO₂ to RuBP, and what forms first?",
 opts:["ATP synthase; glucose, which leaves the cycle at once","NADP⁺ reductase; G3P, formed straight from the CO₂ and RuBP with no split","Rubisco; an unstable six-carbon molecule that splits into two 3-phosphoglycerate","Rubisco; a stable five-carbon sugar with the new carbon swapped in for an old one"], key:2,
 why:"Rubisco attaches CO₂ to RuBP (5C). The six-carbon product is unstable and splits at once into two 3-phosphoglycerate. Rubisco is probably the most abundant protein on Earth, and every plant uses it: C3, C4 and CAM alike.",
 miss:{0:"ATP synthase makes ATP in the thylakoid membrane. Glucose is made much later, from G3P.",
       1:"NADP⁺ reductase makes NADPH at the end of the light reactions. G3P forms later, in the reduction phase.",
       3:"Adding one carbon to a five-carbon molecule gives six, not five, and that splits into two three-carbon molecules."},
 sam:{0:"Write a SAM question that names the key enzyme or input for each phase of the Calvin cycle.",
      1:"Write a SAM question that separates the enzymes of the light reactions from the enzymes of the Calvin cycle.",
      3:"Write a SAM question that counts carbons through fixation, from RuBP + CO₂ to two 3-phosphoglycerate."},
 src:"CP8 22 (correct key: all three plant types) · Deck slides 95–96"},

{n:"D23", unit:8, step:"C4", role:"post", ctl:"light slider + pool bars", topic:"Light off: RuBP and 3-phosphoglycerate",
 stem:"Turn the light off while CO₂ stays the same. In the next moments, what happens in the Calvin cycle?",
 opts:["RuBP rises and 3-phosphoglycerate falls, because fixation needs light and is the first step to stop","RuBP falls and 3-phosphoglycerate builds up, because fixation keeps going but the steps that need ATP and NADPH stall","Both rise, because the cycle stops using them up","Neither changes, because the Calvin cycle doesn't use light"], key:1,
 why:"Fixation by rubisco needs no light, so for a moment RuBP keeps being used up and 3-phosphoglycerate keeps forming. The reduction and regeneration steps need the ATP and NADPH that light supplies. They stall, so 3-phosphoglycerate piles up and RuBP is not rebuilt.",
 miss:{0:"Reversed. RuBP is used up and not rebuilt, so it falls, while 3-phosphoglycerate builds up.",
       2:"RuBP cannot rise, because rebuilding it needs ATP from the light reactions.",
       3:"The Calvin cycle does not use light directly, but it runs on light-made ATP and NADPH. When those stop, the cycle stops within moments."},
 sam:{0:"Write a SAM question that predicts RuBP and 3-phosphoglycerate levels when the light is switched off. Answer it with a sketch graph.",
      2:"Write a SAM question: 'Which steps of the Calvin cycle need ATP or NADPH?'",
      3:"Write a SAM question on why 'light-independent' does not mean 'runs in the dark'."},
 src:"CP8 23, 36, 40 · Deck slides 97–99 · clicker coverage only"},

{n:"D24", unit:8, step:"C1", role:"post", ctl:"light-colour selector", topic:"Which colours drive photosynthesis",
 stem:"Which colours of light drive photosynthesis best?",
 opts:["Green only","Yellow only","Red and blue","All colours equally"], key:2,
 why:"Chlorophylls a and b absorb most strongly in the blue and red parts of the spectrum and reflect green. The action spectrum, the rate of photosynthesis in each colour, peaks in the blue and the red. Try each colour and watch the rate.",
 miss:{0:"Green is the colour chlorophyll reflects most, so it drives photosynthesis least. That is why leaves look green.",
       1:"Chlorophyll absorbs yellow light weakly.",
       3:"Absorption changes with colour; that is what an absorption spectrum shows."},
 sam:{0:"Write a SAM question on why leaves are green, using the absorption spectrum.",
      1:"Write a SAM question that contrasts an absorption spectrum with an action spectrum.",
      3:"Write a SAM question: 'What would a plant under green light alone do, and why?'"},
 src:"CP8 5, 29–31, 34, 35 · Deck slides 44–52 · NVCC Lab 08"},

// ── Both organelles ──
{n:"D25", unit:"7–8", step:"B2", role:"pre", topic:"Chemiosmosis in both organelles",
 stem:"Which pairing is right for chemiosmosis in the two organelles?",
 opts:["Mitochondrion: H⁺ into the intermembrane space, ATP made in the matrix. Chloroplast: H⁺ into the thylakoid space, ATP made in the stroma.",
       "Mitochondrion: H⁺ into the matrix, ATP made in the intermembrane space. Chloroplast: H⁺ into the stroma, ATP made in the thylakoid space.",
       "Mitochondrion: runs its chain on light. Chloroplast: runs its chain on food. Both release their ATP into the cytosol.",
       "Mitochondrion: H⁺ into the intermembrane space, ATP made in the matrix. Chloroplast: no ATP synthase; it gets its ATP from the mitochondrion."], key:0,
 why:"Both organelles pump H⁺ into an enclosed space, the intermembrane space or the thylakoid space, and make ATP on the other side, in the matrix or the stroma, where it is used. In a plant cell, ATP synthase sits in the thylakoid membranes and in the inner mitochondrial membranes.",
 miss:{1:"Reversed. H⁺ piles into the intermembrane space and the thylakoid space, and ATP forms in the matrix and the stroma.",
       2:"Reversed. Light energizes the chloroplast's electrons and food supplies the mitochondrion's, and each organelle makes its ATP inside itself.",
       3:"Chloroplasts have ATP synthase too, in their thylakoid membranes."},
 sam:{1:"Write a SAM question with a two-column sketch showing where H⁺ piles up and where ATP forms in each organelle.",
      2:"Write a SAM question on the electron source in each organelle.",
      3:"Write a SAM question: 'Where is ATP synthase in a plant cell?' Answer it with both membranes."},
 src:"CP8 14 (correct key: thylakoid and inner mitochondrial membranes), 15, 18, 19, 41 · Deck Ch. 8 slides 80–84"},

{n:"D26", unit:"7–8", step:"B1", role:"post", topic:"Where the electrons come from",
 stem:"Where do the high-energy electrons come from in each organelle?",
 opts:["Chloroplast and mitochondrion: both from water, energized by light","Chloroplast and mitochondrion: both from glucose, delivered by NADH","Chloroplast: from water, energized by light. Mitochondrion: from food, delivered by NADH and FADH₂.","Chloroplast: from NADH, delivered by food. Mitochondrion: from water, energized by light."], key:2,
 why:"In the chloroplast, water is the electron source, and light supplies the energy that lifts the electrons up to NADPH. In the mitochondrion, the electrons come from food: glucose's electrons, carried by NADH and FADH₂.",
 miss:{0:"Water is the source only in the chloroplast. The mitochondrion makes water.",
       1:"Glucose is the source only in the mitochondrion. The chloroplast builds glucose.",
       3:"Reversed. NADH is the mitochondrion's electron carrier, and light drives the chloroplast."},
 sam:{0:"Write a SAM question that follows an electron all the way from water to glucose and back to water.",
      1:"Write a SAM question that contrasts building glucose and breaking it down, in terms of electrons.",
      3:"Write a SAM question: 'Why does the chloroplast need light and the mitochondrion doesn't?'"},
 src:"CP8 37, 42 · CP7 7, 20 · Deck Ch. 8 slide 80, Ch. 7 slides 21–25"},

{n:"D27", unit:"7–8", step:"B1", role:"pre", topic:"Opposite redox",
 stem:"Photosynthesis runs electrons the opposite way from respiration. Which is right?",
 opts:["Photosynthesis oxidizes CO₂ and reduces water; respiration oxidizes O₂ and reduces glucose","Both oxidize glucose; photosynthesis just does it more slowly, in the light","Neither is a redox process; energy moves between them only as phosphate groups","Photosynthesis oxidizes water and reduces CO₂; respiration oxidizes glucose and reduces O₂"], key:3,
 why:"Photosynthesis oxidizes water, releasing O₂, and reduces CO₂ to sugar, using light energy. Respiration does the reverse: it oxidizes glucose to CO₂ and reduces O₂ to water, releasing energy.",
 miss:{0:"CO₂ is already fully oxidized. Photosynthesis reduces it.",
       1:"Only respiration oxidizes glucose. Photosynthesis makes it.",
       2:"Both are redox processes: in each, electrons move from one molecule to another."},
 sam:{0:"Write a SAM question on why CO₂ cannot be oxidized any further.",
      1:"Write a SAM question that contrasts anabolic photosynthesis with catabolic respiration.",
      2:"Write a SAM question: 'How do I show that a process is a redox process?'"},
 src:"CP8 4, 10, 16 · Deck Ch. 8 slide 28, Ch. 7 slide 19"}
];
```

## 10. Acceptance tests

### 10.1 The test hook

Expose `window.__EP`, as Water Patch exposes `window.__WP`. Tests drive the page through it, and it must not change behaviour.

```js
window.__EP = {
  st: () => st,                              // saved state
  setTab(t),                                 // t = 0 Chloroplast, 1 Mitochondrion, 2 Both together
  goStep(i),                                 // i = index within the current module's visible steps (0-based)
  setView("one"|"side"), setLevel("nine"|"de"), setDev("ipad"|"pc"), fill(true|false), cardHidden(true|false),
  set(name, value),                          // "light" 0–100, "co2" 0–100, "colour" "white|red|blue|green", "o2" true|false,
                                             // "cyclic" true|false, "ferment" "lactate|alcohol", "uncoupler" true|false,
                                             // "runBoth" true|false, "speed" 0.5|1|2, "teach" true|false
  feedGlucose(),                             // the "Feed one glucose" button
  open(panel),                               // "zscheme" | "staircase" | "more"
  answer(itemId, optionIndex),               // choose an option, as a tap would
  run(seconds),                              // advance the simulation this many simulated seconds, fast, without drawing
  counts(),                                  // cumulative counters since the step opened:
     // { co2In, co2Out, co2OutMito, co2OutFerment, glucoseBuilt, glucoseBroken, g3pOut, o2Released, o2Used,
     //   waterSplit, waterMade, atpChloro, atpSynthaseMito, atpGlycolysis, atpCAC, nadphMade, nadphUsed,
     //   atpUsedCalvin, nadhMade, fadh2Made, rubp, pga, phThylakoidSpace, phStroma, phIMS, phMatrix, heat, rate, ps2Active }
  ledger(),                                  // carbon bookkeeping for everything drawn on the stage, lanes included:
     // { carbonIn, carbonOut, carbonInside }. carbonIn counts beads entering from outside the stage (CO₂ from the air
     // into the chloroplast; glucose from "Feed one glucose"); carbonOut counts beads leaving the stage (CO₂ to the air).
     // In side-by-side view the CO₂ carried from mitochondrion to chloroplast stays inside. Invariant: carbonIn === carbonOut + carbonInside.
  glucoseLog(),                              // one record per glucose completed since the page loaded, built from token lineage:
     // built:  { kind:"built",  co2Fixed, g3p, atpUsed, nadphUsed, waterSplit, o2Released }
     // broken: { kind:"broken", mode:"aerobic"|"lactate"|"alcohol",
     //           glycolysis:{co2, atpNet, nadh}, pyruvateOx:{co2, nadh}, cac:{co2, atp, nadh, fadh2},
     //           chain:{o2Used, waterMade, atp}, fermentation:{co2, atp}, co2Total, atpTotal }
  layout(),                                  // { chloro:{membraneY, hSide:"above"|"below", atpSide, synthase:{x,y}},
                                             //   mito:{membraneY, hSide, atpSide, synthase:{x,y}}, stageH } in stage px
  items(level),                              // the bank that level shows
  allText(level),                            // every string that level can put on screen: step heads, tasks, explanations,
                                             // word chips, stage labels, readout templates, control labels, legend, eyebrow,
                                             // footer and that level's bank (stems, options, why, miss, sam, va, study)
  colours(),                                 // [{name, fg, bg}] for every label/token colour pair drawn on the canvas, per theme
  fps()                                      // frames drawn per second over the last 3 s of real time
};
```

### 10.2 The tests

- Run every test at **1180 × 820** in **both** device settings (iPad and Computer), unless the test says otherwise.
- Report each as **PASS** or **FAIL**, with a one-line reason for each FAIL, in a table.
- Where a check is by code review or screenshot rather than by the hook, the test says so.

| # | Test | How to check |
|---|---|---|
| **T1** | **Carbon is conserved.** Per glucose, 6 CO₂ go into the chloroplast and 6 CO₂ come out of the mitochondrion. | Module 3, Side by side, Run both, `run(600)`. Every `glucoseLog()` record of kind "built" has `co2Fixed === 6`, and every "broken" record with mode "aerobic" has `co2Total === 6`. There must be ≥5 of each. `ledger()` balances exactly after **every** `run(0.5)` step across the 600 s. Repeat at both levels. |
| T2 | CO₂ by stage (DE) | In "broken" records: aerobic has glycolysis 0, pyruvateOx 2, cac 4. With O₂ off: "alcohol" has fermentation.co2 2 and co2Total 2; "lactate" has 0 and 0. |
| T3 | Calvin cycle arithmetic (DE) | Built records: `g3p` 2, `atpUsed` 18, `nadphUsed` 12. Per G3P, check the change in `counts()` from one `g3pOut` increment to the next: co2In 3, atpUsedCalvin 9, nadphUsed 6. |
| T4 | Water and O₂ atoms (DE) | Built: `waterSplit` 12, `o2Released` 6. Broken, aerobic: `chain.o2Used` 6, `chain.waterMade` 12. No 9th-grade string in `allText("nine")` shows a water count. |
| **T5** | **Cyclic flow stops O₂ and NADPH.** | DE, C3x: `set("cyclic",true)`, `run(20)`. The changes in `o2Released`, `nadphMade` and `waterSplit` are all 0; the change in `atpChloro` is > 0; `ps2Active === false`. Then `set("cyclic",false)`, `run(20)`: all three rise again. |
| **T6** | **9th-grade vocabulary.** | For every string in `allText("nine")`: no `NINTH_FORBIDDEN` word (§7, case-insensitive, whole word); "thylakoid" only in a string that also has "stacked membrane sac", or in A1/A2; "stroma" only in A1/A2. Repeat on the rendered DOM text of every 9th step in both views. Every tool-native word used in a 9th step appears in that step's "Words in this step" chips. |
| **T7** | **No 36–38 ATP anywhere.** | `allText("nine")` + `allText("de")` + the rendered DOM: no match for `/\b3[68]\s*(ATP|–|-|to)/i` or `/\b36\s*[-–]\s*38\b/`. DE aerobic `atpTotal` ≤ 32; fermentation `atpTotal` 2. |
| **T8** | **No O₂ stops the chain.** | Module 2 (M4 at 9th, M5 at DE), steady state, then `set("o2",false)`. Over the next `run(10)`: the change in `o2Used` is 0 and in `co2OutMito` is 0. The `atpSynthaseMito` rate over the last 5 s is ≤ 5% of its rate before. At DE, `phMatrix − phIMS` shrinks to ≤ 0.1 within `run(20)`. Glycolysis continues only as fermentation: at DE, `atpGlycolysis` keeps rising while mode is lactate or alcohol; at 9th, the "far less ATP" note shows. |
| **T9** | **Fills an iPad landscape screen.** | `fill(true)` at 1180 × 820 and again at **1180 × 750** (Safari with toolbars), in single and side-by-side view, at both levels. Check that `scrollHeight <= innerHeight + 1`, that `scrollWidth <= innerWidth`, and that the canvas's and every visible control's rects lie inside the viewport. With the card shown, the card column's `scrollHeight > clientHeight` is allowed and it scrolls internally. With the card hidden, the "Card ▸" tab is visible, and the overlay it opens also scrolls internally. |
| T10 | No horizontal page scroll | At 360, 768, 1024, 1180 and 1366 px wide, portrait and landscape, with `fill(false)`: `scrollWidth <= innerWidth`. |
| T11 | Touch targets | iPad setting: every button, option and step dot has a rect ≥44 × 44. Report any under 48. Every range input's computed height is ≥44px, and its `::-webkit-slider-thumb` rule sets ≥28px (check by reading the stylesheet). |
| T12 | Same machine, same picture | `layout()` in side-by-side view: the two `membraneY` values agree within 2% of `stageH`. `hSide` is "above" and `atpSide` "below" for both. By code review: both patches call the same ATP synthase and H⁺ drawing functions. By screenshot: the DE side-by-side view shows H⁺ collecting in the thylakoid space and the intermembrane space. |
| T13 | Light, CO₂ and colour behave | Light sweep 0→100 at CO₂ 100, and CO₂ sweep 0→100 at light 100: `rate` never falls, and the step from 80→100 adds < 10% of the rate at 100. Colour, at light 40 and CO₂ 100, compared with the white rate: red ≥ blue > white > green, and green ≤ 0.4. Light off with CO₂ 50 (DE): within `run(5)`, `rubp` falls by ≥30% and `pga` rises by ≥30%, and within `run(20)` `g3pOut` stops rising. |
| T14 | Frame rate (informational in headless) | iPad setting, side by side, Run both, 1180 × 820. Let the page draw for 5 s of real time, then read `fps()`. Report the number for both settings. FAIL only if the iPad setting is < 30 in headless Chromium. The ≥50 fps target is for a real iPad, which Reid checks. |
| T15 | Banks are intact | `items("nine")` = N1–N16 + A1–A2, and `items("de")` = D1–D27, each exactly as §8–§9: stems, option order, keys, why, miss, sam, va and study. Each item appears at its `step` and `role`. `answer()` with a wrong option shows that option's `miss` (plus its `sam` at DE), then `why`; the right option shows `why`. `src` never renders. A1–A2 show an "Advanced Biology" badge and never block a step. |
| T16 | Steps and dots | Every step opens directly from its dot. A dot lights only when its prediction is answered, its goals are met and its post items are answered (A1–A2 excepted). `set("teach",true)` opens every part of every step but lights no dot by itself. |
| T17 | Levels switch cleanly | Switching 9th ⇄ DE on any step changes labels, text, bank and eyebrow without a reload. Switching to 9th from a DE-only step moves to its nearest step: C3x → C3, M5 → M4, M6 → M4. DE-only steps have no 9th dots. Switching view never loses progress. |
| T18 | Saving | A reload restores level, module, view, step, answers, goals, fill and card-hidden. With `localStorage` stubbed to throw, the page still loads and runs. |
| T19 | No outside requests | The only requests are the page and Google Fonts (plus Mol\* only when a Go further link is clicked). There are no console errors in any test. |
| T20 | Nothing else changed | `git diff --name-only main...HEAD` lists **only** `biology/tools/organelles-energy.html`. |
| T21 | Contrast in both themes | For every pair in `colours()`, light theme and dark theme (with `prefers-color-scheme: dark` emulated): labels ≥4.5:1, and token fills against the stage background ≥3:1. Canvas labels are drawn on a backing plate, as Water Patch's `tag()` does, so the label check is ink against plate. |

### 10.3 The report back

Post a single message with four parts:

1. The branch name and commit hash.
2. The T1–T21 table (PASS/FAIL, with a reason for each FAIL), filled in for the iPad setting and for the Computer setting.
3. Eight screenshots at 1180 × 820: {9th, DE} × {one organelle chloroplast, one organelle mitochondrion, side by side with Run both, Teaching view with a pinned callout}.
4. Anything in this brief you could not do, or did differently, and why. Name any recommended feature you dropped (the uncoupler first).

Then stop. Do not merge.

## 11. After Reid reviews (not part of this build)

These are listed so the builder knows they are deliberately left out.

- **Classroom-tools hub:** list it as **Bio Tool #11** under **Unit 3 · Cell Energetics**, with the same `<li>` pattern as #10.
- **DE hub:** the first entry under Units 7 and 8, following the tools-first sort rule.
- **Sitemap and search:** add the URL to `sitemap.xml`, and rebuild `search-index.js` with `One Pagers/build-search-index.py` on the Mac.
- **Canvas links:**
  - Adv 425639 Module 3 and Bio I 425631, where it replaces the Cell Energy Cycle Gizmo;
  - Module 2's Additional Study Materials;
  - BFHS DE modules 3662046 and 3662047, as the last item.
- **Bio Tool #9** gets its Ch. 7 (37 items) and Ch. 8 (42 items) sets on its own schedule, before 11/30, and links here.
- **Deadlines:** the 9th view must be live before **Wed 10/21** (Unit 3 starts). The DE view must be live by **Mon 11/30**.
