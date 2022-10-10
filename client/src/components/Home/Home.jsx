import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, filterByGenre } from '../../actions/actions';
import { Link } from 'react-router-dom'
import Card from '../Card/Card';
import Page from '../Page/Page';
function Home() {

   const [gamesPerPage, setGamesPerPage] = useState(15)
   const [currentPage, setCurrentPage] = useState(1)
   const [order, setOrder] = useState('')
   const dispatch = useDispatch()
   const allVideogames = useSelector(state => state.videogames)
   const indexOfLastGame = currentPage * gamesPerPage
   const indexOfFirstGame = indexOfLastGame - gamesPerPage
   const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame)
   
   const page = (pageNum) => {
      setCurrentPage(pageNum)
   }

   useEffect(() => {
      dispatch(getVideogames())
   }, [])

   const handleClick = (e) => {
      e.preventDefault()
      dispatch(getVideogames())
   }

   const handleFilterByGenre = (e) => {
      e.preventDefault()
      dispatch(filterByGenre(e.target.value))
      setCurrentPage(1)
      setOrder(`Order ${e.target.value}`)
   }
   return (
      <div>
         <Link to='/videogames'>New Game</Link>
         <h1>Videogames everywhere</h1>
         <button onClick={e => {handleClick(e)}}>Recharge</button>

         <div>
            <select name="" id="">
               <option value="asc">Ascending</option>
               <option value="desc">Descending</option>
            </select>
            <select name="" id="">
                <option value="rAsc">Ascending</option>
                <option value="rDesc">Descending</option>
            </select>
            <select name="" id="">
               <option value="all">All</option>
               <option value="db">Data Base</option>
               <option value="api">Api</option>
            </select>
            <select onChange={e => handleFilterByGenre(e)}>
               <option value="All">All</option>
               <option value="Action">Action</option>
               <option value="Indie">Indie</option>
               <option value="Adventure">Adventure</option>
               <option value="RPG">RPG</option>
               <option value="Strategy">Strategy</option>
               <option value="Shooter">Shooter</option>
               <option value="Casual">Casual</option>
               <option value="Simulation">Simulation</option>
               <option value="Puzzle">Puzzle</option>
               <option value="Arcade">Arcade</option>
               <option value="Platformer">Platformer</option>
               <option value="Racing">Racing</option>
               <option value="Massively Multiplayer">Massively Multiplayer</option>
               <option value="Sports">Sports</option>
               <option value="Fighting">Fighting</option>
               <option value="Family">Family</option>
               <option value="Board Games">Board Games</option>
               <option value="Educational">Educational</option>
               <option value="Card">Card</option>
            </select>
         </div>

         <Page 
         gamesPerPage={gamesPerPage} 
         allVideogames={allVideogames.length} 
         page={page}
         />
         <div>

      {
         currentGames?.map(e => {
            // console.log(e.genres)
            return (
                  <Link to={`/videogames?name=${e.name}`}>
                     <Card 
                        key={e.id} 
                        name={e.name} 
                        image={e.image} 
                        genres={e.genres.map(e => e.concat(', '))} 
                     />
                  </Link>               
            )
         })
      }
         </div>
      </div>

   )
}

export default Home