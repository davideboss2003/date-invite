"use client"

import type { BodyPart } from "./anatomy-explorer"
import { BowknotDecoration } from "./bowknot-decoration"
import { cn } from "@/lib/utils"

type OrganInfoPanelProps = {
  bodyPart: BodyPart | null
  onClose: () => void
}

export function OrganInfoPanel({ bodyPart, onClose }: OrganInfoPanelProps) {
  if (!bodyPart) {
    return (
      <div className="w-full max-w-md p-8 rounded-2xl bg-card border border-border text-center">
        <BowknotDecoration size={80} />
        <h3 className="font-serif text-2xl font-semibold text-foreground mt-6 mb-4">
          Selecteaza o Parte a Corpului
        </h3>
        <p className="font-sans text-muted-foreground leading-relaxed">
          Apasa oriunde pe diagrama corpului uman pentru a descoperi lucruri fascinante impreuna.
          Perfect pentru a invata ceva nou  poate pe care nu il stii inca!
        </p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "w-full max-w-md p-8 rounded-2xl bg-card border border-border",
        "animate-in fade-in-0 slide-in-from-right-4 duration-300"
      )}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <BowknotDecoration size={32} />
          <h3 className="font-serif text-2xl font-semibold text-foreground">
            {bodyPart.name}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Close panel"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="space-y-6">
        {/* Fun Fact */}
        <div className="p-4 rounded-xl bg-secondary/50">
          <div className="flex items-center gap-2 mb-2">
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
              className="text-primary"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span className="font-sans font-medium text-sm text-foreground uppercase tracking-wide">
              Stiai Ca?
            </span>
          </div>
          <p className="font-sans text-foreground leading-relaxed">
            {bodyPart.funFact}
          </p>
        </div>

        {/* Mica Nota */}
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
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
              className="text-primary"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="font-sans font-medium text-sm text-primary uppercase tracking-wide">
              O Mica Nota
            </span>
          </div>
          <p className="font-sans text-foreground leading-relaxed italic">
            {bodyPart.romanticNote}
          </p>
        </div>

        {/* Details */}
        <div>
          <h4 className="font-sans font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">
            Afla Mai Multe
          </h4>
          <p className="font-sans text-foreground leading-relaxed">
            {bodyPart.details}
          </p>
        </div>
      </div>
    </div>
  )
}
