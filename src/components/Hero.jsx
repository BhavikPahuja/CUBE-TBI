import React, { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import CoverVideo from "./CoverVideo";
import video from "../media/frame_001.mp4";

const NAV_FADE_END = 0.1;
const HERO_FADE_START = 0.12;
const HERO_FADE_END = 0.55;
const HERO_MIN_SCALE = 0.85;

// Canvas/video pin thresholds
const CANVAS_PIN_P = 0.99;
const CANVAS_UNPIN_P = 0.985;
const CANVAS_SLIDE_START = 0.9;
const CANVAS_SLIDE_END = 1.0;
const CANVAS_SLIDE_DISTANCE_VH = 110;

const VIRTUAL_FRAMES = 240; // smoother scrubbing

export default function ScrollVideo() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  // UI state
  const [navOpacity, setNavOpacity] = useState(1);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [heroScale, setHeroScale] = useState(1);
  const [canvasPos, setCanvasPos] = useState("fixed");
  const [canvasSlideVh, setCanvasSlideVh] = useState(0);
  const [canvasScale, setCanvasScale] = useState(1);
  const [canvasRadius, setCanvasRadius] = useState(0);
  const [overlayPos, setOverlayPos] = useState("fixed");
  const [overlayScaleFactor, setOverlayScaleFactor] = useState(1);

  const mountedRef = useRef(true);
  const canvasPosRef = useRef("fixed");
  const overlayPosRef = useRef("fixed");

  // keep latest progress for smooth scrubbing loop
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // SCROLL HANDLER
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const clamp01 = (v) => Math.min(1, Math.max(0, v));

    let ticking = false;
    const handleTick = () => {
      const rect = el.getBoundingClientRect();
      const viewport =
        window.innerHeight || document.documentElement.clientHeight;
      const total = Math.max(1, rect.height - viewport);
      const scrolled = Math.min(total, Math.max(0, -rect.top));
      const p = scrolled / total; // 0 → 1 progress

      scrollProgressRef.current = p; // save progress for video scrubber

      // --- Navbar fade
      const nOp = p < NAV_FADE_END ? 1 - p / NAV_FADE_END : 0;

      // --- Hero opacity & scale
      let hOp;
      if (p <= HERO_FADE_START) hOp = 1;
      else if (p >= HERO_FADE_END) hOp = 0;
      else hOp = 1 - (p - HERO_FADE_START) / (HERO_FADE_END - HERO_FADE_START);

      let scale;
      if (p <= HERO_FADE_START) scale = 1;
      else if (p >= HERO_FADE_END) scale = HERO_MIN_SCALE;
      else {
        const t = (p - HERO_FADE_START) / (HERO_FADE_END - HERO_FADE_START);
        const eased = t * t * (3 - 2 * t);
        scale = 1 - (1 - HERO_MIN_SCALE) * eased;
      }

      // --- Canvas (video container) pin logic
      const wantStickyCanvas =
        canvasPosRef.current === "sticky"
          ? p >= CANVAS_UNPIN_P
          : p >= CANVAS_PIN_P;
      if (wantStickyCanvas && canvasPosRef.current !== "sticky") {
        canvasPosRef.current = "sticky";
        setCanvasPos("sticky");
      } else if (!wantStickyCanvas && canvasPosRef.current !== "fixed") {
        canvasPosRef.current = "fixed";
        setCanvasPos("fixed");
      }

      // --- Overlay pin logic
      const wantStickyOverlay =
        overlayPosRef.current === "sticky"
          ? p >= CANVAS_UNPIN_P
          : p >= CANVAS_PIN_P;
      if (wantStickyOverlay && overlayPosRef.current !== "sticky") {
        overlayPosRef.current = "sticky";
        setOverlayPos("sticky");
      } else if (!wantStickyOverlay && overlayPosRef.current !== "fixed") {
        overlayPosRef.current = "fixed";
        setOverlayPos("fixed");
      }

      // --- Slide-out & shrink effect
      let slideVh = 0;
      let slideT = 0;
      if (p >= CANVAS_SLIDE_START) {
        const denom = Math.max(1e-6, CANVAS_SLIDE_END - CANVAS_SLIDE_START);
        const t = clamp01((p - CANVAS_SLIDE_START) / denom);
        const eased = 0.5 - 0.5 * Math.cos(Math.PI * t); // easeInOutSine
        slideT = eased;
        slideVh = -CANVAS_SLIDE_DISTANCE_VH * eased;
      }

      const cScale = 1 - 0.2 * slideT;
      const cRadius = Math.round(24 * slideT);
      const oScaleFactor = 1 - 0.2 * slideT;

      if (mountedRef.current) {
        setNavOpacity(nOp);
        setHeroOpacity(hOp);
        setHeroScale(scale);
        setCanvasSlideVh(slideVh);
        setCanvasScale(cScale);
        setCanvasRadius(cRadius);
        setOverlayScaleFactor(oScaleFactor);
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

  // Smooth video scrubbing loop
  useEffect(() => {
    let rafId;
    const video = videoRef.current;
    if (!video) return;

    const scrub = () => {
      if (video.duration > 0) {
        const progress = scrollProgressRef.current;
        const frameIndex = Math.floor(progress * VIRTUAL_FRAMES);
        const newTime = (frameIndex / VIRTUAL_FRAMES) * video.duration * 0.97; // cap at 97%
        if (Math.abs(video.currentTime - newTime) > 0.03) {
          video.currentTime = newTime;
        }
      }
      rafId = requestAnimationFrame(scrub);
    };
    rafId = requestAnimationFrame(scrub);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="text-black z-200"
      style={{
        position: "relative",
        height: "400lvh",
        marginBottom: `-${CANVAS_SLIDE_DISTANCE_VH}vh`,
      }}
    >
      {/* Navbar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          opacity: navOpacity,
          transition: "opacity 0.18s linear",
          pointerEvents: navOpacity > 0 ? "auto" : "none",
        }}
      >
        <NavBar />
      </div>

      {/* Video container (replaces canvas) */}
      <div style={{ position: "relative" }}>
        <video
          ref={videoRef}
          src={video}
          muted
          playsInline
          preload="auto"
          style={{
            position: canvasPos === "sticky" ? "sticky" : "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            background: "black",
            zIndex: 0,
            transform: `translateY(${canvasSlideVh}vh) scale(${canvasScale})`,
            transformOrigin: "center center",
            borderRadius: `${canvasRadius}px`,
            willChange: "transform, border-radius",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Hero text overlay */}
      <div
        className="inset-x-0 top-0 z-[150] flex flex-col items-center px-4 sm:px-6 pointer-events-none origin-center"
        style={{
          position: overlayPos === "sticky" ? "sticky" : "fixed",
          paddingTop: "clamp(5rem, 8vw, 9rem)",
          opacity: heroOpacity,
          transform: `scale(${heroScale * overlayScaleFactor})`,
          transition: "opacity 0.16s linear, transform 0.25s ease-out",
          willChange: "opacity, transform",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <h1 className="max-w-[1000px] text-center font-sans leading-tight text-meadow-900 text-xl sm:text-2xl md:text-3xl xl:text-4xl tracking-tight">
          Tuning creative minds with the will to create
          <br className="hidden sm:block" />
          into a successful founder—start your story.
        </h1>
      </div>
    </div>
  );
}
