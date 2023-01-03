// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { mockupQuestionList } from "../../mockupData";

type sendQuestionData = {
  data: string[];
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<sendQuestionData>
) {
  return res.send({ data: mockupQuestionList });
}
