import { Box } from "@chakra-ui/react";
import { LayoutDefaultProps } from "../types";

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
      borderRadius="2xl"
      p={16}
      pt={12}
    >
      {children}
    </Box>
  );
}
