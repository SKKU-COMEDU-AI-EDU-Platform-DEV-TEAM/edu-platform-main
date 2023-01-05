import {
  Box,
  Button,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Stack,
  Text
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";
import TestLayout from "../../components/TestLayout";
import { useRecoilValue } from "recoil";
import { userState } from "./../../recoil/index";
import { User } from "../../types";
import { labelStyles, MBTI, numList } from "../../config";

export default function TestingPage() {
  const router = useRouter();
  const user = useRecoilValue<User | null>(userState);
  const [mbtiValue, setmbtiValue] = useState<number[]>([5, 5, 5, 5]);

  function handleMbtiOnchange(question: number, answer: number) {
    const copyArray = [...mbtiValue];
    copyArray[question] = answer;
    setmbtiValue(copyArray);
  }

  const testMBTI = async () => {
    const { data } = await axios.post("/api/testMbti", {
      token: user!.token,
      mbti: mbtiValue
    });
    return data;
  };

  const { mutate } = useMutation(testMBTI, {
    onSuccess: () => {
      router.push("step");
    },
    onError: (error) => {
      console.log(error);
    }
  });

  return (
    <TestLayout title="MBTI">
      <>
        <Stack direction="column" spacing={5} m={10}>
          {MBTI.map((mbti, i) => (
            <>
              <Text key={`${mbti[i]}-1`} fontSize="25" as="b">
                {mbti[0][0]} vs {mbti[1][0]}
              </Text>
              <Slider
                key={`slider${i}`}
                defaultValue={5}
                min={0}
                max={10}
                step={1}
                onChange={(e) => handleMbtiOnchange(i, e)}
              >
                <SliderMark
                  value={-0.4}
                  mt="-4"
                  fontSize="xl"
                  fontWeight="bold"
                >
                  {mbti[0][0]}
                </SliderMark>
                {numList.map((num, j) => (
                  <SliderMark
                    key={`sliderMark${mbti[i]}${j}`}
                    color={num == 0 ? "gray.400" : "black"}
                    value={j - 0.1}
                    {...labelStyles}
                  >
                    {num}
                  </SliderMark>
                ))}
                <SliderMark
                  value={10.3}
                  mt="-3"
                  fontSize="xl"
                  fontWeight="bold"
                >
                  {mbti[1][0]}
                </SliderMark>
                <SliderTrack>
                  <Box position="relative" right={10} />
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Text key={`${mbti[i]}-2`} pt={5} as="i">
                {mbti[0][0]} 성향을 가진 사람은 이런 것을 선호해요 -{" "}
                {mbti[0][1]}
              </Text>
              <Text key={`${mbti[i]}-3`} pb={10} as="i">
                {mbti[1][0]} 성향을 가진 사람은 이런 것을 선호해요 -{" "}
                {mbti[1][1]}
              </Text>
            </>
          ))}
        </Stack>
        <Box display="flex" justifyContent={"right"}>
          <Button
            height="40px"
            width="30%"
            borderRadius={"5px"}
            bgColor="rgb(144, 187, 144)"
            onClick={() => mutate()}
          >
            다음 단계로
          </Button>
        </Box>
      </>
    </TestLayout>
  );
}
