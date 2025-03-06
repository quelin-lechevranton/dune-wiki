---
title: 'Installation'
subtitle: 'instructions for a local LArSoft installation'
notoc: true
---

[source](https://gitlab.in2p3.fr/dune-france/dune-orsay/-/wikis/LArSoft), 
[LArSoft versions](https://larsoft.github.io/LArSoftWiki/releases/LArSoft_release_list.html)


```bash {label=".bash_profile"}
alias app="/cvmfs/oasis.opensciencegrid.org/mis/apptainer/current/bin/apptainer shell\
    --shell=/bin/bash\
    -B /cvmfs,/exp,/nashome,${BIND}/opt,/run/user,/etc/hostname,/etc/hosts,/etc/krb5.conf\
    --ipc\
    --pid /cvmfs/singularity.opensciencegrid.org/fermilab/fnal-dev-sl7:latest/"
```

load the Apptainer, then execute `install_larsoft.sh` in a new directory

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
#!/bin/bash

source /cvmfs/dune.opensciencegrid.org/products/dune/setup_dune.sh
source localProducts_larsoft_v10_01_02d00_prof_e26/setup
mrbsetenv && mrbslp
```

```bash {label="build_larsoft.sh"}
#!/bin/bash

cd $MRB_BUILDDIR
mrbsetenv && mrb i -j16 && mrbslp
```


## MRB

[here](https://cdcvs.fnal.gov/redmine/projects/mrb/wiki/MrbRefereceGuide)

| command | alias | arguments |
| - | - | - |
| `mrb newDev` | `mrb n` | `-v $VERSION -q $QUALIFIER` |
| `mrb gitCheckout` | `mrb g` | |
| `mrb install` | `mrb i` | `-j $CORE_NUMBER` |
| `mrbsetenv` | | |
| `mrbslp` | | |



DUNE event display ?

## Analyzer

```bash
cetskelgen -v -d /path/to/dir -e beginJob -e endJob analyzer namespace::ModuleName
```
