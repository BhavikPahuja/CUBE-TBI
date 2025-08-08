import React, { useRef, useEffect, useState, useCallback } from "react";
import bgSvg from "../media/bg3.svg";
import NavBar from "./NavBar";
import Cube from "./Cube.jsx";
import CoverVideo from "./CoverVideo.jsx";

const Video = () => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [zoomProgress, setZoomProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Enhanced scroll handler with FIXED scroll distances
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const zoomScrollDistance = window.innerHeight * 10;
    const totalScrollDistance = window.innerHeight * 11;

    const zoomProg = Math.min(scrollTop / zoomScrollDistance, 1);
    setZoomProgress(zoomProg);

    const overallProgress = Math.min(scrollTop / totalScrollDistance, 1);
    setScrollProgress(overallProgress);
  }, []);

  // Setup scroll listener
  useEffect(() => {
    let ticking = false;

    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [handleScroll]);

  // SVG load handler
  useEffect(() => {
    if (svgRef.current) {
      setIsLoaded(true);
      handleScroll();
    }
  }, [handleScroll]);

  const getZoomScale = () => {
    const startScale = 8;
    const endScale = 1;
    return startScale - zoomProgress * (startScale - endScale);
  };

  const getContentAnimation = () => {
    if (zoomProgress < 0.2) {
      const fadeProgress = zoomProgress / 0.2;
      return {
        opacity: 1 - fadeProgress * 0.95,
        scale: 1 - fadeProgress * 0.1,
        isVisible: true,
      };
    }
    return { opacity: 0.05, scale: 0.9, isVisible: false };
  };

  const getNavBarAnimation = () => {
    if (zoomProgress < 0.3) {
      const fadeProgress = zoomProgress / 0.3;
      return {
        opacity: 1 - fadeProgress * 0.8,
        isVisible: true,
      };
    }
    return { opacity: 0.2, isVisible: false };
  };

  // CoverVideo animation - UPDATED: Video disappears at 99% zoom progress
  const getCoverVideoAnimation = () => {
    if (zoomProgress >= 0.9) {
      const videoProgress = (zoomProgress - 0.9) / 0.1; // Back to full 10% range
      const videoScale = Math.max(1.5 - videoProgress * 0.9, 0.6);
      const videoOpacity = 1;
      const position = "fixed";

      return {
        isVisible: true,
        opacity: videoOpacity,
        scale: videoScale,
        position: position,
      };
    }
    return {
      isVisible: false,
      opacity: 0,
      scale: 1.5,
      position: "fixed",
    };
  };

  // SVG transform - UPDATED: Video visibility control
  const getSvgTransform = () => {
    const zoomScale = getZoomScale();

    if (zoomProgress < 1) {
      return {
        position: "fixed",
        top: 0,
        left: 0,
        transform: `scale(${zoomScale})`,
        transformOrigin: "center center",
        display: "block",
        videoTransform: `scale(${getCoverVideoAnimation().scale})`,
        videoVisible: true, // Video visible during zoom
      };
    } else {
      const scrollTop = window.pageYOffset;
      const zoomScrollDistance = window.innerHeight * 10;
      const postZoomScroll = scrollTop - zoomScrollDistance;
      const exitDistance = window.innerHeight * 0.5; // REDUCED from 1 to 0.5 for faster exit

      if (postZoomScroll <= exitDistance) {
        const exitProgress = Math.min(postZoomScroll / exitDistance, 1);
        const translateY = -exitProgress * 200; // INCREASED from 100 to 200 for faster movement

        return {
          position: "fixed",
          top: 0,
          left: 0,
          transform: `scale(1) translateY(${translateY}vh)`,
          transformOrigin: "center center",
          display: "block",
          videoTransform: `scale(${
            getCoverVideoAnimation().scale
          }) translateY(${translateY}vh)`, // Video moves faster upward
          videoVisible: true, // Video still visible during faster exit
        };
      } else {
        return {
          display: "none",
          videoTransform: `scale(${
            getCoverVideoAnimation().scale
          }) translateY(-200vh)`, // Final position further up
          videoVisible: false,
        };
      }
    }
  };

  const getBorderRadius = () => {
    if (scrollProgress > 0.9) {
      const radiusProgress = Math.min((scrollProgress - 0.9) / 0.1, 1);
      return radiusProgress * 20;
    }
    return 0;
  };

  // FIXED HEIGHT: Constant height to prevent jitter
  const getVideoHeight = () => {
    return "1050vh"; // Slightly reduced from 1100vh due to faster exit
  };

  const zoomScale = getZoomScale();
  const contentAnimation = getContentAnimation();
  const navBarAnimation = getNavBarAnimation();
  const coverVideoAnimation = getCoverVideoAnimation();
  const svgTransform = getSvgTransform();
  const borderRadius = getBorderRadius();

  return (
    <div style={{ height: getVideoHeight() }}>
      {navBarAnimation.isVisible && (
        <div
          className="fixed top-1 left-5 right-5 z-20 transition-opacity duration-100 ease-out"
          style={{ opacity: navBarAnimation.opacity }}
        >
          <NavBar />
        </div>
      )}

      {contentAnimation.isVisible && (
        <div
          className="fixed inset-0 z-10 flex flex-col items-center justify-center transition-all duration-100 ease-out"
          style={{
            opacity: contentAnimation.opacity,
            transform: `scale(${contentAnimation.scale})`,
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <span
              className="text-[8vw] font-black leading-none text-black mb-8 text-center"
              style={{
                textShadow: `
                  0 0 10px rgba(255, 255, 255, 0.8),
                  0 0 20px rgba(255, 255, 255, 0.6),
                  0 0 30px rgba(255, 255, 255, 0.4),
                  0 0 40px rgba(59, 130, 246, 0.3),
                  0 0 50px rgba(59, 130, 246, 0.2),
                  0 0 60px rgba(59, 130, 246, 0.1)
                `,
              }}
            >
              FOUNDER'S SPACE
            </span>

            {/* <Cube /> */}

            <span className="font-sans text-[1.2rem] font-medium text-white leading-relaxed text-center max-w-[60vw] px-4">
              At CUBE, we design, encourage, mentor, iterate, and help bring a
              founder's dream and creation to market. Join us to unlock tailored
              resources, vibrant community, expert mentorship, and investor
              connections—every stage, every need.
            </span>
          </div>
        </div>
      )}

      {/* CoverVideo - UPDATED: Only visible when zoomProgress < 99% */}
      {coverVideoAnimation.isVisible && svgTransform.videoVisible && (
        <div
          className="fixed inset-0 z-15 transition-all duration-50 ease-out flex items-center justify-center"
          style={{
            opacity: coverVideoAnimation.opacity,
            transform:
              svgTransform.videoTransform ||
              `scale(${coverVideoAnimation.scale})`,
            transformOrigin: "center center",
          }}
        >
          <CoverVideo />
        </div>
      )}

      {/* SVG Background - ONLY when visible */}
      {svgTransform.display !== "none" && (
        <div
          ref={containerRef}
          className="fixed inset-0 z-0 overflow-hidden"
          style={{
            position: svgTransform.position,
            top: svgTransform.top,
            left: svgTransform.left,
            borderRadius: `${borderRadius}px`,
            backgroundColor: "#fdfbf6",
          }}
        >
          <div
            ref={svgRef}
            className="w-full h-full flex items-center justify-center"
            style={{
              transform: svgTransform.transform,
              transformOrigin: svgTransform.transformOrigin,
              borderRadius: `${borderRadius}px`,
            }}
          >
            <img
              src={bgSvg}
              alt="Animated Background"
              className="w-full h-full object-cover"
              onLoad={() => setIsLoaded(true)}
              style={{
                filter: `brightness(${1 - zoomProgress * 0.3}) contrast(${
                  1 + zoomProgress * 0.5
                }) hue-rotate(${zoomProgress * 30}deg)`,
              }}
            />
          </div>
        </div>
      )}

      {/* Spacer to ensure smooth transition to Iterator */}
      {svgTransform.display === "none" && (
        <div style={{ height: "10vh", backgroundColor: "#fdfbf6" }}></div>
      )}
    </div>
  );
};

export default Video;
