const {User} = require("../../db/models")
const {validarId, validarBodyGenerico, validarCampoUnico} = require("./genericMiddleware")
const bodyUserSchema = require("../schemas/userSchema")

const validarUserExistente = (data) => validarId(User, data)

const validarUserBody = validarBodyGenerico(bodyUserSchema)

const validarNickNameUnico = validarCampoUnico(User, "nickName")

module.exports = {
    validarUserExistente,
    validarUserBody,
    validarNickNameUnico
}