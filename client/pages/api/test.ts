// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { mockupQuestionList } from "../../recoil/mockupData";
import { QuestionList } from "../../types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuestionList>
) {
  return res.send(mockupQuestionList);
}
