import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { fetchDataFromAPI, fetchMovieDetails } from "../../../api/api.js";
import { Link } from "react-router-dom";

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);
  const [slug, setSlug] = useState(null);
  const [movie, setMovie] = useState(null);
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchDataFromAPI();
        if (response && response.items) {
          setData(response.items);
          // Lấy chỉ số ngẫu nhiên từ 0 đến 9
          // const randomIndex = Math.floor(Math.random() * 10);
          // setSlug(response.items[randomIndex].slug);
          setSlug(response.items[0].slug);
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
  const toggleContent = () => {
    setShowFullContent(!showFullContent);
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
                  <button class="relative inline-flex items-center justify-center p-5 px-8 py-3.5 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-lg shadow-xl group hover:ring-0 hover:ring-purple-500 -left-[2px]">
                    <span class="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                    <span class="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                    <span class="relative text-white text-base font-semibold">
                      Xem Ngay
                    </span>
                  </button>
                </Link>
              </div>
              <div className="relative w-1/2 mx-auto flex justify-center">
                <img
                  src={movie.movie.poster_url}
                  alt="poster_movie"
                  className="w-3/5 rounded-lg"
                />
              </div>
            </div>
          </>
        )}
      </div>

      {data.length > 0 && (
        <div className="relative container mx-auto">
          {data.length > 0 && (
            <h1 className="text-3xl font-bold font-mono ml-5 relative -top-10">
              Phim mới cập nhật:
            </h1>
          )}
          <button
            onClick={scrollLeft}
            className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-300 font-medium absolute -left-10 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full"
          >
            &lt;
          </button>
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto whitespace-nowrap py-4 no-scrollbar"
          >
            {data.length > 0 ? (
              data.map((item) => (
                <Link to={`/detail/${item.slug}`}>
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
                </Link>
              ))
            ) : (
              <div>Loading</div>
            )}
          </div>
          <button
            onClick={scrollRight}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-300 absolute -right-10 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full"
          >
            &gt;
          </button>
        </div>
      )}
    </>
  );
};

export default Main;
