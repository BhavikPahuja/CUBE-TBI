import React from "react";
import "./App.css";
import Hero from "./components/Hero.jsx";
import ScrollSection from "./components/ScrollSection.jsx";
import Details from "./components/Details.jsx";

const App = () => {
  return (
    <div className="App bg-[#fdfbf6]">
      <Hero />
      <ScrollSection />
      {/* <Details /> */}
    </div>
  );
};

export default App;
