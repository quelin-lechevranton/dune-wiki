---
title: 'Data Products'
subtitle: 'classes and methods of LArSoft objects'
---

## Data products

[cf. practical guide](https://indico.fnal.gov/event/20453/contributions/57771/attachments/36174/44057/larsofttutorial1.pdf)

| object | description |
| - | - |
| `simb::MCTruth` | information about the generation (before G4) |
| `simb::MCParticle` | all particle information: one instance by `MC::Truth` then one by G4 |
| `sim::SimEnergyDeposit` | G4 |

| object | description |
| - | - |
| `raw::Digit` | ADC count and time ticks on one channel |

| object | description |
| - | - |
| `recob::Wire` | deconvolved signal of `Digit` |
| `recob::Hit` | gaussian fit on `Wire` |
| `recob::Cluster` | `Hit` coincidence on multiple wires of one plane |
| `recob::SpacePoint` | `Cluster` coincidence on all three planes |
| `recob::PFParticle` | collection of `Cluster` produced by one reconstructed particle |
| `recob::Track` | track reconstruction on appropriate hits from a track-like `PFParticle` |
| `anab::Calorimetry` | calorimetric measurement for each plane and each `Track` |
| `recob::Shower` | shower reconstruction on hits from a shower-like `PFParticle` |


## Librairies

Once LArSoft in sourced, all include paths of LArSoft `C++` librairies are stored in environment variable ending in `INC`. try: 

```bash
env | grep _INC=
```

## Module

```bash
cetskelgen -v -d . -e beginJob -e endJob analyzer test::AnalyseEvents
```

bla_module.cc using EDAnalyzer.h

blabla.fcl

compilation avec mrb

run avec lar -c blabla.fcl

```bash
fhicl-dump --help
lar --print-available module
lar --prin-description "modulename"
nohup lar ?? >&amp; pg.out
nohup lar -c ?? > nohup.out 2> nohup.err < /dev/null &
pgrep lar
```

```cpp
Constructor (fhicl::ParameterSet const & fcl) {
    type_t x = p.get<type_t>("parameterNameInFhicl",x_default);
}
// if the parameter is a sequence: type_t = vector<...>
// if the parameter is a table: type_t = struct {...}
```



## Truth & Particles

### IDE and TrackIDE

[trackIDE](https://github.com/LArSoft/lardataobj/blob/1371f7532ca8e6f3e330024640aa4556a4894dbf/lardataobj/Simulation/SimChannel.h#L26)
[rawDigit](https://github.com/LArSoft/lardataobj/blob/1371f7532ca8e6f3e330024640aa4556a4894dbf/lardataobj/RawData/RawDigit.h#L4)

[`Simulation/SimChannel.h`](https://github.com/LArSoft/lardataobj/blob/develop/lardataobj/Simulation/SimChannel.h)

those are structures

`sim::TrackIDE` G4 track id and ionization energy

`sim::IDE` :

> Ionization information consists of both energy and number of electrons.
> It is of paramount importance to understand what each field stores:
>
> - position: where the ionization occurred (from Geant4 simulation)
> - track ID: Geant4 track ID of the ionizing particle
> - energy: amount of energy released by ionization (from Geant4 simulation)
> - electrons: amount of electrons reaching the readout channel



### Monte Carlo Trajectories {github="https://github.com/NuSoftHEP/nusimdata/blob/develop/nusimdata/SimulationBase/MCTrajectory.h"}

| members | description |
| - | - |
| __private__ | |
| `ftrajectory` | `vector<pair<TLorentzVector, TLorentzVector>>` |
| __public__ | |
| `Position(i)` | `ftrajectory[i].first` |
| `Momentum(i)` | `ftrajectory[i].second` |
| `TotalLength()` | `(double)` sum of the distances between adjacent positions |

### Monte Carlo Particles {github="https://github.com/NuSoftHEP/nusimdata/blob/develop/nusimdata/SimulationBase/MCParticle.h"}

`!mcp` ??

`Process()` and `EndProcess()`

| members | description |
| - | - |
| __private__ | |
| `fpdgCode` | `int` |
| `ftrajectory` | `simb::MCTrajectory` |
| `fdaughters` | `set<int>` |
| __public__ | |
| `PdgCode()` | `fpdgCode` |
| `Position(i)` | `ftrajectory.Position(i)` |
| `Momentum(i)` | `ftrajectory.Momentum(i)` |
| `Daugther(i)` | `i`-th daughter's ID |

### Monte Carlo Truth {github="https://github.com/NuSoftHEP/nusimdata/blob/develop/nusimdata/SimulationBase/MCTruth.h"}

| members | description |
| - | - |
| __private__ | |
| `fPartList` | `vector<simb::MCParticle>` |
| __public__ | |
| `GetParticle(i)` | `fPartList[i]` |
| `GetNeutrino(i)` | `fMCNeutrino` |

## SimEnergyDeposits {github="https://github.com/LArSoft/lardataobj/blob/develop/lardataobj/Simulation/SimEnergyDeposit.h"}

| members | description |
| - | - |
| __private__ | |
| `trackID` | same as `origTrackID`: track ID of the generated particle at the origine of the deposited energy |
| __public__ | |
| `GetParticle(i)` | `fPartList[i]` |
| `GetNeutrino(i)` | `fMCNeutrino` |

## Wires {github="https://github.com/LArSoft/lardataobj/blob/develop/lardataobj/RecoBase/Wire.h"}

| members | description |
| - | - |
| __private__ | |
| `fChannel` | `raw::ChannelID_t` |
| `fView` | `geo::View_t` |
| `fSignalROI` | `lar::sparse_vector<float>` [`sparse_vector.h`](https://github.com/LArSoft/lardataobj/blob/develop/lardataobj/Utilities/sparse_vector.h) |
| __public__ | |
| `Channel()` | `fChannel` |
| `View()` | `fView` |
| `NSignal()` | `fSignalROI.size()` |
| `Signal()` | `(vector<float>) {fSignalROI.begin(), fSignalROI.end()}` |
| `SignalROI()` | `fSignalROI` | 

## Hits {github="https://github.com/LArSoft/lardataobj/blob/develop/lardataobj/RecoBase/Hit.h"}

| members | description |
| - | - |
| __private__ | |
| `fChannel` | `raw::ChannelID_t` |


| `recob::Hit` | |
| - | - |
| `Channel()` | `(raw::ChannelID_t)` |
| `PeakTime()` | `(float)` |

## Clusters {github="https://github.com/LArSoft/lardataobj/blob/develop/lardataobj/RecoBase/Cluster.h"}

## PFParticles {github="https://github.com/LArSoft/lardataobj/blob/develop/lardataobj/RecoBase/PFParticle.h"}

## Tracks

### Tracking Types {github="https://github.com/LArSoft/lardataobj/blob/develop/lardataobj/RecoBase/TrackingTypes.h"}

| typename | description |
| - | - |
| `Point_t` | [`PositionVector3D`](https://root.cern.ch/doc/master/classROOT_1_1Math_1_1PositionVector3D.html) |
| `Vector_t` | [`DisplacementVector3D`](https://root.cern.ch/doc/master/classROOT_1_1Math_1_1DisplacementVector3D.html) |
| `TrajectoryPoint_t` | `struct {P_t position; V_t momentum; V_t direction() return momentum.Unit();}` |

### Trajectories {github="https://github.com/LArSoft/lardataobj/blob/develop/lardataobj/RecoBase/Trajectory.h"}

| members | description |
| - | - |
| __private__ | |
| `fPositions` | `vector<Point_t>` position at each point of the trajectory |
| `fMomenta` | `vector<Vector_t>` momentum at each point of the trajectory |
| __public__ | |
| `NPoints()` | `fPositions.size()` |
| `FirstPoint()` | `0` |
| `LastPoint()` | `NPoints()-1` |
| | |
| `LocationAtPoint(i)` | `fPositions[i]` |
| `MomentumVectorAtPoint(i)` | `fMomenta[i]` |
| `MomentumAtPoint(i)` | `fMomenta[i].R()`|
| `DirectionAtPoint(i)` | `fMomenta[i]/fMomenta[i].R()` |
| `TrajectoryPoint(i)` | `(TrajectoryPoint_t) {fPositions[i],fMomenta[i]}` |
| | |
| `Length()` | sum of the distances between adjacent points |
| `Start()` | `LocationAtPoint(FirstPoint())` |
| `End()` | `LocationAtPoint(LastPoint())` |

### Track Trajectories {github="https://github.com/LArSoft/lardataobj/blob/develop/lardataobj/RecoBase/TrackTrajectory.h"}

`class TrackTrajectory : private recob::Trajectory`
| members | description |
| - | - |
| __protected__ | |
| | |
| __public__ | |
| `NextValidPoint(i)` | `size_t` |
| `FirstValidPoint()` | `NextValidPoint(0)` |
| `...` | |

### Tracks {github="https://github.com/LArSoft/lardataobj/blob/develop/lardataobj/RecoBase/Track.h"}

| members | description |
| - | - |
| __protected__ | |
| `fTraj` | `TrackTrajectory` |
| `...` | |
| __public__ | |
| `FirstValidPoint()` | `fTraj.FirstValidPoint()` |
| `FirstPoint()` | `fTraj.FirstPoint()` |
| `LocationAtPoint(i)` | `fTraj.LocationAtPoint(i)` |
| `Start()` | `fTraj.Start()` |
| `...` | |

## Calorimetry {github="https://github.com/LArSoft/lardataobj/blob/develop/lardataobj/AnalysisBase/Calorimetry.h"}

| members | description |
| - | - |
| __public__ | |
| `fdEdx` | `vector<float>` |
| `fResidualRange` | `vector<float>` |
| `fRange` | `float` |
| `...` | |
| | |
| `dEdx()` | `fdEdx` |
| `dQdx()` | `fdQdx` |
| `ResidualRange()` | `fResidualRange` |
| `Range()` | `fRange` |
| `...` | |

## Showers {github="https://github.com/LArSoft/lardataobj/blob/develop/lardataobj/RecoBase/Shower.h"}

## Truth Reco Associations

```cpp
art::ServiceHandle<cheat::BackTrackerService> bt_serv;
art::ServiceHandle<cheat::ParticleInventoryService> pi_serv;


auto const clockData = art::ServiceHandle<detinfo::DetectorClocksService>()->DataFor(evt);
```

### Utilities {github="https://github.com/DUNE/protoduneana/blob/develop/protoduneana/Utilities"}

## MetaCat

`metacat query "files where 025086 in core.runs and core.data_tier=raw limit 10"`

`export METACAT_AUTH_SERVER_URL=https://metacat.fnal.gov:8143/auth/dune`

`export METACAT_SERVER_URL=https://metacat.fnal.gov:9443/dune_meta_prod/appi`

## Pandora

cf. 9th_uk_larsoft_workshop/debugging_reconstruction

list of Pandora algorithm - class association: https://github.com/PandoraPFA/LArContent/blob/master/larpandoracontent/LArContent.cc

then parameter list in class initialization: (e.g) https://github.com/PandoraPFA/LArContent/blob/master/larpandoracontent/LArTwoDReco/LArClusterAssociation/HitWidthClusterMergingAlgorithm.cc
here: `m_minClusterSparseness(0.3f)` can be changed in

`PandoraSettings_*.xml` as follows:
```xml
<algorithm type = "LArHitWidthClusterMerging">
    <MinClusterSparseness>0.2</MinClusterSparseness>
</algorithm>
```


## DEBUGGING

Make sure the good fhicl files are being included. For that be sure the directory of the fhicl file you want to include is in the begining of the FHICL_FILE_PATH environment variable in case another fhicl file exists with the same name.