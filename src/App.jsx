import React from "react";
import "./App.css";
import Hero from "./components/Hero.jsx";
import NavPage from "./components/NavPage.jsx";

const App = () => {
  React.useEffect(() => {
    // Restore scroll position on load
    const savedScrollY = localStorage.getItem("scrollY");
    if (savedScrollY) {
      window.scrollTo(0, parseInt(savedScrollY, 10));
    }
    // Save scroll position before unload
    const handleBeforeUnload = () => {
      localStorage.setItem("scrollY", window.scrollY);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return (
    <div className="App relative bg-[#fdfbf6]">
      <Hero />
      <NavPage />
    </div>
  );
};

export default App;
