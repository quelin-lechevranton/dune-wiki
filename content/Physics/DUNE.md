---
title: DUNE
subtitle: Deep Underground Neutrino Experiment
summary: "..."
image: dune.svg
---


[NuFIT](http://www.nu-fit.org/)

## Q?

- some tracks are way off the detector limits while space points stay inside
- howto: `$ lar -c c.fcl -o out.root`

- `Calorimetry::fTrkPitch`
- `Calorimetry::fXYZ`
- `anab::T0`
- `GetSimEnergyDeposit(MCParticle)`

### IRN Thibaut

- Statistics / systematics / resolution
- Coldbox ?
- ProtoDUNE-VD : pourquoi autant de vide ?

## Todo

- `TrkSt` <-> `TrkEnd`
- `SimEnerDep::trackid` `SimEnerDep::originTrackid`
- `MCCheater`
- michel electrons track length (reco: ~10 cm)
- \#michel elec with track / #michel elec
- \#michel elec / \#muon gen
- for events with maxTrkLen < 30 cm => sum des EnergDep / CluSumADC / CluIntFit

- website with `jsROOT` instead of slide shows for presentations
- SublimeText: ssh/vim/web
- include path to cvmfs

## Ideas

- $E = m\sqrt{\beta^2\gamma^2+1}$

## Analysis

- les muons à incidence verticale ont tendances à être reconstruit par plusieurs traces
- les muons à incidence horizontale ont tendances à être reconstruit par aucune traces
- au-delà de 100 MeV, le moment initiale (`MCTruth`) ne semble pas avoir d'incidence sur le nombre de trace reconstruite

pour 1100 muons incidents:

- 1386 traces dont 513 (37%) restent à l'intérieur du détecteur
- toutes les traces sont produites par des muons (d'après `PFP.Pdgcode()`)
- 117 (11%) sont sans trace (dont ~50 généré à 15° de l'horizontale)
- 757 (69%) ont une trace
- 226 (20%) ont plusieurs traces (dont ~50 généré à 15° de la verticale)

pour un événement à plusieurs traces:

- 0.8 traces sont longues (> 25 cm)
- 2.0 traces sont courtes (< 25 cm)

## CG

- $P(\theta)$ du neutrino in $\pi^+\to\mu^+\nu_\mu$ for $E_\pi =$ (cf. DUNE beam)
- on-axis/off-axis: energy distribution (DUNE is on-axis, T2K is off-axis)
- off-axis near detectors on DUNE (Prism) ?
- spectre en energy des neutinos du beam dans DUNE

- Ar vs Xe vs H20 ?
- LAr: scintillator, mostly inerte, ${}^{39}Ar$ impurities, cheap (1 $/kg), low energy sensibility (~1 MeV)
- LXe: 1 $/g
- H20: Cerenkov effect (no low energy)
