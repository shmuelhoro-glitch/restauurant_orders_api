import express from "express"
import { getAllOrders,addOrder, orderById } from "./services.js"

const server = express()

server.use(express.json())

server.post('/orders', addOrder)

server.get('/orders', getAllOrders)

server.get('/orders/:id',orderById)

server.listen(3000, () => {
    console.log("listening on port 3000")
})