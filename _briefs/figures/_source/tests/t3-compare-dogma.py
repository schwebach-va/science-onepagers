#!/usr/bin/env python3
"""T3 for dogma: compare the stage screenshots written by mechanism-reel-tests-dogma.js with the
delivered PNG. Prints the pixel-difference percentage at DE (the still's words) and at SOL, and
writes a two-up image of the DE frame. Run from the tests folder after the suite."""
import sys
from PIL import Image
import numpy as np
ref=Image.open(sys.argv[1] if len(sys.argv)>1 else '../../05-central-dogma.png').convert('RGB')
a=np.asarray(ref).astype(int)
for name in ('T3-dogma-final-step.png','T3-dogma-final-step-sol.png'):
    im=Image.open(name).convert('RGB').crop((0,0,ref.size[0],ref.size[1]))
    b=np.asarray(im).astype(int); d=np.abs(a-b).max(axis=2)
    print(f'--- {name}')
    for thr in (16,32,64): print(f'pixels differing by >{thr}: {100*(d>thr).mean():.3f}%')
    H,W=d.shape; g=(d>32)
    print('diff % by region (5 rows x 8 cols):')
    for gy in range(5): print('  '+' '.join(f'{100*g[gy*H//5:(gy+1)*H//5, gx*W//8:(gx+1)*W//8].mean():5.1f}' for gx in range(8)))
    if name=='T3-dogma-final-step.png':
        two=Image.new('RGB',(ref.size[0],ref.size[1]*2+20),'white'); two.paste(ref,(0,0)); two.paste(im,(0,ref.size[1]+20)); two.save('T3-dogma-reference-above-animation-below.png')
