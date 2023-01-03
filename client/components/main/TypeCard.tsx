import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Text
} from "@chakra-ui/react";
import { TypeDescriptionType } from "../../types";

interface TypeCardType extends TypeDescriptionType {
  link: string;
}
export const TypeCard = (props: TypeCardType) => {
  const { type, description, link } = props;
  return (
    <Card bg="#F5F5F5">
      <CardHeader>
        <Heading textAlign={"center"} size="md">
          {type} 유형
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack direction={"column"} align="center">
          <Avatar name={type} size="2xl" bg="#ffffff" src={link} />
          <Text p="5">{description}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
};
