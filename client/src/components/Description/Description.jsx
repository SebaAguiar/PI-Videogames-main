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

   
   if(videogame) {
      genres = videogame?.genres?.map(e => e.name ? e.name : e).join(', ')
      platforms = videogame?.platforms?.map(e => e.name ? e.name : e).join(', ')
   }
  

   return (
      <div className='container'>
         <Link to='/videogames'>
         <div className='descriptionNav'>
            <Nav />
         </div>
         </Link>

          <div className='generalContainer'>
            <div className='containerDetailTitle'>
            <h1 className='detailTitle'>GAME DETAILS</h1>
            </div>
            {
         
            <div className='descriptionContainer'>
               {console.log('div2')}
               <div className='imgContainer'>
               <h1 className='videogameName'>{videogame.name}</h1>
               <h3 className='ratingDetail general'>populariy: {videogame.rating}</h3>
               <h4 className='genresDetail general'>{genres}</h4>
               <h4 className='platformDetail general'>{platforms}</h4>
               <img className='imageDetail' src={videogame.image} alt={videogame.name} />
               <p className='releasedDetail general'>Released at: {videogame.released}</p>
               </div>
               <div className='detailContainer'>
               {/* <div dangerouslySetInnerHTML={{__html: videogame.description}}/> */}
               <p className='descriptionDetail general'>{videogame?.description?.replace(/<[^>]*>?/g, '')}</p>
               </div>
            </div>
            
            }
            </div>
      </div>
   )
}

export default Description