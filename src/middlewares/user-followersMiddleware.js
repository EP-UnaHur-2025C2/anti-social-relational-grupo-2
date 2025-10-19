const { User } = require("../../db/models")

const validarUserDiferentes = async (req,res,next) => {
    const idSeguidor = req.params.idSeguidor
    const idSeguido = req.params.idSeguido
    if (idSeguidor === idSeguido) {
        return res.status(404).json({ message:`Los users no pueden ser iguales.`})
    }
    next()
}

const validarUserSigueAUser = async (req,res,next) => {
    const idSeguidor = req.params.idSeguidor
    const idSeguido = req.params.idSeguido
    const seguidor = await User.findByPk(idSeguidor)
    const seguido = await User.findByPk(idSeguido)
    const respuesta = await seguidor.hasSeguido(seguido)
    if (!respuesta) {
        return res.status(404).json({ message:`El user ${seguidor.nickName} no sigue al user ${seguido.nickName}.`})
    }
    next()
}

module.exports = {
    validarUserDiferentes,
    validarUserSigueAUser
}