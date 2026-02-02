import { BowknotDecoration } from "./bowknot-decoration"

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BowknotDecoration size={32} />
          <span className="font-serif text-xl font-semibold text-foreground">
            Scrisoare Magica
          </span>
          <BowknotDecoration size={32} />
        </div>
        <p className="font-sans text-sm text-muted-foreground max-w-md mx-auto mb-6">
          Creat cu drag pentru cea mai harnicuta furnicuță
        </p>
        
      </div>
    </footer>
  )
}
