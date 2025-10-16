const { Router } = require("express")
const router = Router()
const tagControllers = require("../controllers/tagControllers")

// CRUD básico
router.get("/", tagControllers.obtenerTags)
router.get("/:id", tagControllers.obtenerTag)
router.post("/", tagControllers.crearTag)
router.put("/:id", tagControllers.actualizarTag)
router.delete("/:id", tagControllers.eliminarTag)

module.exports = router