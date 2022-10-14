const axios = require('axios');
const { API_KEY } = process.env
const { Videogame, Genre, Platform } = require('../db');



const getApiInfo = async() => {
      let api = `https://api.rawg.io/api/games?key=${API_KEY}`;
      let api1 = (await axios.get(api)).data;
      let pag1 = await api1.results;
      let api2 = (await axios.get(api1.next)).data;
      let pag2 = await api2.results;
      let api3 = (await axios.get(api2.next)).data;
      let pag3 = await api3.results;
      let api4 = (await axios.get(api3.next)).data;
      let pag4 = await api4.results;
      let api5 = (await axios.get(api4.next)).data;
      let pag5 = await api5.results;

      let totalPags = [...pag1, ...pag2, ...pag3, ...pag4, ...pag5]


      const apidata = totalPags.map(e => {
         return {
            id: e.id,
            name: e.name,
            image: e.background_image,
            genres: e.genres.map(e => e.name),
            released: e.released,
            rating: e.rating,
            platforms: e.platforms.map(e => e.platform.name),
         }
      })  
      return apidata;
}




const getDbInfo = async() => {
   const db = await Videogame.findAll({
      include: [{
         model: Genre,
         attributes: ['name'],
         through: {
             attributes: [],
         }
     }, { // ----
         model: Platform,
         attributes: ['name'],
         through: {
             attributes: [],
         }
     }],
 })
   return db
}


const getAllInfo = async() => {
   const apiInfo = await getApiInfo();
   // console.log(typeof apiInfo)
   const dbInfo = await getDbInfo()
   // console.log(typeof dbInfo)
   const allInfo = apiInfo.concat(dbInfo)
   // console.log(typeof allInfo)
   return allInfo
}

const getId = async(id) => {
   if(
      
      id.match(
         /^[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}$/i
      )
   ) {
      try {
         // let dbID = await Videogame.findAll({
         //    where: {id},
         //    include: [{
         //       model: Genre,
         //       attributes: ['name'],
         //       through: {
         //           attributes: [],
         //       }
         //   }, { // ----
         //       model: Platform,
         //       attributes: ['name'],
         //       through: {
         //           attributes: [],
         //       }
         //   }],
         //    attributes: ['id', 'name', 'description', 'released', 'rating', 'image', 'createdInDb']
         // })
         let dbID = await Videogame.findByPk(
            id,
            {
               include: [{
                  model: Genre,
                  attributes:['name'],
                  through: {
                     atributes: []
                  }
               }, {
                  model: Platform,
                  attributes: ['name'],
                  through: {
                     attributes:[]
                  }
               }],
               attributes: ['id', 'name', 'description', 'released', 'rating', 'image', 'createdInDb']
            }
         )
         console.log('log dbID', dbID)
         return dbID;
      } catch(err) {
         console.log(err);
      }
   } else {
      try {
         const idApi = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data;

         const game = {
            id: idApi.id,
            name: idApi.name,
            released: idApi.released,
            rating: idApi.rating,
            platforms: idApi.parent_platforms.map((e) => e.platform.name),
            image: idApi.background_image,
            genres: idApi.genres.map((e) => e.name),
            description: idApi.description
            //
         }
         return game;
      } catch (err) {
         console.log(err);
      }
   }
}

module.exports = {
   getAllInfo, getDbInfo, getApiInfo, getId
}