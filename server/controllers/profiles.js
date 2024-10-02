
const dbProfile = require('../db/dbProfile')

const addProfile = async (req, res) => {
    try {

        let user
        if ((req.body.user != null) && (req.body.user != '') && (typeof req.body.user != 'undefined')) {
            user = req.body.user
        } else {
            const mens = 'Não foi informado o identificador User para criar o Perfil do Usuário!'
            return res.status(422).send({ error: mens, status: 422 });
        }

        await dbProfile.insertProfile(user, req)
            .then(result => {
                const mens = `Perfil do Usuário cadastrado com sucesso! User: ${user}`
                return res.status(201).json({ mens: mens, status: 'OK' })
            })
            .catch((e) => {
                const mens = e.message,
                    stack = e.stack;
                return res.status(500).send({ error: mens, status: 500, stackTrace: stack });
                // const error = new Error(e)
                // error.stack = e.stack
                // error.status = 500
                // throw error
            })

    } catch (e) {
        // console.log('Erro Controllers Profiles')
        // console.log(e)
        const error = new Error(e)
        error.stack = e.stack
        error.status = 500
        throw error
    }
}

// Utilizado apenas para processo interno, quando da criação do Usuário e que tenha sido enviado o perfil
const CreateProfile = async (req, idUser) => {
    try {

        await dbProfile.insertProfile(idUser, req)
            .then(result => {
                // console.log('Após Insert Profile')
                // console.log(result)
                return result
            })
            .catch((e) => {
                /*
                Se retornar uma response ocorre o erro: Não é possível definir cabeçalhos depois que eles são enviados ao cliente (Cannot set headers after they are sent to the client)
                */
                // const mens = e.message,
                //     stack = e.stack;
                // return res.status(500).send({ error: mens, status: 500, stack: stack });                
                const error = new Error(e)
                error.stack = e.stack
                error.status = 500
                throw error
            })

    } catch (e) {
        // console.log('Erro Controllers Profile')
        // console.log(e)
        const error = new Error(e)
        error.stack = e.stack
        error.status = 500
        throw error
    }
}

const getProfile = async (req, res) => {
    const results = await dbProfile.selectProfile(req.params.user);
    res.status(200).json({ data: results })
};

const getProfiles = async (_req, res, next) => {
    const results = await dbProfile.selectProfiles();
    res.status(200).json({ data: results })
};

module.exports = {
    CreateProfile,
    addProfile,
    getProfiles,
    getProfile
}