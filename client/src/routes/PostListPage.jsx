
   


import { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation from react-router-dom
import PostList from "../components/PostList";
import SideMenu from "../components/SideMenu";
import Search from "../components/Search";
import { Link } from "react-router-dom";
const PostListPage = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation(); // Get the current location object

  // Use URLSearchParams to extract query parameters from the URL
  const params = new URLSearchParams(location.search);

  // Extract the 'category', 'sort', 'author', 'search', and 'cat' parameters (if available)
  const sort = params.get("sort");
  const author = params.get("author");
  const search = params.get("search");
  const cat = params.get("cat"); // Extract 'cat' parameter

  // Build the display string based on available parameters
  const displayText = [
    search ? `Search: ${search}` : "",
    sort ? `Sort: ${sort}` : "",
    author ? `Author: ${author}` : "",
    cat ? `Category: ${cat}` : "", // Display 'cat' if present
  ]
    .filter(Boolean) // Remove empty strings
    .join(" | ") || "All Posts"; // Default to "All Posts" if no filters are applied

  return (
    <div style={{ paddingTop: "70px"}} className="  ">
      
    



      <div className="flex flex-row  justify-between">
      <div className="w-full md:w-3/4 pr-0 md:pr-10">



     
<div className="relative  lg:hidden flex justify-end items-center t
ext-xl font-semibold bg-gradient-to-r bg-gradient-to-r  from-black via-gray-500 to-gray-700 
rounded-none lg:rounded-tr-2xl lg:rounded-br-2xl p-4">
  {/* White Overlay */}
  <div
    className="absolute  lg:bg-black rounded-none  lg:rounded-tr-2xl lg:rounded-br-2xl"
    style={{
      top: '2px',
      right: '2px',
      bottom: '2px',
      left: '0',
      zIndex: 1,
    }}
  ></div>

  {/* Original Content */}
  <div className="relative  text-right" style={{ zIndex: 2 }}>
  <p className="text-white" style={{ fontSize: '1rem' }}>
      BY THE <br />
      <span className="underline">NUMBERS</span>
    </p>
    <p className="text-5xl font-extrabold bg-clip-text text-transparent  bg-gradient-to-r from-white  to-[#1DA1F2] ">
      <span style={{ fontSize: '1.2rem' }}>OVER</span> 100K+
    </p>
    <p className="text-white" style={{ fontSize: '1rem' }}>
      USERS READ THIS
    </p>
    <p className="text-white" style={{ fontSize: '1rem' }}>
      ARTICLES EVERYDAY 
    </p>
    <Link to="/about" >

    <div className="flex items-center justify-end mt-2">
      <p className="text-xs text-white">READ MORE</p>
      <span className="ml-2 bg-black text-white rounded-full p-2 border border-white">
  {/* Content */}
        <img 
             src="/arrow.png"
              alt="Arrow"
              className="w-3 h-3 sm:w-3 sm:h-3 md:w-3 md:h-3"
            />
      </span>
    </div>
    </Link>
  </div>
</div>









    <h1 style={{  zIndex: "10000"}} className="mb-4 lg:mt-[25px] mt-4  lg:mb-[8] lg:text-xl text-md text-[#e6e6ff] font-bold">
        {`Blog - ${displayText}`}
      </h1>

      <PostList />
    </div>
    <div className={`${open ? "block" : "hidden"} lg:mt-[30px] md:block w-1/4`}>
        <SideMenu />
    </div>
</div>



 </div>
  );
};

export default PostListPage;
