const { Router } = require("express")
const router = Router()
const userController = require("../controllers/userControllers")

router.get("/", userController.obtenerUsers)
router.get("/:id", userController.obtenerUser)
router.post("/", userController.crearUser)
//router.put("/:id")
//router.delete("/:id")



module.exports = router