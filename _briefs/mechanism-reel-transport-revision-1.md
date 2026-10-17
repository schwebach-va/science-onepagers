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
