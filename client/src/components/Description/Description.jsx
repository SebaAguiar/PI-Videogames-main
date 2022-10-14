import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getById } from '../../actions/actions'
import Nav from '../Nav/Nav';
import { Link } from 'react-router-dom'
import './Description.css'

function Description(prop) {
   // console.log(prop.match.params.id)
   const dispatch = useDispatch()
   const [loading, setLoading] = useState(true);



   useEffect(() => {
      dispatch(getById(prop.match.params.id))
      setLoading(false);
   }, [dispatch])

   const videogame = useSelector(state => state.gameid)

   // console.log('consoleLog1', videogame)

   let genres = []
   let platforms = []

   
   if(videogame.createdInDb) {
      genres = videogame.genres.map(e => e.name ? e.name : e)
      platforms = videogame.platforms.map(e => e.name ? e.name : e)
   }
  

   return (
      <div className='container'>
         <Link to='/videogames'>
         <div className='descriptionNav'>
            <Nav />
         </div>
         </Link>
         {loading && <div className="loadingDetail">
            <div>
              <h1 className="messageDetail">Loading...</h1>
            </div>
          </div>}
          <div className='generalContainer'>
            <div className='containerDetailTitle'>
            <h1 className='detailTitle'>Game Details</h1>
            </div>
            {
               
               (videogame.createdInDb) ? 
               <div className='descriptionContainer'>
                  <div className='imgContainer'>
               <h1 className='videogameName'>{videogame.name}</h1>
               <h3 className='ratingDetail general'>populariy: {videogame.rating}</h3>
               <h4 className='genresDetail general'>{genres.join(', ')}</h4>
               <h4 className='platformDetail general'>{platforms.join(', ')}</h4>
               <img className='imageDetail' src={videogame.image} alt={videogame.name} />
               <p className='releasedDetail general'>Released at: {videogame.released}</p>
               </div>
               <div className='detailContainer'>
               <p className='descriptionDetail general'>{videogame.description}</p>
               </div>
            </div> :
            
            <div className='descriptionContainer'>
               {console.log('div2')}
               <div className='imgContainer'>
               <h1 className='videogameName'>{videogame.name}</h1>
               <h3 className='ratingDetail general'>populariy: {videogame.rating}</h3>
               <h4 className='genresDetail general'>{videogame.genres}</h4>
               <h4 className='platformDetail general'>{videogame.platforms}</h4>
               <img className='imageDetail' src={videogame.image} alt={videogame.name} />
               <p className='releasedDetail general'>Released at: {videogame.released}</p>
               </div>
               <div className='detailContainer'>
               <p className='descriptionDetail general'>{videogame.description}</p>
               </div>
            </div>
            }
            </div>
      </div>
   )
}

export default Description