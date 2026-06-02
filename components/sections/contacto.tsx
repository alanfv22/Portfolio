"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Contacto() {
  return (
    <section
      id="contacto"
      className="relative py-36 sm:py-48 px-4 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% -10%, rgba(88,28,180,0.40) 0%, rgba(8,8,8,0.0) 55%), linear-gradient(180deg, #080808 0%, #0a0012 40%, #050010 100%)",
      }}
    >
      {/* Vertical line from top — design accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px pointer-events-none"
        style={{
          height: "80px",
          background:
            "linear-gradient(to bottom, transparent, rgba(139,92,246,0.5))",
        }}
      />

      {/* Decorative large blurred circle */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(109,40,217,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative container mx-auto max-w-3xl text-center">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-[11px] font-mono text-purple-400/55 tracking-[0.22em] uppercase mb-6"
        >
          — Trabajemos juntos
        </motion.p>

        {/* Enormous serif heading */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.06 }}
          viewport={{ once: true }}
          className="text-white mb-6"
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(3.5rem, 10vw, 8rem)",
            fontWeight: 700,
            letterSpacing: "-0.045em",
            lineHeight: 0.92,
          }}
        >
          Hablemos.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.14 }}
          viewport={{ once: true }}
          className="text-gray-500 leading-relaxed mb-14 max-w-sm mx-auto"
          style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)" }}
        >
          Contame tu idea y te cuento cómo hacerla realidad.
          Primera consulta sin compromiso.
        </motion.p>

        {/* WhatsApp button with pulse rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          viewport={{ once: true }}
          className="inline-block relative mb-10"
        >
          {/* Pulse ring — CSS animation via globals.css */}
          <span
            aria-hidden="true"
            className="wa-pulse absolute inset-0 rounded-full pointer-events-none"
          />
          <a
            href="https://wa.me/541162195594"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5a] text-white font-bold rounded-full transition-colors duration-200 shadow-2xl shadow-green-900/30"
            style={{
              fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
              padding: "1rem 2.2rem",
            }}
          >
            <WhatsAppIcon className="w-5 h-5 shrink-0" />
            Escribime por WhatsApp
          </a>
        </motion.div>

        {/* Secondary links: email + Instagram */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="mailto:alanfveron@gmail.com"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-300 transition-colors duration-200 text-sm group"
          >
            <Mail
              className="w-4 h-4 group-hover:text-purple-400 transition-colors duration-200"
              strokeWidth={1.5}
            />
            alanfveron@gmail.com
          </a>
          <span className="hidden sm:block text-gray-800 text-xs">·</span>
          <a
            href="https://instagram.com/alanfv.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-300 transition-colors duration-200 text-sm group"
          >
            <InstagramIcon className="w-4 h-4 group-hover:text-pink-400 transition-colors duration-200" />
            @alanfv.dev
          </a>
        </motion.div>
      </div>
    </section>
  );
}
