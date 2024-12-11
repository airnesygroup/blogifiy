import { Link } from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa"; // Import icons
import Search from "./Search";
import { useState } from "react";

const MainCategories = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false); // For toggling the search bar
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For toggling the menu visibility

  return (
    <div className="flex flex-wrap items-center justify-between p-4 bg-gradient-to-b from-white to-gray-500 rounded-3xl xl:rounded-full shadow-lg md:sticky md:top-0">
      {/* On small screens, show search and menu buttons */}
      <div className="flex-1 flex items-center justify-between md:justify-start">
        {/* Categories for small and large screens */}
        <div className={`md:flex flex-wrap gap-4 ${isMenuOpen ? "block" : "hidden"} md:block`}>
          <Link to="/posts" className="bg-gradient-to-r from-[#484e4f] to-[#bbdaed] text-white rounded-full px-4 py-1">
            All Posts
          </Link>
          <Link to="/posts?cat=web-design" className="hover:bg-blue-50 rounded-full px-4 py-1">
            Web Design
          </Link>
          <Link to="/posts?cat=development" className="hover:bg-blue-50 rounded-full px-4 py-1">
            Development
          </Link>
          <Link to="/posts?cat=databases" className="hover:bg-blue-50 rounded-full px-4 py-1">
            Databases
          </Link>
          <Link to="/posts?cat=seo" className="hover:bg-blue-50 rounded-full px-4 py-1">
            Search Engines
          </Link>
          <Link to="/posts?cat=marketing" className="hover:bg-blue-50 rounded-full px-4 py-1">
            Marketing
          </Link>
        </div>
      </div>

      {/* Search and Menu buttons for small screens */}
      <div className="flex items-center gap-4">
       
        <button
          className="p-2 hover:bg-gray-200 rounded-full md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars />
        </button>
      </div>

      {/* Divider */}
      <span className="text-xl font-medium hidden md:block">|</span>

      {/* Search (visible on all screens) */}
      <Search />
    </div>
  );
};

export default MainCategories;
