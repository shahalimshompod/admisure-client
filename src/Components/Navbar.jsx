import React from "react";
import { NavLink } from "react-router-dom";
import sureIcon from "../assets/icons/sure.png";
import { useState } from "react";
import { useEffect } from "react";

const Navbar = () => {

  // scroll functionalities
  const [scrolled, setScrolled] = useState(false);

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
    <div className=" shadow-sm ">
      <div
        className={` fixed top-0 left-0 right-0 z-50 py-4 ${
          scrolled
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
            <ul className="menu menu-horizontal text-white text-lg quick font-bold">
              <li>
                <NavLink>Home</NavLink>
              </li>

              <li>
                <NavLink>Colleges</NavLink>
              </li>
              <li>
                <NavLink>Admission</NavLink>
              </li>
              <li>
                <NavLink>My College</NavLink>
              </li>
            </ul>
          </div>

          {/* profile dropdown */}
          <div className="navbar-end">
            <div className="dropdown dropdown-end ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
