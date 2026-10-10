#!/usr/bin/env python3
"""Figure 3 - a gated channel and a pump, side by side.

One idea: both move the same ion across the same membrane, but only one of them
costs the cell anything. That is the whole of passive versus active.

GMU survey stuck points: pumps moving ions against the gradient 70%, passive vs
active 58%. DE Bio 101 Unit 5 and SOL Bio Module 2.

Drawn from the mechanism. Nothing traced or copied.
"""
from style import *
import random

H = 1000
s = head(H, "Downhill is free. Uphill is paid for.",
         "DE Bio 101 Unit 5 . SOL Bio Module 2 . transport",
         "Two sodium-moving proteins in one plasma membrane. On the left a ligand-gated channel: a "
         "signal molecule opens the gate and sodium falls inward, down its concentration gradient, "
         "with no ATP spent. On the right the sodium-potassium pump carries three sodium ions out "
         "into the crowd and two potassium ions in, against both gradients, splitting one ATP every "
         "cycle to do it.")
s += ARROWDEFS

MY = 306
bl, blh = bilayer(52, MY, 1496, nheads=46, head_r=11, tail_len=28, gap=32)
MB = MY + blh                                   # 456


def ion(x, y, kind="Na"):
    return circ(x, y, 14, NA if kind == "Na" else K, "#6E6252" if kind == "Na" else "#5E6878", 2)


# ---- the gradient itself: crowded outside, scarce inside -------------------
rnd = random.Random(11)
for x in list(range(96, 790, 56)) + list(range(828, 1548, 56)):
    if 366 < x < 496 or 962 < x < 1290:
        continue
    s += ion(x + rnd.randint(-7, 7), 250 + rnd.randint(-16, 16))
for x in list(range(128, 760, 148)) + list(range(880, 1050, 148)):
    s += ion(x, 572 + rnd.randint(-10, 10))

CH, PXC = 430, 1130
s += bl
s += text(1548, 212, "Outside: sodium is crowded", "min", "end", INKSOFT)
s += text(1548, 640, "Inside: sodium is scarce", "min", "end", INKSOFT)
s += f'<line x1="806" y1="150" x2="806" y2="700" stroke="{RULE}" stroke-width="3"/>\n'

# ================================================================ LEFT: channel
s += step(1, 66, 166, GO, 19)
s += text(96, 176, "A gated channel", "key", "start", PRO)
s += rrect(CH - 56, MY - 16, 46, blh + 32, 10, PRO, PRO_SIDE, 4)
s += rrect(CH + 10, MY - 16, 46, blh + 32, 10, PRO, PRO_SIDE, 4)
s += arrow(CH, MY - 30, CH, MB + 86, NA, 9, "arna")
s += circ(CH, 222, 19, FLAG, HEADEDGE, 3)
s += arrow(CH, 244, CH, MY - 26, FLAG, 5, "arf")
s += text(CH + 48, 228, "a signal opens it", "min", "start", FLAG)
s += ion(CH, MY + 40)
s += ion(CH, MY + 104)
s += ion(CH, MB + 52)
s += text(60, 500, "ligand-gated channel", "min", "start", PRO)
s += text(76, 692, "Down the gradient. No ATP is spent.", "key", "start", GO)

# ================================================================ RIGHT: pump
s += step(2, 822, 166, FLAG, 19)
s += text(852, 176, "A pump", "key", "start", PRO)
s += rrect(PXC - 76, MY - 18, 152, blh + 36, 16, PRO, PRO_SIDE, 4)
# two tunnels through it, so the ion routes can be seen going the wrong way
s += rrect(PXC - 50, MY - 10, 34, blh + 20, 10, PRO_TOP)
s += rrect(PXC + 18, MY - 10, 34, blh + 20, 10, PRO_TOP)
s += arrow(PXC - 33, MB + 84, PXC - 33, 256, NA, 9, "arna")
s += arrow(PXC + 35, 256, PXC + 35, MB + 84, K, 9, "ark")
s += text(1240, 500, "sodium-potassium", "min", "start", PRO)
s += text(1240, 536, "pump", "min", "start", PRO)
for dx in (-122, -78, -34):
    s += ion(PXC + dx, 230)
for dx in (36, 80):
    s += ion(PXC + dx, 230, "K")
for dx in (22, 66):
    s += ion(PXC + dx, MB + 112, "K")
s += chem(PXC - 136, 176, "3 Na^+ out", "lab", "start", "#6E6252")
s += chem(PXC + 30, 176, "2 K^+ in", "lab", "start", "#5E6878")

# the price, paid every cycle
s += pentagon(922, 528, 26, NUC, "#46345E", 3)
s += arrow(952, 522, PXC - 92, 486, NUC, 6, "arn")
s += text(922, 594, "ATP", "key", "middle", NUC)
s += text(922, 632, "split every cycle", "min", "middle", INKSOFT)
s += text(852, 692, "Against the gradient. One ATP per cycle.", "key", "start", FLAG)

s += legend([
    (1, "The gate opens and sodium falls inward, the way it was already leaning. Passive.", GO),
    (2, "The pump pushes sodium out into the crowd and potassium in. Active.", FLAG),
], 742, cols=2, colw=748, chars=44)

s += foot(H, "Both move the same ion through the same membrane. Only the pump pays.",
          [
    ('Skou 1957', 'https://doi.org/10.1016/0006-3002(57)90343-8'),
])
open("svg/03-channel-and-pump.svg", "w").write(s)
print("wrote svg/03-channel-and-pump.svg")
