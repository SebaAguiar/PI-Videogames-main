import React from 'react'
import './Card.css'

function Card({name, image, genres, id, rating, createdInDb}) {
   // console.log(genres) 
   let genres2 = genres.map(e => e.name ? e.name : e)
   console.log(genres2)
   // let genres2 = genres.map(e => typeof e === 'string' ? e : e.name)
   return (
      <div className="container_vgcard">
       <p className="vcard_rating">{rating}</p>
      <img className="img_vgcard" src={image}  />
      <div className="vgcard_genres_title">
        <div className="vgcard_genres">
          <p> {genres2.join(', ')}</p> 
        </div>
        <h3 className="vgcard_title">{name}</h3>
      </div>
      </div>
   )
}  

export default Card

