import { Box, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { typeSelector } from "../../recoil";
import { TypeDescriptionType } from "../../types";

export const TypeDescription = () => {
  const type = useRecoilValue<TypeDescriptionType>(typeSelector);
  return (
    <Box
      verticalAlign="space-between"
      bg="#F5F5F5"
      width="400px"
      borderRadius="2xl"
      boxShadow={"base"}
      p={30}
    >
      <Text fontSize={25} fontWeight="bold" textAlign={"center"}>
        나는 <span id="type">{type.type}</span> 유형!
      </Text>
      <Text mt={10} fontSize={20} textAlign={"left"}>
        {type.description}
      </Text>
    </Box>
  );
};
