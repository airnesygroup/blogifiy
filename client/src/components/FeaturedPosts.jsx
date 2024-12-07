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
  if (!posts || posts.length === 0) {
    return;
  }

  return (
    <div className="mt-4 flex flex-col lg:flex-row gap-6">
      {/* First */}
      <div className="w-full lg:w-1/2 flex flex-col gap-3">
        {/* image */}
        {posts[0].img && (
          <Link to={`/${posts[0].slug}`}>
            <Image
              src={posts[0].img}
              className="rounded-2xl object-cover"
              w="895"
            />
          </Link>
        )}
        {/* details */}
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
        {/* title */}
        <Link
          to={`/${posts[0].slug}`}
          className="text-sm sm:text-base font-semibold lg:font-bold leading-snug"
        >
          {window.innerWidth > 1024
            ? posts[0].title
            : truncateText(posts[0].title, 75)}
        </Link>
      </div>

      {/* Others */}
      <div className="w-full lg:w-1/2 flex flex-col gap-3">
        {[posts[1], posts[2], posts[3]].map(
          (post, index) =>
            post && (
              <div key={index} className="lg:h-1/3 flex justify-between gap-3">
                <Link to={`/${post.slug}`} className="w-1/3 aspect-video">
                  <Image
                    src={post.img}
                    className="rounded-2xl object-cover w-full h-full"
                    w="298"
                  />
                </Link>
                {/* details and title */}
                <div className="w-2/3">
                  {/* details */}
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
                  {/* title */}
                  <Link
                    to={`/${post.slug}`}
                    className="text-xs sm:text-sm font-medium leading-snug"
                  >
                    {window.innerWidth > 1024
                      ? post.title
                      : truncateText(post.title, 75)}
                  </Link>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default FeaturedPosts;
