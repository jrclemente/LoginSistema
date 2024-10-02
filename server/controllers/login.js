const db = require("../../server/db/db")

const { VerificaSenha } = require('../services/PasswordEncryption')

const getUserName = async (req, res, next) => {
    try {
        const results = await db.selectUserName(req.params.nome);
        res.status(200).json({ data: results })

    } catch (e) {
        // console.log(e)
        const error = new Error(e)
        error.status = 500
        throw error
    }
}

const getUserEmail = async (req, res, next) => {
    try {
        const results = await db.selectUserEmail(req.params.email);
        res.status(200).json({ data: results })
    } catch (e) {
        // console.log(e)
        const error = new Error(e)
        error.status = 500
        throw error
    }
}

const getLogin = async (req, res, next) => {
    try {
        let mens = '',
            situacao = ''

        const objQuery = { email, senha } = req.query; /*Desestruturação de objetos - atribuição via desestruturação(destructuring assignment) */
        const results = await db.selectUserLogin(objQuery);
        if (results.length == 0) {
            mens = 'Email ou Senha são inválidos!'
            situacao = false
        } else {
            const hashPWD = results[0].password
            const senhaOK = await VerificaSenha(objQuery.senha, hashPWD)
            if (senhaOK) {
                mens = 'Login realizado com sucesso!'
                situacao = true
            } else {
                mens = 'Email ou Senha são inválidos!'
                situacao = false
            }
        }
        res.status(200).json({ OK: `${situacao}`, mens: `${mens}` })

    } catch (e) {
        // console.log(e)
        const error = new Error(e)
        error.status = 500
        throw error
    }
}

module.exports = {
    getUserName,
    getUserEmail,
    getLogin
}