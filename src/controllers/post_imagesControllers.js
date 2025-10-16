const { Post_Images } = require("../../db/models")

const obtenerImages = async (req,res) => {
    const images = await Post_Images.findAll()
    res.status(200).json(images)
}

const obtenerImage = async (req,res) => {
    try {
        const id = req.params.id
        const image = await Post_Images.findByPk(id)
        res.status(200).json(image)
    } catch (error) {
        res.status(500).json({message: error.message})
    } 
}

const crearImage = async (req,res) => {
    try {
        const image = await Post_Images.create(req.body)
        res.status(201).json(image)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const actualizarImage = async (req,res) => {
    try {
        id = req.params.id
        const image = await Post_Images.findByPk(id)
        await image.update(req.body)
        res.status(201).json(image)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const eliminarImage = async (req,res) => {
    try {
        id = req.params.id
        const image = await Post_Images.findByPk(id)
        await image.destroy()
        res.status(200).json({message: "Imagen eliminada con exito"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    obtenerImages,
    obtenerImage,
    crearImage,
    actualizarImage,
    eliminarImage
}