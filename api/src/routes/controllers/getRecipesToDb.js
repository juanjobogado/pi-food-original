const { Recipe, Type } = require("../../db");
const getRecipes = require("./getRecipes");

// const getRecipesToDb = async () => {
// try {
//     const recipesToDb = await Recipe.findAll(
//         {
//             include: {    model: Type,
//               attributes: ["name"],
//               through: {
//                 attributes: [], 
                
//               },
//             },
//             }
//     );
//     if(!recipesToDb.length){
//         const apiInfo = await getRecipes();
//         await Recipe.bulkCreate(apiInfo);
//     }
//     return recipesToDb;
// } catch (error) {
//     console.log(error)
// }
// };
const getRecipesToDb = async () => {
  let recipes = await Recipe.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return recipes;
};
module.exports = getRecipesToDb;