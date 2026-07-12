import { readFile } from "./storage.js";

export async function newId(){
    const data = await readFile()
    let lastId = 0
    for await (let order of data){
        if (order.id && order.id > lastId){
            lastId = order.id
        }
    }
    return lastId +1
}

export async function checkId(req, res, next){
    const data = await readFile()
    const id = req.params.id
    if (Number.isNaN(Number(id))) {return res.status(400).send("you need to add a num of id")}
    if (req.method === "POST") return next()
    const currentOrder = await data.find(order => order.id === Number(id))
    if (!currentOrder) return res.status(404).send("order nut found")
    next()
}