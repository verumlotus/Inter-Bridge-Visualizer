// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { NivoLine } from '../../backendUtils/types/typeUtils';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

type Data = {
  chain: string,
  data: NivoLine["data"]
}[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    res.send(await prisma.tvlByChain.findMany());
}