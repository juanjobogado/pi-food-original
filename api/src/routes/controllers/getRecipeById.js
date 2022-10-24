const { Recipe, Type } = require("../../db");
const getRecipesToDb = require("./getRecipesToDb");
const {Op} = require("sequelize");
const getAllInfo = require("./getAllInfo");

const getRecipeById = async () => {
  const idRecipe = req.params.id;
  try {
   getAllInfo()
    let info = await Recipe.findOne({
      where: { id: idRecipe },
      include: [{
        model: Type,
      }]
    })
    return info;
  } catch (error) {
    console.log(error.message)
  }
};

module.exports = getRecipeById;