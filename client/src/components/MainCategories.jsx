

import { Link } from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa"; // Import icons
import Search from "./Search";
import { useState } from "react";

const MainCategories = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false); // For toggling the search bar
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For toggling the menu visibility

  return (

    <div>

   

<div className="flex flex-wrap items-center text-[#e6e6ff] justify-between p-4 bg-gradient-to-b from-gray-500 to-gray-900 rounded-3xl 
xl:rounded-full shadow-lg ">
  {/* links */}
  <div className="flex-1 flex items-center justify-between flex-nowrap overflow-x-auto overflow-y-hidden whitespace-nowrap ">

    <Link
      to="/posts"
      className="bg-gradient-to-r from-[#484e4f] to-[#bbdaed] text-white rounded-full px-4 py-1"
    >
      All Posts
    </Link>
    <Link
      to="/posts?cat=web-design"
      className="hover:bg-blue-50 rounded-full px-4 py-1"
    >
      Web Design
    </Link>
    <Link
      to="/posts?cat=development"
      className="hover:bg-blue-50 rounded-full px-4 py-1"
    >
      Development
    </Link>
    <Link
      to="/posts?cat=databases"
      className="hover:bg-blue-50 rounded-full px-4 py-1"
    >
      Databases
    </Link>
    <Link
      to="/posts?cat=seo"
      className="hover:bg-blue-50 rounded-full px-4 py-1"
    >
      Search Engines
    </Link>
    <Link
      to="/posts?cat=marketing"
      className="hover:bg-blue-50 rounded-full px-4 py-1"
    >
      Marketing
    </Link>

    <span className="text-xl p-2 font-medium">|</span>

  </div>
  <div className="mt-[-2px]">
  <Search />

  </div>
</div>

{/* Media Queries for responsiveness */}
<style jsx>{`
  @media (max-width: 768px) {
    .flex-1 {
      display: block;
      overflow-y-auto;
    }
  }
`}</style>


    
    </div>

  );
};

export default MainCategories;
