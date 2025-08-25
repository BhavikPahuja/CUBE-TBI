import React from "react";
import "./App.css";
import Hero from "./components/Hero.jsx";
import NavPage from "./components/NavPage.jsx";

const App = () => {
  // Removed scroll restoration logic so site always starts at top
  return (
    <div className="App relative bg-[#fdfbf6]">
      <Hero />
      <NavPage />
    </div>
  );
};

export default App;
