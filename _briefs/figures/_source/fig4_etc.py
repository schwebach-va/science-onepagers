#!/usr/bin/env python3
"""Figure 4 - the electron transport chain and ATP synthase.

One idea: the electrons never touch the ATP. They pay for a proton gradient, and
the gradient is what pays for the ATP.

GMU survey stuck points: electron carriers 75%, chemiosmosis 30%.
DE Bio 101 Unit 7, Dec 3-4.

Drawn from the mechanism. Nothing traced or copied.
"""
from style import *
import random

H = 1000
s = head(H, "Electrons buy a gradient. The gradient buys the ATP.",
         "DE Bio 101 . Unit 7 . cellular respiration",
         "In the inner mitochondrial membrane, NADH hands electrons to Complex I and FADH2 hands "
         "them to Complex II. The electrons travel through mobile carriers - ubiquinone and "
         "cytochrome c - to Complexes III and IV, dropping in energy at each handoff. Complexes I, "
         "III and IV use that energy to pump protons into the intermembrane space. At Complex IV "
         "the electrons are given to oxygen, which picks up protons and becomes water. The protons "
         "then flow back through ATP synthase, and that flow is what makes the ATP.")
s += ARROWDEFS

MY = 382
bl, blh = bilayer(52, MY, 1496, nheads=46, head_r=10, tail_len=22, gap=32)
MB = MY + blh                                   # 510

ELEC = "#2F6E3F"          # the electrons' own colour, kept out of the class four
PROTON = "#C98A2E"


def proton(x, y):
    return circ(x, y, 12, PROTON, "#8A5E16", 2)


# ---- the proton crowd, which is the whole product of the chain -------------
rnd = random.Random(5)
for x in range(90, 1540, 42):
    if 1252 < x < 1402:
        continue
    s += proton(x + rnd.randint(-6, 6), 250 + rnd.randint(-28, 28))
for x in range(140, 880, 185):
    s += proton(x, 596 + rnd.randint(-8, 8))

s += bl
s += text(1548, 196, "Intermembrane space - protons crowd here", "min", "end", INKSOFT)
s += text(60, 694, "Mitochondrial matrix", "min", "start", INKSOFT)


def complex_box(x, w, label, tall=True, lab_dx=30):
    top = MY - 18 if tall else MY + 10
    hgt = blh + 36 if tall else blh - 20
    return rrect(x, top, w, hgt, 12, PRO, PRO_SIDE, 4), \
        text(x + w/2 + lab_dx, MY + blh/2 + 12, label, "key", "middle", PAPER)


# ---- the four complexes -----------------------------------------------------
boxes, labels = "", ""
for x, w, lab, tall, dx in ((118, 128, "I", True, 34), (372, 110, "II", False, 0),
                            (610, 128, "III", True, 34), (884, 128, "IV", True, 34)):
    b, l = complex_box(x, w, lab, tall, dx)
    boxes += b; labels += l
s += boxes

# ---- the mobile carriers, which is what the survey says they miss ----------
s += circ(316, MY + blh/2, 26, CARB, "#8A5E16", 3)
s += text(316, MY + blh + 56, "Q", "key", "middle", CARB)
s += circ(818, MY - 30, 26, CARB, "#8A5E16", 3)
s += text(818, MY - 56, "cyt c", "lab", "middle", CARB)

# ---- the electrons' downhill run -------------------------------------------
s += curve(f"M 150 {MB+44} C 170 {MB+10}, 182 {MY+86}, 246 {MY+76}", ELEC, 6, None)
s += curve(f"M 246 {MY+76} L 290 {MY+72}", ELEC, 6, "are")
s += curve(f"M 342 {MY+70} L 606 {MY+66}", ELEC, 6, "are")
s += curve(f"M 404 {MB+30} C 420 {MB+6}, 430 {MY+86}, 470 {MY+70}", ELEC, 6, "are")
s += curve(f"M 700 {MY+40} C 740 {MY-26}, 772 {MY-34}, 790 {MY-30}", ELEC, 6, "are")
s += curve(f"M 846 {MY-30} C 880 {MY-28}, 918 {MY-8}, 930 {MY+40}", ELEC, 6, "are")
s += text(530, MY + 36, "electrons", "min", "middle", ELEC)

# ---- the electron sources ---------------------------------------------------
s += rrect(96, MB + 54, 134, 60, 10, NUC_SOFT, NUC, 3)
s += text(163, MB + 94, "NADH", "lab", "middle", NUC)
s += rrect(344, MB + 40, 148, 60, 10, NUC_SOFT, NUC, 3)
s += chem(418, MB + 80, "FADH_2", "lab", "middle", NUC)

# ---- where the electrons end up --------------------------------------------
s += chem(884, MB + 56, "1/2 O_2 + 2 H^+", "lab", "start", INK)
s += arrow(948, MB + 20, 926, MB + 42, ELEC, 6, "are")
s += chem(884, MB + 102, "becomes H_2O", "key", "start", PRO)

# ---- the protons the complexes pump ----------------------------------------
for x in (152, 644, 918):
    s += arrow(x, MB + 10, x, 300, PROTON, 8, "arp")
s += labels
s += text(152, MY - 58, "pumped", "min", "middle", PROTON)
s += text(644, MY - 58, "pumped", "min", "middle", PROTON)
s += text(918, MY - 58, "pumped", "min", "middle", PROTON)
s += text(428, MY - 20, "no pumping here", "min", "middle", INKSOFT)

# ---- ATP synthase, the only place ATP is actually made ---------------------
AX = 1328
s += rrect(AX - 76, MY - 16, 152, blh + 32, 16, PRO, PRO_SIDE, 4)
s += rrect(AX - 14, MY - 10, 28, blh + 20, 10, PRO_TOP)
s += rrect(AX - 13, MB + 14, 26, 56, 8, PRO, PRO_SIDE, 3)
s += f'<ellipse cx="{AX}" cy="{MB+118}" rx="86" ry="52" fill="{PRO}" stroke="{PRO_SIDE}" stroke-width="4"/>\n'
s += arrow(AX, 292, AX, MB + 60, PROTON, 10, "arb")
s += text(1548, 350, "ATP synthase", "key", "end", PRO)
s += text(AX, MB + 128, "turns", "min", "middle", PAPER)
s += chem(AX - 124, MB + 150, "ADP + P", "lab", "end", NUC)
s += arrow(AX - 112, MB + 142, AX - 60, MB + 142, NUC, 6, "arn")
s += text(AX + 102, MB + 150, "ATP", "key", "start", GO)

s += legend([
    (1, "NADH and FADH2 hand the chain electrons.", NUC),
    (2, "Q and cytochrome c carry them on, lower.", CARB),
    (3, "Complexes I, III and IV pump protons out.", PROTON),
    (4, "Oxygen takes them last and becomes water.", PRO),
    (5, "The protons fall back through the synthase.", GO),
    (6, "Its turning builds the ATP. Chemiosmosis.", GO),
], 742, cols=3, colw=499, chars=28)

s += foot(H, "No oxygen at the end, no flow. No flow, no gradient. No gradient, no ATP.",
          [
    ('Mitchell 1961', 'https://doi.org/10.1038/191144a0'),
    ('Jagendorf & Uribe 1966', 'https://doi.org/10.1073/pnas.55.1.170'),
    ('Walker 1994', 'https://doi.org/10.1038/370621a0'),
])
open("svg/04-electron-transport-chain.svg", "w").write(s)
print("wrote svg/04-electron-transport-chain.svg")
