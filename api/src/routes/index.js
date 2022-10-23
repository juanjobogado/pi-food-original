const { Router } = require('express');
const recipes = require("./recipes");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", recipes);


module.exports = router;
