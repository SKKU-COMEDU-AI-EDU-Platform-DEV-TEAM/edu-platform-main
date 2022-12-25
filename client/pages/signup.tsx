import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Select,
  Stack
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import EnterLayout from "../components/EnterLayout";
import { checkIsValid, emailReg, mbtiArr, pwReg } from "../config";

export const SignupPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [confirmPw, setConfirmPw] = useState<string>("");
  const [mbti, setMBTI] = useState<string>("ISTJ");
  const [isEmailInvalid, setEmailInvalid] = useState<boolean>(false);
  const [isPwInvalid, setPwInvalid] = useState<boolean>(false);
  const isConfirmPwInvalid: boolean = pw != confirmPw;

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
    setEmailInvalid(checkIsValid(emailReg, inputValue));
  };

  const handlePwInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPw(inputValue);
    setPwInvalid(checkIsValid(pwReg, pw));
  };

  const handleSignupOnClick = async () => {
    if (
      isConfirmPwInvalid ||
      checkIsValid(emailReg, email) ||
      checkIsValid(pwReg, pw)
    ) {
      return;
    }
    const response = (
      await axios.post("api/signup", {
        email: email,
        pw: pw,
        name: name,
        mbti: mbti
      })
    ).data;
    //error handling
    router.push("/");
  };
  return (
    <EnterLayout>
      <>
        <Stack direction="row" justifyContent={"space-between"} mb={10}>
          <Image
            alt="DIHYEOKGONG"
            w={"80%"}
            objectFit="contain"
            src="./DIHYEOKGONG.png"
          />
          <Image alt="SKKU" w={"10%"} objectFit="contain" src="./SKKU.png" />
        </Stack>
        <FormControl mb={1} isRequired isInvalid={isEmailInvalid}>
          <FormLabel fontSize={16}>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={handleEmailInputChange}
            borderRadius="2xl"
            borderWidth={"2px"}
            borderColor={"rgb(144, 187, 144)"}
          />
          {isEmailInvalid && (
            <FormErrorMessage>Email address is invalid.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl mb={1} isRequired>
          <FormLabel fontSize={16}>Name</FormLabel>
          <Input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            borderRadius="2xl"
            borderWidth={"2px"}
            borderColor={"rgb(144, 187, 144)"}
          />
        </FormControl>
        <FormControl mb={1} isRequired isInvalid={isPwInvalid}>
          <FormLabel fontSize={16}>Password</FormLabel>
          <Input
            type="password"
            value={pw}
            onChange={handlePwInputChange}
            borderRadius="2xl"
            borderWidth={"2px"}
            borderColor={"rgb(144, 187, 144)"}
          />
          {isPwInvalid && (
            <FormErrorMessage>
              Requirement: at least 6 characters, one capital letter, one
              lowercase letter, atleast one digit and one special charcter!
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl mb={1} isRequired isInvalid={isConfirmPwInvalid}>
          <FormLabel fontSize={16}>Confirm Password</FormLabel>
          <Input
            type="password"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            borderRadius="2xl"
            borderWidth={"2px"}
            borderColor={"rgb(144, 187, 144)"}
          />
          {isConfirmPwInvalid && (
            <FormErrorMessage>Pw does not match.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl mb={10} isRequired>
          <FormLabel fontSize={16}>MBTI</FormLabel>
          <Select
            borderRadius="2xl"
            borderWidth={"2px"}
            borderColor={"rgb(144, 187, 144)"}
            placeholder="ISTJ"
            onChange={(e) => setMBTI(e.target.value)}
          >
            {mbtiArr.map((mbti) => (
              <option aria-label={mbti} key={mbti}>
                {mbti}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button
          width="100%"
          borderRadius={"2xl"}
          bgColor=" rgb(144, 187, 144)"
          _hover={{ bgColor: "green" }}
          onClick={handleSignupOnClick}
        >
          Sign Up
        </Button>
      </>
    </EnterLayout>
  );
};
