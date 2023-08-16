import React, { useEffect, useState } from "react";
import Home from "../Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import WishList from "./WishList";
import Header from "./Header";
import Axios from "axios";

const Layout = (props) => {
  const { searchQuery, onTextChange } = props;
  return (
    <div>
      <Header searchQuery={searchQuery} onTextChange={onTextChange} />
      <Outlet />
    </div>
  );
};

export const API_KEY = "6da9d44b";
const App = () => {
  const [timeoutId, updateTimeoutId] = useState();
  const [searchQuery, updateSearchQuery] = useState("");
  const [defaultMovieList, setDefaultMovieList] = useState([]);
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );

    updateMovieList(response.data.Search);

    if (!defaultMovieList.length) {
      setDefaultMovieList([...movieList]);
    }
  };

  useEffect(() => {
    fetchData("anime");
    // eslint-disable-next-line
  }, []);

  const onTextChange = (e) => {
    console.log("fire");
    onMovieSelect("");
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    if (e.target.value !== "") {
      const timeout = setTimeout(() => fetchData(e.target.value), 500);
      updateTimeoutId(timeout);
    } else {
      updateMovieList(defaultMovieList);
    }
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <Layout searchQuery={searchQuery} onTextChange={onTextChange} />
        }
      >
        <Route
          index
          element={
            <Home
              selectedMovie={selectedMovie}
              onMovieSelect={onMovieSelect}
              movieList={movieList}
            />
          }
        ></Route>
        <Route path="/wishlist" element={<WishList />}></Route>
      </Route>
    )
  );
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;
