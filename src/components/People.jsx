import axios from "../utils/axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading";
import { Cards } from "./partials/Cards";
import { Topnav } from "./partials/Topnav";
import { Sidenav } from "./partials/Sidenav";

export const People = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("popular");
  const [person, setperson] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "Movie Time | People ";

  const GetPerson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      setperson((prevState) => [...prevState, ...data.results]);
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
    setperson([]);
    setpage(1);
    setHasMore(true);
    GetPerson();
  }, [category]);

  return person.length > 0 ? (
    <>
      <Sidenav />
      <div className="w-full lg:w-[80%] h-screen overflow-auto pt-16 lg:pt-0">
        <div className="mt-4 px-4 sm:px-6 lg:px-[2%] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <h1 className="text-lg sm:text-xl text-zinc-400 font-semibold flex items-center">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#8b3103] ri-arrow-left-line mr-2 text-xl sm:text-2xl cursor-pointer"
            ></i>
            People
          </h1>

          <div className="flex flex-col sm:flex-row items-center w-full sm:w-[85%] gap-4 sm:gap-0">
            <Topnav />
          </div>
        </div>

        <InfiniteScroll
          dataLength={person.length}
          next={GetPerson}
          hasMore={hasMore}
          loader={<h1 className="text-white text-center py-4">Loading...</h1>}
        >
          <Cards data={person} title="person" />
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loading />
  );
};
