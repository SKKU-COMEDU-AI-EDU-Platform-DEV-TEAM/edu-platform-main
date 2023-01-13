import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil";
import { User } from "../../../types";
import Layout from "../../../components/Layout";
import CourseLayout from "../../../components/CourseLayout";
import Score from "../../../components/game/Score";
import Board from "../../../components/game/Board";
import { VStack, Stack, AspectRatio, StackDivider, Box, Button } from "@chakra-ui/react";
import axios from "axios";
import { useMutation } from "react-query";

export default function GamePage() {
  const router = useRouter();
  const { week } = router.query;
  const user = useRecoilValue<User | null>(userState);
  const [cardIds, setCardIds] = useState<number[]>([]);

  useEffect(() => {
    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    ids.sort(() => 0.5 - Math.random());
    setCardIds(ids);
  }, []);

  const game = async () => {
    const { data } = await axios.post("/api/game/", {
      week: week,
      token: user!.token
    });
  };
  useEffect(() => {
    game();
  }, []);

  return (
    <Layout>
      <CourseLayout
        title={`${week}주차 빈칸을 맞춰라!`}
        type={user!.type}
        metaverse={""}
      >
        <>
          <Stack
            bg="#d9d9d9"
            borderRadius="3"
            maxH="fit-content"
            p="5%"
            spacing={20}
            divider={<StackDivider borderColor="gray.900" />}
          >
            <AspectRatio ratio={16 / 9}>
              <iframe
                title="Step1"
                src="https://scratch.mit.edu/projects/784127129/embed"
                width="485"
                height="402"
                scrolling="no"
                allowFullScreen
              />
            </AspectRatio>
          </Stack>
          <Box display="flex" justifyContent={"right"}>
            <Button
              height="40px"
              width="20%"
              borderRadius={"5px"}
              bgColor="rgb(144, 187, 144)"
              onClick={() => router.push(`/course`)}
            >
              완료
            </Button>
          </Box>
        </>
      </CourseLayout>
    </Layout>
  );
}

/** 
export default function GamePage() {
  const router = useRouter();
  const { week } = router.query;
  const user = useRecoilValue<User | null>(userState);
  const [cardIds, setCardIds] = useState<number[]>([]);

  useEffect(() => {
    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    ids.sort(() => 0.5 - Math.random());
    setCardIds(ids);
  }, []);

  const game = async () => {
    const { data } = await axios.post("/api/game/", {
      week: week,
      token: user!.token
    });
  };
  useEffect(() => {
    game();
  }, []);

  return (
    <Layout>
      <CourseLayout
        title={`${week}주차 메모리 게임`}
        type={user!.type}
        metaverse={""}
      >
        <VStack>
          <Score />
          <Board cardIds={cardIds} />
        </VStack>
      </CourseLayout>
    </Layout>
  );
}
*/