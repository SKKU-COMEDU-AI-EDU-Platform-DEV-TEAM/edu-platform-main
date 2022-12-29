import { Box, Stack, Text } from "@chakra-ui/react";
import { ScaleSVG } from "@visx/responsive";
import { AREA_HEIGHT, AREA_MARGIN, AREA_WIDTH } from "../../config";
import { AreaAxis, AreaMark } from "./AreaChart";
import axios from "axios";
import { useEffect, useState } from "react";

export const QuizGraph = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [score, setScore] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = (await axios.get("api/score")).data;
      setScore(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Box
      bg="#F5F5F5"
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
