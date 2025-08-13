import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import axios from '../utils/axios';
import Loading from './Loading';
import { Cards } from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Sidenav } from './partials/Sidenav';

export const Trending = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "Movie Time | Trending " 

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      settrending((prevState) => [...prevState, ...data.results]);
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
    settrending([]); 
    setpage(1); 
    setHasMore(true); 
    GetTrending();
  }, [category, duration]);

  return trending.length > 0 ? (
    <>
      <Sidenav />
      <div className="w-full lg:w-[80%] h-screen overflow-auto pt-16 lg:pt-0">
        <div className="mt-4 px-4 sm:px-6 lg:px-[2%] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <h1 className="text-lg sm:text-xl text-zinc-400 font-semibold flex items-center">
            <i onClick={() => navigate(-1)} className="hover:text-[#8b3103] ri-arrow-left-line mr-2 text-xl sm:text-2xl cursor-pointer"></i>
            Trending
          </h1>

          <div className="flex flex-col sm:flex-row items-center w-full sm:w-[85%] gap-4 sm:gap-0">
            <Topnav />
            <Dropdown title="Category" options={["movie", "tv", "all"]} func={(e) => setcategory(e.target.value)} />
            <Dropdown title="Duration" options={["week", "day"]} func={(e) => setduration(e.target.value)} />
          </div>
        </div>

        <InfiniteScroll
          dataLength={trending.length}
          next={GetTrending}
          hasMore={hasMore}
          loader={<h1 className="text-white text-center py-4">Loading...</h1>}
        >
          <Cards data={trending} title={category} />
        </InfiniteScroll>
      </div>
    </>
  ) : <Loading />;
};

export default Trending;
