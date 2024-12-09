import React, { useEffect } from "react";
import Navbar from "./components/Navbar";

const App = () => {
  useEffect(() => {
    // Function to handle scroll and update the gradient position
    const handleScroll = () => {
      const gradient = document.body;
      if (window.scrollY > 1000) {
        gradient.style.setProperty("--gradient-position", "fixed");
      } else {
        gradient.style.setProperty("--gradient-position", "absolute");
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="px-4 md:px-8 lg:px-16 lx:px-32 2xl:px-64">
      {/* NAVBAR */}
      <Navbar />
      {/* BREADCRUMB */}
      {/* INTRODUCTION */}
      {/* FEATURED POSTS */}
      {/* POST LIST */}
    </div>
  );
};

export default App;
