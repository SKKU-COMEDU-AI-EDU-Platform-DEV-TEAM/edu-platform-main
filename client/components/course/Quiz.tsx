import styles from "./Quiz.module.css";
import icon from './quizIcon.jpg';
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
import { Id, QuizType } from "../../types";

export default function Quiz(props: Id & QuizType) {
  const [score, setQuizScore] = useRecoilState<number[]>(quizScoreState);
  const { id, question, definition, option } = props;
  function handleOnChange(v: string) {
    const copyArray = [...score];
    copyArray[id - 1] = Number(v);
    setQuizScore(copyArray);
  }

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left" fontWeight={"bold"}>
            Q{id}. {question}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <div className={styles.quizDefinitionBox}>
          <div className={styles.quizDefinitionTitle}>
            Definition
            <img src={icon.src} alt='icon' />
          </div>
          <div className={styles.quizDefinitionText}>
            {definition}
          </div>
        </div>
        <RadioGroup pt={4} onChange={(v) => handleOnChange(v)}>
          <Stack spacing={5}>
            <>
              {option.map(function (o, i) {
                return (
                  <Radio
                    key={`option${i}`}
                    colorScheme="green"
                    value={i.toString()}
                  >
                    {o}
                  </Radio>
                );
              })}
            </>
          </Stack>
        </RadioGroup>
      </AccordionPanel>
    </AccordionItem>
  );
}
