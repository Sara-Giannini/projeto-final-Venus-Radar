const express = require("express")
const router = express.Router()
const controller = require("../controllers/usuariosController")

router.post("/usuario", controller.newUser)
router.post("/usuario/login", controller.login)
router.patch("/usuario/update/:id", controller.updateUserById)
router.delete("/usuario/delete/:id", controller.deleteUserById)

module.exports = router