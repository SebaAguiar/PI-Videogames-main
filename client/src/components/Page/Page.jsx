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
                     <a onClick={() => page(n)}>{n}</a>
                  </li>
               ))
            }
         </ul>          
      </nav>
   )
}

export default Page