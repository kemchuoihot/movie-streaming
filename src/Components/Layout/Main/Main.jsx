import React, { useState, useEffect, useRef } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchDataFromAPI, fetchMovieDetails } from "../../../api/api.js";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Slide from "./Slide.jsx";

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
          setSlug(response.items[3].slug);
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

  if (loading) {
    return (
      <SkeletonTheme baseColor="#151d25" highlightColor="#525252">
        <div className="relative h-[800px]">
          <Skeleton height={800} className="w-full h-full relative -top-28" />
          <div className="absolute -top-28 left-0 w-full h-full bg-gradient-to-r from-gray-950 bg-gray-950 bg-opacity-60 flex items-center justify-between px-40 space-y-4">
            <div className="relative w-1/2">
              <Skeleton width={300} height={40} className="mb-4" />
              <Skeleton width={200} height={30} className="mb-4" />
              <Skeleton count={3} className="mb-4" />
              <Skeleton width={100} height={20} className="mb-5" />
              <Skeleton width={150} height={50} className="rounded-lg" />
            </div>
            <div className="relative w-1/2 mx-auto flex justify-center">
              <Skeleton
                width={400}
                height={500}
                className="rounded-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </SkeletonTheme>
    );
  }
  return (
    <>
      {(
        <div>
          <Slide
            movie={movie}
            showFullContent={showFullContent}
            toggleContent={toggleContent}
            data={data}
          />
        </div>
      ) || (
        <SkeletonTheme baseColor="#151d25" highlightColor="#525252">
          <Skeleton height={800} className="w-full h-full relative -top-28" />
        </SkeletonTheme>
      )}

      {data.length > 0 && (
        <div className="bg-[#06121e] h-auto p-10 -top-28 relative">
          <div className="relative bg-[#0e274073] rounded-lg px-5 container mx-auto">
            {data.length > 0 && (
              <div className="flex justify-between pt-5">
                <div className="inline-block">
                  <h1 className="text-2xl font-bold font-[Montserrat] ml-5 relative bg-gradient-to-br from-[#ff8a00]  to-[#ff2070] inline-block text-transparent bg-clip-text">
                    PHIM MỚI CẬP NHẬT:
                  </h1>
                  <div className="w-full h-[1px] text-transparent bg-gradient-to-br from-[#ff8a00]  to-[#ff2070] ml-5"></div>
                </div>
                <button className="text-white  md:tracking-widest rounded-xl w-40  hover:from-black hover:to-black transition duration-300 mb-1 text-right">
                  Xem thêm
                </button>
              </div>
            )}
            <button
              onClick={scrollLeft}
              className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-300 font-medium absolute -left-10 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full"
            >
              &lt;
            </button>
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto whitespace-nowrap py-4 no-scrollbar snap-mandatory snap-x"
            >
              {data.length > 0 ? (
                data.map((item) => (
                  <Link to={`/detail/${item.slug}`}>
                    <div
                      key={item.id}
                      className="inline-block p-3 transform transition-transform duration-300 hover:scale-105 snap-start"
                    >
                      <div className="rounded-lg shadow-lg">
                        <LazyLoadImage
                          effect="blur"
                          src={item.poster_url}
                          alt="poster"
                          className="w-[184px] h-80 object-cover rounded-lg hover:shadow-lg transition duration-300 hover:shadow-sky-950"
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
        </div>
      )}
    </>
  );
};

export default Main;
