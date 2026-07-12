import {readFile, saveChanges} from "./storage.js"
import { newId } from "./utils.js"



export async function getAllOrders(req, res){
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
    return res.send("error")
}}



export async function addOrder(req, res){
    const {customer, table} = req.body
    if (customer === undefined || table === undefined){
        return res.status(400).send("no have data")}
    const data = await readFile()
    const id = await newId()
    const newOrder = await {id:id,status:"NEW",customer:customer,table:table}
    data.push(newOrder)
    await saveChanges(data)
    return res.send("success")
}   

