import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function temp() {
    const data = await prisma.tvlSingleAssetByBridge.findMany()
    let result = []
    for (const infoObj of data) {
        result.push(infoObj.asset)
    }
    console.log(JSON.stringify(result));
    
}

temp()