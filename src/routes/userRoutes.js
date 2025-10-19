const { Router } = require("express")
const router = Router()
const userController = require("../controllers/userControllers")
const {validarIdParams} = require("../middlewares/genericMiddleware")
const {validarUserExistente, validarUserBody, validarNickNameUnico} = require("../middlewares/userMiddleware")
const {validarPostBody, validarPostExistente} = require("../middlewares/postMiddleware")
const {validarBodyComment} = require("../middlewares/commentMiddleware")
const validarPostPerteneceAUser = require("../middlewares/user-postMiddleware")
const {validarUserDiferentes, validarUserSigueAUser} = require("../middlewares/user-followersMiddleware")

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

// Seguidores y seguidos
router.get("/:id/followers",
    validarIdParams("id"),
    validarUserExistente("id"),
    userController.obtenerSeguidoresDeUser
)
router.get("/:id/followed",
    validarIdParams("id"),
    validarUserExistente("id"),
    userController.obtenerSeguidosDeUser
)

router.post("/:idSeguidor/follow/:idSeguido",
    validarIdParams("idSeguidor"),
    validarIdParams("idSeguido"),
    validarUserExistente("idSeguidor"),
    validarUserExistente("idSeguido"),
    validarUserDiferentes,
    userController.seguirUser
) 
router.delete("/:idSeguidor/unfollow/:idSeguido",
    validarIdParams("idSeguidor"),
    validarIdParams("idSeguido"),
    validarUserExistente("idSeguidor"),
    validarUserExistente("idSeguido"),
    validarUserDiferentes,
    validarUserSigueAUser,
    userController.dejarDeSeguirUser)

router.get("/:id/followers/count",
    validarIdParams("id"),
    validarUserExistente("id"),
    userController.obtenerCantidadSeguidoresDeUser
)

router.get("/:id/followed/count",
    validarIdParams("id"),
    validarUserExistente("id"),
    userController.obtenerCantidadSeguidosDeUser
)

module.exports = router