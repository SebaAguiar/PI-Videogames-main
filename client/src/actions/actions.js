import axios from 'axios'


export const getVideogames = () => {
    return async(dispatch) => {
        let json = await axios.get('http://localhost:3001/videogames')
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
        })
    // return fetch('http://localhost:3001/videogames')
    // .then(res => res.json())
    // .then(data => dispatch({type: 'GET_VIDEOGAMES', payload: data}))
    }  
}

export const getGenres = () => {
    // return async(dispatch) =>{
    //     return fetch('http://localhost:3001/genres')
    //     .then(res => res.json())
    //     .then(data => dispatch({type: 'GET_GENRES', payload: data}))
    // }  
    return async(dispatch) => {
        let json = await axios.get('http://localhost:3001/genres')
        return dispatch({
            type: 'GET_GENRES',
            payload: json.data
        })
    }
}

export const filterByGenre = (payload) => {
    return {
        type: 'FILTER_BY_GENRE',
        payload
    }
}

export const filterByRating = (payload) => {
   return {
      type: 'FILTER_BY_RATING',
      payload
   }
} 

export const sortByName = (payload) => {
   return {
      type: 'SORT_BY_NAME',
      payload
   }
}

export const getByName = (name) => {
   return async(dispatch) => {
      try {
         const json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
         return dispatch({
            type: 'GET_BY_NAME',
            payload: json.data
         })
      } catch(err) {
         console.log(err)
      }
   }
}

export const getById = (id) => {
   return async(dispatch) => {
      try {
         const json = await axios.get(`http://localhost:3001/videogames/${id}`)
         return dispatch({
            type: 'GET_BY_ID',
            payload: json.data
         })
      } catch (err) {
         console.log(err)
      }
   }
}

export const filterApiDb = (payload) => {
   return {
      type: 'FILTER_API_DB',
      payload
   }
}

export const postVideogame = (payload) => {
   return async (dispatch) => {
      try {
         const json = await axios.post('http://localhost:3001/videogames', payload)
         return dispatch({
            type: 'POST_VIDEOGAME',
            payload: json.data
         })
      } catch(err) {
         console.log(err)
      }
   }
}


export const getPlatforms = () => {

   return async(dispatch) => {
       let json = await axios.get('http://localhost:3001/platforms')
       return dispatch({
           type: 'GET_PLATFORMS',
           payload: json.data
       })
   }
}