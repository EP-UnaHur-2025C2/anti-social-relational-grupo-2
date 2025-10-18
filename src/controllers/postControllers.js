const { Post } = require("../../db/models")

const obtenerPosts = async (req,res) => {
    const post = await Post.findAll()
    res.status(200).json(post)
}

const obtenerPost = async (req,res) => {
    try {
        const id = req.params.id
        const post = await Post.findByPk(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const crearPost = async (req,res) => {
    try {
        const post = await Post.create(req.body)
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const actualizarPost = async (req,res) => {
    try {
        id = req.params.id
        const post = await Post.findByPk(id)
        await post.update(req.body)
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const eliminarPost = async (req,res) => {
    try {
        const id = req.params.id
        const post = await Post.findByPk(id)
        await post.destroy()
        res.status(200).json({message: "El post fue borrado con exito"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const obtenerImagesDePost = async (req,res) => {
    try {
        const postId = req.params.postId
        const postImage = await Post_Images.findAll({
            where: {
                postId
            },
            attributes: ["url"]
        })
        res.status(200).json(postImage)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const crearImageDePost = async (req,res) => {
    try {
        const postId = req.params.postId
        const image = await Post_Images.create({
            ...req.body,
            postId
        })
        res.status(201).json(image)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }  
}

const eliminarImageDePost = async (req,res) => {
    try {
        const postId = req.params.postId
        const imageId = req.params.imageId
        const image = await Post_Images.findOne({
            where: {
                id: imageId,
                postId: postId
            }
        })
        await image.destroy()
        res.status(200).json({message: "La imagen fue borrada con exito"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }  
}

module.exports = {
    obtenerPosts,
    obtenerPost,
    crearPost,
    actualizarPost,
    eliminarPost,
    obtenerImagesDePost,
    crearImageDePost,
    eliminarImageDePost,
}    