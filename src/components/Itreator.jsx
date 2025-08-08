import React, { useState, useEffect } from "react";
import Spinner1 from "./spinners/Spinner1.jsx";
import Spinner2 from "./spinners/Spinner2.jsx";
import Spinner3 from "./spinners/Spinner3.jsx";
import Spinner4 from "./spinners/Spinner4.jsx";

const Itreator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeDiv, setActiveDiv] = useState(0);
  const [currentContent, setCurrentContent] = useState(0);
  const [isItreatorVisible, setIsItreatorVisible] = useState(false); // Add this state

  // Content for each section (12 total: 4 divs × 3 content each)
  const content = [
    // Iterate content (0-2)
    {
      title: "Getting Started",
      description: "Begin your journey with foundational concepts",
    },
    {
      title: "Core Principles",
      description: "Understanding the fundamental principles",
    },
    {
      title: "First Implementation",
      description: "Your first hands-on implementation",
    },

    // Evaluate content (3-5)
    {
      title: "Assessment Criteria",
      description: "Learn how to evaluate your progress",
    },
    {
      title: "Performance Metrics",
      description: "Key metrics for measuring success",
    },
    {
      title: "Optimization Strategies",
      description: "Strategies to improve performance",
    },

    // Deploy content (6-8)
    {
      title: "Deployment Preparation",
      description: "Preparing your solution for deployment",
    },
    {
      title: "Production Setup",
      description: "Setting up your production environment",
    },
    { title: "Go Live", description: "Launching your solution to production" },

    // Monitor content (9-11)
    {
      title: "Health Monitoring",
      description: "Monitor the health of your system",
    },
    {
      title: "Analytics & Insights",
      description: "Gain insights from your data",
    },
    {
      title: "Continuous Improvement",
      description: "Iterate and improve your solution",
    },
  ];

  const divData = [
    { name: "Founders", spinner: <Spinner1 />, number: "01" },
    { name: "Community", spinner: <Spinner2 />, number: "02" },
    { name: "Resources", spinner: <Spinner3 />, number: "03" },
    { name: "Capital", spinner: <Spinner4 />, number: "04" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Video component height - adjust this to match your Video component
      const videoHeight = window.innerHeight * 10.5; // 1050vh converted properly
      const currentScroll = window.pageYOffset;

      // Check if we've scrolled past the video component
      const inItreatorSection = currentScroll >= videoHeight;
      setIsItreatorVisible(inItreatorSection);

      // Only calculate progress if we're in the Itreator section
      if (inItreatorSection) {
        const itreatorScroll = currentScroll - videoHeight;
        const totalItreatorHeight =
          document.documentElement.scrollHeight -
          window.innerHeight -
          videoHeight;
        const progress = Math.min(itreatorScroll / totalItreatorHeight, 1);

        setScrollProgress(progress);

        // Calculate active div and content based on scroll progress
        const totalSections = 12; // 4 divs × 3 content each
        const currentSection = Math.floor(progress * totalSections);

        // Determine active div (0-3)
        const newActiveDiv = Math.floor(currentSection / 3);
        setActiveDiv(Math.min(newActiveDiv, 3));

        // Determine current content (0-11)
        setCurrentContent(Math.min(currentSection, 11));
      } else {
        // Reset when not in Itreator section
        setScrollProgress(0);
        setActiveDiv(0);
        setCurrentContent(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate progress for active div
  const getProgressForDiv = (divIndex) => {
    if (divIndex !== activeDiv) return 0;

    const startProgress = divIndex * 0.25; // Each div takes 25% of total scroll
    const endProgress = (divIndex + 1) * 0.25;
    const divProgress = Math.max(
      0,
      Math.min(
        1,
        (scrollProgress - startProgress) / (endProgress - startProgress)
      )
    );

    return divProgress * 100;
  };

  // Calculate current step properly (1-3, not 0-4)
  const getCurrentStep = (progress) => {
    return Math.min(Math.floor((progress / 100) * 3) + 1, 3);
  };

  // Handle click to scroll to specific div
  const handleDivClick = (divIndex) => {
    const videoHeight = window.innerHeight * 10.5;
    const targetProgress = divIndex * 0.25; // Each div starts at 25% intervals
    const totalItreatorHeight =
      document.documentElement.scrollHeight - window.innerHeight - videoHeight;
    const targetScroll = videoHeight + targetProgress * totalItreatorHeight;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="w-full">
        {/* Fixed Navigation - Only show when Itreator is visible */}
        {isItreatorVisible && (
          <div className="fixed top-0 left-0 right-0 z-40">
            <div className="flex items-center justify-center gap-6 py-4 px-8">
              {divData.map((div, index) => {
                const isActive = index === activeDiv;
                const progress = getProgressForDiv(index);

                return (
                  <div
                    key={index}
                    onClick={() => handleDivClick(index)}
                    className={`flex items-center rounded-full border transition-all duration-300 hover:border-gray-600 cursor-pointer ${
                      isActive
                        ? "border-gray-300 bg-white px-6 py-3 shadow-sm"
                        : "border-transparent bg-gray-100 px-4 py-2 opacity-60"
                    }`}
                  >
                    <div
                      className={`relative flex items-center justify-center ${
                        isActive ? "w-12 h-12" : "w-8 h-8"
                      }`}
                    >
                      {isActive ? (
                        <>
                          <div className="w-full h-full">{div.spinner}</div>
                          {/* Fixed: Perfect centering */}
                          <span className="absolute top-[62%] left-[62%] transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-gray-900 z-10 pointer-events-none">
                            {div.number}
                          </span>
                        </>
                      ) : (
                        <div className="w-full h-full rounded-full border-2 border-gray-400 flex items-center justify-center">
                          <span className="text-xs font-semibold text-gray-400">
                            {div.number}
                          </span>
                        </div>
                      )}
                    </div>

                    <div
                      className={`flex flex-col justify-center transition-all duration-300 ${
                        isActive ? "ml-4" : "ml-2"
                      }`}
                    >
                      <div
                        className={`flex items-center gap-3 ${
                          isActive ? "mb-2" : ""
                        }`}
                      >
                        <span
                          className={`font-semibold transition-all duration-300 ${
                            isActive
                              ? "text-gray-800 text-base"
                              : "text-gray-500 text-sm"
                          }`}
                        >
                          {div.name}
                        </span>
                        {isActive && (
                          <span className="text-gray-500 font-medium text-sm">
                            {getCurrentStep(progress)} / 3
                          </span>
                        )}
                      </div>

                      {/* Progress bar - only show for active div */}
                      {isActive && (
                        <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div className="flex h-full">
                            {/* Three segments */}
                            {[0, 1, 2].map((segment) => (
                              <div
                                key={segment}
                                className="flex-1 mx-px first:ml-0 last:mr-0"
                              >
                                <div
                                  className="h-full bg-gray-800 transition-all duration-300 ease-out"
                                  style={{
                                    width: `${Math.max(
                                      0,
                                      Math.min(
                                        100,
                                        (progress - segment * 33.33) * 3
                                      )
                                    )}%`,
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="pt-24 min-h-[300vh]">
          <div className="max-w-4xl mx-auto px-8 py-16">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                {content[currentContent]?.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {content[currentContent]?.description}
              </p>
            </div>

            {/* Content sections for scroll height */}
            {content.map((item, index) => (
              <div
                key={index}
                className={`py-16 transition-all duration-500 ${
                  index === currentContent ? "opacity-100" : "opacity-30"
                }`}
              >
                <div className="bg-white rounded-lg border p-8 shadow-sm">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Section {index + 1}: {item.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-500">
                      Phase {Math.floor(index / 3) + 1} - Step {(index % 3) + 1}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itreator;
