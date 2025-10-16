const { Router } = require("express")
const router = Router()
const commentController = require("../controllers/commentControllers")

// CRUD básico
router.get("/", commentController.obtenerComments)
router.get("/:id", commentController.obtenerComment)
router.post("/", commentController.crearComment)
router.put("/:id", commentController.actualizarComment)
router.delete("/:id", commentController.eliminarComment)


module.exports = router