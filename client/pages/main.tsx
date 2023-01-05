import { Divider, Flex, Stack, Text } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { QuizGraph } from "../components/main/QuizGraph";
import { stepSelector, typeSelector, userState } from "../recoil";
import { useRecoilValue } from "recoil";
import { TypeDescriptionType, User } from "../types";
import axios from "axios";
import { useMutation } from "react-query";
import { useEffect, useState } from "react";

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
        {user!.type == 2 && <QuizGraph />}
      </Stack>
    </Layout>
  );
}
