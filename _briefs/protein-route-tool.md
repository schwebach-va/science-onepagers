# Build brief: The Protein Route (Bio Tool #18)

Follow insulin out of a pancreas beta cell, from the gene in the nucleus to the blood. The same cell sends three other proteins to three other places, so students see the organelles that build proteins working as one route rather than as a list. There are two levels: 9th grade and DE.

- **Brief version:** v1, written 2026-10-03 in the Cowork project "DE Bio laboratories and Canvas", from Reid's request that day. The design reasons are in §12 for Reid; the builder can skip §12.
- **Who reads this:** the Claude Code cloud session that builds the page. This file is the whole spec. Everything the build needs is here.
- **Where it lives:** `_briefs/protein-route-tool.md` in `schwebach-va/science-onepagers`. Jekyll skips folders that start with `_`, so this file is never served. Do not add a `.nojekyll`.
- **Amended 2026-10-04, after Reid's review of the build:** N1's first miss note reworded ("builds only the copy, the message") and a Unit-4-words variant added as `missU4` ("builds only mRNA"); the level switch reads "SOL Bio" / "DE Bio"; the fine note gained the screenshot, Fill-screen and pinch-zoom sentences; a next-step ring (lime green, one control at a time) marks what to press next. Tests T1–T21 re-run; T22 added for the ring.
- **Checked before handoff:** every key in §8–§9 against its option list; a `miss` for every wrong option; a `sam` for every DE wrong option; the 9th-grade forbidden-word list over every 9th string in §6 and §8; the insulin numbers against UniProt P01308; the four sources in §4.3 against PubMed (PMIDs given). An independent review pass then read the brief cold; 16 of its 17 findings are applied (option lengths evened so no key stands out, the proinsulin arithmetic closed with its four linking residues, the chase run at Low and High so it agrees with the glucose gate, 9th sorting matched to DE, history and wording fixes). The one not applied: it questioned "BIO.2d (protein synthesis)", but in the 2018 Virginia standards BIO.2d is protein synthesis, matching Reid's Year Analysis.

---

## 0. The job, in one screen

1. Build **one new file**: `biology/tools/protein-route.html`.
   - Permanent URL: `https://scienceonepagers.org/biology/tools/protein-route.html`.
   - It is **Bio Tool #18**. The title is "The Protein Route".
2. It must be self-contained:
   - plain HTML, CSS and JS in one file;
   - no build step, no framework, no external script;
   - Google Fonts is the only external request, loaded the way `biology/tools/organelles-energy.html` loads it.
3. Commit on a new branch and push that branch.
   - If the session assigns a working branch (usually `claude/…`), use it. Otherwise use **`claude/protein-route-tool`**.
   - Open a pull request into `main` and stop. **Do not merge.** Say in the report which branch and PR you used.
4. **Do not edit any existing file.** That includes `biology/classroom-tools.html`, `biology/de-biology-101-resources.html`, `sitemap.xml`, `search-index.js`, `search.html`, `style.css`, this brief and every other page. Hub listings, search and Canvas links come after Reid reviews (§11).
5. Test with Playwright and Chromium at **1180 × 820** (iPad landscape) and **820 × 1180** (iPad portrait), at both levels and in both device settings. Report **every test in §10 as PASS or FAIL**, with a one-line reason for each FAIL, and attach the screenshots in §10.3.
6. **Collect no data.** Nothing a student types or taps leaves the device. No analytics, no form posting, no fetch.
7. Nothing publishes without Reid. The branch is for his review.

**How the push works.** The Water Patch (#10), the Energy Patch (#11) and the Signal Patch (#15) were built by cloud sessions started at claude.ai/code with this repository selected. Each pushed its own branch and Reid merged the PR. **If `git push` is refused, do not hunt for a workaround.** Keep the commit, report the refusal word for word, and stop.

**When it is needed.** DE Unit 4 (Tour of the Cell) runs Oct 7–16, and the Biology I Module 2 test window opens Oct 19. Reid wants to review and merge by **Mon Oct 12**. Build both levels in one pass.

## 1. Read these first (the house pattern)

| File | What to take from it |
|---|---|
| `biology/tools/signal-patch.html` (Bio Tool #15, The Signal Patch) | **The sibling tool, and the newest Patch. Copy its skeleton closely**: the `:root` tokens and both dark-mode blocks; `.topbar` with the `.seg` switches (Running on: iPad / Computer); the level switch `9th Grade SOL Bio` / `DE Bio`; the Advanced Biology switch; the `#build` grid (stage column plus card column at ≥900 px, pinned stage above the card below 900 px); "Fill screen", "Hide card" and "Teaching view"; step `.dots` that light only when a step is finished; the "Words in this step" chips; the `.card` item rendering (`.opts`, `.opt.right` / `.wrong`, `miss`, `why`, `sam`); "What you found" boxes; `#record` with **Copy my sentences**; the `.do.further` box, the `.fine` simplifies note and the `sop-foot` footer; the localStorage `st` object with `save()` in try/catch; the `NINTH_FORBIDDEN` check; the test hook pattern (`window.__SP`). **Draw its beta cell, insulin packets, receptor cup and glucose hexagons the same way and in the same colours** (its `COL` constant). The two tools show the same cell: this one shows how the insulin packets are made; the Signal Patch shows what tells them to leave. |
| `biology/tools/organelles-energy.html` (Bio Tool #11, The Energy Patch) | The original Patch layout rules and `window.__EP`, if anything in the Signal Patch is unclear. |
| `biology/tools/membrane-patch.html` (Bio Tool #5) | Reid's iPad rules: the picture stays pinned while text scrolls; **any step opens directly** from its dot; **a dot lights only when that step is finished**. He teaches from these live. Also its bilayer drawing: the vesicle membrane in S5 should read as the same bilayer. |
| `biology/tools/checkpoint-companion.html` (Bio Tool #9) | The `sam` prompt per wrong option. DE items carry `sam`. |
| `biology/tools/cell-check-diagnostic.html` (Bio Tool #13) | **Read so you do not repeat it.** Its DE items already ask about a Golgi-to-membrane block and the pore traffic; the items in §8–§9 were written to avoid them. |

Match the house tone and markup: the `sop-back` link to `../classroom-tools.html`; `sop-eyebrow`, `.lede`, and the `.fine` note saying nothing is submitted; the `sop-foot` footer with the CC BY-NC 4.0 licence and the link to `../../teaching/classroom-tools-note-to-teachers.html`; `<link rel="canonical">`, `og:` and `twitter:` meta and a `meta description`, as the Signal Patch has them. **No PWCS disclaimer in the footer.**

## 2. What the tool is

**Reid, 2026-10-03:** *"there is a bridge here with the insulin focus on the 9th grade biology, and i'm thinking the tool could go to both courses"*, then *"going with what is recommended as a misconception, work out what needs to go into the tool for 9th graders, and piggy back on what should happen for both courses."*

His 9th-grade Module 2, Lesson 2 already runs on this question: *a cell in your pancreas builds insulin, a protein, and ships it out into your blood; which parts of the cell does that protein pass through on its way out?* Students read a short passage, act the route out as a human chain, and copy it from the board: **nucleus → ribosomes on the rough ER → ER → Golgi apparatus → vesicle → cell membrane → blood.** This tool is that lesson's route made into something a student can run, break and repeat. The Signal Patch then picks up the same cell in Unit 4.

**The scene.** One large beta cell fills the stage. Inside, left to right along the route: the nucleus with its pores, the rough ER with ribosomes on it, free ribosomes in the cytoplasm, the Golgi apparatus, insulin packets near the membrane, a lysosome, and two mitochondria for scenery. A strip of blood vessel runs down the right edge, with glucose hexagons whose number follows the blood-sugar setting.

**What it teaches, in order:**

1. The nucleus holds the instructions. A copy leaves; the DNA stays.
2. Ribosomes build the protein by linking amino acids, the monomers, into a chain, the polymer.
3. Ribosomes on the rough ER thread the chain into the ER, where it folds. Vesicles carry it to the Golgi.
4. The Golgi finishes each protein and sorts it. Insulin goes into packets; a membrane protein goes to the cell membrane; a lysosome enzyme goes to a lysosome. A protein that stays in the cytoplasm never enters the ER at all.
5. The insulin packets wait until blood sugar is high, then open to the outside. That is exocytosis, and it is homeostasis at work: insulin goes out when it is needed.
6. Because each stop hands the protein to the next, blocking one stop backs everything up behind it.
7. A bacterium has ribosomes but no ER or Golgi. Given the human instructions, it can build insulin's chains but cannot fold, trim and pack them, so people finish them in a lab. Since 1982, insulin made this way has replaced insulin taken from animals.

**Misconceptions it is built to surface.** Each comes from Reid's CLT analysis, his lesson notes or the state's released items (§12).

| # | Misconception | Step that confronts it |
|---|---|---|
| M1 | "The nucleus makes the protein." | S1, S2 |
| M2 | Mixing up monomers and polymers ("DNA → nucleic acids" as a monomer pair; not knowing amino acids build proteins) | S2 |
| M3 | Organelles as a list of separate facts, in no order | S3, S4, S6 |
| M4 | Every protein goes through the Golgi and leaves the cell | S4 |
| M5 | Endocytosis and exocytosis confused; word parts unknown | S5 |
| M6 | Insulin pours out all the time, whatever the blood sugar | S5 |
| M7 | Prokaryotes have none of the eukaryote's protein machinery, or all of it | S7 |
| M8 (Unit 4 switch) | Not knowing which molecule carries amino acids to the ribosome, or where the copy is made | S1, S2 |

**Device.** Student iPads, touch only, no hover-only actions. Portrait and landscape. Smooth on an older iPad, readable at projection size on the Newline board.

## 3. Decisions already made (do not reopen)

- **URL, number, title.** `biology/tools/protein-route.html` · Bio Tool #18 (the hubs showed #17 as the highest on 2026-10-03) · `<title>`: `The Protein Route | Science One-Pagers` · `<h1>The Protein Route</h1>` with the sub-line "Follow insulin out of a beta cell".
- **One page, two levels:** `9th Grade SOL Bio` / `DE Bio`, the house labels.
- **Two extra switches at 9th only**, beside the level switch:
  - **Unit 4 words: Off / On.** Off is the Module 2 view (now): the copy that leaves the nucleus is "a copy of the instructions (a message)", and no Unit 4 word appears. On adds messenger RNA, transfer RNA, codons, transcription and translation to the same picture, plus items U1–U2. Reid's Unit 4 runs Nov 13 – Dec 11.
  - **Advanced Biology: Off / On.** Reveals the folding and trimming detail in S3 and S5 and items A1–A2. Never blocks a step.
- **Seven steps** (§6). All seven are core at both levels.
- **Four cargoes** in S4: insulin, the GLP-1 receptor (a membrane protein; the receptor students meet in the Signal Patch), a lysosome enzyme, and an enzyme that stays in the cytoplasm. Names at 9th: "insulin", "a receptor for the cell membrane", "a digestive enzyme for a lysosome", "an enzyme that works in the cytoplasm". DE names: "insulin (secreted, regulated)", "GLP-1 receptor (integral membrane protein)", "a lysosomal hydrolase", "a cytosolic enzyme".
- **Deep links**, so a video, an SOL question or a Canvas page can open one view directly: `?level=nine|de`, `?step=1..7`, `?u4=1`, `?adv=1`, combinable (e.g. `?level=nine&u4=1&step=2`). A URL parameter overrides saved state for that visit only and is not saved unless the student changes the switch.
- **Hand-off to the Signal Patch.** S5's card ends with a link: "What tells the packets to leave faster after a meal? Open the Signal Patch →" (`signal-patch.html`, with `?level=de` when the DE level is on).
- **"What you found" boxes** after each step: one sentence, typed, saved only on the device.
- **Teacher notes** in a collapsed `<details>` near the bottom (§5.8).
- **Copyright.** No Pearson wording or figures (Campbell decks, Checkpoints), no county packet or slide text, no VDOE item text, no Learn.Genetics text, no CLT colleagues' materials. Every item in §8–§9 is original and may be used as written.

## 4. Science the build must get right

### 4.1 The data block (paste this into the page; it is the test oracle)

```js
// ROUTE_DATA — verified 2026-10-03 (sources in §4.3). Single source for every number on the page.
const ROUTE_DATA = {
  version: "2026-10-03",
  insulin: {
    preLength: 110,      // amino acids as first built (UniProt P01308)
    signalLength: 24,    // front piece that sends the ribosome to the ER; cut off in the ER
    proLength: 86,       // after the signal is removed (110 - 24)
    bLength: 30,         // B chain
    cLength: 31,         // connecting piece (C-peptide), cut out in the packet
    aLength: 21,         // A chain
    linkerResidues: 4,   // two basic pairs at the C-peptide junctions, removed with it (30 + 2 + 31 + 2 + 21 = 86)
    finalLength: 51,     // A + B
    sulfurBridges: 3,    // two join A to B, one inside A
    text9:  "Insulin starts as one chain of 110 amino acids. The finished hormone is two short chains, 51 amino acids in all.",
    textDE: "Preproinsulin (110 aa) → proinsulin (86 aa, signal peptide removed, three disulfide bonds formed in the ER) → insulin (A 21 + B 30 = 51 aa) + C-peptide (31 aa) + 4 linking residues, removed in maturing secretory granules by prohormone convertases and carboxypeptidase E."
  },
  glucose: {             // same model gate and mg/dL as the Signal Patch, without GLP-1
    low:    { mgdl: 60,  release: 0.00 },
    normal: { mgdl: 90,  release: 0.10 },
    high:   { mgdl: 180, release: 0.30 }
  },
  // Pulse-chase model (DE, S6). ILLUSTRATIVE times; the method is Palade's, measured in pancreas
  // exocrine cells, not beta cells. Every screen that shows these says "times illustrative".
  chase: {
    pulseMin: 3,
    peaksMin: { roughER: 0, golgi: 20, packets: 120 },
    // fraction of label in each place at chase time t (minutes), with blood sugar LOW (release 0.00); rows sum to 1.0
    table: [
      { t: 0,   roughER: 1.00, golgi: 0.00, packets: 0.00, outside: 0.00 },
      { t: 5,   roughER: 0.85, golgi: 0.15, packets: 0.00, outside: 0.00 },
      { t: 20,  roughER: 0.25, golgi: 0.65, packets: 0.10, outside: 0.00 },
      { t: 60,  roughER: 0.05, golgi: 0.20, packets: 0.75, outside: 0.00 },
      { t: 120, roughER: 0.00, golgi: 0.05, packets: 0.95, outside: 0.00 }
    ],
    // With blood sugar HIGH during the chase, label moves from packets to outside from t = 60 on:
    highOutsidePerHour: 0.30   // fraction of the packet label released per model hour at High
  },
  route: {
    insulin:  ["nucleus","boundRibosome","roughER","golgi","packet","outside"],
    receptor: ["nucleus","boundRibosome","roughER","golgi","vesicle","cellMembrane"],
    lysosome: ["nucleus","boundRibosome","roughER","golgi","vesicle","lysosome"],
    cytosol:  ["nucleus","freeRibosome","cytoplasm"]
  },
  bacterium: {
    paperYear: 1979,     // first report of human insulin chains made in E. coli (Goeddel et al.)
    approvalYear: 1982,  // first insulin from engineered bacteria approved for patients in the US
    text9: "In 1979 scientists reported bacteria building human insulin chains. In 1982 the first insulin made this way was approved for patients."
  },
  palade: { year: 1967, nobel: 1974 }
};
```

### 4.2 Other science the build must get right

- **The DNA never leaves the nucleus.** A copy does. At 9th with Unit 4 words Off, call it "a copy of the instructions (a message)". With Unit 4 words On, and at DE, it is messenger RNA, made in the nucleus by transcription and leaving through a nuclear pore. Draw it leaving through a pore, never through the envelope itself.
- **Ribosomes are the builders, not the nucleus.** All ribosomes are alike. What decides whether one ends up on the ER is the front of the protein it is making: a short signal piece. At DE, the signal peptide is recognised as it emerges by the signal-recognition particle (SRP), which docks the ribosome at the ER, and the growing chain is threaded into the ER as it is built. The signal peptide is then cut off inside the ER. At 9th: "the front of the insulin chain works like a ticket that sends its ribosome to the ER."
- **The cytoplasm enzyme** has no signal. Its ribosome stays free and the protein never enters the ER or Golgi. Draw this path visibly separate.
- **Folding in the ER.** Insulin's chain folds in the ER and is held by three sulfur-to-sulfur bridges (disulfide bonds at DE). At 9th this appears only with Advanced Biology On, worded as "bridges between sulfur atoms that hold the fold in place".
- **The Golgi.** Vesicles from the ER fuse with the Golgi on the side facing the ER (cis face at DE) and leave from the far side (trans face). The Golgi finishes the protein and sorts it by tags. At 9th, "the Golgi finishes each protein and sorts it; some, like the lysosome enzyme, get a chemical address tag." At DE, the lysosomal hydrolase is tagged with **mannose-6-phosphate** and bound by M6P receptors that pack it for the lysosome; the membrane protein travels in the membrane of a vesicle and arrives by constitutive fusion; insulin is packed into **secretory granules** for regulated release.
- **Membrane protein orientation (DE only).** The part of the receptor that faced the inside of the ER faces the outside of the cell once its vesicle fuses. Draw the receptor's cup inside the vesicle, then facing out after fusion.
- **The packets.** In the maturing packet, proinsulin is cut into insulin and the connecting piece (C-peptide), and both are released together, one C-peptide for every insulin. At 9th this appears only with Advanced Biology On, as "a middle piece is cut out; the two pieces left are insulin."
- **Release depends on blood sugar.** Use the Signal Patch's gate values (§4.1): Low 0.00, Normal 0.10 (a trickle), High 0.30. No GLP-1 in this tool. The packets otherwise wait near the membrane.
- **Exocytosis.** A packet's membrane is the same phospholipid bilayer as the cell membrane. When it fuses, its membrane becomes part of the cell membrane and its contents end up outside. Word parts on screen at 9th: **exo-** (out) + **cyto** (cell); **endo-** (in) for the reverse. Draw the fusion as two bilayers merging, never as a hole.
- **Blocking a step (S6).** Model blocks: (a) the nuclear pore, (b) ribosome docking at the ER, (c) ER → Golgi vesicles, (d) Golgi → packets, (e) packets → outside. Each block makes the compartment before it fill and everything after it starve. At 9th this is a "what if" thought experiment, labelled as one. At DE, block (c) carries a note: "Real drugs can stop traffic from the ER to the Golgi; brefeldin A is one used in labs." (No other drug names.)
- **Pulse-chase (DE, S6).** Cells get a short pulse of a radioactive amino acid, then a chase with ordinary amino acids, and the labelled protein is tracked by where it sits over time. The model table in §4.1 is illustrative; the order is the point. Credit: "the method George Palade's lab used in the 1960s (Nobel Prize, 1974)".
- **The bacterium (S7).** A bacterium has a cell membrane, ribosomes and DNA loose in the cytoplasm, with no nucleus, ER or Golgi. Given human insulin instructions, it can build the chains on its own ribosomes. It cannot fold, bridge, trim or pack them the way a beta cell does, so the chains collect inside the bacterium; people break the cells open, collect the chains, fold and join them, and purify insulin. At DE: the 1979 work made the A and B chains in separate bacteria and joined them in the lab; later processes made proinsulin in bacteria or yeast and trimmed it with enzymes. Draw the bacterium as a capsule with ribosome dots, a loop of DNA and, at DE, a small plasmid ring carrying the insulin gene.
- **Do not claim** that bacteria cannot make any disulfide bond anywhere, that every protein goes through the Golgi, that the nucleus builds proteins, or that insulin is released continuously in large amounts.

### 4.3 Sources (render these in a "Sources" list under Go further, `id="sources"`)

| Claim | Source |
|---|---|
| Insulin chain lengths, signal peptide, C-peptide, chains A and B | UniProt P01308 (INS_HUMAN) |
| Pulse-chase: secretory proteins move rough ER → Golgi → secretory granules | Jamieson JD, Palade GE. *J Cell Biol* 1967;34:577–596. PMID 6035647 |
| Insulin is made as a larger precursor, proinsulin | Steiner DF, Oyer PE. *Proc Natl Acad Sci USA* 1967;57:473–480. PMID 16591494 |
| The signal at the front of a protein sends its ribosome to the ER | Blobel G, Dobberstein B. *J Cell Biol* 1975;67:835–851. PMID 811671 |
| Human insulin chains made in *E. coli* | Goeddel DV, et al. *Proc Natl Acad Sci USA* 1979;76:106–110. PMID 85300 |

Render PubMed links in the form `https://pubmed.ncbi.nlm.nih.gov/<PMID>/` and the UniProt link as `https://www.uniprot.org/uniprotkb/P01308/entry`. The Sources list shows at both levels and is exempt from T8 (it is citation, not teaching text).

## 5. Page, layout and controls

### 5.1 Top of the page

Copy the Signal Patch: `sop-back`, `.topbar` with **Running on: iPad / Computer** (same rules: DPR cap 2 on iPad, ≤40 moving tokens, no shadows or blur in the draw loop, touch targets ≥48 px, labels ≥16 CSS px; Computer: DPR 2.5, about 2× tokens, hover highlights in addition to tap), the eyebrow (§5.6), the `<h1>` and sub-line, the `.lede`, the level switch, and at 9th the **Unit 4 words** and **Advanced Biology** switches. Then the `.fine` note (nothing is submitted; progress and what you type stay on this device; any step number opens that step, and a number lights only when that step is finished). Then the legend: every token's shape and label.

**`.lede` text:**

- **9th:** "Right now a cell in your pancreas is building insulin and getting it ready to send into your blood. Follow one insulin molecule from the instructions in the nucleus to the outside of the cell, then try to break the route and see what backs up."
- **DE:** "A β cell builds preproinsulin on ER-bound ribosomes, processes it through the endomembrane system and stores it for regulated release. Run the route, sort four cargoes to four destinations, block a step, and run a pulse-chase."

### 5.2 Layout

The Signal Patch's rules exactly: at ≥900 px in landscape, `#build` is `height:100svh` (fallback `100vh`), a two-column grid (stage about 62%, card about 38% scrolling inside its column); **Fill screen** with compact switch copies inside `#build`; **Hide card** with a "Card ▸" tab; below 900 px or in portrait the stage is pinned (`position:sticky`) above the scrolling card. The stage holds the **scene canvas** (world 1200 × 700, drawn to *contain*), then the controls row, readout line and step dots. In S6 at DE the scene shares its height with a **chase graph canvas** (world 1200 × 360). No horizontal page scroll at any width from 360 px up.

### 5.3 The scene

Canvas 2D, one `requestAnimationFrame` loop, stopped when the tab is hidden or the stage is off-screen.

- **The beta cell** fills the stage: a large rounded outline drawn as a bilayer edge (two thin lines with head dots, as the Membrane Patch draws it, simplified).
- **Nucleus** at the left, with a double outline and 4–6 **pores** drawn as gaps with a rim. Inside: DNA as a coiled double line. A label "insulin instructions" sits on one short stretch, highlighted.
- **Rough ER** wrapping out from the nucleus, drawn as folded flattened sacs **continuous with the outer nuclear membrane**, studded with ribosome dots.
- **Free ribosomes** as dots in the cytoplasm, a small cluster below the ER.
- **Golgi apparatus** in the middle: 4–5 curved stacked sacs, the ER-facing side on the left.
- **Insulin packets** near the right-hand membrane, clustered (the Signal Patch's packet: a circle with a small "i").
- **Lysosome** below the Golgi: a circle, a different shade, with small enzyme marks inside.
- **Two mitochondria**, scenery only, no interaction.
- **Blood vessel strip** down the right edge outside the cell, with glucose hexagons whose count follows the blood-sugar setting (Low 3, Normal 6, High 14 on iPad).
- **S7 only:** the scene cross-fades to a **bacterium** (a capsule about one fifth the cell's width, drawn beside a faded outline of the beta cell for scale) with ribosome dots, a DNA loop and, at DE, a plasmid ring.

**Tokens and colours.** Define each once as a constant, with a dark variant. Reuse the Signal Patch's `COL` entries where they exist.

| Token | Drawn as | Colour (light / dark) |
|---|---|---|
| Message (mRNA) | a short wavy strand with tick marks | nucleic acid `#6B4E8C` / `#B9A3D9` |
| Ribosome | two lobes, small over large | ink `#3A352D` / `#D8D2C4` |
| Amino acid / growing chain | beads; the chain grows one bead at a time | protein `#1F7A8C` / `#6FC0CE` |
| Signal piece (front of the chain) | the first 3 beads, outlined | outline `#C9731E` / `#E8A867` |
| Transfer RNA (Unit 4 words On, and DE) | a small L shape carrying one bead | `#6B4E8C` / `#B9A3D9` |
| Vesicle | a small circle with a bilayer edge | ink-soft `#5A544A` / `#A8A198` |
| Address tag | a small hexagon on the protein | carbohydrate `#C98A2E` / `#E3B060` |
| Insulin packet / released insulin | the Signal Patch's packet and dots | `#3F7A55` / `#7FC395` |
| Receptor | the Signal Patch's Y-cup | ink outline |
| Lysosome enzyme | a small notched blob | `#A0503A` / `#D9937F` |
| Cytoplasm enzyme | a small rounded blob | `#1F7A8C` / `#6FC0CE`, dashed outline |
| Glucose | hexagons in the vessel | `#C98A2E` |
| Block | a red bar with a "✕ blocked" tag across the route | `#B03A2E` / `#E07A6E` |
| Radioactive label (DE S6) | a small glowing dot riding on chains | `#F2C230` |

Every token is told apart by **shape and a text tag**, never by colour alone. Moving tokens travel about 120–220 world units per second at 1×. **Token and legend names follow §7:** at 9th with Unit 4 words Off, the message token is called "copy (message)" and no transfer RNA is drawn; at 9th the tag on the lysosome enzyme reads "address tag: to a lysosome", never "M6P"; the radioactive token and the word "label" exist only at DE.

### 5.4 Readouts

Under the scene, one line that changes per step:

- **S2:** "Amino acids linked: __ of __" (the second number is `ROUTE_DATA.insulin.preLength` at DE; at 9th it reads "Amino acids linked: __", counting up to 110).
- **S4:** a four-row destination table that fills as each cargo arrives: cargo · route taken · where it ended up.
- **S5:** "Blood sugar: low / normal / high" and an **insulin release** bar (0–1) using `ROUTE_DATA.glucose`; at DE also the mg/dL value marked "approximate".
- **S6:** "Piling up in: __ · Running dry: __" naming compartments. At DE, the chase graph: % of label (y, 0–100) against chase time (x, 0–120 min, ticks every 20) with four lines, rough ER, Golgi, packets, outside, each in its own dash pattern and end label, and the caption "times illustrative".

### 5.5 Controls (below the stage, built per step)

- **Always:** `▶ Play / ❚❚ Pause`, speed `½× 1× 2×`, `Fill screen`, `Reset this step`, `Teaching view`.
- **S1:** `Copy the instructions`; and a decoy button `Send the DNA out` that, when tapped, makes the DNA bump the inside of the envelope and stay, with a tag "the DNA stays home". (The tap is counted; T4.)
- **S2:** `Start building`; at 9th with Unit 4 words On and at DE, a `Show the codons` toggle.
- **S3:** `Fold` (enabled once the chain is inside the ER) and `Ship to the Golgi`.
- **S4:** a cargo picker with four labelled buttons, each with its glyph, and `Send it`.
- **S5:** `Blood sugar: Low / Normal / High`.
- **S6:** a block picker (five positions, §4.2), `Run`, `Clear block`; at DE, `Pulse`, `Chase`, and `Blood sugar: Low / High` for the chase.
- **S7:** `Give the bacterium the insulin instructions`, `Run`, and `Finish in the lab`.
- **Teaching view:** as in the Signal Patch: opens every part of the step, lights no dot, labels ≥28 CSS px, tapping any structure pins one large callout naming it and its job.

Every control has an `aria-label`. Segmented buttons use `aria-pressed`. Structures drawn on the canvas that a step asks the student to tap get a **transparent DOM button laid over them** with an `aria-label`.

### 5.6 Eyebrow and footer per level

**9th:**

- Eyebrow: `Bio Tool #18 · Biology I Module 2 · SOL BIO.3b` — with Unit 4 words On: `Bio Tool #18 · Biology I Modules 2 and 4 · SOL BIO.3b, BIO.2d, BIO.5e`
- Footer lead: `Module 2, Cell Structure and Function · Biology I, SOL BIO.3b (cell structures and their functions); Unit 4, SOL BIO.2d (protein synthesis) and BIO.5e (synthetic biology)`

**DE:**

- Eyebrow: `Bio Tool #18 · DE Bio 101 Unit 4 · A Tour of the Cell (Campbell Ch. 4)`
- Footer lead: `Unit 4, A Tour of the Cell · NVCC BIO 101, Campbell Chapter 4; signalling continues in Chapter 5 (the Signal Patch)`

Then the house footer text: "· seven steps, nothing submitted. © J. R. Schwebach, CC BY-NC 4.0. Teachers: see the note on using these with Canvas." Copy the markup from the Signal Patch.

### 5.7 Saving

- localStorage key **`proteinroute`**.
- `st = {dev, level, u4, adv, step, ans, goals, found:{S1..S7}, teach, fill, cardHidden, cargoDone:{insulin,receptor,lysosome,cytosol}, rec:[…]}`.
- Validate every field on load. Wrap every read and write in try/catch. The page must work with storage blocked.
- "What you found" text is capped at 300 characters per step and saved only here, with a "Clear what I typed" button in `#record`.

### 5.8 Below the tool

1. **`#record`, "Your record":** first answers per item, the student's "What you found" sentences in step order, and **Copy my sentences** (clipboard API, with a select-all textarea fallback).
2. **"Draw it yourself" box**, always shown, with the same text at both levels except where marked: "Close the tool. On paper, draw the cell with the route from the nucleus to the outside, name every stop, and write one job beside each. Then cross out one arrow and write what piles up." (Reid's CLT analysis asks that every term be paired with a model students draw themselves.)
3. **`.do.further` "Go further":**
   - **On this site:** [The Signal Patch](signal-patch.html), for what tells the packets to leave faster after a meal; [The Membrane Patch](membrane-patch.html), for the bilayer every vesicle is made of; [Cell Check](cell-check-diagnostic.html) (`?course=bio1` at 9th, `?course=de` at DE); [Checkpoint Companion, Chapter 4](checkpoint-companion.html?ch=4) (DE only); [SOL Challenge Questions, Module 2](sol-challenge-questions.html?unit=2) (9th only).
   - **Do not link or embed videos.**
4. **Sources** (§4.3).
5. **`<details>` "For teachers"** (collapsed). Use these lines as written:
   - **Goal:** students trace one protein from the instructions in the nucleus to the outside of the cell, explain each stop's job, predict what backs up when a stop fails, and explain why a bacterium can build insulin's chains but not finish them.
   - **Misconceptions it is built to surface:** M1 the nucleus makes the protein (S1–S2) · M2 monomers and polymers (S2) · M3 organelles as a list, not a route (S3, S4, S6) · M4 every protein goes through the Golgi and leaves (S4) · M5 endo- and exo- confused (S5) · M6 insulin pours out all the time (S5) · M7 what a prokaryote can and cannot do (S7) · M8, with Unit 4 words on, which molecule carries amino acids to the ribosome (S2).
   - **Where it fits:** Biology I Module 2, Lesson 2 (Follow the Insulin and the organelle stations), and as review before the Module 2 test; again in Unit 4 with Unit 4 words on, before the Signal Patch. DE Unit 4, the route a protein takes and the organelles with one job.
   - **Read–Talk–Write:** students read the Follow the Insulin passage, run the tool in pairs while one retells the route, then write. Each step's "What you found" sentence is an evidence line.
   - **Timing:** 20–25 minutes for S1–S7 at 9th; 25–30 at DE with the pulse-chase.
   - **Board prompt:** "Which stop on the route would you protect if you could only protect one? Defend it."
   - **Deep links for Canvas or a video:** `?level=nine&step=5`, `?level=nine&u4=1&step=2`, `?level=de&step=6`.
6. **`.fine` "What the model simplifies":** structures are far larger than scale and far fewer; one insulin molecule stands for thousands; the copy, the chain and the packets move much faster than in a real cell; the glucose gate is three settings where the real response is graded; GLP-1 and other signals that boost release are left out (they are in the Signal Patch); the pulse-chase times are illustrative; the cytoskeleton tracks the vesicles ride along are not drawn; this is a model of a cell, not medical advice.

### 5.9 Accessibility

Honour `prefers-reduced-motion` (tokens jump between stops with no tweening; every goal still reachable). Every state also shows by shape or text. The canvas has `role="img"` and an `aria-label` that updates with the step, plus a visually hidden `aria-live` line narrating key events ("The copy left through a nuclear pore", "Amino acid 37 linked", "Packet released insulin", "Blocked: ER to Golgi; the ER is filling").

## 6. The seven steps

Each step follows the Signal Patch's step object: `key`, `short`, `head`, `pre`, `post`, `task`, `goals`, `nine` and `de` explanation text, and a "What you found" prompt. **Goals must be detectable from simulation state** (§10.1). A step lights only when its pre item is answered, its goals are met, its post item is answered and its "What you found" box has at least 8 characters. U-items and A-items are optional and never block a step.

---

**S1 · The instructions stay home**

- **pre:** N1 / D1. **post:** N2 / D2. With Unit 4 words On: U1 shown after N2.
- **Task:** Try to send the DNA out. Then tap *Copy the instructions* and follow the copy.
- **Goals:** (a) `dnaSendTries ≥ 1` · (b) `copiesOut ≥ 1` (a message token has passed through a pore) · (c) `dnaOutside === 0` throughout (always true; T4 checks it).
- **9th explanation (Unit 4 words Off):** "Insulin is a **protein**, a chain of amino acids. The instructions for it are part of the **DNA** in the **nucleus**, and the DNA never leaves. The cell makes a **copy** of just the insulin instructions, a message, and the copy leaves through a **nuclear pore**, a doorway in the nucleus's covering. The nucleus holds the instructions. It does not build the protein."
- **9th explanation (Unit 4 words On):** as above, with the copy named: "The copy is **messenger RNA (mRNA)**. Making it is called **transcription**, and it happens in the nucleus."
- **DE explanation:** "The INS gene is transcribed in the nucleus and the mRNA is processed and exported through nuclear pore complexes. The gene stays put; only the transcript leaves. Nearly every cell in the body carries INS, but only β cells transcribe it at a high rate, so the decision to make insulin is made here, first."
- **What you found prompt:** "What left the nucleus, and what stayed?"

**S2 · Ribosomes link the amino acids**

- **pre:** N3 / D3. **post:** N4 / D4. With Unit 4 words On: U2 shown after N4.
- **Task:** Tap *Start building*. Watch which ribosome the copy finds, and count the amino acids as the chain grows. At DE, tap the signal piece when it appears.
- **Scene:** the copy meets a free ribosome; the first beads (the signal piece, outlined) emerge; the ribosome is drawn to the rough ER and docks; the chain threads into the ER as it grows. With Unit 4 words On and at DE, *Show the codons* labels the copy in groups of three and draws transfer RNAs bringing each bead.
- **Goals:** (a) `chainLength === ROUTE_DATA.insulin.preLength` reached once · (b) `riboDocked === true` once · (c) at DE, `signalSeen === true` (the signal piece was tapped once).
- **9th explanation:** "A **ribosome** is the builder. It reads the copy and links **amino acids**, the **monomers** of a protein, one at a time into a long chain, the **polymer**. The front of the insulin chain works like a ticket: as soon as it comes out, it sends its ribosome to the **rough endoplasmic reticulum (ER)**. Ribosomes stuck all over the ER are what make it look rough. The chain is threaded into the ER as it is built."
- **9th addition with Unit 4 words On:** "The ribosome reads the mRNA three bases at a time. Each group of three is a **codon**. **Transfer RNA (tRNA)** carries one amino acid at a time to the ribosome and matches it to its codon. This is **translation**."
- **DE explanation:** "Translation begins on a free ribosome. When the N-terminal signal peptide emerges, the signal-recognition particle (SRP) binds it and pauses translation, then docks the ribosome at the ER membrane, where the chain is threaded into the ER lumen as it grows. Bound and free ribosomes are identical; the protein decides. The 110-residue product is preproinsulin."
- **What you found prompt:** "What did the ribosome build, out of what, and what sent it to the ER?"

**S3 · Fold in the ER, ship to the Golgi**

- **pre:** N5 / D5. **post:** N6 / D6. With Advanced Biology On: A1 after N6.
- **Task:** When the chain is inside the ER, tap *Fold*, then *Ship to the Golgi*.
- **Scene:** inside the ER the signal piece is snipped off (drawn at DE and with Advanced On; a quiet fade at 9th otherwise); the chain folds into a compact shape; at DE and Advanced, three short yellow bridges appear; a vesicle buds from the ER, travels and fuses with the ER-facing side of the Golgi.
- **Goals:** (a) `folded === true` · (b) `vesiclesToGolgi ≥ 1`.
- **9th explanation:** "Inside the **ER** the new chain **folds** into its working shape, the way a protein's shape decided what an enzyme could do in Module 1. Then a bit of ER membrane pinches off around it, making a **vesicle**, a small bubble of membrane, which carries it to the **Golgi apparatus**."
- **9th addition with Advanced On:** "The front ticket is cut off here, and the fold is held in place by three bridges between sulfur atoms."
- **DE explanation:** "In the lumen, signal peptidase removes the 24-residue signal peptide, leaving proinsulin (86 aa). The ER's oxidizing environment and its folding enzymes let three disulfide bonds form. Correctly folded proinsulin leaves in COPII-coated transport vesicles for the cis face of the Golgi."
- **What you found prompt:** "What happened to the chain in the ER, and how did it get to the Golgi?"

**S4 · The Golgi addresses the package**

- **pre:** N7 / D7. **post:** N8 / D8.
- **Task:** Send all four proteins, one at a time. Watch where each goes, and which ones skip the ER and Golgi.
- **Scene:** insulin, the receptor and the lysosome enzyme follow the route through the Golgi; at the far side the lysosome enzyme gets a tag (a hexagon, labelled "M6P" at DE and "address tag: to a lysosome" at 9th) and each protein leaves in its own kind of vesicle: insulin into packets near the membrane, the receptor riding in the vesicle's membrane to the cell membrane (cup facing out after fusion), the enzyme into the lysosome. The cytoplasm enzyme is built on a free ribosome and stays in the cytoplasm.
- **Goals:** (a) all four `cargoDone` true · (b) the destination table complete.
- **9th explanation:** "The **Golgi apparatus** finishes each protein and sorts it into its own kind of vesicle. Some, like the lysosome enzyme, get a chemical **address tag**. Insulin is packed into **insulin packets**, vesicles that wait near the cell membrane. The receptor is built into a vesicle's membrane and becomes part of the **cell membrane**. The digestive enzyme goes to a **lysosome**. The enzyme that works in the cytoplasm never enters the ER at all: its chain has no ticket, so its ribosome stays free. Not every protein takes the route, and not every protein leaves the cell."
- **DE explanation:** "Sorting happens at the trans face. Lysosomal hydrolases carry mannose-6-phosphate, added in the cis Golgi, and are bound by M6P receptors that deliver them to lysosomes. The GLP-1 receptor, an integral membrane protein, reaches the plasma membrane in transport-vesicle membrane by constitutive fusion; the side that faced the ER lumen ends up facing outside. Insulin is packed into secretory granules held for regulated exocytosis. A cytosolic enzyme lacks a signal peptide and is completed on free ribosomes."
- **What you found prompt:** "Which protein skipped the ER and Golgi, and why?"

**S5 · Blood sugar opens the door**

- **pre:** N9 / D9. **post:** N10 / D10. With Advanced Biology On: A2 after N10.
- **Task:** Try each blood-sugar setting. Watch the packets.
- **Scene:** at Low the packets stay; at Normal one packet now and then fuses; at High many fuse, their bilayer merging into the cell membrane and insulin dots flowing into the vessel. At DE and with Advanced On, the packet interior shows proinsulin being cut into insulin and the connecting piece before release, and both are released. After the goals are met, the card shows the Signal Patch link (§3).
- **Goals:** (a) each setting run ≥ 5 s of playback · (b) `insulinReleased > 0` at High · (c) `fusions ≥ 3`.
- **9th explanation:** "The insulin packets wait. When blood sugar rises after a meal, the packets merge with the membrane. A packet's membrane is the same **phospholipid bilayer** as the cell membrane, so the two merge, and the insulin ends up outside, in the blood. That is **exocytosis**: **exo-** means out, **cyto** means cell. Bringing something in the same way is **endocytosis**: **endo-** means in. Releasing insulin only when blood sugar is high, and slowing down when it falls, is **homeostasis**: the body keeping its blood sugar in a steady range."
- **9th addition with Advanced On:** "Inside the packet, a middle piece is cut out of the chain. The two short pieces left, still held by their sulfur bridges, are insulin."
- **DE explanation:** "Insulin secretion is regulated, not constitutive: granules are stored and fuse when rising glucose raises cytosolic Ca²⁺ in the β cell. In maturing granules, prohormone convertases and carboxypeptidase E cut proinsulin into insulin (A 21 + B 30) and C-peptide (31 aa), removing four linking residues; insulin and C-peptide are released one-for-one. Fusion adds the granule membrane to the plasma membrane. Signals such as GLP-1 boost release at high glucose; that is the Signal Patch."
- **What you found prompt:** "When did the packets release insulin, and how did the insulin get out?"

**S6 · Block a step**

- **pre:** N11 / D11. **post:** N12 / D12.
- **Task (9th):** Pick a place to block the route, run it, and see what piles up and what runs dry. Try at least three blocks.
- **Task (DE):** Do the same, then run a pulse-chase: tap *Pulse*, then *Chase*, and read the graph. Run the chase once at Low and once at High blood sugar.
- **Scene:** the chosen block shows a red bar; tokens collect in the compartment before it, which swells slightly; compartments after it fade. At DE, during a chase, labelled chains glow yellow and the graph draws from `ROUTE_DATA.chase`.
- **Goals:** (a) `blocksTried ≥ 3` distinct · (b) at DE, `chaseRuns.low && chaseRuns.high`.
- **9th explanation:** "This is a 'what if' (a thought experiment). Each stop hands the protein to the next, so when one stop is blocked, protein piles up in the stop before it and everything after it runs dry. That is why the organelles that build proteins work as a team: one broken link stops the whole route."
- **DE explanation:** "A block shows the order of the route by what accumulates. Pulse-chase shows it in time: label a short pulse of new protein, chase with unlabelled amino acids, and the label moves rough ER → Golgi → granules, and leaves the cell only when release is triggered. Jamieson and Palade (1967) used this design on pancreatic exocrine cells; the times here are illustrative."
- **What you found prompt:** "Pick one block. What piled up, what ran dry, and why?"

**S7 · Insulin from a bacterium**

- **pre:** N13 / D13. **post:** N14 / D14.
- **Task:** Give the bacterium the insulin instructions and run it. Then tap *Finish in the lab*.
- **Scene:** the bacterium's ribosomes build chains, which collect as tangled clumps inside it; no packets form and nothing leaves. *Finish in the lab* shows a short three-panel sequence beside the bacterium: break the cells open, fold and join the chains, purify the insulin.
- **Goals:** (a) `bactChains ≥ 3` · (b) `labFinished === true`.
- **9th explanation:** "A bacterium is a **prokaryote**: no nucleus, no ER, no Golgi, but it does have **ribosomes**, because every cell builds proteins. Given the human instructions for insulin, its ribosomes can build the chains. It has nowhere to fold, trim and pack them the way a beta cell does, so the chains pile up inside. People break the bacteria open, fold and join the chains, and clean up the insulin. In 1979 scientists reported bacteria building human insulin chains; in 1982 the first insulin made this way was approved for patients."
- **9th addition with Unit 4 words On:** "Putting a human gene into a bacterium so it makes a human protein is **synthetic biology**."
- **DE explanation:** "Prokaryotes translate on 70S ribosomes in the cytosol and have no endomembrane system. Goeddel et al. (1979) expressed synthetic genes for the A and B chains separately in *E. coli* and joined them in vitro; later processes made proinsulin in *E. coli* or yeast and converted it with enzymes. The β cell does in its ER and granules what the factory does in tanks."
- **What you found prompt:** "What could the bacterium do on its own, and what did people have to finish?"

## 7. Words on screen

### 7.1 9th grade

A word may appear only if it is in these lists or is defined where it appears.

- **Met before Module 2** (Module 1): amino acid, protein, enzyme, active site, substrate, monomer, polymer, macromolecule, carbohydrate, lipid, nucleic acid, nucleotide, DNA, glucose, molecule, shape, energy, phospholipid.
- **Module 2** (packet p. 2 terms and the p. 9 chart): cell membrane, cytoplasm, organelle, nucleus, ribosome(s), rough ER, smooth ER, endoplasmic reticulum, Golgi apparatus, Golgi body, vesicle(s), vacuole, lysosome(s), cytoskeleton, centriole, chloroplast, mitochondria, mitochondrion, cell wall, prokaryote, eukaryote, phospholipid bilayer, hydrophilic, hydrophobic, integral protein, selectively permeable, homeostasis, diffusion, osmosis, passive transport, active transport, endocytosis, exocytosis.
- **Tool-native, defined on screen** (as "Words in this step" chips plus an inline definition at first use in each explanation): insulin ("a protein hormone that lowers blood sugar"), hormone ("a chemical message carried in the blood"), pancreas ("an organ behind your stomach; some of its cells make insulin"), beta cell ("a pancreas cell that makes insulin"), nuclear pore ("a doorway in the nucleus's covering"), copy / message ("a copy of one set of instructions from the DNA"), receptor ("a protein in the cell membrane shaped to hold one kind of molecule"), address tag ("a chemical tag that says where a protein goes"), insulin packet ("a vesicle holding insulin"), blood sugar ("the glucose in your blood"), bacterium ("a single-celled prokaryote"), word parts exo-, endo-, cyto.
- **Unit 4 words** (only with Unit 4 words On; defined on screen): gene, messenger RNA, mRNA, transfer RNA, tRNA, RNA, codon, base, transcription, translation, protein synthesis, synthetic biology.
- **Advanced words** (only with Advanced Biology On; defined): sulfur bridge.

```js
// 9th-grade forbidden words. Whole word, case-insensitive (except "SRP", "M6P", "COPII" case-sensitive).
// Checked over allText("nine") in every switch combination (T8), excluding the Sources list.
const NINTH_FORBIDDEN = ["signal peptide","signal sequence","SRP","signal-recognition","signal recognition",
 "translocon","Sec61","preproinsulin","proinsulin","C-peptide","convertase","prohormone","carboxypeptidase",
 "disulfide","cis","trans face","cis face","cisterna","cisternae","lumen","mannose","M6P","constitutive",
 "regulated secretion","secretory granule","granule","granules","glycosylation","glycoprotein","COPII",
 "pulse","chase","radioactive","label","autoradiography","plasmid","recombinant","in vitro","70S","GPCR",
 "G protein","kinase","calcium","Ca²⁺","hydrolase","integral membrane protein","cytosol","cytosolic",
 "transcript","exocytose","brefeldin","E. coli"];
// Unit 4 words: forbidden in allText("nine") when u4 is OFF, allowed when ON.
const NINTH_U4_ONLY = ["gene","mRNA","messenger RNA","tRNA","transfer RNA","RNA","codon","codons","base","bases",
 "transcription","translation","protein synthesis","synthetic biology"];
// Advanced words: forbidden in allText("nine") when adv is OFF.
const NINTH_ADV_ONLY = ["sulfur","bridge","bridges"];
```

Note on "label": the word must not appear in 9th text because the DE pulse-chase uses it; 9th UI that names a structure uses "name" or "tag" instead. "Fold" is allowed at 9th in S3 (it appears in the core explanation); only "sulfur" and "bridge(s)" are Advanced-only.

### 7.2 DE

Use the Campbell *Biology in Focus* names so the tool and the slides match: nuclear envelope, nuclear pore, mRNA, ribosome (free, bound), rough ER, smooth ER, ER lumen, transport vesicle, Golgi apparatus, cis face, trans face, lysosome, secretory vesicle (granule), plasma membrane, cytosol, exocytosis, endomembrane system, signal peptide, signal-recognition particle (SRP). Defined on first use: preproinsulin, proinsulin, C-peptide, prohormone convertase, mannose-6-phosphate, constitutive and regulated secretion, pulse-chase, plasmid.

## 8. The 9th-grade bank (N1–N14, U1–U2, A1–A2)

Use this data exactly: stems, option order, keys, `why` and `miss`. Render as the Signal Patch does. `src` is for Reid and is never rendered. Keys for N1–N14: A 4 · B 4 · C 3 · D 3.

```js
// 9th-grade bank. Permanent numbers. Never renumber; retire with retired:true.
// key = index (0–3) of the right option. miss = note for each wrong option.
// u4:true = shown only with Unit 4 words On; adv:true = only with Advanced Biology On. Both optional, never block.
// missU4 = a miss note that replaces the matching miss entry while Unit 4 words are On (added 2026-10-04 at Reid's request).
const BANK9 = [
{n:"N1", step:"S1", role:"pre", topic:"Who builds the protein",
 stem:"Insulin is a protein. Which part of the cell actually links its pieces together?",
 opts:["The nucleus","The ribosomes","The Golgi apparatus","The cell membrane"], key:1,
 why:"Ribosomes are the builders. The nucleus holds the instructions, the Golgi finishes and ships, and the membrane is where insulin leaves. Building happens at the ribosome.",
 miss:{0:"The nucleus holds the instructions and builds only the copy, the message. Watch what leaves it in this step: a copy, not a protein.",
       2:"The Golgi gets the protein after it is built and finishes it. It is a later stop on the route.",
       3:"The cell membrane is the last stop, where insulin leaves the cell. Nothing is built there."},
 missU4:{0:"The nucleus holds the instructions and builds only mRNA. Watch what leaves it in this step: mRNA, not a protein."},
 src:"M1, Lesson 2 'watch for'; packet p. 9 'Organelles That Build Proteins'"},

{n:"N2", step:"S1", role:"post", topic:"What leaves the nucleus",
 stem:"In the tool, what left the nucleus on the way to making insulin?",
 opts:["The DNA itself, uncoiled","Finished insulin, ready to ship","Amino acids for the chain","A copy of the insulin instructions"], key:3,
 why:"A copy of just the insulin instructions left through a nuclear pore. The DNA stayed inside, where it is safe, and the cell can make many copies from it.",
 miss:{0:"The DNA stays in the nucleus. When you tried to send it out, it bumped the covering and stayed.",
       1:"No insulin exists yet when the copy leaves. It is built later, at a ribosome.",
       2:"Amino acids are in the cytoplasm already. The ribosome links them; the nucleus does not send them out."},
 src:"S1; Canvas Original #1 'Follow the Insulin'"},

{n:"N3", step:"S2", role:"pre", topic:"The monomers of a protein",
 stem:"The ribosome builds the insulin chain one small piece at a time. What are those pieces?",
 opts:["Amino acids","Glucose molecules","Nucleotides","Fatty acids"], key:0,
 why:"Amino acids are the monomers of a protein. The ribosome links them, one at a time, into the chain, the polymer.",
 miss:{1:"Glucose is the monomer of carbohydrates like starch. It is also what insulin controls in your blood, but it is not what insulin is made of.",
       2:"Nucleotides are the monomers of nucleic acids like DNA. They carry the instructions, not the protein.",
       3:"Fatty acids are parts of lipids, like the phospholipids in a membrane."},
 src:"M2; CLT M1 look back (monomer pairing, 66%; General 41%)"},

{n:"N4", step:"S2", role:"post", topic:"Why the ER is rough",
 stem:"Why did the ribosome building insulin end up on the endoplasmic reticulum?",
 opts:["The ER builds its own ribosomes from scratch","Ribosomes can only work when on a membrane","The front of the chain sent it, like a ticket","The ER is the place where amino acids are made"], key:2,
 why:"The front of the insulin chain works like a ticket that sends its ribosome to the ER. Ribosomes stuck all over the ER are why it is called rough, and the chain goes straight into the ER as it is built.",
 miss:{0:"Ribosomes are made in the nucleus, not the ER. The ER is where some of them work.",
       1:"Free ribosomes in the cytoplasm work too. The cytoplasm enzyme in step 4 was built on one.",
       3:"Amino acids come from the food you digest. The ER receives the chain; it does not make amino acids."},
 src:"S2; packet p. 33 description of rough ER (paraphrased, not quoted)"},

{n:"N5", step:"S3", role:"pre", topic:"The next stop after the ER",
 stem:"The insulin chain is inside the ER. Predict its next stop.",
 opts:["Straight out through the cell membrane","Back into the nucleus","Into a lysosome to be broken down","To the Golgi apparatus, inside a vesicle"], key:3,
 why:"A bit of ER membrane pinches off around the protein, making a vesicle, which carries it to the Golgi apparatus.",
 miss:{0:"It still has stops to make. Leaving now would skip the Golgi, where it gets finished and packed.",
       1:"The route runs one way, away from the nucleus. The protein never goes back.",
       2:"Lysosomes break things down. Insulin is being finished, not destroyed."},
 src:"M3; Tier 1 coverage 'trace a protein from ribosome to rough ER to Golgi to membrane'"},

{n:"N6", step:"S3", role:"post", topic:"The ER's job for insulin",
 stem:"Which job did the ER do for the insulin chain?",
 opts:["A place to fold, then a vesicle to the Golgi","It copied the instructions for the chain","It made the energy needed to build the chain","It broke the chain back into amino acids"], key:0,
 why:"Inside the ER the chain folds into its working shape, then leaves in a vesicle for the Golgi. The ER is the first stop after the ribosome.",
 miss:{1:"Copying the instructions happens in the nucleus, before any chain exists.",
       2:"The cell's energy for building comes mostly from its mitochondria.",
       3:"Breaking proteins down is a lysosome's job. The ER helps build and ship them."},
 src:"S3"},

{n:"N7", step:"S4", role:"pre", topic:"How proteins are sorted",
 stem:"Three proteins pass through the Golgi apparatus and go to three different places. Predict how each one gets to the right place.",
 opts:["Each one drifts until it bumps into its place","The Golgi sorts them, tagging some with an address","The nucleus sends each protein straight to its place","They all leave the cell first, then come back in"], key:1,
 why:"The Golgi finishes each protein and sorts it into its own kind of vesicle. Some, like the lysosome enzyme, get a chemical address tag. Each vesicle carries its protein to one place.",
 miss:{0:"Drifting would be far too slow and random. In the tool, each protein went straight to its own place.",
       2:"The nucleus only sends out the copy of the instructions. Sorting happens much later, in the Golgi.",
       3:"Only insulin leaves. The receptor stays in the membrane and the enzyme stays in a lysosome."},
 src:"M3, M4; packet p. 33 Golgi description (paraphrased)"},

{n:"N8", step:"S4", role:"post", topic:"Not every protein takes the route",
 stem:"Which protein never went through the ER or the Golgi?",
 opts:["Insulin","The receptor for the cell membrane","The enzyme that works in the cytoplasm","The digestive enzyme for a lysosome"], key:2,
 why:"The enzyme that works in the cytoplasm has no ticket at the front of its chain, so its ribosome stays free and the protein stays where it was built. Proteins headed out of the cell, into its membrane or into a lysosome take the route.",
 miss:{0:"Insulin took the whole route, ending in packets that open to the outside.",
       1:"The receptor took the route too. It traveled in a vesicle's membrane and became part of the cell membrane.",
       3:"The lysosome enzyme was sorted by the Golgi and sent to a lysosome in a vesicle."},
 src:"M4"},

{n:"N9", step:"S5", role:"pre", topic:"Packets wait for a signal",
 stem:"Blood sugar is normal and you haven't eaten for a while. Predict what the insulin packets do.",
 opts:["Release all of their insulin at once","Mostly wait, letting out only a trickle","Travel back to the Golgi to be stored","Break apart inside lysosomes for reuse"], key:1,
 why:"At normal blood sugar the packets mostly wait, with only a trickle of insulin going out. They release much more when blood sugar rises. Holding insulin until it is needed is part of homeostasis.",
 miss:{0:"Releasing everything with no meal would push blood sugar too low. Try Normal in the tool.",
       2:"The route runs one way. Finished packets stay near the membrane.",
       3:"The packets are stored, not destroyed. They wait for a rise in blood sugar."},
 src:"M6; packet SOL review on pancreas hormones and homeostasis (idea only)"},

{n:"N10", step:"S5", role:"post", topic:"Exocytosis by its word parts",
 stem:"A packet's membrane merges with the cell membrane and the insulin ends up outside the cell. What is this called?",
 opts:["Endocytosis: endo- means in, cyto means cell","Osmosis: water carries the insulin out","Exocytosis: exo- means out, cyto means cell","Diffusion: insulin drifts through the membrane"], key:2,
 why:"Exo- means out and cyto means cell: exocytosis moves material out of the cell in a vesicle. Endo- means in, so endocytosis brings material in.",
 miss:{0:"Endo- means in. The insulin went out, so the word starts with exo-.",
       1:"Osmosis is water moving across a membrane. Insulin left inside a packet that merged with the membrane.",
       3:"Insulin is too large to drift through the membrane. A whole packet merged with it instead."},
 src:"M5; CLT word-part routine (endo-/exo-)"},

{n:"N11", step:"S6", role:"pre", topic:"Predict the pile-up",
 stem:"What if vesicles could not leave the ER? Predict where the insulin would pile up.",
 opts:["In the ER","In the Golgi apparatus","In the insulin packets","In the blood"], key:0,
 why:"With the ER's exit blocked, the chains keep arriving and fold but cannot move on, so they pile up in the ER. The Golgi, the packets and the blood all run dry.",
 miss:{1:"The Golgi is after the block, so nothing new reaches it.",
       2:"The packets are filled by the Golgi, which is cut off. They run dry.",
       3:"Nothing reaches the blood once an earlier stop is blocked."},
 src:"M3; S6"},

{n:"N12", step:"S6", role:"post", topic:"The organelles as a team",
 stem:"Why is it more accurate to describe the organelles that build proteins as a team than as separate parts?",
 opts:["They all do exactly the same job","Only the nucleus matters; the rest just help","Each one can make insulin on its own","One blocked stop stops every stop after it"], key:3,
 why:"The route is a chain of hand-offs: nucleus, ribosome, ER, Golgi, packet, membrane. Block any one and everything after it runs dry, which is what you saw in the tool.",
 miss:{0:"Each has a different job. That is why the order matters.",
       1:"Without the ribosome, ER and Golgi, the instructions in the nucleus never become a finished protein.",
       2:"No single organelle makes insulin from start to finish. It takes the whole route."},
 src:"M3; packet p. 9 row 'Organelles That Build Proteins'"},

{n:"N13", step:"S7", role:"pre", topic:"What a bacterium has",
 stem:"A bacterium is given the human instructions for insulin. Which structure does it have that lets it build the insulin chain?",
 opts:["A nucleus","Ribosomes","A Golgi apparatus","Endoplasmic reticulum"], key:1,
 why:"Every cell builds proteins, so every cell has ribosomes, prokaryotes included. A bacterium has no nucleus, ER or Golgi.",
 miss:{0:"Bacteria are prokaryotes: their DNA lies loose in the cytoplasm, with no nucleus.",
       2:"The Golgi is a eukaryote's organelle. Bacteria have none.",
       3:"The ER is found only in eukaryotes. Bacteria have none."},
 src:"M7; packet SOL review item on organelles found in both cell types (idea only)"},

{n:"N14", step:"S7", role:"post", topic:"Why the lab has to finish it",
 stem:"Why did the insulin chains built by bacteria have to be finished by people in a lab?",
 opts:["Bacteria have no ER or Golgi to finish them","Bacteria have no ribosomes to build proteins","Bacteria have no DNA to hold the instructions","Bacteria have no membrane around the cell"], key:0,
 why:"The bacterium's ribosomes built the chains, but a bacterium has no ER or Golgi, so the folding, trimming and packing a beta cell does had to be done by people.",
 miss:{1:"They do have ribosomes. That is how they built the chains.",
       2:"They have DNA, loose in the cytoplasm. That is where the insulin instructions were added.",
       3:"Every cell has a cell membrane, bacteria included."},
 src:"M7; BIO.5e synthetic biology (Year Analysis: 5e 'usually thin')"},

// Unit 4 words On only
{n:"U1", step:"S1", role:"extra", u4:true, topic:"Where the copy is made",
 stem:"Where is the messenger RNA copy of the insulin gene made, and what is that step called?",
 opts:["At the ribosome, by translation","In the nucleus, by transcription","In the Golgi, by translation","In the cytoplasm, by transcription"], key:1,
 why:"Transcription copies a gene into mRNA inside the nucleus. Translation happens later, at a ribosome, where the mRNA is read to build the protein.",
 miss:{0:"Translation happens at the ribosome, but it reads the mRNA; it does not make it.",
       2:"The Golgi finishes proteins. No RNA is made there.",
       3:"The DNA stays in the nucleus, so the copy has to be made there."},
 src:"M8; SOL Challenge Q33 topic (not reused)"},

{n:"U2", step:"S2", role:"extra", u4:true, topic:"What carries each amino acid",
 stem:"In the tool, small L-shaped molecules arrived at the ribosome, each holding one amino acid and matching a codon. What are they?",
 opts:["Messenger RNA","DNA","Transfer RNA","Ribosomes"], key:2,
 why:"Transfer RNA (tRNA) carries one amino acid and matches it to a three-base codon on the mRNA. The ribosome links the amino acids it brings.",
 miss:{0:"Messenger RNA is the copy being read. It carries the codons, not the amino acids.",
       1:"DNA stays in the nucleus and never visits the ribosome.",
       3:"The ribosome is the builder the tRNAs bring amino acids to."},
 src:"M8; Virginia 2026 released item, about 34% statewide (topic only, no wording)"},

// Advanced Biology On only
{n:"A1", step:"S3", role:"extra", adv:true, topic:"Why the fold matters",
 stem:"Insulin's chain folds in the ER and is held by sulfur bridges. Why does its shape matter?",
 opts:["The shape decides how many amino acids it has","Insulin works only if its shape fits its receptor","A folded chain is easier for the cell to copy","The shape keeps the insulin inside the cell"], key:1,
 why:"A protein's job depends on its shape. Insulin works by fitting a receptor on other cells, the way a substrate fits an enzyme's active site.",
 miss:{0:"The number of amino acids is set when the chain is built. Folding changes the shape, not the count.",
       2:"Proteins are not copied. The instructions in the DNA are.",
       3:"Insulin is made to leave the cell. Its shape matters for the receptor it fits outside."},
 src:"Module 1 enzyme shape (lock and key, General 50%)"},

{n:"A2", step:"S5", role:"extra", adv:true, topic:"Trimmed in the packet",
 stem:"Inside the packet, a middle piece is cut out of the insulin chain. What is left?",
 opts:["Free amino acids, floating apart","One chain, longer than before","Two short chains, held together","Nothing; the chain is destroyed"], key:2,
 why:"Cutting the middle piece out leaves two short chains, still held together by sulfur bridges. That two-chain molecule is the working insulin.",
 miss:{0:"Only one piece is cut out. The rest stays as chains.",
       1:"Cutting a piece out makes the molecule shorter, not longer.",
       3:"The cut finishes insulin. It does not destroy it."},
 src:"S5 Advanced"}
];
```

## 9. The DE bank (D1–D14)

Same rules, plus `sam` for every wrong option. Keys for D1–D14: A 4 · B 3 · C 3 · D 4.

```js
// DE bank. Permanent numbers D1–D14. sam = a SAM question to write from that wrong choice.
const BANKDE = [
{n:"D1", step:"S1", role:"pre", topic:"What crosses the nuclear envelope",
 stem:"The INS gene is transcribed in a β cell. What crosses the nuclear envelope next, and how?",
 opts:["The mRNA, through nuclear pore complexes","The INS gene, through nuclear pore complexes","The mRNA, by diffusing through the lipid bilayer","Ribosomes carrying the gene, in vesicles from the envelope"], key:0,
 why:"The processed mRNA is exported through nuclear pore complexes. The gene stays in the nucleus, and nothing that large crosses the bilayer directly.",
 miss:{1:"Genes stay in the nucleus; only transcripts leave.",
       2:"mRNA is large and charged. It cannot cross a lipid bilayer; it goes through the pores.",
       3:"Ribosomes do not carry genes, and traffic out of the nucleus does not travel in vesicles."},
 sam:{1:"Write a SAM question: 'Why does the cell export a copy instead of the gene?' Answer it with two reasons.",
      2:"Write a SAM question that compares what can cross a bilayer directly with what needs a pore. Give one example of each.",
      3:"Write a SAM question that lists what leaves the nucleus and what enters it, and how each crosses."},
 src:"Ch. 4 nucleus; Checkpoint cluster 'the route a protein takes'"},

{n:"D2", step:"S1", role:"post", topic:"Where the decision to make insulin is made",
 stem:"A β cell and a liver cell carry the same INS gene, yet only the β cell fills with insulin granules. Where along the route is that difference set first?",
 opts:["In the Golgi: only β cells sort insulin","At the ribosome: only β cells read INS mRNA","In the nucleus: only β cells transcribe INS","At the membrane: only β cells release insulin"], key:2,
 why:"Both cells carry the gene; the β cell transcribes it at a high rate and the liver cell essentially does not. With no transcript, nothing later on the route has insulin to handle.",
 miss:{0:"The Golgi sorts what reaches it. A liver cell makes no insulin for its Golgi to sort.",
       1:"Ribosomes read whatever mRNA they are given. The liver cell has no INS mRNA to read.",
       3:"Release is the last step. A liver cell has no insulin granules to release."},
 sam:{0:"Write a SAM question: 'Every cell has the same genes. How do cells end up so different?' Answer it with one example from this chapter.",
      1:"Write a SAM question that asks whether ribosomes in different cell types are different. Answer it from what decides free versus bound.",
      3:"Write a SAM question that traces backward from 'no insulin released' to the first place the route stopped."},
 src:"Transcription as the first control point (forward link to gene expression)"},

{n:"D3", step:"S2", role:"pre", topic:"What sends the ribosome to the ER",
 stem:"Translation of preproinsulin begins on a free ribosome. What sends that ribosome to the rough ER?",
 opts:["A signal in the 5′ cap of the mRNA, read before translation starts","A signal peptide at the N-terminus, recognised by SRP as it emerges","The Golgi, which recruits ribosomes making secreted proteins","Bound ribosomes are a different type, made only for the ER"], key:1,
 why:"The N-terminal signal peptide is bound by the signal-recognition particle as it leaves the ribosome. SRP pauses translation and docks the ribosome at the ER, where the chain is threaded into the lumen.",
 miss:{0:"The address is in the protein being made, not in the mRNA's cap. Translation starts the same way for every protein.",
       2:"The Golgi receives proteins later. It does not reach out to ribosomes.",
       3:"Free and bound ribosomes are identical. The protein decides where its ribosome works."},
 sam:{0:"Write a SAM question: 'Where is the address of a secreted protein written: in the mRNA or in the protein?' Answer it from the signal hypothesis.",
      2:"Write a SAM question that puts the route in order and marks which steps happen during translation and which after.",
      3:"Write a SAM question: 'If you moved a ribosome from the ER to the cytosol, would it work?' Answer it and say why."},
 src:"Blobel & Dobberstein 1975; Checkpoint cluster 'the route a protein takes'"},

{n:"D4", step:"S2", role:"post", topic:"Moving the signal",
 stem:"Researchers fuse an ER signal peptide to the front of an enzyme that normally stays in the cytosol, and give it no other targeting signal. Where does the enzyme most likely end up?",
 opts:["In the cytosol, exactly as before","In the nucleus, through the pores","In the mitochondria, across both membranes","In the ER, then out of the cell"], key:3,
 why:"The signal peptide is enough to send the ribosome to the ER and the chain into the lumen. With no other signal, the default path runs through the Golgi and out of the cell.",
 miss:{0:"The new signal changes where its ribosome works, so the enzyme no longer stays in the cytosol.",
       1:"Nuclear proteins carry a different signal and enter through pores. An ER signal peptide sends it to the ER.",
       2:"Mitochondria import proteins with their own targeting signal. This is an ER signal."},
 sam:{0:"Write a SAM question: 'What would happen if you cut the signal peptide off preproinsulin's gene?' Answer it and say where the protein would end up.",
      1:"Write a SAM question that lists three addresses a protein can carry (ER, nucleus, mitochondrion) and how each is read.",
      2:"Write a SAM question that compares how a protein gets into a mitochondrion with how it gets into the ER."},
 src:"Signal hypothesis applied; avoids Checkpoint Companion Q39 wording"},

{n:"D5", step:"S3", role:"pre", topic:"110 in, 86 out",
 stem:"Preproinsulin is 110 amino acids long, but the molecule that leaves the ER for the Golgi is 86. What happened in the ER?",
 opts:["Its signal peptide was cut off, and it folded","Lysosomal enzymes trimmed 24 residues off","The ribosome stopped 24 residues early","Its C-peptide was cut out in the ER"], key:0,
 why:"Signal peptidase removes the signal peptide in the lumen (110 − 24 = 86). The proinsulin folds and forms its three disulfide bonds before it is allowed to leave the ER.",
 miss:{1:"Lysosomal enzymes digest; they do not trim proteins in the ER. The trimming here is signal peptidase.",
       2:"The full chain is made. The missing piece is the front, not the end.",
       3:"The C-peptide is cut out later, in maturing granules, after the Golgi."},
 sam:{1:"Write a SAM question that separates trimming (a specific cut) from digestion (breaking a protein down) and says where each happens.",
      2:"Write a SAM question: 'Which end of preproinsulin is removed in the ER, and why that end?' Answer it from what the signal does.",
      3:"Write a SAM question that puts the two cuts of insulin's chain in order and names where each happens."},
 src:"UniProt P01308; Steiner & Oyer 1967"},

{n:"D6", step:"S3", role:"post", topic:"Why disulfides form in the ER",
 stem:"Insulin's three disulfide bonds form in the ER, not in the cytosol. Why there?",
 opts:["The ER has ribosomes on its surface","The ER makes the sulfur-containing amino acids","Disulfides can form only after the Golgi","The ER lumen is oxidizing; the cytosol is reducing"], key:3,
 why:"Disulfide bonds are formed by oxidation. The ER lumen is an oxidizing compartment with enzymes that help form and rearrange them; the cytosol keeps cysteines reduced.",
 miss:{0:"The ribosomes sit on the cytosolic face. The bonds form inside, in the lumen.",
       1:"Cysteine comes from the diet and metabolism. The ER forms bonds between cysteines; it does not make them.",
       2:"Proinsulin must fold, bonds included, before it can leave the ER."},
 sam:{0:"Write a SAM question that draws the ER membrane with a bound ribosome on one side and the folding chain on the other. Label both sides.",
      1:"Write a SAM question: 'What is a disulfide bond, and which amino acid makes it?' Draw two cysteines bonded.",
      2:"Write a SAM question about what the ER does to a protein that has not folded correctly. Answer it, then check it in the deck."},
 src:"ER as an oxidizing compartment (Ch. 4 endomembrane; Ch. 3 protein structure)"},

{n:"D7", step:"S4", role:"pre", topic:"Sorting at the trans face",
 stem:"A lysosomal hydrolase and proinsulin pass through the cis Golgi together. What separates them at the trans face?",
 opts:["Size: the larger protein goes to the lysosome","A mannose-6-phosphate tag, read by M6P receptors","Order: the one made first leaves first","The lysosome reaches in and takes what it needs"], key:1,
 why:"The hydrolase picks up mannose-6-phosphate in the cis Golgi. M6P receptors at the trans face bind it and pack it into vesicles bound for lysosomes; untagged proinsulin goes into secretory granules.",
 miss:{0:"Sorting reads tags, not size.",
       2:"The order of manufacture does not decide the destination. The tag does.",
       3:"Delivery runs from the Golgi to the lysosome in vesicles, not the other way."},
 sam:{0:"Write a SAM question: 'What does the Golgi read to sort a protein?' Answer it with the lysosome example.",
      2:"Write a SAM question that follows one lysosomal enzyme from the ribosome to the lysosome and names the tag that got it there.",
      3:"Write a SAM question that draws vesicle traffic between ER, Golgi, lysosome and plasma membrane with arrows showing direction."},
 src:"Ch. 4 Golgi and lysosomes; avoids Checkpoint Companion Q43 wording"},

{n:"D8", step:"S4", role:"post", topic:"A missing tag",
 stem:"In I-cell disease, cells cannot add the mannose-6-phosphate tag. Where do their lysosomal hydrolases go?",
 opts:["Out of the cell, by the default route","Into lysosomes as usual, only more slowly","Back to the ER to be refolded","Into the nucleus through its pores"], key:0,
 why:"Without the tag, the hydrolases are not captured for lysosomes and follow the default path out of the cell. Lysosomes, missing their enzymes, fill with material they cannot break down.",
 miss:{1:"The tag is the address. Without it, most hydrolases are not captured for lysosomes.",
       2:"The proteins fold correctly; they lack only the tag. The ER has no reason to hold them.",
       3:"Nothing in this route leads to the nucleus. Nuclear proteins carry a different signal."},
 sam:{1:"Write a SAM question: 'What happens to a protein whose Golgi tag is missing?' Answer it and say where the default route goes.",
      2:"Write a SAM question that separates a protein that failed to fold from one that failed to be tagged. Where does each end up?",
      3:"Write a SAM question that lists the destinations a protein can reach from the Golgi."},
 src:"Applied lysosome case; Checkpoint cluster 'organelles with one job'"},

{n:"D9", step:"S5", role:"pre", topic:"Regulated versus constitutive",
 stem:"At normal glucose, insulin granules sit near the plasma membrane and few fuse. How does this differ from constitutive secretion?",
 opts:["Constitutive vesicles come from the ER instead","Unused granules are digested within minutes","Granules are stored and fuse only on a signal","No difference; both fuse continuously"], key:2,
 why:"Insulin is stored in granules and released when a signal arrives, mainly rising glucose. Constitutive vesicles, like the ones carrying the receptor, fuse as soon as they arrive.",
 miss:{0:"Both kinds of vesicle leave from the trans face of the Golgi.",
       1:"Granules are stored for hours or longer. Storage is the point.",
       3:"Watch the receptor vesicles in S4 and the insulin granules in S5: one fuses at once, the other waits."},
 sam:{0:"Write a SAM question that puts constitutive and regulated secretion in two columns: what triggers fusion, an example, and where the vesicles came from.",
      1:"Write a SAM question: 'Why store insulin instead of making it on demand?' Answer it from how fast blood glucose changes after a meal.",
      3:"Write a SAM question that compares the receptor's route to the membrane with insulin's route out of the cell."},
 src:"Ch. 4 secretory vesicles; regulated exocytosis"},

{n:"D10", step:"S5", role:"post", topic:"C-peptide as a measure",
 stem:"A person with diabetes injects manufactured insulin. Why can a blood test for C-peptide still show how much insulin their own β cells are making?",
 opts:["The liver makes C-peptide when insulin rises","Injected insulin carries extra C-peptide","C-peptide is what insulin breaks down into","Only the person's own proinsulin yields C-peptide"], key:3,
 why:"Proinsulin is cut into insulin and C-peptide in the β cell's granules, and both are released together. Manufactured insulin contains no C-peptide, so C-peptide in the blood reports the person's own production.",
 miss:{0:"C-peptide is cut from proinsulin in the β cell, not made by the liver.",
       1:"Manufactured insulin is purified insulin, without C-peptide. That is what makes the test work.",
       2:"C-peptide is cut out of proinsulin before release. It is not made by breaking insulin down."},
 sam:{0:"Write a SAM question that follows proinsulin from the ER to the bloodstream and names every piece that comes out.",
      1:"Write a SAM question: 'What is in an insulin injection, and what is missing compared with what a β cell releases?'",
      2:"Write a SAM question that separates processing (a specific cut that activates) from degradation (breakdown that ends)."},
 src:"Applied: C-peptide and proinsulin processing"},

{n:"D11", step:"S6", role:"pre", topic:"Predicting a pulse-chase",
 stem:"β cells get a 3-minute pulse of a radioactive amino acid, then a chase with unlabelled amino acids. In what order does the label appear?",
 opts:["Golgi → rough ER → granules","Granules → Golgi → rough ER","Rough ER → Golgi → granules","All compartments at the same moment"], key:2,
 why:"Newly made protein enters the rough ER, moves to the Golgi, then into granules, which release it to the outside only when blood glucose rises. The chase lets you watch one labelled cohort move in that order.",
 miss:{0:"The rough ER receives new protein first, as it is made.",
       1:"That is the route run backwards. The label starts where protein is made.",
       3:"Only protein made during the pulse is labelled, so it moves as one group, one compartment after another."},
 sam:{0:"Write a SAM question: 'Why does a pulse-chase need the chase?' Answer it from what would happen if the label kept coming.",
      1:"Write a SAM question that sketches the graph of label in each compartment over time, before you check the tool.",
      3:"Write a SAM question that explains what 'pulse' and 'chase' each do to which proteins are labelled."},
 src:"Jamieson & Palade 1967 design"},

{n:"D12", step:"S6", role:"post", topic:"A block, read by its pile-up",
 stem:"A drug stops vesicles from leaving the ER, while translation into the ER continues. After a pulse-chase, where is most of the label at 60 minutes?",
 opts:["In the rough ER, which swells","In the Golgi apparatus","In the secretory granules","Outside the cell, in the blood"], key:0,
 why:"With ER exit blocked, labelled protein enters the ER but cannot move on, so it stays there and the ER swells. Everything downstream receives none of it.",
 miss:{1:"The Golgi is downstream of the block, so the labelled protein never reaches it.",
       2:"Granules are filled from the Golgi, which receives nothing.",
       3:"Release needs every earlier step. None of the label gets out."},
 sam:{1:"Write a SAM question: 'Block each step of the route in turn. Where does the protein pile up each time?' Make it a table.",
      2:"Write a SAM question that asks what a drug blocking Golgi exit would do to the plasma membrane's receptors over time.",
      3:"Write a SAM question that explains how a block lets you work out the order of a pathway."},
 src:"S6; avoids Cell Check DE item (Golgi-exit block)"},

{n:"D13", step:"S7", role:"pre", topic:"What the bacterium can do",
 stem:"A synthetic gene for an insulin chain is placed in E. coli. Which step of the β cell's route can the bacterium still carry out?",
 opts:["Folding with disulfide bonds in the ER","Sorting at the trans face of the Golgi","Packing into secretory granules","Translating the mRNA on its own ribosomes"], key:3,
 why:"Every cell translates mRNA on ribosomes, so E. coli can build the chain. It has no endomembrane system, so the ER, Golgi and granule steps are missing.",
 miss:{0:"Bacteria have no ER. The folding and bonding insulin gets there had to be done by people.",
       1:"Bacteria have no Golgi.",
       2:"Bacteria have no secretory granules; the chains collect inside the cell."},
 sam:{0:"Write a SAM question that lists the β cell's route and crosses out every step a bacterium cannot do.",
      1:"Write a SAM question: 'What do all cells share, prokaryote and eukaryote alike?' Answer it with four structures.",
      2:"Write a SAM question that explains why bacteria cannot store insulin for later release."},
 src:"Ch. 4 prokaryote vs eukaryote; Goeddel et al. 1979"},

{n:"D14", step:"S7", role:"post", topic:"Why bacteria cannot finish insulin",
 stem:"Bacteria given insulin genes build the chains. Why can they not turn out finished two-chain insulin the way a β cell does?",
 opts:["Their ribosomes stop at about 30 amino acids","They have no ER or granules to fold and trim it","They cannot copy a human gene in any form","They would secrete the insulin and lose it"], key:1,
 why:"A β cell folds proinsulin in the ER and trims it in granules. A bacterium has no endomembrane system, so people do those steps. The 1979 work made the A and B chains in separate bacteria and joined them in the lab; later processes made proinsulin and trimmed it with enzymes.",
 miss:{0:"Bacterial ribosomes build chains hundreds of amino acids long.",
       2:"The bacteria copied and expressed the synthetic genes. Copying was not the problem.",
       3:"The chains stayed inside the bacteria. Nothing was lost to secretion."},
 sam:{0:"Write a SAM question: 'What limits the length of a protein a ribosome can make?' Answer it, then compare a bacterial ribosome with yours.",
      2:"Write a SAM question that explains what had to be done to a human gene so a bacterium could express it.",
      3:"Write a SAM question that compares where insulin ends up in a β cell and in a bacterium, and why."},
 src:"Goeddel et al. 1979"}
];
```

## 10. Acceptance tests

### 10.1 The test hook

Expose `window.__PR`, the way the Signal Patch exposes `window.__SP`. It must not change behaviour.

```js
window.__PR = {
  st: () => st,
  goStep(i),                                   // 0..6 = S1..S7
  setLevel("nine"|"de"), setU4(true|false), setAdv(true|false), setDev("ipad"|"pc"),
  fill(true|false), cardHidden(true|false),
  set(name, value),   // "glucose" "low|normal|high", "speed" 0.5|1|2, "teach" true|false, "codons" true|false
  sendDNA(), copyOut(), startBuild(), tapSignal(), fold(), ship(),
  sendCargo("insulin"|"receptor"|"lysosome"|"cytosol"),
  block("pore"|"dock"|"erGolgi"|"golgiPacket"|"packetOut"|null),
  pulse(), chase(glucose),                     // DE S6
  bacterium(), labFinish(),                    // S7
  answer(itemId, optionIndex), type(stepKey, text),
  run(seconds),                                // advance the model fast, without drawing
  tokens(),                                    // [{kind, x, y, place}] for every drawn token
  where(kind),                                 // compartment names a cargo/token kind has visited, in order
  counts(),  // { dnaSendTries, dnaOutside, copiesOut, chainLength, riboDocked, signalSeen, folded, vesiclesToGolgi,
             //   cargoDone:{…}, fusions, insulinReleased, insulinRate, piled:{place:n}, blocksTried, chaseRuns:{low,high},
             //   bactChains, bactPackets, bactReleased, labFinished }
  chaseAt(tMin, glucose),                      // {roughER, golgi, packets, outside} fractions from the model
  stepDone(i), visSteps(),
  items(level), allText(level, {u4, adv}),     // every string that level and switch set can show
  colours(), fps(), requests()
};
```

### 10.2 The tests

Run each at **1180 × 820** in both device settings unless stated. Report PASS or FAIL with a one-line reason per FAIL.

| # | Test | How to check |
|---|---|---|
| **T1** | **Numbers agree with `ROUTE_DATA`** | Every number-with-unit and every count in `allText(level, all switch combos)` equals a `ROUTE_DATA` value or a stated derivation (110 − 24 = 86; 30 + 2 + 31 + 2 + 21 = 86; 21 + 30 = 51). Allowed literals: citation years (1967, 1974, 1975, 1979, 1982), "1960s", "70S", "three" bases per codon, glucose mg/dL values, the 3-minute pulse, chase-axis ticks. The eyebrow, footer and "For teachers" box are excluded. List anything else. The simulation reads lengths, gates and chase fractions from `ROUTE_DATA`, never from literals (code review). |
| **T2** | **Routes are right** | For each cargo, `sendCargo(k)` then `run(120)`; `where(k)` equals `ROUTE_DATA.route[k]` exactly. The cytosol enzyme's `where` contains neither `roughER` nor `golgi`. |
| **T3** | **Free versus bound** | In S2, `riboDocked` becomes true only after `chainLength` ≥ 3 (the signal piece has emerged). For the cytosol cargo, its ribosome never docks. |
| **T4** | **The DNA stays home** | `sendDNA()` five times plus `run(300)`: `counts().dnaOutside === 0` and no `tokens()` entry with kind `dna` has `place !== "nucleus"`. `copyOut()` produces a `message` token whose path passes a pore position (code review: the token's path is computed to cross at a pore). |
| **T5** | **Glucose gate** | S5: `insulinRate` equals `ROUTE_DATA.glucose[g].release` (±0.01) at each setting; `insulinReleased` stays 0 after `run(60)` at Low; `fusions` > 0 at High. |
| **T6** | **Blocks pile up in the right place** | For each block, `run(120)` after `sendCargo("insulin")` ×3: `piled` is largest in the compartment just before the block, and every compartment after it gets 0 new insulin. |
| **T7** | **Pulse-chase (DE)** | `chaseAt(t,"low")` matches the `ROUTE_DATA.chase.table` rows at t = 0, 5, 20, 60, 120 within 0.02, each row sums to 1.00 ± 0.01, and `outside` is 0 at Low. At High, `outside` rises from t = 60 at `highOutsidePerHour`. The graph caption contains "times illustrative". The chase controls do not exist at 9th. |
| **T8** | **9th-grade vocabulary** | For every string in `allText("nine", {u4, adv})` for all four switch combinations, and the rendered 9th DOM (Sources excluded): no `NINTH_FORBIDDEN` entry; no `NINTH_U4_ONLY` entry when u4 is off; no `NINTH_ADV_ONLY` entry when adv is off (whole word, case rules as commented). Every tool-native word a step uses appears in its chips. |
| **T9** | **Forbidden claims, every level** | Over `allText(level)` **minus wrong options and `miss` notes**: no sentence says the nucleus makes, builds or assembles a protein; none says DNA leaves the nucleus; none says every protein goes through the Golgi; none says bacteria cannot form any disulfide bond. Search `/nucleus[^.]{0,40}(makes|builds|assembles)[^.]{0,20}protein/i`, `/DNA[^.]{0,30}(leaves|exits)[^.]{0,20}nucleus/i` unless the sentence also contains "never" or "not" or "stays", `/(every|all) proteins?[^.]{0,30}Golgi/i` unless it contains "not". Review hits by hand and list them. |
| **T10** | **Bacterium** | S7: after `bacterium()` and `run(120)`: `bactChains ≥ 3`, `bactPackets === 0`, `bactReleased === 0`. After `labFinish()`, `labFinished === true` and the three-panel sequence is in the DOM. |
| **T11** | **Switches** | With `setU4(false)`, no codon labels or tRNA tokens draw in S2 at 9th, and U1–U2 are absent; with `setU4(true)`, both appear and the eyebrow changes as §5.6 says. `setAdv` shows and hides A1–A2 and the sulfur bridges. At DE both switches are hidden and DE text shows. Switching on any step keeps progress and changes text without a reload. |
| **T12** | **Deep links** | Loading `?level=nine&u4=1&step=2` opens 9th, Unit 4 words On, S2. `?level=de&step=6` opens DE S6. A reload without parameters restores the saved state, not the parameters. |
| **T13** | **Touch targets** | iPad setting: every button, option, chip, step dot and canvas overlay button ≥48 × 48. FAIL any under 44; list any between 44 and 48. |
| **T14** | **Layout** | At 1180 × 820 and 1180 × 750 with `fill(true)`: `scrollHeight <= innerHeight + 1`; canvases and controls inside the viewport. At 820 × 1180, 768, 390 and 360 wide: `scrollWidth <= innerWidth`; the stage stays pinned while the card scrolls. |
| **T15** | **Reduced motion** | With `prefers-reduced-motion: reduce`, two `tokens()` reads 50 ms apart with no model tick between them are identical; every goal can still be met. |
| **T16** | **Steps and dots** | Every step opens from its dot. `stepDone(i)` is true only when pre, goals, post and "What you found" (≥8 chars) are done. U- and A-items never block. `set("teach",true)` opens everything and makes no `stepDone` true. |
| **T17** | **Banks intact** | `items("nine")` = N1–N14 + U1–U2 + A1–A2 and `items("de")` = D1–D14, exactly as §8–§9. A wrong answer shows its `miss` (plus `sam` at DE), then `why`. `src` never renders. |
| **T18** | **Saving and privacy** | A reload restores level, switches, step, answers, goals, typed sentences and fill. With `localStorage` throwing, the page loads and runs. `requests()` lists only the page and Google Fonts. No `fetch`, `XMLHttpRequest`, `sendBeacon` or form `action` in the file. No console errors. |
| **T19** | **Contrast** | Every pair in `colours()`, light and dark (emulated): labels ≥4.5:1, token fills against the stage ≥3:1. |
| **T20** | **Frame rate** (informational) | iPad setting, S4 with all four cargoes moving, 5 s: report `fps()`. FAIL only if < 30 in headless Chromium. |
| **T21** | **Nothing else changed** | `git diff --name-only main...HEAD` lists **only** `biology/tools/protein-route.html`. |

### 10.3 The report back

One message with: the branch, commit hash and PR link; the T1–T21 table for both device settings; screenshots at 1180 × 820 of 9th S1 (DNA bumping the envelope), 9th S2 with Unit 4 words On (codons and tRNA), 9th S4 with the destination table full, 9th S5 at High, 9th S7 bacterium, DE S2 (SRP docking), DE S6 chase graph at High, Teaching view with a pinned callout; one at 820 × 1180 in portrait with the stage pinned and the card scrolled; and anything you could not do or did differently, and why. Then stop. Do not merge.

## 11. After Reid reviews (not part of this build)

- **Review on the iPad.** GitHub Pages serves only `main`, so a PR has no live preview; Reid reviews the screenshots and the branch file, then merges. The page is live from that moment but unlisted until the steps below.
- **Classroom-tools hub:** Bio Tool #18 under **Module 2 · Cell Structure & Function**, and again under **Unit 4 · Nucleic Acids & Protein Synthesis** with `?u4=1`.
- **DE hub:** Unit 4 · Tour of the Cell, tools-first sort, after Bio Tool #13.
- **Cross-links:** a one-line Go further edit in `signal-patch.html` pointing back here; Cell Check's results "Build the picture yourself" for the protein-route bands could link here.
- **Sitemap and search:** add the URL and rebuild `search-index.js` with `One Pagers/build-search-index.py` on the Mac.
- **Canvas** (ExternalUrl, new tab, never re-hosted): Biology I 425631 and Adv Biology I 425639, Module 2, mirrored (Lesson 2 and Additional Study Materials), and Unit 4 later; DE 425646 Unit 4 module 3662043.
- **Video:** Reid narrates a short screen recording of S1–S5 and S6 (design in the project doc on the five videos).

## 12. Where the design came from (for Reid; the builder can skip this)

- **Reid's Lesson 2** (Adv Biology I 425639, Module 2, "Lesson 2 — Organelle Stations"): the question on the Start Here page, Canvas Original #1 "Follow the Insulin", the board route, the human-chain role-play, and the plan page's watch-for, *"the nucleus makes the protein."* → M1, S1–S2.
- **The scanned Module 2 packet** (`Teaching & School/Packets/schwebr_9-25-2026_15-53-31.pdf`): p. 9's chart groups nucleus as the control center and ribosomes, ER and Golgi as "Organelles That Build Proteins" (the tool's route); p. 8's exocytosis figure and LT 2.5 endocytosis/exocytosis (S5); the p. 32 SOL review items on pancreas hormones and homeostasis, ER as the cell's transport system and the organelle found in both cell types (N9, N12, N13 test the ideas, not the wording); the p. 33 Learn.Genetics summary (messages from the nucleus; the Golgi adds address tags), paraphrased only.
- **The CLT analysis Reid takes to the Biology CLT this week** ("2026-09-26 Look Back M1 – Look Forward M2" and the Year Analysis): Module 2 Tier 1 coverage, *trace a protein from ribosome to rough ER to Golgi to membrane* (Unit Test Q8–Q10, BIO.3b) → the whole tool; the widest General-section gap is precise vocabulary, with the recommended response a word-part routine (endo-/exo- named for Module 2) and every term paired with a model students draw → N10, the word-part chips and the "Draw it yourself" box; monomers (monomer pairing 66%, General 41%) → N3; enzyme shape (lock and key, General 50%) → A1; "enter through data", since General students read graphs and models nearly as well as Advanced → the destination table and the pulse-chase graph; BIO.5e synthetic biology "usually thin" in Unit 4 → S7.
- **Where Virginia students miss SOL items** (the 2026 released items in Bio Tool #8's Virginia ratings): naming the molecule that carries an amino acid to the ribosome, about 34% statewide → U2 and the Unit 4 switch's tRNA drawing; where transcription and translation happen (Q33's topic) → U1. No released wording is used.
- **DE**: Checkpoint Chapter 4's clusters "the route a protein takes" and "organelles with one job"; Bio Tool #9 items 38–43 and Cell Check's DE route band were read so nothing here repeats them.
