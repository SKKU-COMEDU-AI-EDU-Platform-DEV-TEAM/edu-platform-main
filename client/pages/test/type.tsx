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
import { useEffect, useState } from "react";
import TestLayout from "../../components/TestLayout";
import { User } from "../../types";
import { useRecoilValue } from "recoil";
import { userState } from "./../../recoil/index";
import { useMutation } from "react-query";
import { labelStyles, numList } from "../../config";

export default function TestingTypePage() {
  const router = useRouter();
  const [qList, setQList] = useState<string[]>([]);
  const [typeValue, setTypeValue] = useState<number[]>([]);
  const user = useRecoilValue<User | null>(userState);

  function handleTypeOnchange(question: number, answer: number) {
    const copyArray = [...typeValue];
    copyArray[question] = answer;
    setTypeValue(copyArray);
  }

  const testType = async () => {
    const { data } = await axios.post("/api/testType", {
      type: typeValue,
      token: user!.token
    });
    return data;
  };
  const { mutate } = useMutation(testType, {
    onMutate: () => {
      const typefiltered = typeValue.filter(function (x) {
        return x !== undefined;
      });
      if (typefiltered.length != qList.length) {
        alert("학습 성향 분석 질문 중 답변하지 않은 문항이 있습니다!");
        return;
      }
    },
    onSuccess: () => {
      router.push("/test/end");
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const testTypeQuestion = async () => {
    const { data } = await axios.post("/api/testTypeQuestion", {
      token: user!.token
    });
    return data;
  };
  const mutation = useMutation(testTypeQuestion, {
    onSuccess: (data) => {
      setQList(data.data);
    },
    onError: (error) => {
      console.log(error);
    }
  });
  useEffect(() => {
    mutation.mutate();
  }, []);

  return (
    <TestLayout title="학습 진도 확인 조사">
      <>
        <Stack direction="column" spacing={5} m={10} mt={0}>
          {qList.map((q, i) => (
            <>
              <Text fontWeight={"bold"} pt={10} fontSize={15} key={`text${i}`}>
                {i + 1}. {q}
              </Text>
              <Slider
                key={`slider${i}`}
                defaultValue={0}
                min={0}
                max={7}
                colorScheme="green"
                step={1}
                onChange={(e) => handleTypeOnchange(i, e)}
              >
                {numList.slice(0, 8).map((num, i) => (
                  <SliderMark
                    key={`num${i}`}
                    value={i + 0.1}
                    fontWeight={i == 0 || i == 7 ? "bold" : "normal"}
                    {...labelStyles}
                  >
                    {i}
                  </SliderMark>
                ))}
                <SliderTrack>
                  <Box position="relative" right={10} />
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </>
          ))}
        </Stack>
        <Box display="flex" justifyContent={"right"} pt={10}>
          <Button
            height="40px"
            width="30%"
            borderRadius={"5px"}
            bgColor="rgb(144, 187, 144)"
            onClick={() => mutate()}
          >
            제출하기
          </Button>
        </Box>
      </>
    </TestLayout>
  );
}
