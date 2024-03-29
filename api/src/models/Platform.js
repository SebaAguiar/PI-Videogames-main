const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
   sequelize.define('platform', {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         // defaultValue: DataTypes.UUIDV4,
         primaryKey: true,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false
      }
   }, {
      timestamps: false
   })
}
