#!/usr/bin/env python3
"""Copy shared core + chosen vendor libs into each site so every site is standalone.
usage: python3 _shared/sync.py   (run from repo root)"""
import shutil, pathlib
here = pathlib.Path(__file__).parent
root = here.parent
SITES = {'ojjo': ['bootstrap', 'fontawesome'], 'frap': ['fontawesome'],
         'br-architects': ['fontawesome'], 'creative-studio': ['tailwind', 'fontawesome']}
for name, libs in SITES.items():
    site = root / 'sites' / name
    if not site.exists():
        continue
    assets = site / 'assets'; assets.mkdir(exist_ok=True)
    for f in ('core.js', 'core.css'):
        shutil.copy(here / f, assets / f)
    vend = site / 'vendor'
    if vend.exists(): shutil.rmtree(vend)
    for lib in libs:
        shutil.copytree(here / 'vendor' / lib, vend / lib)
    print('synced', name, libs)
