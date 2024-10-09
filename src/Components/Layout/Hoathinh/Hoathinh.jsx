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
    <div className="bg-[#222d38] h-dvh p-10 -top-28 relative">
      <div className="relative bg-[#151d25] rounded-lg px-5 container mx-auto">
        <h1 className="text-2xl font-bold font-[Montserrat] ml-5 mt-5 relative bg-gradient-to-br from-[#ff8a00]  to-[#ff2070] inline-block w-full text-transparent bg-clip-text">
          PHIM HOẠT HÌNH:
        </h1>
        <div className="w-1/4 h-[1px] text-transparent bg-gradient-to-br from-[#ff8a00]  to-[#ff2070] ml-5"></div>
        <div className=" mx-auto">
          {data.length > 0 ? (
            data.map((item) => (
              <Link to={`/detail/${item.slug}`}>
                <div
                  key={item.id}
                  className="inline-block p-3 transform transition-transform duration-300 hover:scale-105 snap-start  mx-2 hoathinh"
                >
                  <div className="rounded-lg shadow-lg">
                    <LazyLoadImage
                      effect="blur"
                      src={`https://phimimg.com/${item.poster_url}`}
                      alt="poster"
                      className="w-[200px] h-72 object-cover rounded-lg hover:shadow-lg transition duration-300 hover:shadow-sky-950"
                    />
                    {/* <div className="p-4">
                      <h3 className="text-xl font-bold">{item.name}</h3>
                      <p className="text-gray-500">{item.description}</p>
                      </div> */}
                  </div>
                  <h3 className="max-w-[184px] inline-block text-ellipsis overflow-hidden whitespace-nowrap text-green-400">{item.name}</h3>
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
