import { useAuth, useUser } from "@clerk/clerk-react";
import "react-quill-new/dist/quill.snow.css";
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
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [slug, setSlug] = useState("");
  const maxTitleLength = 150;
  const maxContentLength = 10000;

  const navigate = useNavigate();
  const { getToken } = useAuth();

  const stripHtml = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const generateSlug = (title) => {
    const timestamp = Date.now();
    return `${title.trim().replace(/\s+/g, "-").toLowerCase()}-${timestamp}`;
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
      toast.success("Post created successfully!");
      navigate(`/${res.data.slug}`);
    },
    onError: () => {
      toast.error("Failed to create the post.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title && !description) {
      toast.error("Please provide either a title or description.");
      return;
    }
    if (!category) {
      toast.error("Please select a category.");
      return;
    }

    const cleanedContent = stripHtml(content);
    if (cleanedContent.length > maxContentLength) {
      toast.error("Content exceeds the maximum allowed length.");
      return;
    }

    const postData = {
      title,
      category,
      description,
      content: cleanedContent,
      coverImage: coverImage?.filePath || "",
      slug: generateSlug(title || description),
    };

    mutation.mutate(postData);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (isLoaded && !isSignedIn) {
    return <div>You must be signed in to create a post.</div>;
  }

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-cl font-light">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <Upload type="image" setProgress={setProgress} setData={setCoverImage}>
          <button
            className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white"
            disabled={progress > 0 && progress < 100}
          >
            {progress > 0 && progress < 100 ? "Uploading..." : "Add a Cover Image"}
          </button>
        </Upload>
        {coverImage && (
          <div>
            <img
              src={coverImage.url}
              alt="Preview"
              className="max-w-full rounded-xl mb-2"
            />
            <button
              type="button"
              onClick={() => setCoverImage(null)}
              className="text-red-500 text-sm underline"
            >
              Remove Image
            </button>
          </div>
        )}
        <input
          className="text-4xl font-semibold bg-transparent outline-none"
          type="text"
          placeholder="My Awesome Story"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value.slice(0, maxTitleLength))}
        />
        <div className="text-sm text-gray-500">
          {maxTitleLength - title.length} characters remaining
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="category" className="text-sm">
            Choose a category:
          </label>
          <select
            name="category"
            id="category"
            className="p-2 rounded-xl bg-white shadow-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea
          className="p-4 rounded-xl bg-white shadow-md"
          name="desc"
          placeholder="A Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <ReactQuill
          theme="bubble"
          className="flex-1 rounded-xl bg-white shadow-md"
          value={content}
          onChange={setContent}
        />
        <button
          disabled={
            mutation.isLoading || progress > 0 && progress < 100
          }
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {mutation.isLoading ? "Publishing..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
};

export default Write;
