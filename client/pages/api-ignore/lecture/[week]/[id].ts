// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { mockupLectureList } from "../../../../mockupData";
import { Lecture } from "../../../../types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Lecture>
) {
  const { week, id } = req.query;
  return res.send(mockupLectureList[Number(id) - 1]);
}
