const { User, Post, Comment, Post_Images, Tag } = require("../../db/models")
const {actualizarVisibilidadComentarios} = require("./commentControllers")

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

const obtenerPostDeUser = async (req,res) => {
    try {
        const userId = req.params.userId
        const postId = req.params.postId
        await actualizarVisibilidadComentarios()
        const userPost = await Post.findOne({
            where: {
                id : postId,
                userId : userId
            },
            attributes:["id","descripcion", "createdAt"],
            include: [
                {
                    model: Comment,
                    attributes: ["texto", "createdAt"],
                    where:{
                        visible: true,
                        userId,
                        postId
                    },
                    required: false,
                    limit: 3
                },
                {
                    model: Post_Images,
                    attributes:["url"],
                    where: {
                        postId
                    },
                    required: false
                },
                {
                    model: Tag,
                    attributes: ["nombre"],
                    through: { attributes: [] },
                    required: false
                }
            ]
        })
        res.status(200).json(userPost)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const eliminarPostDeUser = async (req,res) => {
    try {
        const userId = req.params.userId
        const postId = req.params.postId
        const userPost = await Post.findOne({
            where: {
                id : postId,
                userId : userId
            }
        })
        await userPost.destroy()
        res.status(200).json({message: "Usuario eliminado correctamente"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const crearCommentDePostDeUser = async (req,res) => {
    try {
        const userId = req.params.userId
        const postId = req.params.postId   
        const comment = await Comment.create({
            ...req.body,
            userId,
            postId
        })
        res.status(201).json(comment)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const obtenerCommentsDePostDeUser = async (req,res) => {
    try {
        const userId = req.params.userId
        const postId = req.params.postId
        await actualizarVisibilidadComentarios()
        const comments = await Comment.findAll({
            where:{
                visible: true,
                userId,
                postId
            },
            attributes: ["texto", "createdAt"]
        })
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Bonus

const obtenerSeguidoresDeUser = async (req,res) => {
    try {
        id = req.params.id
        const user = await User.findByPk(id, {
              include: {
                model: User,
                as: 'seguidores',
                attributes: ['nickName'],
                through: { attributes: [] }
            }
        })
        res.status(200).json(user.seguidores)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const obtenerSeguidosDeUser = async (req,res) => {
    try {
        id = req.params.id
        const user = await User.findByPk(id, {
              include: {
                model: User,
                as: 'seguidos',
                attributes: ['nickName'],
                through: { attributes: [] }
            }
        })
        res.status(200).json(user.seguidos)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const seguirUser = async (req,res) => {
    try {
        const {idSeguidor, idSeguido} = req.params
        const userSeguidor = await User.findByPk(idSeguidor)
        const userSeguido = await User.findByPk(idSeguido)
        await userSeguidor.addSeguido(userSeguido)
        res.status(201).json({message: `${userSeguidor.nickName} siguió a ${userSeguido.nickName}`})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const dejarDeSeguirUser = async (req,res) => {
    try {
        const {idSeguidor, idSeguido} = req.params
        const userSeguidor = await User.findByPk(idSeguidor)
        const userSeguido = await User.findByPk(idSeguido)
        await userSeguidor.removeSeguido(userSeguido)
        res.status(201).json({message: `${userSeguidor.nickName} dejó de seguir a ${userSeguido.nickName}`})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const obtenerCantidadSeguidoresDeUser = async (req,res) => {
    try {
        const id = req.params.id
        const user = await User.findByPk(id)
        const cantidad = await user.countSeguidores()
        res.status(200).json({ cantidad })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const obtenerCantidadSeguidosDeUser = async (req,res) => {
    try {
        const id = req.params.id
        const user = await User.findByPk(id)
        const cantidad = await user.countSeguidos()
        res.status(200).json({ cantidad })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    obtenerUsers,
    obtenerUser,
    crearUser,
    actualizarUser,
    eliminarUser,
    crearPostDeUser,
    obtenerPostsDeUser,
    obtenerPostDeUser,
    eliminarPostDeUser,
    crearCommentDePostDeUser,
    obtenerCommentsDePostDeUser,
    obtenerSeguidoresDeUser,
    obtenerSeguidosDeUser,
    seguirUser,
    dejarDeSeguirUser,
    obtenerCantidadSeguidoresDeUser,
    obtenerCantidadSeguidosDeUser
}