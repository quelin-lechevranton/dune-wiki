---
title: Detector Properties
summary: "..."
---

## Geometry

[larcore/Geometry](https://github.com/LArSoft/larcore/tree/develop/larcore/Geometry)

[larcorealg/Geometry](https://github.com/LArSoft/larcorealg/tree/develop/larcorealg/Geometry)

```cpp
#include "larcore/Geometry/Geometry.h"
const geo::Geometry* fGeom;
fGeom = &*art::ServiceHandle<geo::Geometry>();
```

`geo::Geometry`
| members | description |
| - | - |
| `Cryostat(geo::CryostatID)` | `(geo::CryostatGeo: public BoxBoundedGeo)` |
| `TPC(geo::TPCID)` | `(geo::TPCGeo: public BoxBoundedGeo)` |
| `NTPC()` | `(unsigned int)` |
| `Nplanes()` | `(unsigned int)` |
| `Nwires(geo::PlaneID)` | `(unsigned int)` |

`geo::BoxBoundedGeo`
| members | description | 
| - | - |
| `Min()` | `(geo::Point_t)` |
| `Max()` | `(geo::Point_t)` |
| `MinX()` | `(double) Min().X()` |

`geo::CryostatGeo`
| members | description | 
| - | - |
| `BoundingBox()` | `(geo::BoxBoundedGeo) (*this)` |
| `Width()` | `(double)` |

`geo::WireReadoutGeom.h`
| members | description |
| - | - |
| `Nchannels()` | `(unsigned int)` |
| `ChannelToWire(raw::ChannelID_t)` | `(vecotr<geo::WireID>)` |
| `View(raw::ChannelID_t)` | `(geo::View_t)` |
| `NearestChannel(geo::Point_t,geo::PlaneID)` | `(raw::ChannelID_t)` |
| `PlaneWireToChannel(geo::WireID)` | `(raw::ChannelID_t)` |

## DetectorPropertiesService

[lardata/DectorInfoServices](https://github.com/LArSoft/lardata/tree/develop/lardata/DetectorInfoServices)

[lardataalg/DetectorInfo](https://github.com/LArSoft/lardataalg/tree/develop/lardataalg/DetectorInfo)

```cpp
const detinfo::DetectorPropertiesService* fDetProp;
const detinfo::DetectorClocksService* fDetClocks; 

const detinfo::DetectorClocksData clockData = fDetClocks->DataForJob();
const detinfo::DetectorPropertiesData detProp = fDetProp->DataForJob(clockData);
```

```cpp
DataForJob(detinfo::DetectorClocksService);
DataFor(art::Event, detinfo::DetectorClocksService);
```