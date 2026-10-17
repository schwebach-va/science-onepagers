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
```

`mechanism-reel-tests.js` requires Playwright at `/opt/node22/lib/node_modules/playwright`; change the
`require` line to `require('playwright')` after `npm i playwright` elsewhere. `t3-compare.py` needs Pillow and numpy.
