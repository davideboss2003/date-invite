import { HeroSection } from "@/components/hero-section"
import { AnatomyExplorer } from "@/components/anatomy-explorer"
import { Footer } from "@/components/footer"
import { FlowerSection } from "@/components/flower-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <AnatomyExplorer />
      <FlowerSection />
      <Footer />
    </main>
  )
}
