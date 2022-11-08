const { Router } = require("express");
require("dotenv").config();
const router = Router();
const getRecipeById = require("./controllers/getRecipeById");
const getAllInfo = require("./controllers/getAllInfo");
const { Recipe, Type } = require("../db");
const axios = require("axios");
const {YOUR_API_KEY} = process.env;


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

 

});

router.post("/recipes", async (req,res) => {
  
const { steps, title, summary, healthScore, image, diets} = req.body;
try {
  if(!steps || !title || !summary || !healthScore || !image || !steps){

    const recipePost = await Recipe.create({
      
      steps,
      title,
      summary,
      healthScore,
      diets,
      
    })
    let dietsDb = await Type.findAll({ 
      where: {name: diets} })
      // await recipePost.addType(dietsDb);
      recipePost.addType(dietsDb);
    // return res.status(200).send(recipePost);
    return res.send("recipe created")
  }
} catch (error) {
  console.log(error.message);
  return res.status(404).send("Recipe already exist")
}

});

module.exports = router;