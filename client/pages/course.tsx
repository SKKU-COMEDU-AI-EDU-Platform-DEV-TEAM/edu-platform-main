import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil";
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

  return (
    <Layout>
      <CourseLayout
        title="데이터분석기초 학습 콘텐츠"
        type={user!.type}
        metaverse={metaverse[0]}
      >
        <BubbleChart
          bubblesData={word}
          width={1400}
          height={650}
          textFillColor="black"
          backgroundColor="#fff"
          minValue={10}
          maxValue={60}
          metaverse={metaverse}
          type={user!.type}
          selectedCircle={selectedKeyHandler}
        />
      </CourseLayout>
    </Layout>
  );
}
