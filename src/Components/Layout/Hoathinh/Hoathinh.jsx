import React, { useState, useEffect, useRef } from "react";
import { fetchMovieByCategory } from "../../../api/api.js";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Hoathinh = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchMovieByCategory("hoat-hinh");
        if (response && response.data.items) {
          setData(response.data.items);
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
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-[#06121e] h-auto p-10 -top-28 relative">
      <div className="relative bg-[#0e274073] rounded-lg px-5 container mx-auto">
        <div className="flex justify-between pt-5 pb-4">
          <div className="inline-block">
            <h1 className="text-2xl font-bold font-[Montserrat] ml-5 relative bg-gradient-to-br from-[#ff8a00]  to-[#ff2070] inline-block text-transparent bg-clip-text">
              PHIM HOẠT HÌNH:
            </h1>
            <div className="w-full h-[1px] text-transparent bg-gradient-to-br from-[#ff8a00]  to-[#ff2070] ml-5"></div>
          </div>
          <button className="text-white  md:tracking-widest rounded-xl w-40  hover:from-black hover:to-black transition duration-300 mb-1 text-right">
            Xem thêm
          </button>
        </div>
        <div className="grid grid-cols-5">
          {data.length > 0 ? (
            data.map((item) => (
              <Link to={`/detail/${item.slug}`}>
                <div
                  key={item.id}
                  className="inline-block p-3 transform transition-transform duration-300 hover:scale-105 snap-start mx-2 hoathinh min-h-80"
                >
                  <div className="rounded-lg shadow-lg">
                    <LazyLoadImage
                      effect="blur"
                      src={`https://phimimg.com/${item.poster_url}`}
                      alt="poster"
                      className="w-[220px] h-72 object-cover rounded hover:shadow-lg transition duration-300 hover:shadow-md"
                    />
                    {/* <div className="p-4">
                      <h3 className="text-xl font-bold">{item.name}</h3>
                      <p className="text-gray-500">{item.description}</p>
                      </div> */}
                  </div>
                  <h3 className="max-w-[184px] inline-block text-ellipsis overflow-hidden whitespace-nowrap text-[#dbdbdb]">
                    {item.name}
                  </h3>
                  <h4 className="max-w-[184px] text-ellipsis overflow-hidden whitespace-nowrap text-[#7a7a7a] text-xs">{item.origin_name}</h4>
                </div>
              </Link>
            ))
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hoathinh;
