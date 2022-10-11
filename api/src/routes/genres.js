const { Router } = require("express");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const router = Router();
const axios = require('axios');
// const { getDbInfo, getAllInfo, getApiInfo, getId } = require('../controllers/gamesC');
const { OK, CREATED, BAD_REQUEST, NOT_FOUND } = require('../controllers/statusVar');
// const { getAllGenres } = require('../controllers/genresC')


router.get('/', async(_req, res) => {
    // try {
    //     const genre = await getAllGenres()
    //     res.status(OK).send(genre);
    // } catch(err) {
    //     console.log(err)
    //     res.status(NOT_FOUND).send('Not info')
    // }
    try {
        const apigenres = (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results
        const apiGen = apigenres
        // console.log(apiGen)
        apiGen.map(async (e) => await Genre.findOrCreate({
            where: {
                id: e.id,
                name: e.name
            }
        }))
        
        const genreDb = await Genre.findAll();
        console.log('pase el findAll')
        res.status(OK).send(genreDb);
    } catch (error) {
        console.log(error)     
        res.status(NOT_FOUND).send('Not found')   
    }
})



module.exports = router;