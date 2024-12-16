import { Link } from "react-router-dom";
import Image from "./Image";
import { format } from "timeago.js";

const PostListItem = ({ post }) => {
  // Truncate title based on screen size
  const truncatedTitle = post.title.length > 100
    ? `${post.title.substring(0, 100)}...`
    : post.title;

  const truncatedTitleLarge = post.title.length > 150
    ? `${post.title.substring(0, 150)}...`
    : post.title;

  return (
    <Link
      to={`/${post.slug}`}
      className="flex flex-row gap-6 mb-8 sm:mb-12 group"
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
      <div className="flex flex-col gap-2"> {/* Removed justify-between */}
        {/* Title */}
        <h3 className="text-[14px] sm:text-[19px] md:text-[19px] text-[var(--textColor)] leading-tight">
          <span className="sm:hidden">{truncatedTitle}</span>
          <span className="hidden sm:inline md:hidden">{truncatedTitleLarge}</span>
          <span className="hidden md:inline">{post.title}</span>
        </h3>
        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[var(--softTextColor)] text-[11px] sm:text-[11px] md:text-[12px] lg:text-[14px]">
          <span>By</span>
          <Link
            className="text-[var(--textColor)] text-[11px] sm:text-[11px] md:text-[12px] lg:text-[14px]"
            to={`/posts?author=${post.user.username}`}
            onClick={(e) => e.stopPropagation()}
          >
            {post.user.username}
          </Link>
          <span>on</span>
          <Link
            className="text-[var(--textColor)] text-[11px] sm:text-[11px] md:text-[12px] lg:text-[14px]"
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
