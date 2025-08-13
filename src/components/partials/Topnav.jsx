import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "/noimage.png";
import { debounce } from "lodash";

export const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const GetSearches = async (searchQuery) => {
    if (!searchQuery) {
      setSearches([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(`/search/multi?query=${searchQuery}`);
      setSearches(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("Failed to load results.");
    } finally {
      setLoading(false);
    }
  };

  // Debounced API call
  const debouncedSearch = debounce(GetSearches, 500);

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel(); // Cleanup function
  }, [query]);

  return (
    <div className="w-full lg:w-[80%] h-[9vh] relative mx-auto flex items-center px-4 lg:px-0">
      <i className="text-zinc-400 text-2xl lg:text-3xl ri-search-line mr-2 lg:mr-0"></i>

      <div className="relative w-full lg:w-[50%]">
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="w-full text-white p-3 lg:p-5 text-base lg:text-xl outline-none border-none bg-transparent"
          type="text"
          placeholder="Search anything"
        />
        {query.length > 0 && (
          <i
            onClick={() => setQuery("")}
            className="absolute right-3 lg:right-4 top-1/2 transform -translate-y-1/2 text-zinc-400 text-xl lg:text-2xl cursor-pointer ri-close-fill"
          ></i>
        )}
      </div>

      {query.length > 0 && (
        <div className="z-[100] absolute w-full lg:w-[50%] max-h-[50vh] bg-zinc-200 top-[100%] left-0 lg:left-[9%] overflow-auto rounded-lg shadow-lg">
          {loading ? (
            <p className="text-center py-4">Loading...</p>
          ) : error ? (
            <p className="text-center py-4 text-red-500">{error}</p>
          ) : searches.length === 0 ? (
            <p className="text-center py-4 text-gray-500">No results found</p>
          ) : (
            searches.map((s, i) => (
              <Link
                to={`/${s.media_type}/details/${s.id}`}
                key={i}
                className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-full p-3 lg:p-4 flex items-center border-b-2 border-zinc-100"
              >
                <img
                  className="w-12 h-12 lg:w-[10vh] lg:h-[10vh] object-cover rounded mr-3 lg:mr-5 shadow-lg"
                  src={
                    s.backdrop_path || s.profile_path
                      ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}`
                      : noimage
                  }
                  alt={s.name || s.title || "No Image"}
                />
                <span className="text-sm lg:text-base">
                  {s.name || s.title || s.original_name || s.original_title}
                </span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Topnav;
