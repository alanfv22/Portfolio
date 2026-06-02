"use client";

import { useEffect, useRef } from "react";

const FRAMES = [
  "/images/frame1.jpg",
  "/images/frame2.jpg",
  "/images/frame3.jpg",
  "/images/frame4.jpg",
  "/images/frame5.jpg",
];

const TOTAL_FRAMES = FRAMES.length;

export function ScrollSequence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    // Verificar que las imágenes existen en el DOM
    console.log("[ScrollSequence] imgRefs count:", imgRefs.current.filter(Boolean).length);
    imgRefs.current.forEach((img, i) => {
      if (img) console.log(`[ScrollSequence] frame${i + 1} src:`, img.src, "natural size:", img.naturalWidth, "x", img.naturalHeight);
    });

    // Registrar GSAP dentro del effect (client-only)
    const gsapModule = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      // Estado inicial: solo frame 0 visible
      imgRefs.current.forEach((img, i) => {
        if (img) img.style.opacity = i === 0 ? "1" : "0";
      });

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: false,
        onUpdate: (self) => {
          const frameIndex = Math.min(
            Math.floor(self.progress * TOTAL_FRAMES),
            TOTAL_FRAMES - 1
          );
          console.log("[ScrollSequence] progress:", self.progress.toFixed(3), "→ frame:", frameIndex);

          imgRefs.current.forEach((img, i) => {
            if (img) img.style.opacity = i === frameIndex ? "1" : "0";
          });
        },
      });

      // Forzar recalculo por si el layout no estaba listo
      ScrollTrigger.refresh();

      return () => trigger.kill();
    };

    const cleanup = gsapModule();
    return () => {
      cleanup.then((fn) => fn?.());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: "500vh" }}
    >
      {/*
        sticky top-0: la imagen se ancla mientras scrolleás los 500vh
        h-screen: ocupa exactamente el viewport
        relative: es el containing block para las imgs absolutas
      */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="relative w-full h-full">
          {FRAMES.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              ref={(el) => { imgRefs.current[i] = el; }}
              src={src}
              alt={`Frame ${i + 1}`}
              draggable={false}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                // mobile: full-width cover; desktop: letterbox centrado
                objectFit: "cover",
                objectPosition: "center",
                opacity: i === 0 ? 1 : 0,
                // sin transition para swap instantáneo tipo video
                transition: "none",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
