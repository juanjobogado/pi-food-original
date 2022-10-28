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
    try {
      let recipesDb = await Recipe.findAll({
        include: { model: Type },
      });
      if (!recipesDb.length) {
        const apiInfo = await getRecipes();
        await Recipe.bulkCreate(apiInfo);
      }
      return recipesDb;
    } catch (error) {
      console.log(error);
    }
  };

module.exports = getRecipesToDb;