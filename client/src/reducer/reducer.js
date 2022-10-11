
const initialState = {
   videogames: [],
   videogamesCopy: [],
   genres: [],
   gameid: [],
   platforms: []
   
}

const reducer = (state = initialState, action) => {
   switch(action.type) {

      //////      ALL

      case 'GET_VIDEOGAMES':
         try {

            return {
               ...state,
               videogames: action.payload,
               videogamesCopy: action.payload
            }  
         } catch (error) {
            console.log(error)
         }
         
      //////      GENRES

      case 'GET_GENRES':
         return {
            ...state,
            genres: action.payload
         }

      //////      FILTER BY GENRES

      case 'FILTER_BY_GENRE':
         try {
            const allVideogames = state.videogamesCopy
            const filtered = action.payload === 'All' ? allVideogames : allVideogames.filter(e => e.genres.includes(action.payload))
            return {
               ...state,
               videogames: filtered
            }
            // return {
            //    ...state,
            //    videogames: state.videogames.filter(g => {
            //       return g.genres.find(g => {
            //          return g === action.payload
            //       })
            //    })
            // }
         } catch(error) {
            console.log(error)
         }

      //////      FILTER BY RATING
        
      case 'FILTER_BY_RATING':
         let sort = state.videogamesCopy
         if(action.payload !== '-') {
            sort = action.payload === 'higher' ? state.videogames.sort((a, b) => {
               if(a.rating > b.rating) {
                  return -1
               } 
               if(b.rating > a.rating) {
                  return 1
               }
               return 0
            }) : state.videogames.sort((a, b) => {
               if(a.rating > b.rating) {
                  return 1
               } 
               if(b.rating > a.rating) {
                  return -1
               }
               return 0
            })
         }
         return {
            ...state,
            videogames: sort
         }

      //////      FILTER BY NAME 

      case 'SORT_BY_NAME':
         let sort2 = state.videogamesCopy
         if(action.payload !== '-') {
            sort2 = action.payload === "A-Z" ? state.videogames.sort((a, b) => {
               if(a.name > b.name) {
                  return 1
               } 
               if(b.name > a.name) {
                  return -1
               }
               return 0
            }) : state.videogames.sort((a, b) => {
               if(a.name > b.name) {
                  return -1
               } 
               if(b.name > a.name) {
                  return 1
               }
               return 0
            })
         } 
         return {
            ...state,
            videogames: sort2
         }

      //////      GET GAME BY NAME

      case 'GET_BY_NAME':
         return {
            ...state,
            videogames: action.payload
         }

      //////      GET GAME BY ID 
      
      case 'GET_BY_ID':
         return {
            ...state,
            gameid: action.payload
         }

      //////      FILTER API OR DATA BASE 
         
         case 'FILTER_API_DB':
            let all = state.videogamesCopy
            const created = action.payload === 'db' ? all.filter( e => e.createdInDb) : all.filter(e => !e.createdInDb)
            return {
               ...state,
               videogames: action.payload === 'all' ? state.videogamesCopy : created
            }

      //////      TRAER PLATAFORMAS 

         case 'GET_PLATFORMS':
            return {
               ...state,
               platforms: action.payload
            }

      //////      POST           

         case 'POST_VIDEOGAME':
            return {
               ...state
            }

         
      default:
         return state
   }
}



export default reducer;