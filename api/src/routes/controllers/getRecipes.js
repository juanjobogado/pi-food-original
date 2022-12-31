const axios = require("axios");
const {YOUR_API_KEY} = process.env;
require("dotenv").config();

const getRecipes = async () => {
  const apiInfo = await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`);
  const allInfo = apiInfo.data.results.map((e)=>{
    return {
      id: e.id,
      title: e.title,
      summary: e.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
      dishTypes: e.dishTypes? e.dishTypes.map((dish) => dish) : "There is no dish",
      healthScore: e.healthScore,
      image: e.image,
      steps: (e.analyzedInstructions[0] && e.analyzedInstructions[0].steps?e.analyzedInstructions[0].steps.map((a)=> a.step).join(" || "): "There is no steps"),
      diets: e.diets? e.diets.map((diet) => diet): "There is no diet"
    }
  })
  return allInfo;
  

};

module.exports = getRecipes;