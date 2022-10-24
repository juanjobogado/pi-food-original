const { Router } = require("express");
// const getAllInfo = require("./controllers/getAllInfo");
require("dotenv").config();
const router = Router();
const {YOUR_API_KEY} = process.env;
const axios = require("axios");
const getRecipes = require("./controllers/getRecipes");
const getRecipeById = require("./controllers/getRecipeById");
const getAllInfo = require("./controllers/getAllInfo");
const { Recipe, Type } = require("../db");
const { Op } = require("sequelize");
const getRecipesToDb = require("./controllers/getRecipesToDb");

const getRecipeByName = async (title) => {
  try {
    const info = await Recipe.findAll({
      attributes: ["title"],
      where: {
        title: {[Op.iLike]: `%${title}%`}
      },
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: []
        }
      }
    })

    const recipes = info.map(receta => ({
      id: receta.id,
      title: receta.title,
      image: receta.image,
      healthScore: receta.healthScore,
      // steps: receta.analyzedInstructions[0]?.steps.map((a)=>{
      //   return {
      //     number: a.number,
      //     step: a.step
      //   }
      // }),
      summary: receta.summary,
  
  }))

  return recipes;
  } catch (error) {
    console.log(error)
  }
 };

router.get("/recipes", async (req,res) => {
  const { title } = req.query;
    try {
      await getRecipesToDb();
      if(!title){
        const apiInfo = await getRecipes();
        return res.status(200).send(apiInfo);  
          
    }  else{
      const filteredNames = await getRecipeByName(title);
      res.status(200).send(filteredNames);
    }
    }catch (error) {
      // console.log(error.message);
      return res.status(404).send("No recipe found");
    }
  });

router.get("/recipes/:idFood", async (req,res) => {
  const { id } = req.params;
  try {
    if(id){
      const idRecipe = await getRecipeById();
      return res.status(200).send(idRecipe);
    }
 
  } catch (error) {
    console.log(error.message);
    return res.status(404).send("No recipe found");
  }
});

// router.get("/recipes/:idFood", async (req, res) => {
//   const {id} = req.params;
//   const getAll = await getRecipes();
//   try{
//     const foodId = getAll.filter((n) => n.id === id);
//   if(foodId.length){
  
//     res.status(200).send(foodId);
  
//   } else {
//     res.status(404).send("No recipe found");
//   };
//   }catch(error){
//   console.log(error);
//   };
//   });

module.exports = router;