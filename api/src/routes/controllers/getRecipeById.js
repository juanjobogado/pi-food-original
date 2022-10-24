const { Recipe, Type } = require("../../db");
const {Op} = require("sequelize");
const getAllInfo = require("./getAllInfo");

const getRecipeById = async (id) => {
  try {
   await getAllInfo();
   if(id){
    const info = await Recipe.findAll({
      where: {
                id: {[Op.iLike]: `%${id}%`}
              },
      include: [{
        model: Type,
      }]
    })
    return info;
   }
   
    
  } catch (error) {
    console.log(error.message)
  }
};

module.exports = getRecipeById;