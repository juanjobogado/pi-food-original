const { Recipe, Type } = require("../../db");
const getRecipes = require("./getRecipes");

// // const getRecipesToDb = async () => {
// // try {
// //     const recipesToDb = await Recipe.findAll(
// //         {
// //             include: {    model: Type,
// //               attributes: ["name"],
// //               through: {
// //                 attributes: [], 
                
// //               },
// //             },
// //             }
// //     );
// //     if(!recipesToDb.length){
// //         const apiInfo = await getRecipes();
// //         await Recipe.bulkCreate(apiInfo);
// //     }
// //     return recipesToDb;
// // } catch (error) {
// //     console.log(error)
// // }
// // };
// const getRecipesToDb = async () => {
//   let recipes = await Recipe.findAll({
//     include: {
//       model: Type,
//       attributes: ["name"],
//       through: {
//         attributes: [],
//       },
//     },
//   });
//   return recipes;
// };


const recipeDbInfo = async () => {
  // try {
  //   const pokemons = await Pokemon.findAll({
  //     include: {
  //       model: Type,
  //       attributes: ['name'],
  //       through: {
  //         attributes: [],
  //       }
  //     }
  //   })
  //   return pokemons;
  // } catch (error) {
  //     console.log(error);
  // }
  try{
    let allInDB = await Recipe.findAll({
      include: [Type],
    });
    let recipeDB = allInDB.map((recipe) => {
      let allTypes = recipe.types?.map((type) => type.name);
      return {
        id: recipe.id,
        title: recipe.title,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        steps: recipe.steps,
        image: recipe.image,
        dishTypes: recipe.dishTypes,
        diets: allTypes,
      };
    });
    return recipeDB;
  }catch (error) {
    console.log(error);
    }
  };

module.exports = recipeDbInfo;