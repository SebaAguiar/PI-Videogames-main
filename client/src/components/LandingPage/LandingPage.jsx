import React from 'react'
import { Link } from 'react-router-dom';
import "./LandingPage.css";




function LandingPage() {
    return (
      <div className="home">
        <div className="container_videogames_title">
          <h1 className="videogames_title">Videogames Everywhere</h1>
        </div>
        <div className="container_videogames_button">
          <Link to='/videogames'>
            <button className="videogames_button">Start</button>
          </Link>
        </div>
      </div>


    );
}

export default  LandingPage