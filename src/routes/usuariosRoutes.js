const express = require("express")
const router = express.Router()
const controller = require("../controllers/usuariosController")

router.post("/usuario", controller.create)
router.post("/usuario/login", controller.login)
router.patch("/usuario/update/:id", controller.updateById)
router.delete("/usuario/delete/:id", controller.deleteById)

module.exports = router