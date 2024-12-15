import { useState } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import ThemeToggler from "./Theme";
import "../index.css"; // Assuming styles are in App.css
import Search from "./Search2";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleOverlayClick = () => setOpen(false);

  return (


    <div
    style={{ zIndex: 100004 }} // Modify or remove z-index here
    className="w-full h-[55px] gap-4  md:h-[55px] flex items-center text-[var(--TextColor)] sticky top-0 justify-between bg-[var(--bg)]">


      {/* LOGO */}
      <Link to="/" className="flex items-center gap-1 text-lg font-bold md:text-2xl">
      <img src="/logo2.png" alt="Logo" className="w-8 h-8 sm:block  md:hidden lg:hidden" />
      <img src="/logo.png" alt="Logo" className="w-30 h-8 hidden md:block lg:block" />


      {/*   <span className="bg-clip-text text-[#1ADAff] font-impact"></span> */}




</Link>
<div  className=" pl-5 pr-5">
<Search/>

</div>

      {/* MOBILE MENU */}
      <div className="md:hidden">
        {/* MOBILE BUTTON */}
        <div
          className="cursor-pointer text-[#e6e6ff] text-sm"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="flex flex-col gap-1">
            <div
              className={`h-[1px] rounded-md w-4 bg-[#e6e6ff] origin-left transition-all ease-in-out ${
                open && "rotate-45"
              }`}
            ></div>
            <div
              className={`h-[1px] rounded-md w-4 bg-[#e6e6ff] transition-all ease-in-out ${
                open && "opacity-0"
              }`}
            ></div>
            <div
              className={`h-[1px] rounded-md w-4 bg-[#e6e6ff] origin-left transition-all ease-in-out ${
                open && "-rotate-45"
              }`}
            ></div>
          </div>
        </div>

        {/* DARK OVERLAY */}
        {open && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleOverlayClick}
          ></div>
        )}

        {/* MOBILE LINK LIST */}
        <div
          className={`w-[75%] h-screen bg-gradient-to-r from-black to-[#484e4f] flex flex-col p-5 pt-7 items-left justify-left text-[#e6e6ff] gap-8 font-sm text-md fixed top-0 right-0 transition-transform ease-in-out z-50 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-4 text-md text-[#e6e6ff]"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>

          <SignedIn>
            <UserButton />
          </SignedIn>

          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/posts?sort=trending" onClick={() => setOpen(false)}>Trending</Link>
          <Link to="/posts?sort=popular" onClick={() => setOpen(false)}>Most Popular</Link>
          <Link to="/write" onClick={() => setOpen(false)}>Create Post</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>

          <SignedOut>
            <Link to="/login" onClick={() => setOpen(false)}>
              <button className="py-2 px-4 rounded-3xl bg-[#1DA1F2] text-white">
                Login 👋
              </button>
            </Link>
          </SignedOut>
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <SignedOut>
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-[#1DA1F2] text-white">
              Login 👋
            </button>
          </Link>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
