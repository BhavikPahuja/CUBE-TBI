import React, { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";

const TOTAL_FRAMES = 124;
const IMAGE_PATH = (index) =>
  `/frames/frame_${String(index).padStart(3, "0")}.jpg`;

export default function ScrollFrames() {
  const canvasRef = useRef(null);
  const imagesRef = useRef(Array(TOTAL_FRAMES).fill(null));
  const [loaded, setLoaded] = useState(0);

  // Scroll animation states
  const sectionRef = useRef(null);
  const [navOpacity, setNavOpacity] = useState(1);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [heroScale, setHeroScale] = useState(1);

  const loadImage = (i) =>
    new Promise((resolve, reject) => {
      if (imagesRef.current[i]) return resolve(imagesRef.current[i]);
      const img = new Image();
      img.src = IMAGE_PATH(i);
      img.onload = () => {
        imagesRef.current[i] = img;
        setLoaded((c) => c + 1);
        resolve(img);
      };
      img.onerror = reject;
    });

  // Preload frames
  useEffect(() => {
    (async () => {
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        await loadImage(i).catch(() => {});
      }
    })();
  }, []);

  // Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollFraction = maxScroll > 0 ? scrollTop / maxScroll : 0;
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(scrollFraction * TOTAL_FRAMES)
      );

      const img = imagesRef.current[frameIndex];
      if (img) {
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
        const dx = (width - drawW) / 2;
        const dy = (height - drawH) / 2;
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, dx, dy, drawW, drawH);
      }

      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Scroll-driven fade + scale (navbar fades earlier)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Tweak these percentages to adjust timing
    const navFadeEnd = 0.1; // Navbar fades out over first 10%
    const heroFadeStart = 0.12; // Hero starts fading/scaling after navbar mostly gone
    const heroFadeEnd = 0.55; // Fully gone by 55%
    const minScale = 0.85; // Scale at heroFadeEnd

    const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const total = el.offsetHeight - window.innerHeight;
        const p = clamp(total > 0 ? window.scrollY / total : 0);

        // Navbar opacity: 1 -> 0 from 0 to navFadeEnd
        const navOp = p < navFadeEnd ? 1 - p / navFadeEnd : 0;

        // Hero opacity: hold 1 until heroFadeStart, then linear to 0 by heroFadeEnd
        let hOp;
        if (p <= heroFadeStart) hOp = 1;
        else if (p >= heroFadeEnd) hOp = 0;
        else hOp = 1 - (p - heroFadeStart) / (heroFadeEnd - heroFadeStart);

        // Hero scale: hold 1 until heroFadeStart then ease to minScale
        let scale;
        if (p <= heroFadeStart) scale = 1;
        else if (p >= heroFadeEnd) scale = minScale;
        else {
          const t = (p - heroFadeStart) / (heroFadeEnd - heroFadeStart);
          // Use smoothstep easing for nicer feel
          const eased = t * t * (3 - 2 * t);
          scale = 1 - (1 - minScale) * eased;
        }

        setNavOpacity((prev) => (prev !== navOp ? navOp : prev));
        setHeroOpacity((prev) => (prev !== hOp ? hOp : prev));
        setHeroScale((prev) => (prev !== scale ? scale : prev));

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative text-black"
      style={{ height: "600vh" }}
    >
      <NavBar
        style={{
          opacity: navOpacity,
          transition: "opacity 0.18s linear",
          pointerEvents: navOpacity > 0 ? "auto" : "none",
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          display: "block",
          background: "black",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div
        className="fixed inset-x-0 top-0 z-[150] flex flex-col items-center pt-32 px-6 pointer-events-none origin-center"
        style={{
          opacity: heroOpacity,
          transform: `scale(${heroScale})`,
          transition: "opacity 0.16s linear, transform 0.25s ease-out",
          willChange: "opacity, transform",
        }}
      >
        <h1 className="max-w-[960px] text-center font-sans leading-tight text-meadow-900 text-5xl tracking-tight">
          Tuning creative minds with the will to create
          <br className="hidden sm:block" />
          into a successful founder—start your story.
        </h1>

        <div className="mt-12 w-full max-w-[1100px] flex flex-col items-center gap-6">
          <div className="atlas-web-mono text-[11px] tracking-[0.25em] text-meadow-900/70">
            TRUSTED&nbsp;BY
          </div>

          <div className="relative w-full pointer-events-auto">
            <div className="logo-marquee-mask overflow-hidden">
              <div className="logo-marquee flex items-center gap-14">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
                  (n, i) => (
                    <div
                      key={i}
                      className="h-9 flex items-center opacity-80 hover:opacity-100 transition-opacity"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="147"
                        height="21"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M51.375 10.7c0-3.29-2.555-5.906-5.932-5.906l-3.996.011a.29.29 0 0 0-.287.295v11.227a.29.29 0 0 0 .287.294h3.996c3.377 0 5.932-2.631 5.932-5.92m-4.59 3.347a3.5 3.5 0 0 1-1.342.293h-1.812V7.072h1.8119999999999998a3.4 3.4 0 0 1 2.478 1.062 3.58 3.58 0 0 1 .98 2.566 3.64 3.64 0 0 1-.994 2.555 3.5 3.5 0 0 1-1.122.792M66.353 10.7c0-3.373-2.717-6.174-6.272-6.174-3.531 0-6.25 2.788-6.25 6.174s2.695 6.174 6.25 6.174 6.272-2.801 6.272-6.174m-2.763 1.503c-.59 1.451-1.976 2.395-3.51 2.39-2.09-.01-3.778-1.75-3.778-3.893.003-1.573.929-2.99 2.346-3.588a3.72 3.72 0 0 1 4.13.852 3.96 3.96 0 0 1 .812 4.239M81.248 10.7c0-3.386-2.717-6.174-6.26-6.174-3.555 0-6.273 2.788-6.273 6.174s2.74 6.174 6.272 6.174 6.261-2.787 6.261-6.174m-2.479.003c.002 2.144-1.69 3.884-3.781 3.89a3.75 3.75 0 0 1-2.686-1.14 3.94 3.94 0 0 1-1.113-2.753c.003-2.145 1.7-3.88 3.792-3.88 2.09 0 3.785 1.737 3.788 3.883M84.797 4.805a.29.29 0 0 0-.287.295l.014 11.218a.29.29 0 0 0 .286.295h1.876a.29.29 0 0 0 .286-.295v-3.822h2.143l2.138 3.98a.29.29 0 0 0 .26.16h1.948a.28.28 0 0 0 .271-.144.3.3 0 0 0-.01-.315l-2.22-4.022c1.277-.655 2.076-2 2.058-3.463 0-2.164-1.66-3.887-3.953-3.887zm5.332 5.3q-.287.108-.593.095h-2.555V7.072h2.555v.003a1.5 1.5 0 0 1 1.122.454 1.57 1.57 0 0 1 .444 1.151 1.55 1.55 0 0 1-.468 1.102 1.5 1.5 0 0 1-.505.323M107.746 10.762c0-3.296-2.555-5.915-5.932-5.915l-3.985.013a.29.29 0 0 0-.286.296v11.227a.29.29 0 0 0 .175.27.3.3 0 0 0 .111.024h3.985c3.377 0 5.932-2.62 5.932-5.915m-4.59 3.343c-.424.186-.88.285-1.342.291h-1.811V7.128h1.812a3.4 3.4 0 0 1 2.482 1.063 3.567 3.567 0 0 1 .977 2.57 3.64 3.64 0 0 1-.995 2.554c-.318.336-.7.604-1.123.79M112.14 16.407l.918-2.588h4.44l.917 2.587a.285.285 0 0 0 .287.203h1.989a.28.28 0 0 0 .261-.123.3.3 0 0 0 .026-.294l-4.3-11.216a.285.285 0 0 0-.287-.194h-2.227a.286.286 0 0 0-.287.194l-4.3 11.216a.297.297 0 0 0 .139.392q.07.032.147.026h1.991a.29.29 0 0 0 .286-.203m1.74-4.784 1.402-3.886 1.399 3.886z"
                          clip-rule="evenodd"
                        ></path>
                        <path d="M127.322 4.526c-2.471 0-4.037 1.606-4.037 3.463l-.001.018c0 2.455 1.971 3.056 3.623 3.559 1.191.362 2.216.675 2.216 1.595 0 .847-.814 1.523-2.049 1.523a3.64 3.64 0 0 1-2.52-1.053.284.284 0 0 0-.416 0l-1.066 1.094a.3.3 0 0 0-.093.216.3.3 0 0 0 .093.216 5.78 5.78 0 0 0 4.168 1.717c2.789 0 4.366-1.62 4.369-3.76 0-2.455-1.973-3.056-3.626-3.56-1.191-.362-2.217-.674-2.217-1.594 0-.679.731-1.267 1.72-1.267a2.86 2.86 0 0 1 1.913.773.28.28 0 0 0 .203.086.28.28 0 0 0 .203-.086l1.103-1.123a.3.3 0 0 0 0-.432 5.05 5.05 0 0 0-3.586-1.385M137.238 4.974a.3.3 0 0 1 .02.11v4.44h4.945v-4.44a.29.29 0 0 1 .283-.293h1.876a.29.29 0 0 1 .266.183.3.3 0 0 1 .02.11V16.3a.29.29 0 0 1-.286.295h-1.876a.29.29 0 0 1-.286-.295V11.79h-4.942v4.51a.29.29 0 0 1-.286.294h-1.876a.29.29 0 0 1-.286-.295V5.085a.28.28 0 0 1 .082-.206.3.3 0 0 1 .204-.088h1.876a.29.29 0 0 1 .266.183M24.017 2.384c2.768-.01 5.313 1.492 6.614 3.904v-.003c3.347 6.274-1.182 12.594-7.173 12.594h-4.604c-.57.001-1.117-.224-1.523-.624l-4.565-4.532a.705.705 0 0 1 .111-1.094.7.7 0 0 1 .398-.12h10.18c1.052-.01 1.896-.86 1.885-1.898a1.89 1.89 0 0 0-1.924-1.86H8.65c-.57 0-1.12-.224-1.522-.625L2.565 3.598a.705.705 0 0 1 .109-1.093.7.7 0 0 1 .397-.12z"></path>
                      </svg>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {loaded < TOTAL_FRAMES && (
        <div
          style={{
            position: "fixed",
            top: 20,
            left: 20,
            color: "white",
            zIndex: 160,
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: 12,
            letterSpacing: 1,
          }}
        >
          Loading {loaded}/{TOTAL_FRAMES}
        </div>
      )}
    </div>
  );
}
