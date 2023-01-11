import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { stepSelector, userState } from "../recoil";
import { Types, User } from "../types";
import Layout from "../components/Layout";
import CourseLayout from "../components/CourseLayout";
import BubbleChart from "../components/course/BubbleChart";
import { useMutation } from "react-query";
import { Router } from "express";
import { useRouter } from "next/router";

export default function CoursePage() {
  const router = useRouter();
  const user = useRecoilValue<User | null>(userState);
  const [metaverse, setMetaverse] = useState<string[]>([]);
  const [word, setWord] = useState<Types.Data[]>([]);
  const step = useRecoilValue<string[]>(stepSelector);

  const course = async () => {
    const { data } = await axios.post("/api/course", {
      token: user!.token
    });
    return data;
  };
  const { mutate } = useMutation(course, {
    onSuccess: (data) => {
      setMetaverse(data.metaverse);
      setWord(data.data);
    },
    onError: (err) => {
      alert(err);
    }
  });
  useEffect(() => {
    mutate();
  }, []);

  const selectedKeyHandler = (link: string) => {
    router.push(link);
  };

  const metaverseLearningCheck = async (week: number) => {
    const { data } = await axios.post("/api/metaverse", {
      week: week,
      token: user!.token
    });
    mutate();
  };

  return (
    <Layout>
      <CourseLayout
        title={`${step[0]} 학습 컨텐츠`}
        type={user!.type}
        metaverse={metaverse[0]}
      >
        <BubbleChart
          bubblesData={word}
          width={1400}
          height={700}
          textFillColor="black"
          backgroundColor="#fff"
          minValue={10}
          maxValue={60}
          metaverse={metaverse}
          type={user!.type}
          selectedCircle={selectedKeyHandler}
          metaverseLearningCheck={metaverseLearningCheck}
        />
      </CourseLayout>
    </Layout>
  );
}
