const express = require('express');
const router = express.Router();
// const db = require("../../server/db/db")
const controllerUsers = require('./../controllers/users')
const userValidateion = require('./../middlewares/userValidation');

// const upload = require('multer')(); - Este controle foi substituido pelo middleware: server\middlewares\uploadImage
const upload = require('../middlewares/uploadImage');

// router.post('/register', async (req, res) => {  
//   await db.insertUser(req.body);
//   res.status(201).json("Usuário cadastrado com sucesso!");
// });

//#region Sobre o multer
/*
O multer é um middleware do Node.js que serve para manipular multipart/form-data e fazer upload de arquivos. Ele é escrito com base no busboy para garantir eficiência.
https://www.npmjs.com/package/multer
https://github.com/expressjs/multer/blob/master/doc/README-pt-br.md
*/
/**
Também pode-se utilizar desta forma, definindo o diretório destino[dentro da aplicação no servidor ou outro local] onde o arquivo fará o upload. Neste exemplo a foto será salva no diretório: uploads
Por padrão o multer irá atribuir um novo nome ao arquivo sem a extensão, justamente para evitar um override, imagine se dois usuários fizerem um upload com o mesmo nome de arquivo.
O multer tem várias opções e uma delas nos permite ler o nome original (originalname) do arquivo e informar um novo.
https://consolelog.com.br/upload-de-arquivos-imagens-utilizando-multer-express-nodejs/
*
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
*/
//#endregion

/* Configura-se o upload como um middleware que espera um arquivo cujo a chave é "foto_Perfil" */
// Utiliza Request Body
router.post('/register', upload.single('foto_perfil'), userValidateion.ValidateBody, controllerUsers.addUser);

// router.delete('/delete/:id', async (req, res) => {
//   await db.deleteUser(req.params.id);
//   res.status(204).json("Usuário deletado com sucesso!");
// })
router.delete('/delete/:id', controllerUsers.deleteUser);

// router.patch('/updatepwd/:id', async (req, res) => {
//   await db.updatePassword(req.params.id, req.body);
//   res.status(200).json("Senha alterada com sucesso!");
// })
router.patch('/updatepwd/:id', controllerUsers.updatePwd);

// router.get('/user/:id', async (req, res) => {
//   const results = await db.selectUser(req.params.id);
//   // res.json(results);
//   res.status(200).json({ data: results })
// })
router.get('/user/:id', controllerUsers.getUser);

// router.get('/', async function (_, res, next) {
//   const results = await db.selectUsers();
//   res.status(200).json({ data: results })
// });

router.get('/', controllerUsers.getUsers);

module.exports = router;