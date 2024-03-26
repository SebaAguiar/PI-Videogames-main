import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getVideogames,
  filterByGenre,
  getGenres,
  filterByRating,
  sortByName,
  getById,
  filterNew,
  filterApiDb,
} from '../../../actions/actions';
import { Link } from 'react-router-dom';
import Card from '../../Card/Card';
import Page from '../../Page/Page';
import SearchBar from '../../SearchBar/SearchBar';
import './Home.css';
function Home() {
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState('');
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame);

  useEffect(() => {
    dispatch(getVideogames());
  }, []);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const page = (pageNum) => {
    // console.log(pageNum)
    setCurrentPage(pageNum);
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getVideogames());
  };

  const handleSortByName = (e) => {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  };

  const handleSortByRating = (e) => {
    e.preventDefault();
    dispatch(filterByRating(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  };

  const handleFilterByGenre = (e) => {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  };

  const handleFilterApiDb = (e) => {
    e.preventDefault();
    dispatch(filterApiDb(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  };

  const handleClickNew = (e) => {
    e.preventDefault();
    dispatch(filterNew(e));
    setCurrentPage(1);
  };

  return (
    <div className='containerHome'>
      <h1 className='tilte'>VIDEOGAMES EVERYWHERE</h1>
      <div className='headerContainer'>
        <Link to='/form'>
          <button className='createButton'>Create Videogame</button>
        </Link>
        <button
          className='rechargeButton'
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Recharge
        </button>
        <button className='filterNew' onClick={(e) => handleClickNew(e)}>
          Filter
        </button>
      </div>

      {/* /////////   FILTROS   /////////////// */}

      <div className='allSelects'>
        <div>
          <select className='select' onChange={(e) => handleSortByName(e)}>
            <option value='-'>-</option>
            <option value='A-Z'>A-Z</option>
            <option value='Z-A'>Z-A</option>
          </select>
          <select className='select' onChange={(e) => handleSortByRating(e)}>
            <option value='-'>-</option>
            <option value='higher'>Higher</option>
            <option value='lower'>Lower</option>
          </select>
          <select className='select' onChange={(e) => handleFilterApiDb(e)}>
            <option value='all'>All</option>
            <option value='db'>Data Base</option>
            <option value='api'>Api</option>
          </select>
          <select className='select' onChange={(e) => handleFilterByGenre(e)}>
            <option value='All'>All</option>
            {genres.map((g) => (
              <option key={g.id} value={g.name}>
                {g.name}
              </option>
            ))}
          </select>
        </div>
        <SearchBar setCurrentPage={setCurrentPage} />
      </div>

      {/*
/////////   CARDS   /////////////// */}

      <div className='cards'>
        {currentGames?.map((e) => {
          // console.log(e.genres)
          // console.log(currentGames)
          return (
            <Link key={e.id} to={`/videogames/${e.id}`}>
              <Card
                name={e.name}
                image={e.image}
                genres={e.genres}
                rating={e.rating}
              />
            </Link>
          );
        })}
      </div>

      {/* /////////   PAGINADO   /////////////// */}

      <div className='page'>
        <Page
          gamesPerPage={gamesPerPage}
          allVideogames={allVideogames.length}
          page={page}
        />
      </div>
    </div>
  );
}

export default Home;
