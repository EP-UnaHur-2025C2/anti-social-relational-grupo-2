const { User, Post } = require("../../db/models")

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

const actualizarUser = async (req, res) => {
    try {
        const id = req.params.id
        const { nickName } = req.body
        const usuario = await User.findByPk(id)
        await usuario.update({
            nickName
        })
        res.status(201).json(usuario)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const eliminarUser = async (req,res) => {
    try {
        const id = req.params.id
        const user = await User.findByPk(id)
        await user.destroy()
        res.status(200).json({message: "Usuario eliminado correctamente"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const crearPostDeUser = async (req,res) => {
    try {
        const userId = req.params.userId
        const {descripcion} = req.body
        const post = await Post.create({
            descripcion,
            userId
        })
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const obtenerPostsDeUser = async (req,res) => {
    try {
        const userId = req.params.userId
        const userPosts = await Post.findAll({
            where: {
                userId
            },
            attributes:["id","descripcion", "createdAt"],
        })
        res.status(200).json(userPosts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module. exports = {
    obtenerUsers,
    obtenerUser,
    crearUser,
    actualizarUser,
    eliminarUser,
    crearPostDeUser,
    obtenerPostsDeUser
}