import {
  Button,
  Center,
  Flex,
  Icon,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Stack,
  Text
} from "@chakra-ui/react";
import { GoPencil } from "react-icons/go";
import { useRecoilValue } from "recoil";
import { Avatar } from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { typeSelector, userState } from "../../recoil";

export default function Header() {
  const user = useRecoilValue(userState);
  const type = useRecoilValue(typeSelector);
  const router = useRouter();
  return (
    <Center
      as="nav"
      role={"navigation"}
      minH="16"
      width="full"
      position={"fixed"}
      px={4}
      backgroundColor={"gray.50"}
      boxShadow={"xs"}
    >
      <Stack
        direction={"row"}
        w={{ base: "full", xl: "container.xl" }}
        justifyContent={"space-between"}
        verticalAlign="center"
      >
        <Button onClick={() => router.push("/main")} variant="link">
          <Icon as={GoPencil} fontSize={"2xl"} color="gray.500" mr="3" />
          <Text fontSize={"2xl"} fontWeight={600} color="gray.500">
            SKK E<span id="type">:D</span>U
          </Text>
        </Button>
        <Center>
          <Stack direction={{ base: "row", sm: "row" }} align="start">
            <Popover>
              <PopoverTrigger>
                <Button
                  colorScheme="teal"
                  variant="link"
                  p={[4]}
                  color="rgb(144, 187, 144)"
                >
                  <Avatar size="xs" bg="gray.500" mr={"2"} />
                  <Text fontSize={"md"} fontWeight={600} color="gray.500">
                    {user.userName}
                  </Text>
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader fontWeight={"bold"}>회원정보</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Text
                      fontWeight={"bold"}
                      fontSize={15}
                      color=" rgb(144, 187, 144)"
                    >
                      {type.type} 유형
                    </Text>
                    <Text fontWeight={"bold"} fontSize={15}>
                      {user.userEmail}
                    </Text>
                  </PopoverBody>
                  <PopoverFooter
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <Button
                      colorScheme="facebook"
                      fontSize={13}
                      variant="link"
                      onClick={() => router.push("/test")}
                    >
                      학습유형검사 다시하기
                    </Button>
                  </PopoverFooter>
                </PopoverContent>
              </Portal>
            </Popover>
          </Stack>
        </Center>
      </Stack>
    </Center>
  );
}
