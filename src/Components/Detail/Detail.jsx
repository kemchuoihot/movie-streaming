import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import { fetchMovieDetails } from "../../api/api"; // Import fetchMovieDetails
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Detail = () => {
  const { slug } = useParams();
  const [film, setFilm] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [trailerId, setTrailerId] = useState(null);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const filmData = await fetchMovieDetails(slug);
        setFilm(filmData);
        setTrailerId(filmData.movie.trailer_url.split("?v=")[1]);
        console.log(filmData);
      } catch (error) {
        console.error("Failed to fetch film:", error);
      }
    };

    fetchFilm();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
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

  if (!film) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-20 transition-all duration-500 ${
          scrolled
            ? "bg-blue-900 bg-opacity-90 border-indigo-600"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="img/logo.png" alt="logo" className="w-12 h-12 mr-4" />
            <ul className="flex space-x-4">
              <li>
                <Link
                  to="/"
                  className="text-white text-lg font-bold hover:text-gray-400"
                >
                  Home
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-white text-lg font-bold">
            {sessionStorage.getItem("username") ? (
              <a href="logout.php">
                {sessionStorage.getItem("username")} - Log out here
              </a>
            ) : (
              <a
                href={`login.php?redirect=${encodeURIComponent(
                  window.location.pathname
                )}`}
              >
                Log in
              </a>
            )}
          </div>
        </div>
      </header>
      <div
        style={{ backgroundImage: `url(${film.movie.thumb_url})` }}
        className="h-[530px] bg-cover bg-center relative"
      >
        <div className="absolute inset-0 bg-black bg-opacity-75"></div>
      </div>
      <section className="bg-gray-900 px-4 ">
        <div className="container mx-auto flex flex-col lg:flex-row ">
          <div className="w-full lg:w-1/3 mb-8 lg:mb-0 relative -top-80">
            <LazyLoadImage
              effect="blur"
              src={film.movie.poster_url}
              alt="poster"
              className="w-full h-auto rounded-lg"
            />
            <Link to={`/watch/${slug}`}>
              <button className="relative w-full mt-10 inline-flex items-center justify-center p-5 px-12 py-3.5 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-lg shadow-xl group hover:ring-0 hover:ring-purple-500 -left-[2px]">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                <span className="relative text-white text-base font-semibold">
                  <i class="bx bx-play"></i> Xem Ngay
                </span>
              </button>
            </Link>
            {/* <div className="mt-4">
              <div className="text-white text-center mb-4">
                Thanks for your feedback!
              </div>
              <div className="flex justify-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <label
                    key={i}
                    className="text-4xl text-gray-400 hover:text-yellow-400 cursor-pointer"
                  >
                    <input type="radio" name="rate" className="hidden" />
                    <i className="fa-solid fa-star"></i>
                  </label>
                ))}
              </div>
              <form className="mt-4">
                <textarea
                  className="w-full h-24 p-2 bg-gray-800 text-white rounded-lg"
                  placeholder="Describe your experience..."
                ></textarea>
                <button
                  type="submit"
                  className="mt-2 w-full bg-gray-700 text-white py-2 rounded-lg"
                >
                  Post
                </button>
              </form>
            </div> */}
          </div>
          <div className="w-full lg:pl-12">
            <div className="relative -top-72">
              <h1 className="text-4xl text-white font-bold font-[Merriweather] ">
                {film.movie.origin_name}
              </h1>
              <h1 className="text-xl text-gray-300 font-light mt-4 ">
                {film.movie.name}
              </h1>
              <h5 className="text-2xl text-white mt-2">({film.movie.year})</h5>
              <h4 className="text-lg text-white mt-2">
                {film.movie.time}{" "}
                <span className="bg-yellow-500 text-black px-2 py-1 rounded ml-10">
                  IMDB
                </span>{" "}
                <i className="fa-solid fa-star"></i>{" "}
                {film.movie.tmdb.vote_average === 0
                  ? "Chưa có đánh giá"
                  : film.movie.tmdb.vote_average}
              </h4>
              <div className="flex justify-between">
                <h3 className="text-lg  text-white mt-2 mr-4">
                  <span className="">Đạo diễn:</span> {film.movie.director[0]}
                </h3>
                <h3 className="text-lg text-white mt-2 mr-4">
                  <span className="">Diễn viên:</span>{" "}
                  {film.movie.actor[0] + ", " + film.movie.actor[1] + "..."}
                </h3>
              </div>
            </div>
            <div className="relative -top-60">
              <h4 className="text-xl text-white mt-2">{film.movie.genre}</h4>
              <p className="text-base text-gray-300 mt-20">
                {film.movie?.content}
              </p>
              <div className="mt-8">
                <span className="text-xl text-white">Trailer:</span>
                <iframe
                  className="w-4/5 h-[420px] mt-4"
                  src={`https://youtube.com/embed/${trailerId}`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Detail;
