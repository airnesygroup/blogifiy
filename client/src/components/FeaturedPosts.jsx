import { Link } from "react-router-dom";
import Image from "./Image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";

const fetchPost = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=newest`
  );
  return res.data;
};

const truncateText = (text, length) =>
  text.length > length ? text.substring(0, length) + "..." : text;

const FeaturedPosts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () => fetchPost(),
  });

  if (isPending) return "loading...";
  if (error) return "Something went wrong!" + error.message;

  const posts = data.posts;
  if (!posts || posts.length < 3) {
    return; // Ensure there are at least 3 posts
  }

  return (
    <>{/* Layout for large screens only */}
    <div className="hidden lg:grid grid-cols-3 gap-6 mt-4">
      {/* First column: First post */}
      <div className="flex flex-col gap-3">
        {posts[0].img && (
          <Link to={`/${posts[0].slug}`} className="relative">
            <Image
              src={posts[0].img}
              className="rounded-2xl object-cover"
              w="895"
            />
            <div className="absolute inset-0 bg-black opacity-50 rounded-2xl" /> {/* Dark overlay */}
          </Link>
        )}
        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500">
          <h1 className="font-medium text-xs sm:text-sm text-gray-500">01.</h1>
          <Link
            to={`/posts?category=${posts[0].category}`}
            className="text-blue-700"
          >
            {posts[0].category}
          </Link>
          <span className="text-xs sm:text-sm">{format(posts[0].createdAt)}</span>
        </div>
        <Link
          to={`/${posts[0].slug}`}
          className="text-sm sm:text-base font-semibold lg:font-bold leading-snug"
        >
          {window.innerWidth > 1024
            ? posts[0].title
            : truncateText(posts[0].title, 75)}
        </Link>
      </div>
    
      {/* Second column: Second and third post (stacked vertically) */}
      <div className="flex flex-col gap-3">
        {[posts[1], posts[2]].map((post, index) => post && (
          <div key={index} className="w-full relative">
            <Link to={`/${post.slug}`} className="relative aspect-video">
              <Image
                src={post.img}
                className="rounded-2xl object-cover w-full h-full"
                w="298"
              />
              <div className="absolute inset-0 bg-black opacity-50 rounded-2xl" /> {/* Dark overlay */}
              {/* Post title on top of the image */}
              <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                <div className="bg-black bg-opacity-50 text-white p-2 text-center rounded-2xl">
                  <Link
                    to={`/${post.slug}`}
                    className="font-semibold leading-snug"
                  >
                    {truncateText(post.title, 50)}
                  </Link>
                </div>
              </div>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 mb-1">
              <h1 className="font-medium text-xs sm:text-sm text-gray-500">
                0{index + 2}.
              </h1>
              <Link
                to={`/posts?category=${post.category}`}
                className="text-blue-700"
              >
                {post.category}
              </Link>
              <span className="text-xs sm:text-sm">{format(post.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
    
      {/* Third column: "Over one billion people read daily" text */}
      <div className="flex justify-end items-start text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-orange-500 mt-4">
        Over one billion <br /> people read daily
      </div>
    </div>
    



      {/* Layout for small screens only */}
      <div className="lg:hidden flex flex-col gap-6">
        <div className="w-full">
          {/* First post */}
          {posts[0].img && (
            <Link to={`/${posts[0].slug}`} className="relative">
              <Image
                src={posts[0].img}
                className="rounded-2xl object-cover"
                w="895"
              />
              <div className="absolute inset-0 bg-black opacity-50 rounded-2xl" /> {/* Dark overlay */}
            </Link>
          )}
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500">
            <h1 className="font-medium text-xs sm:text-sm text-gray-500">01.</h1>
            <Link
              to={`/posts?category=${posts[0].category}`}
              className="text-blue-700"
            >
              {posts[0].category}
            </Link>
            <span className="text-xs sm:text-sm">{format(posts[0].createdAt)}</span>
          </div>
          <Link
            to={`/${posts[0].slug}`}
            className="text-sm sm:text-base font-semibold lg:font-bold leading-snug"
          >
            {truncateText(posts[0].title, 75)}
          </Link>
        </div>

        {/* "Over one billion people read daily" text (centered on small screens) */}
        <div className="flex justify-center text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-orange-500 mt-4">
          Over one billion people read daily
        </div>

        {/* Second and third post (titles on top of the images for small screens) */}
        <div className="w-full flex gap-3">
          {[posts[1], posts[2]].map((post, index) => post && (
            <div key={index} className="w-1/2 relative">
              <Link to={`/${post.slug}`} className="relative aspect-video">
                <Image
                  src={post.img}
                  className="rounded-2xl object-cover w-full h-full"
                  w="298"
                />
                <div className="absolute inset-0 bg-black opacity-50 rounded-2xl" /> {/* Dark overlay */}
                {/* Post title on top of the image */}
                <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                  <div className="bg-black bg-opacity-50 text-white p-2 text-center rounded-2xl">
                    <Link
                      to={`/${post.slug}`}
                      className="font-semibold leading-snug"
                    >
                      {truncateText(post.title, 50)}
                    </Link>
                  </div>
                </div>
              </Link>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 mb-1">
                <h1 className="font-medium text-xs sm:text-sm text-gray-500">
                  0{index + 2}.
                </h1>
                <Link
                  to={`/posts?category=${post.category}`}
                  className="text-blue-700"
                >
                  {post.category}
                </Link>
                <span className="text-xs sm:text-sm">{format(post.createdAt)}</span>
              </div>
              <Link
                to={`/${post.slug}`}
                className="text-xs sm:text-sm font-medium leading-snug"
              >
                {truncateText(post.title, 75)}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeaturedPosts;
