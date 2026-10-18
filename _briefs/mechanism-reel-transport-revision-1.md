# transport (#25), revision 1 — one mechanism fix and three teaching corrections

Written 2026-10-17 after Reid reviewed the build on `claude/mechanism-reel-transport` (tip
`3785b5d`). The build was clean — every test passed, T19 passed on its first application, T3 at
0.096 %. Nothing here is a complaint about that work. These are four things a biologist's read
turned up that the suite cannot see, because they are about what the figure teaches rather than
whether it runs.

Read with `_briefs/mechanism-reel-phase2-transport.md`, whose D1–D8 all stand. The still does not
change (D8 still holds). Scope is still `mechanism-reel.html` and the transport suite only.

## R1. The sodium and potassium legs must not overlap — this is the one real error

The Na⁺/K⁺ ATPase is a P-type pump, and the defining property of that family is **alternating
access**: the ion pathway opens to one side or the other, never both at once. The Post-Albers cycle
runs sodium binds inside → ATP phosphorylates the pump → the conformation flips and the sites face
outward with low sodium affinity → sodium leaves → potassium binds outside → dephosphorylation →
the conformation flips back → potassium is released inside. The two fluxes are separate half-cycles.
A protein with both sides open at once is not a pump, it is a channel. Palytoxin is poisonous
precisely because it jams this pump's gates open and turns it into one.

That matters more in this figure than it would anywhere else, because the figure's whole argument
is pump versus channel. Any frame where ions visibly cross in both directions at the same moment
undercuts the thing the page exists to teach.

In the current step 2 the legs overlap by 300 ms:

```
naP0  A(1700,900)  -> 1700-2600
naP1  A(1900,900)  -> 1900-2800
naP2  A(2100,900)  -> 2100-3000
kA    A(2700,900)  -> 2700-3600   <-- starts while naP1 and naP2 are still outbound
kB    A(2850,900)  -> 2850-3750
```

→ **Start the potassium leg at or after 3000 ms**, so the last sodium has arrived before the first
potassium sets off. Cascade `lblKIn`, `kC`, `kD`, `b2`, `flagLine` and `lg2` behind it and extend
`DUR[2]` by the same amount. Exact numbers are yours; the assertion to satisfy is that no potassium
mover starts before every sodium mover has finished.

**Add a test for it.** T19 checks payment before result; nothing checks direction exclusivity, and
it is the property most worth protecting on this figure and on any future pump. Suggested as T28,
in the transport suite: for every pair of movers crossing the membrane in opposite directions
through the same protein, assert their active intervals do not intersect. Report it in the table.

Keep the three sodiums leaving in a slight stagger. In reality they are occluded and released as a
set, but the stagger is legibility, not a claim about mechanism, and it teaches nothing false.

## R2. Say that the channel spends what the pump banked

The closing line is "Both move the same ion through the same membrane. Only the pump pays," and
step 3's prompt marks "Neither; the gradient does the work" wrong. Per event that is right. But the
gradient the channel runs down **was built by the pump out of ATP**, so the channel's flux is paid
for too, just earlier. As the page stands, a student who answers "the gradient does the work" is
reasoning better than the key credits them for.

This is the deepest idea the figure has available, it is Campbell Chapter 7 for DE, and it is the
foundation under secondary active transport when they meet it.

→ Add one line. Both levels, in each level's own words. DE can say the gradient is stored energy the
pump paid to build; SOL can say the crowd outside is there because the pump put it there. Put it
where it lands after the comparison — the closing line or just under it — and **do not turn the
step 3 prompt's "Only the pump" into a wrong answer.** It stays correct for the frame it asks
about. The added line extends it rather than contradicting it.

## R3. Potassium goes uphill too, and only sodium's gradient is labelled

The still labels "Outside: sodium is crowded / Inside: sodium is scarce" and nothing else. But
potassium's gradient runs the other way — high inside, low outside — and the pump pushes potassium
**in**, against it. The caption's "Against the gradient" is quietly doing duty for both ions. A
careful student sees one labelled gradient and can conclude potassium is riding downhill, which
makes the ATP look like it only buys the sodium leg. Both legs are uphill; that is why one ATP buys
the pair.

→ **DE level only**, and not on the still: a caption or prompt line saying potassium is also moving
against its own gradient. At SOL this is a third idea on a figure already carrying two, so leave the
SOL text alone unless it costs nothing.

## R4. Reword the DE step-2 prompt

It currently asks "The Na⁺/K⁺ ATPase is about to push sodium out into the crowd. What happens
first?" and keys to "ATP splits; then the pump moves the ions." In the Post-Albers cycle sodium
binds from the cytoplasm first; phosphorylation precedes the *release*, not the binding. At SOL this
is fine. At DE, where they may meet the cycle in Campbell, "sodium binds" is a defensible answer the
key would mark wrong.

→ DE version becomes something like **"What has to happen before the pump can push sodium out?"**
That keeps the payment-before-result point T19 protects and stops asserting a cycle order the figure
is not drawing. Leave the SOL wording as it is.

## Not changing, decided

- **Electrogenicity** (three out, two in, net one positive charge leaving per cycle, a direct
  contribution to resting potential). Real, and real DE content, but it is a third idea on a figure
  built around two. Held for a later DE version under the annual-rebuild rule.
- **The ligand-gated channel drawn sodium-selective.** Real ones such as the nicotinic acetylcholine
  receptor are non-selective cation channels. This is a standard textbook simplification and it
  stays.

## Tests

Rerun the §7 suite plus T21–T27 and the new T28 against transport, at 1180x820 and 390x844. T19
must still pass after the retiming. T3 should be unchanged at about 0.096 % — if it moves, the
retiming disturbed a final position and that is a problem, since the final state is the still.
Report the table with a one-line reason for each FAIL, the T4 minimum and the T3 percentage, and say
which branch you used.

Commit and push the branch. Do not merge, do not open a pull request. Nothing publishes without
Reid.

---

# Added 2026-10-17 after Reid asked whether the published figures needed the same audit

They did. The transport overlap was caught by a biologist's eye, not by the suite, and the suite
cannot see this class of problem on any figure. An audit of the two live figures found one more
error and one acceptable compression. Both of the items below ride in the same run as R1–R4, so all
three suites rerun together and Reid reviews once.

## R5. `dogma` caps after it splices, and the cap goes on first

**This figure is live.** In step 3 the introns come out at 100–1000 ms and the cap and tail arrive
at 900–1200 ms:

```
ex1,ex2,ex3  A(100,900)   -> 100-1000   introns out
cap,tail     A(900,300)   -> 900-1200   cap and tail on
```

The 5′ cap is added co-transcriptionally, when the transcript is only about 25 to 30 nucleotides
long — long before splicing finishes. Polyadenylation comes at the end. So the order as animated is
wrong for the cap, and the figure's own legend line already says **"Capped, tailed, spliced, and out
it goes,"** which puts the cap first. The picture and the caption disagree, and the picture is the
one that is wrong.

This is **not** the co-transcriptional splicing variant that was deliberately held at Phase 1. That
decision was about whether splicing overlaps transcription, and it stands. This is the order of two
events the figure already draws separately.

→ **Put the cap on before the introns come out.** Minimum change: `cap` early in the step, then the
excisions, then `tail` at the end, so the sequence reads cap → splice → tail → out. If that makes
the step too busy, cap first and keep tail with the departure. The legend line can stay as it is
once the animation matches it, or become "Capped, spliced, tailed, and out it goes" if you prefer
the animation's order spelled out — Reid's call, so put the question in your report rather than
rewording it silently.

The SOL line reads "Capped, tailed, trimmed, and out it goes" and needs the same treatment.

## R6. Per-figure references, shown with the figure

`SOURCES` currently holds three entries and they are all dogma's:

```
Nirenberg 1961     https://doi.org/10.1073/pnas.47.10.1588
Crick 1970         https://doi.org/10.1038/227561a0
Berget & Sharp 1977 https://doi.org/10.1073/pnas.74.8.3171
```

gpcr has none. transport's Skou 1957 is drawn on the still but is not in the list, so it does not
appear on the page as a citation.

→ **Make `SOURCES` per figure**, keyed the way `txt` and `svg` already are, and show the selected
figure's sources as a visible line under the reel — not behind a disclosure. Reid wants them seen.
Carry dogma's three across unchanged. transport takes Skou 1957
(`https://doi.org/10.1016/0006-3002(57)90343-8`), already on its still. For gpcr, pick two or three
primary papers that match what the figure actually draws — the G-protein and second-messenger work
is the obvious ground — and say in your report which you chose and why, so Reid can swap them. Do
not invent a citation; if you are not certain a DOI resolves to what you think it does, leave it out
and say so.

The four unbuilt figures get no sources until they are built.

## Scope and tests for this combined run

Still `mechanism-reel.html` and the suites only. The hubs, `sitemap.xml`, `search-index.js`,
`search.html` and `style.css` are Reid's and were done by hand on 10/16. The stills do not change
for any figure.

Rerun **all three** suites — gpcr, dogma and transport — plus the new T28 on transport. R5 changes
dogma's step-3 timing, so dogma's T3 and T17 are the ones to watch there; transport's T3 must stay
at about 0.096 % and gpcr's at about 0.89 %. A T3 that moves means a final position was disturbed,
and the final state is the still, so treat it as a failure rather than a new baseline.
