import { useAuth, useUser } from "@clerk/clerk-react";
import "react-quill-new/dist/quill.bubble.css"; // Bubble theme
import ReactQuill from "react-quill-new";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../components/Upload";

const Write = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [cover, setCover] = useState("");
  const [progress, setProgress] = useState(0);
  const [isPublishing, setIsPublishing] = useState(false);

  const navigate = useNavigate();
  const { getToken } = useAuth();

  // Strip HTML styles and images
  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    doc.querySelectorAll("style, img").forEach((el) => el.remove());
    return doc.body.textContent || "";
  };

  // Slug generation
  const generateSlug = (text) => {
    const timestamp = Date.now();
    return `${text.replace(/\s+/g, "-").toLowerCase()}-${timestamp}`;
  };

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (res) => {
      toast.success("Post has been created");
      navigate(`/${res.data.slug}`);
    },
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (isLoaded && !isSignedIn) {
    return <div>You should login!</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title && !content) {
      toast.error("Please provide a title or content.");
      return;
    }
    if (!category) {
      toast.error("Please select a category.");
      return;
    }

    const strippedContent = stripHtml(content);
    if (strippedContent.length > 10000) {
      toast.error("Content exceeds the 10,000-character limit.");
      return;
    }

    setIsPublishing(true);

    const data = {
      title,
      slug: generateSlug(title),
      category,
      content: strippedContent,
      img: cover.filePath || "",
    };

    mutation.mutate(data, {
      onSettled: () => setIsPublishing(false),
    });
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col gap-6">
      <h1 className="text-cl font-light">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
        <Upload type="image" setProgress={setProgress} setData={setCover}>
          <button
            disabled={progress > 0 && progress < 100}
            className="p-2 shadow-md rounded-xl text-sm bg-white text-gray-500"
          >
            {progress > 0 && progress < 100 ? "Uploading..." : "Add Cover Image"}
          </button>
        </Upload>
        {cover && (
          <div className="relative">
            <img src={cover.url} alt="Cover preview" className="w-full rounded" />
            <button
              type="button"
              onClick={() => setCover("")}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </div>
        )}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value.slice(0, 150))}
          placeholder="My Awesome Story"
          name="title"
          className="text-4xl font-semibold bg-transparent outline-none"
        />
        <span className="text-sm text-gray-500">
          {150 - title.length} characters remaining
        </span>
        <ReactQuill
          theme="bubble"
          value={content}
          onChange={setContent}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["italic", "underline", "link"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["clean"],
            ],
          }}
          placeholder="Write your story here..."
          className="bg-white shadow-md rounded-xl"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded-xl bg-white shadow-md"
        >
          <option value="">Select Category</option>
          <option value="web-design">Web Design</option>
          <option value="development">Development</option>
          <option value="databases">Databases</option>
          <option value="seo">Search Engines</option>
          <option value="marketing">Marketing</option>
        </select>
        <button
          type="submit"
          disabled={progress > 0 && progress < 100 || isPublishing}
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400"
        >
          {isPublishing ? "Publishing..." : "Publish Post"}
        </button>
        {progress > 0 && <span>Progress: {progress}%</span>}
      </form>
    </div>
  );
};

export default Write;
  