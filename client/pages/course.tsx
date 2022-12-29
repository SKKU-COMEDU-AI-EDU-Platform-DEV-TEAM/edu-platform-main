import {
  Box,
  Progress,
  Stack,
  StackDivider,
  Text,
  Link,
  Button
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil";
import {
  Content,
  Id,
  LayoutDefaultProps,
  Types,
  User,
  WeekData
} from "../types";
import Layout from "../components/Layout";
import CourseLayout from "../components/CourseLayout";
import BubbleChart from "../components/course/BubbleChart";

export default function CoursePage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [metaverse, setMetaverse] = useState<string[]>([]);
  const router = useRouter();
  const user = useRecoilValue<User>(userState);
  const [data, setData] = useState<Types.Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = (await axios.get("api/course")).data;
      setMetaverse(response.metaverse);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <CourseLayout
        title="데이터분석기초 학습 콘텐츠"
        type={user.type}
        metaverse={metaverse[0]}
      >
        <BubbleChart
          bubblesData={data}
          width={1400}
          height={650}
          textFillColor="black"
          backgroundColor="#fff"
          minValue={10}
          maxValue={60}
          metaverse={metaverse}
          type={user.type}
        />
      </CourseLayout>
    </Layout>
  );
}
