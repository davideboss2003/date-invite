"use client"

import { useRef, useState, useEffect, useCallback, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import type * as THREE from "three"
import { organComponents } from "./organ-3d-models"
import { organModels } from "@/lib/organ-geometries"
import type { BodyPart } from "./anatomy-explorer"
import { BowknotDecoration } from "./bowknot-decoration"
import { cn } from "@/lib/utils"

// Floating particles around the organ
function OrbitingParticles({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
  })

  return (
    <group ref={groupRef}>
      {[...Array(20)].map((_, i) => {
        const angle = (i / 20) * Math.PI * 2
        const radius = 1.5 + Math.sin(i * 1.5) * 0.3
        const y = Math.sin(i * 0.8) * 0.8
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              y,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry args={[0.02 + Math.random() * 0.02, 8, 8]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.8}
              transparent
              opacity={0.6 + Math.random() * 0.4}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Auto-rotation when user is not dragging
function AutoRotate({ targetRef, isDragging }: { targetRef: React.RefObject<THREE.Group | null>; isDragging: boolean }) {
  useFrame((_, delta) => {
    if (!targetRef.current || isDragging) return
    targetRef.current.rotation.y += delta * 0.5
  })
  return null
}

// Main 3D organ scene
function OrganScene({ organId, isDragging, organRef }: { organId: string; isDragging: boolean; organRef: React.RefObject<THREE.Group | null> }) {
  const OrganComponent = organComponents[organId]
  const modelData = organModels[organId]

  if (!OrganComponent || !modelData) return null

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#fff5f8" />
      <directionalLight position={[-3, 3, -3]} intensity={0.3} color="#e8b4f8" />
      <pointLight position={[0, 0, 3]} intensity={0.5} color={modelData.emissiveColor} />
      <spotLight position={[0, 5, 0]} intensity={0.4} angle={0.5} penumbra={0.8} color="#ffd4e0" />

      <Environment preset="studio" />

      <group ref={organRef}>
        <OrganComponent />
      </group>

      <OrbitingParticles color={modelData.emissiveColor} />

      <AutoRotate targetRef={organRef} isDragging={isDragging} />
    </>
  )
}

type Organ3DViewerProps = {
  organId: string
  bodyPart: BodyPart
  onClose: () => void
}

export function Organ3DViewer({ organId, bodyPart, onClose }: Organ3DViewerProps) {
  const organRef = useRef<THREE.Group>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [zoom, setZoom] = useState(1)
  const lastMouseRef = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0, y: 0 })

  const modelData = organModels[organId]

  // Entrance animation
  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true))
    return () => setIsVisible(false)
  }, [])

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  // Mouse/touch drag rotation
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true)
    lastMouseRef.current = { x: e.clientX, y: e.clientY }
    velocityRef.current = { x: 0, y: 0 }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || !organRef.current) return
    const dx = e.clientX - lastMouseRef.current.x
    const dy = e.clientY - lastMouseRef.current.y
    organRef.current.rotation.y += dx * 0.008
    organRef.current.rotation.x += dy * 0.008
    velocityRef.current = { x: dx * 0.008, y: dy * 0.008 }
    lastMouseRef.current = { x: e.clientX, y: e.clientY }
  }, [isDragging])

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    setZoom((prev) => Math.max(0.5, Math.min(2.0, prev - e.deltaY * 0.001)))
  }, [])

  // Double click to reset
  const handleDoubleClick = useCallback(() => {
    if (organRef.current) {
      organRef.current.rotation.set(0, 0, 0)
    }
    setZoom(1)
  }, [])

  // Zoom controls
  const zoomIn = useCallback(() => setZoom((prev) => Math.min(2.0, prev + 0.15)), [])
  const zoomOut = useCallback(() => setZoom((prev) => Math.max(0.5, prev - 0.15)), [])
  const resetView = useCallback(() => {
    if (organRef.current) {
      organRef.current.rotation.set(0, 0, 0)
    }
    setZoom(1)
  }, [])

  if (!modelData) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center transition-all duration-500",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-foreground/60 backdrop-blur-md transition-opacity duration-500",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Content */}
      <div
        className={cn(
          "relative z-10 w-full max-w-5xl mx-4 flex flex-col lg:flex-row gap-6 items-stretch transition-all duration-500",
          isVisible ? "scale-100 translate-y-0" : "scale-75 translate-y-8"
        )}
      >
        {/* 3D Viewer */}
        <div
          ref={containerRef}
          className="relative flex-1 min-h-[350px] lg:min-h-[500px] rounded-2xl overflow-hidden bg-foreground/10 backdrop-blur-lg border border-primary/20"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onWheel={handleWheel}
          onDoubleClick={handleDoubleClick}
          style={{ cursor: isDragging ? "grabbing" : "grab", touchAction: "none" }}
        >
          <Suspense fallback={
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <Canvas
              camera={{ position: [0, 0, 3.5], fov: 50 }}
              style={{ background: "transparent" }}
              gl={{ alpha: true, antialias: true }}
            >
              <OrganScene organId={organId} isDragging={isDragging} organRef={organRef} />
              {/* Apply zoom via camera */}
              <CameraZoom zoom={zoom} />
            </Canvas>
          </Suspense>

          {/* Drag hint overlay */}
          <div className={cn(
            "absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm text-foreground text-sm font-sans flex items-center gap-2 transition-opacity duration-300 pointer-events-none",
            isDragging ? "opacity-0" : "opacity-70"
          )}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 9l4-4 4 4" /><path d="M15 15l-4 4-4-4" /><path d="M9 5v14" />
              <path d="M19 9l4-4" /><path d="M19 15l4 4" />
            </svg>
            Trage pentru a roti
          </div>

          {/* Zoom controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); zoomIn() }}
              className="w-10 h-10 rounded-xl bg-card/80 backdrop-blur-sm text-foreground flex items-center justify-center hover:bg-card transition-colors border border-border/50"
              aria-label="Zoom in"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); zoomOut() }}
              className="w-10 h-10 rounded-xl bg-card/80 backdrop-blur-sm text-foreground flex items-center justify-center hover:bg-card transition-colors border border-border/50"
              aria-label="Zoom out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); resetView() }}
              className="w-10 h-10 rounded-xl bg-card/80 backdrop-blur-sm text-foreground flex items-center justify-center hover:bg-card transition-colors border border-border/50"
              aria-label="Reset view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose() }}
            className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-card/80 backdrop-blur-sm text-foreground flex items-center justify-center hover:bg-card transition-colors border border-border/50"
            aria-label="Inchide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Info Panel */}
        <div className={cn(
          "w-full lg:w-80 rounded-2xl bg-card/95 backdrop-blur-lg border border-border p-6 flex flex-col transition-all duration-500 delay-200",
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
        )}>
          <div className="flex items-center gap-3 mb-6">
            <BowknotDecoration size={32} />
            <h3 className="font-serif text-2xl font-semibold text-foreground">
              {bodyPart.name}
            </h3>
          </div>

          <div className="space-y-5 flex-1 overflow-y-auto">
            {/* Fun Fact */}
            <div className="p-4 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <span className="font-sans font-medium text-xs text-foreground uppercase tracking-wide">
                  Stiai Ca?
                </span>
              </div>
              <p className="font-sans text-sm text-foreground leading-relaxed">
                {bodyPart.funFact}
              </p>
            </div>

            {/* Romantic Note */}
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span className="font-sans font-medium text-xs text-primary uppercase tracking-wide">
                  O Mica Nota
                </span>
              </div>
              <p className="font-sans text-sm text-foreground leading-relaxed italic">
                {bodyPart.romanticNote}
              </p>
            </div>

            {/* Details */}
            <div>
              <h4 className="font-sans font-medium text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Afla Mai Multe
              </h4>
              <p className="font-sans text-sm text-foreground leading-relaxed">
                {bodyPart.details}
              </p>
            </div>
          </div>

          {/* Bottom controls */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-border">
            <button
              onClick={resetView}
              className="flex-1 px-4 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-sans text-sm font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
              Reset
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-sans text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Inchide
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Camera zoom component
function CameraZoom({ zoom }: { zoom: number }) {
  useFrame((state) => {
    const targetZ = 3.5 / zoom
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.1
    state.camera.updateProjectionMatrix()
  })
  return null
}
