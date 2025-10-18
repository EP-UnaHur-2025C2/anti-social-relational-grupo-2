const {Comment} = require("../../db/models")
const {validarBodyGenerico, validarExistencia} = require("./genericMiddleware")
const bodyCommentSchema = require("../schemas/commentSchema")

const validarCommentExiste = (data) => validarExistencia(Comment, "params", data)

const validarBodyComment = validarBodyGenerico(bodyCommentSchema)

module.exports = {
    validarCommentExiste,
    validarBodyComment
}