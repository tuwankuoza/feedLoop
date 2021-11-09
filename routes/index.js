const Controller = require('../controllers/controllers')
const router = require('express').Router()


router.post('/login', Controller.login)
router.post('/register', Controller.register)

router.post('/product', Controller.addProduct)
router.get('/product', Controller.listProduct)
router.get('/product/:id', Controller.listProductById)
router.delete('/product/:id', Controller.deleteProduct)

module.exports = router