const { Router } = require("express")
const router = Router()
const postController = require("../controllers/postControllers")
const {validarIdParams} = require("../middlewares/genericMiddleware")
const {validarPostExistente, validarPostBody} = require("../middlewares/postMiddleware")
const {validarExisteUserIdBody} = require("../middlewares/userMiddleware")

// CRUD básico
router.get("/", postController.obtenerPosts)
router.get("/:id", validarIdParams("id"), validarPostExistente("id"), postController.obtenerPost)
router.post("/", validarPostBody, validarExisteUserIdBody, postController.crearPost)
router.put("/:id", validarIdParams("id"), validarPostBody, validarPostExistente("id"), postController.actualizarPost)
router.delete("/:id", validarIdParams("id"), validarPostExistente("id"), postController.eliminarPost)



module.exports = router