const db = require("../../server/db/db")
const controllerProfile = require('./profiles')

const addUser = async (req, res) => {
    try {
        await db.insertUser(req.body)
            .then(async result => {
                // const affectedRows = result.affectedRows - Qtde linhas alteradas(Na inclusão = zero)
                const insertId = result.insertId
                if (insertId > 0) {
                    let profileOK = true
                    try {
                        const dtNascimento = req.body.data_nascimento
                        const fileIMG = req.file
                        if (((dtNascimento != null) && (dtNascimento != '') && (typeof dtNascimento != 'undefined')) && ((fileIMG != null) && (fileIMG != '') && (typeof fileIMG != 'undefined'))) {
                            // controllerProfile.addProfile(req, res, insertId) - Foi substituido pela função abaixo
                            await CreateProfile(req, insertId)
                                .then(resultP => {
                                    // console.log('result CreateProfile')
                                    // console.log(resultP)
                                })
                                .catch((e) => {
                                    // console.log('Erro Catch CreateProfile [ Controllers: Users ]')
                                    // console.log(e)
                                    profileOK = false
                                    const error = new Error(e)
                                    error.stack = e.stack
                                    error.status = 500
                                    return res.status(500).send({ status: 500, error: e.message, stackTrace: e.stack });
                                })
                        } else {
                            // console.log('Nao informou dados do Perfil!')
                        }
                    } catch (e) {
                        // console.log('Erro Catch Controllers Users [ CreateProfile ]')
                        profileOK = false
                        const error = new Error(e)
                        error.stack = e.stack
                        error.status = 500
                        throw error
                    } finally {
                        if (profileOK) {
                            const mens = `Usuário cadastrado com sucesso! AutoId: ${insertId}`
                            res.status(201).json({ mens: mens, status: 'OK' })
                            // res.status(201).json({ mens: mens, data: result, status: 'OK' })
                        } else {
                            const mens = `Problema na inclusão do perfil do Usuário! - AutoId: ${insertId}`
                            res.status(422).json({ mens: mens, status: 'OK' })
                        }
                    }
                } else {
                    const mens = `Problema na inclusão do Usuário!`
                    res.status(201).json({ mens: mens, status: '' })
                }
            })
            .catch((error) => {
                const mens = error.message,
                    stack = error.stack;
                return res.status(500).send({ error: mens, status: 500, stack: stack });
            })
    } catch (e) {
        // console.log('Erro Controllers Users')
        // console.log(e)
        const error = new Error(e)
        error.stack = e.stack
        error.status = 500
        throw error
    }
};

const deleteUser = async (req, res) => {
    await db.deleteUser(req.params.id);
    res.status(204).json("Usuário deletado com sucesso!");
};

const updatePwd = async (req, res, next) => {
    await db.updatePassword(req.params.id, req.body);
    res.status(200).json("Senha alterada com sucesso!");
};

const getUser = async (req, res) => {
    const results = await db.selectUser(req.params.id);
    res.status(200).json({ data: results })
};

const getUsers = async (_req, res, next) => {
    const results = await db.selectUsers();
    res.status(200).json({ data: results })
};

async function CreateProfile(req, insertId) {
    return new Promise((resolve, reject) => {
        controllerProfile.CreateProfile(req, insertId)
            .then(result => {
                return resolve(result)
            })
            .catch((e) => {
                reject(e)
            })
    })
}

module.exports = {
    getUsers,
    getUser,
    updatePwd,
    deleteUser,
    addUser
}