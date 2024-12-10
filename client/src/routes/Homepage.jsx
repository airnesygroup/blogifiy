import { useEffect, useState } from "react";
import FeaturedPosts from "../components/FeaturedPosts";
import PostList from "../components/PostList";

const Homepage = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY <= 1000 );
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="mb-9 flex flex-col gap-0">
      {/* Floating Section */}
    {/* Floating Section */}
    <div
  className={`fixed top-[45px]  left-0 w-screen z-[10000] flex items-center justify-between px-5 py-3 transition-opacity duration-300 ${
    isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
  }`}
  style={{
    zIndex: 100001,
    background: "transparent", // Set background to transparent
  }}
>
  {/* Left: Share Icon and Text */}
  <div className="flex items-center gap-3">
    <img
      src="/share.png" // Replace with the actual path to your share icon
      alt="Share Icon"
      className="w-6 h-6 md:w-5 md:h-5" // Smaller size for small screens
    />
    <span className="text-black font-semibold text-sm md:text-xs">
      UNDER 30 DIRECTORY
    </span>
  </div>

  {/* Center: Logo and Text */}
  <div className="flex flex-col items-center">
    <img
      src="/under.png" // Replace with the actual path to your center logo
      alt="Logo"
      className="w-25 h-25 md:w-40 md:h-30" // Adjusted size for small screens
    />
  </div>

  {/* Right: Search Icon */}
  <div className="flex items-center gap-2">
    <span className="text-black font-semibold text-lg md:text-sm">
      VIDEO COLLECTION
    </span>
    <img
      src="/search.png" // Replace with the actual path to your search icon
      alt="Search Icon"
      className="w-6 h-6 md:w-5 md:h-5" // Smaller size for small screens
    />
  </div>
</div>



      {/* Main Content */}
      <div
        className="text-white relative z-[10000]"
        style={{
          position: "relative",
          paddingTop: "100px",
          paddingBottom: "50px",
          zIndex: 10000,
        }}
      >
        <div className="flex items-center pl-[2%] relative">
          {/* Titles */}
          <h1 className="text-[#e6e6ff] mb-9 mt-9 text-xl md:text-4xl lg:text-5xl font-bold text-center relative z-10000">
            <span className="mb-9 text-transparent bg-clip-text bg-white font-extrabold">
              EXPLORE BY CATEGORY
            </span>
          </h1>
          <div className="flex items-center justify-center pl-3 gap-4 relative">
            {/* Arrow Image */}
            <img
              src="/arrow.png"
              alt="Arrow"
              className="w-25 h-5 sm:w-25 sm:h-5 md:w-28 md:h-10"
            />

            {/* White Line */}
            <div
              style={{
                height: "0.3px",
                width: "calc(100vw - 100px)",
                position: "absolute",
                top: "50%",
              }}
              className="left-[calc(100px-50px)] bg-white sm:left-[calc(100px+40px)]"
            />
          </div>
        </div>
      </div>

      {/* Featured Posts */}
      <FeaturedPosts />

      {/* Recent Posts */}
      <div>
        <h1 className="my-8 text-2xl text-gray-600">Recent Posts</h1>
        <PostList />
      </div>
    </div>
  );
};

export default Homepage;
