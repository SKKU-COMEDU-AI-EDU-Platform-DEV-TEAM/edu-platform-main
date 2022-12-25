// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { mockupLectureList } from "../../recoil/mockupData";
import { Lecture } from "../../types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Lecture>
) {
  const week = req.query["week"];
  const id = req.query["id"];
  console.log("q", req.query, week, id);
  return res.send(mockupLectureList[Number(week) - 1][Number(id) - 1]);
}
