import { Box, Text } from "@chakra-ui/react";
import { ScaleSVG } from "@visx/responsive";
import { AREA_HEIGHT, AREA_MARGIN, AREA_WIDTH } from "../../config";
import { AreaAxis, AreaMark } from "./AreaChart";
import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import { User } from "../../types";
import { userState } from "../../recoil";

export const QuizGraph = () => {
  const [score, setScore] = useState<number[]>([]);
  const user = useRecoilValue<User | null>(userState);

  const postScore = async () => {
    const { data } = await axios.post("/api/score", {
      token: user!.token
    });
    return data;
  };
  const { mutate } = useMutation(postScore, {
    onSuccess: (data) => {
      setScore(data.data);
    },
    onError: (error) => {
      console.log(error);
    }
  });
  useEffect(() => {
    mutate();
  }, []);

  return (
    <Box
      h={"fit-content"}
      p={30}
      display="flex"
      flexDirection={"column"}
      justifyContent="center"
      borderRadius="2xl"
      boxShadow={"base"}
    >
      <Text textAlign={"center"} fontSize="26" fontWeight={"bold"}>
        주차 별 퀴즈 점수
      </Text>
      <ScaleSVG width={AREA_WIDTH} height={AREA_HEIGHT}>
        <AreaAxis
          width={AREA_WIDTH}
          height={AREA_HEIGHT}
          margin={AREA_MARGIN}
          data={score}
          color={"gray"}
        />
        <AreaMark
          width={AREA_WIDTH}
          height={AREA_HEIGHT}
          margin={AREA_MARGIN}
          data={score}
          color={"green"}
        />
      </ScaleSVG>
    </Box>
  );
};
