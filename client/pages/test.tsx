import { Box, Button, Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import TestLayout from "../components/TestLayout";

export default function TestPage() {
  const router = useRouter();

  return (
    <TestLayout>
      <>
        <Container
          maxW="95%"
          minH={150}
          fontSize={23}
          wordBreak="keep-all"
          mt={10}
          centerContent
        >
          디혁공 LMS(가칭)에 오신 것을 환영합니다! <br />
          <br />
          여러분의 학습 성향에 따른 학습자 친화적 컨텐츠 제공을 위하여 본격적인
          학습을 시작하기에 앞서 가벼운 설문조사를 진행하고자 합니다. 자신의
          학습 유형을 확인해보고 유형에 따라 맞춰지는 새로운 학습 환경을
          경험해보시기 바랍니다.
        </Container>
        <Box display="flex" justifyContent={"right"} mt={10}>
          <Button
            height="40px"
            width="30%"
            borderRadius={"2xl"}
            bgColor="rgb(144, 187, 144)"
            onClick={() => router.push("/test/ing")}
          >
            설문조사 시작
          </Button>
        </Box>
      </>
    </TestLayout>
  );
}
