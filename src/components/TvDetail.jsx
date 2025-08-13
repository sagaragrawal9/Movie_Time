import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import {HorizontalCards} from "./partials/HorizontalCards";
import { asyncloadtv, removetv } from "../store/actions/tvActions";
import Loading from "./Loading";

export const TvDetail = () => {

  const { pathname} = useLocation();
  const navigate = useNavigate(); 
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  console.log(info); 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
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
      className="relative w-screen min-h-screen px-4 sm:px-6 lg:px-[10%] bg-black"
    >
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-4 sm:gap-6 lg:gap-10 text-lg sm:text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#8b3103] ri-arrow-left-line text-xl sm:text-2xl"
        ></Link>
        <a target="_blank" href={info.detail.homepage} className="hover:text-[#8b3103] transition-colors">
          <i className="ri-external-link-line"></i>
        </a>

        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          className="hover:text-[#8b3103] transition-colors"
        >
          <i className="ri-earth-fill"></i>
        </a>

        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
          className="hover:text-[#8b3103] transition-colors"
        >
          imdb
        </a>
      </nav>

      <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-0">
        <img
          className="w-full lg:w-auto h-[300px] sm:h-[400px] lg:h-[50vh] object-cover rounded-lg lg:rounded-none"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className="content lg:ml-[5%] text-white">

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
            {info.detail.name || info.detail.title || info.detail.original_name || info.detail.original_title}
            <small className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-200 block sm:inline sm:ml-2">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>

          <div className="mt-3 mb-5 flex flex-wrap items-center gap-3 sm:gap-x-3"> 
            <span className="rounded-full text-sm sm:text-base font-semibold bg-yellow-600 text-white w-12 h-12 sm:w-[5vh] sm:h-[5vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>

            <h1 className="font-semibold text-base sm:text-xl leading-6">
              User Score 
            </h1>
            <h1 className="text-sm sm:text-base">{info.detail.first_air_date}</h1>
            <h1 className="text-sm sm:text-base">{info.detail.genres.map((g)=> g.name).join((", "))}</h1>
            <h1 className="text-sm sm:text-base">{info.detail.runtime} min</h1>
          </div>

          <h1 className="text-base sm:text-lg font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>

          <h1 className="text-lg sm:text-xl mt-5 mb-3">
            Overview
          </h1>
          <p className="mb-[5%] text-sm sm:text-base leading-relaxed">
            {info.detail.overview}
          </p>

          <Link className="inline-flex items-center p-3 sm:p-4 bg-[#8b3103] rounded-lg hover:bg-[#6b2502] transition-colors text-sm sm:text-base" to={`${pathname}/trailer`}>
            <i className="ri-play-fill mr-2"></i>
            Play Trailer
          </Link>
  
        </div>
      </div>
      
      {/* part 3 */}
      <div className="w-full lg:w-[80%] flex flex-col gap-y-4 mt-8 sm:mt-12">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-8 items-start sm:items-center text-white">
            <h1 className="text-sm sm:text-base font-semibold">Available on Platform</h1>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {info.watchproviders.flatrate.map((w,i) => (
                <img key={i}
                 title={w.provider_name} 
                  className="w-10 h-10 sm:w-[5vh] sm:h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-8 items-start sm:items-center text-white">
            <h1 className="text-sm sm:text-base font-semibold">Available on Rent</h1>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {info.watchproviders.rent.map((w,i) => (
                <img key={i} title={w.provider_name}
                  className="w-10 h-10 sm:w-[5vh] sm:h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-8 items-start sm:items-center text-white">
            <h1 className="text-sm sm:text-base font-semibold">Available to Buy</h1>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {info.watchproviders.buy.map((w,i) => (
                <img key={i} title={w.provider_name}
                  className="w-10 h-10 sm:w-[5vh] sm:h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* part 4 */}
      <hr className="mt-8 sm:mt-10 mb-5 border-none h-[2px] bg-zinc-400" />
      <h1 className="text-lg sm:text-xl font-semibold text-white mb-4">
        Seasons
      </h1>
      <div className="w-full p-2 flex overflow-x-auto overflow-y-hidden mb-5 gap-3 sm:gap-4 lg:gap-5">
        {info.detail.seasons.length > 0 ? info.detail.seasons.map((s,i) => (
          <div key={i} className="min-w-[200px] sm:min-w-[220px] md:min-w-[240px] lg:min-w-[15%] h-[280px] sm:h-[300px] lg:h-[35vh] flex-shrink-0">
            <img className="w-full h-[45%] object-cover rounded-t-lg" src={`https://image.tmdb.org/t/p/original/${
              s.poster_path
            }`} alt="" />
            <div className="text-white bg-black p-3 h-[55%] overflow-y-auto rounded-b-lg">
              <h1 className="text-sm sm:text-base font-semibold">
                {s.name}
              </h1>
            </div>
          </div>
        )): (
          <h1 className="text-center mt-5 font-black text-xl sm:text-2xl text-white">No Seasons found</h1>
        )}
      </div>

      {/* part 5 */}
      <hr className="mt-8 sm:mt-10 mb-5 border-none h-[2px] bg-zinc-400" />
      <h1 className="text-lg sm:text-xl font-semibold text-white mb-4">
        Recommendations and Similar TV Shows
      </h1>
      <HorizontalCards data={info.recommendations || info.similar} />

      <Outlet/>      

      {/* Black background overlay to cover any white space */}
      <div className="absolute inset-0 bg-black pointer-events-none" style={{ zIndex: -1 }}></div>
    </div>
  ) : (
    <Loading />
  );
}
