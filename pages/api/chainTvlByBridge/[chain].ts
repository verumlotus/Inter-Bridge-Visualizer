// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { NivoLine } from '../../../backendUtils/types/typeUtils';
import prisma from "../../../backendUtils/dbAccess"

type Data = {
  chain: string,
  bridgeTvlData: {id: string, data: NivoLine["data"]}[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {chain} = req.query
    res.send(await prisma.tvlSingleChainByBridge.findFirst({
        where: {
            chain: chain as string
        }
    }));
}