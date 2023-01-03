// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { mockupQuizList } from "../../../mockupData";
import { QuizType } from "../../../types";
type sendQuizData = {
  data: QuizType[];
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<sendQuizData>
) {
  const { week } = req.query;
  return res.send({ data: mockupQuizList });
}
