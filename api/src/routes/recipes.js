const { Router } = require("express");
require("dotenv").config();
const router = Router();
const getRecipeById = require("./controllers/getRecipeById");
const getAllInfo = require("./controllers/getAllInfo");
const { Recipe, Type } = require("../db");
const { Op } = require("sequelize");
const postRecipes = require("./controllers/postRecipes");

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
      // await getRecipesToDb();
      const { title } = req.query;
      const recipes = await getAllInfo();
      if(title){
        const recipesByName = recipes?.filter(
          (r) => r.title.toLowerCase() === title.toLowerCase()
        );
        recipesByName.length > 0 ? res.status(200).json(recipesByName) : res.send("No recipes found");
        // return res.status(200).send(recipes);  
          
    }  else{
      // const filteredNames = await getRecipeByName(title);
      // res.status(200).send(filteredNames);
      res.status(200).json(recipes);
    }
    }catch (error) {
      // console.log(error.message);
      return res.status(404).send("No recipe found");
    }
  });

router.get("/recipes/:id", async (req,res) => { // LO QUE VA EN :ID TIENE QUE SER IGUAL A LO QUE SE PASA ABAJO POR PARAMS.
  const { id } = req.params;
  try {
    if(id){
      const idRecipe = await getRecipeById(id);
      return res.status(200).send(idRecipe);
    }
 
  } catch (error) {
    console.log(error.message);
    return res.status(404).send("No recipe found");
  }
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