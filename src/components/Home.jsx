import React, { useEffect, useState } from "react";
import { Sidenav } from "./partials/Sidenav";
import { Topnav } from "./partials/Topnav";
import axios from "../utils/axios";
import { Header } from "./partials/Header";
import { HorizontalCards } from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./Loading";

export const Home = () => {
  document.title = "Home";

  const [wallpaper, setwallpaper] = useState();
  const [trending, settrending] = useState();
  const [category, setcategory] = useState("all");

  const GetHeaderwallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomdata = data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomdata);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      settrending(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    !wallpaper && GetHeaderwallpaper();
    GetTrending();
  }, [category]);

  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="w-full lg:w-[80%] h-full overflow-auto overflow-x-hidden pt-16 lg:pt-0">
        <Topnav />
        <Header data={wallpaper} />

        <div className="flex flex-col sm:flex-row justify-between p-2 gap-4">
          <h1 className="text-2xl lg:text-3xl font-semibold text-zinc-400">
            Trending
          </h1>
          <Dropdown
            title="Choose a category"
            options={["movie", "tv", "all"]}
            func={(e)=>setcategory(e.target.value)}
          />
        </div>

        <HorizontalCards data = {trending} />
      </div>
    </>
  ) : <Loading/>
};

export default Home;
