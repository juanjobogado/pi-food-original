const { Recipe, Type } = require("../../db");

const postRecipes = async ( title, summary, healthScore, image, steps, diets) => {
  if(!title || !summary || !healthScore || !image || !steps){

    const recipePost = await Recipe.create({

      title,
      summary,
      healthScore,
      image,
      
    })
    let dietsDb = await Type.findAll({ where: { name: diets } })
    recipePost.addType(dietsDb);

    return recipePost;
  }
};

module.exports = postRecipes;