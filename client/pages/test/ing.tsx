import { Box, Button, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TestLayout from "../../components/TestLayout";

export const TestingPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [qList, setQList] = useState<string[]>([]);
  const [value, setValue] = useState<number[]>([]);

  function handleOnChange(question: number, answer: string) {
    const copyArray = [...value];
    copyArray[question] = Number(answer);
    setValue(copyArray);
  }
  async function handleOnClick() {
    const filtered = value.filter(function (x) {
      return x !== undefined;
    });
    if (filtered.length != qList.length) {
      alert("답변하지 않은 문항이 있습니다!");
      return;
    }
    const response = (await axios.post("/api/test", { result: value })).data;
    //error handling
    router.push("/test/end");
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = (await axios.get("/api/test")).data;
      setQList(response.questions);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <TestLayout>
      <>
        <Stack direction="column" overflow={"scroll"} spacing={5} m={10}>
          {qList.map((q, i) => (
            <>
              <Text fontWeight={"bold"} fontSize={18} key={`text${i}`}>
                {i + 1}. {q}
              </Text>
              <RadioGroup
                key={`radio${i}`}
                onChange={(e) => handleOnChange(i, e)}
              >
                <Stack direction="row">
                  <Radio colorScheme="green" value="1">
                    매우 그렇지 않다
                  </Radio>
                  <Radio colorScheme="green" value="2">
                    그렇지 않다
                  </Radio>
                  <Radio colorScheme="green" value="3">
                    보통이다
                  </Radio>
                  <Radio colorScheme="green" value="4">
                    그렇다
                  </Radio>
                  <Radio colorScheme="green" value="5">
                    매우 그렇다
                  </Radio>
                </Stack>
              </RadioGroup>
            </>
          ))}
        </Stack>
        <Box display="flex" justifyContent={"right"}>
          <Button
            height="40px"
            width="30%"
            borderRadius={"2xl"}
            bgColor="rgb(144, 187, 144)"
            onClick={handleOnClick}
          >
            제출하기
          </Button>
        </Box>
      </>
    </TestLayout>
  );
};
