import React from "react";
import "./components.css";
// Removed local NavBar import; common NavBar will be provided by a parent wrapper
// import NavBar from "./NavBar.jsx";
import { useState, useEffect, useRef } from "react";
import scrl1Img from "../media/Scroll-1.avif";
import scrl2Img from "../media/Scroll-2.avif";
import scrl3Img from "../media/Scroll-3.avif";
import scrl4Img from "../media/Scroll-4.avif";

const NAV_HEIGHT = "90px"; // Adjust this value based on your NavBar height

export default function ScrollSection() {
  const sectionRef = useRef(null);
  const [step, setStep] = useState(0);
  const [partIndex, setPartIndex] = useState(0); // 0..3
  const [sectionIndex, setSectionIndex] = useState(0); // 0..2
  const [scrollProgress, setScrollProgress] = useState(0); // 0..1 across this section
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // End-of-section motion: position and slide progress
  const [wrapPos, setWrapPos] = useState("fixed"); // fixed → sticky near end
  const wrapPosRef = useRef("fixed");
  const [endT, setEndT] = useState(0); // 0..1 during final slide window

  const content = [
    {
      tab: "Founders",
      num: "01",
      heading: "Prompt engineering that feels like magic",
      content:
        "Test prompts across datasets, compare models side-by-side, and collaborate seamlessly—all with automatic versioning and prompt management that actually works.",
      info: {
        q1: "Prompt management across providers",
        a1: "Centralize your prompts for all LLM providers in one intuitive workspace, eliminating fragmentation and ensuring consistency across your AI applications.",
        q2: "Multi-modal and dynamic variables",
        a2: "Test how your prompts perform with different inputs, images, and dynamic RAG context in real-time, identifying the optimal configurations for your specific use cases.",
        q3: "Automatic version history",
        a3: "Never lose your work with comprehensive version tracking that captures every change, allowing you to compare iterations and revert to previous versions instantly.",
      },
    },
    {
      tab: "Community",
      num: "02",
      heading: "AI-powered testing that writes itself",
      content:
        "Generate comprehensive evaluations with AI, visualize performance trends, and debug failed cases instantly in your most complicated workflows.",
      info: {
        q1: "Magical test set up",
        a1: "Create robust test suites in seconds with AI-assisted generation that identifies edge cases and potential failure modes you might have missed.",
        q2: "Historical performance trends",
        a2: "Track how your AI's performance evolves over time with intuitive visualizations that highlight improvements and regressions across all key metrics.",
        q3: "Rollback to any prompt version",
        a3: "Instantly revert to previous versions when issues arise, with the ability to compare performance metrics between any two points in your evaluation history.",
      },
    },
    {
      tab: "Resources ",
      num: "03",
      heading: "Ship AI with unshakeable confidence",
      content:
        "Push to any environment with built-in controls, smart diffing, instant rollbacks, and drop-in integration that fits your existing codebase.",
      info: {
        q1: "Multi-environment Resources  ments",
        a1: "Manage the entire lifecycle from development to production with environment-specific configurations that ensure smooth transitions between stages.",
        q2: "Smart diffing across versions",
        a2: "Understand exactly what changed between Resources  ments with intelligent diffing that highlights modifications to prompts, models, and configuration settings.",
        q3: "Instant rollbacks",
        a3: "Recover from issues in seconds with one-click rollbacks that restore previous configurations, keeping your AI services reliable and your users happy.",
      },
    },
    {
      tab: "Capital",
      num: "04",
      heading: "Turn production data into a competitive edge",
      content:
        "Visualize complex AI workflows, run real-time evaluations, collect real-world performance data, and optimize for cost, latency, and quality at scale.",
      info: {
        q1: "Full traces and spans",
        a1: "Understand the complete journey of each request through your AI system with detailed visualization of execution paths, helping you identify bottlenecks and optimization opportunities.",
        q2: "Continuous evaluations",
        a2: "Automatically test your production AI against benchmark datasets and real-time inputs, ensuring performance remains consistent as user patterns and data distributions evolve.",
        q3: "Human annotations",
        a3: "Enrich your training and evaluation datasets with human feedback collected directly from your Capitaling interface, creating a virtuous cycle of continuous improvement.",
      },
    },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const PIN_P = 0.99; // switch to sticky ≥ 99%
    const UNPIN_P = 0.985; // hysteresis
    const END_START = 0.9; // start upward translation at 90%

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const totalScrollable = Math.max(rect.height - vh, 1);
        const passed = Math.min(Math.max(-rect.top, 0), totalScrollable);
        const p = passed / totalScrollable; // 0..1

        const s = Math.min(11, Math.max(0, Math.floor(p * 12))); // 12 steps
        setScrollProgress(p);
        setStep(s);
        setPartIndex(Math.floor(s / 3));
        setSectionIndex(s % 3);

        // Local end slide progress using easeInOutSine
        const denom = Math.max(1e-6, 1 - END_START);
        const tLinear = Math.max(0, Math.min(1, (p - END_START) / denom));
        const eased = 0.5 - 0.5 * Math.cos(Math.PI * tLinear);
        setEndT(eased);

        // Sticky handoff like hero
        const wantSticky =
          wrapPosRef.current === "sticky" ? p >= UNPIN_P : p >= PIN_P;
        if (wantSticky && wrapPosRef.current !== "sticky") {
          wrapPosRef.current = "sticky";
          setWrapPos("sticky");
        } else if (!wantSticky && wrapPosRef.current !== "fixed") {
          wrapPosRef.current = "fixed";
          setWrapPos("fixed");
        }

        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Scroll-to-section for tabs and questions
  const handleTabClick = (idx) => {
    const el = sectionRef.current;
    if (!el) return;
    const sectionTop = el.getBoundingClientRect().top + window.scrollY;
    const totalScrollable = Math.max(el.offsetHeight - window.innerHeight, 0);
    const targetProgress = (idx * 3 + 1 / 2) / 12; // center of that tab's section
    const targetScroll = sectionTop + totalScrollable * targetProgress;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const handleQuestionClick = (idx) => {
    const el = sectionRef.current;
    if (!el) return;
    const sectionTop = el.getBoundingClientRect().top + window.scrollY;
    const totalScrollable = Math.max(el.offsetHeight - window.innerHeight, 0);
    // Each tab has 3 questions, so idx is 0..2 within the current tab
    const tabIdx = partIndex;
    const targetProgress = (tabIdx * 3 + idx + 0.5) / 12; // center of that question
    const targetScroll = sectionTop + totalScrollable * targetProgress;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const part = content[partIndex] || content[0];
  const qs = [part.info.q1, part.info.q2, part.info.q3];
  const as = [part.info.a1, part.info.a2, part.info.a3];

  // Right pane images scrolling
  const images = [scrl1Img, scrl2Img, scrl3Img, scrl4Img];
  const offsetIndex = Math.max(
    0,
    Math.min(images.length - 1, scrollProgress * images.length)
  );
  const offsetVh = offsetIndex * 100;

  // Translate upward at end; no scale/radius
  const SLIDE_VH = 110;
  const mirrorTransform =
    endT > 0
      ? {
          transform: `translateY(${-SLIDE_VH * endT}vh)`,
          transformOrigin: "center top",
          willChange: "transform",
        }
      : {};

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full"
      style={{ height: "1200lvh", marginBottom: `-${SLIDE_VH}vh` }}
    >
      <div
        className="px-grid-margin pointer-events-none top-0 h-lvh w-full overflow-hidden"
        style={{
          position: wrapPos,
          zIndex: 100,
          top: NAV_HEIGHT, // offset by NavBar height
          ...mirrorTransform,
        }}
      >
        <div className="max-w-grid relative mx-auto flex h-full flex-col text-black">
          <div
            className="flex flex-row items-center justify-between"
            style={{ zIndex: 10, position: "relative" }}
          >
            <ul
              className="text-black hover:text-black pointer-events-auto flex items-center gap-2 my-4 w-[40%]"
              role="tablist"
            >
              <li
                className={`rounded-full border p-2 transition-colors duration-300 select-none cursor-pointer text-black
                  ${
                    partIndex === 0
                      ? "min-w-[150px] max-w-[200px]"
                      : "min-w-[130px] max-w-[200px]"
                  }
                  ${
                    hoveredIndex === 0
                      ? "border-pebble-900"
                      : hoveredIndex !== null
                      ? "border-pebble-200"
                      : "border-transparent"
                  }
                `}
                role="tab"
                aria-label="Founders"
                aria-selected={partIndex === 0}
                id="tab-:r0:-0"
                aria-controls="tabpanel-:r0:-0"
                onMouseEnter={() => setHoveredIndex(0)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleTabClick(0)}
                style={{
                  opacity: partIndex === 0 || hoveredIndex === 0 ? 1 : 0.45,
                  transition: "opacity 250ms var(--ease-in-out)",
                }}
              >
                <div className="flex items-center">
                  <div className="relative size-10 shrink-0">
                    <div
                      className={`absolute -inset-2 ${
                        partIndex === 0 ? "spin-linear-20" : ""
                      }`}
                      style={{ transform: "rotate(3285.35deg)" }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{ transform: "rotate(-4934.47deg)" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 64 64"
                          className="absolute inset-0"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            d="m32 8 18.764 9.036 4.634 20.304-12.985 16.283H21.587L8.602 37.341l4.634-20.305z"
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          d="m32 8 15.427 5.615 8.208 14.217L52.785 44 40.209 54.553H23.79L11.215 44l-2.85-16.168 8.208-14.217z"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>
                    <div className="text-xs absolute inset-0 flex items-center justify-center text-center">
                      01
                    </div>
                  </div>
                  <div
                    className="flex flex-col overflow-hidden"
                    style={{
                      width: partIndex === 0 ? 150 : 110,
                      transition: "width 300ms var(--ease-in-out)",
                    }}
                  >
                    <div className="relative pl-4">
                      <div className="text-xs">Founders</div>
                      {partIndex === 0 && (
                        <div className="text-xs text-black absolute top-0 right-0 text-right">
                          <span>{sectionIndex + 1}</span>
                          <span className="whitespace-pre"> / 3</span>
                        </div>
                      )}
                    </div>
                    <div
                      className="pl-4"
                      style={{
                        height: partIndex === 0 ? "auto" : 0,
                        opacity: partIndex === 0 ? 1 : 0,
                        transition: "opacity 300ms var(--ease-in-out)",
                      }}
                    >
                      <div className="pt-2">
                        {partIndex === 0 && (
                          <div className="relative flex h-0.5 items-center gap-1">
                            {[0, 1, 2].map((i) => {
                              const local = Math.max(
                                0,
                                Math.min(3, scrollProgress * 12 - partIndex * 3)
                              );
                              const w =
                                Math.max(0, Math.min(1, local - i)) * 100;
                              return (
                                <div
                                  className="relative flex h-full basis-full items-center"
                                  key={i}
                                >
                                  <div className="bg-pebble-300 h-[2px] basis-full" />
                                  <div
                                    className="bg-pebble-900 absolute left-0 top-0 h-[2px] progress-fill"
                                    style={{
                                      width: `${w}%`,
                                      transition: "none",
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {/* Tab 1 */}
              <li
                className={`rounded-full border p-2 pr-4 transition-colors duration-300 select-none cursor-pointer
                  ${
                    partIndex === 1
                      ? "min-w-[150px] max-w-[200px]"
                      : "min-w-[130px] max-w-[200px]"
                  }
                  ${
                    hoveredIndex === 1
                      ? "border-pebble-900"
                      : hoveredIndex !== null
                      ? "border-pebble-200"
                      : "border-transparent"
                  }
                `}
                role="tab"
                aria-label="Community"
                aria-selected={partIndex === 1}
                id="tab-:r0:-1"
                aria-controls="tabpanel-:r0:-1"
                onMouseEnter={() => setHoveredIndex(1)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleTabClick(1)}
                style={{
                  opacity: partIndex === 1 || hoveredIndex === 1 ? 1 : 0.45,
                  transition: "opacity 250ms var(--ease-in-out)",
                }}
              >
                <div className="flex items-center">
                  <div className="relative size-10 shrink-0">
                    <div
                      className={`absolute -inset-2 ${
                        partIndex === 1 ? "spin-linear-20" : ""
                      }`}
                      style={{ transform: "none" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                      >
                        <circle
                          cx="32"
                          cy="32"
                          r="24"
                          fill="none"
                          stroke="currentColor"
                          strokeDasharray="5 3"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>
                    <div className="text-xs absolute inset-0 flex items-center justify-center text-center">
                      02
                    </div>
                  </div>
                  <div
                    className="flex flex-col overflow-hidden"
                    style={{
                      width: partIndex === 1 ? 150 : 110,
                      transition: "width 300ms var(--ease-in-out)",
                    }}
                  >
                    <div className="relative pl-4">
                      <div className="text-xs">Community</div>
                      {partIndex === 1 && (
                        <div className="text-xs text-black absolute top-0 right-0 text-right">
                          <span>{sectionIndex + 1}</span>
                          <span className="whitespace-pre"> / 3</span>
                        </div>
                      )}
                    </div>
                    <div
                      className="pl-4"
                      style={{
                        height: partIndex === 1 ? "auto" : 0,
                        opacity: partIndex === 1 ? 1 : 0,
                        transition: "opacity 300ms var(--ease-in-out)",
                      }}
                    >
                      <div className="pt-2">
                        {partIndex === 1 && (
                          <div className="relative flex h-0.5 items-center gap-1">
                            {[0, 1, 2].map((i) => {
                              const local = Math.max(
                                0,
                                Math.min(3, scrollProgress * 12 - 1 * 3)
                              );
                              const w =
                                Math.max(0, Math.min(1, local - i)) * 100;
                              return (
                                <div
                                  className="relative flex h-full basis-full items-center"
                                  key={i}
                                >
                                  <div className="bg-pebble-300 h-[2px] basis-full" />
                                  <div
                                    className="bg-pebble-900 absolute left-0 top-0 h-[2px] progress-fill"
                                    style={{
                                      width: `${w}%`,
                                      transition: "none",
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {/* Tab 2 */}
              <li
                className={`rounded-full border p-2 pr-4 transition-colors duration-300 select-none cursor-pointer
                  ${
                    partIndex === 2
                      ? "min-w-[150px] max-w-[200px]"
                      : "min-w-[130px] max-w-[200px]"
                  }
                  ${
                    hoveredIndex === 2
                      ? "border-pebble-900"
                      : hoveredIndex !== null
                      ? "border-pebble-200"
                      : "border-transparent"
                  }
                `}
                role="tab"
                aria-label="Resources "
                aria-selected={partIndex === 2}
                id="tab-:r0:-2"
                aria-controls="tabpanel-:r0:-2"
                onMouseEnter={() => setHoveredIndex(2)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleTabClick(2)}
                style={{
                  opacity: partIndex === 2 || hoveredIndex === 2 ? 1 : 0.45,
                  transition: "opacity 250ms var(--ease-in-out)",
                }}
              >
                <div className="flex items-center">
                  <div className="relative size-10 shrink-0">
                    <div
                      className={`absolute -inset-2 ${
                        partIndex === 2 ? "spin-linear-20" : ""
                      }`}
                      style={{ transform: "none" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          d="M30.803 8.03c-7.956.39-14.893 4.654-18.965 10.946L19.53 24.8l-8.893-3.75A23.9 23.9 0 0 0 8 32c0 3.945.952 7.667 2.638 10.95l8.892-3.75-7.691 5.825c4.072 6.291 11.01 10.555 18.964 10.946L32 46.4l1.198 9.57c7.954-.392 14.89-4.656 18.963-10.947l-7.69-5.823 8.89 3.749A23.9 23.9 0 0 0 56 32c0-3.944-.951-7.666-2.637-10.948L44.472 24.8l7.69-5.824C48.092 12.685 41.155 8.42 33.2 8.029l-1.198 9.572z"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>
                    <div className="text-xs absolute inset-0 flex items-center justify-center text-center">
                      03
                    </div>
                  </div>
                  <div
                    className="flex flex-col overflow-hidden"
                    style={{
                      width: partIndex === 2 ? 150 : 110,
                      transition: "width 300ms var(--ease-in-out)",
                    }}
                  >
                    <div className="relative pl-4">
                      <div className="text-xs">Resources </div>
                      {partIndex === 2 && (
                        <div className="text-xs text-black absolute top-0 right-0 text-right">
                          <span>{sectionIndex + 1}</span>
                          <span className="whitespace-pre"> / 3</span>
                        </div>
                      )}
                    </div>
                    <div
                      className="pl-4"
                      style={{
                        height: partIndex === 2 ? "auto" : 0,
                        opacity: partIndex === 2 ? 1 : 0,
                        transition: "opacity 300ms var(--ease-in-out)",
                      }}
                    >
                      <div className="pt-2">
                        {partIndex === 2 && (
                          <div className="relative flex h-0.5 items-center gap-1">
                            {[0, 1, 2].map((i) => {
                              const local = Math.max(
                                0,
                                Math.min(3, scrollProgress * 12 - 2 * 3)
                              );
                              const w =
                                Math.max(0, Math.min(1, local - i)) * 100;
                              return (
                                <div
                                  className="relative flex h-full basis-full items-center"
                                  key={i}
                                >
                                  <div className="bg-pebble-300 h-[2px] basis-full" />
                                  <div
                                    className="bg-pebble-900 absolute left-0 top-0 h-[2px] progress-fill"
                                    style={{
                                      width: `${w}%`,
                                      transition: "none",
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {/* Tab 3 */}
              <li
                className={`rounded-full border p-2 pr-4 transition-colors duration-300 select-none cursor-pointer
                 ${
                   partIndex === 3
                     ? "min-w-[150px] max-w-[200px]"
                     : "min-w-[130px] max-w-[200px]"
                 }
                  ${
                    hoveredIndex === 3
                      ? "border-pebble-900"
                      : hoveredIndex !== null
                      ? "border-pebble-200"
                      : "border-transparent"
                  }
                `}
                role="tab"
                aria-label="Capital"
                aria-selected={partIndex === 3}
                id="tab-:r0:-3"
                aria-controls="tabpanel-:r0:-3"
                onMouseEnter={() => setHoveredIndex(3)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleTabClick(3)}
                style={{
                  opacity: partIndex === 3 || hoveredIndex === 3 ? 1 : 0.45,
                  transition: "opacity 250ms var(--ease-in-out)",
                }}
              >
                <div className="flex items-center">
                  <div className="relative size-10 shrink-0">
                    <div
                      className={`absolute -inset-2 ${
                        partIndex === 3 ? "spin-linear-20" : ""
                      }`}
                      style={{ transform: "none" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                      >
                        <circle
                          cx="32"
                          cy="32"
                          r="20"
                          fill="none"
                          stroke="currentColor"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                      >
                        <circle
                          cx="32"
                          cy="32"
                          r="24"
                          fill="none"
                          stroke="currentColor"
                          strokeDasharray="5 3"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>
                    <div className="text-xs absolute inset-0 flex items-center justify-center text-center">
                      04
                    </div>
                  </div>
                  <div
                    className="flex flex-col overflow-hidden"
                    style={{
                      width: partIndex === 3 ? 150 : 110,
                      transition: "width 300ms var(--ease-in-out)",
                    }}
                  >
                    <div className="relative pl-4">
                      <div className="text-xs">Capital</div>
                      {partIndex === 3 && (
                        <div className="text-xs text-black absolute top-0 right-0 text-right">
                          <span>{sectionIndex + 1}</span>
                          <span className="whitespace-pre"> / 3</span>
                        </div>
                      )}
                    </div>
                    <div
                      className="pl-4"
                      style={{
                        height: partIndex === 3 ? "auto" : 0,
                        opacity: partIndex === 3 ? 1 : 0,
                        transition: "opacity 300ms var(--ease-in-out)",
                      }}
                    >
                      <div className="pt-2">
                        {partIndex === 3 && (
                          <div className="relative flex h-0.5 items-center gap-1">
                            {[0, 1, 2].map((i) => {
                              const local = Math.max(
                                0,
                                Math.min(3, scrollProgress * 12 - 3 * 3)
                              );
                              const w =
                                Math.max(0, Math.min(1, local - i)) * 100;
                              return (
                                <div
                                  className="relative flex h-full basis-full items-center"
                                  key={i}
                                >
                                  <div className="bg-pebble-300 h-[2px] basis-full" />
                                  <div
                                    className="bg-pebble-900 absolute left-0 top-0 h-[2px] progress-fill"
                                    style={{
                                      width: `${w}%`,
                                      transition: "none",
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            <aside className="bg-pebble-100 pointer-events-auto hidden h-10 items-center gap-4 overflow-clip rounded-[8px] pl-4 pr-2 lg:flex relative z-10">
              <p className="atlas-web-sm pointer-events-none cursor-default">
                Learn more
              </p>
              <ul className="atlas-web-mono flex items-center">
                <li
                  className="flex justify-center"
                  style={{ opacity: 1, width: "auto" }}
                >
                  <a href="/editor" className="px-3 text-nowrap text-center">
                    Editor
                  </a>
                </li>
                <li
                  className="flex justify-center"
                  style={{ opacity: 1, width: "auto" }}
                >
                  <a href="/datasets" className="px-3 text-nowrap text-center">
                    Datasets
                  </a>
                </li>
              </ul>
            </aside>
          </div>

          <div className="pointer-events-none relative h-full xl:mt-8">
            {/* Panel (visible) */}
            <div
              role="tabpanel"
              aria-labelledby="tab-:r0:-0"
              id="tabpanel-:r0:-0"
              aria-hidden="false"
              className="absolute left-0 top-0 bottom-30 flex flex-col justify-between text-[#0a1d08]"
              style={{ opacity: 1, visibility: "visible" }}
            >
              <div className="pointer-events-auto flex max-w-[500px] flex-col gap-2 pt-0">
                <h2
                  key={`h2-${partIndex}`}
                  className="atlas-web-base text-pretty fade-in-up-slow text-3xl"
                >
                  {part.heading}
                </h2>
                <p
                  key={`p-${partIndex}`}
                  className="text-pretty fade-in-up-slow text-xl"
                  style={{ animationDelay: "120ms" }}
                >
                  {part.content}
                </p>
              </div>

              <ol
                className="pointer-events-auto flex max-w-[500px] flex-col"
                role="tablist"
              >
                {[0, 1, 2].map((idx) => {
                  const isActive = sectionIndex === idx;
                  return (
                    <li
                      key={idx}
                      className="border-pebble-200 flex border-t pt-3 2xl:pt-4"
                      role="tab"
                    >
                      <div
                        className="atlas-web-sm 2xl:atlas-web-base w-8 select-none text-black 2xl:w-12"
                        aria-hidden="true"
                      >
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`atlas-web-sm 2xl:atlas-web-base 2xl:pb-4 pb-3 text-pretty cursor-pointer ${
                            isActive ? "text-black" : "text-pebble-400"
                          }`}
                          onClick={() => handleQuestionClick(idx)}
                          title="Jump to this section"
                        >
                          {qs[idx]}
                        </h3>
                        <div
                          className={`smooth-accordion ${
                            isActive
                              ? "smooth-accordion--open"
                              : "smooth-accordion--closed"
                          }`}
                          aria-hidden={!isActive}
                        >
                          <p className="atlas-web-sm 2xl:atlas-web-base pb-4 text-pretty text-pebble-500">
                            {as[idx]}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT IMAGE PANE: continuous vertical scroll (no fade) */}
      <div
        className="pointer-events-none right-0 top-0 flex h-lvh w-[42vw] max-w-[680px] items-center justify-center pr-[var(--grid-margin)] overflow-hidden"
        aria-hidden="true"
        style={{
          position: wrapPos,
          zIndex: 1,
          top: NAV_HEIGHT, // offset by NavBar height
          ...mirrorTransform,
        }}
      >
        <div className="relative h-lvh w-full">
          <div
            className="absolute left-0 top-0 w-full"
            style={{
              height: `${images.length * 100}vh`,
              transform: `translateY(-${offsetVh}vh)`,
              willChange: "transform",
            }}
          >
            {images.map((src, i) => (
              <div
                key={i}
                className="flex h-lvh w-full items-center justify-center"
              >
                <img
                  src={src}
                  alt={`Section visual ${i + 1}`}
                  className="max-h-[70vh] w-auto object-contain drop-shadow-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background flow placeholder */}
      <div className="invisible" aria-hidden="true" />
    </section>
  );
}
