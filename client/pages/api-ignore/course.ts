// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { mockupWeekDataList } from "../../recoil/mockupData";
import { WeekData } from "../../types";

type sendWeekData = {
  data: WeekData[];
  metaverse: string;
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<sendWeekData>
) {
  return res.send({
    data: mockupWeekDataList,
    metaverse: "https://chakra-ui.com/docs/components/link/usage#"
  });
}
