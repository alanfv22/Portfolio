export function WaveDivider({
  from,
  to,
  flip = false,
}: {
  from: string;
  to: string;
  flip?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      style={{ background: from, lineHeight: 0, display: "block" }}
    >
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        style={{
          width: "100%",
          height: "56px",
          display: "block",
          transform: flip ? "scaleX(-1)" : undefined,
        }}
      >
        <path
          d="M0,0 C320,56 640,0 960,28 C1200,50 1360,14 1440,28 L1440,56 L0,56 Z"
          fill={to}
        />
      </svg>
    </div>
  );
}
