"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  num: number;
  suffix: string;
  label: string;
  display?: string;
}

const STATS: StatItem[] = [
  { num: 3,   suffix: "+", label: "Años de experiencia" },
  { num: 20,  suffix: "+", label: "Proyectos entregados" },
  { num: 100, suffix: "%", label: "Clientes satisfechos" },
  { num: 0,   suffix: "",  label: "Me adapto a cualquier rubro", display: "∞" },
];

function AnimatedStat({
  num,
  suffix,
  label,
  index,
  display,
}: {
  num: number;
  suffix: string;
  label: string;
  index: number;
  display?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const duration = 1400;

    const timeoutId = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * num));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, index * 110);

    return () => clearTimeout(timeoutId);
  }, [isInView, num, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div
        className="leading-none mb-2 font-black tabular-nums"
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
          letterSpacing: "-0.04em",
          background:
            "linear-gradient(135deg, #ffffff 0%, rgba(196, 160, 255, 0.88) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {display ?? `${count}${suffix}`}
      </div>
      <p className="text-gray-500 text-sm leading-tight">{label}</p>
    </motion.div>
  );
}

export function SobreMi() {
  return (
    <section
      id="sobre-mi"
      className="relative bg-[#030308] py-28 px-4 overflow-hidden"
    >
      {/* Ambient glow right side */}
      <div
        className="absolute top-0 right-0 w-[600px] h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 40%, rgba(109,40,217,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">

          {/* Left column — text with giant AV monogram behind */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* AV background watermark */}
            <div
              aria-hidden="true"
              className="absolute select-none pointer-events-none leading-none"
              style={{
                fontSize: "clamp(9rem, 20vw, 18rem)",
                fontWeight: 900,
                fontFamily: "var(--font-playfair), Georgia, serif",
                color: "rgba(255,255,255,0.028)",
                letterSpacing: "-0.06em",
                lineHeight: 0.85,
                top: "-2rem",
                left: "-1.5rem",
                zIndex: 0,
                userSelect: "none",
              }}
            >
              AV
            </div>

            {/* Text content over the monogram */}
            <div className="relative" style={{ zIndex: 1 }}>
              <p className="text-[11px] font-mono text-purple-400/60 tracking-[0.22em] uppercase mb-5">
                — Quién soy
              </p>
              <h2
                className="text-white leading-tight mb-7"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "clamp(2.4rem, 4vw, 3.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                }}
              >
                Sobre mí
              </h2>
              <p
                className="text-gray-300 leading-[1.85]"
                style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)" }}
              >
                Soy{" "}
                <span className="text-white font-semibold">Alan</span>,
                desarrollador web con formación técnica en sistemas. Me
                especializo en crear soluciones digitales completas para negocios
                — desde la web hasta la automatización de procesos. Cada proyecto
                es una oportunidad de resolver un problema real.
              </p>
            </div>
          </motion.div>

          {/* Right column — 2×2 animated stats grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:gap-x-10 lg:gap-y-14">
            {STATS.map((stat, i) => (
              <AnimatedStat key={stat.label} {...stat} index={i} display={stat.display} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
