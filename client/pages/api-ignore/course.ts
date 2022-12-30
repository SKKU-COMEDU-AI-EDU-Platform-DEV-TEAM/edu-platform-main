// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  mockupBubbleChartData,
  mockupMetaverseList
} from "../../recoil/mockupData";
import { Types } from "../../types";

type sendWeekData = {
  data: Types.Data[];
  metaverse: string[];
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<sendWeekData>
) {
  return res.send({
    data: mockupBubbleChartData,
    metaverse: mockupMetaverseList
  });
}
