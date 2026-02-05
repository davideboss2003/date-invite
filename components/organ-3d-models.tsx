"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

// Shared pulsing animation hook
function usePulse(ref: React.RefObject<THREE.Group | null>, speed = 1.2) {
  useFrame((state) => {
    if (!ref.current) return
    const scale = 1 + Math.sin(state.clock.elapsedTime * speed) * 0.03
    ref.current.scale.setScalar(scale)
  })
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

// Brain - wrinkled sphere with folds
export function BrainModel() {
  const groupRef = useRef<THREE.Group>(null)
  usePulse(groupRef, 0.8)

  return (
    <group ref={groupRef}>
      {/* Left hemisphere */}
      <mesh position={[-0.35, 0, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#e8b4f8" emissive="#d4a0e8" emissiveIntensity={0.15} roughness={0.6} metalness={0.05} />
      </mesh>
      {/* Right hemisphere */}
      <mesh position={[0.35, 0, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#e8b4f8" emissive="#d4a0e8" emissiveIntensity={0.15} roughness={0.6} metalness={0.05} />
      </mesh>
      {/* Cerebellum */}
      <mesh position={[0, -0.35, -0.2]}>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial color="#d4a0e8" emissive="#c890d8" emissiveIntensity={0.12} roughness={0.5} />
      </mesh>
      {/* Brain stem */}
      <mesh position={[0, -0.65, -0.1]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.4, 12]} />
        <meshStandardMaterial color="#c890d8" emissive="#b880c8" emissiveIntensity={0.1} roughness={0.5} />
      </mesh>
      {/* Decorative folds (ridge lines) */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[-0.35 + i * 0.18, 0.15 + Math.sin(i) * 0.1, 0.45]} rotation={[0, 0, 0.3 * Math.sin(i)]}>
          <capsuleGeometry args={[0.03, 0.25, 6, 12]} />
          <meshStandardMaterial color="#d4a0e8" emissive="#c890d8" emissiveIntensity={0.1} roughness={0.7} />
        </mesh>
      ))}
    </group>
  )
}

// Lungs - two organic shapes with bronchi
export function LungsModel() {
  const groupRef = useRef<THREE.Group>(null)
  usePulse(groupRef, 0.6)

  return (
    <group ref={groupRef}>
      {/* Left lung */}
      <mesh position={[-0.55, 0, 0]} scale={[0.8, 1, 0.6]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color="#ffb6c8" emissive="#ff9ab0" emissiveIntensity={0.12} roughness={0.4} metalness={0.05} />
      </mesh>
      {/* Right lung (slightly bigger) */}
      <mesh position={[0.55, 0, 0]} scale={[0.85, 1, 0.65]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color="#ffb6c8" emissive="#ff9ab0" emissiveIntensity={0.12} roughness={0.4} metalness={0.05} />
      </mesh>
      {/* Trachea */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.6, 12]} />
        <meshStandardMaterial color="#e8909e" emissive="#d0808e" emissiveIntensity={0.1} roughness={0.5} />
      </mesh>
      {/* Left bronchus */}
      <mesh position={[-0.25, 0.35, 0]} rotation={[0, 0, 0.6]}>
        <cylinderGeometry args={[0.05, 0.07, 0.5, 10]} />
        <meshStandardMaterial color="#e8909e" emissive="#d0808e" emissiveIntensity={0.1} roughness={0.5} />
      </mesh>
      {/* Right bronchus */}
      <mesh position={[0.25, 0.35, 0]} rotation={[0, 0, -0.6]}>
        <cylinderGeometry args={[0.05, 0.07, 0.5, 10]} />
        <meshStandardMaterial color="#e8909e" emissive="#d0808e" emissiveIntensity={0.1} roughness={0.5} />
      </mesh>
    </group>
  )
}

// Stomach - squashed blob
export function StomachModel() {
  const groupRef = useRef<THREE.Group>(null)
  usePulse(groupRef)

  return (
    <group ref={groupRef}>
      {/* Main stomach body */}
      <mesh scale={[0.8, 1, 0.6]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#ff85a2" emissive="#ff6b8a" emissiveIntensity={0.12} roughness={0.35} metalness={0.05} />
      </mesh>
      {/* Upper curve (fundus) */}
      <mesh position={[-0.3, 0.45, 0]} scale={[0.7, 0.5, 0.5]}>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshStandardMaterial color="#ff9ab0" emissive="#ff85a2" emissiveIntensity={0.1} roughness={0.4} />
      </mesh>
      {/* Esophagus connection */}
      <mesh position={[-0.15, 0.75, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.08, 0.1, 0.4, 12]} />
        <meshStandardMaterial color="#e07090" emissive="#d06080" emissiveIntensity={0.1} roughness={0.5} />
      </mesh>
      {/* Pylorus (exit) */}
      <mesh position={[0.5, -0.25, 0]} rotation={[0, 0, -0.8]}>
        <cylinderGeometry args={[0.06, 0.1, 0.35, 12]} />
        <meshStandardMaterial color="#e07090" emissive="#d06080" emissiveIntensity={0.1} roughness={0.5} />
      </mesh>
    </group>
  )
}

// Liver - large rounded shape
export function LiverModel() {
  const groupRef = useRef<THREE.Group>(null)
  usePulse(groupRef, 0.5)

  return (
    <group ref={groupRef}>
      {/* Right lobe (larger) */}
      <mesh position={[0.15, 0, 0]} scale={[1.2, 0.7, 0.6]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#d4738c" emissive="#c06378" emissiveIntensity={0.12} roughness={0.4} metalness={0.08} />
      </mesh>
      {/* Left lobe (smaller) */}
      <mesh position={[-0.55, 0.1, 0]} scale={[0.7, 0.55, 0.5]}>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshStandardMaterial color="#d4738c" emissive="#c06378" emissiveIntensity={0.12} roughness={0.4} metalness={0.08} />
      </mesh>
      {/* Gallbladder */}
      <mesh position={[0.35, -0.35, 0.2]} scale={[0.3, 0.5, 0.3]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#a8d48c" emissive="#90bc74" emissiveIntensity={0.1} roughness={0.4} />
      </mesh>
    </group>
  )
}

// Kidneys - two bean shapes
export function KidneysModel() {
  const groupRef = useRef<THREE.Group>(null)
  usePulse(groupRef, 0.7)

  return (
    <group ref={groupRef}>
      {/* Left kidney */}
      <group position={[-0.6, 0, 0]}>
        <mesh scale={[0.45, 0.7, 0.35]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#e8909e" emissive="#d0808e" emissiveIntensity={0.12} roughness={0.35} metalness={0.05} />
        </mesh>
        {/* Indent */}
        <mesh position={[0.15, 0, 0.15]} scale={[0.2, 0.4, 0.15]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#d07888" emissive="#c06878" emissiveIntensity={0.1} roughness={0.5} />
        </mesh>
      </group>
      {/* Right kidney */}
      <group position={[0.6, 0, 0]}>
        <mesh scale={[0.45, 0.7, 0.35]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#e8909e" emissive="#d0808e" emissiveIntensity={0.12} roughness={0.35} metalness={0.05} />
        </mesh>
        {/* Indent */}
        <mesh position={[-0.15, 0, 0.15]} scale={[0.2, 0.4, 0.15]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#d07888" emissive="#c06878" emissiveIntensity={0.1} roughness={0.5} />
        </mesh>
      </group>
      {/* Connecting ureters */}
      <mesh position={[-0.3, -0.35, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
        <meshStandardMaterial color="#d0808e" roughness={0.5} />
      </mesh>
      <mesh position={[0.3, -0.35, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
        <meshStandardMaterial color="#d0808e" roughness={0.5} />
      </mesh>
    </group>
  )
}

// Skeleton - bones and joints
export function SkeletonModel() {
  const groupRef = useRef<THREE.Group>(null)
  usePulse(groupRef, 0.4)

  return (
    <group ref={groupRef}>
      {/* Spine */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 1.8, 12]} />
        <meshStandardMaterial color="#fff5f8" emissive="#ffd4e0" emissiveIntensity={0.1} roughness={0.3} metalness={0.15} />
      </mesh>
      {/* Skull */}
      <mesh position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshStandardMaterial color="#fff5f8" emissive="#ffd4e0" emissiveIntensity={0.1} roughness={0.3} metalness={0.15} />
      </mesh>
      {/* Jaw */}
      <mesh position={[0, 0.85, 0.1]} scale={[0.8, 0.4, 0.6]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#fff0f3" emissive="#ffd4e0" emissiveIntensity={0.08} roughness={0.3} metalness={0.15} />
      </mesh>
      {/* Ribcage - curved bones */}
      {[...Array(6)].map((_, i) => (
        <group key={i} position={[0, 0.5 - i * 0.15, 0]}>
          <mesh position={[-0.25, 0, 0.1]} rotation={[0.3, 0, -0.5]}>
            <capsuleGeometry args={[0.025, 0.3, 6, 10]} />
            <meshStandardMaterial color="#fff5f8" emissive="#ffd4e0" emissiveIntensity={0.08} roughness={0.3} metalness={0.15} />
          </mesh>
          <mesh position={[0.25, 0, 0.1]} rotation={[0.3, 0, 0.5]}>
            <capsuleGeometry args={[0.025, 0.3, 6, 10]} />
            <meshStandardMaterial color="#fff5f8" emissive="#ffd4e0" emissiveIntensity={0.08} roughness={0.3} metalness={0.15} />
          </mesh>
        </group>
      ))}
      {/* Pelvis */}
      <mesh position={[0, -0.7, 0]} scale={[1.2, 0.5, 0.6]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#fff0f3" emissive="#ffd4e0" emissiveIntensity={0.08} roughness={0.3} metalness={0.15} />
      </mesh>
      {/* Shoulder joints */}
      <mesh position={[-0.5, 0.55, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#ffd4e0" roughness={0.3} metalness={0.15} />
      </mesh>
      <mesh position={[0.5, 0.55, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#ffd4e0" roughness={0.3} metalness={0.15} />
      </mesh>
    </group>
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
