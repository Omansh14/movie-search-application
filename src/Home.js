import React from "react";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";
import NotFound from "./components/NotFound";
import "./App.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
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

function Home(props) {
  const { selectedMovie, onMovieSelect, movieList } = props;

  return (
    <Container>
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

export default Home;
