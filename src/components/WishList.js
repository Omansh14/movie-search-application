import React from "react";
import MovieComponent from "./MovieComponent";
import styled from "styled-components";
import { useSelector } from "react-redux";

const MovieListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  padding: 25px 75px;
  grid-gap: 25px;
  grid-row-gap: 25px;
  place-items: left;
  grid-auto-flow: row;
  padding: 30px;
`;


const WishList = () => {
  const wishItems = useSelector((state) => state.wishList?.wishItems);
  return (
    <>
      {wishItems?.length ? (
      <MovieListContainer wishItems={wishItems}>
          {wishItems.map((movie, index) => 
          (
            <MovieComponent
              key={index}
              movie={movie}
            />
          ))}
      </MovieListContainer>
      ) : (
        <h1 style={{display: 'flex', justifyContent: 'center', marginTop: '50px', color: 'gray'}}> WishList is Empty </h1>
      )}
    </>
  )
};

export default WishList;
