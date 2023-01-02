const { Recipe, Type } = require("../../db");

const recipeDbInfo = async () => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

module.exports = recipeDbInfo;
