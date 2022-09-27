const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const videogameRute = require('./videogames')
const genreRute = require('./genres')
const platformRute = require('./platform')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', videogameRute)
router.use('/genres', genreRute)
router.use('/platforms', platformRute)


module.exports = router;
