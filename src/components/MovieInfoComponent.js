import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { API_KEY } from "./App";
import styled from "styled-components";
import { addToWishList, removeFromWishList } from "../redux/action";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 415px) {
    flex-direction: column;
    padding: 20px 25px;
  }
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 350px;
  max-width: 400px;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;

  & span {
    opacity: 0.5;
  }
`;
const Close = styled.button`
  display: flex;
  justify-content: center;
  font-size: 16px;
  color: white;
  background: red;
  border: 1px solid white;
  height: fit-content;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0.8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: 415px) {
    position: absolute;
    right: 10px;
  }
`;

const AddToWishList = styled.button`
  display: flex;
  justify-content: center;
  font-size: 16px;
  color: white;
  background: #1877f2;
  border: 1px solid white;
  height: fit-content;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  disabled: ${(props) => (props.movieList?.length ? "1fr 1fr 1fr 1fr" : "1fr")};

  @media (min-width: 415px) {
    position: absolute;
    right: 80px;
  }
`;

const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const { selectedMovie, onMovieSelect } = props;
  const dispatch = useDispatch();
  const wishItems = useSelector((state) => state.wishList?.wishItems);
  const allMovies = useSelector((state) => state.app?.movieList);
  const index = allMovies.findIndex((ele) => ele.imdbID === selectedMovie);
  const wishListflag = allMovies[index].addToWishList;

  const handleWishList = (data, flag) => {
    const newWishItems = wishItems.filter(
      (ele) => ele.imdbID !== selectedMovie
    );
    if (flag) {
      allMovies[index].addToWishList = false;
      dispatch(removeFromWishList(newWishItems));
    } else {
      allMovies[index].addToWishList = true;
      dispatch(addToWishList([...wishItems, { ...data, addToWishList: true }]));
    }
    dispatch({ type: "RECEIVE_MOVIE_DATA", payload: allMovies });
  };

  useEffect(() => {
    Axios.get(
      `https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`
    ).then((response) => setMovieInfo(response.data));
  }, [selectedMovie]);

  return (
    <Container>
      {movieInfo ? (
        <>
          <CoverImage src={movieInfo?.Poster} alt={movieInfo?.Title} />
          <InfoColumn>
            <MovieName>
              {movieInfo?.Type}: <span>{movieInfo?.Title}</span>
            </MovieName>
            <MovieInfo>
              IMDB Rating: <span>{movieInfo?.imdbRating}</span>
            </MovieInfo>
            <MovieInfo>
              Year: <span>{movieInfo?.Year}</span>
            </MovieInfo>
            <MovieInfo>
              Language: <span>{movieInfo?.Language}</span>
            </MovieInfo>
            <MovieInfo>
              Rated: <span>{movieInfo?.Rated}</span>
            </MovieInfo>
            <MovieInfo>
              Released: <span>{movieInfo?.Released}</span>
            </MovieInfo>
            <MovieInfo>
              Runtime: <span>{movieInfo?.Runtime}</span>
            </MovieInfo>
            <MovieInfo>
              Genre: <span>{movieInfo?.Genre}</span>
            </MovieInfo>
            <MovieInfo>
              Director: <span>{movieInfo?.Director}</span>
            </MovieInfo>
            <MovieInfo>
              Actors: <span>{movieInfo?.Actors}</span>
            </MovieInfo>
            <MovieInfo>
              Plot: <span>{movieInfo?.Plot}</span>
            </MovieInfo>
          </InfoColumn>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Close onClick={() => onMovieSelect()}>Close</Close>
            <AddToWishList
              onClick={() => {
                wishListflag
                  ? handleWishList(movieInfo, true)
                  : handleWishList(movieInfo);
              }}
            >
              {!wishListflag ? "Add To WishList" : "Remove From WishList"}
            </AddToWishList>
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </Container>
  );
};
export default MovieInfoComponent;
