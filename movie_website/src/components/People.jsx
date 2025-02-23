import axios from "../utils/axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading";
import { Cards } from "./partials/Cards";
import { Topnav } from "./partials/Topnav";

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
    <div className=" w-screen h-screen ">
      <div className="mt-4 px-[2%] w-screen flex items-center justify-between">
        <h1 className="text-xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#8b3103] ri-arrow-left-line"
          ></i>
          Person
        </h1>

        <div className="flex items-center w-[85%]">
          <Topnav />
          <div className="w-[1%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={person.length}
        next={GetPerson}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={person} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};
