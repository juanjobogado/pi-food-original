// const {Recipe} = require("../../db.js");
// const { Op } = require("sequelize");
// const Type = require("../../models/Type");
// const getRecipesToDb = require("./getRecipesToDb.js");
// const getAllInfo = require("./getAllInfo.js");

//  const getRecipeByName = async (title) => {
//   try {
//     const info = await Recipe.findAll({
//       attributes: ["title"],
//       where: {
//         title: {[Op.iLike]: `%${title}%`}
//       },
//       include: {
//         model: Type,
//         attributes: ["name"],
//         through: {
//           attributes: []
//         }
//       }
//     })

//     const recipes = info.map(receta => ({
//       id: receta.id,
//       name: receta.name,
//       img: receta.img,
//       score: receta.score,
//       diets: receta.diets.map(dieta => dieta.nombre)
  
//   }))

//   return recipes;
//   } catch (error) {
//     console.log(error)
//   }
//  };

//  module.exports = getRecipeByName;