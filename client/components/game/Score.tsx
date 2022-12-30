import { Box, Button, Icon, Img, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { bestScoreState, moveState } from "../../recoil";
import { GiSoundOff } from "react-icons/gi";

export default function Score() {
  const moves = useRecoilValue<number>(moveState);
  const bestScore = useRecoilValue<number>(bestScoreState);
  return (
    <Box
      display={"flex"}
      flexDirection="row"
      justifyContent={"center"}
      alignItems="center"
      fontSize={"xl"}
      color="#545454"
      w="600px"
      m="1%"
      gap={"10%"}
    >
      <Box display={"flex"} justifyContent="space-between" w="700px">
        <Text fontWeight={"bold"}>Moves: {moves}</Text>
        {bestScore != Number.MAX_SAFE_INTEGER && (
          <Text fontWeight={"bold"}>Best score: {bestScore}</Text>
        )}
      </Box>
      <Img w={"100px"} src={"/player.png"} borderRadius="full" />
    </Box>
  );
}
