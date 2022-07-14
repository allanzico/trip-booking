import express from 'express'
import { OrderClass } from '../controllers/orders'
import { requireSignIn } from '../middlewares/middlewares'

const orders = new OrderClass()
const router = express.Router()

router.post('/create-order', requireSignIn, orders.createOrder)

module.exports = router