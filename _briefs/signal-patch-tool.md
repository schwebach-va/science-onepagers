# Build brief: The Signal Patch (Bio Tool #15)

A hormone, its receptor and the enzyme that cuts it. Three molecules (our own GLP-1, the Gila monster's exendin-4 and the drug semaglutide) run through the same beta cell, so students can see why a lizard's hormone outlasts ours. There are two levels: 9th grade and DE.

- **Brief version:** Leg 1 of the Signal Patch relay. Written 2026-10-03 in the Science OnePagers project from the handoff card `2026-10-03-HANDOFF-Signal-Patch-tool.md`, which was written in BFHS Assistance that morning.
- **Checked in Leg 1:**
  - Every number in §4 was checked against primary sources or FDA labels. DOIs are in §4.3.
  - The two sequences were matched character for character against UniProt.
  - The tool number was read off the live hubs on 2026-10-03.
  - A script checked both banks for: the key spread, a `miss` for every wrong option, a `sam` for every DE wrong option, and the 9th-grade forbidden-word list.
  - An independent review pass read the brief cold. It re-checked every key and every `miss` index, and its 18 findings are applied in this version: the receptor-internalisation caveat, DPP-4's preference rather than an absolute rule, the 9-37 product name, the defined clock, and the hook methods the tests need.
- **Who reads this:** the Claude Code cloud session that builds the page. This file is the whole spec. The build needs nothing from the handoff card.
- **Where it lives:** `_briefs/signal-patch-tool.md` in `schwebach-va/science-onepagers`. The repo has no `.nojekyll`, so GitHub Pages' Jekyll skips folders whose names start with `_`, and this file is never served. Do not add a `.nojekyll`.

---

## 0. The job, in one screen

1. Build **one new file**: `biology/tools/signal-patch.html`.
   - Permanent URL: `https://scienceonepagers.org/biology/tools/signal-patch.html`.
   - It is **Bio Tool #15**. The title is "The Signal Patch".
2. It must be self-contained. That means:
   - Plain HTML, CSS and JS in one file.
   - No build step, no framework, no external script.
   - Google Fonts is the only external request. Load it the same way `biology/tools/organelles-energy.html` does.
3. Commit it on a new branch and push that branch.
   - If the session assigns you a working branch (cloud sessions usually name one `claude/…`), use it. Otherwise use **`claude/signal-patch-tool`**.
   - Open a pull request into `main` and stop. **Do not merge.** Say in the report which branch and PR you used.
4. **Do not edit any existing file.** That includes:
   - `biology/classroom-tools.html`
   - `biology/de-biology-101-resources.html`
   - `sitemap.xml`
   - `search-index.js`
   - `search.html`
   - `style.css`
   - this brief
   - every other page

   Hub listings, search and Canvas links come after Reid reviews the page, in a separate job (§11).
5. Test with Playwright and Chromium at **1180 × 820 CSS px (iPad, landscape)** and at **820 × 1180 (iPad, portrait)**.
   - Cover both levels (9th and DE) and both device settings (iPad and Computer).
   - Report **every acceptance test in §10 as PASS or FAIL**, with a one-line reason for each FAIL.
   - Attach the screenshots listed in §10.3.
6. **Collect no data.** Nothing a student types or taps leaves the device. There is no analytics, no form posting and no fetch.
7. Nothing publishes without Reid. The branch is for his review.

**How the push works.** The Water Patch (Bio Tool #10) and the Energy Patch (Bio Tool #11) were both built by cloud sessions started at claude.ai/code with this repository selected. Each pushed its own branch, and Reid merged it as a PR (#1 and #2). A session opened from Cowork, without the repository as its source, could clone the repo, but its push was refused: *"not in this session's authorized repository set"*. **If `git push` is refused, do not hunt for a workaround.** Keep the commit, report the refusal word for word, and stop.

## 1. Read these first (the house pattern)

| File | What to take from it |
|---|---|
| `biology/tools/organelles-energy.html` (Bio Tool #11, The Energy Patch) | **The newest Patch. Copy its skeleton closely.** Take these from it: <ul><li>the `:root` tokens and both dark-mode blocks;</li><li>`.topbar` with `.seg` switches (Running on: iPad / Computer);</li><li>the level switch `9th Grade SOL Bio` / `DE Bio`;</li><li>the `#build` grid: stage column plus card column, with the card scrolling inside its own column at ≥900 px, and the pinned stage above the card below 900 px;</li><li>"Fill screen", "Hide card" and "Teaching view";</li><li>step `.dots` that light only when a step is finished;</li><li>the "Words in this step" chips;</li><li>the `.card` item rendering (`.opts`, `.opt.right` / `.wrong`, `miss`, `why`, `sam`);</li><li>`#record` ("Your record");</li><li>the `.do.further` box, the `.fine` simplifies note and the `sop-foot` footer;</li><li>the localStorage `st` object with `save()` in try/catch;</li><li>the test hook pattern (`window.__EP`).</li></ul> |
| `biology/tools/water-patch.html` (Bio Tool #10) | The canvas `tag()` label-on-a-plate helper, `buildCtl()` per-step controls, and the slider styling on iPad (`html[data-dev="ipad"] .slider`). |
| `biology/tools/membrane-patch.html` (Bio Tool #5) | Reid's iPad rules from 9/22: <ul><li>the picture stays pinned while text scrolls;</li><li>**any step opens directly** from its dot;</li><li>**a dot lights only when that step is finished**.</li></ul> He teaches from these live. |
| `biology/tools/signal-relay.html` (Bio Tool #14, The Signal Relay) | **The sibling tool, read so you do not repeat it.** It runs three receptor types (GPCR, ion channel, intracellular) with epinephrine and amplification "on the order of a hundred million". The Signal Patch is about *one* receptor and *how long a signal lasts*. Its amplification step (S6) stays short and links to the Signal Relay for the full cascade. **Do not reuse the Signal Relay's 10⁸ figure.** |
| `biology/tools/checkpoint-companion.html` (Bio Tool #9) | The `sam` prompt per wrong option. DE students build Student-Authored Modules from their misses, so DE items carry `sam`. |

Match the house tone and markup:

- the `sop-back` link to `../classroom-tools.html`;
- `sop-eyebrow`, `.lede`, and the `.fine` note saying nothing is submitted;
- the `sop-foot` footer with the CC BY-NC 4.0 licence and the link to `../../teaching/classroom-tools-note-to-teachers.html`;
- `<link rel="canonical">`, `og:` and `twitter:` meta, and a `meta description`, as the Energy Patch has them.

**The site footer carries no PWCS disclaimer.** Do not add one.

## 2. What the tool is (Reid's design, kept as he gave it)

> "If I need to build a tool, that's OK. I'm looking for things to engage students with where I have opportunity to help them learn more deeply." (Reid, 10/3)

The tool grew from Reid's voice note of 10/2: *"the toxin from the Gila monster becoming how we created Ozempic as a drug... it's a very interesting topic for the students."* It pairs with a CER on the same story, whose question is **why does a lizard's hormone outlast our own?** The tool lets students produce the evidence that answers it.

**The scene.**

- **Left:** a strip of blood vessel. GLP-1 enters from the gut when a meal is eaten. Enzyme "scissors" (DPP-4) drift in the blood.
- **Right:** a pancreas beta cell. Receptors sit on its membrane and insulin packets sit inside.
- **Below:** a live graph of hormone remaining against time, with the clock labelled in real units.

**What it teaches:**

- A hormone carries its signal by binding a receptor on the cell surface. It does **not** need to enter the cell to deliver its message; the receptor carries the message across the membrane.
- The signal is amplified inside the cell. One bound hormone leads to many relay molecules, which lead to many insulin packets.
- Enzymes in the blood end GLP-1's signal. Shape decides what an enzyme can cut, and one changed amino acid can make a molecule uncuttable.
- How long a signal lasts is not the same as how strong it is.
- GLP-1's effect depends on glucose. The cell releases extra insulin only when blood glucose is high. This is why the drug alone rarely drives blood sugar too low.

**Misconceptions it surfaces on purpose:**

1. "The hormone goes into the cell to deliver its message."
2. "Longer-lasting means a stronger signal."
3. "Insulin comes out whenever the hormone is there," whatever the glucose level.
4. "The lizard venom is the drug." In fact, exenatide is a lab-made copy of a venom peptide, and Ozempic is modified *human* GLP-1.

**Device.** It runs on student iPads, touch only. There are no hover-only actions. It works in portrait and landscape, stays smooth on an older iPad, and reads at projection size on the Newline board.

## 3. Decisions already made (do not reopen)

- **URL, number and title.**
  - URL: `biology/tools/signal-patch.html`. Number: Bio Tool #15. The live hubs showed #14 (The Signal Relay) as the highest number on 2026-10-03.
  - `<title>`: `The Signal Patch | Science One-Pagers`.
- **One page, with a 9th / DE switch.** Labels: `9th Grade SOL Bio` / `DE Bio`, the house labels from the Energy Patch. *(The card said "Biology / College Biology". Leg 1 recommended the house labels so the Patch family reads alike; see the record in §12.)*
- **One module, six steps** (§6). S1–S5 are core at both levels. **S5, the amino-acid zoom, is core at 9th grade too, not an extension.** It is the Unit 4 hook: sequence → shape → what an enzyme can cut, and the no-codon fact about Aib. S6, the amplification counter, is core at DE. At 9th it appears only when the **"Advanced Biology"** switch is on.
- **Molecules and their names.**
  - At 9th: "GLP-1 (your own hormone)", "Exendin-4 (Gila monster)" and "Semaglutide (Ozempic)".
  - At DE: "GLP-1(7-37)", "exendin-4 / exenatide (Byetta)" and "semaglutide (Ozempic)".
  - Brand names appear only as these factual identifications. Show no logos and no dosing.
- **What ends each signal. This is a science correction to the card; draw it.**
  - DPP-4 is what ends *native GLP-1* within minutes.
  - Exendin-4 escapes DPP-4, but the **kidneys** still filter it out over hours. The Byetta label says exenatide "is predominantly eliminated by glomerular filtration with subsequent proteolytic degradation."
  - Semaglutide escapes DPP-4 *and* rides on **albumin**, a large blood protein, which keeps it from being filtered out. So it lasts about a week.
  - The scene therefore has a second exit: a **kidney filter** at the right end of the vessel strip. At 9th it is called "kidney filter". At DE it is "renal clearance (glomerular filtration)".
  - Saying "the scissors fail, so it lasts forever" would be wrong. The graph must show that exendin-4 still disappears, only more slowly.
- **The time axis is switchable, not a single log axis.**
  - Three windows: **First 15 minutes**, **First day** and **First 3 weeks**. Each plays in about 20 real seconds at 1× (§5.4).
  - DE adds a fourth window, **All on one axis (log)**, running from 0.1 min to 30 days with labelled ticks.
  - 9th graders read linear axes; the log view is DE only.
- **One shared data block.** §4.1's `SIGNAL_DATA` is the single source for every number on the page. The CER pages use the same values. Do not round differently in different places: every displayed number comes from `SIGNAL_DATA`'s `text` fields.
- **"What you found" boxes** appear after each step: one sentence, typed, saved only on the device. Nothing is sent.
- **Teacher notes** sit in a collapsed `<details>` near the bottom of the page (§5.8), not on a separate page.
- **Copyright.** Do not use Pearson wording or figures (Campbell decks, Checkpoints), county packet or slide text, or CLT colleagues' materials. Every item in §8–§9 is original and may be used as written.
- **This is not medical advice.** A `.fine` line says so (§5.8). The tool never shows doses, never compares the drugs as treatments, and stays on the pancreas. Stomach emptying and appetite get one line in "What the model simplifies", and nothing else.

## 4. Science the build must get right

### 4.1 The data block (paste this into the page; it is the test oracle)

```js
// SIGNAL_DATA — verified 2026-10-03 (sources in §4.3). Single source for every number on the page.
// halfLifeMin is the MODEL value used by the simulation; text9 / textDE are what the page displays.
const SIGNAL_DATA = {
  version: "2026-10-03",
  molecules: {
    glp1: {
      label9: "GLP-1 (your own hormone)", labelDE: "GLP-1(7-37)",
      from9: "made by cells lining your gut after a meal",
      fromDE: "secreted by intestinal L-cells after a meal; native form",
      lengthAA: 31,                       // GLP-1(7-37); the 7-36 amide form is 30
      first10: ["H","A","E","G","T","F","T","S","D","V"],
      first10NumberDE: [7,8,9,10,11,12,13,14,15,16],
      pos2: "A",                          // Ala8 in GLP-1 numbering
      cutByDPP4: true,
      albumin: false,
      mainExit9: "the scissors enzyme cuts it",
      mainExitDE: "DPP-4 cleavage (His7-Ala8 removed); the product, GLP-1(9-37) (9-36 amide from the amide form), is inactive at the receptor",
      halfLifeMin: 1.5,                   // model value inside the published 1–2 min range
      text9: "about 1 to 2 minutes", textDE: "~1–2 min (half-life)"
    },
    ex4: {
      label9: "Exendin-4 (Gila monster)", labelDE: "exendin-4 / exenatide (Byetta)",
      from9: "found in Gila monster venom in 1992; the medicine is a copy made in a lab",
      fromDE: "isolated from Heloderma suspectum venom (Eng et al., 1992); exenatide is the synthetic peptide, FDA-approved 2005",
      lengthAA: 39,
      first10: ["H","G","E","G","T","F","T","S","D","L"],
      pos2: "G",                          // Gly2
      cutByDPP4: false,
      albumin: false,
      mainExit9: "the kidneys filter it out of the blood",
      mainExitDE: "renal clearance (glomerular filtration), then proteolysis",
      halfLifeMin: 144,                   // 2.4 h, Byetta label
      text9: "about 2 and a half hours", textDE: "~2.4 h (half-life)"
    },
    sema: {
      label9: "Semaglutide (Ozempic)", labelDE: "semaglutide (Ozempic)",
      from9: "human GLP-1 with two amino acids swapped and a fatty acid attached; the protein chain is made by yeast",
      fromDE: "GLP-1(7-37) with Aib8 and Arg34, C18 fatty diacid on Lys26 via a linker; backbone made by yeast; FDA-approved 2017",
      lengthAA: 31,
      first10: ["H","Aib","E","G","T","F","T","S","D","V"],
      pos2: "Aib",
      cutByDPP4: false,
      albumin: true,
      mainExit9: "it rides on a big blood protein, so the kidneys barely filter it; it is broken down slowly",
      mainExitDE: "albumin-bound (>99%), so renal filtration is slow; slow proteolysis",
      halfLifeMin: 9600,                  // 160 h, ~1 week
      text9: "about 1 week", textDE: "~1 week, about 160 h (half-life)"
    }
  },
  identityEx4vsGLP1: { same: 16, of: 30, text: "16 of the first 30 amino acids match (about 53%)" },
  signalOnThreshold: 0.10,                // model: signal counts as "on" while ≥10% of the starting amount is left
  // derived (model): time signal stays on = halfLife × log2(10) ≈ 3.32 × halfLife
  //   glp1 ≈ 5 min · ex4 ≈ 8 h · sema ≈ 22 days
  glucose: {                              // model gate; mg/dL shown at DE only, marked "approximate"
    low:    { mgdl: 60,  basal: 0.00, boost: 0.0 },
    normal: { mgdl: 90,  basal: 0.10, boost: 0.0 },
    high:   { mgdl: 180, basal: 0.30, boost: 0.7 }
  },
  // insulin release rate (0–1) = basal + boost × signal   (signal 0–1 = fraction of receptors occupied)
  amplification: { hormone: 1, gProteins: 10, cAMP: 1000, illustrative: true }
};
```

**How the numbers behave.**

- **Two clocks, one model.** The *model clock* is body time in real-world units (minutes, hours, days). The graph, `remaining()` and `signal` are computed **directly from the formula below** at the model clock's time; they are never estimated from tokens. Tokens are a *visual sample*: the number of hormone tokens on screen follows the % remaining (rounded, with at least one while remaining ≥ 1%), and events such as cuts, filtering and binding are drawn at a rate that keeps the picture in step with the curve. The *playback* maps each window onto about 20 real seconds at 1× (§5.4). `run(seconds)` in the test hook advances the model clock.

- **Decay.** Hormone remaining after a single release or injection is `100 × 0.5^(t / halfLifeMin)` per cent of the starting amount. It is first-order, with no absorption phase (§5.9).
- **Signal strength.** At the start, all three molecules fill the same share of receptors (100% of the model's maximum). **The peak signal is identical for all three. Only the duration differs.** This is the evidence against misconception 2.
  - True to the literature: semaglutide binds the receptor slightly *less* tightly than liraglutide (Lau 2015). It is not stronger, it lasts longer.
  - The signal is `remaining/100`, clipped to 0–1, and it counts as "on" while ≥ `signalOnThreshold`.
- **Insulin release** = `basal + boost × signal`, using the current glucose setting.
  - At low or normal glucose, the hormone adds **nothing**. The rate equals the hormone-free rate.
  - At high glucose, it adds up to +0.7.
  - Glucose itself drives the basal release; GLP-1 amplifies it. This matches Nauck 1993: insulin returned toward basal once glucose normalised, even with GLP-1 still infused.
- **Checkpoints for the tests:**

  | Time | GLP-1 left | Exendin-4 left | Semaglutide left |
  |---|---|---|---|
  | 1.5 min | 50% | | |
  | 10 min | ≈ 1.0% | | |
  | 2.4 h | | 50% | |
  | 24 h | | ≈ 0.10% | |
  | 1 week (168 h) | | | ≈ 48% (0.5^(168/160)) |
  | 160 h | | | 50% |
  | 21 days | | | ≈ 11% |

### 4.2 Other science the build must get right

- **The receptor is on the surface.** GLP-1 binds the GLP-1 receptor at the outside of the beta cell's membrane: its N-terminal end reaches into the receptor's core from outside, and the hormone does not cross the bilayer to signal. **Model rule:** no hormone token is drawn inside the cell, at any level, at any step (T3).
  - Honest caveat, in "What the model simplifies" (§5.8): in real cells, bound receptors are later pulled into the cell with their hormone and can keep signalling from inside for a while. The model leaves that out. **Never write "never enters the cell"**; write "does not need to enter the cell" or "works from the surface".
- **The cut site.** DPP-4 removes the first two amino acids (His-Ala) of GLP-1, cutting between positions 2 and 3 (Ala8–Glu9 in GLP-1 numbering). The product, GLP-1(9-37) (GLP-1(9-36)amide when the amide form is cut), is **inactive at the receptor**. The literature calls it "inactive" or a "low-affinity / weak antagonist". **Never call it a partial agonist.** In the animation, a cut GLP-1 token drops its two-bead head, turns grey and can no longer bind.
- **Why the scissors fail.**
  - DPP-4 strongly prefers alanine or proline at position 2, and cuts other residues there slowly or hardly at all.
  - Exendin-4 has **glycine** there. Müller 2019: "a glycine at the second amino acid position at the N-terminus, which protects the peptide from DPP-4-mediated degradation."
  - Semaglutide has **Aib** (α-aminoisobutyric acid) there.
  - In S5, the scissors visibly close on position 2 and **slip** for Gly and Aib.
- **Aib is not in the genetic code.** No codon codes for Aib. It is not one of the 20 amino acids cells build proteins from, so chemists put it in. This is the Unit 4 link: say it at 9th grade in exactly those terms.
  - **Do not state** which manufacturing step adds Aib. The sources read in Leg 1 don't settle it.
- **Semaglutide's three changes.** Lau 2015: Aib8, Arg34, and a fatty diacid on Lys26 through a linker, which binds albumin. The 2017 Ozempic label: "The peptide backbone is produced by yeast fermentation." The EMA SmPC: produced "in Saccharomyces cerevisiae cells by recombinant DNA technology."
  - On screen at 9th: "yeast cells make the protein chain; chemists add the fatty piece."
  - **Do not write "followed by chemical modification"** as if it were a label quote.
- **Exendin-4 vs GLP-1.**
  - Exendin-4 is 39 amino acids long. In its first 30, 16 positions match GLP-1(7-36): about 53%, on a denominator of 30.
  - Among the first 10 positions, the matches are 1, 3, 4, 5, 6, 7, 8 and 9. The differences are **2 (A→G)** and **10 (V→L)**.
  - It acts on the **same human receptor** (Göke 1993). Draw the same receptor lighting the same way for all three molecules.
- **Venom vs drug.** The medicine exenatide is a *synthetic* copy. No one milks lizards for it. Byetta label: "a synthetic peptide that was originally identified in the lizard Heloderma suspectum".
- **The pathway (DE).**
  - GLP-1R is a **class B GPCR**.
  - Gs → adenylyl cyclase → cAMP → PKA and Epac2 → insulin granule exocytosis, **only when glucose is high**.
  - At 9th, with Advanced on: "the receptor switches on relay molecules inside the cell, each one switches on many more, and they tell insulin packets to leave."
- **Amplification numbers are illustrative.** The 1 → 10 → 1,000 tally carries the on-screen label "illustrative, not measured". Do not print any real-world fold figure.
- **Dates and people.**
  - Exendin-4 was isolated by Dr. John Eng's group at the VA Medical Center in the Bronx and published in 1992.
  - Exenatide (Byetta) was FDA-approved on 28 April 2005.
  - Semaglutide (Ozempic) was FDA-approved on 5 December 2017.

### 4.3 Sources (render these on the page, in a "Sources" list under Go further)

| Claim | Source |
|---|---|
| Exendin-4: 39 aa, from *H. suspectum* venom, VA Bronx | Eng J, et al. *J Biol Chem* 1992;267:7402–5. doi:10.1016/S0021-9258(18)42531-8 |
| Exendin-4 is a GLP-1 receptor agonist on beta cells | Göke R, et al. *J Biol Chem* 1993;268:19650–5. doi:10.1016/S0021-9258(19)36565-2 |
| DPP-4 removes His-Ala from GLP-1 and inactivates it | Mentlein R, et al. *Eur J Biochem* 1993;214:829–35. doi:10.1111/j.1432-1033.1993.tb17986.x |
| GLP-1(9-36) is biologically inactive; fast degradation in vivo | Kieffer TJ, et al. *Endocrinology* 1995;136:3585–96. doi:10.1210/endo.136.8.7628397 |
| Native GLP-1 is rapidly degraded from the N-terminus in people | Deacon CF, et al. *Diabetes* 1995;44:1126–31. doi:10.2337/diab.44.9.1126 |
| Insulin effect is glucose-dependent; insulin returns toward basal at normal glucose | Nauck MA, et al. *Diabetologia* 1993;36:741–4. doi:10.1007/BF00401145 |
| Half-life 1–2 min; Gly2 protects exendin-4; ~53% identity; class B GPCR; cAMP → PKA/Epac | Müller TD, et al. *Mol Metab* 2019;30:72–130. doi:10.1016/j.molmet.2019.09.010 |
| Semaglutide design: Aib8, Arg34, acylated Lys26, albumin binding | Lau J, et al. *J Med Chem* 2015;58:7370–80. doi:10.1021/acs.jmedchem.5b00726 |
| Exenatide: synthetic; t½ 2.4 h; cleared by glomerular filtration | BYETTA (exenatide) prescribing information, FDA, NDA 021773 |
| Semaglutide: t½ ≈ 1 week; backbone by yeast fermentation; approval 2017 | OZEMPIC (semaglutide) prescribing information, FDA, NDA 209637. The "about 160 h" figure (subcutaneous, in humans) is from Müller 2019. |
| Sequences | UniProt P01275 (human proglucagon; GLP-1(7-37) = residues 98–128) and P26349 (exendin-4, residues 48–86) |

Render DOIs as `https://doi.org/…` links. For the two labels, link to `https://www.accessdata.fda.gov/scripts/cder/daf/` (Drugs@FDA search) rather than to a dated PDF.

## 5. Page, layout and controls

### 5.1 Top of the page (scrolls away)

- `sop-back` link.
- `.topbar` with one `.seg`: **Running on: iPad / Computer**.
  - **iPad** (the default):
    - devicePixelRatio capped at 2;
    - no more than about 40 moving tokens;
    - no shadows or blur filters in the draw loop;
    - touch targets ≥48 px (44 px is the floor T11 fails below);
    - labels ≥16 CSS px.
  - **Computer:**
    - DPR cap 2.5;
    - about 2× the tokens;
    - tighter controls;
    - hover highlights *in addition to* tap. Nothing may depend on hover.
  - **The science is identical in both settings.**
- Then the eyebrow (§5.6), `<h1>The Signal Patch</h1>`, a `.lede` and the level switch `9th Grade SOL Bio` / `DE Bio`.
- At 9th only, a small switch, **Advanced Biology: Off / On**. It reveals S6 and the A-items.
- The `.fine` note: nothing is submitted; progress and what you type stay on this device; any step number opens that step, and a number lights up only when that step is finished.
- Then the legend: the token key from §5.3, with shape *and* label for each.

**`.lede` text:**

- **9th:** "Your gut makes a hormone after every meal that tells your pancreas to release insulin, and your blood destroys it within minutes. A lizard in the Arizona desert makes one that lasts for hours. Run all three molecules through the same cell and find out why."
- **DE:** "GLP-1 is cleared from plasma in one to two minutes; its venom analogue lasts hours and its engineered descendant about a week. Run each through the same β cell and separate potency from persistence."

### 5.2 Layout

Copy the Energy Patch's layout rules:

- **At ≥900 px wide, in landscape:** `#build` is `height:100svh` (`100vh` as the fallback), laid out as a two-column grid:
  - stage column about 62%;
  - card column about 38%, with `overflow-y:auto` inside the column.
- **"Fill screen"** hides everything outside `#build`, using `data-fill="1"` on `<html>`. Compact copies of the level and Advanced switches sit inside `#build`. Where the API exists, it calls `requestFullscreen`. It starts off.
- **"Hide card"** gives the stage the full width. A slim "Card ▸" tab reopens the card as an overlay.
- **Below 900 px, or in portrait:** the stage is pinned (`position:sticky`) above the card, and the card scrolls beneath it.
- **The stage** has three stacked parts:
  1. the **scene canvas** (vessel and beta cell), about 60% of the stage height;
  2. the **graph canvas** below it, about 40%;
  3. the controls row, readout line and step dots.

  Both canvases are sized to their boxes × DPR, and drawn in world units scaled to *contain*. The scene world is 1200 × 600 and the graph world is 1200 × 400.
- **No horizontal page scroll** at any width from 360 px up.

### 5.3 The scene

Draw it with Canvas 2D in one `requestAnimationFrame` loop. Stop the loop when the tab is hidden or the stage is off-screen.

- **Vessel strip, left 55%.** A horizontal tube with a soft red wall, flowing left to right.
  - The **gut** sits at its left end: a small band of intestinal cells. GLP-1 tokens leave it when "Eat a meal" is tapped.
  - An **injection point** (a small port icon, no needle) sits beside it. Exendin-4 and semaglutide enter there.
  - The **kidney filter** sits at the right end: a sieve shape labelled "kidney filter" (9th) or "renal clearance" (DE).
  - **DPP-4 scissors** drift in the stream, 6 on iPad.
- **Beta cell, right 45%.** A large rounded cell.
  - **Receptors** sit on the membrane facing the vessel: 6 on iPad, 10 on Computer. Each is a Y-shaped cup in the outer membrane.
  - **Insulin packets** (vesicles) sit inside, clustered near the membrane.
  - A **glucose gauge** shows on the cell, as a small thermometer-style bar labelled low / normal / high.
- **Binding.** A hormone token that reaches a free receptor docks into the cup *on the outside*, and the receptor glows.
  - While a receptor glows, a faint pulse ring runs inward. That ring is the signal, not the hormone.
  - The hormone token unbinds after a short dwell and returns to the stream.
- **Release.** When insulin release is on, packets travel to the membrane, fuse and release insulin dots outward into the vessel.
- **Albumin** (semaglutide only) is a large pale oval. Semaglutide tokens ride on it most of the time, hop off to bind a receptor, then hop back on. **At the kidney filter, albumin-carried tokens pass by** and only free tokens can be filtered.

**Tokens and colours.** Define each once as a constant, with a dark-mode variant.

| Token | Drawn as | Colour (light / dark) |
|---|---|---|
| GLP-1 | a short chain of beads with a **round** head bead | teal `#1F7A8C` / `#6FC0CE` (the site's `--bond`) |
| Exendin-4 | a longer chain of beads with a **diamond** head bead and a tail (it is 39 aa) | violet `#6B4E8C` / `#B9A3D9` |
| Semaglutide | a chain with a **square** head bead and a small **fatty-acid squiggle** | orange `#C9731E` / `#E8A867` |
| Cut GLP-1 | the chain minus its head beads, grey | `#9A948A` / `#6E685F` |
| DPP-4 scissors | an open/close scissor glyph | ink-soft `#5A544A` / `#A8A198` |
| Receptor | a Y-cup in the membrane; glows when bound | outline ink; glow `#F2C230` |
| Insulin packet / insulin | a circle with a small "i"; released insulin as small dots | `#3F7A55` / `#7FC395` |
| Albumin | a large pale oval | `#E9E3D6` / `#3A352D` |
| Glucose | small hexagons in the vessel; their number follows the glucose setting | gold `#C98A2E` |

- Every molecule is told apart by **head shape and a text tag**, never by colour alone.
- Tokens move at a pace the eye can follow, about 120–220 world units per second at 1×.

### 5.4 The graph

- **y-axis:** "Hormone left in the blood (% of start)" at 9th; "% remaining" at DE. Range 0–100.
- **x-axis:** real time in the chosen window, with labelled ticks.

| Window | Axis | Ticks | Plays in (real, at 1×) | Level |
|---|---|---|---|---|
| First 15 minutes | 0–15 min | every 1 min | 20 s | both |
| First day | 0–24 h | every 3 h | 20 s | both |
| First 3 weeks | 0–21 days | every day, labelled each week | 20 s | both |
| All on one axis (log) | 0.1 min – 30 days, log₁₀ | 1 min, 10 min, 1 h, 10 h, 1 day, 1 week, 30 days | 20 s | DE only |

- **Curves.** One per molecule. Each is drawn as the clock runs, in that molecule's colour.
  - Each has a different dash pattern: GLP-1 solid, exendin-4 long-dash, semaglutide dot-dash.
  - Each has an end-of-line label carrying the head-shape glyph.
  - **Overlay all three** draws every curve that has been run so far.
- A dashed horizontal line at **10%** is labelled "signal fades out" (9th) or "≈ threshold (model)" (DE).
- A **50% guide line** and the half-life marker appear at DE.
- **Readouts under the graph:**
  - **"Signal strength at the start"** is a gauge, identical for all three.
  - **"Signal stays on for"** shows the derived time from §4.1 for the molecule run last, e.g. "about 5 minutes / about 8 hours / about 3 weeks (in this model)".
- **Clock.** A large digital readout above the graph in real units (e.g. `0:07:30`, `14 h`, `day 9`), with ▶/❚❚, ◂/▸ step, and speed `½× 1× 2×`.
  - Switching the window rescales and restarts the clock. Curves already drawn redraw on the new axis.

### 5.5 Controls (below the stage, built per step)

- **Always shown:** `▶ Play / ❚❚ Pause`, speed, `Fill screen`, `Reset this step`, and the window selector (§5.4).
- **S1:** `Eat a meal`.
- **S2:** `Eat a meal` and `Scissors: On / Off`. The Off position is a thought experiment, labelled "What if nothing cut it?".
- **S3:** a molecule picker (`GLP-1` / `Exendin-4` / `Semaglutide`), each with its glyph, plus `Release / Inject` and `Overlay all three`.
- **S4:** `Blood sugar: Low / Normal / High`, the molecule picker, and `Hormone: On / Off`. **Hormone On holds `signal = 1` as a steady supply (like the infusion in Nauck 1993); decay and the graph clock are paused in S4.** Hormone Off sets `signal = 0`.
- **S5:** the molecule picker. The scene zooms to the alignment (§6, S5).
- **S6:** `Tap a receptor`. A hint arrow points at a receptor until the first tap.
- **Teaching view:**
  - As in the Energy Patch, it opens every part of the step, but **lights no dot**.
  - Labels grow to ≥28 CSS px.
  - Tapping any part of the scene pins one big callout for that part.

Every control has an `aria-label`. Sliders, if any, get `<output>` values. Segmented buttons use `aria-pressed`.

### 5.6 Eyebrow and footer per level

**9th:**

- Eyebrow: `Bio Tool #15 · Biology I Unit 4 · SOL BIO.2d, BIO.5e`
- Footer lead: `Unit 4, Nucleic Acids & Protein Synthesis · Biology I, SOL BIO.2d (protein synthesis) and BIO.5e (synthetic biology)`

**DE:**

- Eyebrow: `Bio Tool #15 · DE Bio 101 Unit 5 · Membrane Transport and Cell Signaling (Campbell Ch. 5)`
- Footer lead: `Unit 5, Membrane Transport and Cell Signaling · NVCC BIO 101, Campbell Chapter 5; enzymes, Chapter 6`

Then the house footer text: "· six steps, nothing submitted. © J. R. Schwebach, CC BY-NC 4.0. Teachers: see the note on using these with Canvas." Copy the markup from the Energy Patch.

### 5.7 Saving

- localStorage key **`signalpatch`**.
- It holds `st = {dev, level, adv, step, ans, goals, found:{S1..S6}, win, teach, fill, cardHidden, ran:{glp1,ex4,sema}, rec:[…]}`.
- Validate every field on load, as the Energy Patch does. Wrap every read and write in try/catch.
- The page must work with storage blocked.
- **"What you found"** text is capped at 300 characters per step and saved only here. There is a "Clear what I typed" button in `#record`.

### 5.8 Below the tool

1. **`#record`, "Your record".** First answers per item, as the Energy Patch shows them, plus the student's "What you found" sentences in step order. Include a **Copy my sentences** button that uses the clipboard API, with a select-all textarea as the fallback. Students paste these into their CER, so nothing needs to be sent.
2. **"Use this in your CER" box.** It renders only if `CER_LINKS` (a const array at the top of the script, **shipped empty**) has entries.
   - When empty, show nothing. Do **not** invent CER URLs.
   - The follow-up job (§11) fills it.
3. **`.do.further` "Go further":**
   - **On this site:**
     - [The Signal Relay](signal-relay.html), for three receptor types and the full cascade (DE view only);
     - [The Membrane Patch](membrane-patch.html), for the membrane the receptor sits in;
     - [The Water Patch](water-patch.html), for enzymes and shape;
     - [Checkpoint Companion](checkpoint-companion.html) (DE view only).
   - **Real structures, on Mol\*,** in the Energy Patch's link format:
     - 5VAI, the GLP-1 receptor with GLP-1 and its G protein;
     - 1JRJ, exendin-4;
     - 1N1M, human DPP-4.
     - **Open each ID once before committing.** If one does not load the named structure, leave it out and say so in the report. Do not guess a replacement.
   - **Do not link or embed videos.**
4. **Sources**, from §4.3, in an element with `id="sources"`. The Sources list and the Mol\* links show at **both** levels, and both are **exempt from T8**: they are citations and names, not teaching text. At 9th, caption the Mol\* links "5VAI, the GLP-1 receptor holding GLP-1", "1JRJ, exendin-4" and "1N1M, the human scissors enzyme"; use the DE captions in §5.8 item 3 at DE.
5. **`<details>` "For teachers"** (collapsed). Use these lines as written:
   - **Goal:** students show, with evidence they generate, that a hormone signals from the cell surface, that an enzyme ends the signal by cutting a specific spot, and that changing one amino acid changes how long a molecule lasts, not how strong its signal is.
   - **Misconceptions it is built to surface:** the four in §2, each with the step that confronts it: 1 → S1, 2 → S3, 3 → S4, 4 → S3 and S5.
   - **Read–Talk–Write:** students read the CER at home, run the tool in class during the talk, then write. Each step's "What you found" sentence is their evidence line, and **Copy my sentences** gathers them.
   - **Timing:** 15–20 minutes for S1–S5; add 5 for S6.
   - **Suggested board prompt:** "Your GLP-1 is gone in two minutes. Is that a design flaw or a feature?"
   - **9th / Unit 4 link:** S5 is protein synthesis in reverse. The order of amino acids sets the shape, and the shape decides what an enzyme can cut. Aib has no codon.
   - **DE link:** Ch. 5 reception → transduction → response; Ch. 6 enzyme specificity.
6. **`.fine` "What the model simplifies":**
   - the molecules are drawn as bead chains, far larger than scale;
   - one strip of vessel stands for the whole bloodstream;
   - decay is drawn as a single smooth half-life with no absorption phase (a real injection takes hours to days to peak);
   - all three molecules are given the same receptor strength;
   - the glucose gate is on/off where the real response is graded;
   - amplification numbers are illustrative;
   - GLP-1 also slows the stomach and acts on appetite centres in the brain; this tool stays on the pancreas;
   - bound receptors in real cells are later pulled into the cell with their hormone and can keep signalling for a while; the model keeps every hormone outside;
   - this is a model of how molecules behave, not medical advice.

### 5.9 Accessibility

- Honour `prefers-reduced-motion`: tokens jump between positions with no tweening, the pulse rings stay static, and the clock still runs.
- Colour-blind safe: every state also shows by shape or text (§5.3). Contrast is checked by T17.
- The canvases have `role="img"` and an `aria-label` that updates with the step. A visually hidden `aria-live` line narrates key events ("Receptor 3 bound", "GLP-1 cut by the scissors", "Insulin released").

## 6. The six steps

Each step follows the Energy Patch's step object:

- `key`, `short`, `head`, `pre` (the prediction item, answered before the controls unlock), `post` (check-yourself items shown after the explanation), `task`, `goals` and the explanation.
- Here each step carries `nine` and `de` text.
- `adv:true` marks S6 at 9th: its dot shows only when Advanced Biology is on.

**Goals must be detectable from simulation state**, with each goal naming the counter it checks (§10.1). A step lights only when its pre item is answered, its goals are met, its post item is answered and its "What you found" box has at least 8 characters.

A-items are optional and never block a step.

---

**S1 · A meal sends a message** (both levels)

- **pre:** N1 / D1. **post:** N2 / D2.
- **Task:** Tap *Eat a meal*. Watch where the GLP-1 goes when it reaches the cell.
- **Goals:**
  - (a) `bindings ≥ 3`
  - (b) `insulinReleased > 0` at glucose High (S1 opens with glucose set to High: you just ate)
  - (c) `hormoneInsideCell === 0` throughout (always true; T3 checks it)
- **9th explanation:** "GLP-1 is a **hormone**, a chemical message carried in the blood. It does not need to go into the cell. It fits into a **receptor**, a protein in the cell membrane shaped to hold it, the way a substrate fits an enzyme's active site. When it binds, the receptor changes shape on the inside of the membrane, and that change is the message. The cell answers by moving **insulin** packets to its membrane and releasing them. The message gets in; the messenger stays out."
- **DE explanation:** "GLP-1 is a peptide hormone. It cannot cross the bilayer, and it does not need to. It binds the extracellular domain of the GLP-1 receptor, a class B G protein-coupled receptor, and its N-terminus reaches into the outer face of the receptor's transmembrane core; and the conformational change is relayed across the membrane. That is reception. Transduction and response happen inside; the ligand does not need to enter for them to start. The β cell responds by exocytosing insulin granules."
- **What you found prompt:** "Where did the hormone go, and how did the cell know it was there?"

**S2 · The scissors** (both levels)

- **pre:** N3 / D3. **post:** N4 / D4.
- **Task:** Eat a meal and watch the clock in the *First 15 minutes* window. Then turn the scissors off and run it again.
- **Goals:**
  - (a) one run with scissors On reaching ≥ 10 min on the clock
  - (b) `cutCount ≥ 3`
  - (c) one run with scissors Off
- With the scissors Off, GLP-1 is lost only slowly at the kidney filter. Model it with a 30-minute half-life in this thought experiment, and label it **"What if nothing cut it? (thought experiment)"** in every text and on the curve. It is **not** a value in `SIGNAL_DATA` and is never shown as a measured number.
- **9th explanation:** "The scissors are an **enzyme** in your blood, and they cut GLP-1 off at its front end. A cut GLP-1 can no longer fit the receptor, so the message stops. Half of it is gone in about 1 to 2 minutes, and almost all of it within 10. That sounds wasteful, but it is how your body keeps the message tied to the meal you just ate: when the food is gone, the signal is gone too."
- **DE explanation:** "DPP-4, on endothelial cells and in plasma, removes the N-terminal dipeptide His7-Ala8. The product, GLP-1(9-37), is inactive at the receptor. The intact hormone's half-life is about 1–2 min. Much of it is degraded before it even leaves the gut's capillary bed. A short half-life keeps the signal coupled to the meal; the cost is that the native hormone is useless as a drug."
- **What you found prompt:** "What ended the signal, and how long did it take?"

**S3 · Swap the molecule** (both levels)

- **pre:** N5 / D5. **post:** N6 / D6. A-item **A1** (9th, Advanced).
- **Task:** Run GLP-1, then exendin-4, then semaglutide. Use *Overlay all three* and change windows until GLP-1 and exendin-4 have dropped below the 10% line, and semaglutide is still above it at three weeks.
- **Goals:**
  - (a) `ran.glp1 && ran.ex4 && ran.sema`
  - (b) the *First 3 weeks* window viewed with all three overlaid
  - (c) the "Signal strength at the start" gauge seen equal (opening the overlay satisfies it)
- **Scene behaviour:**
  - The scissors close on exendin-4 and semaglutide and slip, with a small "✕ can't cut" tag.
  - Exendin-4 tokens leave at the kidney filter.
  - Semaglutide rides albumin past the filter.
- **9th explanation:** "In this model, all three fit the same receptor and switch it on just as hard at the start. What changes is how long they last. Your GLP-1 is cut in minutes. Exendin-4, from Gila monster venom, cannot be cut by the scissors, so it lasts until your kidneys filter it out: about two and a half hours for half to go. The medicine made from it is a copy built in a lab, not venom. Semaglutide is your own GLP-1 with two amino acids changed and a fatty piece added. The scissors can't cut it, and the fatty piece rides on a big blood protein the kidneys don't filter, so half is still there after about a week. A longer signal is not a stronger one."
- **DE explanation:** "Peak receptor occupancy is the same in this model for all three. Persistence is what differs, and for different reasons. Exendin-4 has Gly2, so DPP-4 cannot cleave it; renal filtration sets its 2.4 h half-life (exenatide, approved 2005, is the synthetic peptide). Semaglutide carries Aib8, which blocks DPP-4, and a C18 fatty diacid on Lys26, which binds albumin and slows renal clearance; its half-life is about a week (approved 2017). Potency and persistence are separate properties: semaglutide's receptor affinity is, if anything, slightly lower than its predecessor liraglutide's."
- **What you found prompt:** "Which lasted longest, and was its signal stronger or just longer?"

**S4 · Blood sugar decides** (both levels)

- **pre:** N7 / D7. **post:** N8 / D8.
- **Task:** With hormone On, try Low, Normal and High blood sugar. Then turn the hormone Off and compare.
- **Goals:**
  - (a) each of the three glucose settings run with hormone On for ≥ 5 s of playback
  - (b) hormone Off run at High
  - (c) `insulinRate` read at Normal with hormone On and Off, and found equal (the readout shows both side by side once both are run)
- **Readout:** "Insulin release: hormone on __ · hormone off __", as bars, with numbers at DE.
- **9th explanation:** "Even with the hormone bound, the cell releases extra insulin only when blood sugar is high. At low or normal blood sugar the hormone adds nothing. That is a safety feature: this signal cannot push blood sugar too low on its own, because once sugar falls back to normal the extra insulin stops. In 1993, doctors gave GLP-1 to people with type 2 diabetes and watched exactly this: insulin rose until blood sugar reached normal, then fell back even though the hormone was still being given."
- **DE explanation:** "GLP-1R signalling is glucose-dependent. Glucose metabolism closes K_ATP channels and raises Ca²⁺; cAMP via PKA and Epac2 amplifies the exocytosis that Ca²⁺ triggers. With glucose low, there is little to amplify. In Nauck et al. (1993), GLP-1 infusion normalised fasting glucose in type 2 diabetes, and insulin then returned toward basal despite continued infusion. That is the basis for the low hypoglycaemia risk of GLP-1 agonists used alone."
- **What you found prompt:** "When did the hormone change insulin release, and when didn't it?"

**S5 · Zoom to the cut site** (both levels)

- **pre:** N9 / D9. **post:** N10 / D10.
- **Scene:** the scene cross-fades to an **alignment panel**.
  - The first 10 amino acids of the three molecules are drawn as three rows of labelled beads, with position 2 highlighted.
  - At 9th, the beads show one-letter codes plus a key for the four that matter: H, A, G and Aib, by name.
  - At DE, they show GLP-1 numbering (7–16) above the rows.
  - A pair of scissors moves to the gap between positions 2 and 3 in each row: it **cuts** GLP-1 (the first two beads fall away) and **slips** on Gly and Aib.
  - Identical positions are joined by a thin line. Position 10 (V vs L) is visible but not highlighted.
- **Task:** Tap each row's position 2 to see what is there. Run the scissors on all three.
- **Goals:**
  - (a) all three rows' position 2 tapped
  - (b) the scissors run on all three
- **9th explanation:** "A protein's job depends on its shape, and its shape depends on the order of its amino acids, the order your DNA codes for. The scissors enzyme grips GLP-1 because position 2 is alanine (A). Exendin-4 has glycine (G) there, a different amino acid, and the scissors can't get a grip. Semaglutide has **Aib** there. Aib is not one of the 20 amino acids in the genetic code; there is no codon for it, so no cell builds it in from DNA. Chemists add it. One changed amino acid, and the enzyme can't cut. (The yeast cells that make semaglutide's protein chain follow DNA instructions; the fatty piece is added afterward by chemists.)"
- **DE explanation:** "DPP-4 is a serine protease whose S1 pocket strongly prefers Ala or Pro at P1 (position 2 from the free N-terminus). Gly2 in exendin-4 and the gem-dimethyl Aib8 in semaglutide are poor fits, so the N-terminus survives. Exendin-4 shares 16 of its first 30 residues with GLP-1(7-36) (~53%) yet activates the same receptor: it matches GLP-1 at 8 of the first 10 positions, and the N-terminal region is what the receptor's core needs. Position 2 is where the enzyme reads, so position 2 is what both evolution and engineering changed."
- **What you found prompt:** "What is at position 2 in each molecule, and what did the scissors do?"

**S6 · One message, many packets** (DE core; 9th only with Advanced Biology on, `adv:true`)

- **pre:** D11 (DE) / A2 (9th Advanced). **post:** D12.
- **Task:** Tap one glowing receptor. Follow the tally.
- **Scene:** a vertical chain beside the cell:
  - DE: hormone 1 → active G proteins 10 → cAMP 1,000 → "a wave of insulin packets", with each stage counting up.
  - 9th Advanced: "1 hormone → 10 relay switches → 1,000 small relay molecules → a wave of insulin packets".
  - A banner reads **"Numbers are illustrative, not measured."**
- **Goals:** (a) `amplificationViewed`, meaning the tally reached the last stage once.
- **Lighting at 9th:** A2 is optional and there is no post item, so S6's dot lights at 9th when its goal is met and its "What you found" box is filled. If the level or Advanced switch hides S6 while it is open, open S5.
- **9th explanation (Advanced):** "One hormone on the outside can move a lot of insulin, because the receptor switches on relay molecules inside the cell, each relay switches on many more, and together they tell the packets to go. A small signal outside becomes a big response inside."
- **DE explanation:** "One ligand-bound receptor activates many Gs proteins in turn; each active adenylyl cyclase makes many cAMP. PKA and Epac2 then act on the granule machinery. The fold numbers here are illustrative. For a cascade traced to its end, with blockable steps, see the Signal Relay (Bio Tool #14)."
- **What you found prompt:** "How can one hormone outside move so much insulin inside?"

## 7. Words on screen

### 7.1 9th grade

A word may appear only if it is in these lists or is defined where it appears.

- **Met before Unit 4** (from Units 1–3): amino acid, protein, enzyme, active site, substrate, shape, lipid, fatty acid, carbohydrate, glucose, cell membrane, phospholipid bilayer, vesicle, homeostasis, molecule, diffusion, energy, ATP.
- **Unit 4:** DNA, RNA, gene, codon, sequence, ribosome, ribosomes, translation, protein synthesis, synthetic biology, genetic code.
- **Tool-native: defined on screen** in every step that uses them, as "Words in this step" chips plus an inline definition at first use in each explanation:
  - hormone: "a chemical message carried in the blood";
  - receptor: "a protein in the cell membrane shaped to fit one message";
  - bind: "fit into and hold on";
  - signal: "a message that changes what a cell does";
  - insulin: "the hormone that tells body cells to take sugar out of the blood";
  - pancreas: "the organ that makes insulin";
  - beta cell: "the pancreas cell that makes insulin";
  - scissors enzyme: "an enzyme in the blood that cuts GLP-1 at its front end";
  - kidney filter: "where the kidneys strain small molecules out of the blood";
  - venom: "the toxic saliva some animals bite with";
  - type 2 diabetes: "a disease where blood sugar stays too high";
  - Aib: "a lab-made amino acid that is not in the genetic code";
  - relay molecule (Advanced only): "a molecule inside the cell that passes the message along".
- **Names allowed as names:** GLP-1, exendin-4, semaglutide, Ozempic, Gila monster, and the amino acids alanine (A), glycine (G) and histidine (H).

```js
const NINTH_FORBIDDEN = ["DPP-4","DPP4","dipeptidyl","peptidase","protease","GPCR","G protein","G-protein","Gs","cAMP","cyclic AMP",
 "adenylyl","adenylate","PKA","protein kinase","Epac","Epac2","second messenger","transduction","exocytosis","exocytose","granule",
 "half-life","half life","agonist","antagonist","incretin","albumin","glomerular","renal","clearance","peptide","polypeptide",
 "N-terminal","N-terminus","residue","ligand","affinity","occupancy","potency","persistence","K_ATP","hypoglycaemia","hypoglycemia",
 "exenatide","Byetta","liraglutide","acylated","diacid","Heloderma","L-cell","L-cells","endothelial","plasma","β cell","β-cell"];
// whole-word, case-insensitive. "beta cell" is allowed (defined chip). "GLP-1" is allowed as a name.
// "Gs" must be matched case-sensitively as a whole word so it does not catch ordinary words.
```

**9th-grade stage labels:**

- Gut
- Blood vessel
- Scissors enzyme
- Kidney filter
- Big blood protein (semaglutide only)
- Beta cell (pancreas)
- Receptor
- Insulin packet
- Insulin
- Blood sugar
- GLP-1
- Exendin-4 (Gila monster)
- Semaglutide (Ozempic)
- Position 2
- Aib (not in the genetic code)

**DE stage labels:**

- Intestinal L-cell
- Capillary lumen
- DPP-4
- Renal clearance
- Albumin
- β cell
- GLP-1R (class B GPCR)
- Gs
- Adenylyl cyclase
- cAMP
- PKA
- Epac2
- Insulin granule
- Plasma glucose
- GLP-1(7-37)
- GLP-1(9-37), inactive
- Exendin-4 / exenatide
- Semaglutide
- His7
- Ala8
- Gly2
- Aib8
- Arg34
- Lys26–C18 diacid

**Every level:** no string may say or imply that GLP-1 or any drug **enters** the beta cell. No string may call the cut product (GLP-1(9-37) or (9-36)amide) a partial agonist. Wrong options and `miss` notes in §8–§9 are exempt from these sentence rules, because they state misconceptions on purpose. No string may give a dose.

## 8. The 9th-grade bank (N1–N10, A1–A2)

Use this data exactly: the stems, option order, keys and the `why` and `miss` texts. Render items as the Energy Patch does. `src` is for Reid and is never rendered. The keys are spread A 3 · B 3 · C 3 · D 3.

```js
// 9th-grade bank. Permanent numbers: N1–N10, A1–A2. Never renumber; retire with retired:true.
// key = index (0–3) of the right option. miss = note for each wrong option.
// adv:true = shown only with Advanced Biology on, with an "Advanced Biology" badge; optional, never blocks a step.
const BANK9 = [
{n:"N1", step:"S1", role:"pre", topic:"Where the hormone goes",
 stem:"GLP-1 travels in the blood to a beta cell in the pancreas. What will it do when it gets there?",
 opts:["Go inside the cell and start making insulin","Fit into a receptor on the outside of the cell","Turn into insulin","Break the cell membrane open"], key:1,
 why:"GLP-1 does not need to enter the cell. It fits into a receptor, a protein in the cell membrane shaped to hold it. The receptor changes shape on the inside, and that change is the message the cell answers.",
 miss:{0:"It stays outside. Watch the receptor: the hormone sits in the cup on the outside while the cell responds inside.",
       2:"GLP-1 and insulin are different molecules. GLP-1 is the message; insulin is the cell's answer.",
       3:"Breaking the membrane would damage the cell. The message gets in through a receptor's change of shape, not through a hole."},
 src:"Misconception 1 (card §2)"},

{n:"N2", step:"S1", role:"post", topic:"How the message crosses the membrane",
 stem:"The hormone stayed outside the cell, yet the cell released insulin. How did the message get in?",
 opts:["The receptor changed shape inside the membrane when the hormone fit into it","Insulin leaked out of the blood into the cell","The hormone slipped through the phospholipid bilayer","Sugar carried the hormone in"], key:0,
 why:"The receptor spans the membrane. When the hormone fits its outside part, the receptor changes shape on the inside, and that change sets off the cell's response. The messenger stays out; the message gets in.",
 miss:{1:"Insulin moves the other way: the cell makes it and releases it into the blood.",
       2:"In the animation the hormone stayed outside the membrane. The receptor carried the message across.",
       3:"Sugar does not carry hormones. The hormone fits the receptor on its own."},
 src:"Unit 2 membrane structure; S1"},

{n:"N3", step:"S2", role:"pre", topic:"What ends the signal",
 stem:"Right after a meal, your gut releases GLP-1 into your blood. Predict: about how long until most of it is no longer working?",
 opts:["A few minutes","A few hours","About a day","It keeps working until you eat again"], key:0,
 why:"Half of your own GLP-1 is cut and useless within about 1 to 2 minutes, and almost all of it within 10. The scissors enzyme in your blood cuts it at its front end.",
 miss:{1:"That is how long the Gila monster's version lasts, as you'll see in step 3. Yours is far shorter.",
       2:"Far too long. Run the clock in the 15-minute window and watch the curve.",
       3:"Your body clears it within minutes of every release, so the signal follows the meal you just ate."},
 src:"SIGNAL_DATA glp1.text9"},

{n:"N4", step:"S2", role:"post", topic:"Why a short signal is useful",
 stem:"Why might it help your body that GLP-1 is destroyed so quickly?",
 opts:["It saves energy by making less insulin forever","It lets GLP-1 get into the cell","It makes the receptor stronger","It keeps the insulin signal tied to the meal you just ate"], key:3,
 why:"Because GLP-1 is gone within minutes, its signal only lasts while food is arriving. When the meal is over, the message stops. That is homeostasis: a response that switches off when it is no longer needed.",
 miss:{0:"Insulin release goes back up after the next meal. Nothing about it is permanent.",
       1:"GLP-1 works from outside the cell, and a cut GLP-1 cannot even fit the receptor.",
       2:"Cutting the hormone does not change the receptor. A cut hormone simply cannot fit."},
 src:"S2; homeostasis (Unit 2)"},

{n:"N5", step:"S3", role:"pre", topic:"Longer vs stronger",
 stem:"Semaglutide lasts much longer in the blood than your own GLP-1. Predict what that means for the receptor.",
 opts:["It switches the receptor on harder","It cannot fit the receptor at all","It switches the receptor on just as hard, but for much longer","It goes into the cell instead"], key:2,
 why:"In the model, all three molecules switch the receptor on equally hard at the start. The 'Signal strength at the start' gauge is the same for each. What differs is how long the signal lasts. Longer is not stronger.",
 miss:{0:"Check the gauge: the starting signal is the same for all three. Semaglutide's advantage is time, not strength.",
       1:"It fits the same receptor; the receptor lights the same way in the animation.",
       3:"All three work from the receptor on the surface; none has to enter the cell."},
 src:"Misconception 2; Lau 2015"},

{n:"N6", step:"S3", role:"post", topic:"Venom vs medicine",
 stem:"Which statement about the Gila monster and the diabetes medicine is accurate?",
 opts:["The medicine is venom collected from Gila monsters","The medicine is the lizard's insulin","The venom molecule cannot fit human receptors","The medicine is a copy of a venom molecule, made in a lab"], key:3,
 why:"Scientists found exendin-4 in Gila monster venom in 1992. The medicine made from it is a copy built in a lab, so no lizards are milked. It fits the same human receptor as your own GLP-1, but the scissors enzyme can't cut it.",
 miss:{0:"No venom is collected. The medicine is a lab-made copy of one molecule found in the venom.",
       1:"Exendin-4 is not insulin. It is a message that tells your beta cells to release insulin.",
       2:"It fits the human receptor; that is exactly why it works as a medicine."},
 src:"Misconception 4; Eng 1992; Byetta label"},

{n:"N7", step:"S4", role:"pre", topic:"Does blood sugar matter?",
 stem:"The hormone is bound to the receptors, but blood sugar is low. Predict what the cell does.",
 opts:["Releases lots of insulin anyway","Releases no extra insulin","Takes the hormone inside","Makes more receptors"], key:1,
 why:"The cell adds extra insulin only when blood sugar is high. At low or normal blood sugar the hormone adds nothing, which is why this signal can't push blood sugar too low on its own.",
 miss:{0:"Run it: at low blood sugar the insulin bar stays the same with the hormone on or off.",
       2:"The hormone works from the receptor on the surface at every blood sugar level.",
       3:"Nothing in the model changes the number of receptors. Watch the insulin bar instead."},
 src:"Misconception 3; Nauck 1993"},

{n:"N8", step:"S4", role:"post", topic:"Reading the evidence",
 stem:"At normal blood sugar, insulin release was the same with the hormone on and off. What does that show?",
 opts:["The hormone was cut before it arrived","Normal blood sugar blocks the receptor","The hormone's effect depends on blood sugar being high","Insulin was not being made at all"], key:2,
 why:"With the hormone bound and blood sugar normal, nothing extra happened; at high blood sugar, the hormone added a lot. So the hormone's effect depends on blood sugar. Doctors saw this in people in 1993.",
 miss:{0:"In step 4 the receptors were glowing, so the hormone had arrived and bound.",
       1:"The receptors stayed bound and glowing; the cell simply didn't add extra insulin.",
       3:"There was some insulin release at normal blood sugar, with or without the hormone. Blood sugar itself causes some."},
 src:"S4 readout"},

{n:"N9", step:"S5", role:"pre", topic:"What the enzyme reads",
 stem:"The scissors enzyme cuts GLP-1 but not exendin-4. Exendin-4 differs at position 2. Predict why one difference matters.",
 opts:["The enzyme only fits a molecule with the right amino acid at that spot","Exendin-4 is too long to cut","Exendin-4 is made of DNA","The enzyme is turned off in lizards"], key:0,
 why:"An enzyme fits its substrate by shape, like a key in a lock. The scissors grip GLP-1 because position 2 is alanine. Change that one amino acid and the enzyme can't hold on, so it can't cut.",
 miss:{1:"Its length isn't the reason. Watch the scissors slip at position 2, near the front end.",
       2:"Exendin-4 is a chain of amino acids, a protein, not DNA.",
       3:"The scissors in the model are in human blood. They meet exendin-4 and still can't cut it."},
 src:"S5; Unit 1 enzymes (active site)"},

{n:"N10", step:"S5", role:"post", topic:"Aib and the genetic code",
 stem:"Semaglutide has Aib at position 2. Why can't a cell put Aib into a protein by itself?",
 opts:["Aib is a sugar, not an amino acid","Cells have no ribosomes","There is no codon for Aib in the genetic code","Aib is only found in Gila monsters"], key:2,
 why:"Cells build proteins by reading codons, and the genetic code has codons for only 20 amino acids. Aib is not one of them, so no cell builds it in from DNA instructions. Chemists add it. That is synthetic biology: changing a natural molecule on purpose.",
 miss:{0:"Aib is an amino acid. It just isn't one of the 20 the genetic code uses.",
       1:"Cells do have ribosomes; they read codons, and no codon calls for Aib.",
       3:"Aib is made by chemists. The Gila monster's molecule has glycine at position 2, not Aib."},
 src:"Unit 4 codons; LT synthetic biology (BIO.5e)"},

{n:"A1", step:"S3", role:"post", adv:true, topic:"Two different reasons",
 stem:"Exendin-4 and semaglutide both escape the scissors. Why does semaglutide last so much longer than exendin-4?",
 opts:["It binds the receptor more tightly","It enters the beta cell and hides there","It has more amino acids","Its fatty piece rides on a big blood protein that the kidneys don't filter"], key:3,
 why:"Both escape the scissors, but exendin-4 is still filtered out by the kidneys over hours. Semaglutide's fatty piece lets it ride on a large blood protein that is too big for the kidney filter, so it stays in the blood for about a week.",
 miss:{0:"In the model all three switch the receptor on equally. Lasting longer is not binding harder.",
       1:"The signal starts at the surface receptor; nothing in this tool hides inside the cell.",
       2:"Exendin-4 is actually longer: 39 amino acids against semaglutide's 31."},
 src:"Lau 2015; Byetta label (renal clearance)"},

{n:"A2", step:"S6", role:"pre", adv:true, topic:"A small signal, a big response",
 stem:"One hormone binds one receptor. Predict: how many insulin packets can that start moving?",
 opts:["Exactly one","Many, because each step inside the cell switches on many of the next","None until a second hormone arrives","Only the packets touching that receptor"], key:1,
 why:"The receptor switches on relay molecules inside the cell, and each of those switches on many more. A single message outside becomes a large response inside. The tool's numbers are illustrative, but the pattern of multiplying at each step is real.",
 miss:{0:"Follow the tally: the count grows at every step.",
       2:"One bound receptor is enough to start the relay.",
       3:"The relay molecules spread through the cell, so packets far from the receptor respond too."},
 src:"S6"}
];
```

## 9. The DE bank (D1–D12)

The same rendering as §8, plus `sam`, shown after `miss` as in the Checkpoint Companion. The keys are spread A 3 · B 3 · C 3 · D 3.

```js
// DE bank. Permanent numbers: D1–D12. Never renumber. sam = Student-Authored Module prompt per wrong option.
const BANKDE = [
{n:"D1", step:"S1", role:"pre", topic:"Reception without entry",
 stem:"GLP-1 is a 30–31-residue peptide. Which statement best describes how it signals a β cell?",
 opts:["It binds the extracellular domain and outer transmembrane core of a membrane GPCR from outside the cell","It diffuses through the bilayer and binds an intracellular receptor","It enters by endocytosis and is converted to insulin","It opens a ligand-gated ion channel that lets glucose in"], key:0,
 why:"A peptide this size and this polar cannot cross the bilayer. GLP-1R is a class B GPCR; ligand binding changes its conformation, and transduction proceeds intracellularly without the ligand.",
 miss:{1:"That is the route for small hydrophobic signals such as steroids, not a polar peptide.",
       2:"Receptor internalisation happens, but signalling does not depend on the ligand entering, and GLP-1 is never converted to insulin.",
       3:"GLP-1R is a GPCR, not an ion channel, and glucose enters β cells through transporters."},
 sam:{1:"Write a SAM question that sorts signals by whether they can cross the bilayer, and names the receptor location for each.",
      2:"Write a SAM question on why a hormone and the response it triggers are different molecules.",
      3:"Write a SAM question contrasting a GPCR with a ligand-gated ion channel."},
 src:"Campbell Ch. 5 reception (concept only); Müller 2019"},

{n:"D2", step:"S1", role:"post", topic:"Which stage is which",
 stem:"In the order reception → transduction → response, which pairing is correct for this system?",
 opts:["Reception: insulin exocytosis","Transduction: GLP-1 binding the receptor","Response: insulin granule exocytosis","Response: cAMP synthesis"], key:2,
 why:"Reception is GLP-1 binding GLP-1R; transduction is the Gs–adenylyl cyclase–cAMP relay; the response is insulin granule exocytosis.",
 miss:{0:"Exocytosis is the end of the pathway: the response.",
       1:"Binding is reception; transduction is the relay inside.",
       3:"cAMP is a second messenger, which makes it part of transduction."},
 sam:{0:"Write a SAM question that has a student place five events from this pathway into reception, transduction or response.",
      1:"Write a SAM question that asks where reception ends and transduction begins.",
      3:"Write a SAM question on what makes a molecule a second messenger."},
 src:"Ch. 5 three stages"},

{n:"D3", step:"S2", role:"pre", topic:"What DPP-4 does",
 stem:"DPP-4 inactivates GLP-1(7-37) within minutes. What does it do?",
 opts:["Removes the N-terminal dipeptide His-Ala, leaving GLP-1(9-37), which is inactive at the receptor","Cleaves GLP-1 into single amino acids","Adds a phosphate that blocks binding","Removes the C-terminal Gly-Arg-Gly"], key:0,
 why:"DPP-4 is an exopeptidase that removes N-terminal dipeptides, strongly preferring Ala or Pro at position 2. Losing His7-Ala8 leaves a product that no longer activates the receptor.",
 miss:{1:"It removes only the first two residues; the rest of the chain is left intact.",
       2:"DPP-4 is a protease; it cuts peptide bonds. It does not phosphorylate.",
       3:"It works from the N-terminus, which is the end the receptor needs."},
 sam:{1:"Write a SAM question distinguishing an exopeptidase from an enzyme that digests a protein completely.",
      2:"Write a SAM question on how proteases and kinases change a protein differently.",
      3:"Write a SAM question on why the N-terminal residues matter for GLP-1R activation."},
 src:"Mentlein 1993; Kieffer 1995"},

{n:"D4", step:"S2", role:"post", topic:"Reading a half-life",
 stem:"In this model, native GLP-1's half-life is 1.5 min (the published range is 1–2 min). Starting from 100%, about how much intact GLP-1 is left at 10 min?",
 opts:["About 50%","About 25%","About 10%","About 1%"], key:3,
 why:"10 min is about 6.7 half-lives, and 0.5^6.7 ≈ 0.01. After 10 minutes, roughly 1% is left, which is why the 15-minute window shows the curve flat on the floor.",
 miss:{0:"50% is what remains after one half-life, about 1.5 min.",
       1:"25% is after two half-lives, about 3 min.",
       2:"10% is after about 3.3 half-lives, about 5 min, and the model calls that the end of the signal."},
 sam:{0:"Write a SAM question that has students compute remaining fraction after n half-lives.",
      1:"Write a SAM question that converts a time into a number of half-lives.",
      2:"Write a SAM question on why 'signal on' needs a threshold and what choosing one assumes."},
 src:"SIGNAL_DATA; Müller 2019"},

{n:"D5", step:"S3", role:"pre", topic:"Potency vs persistence",
 stem:"Semaglutide's half-life is more than 5,000 times longer than native GLP-1's. Predict its peak effect at the receptor, relative to GLP-1.",
 opts:["More than 5,000 times greater","Zero, because it is never released from albumin","Similar; the difference is duration, not peak activation","Greater, because the fatty acid opens the receptor"], key:2,
 why:"Half-life measures persistence, not potency. In this model the peak occupancy is the same for all three. In reality semaglutide's receptor affinity is slightly lower than liraglutide's; its advantage is that it stays in circulation.",
 miss:{0:"That confuses how long a ligand lasts with how hard it activates the receptor.",
       1:"Albumin binding is reversible; the free fraction binds the receptor.",
       3:"The fatty diacid binds albumin. It is not what activates GLP-1R."},
 sam:{0:"Write a SAM question that separates potency, efficacy and duration of action.",
      1:"Write a SAM question on how reversible binding to a carrier protein can lengthen a drug's life.",
      3:"Write a SAM question on what each of semaglutide's three changes is for."},
 src:"Lau 2015"},

{n:"D6", step:"S3", role:"post", topic:"Why exenatide still clears",
 stem:"Exendin-4 resists DPP-4, yet exenatide's half-life is only about 2.4 h. What mainly removes it?",
 opts:["Hepatic conversion to insulin","DPP-4 acting more slowly","Uptake into β cells","Renal filtration, followed by proteolysis"], key:3,
 why:"The Byetta label states that exenatide is predominantly eliminated by glomerular filtration with subsequent proteolytic degradation. Escaping DPP-4 removes the fast route, but not the kidney.",
 miss:{0:"Peptides are not converted into insulin; insulin is a separate gene product.",
       1:"Gly2 blocks DPP-4 cleavage outright; the clearance comes from elsewhere.",
       2:"β cells respond to the ligand; they are not where it is cleared."},
 sam:{0:"Write a SAM question on the difference between a signal and the response it triggers.",
      1:"Write a SAM question on why resistance to one enzyme does not make a peptide permanent.",
      2:"Write a SAM question that lists the routes by which a peptide drug leaves the blood."},
 src:"Byetta label §12.3"},

{n:"D7", step:"S4", role:"pre", topic:"Glucose dependence",
 stem:"With GLP-1R occupied and plasma glucose low, what does the β cell do?",
 opts:["Secretes insulin at maximum rate","Secretes little or no extra insulin; GLP-1 amplifies glucose-triggered secretion","Stops making cAMP","Releases GLP-1R into the blood"], key:1,
 why:"cAMP via PKA and Epac2 amplifies exocytosis triggered by glucose metabolism and Ca²⁺ entry. With glucose low, there is little to amplify, so the hormone adds little or nothing.",
 miss:{0:"That would cause hypoglycaemia, and it is exactly what GLP-1 does not do.",
       2:"The receptor still signals; the response is limited downstream by the glucose trigger.",
       3:"Receptors are membrane proteins; they are not released."},
 sam:{0:"Write a SAM question on why a glucose-dependent drug carries low hypoglycaemia risk.",
      2:"Write a SAM question on where in the pathway glucose and cAMP meet.",
      3:"Write a SAM question on what limits a cell's response when the receptor is fully occupied."},
 src:"Nauck 1993; Müller 2019"},

{n:"D8", step:"S4", role:"post", topic:"Reading Nauck 1993",
 stem:"GLP-1 was infused into people with type 2 diabetes. Glucose fell to normal, and insulin then returned toward basal despite continued infusion. What does this support?",
 opts:["GLP-1's insulinotropic effect is glucose-dependent","GLP-1 is degraded once glucose is normal","Insulin secretion is independent of glucose","The receptor was destroyed"], key:0,
 why:"The hormone was still being infused, so ligand was present, but insulin fell as glucose normalised. The response depends on glucose, not on the ligand alone.",
 miss:{1:"Degradation rate does not depend on glucose, and the infusion kept supplying intact hormone.",
       2:"The study shows the opposite: insulin tracked glucose.",
       3:"Nothing requires receptor loss: the hormone was still present, so the limit is downstream, at glucose."},
 sam:{1:"Write a SAM question that asks what a continuous infusion controls for in this experiment.",
      2:"Write a SAM question that asks students to state the evidence and the claim separately for Nauck 1993.",
      3:"Write a SAM question on how to tell receptor loss from a downstream limit."},
 src:"Nauck 1993 (doi:10.1007/BF00401145)"},

{n:"D9", step:"S5", role:"pre", topic:"The residue DPP-4 reads",
 stem:"DPP-4 strongly prefers Ala or Pro at position 2 from the N-terminus. Exendin-4 has Gly2; semaglutide has Aib8 (its position 2). Predict DPP-4's effect on each.",
 opts:["Cleaves both","Cleaves neither","Cleaves exendin-4 only","Cleaves semaglutide only"], key:1,
 why:"Neither residue fits DPP-4's specificity at that position, so both N-termini survive. Run the scissors in S5: they slip on both.",
 miss:{0:"DPP-4 needs Ala or Pro at position 2 to cut efficiently; neither molecule has one.",
       2:"Gly2 is exactly what protects exendin-4.",
       3:"Aib8 was put there to block DPP-4."},
 sam:{0:"Write a SAM question on enzyme specificity at a single residue.",
      2:"Write a SAM question comparing Gly and Ala side chains and what that does to fit.",
      3:"Write a SAM question on why engineers chose a non-coded amino acid for position 8."},
 src:"Müller 2019; Lau 2015"},

{n:"D10", step:"S5", role:"post", topic:"Sequence identity and function",
 stem:"Exendin-4 shares 16 of its first 30 residues with GLP-1(7-36), about 53%, yet activates the same receptor. What is the best inference?",
 opts:["Any two peptides with 50% identity bind the same receptor","Exendin-4 must use a different receptor","Identity above 90% is required for receptor binding","Receptor activation depends on specific key residues and the overall fold, not total identity"], key:3,
 why:"Function tracks the residues that contact the receptor and the shape they adopt. The N-terminal region is critical, and exendin-4 matches GLP-1 at 8 of its first 10 positions.",
 miss:{0:"Percent identity alone predicts little; which residues match matters.",
       1:"Göke et al. (1993) showed exendin-4 acts at the GLP-1 receptor on β cells.",
       2:"Exendin-4 binds at ~53% identity, so no such cutoff exists here."},
 sam:{0:"Write a SAM question on why percent identity can mislead about function.",
      1:"Write a SAM question on the evidence that exendin-4 uses GLP-1R.",
      2:"Write a SAM question linking primary sequence to tertiary structure to binding."},
 src:"Müller 2019; Göke 1993; UniProt P01275, P26349"},

{n:"D11", step:"S6", role:"pre", topic:"Where amplification happens",
 stem:"In the GLP-1R pathway, which step multiplies the signal most, so one bound receptor yields many messenger molecules?",
 opts:["Ligand binding","Insulin binding its own receptor","Gs activating adenylyl cyclase, which makes many cAMP","DPP-4 cleavage"], key:2,
 why:"An activated receptor activates multiple G proteins, and each active adenylyl cyclase converts many ATP to cAMP. The enzymatic step is where the count jumps.",
 miss:{0:"One ligand binds one receptor; binding itself does not multiply anything.",
       1:"That is a different pathway, in the insulin's target cells.",
       3:"DPP-4 ends the signal; it does not amplify it."},
 sam:{0:"Write a SAM question on why enzymatic steps, not binding steps, amplify.",
      1:"Write a SAM question that separates the GLP-1R pathway in β cells from insulin signalling in muscle.",
      3:"Write a SAM question on the steps that terminate a GPCR signal."},
 src:"Ch. 5 transduction (concept only)"},

{n:"D12", step:"S6", role:"post", topic:"Second messengers",
 stem:"Why is cAMP called a second messenger in this pathway?",
 opts:["It is the second hormone released after a meal","It carries the signal inside the cell after the first messenger, GLP-1, binds outside","It is made by DPP-4","It enters the blood and reaches the liver"], key:1,
 why:"GLP-1 is the first messenger, outside. cAMP is made inside in response and spreads the signal through the cytosol to PKA and Epac2.",
 miss:{0:"cAMP is an intracellular molecule, not a hormone.",
       2:"Adenylyl cyclase makes cAMP from ATP; DPP-4 is a protease in the blood.",
       3:"cAMP acts inside the cell that made it."},
 sam:{0:"Write a SAM question contrasting first and second messengers with an example of each.",
      2:"Write a SAM question tracing cAMP from its synthesis to its breakdown.",
      3:"Write a SAM question on why second messengers stay inside the cell."},
 src:"Ch. 5 second messengers (concept only)"}
];
```

## 10. Acceptance tests

### 10.1 The test hook

Expose `window.__SP`, the way the Energy Patch exposes `window.__EP`. It must not change behaviour.

```js
window.__SP = {
  st: () => st,
  goStep(i),                                  // 0..5 = S1..S6
  setLevel("nine"|"de"), setAdv(true|false), setDev("ipad"|"pc"),
  fill(true|false), cardHidden(true|false),
  set(name, value),   // "glucose" "low|normal|high", "scissors" true|false, "molecule" "glp1|ex4|sema",
                      // "hormone" true|false, "window" "15m|1d|3w|log", "speed" 0.5|1|2, "teach" true|false, "overlay" true|false
  meal(),             // "Eat a meal"
  inject(),           // "Release / Inject" for the current molecule
  tapPos2(row),       // S5: "glp1" | "ex4" | "sema"
  runScissors(row),   // S3 or S5; returns "cut" | "slip"
  tapReceptor(k),     // S6
  answer(itemId, optionIndex),
  type(stepKey, text),              // fill a "What you found" box
  run(seconds),                     // advance the MODEL clock (real-world seconds of body time) fast, without drawing
  tokens(),                         // [{kind, x, y, inCell:boolean, onAlbumin:boolean}] for every drawn token, scene world units
  gauge(mol),                       // the 'Signal strength at the start' value for mol (0–1)
  stepDone(i), visSteps(),          // as in the Energy Patch hook
  remaining(mol, tMin),             // % remaining from the model, for mol at tMin minutes
  counts(),  // { bindings, cutCount, slipCount, filtered, filteredAlbumin, insulinRate, insulinReleased, hormoneInsideCell,
             //   signal, clockMin, ran:{glp1,ex4,sema}, amplificationViewed }
  items(level), allText(level),     // as in the Energy Patch: every string that level can show
  colours(), fps(), requests()      // requests(): every network URL the page has requested
};
```

### 10.2 The tests

- Run every test at **1180 × 820** in both device settings unless it says otherwise.
- Report each as PASS or FAIL, with a one-line reason for each FAIL.

| # | Test | How to check |
|---|---|---|
| **T1** | **Decay matches the data block** | For each molecule, `remaining()` matches `100·0.5^(t/halfLifeMin)` within 0.5 percentage points at the §4.1 checkpoints (1.5 min, 10 min, 2.4 h, 24 h, 160 h, 1 week, 21 days). The drawn curve's pixel y at those times matches within 2% of the axis height (by screenshot). |
| **T2** | **Displayed numbers agree with `SIGNAL_DATA`** | Collect every number-with-unit and every percentage in `allText(level)`. Each must equal a `SIGNAL_DATA` value or its stated derivation (the "about 5 minutes / 8 hours / 3 weeks" on-times, D4's 50% / 25% / 10% / 1% and 6.7 half-lives, D5's "more than 5,000 times"). **Allowed literals** that are not model values: citation years (1992, 1993, 2005, 2017), "20 amino acids", "8 of its first 10", the glucose mg/dL values, and the 30-minute "What if nothing cut it?" curve, which must carry that label. List anything else. By code review, the simulation reads half-lives, glucose gates and the threshold from `SIGNAL_DATA`, never from literals. |
| **T3** | **No hormone token inside the cell (model rule)** | In S1–S4, at both levels, `run(600)` with `meal()` and `inject()` repeated, sampling `tokens()` every simulated 10 s: no hormone token has `inCell === true`, and `counts().hormoneInsideCell === 0` throughout. |
| **T4** | **The scissors** | S2: with scissors On, `cutCount` rises, and GLP-1 remaining ≈ 1% at 10 min. With scissors Off, the thought-experiment curve is labelled "What if nothing cut it?" in the DOM and on the graph. In S3/S5, `runScissors("glp1") === "cut"` and `runScissors("ex4") === runScissors("sema") === "slip"`. |
| **T5** | **Kidney and albumin** | S3, exendin-4: `filtered` rises over `run(4*3600)`. Semaglutide, same run: `counts().filteredAlbumin === 0` (no token with `onAlbumin` is ever filtered); free semaglutide tokens may be. |
| **T6** | **Same peak, different duration** | S3 overlay: `gauge("glp1") === gauge("ex4") === gauge("sema")`. "Signal stays on for" reads the derived times (≈5 min, ≈8 h, ≈22 days, ±10%). |
| **T7** | **Glucose gate** | S4, hormone On vs Off at each setting, using `counts().insulinRate`. Low: On = Off = 0. Normal: On = Off = 0.10. High: On − Off = 0.7 × signal (±0.02). |
| **T8** | **9th-grade vocabulary** | For every string in `allText("nine")` and the rendered 9th DOM: no `NINTH_FORBIDDEN` entry (whole word, case-insensitive; "Gs" case-sensitive). Every tool-native word a step uses appears in that step's chips. |
| **T9** | **Forbidden claims, every level** | Over `allText(level)` **minus wrong options and `miss` notes** (they state misconceptions on purpose): no string matches `/partial agonist/i`, `/never enters/i`, `/\b(dose|milligram)\b/i`, or `/(enter|enters|entering|goes into)[^.]{0,40}(beta|β) cell/i` unless the sentence also contains "not" or "does not need". Review any hits by hand and list them. |
| **T10** | **S5 alignment** | The rows render `first10` exactly for each molecule. Position 2 is highlighted. DE shows GLP-1 numbering 7–16. The 9th view includes the sentence "there is no codon for it". Identity text equals `identityEx4vsGLP1.text`. |
| **T11** | **Touch targets** | iPad setting: every button, option, chip and step dot has a rect ≥44 × 44. The S5 position-2 beads and the S6 receptors are drawn on the canvas, so each gets a **transparent DOM button laid over it** with an `aria-label` (e.g. "Position 2 of exendin-4: glycine"); those buttons count here too. Report any under 48. |
| **T12** | **Layout** | At 1180 × 820 and 1180 × 750 with `fill(true)`: `scrollHeight <= innerHeight + 1`, and the canvases and controls lie inside the viewport. At 820 × 1180, 768, 390 and 360 wide: `scrollWidth <= innerWidth`, and the stage stays pinned while the card scrolls (scroll the card and check the canvas `getBoundingClientRect().top` is unchanged). |
| **T13** | **Reduced motion** | With `prefers-reduced-motion: reduce` emulated, no token tweens: two `tokens()` reads 50 ms apart, with no model tick between them, are identical. Every goal can still be met. |
| **T14** | **Steps, dots and levels** | Every step opens from its dot. `stepDone(i)` is true only when pre, goals, post and "What you found" (≥8 chars) are all done. **Exception, S6 at 9th:** its pre is A2 (optional) and it has no post, so it needs only its goal and "What you found". A-items never block. `set("teach",true)` opens everything and makes no `stepDone` true. `visSteps()` excludes S6 at 9th with Advanced Off and includes it with Advanced On. Switching level on any step keeps progress and changes text, labels, bank and eyebrow without a reload; switching from S6 to a level where S6 is hidden opens S5. |
| **T15** | **Banks intact** | `items("nine")` = N1–N10 + A1–A2 and `items("de")` = D1–D12, exactly as §8–§9. A wrong answer shows its `miss` (plus `sam` at DE), then `why`. `src` never renders. |
| **T16** | **Saving and privacy** | A reload restores level, Advanced, step, answers, goals, typed sentences, window and fill. With `localStorage` throwing, the page loads and runs. `requests()` lists only the page and Google Fonts (Mol\* only after a Go further click). No `fetch`, `XMLHttpRequest`, `sendBeacon` or form `action` exists in the file. No console errors. |
| **T17** | **Contrast** | For every pair in `colours()`, in light and dark (emulated) themes: labels ≥4.5:1 and token fills against the stage ≥3:1. |
| **T18** | **Frame rate** (informational) | iPad setting, S3 overlay running, 5 s real time: report `fps()`. FAIL only if < 30 in headless Chromium. |
| **T19** | **CER box hidden** | With `CER_LINKS = []` as shipped, no "Use this in your CER" box is in the DOM. Temporarily setting it to one entry renders the box (test, then revert). |
| **T20** | **Nothing else changed** | `git diff --name-only main...HEAD` lists **only** `biology/tools/signal-patch.html`. |

### 10.3 The report back

Post one message with:

1. The branch, commit hash and PR link.
2. The T1–T20 table, for the iPad and Computer settings.
3. Screenshots at 1180 × 820:
   - 9th, S1 with receptors glowing;
   - 9th, S3 overlay on *First 3 weeks*;
   - 9th, S5 alignment;
   - DE, S4 at High with the readout;
   - DE, the log window with all three curves;
   - DE, S6 tally;
   - Teaching view with a pinned callout.
4. Screenshots at 820 × 1180: one in portrait, with the stage pinned and the card scrolled.
5. Anything you could not do, or did differently, and why.

Then stop. Do not merge.

## 11. After Reid reviews (not part of this build)

These are listed so the builder knows they are deliberately left out.

- **Review on the iPad.** GitHub Pages serves only `main`, so a PR has no live preview. Reid can review the screenshots and the branch file, then merge. The page is live at its URL from that moment, but unlisted until the steps below.
- **Classroom-tools hub:** list it as **Bio Tool #15** under **Unit 4 · Nucleic Acids & Protein Synthesis**, using the existing `<li>` pattern.
- **DE hub:** list it in **Unit 5 · Membrane Transport and Cell Signaling**, under the tools-first sort rule, after Bio Tool #14 (The Signal Relay).
- **Cross-link** from the Signal Relay's Go further box (a one-line edit to `signal-relay.html`).
- **Sitemap and search:** add the URL to `sitemap.xml` and rebuild `search-index.js` with `One Pagers/build-search-index.py` on the Mac.
- **CER links:** once the Gila monster CER pages exist (9th Unit 4; DE two-page version), fill `CER_LINKS`, and link the tool from each CER page. The CER's data table must use §4.1's values.
- **Canvas links** (ExternalUrl, new tab, linking to the site, never re-hosted):
  - Biology I 425631 and Adv Biology I 425639, Unit 4, mirrored;
  - the DE course, Unit 5 (Ch. 5).
- **Deadlines:** the DE view must be live before **Mon 11/2** (DE Unit 5, Ch. 5, runs 11/2–11/13). The 9th view must be live before **Fri 11/13** (Unit 4 runs 11/13–12/11). The DE date binds first.

## 12. Leg 1 record (for Reid; the builder can skip this)

- **Number.** The card guessed #12. #12 (DE Cell Structure Crosswords), #13 (Cell Check) and #14 (The Signal Relay) all went live first, on 9/29 and 10/3, so this is **#15**. That was confirmed on the live classroom-tools and DE hubs on 2026-10-03.
- **Recommendations taken into this brief.** Each one stands unless Reid says otherwise.
  1. House level labels `9th Grade SOL Bio` / `DE Bio`, instead of "Biology / College Biology".
  2. S5, the amino-acid zoom, is core at 9th grade, because it is the Unit 4 lesson. Only S6 sits behind Advanced Biology.
  3. A kidney filter and albumin are added, so the science is right about *why* each drug lasts.
  4. A switchable time axis at 9th; log only at DE.
  5. Teacher notes go on the page, in a collapsed section.
  6. The name stays "The Signal Patch" beside "The Signal Relay". They are different tools in the same unit, and each links to the other.
- **Science corrections against the card:**
  - Semaglutide's half-life is "~1 week, about 160 h", not 165 h.
  - GLP-1(9-36) is "inactive", not a partial agonist.
  - The manufacture line is limited to what the label says.
  - The 53% identity is on a denominator of 30.
- **Not read in Leg 1:** the BFHS Assistance CER plan (`2026-10-03-PLAN-Gila-monster-Ozempic-CER-two-tiers.md`). It sits in a project this session cannot open. The card's summary of it was used. When the CER is built, check its numbers against §4.1, not the other way round.
