import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className='home'>
      <div className='containerVideogamesTitle'>
        <h1 className='videogamesTitle'>VIDEOGAMES EVERYWHERE</h1>
      </div>
      <div className='containerVideogamesButton'>
        <Link to='/videogames'>
          <button className='videogamesButton'>START</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
