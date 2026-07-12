import fs from "fs/promises"


export async function readFile(){
    try{
    const data = await fs.readFile('./dataBase.json','utf8')
    return  JSON.parse(data)
    }
    catch (err) {
        throw new Error(err)
    }
}

export async function saveChanges(updateData){
    try{
    await fs.writeFile('./dataBase.json',JSON.stringify(updateData)) 
    return true
    }
    catch (err){
        throw new Error(err)
    }
}

