import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil";
import { useRouter } from "next/router";
import { User } from "../../types";

export const CourseDescription = () => {
  const user = useRecoilValue<User>(userState);
  const router = useRouter();
  return (
    <Box
      verticalAlign="space-between"
      bg="#F5F5F5"
      width="300px"
      borderRadius="2xl"
      boxShadow={"base"}
    >
      <Stack spacing={6} mt={8}>
        <Text fontSize={24} textAlign={"center"} fontWeight="bold">
          최근 수강한 강의
        </Text>
        <Text
          color="rgb(144, 187, 144)"
          fontSize={20}
          textAlign={"center"}
          fontWeight={"bold"}
        >
          데이터분석기초
        </Text>
        <Button
          alignSelf={"center"}
          size="md"
          height="40px"
          width="180px"
          borderRadius={"2xl"}
          bgColor=" rgb(144, 187, 144)"
          onClick={() => router.push("/course")}
        >
          학습 바로가기
        </Button>
      </Stack>
    </Box>
  );
};
