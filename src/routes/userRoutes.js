const { Router } = require("express")
const router = Router()
const userController = require("../controllers/userControllers")
const {validarIdParams} = require("../middlewares/genericMiddleware")

// CRUD básico
router.get("/", userController.obtenerUsers)
router.get("/:id", validarIdParams("id"), userController.obtenerUser)
router.post("/", userController.crearUser)
router.put("/:id", userController.actualizarUser)
router.delete("/:id", userController.eliminarUser)



module.exports = router