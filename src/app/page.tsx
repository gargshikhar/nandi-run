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
import HallOfFame from "@/components/HallOfFame";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FogTransition from "@/components/animations/FogTransition";

export default function Home() {
  return (
    <>
      <HeroSection />

      <ScrollReveal animation="fade-up">
        <USPSection />
      </ScrollReveal>

      <FogTransition height={60} />

      <ScrollReveal animation="fade-up">
        <RaceCategories />
      </ScrollReveal>

      <RouteSection />

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

      <HallOfFame />

      <ScrollReveal animation="fade-up">
        <AboutSection />
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <FAQSection limit={8} />
      </ScrollReveal>
    </>
  );
}
