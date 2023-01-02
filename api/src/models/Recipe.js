const { DataTypes, UUIDV4 } = require('sequelize');
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
      type: DataTypes.STRING,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "There is no summary here"
    },
    healthScore: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "There is no healthScore here"
    },
    steps: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "There is no steps"
    },
    image: {
      type: DataTypes.STRING,
    },
    dishTypes: {
      type: DataTypes.STRING
    },
  });
};
