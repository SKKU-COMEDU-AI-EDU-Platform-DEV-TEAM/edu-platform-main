import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil";
import { User, QuizType } from "../../../types";
import Layout from "../../../components/Layout";
import CourseLayout from "../../../components/CourseLayout";
import axios from "axios";
import { Accordion } from "@chakra-ui/react";
import Quiz from "../../../components/course/Quiz";

export default function QuizPage() {
  const router = useRouter();
  const { week } = router.query;
  const [quiz, setQuiz] = useState<QuizType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const user = useRecoilValue<User>(userState);

  useEffect(() => {
    const fetchData = async () => {
      const response = (await axios.get(`/api/quiz/${week}`)).data;
      setQuiz(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <CourseLayout title={`${week}주차 퀴즈`} type={user.type} metaverse={""}>
        <Accordion>
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
      </CourseLayout>
    </Layout>
  );
}
