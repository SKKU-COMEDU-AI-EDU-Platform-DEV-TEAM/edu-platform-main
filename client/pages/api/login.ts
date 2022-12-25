// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../types";
import { mockupUser } from "./../../recoil/mockupData";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  //   console.log(req.body);
  return res.send(mockupUser);
}
