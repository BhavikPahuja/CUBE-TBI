import React, { useRef, useEffect, useState } from "react";
import video from "../media/Generated File August 02, 2025 - 3_12PM (2).mp4";
import NavBar from "./NavBar";

const ScrollControlledVideo = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [canScroll, setCanScroll] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const animationFrameRef = useRef(null);
  const lastScrollTimeRef = useRef(0);
  const lastVideoTimeRef = useRef(0);
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    3;
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    const handleLoadedMetadata = () => {
      setVideoDuration(video.duration);
      setIsVideoLoaded(true);
      video.currentTime = 0;
      lastVideoTimeRef.current = 0;
      video.pause();
      video.playbackRate = 1.0;
      video.defaultPlaybackRate = 1.0;
    };

    const updateVideoTime = () => {
      if (!isVideoLoaded || !video || isUpdatingRef.current) return;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const videoSectionHeight = windowHeight * 10;

      const currentScrollProgress = Math.min(
        Math.max(scrollTop / videoSectionHeight, 0),
        1
      );
      setScrollProgress(currentScrollProgress);

      const targetTime = currentScrollProgress * videoDuration;
      const currentTime = video.currentTime;

      const currentVideoProgress =
        videoDuration > 0 ? currentTime / videoDuration : 0;
      setVideoProgress(currentVideoProgress);

      const shouldAllowScroll =
        currentVideoProgress >= 0.999 || currentScrollProgress >= 1.0;
      if (shouldAllowScroll !== canScroll) {
        setCanScroll(shouldAllowScroll);
      }

      if (scrollTop <= videoSectionHeight && !canScroll) {
        const timeDifference = Math.abs(targetTime - currentTime);

        if (timeDifference > 0.008) {
          isUpdatingRef.current = true;
          try {
            const smoothingFactor = 0.25;
            const interpolatedTime =
              currentTime + (targetTime - currentTime) * smoothingFactor;
            video.currentTime = interpolatedTime;
            lastVideoTimeRef.current = interpolatedTime;
            if (!video.paused) {
              video.pause();
            }
          } catch (error) {
            console.warn("Video time update failed:", error);
          } finally {
            isUpdatingRef.current = false;
          }
        }
      }
    };

    const handleScroll = () => {
      const now = performance.now();
      if (now - lastScrollTimeRef.current < 4) {
        return;
      }
      lastScrollTimeRef.current = now;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (!canScroll) {
        animationFrameRef.current = requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(updateVideoTime);
          });
        });
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    window.addEventListener("scroll", handleScroll, { passive: true });
    video.addEventListener("seeking", () => {
      isUpdatingRef.current = true;
    });
    video.addEventListener("seeked", () => {
      isUpdatingRef.current = false;
    });
    video.addEventListener("error", (e) => {
      console.error("Video error:", e);
      isUpdatingRef.current = false;
    });

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      window.removeEventListener("scroll", handleScroll);
      video.removeEventListener("seeking", () => {});
      video.removeEventListener("seeked", () => {});
      video.removeEventListener("error", () => {});
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [videoDuration, isVideoLoaded, canScroll]);

  const getTransformationValues = () => {
    if (videoProgress < 0.9) {
      return { scale: 1, borderRadius: 0 };
    } else if (videoProgress >= 0.9 && videoProgress < 1.0) {
      const transformProgress = (videoProgress - 0.9) / 0.1;
      const scale = 1 - transformProgress * 0.1;
      const borderRadius = transformProgress * 24;
      return { scale, borderRadius };
    } else {
      return { scale: 0.9, borderRadius: 24 };
    }
  };

  const getSharedAnimation = () => {
    if (scrollProgress < 0.4) {
      const progress = scrollProgress / 0.4;
      const opacity = 1 - progress;
      const scale = 1 - progress * 0.3;
      // Rotation is now handled by CSS, so it's removed from here.
      return { opacity, scale, isVisible: true };
    } else {
      return { opacity: 0, scale: 0.7, isVisible: false };
    }
  };

  const transformValues = getTransformationValues();
  const sharedAnimation = getSharedAnimation();

  return (
    <>
      {sharedAnimation.isVisible && (
        <div
          className="fixed inset-0 z-10 flex flex-col items-center justify-center transition-opacity duration-100 ease-out"
          style={{
            opacity: sharedAnimation.opacity,
            transform: `scale(${sharedAnimation.scale})`,
          }}
        >
          <NavBar />
          <div className="flex flex-col items-center justify-center gap-10 mb-[2vh]">
            <span className="text-[8vw] font-black leading-none bg-black bg-clip-text text-transparent [text-shadow:0_0_30px_rgba(0,0,0,0.6),_0_0_50px_rgba(59,130,246,0.2)]">
              FOUNDER'S SPACE
            </span>
            <div className="w-[250px] h-[250px] [perspective:1000px] mb-[4vh] transition-transform duration-300 ease-in-out hover:scale-110">
              <div
                className="relative w-full h-full [transform-style:preserve-3d] cube-spinner"
                // The transform style is now controlled by the .cube-spinner class in App.css
              >
                {/* Front Face */}
                <div className="absolute flex items-center justify-center w-full h-full p-4 text-lg font-bold text-center text-white bg-black/80 border border-white/20 [transform:rotateY(0deg)_translateZ(125px)]">
                  "Everything you need to build-from tech and design to product
                  and infrastructure-right at your fingertips."
                </div>
                {/* Back Face */}
                <div className="absolute flex items-center justify-center w-full h-full p-4 text-lg font-bold text-center text-white bg-black/80 border border-white/20 [transform:rotateY(180deg)_translateZ(125px)]">
                  "Everything you need to build-from tech and design to product
                  and infrastructure-right at your fingertips."
                </div>
                {/* Right Face */}
                <div className="absolute flex items-center justify-center w-full h-full p-4 text-lg font-bold text-center text-white bg-black/80 border border-white/20 [transform:rotateY(90deg)_translateZ(125px)]">
                  "Everything you need to build-from tech and design to product
                  and infrastructure-right at your fingertips."
                </div>
                {/* Left Face */}
                <div className="absolute flex items-center justify-center w-full h-full p-4 text-lg font-bold text-center text-white bg-black/80 border border-white/20 [transform:rotateY(-90deg)_translateZ(125px)]">
                  "Everything you need to build-from tech and design to product
                  and infrastructure-right at your fingertips."
                </div>
                {/* Top Face */}
                <div className="absolute w-full h-full bg-black/80 border border-white/20 [transform:rotateX(90deg)_translateZ(125px)]"></div>
                {/* Bottom Face */}
                <div className="absolute w-full h-full bg-black/80 border border-white/20 [transform:rotateX(-90deg)_translateZ(125px)]"></div>
              </div>
            </div>
            <span className="font-sans text-[1.2rem] font-medium text-white leading-relaxed text-center max-w-[60vw] [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
              At CUBE, we design, encourage, mentor, iterate, and help bring a
              founder's dream and creation to market. Join us to unlock tailored
              resources, vibrant community, expert mentorship, and investor
              connections—every stage, every need.
            </span>
          </div>
        </div>
      )}

      <div
        ref={containerRef}
        className="fixed inset-0 z-0 bg-black"
        style={{
          transform: `scale(${transformValues.scale})`,
          borderRadius: `${transformValues.borderRadius}px`,
          transition: videoProgress >= 0.9 ? "all 0.1s ease-out" : "none",
        }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="metadata"
          loop={false}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          style={{
            borderRadius: `${transformValues.borderRadius}px`,
            transition:
              videoProgress >= 0.9 ? "border-radius 0.1s ease-out" : "none",
          }}
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div style={{ height: "1000vh" }} />

      {canScroll && (
        <div className="relative z-20 bg-white min-h-[200vh] p-8">
          <h1 className="text-[2.5rem] mb-4 text-gray-800">
            Welcome to the main content!
          </h1>
          <p className="text-[1.1rem] leading-relaxed mb-4 text-gray-600">
            This is where your normal page content begins after the
            scroll-controlled video.
          </p>
          <div className="h-screen my-8 flex items-center justify-center rounded-lg transition-colors duration-300 ease-in-out bg-gray-100 hover:bg-gray-400">
            <h2 className="text-[2rem] text-gray-800">Section 1</h2>
          </div>
          <div className="h-screen my-8 flex items-center justify-center rounded-lg transition-colors duration-300 ease-in-out bg-gray-200 hover:bg-gray-400">
            <h2 className="text-[2rem] text-gray-800">Section 2</h2>
          </div>
          <div className="h-screen my-8 flex items-center justify-center rounded-lg transition-colors duration-300 ease-in-out bg-gray-300 hover:bg-gray-400">
            <h2 className="text-[2rem] text-gray-800">Section 3</h2>
          </div>
        </div>
      )}
    </>
  );
};

function Video() {
  return (
    <div className="relative w-full h-full">
      <ScrollControlledVideo />
    </div>
  );
}
export default Video;
