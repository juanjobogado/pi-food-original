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
  
const { steps, title, summary, healthScore, image, diets, dishTypes} = req.body;
try {
  if(!steps || !title || !summary || !healthScore || !image || !steps){

    const recipePost = await Recipe.create({
      
      steps,
      title,
      summary,
      healthScore,
      diets,
      dishTypes,
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

router.delete("/recipes/:id", async (req,res) =>{
  const { id } = req.params;

  try {
    if(id){
      Recipe.destroy({
        where: {
          id: id
        }
      })
    }
    return res.status(200).send("Recipe deleted")
  } catch (error) {
    console.log(error.message)
    return res.status(400).send("Cannot delete recipe");
  }
})


module.exports = router;