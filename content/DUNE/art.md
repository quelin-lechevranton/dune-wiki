---
title "art: FNAL event processing framework"
linkTitle: art
summary: "..."
---

`echo $CANVAS_DIR`

## InputTag

### private members

```C++
class InputTag {
    //(...)
private:
    std::string label_{};       //it.label()
    std::string instance_{};    //it.instance()
    std::string process_{};     //it.process()
};
```

### Constructor

```C++
InputTag::InputTag(string const& s)
{
//     InputTag it("label::process");  -> it.instance(): ""
//     InputTag it("label:instance");  -> it.process(): ""
//     InputTag it("label");           -> it.instance(), it.process(): ""
}
InputTag::InputTag("label","instance");
```

### Examples: constructor calls

```C++

```

## Handles

- `gallery::` "version simplifié des objets art pour des macros"
- `art::` "à utiliser pour écrire un module LArSoft"

```C++
void myModule::analyze(const art::Event& ev) {
    /* my analysis */
}
```

[`Handle.h`](https://github.com/art-framework-suite/art/tree/develop/art/Framework/Principal/Handle.h)

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

`ValidHandle` private members [``Handle.h#L287``](https://github.com/art-framework-suite/art/tree/develop/art/Framework/Principal/Handle.h#L287)

`ev.getValidHandle` herited from [``ProductRetriever.h#L266``](https://github.com/art-framework-suite/art/tree/develop/art/Framework/Principal/ProductRetriever.h#L266)

`ev.getHandle` herited from [``ProductRetriever.h#L250``](https://github.com/art-framework-suite/art/tree/develop/art/Framework/Principal/ProductRetriever.h#L250)

`getByLabel_` herited from [``ProductRetriever.h#L201``](https://github.com/art-framework-suite/art/tree/develop/art/Framework/Principal/ProductRetriever.cc#L201)

Constructor: `Handle(GroupQueryResult)` [``Handle.h#L142``](https://github.com/art-framework-suite/art/blob/develop/art/Framework/Principal/Handle.h#L142)

`ev.getByLabel` herited from [`ProductRetriever.h#L442`](https://github.com/art-framework-suite/art/tree/develop/art/Framework/Principal/ProductRetriever.h#L442)

### Examples

#### in a module

```C++
void myModule::analyzer(const art::Event& ev) {
    string myLabel="label";
    string myInstance="instance";
    art::Handle<vector<myType>> myHandle;
    ev.getByLabel(myLabel,myInstance,myHandle);
    if (myHandle.isValid()) {
        for (myType myObj : *myHandle) {
            /* analysis */
        }
    }
}
```

```C++
void myModule::analyzer(const art::Event& ev) {
    art::InputTag myTag("label:instance");
    art::ValidHandle<vector<myType>> myValidHandle=ev.getValidHandle(myTag);
    for (size_t i=0; i<myValidHandle.product()->size(); i++) {
        myType myObj = myValidHandle.product()->at(i)
        //myType myObj = myValidHandle->at(i)
        //myType myObj = (*myValidHandle)[i]
        //myType myObj = myValidHandle()->at(i) (not in gallery::)
        
        /* analysis */
    }
}
```

#### in a macro

```C++
gallery::Event ev({"file.root"});
art::InputTag myTag("label:instance");
gallery::ValidHandle<vector<myType>> myValidHandle=ev.getValidHandle(myTag);
for (size_t i=0; i<myValidHandle->size(); i++) {
    myType myObj = myValidHandle->at(i);

    /* analysis */
}
```

[`Ptr.h`](https://github.com/art-framework-suite/canvas/blob/develop/canvas/Persistency/Common/Ptr.h)

> a Ptr is a persistent smart pointer to an item in a collection
