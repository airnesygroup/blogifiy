import { Link, useSearchParams } from "react-router-dom";
import Search from "./Search";

const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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
  };

  return (
    <div className="px-6 py-4 bg-gray-50 rounded-lg shadow-md sticky top-8">
      <h1 className="mb-6 text-lg font-semibold text-gray-700">Search</h1>
      <Search />

      <h1 className="mt-8 mb-4 text-lg font-semibold text-gray-700">Filter</h1>
      <div className="flex flex-col gap-3 text-sm">
        {[
          { label: "Newest", value: "newest" },
          { label: "Most Popular", value: "popular" },
          { label: "Trending", value: "trending" },
          { label: "Oldest", value: "oldest" },
        ].map((filter) => (
          <label
            key={filter.value}
            className="flex items-center gap-2 cursor-pointer hover:text-blue-800"
          >
            <input
              type="radio"
              name="sort"
              value={filter.value}
              onChange={handleFilterChange}
              className="appearance-none w-4 h-4 border-2 border-blue-500 cursor-pointer rounded-sm bg-white checked:bg-blue-500 checked:border-blue-500 focus:ring-2 focus:ring-blue-300"
            />
            {filter.label}
          </label>
        ))}
      </div>

      <h1 className="mt-8 mb-4 text-lg font-semibold text-gray-700">Categories</h1>
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
            className="underline cursor-pointer text-gray-600 hover:text-blue-800"
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
