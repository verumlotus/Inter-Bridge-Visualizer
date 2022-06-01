// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { NivoLine } from '../../backendUtils/types/typeUtils';
import prisma from "../../backendUtils/dbAccess"

type Data = {
  bridge: string,
  data: NivoLine["data"]
}[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    res.send(await prisma.tvlByBridge.findMany());
}