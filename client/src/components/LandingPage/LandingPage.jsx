import React from 'react'
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
        <h1>Videojuegos</h1>
        <Link to='/videogames'>
            <button>Enter</button>
        </Link>
    </div>
  )
}

export default LandingPage