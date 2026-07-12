import fs from "fs/promises"


export async function readFile(){
    try{
    const data = await fs.readFile('./dataBase.json','utf8')
    if (data === null){return []}
    return JSON.parse(data)
    }
    catch (err) {
        throw new Error(err)
    }
}

export async function saveChanges(updateData){
    try{
    await fs.writeFile('./dataBase.json',JSON.stringify(updateData,null,2))
    return true
    }
    catch (err){
        throw new Error(err)
    }
}

