const {Tag} = require("../../db/models")
const {validarBodyGenerico, validarCampoUnico, validarExistencia} = require("./genericMiddleware")
const {bodyTagSchema} = require("../schemas/tagSchema")

const validarTagExistente = (data) => validarExistencia(Tag, "params", data)

const validarTagUnico = validarCampoUnico(Tag, "nombre")

const validarBodyTag = validarBodyGenerico(bodyTagSchema)

module.exports = {
    validarTagExistente,
    validarTagUnico,
    validarBodyTag
}