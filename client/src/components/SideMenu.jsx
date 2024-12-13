import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import Search from "./Search";

const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("cat") || "general");

  const handleFilterChange = (e) => {
    if (searchParams.get("sort") !== e.target.value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: e.target.value,
      });
    }
  };

  const handleCategoryChange = (category) => {
    if (searchParams.get("cat") !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        cat: category,
      });
    }
    setSelectedCategory(category); // Update the selected category
  };

  return (
    <div  style={{  zIndex: "10000"}} className="px-6 py-4 bg-[var(--softBgMenu)] rounded-lg  text-[var(--textColor)] shadow-md sticky
     top-[90px]">

      <h1 className="mt-8 mb-4 text-md font-semibold  text-[var(--softTextColor)]">Filter</h1>
      <div className="flex flex-col gap-3 text-sm">
        {[
          { label: "Newest", value: "newest" },
          { label: "Most Popular", value: "popular" },
          { label: "Trending", value: "trending" },
          { label: "Oldest", value: "oldest" },
        ].map((filter) => (
          <label
            key={filter.value}
            className="flex items-center gap-2 cursor-pointer hover:text-[#1DA1F2]"
          >
            <input
              type="radio"
              name="sort"
              value={filter.value}
              onChange={handleFilterChange}
              className="appearance-none w-4 h-4 border-2 border-gray-300 cursor-pointer rounded-sm bg-white 
              checked:bg-[#1DA1F2] checked:border-[#1DA1F2] focus:ring-2 focus:ring-[#1DA1F2]"
            />
            {filter.label}
          </label>
        ))}
      </div>

      <h1 className="mt-8 mb-4 text-md font-semibold  text-[var(--softTextColor)]">Categories</h1>
      <div className="flex flex-col gap-3 text-sm">
        {[
          { label: "All Posts", category: "general" },
          { label: "Web Design", category: "web-design" },
          { label: "Development", category: "development" },
          { label: "Databases", category: "databases" },
          { label: "Search Engines", category: "seo" },
          { label: "Marketing", category: "marketing" },
        ].map((cat) => (
          <span
            key={cat.category}
            className={`cursor-pointer hover:text-[#1DA1F2] ${
              selectedCategory === cat.category ? "text-[#1DA1F2]" : " text-[var(--textColor)]"
            }`}
            onClick={() => handleCategoryChange(cat.category)}
          >
            {cat.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
