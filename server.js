import express from "express"
import { getAllOrders,addOrder, orderById, updateOrder, deleteOrder } from "./services.js"
import { checkId } from "./utils.js"

const server = express()

server.use(express.json())

server.post('/orders', addOrder)

server.get('/orders', getAllOrders)

server.use('/orders/:id',checkId)

server.get('/orders/:id',orderById)

server.put('/orders/:id', updateOrder)

server.delete('/orders/:id', deleteOrder)

server.listen(3000, () => {
    console.log("listening on port 3000")
})