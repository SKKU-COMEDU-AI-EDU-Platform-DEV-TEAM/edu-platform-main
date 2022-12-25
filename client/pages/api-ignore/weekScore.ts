// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { mockupScore } from "../../recoil/mockupData";
import { ScoreList } from "../../types/index";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ScoreList>
) {
  return res.send(mockupScore);
}
