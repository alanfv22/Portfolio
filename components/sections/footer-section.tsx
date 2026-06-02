export function FooterSection() {
  return (
    <footer className="bg-[#080808] border-t border-white/[0.05] py-8 px-4">
      <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <span
          className="text-white select-none"
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "1.4rem",
            fontWeight: 700,
            letterSpacing: "-0.04em",
          }}
        >
          AV
        </span>
        <p className="text-gray-700 text-xs text-center sm:text-right">
          © 2026 Alan Veron — Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
