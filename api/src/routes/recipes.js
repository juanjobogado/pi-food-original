const { Router } = require("express");
require("dotenv").config();
const router = Router();
const getRecipeById = require("./controllers/getRecipeById");
const getAllInfo = require("./controllers/getAllInfo");
const { Recipe, Type } = require("../db");
const axios = require("axios");
const {YOUR_API_KEY} = process.env;
// const { Op } = require("sequelize");
// const getRecipes = require("./controllers/getRecipes");
// const postRecipes = require("./controllers/postRecipes");

// const getRecipeByName = async (title) => {
//   try {
//     await getAllInfo();
//     const info = await Recipe.findAll({
//       attributes: ["title"],
//       where: {
//         title: {[Op.iLike]: `%${title}%`}
//       },
//       include: {
//         model: Type,
//         attributes: ["name"],
//         through: {
//           attributes: []
//         }
//       }
//     })

//     const recipes = info.map(receta => ({
//       id: receta.id,
//       title: receta.title,
//       image: receta.image,
//       healthScore: receta.healthScore,
//       // steps: receta.analyzedInstructions[0]?.steps.map((a)=>{
//       //   return {
//       //     number: a.number,
//       //     step: a.step
//       //   }
//       // }),
//       summary: receta.summary,
  
//   }))

//   return recipes;
//   } catch (error) {
//     console.log(error)
//   }
//  };

router.get("/recipes", async (req,res) => {
  
  try {
    const { title } = req.query;
    const recipes = await getAllInfo();
    if(title){
      const recipesByName = await recipes.filter(
        (r) => r.title.toLowerCase().includes(title.toString().toLowerCase())
      );
      recipesByName.length? res.status(200).json(recipesByName) : res.status(404).send("No recipes found");
       
  } else{
    res.status(200).json(recipes);
    
  }
  }catch (error) {
    console.log(error.message);
    return res.status(404).send("No recipe found");
  }
});

// router.get('/recipes',async function (req,res) {
//   try {
//       let {name} = req.query
//       const recipes= await getAllInfo()
//       if (name) {
//           let filtered = await recipes.filter(e => e.name.toLowerCase().includes(name.toString().toLowerCase()))
//           if (filtered.length) {
//               let washed = filtered.map(e => {
//                   return {
//                       image: e.image,
//                       title: e.title,
//                       diets: (typeof(e.diets[0])==='string')? e.diets : e.diets.map(e => e.name),
//                       id: e.id,
//                       healthScore: e.healthScore
//                   }
//               })
//               return res.status(200).json(washed)
//           }
//           return res.status(404).json("No se encontraron recetas")
//       }else{
//           let washed = recipes.map(e => {
//               return {
//                   image: e.image,
//                   title: e.title,
//                   diets: (typeof(e.diets[0])==='string')? e.diets : e.diets.map(e => e.name),
//                   id: e.id,
//                   healthScore: e.healthScore
//               }
//           })
//           return res.json(washed)
//       }
//   } catch (error) {
//       return res.status(404).json(error.message)
//   }
// })


router.get("/recipes/:id", async (req,res) => { // LO QUE VA EN :ID TIENE QUE SER IGUAL A LO QUE SE PASA ABAJO POR PARAMS.
  const { id } = req.params;
  try {
    const allInfo = await getAllInfo();
    if(id){
      const idFiltered = await allInfo.filter((e) => e.id == id)
      if(idFiltered.length) return res.status(200).json(idFiltered)
    }
  } catch (error) {
    console.log(error.message);
    res.status(404).send("No recipe found with matching id")
  } 
// if(id){
//   var recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}`);
//   // const json = await axios.get("https://api.spoonacular.com/recipes/716426/information?apiKey=0bf54c16d7f7472789ff6360948e5ac4")
//   recipe = {
    
//       id: recipe.id,
//       title: recipe.title,
//       summary: recipe.summary?.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
//       healthScore: recipe.healthScore,
//       image: recipe.image,
//       steps: (recipe.analyzedInstructions?.[0] && recipe.analyzedInstructions[0].steps?recipe.analyzedInstructions[0].steps.map((a)=> a.step).join(" || "): "There is no steps"),
//       diets: recipe.diets? recipe.diets.map((diet) => diet) : "There is no diet"
    
//   }
  
//   recipe.length ?  res.send(recipe): res.status(404).send("no id found")
// }
 

});

router.post("/recipes", async (req,res) => {
  
//   try {
//     const newPost = await postRecipes();
//   res.status(200).send(newPost);
//   } catch (error) {
//     console.log(error.message)
//     res.status(404).send("The recipe already exist")
//   }
// });
const { title, summary, healthScore, image, steps, diets} = req.body;
try {
  if(!title || !summary || !healthScore || !image || !steps){

    const recipePost = await Recipe.create({
      
      title,
      summary,
      healthScore,
      image,
      diets
      
    })
    let dietsDb = await Type.findAll({ attributes: ["name"] })
    recipePost.addType(dietsDb);
  
    return res.status(200).send( recipePost);
  }
} catch (error) {
  console.log(error.message);
  return res.status(404).send("Recipe already exist")
}

});

module.exports = router;