import { Link, useParams } from "react-router-dom";
import Image from "../components/Image";
import PostMenuActions from "../components/PostMenuActions";
import Comments from "../components/Comments";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

const SinglePostPage = () => {
  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return "loading...";
  if (error) return "Something went wrong!" + error.message;
  if (!data) return "Post not found!";

  return (
    <div className="mx-auto p-4 flex flex-col items-center gap-8">
      {/* Content container */}
      <div className="w-full max-w-[800px]">
        <h1 className="text-lg md:text-2xl font-semibold">{data.title}</h1>

        {/* Author Info */}
        <div className="flex items-center gap-4 text-sm text-[var(--softTextColor)] mt-4">
          {data.user.img && (
            <Image
              src={data.user.img}
              className="w-10 h-10 object-cover rounded-full"
              w="40"
              h="40"
            />
          )}
          <div className="flex flex-col">
            <span>
              Written by <Link className="text-[#1DA1F2]">{data.user.username}</Link>
            </span>
            <span>
              <Link className="text-[#1DA1F2]">{data.category}</Link> -{" "}
              {format(data.createdAt)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <PostMenuActions post={data} />

        {/* Description */}
        <p className="text-[var(--textColor)] font-medium text-justify mt-4">
          {data.desc}
        </p>
      </div>

      {/* Image */}
      {data.img && (
        <div className="w-full max-w-[1000px]">
          <Image src={data.img} w="1000" className="rounded-xl" />
        </div>
      )}

      {/* Comments */}
      <div className="w-full max-w-[800px]">
        <Comments postId={data._id} />
      </div>
    </div>
  );
};

export default SinglePostPage;
