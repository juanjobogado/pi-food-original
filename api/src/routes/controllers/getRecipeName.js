const {Recipe} = require("../../db");
const { Op } = require("sequelize");
const getRecipesToBb = require("./getRecipesToDb.js");

 const getRecipeByName = async (name) => {
  try {
    getRecipesToBb();
    let info = await Recipe.findAll({
      where: {
        name: {[Op.iLike]: `%${name}%`}
      }
    })
    return info;
  } catch (error) {
    console.log(error)
  }
 };

 module.exports = getRecipeByName;