import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { HorizontalCards } from "./partials/HorizontalCards";
import { asyncloadperson, removeperson } from "../store/actions/personActions";
import Loading from "./Loading";
import Dropdown from "./partials/Dropdown";

export const PersonDetail = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const [Category, setCategory] = useState("movie");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return info ? (
    <div className="px-4 sm:px-6 lg:px-[5%] w-screen min-h-screen bg-black relative">
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-4 sm:gap-6 lg:gap-10 text-lg sm:text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#8b3103] ri-arrow-left-line text-xl sm:text-2xl"
        ></Link>
      </nav>
      <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-0">
        {/* part 2 left poster and details */}
        <div className="w-full lg:w-[20%]">
          <img
            className="w-full lg:w-auto h-[300px] sm:h-[400px] lg:h-[40vh] object-cover rounded-lg lg:rounded-none"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />
          <hr className="mt-3 mb-2 border-none h-[2px] bg-zinc-400" />
          {/* social media links */}
          <div className="text-lg sm:text-xl text-white flex gap-x-3 sm:gap-x-5 justify-center lg:justify-start">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
              className="hover:text-[#8b3103] transition-colors"
            >
              <i className="ri-earth-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
              className="hover:text-[#8b3103] transition-colors"
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
              className="hover:text-[#8b3103] transition-colors"
            >
              <i className="ri-instagram-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
              className="hover:text-[#8b3103] transition-colors"
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>

          {/* personal info */}
          <h1 className="text-base sm:text-lg text-zinc-400 font-semibold my-3">
            Personal Info
          </h1>

          <h1 className="text-sm sm:text-base text-zinc-400 font-semibold">Known For</h1>
          <h1 className="text-sm sm:text-base text-zinc-400">{info.detail.known_for_department}</h1>

          <h1 className="text-sm sm:text-base text-zinc-400 font-semibold mt-2">Gender</h1>
          <h1 className="text-sm sm:text-base text-zinc-400">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>

          <h1 className="text-sm sm:text-base text-zinc-400 font-semibold mt-2">Birthday</h1>
          <h1 className="text-sm sm:text-base text-zinc-400">{info.detail.birthday}</h1>

          <h1 className="text-sm sm:text-base text-zinc-400 font-semibold mt-2">Deathday</h1>
          <h1 className="text-sm sm:text-base text-zinc-400">
            {info.detail.deathday ? info.detail.deathday : "Still Alive"}
          </h1>

          <h1 className="text-sm sm:text-base text-zinc-400 font-semibold mt-2">
            Place Of Birth
          </h1>
          <h1 className="text-sm sm:text-base text-zinc-400">{info.detail.place_of_birth}</h1>

          <h1 className="text-sm sm:text-base text-zinc-400 font-semibold mt-2">
            Also Known As
          </h1>
          <h1 className="text-sm sm:text-base text-zinc-400">
            {info.detail.also_known_as.join(" , ")}
          </h1>
        </div>

        {/* part 3 right detail and information */}
        <div className="w-full lg:w-[80%] lg:ml-[2%]">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-zinc-400 font-black my-3">
            {info.detail.name}
          </h1>

          <h1 className="text-lg sm:text-xl text-zinc-400 font-semibold">Biography</h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 line-clamp-6 leading-relaxed">
            {info.detail.biography}
          </p>

          <h1 className="text-base sm:text-lg text-zinc-400 font-semibold mt-3">
            Known For
          </h1>
          <HorizontalCards data={info.combineCredits?.cast ?? []} />

          <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0">
            <h1 className="text-base sm:text-lg text-zinc-400 font-semibold mt-3">Acting</h1>

            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="list-disc text-zinc-400 w-full h-[40vh] mt-3 overflow-y-auto">
            {info[Category + "Credits"].cast.map((c, i) => (
              <li
                key={i}
                className="p-2 sm:p-3 hover:text-white duration-300 cursor-pointer"
              >
                <Link to={`/${Category}/details/${c.id}`} className="">
                  <span className="text-sm sm:text-base">
                    {c.name || c.title || c.original_name || c.original_title}
                  </span>
                  <span className="block ml-3 sm:ml-5 text-xs sm:text-sm">
                    {c.character && `character name : ${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
      
      {/* Black background overlay to cover any white space */}
      <div className="absolute inset-0 bg-black pointer-events-none" style={{ zIndex: -1 }}></div>
    </div>
  ) : (
    <Loading />
  );
};
