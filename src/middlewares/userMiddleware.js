const {User} = require("../../db/models")
const {validarBodyGenerico, validarCampoUnico, validarExistencia} = require("./genericMiddleware")
const bodyUserSchema = require("../schemas/userSchema")

const validarUserExistente = (data) => validarExistencia(User, "params", data)

const validarExisteUserIdBody = validarExistencia(User, "body", "userId")

const validarUserBody = validarBodyGenerico(bodyUserSchema)

const validarNickNameUnico = validarCampoUnico(User, "nickName")

module.exports = {
    validarUserExistente,
    validarUserBody,
    validarNickNameUnico,
    validarExisteUserIdBody
}