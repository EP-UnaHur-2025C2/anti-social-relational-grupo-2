const { Router } = require("express")
const router = Router()
const postController = require("../controllers/postControllers")
const {validarIdParams} = require("../middlewares/genericMiddleware")
const {validarPostExistente, validarPostBody} = require("../middlewares/postMiddleware")
const {validarExisteUserIdBody} = require("../middlewares/userMiddleware")
const {validarBodyImage, validarImageExistente} = require("../middlewares/post_imagesMiddleware")
const validarImagePerteneceAPost = require("../middlewares/post-post_ImageMiddleware")

// CRUD básico
router.get("/", postController.obtenerPosts)
router.get("/:id", validarIdParams("id"), validarPostExistente("id"), postController.obtenerPost)
router.post("/", validarPostBody, validarExisteUserIdBody, postController.crearPost)
router.put("/:id", validarIdParams("id"), validarPostBody, validarPostExistente("id"), postController.actualizarPost)
router.delete("/:id", validarIdParams("id"), validarPostExistente("id"), postController.eliminarPost)

// Asociaciones

// Post e Images
router.get("/:postId/images",
    validarIdParams("postId"),
    validarPostExistente("postId"),
    postController.obtenerImagesDePost)
router.post("/:postId/images", 
    validarIdParams("postId"),
    validarPostExistente("postId"),
    validarBodyImage,
    postController.crearImageDePost)
router.delete("/:postId/images/:imageId",
    validarIdParams("postId"),
    validarIdParams("imageId"),
    validarPostExistente("postId"),
    validarImageExistente("imageId"),
    validarImagePerteneceAPost,
    postController.eliminarImageDePost)


module.exports = router