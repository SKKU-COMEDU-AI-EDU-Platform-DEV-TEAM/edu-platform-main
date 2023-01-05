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

export const TypeDescriptionList: TypeDescriptionType[] = [
  {
    type: "적응자",
    description:
      "적응자는 활동적 문제해결을 시도하며 정보를 처리하고, 구체적 경험을 통해 정보를 지각합니다.",
    characteristic:
      "데이터에 기반한 적응자의 학습자 특징을 살펴보면 시각, 청각, 감각이 모두 높게 예측되고 있습니다.  ",
    dependency: "또한 교수자에 대한 의존도는 낮다고 예측되었습니다.",
    recommend:
      "따라서 적응자에게 추천하는 학습 컨텐츠는 “동영상+PDF”입니다. 보다 철저한 개인학습을 통해서 효과적인 학습 효과를 기대할 수 있습니다."
  },
  {
    type: "수렴자",
    description:
      "수렴자는 활동적 문제해결을 시도하며 정보를 처리하고, 추상적 개념화를 통해 정보를 지각합니다.",
    characteristic:
      "데이터에 기반한 수렴자의 학습자 특징을 살펴보면 시각, 청각, 감각이 낮게 예측되었습니다.",
    dependency: "또한 교수자에 대한 의존도는 높다고 예측되었습니다.",
    recommend:
      "따라서 수렴자에게 추천하는 학습 컨텐츠는 “퀴즈”입니다. 학습 중간에 자신을 테스트하면서 학습을 하면 효과적인 학습 효과를 기대할 수 있습니다."
  },
  {
    type: "융합자",
    description:
      "융합자는 반성적으로 주의깊게 관찰하며 정보를 처리하고, 추상적 개념화를 통해 정보를 지각합니다.",
    characteristic:
      "데이터에 기반한 융합자의 학습자 특징을 살펴보면 시각, 청각, 감각이 낮게 예측되었습니다. ",
    dependency: "또한 교수자에 대한 의존도는 낮다고 예측되었습니다.",
    recommend:
      "따라서 융합자에게 추천하는 학습 컨텐츠는 “게이미피케이션”입니다. 미션을 통해서 학습하면 학업 성취감을 느낄 수 있고 이로인해 효과적인 학습 효과를 기대할 수 있습니다."
  },
  {
    type: "분산자",
    description:
      "분산자는 반성적으로 주의깊게 관찰하며 정보를 처리하고, 구체적 경험을 통해 정보를 지각합니다.",
    characteristic:
      "데이터에 기반한 분산자의 학습자 특징을 살펴보면 시각은 낮은 것으로 예측 되었지만 청각과 감각이 높게 예측 되었습니다.",
    dependency: "또한 교수자에 대한 의존도는 낮다고 예측되었습니다.",
    recommend:
      "따라서 분산자에게 추천하는 학습 컨텐츠는 “메타버스”입니다. 다른 학생들과 함께 협업하면서 학습하면 효과적인 학습 효과를 기대할 수 있습니다. "
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
