#!/usr/bin/env python3
"""Figure 5 - the central dogma, transcription and translation.

One idea: one message, written out in one language inside the nucleus and read
in another language outside it.

GMU survey stuck points: transcription and translation 80%, the three RNAs 60%,
codons and direction 40%. SOL Bio Module 4 and the DE gene-expression unit.

Drawn from the mechanism. Nothing traced or copied.
"""
from style import *

H = 1000
s = head(H, "One message, written out and then read aloud",
         "SOL Bio Module 4 . DE Bio 101 . gene expression",
         "Inside the nucleus, RNA polymerase copies one gene from DNA into pre-messenger RNA. The "
         "copy is capped, given a tail, and spliced so that only the exons remain. The finished "
         "mRNA leaves through a nuclear pore. In the cytosol a ribosome moves along it three bases "
         "at a time; each transfer RNA brings the one amino acid its anticodon matches, and the "
         "amino acids are joined into a polypeptide.")
s += ARROWDEFS

DNA_Y, PRE_Y, M_Y = 238, 346, 452
EXON, INTRON, DEEP = NUC, "#CBBEDC", "#46345E"

# ================================================================== the nucleus
s += rrect(52, 150, 686, 450, 36, NUC_SOFT, NUC, 4)
s += rrect(730, 150, 16, 262, 6, PAPER)                 # the wall, cut for the pore
s += rrect(730, 492, 16, 108, 6, PAPER)
s += text(76, 192, "Nucleus", "key", "start", NUC)
s += text(790, 192, "Cytosol", "key", "start", PRO)

# ---- the gene --------------------------------------------------------------
s += text(76, DNA_Y + 10, "DNA", "lab", "start", NUC)
for dy in (-16, 16):
    s += rrect(176, DNA_Y + dy - 5, 486, 10, 5, NUC)
for x in range(190, 656, 26):
    s += rrect(x - 3.5, DNA_Y - 14, 7, 28, 3.5, "#9C86B4")
s += rrect(434, DNA_Y - 46, 136, 92, 14, PRO, PRO_SIDE, 4)
s += text(502, DNA_Y + 6, "RNA pol", "min", "middle", PAPER)
s += step(1, 408, DNA_Y - 44, NUC)

# ---- the first copy, introns and all ---------------------------------------
s += arrow(502, DNA_Y + 50, 502, PRE_Y - 30, NUC, 6, "arn")
s += text(76, PRE_Y + 10, "pre-mRNA", "lab", "start", NUC)
for x, w, col in ((232, 92, EXON), (324, 80, INTRON), (404, 100, EXON),
                  (504, 74, INTRON), (578, 88, EXON)):
    s += rrect(x, PRE_Y - 11, w, 22, 6, col, NUC, 3)
s += text(364, PRE_Y - 28, "intron", "min", "middle", INKSOFT)
s += text(541, PRE_Y - 28, "intron", "min", "middle", INKSOFT)
s += step(2, 686, PRE_Y, CARB)

# ---- capped, tailed, spliced ------------------------------------------------
s += arrow(404, PRE_Y + 28, 404, M_Y - 30, CARB, 6, "arb")
s += text(90, PRE_Y + 62, "cap, tail, introns out", "min", "start", CARB)
s += text(76, M_Y + 10, "mRNA", "lab", "start", NUC)
s += circ(214, M_Y, 15, CARB, "#8A5E16", 3)
x = 238
for w in (92, 100, 88):
    s += rrect(x, M_Y - 11, w, 22, 6, EXON, NUC, 3)
    x += w + 6
for i in range(4):
    s += circ(x + 10 + i*26, M_Y, 11, CARB, "#8A5E16", 2)

# ---- out through the pore ---------------------------------------------------
s += arrow(712, M_Y, 796, M_Y, NUC, 7, "arn")
s += text(748, 356, "nuclear pore", "min", "start", INKSOFT)
s += curve("M 786 368 C 770 392, 756 406, 752 424", INKSOFT, 4, "ars")
s += step(3, 772, 500, NUC)

# ================================================================= the cytosol
s += rrect(800, M_Y - 9, 748, 18, 5, EXON, NUC, 3)
for x in range(824, 1544, 52):
    s += rrect(x - 2.5, M_Y - 9, 5, 18, 2.5, PAPER)          # one block per codon
s += text(800, 566, "one codon = three bases", "min", "start", INKSOFT)
s += curve(f"M 880 540 L 880 {M_Y+22}", INKSOFT, 4, "ars")
s += arrow(800, 624, 1056, 624, INKSOFT, 5, "ars")
s += text(1072, 634, "the ribosome reads this way", "min", "start", INKSOFT)

# ---- the ribosome, drawn as an arch so the tRNAs stay visible -------------
s += rrect(1090, 310, 360, 46, 22, PRO, PRO_SIDE, 4)         # large subunit, top
s += rrect(1090, 310, 104, 132, 26, PRO, PRO_SIDE, 4)        # large subunit, left leg
s += rrect(1346, 310, 104, 132, 26, PRO, PRO_SIDE, 4)        # large subunit, right leg
s += rrect(1110, M_Y + 12, 320, 62, 26, PRO, PRO_SIDE, 4)    # small subunit
s += text(1548, 592, "ribosome", "key", "end", PRO)
s += step(4, 1090, 310, PRO)

# ---- tRNAs: one in the slot, one arriving ---------------------------------
for x in (1212, 1290):
    s += rrect(x, 386, 56, 42, 10, NUC, DEEP, 3)
    s += rrect(x + 4, 428, 48, 14, 5, DEEP)
    s += circ(x + 28, 372, 17, PRO, PRO_SIDE, 3)
s += rrect(1478, 386, 56, 42, 10, NUC, DEEP, 3)
s += rrect(1482, 428, 48, 14, 5, DEEP)
s += circ(1506, 370, 17, PRO, PRO_SIDE, 3)
s += text(1506, 324, "tRNA", "lab", "middle", NUC)
s += text(1548, 690, "anticodon", "min", "end", DEEP)
s += curve("M 1498 662 C 1506 580, 1506 500, 1506 448", DEEP, 4, "arn")

# ---- the chain coming out ---------------------------------------------------
pts = [(1288, 298), (1262, 266), (1212, 240), (1152, 226), (1094, 224), (1040, 232)]
for i in range(len(pts) - 1):
    s += (f'<line x1="{pts[i][0]}" y1="{pts[i][1]}" x2="{pts[i+1][0]}" y2="{pts[i+1][1]}" '
          f'stroke="{PRO_SIDE}" stroke-width="7"/>\n')
for px, py in pts:
    s += circ(px, py, 19, PRO, PRO_SIDE, 3)
s += text(1040, 196, "the growing polypeptide", "key", "start", PRO)
s += step(5, 992, 236, GO)

s += legend([
    (1, "RNA polymerase copies one gene.", NUC),
    (2, "The first copy still has introns in it.", INKSOFT),
    (3, "Capped, tailed, spliced, and out it goes.", CARB),
    (4, "A ribosome reads three bases at a time.", PRO),
    (5, "Each tRNA brings one matching amino acid.", NUC),
    (6, "The joined amino acids are the protein.", GO),
], 742, cols=3, colw=499, chars=28)

s += foot(H, "The gene never leaves. A copy of it does, and the copy is what gets read.",
          [
    ('Nirenberg 1961', 'https://doi.org/10.1073/pnas.47.10.1588'),
    ('Crick 1970', 'https://doi.org/10.1038/227561a0'),
    ('Berget & Sharp 1977', 'https://doi.org/10.1073/pnas.74.8.3171'),
])
open("svg/05-central-dogma.svg", "w").write(s)
print("wrote svg/05-central-dogma.svg")
