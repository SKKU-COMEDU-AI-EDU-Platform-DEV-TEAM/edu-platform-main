import { Box, Button, Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { typeSelector, userState } from "../../recoil";
import { useEffect, useState } from "react";
import axios from "axios";
import { Type, TypeDescription, User } from "../../types";
import TestLayout from "../../components/TestLayout";

export const TestEndPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useRecoilState<User>(userState);
  const type = useRecoilValue<TypeDescription>(typeSelector);

  useEffect(() => {
    const fetchData = async () => {
      const response = (await axios.get("../api/testResult")).data;
      const updatedUser = {
        userName: user.userName,
        userId: user.userId,
        userEmail: user.userEmail,
        type: response.type
      };
      setUser(updatedUser);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <TestLayout>
      <>
        <Container maxW="95%" fontSize={18} centerContent mt={10}>
          설문 마무리 멘트 Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Ut ipsa sit ad, possimus sunt quidem a omnis magni beatae! Quo,
          consequatur. Esse quidem quam in quia! Nisi pariatur sequi illum?
        </Container>
        <Container maxW="95%" fontSize={23} centerContent mt={10}>
          {user.userName}님은 {type.type} 유형!
          <br />
          {type.description}.
        </Container>
        <Box display="flex" justifyContent={"right"} mt={10}>
          <Button
            height="40px"
            width="30%"
            borderRadius={"2xl"}
            bgColor="rgb(144, 187, 144)"
            onClick={() => router.push("/main")}
          >
            학습 바로가기
          </Button>
        </Box>
      </>
    </TestLayout>
  );
};
