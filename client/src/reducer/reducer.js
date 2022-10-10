
const initialState = {
    videogames: [],
    videogamesCopy: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
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
        case 'FILTER_BY_GENRE':
            try {
                const allVideogames = state.videogames
                const filtered = allVideogames.filter(g => {
                    return g.genres.find(g => g.genres === action.payload)
                })
                return {
                    ...state,
                    videogames: filtered
                }
            } catch(error) {
                console.log(error)
            }
    
        default:
            return state
    }
}

export default reducer;