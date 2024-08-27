import React from "react";
import { Link } from "react-router-dom";
import "boxicons/css/boxicons.min.css";

const NavBar = () => {
  return (
    <>
      <div className="sticky top-0 z-20">
        <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-8 justify-between items-center">
          <div className="col-span-2 lg:block hidden">
            <Link to="/">
              <img
                src="https://seeklogo.com/images/M/movie-city-hd-logo-D25A7AC34A-seeklogo.com.png"
                alt="logo"
                className="w-full h-14 object-contain rounded-full"
              />
            </Link>
          </div>
          <div className="col-span-3">
            <form
              action=""
              method="get"
              className="w-full text-sm bg-gray-300 rounded-full gap-4">
              <button
                type="submit"
                className="bg-blue-500 w-12 justify-start h-12 rounded-full text-white"
              >
                <i className="bx bx-search-alt"></i>
              </button>
              <input type="text" placeholder="Search movie here" className="font-medium placeholder:text-gray-600 text-sm w-10/12  bg-transparent border-none px-2 text-black" />
            </form>
          </div>
          <div className="col-span-3 font-medium text-sm gap-36 xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center hidden">
            <ul className="flex lg:gap-10 gap-4">
              <li>
                <Link to="/" className="text-white text-base font-medium hover:text-blue-800 transition-all ">
                <i class='bx bx-home-alt-2 mr-1'></i>Home
                </Link>
              </li>
              <li>
                <Link to="/movies" className="text-white text-base font-medium hover:text-blue-800 transition-all ">
                <i class='bx bx-movie mr-1' ></i>Movies
                </Link>
              </li>
              <li>
                <Link to="/tv-shows" className="text-white text-base font-medium hover:text-blue-800 transition-all ">
                <i class='bx bx-tv mr-1' ></i>TV Shows
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white  text-base font-medium hover:text-blue-800 transition-all ">
                <i class='bx bx-user mr-1'></i>About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
