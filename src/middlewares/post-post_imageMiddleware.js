const {Post_Images} = require("../../db/models")

const validarImagePerteneceAPost = async (req,res,next) => {
    const postId = req.params.postId
    const imageId = req.params.imageId
    const imagePost = await Post_Images.findOne({
        where: {
            id : imageId,
            postId : postId
        }
    })
    if (!imagePost) {
        return res.status(404).json({ message:`La imagen con id ${imageId} no pertenece al post ${postId}`})
    }
    next()
}

module.exports = validarImagePerteneceAPost