import { FlowerAnimation } from "./flower-animation";
import { PrescriptionCard } from "./prescription-card";

export function FlowerSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-background via-[#1a0a10] to-[#1a0a10]">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      {/* Prescription Card with Flip Animation */}
      <div className="relative z-10 text-center mb-12 px-4">
        <PrescriptionCard />
      </div>

      {/* Section title */}
     <div className="relative z-10 text-center mb-12 px-4">
 
  <h3 className="font-serif text-3xl md:text-4xl text-primary-foreground mb-4 text-balance">
    Un Buchet Pentru Tine
  </h3>
  <p className="text-primary-foreground/75 max-w-md mx-auto text-base md:text-lg text-balance">
    Aceste floricele au înflorit doar pentru tine!
  </p>
</div>


      {/* Flower animation container */}
      <div className="relative h-[80vh] min-h-[500px] max-h-[700px] overflow-visible">
        <FlowerAnimation />
      </div>

      {/* Romantic closing message */}
      <div className="relative z-10 text-center mt-8 px-4">
        <p className="font-serif text-lg md:text-xl text-primary-foreground/80 italic">
          {"Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present"}
        </p>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
