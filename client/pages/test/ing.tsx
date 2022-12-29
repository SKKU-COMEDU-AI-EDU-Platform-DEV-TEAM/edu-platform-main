import {
  Box,
  Button,
  Radio,
  RadioGroup,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Stack,
  Text
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TestLayout from "../../components/TestLayout";

export default function TestingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [qList, setQList] = useState<string[]>([]);
  const [mbtiValue, setmbtiValue] = useState<number[]>([5, 5, 5, 5]);
  const [typeValue, setTypeValue] = useState<number[]>([]);
  const mbti = [
    ["E", "I"],
    ["N", "S"],
    ["F", "T"],
    ["P", "J"]
  ];
  const numList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  function handleTypeOnchange(question: number, answer: number) {
    const copyArray = [...typeValue];
    copyArray[question] = answer;
    setTypeValue(copyArray);
  }
  function handleMbtiOnchange(question: number, answer: number) {
    const copyArray = [...mbtiValue];
    copyArray[question] = answer;
    setmbtiValue(copyArray);
  }
  async function handleOnClick() {
    const typefiltered = typeValue.filter(function (x) {
      return x !== undefined;
    });
    if (typefiltered.length != qList.length) {
      alert("학습 성향 분석 질문 중 답변하지 않은 문항이 있습니다!");
      return;
    }
    const response = (
      await axios.post("/api/test", { type: typefiltered, mbti: mbtiValue })
    ).data;
    //error handling
    router.push("/test/end");
  }
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm"
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = (await axios.get("/api/test")).data;
      setQList(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <TestLayout>
      <>
        <Text textAlign={"center"}>
          0: 전혀 그렇지 않다 / 7(또는 10): 매우 그렇다
        </Text>
        <Stack direction="column" spacing={10} m={10}>
          {mbti.map((mbti, i) => (
            <Slider
              key={`mbti${i}`}
              defaultValue={5}
              min={0}
              max={10}
              step={1}
              onChange={(e) => handleMbtiOnchange(i, e)}
            >
              <SliderMark value={0} {...labelStyles} fontWeight="bold">
                {mbti[0]}
              </SliderMark>
              {numList.map((num) => (
                <SliderMark
                  key={`num${num}`}
                  value={num + 0.1}
                  {...labelStyles}
                >
                  {num}
                </SliderMark>
              ))}
              <SliderMark value={10.1} {...labelStyles} fontWeight="bold">
                {mbti[1]}
              </SliderMark>
              <SliderTrack>
                <Box position="relative" right={10} />
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          ))}
          <Box />
          {qList.map((q, i) => (
            <>
              <Text fontWeight={"bold"} fontSize={15} key={`text${i}`}>
                {i + 1}. {q}
              </Text>
              <Slider
                key={`slider${i}`}
                defaultValue={0}
                min={0}
                max={7}
                step={1}
                onChange={(e) => handleTypeOnchange(i, e)}
              >
                <SliderMark value={0.1} {...labelStyles} fontWeight="bold">
                  0
                </SliderMark>
                {numList.slice(0, 6).map((num) => (
                  <SliderMark
                    key={`num${num}`}
                    value={num + 0.1}
                    {...labelStyles}
                  >
                    {num}
                  </SliderMark>
                ))}
                <SliderMark value={7.1} {...labelStyles} fontWeight="bold">
                  7
                </SliderMark>
                <SliderMark
                  value={typeValue[i]}
                  textAlign="center"
                  bg="blue.500"
                  color="white"
                  mt="-10"
                  ml="-5"
                  w="10"
                >
                  {typeValue[i]}
                </SliderMark>
                <SliderTrack>
                  <Box position="relative" right={10} />
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
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
}
