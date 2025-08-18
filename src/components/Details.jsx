import React, { useEffect, useRef, useState } from "react";

// Simple counter that animates from 0 to `to` on first mount
function Counter({ to, duration = 1800, decimals = 0, suffix = "" }) {
  const [val, setVal] = useState(0);
  const rafRef = useRef(0);
  const startRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    const easeOutQuad = (t) => 1 - (1 - t) * (1 - t);
    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const t = Math.min(1, (ts - startRef.current) / duration);
      const eased = easeOutQuad(t);
      const next = to * eased;
      setVal(next);
      if (t < 1 && !cancelled) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [to, duration]);

  const formatted = decimals
    ? Number(val).toFixed(decimals)
    : Math.round(val).toLocaleString();

  return (
    <span>
      {formatted}
      {suffix}
    </span>
  );
}

export default function Details() {
  return (
    <section className="bg-[#fdfdf6] text-[#0a1d08] py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <h2 className="text-5xl leading-[1.05] font-semibold max-w-3xl">
          Precisely engineered for unparalleled reliability
        </h2>
        <p className="mt-4 max-w-lg text-[clamp(0.95rem,1.6vw,1.125rem)] text-[#0a1d08]/70">
          Adaline powers the workflows of world-class product and engineering
          teams with unmatched performance and reliability.
        </p>

        {/* Stats rows */}
        <div className="mt-10 sm:mt-14">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-y-2 gap-x-10 py-8 border-t border-dotted border-[#0a1d08]/25">
            <div className="text-5xl font-semibold leading-none">
              <Counter to={200} suffix="M+" />
            </div>
            <div className="text-[#0a1d08]/70 text-[clamp(0.9rem,1.4vw,1.05rem)]">
              <div>API calls</div>
              <div>per day</div>
            </div>
            <div className="text-[clamp(0.9rem,1.4vw,1.05rem)]">
              Handles massive scale effortlessly
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-y-2 gap-x-10 py-8 border-t border-dotted border-[#0a1d08]/25">
            <div className="text-5xl font-semibold leading-none">
              <Counter to={5} suffix="B+" />
            </div>
            <div className="text-[#0a1d08]/70 text-[clamp(0.9rem,1.4vw,1.05rem)]">
              <div>Tokens</div>
              <div>per day</div>
            </div>
            <div className="text-[clamp(0.9rem,1.4vw,1.05rem)]">
              Built for limitless processing power
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-y-2 gap-x-10 py-8 border-t border-dotted border-[#0a1d08]/25">
            <div className="text-5xl font-semibold leading-none">
              <Counter to={300} suffix="+" />
            </div>
            <div className="text-[#0a1d08]/70 text-[clamp(0.9rem,1.4vw,1.05rem)]">
              <div>Number of</div>
              <div>AI models</div>
            </div>
            <div className="text-[clamp(0.9rem,1.4vw,1.05rem)]">
              Flexibility for every application
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-y-2 gap-x-10 py-8 border-t border-b border-dotted border-[#0a1d08]/25">
            <div className="text-5xl font-semibold leading-none">
              <Counter to={99.998} decimals={3} suffix="%" />
            </div>
            <div className="text-[#0a1d08]/70 text-[clamp(0.9rem,1.4vw,1.05rem)]">
              <div>Historical</div>
              <div>uptime</div>
            </div>
            <div className="text-[clamp(0.9rem,1.4vw,1.05rem)]">
              Always on, always reliable
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
