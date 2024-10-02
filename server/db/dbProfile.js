const db = require('./connection')

async function insertProfile(idUser, obj) {
    try {

        // let data_brasileira = data_americana.split('-').reverse().join('/');
        const sql = 'INSERT INTO profiles(user, data_nascimento, foto_perfil) VALUES (?,?,?);'
        const formataDataSQl = String(obj.body.data_nascimento).split('/').reverse().join('-')
        const values = [idUser, formataDataSQl, obj.file]
        const result = await db.execute(sql, values)
        return result[0]

    } catch (e) {
        // console.log('Erro Insert Profile')
        // console.log(e.sqlMessage)
        const error = new Error(e.sqlMessage)
        error.stack = e.stack
        error.status = 500
        throw error
    }
}

async function selectProfile(user) {
    const sql = 'SELECT * FROM profiles WHERE user=?;'
    const result = await db.execute(sql, [user])
    return result[0]
}

async function selectProfiles() {
    const sql = 'SELECT * FROM profiles ORDER BY user DESC;'
    // const result = await db.query(sql) - Execute é a versão atual(Também pode-se utilizar query)
    const result = await db.execute(sql)
    return result[0]
}

module.exports = {
    insertProfile,
    selectProfiles,
    selectProfile
}