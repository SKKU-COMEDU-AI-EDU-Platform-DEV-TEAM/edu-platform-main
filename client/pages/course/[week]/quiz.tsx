import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { quizScoreState, userState } from "../../../recoil";
import { User, QuizType } from "../../../types";
import Layout from "../../../components/Layout";
import CourseLayout from "../../../components/CourseLayout";
import axios from "axios";
import { Accordion, Box, Button } from "@chakra-ui/react";
import Quiz from "../../../components/course/Quiz";
import { useMutation } from "react-query";

export default function QuizPage() {
  const router = useRouter();
  const { week } = router.query;
  const [quiz, setQuiz] = useState<QuizType[]>([]);
  const user = useRecoilValue<User | null>(userState);
  const score = useRecoilValue<number[]>(quizScoreState);

  const getQuiz = async () => {
    const { data } = await axios.post("/api/quiz", {
      week: week,
      token: user!.token
    });
    return data;
  };
  const mutation = useMutation(getQuiz, {
    onSuccess: (data) => {
      setQuiz(data.data);
    },
    onError: (err) => {
      alert(err);
    }
  });
  useEffect(() => {
    mutation.mutate();
  }, []);

  const quizGrade = async () => {
    const { data } = await axios.post(`/api/quizGrade`, {
      week: week,
      data: score,
      token: user!.token
    });

    return data;
  };
  const { mutate } = useMutation(quizGrade, {
    onSuccess: () => {
      router.push(`/course/${week}/quiz/result`);
    },
    onError: (err) => {
      alert(err);
    }
  });

  return (
    <Layout>
      <CourseLayout title={`${week}주차 퀴즈`} type={user!.type} metaverse={""}>
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
              borderRadius={"5px"}
              bgColor="rgb(144, 187, 144)"
              onClick={() => mutate()}
            >
              제출하기
            </Button>
          </Box>
        </>
      </CourseLayout>
    </Layout>
  );
}
