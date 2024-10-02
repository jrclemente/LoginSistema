// Origem deste: https://youtu.be/Cdu0WJhI-d8?si=4lC3tF1HPeSp8jP1
const ValidateBody = (req, res, next) => {
    try {
        // Controle realizado pelo middleware multer: server\middlewares\uploadImage
        if ((req.file != null) && (req.file != '') && (typeof req.file != 'undefined')) {
            if (!req.file) {
                const error = new Error('Imagem enviada não é compatível com o formato válido! (png/jpg/jpeg)')
                error.status = 422
                return next(error)
            }
        }
        /*
        Utiliza-se este recurso(desestruturação de objeto) quando os atributos/propriedades tem o mesmo nome.
        Este é um recurso que permite extrair propriedades de objetos e atribuí-las a variáveis individuais.
        */
        const { username, password, confirmpassword, email } = req.body;

        if (!username) {
            // return res   
            //     .status(422)
            //     .send({ error: "O nome é obrigatório!" })
            /*
            Não estava sendo possível capturar a mensagem de erro, utilizando o comando acima.
            Quando o axios faz uma requisição que encontra um status de erro — 4xx ou 5xx —, um erro será lançado. Esse erro será capturado pelo método catch, da sua Promise.
            */
            const error = new Error('O nome é obrigatório!')
            error.status = 422
            return next(error)
        }

        if (!email) {
            // return res
            //     .status(422)
            //     .send({ mensage: "O email é obrigatório!" });
            const error = new Error('O email é obrigatório!')
            error.status = 422
            return next(error)
        }

        if (!password) {
            // return res
            //     .status(422)
            //     .send({ mensage: "A senha é obrigatória!" });
            const error = new Error('A senha é obrigatória!')
            error.status = 422
            return next(error)
        }

        if (password != confirmpassword) {
            // return res
            //     .status(422)
            //     .send({ mensage: "Senha e confirmação da senha precisam ser iguais!" });
            const error = new Error('Senha e confirmação da senha precisam ser iguais!')
            error.status = 422
            return next(error)
        }

        next();/* Para a execução do próximo middlewares(controllerUsers.addUser) */
    } catch (e) {
        // throw error
        const error = new Error(e)
        error.status = 500
        return next(error)
    }
}

module.exports = { ValidateBody }