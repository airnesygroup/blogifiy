import { Link } from "react-router-dom";
import Image from "./Image";
import { format } from "timeago.js";

const PostListItem = ({ post }) => {
  // Truncate title if it's too long to keep text within image height
  const truncatedTitle = post.title.length > 150 
    ? `${post.title.substring(0, 150)}...` 
    : post.title;

  return (
    <Link
      to={`/${post.slug}`}
      className="flex flex-row gap-6 sm:gap-8 mb-8 sm:mb-12 group"
    >
      {/* Image */}
      {post.img && (
        <div
          className="flex-shrink-0 w-24 h-24 sm:w-48 sm:h-32 overflow-hidden rounded-lg"
          style={{ flexBasis: "auto" }}
        >
          <Image
            src={post.img}
            className="object-cover w-full h-full"
            w="735"
          />
        </div>
      )}
      {/* Details */}
      <div className="flex flex-col justify-between">
        <h3 className="text-md sm:text-xs lg:text-md font-semibold group-hover:underline">
          {truncatedTitle}
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
      </div>
    </Link>
  );
};

export default PostListItem;
