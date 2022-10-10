import axios from 'axios'

export const getVideogames = () => {
    return async(dispatch) => {
    //     let json = axios.get('http://localhost:3001/videogames')
    //     return dispatch({
    //         type: 'GET_VIDEOGAMES',
    //         payload: json.data
    //     })
    return fetch('http://localhost:3001/videogames')
    .then(res => res.json())
    .then(data => dispatch({type: 'GET_VIDEOGAMES', payload: data}))
    }  
}

export const filterByGenre = (payload) => {
    return {
        type: 'FILTER_BY_GENRE',
        payload
    }
}