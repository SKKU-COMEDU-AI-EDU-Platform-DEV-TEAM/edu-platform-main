import { Box, Button, Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import TestLayout from "../components/TestLayout";

export default function TestPage() {
  const router = useRouter();

  return (
    <TestLayout>
      <>
        <Container maxW="95%" minH={150} fontSize={23} centerContent mt={10}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ipsa sit
          ad, possimus sunt quidem a omnis magni beatae! Quo, consequatur. Esse
          quidem quam in quia! Nisi pariatur sequi illum?
        </Container>
        <Box display="flex" justifyContent={"right"} mt={10}>
          <Button
            height="40px"
            width="30%"
            borderRadius={"2xl"}
            bgColor="rgb(144, 187, 144)"
            onClick={() => router.push("/test/ing")}
          >
            설문조사 시작
          </Button>
        </Box>
      </>
    </TestLayout>
  );
}
