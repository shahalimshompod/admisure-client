import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import sureIcon from "../assets/icons/sure.png";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../Auth/AuthContextProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const { user, userLogout } = useContext(AuthContext);
  const image = user?.photoURL;

  // Toggle hamburger menu
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    userLogout();
    toast.success("Successfully logged out!");
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Routes array for reusability
  const routes = [
    { path: "/", label: "Home" },
    { path: "/colleges", label: "Colleges" },
    ...(user
      ? [
          { path: "/admission", label: "Admission" },
          { path: "/my-college", label: "My College" },
        ]
      : []),
    { path: "/about-us", label: "About Us" },
  ];

  return (
    <div className="shadow-sm">
      <div
        className={`fixed top-0 left-0 right-0 z-50 py-4 ${
          scrolled || path !== "/"
            ? "bg-[#890C25] transition ease-in duration-300"
            : "bg-transparent transition ease-in duration-300"
        }`}
      >
        <div className="navbar container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <img className="w-10 md:w-12" src={sureIcon} alt="Logo" />
            <span
              className="text-white slab font-bold text-xl md:text-3xl"
              style={{ color: "#FFFFFF" }}
            >
              Admisure
            </span>
          </a>

          {/* Desktop menu */}
          <ul className="hidden lg:flex menu-horizontal text-white font-bold quick text-base md:text-lg gap-6">
            {routes.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#FFF4F6] text-[#890C25] rounded-md px-3 py-1"
                      : "hover:bg-white/20 px-3 py-1 rounded-md transition"
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger & profile */}
          <div className="flex items-center gap-4">
            {/* Hamburger */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-white text-2xl focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Profile dropdown */}
            {user ? (
              <div className="dropdown dropdown-end relative">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn bg-transparent btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    {image ? (
                      <img alt="Profile" src={image} />
                    ) : (
                      <FaUserCircle fill="white" size={38} />
                    )}
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu quick menu-sm dropdown-content bg-base-100 rounded-box shadow mt-3 w-fit p-2 z-50"
                >
                  {/* User Info */}
                  <li className="p-">
                    <h1 className="font-black text-lg truncate">
                      {user?.displayName}
                    </h1>
                    <h4 className="font-semibold text-sm truncate">
                      {user?.email}
                    </h4>
                  </li>

                  {/* Divider */}
                  <div className="divider my-2"></div>

                  <li>
                    <Link to="/my-profile" onClick={() => setMenuOpen(false)}>
                      <p className="font-normal text-base">Profile</p>
                    </Link>
                  </li>
                  <li>
                    <p
                      className="font-normal text-base cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </p>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="hidden lg:block">
                <button className="btn quick border-none hover:bg-[#FFF4F6] text-[#890C25]">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="lg:hidden bg-[#890C25] text-white px-6 py-4">
            <ul className="flex flex-col gap-4 quick font-semibold text-base">
              {routes.map(({ path, label }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#FFF4F6] text-[#890C25] rounded-md px-3 py-1 block"
                        : "hover:bg-white/20 px-3 py-1 rounded-md block transition"
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}

              {!user && (
                <li>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    <button className="w-full btn quick border-none hover:bg-[#FFF4F6] text-[#890C25]">
                      Login
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
