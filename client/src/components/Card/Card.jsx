import React from 'react'

function Card({name, image, genres, id, rating}) {
   console.log(genres)
   let genres2 = genres.map(e => typeof e === 'string' ? e : e.name)
   return (
      <div key={id}>
         <div>
            <h1>{name}</h1>
         </div>
         <div>
            <img width='300px' src={image} alt={name} />
         </div>
         <div>
            <h3>{genres2.join(', ')}</h3>
         </div>
         <div>
            <p>{rating}</p>
         </div>
      </div>
   )
}  

export default Card