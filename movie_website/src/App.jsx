import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { Trending } from "./components/Trending";
import { Popular } from "./components/Popular";
import { Movie } from "./components/Movie";
import { Tvshows } from "./components/Tvshows";
import { People } from "./components/People";
import { TvDetail } from "./components/TvDetail";
import { PersonDetail } from "./components/PersonDetail";
import { Moviedetails } from "./components/Moviedetails";
import { Trailer } from "./components/partials/Trailer";
import Notfound from "./components/Notfound";

function App() {
  return (
    <div className="bg-gray-950 w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />} />

        <Route path="/movie/details/:id" element={<Moviedetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/tv" element={<Tvshows />} />
        <Route path="/tv/details/:id" element={<TvDetail />} >
        <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>
         

        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetail />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
