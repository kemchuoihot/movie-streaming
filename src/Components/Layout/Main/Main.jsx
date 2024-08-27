import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { fetchDataFromAPI, fetchMovieDetails } from "../../../api/api.js";

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);
  const [slug, setSlug] = useState(null);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchDataFromAPI();
        if (response && response.items) {
          setData(response.items);
          setSlug(response.items[8].slug);
        } else {
          setError("No items found in response");
        }
        console.log(response);
      } catch (error) {
        if (isMounted) {
          setError(error.message);
        }
        console.error(error.message);
      }
      if (isMounted) {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup function to set isMounted to false
    };
  }, []);
  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(slug);
        setMovie(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      }
    };

    getMovieDetails();
  }, [slug]);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <>
      <div className="relative">
        {data.length > 0 && (
          <>
            <img
              src={movie.movie.thumb_url}
              alt="slide"
              className="w-full h-full relative -top-28"
            />
            <div className="absolute -top-28 left-0 w-full h-full bg-gray-950 bg-opacity-60 flex items-center justify-between px-40 space-y-4">
              <div className="relative w-full">
                <h2 className="text-white text-4xl font-bold">
                  {movie.movie.name}
                </h2>
                <p className="text-white my-4">{movie.movie.content}</p>
                <p className="text-white">{movie.movie.time}</p>
                <p className="text-white my-4">{movie.movie.year}</p>
                <ul className="text-white space-y-2 flex">
                  Actor:
                  {movie.movie.actor &&
                    movie.movie?.actor?.map((actor) => (
                      <li key={actor.id} className="mr-3">
                        {actor}
                      </li>
                    ))}
                </ul>
                
              </div>
            </div>
          </>
        )}
      </div>

      <div className="relative container mx-auto">
        <button
          onClick={scrollLeft}
          className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full"
        >
          &lt;
        </button>
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto whitespace-nowrap py-4 no-scrollbar"
        >
          {data.length > 0 ? (
            data.map((item) => (
              <div
                key={item.id}
                className="inline-block p-3 transform transition-transform duration-300 hover:scale-105"
              >
                <div className="rounded-lg shadow-lg">
                  <img
                    src={item.poster_url}
                    alt="poster"
                    className="w-48 h-80 object-cover rounded-lg hover:shadow-lg transition duration-300 hover:shadow-gray-400"
                  />
                  {/* <div className="p-4">
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <p className="text-gray-500">{item.description}</p>
                  </div> */}
                </div>
              </div>
            ))
          ) : (
            <div>No data available</div>
          )}
        </div>
        <button
          onClick={scrollRight}
          className="absolute -right-10 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full"
        >
          &gt;
        </button>
      </div>
    </>
  );
};

export default Main;
