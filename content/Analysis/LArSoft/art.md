---
title: art
subtitle: event-processing framework
image: art.png
summary: "..."
---


## Event 

## InputTag {github="https://github.com/art-framework-suite/canvas/blob/9f64aa0ab4190aa3a2d6f0698e6b21e1bc951b38/canvas/Utilities/InputTag.h#L12"}

```cpp { noheader="true" }
#include "canvas/Utilities/InputTag.h"
```

An `art::InputTag` identifies a data product by three `std::string`. 

```cpp
// constructors
art::InputTag it("label::process");
art::InputTag it("label:instance");
art::InputTag it("label");
art::InputTag it("label","instance");

// getters
it.label();
it.instance();
it.process();
```

Labels, instances and processes of data products can by retrieved by 

```bash
lar -c eventdump.fcl file.root -n 1
```

``` { noheader="true" }
(...)
Begin processing the 1st record. run: 1 subRun: 0 event: 1 at 17-Jan-2025 08:00:54 CST
PRINCIPAL TYPE: Event
PROCESS NAME | MODULE LABEL... | PRODUCT INSTANCE NAME......... | DATA PRODUCT TYPE.................................................... | ..SIZE
SinglesGen.. | cosmicgenerator | .............................. | std::vector<simb::MCTruth>........................................... | .....1
SinglesGen.. | TriggerResults. | .............................. | art::TriggerResults.................................................. | .....1
G4Stage1.... | largeant....... | .............................. | sim::ParticleAncestryMap............................................. | .....-
(...)
```

## Handle { github="https://github.com/art-framework-suite/art/blob/develop/art/Framework/Principal/Handle.h#L287" }

```cpp { noheader="true" }
#include "art/Framework/Principal/Handle.h"
```

`art::ValidHandle` is used to retrieve data products in an `analyzer`

```cpp
void LArSoftModule::analyze(const art::Event& e) {

    std::string label = "...";
    std::string instance = "...";
    art::InputTag tag(label, instance);

    art::ValidHandle<std::vector<DataProductType>> valid_handle = e.getValidHandle(tag);
    for (DataProductType const& obj : *valid_handle) {
        /* ... */
    }
}
```


> Handle: Non-owning "smart pointer" for reference to EDProducts and their Provenances.
>
> ValidHandle: A Handle that can not be invalid, and thus does not check for validity upon dereferencing.
>
> Handles can have:
>
> - Product and Provenance pointers both null;
> - Both pointers valid
>
> ValidHandles must have Product and Provenance pointers valid.

`Handle` private members [`Handle.h#L97`](https://github.com/art-framework-suite/art/tree/develop/art/Framework/Principal/Handle.h#L97)

`ValidHandle` private members [`Handle.h#L287`](https://github.com/art-framework-suite/art/tree/develop/art/Framework/Principal/Handle.h#L287)

`ev.getValidHandle` herited from [`ProductRetriever.h#L266`](https://github.com/art-framework-suite/art/tree/develop/art/Framework/Principal/ProductRetriever.h#L266)

`ev.getHandle` herited from [`ProductRetriever.h#L250`](https://github.com/art-framework-suite/art/tree/develop/art/Framework/Principal/ProductRetriever.h#L250)

`getByLabel_` herited from [`ProductRetriever.h#L201`](https://github.com/art-framework-suite/art/tree/develop/art/Framework/Principal/ProductRetriever.cc#L201)

Constructor: `Handle(GroupQueryResult)` [`Handle.h#L142`](https://github.com/art-framework-suite/art/blob/develop/art/Framework/Principal/Handle.h#L142)

`ev.getByLabel` herited from [`ProductRetriever.h#L442`](https://github.com/art-framework-suite/art/tree/develop/art/Framework/Principal/ProductRetriever.h#L442)

- `gallery::` "version simplifié des objets art pour des macros"
- `art::` "à utiliser pour écrire un module LArSoft"


[`gallery::ValidHandle`]() is an alternative used in a macro

```cpp
gallery::Event e({"file.root"});
art::InputTag tag("label:instance");
gallery::ValidHandle<vector<DataProductType>> valid_handle=e.getValidHandle(tag);
for (size_t i=0; i<myValidHandle->size(); i++) {
    myType myObj = myValidHandle->at(i);

    /* analysis */
}
```

## Art Pointers { github="https://github.com/art-framework-suite/canvas/blob/develop/canvas/Persistency/Common/Ptr.h#L76" }

```cpp { noheader="true" }
#include "canvas/Persistency/Common/Ptr.h"
```

`art::Ptr<Type>` is "a persistent smart pointer to an item in a collection that is a data product". 

| method | description |
| - | - |
| `size_t key()` | uniquely identifying the data product |
| `Type* get()` | standard pointer to the data product |

## Object Association

Prompt the list of available associations and there respective labels

```bash
lar -c eventdump.fcl file.root -n 1 | grep Assns
```

``` { noheader="true" }
(...)
PROCESS NAME | MODULE LABEL... | PRODUCT INSTANCE NAME......... | DATA PRODUCT TYPE.................................................... | ..SIZE
Reco........ | pandora........ | .............................. | art::Assns<recob::PFParticle,recob::SpacePoint,void>................. | .16339
Reco........ | pandoraShower.. | .............................. | art::Assns<recob::Shower,recob::Hit,void>............................ | ..1407
Reco........ | pandora........ | .............................. | art::Assns<recob::PFParticle,recob::Slice,void>...................... | ...234
Reco........ | hitpdune....... | .............................. | art::Assns<recob::Wire,recob::Hit,void>.............................. | .18205
(...)
```

In general those relation are true

|              |              |         |          |              |       |
| ------------ | ------------ | ------- | -------- | ------------ | ----- |
| `->`         | `PFParticle` | `Track` | `Shower` | `SpacePoint` | `Hit` |
| `PFParticle` | -            | 0 \| 1  | 0 \| 1   | many         |       |
| `Track`      | 1            | -       | -        | many         | many  |
| `Shower`     | 1            | -       | -        |              | many  |
| `SpacePoint` | 0 \| 1       | -       |          | -            | 1     |
| `Hit`        |              | 0 \| 1  | 0 \| 1   | 0 \| 1       | -     |
|              |              |         |          |              |       |

Use [`art::FindOneP`](https://code-doc.larsoft.org/docs/latest/html/FindOneP_8h_source.html) for 1 -> 0 | 1 association and [`art::FindManyP`](https://code-doc.larsoft.org/docs/latest/html/FindManyP_8h_source.html) for a 1 -> many association

```cpp { label="e.g. Shower -> PFParticle and Hits"}
#include "canvas/Persistency/Common/FindManyP.h"
void LArSoftModule::analyze(const art::Event& e) {

    art::InputTag tag_pfp("pandora");
    art::InputTag tag_shw("pandoraShower");

    auto const & vh_shw = e.getValidHandle<std::vector<recob::Shower>>(tag_shw);
    std::vector<art::Ptr<recob::Shower>> vp_shw;
    art::fill_ptr_vector(vp_shw, vh_shw);

    art::FindOneP<recob::PFParticle> fop_shw2pfp(vh_shw, e, tag_pfp);
    art::FindManyP<recob::Hit> fmp_shw2hit(vh_shw, e, tag_shw);

    for (art::Ptr<recob::Shower> const& p_shw : vp_shw) {

        art::Ptr<recob::PFParticle> p_pfp = fop_shw2pfp(p_shw.key());
        std::vector<art::Ptr<recob::Hit>> vp_hit = fmp_shw2hit.at(p_shw.key());

        for (art::Ptr<recob::Hit> const& p_hit : vp_hit) {
            /* ... */
        }
    }
}
```


### [`dunereco/AnaUtils/`](https://github.com/DUNE/dunereco/blob/develop/dunereco/AnaUtils)

```cpp
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

```cpp
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

## Truth Object Associations

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