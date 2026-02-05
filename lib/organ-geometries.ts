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

export const organModels: Record<string, OrganModelData> = {
  brain: {
    id: "brain",
    name: "Creierul",
    description: "Drag pentru a roti",
    color: ORGAN_COLORS.lavender,
    emissiveColor: ORGAN_COLORS.lavender,
    emissiveIntensity: 0.15,
    glbPath: "/models/brain.glb",
  },
  heart: {
    id: "heart",
    name: "Inima",
    description: "Drag pentru a roti",
    color: ORGAN_COLORS.primary,
    emissiveColor: ORGAN_COLORS.glow,
    emissiveIntensity: 0.2,
  },
  lungs: {
    id: "lungs",
    name: "Plamanii",
    description: "Drag pentru a roti",
    color: ORGAN_COLORS.secondary,
    emissiveColor: ORGAN_COLORS.secondary,
    emissiveIntensity: 0.1,
  },
  stomach: {
    id: "stomach",
    name: "Stomacul",
    description: "Drag pentru a roti",
    color: ORGAN_COLORS.primary,
    emissiveColor: ORGAN_COLORS.primary,
    emissiveIntensity: 0.12,
    glbPath: "/models/stomach.glb",
  },
  liver: {
    id: "liver",
    name: "Ficatul",
    description: "Drag pentru a roti",
    color: "#d4738c",
    emissiveColor: ORGAN_COLORS.primary,
    emissiveIntensity: 0.1,
    glbPath: "/models/liver.glb",
  },
  kidneys: {
    id: "kidneys",
    name: "Rinichii",
    description: "Drag pentru a roti",
    color: "#e8909e",
    emissiveColor: ORGAN_COLORS.secondary,
    emissiveIntensity: 0.12,
    glbPath: "/models/kidneys.glb",
  },
  skeleton: {
    id: "skeleton",
    name: "Sistemul Osos",
    description: "Drag pentru a roti",
    color: ORGAN_COLORS.white,
    emissiveColor: ORGAN_COLORS.light,
    emissiveIntensity: 0.08,
    glbPath: "/models/skeleton.glb",
  },
  muscles: {
    id: "muscles",
    name: "Sistemul Muscular",
    description: "Drag pentru a roti",
    color: "#e06080",
    emissiveColor: ORGAN_COLORS.glow,
    emissiveIntensity: 0.15,
  },
}
