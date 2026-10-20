#!/usr/bin/env python3
"""T3 for rtk: compare the stage screenshot written by mechanism-reel-tests-rtk.js with the delivered PNG,
re-rendered on 2026-10-20 with stage 4 fixed (D1). Prints the pixel-difference percentage and writes a
two-up image. Run from the tests folder after the suite. rtk has one level, so there is one frame. The
expected difference is the six ADP pentagons that paid for the six phosphates and lie in the cytosol beside
the dimer (one ATP per phosphate, D3; travel beats pixel-equivalence)."""
import sys
from PIL import Image
import numpy as np
ref=Image.open(sys.argv[1] if len(sys.argv)>1 else '../../02-receptor-tyrosine-kinase.png').convert('RGB')
a=np.asarray(ref).astype(int)
name='T3-rtk-final-step.png'
im=Image.open(name).convert('RGB').crop((0,0,ref.size[0],ref.size[1]))
b=np.asarray(im).astype(int); d=np.abs(a-b).max(axis=2)
print(f'--- {name}')
for thr in (16,32,64): print(f'pixels differing by >{thr}: {100*(d>thr).mean():.3f}%')
H,W=d.shape; g=(d>32)
print('diff % by region (5 rows x 8 cols):')
for gy in range(5): print('  '+' '.join(f'{100*g[gy*H//5:(gy+1)*H//5, gx*W//8:(gx+1)*W//8].mean():5.1f}' for gx in range(8)))
two=Image.new('RGB',(ref.size[0],ref.size[1]*2+20),'white'); two.paste(ref,(0,0)); two.paste(im,(0,ref.size[1]+20)); two.save('T3-rtk-reference-above-animation-below.png')
