"use client";

import { useEffect, useRef, useState } from 'react';

// ─── Star background (CSS only) ────────────────────────────────────────────

const STAR_LAYERS = [
  { count: 120, size: 1,   duration: 80,  opacity: 0.7 },
  { count: 60,  size: 1.5, duration: 120, opacity: 0.5 },
  { count: 25,  size: 2.5, duration: 200, opacity: 0.4 },
] as const;

function buildBoxShadow(count: number, seed: number): string {
  const shadows: string[] = [];
  let s = seed;
  for (let i = 0; i < count; i++) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const x = Math.abs(s % 2000);
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const y = Math.abs(s % 2000);
    shadows.push(`${x}px ${y}px #fff`);
  }
  return shadows.join(', ');
}

function HeroStarBackground() {
  return (
    <div className="star-bg" aria-hidden="true">
      {STAR_LAYERS.map((layer, i) => (
        <div
          key={i}
          className="star-layer"
          style={{
            width: `${layer.size}px`,
            height: `${layer.size}px`,
            opacity: layer.opacity,
            boxShadow: buildBoxShadow(layer.count, (i + 1) * 31337),
            animationDuration: `${layer.duration}s`,
          }}
        />
      ))}
      <div className="nebula nebula-purple" />
      <div className="nebula nebula-blue" />
      <div className="star-vignette" />
      <style>{`
        .star-bg { position:absolute; inset:0; background:#000005; overflow:hidden; }
        .star-layer {
          position:absolute; top:0; left:0; border-radius:50%;
          background:transparent; animation:starDrift linear infinite; will-change:transform;
        }
        .star-layer::after {
          content:''; position:absolute; inset:0; border-radius:50%;
          background:transparent; box-shadow:inherit; top:2000px;
        }
        @keyframes starDrift { from{transform:translateY(0)} to{transform:translateY(-2000px)} }
        .nebula {
          position:absolute; border-radius:50%; filter:blur(80px);
          mix-blend-mode:screen; animation:nebulaPulse ease-in-out infinite alternate; will-change:opacity,transform;
        }
        .nebula-purple {
          width:600px; height:600px; top:5%; right:-10%;
          background:radial-gradient(ellipse,rgba(120,40,200,.18) 0%,transparent 70%);
          animation-duration:9s;
        }
        .nebula-blue {
          width:500px; height:400px; bottom:20%; left:-5%;
          background:radial-gradient(ellipse,rgba(30,60,180,.15) 0%,transparent 70%);
          animation-duration:13s;
        }
        @keyframes nebulaPulse { from{opacity:.6;transform:scale(1)} to{opacity:1;transform:scale(1.08)} }
        .star-vignette {
          position:absolute; inset:0; pointer-events:none;
          background:
            linear-gradient(to right, rgba(0,0,0,.75) 0%,transparent 25%,transparent 75%,rgba(0,0,0,.75) 100%),
            linear-gradient(to bottom,rgba(0,0,0,.3) 0%,transparent 40%,rgba(0,0,0,.9) 100%);
        }
      `}</style>
    </div>
  );
}

// ─── Scroll helper ──────────────────────────────────────────────────────────

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// ─── Navbar ─────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Servicios',  id: 'servicios'  },
  { label: 'Proyectos',  id: 'proyectos'  },
  { label: 'Sobre mí',   id: 'sobre-mi'   },
  { label: 'Contacto',   id: 'contacto'   },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    scrollTo(id);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: 'rgba(0,0,5,0.55)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="container mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="select-none leading-none flex items-center"
          aria-label="Inicio"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logoAv.jpeg"
            alt="Alan Veron"
            className="h-9 w-auto object-contain"
          />
        </button>

        {/* Links desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-150"
            >
              {label}
            </button>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo('contacto')}
            className="hidden sm:block bg-white text-black text-sm font-semibold px-5 py-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            Hablemos
          </button>
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ borderTop: menuOpen ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
      >
        <div className="px-5 py-5 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className="text-left text-gray-300 hover:text-white py-2.5 text-sm transition-colors"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('contacto')}
            className="mt-3 bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-full"
          >
            Hablemos
          </button>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero content ────────────────────────────────────────────────────────────

function HeroContent() {
  return (
    <div className="text-white px-4 max-w-3xl">
      <p className="text-xs sm:text-sm font-mono text-purple-400 tracking-widest uppercase mb-4 opacity-80">
        Desarrollador Web Freelance
      </p>
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 leading-[1.05] tracking-tight">
        Convierto ideas<br />
        en soluciones<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          digitales
        </span>
      </h1>
      <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-400 max-w-xl leading-relaxed">
        Desarrollo webs, ecommerce, automatizaciones y dashboards
        para negocios que quieren crecer.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 pointer-events-auto">
        <button
          onClick={() => scrollTo('proyectos')}
          className="bg-white text-black font-semibold py-3 px-7 rounded-full text-sm hover:bg-gray-100 transition-colors duration-200"
        >
          Ver proyectos
        </button>
        <button
          onClick={() => scrollTo('contacto')}
          className="border border-white/20 text-white font-medium py-3 px-7 rounded-full text-sm hover:border-white/50 hover:bg-white/5 transition-all duration-200"
          style={{ backdropFilter: 'blur(8px)' }}
        >
          Contactame
        </button>
      </div>
    </div>
  );
}

// ─── HeroSection export ──────────────────────────────────────────────────────

export function HeroSection() {
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      requestAnimationFrame(() => {
        if (!heroContentRef.current) return;
        const opacity = 1 - Math.min(window.pageYOffset / 500, 1);
        heroContentRef.current.style.opacity = opacity.toString();
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative">
      <Navbar />

      {/* Viewport hero */}
      <div className="relative min-h-screen flex items-center">
        {/* Star background */}
        <div className="absolute inset-0 z-0">
          <HeroStarBackground />
        </div>

        {/* Content */}
        <div
          ref={heroContentRef}
          className="relative z-10 container mx-auto pt-24 pb-16 pointer-events-none"
          style={{ pointerEvents: 'none' }}
        >
          {/* pointer-events:auto solo en los botones (dentro de HeroContent) */}
          <HeroContent />
        </div>
      </div>
    </div>
  );
}
