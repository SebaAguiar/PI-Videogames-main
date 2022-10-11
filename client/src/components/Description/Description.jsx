import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getById } from '../../actions/actions'
import Nav from '../Nav/Nav';
import { Link } from 'react-router-dom'

function Description(prop) {
   console.log(prop)
   const dispatch = useDispatch()



   useEffect(() => {
      dispatch(getById(prop.match.params.id))
   }, [dispatch])

   const videogame = useSelector(state => state.gameid)

   return (
      <div>
         <div>
            <Nav />
         </div>
            {
               videogame.length > 0 ? 
               <div>
               <h1 className='name'>{videogame[0].name}</h1>
               <img src={videogame[0].image} alt={videogame[0].name} />
               <h3>popularity: {videogame[0].rating}</h3>
               <h4>{videogame[0].genres}</h4>
               <h4>{videogame[0].platforms}</h4>
               <p>{videogame[0].descriptionMin[0]}</p>
               <p>{videogame[0].descriptionRec[0]}</p>
               <p>Released at: {videogame[0].released}</p>
            </div> :
            'error 404'
            }
      </div>
   )
}

export default Description