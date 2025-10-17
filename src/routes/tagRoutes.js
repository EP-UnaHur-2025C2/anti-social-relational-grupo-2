const { Router } = require("express")
const router = Router()
const tagControllers = require("../controllers/tagControllers")
const {validarIdParams} = require("../middlewares/genericMiddleware")
const {validarTagExistente, validarTagUnico, validarBodyTag} = require("../middlewares/tagMiddleware")

// CRUD básico
router.get("/", tagControllers.obtenerTags) 
router.get("/:id", validarIdParams("id"), validarTagExistente("id"), tagControllers.obtenerTag)
router.post("/", validarBodyTag, validarTagUnico, tagControllers.crearTag)
router.put("/:id", validarIdParams("id"), validarBodyTag, validarTagExistente("id"), tagControllers.actualizarTag)
router.delete("/:id", validarIdParams("id"), validarTagExistente("id"), tagControllers.eliminarTag)

module.exports = router