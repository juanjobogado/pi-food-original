const getRecipes = require("./getRecipes");
const getRecipesToDb = require("./getRecipesToDb");

const getAllInfo = async () => {
  const apiInfo = await getRecipes();
  const dbInfo = await getRecipesToDb();
  const totalInfo = apiInfo.concat(dbInfo);
  return totalInfo;
};

module.exports = getAllInfo;
