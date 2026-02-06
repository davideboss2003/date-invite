// Suppress THREE.js texture loading errors in console
if (typeof window !== "undefined") {
  const originalConsoleError = console.error
  console.error = (...args: any[]) => {
    // Suppress GLTFLoader texture errors
    if (
      args[0]?.includes?.("GLTFLoader") ||
      args[0]?.includes?.("Couldn't load texture") ||
      args[0]?.toString?.().includes?.("THREE")
    ) {
      return // Silently ignore
    }
    originalConsoleError(...args)
  }
}

export {}
