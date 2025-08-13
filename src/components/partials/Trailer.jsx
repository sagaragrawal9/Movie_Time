import React from "react";
import { useSelector } from "react-redux";
import Notfound from "../Notfound"; // Assuming you have a Notfound component
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

export const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  console.log(ytvideo);

  return (
    <div className="bg-black absolute z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center p-4">
      <Link
        onClick={() => navigate(-1)}
        className="absolute hover:text-[#8b3103] ri-close-fill text-2xl sm:text-3xl text-white right-4 sm:right-[5%] top-4 sm:top-[2%] z-10"
      >
      </Link>

      {ytvideo ? (
        <div className="w-full max-w-4xl">
          <ReactPlayer
            height="auto"
            width="100%"
            url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
            controls
            config={{
              youtube: {
                playerVars: { origin: window.location.origin },
              },
            }}
            style={{ aspectRatio: '16/9' }}
          />
        </div>
      ) : (
        <Notfound/>
      )}
    </div>
  );
};

export default Trailer;
