import logo from "../assests/logo.png";

export const Navbar = () => {
  return (
    <nav
      className="
        sticky top-0 z-50 
        bg-[#181C3A]
        flex items-center justify-between
        px-12 py-2
        shadow-2xl
        mx-0 sm:mx-[50px] overflow-auto
      "
    >
      {/* Left Section — Logo + Title */}
      <div className="flex flex-col items-start">
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Rufrent Logo"
            className="h-10 w-auto object-contain"
          />
        </div>
        <span className="text-white text-xl mt-1 ml-1 font-medium tracking-wide">
          MyPG
        </span>
      </div>

      {/* Right Section — Buttons */}
      <div className="flex items-center space-x-6">
        <button className="text-white text-lg font-semibold hover:opacity-80 transition">
          Login
        </button>
        <button
          className="
            bg-gradient-to-r from-[#FB432C] to-[#FF591E]
            text-white font-semibold text-lg
            px-6 py-2 rounded-xl
            shadow-md hover:opacity-90 transition
          "
        >
          Request Demo
        </button>
      </div>
    </nav>
  );
};