const { Router } = require("express")
const router = Router()
const post_imagesController = require("../controllers/post_imagesControllers")

// CRUD básico
router.get("/", post_imagesController.obtenerImages)
router.get("/:id", post_imagesController.obtenerImage)
router.post("/", post_imagesController.crearImage)
router.put("/:id", post_imagesController.actualizarImage)
router.delete("/:id", post_imagesController.eliminarImage)

module.exports = router