import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";
import EnterLayout from "../components/EnterLayout";
import { checkIsValid, emailReg, pwReg } from "../config";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [confirmPw, setConfirmPw] = useState<string>("");
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

  const signup = async () => {
    const { data } = await axios.post("api/signup", {
      email: email,
      pw: pw,
      name: name
    });
    return data;
  };
  const { mutate } = useMutation(signup, {
    onMutate: () => {
      if (
        isConfirmPwInvalid ||
        checkIsValid(emailReg, email) ||
        checkIsValid(pwReg, pw)
      ) {
        return;
      }
    },
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      console.log(error);
    }
  });
  return (
    <EnterLayout>
      <>
        <Text
          fontSize={40}
          color="rgb(144, 187, 144)"
          textAlign={"center"}
          fontWeight="bold"
          pb={5}
        >
          SIGN UP
        </Text>
        <FormControl mb={1} isRequired isInvalid={isEmailInvalid}>
          <FormLabel fontSize={16}>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={handleEmailInputChange}
            borderRadius="5px"
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
            borderRadius="5px"
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
            borderRadius="5px"
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
        <FormControl mb={8} isRequired isInvalid={isConfirmPwInvalid}>
          <FormLabel fontSize={16}>Confirm Password</FormLabel>
          <Input
            type="password"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            borderRadius="5px"
            borderWidth={"2px"}
            borderColor={"rgb(144, 187, 144)"}
          />
          {isConfirmPwInvalid && (
            <FormErrorMessage>Pw does not match.</FormErrorMessage>
          )}
        </FormControl>
        <Button
          width="100%"
          borderRadius={"5px"}
          bgColor=" rgb(144, 187, 144)"
          _hover={{ bgColor: "green" }}
          onClick={() => mutate()}
          mb={5}
        >
          Sign Up
        </Button>
        <Button
          height="40px"
          width="100%"
          borderRadius={"5px"}
          bgColor="#DD9D9"
          onClick={() => router.push("/")}
        >
          Login
        </Button>
      </>
    </EnterLayout>
  );
}
