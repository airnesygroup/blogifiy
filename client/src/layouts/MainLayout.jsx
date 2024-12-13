import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const body = document.body;
      const homepageBg = document.querySelector(".homepage-bg");

      if (window.scrollY > 1000) {
        body.classList.add("hide-gradient");

        // Apply dark mode gradient (if dark mode is active)
        if (document.body.classList.contains('dark-mode')) {
          homepageBg?.style.setProperty("--gradient-background", "none");
        }

        // Apply light mode gradient (if light mode is active)
        if (document.body.classList.contains('light-mode')) {
          homepageBg?.style.setProperty("--gradient-background", "none");
        }

      } else {
        body.classList.remove("hide-gradient");

        // Revert dark mode gradient
        if (document.body.classList.contains('dark-mode')) {
          homepageBg?.style.setProperty(
            "--gradient-background",
            "linear-gradient(to top, transparent, rgb(230, 230, 255))"
          );
        }

        // Revert light mode gradient
        if (document.body.classList.contains('light-mode')) {
          homepageBg?.style.setProperty(
            "--gradient-background",
            "linear-gradient(to top, transparent, rgb(255, 255, 255))"
          );
        }
      }

      // Add or remove the homepage-bg class based on the route
      if (location.pathname === "/") {
        document.body.classList.add("homepage-bg");
      } else {
        document.body.classList.remove("homepage-bg");
      }
    };

    // Apply the gradient on initial load
    const homepageBg = document.querySelector(".homepage-bg");
    if (homepageBg) {
      if (document.body.classList.contains("dark-mode")) {
        homepageBg.style.setProperty(
          "--gradient-background",
          "linear-gradient(to top, transparent, rgb(230, 230, 255))"
        );
      } else if (document.body.classList.contains("light-mode")) {
        homepageBg.style.setProperty(
          "--gradient-background",
          "linear-gradient(to top, transparent, rgb(255, 255, 255))"
        );
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount to avoid side effects
    return () => {
      document.body.classList.remove("homepage-bg");
      document.body.classList.remove("hide-gradient");
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
