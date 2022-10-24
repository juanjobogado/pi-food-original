const axios = require("axios");
const URL = "https://api.spoonacular.com/recipes/";
const {YOUR_API_KEY} = process.env;
require("dotenv").config();

const getRecipes = async () => {
  const apiInfo = await axios.get(`${URL}complexSearch?apiKey=${YOUR_API_KEY}&number=10&addRecipeInformation=true`);
  const allInfo = apiInfo.data.results.map((e)=>{
    return {
      id: e.id,
      title: e.title,
      summary: e.summary,
      healthScore: e.healthScore,
      image: e.image,
      steps: e.analyzedInstructions[0]?.steps.map((a)=>{
        return {
          number: a.number,
          step: a.step
        }
      }),
      
    }
  })
  return allInfo;
  

};

module.exports = getRecipes;