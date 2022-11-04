const Router = require('express');
const {Recipe, Type} = require('../db.js');
const router = Router();

// const dietsLocal =  [
//     {name: "Gluten Free"},
//     {name: "Ketogenic"},
//     {name: "Lacto Ovo Vegetarian"},
//     {name: "Vegan"},
//     {name: "Pescatarian"},
//     {name: "Paleolithic"},
//     {name: "Primal"},
//     {name: "Fodmap Friendly"},
//     {name: "Whole 30"},
//     {name: "Dairy free"},
//     {name: "Vegetarian"},
//     {name: "Lacto vegetarian"},
//     {name: "Ovo vegetarian"}                       
// ];

const dietsLocal =  [
    "Gluten Free",
    "Ketogenic",
    "Lacto Ovo Vegetarian",
    "Vegan",
    "Pescatarian",
    "Paleolithic",
    "Primal",
    "Fodmap Friendly",
    "Whole 30",
    "Dairy free",
    "Vegetarian",
    "Lacto vegetarian",
    "Ovo vegetarian"                        
];



router.get("/diets", async (req, res) => {
    try{
    const diets = dietsLocal.forEach(async (e) => {
        await Type.findOrCreate({ //Ingresa los datos a la tabla si no existen
             where: {name: e} //donde el name sea cada una de las dietas del Array Local
         });
    });        
        const allDiets = await Type.findAll();         
        res.status(200).json(allDiets);

    }catch(e){
        res.status(400).json({message: e})
    }
});




module.exports = router;