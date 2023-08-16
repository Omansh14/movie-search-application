import React from "react";
import styled from "styled-components";
import logo from "../assets/movie-icon.svg";
import magnifier from "../search-icon.svg";
import { Link } from "react-router-dom";

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
`;
const NavBar = styled.div`
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
  color: white;
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
const Header = ({ searchQuery, onTextChange }) => {
  return (
    <NavBar>
      <Link to="/" style={{ textDecoration: "none" }}>
        <AppName>
          <MovieImage src={logo} />
          MovieBase
        </AppName>
      </Link>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          gap: "10px",
        }}
      >
        <SearchBox>
          <SearchIcon src={magnifier} />
          <SearchInput
            placeholder="Search a Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
        <Link to="/wishlist" style={{ textDecoration: "none" }}>
          <div style={{display: 'flex', flexDirection: 'column', color: 'white', alignItems: 'center', fontSize:'15px', gap: '1'}}>
            <StyledIcon>favorite</StyledIcon>
            Wishlist
          </div>
        </Link>
      </div>
    </NavBar>
  );
};

export default Header;
