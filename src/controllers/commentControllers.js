const {Comment} = require("../../db/models")
const { Op } = require("sequelize");
const VISIBLE_COMMENTS_MONTHS = process.env.VISIBLE_COMMENTS_MONTHS || 3

const actualizarVisibilidadComentarios = async () => {
  const limiteFecha = new Date();
  limiteFecha.setMonth(
    limiteFecha.getMonth() - Number(VISIBLE_COMMENTS_MONTHS)
  )
    await Comment.update({ visible: false },{
        where: {
            createdAt: {
                [Op.lt]: limiteFecha,
            }
        }
    })

    await Comment.update({ visible: true },{
        where: {
            createdAt: {
                [Op.gte]: limiteFecha,
            }
        }
    })
}

const obtenerComments = async (req,res) => {
    await actualizarVisibilidadComentarios()
    const comments = await Comment.findAll()
    res.status(200).json(comments)
}

const obtenerComment = async (req,res) => {
    try {
        const id = req.params.id
        const comment = await Comment.findByPk(id)
        res.status(200).json(comment)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const crearComment = async (req,res) => {
    try {
        const comment = await Comment.create(req.body)
        res.status(201).json(comment)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const actualizarComment = async (req,res) => {
    try {
        const id = req.params.id
        const comment = await Comment.findByPk(id)
        await comment.update(req.body)
        res.status(200).json(comment)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const eliminarComment = async (req,res) => {
    try {
        const id = req.params.id
        const comment = await Comment.findByPk(id)
        await comment.destroy()
        res.status(200).json({message: "Comentario eliminado con exito"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    obtenerComments,
    obtenerComment,
    crearComment,
    actualizarComment,
    eliminarComment,
    actualizarVisibilidadComentarios
}