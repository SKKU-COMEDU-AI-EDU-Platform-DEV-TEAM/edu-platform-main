import { TypeDescriptionType } from "./types";

export const Kolb = ["분산자", "융합자", "수렴자", "적응자"];

export const checkIsValid = (Reg: RegExp, input: string) => {
  if (Reg.test(input)) {
    return false;
  } else {
    return true;
  }
};
export const RADAR_HEIGHT = 200;
export const RADAR_WIDTH = 300;
export const RADER_MARGIN = {
  top: 20,
  right: 60,
  bottom: 20,
  left: 60
};

export type Attribute = "E" | "N" | "F" | "P" | "I" | "S" | "T" | "J";
export const VALUE: Attribute[] = ["J", "E", "N", "F", "P", "I", "S", "T"];

export const AVERAGE: number[][] = [
  [8, 5, 5, 8, 2, 5, 5, 2], //적응자
  [4, 3, 4, 5, 6, 7, 6, 5], //수렴자
  [3, 8, 3, 5, 7, 2, 7, 5], //융합자
  [6, 7, 7, 4, 4, 3, 3, 6] //분산자
];

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
    content: "Lecture (textbook)",
    description:
      "활동적 문제해결을 시도하며 정보를 처리하고, 구체적 경험을 통해 정보를 지각합니다.",
    characteristic: "적응자는 높은 시각, 청각, 감각의 학습자 특징을 가집니다",
    dependency: "또한 교수자에 대한 의존도가 낮습니다.",
    recommend:
      "“동영상+PDF”입니다. 보다 철저한 개인학습을 통해서 효과적인 학습 효과를 기대할 수 있습니다."
  },
  {
    type: "수렴자",
    content: "Quiz",
    description:
      "활동적 문제해결을 시도하며 정보를 처리하고, 추상적 개념화를 통해 정보를 지각합니다.",
    characteristic: "수렴자는 낮은 시각, 청각, 감각의 학습자 특징을 가집니다.",
    dependency: "또한 교수자에 대한 의존도가 높습니다",
    recommend:
      "“퀴즈”입니다. 학습 중간에 자신을 테스트하면서 학습을 하면 효과적인 학습 효과를 기대할 수 있습니다."
  },
  {
    type: "융합자",
    content: "Gamification",
    description:
      "반성적으로 주의깊게 관찰하며 정보를 처리하고, 추상적 개념화를 통해 정보를 지각합니다.",
    characteristic: "융합자는 낮은 시각, 청각, 감각의 학습자 특징을 가집니다.",
    dependency: "또한 교수자에 대한 의존도가 낮습니다",
    recommend:
      "“게이미피케이션”입니다. 미션을 통해서 학습하면 학업 성취감을 느낄 수 있고 이로인해 효과적인 학습 효과를 기대할 수 있습니다."
  },
  {
    type: "분산자",
    content: "Metaverse",
    description:
      "반성적으로 주의깊게 관찰하며 정보를 처리하고, 구체적 경험을 통해 정보를 지각합니다.",
    characteristic:
      "분산자는 시각은 낮으나, 청각과 감각에 관해서는 높은 값을 가지는 학습자의 특징을 가집니다.",
    dependency: "또한 교수자에 대한 의존도가 낮습니다.",
    recommend:
      "“메타버스”입니다. 다른 학생들과 함께 협업하면서 학습하면 효과적인 학습 효과를 기대할 수 있습니다. "
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
      "J",
      "분명한 목적과 방향 선호 / 계획적, 체계적 / 기한 엄수 / 정리정돈을 좋아함"
    ],
    [
      "P",
      "유동적인 목적과 방향 선호 / 자율적, 즉흥적 / 상황에 따라 적응 / 결정을 유보"
    ]
  ]
];
export const numList = [5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5];

export const lectureList: string[][] = [
  [
    "Python 기초",
    "Python을 이용한 코딩 경험이 거의 없는 학습자에게 적합합니다. Python을 활용해봤거나 기본 문법을 숙지했다면 다음 단계인 자료구조부터 학습하시길 추천합니다!"
  ],
  [
    "자료구조",
    "Python의 기본 문법만 숙지하고 있는 학습자에게 적합합니다. 자료구조에서는 list, dictionary, tuple, set 등에 대해 학습합니다. 이미 자료구조의 종류와 특징을 숙지하고 있다면 다음 단계인 알고리즘부터 학습하시길 추천합니다!"
  ],
  [
    "알고리즘",
    "Python의 기본 문법과 자료구조들을 익힌 학습자에게 적합합니다. 알고리즘에서는 여러 자료구조와 함수들을 바탕으로 하나의 기능을 하는 프로그램을 작성합니다. 자료구조와 함수들을 자유롭게 활용하실 수 있다면 다음 단계인 데이터 분석부터 학습하시길 추천합니다!"
  ],
  [
    "데이터 분석",
    "Python의 자료구조와 함수를 충분히 익힌 학습자에게 적합합니다. 데이터 분석에서는 데이터의 수집과 가공, 분석 등의 과정을 학습하고 실습합니다. 데이터의 구조와 가공 및 분석 방법에 대해 숙지하고 있다면 다음 단계인 인공지능부터 학습하시길 추천합니다!"
  ],
  [
    "인공지능",
    "Python에 익숙하고 데이터를 자유자재로 다룰 수 있는 학습자에게 적합합니다. 인공지능에서는 회귀, 분류, 군집화 등을 바탕으로 데이터를 분석하는 방법을 학습합니다. 학습을 시작하여 실전적인 데이터 분석에 도전해보세요!"
  ]
];
