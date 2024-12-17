import { Link } from "react-router-dom";
import { FaSearch, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useState } from "react";

const MainCategories = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Toggle search bar
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Toggle menu dropdown

  return (
    <div className=" max-w-[1200px] mx-auto bg-[#1da1f2]/95 rounded-full  shadow-lg ">
      {/* Navigation container */}
      <div className="flex items-center text-[#e6e6ff] justify-between px-4 py-2">
        {/* Categories or Search Bar */}
        <div className="flex flex-1  items-center">
          {!isSearchOpen ? (
            <div
              className={`${
                isMenuOpen ? "hidden" : "hidden"
              } lg:flex items-center flex-wrap overflow-x-auto hidden sm:hidden md:block whitespace-nowrap`}
            >
              <Link
                to="/posts?sort=newest"
                className="bg-black  text-white rounded-full px-4 py-3"
              >
                Latest
              </Link>
              <Link
                to="/posts?sort=popular"
                className="hover:bg-black rounded-full px-4 py-1"
              >
                Most Popular
              </Link>
              <Link
                to="/posts?sort=trending"
                className="hover:bg-black rounded-full px-4 py-1"
              >
                Top Trending
              </Link>
              <Link
                to="/posts?sort=oldest"
                className="hover:bg-black rounded-full px-4 py-1"
              >
                Oldest
              </Link>
              <Link
                to="/newsletter"
                className="hover:bg-black rounded-full px-4 py-1"
              >
              Newsletter            
              </Link>
              <Link
                to="/about"
                className="hover:bg-black  rounded-full px-4 py-1"
              >
                About Us
              </Link>
            </div>
          ) : (
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 px-4 py-2 text-white bg-gray-900 rounded-full focus:outline-none"
            />
          )}
        </div>

        {/* Right-side icons and controls */}
        <div className="flex items-center py-[0.8px] space-x-4">

      

          {/* User and Sign In */}
          <div className="flex items-center space-x-2">

        


              <Link
              to="/newsletter"
              className={`bg-black  text-white  sm:block md:hidden  rounded-full px-4 py-3 ${
                isSearchOpen ? "hidden" : "block"
              }`}
            >  
                Newsletter
              </Link> 

            <Link
              to="/signin"
              className={`px-4 py-3  md:py-2 flex flex-row border-white text-xs  md:text-sm text-white ${
                isSearchOpen ? "hidden" : "block"
              }`}
            >            <FaUserCircle className="text-white text-xl mx-auto pr-1" />

              Sign In
            </Link>
          </div>

          {/* Search icon */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2  text-white"
          >
            {isSearchOpen ? <FaTimes /> : <FaSearch />}
          </button>

          {/* Menu icon */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2  text-white"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Categories dropdown for menu */}
      {isMenuOpen && !isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-[#1da1f2] p-4 z-10">
          <Link
            to="/posts"
            className="block py-2 text-white hover:bg-gray-700 rounded"
          >
            All Posts
          </Link>
          <Link
            to="/posts?cat=web-design"
            className="block py-2 text-white hover:bg-gray-700 rounded"
          >
            Web Design
          </Link>
          <Link
            to="/posts?cat=development"
            className="block py-2 text-white hover:bg-gray-700 rounded"
          >
            Development
          </Link>
          <Link
            to="/posts?cat=databases"
            className="block py-2 text-white hover:bg-gray-700 rounded"
          >
            Databases
          </Link>
          <Link
            to="/posts?cat=seo"
            className="block py-2 text-white hover:bg-gray-700 rounded"
          >
            Search Engines
          </Link>
          <Link
            to="/posts?cat=marketing"
            className="block py-2 text-white hover:bg-gray-700 rounded"
          >
            Marketing
          </Link>
        </div>
      )}
    </div>
  );
};

export default MainCategories;
