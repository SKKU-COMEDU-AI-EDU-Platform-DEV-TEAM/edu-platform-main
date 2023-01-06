import styles from "./Quiz.module.css";
import icon from "./quizIcon.jpg";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Radio,
  RadioGroup,
  Stack
} from "@chakra-ui/react";
import { Id, QuizType } from "../../types";
interface QuizAnswer {
  userAnswer: number;
  correctAnswer: number;
}
export default function QuizResult(props: Id & QuizType & QuizAnswer) {
  const { id, question, definition, option, correctAnswer, userAnswer } = props;

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
        <div className={styles.quizDefinitionBox}>
          <div className={styles.quizDefinitionTitle}>
            Definition
            <img src={icon.src} alt="icon" />
          </div>
          <div className={styles.quizDefinitionText}>{definition}</div>
        </div>
        <RadioGroup pt={4} defaultValue={userAnswer.toString()}>
          <Stack spacing={5}>
            <>
              {option.map(function (o, i) {
                if (i == correctAnswer && i == userAnswer) {
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
                } else if (i == userAnswer) {
                  return (
                    <Radio
                      key={`option${i}`}
                      colorScheme={"red"}
                      value={i.toString()}
                      isInvalid
                      isReadOnly
                    >
                      {o}
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
