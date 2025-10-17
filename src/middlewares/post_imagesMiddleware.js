const {Post_Images} = require("../../db/models")
const {validarId, validarBodyGenerico} = require("./genericMiddleware")
const bodyImageSchema = require("../schemas/post_imagesSchema")

const validarImageExistente = (data) => validarId(Post_Images, data)

const validarBodyImage = validarBodyGenerico(bodyImageSchema)

module.exports = {
    validarImageExistente,
    validarBodyImage
}