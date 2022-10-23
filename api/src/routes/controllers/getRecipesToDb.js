const { Recipe, Type } = require("../../db");
const getRecipes = require("./getRecipes");

const getRecipesToDb = async () => {
try {
    const recipesToDb = await Recipe.findOrCreate(
        {
            include: {model: Type},
        }
    );
    if(!recipesToDb.length){
        const apiInfo = await getRecipes();
        await Recipe.bulkCreate(apiInfo);
    }
    return recipesToDb;
} catch (error) {
    console.log(error)
}
};

module.exports = getRecipesToDb;