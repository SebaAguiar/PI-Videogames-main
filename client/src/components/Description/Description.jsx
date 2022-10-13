import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getById } from '../../actions/actions'
import Nav from '../Nav/Nav';
import { Link } from 'react-router-dom'
import './Description.css'

function Description(prop) {
   // console.log(prop.params.id)
   const dispatch = useDispatch()
   const [loading, setLoading] = useState(true);



   useEffect(() => {
      dispatch(getById(prop.match.params.id))
      setLoading(false);
   }, [dispatch])

   const videogame = useSelector(state => state.gameid)
   const videogame2 = videogame[0]
   console.log(videogame)
   console.log(videogame2)
   let genres = []
   let platforms = []
   if(videogame2) {
      genres = videogame2.genres.map(e => e.name)
      platforms = videogame2.platforms.map(e => e.name)
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
            {
               videogame2 === 'undefined' ? 
               <div className='descriptionContainer'>
                  <div className='imgContainer'>
               <h1 className='videogameName'>{videogame2.name}</h1>
               <h3 className='ratingDetail general'>populariy: {videogame2.rating}</h3>
               <h4 className='genresDetail general'>{genres.join(', ')}</h4>
               <h4 className='platformDetail general'>{platforms.join(', ')}</h4>
               <img className='imageDetail' src={videogame2.image} alt={videogame2.name} />
               </div>
               <div className='detailContainer'>
               <p className='descriptionDetail general'>{videogame2.description}</p>
               <p className='releasedDetail general'>Released at: {videogame2.released}</p>
               </div>
            </div> :
            <div className='descriptionContainer'>
               <div className='imgContainer'>
               <h1 className='videogameName'>{videogame.name}</h1>
               <h3 className='ratingDetail general'>populariy: {videogame.rating}</h3>
               <h4 className='genresDetail general'>{videogame.genres}</h4>
               <h4 className='platformDetail general'>{videogame.platforms}</h4>
               <img className='imageDetail' src={videogame.image} alt={videogame.name} />
               </div>
               <div className='detailContainer'>
               <p className='descriptionDetail general'>{videogame.descriptionMin}</p>
               <p className='descriptionDetail general'>{videogame.descriptionRec}</p>
               <p className='releasedDetail general'>Released at: {videogame.released}</p>
               </div>
            </div>
            }
      </div>
   )
}

export default Description