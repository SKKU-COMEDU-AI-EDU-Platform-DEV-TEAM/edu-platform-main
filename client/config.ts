import { TypeDescriptionType } from "./types";

export const checkIsValid = (Reg: RegExp, input: string) => {
  if (Reg.test(input)) {
    return false;
  } else {
    return true;
  }
};

export const AREA_WIDTH = 900;
export const AREA_HEIGHT = 260;
export const AREA_MARGIN = {
  top: 10,
  right: 40,
  bottom: 20,
  left: 40
};
export const LEVEL = 10;

export const emailReg = new RegExp("^[a-zA-Z0-9]+@[a-zA-Z0-9.]+$");
export const pwReg = new RegExp(
  "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{6,}$"
);
export const mbtiArr = [
  "ISTJ",
  "ISFJ",
  "INFJ",
  "INTJ",
  "ISTP",
  "ISFP",
  "INFP",
  "INTP",
  "ESTJ",
  "ESFJ",
  "ENFJ",
  "ENTJ",
  "ESTP",
  "ESFP",
  "ENFP",
  "ENTP"
];
export const TypeDescriptionList: TypeDescriptionType[] = [
  {
    type: "강의 듣는",
    description:
      "learner Type Description learner Type Description learner Type Description"
  },
  {
    type: "퀴즈 푸는",
    description:
      "learner Type Description learner Type Description learner Type Description"
  },
  {
    type: "게임하는",
    description:
      "learner Type Description learner Type Description learner Type Description"
  },
  {
    type: "메타버스 이용하는",
    description:
      "learner Type Description learner Type Description learner Type Description"
  }
];
export const arr: string[] = [
  "군집화",
  "회귀",
  "정량 데이터",
  "정성 데이터",
  "Descriptive analysis",
  "Inferential analysis",

  "유사한 집단끼리 군집하여 분류",
  "변수와 변수 사이의 관계 파악",
  "평균 기온 데이터",
  "손글씨 사진 데이터",
  "데이터를 요약, 집계하여 결과 도출",
  "샘플-모집단 간의 관계 탐구"
];
