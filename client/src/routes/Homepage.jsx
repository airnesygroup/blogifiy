import { Link } from "react-router-dom";
import MainCategories from "../components/MainCategories";
import FeaturedPosts from "../components/FeaturedPosts";
import PostList from "../components/PostList";

const Homepage = () => {
  return (
    <div className=" mb-8 flex flex-col gap-0">
  
  <div className="flex items-center justify-center">
  {/* Titles */}
  <h1 className="text-gray-800 mb-9 mt-9 text-4xl md:text-5xl lg:text-8xl font-bold text-center">
     <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-[#1DA1F2]">THE HOOLI</span>
  </h1>
</div>

      {/* CATEGORIES */}
      <MainCategories />
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
