import HeroSection from "@/components/HeroSection";
import USPSection from "@/components/USPSection";
import RaceCategories from "@/components/RaceCategories";
import RouteSection from "@/components/RouteSection";
import RaceDayTimeline from "@/components/RaceDayTimeline";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import GreenRunSection from "@/components/GreenRunSection";
import GiveawaysSection from "@/components/GiveawaysSection";
import AboutSection from "@/components/AboutSection";
import WinnersSection from "@/components/WinnersSection";
import HallOfFame from "@/components/HallOfFame";
import ScrollReveal from "@/components/animations/ScrollReveal";
import MarqueeTicker from "@/components/animations/MarqueeTicker";
import FogTransition from "@/components/animations/FogTransition";

export default function Home() {
  return (
    <>
      <HeroSection />

      <MarqueeTicker
        text="RUN INTO THE CLOUDS — RACE WITH THE RAIN"
        speed={35}
        className="text-primary/20"
        stroke
      />

      <ScrollReveal animation="fade-up">
        <USPSection />
      </ScrollReveal>

      <FogTransition height={60} />

      <ScrollReveal animation="fade-up">
        <RaceCategories />
      </ScrollReveal>

      <RouteSection />

      <MarqueeTicker
        text="21.1K — 10K — NANDI HILLS — MONSOON RUN 2026"
        speed={30}
        className="text-accent/15"
      />

      <FogTransition height={50} />

      <ScrollReveal animation="fade-up">
        <RaceDayTimeline />
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <GreenRunSection />
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <GiveawaysSection />
      </ScrollReveal>

      <TestimonialsSection />

      <FogTransition height={50} />

      <ScrollReveal animation="fade-up">
        <WinnersSection />
      </ScrollReveal>

      <HallOfFame />

      <ScrollReveal animation="fade-up">
        <AboutSection />
      </ScrollReveal>

      <MarqueeTicker
        text="SEE YOU AT THE SUMMIT — 9 AUGUST 2026"
        speed={25}
        className="text-primary/10"
        stroke
      />

      <ScrollReveal animation="fade-up">
        <FAQSection limit={8} />
      </ScrollReveal>
    </>
  );
}
