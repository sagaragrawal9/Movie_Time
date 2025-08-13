import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.png"

export const HorizontalCards = ({ data = [] }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p className="text-white p-2">No recommendations available.</p>;
  }

  return (
    <div className="w-full p-2 flex overflow-x-auto overflow-y-hidden mb-5 gap-3 sm:gap-4 lg:gap-5">
      { data.map((d, i) => (
        <Link
          to={`/${d.media_type}/details/${d.id}`}
          key={i}
          className="min-w-[200px] sm:min-w-[220px] md:min-w-[240px] lg:min-w-[15%] h-[280px] sm:h-[300px] lg:h-[35vh] flex-shrink-0"
        >
          <img
            className="w-full h-[45%] object-cover rounded-t-lg"
            src={d.backdrop_path || d.poster_path ? `https://image.tmdb.org/t/p/original/${d.backdrop_path || d.poster_path}`: noimage}
            alt={d.name || d.title || "Movie Poster"}
          />
          <div className="text-white bg-black p-3 h-[55%] overflow-y-auto rounded-b-lg">
            <h1 className="text-sm sm:text-base font-semibold mb-2">
              {d.name || d.title || d.original_name || d.original_title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300">
              {d.overview ? `${d.overview.slice(0, 60)}...` : "No overview available"}
              <span className="text-zinc-500"> more</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
