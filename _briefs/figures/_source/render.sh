#!/bin/bash
# Render an SVG to an exact 1600 x H PNG with headless Chromium.
# Chromium's headless window reserves about 100 px of chrome height, so the
# window is asked for H+100 and the top 1600 x H is kept.
set -e
CHROME=/opt/pw-browsers/chromium-1194/chrome-linux/chrome
SVG="$(realpath "$1")"; OUT="$2"; H="${3:-1000}"
TMP=$(mktemp -d)
cat > "$TMP/p.html" <<EOF
<!doctype html><meta charset="utf-8">
<style>html,body{margin:0;padding:0;background:#fff;width:1600px;height:${H}px;overflow:hidden}
img{display:block;width:1600px;height:${H}px}</style>
<img src="file://$SVG">
EOF
"$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=1600,$((H+100)) \
  --screenshot="$TMP/raw.png" "file://$TMP/p.html" 2>/dev/null
convert "$TMP/raw.png" -crop 1600x${H}+0+0 +repage "$OUT"
rm -rf "$TMP"
echo "$OUT $(identify -format '%wx%h' "$OUT")"
