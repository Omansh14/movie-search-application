import React from 'react'
import '../App.css'
import movieimg from './movie-img.svg';
function NotFound() {
  return (
    <div className='no-matches'>
      <img src={movieimg}/>
      <h1 className='message'>No matches found</h1>
    </div>
  )
}

export default NotFound;
