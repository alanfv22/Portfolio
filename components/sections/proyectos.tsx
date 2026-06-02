"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Rubro = "ropa" | "fitness" | "comida" | "belleza" | "industrial" | "bazar";

interface Proyecto {
  title: string;
  rubro: Rubro;
  rubroLabel: string;
  desc: string;
  url: string;
  features: string[];
  image?: string;
}

// Radial gradient backgrounds per rubro — all start with a color bloom,
// fade to deep black so the typography is always readable.
const BG: Record<Rubro, string> = {
  ropa: "radial-gradient(ellipse at 15% 15%, rgba(139,92,246,0.30) 0%, rgba(8,8,8,0.96) 55%)",
  fitness: "radial-gradient(ellipse at 15% 15%, rgba(16,185,129,0.28) 0%, rgba(8,8,8,0.96) 55%)",
  comida: "radial-gradient(ellipse at 15% 15%, rgba(249,115,22,0.28) 0%, rgba(8,8,8,0.96) 55%)",
  belleza: "radial-gradient(ellipse at 15% 15%, rgba(236,72,153,0.28) 0%, rgba(8,8,8,0.96) 55%)",
  industrial: "radial-gradient(ellipse at 15% 15%, rgba(100,116,139,0.26) 0%, rgba(8,8,8,0.96) 55%)",
  bazar: "radial-gradient(ellipse at 15% 15%, rgba(245,158,11,0.28) 0%, rgba(8,8,8,0.96) 55%)",
};

const BADGE_TEXT: Record<Rubro, string> = {
  ropa: "text-violet-300",
  fitness: "text-emerald-300",
  comida: "text-orange-300",
  belleza: "text-pink-300",
  industrial: "text-slate-300",
  bazar: "text-amber-300",
};

const PROYECTOS: Proyecto[] = [
  {
    title: "Zeus Indumentaria",
    rubro: "ropa",
    rubroLabel: "Ropa",
    desc: "Tienda de ropa online con catálogo y carrito",
    url: "https://www.zeusindu.com/",
    features: ["Tienda online", "Carrito", "Mercado Pago"],
    image: "/images/zeus.jpeg",
  },
  {
    title: "Solari Indumentaria",
    rubro: "ropa",
    rubroLabel: "Ropa",
    desc: "Tienda de ropa con catálogo",
    url: "https://www.solari-ind.com/",
    features: ["Tienda online", "Carrito", "Mercado Pago"],
    image: "/images/Solari.jpeg",
  },
  {
    title: "Fitness Website",
    rubro: "fitness",
    rubroLabel: "Fitness",
    desc: "Sitio de gimnasio orientado a conversión",
    url: "https://v0-fitness-website-conversion.vercel.app/",
    features: ["Landing", "Turnos online", "Conversión"],
    image: "/images/fitness.jpeg",
  },
  {
    title: "Lemon Suplementos",
    rubro: "fitness",
    rubroLabel: "Fitness",
    desc: "Ecommerce de suplementos fitness",
    url: "https://suplementos-lemon.vercel.app/",
    features: ["Ecommerce", "Stock automático", "Pagos"],
    image: "/images/Lemon.jpeg",
  },
  {
    title: "Gonzalo Legarda",
    rubro: "comida",
    rubroLabel: "Gastronomía",
    desc: "Catering y menú digital",
    url: "https://gonzalo-legarda.vercel.app/",
    features: ["Menú digital", "Reservas", "Pedidos"],
    image: "/images/Gonzalo.jpeg",
  },
  {
    title: "Todo Lindo Bazar",
    rubro: "bazar",
    rubroLabel: "Bazar",
    desc: "Tienda online de bazar y deco",
    url: "https://todo-lindo-showcase.vercel.app/",
    features: ["Tienda online", "Catálogo", "Pagos"],
    image: "/images/Bazr.jpeg",
  },
  {
    title: "Mariela Beauty Studio",
    rubro: "belleza",
    rubroLabel: "Belleza",
    desc: "Estudio de belleza con reservas online",
    url: "https://www.mariela-beauty-studio.com/",
    features: ["Turnos online", "Agenda", "Recordatorios"],
    image: "/images/Mariela.jpeg",
  },
  {
    title: "Corte y Plegado",
    rubro: "industrial",
    rubroLabel: "Industrial",
    desc: "Sitio corporativo para herrería industrial",
    url: "https://corte-y-plegado.vercel.app/",
    features: ["Catálogo", "Presupuestos", "Contacto"],
    image: "/images/CorteYPlegado.jpeg",
  },
];

// Asymmetric pattern in a 3-col grid (lg):
//   [0 wide=2][1 narrow=1]
//   [2 narrow=1][3 wide=2]
//   [4 wide=2][5 narrow=1]
//   [6 narrow=1][7 wide=2]
// mod 4 === 0 or mod 4 === 3  → wide (col-span-2)
function isWide(index: number) {
  const m = index % 4;
  return m === 0 || m === 3;
}

function ProyectoCard({
  proyecto,
  index,
}: {
  proyecto: Proyecto;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const wide = isWide(index);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: (index % 2) * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, margin: "-40px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.07] group cursor-default h-[200px] sm:h-auto ${wide ? "sm:min-h-[260px]" : "sm:min-h-[220px]"}`}
      style={{ background: BG[proyecto.rubro] }}
    >
      {/* Screenshot background image (when provided) */}
      {proyecto.image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={proyecto.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500"
            style={{
              transform: hovered ? "scale(1.04)" : "scale(1)",
              opacity: 0.35,
            }}
          />
          {/* Gradient overlay — desktop */}
          <div
            className="absolute inset-0 pointer-events-none hidden sm:block"
            style={{
              background:
                "linear-gradient(to bottom, rgba(8,8,8,0.20) 0%, rgba(8,8,8,0.78) 55%, rgba(8,8,8,0.97) 100%)",
            }}
          />
          {/* Solid overlay — mobile, rgba(0,0,0,0.7) to block all image text */}
          <div
            className="absolute inset-0 pointer-events-none sm:hidden"
            style={{ background: "rgba(0,0,0,0.70)" }}
          />
        </>
      )}

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.28 }}
        style={{ background: "rgba(0,0,0,0.18)" }}
      />

      {/* Border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)" }}
      />

      <div className="relative h-full p-6 sm:p-8 flex flex-col justify-between gap-6">
        {/* Top row: rubro badge + client feature pills */}
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <span
            className={`text-[11px] font-semibold px-3 py-1 rounded-full border border-white/[0.1] ${BADGE_TEXT[proyecto.rubro]}`}
            style={{ background: "rgba(0,0,0,0.35)" }}
          >
            {proyecto.rubroLabel}
          </span>
          <div className="flex gap-1.5 flex-wrap justify-end">
            {proyecto.features.map((feat) => (
              <span
                key={feat}
                className="text-[11px] text-white/50 border border-white/[0.10] px-2.5 py-0.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom: desc + large title + CTA slide */}
        <div>
          <p
            className="text-gray-300 sm:text-gray-500 text-sm leading-relaxed mb-2"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.95)" }}
          >
            {proyecto.desc}
          </p>
          <h3
            className="text-white leading-tight mb-5"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: wide
                ? "clamp(1.5rem, 2.8vw, 2.4rem)"
                : "clamp(1.2rem, 2.2vw, 1.65rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              textShadow: "0 2px 12px rgba(0,0,0,0.95)",
            }}
          >
            {proyecto.title}
          </h3>

          {/* CTA slides up from bottom on hover — hidden on mobile */}
          <div className="hidden sm:block h-10 overflow-hidden">
            <motion.a
              href={proyecto.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver sitio de ${proyecto.title}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-white/20 px-5 py-2.5 rounded-lg backdrop-blur-sm transition-colors duration-200 hover:bg-white/10"
              style={{ background: "rgba(255,255,255,0.07)" }}
              initial={false}
              animate={{ y: hovered ? 0 : 44, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
            >
              <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
              Ver sitio
            </motion.a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Proyectos() {
  return (
    <section
      id="proyectos"
      className="relative bg-[#080808] py-28 px-4 overflow-hidden"
    >
      {/* Subtle center ambient light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(6,182,212,0.025) 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-[11px] font-mono text-cyan-400/50 tracking-[0.22em] uppercase mb-4">
            — Mi trabajo
          </p>
          <h2
            className="text-white leading-tight"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(2.4rem, 4.5vw, 3.75rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            Proyectos
          </h2>
        </motion.div>

        {/* Asymmetric grid — on lg uses 3 cols with alternating wide cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROYECTOS.map((p, i) => (
            <div
              key={p.title}
              className={isWide(i) ? "lg:col-span-2" : "lg:col-span-1"}
            >
              <ProyectoCard proyecto={p} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
