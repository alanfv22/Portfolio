"use client";

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

// Gradient fallback when no image is available
const BG_FALLBACK: Record<Rubro, string> = {
  ropa:       "radial-gradient(135deg, rgba(139,92,246,0.35) 0%, #1a1a1a 70%)",
  fitness:    "radial-gradient(135deg, rgba(16,185,129,0.32) 0%, #1a1a1a 70%)",
  comida:     "radial-gradient(135deg, rgba(249,115,22,0.32) 0%, #1a1a1a 70%)",
  belleza:    "radial-gradient(135deg, rgba(236,72,153,0.32) 0%, #1a1a1a 70%)",
  industrial: "radial-gradient(135deg, rgba(100,116,139,0.30) 0%, #1a1a1a 70%)",
  bazar:      "radial-gradient(135deg, rgba(245,158,11,0.32) 0%, #1a1a1a 70%)",
};

const BADGE_TEXT: Record<Rubro, string> = {
  ropa:       "text-violet-300",
  fitness:    "text-emerald-300",
  comida:     "text-orange-300",
  belleza:    "text-pink-300",
  industrial: "text-slate-300",
  bazar:      "text-amber-300",
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

// Extracts "www.sitio.com" from a full URL for the fake address bar
function extractDomain(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function BrowserMockup({
  image,
  url,
  rubro,
  title,
}: {
  image?: string;
  url: string;
  rubro: Rubro;
  title: string;
}) {
  return (
    <div className="flex-shrink-0 rounded-t-xl overflow-hidden" style={{ background: "#1a1a1a" }}>
      {/* Browser chrome bar */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ background: "#252525" }}
      >
        {/* Traffic-light dots */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
        </div>
        {/* Fake URL bar */}
        <div
          className="flex-1 min-w-0 rounded px-2.5 py-1 font-mono truncate"
          style={{
            background: "#1a1a1a",
            fontSize: "0.65rem",
            color: "rgba(156,163,175,0.6)",
          }}
        >
          {extractDomain(url)}
        </div>
      </div>

      {/* Screenshot / fallback */}
      <div
        className="h-[172px] lg:h-[192px] overflow-hidden"
        style={{ background: BG_FALLBACK[rubro] }}
      >
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
}

function ProyectoCard({
  proyecto,
  index,
}: {
  proyecto: Proyecto;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 24 } }}
      className="flex flex-col rounded-xl overflow-hidden border border-white/[0.08] h-full cursor-default"
      style={{
        background: "#111",
        boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
        transition: "box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 12px 40px rgba(0,0,0,0.6)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 2px 12px rgba(0,0,0,0.3)";
      }}
    >
      {/* ── Top: browser mockup ── */}
      <BrowserMockup
        image={proyecto.image}
        url={proyecto.url}
        rubro={proyecto.rubro}
        title={proyecto.title}
      />

      {/* ── Bottom: info ── */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Rubro badge */}
        <span
          className={`self-start text-[11px] font-semibold px-3 py-1 rounded-full border border-white/[0.1] ${BADGE_TEXT[proyecto.rubro]}`}
          style={{ background: "rgba(0,0,0,0.4)" }}
        >
          {proyecto.rubroLabel}
        </span>

        {/* Project name */}
        <h3
          className="text-white leading-tight"
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          {proyecto.title}
        </h3>

        {/* Short description */}
        <p className="text-gray-500 text-sm leading-relaxed">
          {proyecto.desc}
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-1.5">
          {proyecto.features.map((feat) => (
            <span
              key={feat}
              className="text-[11px] text-white/45 border border-white/[0.09] px-2.5 py-0.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              {feat}
            </span>
          ))}
        </div>

        {/* CTA — always visible */}
        <div className="mt-auto pt-3 border-t border-white/[0.06]">
          <a
            href={proyecto.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver sitio de ${proyecto.title}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 group"
          >
            Ver sitio
            <ArrowUpRight
              className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              strokeWidth={2}
            />
          </a>
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
      {/* Ambient glow */}
      <div
        aria-hidden="true"
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

        {/* Grid: 1 col mobile · 2 col tablet · 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROYECTOS.map((p, i) => (
            <ProyectoCard key={p.title} proyecto={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
