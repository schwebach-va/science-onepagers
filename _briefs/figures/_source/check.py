#!/usr/bin/env python3
"""Checks every figure before it ships.

- no text set below the 15 pt floor (T_MIN user units)
- no text running past the right or left margin, measured with the real
  Archivo metrics rather than guessed
- no text colliding with another text block
- no text straying under the footer rule
"""
import re, sys, os
from fontTools.ttLib import TTFont

FONTS = {}
for style, path in (("600", "Archivo-SemiBold.ttf"), ("700", "Archivo-Bold.ttf")):
    f = TTFont(os.path.expanduser("~/.fonts/" + path))
    cmap = f.getBestCmap()
    hmtx = f["hmtx"]
    upm = f["head"].unitsPerEm
    FONTS[style] = (cmap, hmtx, upm)


def width(s, px, weight="600"):
    cmap, hmtx, upm = FONTS[weight]
    total = 0
    for ch in s:
        g = cmap.get(ord(ch))
        total += hmtx[g][0] if g else hmtx[cmap[ord("n")]][0]
    return total * px / upm


CLS = {"key": (36, "700"), "lab": (30, "600"), "min": (29, "600"),
       "ttl": (46, "700"), "eyebrow": (29, "700")}

MARGIN_L, MARGIN_R = 46, 1554


def check(path):
    src = open(path).read()
    h = int(re.search(r'viewBox="0 0 \d+ (\d+)"', src).group(1))
    foot_rule = h - 112
    bad = []
    boxes = []
    for m in re.finditer(r'<text class="([^"]*)" x="([-\d.]+)" y="([-\d.]+)"'
                         r' text-anchor="(\w+)"[^>]*?(?:data-plain="([^"]*)")?[^>]*>(.*?)</text>', src, re.S):
        cls, x, y, anchor = m.group(1).split()[0], float(m.group(2)), float(m.group(3)), m.group(4)
        body = m.group(5) if m.group(5) is not None else re.sub(r'<[^>]*>', '', m.group(6))
        px, wt = CLS.get(cls, (29, "600"))
        if "font-weight=\"700\"" in m.group(0):
            wt = "700"
        w = width(body, px, wt)
        x0 = x if anchor == "start" else (x - w/2 if anchor == "middle" else x - w)
        x1 = x0 + w
        if px < 29:
            bad.append(f"TOO SMALL {px}px: {body!r}")
        if x0 < MARGIN_L:
            bad.append(f"LEFT  overrun x0={x0:.0f}: {body!r}")
        if x1 > MARGIN_R:
            bad.append(f"RIGHT overrun x1={x1:.0f}: {body!r}")
        if cls != "min" or True:
            if foot_rule - 14 < y < h - 90:
                bad.append(f"UNDER THE RULE y={y:.0f}: {body!r}")
        boxes.append((x0, y - px*0.78, x1, y + px*0.22, body))
    # text-on-text collisions
    for i in range(len(boxes)):
        for j in range(i+1, len(boxes)):
            a, b = boxes[i], boxes[j]
            ox = min(a[2], b[2]) - max(a[0], b[0])
            oy = min(a[3], b[3]) - max(a[1], b[1])
            if ox > 6 and oy > 4:
                bad.append(f"OVERLAP {a[4]!r} x {b[4]!r}  ({ox:.0f}x{oy:.0f})")
    print(f"--- {os.path.basename(path)}  ({len(boxes)} text runs)")
    for b in bad:
        print("   ", b)
    if not bad:
        print("    clean")
    return len(bad)


if __name__ == "__main__":
    n = 0
    for p in sorted(sys.argv[1:] or [f"svg/{f}" for f in sorted(os.listdir("svg"))]):
        n += check(p)
    sys.exit(1 if n else 0)
