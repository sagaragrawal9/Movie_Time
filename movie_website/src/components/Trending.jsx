import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import axios from '../utils/axios';
import Loading from './Loading';
import { Cards } from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';

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
    <div className=' w-screen h-screen '>
      <div className='mt-4 px-[2%] w-screen flex items-center justify-between'>

        <h1 className='text-xl text-zinc-400 font-semibold'>
          <i onClick={() => navigate(-1)} className="hover:text-[#8b3103] ri-arrow-left-line"></i>
          Trending
        </h1>

        <div className='flex items-center w-[85%]'>
          <Topnav />
          <Dropdown title="Category" options={["movie", "tv", "all"]} func={(e) => setcategory(e.target.value)} />
          <div className='w-[1%]'></div>
          <Dropdown title="Duration" options={["week", "day"]} func={(e) => setduration(e.target.value)} />
        </div>
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>

    </div>
  ) : <Loading />;
};

export default Trending;
