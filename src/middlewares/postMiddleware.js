const {Post} = require("../../db/models")
const {validarBodyGenerico, validarExistencia} = require("./genericMiddleware")
const bodyPostSchema = require("../schemas/postSchema")

const validarPostExistente = (data) => validarExistencia(Post, "params", data)

const validarExistePostIdBody = validarExistencia(Post, "body", "postId")

const validarPostBody = validarBodyGenerico(bodyPostSchema)

module.exports = {
    validarPostExistente,
    validarPostBody,
    validarExistePostIdBody
}