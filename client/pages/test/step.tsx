import { Box, Button, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import TestLayout from "../../components/TestLayout";
import { lectureList } from "../../config";
import { User } from "../../types";
import { userState } from "./../../recoil/index";

export default function TestingPage() {
  const router = useRouter();
  const user = useRecoilValue<User | null>(userState);
  const [step, setStep] = useState<number>(0);

  const testStep = async () => {
    const { data } = await axios.post("/api/testStep", {
      token: user!.token,
      step: step
    });
    return data;
  };

  const { mutate } = useMutation(testStep, {
    onSuccess: () => {
      router.push("test/type");
    }
  });

  return (
    <TestLayout title="학습 레벨 확인 테스트">
      <>
        <Text pt={2} textAlign={"center"}>
          5개의 강의 중에서 현재 자신의 학습 진도에 맞는 강의를 선택하세요!
        </Text>
        <RadioGroup m={10} defaultValue="0">
          <Stack spacing={5}>
            {lectureList.map((value, i) => (
              <Radio
                size="lg"
                key={`radio${i}`}
                colorScheme="green"
                value={`${i}`}
                onChange={(e) => setStep(i)}
                borderRadius={"2px"}
              >
                <Box
                  fontWeight={"bold"}
                  p={5}
                  borderRadius={"5px"}
                  borderWidth={"1px"}
                >
                  {value[0]}
                  <Text fontWeight={"normal"} pl={7} pt={1}>
                    {value[1]}
                  </Text>
                </Box>
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
        <Box display="flex" pt={15} justifyContent={"right"}>
          <Button
            height="40px"
            width="30%"
            borderRadius={"2xl"}
            bgColor="rgb(144, 187, 144)"
            onClick={() => mutate}
          >
            다음 단계로
          </Button>
        </Box>
      </>
    </TestLayout>
  );
}
