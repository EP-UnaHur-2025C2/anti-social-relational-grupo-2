const {Post} = require("../../db/models")

const validarTagAsociadoAPost = async (req,res,next) => {
    const postId = req.params.postId
    const tagId = Number(req.params.tagId)
    const post = await Post.findByPk(postId)
    const respuesta = await post.hasTag(tagId)
    if (!respuesta){
        return res.status(404).json({ message: `La tag ${tagId} no está asociado al post ${postId}` })
    }
    next()
}

module.exports = validarTagAsociadoAPost