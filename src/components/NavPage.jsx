import React, { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar.jsx";
import ScrollSection from "./ScrollSection.jsx";
import Details from "./Details.jsx";
import Library from "./Library.jsx";
import Footer from "./Footer.jsx";
import BrandGrid from './BrandGrid.jsx'

const NAV_HEIGHT = 90; // keep in sync with NavBar height

const NavPage = () => {
  const containerRef = useRef(null);
  const [showNav, setShowNav] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const compute = () => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      const bottom = top + el.offsetHeight;
      const y = window.scrollY + 1; // avoid equality edge case
      const visible = y >= top && y < bottom;
      setShowNav(visible);
      setScrollY(window.scrollY);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  // ScrollSection transition: start at bottom, move up as user scrolls
  const VIEWPORT_HEIGHT = window.innerHeight || 800;
  const START_Y = VIEWPORT_HEIGHT - NAV_HEIGHT;
  const END_Y = NAV_HEIGHT;
  // Animate from bottom to top over first 600px of scroll
  const ANIMATION_SCROLL = 600;
  const progress = Math.min(1, Math.max(0, scrollY / ANIMATION_SCROLL));
  const translateY = START_Y * (1 - progress);
  const scrollSectionStyle = {
    position: "fixed",
    left: 0,
    right: 0,
    top: NAV_HEIGHT,
    zIndex: 10,
    transform: `translateY(${translateY}px)`,
    transition: "transform 0.5s cubic-bezier(0.6,0.2,0.2,1)",
    width: "100%",
  };
  // Once animation is done, switch to static position
  const showStaticScrollSection = progress === 1;

  return (
    <div ref={containerRef}>
      {/* Fixed shared NavBar shown only while this container is in view */}
      <div
        className="bg-[#fdfdf6] border border-transparent border-b-[#0a1d08]/20 shadow-sm"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: NAV_HEIGHT,
          zIndex: 1000,
          display: showNav ? "block" : "none",
        }}
      >
        <NavBar />
      </div>

      {/* Spacer under fixed nav when visible to avoid overlap */}
      <div style={{ height: showNav ? NAV_HEIGHT : 0 }} />

      {/* Add top margin so content never appears under NavBar */}
      <div style={{ marginTop: NAV_HEIGHT }}>
        {!showStaticScrollSection ? (
          <div style={scrollSectionStyle}>
            <ScrollSection />
          </div>
        ) : (
          <ScrollSection />
        )}
        <Details />
        <BrandGrid />
        <Library />
        <Footer />
      </div>
    </div>
  );
};

export default NavPage;
