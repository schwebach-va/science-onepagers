#!/usr/bin/env python3
"""T3: compare the stage screenshot (t3-shot.js) with the delivered PNG. Prints the pixel-difference
percentage and writes a two-up image. Run from the tests folder after t3-shot.js."""
import sys
from PIL import Image
import numpy as np
ref=Image.open(sys.argv[1] if len(sys.argv)>1 else '../../01-gpcr-pathway.png').convert('RGB')
im=Image.open('T3-final-step.png').convert('RGB')
a=np.asarray(ref).astype(int); b=np.asarray(im).astype(int); d=np.abs(a-b).max(axis=2)
for thr in (16,32,64): print(f'pixels differing by >{thr}: {100*(d>thr).mean():.3f}%')
H,W=d.shape; g=(d>32)
print('diff % by region (5 rows x 8 cols):')
for gy in range(5): print('  '+' '.join(f'{100*g[gy*H//5:(gy+1)*H//5, gx*W//8:(gx+1)*W//8].mean():5.1f}' for gx in range(8)))
two=Image.new('RGB',(ref.size[0],ref.size[1]*2+20),'white'); two.paste(ref,(0,0)); two.paste(im,(0,ref.size[1]+20)); two.save('T3-reference-above-animation-below.png')
