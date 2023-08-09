import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";
import NotFound from "./components/NotFound";
import "./App.css";
import logo from "./assets/movie-icon.svg";
import magnifier from "./search-icon.svg";

export const API_KEY = "6da9d44b";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  gap: 10px;

  @media (max-width: 820px) {
    flex-direction: column;
    text-align: center;
    padding: 15px;
    font-size: 20px;
  }
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px; /* Adjust padding */
  border-radius: 6px;
  margin-left: 10px; /* Adjust margin */
  width: 80%; /* Adjust width */
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const StyledIcon = styled.span`
  font-family: "Material Icons";
  font-size: 35px;
  margin-right: 8px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  width: 100%;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.movieList?.length ? "1fr 1fr 1fr 1fr" : "1fr"};
  padding: 25px 75px;
  grid-gap: 25ypx;
  grid-row-gap: 25px;
  place-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: ${(props) =>
      props.movieList?.length ? "1fr 1fr 1fr" : "1fr"};
    padding: 25px;
  }
  @media (max-width: 820px) {
    grid-template-columns: ${(props) =>
      props.movieList?.length ? "1fr 1fr" : "1fr"};
    padding: 25px 40px;
  }
  @media (max-width: 415px) {
    grid-template-columns: 1fr;
    padding: 25px;
  }
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [defaultMovieList, setDefaultMovieList] = useState([]);
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

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

  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src={logo} />
          MovieBase
        </AppName>
          <div style={{width: '100%', display: 'flex', justifyContent: 'space-around', gap: '10px'}}>
          <SearchBox>
            <SearchIcon src={magnifier} />
            <SearchInput
              placeholder="Search a Movie"
              value={searchQuery}
              onChange={onTextChange}
            />
          </SearchBox>
          <StyledIcon>favorite</StyledIcon>
          </div>
      </Header>

      {selectedMovie && (
        <MovieInfoComponent
          selectedMovie={selectedMovie}
          onMovieSelect={onMovieSelect}
        />
      )}
      <MovieListContainer movieList={movieList}>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <NotFound />
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;
