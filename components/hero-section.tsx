"use client"

import { BowknotDecoration } from "./bowknot-decoration"

export function HeroSection() {
  return (
    <header className="relative overflow-hidden py-16 md:py-24">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 opacity-20">
        <BowknotDecoration size={120} />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 rotate-12">
        <BowknotDecoration size={100} />
      </div>
      <div className="absolute top-1/2 right-1/4 opacity-10 -rotate-6">
        <BowknotDecoration size={80} />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <BowknotDecoration size={40} />
          <span className="text-muted-foreground font-sans uppercase tracking-[0.3em] text-sm">
            Dedicat viitoarei doctorițe Monica Pavel
          </span>
          <BowknotDecoration size={40} />
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-semibold text-foreground mb-6 text-balance">
          Scrisoare Magica
        </h1>

        <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
          O calatorie prin minunile corpului uman, pe care in curand il vei cunoaste mai bine decat oricine.
        </p>

        <div className="flex items-center justify-center gap-2 text-primary">
         
          
        
        </div>
      </div>
    </header>
  )
}
