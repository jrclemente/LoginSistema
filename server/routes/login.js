const express = require('express');
const router = express.Router();
// const db = require("../../server/db/db")
const controllerLogin = require('./../controllers/login')

// Utiliza Route Params
router.get('/email/:email', controllerLogin.getUserEmail); 

router.get('/nome/:nome', controllerLogin.getUserName); 

// Utiliza Query Strings(Query Params)
router.get('/', controllerLogin.getLogin);

module.exports = router;