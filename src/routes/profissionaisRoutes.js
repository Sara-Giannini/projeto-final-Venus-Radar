const express = require('express')
const router = express.Router()
const controller = require('../controllers/profissionaisController')

router.get('/profissionais', controller.getAllPro)
router.get('/profissionais/ocupacao', controller.getProbyOccupation)
router.post('/profissional', controller.newPro)
router.post('/profissional/login', controller.loginPro)
router.patch('/profissional/update/:id', controller.updateProById)
router.delete('/profissional/delete/:id', controller.deleteProrById)

module.exports = router

