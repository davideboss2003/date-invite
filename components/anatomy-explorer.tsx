"use client"

import { useState } from "react"
import { HumanBodyDiagram } from "./human-body-diagram"
import { OrganInfoPanel } from "./organ-info-panel"
import { BowknotDecoration } from "./bowknot-decoration"

export type BodyPart = {
  id: string
  name: string
  funFact: string
  romanticNote: string
  details: string
}

const bodyPartsData: Record<string, BodyPart> = {
  brain: {
    id: "brain",
    name: "Creierul",
    funFact: "Creierul tau continua sa formeze neuroni noi toata viata - un proces numit neurogeneza! In plus, creierul tau consuma 20% din toata energia corpului, desi reprezinta doar 2% din greutatea ta.",
    romanticNote: "Creierul elibereaza oxitocina - hormonul imbratisarilor - care te face sa te simti conectat cu cei din jur.",
    details: "In 2024, cercetatorii au descoperit ca creierul are propriul sistem de curatare numit 'sistemul glimfatic' care functioneaza doar cand dormi. De aceea somnul este crucial - creierul se spala literal de toxine noaptea!",
  },
  heart: {
    id: "heart",
    name: "Inima",
    funFact: "Inima are propriul 'mini-creier' - aproximativ 40.000 de neuroni care pot simti, invata si aminti independent! De aceea spunem ca 'simtim cu inima'.",
    romanticNote: "Inima poate bate chiar si in afara corpului, atata timp cat primeste oxigen - este complet autonoma!",
    details: "Descoperire recenta: inima emite un camp electromagnetic de 60 de ori mai puternic decat creierul, care poate fi detectat la cativa metri distanta. Corpul tau este mai conectat cu mediul decat crezi!",
  },
  lungs: {
    id: "lungs",
    name: "Plamanii",
    funFact: "Plamanii sunt singurii organe care pot pluti pe apa! Si mai uimitor - plamanul stang este cu 10% mai mic pentru a face loc inimii.",
    romanticNote: "Respiratia constienta poate schimba imediat starea ta emotionala - e ca un buton de reset pentru sistemul nervos.",
    details: "Cercetari din 2023 au aratat ca plamanii nu sunt doar pentru respiratie - produc si celule sanguine! Aproximativ 10 milioane de trombocite pe ora. Plus, microbiomul pulmonar (bacterii benefice) influenteaza direct starea ta de spirit.",
  },
  stomach: {
    id: "stomach",
    name: "Stomacul",
    funFact: "Stomacul tau are un 'al doilea creier' cu 500 de milioane de neuroni! Produce 95% din serotonina corpului - hormonul fericirii. De aceea emotiile iti afecteaza stomacul.",
    romanticNote: "Fluturii in stomac sunt reali - sunt neuronii enterici care reactioneaza la emotiile intense!",
    details: "Stiinta a confirmat recent: microbiomul intestinal (miliarde de bacterii) comunica direct cu creierul prin 'axa intestin-creier'. Felul in care mananci chiar iti afecteaza gandurile si emotiile!",
  },
  liver: {
    id: "liver",
    name: "Ficatul",
    funFact: "Ficatul poate regenera complet dintr-o bucata de doar 25%! E singurul organ care face asta. Plus, proceseaza alcoolul la viteza de exact un pahar de vin pe ora.",
    romanticNote: "Ficatul tau stocheaza suficiente vitamine pentru a supravietui luni de zile fara aport extern - e ca o baterie de rezerva!",
    details: "Descoperire uimitoare din 2024: ficatul are un 'ceas intern' propriu si functiile lui variaza dramatic in functie de ora. Metabolismul tau e complet diferit dimineata fata de seara - de aceea conteaza CAND mananci!",
  },
  kidneys: {
    id: "kidneys",
    name: "Rinichii",
    funFact: "Rinichii tai filtreaza tot sangele din corp de 400 de ori pe zi! Au peste 1 milion de unitati de filtrare numite nefroni - daca le-ai intinde, ar masura 16 kilometri.",
    romanticNote: "Rinichii mentin echilibrul perfect in corp, reglandu-ti automat tot - de la tensiune la nivelul de energie.",
    details: "Cercetarile recente au aratat ca rinichii produc hormoni care controleaza tensiunea arteriala si chiar producerea de celule rosii. Plus, pot 'simti' nivelul de oxigen din sange si ajusteaza totul automat!",
  },
  skeleton: {
    id: "skeleton",
    name: "Sistemul Osos",
    funFact: "Oasele tale sunt mai puternice decat otelul la aceeasi greutate! Si mai fascinant - scheletul tau este complet nou la fiecare 10 ani, inlocuit celula cu celula.",
    romanticNote: "Imbratisarile regulate imbunatatesc densitatea osoasa - contactul fizic chiar iti intareste oasele!",
    details: "Descoperire revolutionara: oasele sunt de fapt un organ endocrin! Produc osteocalcina, un hormon care afecteaza memoria, metabolismul si chiar fertilitatea. Scheletul tau e mult mai 'viu' decat crezi.",
  },
  muscles: {
    id: "muscles",
    name: "Sistemul Muscular",
    funFact: "Muschii tai au memorie! Daca ai fost vreodata in forma, corpul 'isi aminteste' si revine mai repede. Se numeste 'memorie musculara' si dureaza ani de zile.",
    romanticNote: "Zambetul autentic foloseste 17 muschi, iar creierul poate detecta diferenta dintre un zambet real si unul fals in milisecunde.",
    details: "Stiinta a descoperit recent ca muschii produc 'miokine' - molecule care actioneaza ca mesageri intre muschi si creier. Exercitiul fizic elibereaza aceste molecule care imbunatatesc memoria si reduc depresia!",
  },
}

export function AnatomyExplorer() {
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null)

  return (
    <section className="py-12 md:py-20 relative">
      {/* Decorative bowknots */}
      <div className="absolute top-20 left-5 opacity-15 rotate-[-15deg]">
        <BowknotDecoration size={60} />
      </div>
      <div className="absolute bottom-20 right-5 opacity-15 rotate-[15deg]">
        <BowknotDecoration size={60} />
      </div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Poti explora
          </h2>
          <p className="font-sans text-muted-foreground max-w-lg mx-auto">
            Apasa pe diferite parti ale corpului pentru a descoperi lucruri fascinante
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
          {/* Human Body Diagram */}
          <div className="flex justify-center">
            <HumanBodyDiagram
              selectedPart={selectedPart?.id || null}
              onSelectPart={(partId) => setSelectedPart(bodyPartsData[partId] || null)}
            />
          </div>

          {/* Info Panel */}
          <div className="flex justify-center lg:sticky lg:top-8">
            <OrganInfoPanel
              bodyPart={selectedPart}
              onClose={() => setSelectedPart(null)}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
