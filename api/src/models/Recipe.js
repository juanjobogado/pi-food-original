const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    id: {
      type:DataTypes.STRING,
      primaryKey: true
    
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
    }
  });
};
