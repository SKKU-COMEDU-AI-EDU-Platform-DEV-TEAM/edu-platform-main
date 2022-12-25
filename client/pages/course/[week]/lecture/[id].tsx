import Layout from "../../../../components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import CourseLayout from "../../../../components/CourseLayout";
import { userState } from "../../../../recoil";
import { Lecture, User } from "../../../../types";
import { Box, Text, Stack } from "@chakra-ui/react";
import axios from "axios";
import { Week } from "../../../course";

export default function LecturePage() {
  const router = useRouter();
  const { week, id } = router.query;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [metaverse, setMetaverse] = useState<string>("");
  const [content, setContent] = useState<Lecture>();
  const user = useRecoilValue<User>(userState);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/lecture/${week}/${id}`);
      response.json().then((data) => setContent(data));
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <Layout>
      <CourseLayout
        title={`${id}주차 | ${content?.title} `}
        type={user.type}
        metaverse={metaverse}
      >
        <>
          <Box bg="#c0c0c0" h={57} borderRadius="3">
            <Stack direction={"row"} p={4}>
              <Text w={"2%"} fontWeight={"bold"} textAlign={"center"}>
                {String(id).padStart(2, "0")}.
              </Text>
              <Text fontWeight={"bold"} textAlign={"left"} pl={2}>
                {content?.videoTitle}
              </Text>
            </Stack>
          </Box>
          <Box bg="#d9d9d9" borderRadius="3" h={1000}></Box>
        </>
      </CourseLayout>
    </Layout>
  );
}
