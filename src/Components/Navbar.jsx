import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import sureIcon from "../assets/icons/sure.png";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../Auth/AuthContextProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  // scroll functionalities
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  // user information
  const { user, userLogout } = useContext(AuthContext);
  // user info
  const image = user?.photoURL;

  // handle logout user when click logout btn
  const handleLogout = () => {
    userLogout();
    // toast
    toast.success("Successfully toasted!");
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 200) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="shadow-sm">
      <div
        className={`fixed top-0 left-0 right-0 z-50 py-4 ${
          scrolled || path !== "/"
            ? "bg-[#890C25] transition ease-in"
            : "bg-transparent ease-in"
        }`}
      >
        <div className="navbar container mx-auto">
          <div className="navbar-start">
            <a href="/">
              <div className="flex items-center gap-3">
                <img className="w-12" src={sureIcon} alt="Logo" />
                <span className="text-3xl text-white slab">Admisure</span>
              </div>
            </a>
          </div>

          {/* routes */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal text-white text-lg quick font-bold gap-5">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#FFF4F6] text-[#890C25] rounded-md px-3 py-1"
                      : "hover:bg-white/20 px-3 py-1 rounded-md"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/colleges"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#FFF4F6] text-[#890C25] rounded-md px-3 py-1"
                      : "hover:bg-white/20 px-3 py-1 rounded-md"
                  }
                >
                  Colleges
                </NavLink>
              </li>
              {user ? (
                <>
                  <li>
                    <NavLink
                      to="/admission"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-[#FFF4F6] text-[#890C25] rounded-md px-3 py-1"
                          : "hover:bg-white/20 px-3 py-1 rounded-md"
                      }
                    >
                      Admission
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/my-college"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-[#FFF4F6] text-[#890C25] rounded-md px-3 py-1"
                          : "hover:bg-white/20 px-3 py-1 rounded-md"
                      }
                    >
                      My College
                    </NavLink>
                  </li>
                </>
              ) : (
                ""
              )}
              <li>
                <NavLink
                  to="/about-us"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#FFF4F6] text-[#890C25] rounded-md px-3 py-1"
                      : "hover:bg-white/20 px-3 py-1 rounded-md"
                  }
                >
                  About Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* profile dropdown */}
          <div className="navbar-end">
            {user ? (
              <div className="dropdown dropdown-end">
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
                  className="menu quick menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-ful p-2 shadow"
                >
                  <div className="p-2">
                    <h1 className="font-black text-xl">{user?.displayName}</h1>
                    <h4 className="font-semibold text-sm">{user?.email}</h4>
                  </div>
                  <div className="divider"></div>
                  <li>
                    <Link to={"/my-profile"}>
                      <p className="font-normal text-lg">Profile</p>
                    </Link>
                  </li>
                  <li>
                    <p className="font-normal text-lg" onClick={handleLogout}>
                      Logout
                    </p>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to={"/login"}>
                <button className="btn quick border-none hover:bg-[#FFF4F6]">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
