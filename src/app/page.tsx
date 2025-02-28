// home page
import PageTransition from '@/components/layout/PageTransition';
import Hero from '@/components/home/Hero';
import ServicesSection from '@/components/home/ServicesSection';
import SpecialProgramsSection from '@/components/home/SpecialProgramsSection';
import EventsSection from '@/components/home/EventsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import StaffPreview from '@/components/home/StaffPreview';
import PawPrintDivider from '@/components/ui/PawPrintDivider';

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <PawPrintDivider />
      <ServicesSection />
      <PawPrintDivider />
      <SpecialProgramsSection />
      <PawPrintDivider />
      <EventsSection />
      <PawPrintDivider />
      <TestimonialsSection />
      <PawPrintDivider />
      <StaffPreview />
    </PageTransition>
  );
}