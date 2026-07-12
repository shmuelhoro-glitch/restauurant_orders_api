import {readFile} from "./storage.js"

export async function getAllOrders(req, res){
    try{
    const {status, customer, table} = req.query
    console.log(status,customer,table)
    const data = await readFile()
    if (status != undefined){
        data.filter(order => order.status === status)
    }
    if (customer != undefined){
        data.filter(order => (order.customer).toLowerCase === customer.toLowerCase())
    }
    if (table != undefined){
        data.filter(order => order.table === Number(table))
    }
    res.send(data)
} catch (err) {
    throw new Error(err.message)
}
}