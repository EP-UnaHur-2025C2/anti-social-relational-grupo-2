const {Router} = require("express")
const router = Router()
const commentController = require("../controllers/commentControllers")
const {validarIdParams} = require("../middlewares/genericMiddleware")
const {validarCommentExiste, validarBodyComment} = require("../middlewares/commentMiddleware")
const {validarExisteUserIdBody} = require("../middlewares/userMiddleware")
const {validarExistePostIdBody} = require("../middlewares/postMiddleware")

// CRUD básico
router.get("/", commentController.obtenerComments)
router.get("/:id", validarIdParams("id"), validarCommentExiste("id"), commentController.obtenerComment)
router.post("/", validarBodyComment, validarExisteUserIdBody, validarExistePostIdBody, commentController.crearComment)
router.put("/:id", validarIdParams("id"), validarBodyComment, validarCommentExiste("id"), commentController.actualizarComment)
router.delete("/:id", validarIdParams("id"), validarCommentExiste("id"), commentController.eliminarComment)

module.exports = router