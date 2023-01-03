// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { mockupScore } from "../../mockupData";

type sendScoreData = {
  data: number[];
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<sendScoreData>
) {
  return res.send({ data: mockupScore });
}
