import { Link } from "react-router-dom";
import Image from "./Image";
import { format } from "timeago.js";

const PostListItem = ({ post }) => {
  // Truncate description if it's longer than 150 characters
  const truncatedDesc = post.desc.length > 150 
    ? `${post.desc.substring(0, 150)}...` 
    : post.desc;

  return (
    <Link
      to={`/${post.slug}`}
      className="flex flex-col xl:flex-row gap-6 sm:gap-8 mb-8 sm:mb-12 group"
    >
      {/* Image */}
      {post.img && (
        <div className="md:hidden xl:block xl:w-1/3">
          <Image src={post.img} className="rounded-2xl object-cover" w="735" />
        </div>
      )}
      {/* Details */}
      <div className="flex flex-col gap-3 sm:gap-4 xl:w-2/3">
        <h3 className="text-md sm:text-lg lg:text-xl font-semibold group-hover:underline">
          {post.title}
        </h3>
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-gray-400 text-xs sm:text-sm">
          <span>Written by</span>
          <Link
            className="text-blue-800 text-xs sm:text-sm"
            to={`/posts?author=${post.user.username}`}
            onClick={(e) => e.stopPropagation()}
          >
            {post.user.username}
          </Link>
          <span>on</span>
          <Link
            className="text-blue-800 text-xs sm:text-sm"
            to={`/posts?category=${post.category}`}
            onClick={(e) => e.stopPropagation()}
          >
            {post.category}
          </Link>
          <span>{format(post.createdAt)}</span>
        </div>
        <p className="text-sm sm:text-base text-gray-700">
          {truncatedDesc}
        </p>
        {post.desc.length > 150 && (
          <span className="underline text-blue-800 text-xs sm:text-sm">
            Read More
          </span>
        )}
      </div>
    </Link>
  );
};

export default PostListItem;

