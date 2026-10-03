# Build brief: The Macromolecule Patch (Bio Tool #17)

A workbench where students build the four groups of biological molecules from their small units, watch one water molecule leave at every link, split the chains again with water and the matching enzyme, sort the results by job, read a molecule from its parts, and test real foods with indicator drops. Two levels: 9th grade and DE.

- **Brief version:** Leg 2 of the Macromolecule Patch relay. Written 2026-10-03 in the Science OnePagers project from the handoff card `2026-10-03-HANDOFF-Macromolecule-Patch-tool.md` (v1, written that afternoon in the Biology Curriculum SOL 9th grade project).
- **Checked in Leg 2:**
  - The tool number and URL were read off the live hubs and the repo on 2026-10-03 (§12).
  - The house pattern was read from the Energy Patch, the Water Patch and the Signal Patch brief.
  - The food-test colours were matched to Reid's own DE Lab 02 student document (the reagent quick-reference table), not to any Pearson material.
  - The DE bank was written fresh and compared with the Checkpoint Companion's Chapter 3 stems so it does not repeat them.
  - A script checked both banks for: the key spread, a `miss` for every wrong option, a `sam` for every DE wrong option, and the 9th-grade forbidden-word list (§7).
  - An independent review pass read the brief cold; its findings are applied in this version (§12).
- **Who reads this:** the Claude Code cloud session that builds the page. This file is the whole spec. The build needs nothing from the handoff card.
- **Where it lives:** `_briefs/macromolecule-patch-tool.md` in `schwebach-va/science-onepagers`. The repo has no `.nojekyll`, so GitHub Pages' Jekyll skips folders whose names start with `_`, and this file is never served. Do not add a `.nojekyll`.

---

## 0. The job, in one screen

1. Build **one new file**: `biology/tools/macromolecule-patch.html`.
   - Permanent URL: `https://scienceonepagers.org/biology/tools/macromolecule-patch.html`.
   - It is **Bio Tool #17**. The title is "The Macromolecule Patch".
2. It must be self-contained:
   - plain HTML, CSS and JS in one file;
   - no build step, no framework, no external script;
   - Google Fonts is the only external request. Load it the same way `biology/tools/organelles-energy.html` does.
3. Commit it on a new branch and push that branch.
   - If the session assigns you a working branch (cloud sessions usually name one `claude/…`), use it. Otherwise use **`claude/macromolecule-patch-tool`**.
   - Open a pull request into `main` and stop. **Do not merge.** Say in the report which branch and PR you used.
4. **Do not edit any existing file.** That includes `biology/classroom-tools.html`, `biology/de-biology-101-resources.html`, `sitemap.xml`, `search-index.js`, `search.html`, `style.css`, this brief and every other page. Hub listings, search and Canvas links come after Reid reviews the page, in a separate job (§11).
5. Test with Playwright and Chromium at **1180 × 820 CSS px (iPad, landscape)** and at **820 × 1180 (iPad, portrait)**.
   - Cover both levels (9th, with Advanced Biology off and on, and DE) and both device settings (iPad and Computer).
   - Report **every acceptance test in §10 as PASS or FAIL**, with a one-line reason for each FAIL.
   - Attach the screenshots listed in §10.3.
6. **Collect no data.** Nothing a student types, drags or taps leaves the device. No analytics, no form posting, no fetch.
7. Nothing publishes without Reid. The branch is for his review.

**How the push works.** The Water Patch (Bio Tool #10) and the Energy Patch (Bio Tool #11) were built by cloud sessions started at claude.ai/code with this repository selected; each pushed its own branch and Reid merged it as a PR. A session opened without the repository as its source could clone the repo, but its push was refused: *"not in this session's authorized repository set"*. **If `git push` is refused, do not hunt for a workaround.** Keep the commit, report the refusal word for word, and stop.

## 1. Read these first (the house pattern)

| File | What to take from it |
|---|---|
| `biology/tools/organelles-energy.html` (Bio Tool #11, The Energy Patch) | **The newest built Patch. Copy its skeleton closely.** Take these from it: <ul><li>the `:root` tokens and both dark-mode blocks;</li><li>`.topbar` with `.seg` switches (Running on: iPad / Computer);</li><li>the level switch `9th Grade SOL Bio` / `DE Bio`;</li><li>the `#build` grid: stage column plus card column, with the card scrolling inside its own column at ≥900 px, and the pinned stage above the card below 900 px;</li><li>"Fill screen", "Hide card" and "Teaching view";</li><li>step `.dots` that light only when a step is finished;</li><li>the "Words in this step" chips;</li><li>the `.card` item rendering (`.opts`, `.opt.right` / `.wrong`, `miss`, `why`, `sam`);</li><li>`#record` ("Your record");</li><li>the `.do.further` box, the `.fine` simplifies note and the `sop-foot` footer;</li><li>the localStorage `st` object with `save()` in try/catch;</li><li>the test hook pattern (`window.__EP`).</li></ul> |
| `biology/tools/water-patch.html` (Bio Tool #10) | **The drag code.** Its canvas `pointerdown` / `pointermove` / `pointerup` handling with `setPointerCapture` and `touch-action:none` is the pattern for dragging monomers on an iPad. Also take the canvas `tag()` label-on-a-plate helper, `buildCtl()` per-step controls, and the iPad slider styling. Its Module 2 enzyme (induced fit) is the sibling of S3 here: link to it, do not redraw it. |
| `biology/tools/membrane-patch.html` (Bio Tool #5) | Reid's iPad rules from 9/22: <ul><li>the picture stays pinned while text scrolls;</li><li>**any step opens directly** from its dot;</li><li>**a dot lights only when that step is finished**.</li></ul> He teaches from these live. |
| `_briefs/signal-patch-tool.md` (Bio Tool #15, being built now) | The brief this one is shaped on. Where this brief is silent on a house detail, do what that brief says. |
| `biology/tools/carbon-check-diagnostic.html` (Bio Tool #3) | The four group colours already used on the site (§7.4 here uses the same hex values) and its "seven ideas" of Chapter 3, which the DE view should feel continuous with. |
| `biology/tools/checkpoint-companion.html` (Bio Tool #9) | The `sam` prompt per wrong option. DE students build Student-Authored Modules from their misses, so DE items carry `sam`. |

Match the house tone and markup:

- the `sop-back` link to `../classroom-tools.html`;
- `sop-eyebrow`, `.lede`, and the `.fine` note saying nothing is submitted;
- the `sop-foot` footer with the CC BY-NC 4.0 licence and the link to `../../teaching/classroom-tools-note-to-teachers.html`;
- `<link rel="canonical">`, `og:` and `twitter:` meta, a `meta description` and the `LearningResource` JSON-LD, as the Energy Patch has them.

**The site footer carries no PWCS disclaimer.** Do not add one.

## 2. What the tool is (Reid's request, and the design built from it)

> "Build a future tool on macromolecules to help students engage in these." (Reid, 10/3)

**Why it exists.** Module 1's macromolecule target (PWCS LT 1.2) was this year's weakest. Pooled over four 9th-grade periods (108 students, aggregate only), the summative's most-chosen wrong answers were:

| Summative item | Correct | Most-chosen wrong answer | Step that confronts it |
|---|---|---|---|
| Carbon in biomolecules | 56% | "carbon bonds only with carbon" | S1 |
| Fructose is a monosaccharide | 58% | glycerol | S2, S5 (word endings) |
| Monomer paired with its polymer | 66% | DNA named as a monomer | S2 |
| Carbohydrate vs lipid jobs (Venn) | 69% | cell walls and insulation swapped | S4 |
| Glucose and RNA from structures | 74% | the two swapped | S5 |
| Monomers make up polymers | 77% | "both A and B" | S2 |
| Nucleic acids store genetic information | 88% | lipid | S4 |
| Hydrolysis vs dehydration synthesis | (reassessment only) | not on the summative | S2, S3 |

This table is for the builder's understanding. **It is never shown on the page**, and the page never mentions a test, a class or a result.

**The idea students should leave with.** Four kinds of large molecule, each built from its own kind of small unit. Water comes out at every link when a chain is built and goes back in at every link when it is split. What a molecule is made of tells you what job it does.

**The stage** is a workbench, drawn at the level of building blocks (never atoms, except the S1 zoom):

- a **tray** on the left holding glucose hexagons, amino-acid circles, nucleotides (small pentagon + circle + rounded rectangle) and, for lipids, a glycerol piece and fatty-acid capsules;
- a **build lane** in the middle, where dragged units snap together; each new link pops out a small blue water molecule that floats up to a **water counter**;
- an **enzyme dock** on the right, with scissors-shaped enzymes (amylase, pepsin, lipase and one that splits DNA; DE adds trypsin) that split chains and pull one water molecule in at each cut;
- four **bins** along the bottom (carbohydrate, lipid, protein, nucleic acid) for S4 and S5.

**Device.** Student iPads, touch only. No hover-only actions. Portrait and landscape. Smooth on an older iPad. Readable at projection size on the Newline board.

## 3. Decisions already made (do not reopen)

- **URL, number and title.**
  - URL: `biology/tools/macromolecule-patch.html`. Number: **Bio Tool #17**. The repo's highest built number is #14 (The Signal Relay); #15 is the Signal Patch (brief on `main`) and #16 is the CHIP scientists page (draft) (§12).
  - `<title>`: `The Macromolecule Patch | Science One-Pagers`.
- **One page, with a 9th / DE switch.** Labels `9th Grade SOL Bio` / `DE Bio`, the house labels.
- **One module, six steps** (§6). All six are core at both levels. An **"Advanced Biology"** switch at 9th reveals the two A-items (A1, A2); it hides no step.
- **Lipids are drawn honestly.** A fat is glycerol plus three fatty acids, joined by dehydration synthesis (three waters out), but it is **not** a long repeating chain. The tool never calls a lipid a polymer and never calls fatty acids "the monomers of lipids". The 9th-grade line, used wherever lipids are introduced: **"Lipids are built from smaller pieces, glycerol and fatty acids, but they do not form long repeating chains, so scientists don't call them polymers."** Students can still answer "what are lipids built from?" with "glycerol and fatty acids".
- **The egg.** Canvas Original #13 opens on an egg in a skillet, so S3's "split a meal" scene uses an egg: the white is mostly protein, the yolk carries the fat, and the egg's cells carry DNA. The heat button in S3 is the skillet.
- **The food tests follow Reid's DE Lab 02**: Benedict's (in a hot bath), iodine, Biuret and the brown-paper spot, with water as the negative control. **No Sudan III** (the card proposed it; the lab does not use it).
- **No food brands, no Calories-per-serving tables, no diet advice.** The only energy numbers are the per-gram figures in §4.1.
- **Copyright.** Do not copy or imitate: TPT macromolecule products; the county packet's Macromolecule Maker cut-outs or any packet text; colleagues' manipulatives; CLT assessment items; Pearson/Campbell wording or figures (decks, Checkpoints); VDOE released-item text. Building and splitting chains is standard biology; every word and drawing here must be new. Every item in §8–§9 is original and may be used as written.

## 4. Science the build must get right

### 4.1 The data block (paste this into the page; it is the test oracle)

```js
// MACRO_DATA — Leg 2, 2026-10-03. Single source for every number and every test result on the page.
const MACRO_DATA = {
  version: "2026-10-03",
  groups: {   // colour hex values are exact (T12); every group also has a shape and a text label
    carb:    { name9:"Carbohydrate", nameDE:"Carbohydrate", colour:"#C98A2E", colourDark:"#E3B062",
               unit9:"sugar (monosaccharide)", unitDE:"monosaccharide", link9:"link", linkDE:"glycosidic linkage",
               enzyme:"amylase", shape:"hexagon" },
    protein: { name9:"Protein", nameDE:"Protein", colour:"#1F7A8C", colourDark:"#6FC0CE",
               unit9:"amino acid", unitDE:"amino acid", link9:"link", linkDE:"peptide bond",
               enzyme:"pepsin", shape:"circle" },
    lipid:   { name9:"Lipid", nameDE:"Lipid", colour:"#B85042", colourDark:"#E08B7C",
               unit9:"glycerol and fatty acids (not a repeating chain)", unitDE:"glycerol + fatty acids (not a polymer)",
               link9:"link", linkDE:"ester linkage", enzyme:"lipase", shape:"capsule" },
    nucleic: { name9:"Nucleic acid", nameDE:"Nucleic acid", colour:"#6B4E8C", colourDark:"#B9A3D9",
               unit9:"nucleotide", unitDE:"nucleotide", link9:"link", linkDE:"phosphodiester linkage",
               enzyme:"nuclease", shape:"pentagon+circle+rect" }   // nuclease shown at DE only (§6 S3)
  },
  water: { colour:"#4FA3D9", colourDark:"#8CCBF0" },
  // Water rule (the counter's oracle): every link made releases exactly 1 water; every link broken takes exactly 1.
  // A chain or branched particle of n units has n − 1 links. A fat (glycerol + 3 fatty acids) has 3 links.
  builds: {   // the S2 targets
    starch:  { group:"carb",    units:10, waters:9, label9:"a starch chain of 10 glucose",   labelDE:"amylose, 10 glucose (α 1–4)" },
    protein: { group:"protein", units:5,  waters:4, label9:"a protein chain of 5 amino acids", labelDE:"a pentapeptide" },
    dna:     { group:"nucleic", units:6,  waters:5, label9:"a DNA strand of 6 nucleotides",   labelDE:"a 6-nucleotide DNA strand" },
    fat:     { group:"lipid",   units:4,  waters:3, label9:"a fat: glycerol + 3 fatty acids",  labelDE:"a triglyceride" }
  },
  energyPerGram: { carb:4, protein:4, lipid:9, text9:"about 4 Calories per gram for carbohydrate and protein, about 9 for fat",
                   textDE:"~4 kcal/g carbohydrate and protein, ~9 kcal/g fat" },
  // S6. Typical classroom results. "strong" | "trace" | "none". Benedict's reads "none" for every food until heated.
  tests: {
    benedicts: { finds:"carb (sugars like glucose)", findsDE:"reducing sugars", needsHeat:true,
                 neg:"stays blue", pos:["green","yellow","orange","brick red"], posText:"green → yellow → orange → brick red" },
    iodine:    { finds:"carb (starch)", findsDE:"starch (amylose helix)", needsHeat:false, neg:"yellow-brown", pos:["blue-black"] },
    biuret:    { finds:"protein", findsDE:"peptide bonds (protein)", needsHeat:false, neg:"stays light blue", pos:["violet"],
                 deNote:"pink for short peptide fragments" },
    paper:     { finds:"lipid", findsDE:"lipid", needsHeat:false, neg:"spot dries and disappears", pos:["faint translucent spot","lasting translucent spot"] }
  },
  foods: {   //            benedicts  iodine    biuret    paper
    potato:     { name:"Potato",        benedicts:"trace",  iodine:"strong", biuret:"none",  paper:"none"   },
    applejuice: { name:"Apple juice",   benedicts:"strong", iodine:"none",   biuret:"none",  paper:"none"   },
    eggwhite:   { name:"Egg white",     benedicts:"trace",  iodine:"none",   biuret:"strong",paper:"none"   },
    butter:     { name:"Butter",        benedicts:"none",   iodine:"none",   biuret:"none",  paper:"strong" },
    milk:       { name:"Whole milk",    benedicts:"strong", iodine:"none",   biuret:"strong",paper:"trace"  },
    tablesugar: { name:"Table sugar", deOnly:true, benedicts:"none", iodine:"none", biuret:"none", paper:"none" },
    glucose:    { name:"Glucose solution (known positive)", deOnly:true, benedicts:"max", iodine:"none", biuret:"none", paper:"none" },
    water:      { name:"Water (control)",benedicts:"none",  iodine:"none",   biuret:"none",  paper:"none"   }
  },
  // Colour shown for each result: none = neg; trace = pos[0]; strong = the LAST entry of pos[] for iodine, biuret and paper,
  // but "orange" for Benedict's; "max" (Benedict's on the DE glucose control only) = "brick red".
  // Unheated Benedict's always shows neg ("stays blue"), whatever the food.
};
```

**Notes on the food table** (the builder may put a short version in the step card):

- Raw potato has a little free sugar, so Benedict's gives a faint green after heating. Egg white also carries a little free glucose, so a faint green is honest there too.
- Whole milk is positive for sugar (lactose), protein (casein) and fat; its paper spot is faint because milk is mostly water.
- **Table sugar (sucrose) is a non-reducing sugar: Benedict's stays blue.** It appears only at DE, because the lab document calls this out and D11 builds on it. At 9th grade it is left out so "sugar finds sugar" stays simple.
- Water is negative for every test. It is the control.

### 4.2 Other science the build must get right

- **Carbon.** Four bonds, to hydrogen, oxygen and nitrogen as well as other carbons (sulfur and phosphorus are mentioned at DE only). Carbon skeletons can be straight chains, branches or rings.
  - **Glucose ring:** five carbons and one oxygen in the ring, with the sixth carbon outside it. In the S1 zoom, every carbon shows four bonds (count the hydrogens; draw H explicitly in the zoom).
  - **Amino acid:** a central carbon bonded to an amino group, a carboxyl group, a hydrogen and a side chain. At 9th, label these "a nitrogen-containing group", "an acid group", "H" and "side chain"; at DE, "amino group", "carboxyl group", "H" and "R group".
- **Matching units only.** Sugars build carbohydrates (starch, glycogen, cellulose); amino acids build proteins; nucleotides build nucleic acids (DNA, RNA). A drag that would join two different kinds **does not link**, and the card says why.
- **Starch, glycogen, cellulose.** All are chains of glucose.
  - People have amylase for starch and glycogen and no enzyme for cellulose, so cellulose is fiber. Cattle rely on gut microbes that make cellulase.
  - Glycogen is the animal storage form; it is highly branched. **Branches do not change the water rule:** a branched particle of *n* glucose has *n* − 1 links.
  - DE: starch (amylose) is α 1–4; cellulose is β 1–4, drawn by flipping every other tile. Amylopectin and glycogen add α 1–6 branch points.
- **Nucleotide = phosphate + five-carbon sugar + nitrogenous base.** DNA uses deoxyribose and A, T, G, C; RNA uses ribose and A, U, G, C. At DE, ribose carries an –OH on its 2′ carbon and deoxyribose does not. The backbone joins the 3′ carbon of one sugar to the 5′ carbon of the next through a phosphate.
- **ATP is built like a nucleotide**: adenine + ribose + three phosphates (at 9th: "adenine + five-carbon sugar + three phosphates"). It is a single unit, not a chain.
- **Enzymes are proteins** (DE footnote: a few biological catalysts are RNA). Each digestive enzyme splits one kind of link: amylase (starch), pepsin (proteins; trypsin at DE too), lipase (fats), nucleases (nucleic acids). Most enzyme names end in **-ase**; pepsin and trypsin are older names that do not.
- **Jobs (the Venn the summative used).**
  - Carbohydrate: quick energy, plant cell walls (cellulose), name-tag sugars on the cell surface.
  - Lipid: long-term energy storage, insulation, membranes, some hormones.
  - Protein: structure, transport, enzymes, signals.
  - Nucleic acid: stores and passes on the instructions for building proteins.
  - **Carbohydrates and lipids both store energy**, and sugars and fats are made only of carbon, hydrogen and oxygen. Those two go in the middle of the Venn.
- **Denaturing is not hydrolysis.** Heat (or a strong acid or base) unfolds a protein's shape without breaking its chain: frying an egg white denatures it. Digesting the egg white hydrolyzes it. In the model, the S3 heat button changes the protein's drawing from folded to unfolded **without changing its link count or the water counter** (T3).
- **The word parts** (S5 drill): mono- = one; poly- = many; -mer = part; -ose = sugar; -ase = enzyme; hydro- = water; -lysis = splitting; de- = remove; syn- = together; -saccharide = sugar.

### 4.3 Simplifications the page must own (the `.fine` "What the model simplifies" list)

- Molecules are drawn as building blocks, far larger than scale, and only S1 shows atoms.
- **Every monosaccharide tile is a hexagon.** Glucose's ring really is six-sided; fructose usually closes into a five-sided ring. The small pentagon is kept for the five-carbon sugar inside a nucleotide.
- **Cells do not snap bare units together.** They first load each unit with energy from ATP (nucleotides arrive carrying extra phosphates). One water per link is the net bookkeeping, which is what this tool counts. (DE wording; at 9th: "In cells, building a chain also takes energy. The tool only counts the water.")
- Lipase in the body usually leaves one fatty acid on the glycerol; the tool splits the fat completely.
- Food-test colours are typical classroom results; real foods vary.
- Cells do attach sugars to proteins and lipids (the name tags in S4). The tool refuses mixed links so each chain shows one kind of unit.
- Hydrolysis needs the enzyme in the model; outside the body, acid and heat can also split chains (DE only).

### 4.4 Sources (render these on the page, in a "Sources" list under Go further)

These are standard textbook facts; the list points students at open, free references rather than at a publisher.

| Claim | Source |
|---|---|
| Monomers, polymers, dehydration synthesis and hydrolysis; the four groups and their jobs | OpenStax *Biology 2e*, Ch. 3, "Biological Macromolecules" (openstax.org/books/biology-2e) |
| Carbohydrates, α and β glucose, starch, glycogen, cellulose | OpenStax *Biology 2e* §3.2 |
| Lipids: triglycerides, ester linkages, phospholipids | OpenStax *Biology 2e* §3.3 |
| Proteins: peptide bonds, four levels of structure, denaturation | OpenStax *Biology 2e* §3.4 |
| Nucleic acids: nucleotides, DNA vs RNA, phosphodiester backbone | OpenStax *Biology 2e* §3.5 |
| Food indicator tests (Benedict's, iodine, Biuret, paper spot) | J. R. Schwebach, DE Biology 101 Lab 02 (classroom use; not linked) |

Link the OpenStax entries to `https://openstax.org/books/biology-2e/pages/3-introduction`. Render the Lab 02 line as text only.

## 5. Page, layout and controls

### 5.1 Top of the page (scrolls away)

- `sop-back` link.
- `.topbar` with one `.seg`: **Running on: iPad / Computer**.
  - **iPad** (the default): devicePixelRatio capped at 2; no shadows or blur filters in the draw loop; touch targets ≥48 px (44 px is the floor T10 fails below); labels ≥16 CSS px; at most about 40 moving sprites.
  - **Computer:** DPR cap 2.5; tighter controls; hover highlights *in addition to* tap. Nothing may depend on hover.
  - **The science is identical in both settings.**
- Then the eyebrow (§5.6), `<h1>The Macromolecule Patch</h1>`, a `.lede` and the level switch `9th Grade SOL Bio` / `DE Bio`.
- At 9th only, a small switch, **Advanced Biology: Off / On**. It reveals A1 and A2.
- The `.fine` note: nothing is submitted; progress and what you type stay on this device; any step number opens that step, and a number lights up only when that step is finished.
- Then the legend: the four groups and water, each with its colour, **shape** and label (§7.4).

**`.lede` text:**

- **9th:** "Almost everything in your lunch, and in you, is made of four kinds of large molecule. Each one is a chain, or a cluster, of small pieces. Snap the pieces together, watch what comes out at every link, then take a meal apart and test real foods for what is inside."
- **DE:** "Four classes of biological molecule, three of them true polymers. Build each by condensation, count the water, hydrolyze it with the enzyme that fits its linkage, and connect structure to function down to the food tests in Lab 2."

### 5.2 Layout

Copy the Energy Patch's layout rules:

- **At ≥900 px wide, in landscape:** `#build` is `height:100svh` (`100vh` as the fallback), a two-column grid: stage column about 62%, card column about 38% with `overflow-y:auto` inside the column.
- **"Fill screen"** hides everything outside `#build`, using `data-fill="1"` on `<html>`. Compact copies of the level and Advanced switches sit inside `#build`. Where the API exists, it calls `requestFullscreen`. It starts off.
- **"Hide card"** gives the stage the full width. A slim "Card ▸" tab reopens the card as an overlay.
- **Below 900 px, or in portrait:** the stage is pinned (`position:sticky`) above the card, and the card scrolls beneath it.
- **The stage** is one **scene canvas** plus the controls row, readout line and step dots under it. The canvas is sized to its box × DPR and drawn in world units scaled to *contain*. The scene world is **1200 × 720**:
  - tray: x 0–230;
  - build lane: x 230–900, y 60–560, with the water counter at its top right;
  - enzyme dock: x 900–1200 (S3) — in S1 this area holds the zoom panel and in S6 the spot plate uses the whole width;
  - bins: y 590–720, four across the full width (S4, S5).
- **No horizontal page scroll** at any width from 360 px up.

### 5.3 Dragging, and the tap alternative

- Drag with pointer events, as the Water Patch does: `pointerdown` picks the nearest draggable within a 48-px (CSS) radius, `setPointerCapture`, `pointermove` follows, `pointerup` drops. The canvas has `touch-action:none`.
- **Every drag also works as two taps:** tap a piece (it lifts and glows), then tap where it should go. This is how the transparent DOM buttons laid over canvas targets work (T10), and it is what keyboard and switch users get.
- A drop that is not allowed **bounces back** with a one-line reason in the readout line and the `aria-live` line.
- Snap distance: a unit dropped within 60 world units of a chain's open end joins it. Branching (glycogen at S2 DE, optional) uses a "branch here" marker on a chain tile.

### 5.4 The water counter

- A clear box at the top right of the lane: **"Water out: n"** in S2, **"Water in: n"** in S3, each with a column of water glyphs that fills or empties.
- At DE, a second line reads **"Links: n"** so the identity *water = links* is visible.
- Every link made spawns one water sprite that floats from the link to the counter (tween 0.6 s at 1×; jump under reduced motion). Every cut pulls one sprite from the counter to the cut. **The number updates when the sprite arrives**, and `counts()` (§10.1) updates at the moment of the link or cut; tests read `counts()`.
- `Reset this step` sets the counter to zero.

### 5.5 Controls (below the stage, built per step)

- **Always shown:** `Reset this step`, `Fill screen`, `Hide card`, `Teaching view`.
- **S1:** `Zoom: Glucose / Amino acid`, then `Build: Chain / Branch / Ring`.
- **S2:** the build target picker (`Starch` / `Protein` / `DNA` / `Fat`), shown as four goal chips that tick when met; at DE also `Glucose: α / β` and `Tails: saturated / unsaturated`.
- **S3:** the enzyme dock (at 9th: amylase, pepsin, lipase and "An enzyme that splits DNA", hook name `nuclease`; at DE the fourth is labelled Nuclease and trypsin is added), `Split a meal: egg`, and `Heat (skillet)`.
- **S4:** none beyond the cards; then `Venn` when the sort is done.
- **S5:** `Next drawing`, and the word-part drill below the bins.
- **S6:** the indicator bottles (`Benedict's`, `Iodine`, `Biuret`, `Paper spot`), `Hot bath` (Benedict's only) and the food row.
- **Teaching view:** as in the Energy Patch, it opens every part of the step but **lights no dot**. Labels grow to ≥28 CSS px. Tapping any part of the scene pins one big callout for that part.

Every control has an `aria-label`. Segmented buttons use `aria-pressed`.

### 5.6 Eyebrow and footer per level

**9th:**

- Eyebrow: `Bio Tool #17 · Biology I Unit 1 · SOL BIO.2b`
- Footer lead: `Unit 1, Biochemistry · Biology I, SOL BIO.2b (macromolecules) · PWCS LT 1.2`

**DE:**

- Eyebrow: `Bio Tool #17 · DE Bio 101 Unit 3 · Carbon and Molecular Diversity of Life (Campbell Ch. 3)`
- Footer lead: `Unit 3, Carbon and Molecular Diversity of Life · NVCC BIO 101, Campbell Chapter 3 · Lab 2, Macromolecules`

Then the house footer text: "· six steps, nothing submitted. © J. R. Schwebach, CC BY-NC 4.0. Teachers: see the note on using these with Canvas." Copy the markup from the Energy Patch.

### 5.7 Saving

- localStorage key **`macropatch`**.
- It holds `st = {dev, level, adv, step, ans, goals, found:{S1..S6}, teach, fill, cardHidden, rec:[…]}`.
- Validate every field on load, as the Energy Patch does. Wrap every read and write in try/catch. The page must work with storage blocked.
- **"What you found"** boxes after each step: one sentence, capped at 300 characters, saved only here. A "Clear what I typed" button sits in `#record`.

### 5.8 Below the tool

1. **`#record`, "Your record".** First answers per item, as the Energy Patch shows them, plus the student's "What you found" sentences in step order, with a **Copy my sentences** button (clipboard API, select-all textarea fallback).
2. **`.do.further` "Go further":**
   - **On this site:**
     - [The Water Patch](water-patch.html), for how an enzyme grips its substrate (Module 2);
     - [Bond Budget](../../chemistry/tools/bond-budget-molecule-builder.html), to build molecules atom by atom;
     - [The Membrane, Built From All Four](membrane-built-from-all-four.html), where all four groups meet in one membrane;
     - [The Energy Patch](organelles-energy.html), where glucose is built and broken and ATP is spent;
     - [Carbon Check](carbon-check-diagnostic.html) and [Checkpoint Companion](checkpoint-companion.html) (DE view only).
   - **Real structures, on Mol\*,** in the Energy Patch's link format. Candidates (**open each ID once before committing; if it does not load the named structure, leave it out and say so in the report; do not guess a replacement**):
     - 1BNA, a short stretch of DNA;
     - 1SMD, human salivary amylase;
     - 1CAG, a collagen-like protein segment.
   - **Do not link or embed videos.**
3. **Sources**, from §4.4, in an element with `id="sources"`. The Sources list and Mol\* links show at both levels and are **exempt from T7**: they are citations and names, not teaching text.
4. **`<details>` "For teachers"** (collapsed). Use these lines as written:
   - **Goal:** students build each group from its units, count the water at every link in both directions, sort molecules by job, and identify a group from its parts and from a food test.
   - **Misconceptions it is built to surface:** "carbon bonds only to carbon" (S1); a polymer named as a monomer, e.g. DNA (S2); "joining uses water up" (S2, S3); cell walls and insulation swapped between carbohydrates and lipids (S4); glucose and RNA confused from their drawings, and fructose taken for a lipid piece (S5); "a sweet food always turns Benedict's" (S6, DE).
   - **Timing:** about 30 minutes for all six steps, or S1–S3 one day and S4–S6 the next.
   - **Remediation:** S2 and S3 together are a 12-minute reteach of dehydration synthesis and hydrolysis; S4 and S5 are the reteach for "which group, which job".
   - **DE link:** S6 is a dry run of Lab 2 Day 1's controls; D11 and D12 are the lab's two hard ideas.
   - **Suggested board prompt:** "You built a chain of ten and counted nine waters. Where did the tenth go?"
5. **`.fine` "What the model simplifies":** the §4.3 list.

### 5.9 Accessibility

- Honour `prefers-reduced-motion`: sprites jump with no tweening; counters still update.
- Colour-blind safe: every group and every state also shows by shape or text (§7.4). Contrast is checked by T14.
- The canvas has `role="img"` and an `aria-label` that updates with the step. A visually hidden `aria-live` line narrates key events ("Glucose linked. Water out: 4", "Amylase can't cut a protein", "Iodine on potato: blue-black").

## 6. The six steps

Each step follows the Energy Patch's step object: `key`, `short`, `head`, `pre` (the prediction item, answered before the controls unlock), `post` (an array of check-yourself items shown after the explanation: the bank items with `role:"post"` for that step and **no `adv`**; A-items are shown beside them but are never in `post`), `task`, `goals` and the explanation, with `nine` and `de` text.

**Goals must be detectable from simulation state**, each naming the counter it checks (§10.1). A step lights only when its pre item is answered, its goals are met, every post item is answered and its "What you found" box has at least 8 characters. A-items are optional and never block a step.

Every explanation ends with its **"Say it"** line in bold: the one sentence students should be able to say afterwards.

---

**S1 · Look inside one piece (carbon)**

- **pre:** N4 / D1. **post:** N13 / D2.
- **Scene:** the enzyme-dock area becomes a **zoom panel**. Tap the glucose tile in the tray to zoom to its atoms: a six-sided ring of five C and one O, the sixth C outside, every H and O drawn. Tapping any carbon highlights its four bonds and shows "4 bonds: C, H, O" (the list names what *that* carbon is bonded to). `Zoom: Amino acid` shows the amino acid the same way, with N in its group. Then `Build: Chain / Branch / Ring` draws a small carbon skeleton of each kind, with each carbon's four bonds filled by H.
- **Task:** Zoom into glucose and tap two carbons. Zoom into an amino acid and find the nitrogen. Then make a chain, a branch and a ring.
- **Goals:** (a) `carbonsTapped ≥ 2` (two different carbons) in glucose; (b) `aminoZoomed`; (c) `skeletons` includes chain, branch and ring.
- **9th explanation:** "Every large molecule in a living thing has a backbone of **carbon**. A carbon atom makes four bonds, and it bonds to hydrogen, oxygen and nitrogen as well as to other carbons. That is why carbon can build straight chains, branched chains and rings, and why one element can make sugars, fats, proteins and DNA. **Say it: Carbon makes four bonds, to hydrogen, oxygen and nitrogen as well as to other carbons, and its chains can branch and close into rings.**"
- **DE explanation:** "Carbon's valence of four, with bonds to H, O, N, S and P, lets it form chains, branches and rings, and a carbon with four different groups attached is asymmetric, so the molecule can exist as two mirror-image forms. The groups hung on the skeleton decide behaviour: glucose's hydroxyls make it polar; the amino acid carries an amino group and a carboxyl group, and its R group is what differs among the twenty. **Say it: Carbon's four bonds build the skeleton; the functional groups on it decide how the molecule behaves.**"
- **What you found prompt:** "What did each carbon you tapped bond to?"

**S2 · Build a chain (dehydration synthesis)**

- **pre:** N3 / D3. **post:** N1, N12 / D4.
- **Scene:** drag units from the tray into the lane. Each new link ejects one water to the counter. The four goal chips are the `MACRO_DATA.builds` targets: starch 10 → 9 waters, protein 5 → 4, DNA 6 → 5, fat (glycerol + 3 fatty acids) → 3. The fat is drawn as an E-shape (glycerol with three tails), **never as a chain**, and its chip reads "Lipids are built from smaller pieces, glycerol and fatty acids, but they do not form long repeating chains, so scientists don't call them polymers."
  - **Mixed units refuse to link.** Dropping an amino acid on a sugar chain bounces it: "A protein is built only from amino acids."
  - **The DNA trap.** The tray also holds one finished DNA strand. Dropping it in as if it were a single unit triggers: "DNA is already a chain. Its units are nucleotides." The strand returns to the tray. (`dnaTrapSeen` goes true; optional.)
  - **Fructose** sits in the tray beside glucose as a second sugar hexagon. It joins carbohydrate chains, and its label reads "fructose (a sugar)". Starch is all glucose, so **the starch goal counts only a chain of 10 glucose with no fructose**, and at DE only an all-α chain (a β 10-chain is cellulose and does not meet it).
  - **DE:** a `Glucose: α / β` toggle. α builds amylose (tiles all one way up); β builds cellulose (every other tile flipped). `Tails: saturated / unsaturated` draws the fatty acids straight or with one kink. Link labels read glycosidic linkage, peptide bond, phosphodiester linkage and ester linkage. A `Branch` marker lets students hang a side chain off a glucose chain to make glycogen; the counter still adds one water per link.
- **Task:** Build all four. Try to join two different kinds of unit, and see what happens.
- **Goals:** (a)–(d) each `builds` target completed: a chain (or the fat) exists in the lane with the target's units and `links` equal to the target's `waters`. The water counter is cumulative across builds and is not what the goal reads.
- **9th explanation:** "A **monomer** is one small unit; a **polymer** is a long chain of them. Each time two monomers join, a water molecule comes out: that is **dehydration synthesis** (dehydration = water out; synthesis = putting together). Ten glucose make a starch chain with nine links, so nine waters. Each polymer has its own monomer: sugars build carbohydrates, amino acids build proteins, nucleotides build nucleic acids. DNA is not a monomer; it is a polymer of nucleotides. Lipids are built from smaller pieces, glycerol and fatty acids, but they do not form long repeating chains, so scientists don't call them polymers. **Say it: Water comes out at every link, and one kind of monomer builds one kind of polymer.**"
- **DE explanation:** "Condensation (dehydration) joins monomers: an –OH from one and an –H from the other leave as water, and a covalent linkage forms. The linkage is named by class: glycosidic between sugars, peptide between amino acids, phosphodiester in a nucleic-acid backbone, ester between glycerol and a fatty acid. *n* monomers make *n* − 1 linkages and release *n* − 1 waters, branched or not. α and β glucose differ only at carbon 1, yet α 1–4 chains coil into starch and β 1–4 chains lie straight and stack into cellulose. A triglyceride is three ester linkages on glycerol: built by condensation, but not a polymer. **Say it: n monomers, n − 1 linkages, n − 1 waters; the linkage is what makes each class different.**"
- **What you found prompt:** "How many waters came out for each thing you built, and why that number?"

**S3 · Split it (hydrolysis)**

- **pre:** N2 / D5. **post:** N11 / D6. A-item **A2** (9th, Advanced).
- **Scene:** drag an enzyme from the dock onto a chain. It walks the chain and cuts at each link, pulling one water from the counter into each cut; "Water in" counts up as the links count down.
  - **Wrong enzyme, wrong chain:** nothing happens, with a tag "✕ can't cut" and the reason ("Amylase only splits links between sugars").
  - **Cellulose (DE):** amylase slips on a β chain: "✕ can't cut: β links".
  - **The egg:** `Split a meal: egg` drops an egg's molecules into the lane: a protein chain (the white), a fat (the yolk) and a short DNA strand (from the egg's cells), with a short sugar chain at DE. Splitting all of them with the right enzymes ends as a tray of single units, sorted by kind: sugars, amino acids and nucleotides, plus the glycerol and fatty acids from the fat.
  - **Heat (skillet):** heating a folded protein chain unfolds it (drawn going from a compact fold to a loose strand). **No link breaks, no water moves**, and the tag reads "denatured: same chain, new shape". At DE a short step card explains denaturing vs hydrolysis.
  - **The DNA enzyme** is in the dock at both levels (hook name `nuclease`): labelled "An enzyme that splits DNA" at 9th and "Nuclease" at DE. Trypsin is DE only.
- **Task:** Split one chain with the right enzyme and watch the water counter. Try an enzyme on the wrong chain. Then take the whole egg apart, and heat one protein.
- **Goals:** (a) one chain fully split, with `waterIn` equal to that chain's links; (b) `wrongEnzymeTried ≥ 1`; (c) the egg fully split; (d) `denatured ≥ 1` (both levels).
- **9th explanation:** "**Hydrolysis** runs the build backward: one water goes back in at each link, and the chain breaks into its monomers (hydro = water; lysis = splitting). Your body does this when it digests food. Each digestive **enzyme** is a protein that splits only its own kind of link, so amylase splits starch, pepsin splits proteins and lipase splits fats. Cooking is different: heat **denatures** a protein, unfolding its shape without breaking its chain. **Say it: Hydrolysis puts water in to split a chain, and each enzyme cuts only its own kind of link.**"
- **DE explanation:** "Hydrolysis adds one H₂O across each linkage it breaks, so fully hydrolyzing an *n*-mer consumes *n* − 1 waters. Specificity comes from the enzyme's active site matching the linkage: amylase hydrolyzes α-glycosidic linkages and fails on cellulose's β linkages; pepsin and trypsin hydrolyze peptide bonds; lipase hydrolyzes ester linkages; nucleases hydrolyze phosphodiester linkages. Denaturation is different in kind: heat or extreme pH disrupts the hydrogen bonds, ionic interactions and hydrophobic packing that hold secondary, tertiary and quaternary structure, while the primary sequence and every peptide bond stay intact. **Say it: Hydrolysis breaks covalent linkages and consumes water; denaturation breaks only the weak interactions that hold a fold.**"
- **What you found prompt:** "What did the enzyme add at each cut, and what happened when you heated the protein?"

**S4 · Sort by job**

- **pre:** N7 / D7. **post:** N8 / D8. A-item **A1** (9th, Advanced).
- **Scene:** eight example cards to drag into the four bins: **cotton** (carbohydrate), **maple syrup** (carbohydrate), **a seal's blubber** (lipid), **the oily double layer of a cell membrane** (lipid), **spider silk** (protein), **an enzyme in your saliva** (protein), **a cheek-swab DNA test** (nucleic acid), **the sugar name tags on a cell's surface** (carbohydrate). A wrong drop bounces with its reason.
  - Then the **Venn**: a carbohydrate circle and a lipid circle. Statement chips to drop: *quick energy*, *plant cell walls*, *name tags on cells* (carbohydrate only); *long-term energy storage*, *insulation*, *membranes*, *some hormones* (lipid only); *stores energy*, *sugars and fats are made only of carbon, hydrogen and oxygen* (both).
  - **DE adds** to each bin's reveal one structural reason (e.g. "blubber: long hydrocarbon tails pack energy and repel water"; "spider silk: β-pleated sheets stacked into crystals").
- **Task:** Sort the eight cards, then fill the Venn.
- **Goals:** (a) all eight cards in the right bins; (b) all nine Venn chips in the right regions.
- **9th explanation:** "What a molecule is made of decides what it can do. **Carbohydrates** are quick energy and the stiff walls of plant cells. **Lipids** store energy for the long term, insulate, and make the double layer of every membrane. **Proteins** do the work and build the structures. **Nucleic acids** carry the instructions. Carbohydrates and lipids both store energy, so that job goes in the middle. **Say it: Carbohydrates are quick energy and plant walls; lipids store energy, insulate and make membranes; proteins build and work; nucleic acids carry instructions.**"
- **DE explanation:** "Function follows structure. Glucose polymers store energy compactly (starch, glycogen) or, with β linkages and hydrogen-bonded microfibrils, become structural (cellulose). Hydrocarbon tails make triglycerides energy-dense and hydrophobic, and phospholipids amphipathic, which is why they self-assemble into bilayers. A protein's function depends on its folded shape, which its primary sequence specifies. Nucleic acids store information in base sequence. **Say it: For each class, the structure explains the job.**"
- **What you found prompt:** "Which card did you get wrong first, and what is the job that sorts it?"

**S5 · Read the parts**

- **pre:** N5 / D9. **post:** N6 / D10.
- **Scene:** six unlabeled drawings appear in the lane one at a time: a hexagon chain; a circle chain; a nucleotide chain; glycerol with three tails; a phospholipid (round head, two tails); ATP (adenine + ribose + three phosphates; at 9th labelled and narrated "adenine + five-carbon sugar + three phosphates"). For each, students drop it in a bin **and** pick its job from four chips. ATP goes in the nucleic-acid bin and its reveal reads: "a single nucleotide that carries energy, not a chain".
  - **Job chips** (the same four for every drawing): *quick energy and plant walls*, *long-term energy storage, insulation and membranes*, *structure and work, like enzymes*, *carries instructions or energy as a nucleotide*. Answers: hexagon chain → carbohydrate, quick energy and plant walls; circle chain → protein, structure and work; nucleotide chain → nucleic acid, carries instructions; glycerol with three tails → lipid, long-term energy storage; phospholipid → lipid, membranes (same chip); ATP → nucleic acid, carries energy as a nucleotide.
  - **The word-part drill** runs under the bins: tap the meaning for all ten word parts in §4.2 (mono-, poly-, -mer, -ose, -ase, -saccharide, hydro-, -lysis, de-, syn-), then label three words with their parts: **fructose** (sugar), **amylase** (enzyme), **hydrolysis** (water + splitting).
  - **DE adds** two drawings: an RNA chain beside a DNA chain (the 2′ –OH circled on ribose), and a protein drawn at four levels (chain, helix and sheet, fold, two chains together).
- **Task:** Name the group and the job for each drawing, then finish the word drill.
- **Goals:** (a) every drawing placed in the right bin with the right job (retries allowed); (b) the word drill complete.
- **9th explanation:** "You can name a molecule from its parts. Hexagons in a chain are sugars, so it is a carbohydrate. Circles in a chain are amino acids, so it is a protein. A unit with a phosphate, a five-carbon sugar and a base is a nucleotide, and a chain of them is a nucleic acid. Glycerol with three tails is a fat. Word parts help too: **-ose** means sugar, so fructose is a sugar, not a lipid piece; **-ase** means enzyme. **Say it: The parts give the group away: hexagons are sugars, circles are amino acids, phosphate-sugar-base is a nucleotide.**"
- **DE explanation:** "Diagnostic features: rings of C and O with many –OH (carbohydrate); N–C–C repeats with R groups (protein); a phosphate–pentose backbone with bases (nucleic acid; ribose's 2′ –OH marks RNA); long C–H tails (lipid, with a phosphate head for a phospholipid). ATP is a ribonucleotide triphosphate, the same parts as an RNA monomer. Protein structure: primary is the sequence, secondary the backbone hydrogen-bonded helices and sheets, tertiary the whole fold set by R-group interactions, quaternary the assembly of more than one chain. **Say it: Read the parts: ring and –OH, N–C–C and R, phosphate–sugar–base, or long C–H tails.**"
- **What you found prompt:** "Which drawing fooled you, and which part should have given it away?"

**S6 · Test a food**

- **pre:** N9 / D11. **post:** N10 / D12.
- **Scene:** a virtual spot plate across the whole stage. Rows are foods (§4.1 `foods`, with the two DE-only rows at DE); columns are the four tests. Students drag an indicator bottle onto a well, or tap bottle then well. The well colour follows `MACRO_DATA` exactly.
  - **Predict first:** before each drop, tapping a well asks "Will it change? Yes / No". The prediction is recorded, not graded, and the result is shown beside it.
  - **Benedict's needs heat.** Before `Hot bath`, every Benedict's well stays blue. `Hot bath` heats every Benedict's well filled at that moment; a Benedict's drop added afterwards stays blue until `Hot bath` is tapped again. A small "about 85 °C" tag shows at DE. Under reduced motion the colour changes in one jump.
  - **Paper spot** is drawn as a brown-paper square beside the plate; the spot fades for "none", stays faintly see-through for "trace" and clearly see-through for "strong".
  - At DE, the Biuret note "pink for short peptide fragments" appears in the key.
- **Task:** Test water with all four. Then test every food with every indicator. Predict before each drop.
- **Goals:** (a) water tested with all four; (b) at least one positive found with each of the four tests; (c) Benedict's run once unheated and once heated on the same food; (d) every visible well filled (6 rows × 4 tests at 9th, water included; 8 × 4 at DE).
- **9th explanation:** "An **indicator** is a chemical that changes colour when it finds one kind of molecule. Iodine turns blue-black with starch. Benedict's turns green, then orange, then brick red with sugars like glucose, but only after heating. Biuret turns violet with protein. Fat leaves a see-through spot on brown paper. Water is the **control**: it shows what 'no' looks like, so you can tell a real change from no change. **Say it: Each indicator finds one group, and water is the control that shows what 'no' looks like.**"
- **DE explanation:** "Benedict's detects reducing sugars: their free carbonyl reduces Cu²⁺ to brick-red Cu₂O, but only with heat. Sucrose, whose two sugars are joined at both carbonyl carbons, is non-reducing and stays blue until hydrolyzed. Iodine slips inside the amylose helix (blue-black). Biuret's Cu²⁺ complexes with peptide bonds (violet for whole proteins, pink for short peptides). Lipids leave a translucent spot because they do not evaporate. Every test needs its negative control (water) and a known positive (here, glucose for Benedict's), so a food's colour can be judged against both. **Say it: A test is only as good as its controls: water for 'no', a known sample for 'yes'.**"
- **What you found prompt:** "Which food had the most groups in it, and how do you know?"

## 7. Words on screen

### 7.1 9th grade

A technical term may appear only if it is in these lists or is defined where it appears. Everyday words (cell, membrane, element, ion, energy) are fine.

- **Met in Module 1:** hydrogen bond, covalent bond, polar, macromolecule, monomer, polymer, carbohydrate, lipid, protein, nucleic acid, nucleotide, amino acid, enzyme, active site, substrate, catalyst, reactant, product, pH, dehydration synthesis, hydrolysis, monosaccharide, glucose, fructose, starch, cellulose, glycerol, fatty acid, DNA, RNA, carbon, hydrogen, oxygen, nitrogen, atom, bond, molecule, water.
- **Define on screen**, as "Words in this step" chips plus an inline definition at first use in each explanation that uses them:
  - glycogen: "the animal body's starch";
  - hormone: "a chemical signal carried through the body";
  - phospholipid: "a lipid with a water-loving head and two water-avoiding tails";
  - denature: "unfold, without breaking the chain";
  - indicator: "a chemical that changes colour when it finds one kind of molecule";
  - control: "a sample you already know the answer for";
  - Calories per gram: "how much energy a gram of food holds";
  - ATP: "a nucleotide that carries energy";
  - insulation: "a layer that keeps heat in";
  - phosphate: "a small group of phosphorus and oxygen, one of a nucleotide's three parts";
  - base: "the part of a nucleotide that carries its letter: A, T, G, C or U".
- **Names allowed as names:** amylase, pepsin, lipase, Benedict's, iodine, Biuret, ATP, adenine, A, T, G, C, U, and the foods and example cards in §6.

```js
const NINTH_FORBIDDEN = ["glycosidic","peptide","polypeptide","dipeptide","ester","phosphodiester","condensation",
 "alpha","beta","α","β","amylose","amylopectin","saturated","unsaturated","triglyceride","primary structure",
 "secondary structure","tertiary","quaternary","R group","R-group","functional group","hydroxyl","carboxyl",
 "amino group","isomer","asymmetric","amphipathic","hydrophobic","hydrophilic","reducing sugar","non-reducing",
 "Sudan","chitin","ribose","deoxyribose","pentose","trypsin","nuclease","cellulase","valence","kcal","Cu²⁺","Cu₂O",
 "2′","3′","5′","pyrophosphate","hydrocarbon","microfibril","pleated","ribonucleotide","triphosphate"];
// Whole word, case-insensitive. "ATP" is allowed (defined chip). "five-carbon sugar" is the 9th name for ribose.
// "unsaturated" and "saturated" are both forbidden at 9th; so are the α/β symbols.
```

### 7.2 DE

DE may use every word above plus the forbidden list, and: linkage, monosaccharide/disaccharide/polysaccharide, galactose, sucrose, maltose, lactose, glycogen granule, phospholipid bilayer, steroid, cholesterol, R group, peptide bond, polypeptide, primary/secondary/tertiary/quaternary structure, α helix, β pleated sheet, denaturation, nucleoside, purine, pyrimidine, antiparallel, 5′ and 3′ ends.

### 7.3 Stage labels

**9th:** Tray · Build lane · Water out · Water in · Enzyme dock · Glucose · Fructose · Amino acid · Nucleotide · Glycerol · Fatty acid · Starch · Protein · DNA · Fat · Amylase · Pepsin · Lipase · An enzyme that splits DNA · Heat (skillet) · Carbohydrate · Lipid · Protein · Nucleic acid · Phosphate · Five-carbon sugar · Base · Water (control).

**DE:** all of the 9th labels, plus Glycosidic linkage · Peptide bond · Ester linkage · Phosphodiester linkage · Links · α glucose · β glucose · Amylose · Cellulose · Glycogen (branched) · Saturated · Unsaturated (kink) · Triglyceride · Nuclease · Trypsin · Ribose · Deoxyribose · 2′ –OH · 5′ end · 3′ end · R group · Primary / Secondary / Tertiary / Quaternary · Glucose solution (known positive) · Table sugar.

**Every level:** no string may call a lipid, a fat or a triglyceride a **polymer**, or call fatty acids or glycerol **monomers**, except wrong options and `miss` notes, which state misconceptions on purpose (T6).

### 7.4 Look

- Group colours are `MACRO_DATA.groups` exactly, with their dark variants: carbohydrate `#C98A2E`, protein `#1F7A8C`, lipid `#B85042`, nucleic acid `#6B4E8C`; water `#4FA3D9`. These are the colours Carbon Check (Bio Tool #3) already uses.
- Shapes: **hexagon** = sugar; **circle** = amino acid (and the phosphate inside a nucleotide, drawn smaller); **small pentagon** = five-carbon sugar; **rounded rectangle** = base; **capsule** = fatty-acid tail; **E-shape** = glycerol with its three tails attached.
- Every group is told apart by **shape and a text tag**, never by colour alone. Bins carry the group's shape as an icon.
- **Contrast:** carbohydrate and water fall below 3:1 on the light background, so every group and water sprite carries a 2 px `var(--ink)` outline, and text labels are always `var(--ink)` or `var(--card)`, never a group colour.
- Labels ≥16 CSS px on the iPad setting; key labels larger. Fills an iPad in landscape (1180 × 820) without page scroll in Fill screen.

## 8. The 9th-grade bank (N1–N13, A1–A2)

Use this data exactly: the stems, option order, keys and the `why` and `miss` texts. Render items as the Energy Patch does. `src` is for Reid and is never rendered. Keys are spread A 4 · B 4 · C 3 · D 4.

N1–N12, A1 and A2 were written in Leg 1 and distance-checked there against the CLT Module 1 summative, the CLT LT 1.2 reassessment and the Canvas Original #13 practice check (no stem within 0.60 of any of them; no shared option set). Leg 2 added N13 (S1 needed a post item), every `miss`, and two small accuracy edits (N5's cotton and wood; N8's wording), recorded in §12.

```js
// 9th-grade bank. Permanent numbers: N1–N13, A1–A2. Never renumber; retire with retired:true.
// key = index (0–3) of the right option. miss = note for each wrong option.
// adv:true = shown only with Advanced Biology on, with an "Advanced Biology" badge; optional, never blocks a step.
const BANK9 = [
{n:"N4", step:"S1", role:"pre", topic:"What carbon bonds to",
 stem:"When you zoom into one glucose piece, each carbon atom will have four lines coming off it. What do those lines connect the carbon to?",
 opts:["carbon, hydrogen and oxygen atoms","only other carbon atoms","only oxygen atoms","nothing; the lines show the carbon is charged"], key:0,
 why:"Each line is a bond, and carbon bonds to hydrogen and oxygen as well as to other carbons. Tap a carbon in the zoom to see its four.",
 miss:{1:"Tap a carbon in the ring: most of its bonds go to hydrogen or oxygen. Carbon bonds to many elements, not only to itself.",
       2:"Some carbons bond to an oxygen, but each one also bonds to hydrogen or to another carbon. Count all four lines.",
       3:"The lines are bonds, shared electrons that hold atoms together. A carbon in glucose carries no charge."},
 src:"M1-11 distractor (carbon bonds only with carbon); card S1"},

{n:"N13", step:"S1", role:"post", topic:"The element proteins add",
 stem:"Zoom into an amino acid. It has one element that the glucose ring does not have. Which element is it?",
 opts:["phosphorus","nitrogen","iron","sodium"], key:1,
 why:"Every amino acid has a group containing nitrogen, and carbon bonds to that nitrogen. Glucose has only carbon, hydrogen and oxygen.",
 miss:{0:"Phosphorus is in nucleotides, as part of the phosphate. Amino acids don't need it.",
       2:"Iron is in a few special proteins, such as the one that carries oxygen in blood, but it is not part of an amino acid.",
       3:"Sodium is a dissolved ion, not part of an amino acid's structure."},
 src:"Leg 2, new; S1 amino-acid zoom"},

{n:"N3", step:"S2", role:"pre", topic:"What a link gives off",
 stem:"What happens every time two monomers snap together in the Patch?",
 opts:["A water molecule is used up.","The enzyme doing the joining is destroyed.","Each monomer changes into a different macromolecule group.","A water molecule is given off."], key:3,
 why:"Joining is dehydration synthesis: water comes out at every new link.",
 miss:{0:"That is the reverse. Water is used up when a chain is split, in hydrolysis.",
       1:"Enzymes are not used up. The same enzyme can help join or split link after link.",
       2:"The monomers stay the same kind. Glucose joined to glucose is still sugar, now in a chain."},
 src:"Card N3"},

{n:"N1", step:"S2", role:"post", topic:"Counting waters",
 stem:"You build a chain of 10 glucose molecules in the Patch. How many water molecules were released along the way?",
 opts:["10","11","9","1"], key:2,
 why:"One water leaves at each new link, and a chain of 10 has 9 links.",
 miss:{0:"Count the links, not the pieces. The first glucose had nothing to join to yet.",
       1:"Every link gives off one water, and 10 pieces in a row have only 9 links between them.",
       3:"One water comes out at every link, not once for the whole chain."},
 src:"Card N1; MACRO_DATA.builds.starch"},

{n:"N12", step:"S2", role:"post", topic:"Matching monomers",
 stem:"In the Patch you drag a nucleotide, a glucose and an amino acid together, and they will not join into one chain. Why not?",
 opts:["Each kind of polymer is built from its own kind of monomer.","All three are already polymers.","Monomers never join without heat.","Water molecules block the links."], key:0,
 why:"Starch is built from sugars, proteins from amino acids and nucleic acids from nucleotides; the Patch only links matching monomers.",
 miss:{1:"Each is a single small unit, a monomer. Polymers are the long chains built from them.",
       2:"Cells build chains at body temperature, with enzymes. Heat is not the missing piece.",
       3:"Water is given off when a link forms. It doesn't stop links from forming."},
 src:"Card N12"},

{n:"N2", step:"S3", role:"pre", topic:"Splitting takes water",
 stem:"Now you split that same 10-glucose chain back into single glucose molecules. How many water molecules have to be added?",
 opts:["0, because splitting gives water off","10, one for each glucose","9, one for each link that breaks","20, two for each glucose"], key:2,
 why:"Splitting runs the build backward: one water goes back in at each of the 9 links.",
 miss:{0:"Building gives water off. Splitting does the opposite: water goes in.",
       1:"Water goes in at each link that breaks, and 10 glucose in a row have 9 links.",
       3:"Each link takes one water, not two, and you count links, not glucose."},
 src:"Card N2"},

{n:"N11", step:"S3", role:"post", topic:"What pepsin adds",
 stem:"In your stomach, the enzyme pepsin cuts the proteins in a hamburger. What does pepsin add at each cut, and which group does pepsin itself belong to?",
 opts:["It removes water; carbohydrate.","It adds water; protein.","It adds water; lipid.","It removes water; protein."], key:1,
 why:"Cutting a chain is hydrolysis, so water is added. Enzymes like pepsin are proteins.",
 miss:{0:"Cutting adds water, and enzymes are proteins, not carbohydrates.",
       2:"Water is added, but pepsin is an enzyme, and enzymes are proteins, not lipids.",
       3:"Pepsin is a protein, but cutting a chain adds water. Removing water is how links are made."},
 src:"Card N11"},

{n:"A2", step:"S3", role:"post", adv:true, topic:"Why grass feeds a cow",
 stem:"A cow can live on grass, but the cellulose in your salad passes through you undigested. What is the best explanation?",
 opts:["Cellulose is a lipid, and people cannot digest lipids.","Microbes in a cow's gut make an enzyme that splits cellulose; people do not have it.","Grass contains no cellulose.","Cows add no water when they digest."], key:1,
 why:"Splitting cellulose takes a specific enzyme. People lack it, so cellulose is fiber.",
 miss:{0:"Cellulose is a carbohydrate, a chain of glucose. People digest plenty of lipids.",
       2:"Grass is full of cellulose; it makes the walls of every plant cell.",
       3:"Every digestion is hydrolysis, so water goes in at each cut, in cows and in people."},
 src:"Card A2"},

{n:"N7", step:"S4", role:"pre", topic:"Same bin",
 stem:"Maple syrup, a potato's starch and the cellulose in a tree trunk all go into the same bin. Which bin?",
 opts:["lipids, because syrup is sticky","proteins, because trees are strong","carbohydrates, because all three are built from sugar units","nucleic acids, because all three come from living things"], key:2,
 why:"Sugars, starch and cellulose are all built from sugar units, so they are carbohydrates.",
 miss:{0:"Sticky isn't a group. Syrup is sugar dissolved in water.",
       1:"A tree's strength comes from cellulose, a carbohydrate, not from protein.",
       3:"Every living thing has nucleic acids, but that doesn't put all its molecules in that group. Sort by building blocks."},
 src:"Card N7"},

{n:"N8", step:"S4", role:"post", topic:"The Venn",
 stem:"Which pair is sorted correctly?",
 opts:["insulation: lipids","plant cell walls: lipids","storing energy: carbohydrates only","genetic instructions: lipids"], key:0,
 why:"Insulation is a lipid job. Cell walls are carbohydrate (cellulose). Both carbohydrates and lipids store energy. Instructions belong to nucleic acids.",
 miss:{1:"Plant cell walls are cellulose, a carbohydrate. Lipids make the membrane inside the wall.",
       2:"Carbohydrates store energy, but so do lipids. That job goes in the middle of the Venn.",
       3:"Instructions are carried by nucleic acids, DNA and RNA."},
 src:"Card N8; M1-12 distractor (walls and insulation swapped)"},

{n:"A1", step:"S4", role:"post", adv:true, topic:"Energy in a gram",
 stem:"Fat holds about 9 Calories per gram; carbohydrate and protein hold about 4. A seed that has to carry a lot of energy in very little weight should store mostly –",
 opts:["protein, because it builds the seed coat","nucleic acid, because it carries the plan for the new plant","carbohydrate, because sugar gives quick energy","lipid, because fat packs the most energy into each gram"], key:3,
 why:"Fat packs more than twice the energy per gram.",
 miss:{0:"Proteins build structures, but they hold only about 4 Calories per gram.",
       1:"A seed does need its DNA, but DNA is a tiny share of its weight and isn't an energy store.",
       2:"Sugar is quick energy, but it holds about 4 Calories per gram; fat holds about 9."},
 src:"Card A1; MACRO_DATA.energyPerGram"},

{n:"N5", step:"S5", role:"pre", topic:"A chain of hexagons",
 stem:"The Patch shows a long, straight, unbranched chain of hexagons, the material of cotton and much of wood. What is it?",
 opts:["a protein","cellulose, a carbohydrate","a fatty acid","one molecule of RNA"], key:1,
 why:"A chain of sugar hexagons is a carbohydrate; this one is cellulose, the material of plant cell walls.",
 miss:{0:"Proteins are chains of amino acids, drawn as circles.",
       2:"A fatty acid is a single long tail, drawn as a capsule, not a chain of rings.",
       3:"RNA is a chain of nucleotides, each with a phosphate, a five-carbon sugar and a base."},
 src:"Card N5 (cotton/wood wording edited in Leg 2)"},

{n:"N6", step:"S5", role:"post", topic:"Reading a nucleotide chain",
 stem:"A long chain is drawn where every unit has a pentagon, a circle and a rounded rectangle. What job would you expect this molecule to do?",
 opts:["insulate the body","store quick energy","speed up a reaction","carry the instructions for building proteins"], key:3,
 why:"Phosphate + five-carbon sugar + base is a nucleotide; a chain of them is a nucleic acid, which carries instructions.",
 miss:{0:"Insulation is a lipid job, and lipids are drawn as long tails.",
       1:"Quick energy is a carbohydrate job; those chains are hexagons.",
       2:"Speeding up reactions is what enzymes do, and enzymes are proteins: chains of circles."},
 src:"Card N6; M1-10 (glucose and RNA from structures)"},

{n:"N9", step:"S6", role:"pre", topic:"Iodine on potato",
 stem:"Iodine turns a slice of raw potato blue-black. What did the test find?",
 opts:["starch, a carbohydrate","protein","fat","DNA"], key:0,
 why:"Iodine turns blue-black with starch.",
 miss:{1:"Protein is found with Biuret, which turns violet.",
       2:"Fat is found with the brown-paper spot test.",
       3:"None of these food tests finds DNA."},
 src:"Card N9; MACRO_DATA.foods.potato"},

{n:"N10", step:"S6", role:"post", topic:"Biuret on egg white",
 stem:"A drop of egg white turns violet when Biuret is added. Which monomers built the molecules the test found?",
 opts:["sugar units like glucose","the long tails found in fats","units with a base, a sugar and a phosphate","amino acids, linked into chains"], key:3,
 why:"Biuret turns violet with protein, and proteins are chains of amino acids.",
 miss:{0:"Sugars are found with Benedict's or iodine, not Biuret.",
       1:"Fats are found with the paper spot. Biuret finds protein.",
       2:"Those are nucleotides, the units of DNA and RNA. Biuret finds protein."},
 src:"Card N10; MACRO_DATA.foods.eggwhite"}
];
```

## 9. The DE bank (D1–D12)

The same rendering as §8, plus `sam`, shown after `miss` as in the Checkpoint Companion. Keys are spread A 3 · B 3 · C 3 · D 3. None repeats a Checkpoint Companion Chapter 3 stem (compared in Leg 2), and none uses Pearson wording.

```js
// DE bank. Permanent numbers: D1–D12. Never renumber. sam = Student-Authored Module prompt per wrong option.
const BANKDE = [
{n:"D1", step:"S1", role:"pre", topic:"An asymmetric carbon",
 stem:"One carbon in a molecule is bonded to –H, –OH, –CH₃ and –COOH. What follows from those four attachments?",
 opts:["The carbon is asymmetric, so the molecule can exist as two mirror-image forms","The carbon must carry a positive charge","The carbon can still form a fifth bond to nitrogen","All four groups lie flat in one plane"], key:0,
 why:"Four different groups on one tetrahedral carbon make it asymmetric (a chiral centre). Its mirror image cannot be superimposed on it, so the molecule has two enantiomers.",
 miss:{1:"Four shared bonds fill carbon's valence exactly; nothing here gives it a charge.",
       2:"Carbon's valence is four. Four groups already fill it.",
       3:"Four single bonds point to the corners of a tetrahedron, not into one plane."},
 sam:{1:"Write a SAM question that asks students to check the valence of every atom in a drawn molecule.",
      2:"Write a SAM question on why carbon forms exactly four covalent bonds.",
      3:"Write a SAM question contrasting the shape around a single-bonded carbon with a double-bonded one."},
 src:"Concept: carbon skeletons and isomers"},

{n:"D2", step:"S1", role:"post", topic:"What hydroxyls do",
 stem:"The zoom shows glucose carrying five hydroxyl groups. What do they give the molecule?",
 opts:["Acidity: each –OH releases H⁺ in water","Hydrophobicity, so glucose clusters away from water","Polarity: each –OH can hydrogen-bond to water, so glucose dissolves","Stored energy in the O–H bonds that cells spend first"], key:2,
 why:"The hydroxyl group is polar. Its O–H hydrogen-bonds with water, which is why sugars dissolve readily.",
 miss:{0:"Releasing H⁺ is what a carboxyl group does. Hydroxyls are not acidic in this sense.",
       1:"Hydroxyls make a molecule more water-loving, not less.",
       3:"Energy is harvested by oxidizing C–H bonds; the –OH groups are about polarity."},
 sam:{0:"Write a SAM question that asks which functional groups act as acids or bases in a cell.",
      1:"Write a SAM question ranking three molecules by solubility from the groups they carry.",
      3:"Write a SAM question on which bonds in glucose carry the energy cells extract."},
 src:"Concept: functional groups"},

{n:"D3", step:"S2", role:"pre", topic:"Water from a branched polymer",
 stem:"A liver cell builds a glycogen particle from 1,000 glucose units, with 80 branch points. Counting by the water rule (one water per linkage, net), how many water molecules does that release?",
 opts:["1,000","999","919","1,079"], key:1,
 why:"Every unit after the first joins by exactly one glycosidic linkage, whether that link extends a chain or starts a branch. 1,000 units, 999 linkages, 999 waters.",
 miss:{0:"Count linkages, not units: the first glucose joins nothing.",
       2:"A branch point is still a linkage that releases a water. Branches do not subtract.",
       3:"A branch adds no extra linkage beyond the one that attaches each unit."},
 sam:{0:"Write a SAM question that asks for the number of waters released by an n-unit linear polymer.",
      2:"Write a SAM question showing that a branched polymer of n units still has n − 1 linkages.",
      3:"Write a SAM question that has students draw a small branched polymer and count its linkages."},
 src:"MACRO_DATA water rule; Leg 2"},

{n:"D4", step:"S2", role:"post", topic:"α and β",
 stem:"In the DE build lane, switching from α to β glucose flips every other tile and turns amylose into cellulose. What does the flip represent?",
 opts:["A branch at carbon 6","A different monosaccharide, fructose, in every second position","Peptide bonds replacing glycosidic linkages","β 1–4 linkages, in which successive glucose units are inverted relative to each other"], key:3,
 why:"α and β glucose differ only in the position of the –OH on carbon 1. Linking β glucose 1–4 inverts every other unit, giving straight chains that hydrogen-bond side by side into cellulose microfibrils.",
 miss:{0:"A branch would leave the chain at carbon 6. The flip happens within an unbranched chain.",
       1:"Cellulose is all glucose. Only the linkage geometry changes.",
       2:"Peptide bonds join amino acids. Both polymers here use glycosidic linkages."},
 sam:{0:"Write a SAM question contrasting amylose, amylopectin and glycogen by branching.",
      1:"Write a SAM question on how two polymers of the same monomer can have different properties.",
      2:"Write a SAM question that names the linkage for each class of polymer."},
 src:"Concept: carbohydrate structure"},

{n:"D5", step:"S3", role:"pre", topic:"Frying vs digesting",
 stem:"Frying an egg turns the white opaque and firm. Digesting the same egg white releases free amino acids. Which describes the two events?",
 opts:["Frying denatures the proteins; digestion hydrolyzes their peptide bonds","Both hydrolyze peptide bonds","Frying hydrolyzes peptide bonds; digestion only unfolds the proteins","Frying forms new peptide bonds by dehydration"], key:0,
 why:"Heat disrupts the hydrogen bonds and other weak interactions that hold each protein's fold, so the chains unfold and tangle; no peptide bond breaks. Digestion uses proteases and water to hydrolyze the peptide bonds themselves.",
 miss:{1:"A fried egg white still has its full chains. Free amino acids appear only when peptide bonds are hydrolyzed.",
       2:"That is backwards. Unfolding is denaturation; free amino acids require hydrolysis.",
       3:"Frying makes no new peptide bonds; the chains unfold and stick to each other through weak interactions."},
 sam:{1:"Write a SAM question that asks what evidence would show peptide bonds were broken.",
      2:"Write a SAM question that sorts five treatments into denaturing or hydrolyzing.",
      3:"Write a SAM question on which interactions hold secondary and tertiary structure."},
 src:"Concept: denaturation vs hydrolysis; Canvas Original #13 egg"},

{n:"D6", step:"S3", role:"post", topic:"Enzyme specificity",
 stem:"Lipase is added to a starch solution at 37 °C and pH 7. After 30 minutes the mixture is tested with iodine. What result do you expect?",
 opts:["Yellow-brown, because lipase hydrolyzes any polymer","Yellow-brown, because water alone hydrolyzes starch that fast","Blue-black, because lipase hydrolyzes ester linkages, not glycosidic linkages","Blue-black, because lipase builds more starch"], key:2,
 why:"Each enzyme's active site fits one kind of linkage. Lipase hydrolyzes the ester linkages of fats, so the starch is untouched and iodine still turns blue-black.",
 miss:{0:"Enzymes are specific. Lipase's active site fits ester linkages, not the glycosidic linkages in starch.",
       1:"Uncatalysed hydrolysis of starch at body temperature is far too slow to clear it in 30 minutes.",
       3:"Lipase is a hydrolase. It does not build polysaccharides."},
 sam:{0:"Write a SAM question that pairs four enzymes with the linkage each hydrolyzes.",
      1:"Write a SAM question on why a reaction can be favourable yet too slow without an enzyme.",
      3:"Write a SAM question on what the suffix -ase tells you and what it does not."},
 src:"Concept: enzyme specificity; Lab 2 iodine"},

{n:"D7", step:"S4", role:"pre", topic:"Phospholipids",
 stem:"A phospholipid is like a triglyceride with one fatty acid replaced by a phosphate group carrying a small charged group. What does that change give it?",
 opts:["It becomes a polymer","A hydrophilic head and hydrophobic tails, so in water it forms a bilayer","Full solubility in water, like glucose","More energy per gram than a triglyceride"], key:1,
 why:"The charged phosphate head is hydrophilic and the two tails are hydrophobic, so the molecule is amphipathic. In water, phospholipids self-assemble with their tails inward: the bilayer of every membrane.",
 miss:{0:"Neither triglycerides nor phospholipids are polymers; neither is built from repeating units.",
       2:"The two tails remain strongly hydrophobic, so phospholipids form bilayers and micelles, not a true solution.",
       3:"Replacing a fatty acid with a phosphate group removes a C–H-rich tail, so it stores less energy, not more."},
 sam:{0:"Write a SAM question that asks why lipids are not considered polymers.",
      2:"Write a SAM question on what happens to phospholipids when they are mixed with water.",
      3:"Write a SAM question comparing the energy stored in a triglyceride and a phospholipid."},
 src:"Concept: lipids"},

{n:"D8", step:"S4", role:"post", topic:"Levels of protein structure",
 stem:"A protein's job depends on its three-dimensional shape. Which pairing is correct?",
 opts:["Primary structure: hydrogen bonds between R groups","Secondary structure: the order of amino acids","Quaternary structure: the fold of a single chain","Tertiary structure: the overall fold, set by interactions among R groups"], key:3,
 why:"Primary is the sequence; secondary is the α helices and β sheets held by backbone hydrogen bonds; tertiary is the full fold of one chain, set by R-group interactions; quaternary is how two or more chains fit together.",
 miss:{0:"Primary structure is the amino-acid sequence, held by peptide bonds.",
       1:"The order of amino acids is primary structure.",
       2:"Quaternary structure needs two or more polypeptide chains."},
 sam:{0:"Write a SAM question that matches each level of protein structure to the bonds that hold it.",
      1:"Write a SAM question on how one change in sequence can change a protein's fold.",
      2:"Write a SAM question giving an example of a protein with quaternary structure."},
 src:"Concept: protein structure"},

{n:"D9", step:"S5", role:"pre", topic:"The 2′ carbon",
 stem:"A nucleic-acid strand is isolated. Every sugar in its backbone carries an –OH on its 2′ carbon. Which conclusion is supported?",
 opts:["The sample is RNA, because ribose has a 2′ –OH that deoxyribose lacks","The sample is DNA, because every nucleic-acid sugar has a 2′ –OH","The sample cannot contain ATP","The sample must contain thymine"], key:0,
 why:"Deoxyribose is ribose minus the oxygen at carbon 2′. A 2′ –OH marks ribose, so the strand is RNA.",
 miss:{1:"DNA's sugar is deoxyribose: 'deoxy' means it lacks the 2′ oxygen.",
       2:"ATP's sugar is ribose, so it has a 2′ –OH too.",
       3:"Thymine is DNA's base; RNA uses uracil."},
 sam:{1:"Write a SAM question asking what 'deoxy' in deoxyribose refers to.",
      2:"Write a SAM question linking ATP's structure to RNA nucleotides.",
      3:"Write a SAM question listing two differences between DNA and RNA nucleotides."},
 src:"Concept: nucleic acids"},

{n:"D10", step:"S5", role:"post", topic:"The backbone",
 stem:"In a strand of DNA or RNA, what does each phosphate in the backbone connect?",
 opts:["The base of one nucleotide to the base of the next","The phosphate of one nucleotide to the base of the next","The 3′ carbon of one sugar to the 5′ carbon of the next, giving the strand a 5′ end and a 3′ end","The 1′ carbon of one sugar to the 1′ carbon of the next"], key:2,
 why:"Phosphodiester linkages join the 3′ –OH of one sugar to the 5′ phosphate of the next. Because every link runs the same way, a strand has direction: a 5′ end and a 3′ end.",
 miss:{0:"Bases pair across strands by hydrogen bonds; they are not in the backbone.",
       1:"Bases hang off the sugar's 1′ carbon; the backbone is sugar–phosphate–sugar.",
       3:"Carbon 1′ holds the base, not the backbone link."},
 sam:{0:"Write a SAM question separating the bonds within a strand from the bonds between strands.",
      1:"Write a SAM question that has students label a nucleotide's 1′, 3′ and 5′ carbons.",
      3:"Write a SAM question on why a nucleic-acid strand has a direction."},
 src:"Concept: nucleic acids"},

{n:"D11", step:"S6", role:"pre", topic:"Sweet but negative",
 stem:"Table sugar (sucrose) dissolved in water stays blue after heating with Benedict's. The same solution is heated briefly with dilute acid, neutralized, and tested again: it turns orange. What explains the change?",
 opts:["Benedict's only works after acid is added","The acid hydrolyzed sucrose into glucose and fructose, which are reducing sugars","The acid denatured the sucrose","The acid added copper ions to the solution"], key:1,
 why:"Sucrose's two monosaccharides are joined through both of their carbonyl carbons, so it has no free carbonyl to reduce Cu²⁺. Acid hydrolysis releases glucose and fructose, both reducing sugars, so Benedict's turns positive.",
 miss:{0:"Benedict's works on glucose straight away; the acid changed the sugar, not the test.",
       2:"Denaturation applies to proteins' folded shapes. Sucrose has no fold to lose.",
       3:"The copper is in Benedict's itself. The acid provides H⁺ to catalyse hydrolysis."},
 sam:{0:"Write a SAM question on why a food can taste sweet and still give a weak Benedict's result.",
      2:"Write a SAM question that asks which molecules can be denatured and why.",
      3:"Write a SAM question on what is reduced and what is oxidized in a positive Benedict's test."},
 src:"Concept: reducing sugars; Lab 2 'good to know' note"},

{n:"D12", step:"S6", role:"post", topic:"Controls",
 stem:"In a spot-plate run like Lab 2's, each indicator is tested on distilled water and on a solution known to contain its target molecule before any food is tested. Why?",
 opts:["Water dilutes the indicator so it reacts faster","The known sample measures the exact concentration in each food","Controls are needed only when a food's result is positive","Water shows the indicator's negative colour and the known sample shows its positive colour, so each food's result can be judged against both"], key:3,
 why:"A negative control shows what 'no reaction' looks like with the same reagent and plate; a positive control proves the reagent works and shows what 'yes' looks like. Without both, an ambiguous colour cannot be called.",
 miss:{0:"The water is a separate well, not mixed into the indicator.",
       1:"These tests are qualitative. Colour intensity hints at amount but is not a measurement.",
       2:"A negative result needs a positive control too: it could mean the reagent failed."},
 sam:{0:"Write a SAM question asking what a negative control rules out.",
      1:"Write a SAM question contrasting a qualitative test with a quantitative one.",
      2:"Write a SAM question on how a failed reagent would look without a positive control."},
 src:"Lab 2 Day 1 controls (concept)"}
];
```

## 10. Acceptance tests

### 10.1 The test hook

Expose `window.__MP`, the way the Energy Patch exposes `window.__EP`. It must not change behaviour.

```js
window.__MP = {
  st: () => st,
  goStep(i),                                   // 0..5 = S1..S6
  setLevel("nine"|"de"), setAdv(true|false), setDev("ipad"|"pc"),
  fill(true|false), cardHidden(true|false),
  set(name, value),   // "glucoseForm" "alpha|beta" (DE), "tails" "sat|unsat" (DE), "teach" true|false, "zoom" "glucose|amino"
  zoomTapCarbon(k),   // S1: tap carbon k (0-based) in the current zoom; returns {bonds:4, to:["C","H","O",...]}
  skeleton("chain"|"branch"|"ring"),            // S1
  add(kind, chainId?),   // S2: kind "glucose"|"fructose"|"amino"|"nucleotide"|"glycerol"|"fatty"|"dnaStrand";
                         // returns {linked:true, chainId} or {linked:false, reason}
  branch(chainId, atIndex, kind),               // S2 DE: start a branch
  build(target),         // S2 convenience: builds a MACRO_DATA.builds target from scratch with add(); returns chainId
  chains(),              // [{id, group, units, links, form:"alpha|beta|null", folded:true|false, denatured:true|false}]
  enzyme(name, chainId), // S3: name "amylase"|"pepsin"|"lipase"|"nuclease"|"trypsin"; returns {cut:n} or {cut:0, reason}
  egg(),                 // S3: load the egg scene; returns its chainIds
  heat(chainId),         // S3: denature; returns the chain's links before and after
  sort(cardId, bin),     // S4: bin "carb"|"lipid"|"protein"|"nucleic"; returns true|false
  venn(chipId, region),  // S4: region "carb"|"lipid"|"both"
  read(drawingId, bin, job),                    // S5
  drill(partId, meaning),                       // S5
  test(food, reagent, heated?),                 // S6: returns the result word ("none"|"trace"|"strong"|"max") and the colour name shown
  predict(food, reagent, yesNo),                // S6
  answer(itemId, optionIndex),
  type(stepKey, text),                          // fill a "What you found" box
  counts(),  // { waterOut, waterIn, linksMade, linksBroken, wrongEnzymeTried, denatured, mixedRefused, dnaTrapSeen,
             //   carbonsTapped, aminoZoomed, skeletons:[], sorted, vennDone, readDone, drillDone, wellsDone, heatedBenedicts }
  stepDone(i), visSteps(),                      // as in the Energy Patch hook
  items(level), allText(level),                 // every string that level can show
  sprites(),            // [{kind, x, y, moving:boolean}] for every drawn sprite, scene world units
  colours(), fps(), requests()                  // requests(): every network URL the page has requested
};
```

### 10.2 The tests

- Run every test at **1180 × 820** in both device settings unless it says otherwise.
- Report each as PASS or FAIL, with a one-line reason for each FAIL.

| # | Test | How to check |
|---|---|---|
| **T1** | **The water rule (the oracle)** | S2, both levels: for every *n* from 2 to 12, build a glucose chain, an amino-acid chain and a nucleotide chain of *n* units; after each, `counts().waterOut` has risen by exactly *n* − 1 and the chain's `links` = *n* − 1. A fat (glycerol + 3 fatty acids) adds exactly 3. DE: a glycogen of 12 units with 2 branches adds exactly 11. S3: fully splitting each with the right enzyme raises `waterIn` by exactly its `links`, and the chain ends as single units. The on-screen counter text equals `counts()` once sprites land. |
| **T2** | **Each target in `MACRO_DATA.builds`** | `build("starch")`, `build("protein")`, `build("dna")`, `build("fat")` each add exactly that target's `waters`, and S2's goal chips tick. |
| **T3** | **Only matching units link; heat is not hydrolysis** | `add()` of an amino acid, nucleotide or glycerol onto a glucose chain (and every other cross-pair) returns `linked:false` with a reason, and `mixedRefused` rises. `add("dnaStrand", …)` returns `linked:false` and sets `dnaTrapSeen`. A glucose and a fructose may link. `enzyme()` with a non-matching enzyme returns `cut:0` and raises `wrongEnzymeTried`; at DE, `enzyme("amylase", celluloseChain)` returns `cut:0`. `heat()` on a protein leaves its `links` unchanged, leaves `waterIn`/`waterOut` unchanged, and sets `denatured:true`. |
| **T4** | **Food tests match `MACRO_DATA`** | S6, both levels: for every visible food × reagent, `test()` returns the `MACRO_DATA.foods` value, and the colour name follows §4.1's rule. Unheated Benedict's returns "none" for every food. Water returns "none" for all four. At 9th, the two DE-only rows are absent; at DE, table sugar is "none" for Benedict's even when heated, and the glucose control is "max" (brick red). |
| **T5** | **Data, not literals** | Every number and every test result on screen comes from `MACRO_DATA` (by code review: the build targets, energy figures and food table are read from it, never typed in elsewhere). Allowed literals: the item stems in §8–§9 (including D3's 1,000 / 80 / 999 / 919 / 1,079, and N1–N2's 9 / 10 / 11 / 20), "twenty amino acids", "about 85 °C", 37 °C, pH 7 and 30 minutes in D6, carbon's four bonds, the step counts, and the fixed numbers in the §6 explanations and §5.8 For-teachers text (e.g. "ten… nine links", "eight cards", "nine chips", "30 minutes", "12-minute"). List anything else. |
| **T6** | **Lipids are never polymers** | Over `allText(level)` at both levels **minus wrong options and `miss` notes**: no sentence matches `/\b(lipids?|fats?|triglycerides?|phospholipids?)\b[^.]{0,60}\bpolymers?\b/i` or `/\bfatty acids?\b[^.]{0,40}\bmonomers?\b/i` unless it also contains "not" or "don't"; and the phrase "tray of monomers" appears nowhere. The fat is never drawn as a chain: in `chains()`, a fat has `group:"lipid"` and exactly 4 units and 3 links, and no `add()` can attach a fifth piece to it. |
| **T7** | **9th-grade vocabulary** | For every string in `allText("nine")` and the rendered 9th DOM's visible text (`innerText`, so hidden DE controls don't count; excluding Sources and Mol\* captions): no `NINTH_FORBIDDEN` entry (whole word, case-insensitive). Every §7.1 "define on screen" word a step uses appears in that step's chips. |
| **T8** | **Steps, dots and levels** | Every step opens from its dot. `stepDone(i)` is true only when its pre, goals, every post item and "What you found" (≥8 chars) are done. A-items never block. `set("teach",true)` opens everything and makes no `stepDone` true. Switching level on any step keeps progress and changes text, labels, bank and eyebrow without a reload. `visSteps()` always lists all six. |
| **T9** | **Banks intact** | `items("nine")` = N1–N13 + A1–A2 and `items("de")` = D1–D12, exactly as §8–§9. A wrong answer shows its `miss` (plus `sam` at DE), then `why`. `src` never renders. A1–A2 appear only with Advanced Biology on. |
| **T10** | **Touch targets** | iPad setting: every button, option, chip and step dot has a rect ≥44 × 44. Canvas targets (tray pieces, chain ends, enzymes, bins, wells, zoom carbons) each get a **transparent DOM button laid over them** with an `aria-label` (e.g. "Glucose in the tray", "Open end of the starch chain"); those buttons count here too, and the tap-tap route (§5.3) completes every goal in S2–S6 without a single drag. Report any target under 48. |
| **T11** | **Layout** | At 1180 × 820 and 1180 × 750 with `fill(true)`: `scrollHeight <= innerHeight + 1`, and the canvas and controls lie inside the viewport. At 820 × 1180, 768 × 1024, 390 × 844 and 360 × 780: `scrollWidth <= innerWidth`, and the stage stays pinned while the card scrolls (scroll the card and check the canvas `getBoundingClientRect().top` is unchanged). |
| **T12** | **Colours are exact** | `colours()` reports the four group colours and water exactly as `MACRO_DATA` (light and dark). Every group sprite also differs by shape, and every bin carries its shape icon. |
| **T13** | **Reduced motion** | With `prefers-reduced-motion: reduce` emulated, two `sprites()` reads 50 ms apart, with no input between them, are identical. Every goal can still be met, and the counters still update. |
| **T14** | **Contrast** | For every pair in `colours()`, in light and dark (emulated) themes: label text vs its background ≥4.5:1, and each sprite's outline vs the stage ≥3:1. |
| **T15** | **Saving and privacy** | A reload restores level, Advanced, step, answers, goals and typed sentences. With `localStorage` throwing, the page loads and runs. `requests()` lists only the page and Google Fonts (Mol\* and OpenStax only after a Go further click). No `fetch`, `XMLHttpRequest`, `sendBeacon` or form `action` exists in the file. No console errors. |
| **T16** | **Accessibility labels** | The canvas has `role="img"` and its `aria-label` changes with the step. The `aria-live` line announces at least: a link made (with the water count), a refused drop (with the reason), a cut, and each food-test result. |
| **T17** | **Frame rate** (informational) | iPad setting, S3 with the egg being split, 5 s real time: report `fps()`. FAIL only if < 30 in headless Chromium. |
| **T18** | **Nothing else changed** | `git diff --name-only main...HEAD` lists **only** `biology/tools/macromolecule-patch.html`. |

### 10.3 The report back

Post one message with:

1. The branch, commit hash and PR link.
2. The T1–T18 table, for the iPad and Computer settings.
3. Screenshots at 1180 × 820:
   - 9th, S1 with a glucose carbon's four bonds highlighted;
   - 9th, S2 with the starch chain built and "Water out: 9";
   - 9th, S3 mid-split of the egg, with the heat tag on one protein;
   - 9th, S4 Venn finished;
   - DE, S2 with α and β chains side by side;
   - DE, S5 protein at four levels;
   - DE, S6 plate fully tested, Benedict's heated;
   - Teaching view with a pinned callout.
4. A screenshot at 820 × 1180, in portrait, with the stage pinned and the card scrolled.
5. Which Mol\* IDs loaded and which were left out.
6. Anything you could not do, or did differently, and why.

Then stop. Do not merge.

## 11. After Reid reviews (not part of this build)

These are listed so the builder knows they are deliberately left out.

- **Review on the iPad.** GitHub Pages serves only `main`, so a PR has no live preview. Reid reviews the screenshots and the branch file, then merges. The page is live at its URL from that moment, but unlisted until the steps below.
- **Classroom-tools hub:** list it as **Bio Tool #17** under **Unit 1 · Biochemistry** (SOL BIO.2b; PWCS LT 1.2), using the existing `<li>` pattern.
- **DE hub:** list it in **Unit 3 · Carbon and Molecular Diversity of Life**, following the hub's tools-first order.
- **Cross-links:** the Water Patch's Go further box can point here for macromolecules; the Energy Patch can link its glucose and ATP to S5.
- **Sitemap and search:** add the URL to `sitemap.xml` and rebuild `search-index.js` with `One Pagers/build-search-index.py` on the Mac, from the live files.
- **Canvas links** (ExternalUrl, new tab, linking to the site, never re-hosted):
  - Biology I 425631 and Adv Biology I 425639, mirrored: `Bio Tool #17: The Macromolecule Patch` under Module 1 Additional Study Materials; a button on the LT 1.2 remediation page that replaces Bridges 1, 2 and 5; next year, the Lesson 6 (Macromolecule Maker) and Lesson 7 (nutrition labels) Start Here pages.
  - DE (425646): the Unit 3 module and the Lab 2 pre-lab.
- **Evidence loop:** after next year's Module 1 test, compare the LT 1.2 item results with this year's (56–88%).

## 12. Leg 2 record (for Reid; the builder can skip this)

- **Number: #17.** On 10/3 the repo's built tools run to #14 (The Signal Relay); the Signal Patch brief on `main` claims #15; and the CHIP scientists page (draft, not yet merged) was renumbered to #16 in another session the same afternoon. This tool is therefore **#17**. Re-read the live hubs before merging in case another tool lands first.
- **Recommendations from the card that stand** (silence kept them): the name "The Macromolecule Patch"; the honest lipid wording, now with "glycerol and fatty acids" named in the sentence so students can still answer the county's "what are lipids built from?"; the egg in S3; no brands or diet advice.
- **Changes from the card:**
  - **No Sudan III.** Reid's DE Lab 02 uses Benedict's (hot bath), iodine, Biuret and brown paper. The tool now matches the lab, and its colours come from the lab's own reagent table (including Biuret's pink for short peptides).
  - **S6 food table made explicit,** with honest "trace" results (potato and egg white on Benedict's; milk's faint paper spot) and two DE-only rows: table sugar (non-reducing, stays blue, the lab's own "good to know") and a glucose known positive.
  - **S4 card "wood" became "cotton"** (wood is part lignin, not pure carbohydrate), and "a cell membrane" became "the oily double layer of a cell membrane" (a whole membrane also holds protein and carbohydrate).
  - **N5's stem** now says "the material of cotton and much of wood"; **N8's options** dropped "only" where it was not the point.
  - **N13 added** so S1 has a post item. Keys are now A 4 · B 4 · C 3 · D 4.
  - **New simplifications owned on the page** (§4.3): all monosaccharide tiles are hexagons (fructose's ring is really five-sided); cells activate units with ATP before linking, so one water per link is net bookkeeping; lipase in the gut leaves one fatty acid on glycerol.
- **DE bank** written (D1–D12, keys 3/3/3/3, a `sam` for every wrong option). Compared with the 30 Checkpoint Companion Chapter 3 stems: none repeated (the companion's 200-amino-acid water count, cow/cellulose, olive oil vs butter, dipeptide, alpha helix, sickle cell, uracil/ribose and complementary-strand items were deliberately avoided).
- **Mol\* IDs** (1BNA, 1SMD, 1CAG) could not be opened from this session; the builder checks each and drops any that fail.
- **Independent review** (a cold read; every key re-answered blind and confirmed). Its 17 findings are applied: contrast outlines for the carbohydrate and water colours; the egg no longer ends as "monomers" (it held a fat); D9's stem now names a strand; N11's pepsin note and the -ase rule; ATP labelled with "five-carbon sugar" at 9th; a faint paper spot for milk; the Venn's C-H-O chip limited to sugars and fats; a simplification note on mixed links; the starch goal counts only all-glucose (all-α at DE) chains; one consistent enzyme dock; S2 goals read `links`, not the cumulative counter; A-items never gate a step; explicit S5 job chips; all ten word parts; the 9th vocabulary rule and T5 literals made workable; and smaller wording fixes.
- **Open for Reid:** whether the DE view needs the full Lab 2 plate map as a seventh step (left out; the S6 plate already mirrors Day 1's controls).
