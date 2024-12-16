import { useEffect, useState, useRef } from "react";
import FeaturedPosts from "../components/FeaturedPosts";
import PostList from "../components/PostList";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import Maincategories from "../components/MainCategories";
import SideMenu from "../components/SideMenu";
import ThemeToggler from "../components/Theme";
import Sidebar from "../components/Sidebar2";
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
    <div className="mb-9   flex flex-col gap-0">
      {/* Floating Section */}
      <div
        className={`sticky top-0  w-full  flex items-center justify-between px-5 py-3 transition-opacity duration-300 ${
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

        <Link to="/" className="flex items-center gap-1 text-lg font-bold md:text-2xl">
      <img src="/logo2.png" alt="Logo" className="w-24 h-24 " />


     <span className="bg-clip-text text-[#000] text-[85px] font-bold">HooliCon</span>




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

      
    <div className="mb-[55px] mt-[20px]">
    <Maincategories/>

    </div>

   <FeaturedPosts />


    <Sidebar/>


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
