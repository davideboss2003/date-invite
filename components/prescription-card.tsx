"use client";

import { useState } from "react";
import { BowknotDecoration } from "./bowknot-decoration";

export function PrescriptionCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAccept = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  return (
    <div className="relative perspective-1000">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 30}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              <BowknotDecoration size={20 + Math.random() * 20} />
            </div>
          ))}
        </div>
      )}

      {/* Flip Card Container */}
      <div
        className={`relative w-full max-w-xl mx-auto transition-transform duration-700 transform-style-3d cursor-pointer ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={() => !isFlipped && setIsFlipped(true)}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front - Prescription */}
        <div
          className={`bg-card/95 backdrop-blur-sm rounded-3xl p-8 md:p-10 border-2 border-primary/30 shadow-2xl backface-hidden ${
            isFlipped ? "invisible" : ""
          }`}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Prescription Header */}
          <div className="border-b-2 border-dashed border-primary/30 pb-4 mb-6">
            <div className="flex items-center justify-between">
              <BowknotDecoration size={40} />
              <BowknotDecoration size={40} />
            </div>
            <p className="text-muted-foreground text-sm mt-2 font-sans text-center">
              Cabinet Medical Dr Inginer Davide
            </p>
          </div>

          {/* Patient Info */}
          <div className="mb-6 text-left">
            <p className="text-muted-foreground text-sm font-sans mb-1">
              Pacient:
            </p>
            <p className="font-serif text-xl text-foreground font-semibold">
              Monica Pavel
            </p>
          </div>

          {/* Prescription Content */}
          <div className="bg-secondary/50 rounded-2xl p-6 mb-6 text-left">
            <p className="text-muted-foreground text-sm font-sans mb-3 uppercase tracking-wide">
              Prescriptie:
            </p>
            <p className="font-serif text-lg md:text-xl text-foreground leading-relaxed mb-4">
              O întâlnire cu potențial ridicat rasete si voie buna cu conversații autentice și momente simple, dar speciale
            </p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-sm font-sans">
                Dozaj: cat de des iti doreste inimioara
              </span>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-8 text-left">
            <p className="text-muted-foreground text-sm font-sans mb-2 uppercase tracking-wide">
              Indicatii:
            </p>
            <p className="font-sans text-foreground">
              Se recomandă într-un cadru plăcut, cu cafea bună sau o plimbare relaxantă
            </p>
          </div>

           <div className="mb-8 text-left">
            <p className="text-muted-foreground text-sm font-sans mb-2 uppercase tracking-wide">
              Efecte secundare:
            </p>
            <p className="font-sans text-foreground">
              Reducerea stresului cotidian, îmbunătățirea dispoziției generale, tendința de a zâmbi fără explicații clinice
            </p>
          </div>

          {/* Signature */}
          <div className="border-t-2 border-dashed border-primary/30 pt-4 mb-6 text-left">
            
            <p className="font-serif text-2xl text-primary italic mt-2">
              Cu drag
            </p>
          </div>

          {/* Wildcard hint */}
          <div className="text-center">
            <p className="text-muted-foreground text-base md:text-lg font-sans mb-4 animate-pulse tracking-wide">
             Apasa pentru a vedea tratamentul complet...
            </p>
          </div>
        </div>

        {/* Back - Invitation */}
        <div
          className={`absolute inset-0 bg-card/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 border-2 border-primary/30 shadow-2xl rotate-y-180 backface-hidden ${
            !isFlipped ? "invisible" : ""
          }`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex justify-center mb-6">
            <BowknotDecoration size={60} />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-8 text-balance">
            O Intrebare Speciala
          </h2>
          <p className="font-serif text-xl md:text-2xl text-foreground leading-relaxed mb-4 text-balance">
            Daca as avea onoarea si privilegiul sa te scot in oras, mi-ar face mare placere!
          </p>
          <p className="font-serif text-2xl md:text-3xl text-primary font-semibold mb-8 text-balance">
            Ce zici, ai dori sa iesim?
          </p>

          {/* Accept Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAccept();
            }}
            className="group relative px-8 py-4 bg-primary text-primary-foreground font-sans font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Accept Tratamentul
            </span>
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-0 group-hover:opacity-100" />
          </button>
        </div>
      </div>
    </div>
  );
}
