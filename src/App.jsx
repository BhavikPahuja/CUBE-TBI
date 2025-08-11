import React from "react";
import "./App.css";
import Hero from "./components/Hero.jsx";
import ScrollSection from "./components/ScrollSection.jsx";

const App = () => {
  return (
    <div className="App bg-[#fdfbf6]">
      <Hero />
      <div className="">
        <ScrollSection />
      </div>
    </div>
  );
};

export default App;
