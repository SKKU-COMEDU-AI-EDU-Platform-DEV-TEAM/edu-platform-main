// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { mockupType } from "../../mockupData";
import { Type } from "../../types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Type>
) {
  return res.send(mockupType);
}
