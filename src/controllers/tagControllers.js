const { Tag } = require("../../db/models")

const obtenerTags = async (req,res) => {
    const tags = await Tag.findAll()
    res.status(200).json(tags)
}

const obtenerTag = async (req,res) => {
    try {
        const id = req.params.id
        const tag = await Tag.findByPk(id)
        res.status(200).json(tag)
    } catch (error) {
        res.status(500).json({message: error.message})
    }    
}

const crearTag = async (req,res) => {
    try {
        const tag = await Tag.create(req.body)
        res.status(201).json(tag)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const actualizarTag = async (req,res) => {
    try {
        const id = req.params.id
        const tag = await Tag.findByPk(id)
        await tag.update(req.body)
        res.status(200).json(tag)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const eliminarTag = async (req,res) => {
    try {
        const id = req.params.id
        const tag = await Tag.findByPk(id)
        await tag.destroy()
        res.status(200).json({message: "Tag eliminada con exito"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    obtenerTags,
    obtenerTag,
    crearTag,
    actualizarTag,
    eliminarTag
}