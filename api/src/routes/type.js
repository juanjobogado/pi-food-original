const Router = require('express');
const {Recipe, Type} = require('../db.js');
const router = Router();

const dietsLocal =  [
    "gluten free",
    "ketogenic",
    "lacto ovo vegetarian",
    "vegan",
    "pescatarian",
    "paleolithic",
    "primal",
    "fodmap friendly",
    "whole 30",
    "dairy free",
    "vegetarian",
    "lacto vegetarian",
    "ovo vegetarian"                        
];



router.get("/diets", async (req, res) => {
    try{
    const diets = dietsLocal.forEach(async (e) => {
        await Type.findOrCreate({ //Ingresa los datos a la tabla si no existen
             where: {name: e} //donde el name sea cada una de las dietas del Array Local
         });
    });        
        const allDiets = await Type.findAll();         
        return res.status(200).json(allDiets);

    }catch(e){
        res.status(400).json({message: e})
    }
});




module.exports = router;