import { Box, Button, Container, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { typeSelector, userState } from "../../recoil";
import axios from "axios";
import { TypeDescriptionType, User } from "../../types";
import TestLayout from "../../components/TestLayout";
import { useMutation } from "react-query";
import { useEffect } from "react";

export default function TestEndPage() {
  const router = useRouter();
  const [user, setUser] = useRecoilState<User | null>(userState);
  const type = useRecoilValue<TypeDescriptionType>(typeSelector);

  const testResult = async () => {
    const { data } = await axios.post("/api/testResult", {
      token: user!.token
    });
    return data;
  };
  const { mutate } = useMutation(testResult, {
    onSuccess: (data) => {
      setUser({
        ...user,
        type: data.type,
        step: data.step
      });
    },
    onError: (error) => {
      alert(error);
    }
  });
  useEffect(() => {
    mutate();
  }, []);

  return (
    <TestLayout title="학습 유형 테스트 결과">
      <>
        <Container
          maxW="95%"
          fontSize={18}
          centerContent
          mt={10}
          wordBreak="keep-all"
        >
          AI-EDU는 adaptive learning을 기반한 코딩학습 툴로, 사용자의 MBTI로
          예측한 Kolb 학습자 유형과, 사용자의 학습 수준에 따라 개개인에게 알맞은
          학습 진도와 컨텐츠를 추천합니다.
          <br /> <br />
          {user!.userName}님은 {type?.type} 유형!
          <br />
          해당 유형은 {type?.description}
          <br />
          {type?.characteristic} {type?.dependency}
          <br />
          <br />
          따라서 {user!.userName}님에게 추천하는 학습 컨텐츠는 {type?.recommend}
        </Container>
        <Box display="flex" justifyContent={"right"} mt={10}>
          <Button
            height="40px"
            width="30%"
            borderRadius={"5px"}
            bgColor="rgb(144, 187, 144)"
            onClick={() => router.push("/main")}
          >
            학습 바로가기
          </Button>
        </Box>
      </>
    </TestLayout>
  );
}
