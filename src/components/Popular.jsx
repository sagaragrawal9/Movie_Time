import React from "react";
import axios from "../utils/axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { Cards } from "./partials/Cards";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";
import { Sidenav } from "./partials/Sidenav";

export const Popular = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "Movie Time | Popular "


  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
      setpopular((prevState) => [...prevState, ...data.results]);
      setpage(prevPage => prevPage + 1);

      if (page >= data.total_pages) {
        setHasMore(false);
      }

      console.log("Fetched Data: ", data);
    } catch (error) {
      console.log("Error fetching trending data: ", error);
    }
  };

  useEffect(() => {
    setpopular([]); 
    setpage(1); 
    setHasMore(true); 
    GetPopular();
  }, [category]);


  return popular.length > 0 ? (
    <>
      <Sidenav />
      <div className="w-full lg:w-[80%] h-screen overflow-auto pt-16 lg:pt-0">
        <div className="mt-4 px-4 sm:px-6 lg:px-[2%] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <h1 className="text-lg sm:text-xl text-zinc-400 font-semibold flex items-center">
            <i onClick={() => navigate(-1)} className="hover:text-[#8b3103] ri-arrow-left-line mr-2 text-xl sm:text-2xl cursor-pointer"></i>
            Popular
          </h1>

          <div className="flex flex-col sm:flex-row items-center w-full sm:w-[85%] gap-4 sm:gap-0">
            <Topnav />
            <Dropdown title="Category" options={["movie", "tv"]} func={(e) => setcategory(e.target.value)} />
          </div>
        </div>

        <InfiniteScroll
          dataLength={popular.length}
          next={GetPopular}
          hasMore={hasMore}
          loader={<h1 className="text-white text-center py-4">Loading...</h1>}
        >
          <Cards data={popular} title={category} />
        </InfiniteScroll>
      </div>
    </>
  ) : <Loading />;
};
