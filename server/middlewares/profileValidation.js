const ValidateBody = (req, res, next) => {
    try {

        // Controle realizado pelo middleware multer: server\middlewares\uploadImage
        if (!req.file) {
            const error = new Error('Imagem enviada não é compatível com o formato válido! (png/jpg/jpeg)')
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