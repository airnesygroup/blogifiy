import { Link } from "react-router-dom";
import MainCategories from "../components/MainCategories";
import FeaturedPosts from "../components/FeaturedPosts";
import PostList from "../components/PostList";

const Homepage = () => {
  return (

    
    <div className=" mb-9 flex flex-col gap-0">
  
  <div 
  className="text-white relative z-[10000]" 
  style={{ position: "relative", zIndex: 10000 }}
>
  <div className="flex items-center z-10000 justify-center">
  {/* Titles */}

  <h1 
  className="text-[#e6e6ff]  mb-9 mt-9 text-4xl md:text-4xl lg:text-5xl font-bold text-center relative z-10000"
>
  <span 
    className="mb-9 text-transparent bg-clip-text bg-white font-extrabold"
  >
    EXPLORE BY CATEGORY
  </span>
</h1>
</div></div>




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