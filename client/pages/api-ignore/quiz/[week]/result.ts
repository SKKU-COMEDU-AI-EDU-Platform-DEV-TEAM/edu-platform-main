import { mockupQuizList, mockupQuizResult } from "../../../../mockupData";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { QuizResultType, QuizType } from "../../../../types";
type sendQuizResultData = {
  data: QuizType[];
  result: QuizResultType;
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<sendQuizResultData>
) {
  const { week } = req.query;
  return res.send({
    data: mockupQuizList,
    result: mockupQuizResult
  });
}
