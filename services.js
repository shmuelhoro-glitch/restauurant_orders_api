import {readFile, saveChanges} from "./storage.js"
import { errorhandler, newId } from "./utils.js"



export async function getAllOrders(req, res, next){
    try{
    const {status, customer, table} = req.query
    res.data = await readFile()
    if (status != undefined){
        res.data = res.data.filter(order => order.status === status)
    }
    if (customer != undefined){
        res.data = res.data.filter(order => (order.customer).toLowerCase() === customer.toLowerCase())
    }
    if (table != undefined){
        res.data = res.data.filter(order => order.table === Number(table))
    }
    res.send(res.data)
} catch (err) {
    next(err)
}}



export async function addOrder(req, res, next){
    try{
    const {customer, table} = req.body
    if (customer === undefined || table === undefined){
        const err = new Error("Missing required fielded")
        err.statusCode = 400
        throw err
    }
    const data = await readFile()
    const id = await newId()
    const newOrder = await {id:id,status:"NEW",customer:customer,table:table}
    data.push(newOrder)
    await saveChanges(data)
    return res.status(201).send("success")
    }
    catch (err){
        next(err)
    }
}   


export async function orderById(req, res, next){
    try{
    const data = await readFile()
    const id = req.params.id
    const currentOrder = data.find(order => order.id === Number(id))
    return res.send(currentOrder)
    } catch (err){
        next(err)
    }

}

export async function updateOrder(req, res, next){
    try{
    const data = await readFile()
    const id = req.params.id
    const {customer, table} = req.body
    if (customer === undefined && table === undefined){
        const err = new Error("Missing required fields")
        err.statusCode = 400
        throw err
    }
    const currentOrder = data.find(order => order.id === Number(id))
    if (customer != undefined){
        currentOrder.customer = customer
    }
    if (table != undefined){
        currentOrder.table = Number(table)
    }
    await saveChanges(data)
    res.send("success")
} catch (err){
    next(err)
}
}


export async function deleteOrder(req, res, next){
    try{
    const data = await readFile()
    const id = req.params.id
    const indexOrder = data.findIndex(order => order.id === Number(id))
    data.splice(indexOrder,1)
    await saveChanges(data)
    res.send("success")
    } catch (err) {
        next(err)
    }

}


export async function updateStatus(req, res, next){
    try{
    const data = await readFile()
    const id = req.params.id
    const {status} = req.body
    if (status === undefined){
        const err = new Error("Missing required fields")
        err.statusCode = 400
        throw err
    }
    const currentOrder = data.find(order => order.id === Number(id))
    if (currentOrder.status === "NEW"){
        if (status === "PREPARING" || status === "CANCELLED"){
            currentOrder.status = status
        }
    }
    else if (currentOrder.status === "PREPARING"){
        if (status === "READY" || status === "CANCELLED"){
            currentOrder.status = status
        }
    }
    else if (currentOrder.status === "READY" && status === "DELIVERED"){
        currentOrder.status = status
    }
    if (currentOrder.status === status){
        await saveChanges(data)
        return res.send("status changed successfully")
    }
    const err = new Error(`you can't change status from ${currentOrder.status} to ${status}`)
    err.statusCode = 400
    throw err
} catch (err){
    next(err)
}

}