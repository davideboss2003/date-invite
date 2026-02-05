"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { organModels } from "@/lib/organ-geometries"

// Shared pulsing animation hook
function usePulse(ref: React.RefObject<THREE.Group | null>, speed = 1.2) {
  useFrame((state) => {
    if (!ref.current) return
    const scale = 1 + Math.sin(state.clock.elapsedTime * speed) * 0.03
    ref.current.scale.setScalar(scale)
  })
}

// Generic GLB model loader - used for any organ that has a .glb file
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

  // Clone and apply custom materials
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)

    // Compute a bounding box to auto-center and auto-scale the model
    const box = new THREE.Box3().setFromObject(clone)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)

    // Normalize to fit within ~1.5 units
    const maxDim = Math.max(size.x, size.y, size.z)
    const targetSize = 1.5
    const scaleFactor = maxDim > 0 ? targetSize / maxDim : 1
    clone.scale.multiplyScalar(scaleFactor)

    // Center the model
    clone.position.set(
      -center.x * scaleFactor,
      -center.y * scaleFactor,
      -center.z * scaleFactor
    )

    // Apply themed materials to all meshes
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(color),
          emissive: new THREE.Color(emissiveColor),
          emissiveIntensity,
          roughness: 0.45,
          metalness: 0.08,
        })
        child.material = mat
      }
    })

    return clone
  }, [scene, color, emissiveColor, emissiveIntensity])

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
  )
}

// Heart - stylized shape using spheres and cone
export function HeartModel() {
  const groupRef = useRef<THREE.Group>(null)
  usePulse(groupRef, 1.8)

  return (
    <group ref={groupRef}>
      {/* Left lobe */}
      <mesh position={[-0.45, 0.3, 0]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color="#ff85a2" emissive="#ff6b8a" emissiveIntensity={0.25} roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Right lobe */}
      <mesh position={[0.45, 0.3, 0]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color="#ff85a2" emissive="#ff6b8a" emissiveIntensity={0.25} roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Bottom cone */}
      <mesh position={[0, -0.3, 0]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.7, 1.2, 32]} />
        <meshStandardMaterial color="#ff7090" emissive="#ff6b8a" emissiveIntensity={0.2} roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Aorta */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.5, 16]} />
        <meshStandardMaterial color="#e06080" emissive="#ff6b8a" emissiveIntensity={0.15} roughness={0.4} />
      </mesh>
      {/* Left artery */}
      <mesh position={[-0.25, 0.85, 0]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.06, 0.08, 0.35, 12]} />
        <meshStandardMaterial color="#d45575" emissive="#ff6b8a" emissiveIntensity={0.15} roughness={0.4} />
      </mesh>
      {/* Right artery */}
      <mesh position={[0.25, 0.85, 0]} rotation={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.06, 0.08, 0.35, 12]} />
        <meshStandardMaterial color="#d45575" emissive="#ff6b8a" emissiveIntensity={0.15} roughness={0.4} />
      </mesh>
    </group>
  )
}

// Brain - loads real .glb model
export function BrainModel() {
  const data = organModels.brain
  if (!data.glbPath) return null
  return (
    <GlbOrganModel
      glbPath={data.glbPath}
      color={data.color}
      emissiveColor={data.emissiveColor}
      emissiveIntensity={data.emissiveIntensity}
      pulseSpeed={0.8}
    />
  )
}

// Lungs - loads real .glb model
export function LungsModel() {
  const data = organModels.lungs
  if (!data.glbPath) return null
  return (
    <GlbOrganModel
      glbPath={data.glbPath}
      color={data.color}
      emissiveColor={data.emissiveColor}
      emissiveIntensity={data.emissiveIntensity}
      pulseSpeed={0.6}
    />
  )
}

// Stomach - loads real .glb model
export function StomachModel() {
  const data = organModels.stomach
  if (!data.glbPath) return null
  return (
    <GlbOrganModel
      glbPath={data.glbPath}
      color={data.color}
      emissiveColor={data.emissiveColor}
      emissiveIntensity={data.emissiveIntensity}
      pulseSpeed={1.2}
    />
  )
}

// Liver - loads real .glb model
export function LiverModel() {
  const data = organModels.liver
  if (!data.glbPath) return null
  return (
    <GlbOrganModel
      glbPath={data.glbPath}
      color={data.color}
      emissiveColor={data.emissiveColor}
      emissiveIntensity={data.emissiveIntensity}
      pulseSpeed={0.5}
    />
  )
}

// Kidneys - loads real .glb model
export function KidneysModel() {
  const data = organModels.kidneys
  if (!data.glbPath) return null
  return (
    <GlbOrganModel
      glbPath={data.glbPath}
      color={data.color}
      emissiveColor={data.emissiveColor}
      emissiveIntensity={data.emissiveIntensity}
      pulseSpeed={0.7}
    />
  )
}

// Skeleton - loads real .glb model
export function SkeletonModel() {
  const data = organModels.skeleton
  if (!data.glbPath) return null
  return (
    <GlbOrganModel
      glbPath={data.glbPath}
      color={data.color}
      emissiveColor={data.emissiveColor}
      emissiveIntensity={data.emissiveIntensity}
      pulseSpeed={0.4}
    />
  )
}

// Muscles - organic blob shapes
export function MusclesModel() {
  const groupRef = useRef<THREE.Group>(null)
  usePulse(groupRef, 1.0)

  return (
    <group ref={groupRef}>
      {/* Torso muscles */}
      <mesh position={[0, 0.2, 0]} scale={[0.7, 0.9, 0.45]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#e06080" emissive="#ff6b8a" emissiveIntensity={0.15} roughness={0.4} metalness={0.05} />
      </mesh>
      {/* Left bicep */}
      <mesh position={[-0.7, 0.35, 0]} rotation={[0, 0, 0.3]} scale={[0.3, 0.6, 0.3]}>
        <sphereGeometry args={[0.4, 24, 24]} />
        <meshStandardMaterial color="#e8708a" emissive="#ff6b8a" emissiveIntensity={0.12} roughness={0.4} />
      </mesh>
      {/* Right bicep */}
      <mesh position={[0.7, 0.35, 0]} rotation={[0, 0, -0.3]} scale={[0.3, 0.6, 0.3]}>
        <sphereGeometry args={[0.4, 24, 24]} />
        <meshStandardMaterial color="#e8708a" emissive="#ff6b8a" emissiveIntensity={0.12} roughness={0.4} />
      </mesh>
      {/* Left quad */}
      <mesh position={[-0.25, -0.6, 0]} scale={[0.3, 0.7, 0.3]}>
        <sphereGeometry args={[0.4, 24, 24]} />
        <meshStandardMaterial color="#d06080" emissive="#ff6b8a" emissiveIntensity={0.1} roughness={0.4} />
      </mesh>
      {/* Right quad */}
      <mesh position={[0.25, -0.6, 0]} scale={[0.3, 0.7, 0.3]}>
        <sphereGeometry args={[0.4, 24, 24]} />
        <meshStandardMaterial color="#d06080" emissive="#ff6b8a" emissiveIntensity={0.1} roughness={0.4} />
      </mesh>
      {/* Abs detail */}
      {[...Array(3)].map((_, i) => (
        <group key={i}>
          <mesh position={[-0.1, 0.35 - i * 0.2, 0.25]} scale={[0.15, 0.12, 0.08]}>
            <sphereGeometry args={[0.5, 12, 12]} />
            <meshStandardMaterial color="#c85575" emissive="#ff6b8a" emissiveIntensity={0.08} roughness={0.5} />
          </mesh>
          <mesh position={[0.1, 0.35 - i * 0.2, 0.25]} scale={[0.15, 0.12, 0.08]}>
            <sphereGeometry args={[0.5, 12, 12]} />
            <meshStandardMaterial color="#c85575" emissive="#ff6b8a" emissiveIntensity={0.08} roughness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Mapping of organ IDs to components
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

// Preload all .glb models for instant display
Object.values(organModels).forEach((model) => {
  if (model.glbPath) {
    useGLTF.preload(model.glbPath)
  }
})
