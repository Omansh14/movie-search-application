import React, { useEffect, useState } from "react";
import Home from "../Home";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../src/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import WishList from "./WishList";
import Header from "./Header";
import { fetchMovieData, handleAuthData } from "../redux/action";
import SignUp from "./SignUp";
import Login from "./Login";

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
  const [selectedMovie, onMovieSelect] = useState();
  const [debouncedVal, setDebouncedVal] = useState("");
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.app?.movieList);
  // const authentication = useSelector((state) => state.user.auth?.uid);

  useEffect(() => {
    dispatch(fetchMovieData(debouncedVal));
    // eslint-disable-next-line
  }, [debouncedVal]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(handleAuthData(user));
        console.log(user);
      } else {
        console.log("user is logged out");
      }
    });
    // eslint-disable-next-line
  }, []);

  const onTextChange = (e) => {
    onMovieSelect("");
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => {
      setDebouncedVal(e.target.value);
    }, 1000);
    updateTimeoutId(timeout);
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
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
                  movieList={movies}
                />
              }
            ></Route>
            <Route path="/wishlist" element={<WishList />}></Route>
          </Route> 
         <Route path="/login" element={<Login />}></Route>
        
        <Route index path="/signup" element={<SignUp />}></Route>
      </>
    )
  );

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;


