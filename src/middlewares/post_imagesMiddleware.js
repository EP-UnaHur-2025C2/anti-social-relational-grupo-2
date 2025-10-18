const {Post_Images} = require("../../db/models")
const {validarBodyGenerico, validarCampoUnico, validarExistencia} = require("./genericMiddleware")
const bodyImageSchema = require("../schemas/post_imagesSchema")

const validarImageExistente = (data) => validarExistencia(Post_Images, "params", data)

const validarBodyImage = validarBodyGenerico(bodyImageSchema)

const validarUrlUnica = validarCampoUnico(Post_Images, "url")

module.exports = {
    validarImageExistente,
    validarBodyImage,
    validarUrlUnica
}