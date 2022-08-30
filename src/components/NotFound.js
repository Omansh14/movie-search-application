import React from 'react'
import '../App.css'
function NotFound() {
  return (
    <div className='no-matches'>
      <img src="../movie-img.svg"/>
      <h1 className='message'>No matches found</h1>
    </div>
  )
}

export default NotFound;
