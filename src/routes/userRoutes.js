const { Router } = require("express")
const router = Router()
const userController = require("../controllers/userControllers")
const {validarIdParams} = require("../middlewares/genericMiddleware")
const {validarUserExistente, validarUserBody, validarNickNameUnico} = require("../middlewares/userMiddleware")

// CRUD básico
router.get("/", userController.obtenerUsers)
router.get("/:id", validarIdParams("id"), validarUserExistente("id"), userController.obtenerUser)
router.post("/", validarUserBody, validarNickNameUnico, userController.crearUser)
router.put("/:id", validarIdParams("id"), validarUserBody, validarUserExistente("id"), userController.actualizarUser)
router.delete("/:id",validarIdParams("id"), validarUserExistente("id"), userController.eliminarUser)



module.exports = router