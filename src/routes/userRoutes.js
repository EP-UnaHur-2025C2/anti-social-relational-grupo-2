const { Router } = require("express")
const router = Router()
const userController = require("../controllers/userControllers")

// CRUD básico
router.get("/", userController.obtenerUsers)
router.get("/:id", userController.obtenerUser)
router.post("/", userController.crearUser)
router.put("/:id", userController.actualizarUser)
router.delete("/:id", userController.eliminarUser)



module.exports = router