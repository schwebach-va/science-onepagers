#!/usr/bin/env python3
"""Figure 6 - cloning a gene into a plasmid.

One idea: cut both pieces with the same enzyme and the ends are made to fit.
Everything after that is sealing, delivering and sorting.

GMU survey stuck point: cloning 60%. DE Bio 101, biotechnology.

Drawn from the mechanism. Nothing traced or copied.
"""
from style import *
import math

H = 1000
s = head(H, "Cut both with one enzyme and the ends fit",
         "DE Bio 101 . biotechnology . gene cloning",
         "A plasmid carrying an antibiotic-resistance gene and a piece of donor DNA carrying the "
         "gene of interest are cut with the same restriction enzyme, so both end in the same "
         "single-stranded overhang. The overhangs pair, DNA ligase seals the backbone, and the "
         "recombinant plasmid is taken up by bacteria. Grown on an ampicillin plate, only the cells "
         "that took a plasmid survive, and every colony is a clone carrying the same gene.")
s += ARROWDEFS

CUT = "#B23A2B"
DEEP = "#46345E"


def arc(cx, cy, r, a0, a1, color, sw):
    x0, y0 = cx + r*math.cos(math.radians(a0)), cy + r*math.sin(math.radians(a0))
    x1, y1 = cx + r*math.cos(math.radians(a1)), cy + r*math.sin(math.radians(a1))
    large = 1 if (a1 - a0) % 360 > 180 else 0
    return (f'<path d="M {x0:.1f} {y0:.1f} A {r} {r} 0 {large} 1 {x1:.1f} {y1:.1f}" fill="none" '
            f'stroke="{color}" stroke-width="{sw}"/>\n')


def site_tick(x, y):
    return rrect(x - 4, y - 26, 8, 52, 4, CUT)


# ============================================================ 1. the two pieces
s += step(1, 76, 176, NUC)
s += text(106, 186, "Two pieces, one site", "key", "start", NUC)
s += f'<circle cx="188" cy="298" r="74" fill="none" stroke="{NUC}" stroke-width="16"/>\n'
s += arc(188, 298, 74, 120, 196, PRO, 16)
s += site_tick(188, 224)
s += text(188, 420, "plasmid", "lab", "middle", NUC)
s += text(60, 462, "its resistance gene", "min", "start", PRO)
s += arrow(128, 436, 158, 376, PRO, 4, "art")

s += rrect(316, 288, 196, 20, 6, NUC)
s += rrect(372, 284, 84, 28, 7, PRO, PRO_SIDE, 3)
s += site_tick(352, 298)
s += site_tick(476, 298)
s += text(414, 420, "donor DNA", "lab", "middle", NUC)
s += text(414, 250, "the gene you want", "min", "middle", PRO)

# ============================================================ 2. the same cut
s += step(2, 576, 176, CUT)
s += text(606, 186, "One enzyme cuts both", "key", "start", CUT)
s += rrect(600, 240, 150, 74, 14, PRO, PRO_SIDE, 4)
s += text(675, 286, "enzyme", "min", "middle", PAPER)
s += arrow(675, 320, 675, 364, CUT, 6, "arf")

# the two cut ends, with the overhangs the enzyme leaves
s += rrect(592, 384, 190, 18, 5, NUC)          # left piece, top strand, overhanging
s += rrect(592, 408, 108, 18, 5, NUC)          # left piece, bottom strand
s += rrect(866, 384, 134, 18, 5, NUC)          # right piece, top strand
s += rrect(784, 408, 216, 18, 5, NUC)          # right piece, bottom strand, overhanging
for bx in (720, 740, 760):
    s += rrect(bx, 384, 3, 18, 1.5, PAPER)
for bx in (804, 824, 844):
    s += rrect(bx, 408, 3, 18, 1.5, PAPER)
s += f'<path d="M 700 440 L 700 452 L 782 452 L 782 440" fill="none" stroke="{CUT}" stroke-width="4"/>\n'
s += f'<path d="M 784 370 L 784 358 L 866 358 L 866 370" fill="none" stroke="{CUT}" stroke-width="4"/>\n'
s += text(796, 474, "four unpaired bases on each end, and they pair", "min", "middle", INKSOFT)

# ============================================================ 3. ligase seals
s += step(3, 1086, 176, GO)
s += text(1116, 186, "Ligase seals the joins", "key", "start", GO)
s += f'<circle cx="1300" cy="298" r="74" fill="none" stroke="{NUC}" stroke-width="16"/>\n'
s += arc(1300, 298, 74, 120, 196, PRO, 16)
s += arc(1300, 298, 74, 318, 42, PRO, 16)
for a in (318, 42):
    s += circ(1300 + 74*math.cos(math.radians(a)), 298 + 74*math.sin(math.radians(a)), 11, GO, "#2A5438", 3)
s += text(1300, 420, "recombinant plasmid", "lab", "middle", NUC)
s += text(1548, 462, "green dots: the two seals", "min", "end", GO)
s += arrow(1030, 298, 1110, 298, INK, 6, "ar")

# ============================================================ 4. into a cell
s += curve("M 1292 400 C 1250 500, 940 536, 486 528", NUC, 6, "arn", "16 12")
s += step(4, 76, 534, PRO)
s += text(106, 544, "Bacteria take it up", "key", "start", PRO)
s += rrect(110, 580, 326, 118, 59, PRO_SOFT, PRO, 4)
s += curve("M 160 660 C 196 620, 240 684, 282 638", DEEP, 7, None)
s += f'<circle cx="372" cy="638" r="30" fill="none" stroke="{NUC}" stroke-width="9"/>\n'
s += arc(372, 638, 30, 318, 42, PRO, 9)
s += text(452, 604, "chromosome, and the", "min", "start", INKSOFT)
s += text(452, 640, "plasmid beside it", "min", "start", INKSOFT)

# ============================================================ 5. the plate
s += step(5, 806, 534, GO)
s += text(836, 544, "Only cells that took one grow", "key", "start", GO)
s += circ(944, 636, 86, CARB_SOFT, SHELL, 5)
for dx, dy in ((-42, -26), (6, -44), (46, -12), (-18, 22), (32, 34), (-52, 16), (12, 0)):
    s += circ(944 + dx, 636 + dy, 13, GO, "#2A5438", 2)
s += text(944, 750, "ampicillin plate", "min", "middle", INKSOFT)
s += rrect(1060, 572, 488, 132, 10, GO_SOFT, GO, 4)
s += wrap(1084, 614, "Each colony grew from one cell, so all of them carry the same gene.",
          28, "min", 34)

s += legend([
    (1, "A plasmid and donor DNA, same site in both.", NUC),
    (2, "One enzyme cuts both, leaving matching ends.", CUT),
    (3, "The ends pair and ligase seals the backbone.", GO),
], 798, cols=3, colw=499, chars=28)

s += foot(H, "The enzyme makes the ends fit before anything is joined.",
          [
    ('Mertz & Davis 1972', 'https://doi.org/10.1073/pnas.69.11.3370'),
    ('Cohen & Boyer 1973', 'https://doi.org/10.1073/pnas.70.11.3240'),
])
open("svg/06-cloning-a-gene.svg", "w").write(s)
print("wrote svg/06-cloning-a-gene.svg")
