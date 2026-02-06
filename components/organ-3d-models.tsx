"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { organModels } from "@/lib/organ-geometries"

// Shared pulsing animation
function usePulse(ref: React.RefObject<THREE.Group | null>, speed = 1.2) {
  useFrame((state) => {
    if (!ref.current) return
    const scale = 1 + Math.sin(state.clock.elapsedTime * speed) * 0.03
    ref.current.scale.setScalar(scale)
  })
}

// GLB loader - solid colors only, NO textures
function GlbOrganModel({ glbPath, color, emissiveColor, emissiveIntensity, pulseSpeed = 0.8 }: {
  glbPath: string
  color: string
  emissiveColor: string
  emissiveIntensity: number
  pulseSpeed?: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF(glbPath)
  usePulse(groupRef, pulseSpeed)

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    const box = new THREE.Box3().setFromObject(clone)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)
    const maxDim = Math.max(size.x, size.y, size.z)
    const scaleFactor = maxDim > 0 ? 3.5 / maxDim : 1
    clone.scale.multiplyScalar(scaleFactor)
    clone.position.set(-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor)

    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => { if (m.map) m.map.dispose(); m.dispose() })
        } else if (child.material) {
          if (child.material.map) child.material.map.dispose()
          child.material.dispose()
        }
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(color),
          emissive: new THREE.Color(emissiveColor),
          emissiveIntensity,
          roughness: 0.45,
          metalness: 0.08,
          side: THREE.DoubleSide,
        })
      }
    })
    return clone
  }, [scene, color, emissiveColor, emissiveIntensity])

  return <group ref={groupRef}><primitive object={clonedScene} /></group>
}

export function BrainModel() {
  const d = organModels.brain
  return d.glbPath ? <GlbOrganModel glbPath={d.glbPath} color={d.color} emissiveColor={d.emissiveColor} emissiveIntensity={d.emissiveIntensity} pulseSpeed={0.8} /> : null
}

export function HeartModel() {
  const d = organModels.heart
  return d.glbPath ? <GlbOrganModel glbPath={d.glbPath} color={d.color} emissiveColor={d.emissiveColor} emissiveIntensity={d.emissiveIntensity} pulseSpeed={1.8} /> : null
}

export function LungsModel() {
  const d = organModels.lungs
  return d.glbPath ? <GlbOrganModel glbPath={d.glbPath} color={d.color} emissiveColor={d.emissiveColor} emissiveIntensity={d.emissiveIntensity} pulseSpeed={0.6} /> : null
}

export function StomachModel() {
  const d = organModels.stomach
  return d.glbPath ? <GlbOrganModel glbPath={d.glbPath} color={d.color} emissiveColor={d.emissiveColor} emissiveIntensity={d.emissiveIntensity} pulseSpeed={1.2} /> : null
}

export function LiverModel() {
  const d = organModels.liver
  return d.glbPath ? <GlbOrganModel glbPath={d.glbPath} color={d.color} emissiveColor={d.emissiveColor} emissiveIntensity={d.emissiveIntensity} pulseSpeed={0.5} /> : null
}

export function KidneysModel() {
  const d = organModels.kidneys
  return d.glbPath ? <GlbOrganModel glbPath={d.glbPath} color={d.color} emissiveColor={d.emissiveColor} emissiveIntensity={d.emissiveIntensity} pulseSpeed={0.7} /> : null
}

export function SkeletonModel() {
  const d = organModels.skeleton
  return d.glbPath ? <GlbOrganModel glbPath={d.glbPath} color={d.color} emissiveColor={d.emissiveColor} emissiveIntensity={d.emissiveIntensity} pulseSpeed={0.4} /> : null
}

export function MusclesModel() {
  const d = organModels.muscles
  return d.glbPath ? <GlbOrganModel glbPath={d.glbPath} color={d.color} emissiveColor={d.emissiveColor} emissiveIntensity={d.emissiveIntensity} pulseSpeed={1.0} /> : null
}

export const organComponents: Record<string, React.ComponentType> = {
  brain: BrainModel,
  heart: HeartModel,
  lungs: LungsModel,
  stomach: StomachModel,
  liver: LiverModel,
  kidneys: KidneysModel,
  skeleton: SkeletonModel,
  muscles: MusclesModel,
}

// Preload all models
Object.values(organModels).forEach((m) => { if (m.glbPath) useGLTF.preload(m.glbPath) })
