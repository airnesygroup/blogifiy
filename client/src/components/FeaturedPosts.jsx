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
    <div className="mt-4 flex flex-col lg:hidden gap-6">
      {/* First post */}
      <div className="w-full">
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
        <div className="absolute inset-0 flex justify-center items-center text-white p-4 text-center font-semibold">
          <Link to={`/${posts[0].slug}`} className="leading-snug">
            {truncateText(posts[0].title, 75)}
          </Link>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 mt-3">
          <h1 className="font-medium text-xs sm:text-sm text-gray-500">01.</h1>
          <Link
            to={`/posts?category=${posts[0].category}`}
            className="text-blue-700"
          >
            {posts[0].category}
          </Link>
          <span className="text-xs sm:text-sm">{format(posts[0].createdAt)}</span>
        </div>
      </div>

      {/* "Over one billion people read daily" text */}
      <div className="flex justify-center text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-orange-500 mt-4">
        Over one billion people read daily
      </div>

      {/* Second and third post */}
      <div className="w-full flex gap-3">
        {[posts[1], posts[2]].map((post, index) => post && (
          <div key={index} className="w-1/2">
            <Link to={`/${post.slug}`} className="relative aspect-video">
              <Image
                src={post.img}
                className="rounded-2xl object-cover w-full h-full"
                w="298"
              />
              <div className="absolute inset-0 bg-black opacity-50 rounded-2xl" /> {/* Dark overlay */}
            </Link>
            <div className="absolute inset-0 flex justify-center items-center text-white p-2 text-center font-semibold">
              <Link
                to={`/${post.slug}`}
                className="leading-snug"
              >
                {truncateText(post.title, 50)}
              </Link>
            </div>
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
              <span className="text-xs sm:text-sm">
                {format(post.createdAt)}
              </span>
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
  );
};

export default FeaturedPosts;
