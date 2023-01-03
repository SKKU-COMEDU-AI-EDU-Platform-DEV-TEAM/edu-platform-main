import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil";
import { User } from "../../../types";
import Layout from "../../../components/Layout";
import CourseLayout from "../../../components/CourseLayout";
import Score from "../../../components/game/Score";
import Board from "../../../components/game/Board";
import { VStack } from "@chakra-ui/react";

export default function GamePage() {
  const router = useRouter();
  const { week } = router.query;
  const user = useRecoilValue<User>(userState);
  const [cardIds, setCardIds] = useState<number[]>([]);

  useEffect(() => {
    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    ids.sort(() => 0.5 - Math.random());
    setCardIds(ids);
  }, []);

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
