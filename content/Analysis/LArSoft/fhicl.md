---
title: FHiCL
subtitle: Fermilab Hierarchical Configuration Language
image: fnal.svg
summary: "..."
---

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

```flc
# https://indico.ph.ed.ac.uk/event/130/contributions/1737/attachments/1083/1506/Simulation_Tutorial_LArSoft_Workshop_2022.pdf
# https://indico.ph.ed.ac.uk/event/126/contributions/1646/attachments/988/1441/LArSoft_Tutorial_2.pdf
#=======BASICS=========

#start a line comment, exept if # is follwed by include
#include "file.fcl"
#path in the FHICL_FILE_PATH environment variable
#for better maintenance, only include fhicl files with prologs

#assignation:
parameter:  value               #atom
table: {key1: val1 key2: val2}  
sequence: [val1, val2, val3]    

#values: either a number, a block/table, a vector/sequence or a double-quote string
MyInt:      1
MyFloat:    1.0
MyBlock:    { key1: value1 key2: value2 }
MyVector:   [ 1.0, 2e-1, 3 ]
MyString:   "one"

#substitutions
x: @local::table.key1
newTable: {
    #@table doesn't include the braces
    @table::table
    key3:   val3
}
#@sequence doesn't include the brackets (depreciated?)
newSequence: [@sequence::sequence, val4]

#table and sequence access
x: table.key1   #x has value: val1
y: sequence[0]  #x has value: val1

#adding elements
table.key3:     val3    #is legal
sequence[3]:    val4    #is legal


BEGIN_PROLOG
#what's here won't be kept in the final configuration
#it'll only be used for substitutions
END_PROLOG
#final onfiguration can be retrieved with: $ fhicl-dump file.fcl

#======?????????????????

w: x #w has value x (alpha start string, equivalent to "x" or 'x')
# ???????????
y: @local::x 
v: @table::? 

BlockExample: {
    Name:   "Example"
    Number: 1
}
MyBlock:    @local::BlockExample
#the value of MyBlock.Name is "Example" ?


#=======TYPICAL STRUCTURE========

BEGIN_PROLOG
parameters: {
    particles:["e","mu"]
}

END_PROLOG

services: {
    TFileService:   { ??? }
    para1:          value1
    para2:          value2
}

source: 
{
    module_type:    RootInput           #or EmptyEvent for Monte Carlo generation (no inputfile)
    maxEvents:      -1                  #can be specified in command line with: $ lar -c this.fcl -n 10
    fileNames:      [ "path/to/inputfile.root" ]   #can be specified in command line with: $ lar -c this.fcl inputfile.root
}

outputs: {
    ??:             RootOutput          #it is possible to have multiple outputs, somehow
}

physics: {
    producers: {            #uses the class art/Framework/Core/EDProducer.h
        generator: {
            module_type:    "EventGenerator"
            particles:      @local::parameters.particles
        }
    }
    analyzers: {            #uses the class art/Framework/Core/EDAnalyzer.h
        event_printer: {    #this is the 'service' or 'module instance'
            module_type:    "PrintEventNumber"
            LogLevel:       2
            particles:      @local::parameters.particles
        }
    }
    filters: {              #uses the class art/Framework/Core/EDFilter.h

    }

    #two other obscure keywords:
    trigger_paths:      ????
    end_paths:          ????
}


#override parameters: 
#block access one by one, last value always prevails
services.para1:     newValue1
physics.analyzers.printevt.module_type: "NewModuleType"

#but: 
physics.analyzers.printevt: { module_type: "NewMooduleType"} #WRONG
#would effectively delete the LogLevel parameter
#and actually is forbidden because it changes the size of the printevt block

#but:
physics.analyzers.printevt.NewParameter: 1.0
#this is valid, it add a paramter and its value to the printevt block
```