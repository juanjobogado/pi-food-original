const getRecipes = require("./getRecipes");
const getRecipesToDb = require("./getRecipesToDb");

const getAllInfo = () => {
const apiInfo = getRecipes();
const dbInfo = getRecipesToDb();
const totalInfo = apiInfo.concat(dbInfo);
return totalInfo;
};

module.exports = getAllInfo;