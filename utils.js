import { readFile } from "./storage.js";

export async function newId(){
    const data = await readFile()
    let lastId = 1
    for await (let order of data){
        if (order.id && order.id > lastId){
            lastId = order.id
        }
    }
    return lastId +1
}
