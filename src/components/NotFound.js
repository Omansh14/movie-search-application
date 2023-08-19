import React from "react";
import { useSelector } from "react-redux";
import "../App.css";
import movieimg from "../assets/movie-img.svg";
function NotFound() {
  const error = useSelector((state) => state.app?.error) || "No matches found";
  return (
    <div className="no-matches">
      <img src={movieimg} alt="notfound.img" />
      <h1 className="message">{error}</h1>
    </div>
  );
}

export default NotFound;
