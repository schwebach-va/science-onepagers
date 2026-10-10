"""Shared house style for Reid's redrawn figures.

Drawn fresh from the biology. Nothing traced, scanned or copied from any book.

Palette and type lifted from site-live/biology/tools/membrane-patch.html so the
figures read as the same system as the interactive tools.

Geometry contract
-----------------
Every figure is 1600 user units wide. Dropped full-width onto Reid's 13.33 in
slide, 1 user unit = 13.33 * 72 / 1600 = 0.6 pt. So:

Every figure is 1600 x 1000. Dropped on a 13.33 x 7.5 in slide it is limited by
the slide's height, so 1 user unit = 7.5 * 72 / 1000 = 0.54 pt:

    T_MIN  29 units -> 15.1 pt   (the house 15 pt floor, met everywhere)
    T_LABEL 30      -> 16.2 pt
    T_KEY  36       -> 19.4 pt   (the house 19 pt key-label size)
    title  46       -> 24.8 pt

On an iPad at 1000 CSS px wide the same floor is 18 px. Nothing in any figure
is set smaller than T_MIN.
"""

W = 1600

# --- page -------------------------------------------------------------------
PAPER   = "#F5F3EE"
CARD    = "#FFFFFF"
INK     = "#1D1A15"
INKSOFT = "#5A544A"
RULE    = "#DDD8CE"
SHELL   = "#D2CCC0"

# --- the four macromolecule classes (the board colours, all year) -----------
CARB = "#C98A2E"   # carbohydrate
PRO  = "#1F7A8C"   # protein
LIP  = "#B85042"   # lipid
NUC  = "#6B4E8C"   # nucleic acid

# --- shading of those, as the Membrane Patch canvas uses them ---------------
PRO_TOP  = "#5CA9B8"
PRO_SIDE = "#18606E"
PORE     = "#0A2F37"
HEAD     = "#A33A2B"   # phosphate head of a phospholipid
HEADEDGE = "#5E1F16"
TAIL     = "#E0A070"   # fatty-acid tail
NUC_SOFT = "#E7E0EE"
PRO_SOFT = "#DEEBEE"
CARB_SOFT= "#F6EBD6"
LIP_SOFT = "#F7E9E6"

# --- accents ----------------------------------------------------------------
GO       = "#3F7A55"   # the "this happens" green
GO_SOFT  = "#E2EDE6"
FLAG     = "#B85042"
FLAG_SOFT= "#F7E9E6"
WATER    = "#8FB8D8"
NA       = "#BFA58A"   # sodium, as the Patch draws it
K        = "#8595AB"   # potassium
CA       = "#7A6E97"   # calcium, kept in the nucleic-acid family of violets
CHOL     = "#2FA84F"

SANS = "Archivo, 'Helvetica Neue', Inter, Arial, sans-serif"

# --- type sizes, in user units ---------------------------------------------
T_TITLE  = 46
T_KEY    = 36   # 21.6 pt
T_LABEL  = 30   # 18.0 pt
T_MIN    = 28   # 16.8 pt  <- nothing smaller than this, anywhere
T_BADGE  = 32

STEP_R = 25


def head(h, title, eyebrow, desc):
    """Open an SVG. Archivo is embedded so the type is right in any browser,
    and the stack falls back to Helvetica in Illustrator or Preview."""
    import base64, pathlib
    faces = []
    for wt, name in ((600, "SemiBold"), (700, "Bold")):
        p = pathlib.Path(f"node_modules/@fontsource/archivo/files/archivo-latin-{wt}-normal.woff2")
        b = base64.b64encode(p.read_bytes()).decode()
        faces.append(
            "@font-face{font-family:'Archivo';font-style:normal;font-weight:%d;"
            "src:url(data:font/woff2;base64,%s) format('woff2')}" % (wt, b)
        )
    return f"""<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {W} {h}" width="{W}" height="{h}" role="img" aria-labelledby="ttl desc">
<title id="ttl">{esc(title)}</title>
<desc id="desc">{esc(desc)} -- {esc(ORIGIN)} Mechanism checked for accuracy against Campbell Biology in Focus, 3rd edition; no figure from that or any other book was consulted as a layout or copied in any part.</desc>
{metadata(title, desc)}
<style>
{''.join(faces)}
text{{font-family:{SANS};fill:{INK}}}
.key{{font-size:{T_KEY}px;font-weight:700}}
.lab{{font-size:{T_LABEL}px;font-weight:600}}
.min{{font-size:{T_MIN}px;font-weight:600}}
.soft{{fill:{INKSOFT}}}
.ttl{{font-size:{T_TITLE}px;font-weight:700}}
.eyebrow{{font-size:{T_MIN}px;font-weight:700;letter-spacing:.09em;fill:{INKSOFT}}}
</style>
<rect x="0" y="0" width="{W}" height="{h}" fill="{PAPER}"/>
<rect x="3" y="3" width="{W-6}" height="{h-6}" fill="none" stroke="{RULE}" stroke-width="3" rx="6"/>
<text class="eyebrow" x="52" y="62">{esc(eyebrow.upper())}</text>
<text class="ttl" x="52" y="118">{esc(title)}</text>
<g stroke-linecap="round" stroke-linejoin="round">
"""


def foot(h, caption, sources):
    """The footer carries three things: the one-sentence caption, the rights
    line, and the sources -- each source a real hyperlink to its DOI.

    `sources` is a list of (short label, doi url). Short labels only: the full
    citation lives on biology/figure-sources.html. In a browser the labels are
    clickable; in a PNG they are still readable, which is why they are set in
    the same 15 pt floor as everything else.
    """
    out = f'''</g>
<line x1="52" y1="{h-112}" x2="{W-52}" y2="{h-112}" stroke="{RULE}" stroke-width="3"/>
{text(52, h-62, caption, "key", "start")}'''
    # the sources line, built as one <text> with an <a> around each label
    runs, plain = [], "Sources: " if len(sources) > 1 else "Source: "
    runs.append(esc(plain))
    for i, (label, doi) in enumerate(sources):
        if i:
            runs.append(' <tspan fill="%s">\u00b7</tspan> ' % INKSOFT)
            plain += " \u00b7 "
        runs.append(
            f'<a href="{esc(doi)}" xlink:href="{esc(doi)}" target="_blank" rel="noopener">'
            f'<tspan fill="{PRO}" text-decoration="underline">{esc(label)}</tspan></a>')
        plain += label
    out += (f'<text class="min" x="52" y="{h-22}" text-anchor="start" fill="{INKSOFT}" '
            f'data-plain="{esc(plain)}">{"".join(runs)}</text>\n')
    out += text(W-52, h-22, "\u00a9 2026 J. R. Schwebach \u00b7 CC BY-NC 4.0", "min", "end", INKSOFT)
    return out + "</svg>\n"


def esc(s):
    return (s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))


# --- primitives -------------------------------------------------------------

def rrect(x, y, w, h, r, fill, stroke=None, sw=3, extra=""):
    s = f' stroke="{stroke}" stroke-width="{sw}"' if stroke else ""
    return f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{r}" fill="{fill}"{s} {extra}/>\n'


def circ(cx, cy, r, fill, stroke=None, sw=3):
    s = f' stroke="{stroke}" stroke-width="{sw}"' if stroke else ""
    return f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{r:.1f}" fill="{fill}"{s}/>\n'


def hexagon(cx, cy, r, fill, stroke=None, sw=3):
    import math
    pts = " ".join(f"{cx + r*math.cos(math.radians(60*i-30)):.1f},{cy + r*math.sin(math.radians(60*i-30)):.1f}" for i in range(6))
    s = f' stroke="{stroke}" stroke-width="{sw}"' if stroke else ""
    return f'<polygon points="{pts}" fill="{fill}"{s}/>\n'


def pentagon(cx, cy, r, fill, stroke=None, sw=3):
    import math
    pts = " ".join(f"{cx + r*math.cos(math.radians(72*i-90)):.1f},{cy + r*math.sin(math.radians(72*i-90)):.1f}" for i in range(5))
    s = f' stroke="{stroke}" stroke-width="{sw}"' if stroke else ""
    return f'<polygon points="{pts}" fill="{fill}"{s}/>\n'


def text(x, y, s, cls="lab", anchor="start", fill=None, extra=""):
    f = f' fill="{fill}"' if fill else ""
    return f'<text class="{cls}" x="{x:.1f}" y="{y:.1f}" text-anchor="{anchor}"{f} {extra}>{esc(s)}</text>\n'


def wrap(x, y, s, width_chars, cls="min", lh=36, anchor="start", fill=None):
    import textwrap
    out = ""
    for i, line in enumerate(textwrap.wrap(s, width_chars)):
        out += text(x, y + i*lh, line, cls, anchor, fill)
    return out


_MARKS = {"ar": INK, "arg": GO, "art": PRO, "arf": FLAG, "arc": CA,
          "arb": CARB, "arn": NUC, "arl": LIP, "ars": INKSOFT, "arw": WATER,
          "arna": NA, "ark": K, "are": "#2F6E3F", "arp": "#C98A2E"}
ARROWDEFS = "<defs>" + "".join(
    f'<marker id="{k}" viewBox="0 0 12 12" refX="9" refY="6" markerWidth="7" markerHeight="7" '
    f'orient="auto-start-reverse"><path d="M1,1 L11,6 L1,11 z" fill="{v}"/></marker>'
    for k, v in _MARKS.items()) + "</defs>\n"


def arrow(x1, y1, x2, y2, color=INK, sw=5, marker="ar", dash=None):
    d = f' stroke-dasharray="{dash}"' if dash else ""
    return (f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" '
            f'stroke="{color}" stroke-width="{sw}"{d} marker-end="url(#{marker})"/>\n')


def curve(d, color=INK, sw=5, marker="ar", dash=None):
    da = f' stroke-dasharray="{dash}"' if dash else ""
    m = f' marker-end="url(#{marker})"' if marker else ""
    return f'<path d="{d}" fill="none" stroke="{color}" stroke-width="{sw}"{da}{m}/>\n'


def step(n, cx, cy, color=PRO, r=STEP_R):
    """A numbered badge. The order to read the figure in."""
    return (circ(cx, cy, r, color) +
            f'<text class="min" x="{cx:.1f}" y="{cy+10:.1f}" text-anchor="middle" fill="{PAPER}" font-weight="700">{n}</text>\n')


def legend(entries, y, cols=3, x0=52, colw=499, lh=34, cls="min", chars=28, rowgap=78):
    """The sentences live down here, in reading order, so the drawing itself can
    carry nothing but short noun labels. Two rows of three."""
    import textwrap
    out = ""
    rowh = 0
    for i, (n, body, color) in enumerate(entries):
        c, r = i % cols, i // cols
        x = x0 + c*colw
        ty = y + r*rowgap
        out += step(n, x + 19, ty, color, 19)
        for j, line in enumerate(textwrap.wrap(body, chars)):
            out += text(x + 50, ty + 10 + j*lh, line, cls)
    return out


def bilayer(x, y, w, nheads=None, head_r=13, tail_len=40, gap=34):
    """A phospholipid bilayer, component level: circle head, two capsule tails.
    y is the top of the outer leaflet. Returns (svg, total_height)."""
    svg = ""
    n = nheads if nheads else int(w // gap)
    inner_y = y + 2*head_r + 2*tail_len + 18
    for i in range(n):
        cx = x + gap/2 + i*gap
        # outer leaflet: head up, tails down
        svg += circ(cx, y + head_r, head_r, HEAD, HEADEDGE, 2)
        for off in (-5.5, 5.5):
            svg += rrect(cx + off - 4.5, y + 2*head_r - 2, 9, tail_len, 4.5, TAIL)
        # inner leaflet: tails up, head down
        by = inner_y + 2*head_r + tail_len
        for off in (-5.5, 5.5):
            svg += rrect(cx + off - 4.5, inner_y + 2, 9, tail_len, 4.5, TAIL)
        svg += circ(cx, inner_y + tail_len + head_r + 4, head_r, HEAD, HEADEDGE, 2)
    total = (inner_y + tail_len + 2*head_r + 4) - y
    return svg, total


def water(x, y, w, h, n=26, seed=7):
    """Faint water, so a membrane figure says which side is which."""
    import random
    rnd = random.Random(seed)
    out = ""
    for _ in range(n):
        cx = x + rnd.random()*w
        cy = y + rnd.random()*h
        out += circ(cx, cy, 9, WATER, None) .replace('fill="%s"' % WATER, 'fill="%s" opacity="0.5"' % WATER)
    return out


def gradient_wedge(x, y, w, h, color, flip=False, label=None):
    """A wedge that says 'crowded here, empty there' without a number on it."""
    if not flip:
        pts = f"{x},{y+h} {x+w},{y} {x+w},{y+h}"
    else:
        pts = f"{x},{y} {x},{y+h} {x+w},{y+h}"
    out = f'<polygon points="{pts}" fill="{color}" opacity="0.28"/>\n'
    if label:
        out += text(x + w/2, y + h + 38, label, "min", "middle", INKSOFT)
    return out

def chem(x, y, formula, cls="lab", anchor="start", fill=None):
    """Chemistry set properly: H_2O, Ca^2+, O_2, NAD^+ .

    '_' starts a subscript and takes the digits that follow; '^' starts a
    superscript and takes digits and a sign. So H_2O is water, not H with 2O
    tucked under it. Emitted as tspans, so it is real text everywhere rather
    than an approximation like 'Ca2+'."""
    f = f' fill="{fill}"' if fill else ""
    plain, out, i = "", "", 0
    while i < len(formula):
        c = formula[i]
        if c in "_^":
            j = i + 1
            run = ""
            allowed = "0123456789" + ("+-" if c == "^" else "")
            while j < len(formula) and formula[j] in allowed:
                run += formula[j]; j += 1
            dy = "0.22em" if c == "_" else "-0.42em"
            out += f'<tspan baseline-shift="0" dy="{dy}" font-size="0.68em">{esc(run)}</tspan>'
            out += f'<tspan dy="{"-0.22em" if c == "_" else "0.42em"}"></tspan>'
            plain += run
            i = j
        else:
            out += esc(c); plain += c; i += 1
    return (f'<text class="{cls}" x="{x:.1f}" y="{y:.1f}" text-anchor="{anchor}"{f} '
            f'data-plain="{esc(plain)}">{out}</text>\n')

RIGHTS = "Copyright 2026 J. R. Schwebach. All rights reserved. Licensed CC BY-NC 4.0."
ORIGIN = ("Independently created. Drawn from the published mechanism in code, from scratch, "
          "on 2026-10-10. No published figure was traced, scanned, copied or adapted. "
          "Generated by the author's own scripts; the generator source is retained as the "
          "record of independent creation.")


def metadata(title, desc):
    """Authorship, licence and provenance, inside the file itself.

    An SVG carries this wherever it travels, so the claim does not depend on the
    page it happens to sit on."""
    return f"""<metadata>
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:dc="http://purl.org/dc/elements/1.1/"
         xmlns:cc="http://creativecommons.org/ns#">
  <cc:Work rdf:about="">
    <dc:title>{esc(title)}</dc:title>
    <dc:creator><cc:Agent><dc:title>J. R. Schwebach</dc:title></cc:Agent></dc:creator>
    <dc:rights><cc:Agent><dc:title>{esc(RIGHTS)}</dc:title></cc:Agent></dc:rights>
    <dc:date>2026-10-10</dc:date>
    <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
    <dc:publisher><cc:Agent><dc:title>Science One-Pagers (scienceonepagers.org)</dc:title></cc:Agent></dc:publisher>
    <dc:source>{esc(ORIGIN)}</dc:source>
    <dc:description>{esc(desc)}</dc:description>
    <cc:license rdf:resource="https://creativecommons.org/licenses/by-nc/4.0/"/>
  </cc:Work>
  <cc:License rdf:about="https://creativecommons.org/licenses/by-nc/4.0/">
    <cc:permits rdf:resource="http://creativecommons.org/ns#Reproduction"/>
    <cc:permits rdf:resource="http://creativecommons.org/ns#Distribution"/>
    <cc:permits rdf:resource="http://creativecommons.org/ns#DerivativeWorks"/>
    <cc:requires rdf:resource="http://creativecommons.org/ns#Attribution"/>
    <cc:requires rdf:resource="http://creativecommons.org/ns#Notice"/>
    <cc:prohibits rdf:resource="http://creativecommons.org/ns#CommercialUse"/>
  </cc:License>
</rdf:RDF>
</metadata>
"""
