const {Post} = require("../../db/models")
const {validarId, validarBodyGenerico} = require("./genericMiddleware")
const bodyPostSchema = require("../schemas/postSchema")

const validarPostExistente = (data) => validarId(Post, data)

const validarPostBody = validarBodyGenerico(bodyPostSchema)

module.exports = {
    validarPostExistente,
    validarPostBody
}