const Router = require('express');
const {Recipe, Type} = require('../db.js');
const router = Router();

// const dietsLocal =  [
//     {id: 1, name: "Gluten Free"},
//     {id: 2, name: "Ketogenic"},
//     {id: 3, name: "Lacto Ovo Vegetarian"},
//     {id: 4, name: "Vegan"},
//     {id: 5, name: "Pescatarian"},
//     {id: 6, name: "Paleolithic"},
//     {id: 7, name: "Primal"},
//     {id: 8, name: "Fodmap Friendly"},
//     {id: 9, name: "Whole 30"},
//     {id: 10, name: "Dairy free"},
//     {id: 11, name: "Vegetarian"},
//     {id: 12, name: "Lacto vegetarian"},
//     {id: 13, name: "Ovo vegetarian"}                       
// ];

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