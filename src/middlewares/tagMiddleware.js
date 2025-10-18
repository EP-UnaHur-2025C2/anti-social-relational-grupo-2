const {Tag} = require("../../db/models")
const {validarBodyGenerico, validarCampoUnico, validarExistencia} = require("./genericMiddleware")
const {bodyTagSchema, idBodyTagSchema} = require("../schemas/tagSchema")

const validarTagExistente = (data) => validarExistencia(Tag, "params", data)

const validarTagUnico = validarCampoUnico(Tag, "nombre")

const validarBodyTag = validarBodyGenerico(bodyTagSchema)

const validarIdBodyTag = validarBodyGenerico(idBodyTagSchema)

const validarTagIdEnBody = async (req,res,next) => {
    const {tagId} = req.body
    const tag = await Tag.findByPk(tagId)
    if(!tag) {
        return res.status(404).json({ message: `El tag ${tagId} no existe` })
    }
    next()
}

module.exports = {
    validarTagExistente,
    validarTagUnico,
    validarBodyTag,
    validarTagIdEnBody,
    validarIdBodyTag
}