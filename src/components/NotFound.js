import React from 'react'
import '../App.css'
import movieimg from '../assets/movie-img.svg';
function NotFound() {
  return (
    <div className='no-matches'>
      <img src={movieimg} alt='notfound.img'/>
      <h1 className='message'>No matches found</h1>
    </div>
  )
}

export default NotFound;
