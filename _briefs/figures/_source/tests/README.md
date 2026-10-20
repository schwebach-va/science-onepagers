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
```

`mechanism-reel-tests-etc.js` reads the Playwright path from `PLAYWRIGHT_PATH` when it is set, so on a Mac
`PLAYWRIGHT_PATH=/path/to/node_modules/playwright node mechanism-reel-tests-etc.js` runs it without an edit.
Chromium needs Archivo installed as a system font when the Google Fonts fetch is blocked, or T3 compares a
fallback face: the stills embed Archivo 600 and 700 as woff2, and a copy converted to TTF (fontTools) in the
user font folder is enough.

`mechanism-reel-tests.js` requires Playwright at `/opt/node22/lib/node_modules/playwright`; change the
`require` line to `require('playwright')` after `npm i playwright` elsewhere. `t3-compare.py` needs Pillow and numpy.
