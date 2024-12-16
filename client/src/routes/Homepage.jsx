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
        className={`sticky top-0  flex items-center justify-between px-5 py-3 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          zIndex: 100001,
          background: "transparent",
        }}
      >
        {/* Left: Share Icon and Text */}
 
        <div>
        <span className=" hidden sm:block text-[var(--textColor)] font-semibold text-[11px] sm:text-[12px] md:text-[12px] lg:text-[14px]">
        <Link to="/posts?sort=trending"> TOP TRENDING </Link>
          </span>
        </div>

        <Link to="/" className="flex items-center gap-1 text-lg font-bold md:text-2xl">
        <img src="/logo2.png" alt="Logo" className="w-10 h-10 lg:w-20 lg:h-20" />

<span className="bg-clip-text text-[30px] lg:text-[75px] font-extrabold">HooliCon</span>



</Link>

        <div>
        <span className="hidden sm:block text-[var(--textColor)] font-semibold text-[11px] sm:text-[12px] md:text-[12px] lg:text-[14px]">
        <Link to="/posts?sort=popular"> MOST POPULAR </Link>
          </span>
        </div>

 
      </div>

      <div  style={{ zIndex: 100004 }} className="mb-[50px] mt-[20px] sticky top-9 ">
  <Maincategories />
</div>


   <FeaturedPosts />


    <Sidebar/>


      {/* Recent Posts */}
      <div>
      <h1 className="my-8 lg:text-2xl text-lg ml-2 mb-10 mt-5  text-[var(--textColor)] font-bold">Recent Posts</h1>
    
      
      <div className="flex flex-row justify-between">
      <div className="w-full md:w-3/4 pr-0 md:pr-10">
      <PostList />
      <ThemeToggler />

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
