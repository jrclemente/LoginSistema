
const { getHashPassword } = require('../services/PasswordEncryption')
const db = require('./connection')

async function selectUsers() {
    const sql = 'SELECT * FROM users ORDER BY created_at DESC;'
    // const result = await db.query(sql) - Execute é a versão atual(Também pode-se utilizar query)
    const result = await db.execute(sql)
    return result[0]
}

async function selectUser(id) {
    const sql = 'SELECT * FROM users WHERE id=?;'
    const result = await db.execute(sql, [id])
    return result[0]
}

async function selectUserLogin(objQuery) {
    const sql = 'SELECT * FROM users WHERE email = ?;'
    const result = await db.execute(sql, [objQuery.email])
    return result[0]
}

async function selectUserEmail(email) {
    const sql = 'SELECT * FROM users WHERE email like ?;'
    const result = await db.execute(sql, [email])
    return result[0]
}

async function selectUserName(nome) {
    const sql = 'SELECT * FROM users WHERE username like ? ORDER BY created_at DESC;'
    const result = await db.execute(sql, [nome])
    return result[0]
}

async function insertUser(obj) {
    try {

        const senha = obj.password;
        const hashPassword = await getHashPassword(senha)

        const sql = 'INSERT INTO users(username, password, email, telefone) VALUES (?,?,?,?);'
        const values = [obj.username, hashPassword, obj.email, obj.telefone]
        const result = await db.execute(sql, values)
        return result[0]

    } catch (e) {
        // console.log('Erro insertUser')
        const error = new Error(e.sqlMessage)
        error.stack = e.stack
        error.status = 500
        throw error
    }
}

async function insertProfile(obj) {
    try {
        const sql = 'INSERT INTO profiles(idUser, data_nascimento, foto_perfil) VALUES (?,?,?);'
        const values = [obj.idUser, obj.data_nascimento, obj.foto_perfil]
        const result = await db.execute(sql, values)
        return result[0]
    } catch (e) {
        const error = new Error(e.sqlMessage)
        error.status = 500
        throw error
    }
}

async function updateUser(id, obj) {
    const sql = 'UPDATE users SET username=?, email=?, telefone=? WHERE id=?;'
    const values = [obj.username, obj.email, obj.telefone, id]
    await db.execute(sql, values)
}

async function deleteUser(id) {

    /* Outra forma de fazer a execução de um SQL  - Também evita o SQL Injection */
    // const idUser = db.escape(id)
    // const sql = `DELETE FROM users where id=${idUser};`
    // return [result] = await db.execute(sql)

    const sql = 'DELETE FROM users where id=?;'
    return await db.execute(sql, [id])
}

async function updatePassword(id, obj) {
    const sql = 'UPDATE users SET password=? WHERE id=?;'
    const values = [obj.password, id]
    await db.execute(sql, values)
}

module.exports = {
    selectUsers,
    selectUser,
    selectUserLogin,
    selectUserEmail,
    selectUserName,
    insertUser,
    insertProfile,
    updateUser,
    deleteUser,
    updatePassword
}