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
    <div className="px-[5%] w-screen h-[150vh] bg-black">
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#8b3103] ri-arrow-left-line"
        ></Link>
      </nav>
      <div className="w-full flex">
        {/* part 2 left poster and details */}
        <div className="w-[20%]">
          <img
            className=" h-[40vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />
          <hr className="mt-3 mb-2 border-none h-[2px] bg-zinc-400" />
          {/* social media links */}
          <div className="text-xl text-white flex gap-x-5">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="ri-instagram-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>

          {/* personal info */}

          <h1 className="text-lg text-zinc-400 font-semibold my-3">
            personal info
          </h1>

          <h1 className="text-l text-zinc-400 font-semibold">known for</h1>

          <h1 className="text-zinc-400">{info.detail.known_for_department}</h1>

          <h1 className="text-l text-zinc-400 font-semibold mt-2">Gender</h1>

          <h1 className="text-zinc-400">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>

          <h1 className="text-l text-zinc-400 font-semibold mt-2">Birthday</h1>

          <h1 className="text-zinc-400">{info.detail.birthday}</h1>

          <h1 className="text-l text-zinc-400 font-semibold mt-2">Deathday</h1>

          <h1 className="text-zinc-400">
            {info.detail.deathday ? info.detail.deathday : "Still Alive"}
          </h1>

          <h1 className="text-l text-zinc-400 font-semibold mt-2">
            Place Of Birth
          </h1>

          <h1 className="text-zinc-400">{info.detail.place_of_birth}</h1>

          <h1 className="text-l text-zinc-400 font-semibold mt-2">
            Also Known As
          </h1>

          <h1 className="text-zinc-400">
            {info.detail.also_known_as.join(" , ")}
          </h1>
        </div>

        {/* part 3 right detail and information */}

        <div className="w-[80%] ml-[2%] ">
          <h1 className="text-5xl text-zinc-400 font-black my-3">
            {info.detail.name}
          </h1>

          <h1 className="text-xl text-zinc-400 font-semibold">Biography</h1>

          <p className="  text-zinc-400 mt-2 line-clamp-6">{info.detail.biography}</p>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Known For
          </h1>
          <HorizontalCards data={info.combineCredits?.cast ?? []} />

          <div className="w-full flex justify-between">
            <h1 className="text-lg text-zinc-400 font-semibold mt-3">Acting</h1>

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
                className="p-3 hover:text-white duration-300 cursor-pointer"
              >
                <Link to={`/${Category}/details/${c.id}`} className="">
                  <span>
                    {c.name || c.title || c.original_name || c.original_title}
                  </span>
                  <span className="block ml-5">
                    {c.character && `character name : ${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};
