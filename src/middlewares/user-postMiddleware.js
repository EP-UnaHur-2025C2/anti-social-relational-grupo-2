const {Post} = require("../../db/models")

const validarPostPerteneceAUser = async (req,res,next) => {
    const userId = req.params.userId
    const postId = req.params.postId
    const userPost = await Post.findOne({
        where: {
            id : postId,
            userId : userId
        }
    })
    if (!userPost) {
        return res.status(404).json({ message:`El post ${postId} no pertenece al user ${userId}.`})
    }
    next()
}

module.exports = validarPostPerteneceAUser