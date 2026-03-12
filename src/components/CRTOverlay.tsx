"use client";

export default function CRTOverlay() {
  return (
    <>
      {/* Scanline effect */}
      <div
        className="pointer-events-none fixed inset-0 z-[9999]"
        aria-hidden="true"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.03) 0px, rgba(0, 0, 0, 0.03) 1px, transparent 1px, transparent 2px)",
          mixBlendMode: "multiply",
        }}
      />
      {/* Subtle vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-[9998]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 60%, rgba(0, 0, 0, 0.4) 100%)",
        }}
      />
    </>
  );
}
