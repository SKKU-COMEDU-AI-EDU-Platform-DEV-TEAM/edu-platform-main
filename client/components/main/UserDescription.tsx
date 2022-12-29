import { Avatar, Box, Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { pointState, userState } from "../../recoil";
import { GiRoundStar } from "react-icons/gi";
import { TbDiamonds } from "react-icons/tb";
import { Point, User } from "../../types";

export const UserDescription = () => {
  const user = useRecoilValue<User>(userState);
  const point = useRecoilValue<Point>(pointState);
  const link =
    user.type == 1
      ? "/video.png"
      : user.type == 2
      ? "/quiz.png"
      : user.type == 3
      ? "/game.png"
      : "/metaverse.png";
  return (
    <Box p={5} bg="#F5F5F5" boxShadow={"base"} borderRadius="2xl" pr="10">
      <Flex wrap="wrap">
        <Avatar
          name={user.userName}
          m={6}
          size="2xl"
          bg="rgb(144, 187, 144)"
          src={link}
        />
        <Stack>
          <Text fontSize={30} textAlign={"center"} mt={4} fontWeight="bold">
            {user.userName}
          </Text>
          <Text fontSize={15} textAlign={"center"} fontWeight={"bold"} pb={6}>
            {user.userEmail}
          </Text>
          {user.type == 3 && (
            <Box alignSelf={"center"}>
              <Text
                mb={3}
                fontStyle={"italic"}
                fontSize={18}
                textAlign="center"
              >
                <Icon as={GiRoundStar} pt="1" mr="1" color="yellow.500" />
                Lv. {point.level}
                <Icon as={TbDiamonds} pt="1" ml="2" mr="1" color="yellow.500" />
                exp. {point.expValue}
              </Text>
            </Box>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};
