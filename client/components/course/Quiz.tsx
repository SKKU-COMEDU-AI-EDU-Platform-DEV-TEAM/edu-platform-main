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
import { Id, QuizType } from "../../types";

export default function Quiz(props: Id & QuizType) {
  const { id, question, definition, option } = props;
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
        <Text>Definition: {definition}</Text>
        <RadioGroup pt={4}>
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
