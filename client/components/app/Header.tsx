import {
  Button,
  Center,
  Icon,
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
  Text,
  StackDivider
} from "@chakra-ui/react";
import { GoPencil } from "react-icons/go";
import { useRecoilValue } from "recoil";
import { Avatar } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { stepSelector, typeSelector, userState } from "../../recoil";
import { TypeDescriptionType, User } from "../../types";

export default function Header() {
  const router = useRouter();
  const user = useRecoilValue<User | null>(userState);
  const type = useRecoilValue<TypeDescriptionType>(typeSelector);
  const step = useRecoilValue<string[]>(stepSelector);

  const link =
    user!.type == 1
      ? "/video.png"
      : user!.type == 2
      ? "/quiz.png"
      : user!.type == 3
      ? "/game.png"
      : "/metaverse.png";

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
      zIndex={1}
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
                  <Avatar
                    size="xs"
                    mr={"2"}
                    bg="rgb(144, 187, 144)"
                    src={link}
                  />
                  <Text fontSize={"md"} fontWeight={600} color="gray.500">
                    {user!.userName}
                  </Text>
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader fontWeight={"bold"}>회원정보</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Stack
                      divider={<StackDivider />}
                      direction={"row"}
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Text
                        fontWeight={"bold"}
                        fontSize={14}
                        color=" rgb(144, 187, 144)"
                      >
                        {type.type} 유형
                      </Text>
                      <Text fontWeight={"bold"} fontSize={14}>
                        {step[0]}
                      </Text>
                      <Text fontWeight={"bold"} fontSize={14}>
                        {user!.userEmail}
                      </Text>
                    </Stack>
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
                    <Button
                      colorScheme="red"
                      fontSize={13}
                      variant="link"
                      onClick={() => router.push("/")}
                    >
                      로그아웃
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
