import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import {HorizontalCards} from "./partials/HorizontalCards";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import Loading from "./Loading";

export const Moviedetails = () => {

  const { pathname} = useLocation();
  const navigate = useNavigate(); 
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  console.log(info); 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,

        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-screen h-[160vh] px-[10%]"
    >
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#8b3103] ri-arrow-left-line"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-line"></i>
        </a>

        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>

        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
        >
          imdb
        </a>
      </nav>

      <div className="w-full flex">
        <img
          className=" h-[50vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className="content ml-[5%] text-white">

          <h1 className="text-5xl font-black ">
          {info.detail.name || info.detail.title || info.detail.original_name || info.detail.original_title}
          <small className="text-2xl font-bold text-zinc-200">
          ({info.detail.release_date.split("-")[0]})

          </small>
          </h1>

          <div className="mt-3 mb-5 flex items-center gap-x-3 "> 
          <span className="rounded-full text-l font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center ">
          {(info.detail.vote_average * 10).toFixed()} <sup> %</sup>
        </span>

        <h1 className="w-[60px] font-semibold text-xl leading-6">
          User Score 
        </h1>
        <h1>
        {info.detail.release_date}
        </h1>
        <h1>{info.detail.genres.map((g)=> g.name).join((", "))}</h1>

        <h1>
          {info.detail.runtime} min
        </h1>
          </div>

          <h1 className="text-l font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>


          <h1 className="text-xl mt-5 mb-3">
            Overview
          </h1>
          <p className="mb-[5%]">
            {info.detail.overview}
          </p>

          <Link className=" p-4 bg-[#8b3103] rounded-lg" to={`${pathname}/trailer`}>
          <i className="ri-play-fill mr-2"></i>
          Play Trailer
          </Link>
  
        </div>
      </div>
      {/* part 3 */}
      <div className="w-[80%] flex flex-col gap-y-4 mt-12">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-8 items-center text-white ">
            <h1> Available on Platform </h1>
            {info.watchproviders.flatrate.map((w,i) => (
              <img key={i} title={w.provider_name} 
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-8 items-center text-white ">
            <h1> Available on Rent </h1>
            {info.watchproviders.rent.map((w,i) => (
              <img key={i} title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-8 items-center text-white ">
            <h1> Available to Buy </h1>
            {info.watchproviders.buy.map((w,i) => (
              <img key={i} title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>
      {/* part 4 */}
      <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-400" />
      <h1 className="text-xl font-semibold text-white">
        Recommendations and Similar Movies
      </h1>
      <HorizontalCards data={info.recommendations || info.similar} />


      <Outlet/>      



    </div>
  ) : (
    <Loading />
  );
};
