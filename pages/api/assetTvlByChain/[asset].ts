// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { NivoLine } from '../../../backendUtils/types/typeUtils';
import prisma from "../../../backendUtils/dbAccess"

type Data = {
  asset: string,
  chainTvlData: {id: string, data: NivoLine["data"]}[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {asset} = req.query
    res.send(await prisma.tvlSingleAssetByChain.findFirst({
        where: {
            asset: asset as string
        }
    }));
}