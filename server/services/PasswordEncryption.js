const bcrypt = require('bcrypt')
const saltRounds = parseInt(process.env.SALT_ROUNDS)

const getHashSalt = async () => {
    return await bcrypt.genSalt(saltRounds)
}

const getHashPassword = async (senha) => {
    const hashSalt = await getHashSalt()
    return await bcrypt.hash(senha, hashSalt)
}

const VerificaSenha = async (senha, hashSenhaBD) => {
    return await bcrypt.compare(senha, hashSenhaBD)
}

module.exports = {
    getHashPassword,
    VerificaSenha
}