import React from 'react'

function Card({name, image, genres, id}) {
   return (
      <div key={id}>
         <h1>{name}</h1>
         <img width='300px' src={image} alt={name} />
         <p>{genres}</p>
      </div>
   )
}  

export default Card