import express from "express"
import { getAllOrders } from "./services.js"

const server = express()

server.use(express.json())

server.post('/orders', async (req, res) =>{
    const {customer, table} = req.query
})

server.get('/orders', getAllOrders)

server.listen(3000, () => {
    console.log("listening on port 3000")
})