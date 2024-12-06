import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../components/Upload";

const Write = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [cover, setCover] = useState("");
  const [progress, setProgress] = useState(0);
  const [remainingChars, setRemainingChars] = useState(150);

  const navigate = useNavigate();
  const { getToken } = useAuth();

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
    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });

  const handleTitleChange = (e) => {
    const value = e.target.value.slice(0, 150);
    setTitle(value);
    setRemainingChars(150 - value.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!title) return toast.error("Title is required.");
    if (!desc) return toast.error("Description is required.");
    if (!category) return toast.error("Category is required.");
    if (!cover) return toast.error("Cover image is required.");

    // Slug generation
    const timestamp = Date.now();
    const slug = `${title.replace(/\s+/g, "-").toLowerCase()}-${timestamp}`;

    const data = {
      img: cover.filePath,
      title,
      category,
      desc,
      slug,
    };

    mutation.mutate(data);
  };

  if (!isLoaded) {
    return <div className="">Loading...</div>;
  }

  if (isLoaded && !isSignedIn) {
    return <div className="">You should login!</div>;
  }

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-cl font-light">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
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
            <img
              src={cover.previewUrl}
              alt="Cover preview"
              className="w-24 h-24 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={() => setCover("")}
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
            >
              ✕
            </button>
          </div>
        )}
        <input
          className="text-4xl font-semibold bg-transparent outline-none"
          type="text"
          placeholder="My Awesome Story"
          value={title}
          onChange={handleTitleChange}
          name="title"
        />
        <span className="text-sm text-gray-500">{remainingChars} characters remaining</span>
        <div className="flex items-center gap-4">
          <label htmlFor="" className="text-sm">
            Choose a category:
          </label>
          <select
            name="category"
            id=""
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 rounded-xl bg-white shadow-md"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="general">General</option>
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
          value={desc}
          onChange={(e) => setDesc(e.target.value.slice(0, 10000))}
        />
        <button
          disabled={mutation.isPending || (progress > 0 && progress < 100)}
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Publishing..." : "Publish Post"}
        </button>
        {"Progress: " + progress}
      </form>
    </div>
  );
};

export default Write;
