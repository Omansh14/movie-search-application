import axios from "axios";
import { API_KEY } from "../components/App";

export const addToWishList = (data) => {
  return {
    type: "ADD_TO_WISHLIST",
    payload: data,
  };
};

export const removeFromWishList = (data) => {
  return {
    type: "REMOVE_FROM_WISHLIST",
    payload: data,
  };
};

export const fetchMovieData = (searchString) => {
  return (dispatch) => {
    dispatch({ type: "REQUEST_MOVIE_DATA" });

    axios
      .get(
        `https://www.omdbapi.com/?s=${
          searchString ? searchString : "anime"
        }&apikey=${API_KEY}`
      )
      .then((res) => {
        const data = res.data.Search;
        const mappedData = data.map((item) => ({
          ...item,
          addToWishList: false,
        }));
        dispatch({ type: "RECEIVE_MOVIE_DATA", payload: mappedData });
      })
      .catch((err) => {
        dispatch({ type: "ERROR_MOVIE_DATA", payload: err.message });
      });
  };
};
