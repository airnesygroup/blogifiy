import { useAuth, useUser } from "@clerk/clerk-react";
import ReactQuill from "react-quill-new";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-quill-new/dist/quill.bubble.css";
import Upload from "../components/Upload";

const Write = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [title, setTitle] = useState("");
  const [remainingChars, setRemainingChars] = useState(150);
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [cover, setCover] = useState("");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const stripHtml = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
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

  const handleTitleChange = (e) => {
    const input = e.target.value.slice(0, 150);
    setTitle(input);
    setRemainingChars(150 - input.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title && !stripHtml(value)) {
      return toast.error("Please provide a title or content.");
    }

    if (!category) {
      return toast.error("Please select a category.");
    }

    const slug = `${title.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;
    const strippedContent = stripHtml(value);

    const newPost = {
      title,
      category,
      content: strippedContent,
      slug,
      img: cover?.filePath || "",
    };

    mutation.mutate(newPost);
  };

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>You need to log in!</div>;

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-xl font-light">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        {/* Cover Image Upload */}
        <Upload type="image" setProgress={setProgress} setData={setCover}>
          <button
            disabled={progress > 0 && progress < 100}
            className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white"
          >
            {progress > 0 && progress < 100 ? "Uploading..." : "Add a cover image"}
          </button>
        </Upload>
        {cover && (
          <div className="relative">
            <img src={cover.previewUrl} alt="Cover" className="rounded-lg w-full" />
            <button
              type="button"
              onClick={() => setCover(null)}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2"
            >
              X
            </button>
          </div>
        )}

        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="My Awesome Story"
          className="text-4xl font-semibold bg-transparent outline-none"
        />
        <div className="text-sm text-gray-500">
          {remainingChars} characters remaining
        </div>

        {/* Category Selection */}
        <div className="flex items-center gap-4">
          <label htmlFor="category" className="text-sm">
            Choose a category:
          </label>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 rounded-xl bg-white shadow-md"
          >
            <option value="">Select a category</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>

        {/* Rich Text Editor */}
        <ReactQuill
          theme="bubble"
          value={value}
          onChange={setValue}
          modules={{
            toolbar: [
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link"],
              ["clean"],
            ],
          }}
          placeholder="Write your content here..."
        />

        {/* Publish Button */}
        <button
          disabled={mutation.isPending || (progress > 0 && progress < 100)}
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Publishing..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
};

export default Write;
  