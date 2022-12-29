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
            디지털혁신공유대학
          </Text>
          <Link href="https://skku.edu">
            <Text color="gray.500" fontSize={"xs"}>
              Sungkyunkwan University
            </Text>
          </Link>
          <Link href="https://comedu.skku.edu">
            <Text color="gray.500" fontSize={"xs"}>
              Department of Computer Education
            </Text>
          </Link>
        </Stack>
        <Stack direction={"column"} align="end" spacing={1}>
          <Text color="gray.500" fontSize={"sm"} fontWeight={600}>
            Developed by
          </Text>
          <Stack direction={"row"}>
            <Link href="https://github.com/nimod7890">
              <Text color="gray.500" fontSize={"xs"}>
                Bomin Kim
              </Text>
            </Link>
            <Link href="https://github.com/nimod7890">
              <Text color="gray.500" fontSize={"xs"}>
                SeungYeol Son
              </Text>
            </Link>
            <Link href="https://github.com/nimod7890">
              <Text color="gray.500" fontSize={"xs"}>
                Jiwon Jang
              </Text>
            </Link>
          </Stack>
          <Stack direction={"row"}>
            <Link href="https://github.com/nimod7890">
              <Text color="gray.500" fontSize={"xs"}>
                Jeongsu Park
              </Text>
            </Link>
            <Link href="https://github.com/nimod7890">
              <Text color="gray.500" fontSize={"xs"}>
                Jeonghu Ahn
              </Text>
            </Link>
            <Link href="https://github.com/nimod7890">
              <Text color="gray.500" fontSize={"xs"}>
                Taehyeon Yun
              </Text>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
}
