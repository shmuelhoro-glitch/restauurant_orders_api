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
    try{
    const data = await readFile()
    const id = req.params.id
    if (Number.isNaN(Number(id))) {return res.status(400).send("you need to add a num of id")}
    if (req.method === "POST") return next()
    const currentOrder = await data.find(order => order.id === Number(id))
    if (!currentOrder) {
    const err = new Error("Order not found")
    err.statusCode = 404
    throw err
}
    next()
} catch (err) {
    next(err)
}}

export async function errorhandler(err, req, res, next){
    console.error(err.message)
    const statusCode = err.statusCode || 500
    res.status(statusCode).send(err.message || "Internal server error")
}

export async function routeNotFound(req, res, next) {
    const err = new Error("Route not found")
    err.statusCode = 404
    next(err)
}

export async function logger(req, res, next){
    console.log(`${new Date().toISOString()} | ${req.method} - ${req.url}`)
    next()
}