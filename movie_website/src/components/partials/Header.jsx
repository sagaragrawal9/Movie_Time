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
      className="w-full h-[50vh] flex  flex-col justify-end items-start p-[3%]"
    >
      <h1 className=" w-[70%] text-5xl font-black text-white">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="w-[70%] mt-2 mb-2 text-white">{data.overview.slice(0, 200)}
        ...<Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400"> more</Link>
      </p>

      <p className="text-white ">

      <i className=" text-yellow-500 ri-megaphone-fill"></i> {data.release_date || "No Info "}
      <i className="text-yellow-500 ml-5 ri-album-fill"></i> {data.media_type.toUpperCase()}

      </p>

      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className=" bg-[#8b3103] p-3 rounded text-white mt-4 "> Watch Trailer 
      </Link>
      
    </div>
  );
};

export default Header;
