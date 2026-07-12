import express from "express"
import { getAllOrders,addOrder } from "./services.js"

const server = express()

server.use(express.json())

server.post('/orders', addOrder)

server.get('/orders', getAllOrders)

server.listen(3000, () => {
    console.log("listening on port 3000")
})