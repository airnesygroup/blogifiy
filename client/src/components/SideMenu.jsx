import { useSearchParams } from "react-router-dom";
import Search from "./Search";

const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (e) => {
    const newParams = {
      ...Object.fromEntries(searchParams.entries()),
      sort: e.target.value,
    };
    setSearchParams(newParams);
  };

  const handleCategoryChange = (category) => {
    const newParams = {
      ...Object.fromEntries(searchParams.entries()),
      cat: category,
    };
    setSearchParams(newParams);
  };

  return (
    <div className="sticky top-8 w-64 px-4 h-max bg-white shadow-md rounded-md">
      {/* Search Section */}
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />

      {/* Filter Section */}
      <h1 className="mt-8 mb-4 text-sm font-medium">Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
        {["newest", "popular", "trending", "oldest"].map((value) => (
          <label
            key={value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="sort"
              onChange={handleFilterChange}
              value={value}
              className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800"
            />
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </label>
        ))}
      </div>

      {/* Categories Section */}
      <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
      <div className="flex flex-col gap-2 text-sm">
        {[
          { label: "All", value: "general" },
          { label: "Web Design", value: "web-design" },
          { label: "Development", value: "development" },
          { label: "Databases", value: "databases" },
          { label: "Search Engines", value: "seo" },
          { label: "Marketing", value: "marketing" },
        ].map(({ label, value }) => (
          <span
            key={value}
            className="underline cursor-pointer"
            onClick={() => handleCategoryChange(value)}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
