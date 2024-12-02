---
title: 'Installation'
summary: 'Instruction for a local LArSoft installation'
---

## subtitle

[version](https://larsoft.github.io/LArSoftWiki/releases/LArSoft_release_list.html)

### bonjour

```bash {label="install_larsoft.sh"}
#!/bin/bash

VERSION=v10_01_02d00
QUAL=e26

source /cvmfs/dune.opensciencegrid.org/products/dune/setup_dune.sh
mrb newDev -f -v ${VERSION} -q prof:${QUAL}
source localProducts_larsoft_${VERSION}_prof_${QUAL}/setup

cd $MRB_SOURCE
mrb g -t ${VERSION} dunesw
mrb g -t ${VERSION} protoduneana
mrb g -t ${VERSION} duneprototypes
mrb g -t ${VERSION} dunereco
```

```bash {label="source_larsoft.sh"}
source /cvmfs/dune.opensciencegrid.org/products/dune/setup_dune.sh
source $MRB_TOP/localProducts_larsoft_v09_91_04d00_prof_e26/setup
mrbsetenv && mrbslp
```

```bash {label="build_larsoft.sh"}
cd $MRB_BUILDDIR
mrbsetenv && mrb i -j16 && mrbslp
```
