import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    // Add or remove the `homepage-bg` class based on the current route
    if (location.pathname === "/") {
      document.body.classList.add("homepage-bg");
    } else {
      document.body.classList.remove("homepage-bg");
    }

    const handleScroll = () => {
      const gradientElement = document.querySelector(".homepage-bg::before");
      if (window.scrollY > 1000) {
        document.body.classList.add("hide-gradient");
      } else {
        document.body.classList.remove("hide-gradient");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount to avoid side effects
    return () => {
      document.body.classList.remove("homepage-bg");
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  return (
    <div className="px-4 md:px-8 lg:px-16 lx:px-32 2xl:px-64">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
