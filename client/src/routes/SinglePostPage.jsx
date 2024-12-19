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
    <div className="flex flex-col gap-8 p-4 mx-auto" style={{ maxWidth: "800px" }}>
      <h1 className="text-lg md:text-2xl font-semibold">{data.title}</h1>

      {/* Image */}
      {data.img && (
        <div
          className="mx-auto"
          style={{
            maxWidth: "1000px",
            width: "100%",
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Image src={data.img} w="1200" className="rounded-xl" />
        </div>
      )}

      {/* Author Info */}
      <div className="flex items-center gap-4 text-sm text-[var(--softTextColor)]">
        {data.user.img && (
          <Image
            src={data.user.img}
            className="w-10 h-10 object-cover"
            w="40"
            h="40"
          />
        )}
        <div className="flex flex-col">
          <span>
            Written by <Link className="text-[#1DA1F2]">{data.user.username}</Link>
          </span>
          <span>
            <Link className="text-[#1DA1F2]">{data.category}</Link> - {format(data.createdAt)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <PostMenuActions post={data} />

      {/* Description */}
      <p className="text-[var(--textColor)] font-medium text-justify">{data.desc}</p>

      {/* Comments */}
      <Comments postId={data._id} />
    </div>
  );
};

export default SinglePostPage;
