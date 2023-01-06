import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../recoil";
import { User, QuizType, QuizResultType } from "../../../../types";
import Layout from "../../../../components/Layout";
import CourseLayout from "../../../../components/CourseLayout";
import axios from "axios";
import { Accordion, Box, Button, Text } from "@chakra-ui/react";
import QuizResult from "../../../../components/course/QuizResult";
import { useMutation } from "react-query";

export default function QuizResultPage() {
  const router = useRouter();
  const { week } = router.query;
  const [quiz, setQuiz] = useState<QuizType[]>([]);
  const user = useRecoilValue<User | null>(userState);
  const [result, setResult] = useState<QuizResultType>();

  const getQuiz = async () => {
    const { data } = await axios.post(`/api/quiz/result`, {
      week: week,
      token: user!.token
    });
    return data;
  };
  const { mutate } = useMutation(getQuiz, {
    onSuccess: (data) => {
      setQuiz(data.data);
      setResult(data.result);
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
      <CourseLayout title={`${week}주차 퀴즈`} type={user!.type} metaverse={""}>
        <>
          <Accordion allowMultiple>
            <>
              {quiz.map(function (q, i) {
                return (
                  <QuizResult
                    key={`quiz${i}`}
                    id={i + 1}
                    question={q.question}
                    definition={q.definition}
                    option={q.option}
                    correctAnswer={result!.correctAnswer[i]}
                    userAnswer={result!.userAnswer[i]}
                  />
                );
              })}
            </>
          </Accordion>
          <Text pl={5} pt={5} fontWeight={"bold"} fontSize={24}>
            Score: {result?.correctQuizNum}/{result?.totalQuizNum}
          </Text>
          <Box display="flex" justifyContent={"left"}>
            <Button
              height="40px"
              width="20%"
              borderRadius={"5px"}
              bgColor="rgb(144, 187, 144)"
              onClick={() => router.push(`/course/${week}/quiz`)}
            >
              다시 풀어보기
            </Button>
            <Button
              height="40px"
              width="20%"
              borderRadius={"5px"}
              bgColor="rgb(144, 187, 144)"
              marginLeft="30px"
              onClick={() => router.push(`/course/${week}/quiz/answer`)}
            >
              정답 확인하기
            </Button>
          </Box>
        </>
      </CourseLayout>
    </Layout>
  );
}
