---
title: Liquid Argon Software
linkTitle: LArSoft
summary: "..."
---


# LArSoft: *liquid argon software*

## MRB [here](https://cdcvs.fnal.gov/redmine/projects/mrb/wiki/MrbRefereceGuide)

| command | alias | arguments |
| - | - | - |
| `mrb newDev` | `mrb n` | `-v $VERSION -q $QUALIFIER` |
| `mrb gitCheckout` | `mrb g` | |
| `mrb install` | `mrb i` | `-j $CORE_NUMBER` |
| `mrbsetenv` | | |
| `mrbslp` | | |

## Installation [here](https://gitlab.in2p3.fr/dune-france/dune-orsay/-/wikis/LArSoft), [versions](https://larsoft.github.io/LArSoftWiki/releases/LArSoft_release_list.html)

first load in the container 

```bash
alias app='/cvmfs/oasis.opensciencegrid.org/mis/apptainer/current/bin/apptainer shell \
    --shell=/bin/bash \
    -B /cvmfs,/etc/hostname,/etc/hosts,/etc/krb5.conf \
    --ipc \
    --pid /cvmfs/singularity.opensciencegrid.org/fermilab/fnal-dev-sl7:latest'
```

```bash
alias app='/cvmfs/oasis.opensciencegrid.org/mis/apptainer/current/bin/apptainer shell \
    --shell=/bin/bash \
    -B /cvmfs,/etc/hostname,/etc/hosts,/etc/krb5.conf \
    --ipc \
    --pid /cvmfs/singularity.opensciencegrid.org/fermilab/fnal-dev-sl7:latest'
```

create `install_larsoft.sh` in `path/to/user/sw/dune_workdir` with the following

```bash
#!/bin/bash

VERSION=v09_91_04d00
QUAL=e26

source /cvmfs/dune.opensciencegrid.org/products/dune/setup_dune.sh
mrb n -f -v ${VERSION} -q prof:${QUAL}
source localProducts_larsoft_${VERSION}_prof_${QUAL}/setup

cd $MRB_SOURCE
mrb g -t ${VERSION} dunesw
mrb g -t ${VERSION} protoduneana
mrb g -t ${VERSION} dunereco
```

you can now source larsoft on startup with 

```bash
source /cvmfs/dune.opensciencegrid.org/products/dune/setup_dune.sh
source /path/to/localProducts_larsoft_v09_91_04d00_prof_e26/setup

mrbsetenv && mrbslp
```

and compile with

```bash
cd $MRB_BUILDDIR
mrbsetenv && mrb i -j8 && mrbslp
```

## Modules

```bash
cetskelgen -v -d . -e beginJob -e endJob analyzer test::AnalyseEvents
```

## FHiCL Utilities

`find_fhicl.sh`

```bash
#!/bin/bash

if [[ $# -ne 1 ]]; then
    echo "Erreur: no fcl file"
    exit 1
fi 
if [ -z ${FHICL_FILE_PATH+x} ]; then
    echo "Erreur: FHICL_FILE_PATH is not set"
    exit 2
fi 
SEARCH_PATHS=$(echo $FHICL_FILE_PATH | sed 's/:/\n/g')
for THIS_PATH in $SEARCH_PATHS; do
    if [ -d $THIS_PATH ]; then
        find $THIS_PATH -name $1
    fi
done
```

```bash
fhicl-dump file.fcl
```

```bash
lar -c eventdump.fcl -s myfile.root -n 1
```

DUNE event display ?

## Generation

| PDVD | |
| - | - |
| x | `-340->340` |
| y | `-337->337` |
| z | `0->200` |
| θxz | `atan(Px/Pz)` : `180->360` |
| θyz | `atan(Py/PTy)=acos(Py/P)` : `-90->90` |

## Module

bla_module.cc using EDAnalyzer.h

blabla.fcl

compilation avec mrb

run avec lar -c blabla.fcl

```bash
fhicl-dump --help
lar --print-available module
lar --prin-description "modulename"
nohup lar ?? >&amp; pg.out
pgrep lar
```

```C++
Constructor (fhicl::ParameterSet const & fcl) {
    type_t x = p.get<type_t>("parameterNameInFhicl",x_default);
}
// if the parameter is a sequence: type_t = vector<...>
// if the parameter is a table: type_t = struct {...}
```

## Types

[geo_vectors.h](https://github.com/LArSoft/larcoreobj/blob/develop/larcoreobj/SimpleTypesAndConstants/geo_vectors.h)

[RawTypes.h](https://github.com/LArSoft/larcoreobj/blob/develop/larcoreobj/SimpleTypesAndConstants/RawTypes.h)

| typename | description |
| - | - |
| `geo::Length_t` | `double` |
| `geo::Point_t` | [`ROOT::Math::PositionVector3D`](https://root.cern.ch/doc/master/classROOT_1_1Math_1_1PositionVector3D.html) |
| `geo::Vector_t` | [`ROOT::Math::DisplacementVector3D`](https://root.cern.ch/doc/master/classROOT_1_1Math_1_1DisplacementVector3D.html) |

### IDs

| typename | description |
| - | - |
| `geo::View_t` | `enum { kU, kV, kW, ..., kUnknown }` |
| | |
| `raw::ChannelID_t` | `unsigned int` or `raw::ChannelID_t::InvalidChannelID`|

[larcoreobj/SimpleTypesAndConstants/geo_types.h](https://github.com/LArSoft/larcoreobj/blob/develop/larcoreobj/SimpleTypesAndConstants/geo_types.h)

```cpp
namespace geo {
struct CryostatID {
    using CryostatID_t = unsigned int;
    constexpr CryostatID_t InvalidID = ...;
    CryostatID_t Cryostat;

    bool isValid;
    string toString();
    operator bool() { return isValid; };
    operator string();

    size_t Level = 0;

    //return the ID of the Level, only 0 is available here
    template <size_t Level>
    CryostatID_t getIndex();
}
struct TPCID : public CryostatID {
    using TPCID_t = usigned int;
    using ParentID_t = CryostatID;
    TPCID_t TPC;

    ParentID_t& ParentID();

    size_t Level = 1;
}
struct PlaneID : public TPCID {
    using PlaneID_t = usigned int;
    using ParentID_t = TPCID;
    PlaneID_t Plane;

    ParentID_t& ParentID();

    size_t Level = 2;
}
struct WireID : public PlaneID {
    using WireID_t = usigned int;
    using ParentID_t = PlaneID;
    WireID_t Wire;

    ParentID_t& ParentID();

    size_t Level = 3;
}
} // end namespace geo
```

| ID | range in ProtoDUNE-VD |
| - | - |
| Cryostat | 0 -> 0 |
| TPC | 0 -> 15 |
| Plane | 0 -> 2 |
| Wire | 0 -> 291 |


## Data products [cf. practical guide](https://indico.fnal.gov/event/20453/contributions/57771/attachments/36174/44057/larsofttutorial1.pdf)

| object | description |
| - | - |
| `simb::MCTruth` | information about the generation (before G4) |
| `simb::MCParticle` | all particle information: one instance by `MC::Truth` then one by G4 |
| `sim::SimEnergyDeposit` | G4 |

| object | description |
| - | - |
| `raw::Digit` | ADC count wrt time ticks on one channel |

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


## Truth & Particles

### IDE and TrackIDE


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





### Trajectory [`SimulationBase/MCTrajectory.h`](https://github.com/NuSoftHEP/nusimdata/blob/develop/nusimdata/SimulationBase/MCTrajectory.h)

| members | description |
| - | - |
| __private__ | |
| `ftrajectory` | `vector<pair<TLorentzVector, TLorentzVector>>` |
| __public__ | |
| `Position(i)` | `ftrajectory[i].first` |
| `Momentum(i)` | `ftrajectory[i].second` |
| `TotalLength()` | `(double)` sum of the distances between adjacent positions |

### Particle [`SimulationBase/MCParticle.h`](https://github.com/NuSoftHEP/nusimdata/blob/develop/nusimdata/SimulationBase/MCParticle.h)

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

### Truth [`SimulationBase/MCTruth.h`](https://github.com/NuSoftHEP/nusimdata/blob/develop/nusimdata/SimulationBase/MCTruth.h)

| members | description |
| - | - |
| __private__ | |
| `fPartList` | `vector<simb::MCParticle>` |
| __public__ | |
| `GetParticle(i)` | `fPartList[i]` |
| `GetNeutrino(i)` | `fMCNeutrino` |

## SimEnergyDeposits [`Simulation/SimEnergyDeposit.h`](https://github.com/LArSoft/lardataobj/blob/develop/lardataobj/Simulation/SimEnergyDeposit.h)

| members | description |
| - | - |
| __private__ | |
| `trackID` | same as `origTrackID`: track ID of the generated particle at the origine of the deposited energy |
| __public__ | |
| `GetParticle(i)` | `fPartList[i]` |
| `GetNeutrino(i)` | `fMCNeutrino` |

## Wires 

[`RecoBase/Wire.h`](https://github.com/LArSoft/lardataobj/blob/develop/lardataobj/RecoBase/Wire.h)

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

## Hits

[`RecoBase/Hit.h`](https://github.com/LArSoft/lardataobj/blob/develop/lardataobj/RecoBase/Hit.h)

| members | description |
| - | - |
| __private__ | |
| `fChannel` | `raw::ChannelID_t` |

## Clusters [`RecoBase/Cluster.h`](https://github.com/LArSoft/lardataobj/blob/develop/lardataobj/RecoBase/Cluster.h)

## PFParticles [`RecoBase/PFParticle.h`](https://github.com/LArSoft/lardataobj/blob/develop/lardataobj/RecoBase/PFParticle.h)

## Tracks

### User-defined Types [`RecoBase/TrackingTypes.h`](https://github.com/LArSoft/lardataobj/blob/develop/lardataobj/RecoBase/TrackingTypes.h)

| typename | description |
| - | - |
| `Point_t` | [`PositionVector3D`](https://root.cern.ch/doc/master/classROOT_1_1Math_1_1PositionVector3D.html) |
| `Vector_t` | [`DisplacementVector3D`](https://root.cern.ch/doc/master/classROOT_1_1Math_1_1DisplacementVector3D.html) |
| `TrajectoryPoint_t` | `struct {P_t position; V_t momentum; V_t direction() return momentum.Unit();}` |

### Trajectories [`RecoBase/Trajectory.h`](https://github.com/LArSoft/lardataobj/blob/develop/lardataobj/RecoBase/Trajectory.h)

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

### Track Trajectories [`RecoBase/TrackTrajectory.h`](https://github.com/LArSoft/lardataobj/blob/develop/lardataobj/RecoBase/TrackTrajectory.h)

`class TrackTrajectory : private recob::Trajectory {...};`
| members | description |
| - | - |
| __protected__ | |
| | |
| __public__ | |
| `NextValidPoint(i)` | `size_t` |
| `FirstValidPoint()` | `NextValidPoint(0)` |
| `...` | |

### Tracks [`RecoBase/Track.h`](https://github.com/LArSoft/lardataobj/blob/develop/lardataobj/RecoBase/Track.h)

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

## Calorimetry [`AnalysisBase/Calorimetry.h`](https://github.com/LArSoft/lardataobj/blob/develop/lardataobj/AnalysisBase/Calorimetry.h)

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

## Showers [`RecoBase/Shower.h`](https://github.com/LArSoft/lardataobj/blob/develop/lardataobj/RecoBase/Shower.h)

## Truth Reco Associations

```C++
art::ServiceHandle<cheat::BackTrackerService> bt_serv;
art::ServiceHandle<cheat::ParticleInventoryService> pi_serv;


auto const clockData = art::ServiceHandle<detinfo::DetectorClocksService>()->DataFor(evt);
```

### [`protoduneana/Utilities/`](https://github.com/DUNE/protoduneana/blob/develop/protoduneana/Utilities)

## Truth Object Associations

```C++

```

## Reco Object Associations

### [`FindManyP`](https://code-doc.larsoft.org/docs/latest/html/FindManyP_8h_source.html)

```C++
using namespace std;
using namespace art;
using namespace recob;

ValidHandle<vector<PFP>> const vh_pfp = evt.getValidHandle<vector<PFP>>(tag_pfp);
vector<Ptr<PFP>> vp_pfp;
fill_ptr_vector(vp_pfp,vh_pfp);

FindManyP<Track> const fmp_track(vp_pfp,evt,label_track);
FindManyP<SpacePoint> const fmp_point(vp_pfp,evt,label_point);

for (Ptr<PFP> const & p_pfp : vp_pfp) {
    vector<Ptr<Track>> vp_track = fmp_track.at(p_pfp.key());

    if(vp_track.empty()) {
        /* */
    }
    else {
        Ptr<Track> p_track = vp_track[0];
        /* */
    }

    vector<Ptr<SpacePoint>> vp_point = fmp_point.at(p_pfp.key());
    for (Ptr<SpacePoint> const & p_point : vp_point) {
        /* */
    }
}
```

### [`dunereco/AnaUtils/`](https://github.com/DUNE/dunereco/blob/develop/dunereco/AnaUtils)

```C++
namespace danaEvt=dune_ana::DUNEAnaEventUtils;
namespace danaPFP=dune_ana::DUNEAnaPFParticleUtils;

vector<Ptr<PFP>> const vp_pfp = danaEvt::GetPFParticles(evt,label_pfp);

for (Ptr<PFP> const & p_pfp : vp_pfp) {
    if (!danaPFP::IsTrack(p_pfp,evt,label_pfp,label_tack)) {
        /* */
    }
    else {
        Ptr<Track> const p_trk = danaPFP::GetTrack(p_pfp,evt,label_pfp,label_trk);
        /* */
    }

    vector<Ptr<SpacePoint>> const vp_point = danaPFP::GetSpacePoints(p_pfp,evt,label_point);
    for (Ptr<SpacePoint> const & p_point : vp_point) {
        /* */
    }
}
```

### [`protoduneana/Utilities/`](https://github.com/DUNE/protoduneana/tree/develop/protoduneana/Utilities)

```C++
protoana::ProtoDUNEPFParticleUtils pfpUtils;
art::ValidHandle<vector<recob::PFParticle>> const vh_pfp = evt.getValidHandle<vector<recob::PFParticle>>(tag_pfp);

for (recob::PFParticle const & pfp : *vh_pfp) {
    if (!IsPFParticleTracklike(pfp,evt,label_pfp,label_track)) {
        /* */
    }
    else {
        const recob::Track* trk = pfpUtils.GetPFParticleTrack(pfp,evt,label_pfp,label_track);
        /* */
    }

    vector<recob::SpacePoint*> v_spt = pfpUtils.GetPFParticleSpacePoints(pfp,evt,label_pfp);
    for (recob::SpacePoint* spt : v_spt) {
        /* */
    }
}
```

## ???

```cpp
art::Ptr<recob::Track> ptrack(trackListHandle, i);
const recob::Track& track = *ptrack;

const simb::MCParticle* daughter1 = pi_serv->TrackIdToParticle_P((particleP1->Daughter(i_daugther)));

art::Handle<vector<recob::Hit>> h_hit= /* ... */;
for (int i=0; i<h_hit->size(); i++) {
    art::Ptr<recob::Hit> p_hit(h_hit,i);
}

const simb::MCParticle *particleP = truthUtil.GetMCParticleFromRecoTrack(track,evt,fTrackModuleLabel);
if(!particleP) continue;
const art::Ptr<simb::MCTruth> mcP=pi_serv->TrackIdToMCTruth_P(particleP->TrackId());
if(!mcP) continue;
double distance = 99999
```

```cpp
simb::MCParticle const* mcp_dau1 = pi_serv->TrackIdToParticle_P(mcp->Daughter(i_dau));
simb::MCParticle const& mcp_dau = vh_mcp->at(mcp->Daughter(i_dau)-1); // -1 because the track ID starts at 1
if (v) cout << "\t\t\t\tchecks: dau:" << mcp->Daughter(i_dau) << " vs. pi:" << mcp_dau1->TrackId() << " vs. vh:" << mcp_dau.TrackId() << endl;
```

```cpp
// ????
bt_serv->HitToEveTrackIDEs()
bt_serv->HitToTrackIDEs()
```

### `AnaUtils` Who Gets Who

| From | Get |
| - | - |
| `Hit` | `SpacePoints` |
| `Cluster` | `Hits` |
| `SpacePoint` | `Hits` |
| `Track` | `Hits` `SpacePoints` `PFParticle` |
| `Shower` | `Hits` `SpacePoints` `PFParticle` |
| `PFParticle` | `Hits` `SpacePoints` `Track` `Shower` `Slice` `Vertex` `ChildParticles` `...` |

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