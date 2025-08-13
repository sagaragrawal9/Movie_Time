import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.png"

export const Cards = ({ data, title }) => {
  return (
    <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 w-full h-full px-4 sm:px-[3%] bg-black pb-8">
      {data.map((c, i) => (
        <Link 
          to={`/${c.media_type || title}/details/${c.id}`} 
          className="relative group transition-transform duration-300 hover:scale-105" 
          key={i}
        >
          <img 
            className="w-full h-[200px] sm:h-[220px] md:h-[240px] lg:h-[35vh] object-cover rounded-lg" 
            src={c.poster_path || c.backdrop_path || c.profile_path ? `https://image.tmdb.org/t/p/original/${
              c.poster_path || c.backdrop_path || c.profile_path
            }`:noimage} 
            alt={c.name || c.title || "Movie Poster"} 
          />
          <h1 className="text-sm sm:text-base text-zinc-300 mt-2 font-semibold line-clamp-2">
            {c.name || c.title || c.original_name || c.original_title}
          </h1>
          {c.vote_average && (
            <div className="absolute right-2 top-2 rounded-full text-xs sm:text-sm font-semibold bg-yellow-600 text-white w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center">
              {(c.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};


