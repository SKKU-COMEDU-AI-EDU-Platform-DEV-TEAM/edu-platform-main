import { SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { TypeDescription } from "../components/main/TypeDescription";
import Layout from "../components/Layout";
import { CourseDescription } from "../components/main/CourseDescription";
import { QuizGraph } from "../components/main/QuizGraph";
import { UserDescription } from "../components/main/UserDescription";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil";
import { TypeDescriptionList } from "../config";
import { TypeCard } from "../components/main/TypeCard";

export default function MainPage() {
  const user = useRecoilValue(userState);
  return (
    <Layout>
      <Stack
        direction={"column"}
        w={{ base: "full", xl: "container.xl" }}
        spacing={12}
        mb="10"
      >
        <Stack direction={"row"} justifyContent="space-between" pt={30}>
          <UserDescription />
          <TypeDescription />
          <CourseDescription />
        </Stack>
        {user.type == 2 && <QuizGraph />}
        <Text
          color="rgb(144, 187, 144)"
          textAlign={"center"}
          fontWeight={"bold"}
          fontSize="30"
          as="ins"
        >
          다른 학습 유형도 살펴보기
        </Text>
        <SimpleGrid spacing={20} templateColumns="repeat(3, 1fr)">
          {user.type != 1 && (
            <TypeCard
              type={TypeDescriptionList[0].type}
              description={TypeDescriptionList[0].description}
              link="/video.png"
            />
          )}
          {user.type != 2 && (
            <TypeCard
              type={TypeDescriptionList[1].type}
              description={TypeDescriptionList[1].description}
              link="/quiz.png"
            />
          )}
          {user.type != 3 && (
            <TypeCard
              type={TypeDescriptionList[2].type}
              description={TypeDescriptionList[2].description}
              link="/game.png"
            />
          )}
          {user.type != 4 && (
            <TypeCard
              type={TypeDescriptionList[3].type}
              description={TypeDescriptionList[3].description}
              link="/metaverse.png"
            />
          )}
        </SimpleGrid>
      </Stack>
    </Layout>
  );
}
