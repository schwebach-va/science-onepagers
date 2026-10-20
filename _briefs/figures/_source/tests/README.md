# Mechanism Reel tests

Playwright and Chromium, run against a local static server. Nothing here is served; the folder starts with `_`.

```
cd <repo>
npx http-server -p 8765 -s -c-1 .            # or any static server on 8765
cd _briefs/figures/_source/tests
node mechanism-reel-tests.js                  # T1-T27 at 1180x820 and 390x844, ~9 minutes; prints the table
node t3-shot.js && python3 t3-compare.py      # T3: the one screenshot, compared with ../../01-gpcr-pathway.png
node smoke-svg-diff.js                        # the page's SVG against the still, line by line
node mechanism-reel-tests-dogma.js            # Phase 2, dogma: the same table, ~10 minutes
python3 t3-compare-dogma.py                   # T3 for dogma, from the suite's own screenshots, against ../../05-central-dogma.png
node mechanism-reel-tests-transport.js        # Phase 2, transport: the same table with a real T19 and T28 (alternating access), ~11 minutes
python3 t3-compare-transport.py               # T3 for transport, from the suite's own screenshots, against ../../03-channel-and-pump.png
node mechanism-reel-tests-etc.js              # Phase 2, etc: the same table with T19 on the synthase (D5) and T29, the proton-density assertion (D2), ~12 minutes
python3 t3-compare-etc.py                     # T3 for etc, from the suite's own screenshots, against ../../04-electron-transport-chain.png
node mechanism-reel-tests-rtk.js              # Phase 2, rtk: the same table with T19 per phosphate (D3), T20 (the closing state, D8), T30 (trans, D2), T31 (relays after phosphates, D4), ~12 minutes
python3 t3-compare-rtk.py                     # T3 for rtk, from the suite's own screenshot, against ../../02-receptor-tyrosine-kinase.png (re-rendered 2026-10-20, D1)
node mechanism-reel-tests-cloning.js          # Phase 2, cloning: the same table with T33 (pairing before sealing, D4), T34 (travellers visible, the plasmid beside the chromosome, D5), T35 (colonies one at a time, D6), ~13 minutes
python3 t3-compare-cloning.py                 # T3 for cloning, from the suite's own screenshots, against ../../06-cloning-a-gene.png (unchanged, D12)
```

With cloning built there are no placeholders: every suite's T1 and T15 assert that none of the six selector entries is disabled.

`mechanism-reel-tests-etc.js`, `mechanism-reel-tests-rtk.js` and `mechanism-reel-tests-cloning.js` read the Playwright path from `PLAYWRIGHT_PATH` when it is set, so on a Mac
`PLAYWRIGHT_PATH=/path/to/node_modules/playwright node mechanism-reel-tests-etc.js` runs it without an edit.
Chromium needs Archivo installed as a system font when the Google Fonts fetch is blocked, or T3 compares a
fallback face: the stills embed Archivo 600 and 700 as woff2, and a copy converted to TTF (fontTools) in the
user font folder is enough (`fc-cache -f` after; the family name inside the subset reads "Archivo SemiBold", so rename it to "Archivo" with fontTools if Chromium does not match it).
`D1-rtk-stage4-before-after.png` is the crop the rtk brief asked for: stage 4 of the rtk still as shipped and after the 2026-10-20 re-renders (relays at -40/0/+40).

`mechanism-reel-tests.js` requires Playwright at `/opt/node22/lib/node_modules/playwright`; change the
`require` line to `require('playwright')` after `npm i playwright` elsewhere. `t3-compare.py` needs Pillow and numpy.
