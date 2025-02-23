import axios from "../utils/axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading";
import { Cards } from "./partials/Cards";
import { Dropdown } from "./partials/Dropdown";
import { Topnav } from "./partials/Topnav";

export const Tvshows = () => {

  const navigate = useNavigate();
  const [category, setcategory] = useState("airing_today");
  const [tv, settv] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "Movie Time | Tv Shows ";

  const GetTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      settv((prevState) => [...prevState, ...data.results]);
      setpage((prevPage) => prevPage + 1);

      if (page >= data.total_pages) {
        setHasMore(false);
      }

      console.log("Fetched Data: ", data);
    } catch (error) {
      console.log("Error fetching trending data: ", error);
    }
  };

  useEffect(() => {
    settv([]);
    setpage(1);
    setHasMore(true);
    GetTv();
  }, [category]);


  return tv.length > 0 ? (
      <div className=' w-screen h-screen '>
        <div className='mt-4 px-[2%] w-screen flex items-center justify-between'>
  
          <h1 className='text-xl text-zinc-400 font-semibold'>
            <i onClick={() => navigate(-1)} className="hover:text-[#8b3103] ri-arrow-left-line"></i>
            tv
          </h1>
  
          <div className='flex items-center w-[85%]'>
            <Topnav />
            <Dropdown title="Category" options={["popular", "top_rated" , "on_the_air", "airing_today"]} func={(e) => setcategory(e.target.value)} />
            <div className='w-[1%]'></div>
          </div>
        </div>
  
        <InfiniteScroll
          dataLength={tv.length}
          next={GetTv}
          hasMore={hasMore}
          loader={<h1>Loading...</h1>}
        >
          <Cards data={tv} title="tv" />
        </InfiniteScroll>
  
      </div>
    ) : <Loading />;
}
