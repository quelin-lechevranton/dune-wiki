---
title: Detector
subtitle: 'detector properties and geometry information'
---

## Detector Structure

### Protodune vertical-drift

![pdvd_tpc](/dune-wiki/img/pdvd.pdf)

Wires: 0 -> 291


## Geometry Information { github="https://github.com/LArSoft/larcorealg/tree/develop/larcorealg/Geometry" }

### Simple types {github="https://github.com/LArSoft/larcoreobj/blob/develop/larcoreobj/SimpleTypesAndConstants"}

| [`RawTypes.h`](https://github.com/LArSoft/larcoreobj/blob/develop/larcoreobj/SimpleTypesAndConstants/RawTypes.h) | description |
| - | - |
| `raw::ChannelID_t` | `unsigned int` or `raw::ChannelID_t::InvalidChannelID`|

| [`geo_types.h`](https://github.com/LArSoft/larcoreobj/blob/develop/larcoreobj/SimpleTypesAndConstants/geo_types.h) | description |
| - | - |
| `geo::View_t` | `enum { kU, kV, kW, ..., kUnknown }` |

| [`geo_vectors.h`](https://github.com/LArSoft/larcoreobj/blob/develop/larcoreobj/SimpleTypesAndConstants/geo_vectors.h) | description |
| - | - |
| `geo::Length_t` | `double` |
| `geo::Point_t` | [`PositionVector3D<double>`](https://root.cern.ch/doc/master/classROOT_1_1Math_1_1PositionVector3D.html) |
| `geo::Vector_t` | [`DisplacementVector3D<double>`](https://root.cern.ch/doc/master/classROOT_1_1Math_1_1DisplacementVector3D.html) |

```cpp {label="geo_types.h"}
namespace geo {

struct CryostatID {
    using CryostatID_t = unsigned int;
    constexpr CryostatID_t InvalidID = ...;
    CryostatID_t Cryostat;

    bool isValid;
    string toString();
    operator bool() { return isValid; };
    operator string();
}
struct TPCID : public CryostatID {
    using TPCID_t = unsigned int;
    using ParentID_t = CryostatID;
    TPCID_t TPC;

    ParentID_t& ParentID();
}
struct PlaneID : public TPCID {
    using PlaneID_t = unsigned int;
    using ParentID_t = TPCID;
    PlaneID_t Plane;

    ParentID_t& ParentID();
}
struct WireID : public PlaneID {
    using WireID_t = unsigned int;
    using ParentID_t = PlaneID;
    WireID_t Wire;

    ParentID_t& ParentID();
}
} // end namespace geo
```

### Geometry { github="https://github.com/LarSoft/larcore/tree/develop/larcore/Geometry/Geometry.h"}

```cpp
#include "larcore/Geometry/Geometry.h"
const geo::Geometry* asGeo;
asGeo = &*art::ServiceHandle<geo::Geometry>();
```

| [`geo::GeometryCore`](https://github.com/LArSoft/larcorealg/blob/develop/larcorealg/Geometry/GeometryCore.h) | return |
| - | - |
| `Cryostat(geo::CryostatID)` | `(geo::CryostatGeo: public BoxBoundedGeo)` |
| `TPC(geo::TPCID)` | `(geo::TPCGeo: public BoxBoundedGeo)` |
| `NTPC()` | `(unsigned int)` |
| `Nplanes()` | `(unsigned int)` |
| `Nwires(geo::PlaneID)` | `(unsigned int)` |

| [`geo::BoxBoundedGeo`](https://github.com/LArSoft/larcorealg/blob/develop/larcorealg/Geometry/BoxBoundedGeo.h) | return | 
| - | - |
| `Min()` | `(geo::Point_t)` |
| `Max()` | `(geo::Point_t)` |
| `MinX()` | `(double) Min().X()` |
| `ContainsX(double x, double w=1.0)` | `w=.8` -> 20% margin on each side |
| `ContainsYZ(double,double,double)` | `(bool)` |
| `ContainsPosition(geo::Point_t,double)` | `(bool)` |
| `InFiducialX(double x, double m)` | `m` is the margin in cm |

### Wire readout { github="https://github.com/LArSoft/larcorealg/blob/develop/larcorealg/Geometry/WireReadoutGeom.h" }

```cpp
#include "larcore/Geometry/WireReadout.h"
const geo::WireReadoutGeom* asWire;
asWire = &art::ServiceHandle<geo::WireReadout>()->Get();
```

| [`geo::WireReadoutGeom`](https://github.com/LArSoft/larcorealg/blob/develop/larcorealg/Geometry/WireReadoutGeom.h) | return |
| - | - |
| `Nchannels()` | `(unsigned int)` |
| `ChannelToWire(raw::ChannelID_t)` | `(vecotr<geo::WireID>)` |
| `View(raw::ChannelID_t)` | `(geo::View_t)` |
| `NearestChannel(geo::Point_t,geo::PlaneID)` | `(raw::ChannelID_t)` |
| `PlaneWireToChannel(geo::WireID)` | `(raw::ChannelID_t)` |
| `WireEndPoints(geo::WireID)` | `(pair<Point_t,Point_t>)` |

| [`WireGeo.h`](https://github.com/LArSoft/larcorealg/blob/develop/larcorealg/Geometry/WireGeo.h#L526) | return |
| - | - |
| `geo::WiresIntersection(WireGeo,WireGeo)` | `(geo::Point_t)` `x=-341.55` |

## Detector Properties

[lardata/DectorInfoServices](https://github.com/LArSoft/lardata/tree/develop/lardata/DetectorInfoServices)

[lardataalg/DetectorInfo](https://github.com/LArSoft/lardataalg/tree/develop/lardataalg/DetectorInfo)

```cpp
const detinfo::DetectorPropertiesService* asDetProp;
const detinfo::DetectorClocksService* asDetClocks;
asDetProp = &*art::ServiceHandle<detinfo::DetectorPropertiesService>();    
asDetClocks = &*art::ServiceHandle<detinfo::DetectorClocksService>();

// in beginJob() or endJob():
const detinfo::DetectorClocksData clockData = asDetClocks->DataForJob();
const detinfo::DetectorPropertiesData detProp = asDetProp->DataForJob(clockData);

// in an event loop (art::Event const& e):
const detinfo::DetectorClocksData clockData = asDetClocks->DataFor(e);
const detinfo::DetectorPropertiesData detProp = asDetProp->DataFor(e, clockData);
```

| | |
| - | - |
| `detinfo::sampling_rate(clockData)` | sampling rate in ns/tick |
| `detProp.DriftVelocity()` | drift electrons velocity in cm/µs |



