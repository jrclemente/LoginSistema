const multer = require('multer');

/*
Origem  de referêmcia deste controle:
https://www.npmjs.com/package/multer - Ver parte em Português: https://github.com/expressjs/multer/blob/master/doc/README-pt-br.md
https://medium.com/@pmadhav279/how-to-upload-image-using-multer-in-express-js-920483ac1fe3
https://youtu.be/jRz7U762U4Q?si=ZbCGQAeFfJ41IAwV
https://youtu.be/J469c3a6lXU?si=8pVILkV69Mv-djZ_
*/

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            // Este diretório deve estar previamente criado dentro da aplicação
            cb(null, './public/images/upload/users')
        },
        // Redefine o nome do arquivo com a inclusão da data em: Timestamp
        filename: (req, file, cb) => {
            // cb(null, Date.now().toString() + "_" + file.originalname) - Versão Original
            cb(null, `${Date.now().toString()}_${file.originalname}`)
        }
    }),
    fileFilter: (req, file, cb) => {
        const extensaoImg = ['image/png', 'image/jpg', 'image/jpeg'].find(formatoAceito => formatoAceito == file.mimetype);

        if (extensaoImg) {
            return cb(null, true);
        }

        return cb(null, false);
    }
}));