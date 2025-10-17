const {Comment} = require("../../db/models")
const {validarId, validarBodyGenerico} = require("./genericMiddleware")
const bodyCommentSchema = require("../schemas/commentSchema")

const validarCommentExiste = (data) => validarId(Comment, data)

const validarBodyComment = validarBodyGenerico(bodyCommentSchema)

module.exports = {
    validarCommentExiste,
    validarBodyComment
}