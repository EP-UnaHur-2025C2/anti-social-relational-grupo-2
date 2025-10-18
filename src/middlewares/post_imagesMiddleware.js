const {Post_Images} = require("../../db/models")
const {validarId, validarBodyGenerico, validarCampoUnico} = require("./genericMiddleware")
const bodyImageSchema = require("../schemas/post_imagesSchema")

const validarImageExistente = (data) => validarId(Post_Images, data)

const validarBodyImage = validarBodyGenerico(bodyImageSchema)

const validarUrlUnica = validarCampoUnico(Post_Images, "url")

module.exports = {
    validarImageExistente,
    validarBodyImage,
    validarUrlUnica
}