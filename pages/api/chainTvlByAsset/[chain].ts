// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { NivoLine } from '../../../backendUtils/types/typeUtils';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

type Data = {
  chain: string,
  assetTvlData: {id: string, data: NivoLine["data"]}[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {chain} = req.query
    res.send(await prisma.tvlSingleChainByAsset.findFirst({
        where: {
            chain: chain as string
        }
    }));
}