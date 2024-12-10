import { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation from react-router-dom
import PostList from "../components/PostList";
import SideMenu from "../components/SideMenu";

const PostListPage = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation(); // Get the current location object

  // Extract the search parameter from the URL
  const searchParam = new URLSearchParams(location.search).get("search") || "All Posts";

  return (
    <div className="">
      <h1 style={{ paddingTop: "100px" }} className="mb-8 font-bold text-2xl">
        {`Development Blog - Search Results for: "${searchParam}"`}
      </h1>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-blue-800 text-sm text-white px-4 py-2 rounded-2xl mb-4 md:hidden"
      >
        {open ? "Close" : "Filter or Search"}
      </button>
      <div className="flex flex-col-reverse gap-8 md:flex-row justify-between">
        <div className="">
          <PostList />
        </div>
        <div className={`${open ? "block" : "hidden"} md:block`}>
          <SideMenu />
        </div>
      </div>
    </div>
  );
};

export default PostListPage;
