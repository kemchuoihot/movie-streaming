import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get('https://phimapi.com/danh-sach/phim-moi-cap-nhat');
        if (response.status && isMounted) {
          setData(response.items);
          console.log(response);
        }
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

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative container mx-auto">
      <button onClick={scrollLeft} className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full">
        &lt;
      </button>
      <div ref={scrollContainerRef} className="overflow-x-auto whitespace-nowrap py-4 no-scrollbar">
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item.id} className="inline-block p-3 transform transition-transform duration-300 hover:scale-105 ">
              <div className="rounded-lg shadow-lg">
                <img src={item.poster_url} alt="poster" className="w-48 h-80 object-cover rounded-lg hover:shadow-lg transition duration-300  hover:shadow-gray-400" />
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
      <button onClick={scrollRight} className="absolute -right-10 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full">
        &gt;
      </button>
    </div>
  );
};

export default Main;