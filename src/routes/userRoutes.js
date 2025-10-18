const { Router } = require("express")
const router = Router()
const userController = require("../controllers/userControllers")
const {validarIdParams} = require("../middlewares/genericMiddleware")
const {validarUserExistente, validarUserBody, validarNickNameUnico} = require("../middlewares/userMiddleware")
const {validarPostBody, validarPostExistente} = require("../middlewares/postMiddleware")
const {validarBodyComment} = require("../middlewares/commentMiddleware")
const validarPostPerteneceAUser = require("../middlewares/user-postMiddleware")

// CRUD básico
router.get("/", userController.obtenerUsers)
router.get("/:id", validarIdParams("id"), validarUserExistente("id"), userController.obtenerUser)
router.post("/", validarUserBody, validarNickNameUnico, userController.crearUser)
router.put("/:id", validarIdParams("id"), validarUserBody, validarUserExistente("id"), userController.actualizarUser)
router.delete("/:id",validarIdParams("id"), validarUserExistente("id"), userController.eliminarUser)

// Asociaciones

// Posts de user
router.post("/:userId/posts",
    validarIdParams("userId"), 
    validarUserExistente("userId"), 
    validarPostBody, 
    userController.crearPostDeUser
)

router.get("/:userId/posts", 
    validarIdParams("userId"), 
    validarUserExistente("userId"), 
    userController.obtenerPostsDeUser
)

// Post en específico
router.get("/:userId/posts/:postId",
    validarIdParams("userId"),
    validarIdParams("postId"),
    validarUserExistente("userId"),
    validarPostExistente("postId"),
    validarPostPerteneceAUser,
    userController.obtenerPostDeUser)

router.delete("/:userId/posts/:postId",
    validarIdParams("userId"),
    validarIdParams("postId"),
    validarUserExistente("userId"),
    validarPostExistente("postId"),
    validarPostPerteneceAUser,
    userController.eliminarPostDeUser)

// Comentarios de un post
router.post("/:userId/posts/:postId/comments",
    validarIdParams("userId"),
    validarIdParams("postId"),
    validarUserExistente("userId"),
    validarPostExistente("postId"),
    validarPostPerteneceAUser,
    validarBodyComment,
    userController.crearCommentDePostDeUser) 
router.get("/:userId/posts/:postId/comments",
    validarIdParams("userId"),
    validarIdParams("postId"),
    validarUserExistente("userId"),
    validarPostExistente("postId"),
    validarPostPerteneceAUser,
    userController.obtenerCommentsDePostDeUser)
    
module.exports = router