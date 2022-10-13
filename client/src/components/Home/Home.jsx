import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, filterByGenre, getGenres, filterByRating, sortByName, getById, filterApiDb } from '../../actions/actions';
import { Link } from 'react-router-dom'
import Card from '../Card/Card';
import Page from '../Page/Page';
import SearchBar from '../SearchBar/SearchBar';
import './Home.css'
function Home() {

   const [gamesPerPage, setGamesPerPage] = useState(15)
   const [currentPage, setCurrentPage] = useState(1)
   const [order, setOrder] = useState('')
   const genres = useSelector(state => state.genres)
   const dispatch = useDispatch()
   const allVideogames = useSelector(state => state.videogames)
   const indexOfLastGame = currentPage * gamesPerPage
   const indexOfFirstGame = indexOfLastGame - gamesPerPage
   const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame)
   
   
   useEffect(() => {
      dispatch(getVideogames())
   }, [dispatch])
   
   useEffect(() => {
      dispatch(getGenres())
   }, [dispatch])
   
   const page = (pageNum) => {
      setCurrentPage(pageNum)
   }

   const handleClick = (e) => {
      e.preventDefault()
      dispatch(getVideogames())
   }

   const handleSortByName = (e) => {
      e.preventDefault()
      dispatch(sortByName(e.target.value))
      setCurrentPage(1)
      setOrder(`Order ${e.target.value}`)
   }

   const handleSortByRating = (e) => {
      e.preventDefault()
      dispatch(filterByRating(e.target.value))
      setCurrentPage(1)
      setOrder(`Order ${e.target.value}`)
   }

   const handleFilterByGenre = (e) => {
      e.preventDefault()
      dispatch(filterByGenre(e.target.value))
      setCurrentPage(1)
      setOrder(`Order ${e.target.value}`)
   }

   const handleFilterApiDb = (e) => {
      e.preventDefault()
      dispatch(filterApiDb(e.target.value))
      setCurrentPage(1)
      setOrder(`Order ${e.target.value}`)
      
   }
return (
   <div className='back-ground'>
         <h1 className='tilte' >Videogames everywhere</h1>
      <div className='contenedor_header'>
         <Link to='/form'><button className='btn_crear'>Create Videogame</button></Link>
         <button className='btn_recargar' onClick={e => {handleClick(e)}}>Recharge</button>
      </div>
 
{/* /////////   FILTROS   /////////////// */}

         <div className='allSelects'>
            <div>
               <select className='select' onChange={e => handleSortByName(e)}>
                  <option value="-">-</option>
                  <option value="A-Z">A-Z</option>
                  <option value="Z-A">Z-A</option>
               </select>
               <select className='select' onChange={e => handleSortByRating(e)}>
                  <option value="-">-</option>
                  <option value="higher">Higher</option>
                  <option value="lower">Lower</option>
               </select>
               <select className='select' onChange={e => handleFilterApiDb(e)}>
                  <option value="all">All</option>
                  <option value="db">Data Base</option>
                  <option value="api">Api</option>
               </select>            
               <select className='select'  onChange={e => handleFilterByGenre(e)}>
                  <option value="All">All</option>
               {
                  genres.map(g => (
                     <option value={g.name}>{g.name}</option>
                     ))
                     }
               </select>
            </div>
            <SearchBar />
         </div>

{/*
/////////   CARDS   /////////////// */}

   <div className='cards'>
         {
            currentGames?.map(e => {
               // console.log(e.genres)
               // console.log(currentGames)
               return (
                     <Link to={`/videogames/${e.id}`}>
                        <Card
                           key={e.id}
                           name={e.name} 
                           image={e.image} 
                           genres={e.genres} 
                           rating={e.rating}
                        />
                     </Link>               
               )
            })
         }
   
{/* /////////   PAGINADO   /////////////// */}

         <div className='page'>
            <Page 
            gamesPerPage={gamesPerPage} 
            allVideogames={allVideogames.length} 
            page={page}
            />
         </div>
   </div>
</div>

   )
}

export default Home