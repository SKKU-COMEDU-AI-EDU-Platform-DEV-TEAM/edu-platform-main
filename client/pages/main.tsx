import { Group } from "@visx/group";
import { Text as VisxTtext } from "@visx/text";
import { ScaleSVG } from "@visx/responsive";
import { Divider, Flex, Stack, Text } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { QuizGraph } from "../components/main/QuizGraph";
import { RadarAxis, RadarMark } from "../components/main/RaderChart";
import { stepSelector, typeSelector, userState } from "../recoil";
import { TypeDescriptionType, User } from "../types";
import { AVERAGE, RADAR_HEIGHT, RADAR_WIDTH, RADER_MARGIN } from "../config";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { useMutation } from "react-query";
import { useEffect, useState } from "react";
import { schemeCategory10 as COLOR } from "d3-scale-chromatic";

export default function MainPage() {
  const user = useRecoilValue<User | null>(userState);
  const type = useRecoilValue<TypeDescriptionType>(typeSelector);
  const step = useRecoilValue<string[]>(stepSelector);
  const [mbti, setMbti] = useState<string>();
  const [kolb, setKolb] = useState<number[]>();
  const [rader, setRader] = useState<number[]>();
  const main = async () => {
    const { data } = await axios.post("/api/main", {
      token: user!.token
    });
    return data;
  };
  const { mutate } = useMutation(main, {
    onSuccess: (data) => {
      setMbti(data.mbti);
      setKolb(data.kolbProba);
      setRader(data.rader);
    },
    onError: (err) => {
      alert(err);
    }
  });
  useEffect(() => {
    mutate();
  }, []);

  return (
    <Layout>
      <Stack
        direction={"column"}
        w={{ base: "full", xl: "container.xl" }}
        spacing={5}
        mb="10"
      >
        <Stack direction="row" justifyContent="space-between" gap={5} pt={30}>
          <Flex
            bg="#F5F5F5"
            borderRadius="5px"
            boxShadow={"base"}
            fontWeight="bold"
            textAlign="center"
            direction={"column"}
            p={10}
            pt={30}
            pb={30}
            w="23%"
          >
            <Text fontSize={20} color="gray">
              Kolb 학습 유형
            </Text>
            <Text mt={2} fontSize={30}>
              {type.type}
            </Text>
          </Flex>
          <Flex
            bg="#F5F5F5"
            borderRadius="5px"
            boxShadow={"base"}
            fontWeight="bold"
            textAlign={"center"}
            direction={"column"}
            w="23%"
            p={16}
            pt={30}
            pb={30}
          >
            <Text fontSize={20} color="gray">
              My MBTI
            </Text>
            <Text fontSize={35}>{mbti}</Text>
          </Flex>
          <Flex
            w="50%"
            bg="#F5F5F5"
            justifyContent="space-around"
            borderRadius="5px"
            boxShadow={"base"}
            fontWeight="bold"
            textAlign="center"
            direction={"row"}
            p={10}
            pt={30}
            pb={30}
          >
            <Stack>
              <Text fontSize={20} color="gray">
                현재 학습 Level
              </Text>
              <Text mt={2} fontSize={30}>
                {step[0]}
              </Text>
            </Stack>
            <Divider orientation="vertical" ml={5} mr={5} />
            <Stack>
              <Text fontSize={20} color="gray">
                추천 학습 콘텐츠
              </Text>
              <Text fontSize={30}>{type.content}</Text>
            </Stack>
          </Flex>
        </Stack>
        {/* <ScaleSVG width={RADAR_WIDTH} height={RADAR_HEIGHT}>
          <Group top={RADAR_HEIGHT / 2} left={RADAR_WIDTH / 2}>
            <RadarAxis
              width={RADAR_WIDTH}
              height={RADAR_HEIGHT}
              margin={RADER_MARGIN}
            />
            <RadarMark
              data={rader}
              color={COLOR[0]}
              width={RADAR_WIDTH}
              height={RADAR_HEIGHT}
              margin={RADER_MARGIN}
            />
            <RadarMark
              data={AVERAGE}
              color={COLOR[7]}
              width={RADAR_WIDTH}
              height={RADAR_HEIGHT}
              margin={RADER_MARGIN}
            />
            <VisxTtext
              x="80"
              y="90"
              fontWeight="bold"
              fontSize="8px"
              fill="#7f7f7f"
            >
              ■ Student Score
            </VisxTtext>
            <VisxTtext
              x="80"
              y="80"
              fontSize="8px"
              fontWeight="bold"
              fill="#1f77b4"
            >
              ■ My Score
            </VisxTtext>
          </Group>
        </ScaleSVG> */}
        {user!.type == 2 && <QuizGraph />}
      </Stack>
    </Layout>
  );
}
