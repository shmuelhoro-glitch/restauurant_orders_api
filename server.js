import express from "express"
import { getAllOrders,addOrder, orderById, updateOrder, deleteOrder, updateStatus } from "./services.js"
import { checkId, errorhandler, routeNotFound, logger } from "./utils.js"

const server = express()

server.use(express.json())

server.use(logger)

server.post('/orders', addOrder)

server.get('/orders', getAllOrders)

server.use('/orders/:id',checkId)

server.get('/orders/:id',orderById)

server.put('/orders/:id', updateOrder)

server.delete('/orders/:id', deleteOrder)

server.patch('/orders/:id/status', updateStatus)

server.use(routeNotFound)

server.use(errorhandler)

server.listen(3000, () => {
    console.log("listening on port 3000")
})