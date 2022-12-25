import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { LayoutDefaultProps } from "../types";

export default function TestLayout({ children }: LayoutDefaultProps) {
  return (
    <Box
      position="fixed"
      top="50%"
      left="50%"
      transform={"translate(-50%,-50%)"}
      bg="#ffffff"
      boxShadow={"base"}
      w="3xl"
      maxH="2xl"
      borderWidth="1px"
      borderRadius="2xl"
      p={10}
      overflow="scroll"
    >
      <Stack direction="row" justifyContent={"right"}>
        <Text
          w="90%"
          fontWeight="bold"
          fontSize={27}
          mt={4}
          textAlign={"center"}
        >
          학습 성향 분석을 위한 설문
        </Text>
        <Image w={"7%"} objectFit="contain" src="/SKKU.png" alt="SKKU" />
      </Stack>
      {children}
    </Box>
  );
}
