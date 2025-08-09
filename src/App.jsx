import React from "react";
import "./App.css";
import Itreator from "./components/Itreator.jsx";
import Hero from "./components/Hero.jsx";
import ScrollSection from "./components/ScrollSection.jsx";

const App = () => {
  return (
    <div className="App bg-[#fdfbf6]">
      {/* <Video /> */}
      <Hero />
      {/* <Itreator /> */}
      <ScrollSection />
      {/* <ImageRotator /> */}
    </div>
  );
};

export default App;
