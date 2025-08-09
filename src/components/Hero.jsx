import React, { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import CoverVideo from "./CoverVideo";

/*
Goals:
- Fast perceived load with progressive, prioritized frames
- Smooth scroll → frame mapping (only draw on change)
- Fixed navbar that only fades (no move/scale)
- Responsive hero content
*/

const TOTAL_FRAMES = 124;
const FRAME_PATH = (i) => `/frames/frame_${String(i).padStart(3, "0")}.jpg`;

// Scroll UI timings
const NAV_FADE_END = 0.1;
const HERO_FADE_START = 0.12;
const HERO_FADE_END = 0.55;
const HERO_MIN_SCALE = 0.85;

// Cover video timings/params
const VIDEO_START_FRAME = 97; // start showing at frame 97
const VIDEO_START_OPACITY = 0.06; // very low initial opacity
const VIDEO_START_SCALE = 1.5; // 150% at start
const VIDEO_END_SCALE = 0.5; // 50% by end of section

// Loading strategy
const INITIAL_EAGER = 1; // load first N immediately
const NEIGHBOR_RADIUS = 4; // how many frames on each side to prioritize
const MAX_CONCURRENCY = 6; // parallel image loads
const IDLE_BATCH = 8; // load this many per idle cycle (fallback to rAF)

export default function ScrollFrames() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  const imagesRef = useRef(new Array(TOTAL_FRAMES)); // Image objects
  const statusRef = useRef(new Array(TOTAL_FRAMES).fill(0)); // 0=unqueued,1=loading,2=loaded
  const queueRef = useRef([]); // indices waiting
  const inFlightRef = useRef(0);

  const [loadedCount, setLoadedCount] = useState(0);

  // UI reactive state
  const [navOpacity, setNavOpacity] = useState(1);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [heroScale, setHeroScale] = useState(1);

  // Cover video UI state
  const [videoActive, setVideoActive] = useState(false);
  const [videoOpacity, setVideoOpacity] = useState(0);
  const [videoScale, setVideoScale] = useState(VIDEO_START_SCALE);

  // Frame selection state
  const currentFrameRef = useRef(-1); // last drawn frame index
  const targetFrameRef = useRef(0); // desired frame index from scroll

  // Track mounted state to avoid setState after unmount
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // ---------- IMAGE LOADING ----------
  const enqueue = (idx) => {
    if (idx < 0 || idx >= TOTAL_FRAMES) return;
    if (statusRef.current[idx] !== 0) return;
    statusRef.current[idx] = 1;
    queueRef.current.push(idx);
    pumpQueue();
  };

  const pumpQueue = () => {
    while (
      inFlightRef.current < MAX_CONCURRENCY &&
      queueRef.current.length > 0
    ) {
      const idx = queueRef.current.shift();
      loadImage(idx);
    }
  };

  const loadImage = (idx) => {
    inFlightRef.current++;
    const img = new Image();
    img.decoding = "async";
    img.src = FRAME_PATH(idx);
    img.onload = () => {
      if (!mountedRef.current) return;
      imagesRef.current[idx] = img;
      statusRef.current[idx] = 2;
      inFlightRef.current--;
      setLoadedCount((c) => c + 1);
      pumpQueue();
    };
    img.onerror = () => {
      if (!mountedRef.current) return;
      statusRef.current[idx] = 0;
      inFlightRef.current--;
      pumpQueue();
    };
  };

  // Initial eager load (first frame shown instantly)
  useEffect(() => {
    for (let i = 0; i < INITIAL_EAGER && i < TOTAL_FRAMES; i++) enqueue(i);

    // Background idle loading (broad fill) – lower priority
    const rest = [];
    for (let i = INITIAL_EAGER; i < TOTAL_FRAMES; i++) rest.push(i);

    const idleLoad = () => {
      if (!mountedRef.current) return;
      if (!rest.length) return;
      const batch = rest.splice(0, IDLE_BATCH);
      batch.forEach(enqueue);
      if (rest.length) {
        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(idleLoad, { timeout: 150 });
        } else {
          requestAnimationFrame(idleLoad);
        }
      }
    };
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(idleLoad, { timeout: 150 });
    } else {
      requestAnimationFrame(idleLoad);
    }
  }, []);

  // ---------- SCROLL → TARGET FRAME + UI FADES ----------
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const clamp01 = (v) => Math.min(1, Math.max(0, v));
    const lerp = (a, b, t) => a + (b - a) * t;
    let ticking = false;

    const handleTick = () => {
      const rect = el.getBoundingClientRect();
      const viewport =
        window.innerHeight || document.documentElement.clientHeight;
      const total = Math.max(1, rect.height - viewport);
      const scrolled = Math.min(total, Math.max(0, -rect.top));
      const p = scrolled / total;

      // Frame mapping
      const rawIndex = p * (TOTAL_FRAMES - 1);
      targetFrameRef.current = rawIndex;

      // Prioritize neighbors around target frame
      const center = Math.round(rawIndex);
      for (let d = 0; d <= NEIGHBOR_RADIUS; d++) {
        enqueue(center + d);
        enqueue(center - d);
      }

      // Navbar fade only
      const nOp = p < NAV_FADE_END ? 1 - p / NAV_FADE_END : 0;

      // Hero opacity
      let hOp;
      if (p <= HERO_FADE_START) hOp = 1;
      else if (p >= HERO_FADE_END) hOp = 0;
      else hOp = 1 - (p - HERO_FADE_START) / (HERO_FADE_END - HERO_FADE_START);

      // Hero scale (smoothstep)
      let scale;
      if (p <= HERO_FADE_START) scale = 1;
      else if (p >= HERO_FADE_END) scale = HERO_MIN_SCALE;
      else {
        const t = (p - HERO_FADE_START) / (HERO_FADE_END - HERO_FADE_START);
        const eased = t * t * (3 - 2 * t);
        scale = 1 - (1 - HERO_MIN_SCALE) * eased;
      }

      // Cover video from frame 97 → end (only while section is in view)
      const inView = rect.bottom > 0 && rect.top < viewport;
      const videoStartP = VIDEO_START_FRAME / (TOTAL_FRAMES - 1);
      const vt = clamp01((p - videoStartP) / (1 - videoStartP)); // 0..1 after start

      // Scale path stays the same
      const vScale =
        inView && p >= videoStartP
          ? lerp(VIDEO_START_SCALE, VIDEO_END_SCALE, vt)
          : VIDEO_START_SCALE;

      // Opacity should reach 1 exactly when scale == 1 and stay full after.
      // Solve for vt when scale==1 along the lerp path:
      const vtFullRaw =
        (1 - VIDEO_START_SCALE) / (VIDEO_END_SCALE - VIDEO_START_SCALE);
      const vtFull = clamp01(vtFullRaw); // typically 0.5 for 1.5→0.5

      const active = inView && p >= videoStartP;
      let vOpacity = 0;
      if (active) {
        if (vt <= vtFull) {
          const t = vtFull > 1e-4 ? vt / vtFull : 1;
          vOpacity = lerp(VIDEO_START_OPACITY, 1, t); // ramp up until scale==1
        } else {
          vOpacity = 1; // stay full after reaching 100% size
        }
      }

      if (mountedRef.current) {
        setNavOpacity((o) => (o !== nOp ? nOp : o));
        setHeroOpacity((o) => (o !== hOp ? hOp : o));
        setHeroScale((s) => (s !== scale ? scale : s));
        setVideoActive((a) => (a === active ? a : active));
        setVideoOpacity((o) => (o !== vOpacity ? vOpacity : o));
        setVideoScale((s) => (s !== vScale ? vScale : s));
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        handleTick();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    handleTick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // ---------- CANVAS RENDER LOOP ----------
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    let width = window.innerWidth;
    let height = window.innerHeight;
    let DPR = Math.min(2, window.devicePixelRatio || 1);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      DPR = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * DPR);
      canvas.height = Math.round(height * DPR);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      currentFrameRef.current = -1; // force redraw after resize
    };
    resize();
    window.addEventListener("resize", resize);

    const drawFrame = (idx) => {
      const img = imagesRef.current[idx];
      if (!img) return false;

      const imgRatio = img.width / img.height;
      const canvasRatio = width / height;
      let drawW, drawH;
      if (imgRatio > canvasRatio) {
        drawH = height;
        drawW = imgRatio * drawH;
      } else {
        drawW = width;
        drawH = drawW / imgRatio;
      }
      const dx = Math.round((width - drawW) / 2);
      const dy = Math.round((height - drawH) / 2);
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, dx, dy, Math.round(drawW), Math.round(drawH));
      return true;
    };

    const findBestLoaded = (preferred) => {
      const pref = Math.max(0, Math.min(TOTAL_FRAMES - 1, preferred | 0));
      if (statusRef.current[pref] === 2) return pref;

      // backward search
      for (let b = pref; b >= 0; b--) {
        if (statusRef.current[b] === 2) return b;
      }
      // forward fallback
      for (let f = pref + 1; f < TOTAL_FRAMES; f++) {
        if (statusRef.current[f] === 2) return f;
      }
      return null;
    };

    let rafId = 0;
    const loop = () => {
      const desired = Math.round(targetFrameRef.current);
      const best = findBestLoaded(desired);
      if (best != null && best !== currentFrameRef.current) {
        if (drawFrame(best)) currentFrameRef.current = best;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative text-black"
      style={{ height: "600vh" }}
    >
      {/* Fixed navbar wrapper: fade only (no move/scale) */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200, // above hero (150) and loader (160)
          opacity: navOpacity,
          transition: "opacity 0.18s linear",
          pointerEvents: navOpacity > 0 ? "auto" : "none",
        }}
      >
        <NavBar />
      </div>

      {/* Fullscreen canvas behind content */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          display: "block",
          background: "black",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Hero copy overlay (scales/fades; responsive spacing/typography) */}
      <div
        className="fixed inset-x-0 top-0 z-[150] flex flex-col items-center px-4 sm:px-6 pointer-events-none origin-center"
        style={{
          paddingTop: "clamp(5rem, 8vw, 9rem)", // leaves room under the navbar on all screens
          opacity: heroOpacity,
          transform: `scale(${heroScale})`,
          transition: "opacity 0.16s linear, transform 0.25s ease-out",
          willChange: "opacity, transform",
        }}
      >
        <h1 className="max-w-[1000px] text-center font-sans leading-tight text-meadow-900 text-xl sm:text-2xl md:text-3xl xl:text-4xl tracking-tight">
          Tuning creative minds with the will to create
          <br className="hidden sm:block" />
          into a successful founder—start your story.
        </h1>

        <div className="mt-8 sm:mt-10 md:mt-12 w-full max-w-[1100px] flex flex-col items-center gap-5 sm:gap-6">
          <div className="atlas-web-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-meadow-900/70">
            TRUSTED&nbsp;BY
          </div>

          <div className="relative w-full pointer-events-auto">
            <div className="logo-marquee-mask overflow-hidden">
              <div className="logo-marquee flex items-center gap-8 sm:gap-12 md:gap-14 px-2">
                {[...Array(16)].map((_, i) => (
                  <div
                    key={i}
                    className="h-7 sm:h-8 md:h-9 flex items-center opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="147"
                      height="21"
                      viewBox="0 0 147 21"
                      fill="currentColor"
                      className="w-[120px] sm:w-[140px] md:w-[147px] h-auto"
                    >
                      <path
                        fillRule="evenodd"
                        d="M51.375 10.7c0-3.29-2.555-5.906-5.932-5.906l-3.996.011a.29.29 0 0 0-.287.295v11.227a.29.29 0 0 0 .287.294h3.996c3.377 0 5.932-2.631 5.932-5.92m-4.59 3.347a3.5 3.5 0 0 1-1.342.293h-1.812V7.072h1.812a3.4 3.4 0 0 1 2.478 1.062 3.58 3.58 0 0 1 .98 2.566 3.64 3.64 0 0 1-.994 2.555 3.5 3.5 0 0 1-1.122.792M66.353 10.7c0-3.373-2.717-6.174-6.272-6.174-3.531 0-6.25 2.788-6.25 6.174s2.695 6.174 6.25 6.174 6.272-2.801 6.272-6.174m-2.763 1.503c-.59 1.451-1.976 2.395-3.51 2.39-2.09-.01-3.778-1.75-3.778-3.893.003-1.573.929-2.99 2.346-3.588a3.72 3.72 0 0 1 4.13.852 3.96 3.96 0 0 1 .812 4.239M81.248 10.7c0-3.386-2.717-6.174-6.26-6.174-3.555 0-6.273 2.788-6.273 6.174s2.74 6.174 6.272 6.174 6.261-2.787 6.261-6.174m-2.479.003c.002 2.144-1.69 3.884-3.781 3.89a3.75 3.75 0 0 1-2.686-1.14 3.94 3.94 0 0 1-1.113-2.753c.003-2.145 1.7-3.88 3.792-3.88 2.09 0 3.785 1.737 3.788 3.883M84.797 4.805a.29.29 0 0 0-.287.295l.014 11.218a.29.29 0 0 0 .286.295h1.876a.29.29 0 0 0 .286-.295v-3.822h2.143l2.138 3.98a.29.29 0 0 0 .26.16h1.948a.28.28 0 0 0 .271-.144.3.3 0 0 0-.01-.315l-2.22-4.022c1.277-.655 2.076-2 2.058-3.463 0-2.164-1.66-3.887-3.953-3.887zm5.332 5.3q-.287.108-.593.095h-2.555V7.072h2.555v.003a1.5 1.5 0 0 1 1.122.454 1.57 1.57 0 0 1 .444 1.151 1.55 1.55 0 0 1-.468 1.102 1.5 1.5 0 0 1-.505.323M107.746 10.762c0-3.296-2.555-5.915-5.932-5.915l-3.985.013a.29.29 0 0 0-.286.296v11.227a.29.29 0 0 0 .175.27.3.3 0 0 0 .111.024h3.985c3.377 0 5.932-2.62 5.932-5.915m-4.59 3.343c-.424.186-.88.285-1.342.291h-1.811V7.128h1.812a3.4 3.4 0 0 1 2.482 1.063 3.567 3.567 0 0 1 .977 2.57 3.64 3.64 0 0 1-.995 2.554c-.318.336-.7.604-1.123.79M112.14 16.407l.918-2.588h4.44l.917 2.587a.285.285 0 0 0 .287.203h1.989a.28.28 0 0 0 .261-.123.3.3 0 0 0 .026-.294l-4.3-11.216a.285.285 0 0 0-.287-.194h-2.227a.286.286 0 0 0-.287.194l-4.3 11.216a.297.297 0 0 0 .139.392q.07.032.147.026h1.991a.29.29 0 0 0 .286-.203m1.74-4.784 1.402-3.886 1.399 3.886z"
                        clipRule="evenodd"
                      ></path>
                      <path d="M127.322 4.526c-2.471 0-4.037 1.606-4.037 3.463l-.001.018c0 2.455 1.971 3.056 3.623 3.559 1.191.362 2.216.675 2.216 1.595 0 .847-.814 1.523-2.049 1.523a3.64 3.64 0 0 1-2.52-1.053.284.284 0 0 0-.416 0l-1.066 1.094a.3.3 0 0 0-.093.216.3.3 0 0 0 .093.216 5.78 5.78 0 0 0 4.168 1.717c2.789 0 4.366-1.62 4.369-3.76 0-2.455-1.973-3.056-3.626-3.56-1.191-.362-2.217-.674-2.217-1.594 0-.679.731-1.267 1.72-1.267a2.86 2.86 0 0 1 1.913.773.28.28 0 0 0 .203.086.28.28 0 0 0 .203-.086l1.103-1.123a.3.3 0 0 0 0-.432 5.05 5.05 0 0 0-3.586-1.385M137.238 4.974a.3.3 0 0 1 .02.11v4.44h4.945v-4.44a.29.29 0 0 1 .283-.293h1.876a.29.29 0 0 1 .266.183.3.3 0 0 1 .02.11V16.3a.29.29 0 0 1-.286.295h-1.876a.29.29 0 0 1-.286-.295V11.79h-4.942v4.51a.29.29 0 0 1-.286.294h-1.876a.29.29 0 0 1-.286-.295V5.085a.28.28 0 0 1 .082-.206.3.3 0 0 1 .204-.088h1.876a.29.29 0 0 1 .266.183M24.017 2.384c2.768-.01 5.313 1.492 6.614 3.904v-.003c3.347 6.274-1.182 12.594-7.173 12.594h-4.604c-.57.001-1.117-.224-1.523-.624l-4.565-4.532a.705.705 0 0 1 .111-1.094.7.7 0 0 1 .398-.12h10.18c1.052-.01 1.896-.86 1.885-1.898a1.89 1.89 0 0 0-1.924-1.86H8.65c-.57 0-1.12-.224-1.522-.625L2.565 3.598a.705.705 0 0 1 .109-1.093.7.7 0 0 1 .397-.12z"></path>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CoverVideo overlay (sticky inside section): appears at frame 97, scales 150% -> 50% */}
      <div
        className="fixed inset-0 z-[170] flex items-center justify-center"
        style={{
          opacity: videoOpacity,
          visibility: videoOpacity > 0.001 ? "visible" : "hidden",
          transform: `scale(${videoScale})`,
          transformOrigin: "center center",
          transition: "opacity 0.16s linear, transform 0.25s ease-out",
          willChange: "opacity, transform",
          pointerEvents: videoOpacity > 0.01 ? "auto" : "none",
        }}
        aria-hidden={videoOpacity <= 0.001}
      >
        <div
          className="w-[min(92vw,1100px)]"
          style={{
            aspectRatio: "16 / 9",
            filter: "none",
          }}
        >
          <CoverVideo />
        </div>
      </div>

      {loadedCount < TOTAL_FRAMES && (
        <div
          style={{
            position: "fixed",
            top: 16,
            left: 16,
            padding: "4px 8px",
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)",
            color: "white",
            zIndex: 160,
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: 12,
            letterSpacing: 1,
            borderRadius: 6,
          }}
        >
          {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
        </div>
      )}
    </div>
  );
}
