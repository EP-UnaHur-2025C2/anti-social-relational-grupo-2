const {Tag} = require("../../db/models")
const {validarId, validarCampoUnico, validarBodyGenerico} = require("../middlewares/genericMiddleware")
const {bodyTagSchema} = require("../schemas/tagSchema")

const validarTagExistente = (data) => validarId(Tag, data)

const validarTagUnico = validarCampoUnico(Tag, "nombre")

const validarBodyTag = validarBodyGenerico(bodyTagSchema)

module.exports = {
    validarTagExistente,
    validarTagUnico,
    validarBodyTag
}