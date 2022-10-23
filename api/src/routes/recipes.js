const { Router } = require("express");
// const getAllInfo = require("./controllers/getAllInfo");
require("dotenv").config();
const router = Router();
const getRecipeName = require("./controllers/getRecipeName");
const {YOUR_API_KEY} = process.env;
const axios = require("axios");
const getRecipes = require("./controllers/getRecipes");


router.get("/recipes", async (req,res) => {
  const { name } = req.query;
    
      if(!name){
        try {
            const apiInfo = await getRecipes();
            return res.status(200).send(apiInfo);
        } catch (error) {
            console.log(error.message);
            return res.status(404).send("No recipe found");
        }
        
      } else{
        const filteredNames = await getRecipeName();
        res.status(200).send(filteredNames);
      };
});

module.exports = router;