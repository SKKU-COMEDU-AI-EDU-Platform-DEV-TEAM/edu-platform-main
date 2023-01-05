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
export const labelStyles = {
  mt: "2",
  ml: "-2.5",
  fontSize: "sm"
};
export const MBTI = [
  [
    [
      "E",
      "타인에게 발상, 지식, 감정을 표현 / 사교적이고 활동적 / 외부 활동에 적극적 / 글보다는 말로 표현 / 경험을 통해 이해"
    ],
    [
      "I",
      "스스로 발상, 지식, 감정에 대한 깊이를 늘림 / 조용하고 신중 / 깊이있는 대인관계 / 말보다는 글로 표현 / 이해 후 행동"
    ]
  ],
  [
    [
      "N",
      "직관 및 영감에 의존 / 이상주의적 / 아이디어를 중시 / 미래지향적 / 나무보다 숲을 봄"
    ],
    [
      "S",
      "오감 및 경험에 의존 / 현실적 / 실제의 경험 중시 / 지금에 초점 / 숲보다 나무를 봄"
    ]
  ],
  [
    [
      "F",
      "사람과의 관계에 주로 관심 / 상황적, 포괄적 / 주변 상황을 고려하여 판단 / 의미, 영향, 도덕성 중시"
    ],
    [
      "T",
      "진실과 사실에 주로 관심 / 논리적, 분석적 / 객관적으로 사실 판단 / 원리, 원칙 중시"
    ]
  ],
  [
    [
      "P",
      "유동적인 목적과 방향 선호 / 자율적, 즉흥적 / 상황에 따라 적응 / 결정을 유보"
    ],
    [
      "J",
      "분명한 목적과 방향 선호 / 계획적, 체계적 / 기한 엄수 / 정리정돈을 좋아함"
    ]
  ]
];
export const numList = [5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5];
