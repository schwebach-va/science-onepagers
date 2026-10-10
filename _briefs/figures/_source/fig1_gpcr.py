#!/usr/bin/env python3
"""Figure 1 - the G-protein-coupled receptor route.

One idea: the signal molecule never gets in, yet the inside of the cell changes,
because the cell rebuilds the message out of its own parts.

GMU survey stuck points served: GPCRs 88%, PIP2 hydrolysis 87%, second
messengers 60%. DE Bio 101 Unit 5, Nov 9-10.

Drawn from the mechanism. Nothing traced or copied.
"""
from style import *

H = 1000
s = head(H, "A receptor that never lets the signal in",
         "DE Bio 101 . Unit 5 . G-protein-coupled receptors",
         "A signal molecule binds a G-protein-coupled receptor on the outside face of the plasma "
         "membrane. The receptor changes shape and switches on a G protein, whose alpha subunit "
         "trades GDP for GTP and travels to phospholipase C. That enzyme cuts the membrane lipid "
         "PIP2 into DAG, which stays in the membrane, and IP3, which crosses the cytosol and opens "
         "a calcium channel in the endoplasmic reticulum. Stored calcium floods the cytosol and "
         "switches on the cell's enzymes.")
s += ARROWDEFS

MY = 232
bl, blh = bilayer(52, MY, 1496, nheads=46, head_r=11, tail_len=28, gap=32)
MB = MY + blh                                   # 382

s += water(60, 152, 1480, 68, n=26)
s += bl
s += text(1548, 196, "Outside the cell", "min", "end", INKSOFT)
s += text(60, 430, "Cytosol", "min", "start", INKSOFT)

# --- labelled above the membrane, where there is clear air ------------------
s += text(300, 196, "Signal molecule", "lab", fill=FLAG)
s += chem(686, 196, "PIP_2", "key", fill=CARB)
s += text(916, 196, "DAG", "key", fill=LIP)

# 1. the ligand, which is as far as the signal itself ever gets
s += circ(267, 170, 20, FLAG, HEADEDGE, 3)
s += arrow(267, 192, 267, MY - 8, FLAG, 6, "arf")
s += step(1, 196, 170, FLAG)

# the receptor: seven passes through the membrane
s += rrect(200, MY - 14, 134, blh + 28, 14, PRO, PRO_SIDE, 4)
for i in range(7):
    s += rrect(212 + i*16, MY - 2, 9, blh + 4, 4.5, PRO_TOP)
s += text(60, 536, "Receptor (GPCR)", "key", fill=PRO)

# PIP2: one lipid, three phosphates on its head
PX = 740
s += rrect(PX - 44, MY - 12, 88, blh - 44, 10, PAPER)
for off in (-11, 11):
    s += rrect(PX + off - 5.5, MY + 30, 11, 48, 5.5, TAIL)
s += circ(PX, MY + 18, 15, HEAD, HEADEDGE, 3)
for dx, dy in ((-27, -15), (0, -32), (27, -15)):
    s += circ(PX + dx, MY + dy, 12, CARB, "#8A5E16", 3)
s += arrow(712, 208, PX - 24, MY - 32, CARB, 4, "arb")

# DAG: the lipid half, left behind
DX = 900
s += rrect(DX - 32, MY - 12, 64, blh - 44, 10, PAPER)
for off in (-11, 11):
    s += rrect(DX + off - 5.5, MY + 34, 11, 48, 5.5, TAIL)
s += circ(DX, MY + 22, 15, HEAD, HEADEDGE, 3)
s += arrow(930, 208, DX + 14, MY + 2, LIP, 4, "arl")

# --- 2. the G protein --------------------------------------------------------
s += circ(400, 432, 32, PRO, PRO_SIDE, 3)
s += text(400, 445, "α", "key", "middle", PAPER)
s += circ(458, 442, 25, PRO_TOP, PRO_SIDE, 3)
s += text(458, 454, "β", "key", "middle", PRO_SIDE)
s += circ(494, 412, 21, PRO_TOP, PRO_SIDE, 3)
s += text(494, 423, "γ", "lab", "middle", PRO_SIDE)
s += pentagon(366, 388, 15, NUC, "#46345E", 2)
s += arrow(267, MB + 4, 370, 414, PRO, 5, "art")
s += step(2, 330, 466, PRO)
s += text(372, 536, "G protein", "key", fill=PRO)

# --- 3. the enzyme it switches on -------------------------------------------
s += rrect(610, 408, 252, 86, 12, PRO, PRO_SIDE, 4)
s += text(736, 460, "Phospholipase C", "min", "middle", PAPER)
s += curve("M 436 468 C 510 522, 566 516, 606 484", PRO, 6, "art")
s += step(3, 592, 402, PRO)

# --- 4. the cut --------------------------------------------------------------
s += arrow(740, 404, 740, MY + blh - 46, GO, 7, "arg")
s += step(4, 886, 408, GO)

# --- 5. IP3 crosses the cytosol ---------------------------------------------
IX, IY = 900, 596
s += hexagon(IX, IY, 25, CARB, "#8A5E16", 3)
for dx, dy in ((-31, -18), (0, -35), (31, -18)):
    s += circ(IX + dx, IY + dy, 12, CARB, "#8A5E16", 3)
s += chem(IX - 76, IY + 12, "IP_3", "key", "end", CARB)
s += curve(f"M 862 456 C 898 506, 908 532, {IX-18} {IY-34}", CARB, 6, "arb", "14 10")
s += step(5, 992, 650, CARB)

# --- the ER, holding the calcium --------------------------------------------
EY = 566
ebl, eblh = bilayer(1150, EY, 398, nheads=12, head_r=9, tail_len=20, gap=33)
s += ebl                                        # 566 -> 684
s += text(1262, 540, "Endoplasmic reticulum - the calcium store", "min", "end", INKSOFT)
CXX = 1320
s += rrect(CXX - 50, EY - 12, 44, eblh + 24, 10, PRO, PRO_SIDE, 4)
s += rrect(CXX + 14, EY - 12, 44, eblh + 24, 10, PRO, PRO_SIDE, 4)
s += curve(f"M {IX+38} {IY-10} C 1090 {IY-24}, 1210 {EY+120}, {CXX-58} {EY+74}", CARB, 6, "arb", "14 10")
for dx, dy in ((-116, 26), (-58, 38), (10, 32), (72, 24), (124, 38)):
    s += circ(CXX + dx, EY + eblh + dy, 13, CA, "#4C4170", 2)
s += arrow(CXX - 18, EY + eblh - 4, CXX - 18, 470, CA, 8, "arc")
for dx, dy in ((-44, -46), (24, -62), (86, -44), (150, -58)):
    s += circ(CXX + dx, EY - 34 + dy, 13, CA, "#4C4170", 2)
s += chem(1120, 500, "Ca^2+", "key", "start", CA)

# --- 6. the response ---------------------------------------------------------
s += rrect(1120, 368, 428, 84, 10, GO_SOFT, GO, 4)
s += text(1152, 420, "The cell does the job", "key", fill=GO)
s += step(6, 1120, 368, GO)

# --- one line, because there is more than one second messenger --------------
s += text(60, 664, "A different enzyme inside makes cAMP instead.", "min", fill=INKSOFT)

# --- the sentences, in reading order ----------------------------------------
s += legend([
    (1, "The signal binds outside. It never enters.", FLAG),
    (2, "The receptor twists. A G protein turns on.", PRO),
    (3, "Its alpha part reaches phospholipase C.", PRO),
    (4, "PIP₂ is cut: DAG stays, IP₃ leaves.", GO),
    (5, "IP₃ opens a calcium channel in the ER.", CARB),
    (6, "Calcium switches the working enzymes on.", CA),
], 742, colw=499)

s += foot(H, "The message stops at the membrane. The cell rebuilds it inside, out of its own parts.",
          [
    ('Streb 1983', 'https://doi.org/10.1038/306067a0'),
    ('Berridge & Irvine 1984', 'https://doi.org/10.1038/312315a0'),
    ('Rasmussen 2011', 'https://doi.org/10.1038/nature10361'),
])
open("svg/01-gpcr-pathway.svg", "w").write(s)
print("wrote svg/01-gpcr-pathway.svg")
