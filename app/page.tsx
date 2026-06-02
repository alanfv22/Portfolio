import { HeroSection } from "@/components/blocks/galaxy-interactive-hero-section";
import { Servicios } from "@/components/sections/servicios";
import { Proyectos } from "@/components/sections/proyectos";
import { SobreMi } from "@/components/sections/sobre-mi";
import { Contacto } from "@/components/sections/contacto";
import { FooterSection } from "@/components/sections/footer-section";
import { WaveDivider } from "@/components/ui/wave-divider";

export default function Home() {
  return (
    <main className="bg-[#080808] w-full">
      <HeroSection />
      <WaveDivider from="#000005" to="#030308" />
      <Servicios />
      <WaveDivider from="#030308" to="#080808" flip />
      <Proyectos />
      <WaveDivider from="#080808" to="#030308" />
      <SobreMi />
      <WaveDivider from="#030308" to="#080808" flip />
      <Contacto />
      <WaveDivider from="#050010" to="#080808" />
      <FooterSection />
    </main>
  );
}
