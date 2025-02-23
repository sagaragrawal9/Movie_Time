import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.png"

export const Cards = ({ data, title }) => {
  return (
    <div className="mt-5 flex flex-wrap w-full h-full px-[3%] bg-black">
      {data.map((c, i) => (
        <Link to={`/${c.media_type || title}/details/${c.id}`} className="w-[25vh] mr-[5%] mb-[5%] relative" key={i}>
            <img className=" h-[35vh] object-cover" src={c.poster_path || c.backdrop_path || c.profile_path ? `https://image.tmdb.org/t/p/original/${
          c.poster_path || c.backdrop_path || c.profile_path
        }`:noimage} alt="" />
        <h1 className="text-l text-zinc-300 mt-3 font-semibold">
        {c.name || c.title || c.original_name || c.original_title}
        </h1>
        {c.vote_average && (
          <div className="absolute right-[-5%] bottom-[25%] rounded-full text-l font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center ">
          {(c.vote_average * 10).toFixed()} <sup> %</sup>
        </div>
        )}
        
         
        </Link>
      ))}
    </div>
  );
};


