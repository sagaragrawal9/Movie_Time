import React from "react";
import axios from "../utils/axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { Cards } from "./partials/Cards";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";

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
    <div className=' w-screen h-screen '>
      <div className='mt-4 px-[2%] w-screen flex items-center justify-between'>

        <h1 className='text-xl text-zinc-400 font-semibold'>
          <i onClick={() => navigate(-1)} className="hover:text-[#8b3103] ri-arrow-left-line"></i>
          Popular
        </h1>

        <div className='flex items-center w-[85%]'>
          <Topnav />
          <Dropdown title="Category" options={["movie", "tv"]} func={(e) => setcategory(e.target.value)} />
          <div className='w-[1%]'></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={popular.length}
        next={GetPopular}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>

    </div>
  ) : <Loading />;
};
