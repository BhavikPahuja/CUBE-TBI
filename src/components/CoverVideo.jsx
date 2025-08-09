import React, { useState, useRef } from "react";
import demoVideo from "../media/demo.mp4";
import thumbnail from "../media/thumbnail.png";

const CoverVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        src={demoVideo}
        poster={thumbnail} // thumbnail image
        preload="metadata"
        className="w-full h-full object-cover"
        controls={isPlaying} // show controls only when playing
        muted
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Big Play Button Overlay - only shows when not playing */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <button
            onClick={handlePlayPause}
            className="group relative flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-full hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-110"
            aria-label="Play video"
          >
            {/* Play Icon */}
            <svg
              className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-white/10 blur-xl group-hover:bg-white/20 transition-all"></div>
          </button>
        </div>
      )}
    </div>
  );
};

export default CoverVideo;
