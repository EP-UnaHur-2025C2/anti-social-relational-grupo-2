const { Router } = require("express")
const router = Router()
const post_imagesController = require("../controllers/post_imagesControllers")
const {validarIdParams} = require("../middlewares/genericMiddleware")
const {validarImageExistente, validarBodyImage, validarUrlUnica} = require("../middlewares/post_imagesMiddleware")

// CRUD básico
router.get("/", post_imagesController.obtenerImages)
router.get("/:id", validarIdParams("id"), validarImageExistente("id"), post_imagesController.obtenerImage)
router.post("/", validarBodyImage, validarUrlUnica, post_imagesController.crearImage)
router.put("/:id", validarIdParams("id"), validarBodyImage, validarImageExistente("id"), post_imagesController.actualizarImage)
router.delete("/:id", validarIdParams("id"), validarImageExistente("id"), post_imagesController.eliminarImage)

module.exports = router