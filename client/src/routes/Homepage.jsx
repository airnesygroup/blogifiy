import { useEffect, useState, useRef } from "react";
import FeaturedPosts from "../components/FeaturedPosts";
import PostList from "../components/PostList";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import Maincategories from "../components/MainCategories";
import SideMenu from "../components/SideMenu";
import ThemeToggler from "../components/Theme";

const Homepage = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const searchRef = useRef(null);
  const shareRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY <=600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        showSearch
      ) {
        setShowSearch(false);
      }
      if (
        shareRef.current &&
        !shareRef.current.contains(event.target) &&
        showShare
      ) {
        setShowShare(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch, showShare]);

  return (
    <div className="mb-9  flex flex-col gap-0">
      {/* Floating Section */}
      <div
        className={`fixed top-[45px] left-0 w-screen z-[10000] flex items-center justify-between px-5 py-3 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          zIndex: 100001,
          background: "transparent",
        }}
      >
        {/* Left: Share Icon and Text */}
        <div className="flex items-center gap-3" ref={shareRef}>
          <img
            src="/share.png"
            alt="Share Icon"
            className="w-[18px] h-[18px]  mr-0 lg:mr[24px] md:w-[20px] md:h-[20px] sm:w-[1px] sm:h-[1px] cursor-pointer"
            onClick={() => setShowShare((prev) => !prev)}
          />
          {showShare && (
            <div className="absolute top-4 lg:top-[10px] left-0 flex-col gap-3 bg-transparent p-3 pl-5 pt-8 rounded-md">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="/linkedin.png"
                  alt="LinkedIn"
                  className="w-6 h-6 mb-2 rounded-full"
                />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="/youtube.png"
                  alt="YouTube"
                  className="w-6 h-6 mb-2 rounded-full"
                />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="/instagram.png"
                  alt="Instagram"
                  className="w-6 h-6 mb-2 rounded-full"
                />
              </a>
              <a href="https://www.xr.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="/x.com.png"
                  alt="Twitter"
                  className="w-6 h-6 mb-2 rounded-full"
                />
              </a>
            </div>
          )}
        </div>
        <div>
        <span className="  text-[var(--textColore)] font-semibold text-[11px] sm:text-[12px] md:text-[12px] lg:text-[14px]">
        <Link to="/posts?sort=trending"> TOP TRENDING </Link>
          </span>
        </div>

        <Link to="/">
          {/* Center: Logo and Text */}
          <div className="flex flex-col items-center">
            <img
              src="/under.png"
              alt="Logo"
              className="w-[60px] h-[40px] sm:w-[50px] sm:h-[30px] md:w-[80px] md:h-[60px] lg:w-[110px] lg:h-[90px]"

            />
          </div>
        </Link>

        <div>
        <span className="  text-[var(--textColore)] font-semibold text-[11px] sm:text-[12px] md:text-[12px] lg:text-[14px]">
        <Link to="/posts?sort=popular"> MOST POPULAR </Link>
          </span>
        </div>

        {/* Right: Search Icon */}
        <div className="flex items-center gap-2" ref={searchRef}>
        <Link to="/posts">
          <img
            src="/search.png"
            alt="Search Icon"
            
            className="w-[18px] h-[18px]  ml-2   md:mr-[24px] md:w-[20px] md:h-[20px] sm:w-[1px] sm:h-[1px] cursor-pointer"
          />
          </Link>
          {showSearch && (
            <div className="absolute top-10 right-0 mr-12 bg-gradient-to-r from-white via-gray-500 to-gray-700 p-5 shadow-md rounded-lg z-[20000]">
              <Search />
            </div>
          )}
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

<Link to="/posts?search=">

<div className="hidden sm:flex items-center pl-[2%] relative sm:-mt-[10px] md:-mt-[10px] lg:mt-[40px]">
          {/* Titles */}

          <h1 className=" text-[var(--textColor)]  sm:text-[15px]  text-[20px] sm:text-[15px] md:text-[35px] lg:text-[45px] font-bold text-center relative z-10000">
            <span className="mb-9  text-[var(--textColor)] font-extrabold">
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
              className="left-[calc(100px-50px)]  bg-[var(--textColor)] sm:left-[calc(100px+40px)]"
            />
          </div>
        </div>
        </Link>

      </div>

      {/* Featured Posts */}
   
      <FeaturedPosts />

    


      {/* Recent Posts */}
      <div>
      <h1 className="my-8 lg:text-2xl text-lg ml-2 mb-10 mt-5  text-[var(--textColor)] font-bold">Recent Posts</h1>
    
      
      <div className="flex flex-row justify-between">
      <div className="w-full md:w-3/4 pr-0 md:pr-10">
      <PostList />
  </div>
  <div className="hidden md:block w-1/4">
    <SideMenu />
    <ThemeToggler />

  </div>
</div>



    
      </div>
    </div>
  );
};

export default Homepage;
