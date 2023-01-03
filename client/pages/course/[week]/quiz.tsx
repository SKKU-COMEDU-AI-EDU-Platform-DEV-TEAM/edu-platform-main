import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { quizScoreState, userState } from "../../../recoil";
import { User, QuizType } from "../../../types";
import Layout from "../../../components/Layout";
import CourseLayout from "../../../components/CourseLayout";
import axios from "axios";
import { Accordion, Box, Button } from "@chakra-ui/react";
import Quiz from "../../../components/course/Quiz";

export default function QuizPage() {
  const router = useRouter();
  const { week } = router.query;
  const [quiz, setQuiz] = useState<QuizType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const user = useRecoilValue<User>(userState);
  const score = useRecoilValue<number[]>(quizScoreState);

  useEffect(() => {
    const fetchData = async () => {
      if(!router.isReady) return;

      const response = (await axios.get(`/api/quiz/${week}`)).data;
      setQuiz(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [router.isReady]);

  const handleOnClick = async () => {
    const token = localStorage.getItem('token');

    const response = (await axios.post(`/api/quiz/${week}`, { data: score, token: token }))
      .data;

    //error handling
    router.push(`/course/${week}/quiz/result`);
  };
  return (
    <Layout>
      <CourseLayout title={`${week}주차 퀴즈`} type={user.type} metaverse={""}>
        <>
          <Accordion defaultIndex={[0]} allowMultiple>
            <>
              {quiz.map(function (q, i) {
                return (
                  <Quiz
                    key={`quiz${i}`}
                    id={i + 1}
                    question={q.question}
                    definition={q.definition}
                    option={q.option}
                  />
                );
              })}
            </>
          </Accordion>
          <Box pt={10} display="flex" justifyContent={"left"}>
            <Button
              height="40px"
              width="20%"
              borderRadius={"2xl"}
              bgColor="rgb(144, 187, 144)"
              onClick={handleOnClick}
            >
              제출하기
            </Button>
          </Box>
        </>
      </CourseLayout>
    </Layout>
  );
}
