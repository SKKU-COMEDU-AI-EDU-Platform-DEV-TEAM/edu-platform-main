import { Center, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Footer() {
  return (
    <Center
      as="footer"
      role="footerinfo"
      px={4}
      py={4}
      position="relative"
      backgroundColor={"gray.50"}
      boxShadow="xs"
    >
      <Stack
        direction={"row"}
        w={{ base: "full", xl: "container.xl" }}
        justifyContent={"space-between"}
      >
        <Stack
          direction={"column"}
          justify="left"
          alignContent="left"
          spacing={1}
        >
          <Text color="gray.600" fontSize={"xs"} fontWeight={600}>
            인공지능혁신공유대학
          </Text>
          <Link href="https://skku.edu">
            <Text color="gray.500" fontSize={"xs"}>
              Sungkyunkwan University
            </Text>
          </Link>
          <Link href="https://comedu.skku.edu">
            <Text color="gray.500" fontSize={"xs"}>
              Convergence and Open Sharing System
            </Text>
          </Link>
        </Stack>
      </Stack>
    </Center>
  );
}
