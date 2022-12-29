import {
  Box,
  Progress,
  Stack,
  StackDivider,
  Text,
  Link
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { userState } from "../../recoil";
import { Content, Id, LayoutDefaultProps, User, WeekData } from "../../types";
import Layout from "../Layout";
import CourseLayout from "../CourseLayout";

export const WeekContent = ({
  children,
  ...props
}: LayoutDefaultProps & Content) => {
  const { week, id, link, contentType } = props;

  return (
    <Link href={link} isExternal={contentType == 2}>
      <Stack direction={"row"} divider={<StackDivider />} p={4}>
        <Text w={"5%"} fontWeight={"bold"} textAlign={"center"}>
          {String(id).padStart(2, "0")}
        </Text>
        <Text w={"75%"} fontWeight={"bold"} textAlign={"left"} pl={2}>
          {children}
        </Text>
      </Stack>
    </Link>
  );
};

export const Week = (props: Id & WeekData) => {
  const { id, subject, contents, isdone } = props;
  const numContents: number = 1 + contents.video.length;
  const numVideoDone: number = isdone.video.filter((done) => done === 1).length;
  const numQuizDone: number = isdone.quiz === 1 ? 1 : 0;
  const [isOnclick, setisOnclick] = useState(false);
  var progress: number = ((numVideoDone + numQuizDone) / numContents) * 100;

  const user = useRecoilValue(userState);
  return (
    <Stack
      direction={"column"}
      spacing={0}
      onClick={() => setisOnclick(!isOnclick)}
    >
      <Box bg="#c0c0c0" h={57} borderRadius="3">
        <Stack direction={"row"} divider={<StackDivider />} p={4}>
          <Text w={"5%"} fontWeight={"bold"} textAlign={"center"}>
            {id}주차
          </Text>
          <Text w={"75%"} fontWeight={"bold"} textAlign={"left"} pl={2}>
            {subject}
          </Text>
          <>
            <Progress
              borderRadius={10}
              w={"20%"}
              mt={1}
              size="lg"
              value={progress}
              ml="2"
            />
            <Text mb={2} ml={2}>
              {numVideoDone + numQuizDone}/{numContents}
            </Text>
          </>
        </Stack>
      </Box>
      {isOnclick && (
        <Box bg="#d9d9d9" borderRadius="3">
          {contents.video.map((v, i) => (
            <WeekContent key={i} week={id} id={i + 1} link={v} contentType={0}>
              <>강의영상</>
            </WeekContent>
          ))}
          <WeekContent
            week={id}
            id={numContents}
            link={contents.quiz}
            contentType={1}
          >
            <>퀴즈</>
          </WeekContent>
          {user.type == 4 && (
            <WeekContent
              week={id}
              id={numContents + 1}
              link={contents.metaverse}
              contentType={2}
            >
              <>
                이번 주 메타버스 링크 바로가기
                <ExternalLinkIcon mx="2px" ml="1" />
              </>
            </WeekContent>
          )}
        </Box>
      )}
    </Stack>
  );
};

export default function CoursePage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [weekData, setWeekData] = useState<(Id & WeekData)[]>([]);
  const [metaverse, setMetaverse] = useState<string>("");
  const router = useRouter();
  const user = useRecoilValue<User>(userState);

  useEffect(() => {
    const fetchData = async () => {
      const response = (await axios.get("api/course")).data;
      setWeekData(response.data);
      setMetaverse(response.metaverse);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <CourseLayout
        title="데이터분석기초 학습 콘텐츠"
        type={user.type}
        metaverse={metaverse}
      >
        <>
          {weekData.map((data, i) => (
            <Week
              key={i}
              id={i + 1}
              subject={data.subject}
              contents={data.contents}
              isdone={data.isdone}
            />
          ))}
        </>
      </CourseLayout>
    </Layout>
  );
}
