import React from "react";
import "./App.css";
import Hero from "./components/Hero.jsx";
import NavPage from "./components/NavPage.jsx";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="App relative bg-[#fdfbf6]">
      <Hero />
      <NavPage />
    </div>
  );
};

export default App;
