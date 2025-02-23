import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.png"

export const HorizontalCards = ({ data = [] }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p className="text-white p-2">No recommendations available.</p>;
  }

  return (
    <div className="w-[100%] p-2 flex overflow-y-hidden mb-5">
      { data.map((d, i) => (
        <Link
          to={`/${d.media_type}/details/${d.id}`}
          key={i}
          className="min-w-[15%] h-[35vh] mr-5 mb-5"
        >
          <img
            className="w-full h-[45%] object-cover"
            src={d.backdrop_path || d.poster_path ? `https://image.tmdb.org/t/p/original/${d.backdrop_path || d.poster_path}`: noimage}
            alt={d.name || d.title || "Movie Poster"}
          />
          <div className="text-white bg-black p-2 h-[55%] overflow-y-auto">
            <h1 className="text-base font-semibold ">
              {d.name || d.title || d.original_name || d.original_title}
            </h1>
            <p className="text-xs">
              {d.overview ? `${d.overview.slice(0, 50)}...` : "No overview available"}
              <span className="text-zinc-500"> more</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
