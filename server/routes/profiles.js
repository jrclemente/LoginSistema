const express = require('express');
const router = express.Router();
const controllerProfiles = require('./../controllers/profiles')

const profileValidateion = require('./../middlewares/profileValidation');

// const upload = require('multer')(); - Este controle foi substituido pelo middleware: server\middlewares\uploadImage
const upload = require('../middlewares/uploadImage');

router.post('/register', upload.single('foto_perfil'), profileValidateion.ValidateBody, controllerProfiles.addProfile);

// Utiliza Route Params
router.get('/user/:user', controllerProfiles.getProfile);

// Utiliza Query Strings(Query Params)
router.get('/', controllerProfiles.getProfiles);

module.exports = router;