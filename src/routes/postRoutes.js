const { Router } = require("express")
const router = Router()
const postController = require("../controllers/postControllers")

// CRUD básico
router.get("/" , postController.obtenerPosts)
router.get("/:id", postController.obtenerPost)
router.post("/", postController.crearPost)
router.put("/:id", postController.actualizarPost)
router.delete("/:id", postController.eliminarPost)



module.exports = router