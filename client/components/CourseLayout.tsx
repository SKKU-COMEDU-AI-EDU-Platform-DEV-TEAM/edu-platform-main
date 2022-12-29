import { Box, Button, Center, Link, Stack, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CourseLayoutProps, LayoutDefaultProps } from "../types";

export default function CourseLayout({
  children,
  ...props
}: LayoutDefaultProps & CourseLayoutProps) {
  const { title, type, metaverse } = props;

  return (
    <Stack
      direction={"column"}
      w={{ base: "full", xl: "container.xl" }}
      justifyContent={"space-between"}
      verticalAlign="center"
      pt={5}
      pb={10}
    >
      <Stack m={2} direction="row" justifyContent={"space-between"}>
        <Box>
          <Text
            width="fit-content"
            p={1}
            fontWeight="bold"
            borderBottomWidth="2px"
            borderBottomColor="rgb(144, 187, 144)"
          >
            {title}
          </Text>
        </Box>
        {type == 4 && (
          <Link href={metaverse} isExternal>
            <Button colorScheme="facebook" fontSize={15} variant="ghost">
              이 과목 메타버스 질문방 바로가기
              <ExternalLinkIcon mx="2px" ml="1" />
            </Button>
          </Link>
        )}
      </Stack>
      {children}
    </Stack>
  );
}
