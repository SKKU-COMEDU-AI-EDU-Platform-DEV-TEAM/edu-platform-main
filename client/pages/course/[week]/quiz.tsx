import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil";
import { User } from "../../../types";
import Layout from "../../../components/Layout";
import CourseLayout from "../../../components/CourseLayout";

export default function QuizPage() {
  const router = useRouter();
  const { week, id } = router.query;
  console.log(week, id);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [metaverse, setMetaverse] = useState<string>("");
  const user = useRecoilValue<User>(userState);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <CourseLayout title="1주차 퀴즈" type={user.type} metaverse={metaverse}>
        <>Quiz page</>
      </CourseLayout>
    </Layout>
  );
}
