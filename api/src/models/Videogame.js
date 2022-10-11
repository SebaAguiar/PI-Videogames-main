const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
   sequelize.define('videogame', {
      id: {
         type: DataTypes.UUID,
         allowNull: false,
         defaultValue: DataTypes.UUIDV4,
         primaryKey: true,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      description: {
         type: DataTypes.TEXT,
         allowNull: false
      },
      released: {
         type: DataTypes.STRING,
         allowNull: true,
         defaultValue: 'Unknown'
      },
      rating: {
         type: DataTypes.DECIMAL,
         allowNull: true,
         defaultValue: 0
      },
      image: {
         type:DataTypes.TEXT,
         allowNull: true
      },
      createdInDb: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: true
      }
   }, {
      timestamps: false
   });
};
