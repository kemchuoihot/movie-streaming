import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../api/api"; // Import fetchMovieDetails
import { Link } from "react-router-dom";

const Watch = () => {
  const { slug } = useParams();
  const [film, setFilm] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [movie, setMovie] = useState(0);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const filmData = await fetchMovieDetails(slug);
        setFilm(filmData);
        // if (filmData.episodes[0].server_data.length ==1) {
        //   setMovie(true);
        // }
        console.log(filmData);
      } catch (error) {
        console.error("Failed to fetch film:", error);
      }
    };

    fetchFilm();
  }, [slug]);
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
    <div>
      {/* <h1>{film.movie.name}</h1> */}
      <header
        className={`fixed top-0 left-0 w-full z-20 transition-all duration-500 ${
          scrolled
            ? "bg-blue-900 bg-opacity-90 border-indigo-600"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center">
            <ul className="flex space-x-4 pt-5">
              <li>
                <Link
                  to="/"
                  className="text-white text-lg font-bold hover:text-gray-400"
                >
                  <img
                    src="https://seeklogo.com/images/M/movie-city-hd-logo-D25A7AC34A-seeklogo.com.png"
                    alt="logo"
                    className="w-20  mr-4"
                  />
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
        className="h-screen relative bg-cover"
        style={{ backgroundImage: `url(${film.movie.thumb_url})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#06121e] bg-black bg-opacity-40"></div>
        <iframe
          title={`Watch ${film.movie.name}`}
          src={film.episodes[0].server_data[movie].link_embed}
          width="85%"
          height="90%"
          allowFullScreen
          className="absolute inset-0 mt-20 mx-auto"
        ></iframe>
      </div>
      <div className="bg-[#06121e] h-screen">
        <div className="container mx-auto">
          <h3 className="text-white py-10">Danh sách tập phim: </h3>
          <div className="flex flex-wrap">
            {film &&
              film.episodes[0].server_data.map((episode, i) => (
                <div key={episode.id} className="text-white">
                  <button
                    onClick={() => {
                      setMovie(i);
                    }}
                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    {episode.name}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
