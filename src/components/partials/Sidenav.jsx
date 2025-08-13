import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMenu}
          className="text-white bg-[#8b3103] p-2 rounded-lg hover:bg-[#6b2502] transition-colors"
        >
          <i className={`ri-${isOpen ? 'close' : 'menu'}-line text-xl`}></i>
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative lg:block z-50
        ${isOpen ? 'block' : 'hidden'}
        w-64 lg:w-[20%] h-full border-r-2 border-zinc-400 
        bg-gray-950 lg:bg-transparent
        p-4 lg:p-8
        transform transition-transform duration-300 ease-in-out
        lg:transform-none
      `}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl lg:text-2xl text-white font-bold">
            <i className="text-[#8b3103] ri-tv-fill mr-3"></i>
            <span>Movie Time</span>
          </h1>
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white hover:text-[#8b3103] transition-colors"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>
        
        <nav className="flex flex-col text-zinc-400 text-lg lg:text-xl gap-1">
          <h1 className="text-white font-semibold text-lg lg:text-xl mt-4 lg:mt-6 mb-2 lg:mb-1">
            New Feeds
          </h1>
          <Link 
            to="/trending" 
            onClick={() => setIsOpen(false)}
            className="hover:bg-[#8b3103] hover:text-white duration-300 rounded-xl p-3 lg:p-4 flex items-center"
          >
            <i className="mr-2 ri-fire-fill"></i>Trending
          </Link>
          <Link 
            to="/popular" 
            onClick={() => setIsOpen(false)}
            className="hover:bg-[#8b3103] hover:text-white duration-300 rounded-xl p-3 lg:p-4 flex items-center"
          >
            <i className="mr-2 ri-bard-fill"></i>Popular
          </Link>
          <Link 
            to="/movie" 
            onClick={() => setIsOpen(false)}
            className="hover:bg-[#8b3103] hover:text-white duration-300 rounded-xl p-3 lg:p-4 flex items-center"
          >
            <i className="mr-2 ri-movie-2-fill"></i>Movies
          </Link>
          <Link 
            to="/tv" 
            onClick={() => setIsOpen(false)}
            className="hover:bg-[#8b3103] hover:text-white duration-300 rounded-xl p-3 lg:p-4 flex items-center"
          >
            <i className="mr-2 ri-tv-2-fill"></i>Tv Shows
          </Link>
          <Link 
            to="/person" 
            onClick={() => setIsOpen(false)}
            className="hover:bg-[#8b3103] hover:text-white duration-300 rounded-xl p-3 lg:p-4 flex items-center"
          >
            <i className="mr-2 ri-team-fill"></i>People
          </Link>
        </nav>
        
        <hr className="mt-5 border-none h-[1px] bg-zinc-400" />
        
        <nav className="flex flex-col text-zinc-400 text-lg lg:text-xl gap-1">
          <h1 className="text-white font-semibold text-lg lg:text-xl mt-6 mb-2 lg:mb-1">
            Website Information
          </h1>
          <Link 
            target="_blank" 
            to={`https://sagaragrawal9.github.io/front-end-project/`} 
            onClick={() => setIsOpen(false)}
            className="hover:bg-white hover:text-black duration-300 rounded-xl p-3 lg:p-4 flex items-center"
          >
            <i className="mr-2 ri-contacts-line"></i>About Me
          </Link>
          <Link target="_blank" 
            to={`https://github.com/sagaragrawal9/Movie_Time`}
            onClick={() => setIsOpen(false)}
            className="hover:bg-white hover:text-black duration-300 rounded-xl p-3 lg:p-4 flex items-center"
          >
            <i className="mr-2 ri-code-s-slash-line"></i>Codebase
          </Link>
        </nav>
      </div>
    </>
  );
};
