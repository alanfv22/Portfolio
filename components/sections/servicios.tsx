"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Bloque {
  tag: string;
  titulo: string;
  descripcion: string;
  features: string[];
}

const BLOQUES: Bloque[] = [
  {
    tag: "Tiendas & Ecommerce",
    titulo: "¿Vendés productos?",
    descripcion:
      "Armamos tu tienda online completa. Vos solo cargás los productos y el sistema hace el resto.",
    features: [
      "Sincronización de stock automática",
      "Mercado Pago y tarjetas",
      "Cupones y ofertas",
      "Panel de administración propio",
      "Dashboard de ventas en tiempo real",
      "Mails automáticos a clientes",
    ],
  },
  {
    tag: "Gastronomía Digital",
    titulo: "¿Tenés un restaurante o bar?",
    descripcion:
      "Digitalizamos tu negocio gastronómico para que tus clientes pidan, reserven y paguen sin que vos tengas que estar pendiente.",
    features: [
      "Menú QR digital",
      "Reservas online 24/7",
      "Gestión de pedidos en tiempo real",
      "Panel de estadísticas",
      "Carta actualizable al instante",
    ],
  },
  {
    tag: "Automatización & Dashboards",
    titulo: "¿Perdés tiempo haciendo todo a mano?",
    descripcion:
      "Automatizamos los procesos repetitivos de tu negocio para que puedas enfocarte en lo que importa.",
    features: [
      "Automatización de tareas",
      "Dashboard con métricas en tiempo real",
      "Reportes de ventas",
      "Notificaciones automáticas por WhatsApp",
      "Integración entre sistemas",
    ],
  },
  {
    tag: "Servicios & Turnos",
    titulo: "¿Trabajás con turnos?",
    descripcion:
      "Sistema de agenda online para que tus clientes reserven solos, paguen la seña y reciban recordatorios automáticos.",
    features: [
      "Agenda online 24/7",
      "Pago de seña online",
      "Recordatorios automáticos",
      "Historial de clientes",
      "Panel de gestión profesional",
    ],
  },
];

// Subtle bg alternation — the difference is intentionally tiny so it reads
// as rhythm rather than jarring color change.
const BLOCK_BG = ["#030308", "#060610", "#030308", "#060610"] as const;

// Per-block accent color for the tag label and checkmarks
const ACCENT_COLOR = [
  "rgba(139,92,246,1)",   // violet
  "rgba(6,182,212,1)",    // cyan
  "rgba(167,139,250,1)",  // violet-light
  "rgba(34,211,238,1)",   // cyan-light
] as const;

const ACCENT_GLOW = [
  "rgba(109,40,217,0.07)",
  "rgba(6,182,212,0.06)",
  "rgba(109,40,217,0.07)",
  "rgba(6,182,212,0.06)",
] as const;

function FeatureItem({
  text,
  index,
  accentColor,
}: {
  text: string;
  index: number;
  accentColor: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.38,
        delay: 0.18 + index * 0.06,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, margin: "-40px" }}
      className="flex items-start gap-3"
    >
      <div
        className="shrink-0 mt-[3px] w-5 h-5 rounded-full flex items-center justify-center"
        style={{ background: `${accentColor.replace("1)", "0.12)")}`, border: `1px solid ${accentColor.replace("1)", "0.25)")}` }}
      >
        <Check
          className="w-3 h-3"
          style={{ color: accentColor }}
          strokeWidth={2.5}
        />
      </div>
      <span
        className="text-gray-400 leading-relaxed"
        style={{ fontSize: "clamp(0.875rem, 1.3vw, 0.95rem)" }}
      >
        {text}
      </span>
    </motion.div>
  );
}

function BloqueServicio({
  bloque,
  index,
}: {
  bloque: Bloque;
  index: number;
}) {
  const reversed = index % 2 !== 0;
  const accent = ACCENT_COLOR[index];
  const glow = ACCENT_GLOW[index];

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: BLOCK_BG[index] }}
    >
      {/* Directional ambient glow — mirrors the layout direction */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: reversed
            ? `radial-gradient(ellipse at 10% 50%, ${glow} 0%, transparent 55%)`
            : `radial-gradient(ellipse at 90% 50%, ${glow} 0%, transparent 55%)`,
        }}
      />

      {/* Separator line */}
      {index > 0 && (
        <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.05]" />
      )}

      <div className="relative container mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <div
          className={`flex flex-col lg:gap-20 xl:gap-28 items-start ${
            reversed ? "lg:flex-row-reverse" : "lg:flex-row"
          }`}
          style={{ gap: "3rem" }}
        >

          {/* ── Left / Right: tag + title + description ── */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? 28 : -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-60px" }}
            className="flex-1 min-w-0"
            style={{ maxWidth: "26rem" }}
          >
            {/* Rubro tag */}
            <p
              className="font-mono tracking-[0.18em] uppercase mb-4"
              style={{
                fontSize: "0.68rem",
                color: accent,
                opacity: 0.75,
              }}
            >
              {bloque.tag}
            </p>

            {/* Big question headline */}
            <h3
              className="text-white leading-tight mb-5"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(1.9rem, 3.5vw, 3rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              {bloque.titulo}
            </h3>

            {/* Conversational description */}
            <p
              className="text-gray-400 leading-[1.8]"
              style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)" }}
            >
              {bloque.descripcion}
            </p>

            {/* Decorative accent line under description */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
              className="mt-6 h-px origin-left"
              style={{
                background: `linear-gradient(90deg, ${accent} 0%, transparent 100%)`,
                opacity: 0.35,
                maxWidth: "10rem",
              }}
            />
          </motion.div>

          {/* ── Feature list ── */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-60px" }}
            className="flex-1 min-w-0 w-full"
          >
            {/* Feature items — 2-col grid on md+, single col on mobile */}
            <div
              className={`grid gap-x-8 gap-y-4 ${
                bloque.features.length > 4
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1"
              }`}
            >
              {bloque.features.map((f, fi) => (
                <FeatureItem key={f} text={f} index={fi} accentColor={accent} />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export function Servicios() {
  return (
    <section id="servicios" className="relative overflow-hidden">

      {/* Section header — sits above the alternating blocks */}
      <div className="bg-[#030308] pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] font-mono text-purple-400/60 tracking-[0.22em] uppercase mb-4">
              — Qué hago
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
              Servicios
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Alternating solution blocks */}
      {BLOQUES.map((bloque, i) => (
        <BloqueServicio key={bloque.tag} bloque={bloque} index={i} />
      ))}

    </section>
  );
}
