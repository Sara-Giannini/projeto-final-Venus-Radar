const express = require('express')
const router = express.Router()
const controller = require('../controllers/locaisController')

router.get('/locais', controller.getAll)
router.get('/locais/:id', controller.getById)
router.get('/estados', controller.getByState)
router.get('/cidades', controller.getByCity)
router.get('/categoria', controller.getByCategory)
router.post('/local', controller.addNew)
router.patch('/local/update/:id', controller.updateById)
router.delete('/local/delete/:id', controller.deleteById)

module.exports = router