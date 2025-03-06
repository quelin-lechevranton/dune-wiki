---
title: ROOT
summary: "..."
---

## ?

```cpp
TF1 f1("f1","formula",parameters); 
TF1 *f1=new TF1("f1","formula",parameters);

R__ADD_INCLUDE_PATH("...")
ReadFileList(n_file,"path/to/file.list")
```

```cpp
TCanvas* c = new TCanvas("c","c");
c->cd();
for ( int i=0; i!=255; i++) { 
  ss << "#color[" << i << "]{" << i << "} "; 
  if (i%20==0) { 
    l.DrawLatex(0,1.-1./255.*i,ss.str().c_str());
    ss.str("");
  }
}
```

`TFile file("file.root")` vs `TFile* file=TFile::Open("file.root")`

`new TBrowser` vs `TBrowser b`

`.include` `.class`

## Arborescence LArSoft in ROOT

```cpp
$ root path/to/file.root
root[] new TBrowser
root[] Events / ns::class_some_module_name / nm::class_some_module_name.obj / a / b / c
```

## Draw with ROOT

```cpp
$ root
root[] TFile *_file0 = TFile::Open("path/to/file")
root[] _file0->cd()
root[] Events->GetListOfBranches()->ls()
root[] Events->Draw("ns::class_some_module_name.obj.a.b.c","...","","")
```

## Access in macro C

```cpp
gallery::Event ev("path/to/file.root");
art::InputTag module_tag(some:module:name);
auto const obj_list = ev.getValidHandle<vector<ns::class>>(module_tag);
ns::class& obj = obj_list->at(index);
obj.a() #only access to the methods (leaves with a red bang ! on it, leaves with names like ...()), thoses are only seen in TBrowser if larsoft was previously set up
//how to access the other leaves ???
```

## Examples

```cpp
f1.SetParameter(parameter_id,parameter_value);

Events -> GetListOfBranches() -> ls() //print list of branches in the tree Events
Events->Draw("varY:varX>>hXY(nBinX,minX,maxX,nBinY,minY,maxY)","condition","drawing_option")
Events->Draw("anab::Calorimetrys_pandoraStdcalo__Reco.obj.fdEdx:(anab::Calorimetrys_pandoraStdcalo__Reco.obj.fRange-anab::Calorimetrys_pandoraStdcalo__Reco.obj.fResidualRange)","","colZ")
Events->Draw("simb::MCParticles_largeant__G4.obj.ftrajectory.ftrajectory.first.fP.fX:simb::MCParticles_largeant__G4.obj.ftrajectory.ftrajectory.first.fP.fY>>hXY(150,-125,25,300,100,400)","simb::MCParticles_largeant__G4.obj.fpdgCode==13","")
Events->sim::SimEnergyDeposits_largeant_LArG4DetectorServicevolTPCActive_G4Stage1.obj.startPos.fCoordinates.Theta()
Events->simb::MCTruths_cosmicgenerator__SinglesGen.obj.fPartList.Py()/simb::MCTruths_cosmicgenerator__SinglesGen.obj.fPartList.P()
```

```cpp
root [3] tree->Draw("OpT0>>hT0(50,1.602,1.608)","","")
(long long) 50
root [4] hT0->SetLineColor(kGreen-2)
root [5] hT0->GetXaxis()->SetTitle("T0 (us)")
root [6] hT0->GetYaxis()->SetTitle("Slices")
root [7] hT0->SetStats(0)
root [8] c1->Modified()
```


## Classes

`TF1`
`TH1F`
`TROOT`
`TUnixSystem`
`TCling`
`TTree::Draw()`

```ROOT
TNamed <- TObject .
```

| | | | | |
| - | - | - | - | - |
| `TObject` | `TNamed` | `TDirectory` | `TDirectoryFile` | `TFile` |
| `TAtt*` | | `TTree` | | |

```ROOT
TFile <- TDirectoryFile <- TDirectory <- TNamed
```

`TDirectory` has the methods `cd()`, `ls()` and `pwd()` that can be access with `.ls` and `.pwd` in `Cling` for the current `TDirectory`

```ROOT
TTree <- TNamed <-
      <- TAttLine .
      <- TAttFill .
      <- TAttMarker .
```

```ROOT
TBranchElement <- TBranche <- TNamed <-
               <- TAttFill .
```

## File Navigation

```cpp
TFile file("file.root");
TObject* obj = file.Get("path/to/obj");
TTree* tree = file.Get<TTree>("path/to/obj");
TTree* tree = (TTree*) file.Get("path/to/obj");
TTree* tree; file.GetObject("path/to/obj",tree);
```

```cpp
$ root file.root
root[] _file0->cd()
(bool) true
root[] .ls //alternatively: root[] _file0->ls()
TFile**
 TFile*
  KEY: TDirectoryFile tdf;1 tdf (tdf) folder
  KEY: <rootClass> <identifier;namecycle> <identifier> <?>
  KEY: <rootClass> <identifier;namecycle> <identifier> <?>
root[] tdf->cd()
root[] .pwd //alternatively: root[] tdf->pwd()
Current directory: file.root:/tdf
Current style:     Modern
root[] .ls //alternatively: root[] tdf->ls()
TDirectoryFile* tdf;1 tdf (tdf) folder
  KEY: TTree tt;1 tt
  // (...)
root[] tt->GetListOfBranched()->ls()
OBJ: TObjArray TObjArray An array of objects : ??
 OBJ: TBranch var var : ?? at 0x4bfcef0
 OBJ: TBranch <identifier> <leaflist> : ?? at <address>
 OBJ: TBranchElement // (...)
```

```cpp
TFile* file=TFile::Open("file.root");
TTree* tt= (TTree*) file->Get("tdf/tt"); //Get() returns a TObject*

tt->GetListOfBranches()->ls(); //print in stdout

type_t* var=nullptr; //pointers should always be initialized
tt->SetBranchAddress("b1",&var);
//TBranch* b1 = tt->GetBranch("b1");
//b1->SetAddress(&var);
for (int i=0; i< tt->GetEntries(); i++) {
    tt->GetEntries(i); //var is now the pointer to the value of b1 for the event #i
}

```

## `TColor` {root="https://root.cern.ch/doc/master/classTColor.html"}

```cpp
typedef short Color_t;
enum { kWhite=0, kBlack=1, kRed=632, kGreen=416 } //and so on
// 2 also gives red

Color_t TColor::GetColor(int r, int g, int b, float a); // int [0,255]
Color_t TColor::GetColor(float r, float g, float b, float a); // float [0,1]
Color_t TColor::GetColor(const char *hex);


```

[RtypesCore.h](https://root.cern.ch/doc/master/RtypesCore_8h_source.html#l00092)
[Rtypes.h](https://root.cern.ch/doc/master/Rtypes_8h_source.html#l00065)
[TColor.h](https://root.cern.ch/doc/master/TColor_8h_source.html)
[TColor.cxx](https://root.cern.ch/doc/master/TColor_8cxx_source.html)

## Random Notes

`SetMarkerSize(size_t msize)` doesn't affect default marker size `SetMarkerStyle(20)` is needed.

`TGraph2D::GetXaxis->SetTitle("");` doesn't work

### Change GUI fonts

in `$HOME/.rootrc`

```rootrc
Gui.DefaultFont:            -Arial-medium-r-*-*-16-*-*-*-*-*-iso8859-1
Gui.DefaultFont:            -Arial-medium-r-*-*-16-*-*-*-*-*-iso8859-1
Gui.MenuFont:               -Arial-medium-r-*-*-16-*-*-*-*-*-iso8859-1
Gui.MenuHiFont:             -Arial-bold-r-*-*-16-*-*-*-*-*-iso8859-1
Gui.DocFixedFont:           -Cascadia Mono-medium-r-*-*-16-*-*-*-*-*-iso8859-1
Gui.DocPropFont:            -Arial-medium-r-*-*-16-*-*-*-*-*-iso8859-1
Gui.IconFont:               -Arial-medium-r-*-*-14-*-*-*-*-*-iso8859-1
Gui.StatusFont:             -Arial-medium-r-*-*-16-*-*-*-*-*-iso8859-1
```

## `ROOT::RDataFrame` & `TTree`

[__ROOT architecture and components__](https://root.cern/manual/root_architecture_and_components/)

[`TTree` __tuto__](https://root.cern/manual/trees/#introducing-ttree)

[`TTree::Draw()`](https://root.cern.ch/doc/master/classTTree.html#a73450649dc6e54b5b94516c468523e45)

`TTree::Scan()` ?

[`TTree::AddFriend()`](https://root.cern.ch/doc/master/classTTree.html#a011d362261b694ee7dd780bad21f030b)

[`TChain::TChain()`](https://root.cern.ch/doc/master/classTChain.html#a53f013071a6d8ebef98a19fefacb4160)

```cpp
int a;            //pourquoi pas un pointer??
vector<int>* b;
tree->SetBranchAddress("branch_a", &a);
tree->SetBranchAddress("branch_b", &b);
```

```cpp
TChain c("a/c");
TChain d("a/d");
c.AddFriend("a/d");
c.Draw("v1:d.v2","","");
```

[`RDataFrame`](https://root.cern/doc/master/classROOT_1_1RDataFrame.html)

[__dataframe__](https://root.cern/doc/master/group__dataframe.html)

[`RDataFrame::Graph`](https://root.cern/doc/master/classROOT_1_1RDF_1_1RInterface.html#a1ca9a94bece4767cac82968910afa02e)

[__Tutorials__](https://root.cern/doc/master/group__tutorial__dataframe.html)

### Constructors

```cpp
ROOT::RDataFrame rdf("treename","file.root");
```

### Filter()

```cpp
ROOT::RDF::RInterface<ROOT::Detail::RDF::RJittedFilter, void> &
```

```cpp
bool condition (/**/) {/**/};
rdf.Filter("condition(fX)");

```

## TH2



## TGraph2D


## RVec

```cpp
root [1] namespace rv = ROOT:: VecOps;
root [2] double summing(rv::RVec<double> v) { double s=0, p=0; rv::Map(rv::Sort(v), [&s, &p](auto x){ if (x != p) s+=x; p=x; return 0; }); return s; };
root [3] rv::RVec<double> ww = { 122,352,364,4,3756,385,6734,75,6,56,56,6,6,665,6,56,56,56,56,56,56,56,56,63,6,63,63,663,63,36,663,66,63,36,3,636,663,663,663,663,663,663,663 }
(ROOT::VecOps::RVec<double> &) { 122.00000, 352.00000, 364.00000, 4.0000000, 3756.0000, 385.00000, 6734.0000, 75.000000, 6.0000000, 56. 000000, 56.000000, 6.0000000, 6.0000000, 6.0000000, 56.000000, 56.000000, 56.000000, 56.000000, 56.000000, 56.000000, 56.000000, 56.000000, 63.000000, 6.0000000, 63.000000, 63.000000, 663.00000, 63.000000, 36.0000000, 66.000000, 63.000000, 36.000000, 3.0000000, 636.00000, 663.00000, 663.00000, 663.00000, 663.00000, 663.00000, 663.00000, 663.00000 }
root [4] rv::Sum(ww)
(double) 20106.000
root [5] summing(ww)
(double) 13986.000
```

```cpp
root [O] namespace rv = ROOT:: VecOps;
root [1] rv::RVec<double> w = {124, 35,26,423, 62,524,67,4,86,4} ;
root [2] double p =-1;
root [3] rv::Sum(rv::Map(w, [](auto x){ return x != p ? X : 0; }))
(double) 1355.0000
root [4] double s=0;
root [5] rv::Map(w, [](auto x){ if (x#p) s+=x; return 0; })
(ROOT::VecOps::decltype(MapImpl(std::get<std::tuple_size<tuple<RVec<double> &, (lambda) &> >::value - 1>(t), std::get<OUL>(t)))) { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 }
root [6] s
(double) 1355.0000
```

```cpp
double s=0; { double p=-1; rv::Map(rv::Sort(v), [&p,&s] (auto x){ if(x!=p) s+=x; p=x; return 0; });}
```