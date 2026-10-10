#!/usr/bin/env python3
"""Figure 2 - the receptor tyrosine kinase.

One idea: two halves have to find each other before anything happens, and once
they do, one signal is answered in several ways at once.

GMU survey stuck point: kinase receptors 65%. DE Bio 101 Unit 5.

Drawn from the mechanism. Nothing traced or copied.
"""
from style import *

H = 1000
s = head(H, "Two halves, then several answers at once",
         "DE Bio 101 . Unit 5 . receptor tyrosine kinases",
         "Two separate receptor tyrosine kinase polypeptides each bind a signal molecule and then "
         "join into a dimer. Each half adds phosphates from ATP to the tyrosines on the other half's "
         "tail. The row of phosphorylated tyrosines is a docking surface: different relay proteins "
         "bind different sites, so one signal starts several responses at the same time.")
s += ARROWDEFS

MY = 250
bl, blh = bilayer(52, MY, 1496, nheads=46, head_r=11, tail_len=28, gap=32)
MB = MY + blh                                   # 400

s += water(60, 166, 1480, 66, n=22)
s += bl
s += text(1548, 212, "Outside the cell", "min", "end", INKSOFT)
s += text(60, 448, "Cytosol", "min", "start", INKSOFT)


def monomer(x):
    """One receptor polypeptide: a binding part outside, one pass through the
    membrane, a tail inside."""
    g = rrect(x - 26, MY - 36, 52, 62, 12, PRO, PRO_SIDE, 4)
    g += rrect(x - 17, MY - 2, 34, blh + 4, 8, PRO_TOP)
    g += rrect(x - 26, MB - 6, 52, 104, 12, PRO, PRO_SIDE, 4)
    return g


def tyr(x, y, side=1, on=False):
    """A tyrosine on the tail, and the phosphate parked on it."""
    g = rrect(x - 11, y - 9, 22, 18, 6, PRO if on else PRO_TOP, PRO_SIDE, 2)
    if on:
        g += circ(x + 23*side, y, 11, CARB, "#8A5E16", 2)
    return g


def ligand(x):
    return circ(x, 182, 19, FLAG, HEADEDGE, 3) + arrow(x, 204, x, MY - 42, FLAG, 5, "arf")


# ---- 1. apart ---------------------------------------------------------------
s += monomer(196) + monomer(300) + ligand(196) + ligand(300)
s += text(60, 182, "Signal", "lab", "start", FLAG)
s += step(1, 128, 304, FLAG)
s += text(248, 560, "Two separate halves", "min", "middle", INKSOFT)
# what current structures show, in one quiet note (Zuo 2026; see figure-sources)
s += text(52, 620, "Some of these receptors are already paired", "min", "start", INKSOFT)
s += text(52, 654, "before the signal arrives; it reshapes it.", "min", "start", INKSOFT)

# ---- 2. joined --------------------------------------------------------------
s += arrow(392, 466, 468, 466, INK, 6, "ar")
s += monomer(556) + monomer(604) + ligand(556) + ligand(604)
s += rrect(530, MY - 42, 100, 10, 5, PRO_SIDE)
s += step(2, 486, 304, PRO)
s += text(580, 560, "One dimer", "min", "middle", INKSOFT)

# ---- 3. each half phosphorylates the other ---------------------------------
s += arrow(660, 466, 726, 466, INK, 6, "ar")
LX, RX = 824, 872
s += monomer(LX) + monomer(RX) + ligand(LX) + ligand(RX)
s += rrect(LX - 26, MY - 42, 100, 10, 5, PRO_SIDE)
for i in range(3):
    s += tyr(LX - 2, MB + 22 + i*28, -1, True)
    s += tyr(RX + 2, MB + 22 + i*28, 1, True)
s += step(3, 756, 304, CARB)
s += pentagon(762, 600, 23, NUC, "#46345E", 3)
s += arrow(782, 586, 826, 522, NUC, 5, "arn")
s += text(762, 652, "ATP > ADP", "min", "middle", NUC)

# ---- 4. relay proteins dock, and the answers branch ------------------------
s += arrow(946, 466, 1004, 466, INK, 6, "ar")
AX, BX = 1032, 1080
s += monomer(AX) + monomer(BX) + ligand(AX) + ligand(BX)
s += rrect(AX - 26, MY - 42, 100, 10, 5, PRO_SIDE)
s += step(4, 1138, 304, GO)
for i, (name, resp) in enumerate((("Relay A", "cell grows"),
                                  ("Relay B", "cell divides"),
                                  ("Relay C", "cell survives"))):
    y = MB + 14 + i*62
    s += tyr(BX + 2, y, 1, True)
    s += circ(BX + 56, y, 22, PRO_TOP, PRO_SIDE, 3)
    s += text(BX + 86, y + 10, name, "min", "start", PRO)
    s += arrow(BX + 212, y, BX + 254, y, GO, 5, "arg")
    s += text(BX + 268, y + 10, resp, "lab", "start", GO)

s += rrect(1026, 646, 522, 56, 8, GO_SOFT, GO, 3)
s += text(1052, 684, "One signal, several answers", "key", "start", GO)

s += legend([
    (1, "Two halves sit apart. One signal each.", FLAG),
    (2, "Bound, they join up. Neither works alone.", PRO),
    (3, "Each half phosphorylates the other, paying with ATP.", CARB),
    (4, "Relay proteins dock on those phosphates.", GO),
], 742, cols=2, colw=748, chars=44)

s += foot(H, "No dimer, no phosphates, no answer. Joining up is the switch.",
          [
    ('Lemmon & Schlessinger 2010', 'https://doi.org/10.1016/j.cell.2010.06.011'),
    ('Zuo 2026', 'https://doi.org/10.1073/pnas.2602436123'),
])
open("svg/02-receptor-tyrosine-kinase.svg", "w").write(s)
print("wrote svg/02-receptor-tyrosine-kinase.svg")
