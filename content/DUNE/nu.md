---
title: Neutrino Physics
# linkTitle: nuphy
summary: "..."
math: true
---

<!-- ![event_number_mu_to_e](Figures/event_number_mutoe.png)

![event_number_mu_to_mu](Figures/event_number_mutomu.png) -->

> \(N=\phi\varepsilon \sigma N_T P(\nu_\mu\to\nu_e)\)

this is a definition
: definition

Term to define
: This is the definition of the term
: This is another definition

Another term
: Yet another definition

## Physics

### neutrinos

- solar: nuclear fusion: \(pp\to {}^2{\rm H}e^+\nu_e\), energy: \(\sim {\rm~MeV}\)

- reactor: nuclear fission: ?, energy: \(\sim {\rm~MeV}\)

- atmospheric: energy: \(\sim {\rm~MeV}-{\rm~PeV}\)

- neutrino mass: \(<0.9{\rm~eV}\)

- in matter: \(\nu_ee^-\) annihilation: phase difference in oscillation parameters

### oscillations

### LAr: \({}^{40}_{18}{\rm Ar}\)

- density: \(1.4{\rm~g/cm^3}\)

- dominant low-energy interaction: charged-current absorption: \(\nu_e+{}^{40}{\rm Ar}\to e^-+{}^{40}{\rm K^*}\) (\(\nu_en\to e^-p\))

- additional channels: \(\bar\nu_e\) CC, \(\nu_e\) elastic scattering

- sensitivity: \(\sim 5{\rm~MeV}-?\) (with \({}^{39}{\rm Ar}\) down to \(500{\rm~keV}\))

- \(\mu^+\): 100% decay to \(e^+\), \(\mu^-\): 25% decay to \(e^-\) and 75% captured by \({\rm Ar^+}\)

- electron propagation: energy deposit via inoization (continuous, track-like topology) or radiative losses (bremsstrahlung: at all energies, electron and photon showers)

- Bremsstrahlung photons may Compton scatter or create electron pairs, with a typical attenuation length of \(20-30{\rm~cm}\) (at Michel electron energy range)

## DUNE Hardware

### beam @Fermilab

- \(\nu\) energy: \(100{\rm~MeV}\sim 1{\rm~GeV}\)

- uncertainties (cf. Kosc p51)

<!-- ![flux_wo_osc](Figures/flux_wo_osc.png) -->

### far detector @SURF @Homestake mines

- cryostat, exterior: \(65.8\times 17.8\times 18.9{\rm~m^3}\), interior: \(62.0\times 15.1\times 14.0{\rm~m^3}\)

- assumed constant matter density: \(2.6{\rm~g/cm^3}\)

- expected muon rate: \(0.2{\rm~Hz}\) with \(283{\rm~GeV}\) average energy

### LArTPCs

- Fiducial volume: \(10{\rm~kt}\) (\(17.5{\rm~kt}\) in total)

- electric field: \(500{\rm~V/cm}\)

- electron drift velocity: (around 4 ms for 6 m)

- time tick duration: \(500{\rm~ns}\)

## Software

### LArSoft

- cosmic ray muon generation: CORSIKA

- particle propagation and interaction: Geant4 (using QGSP BERT physics list)

- pattern recognition and event reconstruction: Pandora software package

- \(\Delta\)-rays threshold: \(455{\rm~keV}\) (in ProtoDUNE-SP)

## prototyping

### protoDUNE-SP @CERN

- HD

- fiducial volume of LAr: \(770\ \rm t\)

- wdh: \(7.2\times 7 \times 6{\rm~m^3}\)

- maximum drift length: \(3.6{\rm~m}\)

- cathode - anode voltage: \(180 - 0{\rm~kV}\)

- U & V layers angles: \(\pm 35.7^\circ\)

- layer distance: \(4.75{\rm~mm}\)

- wire pitch: U,V: \(4.67{\rm~mm}\) and X: \(4.79{\rm~mm}\)

- total electronic channel per APA: \(2560\)

- expected muon flux: \(1{\rm~cm^{-2}.min^{-1}}\)

### Michel electrons (at protoDUNE-SP)

- energy: up to \(\sim 50{\rm~MeV}\)

- different reconstruction algorithm then GeV electromagnetic showers

- purity: true reconstructed tracks / all reconstructed tracks

- completeness: true reconstructed tracks / all true tracks

- candidate muon track criteria (28% of \(T_0\) tagged with 99.7% purity):

  1. \(T_0\) tagged tracks (2% of data sample)

  2. muon track endpoint \(>30{\rm~cm}\) away from detector boundaries

  3. muon track endpoint in the fiducial volume

  4. muon track endpoint \(>10{\rm~cm}\) away from boundaries between two adjacent APAs

  5. no broken tracks (due to anode gaps) ie. two tracks with: \(<30{\rm~cm}\) gap and \(<14^\circ\) or \(>165^\circ\) angle difference

  6. \(>75{\rm~cm}\) total track length (crosses both volumes, through the cathode)

  7. \(>200\) ticks or \(<5800\) ticks long tracks (event readout window)

- candidate Michel electron criteria:

  1. \(<10{\rm~cm}\) away from candidate muon track endpoint, between 5 and 40 hits

  2. \(<130^\circ\) angle between M. eletron track and candidate muon track (last 10 hits)

  3. \(>10^\circ\) or \(<170^\circ\) angle between M. electron track and collection plane wire

  4. cone

- total event purity from simulation: 95% (5%: \(\Delta\)-rays, bremsstrahlung-\(\gamma\),...)

## Rationale

### differences with HK

- LAr vs. water

- DUNE has lower sensitivity threshold

- Cherenkov only sees relativistic particles, DUNE sees every charged particle

- HK dominant low-energy interaction: \(\bar \nu_e\) inverse β-decay
