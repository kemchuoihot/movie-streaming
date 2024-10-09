import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Slide = ({ movie, showFullContent, toggleContent, data }) => {

  return ( 
    
    <div className="relative">
      <img
        src={movie.movie.thumb_url}
        alt="slide"
        className="w-full h-full relative -top-28"
      />
      <div className="absolute -top-28 left-0 w-full h-full bg-gradient-to-r from-gray-950 bg-gray-950 bg-opacity-60 flex items-center justify-between px-40 space-y-4">
        <div className="relative w-1/2">
          <h2 className="text-white text-4xl font-black font-[Merriweather]">
            {movie.movie.name}
          </h2>
          <p className="text-white text-2xl font-semibold my-4 font-[Merriweather]">
            Năm: {movie.movie.year}
          </p>
          <p className="text-white text-balance my-4">
            {showFullContent
              ? movie.movie.content
              : `${movie.movie.content?.substring(0, 200)}...`}
            <button
              onClick={toggleContent}
              className="text-blue-500 opacity-80 ml-2 transition-all"
            >
              {showFullContent ? "Thu gọn" : "Xem thêm"}
            </button>
          </p>
          <p className="text-white mb-5">{movie.movie.time}</p>
          <Link to={`/detail/${movie.movie.slug}`}>
            <button className="relative inline-flex items-center justify-center p-5 px-8 py-3.5 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-lg shadow-xl group hover:ring-0 hover:ring-purple-500 -left-[2px]">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
              <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
              <span className="relative text-white text-base font-semibold">
                Xem Ngay
              </span>
            </button>
          </Link>
        </div>
        <div className="relative w-1/2 mx-auto flex justify-center">
          <LazyLoadImage
            effect="blur"
            src={movie.movie.poster_url}
            alt="poster_movie"
            className="w-3/5 rounded-lg mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Slide;