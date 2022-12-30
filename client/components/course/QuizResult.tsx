import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Radio,
  RadioGroup,
  Stack,
  Text
} from "@chakra-ui/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { quizScoreState } from "../../recoil";
import { Id, QuizAnswer, QuizType } from "../../types";

export default function QuizResult(props: Id & QuizType & QuizAnswer) {
  const [score, setQuizScore] = useRecoilState<number[]>(quizScoreState);
  const { id, question, definition, option, correctAnswer, userAnswer } = props;
  function handleOnChange(v: string) {
    const copyArray = [...score];
    copyArray[id - 1] = Number(v);
    setQuizScore(copyArray);
  }
  const color = correctAnswer == userAnswer ? "green" : "red";
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box
            as="span"
            flex="1"
            textAlign="left"
            fontWeight={"bold"}
            color={color}
          >
            Q{id}. {question}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <Text>* Definition: {definition}</Text>
        <RadioGroup pt={4} defaultValue={userAnswer.toString()}>
          <Stack spacing={5}>
            <>
              {option.map(function (o, i) {
                if (i == userAnswer) {
                  return (
                    <Radio
                      key={`option${i}`}
                      colorScheme={"blue"}
                      value={i.toString()}
                      isReadOnly
                    >
                      {o}
                    </Radio>
                  );
                } else if (i == correctAnswer) {
                  return (
                    <Radio
                      key={`option${i}`}
                      colorScheme={"red"}
                      value={i.toString()}
                      isInvalid
                      isReadOnly
                    >
                      {o} (Answer)
                    </Radio>
                  );
                } else {
                  return (
                    <Radio key={`option${i}`} disabled isReadOnly>
                      {o}
                    </Radio>
                  );
                }
              })}
            </>
          </Stack>
        </RadioGroup>
      </AccordionPanel>
    </AccordionItem>
  );
}
