"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

type HumanBodyDiagramProps = {
  selectedPart: string | null
  onSelectPart: (partId: string) => void
}

export function HumanBodyDiagram({ selectedPart, onSelectPart }: HumanBodyDiagramProps) {
  const [clickedPart, setClickedPart] = useState<string | null>(null)

  const bodyParts = [
    { id: "brain", label: "Creier", top: "8%", left: "50%", width: "16%", height: "8%" },
    { id: "heart", label: "Inima", top: "30%", left: "54%", width: "10%", height: "8%" },
    { id: "lungs", label: "Plamani", top: "26%", left: "50%", width: "26%", height: "12%" },
    { id: "liver", label: "Ficat", top: "38%", left: "44%", width: "12%", height: "7%" },
    { id: "stomach", label: "Stomac", top: "40%", left: "56%", width: "10%", height: "8%" },
    { id: "kidneys", label: "Rinichi", top: "46%", left: "50%", width: "18%", height: "5%" },
    { id: "skeleton", label: "Oase", top: "60%", left: "50%", width: "22%", height: "14%" },
    { id: "muscles", label: "Muschi", top: "78%", left: "50%", width: "26%", height: "12%" },
  ]

  const handleClick = (partId: string) => {
    setClickedPart(partId)
    onSelectPart(partId)
    setTimeout(() => setClickedPart(null), 600)
  }

  return (
    <div className="relative w-full max-w-[320px] aspect-[1/1.8]">
      {/* Sparkle effects container */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {clickedPart && (
          <>
            {[...Array(12)].map((_, i) => (
              <span
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full animate-sparkle"
                style={{
                  left: '50%',
                  top: '50%',
                  animationDelay: `${i * 50}ms`,
                  transform: `rotate(${i * 30}deg) translateY(-80px)`,
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Female human body silhouette */}
      <svg
        viewBox="0 0 200 360"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cute Bowknot on head */}
        <g className="animate-bow-float">
          {/* Left bow loop */}
          <path
            d="M60 12 Q45 5 50 18 Q55 28 72 22"
            className="fill-primary stroke-primary/80"
            strokeWidth="1"
          />
          {/* Right bow loop */}
          <path
            d="M140 12 Q155 5 150 18 Q145 28 128 22"
            className="fill-primary stroke-primary/80"
            strokeWidth="1"
          />
          {/* Center knot */}
          <ellipse cx="100" cy="18" rx="8" ry="6" className="fill-primary/90" />
          {/* Left ribbon tail */}
          <path
            d="M72 22 Q68 32 65 42"
            className="stroke-primary fill-none"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Right ribbon tail */}
          <path
            d="M128 22 Q132 32 135 42"
            className="stroke-primary fill-none"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>

        {/* Hair */}
        <path
          d="M65 35 Q55 50 58 75 Q60 85 65 90 L65 75 Q70 55 100 50 Q130 55 135 75 L135 90 Q140 85 142 75 Q145 50 135 35 Q125 20 100 18 Q75 20 65 35"
          className="fill-foreground/20 stroke-border"
          strokeWidth="1"
        />
        
        {/* Head - more feminine/rounded */}
        <ellipse cx="100" cy="55" rx="26" ry="28" className="fill-secondary stroke-border" strokeWidth="2" />
        
        {/* Face details - subtle */}
        <ellipse cx="90" cy="52" rx="3" ry="2" className="fill-foreground/10" />
        <ellipse cx="110" cy="52" rx="3" ry="2" className="fill-foreground/10" />
        <path d="M97 62 Q100 64 103 62" className="stroke-primary/40 fill-none" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Neck - slender */}
        <rect x="90" y="80" width="20" height="18" rx="6" className="fill-secondary stroke-border" strokeWidth="2" />
        
        {/* Torso - feminine shape with curves */}
        <path
          d="M65 98 
             Q45 110 48 145 
             Q50 170 55 195
             Q58 210 65 225 
             L80 225 
             Q85 215 88 205
             Q95 195 100 195 
             Q105 195 112 205
             Q115 215 120 225
             L135 225 
             Q142 210 145 195
             Q150 170 152 145 
             Q155 110 135 98 
             Q120 92 100 92
             Q80 92 65 98 Z"
          className="fill-secondary stroke-border"
          strokeWidth="2"
        />
        
        {/* Chest area suggestion - subtle curves */}
        <path
          d="M72 115 Q80 125 88 120"
          className="stroke-border/50 fill-none"
          strokeWidth="1"
        />
        <path
          d="M128 115 Q120 125 112 120"
          className="stroke-border/50 fill-none"
          strokeWidth="1"
        />
        
        {/* Waist definition */}
        <path
          d="M60 170 Q58 180 60 190"
          className="stroke-border/30 fill-none"
          strokeWidth="1"
        />
        <path
          d="M140 170 Q142 180 140 190"
          className="stroke-border/30 fill-none"
          strokeWidth="1"
        />
        
        {/* Left Arm - slender */}
        <path
          d="M48 100 Q30 115 26 155 Q24 180 28 205 Q30 212 36 216 Q40 212 42 205 Q46 175 50 150 Q52 125 55 105"
          className="fill-secondary stroke-border"
          strokeWidth="2"
        />
        
        {/* Right Arm - slender */}
        <path
          d="M152 100 Q170 115 174 155 Q176 180 172 205 Q170 212 164 216 Q160 212 158 205 Q154 175 150 150 Q148 125 145 105"
          className="fill-secondary stroke-border"
          strokeWidth="2"
        />
        
        {/* Skirt/Dress hint */}
        <path
          d="M65 225 Q55 235 50 260 Q48 280 52 300 L70 300 Q72 280 75 260 Q78 240 80 225"
          className="fill-secondary/80 stroke-border"
          strokeWidth="1.5"
        />
        <path
          d="M120 225 Q122 240 125 260 Q128 280 130 300 L148 300 Q152 280 150 260 Q145 235 135 225"
          className="fill-secondary/80 stroke-border"
          strokeWidth="1.5"
        />
        
        {/* Left Leg */}
        <path
          d="M52 300 Q48 320 47 340 Q46 355 50 360 L68 360 Q70 355 70 340 Q70 320 70 300"
          className="fill-secondary stroke-border"
          strokeWidth="2"
        />
        
        {/* Right Leg */}
        <path
          d="M130 300 Q130 320 130 340 Q130 355 132 360 L150 360 Q154 355 153 340 Q152 320 148 300"
          className="fill-secondary stroke-border"
          strokeWidth="2"
        />

        {/* Internal organs (simplified) */}
        {/* Brain */}
        <ellipse cx="100" cy="50" rx="14" ry="10" className="fill-primary/20" />
        
        {/* Heart */}
        <path
          d="M100 120 C92 112 80 115 82 128 C84 136 100 148 100 148 C100 148 116 136 118 128 C120 115 108 112 100 120"
          className="fill-primary/30"
        />
        
        {/* Lungs */}
        <ellipse cx="80" cy="125" rx="13" ry="20" className="fill-accent/20" />
        <ellipse cx="120" cy="125" rx="13" ry="20" className="fill-accent/20" />
        
        {/* Liver */}
        <ellipse cx="82" cy="160" rx="16" ry="10" className="fill-primary/20" />
        
        {/* Stomach */}
        <ellipse cx="115" cy="165" rx="12" ry="14" className="fill-accent/20" />
        
        {/* Kidneys */}
        <ellipse cx="84" cy="185" rx="7" ry="9" className="fill-primary/20" />
        <ellipse cx="116" cy="185" rx="7" ry="9" className="fill-primary/20" />
      </svg>

      {/* Interactive hotspots with fancy animation */}
      {bodyParts.map((part) => (
        <button
          key={part.id}
          onClick={() => handleClick(part.id)}
          className={cn(
            "absolute transform -translate-x-1/2 -translate-y-1/2",
            "rounded-full transition-all duration-300 cursor-pointer",
            "hover:bg-primary/30 hover:scale-110 hover:animate-organ-glow",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            "flex items-center justify-center",
            selectedPart === part.id 
              ? "bg-primary/40 ring-2 ring-primary scale-110" 
              : "bg-transparent hover:bg-primary/20",
            clickedPart === part.id && "animate-pulse-ring"
          )}
          style={{
            top: part.top,
            left: part.left,
            width: part.width,
            height: part.height,
          }}
          aria-label={`Afla despre ${part.label}`}
        >
          <span className={cn(
            "text-xs font-sans font-medium px-2 py-1 rounded-full transition-all whitespace-nowrap",
            selectedPart === part.id 
              ? "bg-primary text-primary-foreground" 
              : "bg-card/80 text-foreground opacity-0 group-hover:opacity-100 hover:opacity-100"
          )}>
            {part.label} - 3D
          </span>
        </button>
      ))}
    </div>
  )
}
