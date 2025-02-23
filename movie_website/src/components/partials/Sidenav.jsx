import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const Sidenav = () => {

  return (
    <>
      <div className="w-[20%] h-full border-r-2 border-zinc-400 p-8">
        <h1 className="text-2xl text-white font-bold">
          <i className="text-[#8b3103] ri-tv-fill mr-3"></i>
          <span>Movie Time</span>
        </h1>
        <nav className="flex flex-col text-zinc-400 text-xl gap-1">
          <h1 className="text-white font-semibold text-xl mt-6 mb-1">
            New Feeds
          </h1>
          <Link to="/trending" className="hover:bg-[#8b3103] hover:text-white duration-300 rounded-xl p-4"><i className="mr-2 ri-fire-fill"></i>Trending</Link>
          <Link to="/popular " className="hover:bg-[#8b3103] hover:text-white duration-300 rounded-xl p-4"><i className="mr-2 ri-bard-fill"></i>Popular</Link>
          <Link to="/movie" className="hover:bg-[#8b3103] hover:text-white duration-300 rounded-xl p-4"><i className="mr-2 ri-movie-2-fill"></i>Movies</Link>
          <Link to="/tv" className="hover:bg-[#8b3103] hover:text-white duration-300 rounded-xl p-4"><i className="mr-2 ri-tv-2-fill"></i>Tv Shows</Link>
          <Link to="/person" className="hover:bg-[#8b3103] hover:text-white duration-300 rounded-xl p-4"><i className="mr-2 ri-team-fill"></i>People</Link>
        </nav>
        <hr className="mt-5 border-none h-[1px] bg-zinc-400" />
        <nav className="flex flex-col text-zinc-400 text-xl gap-1">
          <h1 className="text-white font-semibold text-xl mt-6 mb-1">
            Website Information
          </h1>
          <Link target="_blank" to={`https://sagaragrawal9.github.io/front-end-project/`} className="hover:bg-white hover:text-black duration-300 rounded-xl p-4"><i className="mr-2 ri-contacts-line"></i>About Me</Link>
          <Link target="_blank" to={`https://movie-time-gilt.vercel.app/`} className="hover:bg-white hover:text-black duration-300 rounded-xl p-4"><i className="mr-2 ri-code-s-slash-line"></i>Codebase</Link>
        </nav>
      </div>
    </>
  );
};
