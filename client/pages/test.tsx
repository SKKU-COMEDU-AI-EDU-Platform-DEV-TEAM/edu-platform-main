import { Box, Button, Container, Text } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import TestLayout from "../components/TestLayout";
import { TypeDescriptionType, User } from "../types";
import { typeSelector, userState } from "./../recoil/index";
import { useMutation } from "react-query";
import { useEffect, useState } from "react";
import { TypeDescriptionList } from "../config";

export default function TestPage() {
  const router = useRouter();
  const user = useRecoilValue<User | null>(userState);
  const type = useRecoilValue<TypeDescriptionType>(typeSelector);
  const [userTry, setUserTry] = useState<number>();

  const testReady = async () => {
    const { data } = await axios.post("/api/testReady", {
      token: user!.token
    });
    return data;
  };
  const { mutate } = useMutation(testReady, {
    onSuccess: (data) => {
      setUserTry(data.userTry);
    },
    onError: (err) => {
      alert(err);
    }
  });
  useEffect(() => {
    mutate();
  }, []);

  return (
    <TestLayout title="학습자 유형 및 학습 진도 확인 테스트 안내">
      <>
        <Container
          maxW="95%"
          minH={150}
          fontSize={18}
          wordBreak="keep-all"
          mt={10}
          centerContent
        >
          {userTry == 0 ? (
            <>
              에듀버블스(가칭)에 방문하신 {user!.userName}님 환영합니다! <br />
              에듀버블스는 adaptive learning을 기반한 코딩학습 툴로, 사용자의
              MBTI로 예측한 Kolb 학습자 유형과, 사용자의 학습 수준에 따라
              개개인에게 알맞은 학습 진도와 컨텐츠를 추천하고 있습니다.
              <br />
              <br />
              학습자들은 자신이 선호하는 배움의 방식이 다르므로 학습자의 특성을
              이해하는 것이 중요합니다. 그렇기에 효과적인 교육을 위해서는 학습
              스타일을 파악하여 그에 맞는 교육방식을 제공해주는 것이 필요합니다.
              <br />
              <br />
              따라서 에듀버블스에서는 {user!.userName}님의 학습 성향에 따른
              학습자 친화적 컨텐츠 제공을 위하여 본격적인 학습을 시작하기에 앞서
              두 단계의 설문조사(MBTI, 학습 상태 점검)를 진행하고자 합니다.
              자신의 학습 유형을 확인해보고 유형에 따라 제공되는 새로운 학습
              환경을 경험해보시기 바랍니다.
            </>
          ) : (
            <>
              반갑습니다 {user!.userName}님!
              <br />
              {user!.userName}님은 학습자 유형 및 학습 진도 확인을 위한 테스트의{" "}
              {userTry! + 1}번째 시도를 앞두고 있습니다. <br />
              <br />
              학습자님은 현재 {type.type} 유형이며, 테스트 결과에 따라 아래의 네
              유형 중 하나에 재배정되며, 새로운 학습 진도를 배정받게 됩니다.
              <Text as="i" m={2} mt={4}>
                {TypeDescriptionList[0].type} 유형,{" "}
                {TypeDescriptionList[1].type} 유형,{" "}
                {TypeDescriptionList[2].type} 유형,{" "}
                {TypeDescriptionList[3].type} 유형
              </Text>
              <br />
              테스트를 계속하려면 아래 설문조사 시작 버튼을, 현재 상태를
              유지하려면 홈으로 돌아가기 버튼을 눌러주세요
            </>
          )}
        </Container>
        <Box display="flex" justifyContent={"right"} gap={3} mt={10}>
          <Button
            height="40px"
            width="30%"
            borderRadius={"5px"}
            bgColor="rgb(144, 187, 144)"
            onClick={() => router.push("/test/mbti")}
          >
            설문조사 시작
          </Button>
          <Button
            height="40px"
            width="30%"
            borderRadius={"5px"}
            onClick={() => router.push("/main")}
          >
            홈으로 돌아가기
          </Button>{" "}
        </Box>
      </>
    </TestLayout>
  );
}
