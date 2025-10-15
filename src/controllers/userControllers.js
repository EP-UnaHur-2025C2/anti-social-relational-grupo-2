const { User } = require("../../db/models")

const obtenerUsers = async (req,res) => {
    const usuarios = await User.findAll()
    res.status(200).json(usuarios)
}

const obtenerUser = async (req,res) => {
    try {
        const id = req.params.id
        const usuario = await User.findByPk(id)
        res.status(200).json(usuario)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const crearUser = async (req,res) => {
    try {
        const { nickName } = req.body
        const usuario = await User.create({
            nickName
        })
        res.status(201).json(usuario)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module. exports = {
    obtenerUsers,
    obtenerUser,
    crearUser
}