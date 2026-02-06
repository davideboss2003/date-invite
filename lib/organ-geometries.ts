// Organ color palette (pink/lavender theme)
export const ORGAN_COLORS = {
  primary: "#ff85a2",
  secondary: "#ffb6c8",
  light: "#ffd4e0",
  lavender: "#e8b4f8",
  white: "#fff5f8",
  glow: "#ff6b8a",
} as const

// Organ data for 3D models
export type OrganModelData = {
  id: string
  name: string
  description: string
  color: string
  emissiveColor: string
  emissiveIntensity: number
  glbPath?: string // optional path to a .glb model in /public/models/
}

// Get base path for production (GitHub Pages)
const basePath = typeof window !== 'undefined' && window.location.hostname.includes('github.io') 
  ? '/date-invite' 
  : ''

export const organModels: Record<string, OrganModelData> = {
  brain: {
    id: "brain",
    name: "Creierul",
    description: "Drag pentru a roti",
    color: ORGAN_COLORS.lavender,
    emissiveColor: ORGAN_COLORS.lavender,
    emissiveIntensity: 0.15,
    glbPath: `${basePath}/models/brain.glb`,
  },
  heart: {
    id: "heart",
    name: "Inima",
    description: "Drag pentru a roti",
    color: ORGAN_COLORS.primary,
    emissiveColor: ORGAN_COLORS.glow,
    emissiveIntensity: 0.2,
    glbPath: `${basePath}/models/heart.glb`,
  },
  lungs: {
    id: "lungs",
    name: "Plamanii",
    description: "Drag pentru a roti",
    color: ORGAN_COLORS.secondary,
    emissiveColor: ORGAN_COLORS.secondary,
    emissiveIntensity: 0.1,
    glbPath: `${basePath}/models/lungs.glb`,
  },
  stomach: {
    id: "stomach",
    name: "Stomacul",
    description: "Drag pentru a roti",
    color: ORGAN_COLORS.primary,
    emissiveColor: ORGAN_COLORS.primary,
    emissiveIntensity: 0.12,
    glbPath: `${basePath}/models/stomach.glb`,
  },
  liver: {
    id: "liver",
    name: "Ficatul",
    description: "Drag pentru a roti",
    color: "#d4738c",
    emissiveColor: ORGAN_COLORS.primary,
    emissiveIntensity: 0.1,
    glbPath: `${basePath}/models/liver_3.glb`,
  },
  kidneys: {
    id: "kidneys",
    name: "Rinichii",
    description: "Drag pentru a roti",
    color: "#e8909e",
    emissiveColor: ORGAN_COLORS.secondary,
    emissiveIntensity: 0.12,
    glbPath: `${basePath}/models/human_kidney_lowpoly_example_9k.glb`,
  },
  skeleton: {
    id: "skeleton",
    name: "Sistemul Osos",
    description: "Drag pentru a roti",
    color: ORGAN_COLORS.white,
    emissiveColor: ORGAN_COLORS.light,
    emissiveIntensity: 0.08,
    glbPath: `${basePath}/models/humerushumero.glb`,
  },
  muscles: {
    id: "muscles",
    name: "Sistemul Muscular",
    description: "Drag pentru a roti",
    color: "#e06080",
    emissiveColor: ORGAN_COLORS.glow,
    emissiveIntensity: 0.15,
    glbPath: `${basePath}/models/otot_lurik.glb`,
  },
}
