---
title: Simulation
subtitle: simulating cosmologic muons
---


## Generation

| PDVD | |
| - | - |
| x | `-340->340` |
| y | `-337->337` |
| z | `0->200` |
| θxz | `atan(Px/Pz)` : `180->360` |
| θyz | `atan(Py/PTy)=acos(Py/P)` : `-90->90` |


```bash
#!/bin/bash

echo -n "filename: "
read name

lar -c gen_protodunevd_muon_1GeV.fcl                                            -o pdvd_${name}_gen_out.root
lar -c protodunevd_refactored_g4_stage1.fcl     pdvd_${name}_gen_out.root       -o pdvd_${name}_g4s1_out.root
lar -c protodunevd_refactored_g4_stage2.fcl     pdvd_${name}_g4s1_out.root      -o pdvd_${name}_g4s2_out.root
lar -c protodunevd_refactored_detsim.fcl        pdvd_${name}_g4s2_out.root      -o pdvd_${name}_detsim_out.root
lar -c protodunevd_reco.fcl                     pdvd_${name}_detsim_out.root    -o pdvd_${name}_reco_out.root
```