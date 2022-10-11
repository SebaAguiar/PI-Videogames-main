import React from 'react'


function Page({gamesPerPage, allVideogames, page}) {
   const pageNum = []

   for (let i = 1; i <= Math.ceil(allVideogames/gamesPerPage); i++) {
      pageNum.push(i);
      
   }
   return(
      <nav>
         <ul className='page'>
            {
               pageNum?.map(n => (
                  <li className='number' key={n}>
                     <button className='pageButton'  onClick={() => page(n)}>{n}</button>
                  </li>
               ))
            }
         </ul>          
      </nav>
   )
}

export default Page