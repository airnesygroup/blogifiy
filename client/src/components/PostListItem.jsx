import { Link } from "react-router-dom";
import Image from "./Image";
import { format } from "timeago.js";

const PostListItem = ({ post }) => {
  return (
    <div className="flex flex-col xl:flex-row gap-6 sm:gap-8 mb-8 sm:mb-12">
      {/* image */}
      {post.img && (
        <div className="md:hidden xl:block xl:w-1/3">
          <Image src={post.img} className="rounded-2xl object-cover" w="735" />
        </div>
      )}
      {/* details */}
      <div className="flex flex-col gap-3 sm:gap-4 xl:w-2/3">
        <Link
          to={`/${post.slug}`}
          className="text-lg sm:text-xl lg:text-2xl font-semibold"
        >
          {post.title}
        </Link>
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-gray-400 text-xs sm:text-sm">
          <span>Written by</span>
          <Link
            className="text-blue-800 text-xs sm:text-sm"
            to={`/posts?author=${post.user.username}`}
          >
            {post.user.username}
          </Link>
          <span>on</span>
          <Link className="text-blue-800 text-xs sm:text-sm">
            {post.category}
          </Link>
          <span>{format(post.createdAt)}</span>
        </div>
        <p className="text-sm sm:text-base text-gray-700">{post.desc}</p>
        <Link
          to={`/${post.slug}`}
          className="underline text-blue-800 text-xs sm:text-sm"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
