import React from "react";
import { Link } from "react-router-dom";

export const Header = ({ data }) => {
  //console.log(data);
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,

        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[40vh] sm:h-[45vh] lg:h-[50vh] flex flex-col justify-end items-start p-4 sm:p-[3%]"
    >
      <h1 className="w-full sm:w-[85%] lg:w-[70%] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="w-full sm:w-[85%] lg:w-[70%] mt-2 mb-2 text-white text-sm sm:text-base">
        {data.overview.slice(0, 150)}...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400"> more</Link>
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 text-white text-sm sm:text-base">
        <p className="flex items-center">
          <i className="text-yellow-500 ri-megaphone-fill mr-2"></i> 
          {data.release_date || "No Info"}
        </p>
        <p className="flex items-center">
          <i className="text-yellow-500 ri-album-fill mr-2"></i> 
          {data.media_type.toUpperCase()}
        </p>
      </div>

      <Link 
        to={`/${data.media_type}/details/${data.id}/trailer`} 
        className="bg-[#8b3103] p-2 sm:p-3 rounded text-white mt-4 text-sm sm:text-base hover:bg-[#6b2502] transition-colors inline-flex items-center"
      > 
        <i className="ri-play-fill mr-2"></i>
        Watch Trailer 
      </Link>
      
    </div>
  );
};

export default Header;
