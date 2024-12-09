import { Link } from "react-router-dom";
import MainCategories from "../components/MainCategories";
import FeaturedPosts from "../components/FeaturedPosts";
import PostList from "../components/PostList";

const Homepage = () => {
  return (

    
    <div className="mb-9 flex flex-col  gap-0">
    <div
      className="text-white relative z-[10000]"
      style={{
        position: "relative",
        paddingTop: "5%",
        paddingBottom: "5%",
        zIndex: 10000,
      }}
    >
      <div className="flex items-center justify-center relative">
        {/* Titles */}
        <h1 className="text-[#e6e6ff] mb-9 mt-9 text-2xl md:text-4xl lg:text-5xl font-bold text-center relative z-10000">
          <span className="mb-9 text-transparent bg-clip-text bg-white font-extrabold">
            EXPLORE BY CATEGORY
          </span>
        </h1>
        
        <div className="flex items-center justify-center pl-3 gap-4 relative">
  {/* Arrow Image */}
  <img
    src="/arrow.png" // Replace with the actual path to your arrow image
    alt="Arrow"
    className="w-36 h-12"
    style={{
      width: "100px",
      height: "50px",
    }} // Adjust size of the arrow as needed
  />
  {/* White Line */}
  <div
    style={{
      height: "0.4px",
      width: "calc(100vw - 100px)", // Full viewport width minus the width of the arrow
      position: "absolute", // Position it absolutely to overflow
      left: "calc(100px + 30px)", // Start after the arrow and add extra spacing (20px here)
      top: "50%", // Center it vertically relative to the parent container
    }}
    className="bg-white"
  />
</div>


      </div>
    </div>





      {/* CATEGORIES */}
      {/* FEATURED POSTS */}
      <FeaturedPosts />
      {/* POST LIST */}
      <div className="">
        <h1 className="my-8 text-2xl text-gray-600">Recent Posts</h1>
        <PostList/>
      </div>
    </div>
  );
};

export default Homepage;