import { LayoutDefaultProps } from "../types";
import { Box, Divider, Image, Stack } from "@chakra-ui/react";

export default function EnterLayout({ children }: LayoutDefaultProps) {
  return (
    <Box
      position="fixed"
      top="50%"
      left="50%"
      transform={"translate(-50%,-50%)"}
      bg="#ffffff"
      boxShadow={"base"}
      w="xl"
      borderWidth="1px"
      borderRadius="5px"
      p={16}
      pt={12}
    >
      <Stack direction="row" justifyContent={"space-between"}>
        <Image
          w={"80%"}
          objectFit="contain"
          src="/DIHYEOKGONG.png"
          alt="DIHYEOKGONG"
        />
        <Image w={"10%"} objectFit="contain" src="/SKKU.png" alt="SKKU" />
      </Stack>
      <Divider mt={3} mb={3} />
      {children}
    </Box>
  );
}
