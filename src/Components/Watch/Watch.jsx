import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../api/api"; // Import fetchMovieDetails

const Watch = () => {
  const { slug } = useParams();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const filmData = await fetchMovieDetails(slug);
        setFilm(filmData);
        console.log(filmData);
      } catch (error) {
        console.error("Failed to fetch film:", error);
      }
    };

    fetchFilm();
  }, [slug]);

  if (!film) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Watch {film.title}</h1>
      <iframe
        title={`Watch ${film.title}`}
        src={film.episodes[0].server_data[0].link_embed}
        width="100%"
        height="650px"
        allowFullScreen
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default Watch;