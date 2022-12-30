import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  bestScoreState,
  moveState,
  quizScoreState,
  userState
} from "../../../recoil";
import { User, QuizType } from "../../../types";
import Layout from "../../../components/Layout";
import CourseLayout from "../../../components/CourseLayout";
import axios from "axios";
import Score from "../../../components/game/Score";
import Board from "../../../components/game/Board";
import { Center, HStack, Stack, VStack } from "@chakra-ui/react";

const cardIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
cardIds.sort(() => 0.5 - Math.random());

export default function GamePage() {
  const router = useRouter();
  const { week } = router.query;
  const user = useRecoilValue<User>(userState);

  return (
    <Layout>
      <CourseLayout
        title={`${week}주차 메모리 게임`}
        type={user.type}
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
