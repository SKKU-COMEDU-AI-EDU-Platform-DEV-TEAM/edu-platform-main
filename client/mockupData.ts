import {
  Lecture,
  Point,
  QuizResultType,
  QuizType,
  Type,
  Types,
  User
} from "./types";

export const mockupUser: User = {
  userName: "userName",
  userId: 1,
  userEmail: "nimod1234@g.skku.edu",
  type: 3
};

export const mockupPoint: Point = {
  level: 10,
  expValue: 2380
};

export const mockupScore: number[] = [1, 5, 3, 1, 4, 1, 8, 5, 3, 2, 1, 6, 4, 1];

export const mockupType: Type = { type: 2 };

export const mockupQuestionList: string[] = [
  "학습 성향 분석 질문1",
  "학습 성향 분석 질문2",
  "학습 성향 분석 질문3",
  "학습 성향 분석 질문4",
  "학습 성향 분석 질문5",
  "학습 성향 분석 질문6"
];

export const mockupLectureList: Lecture[] = [
  {
    title: "강의 이름",
    videoTitle: "강의 영상11",
    video: "/video.mp4",
    pdf: "/pdf.pdf"
  },
  {
    title: "강의 이름",
    videoTitle: "강의 영상12",
    video: "video 링크12",
    pdf: "pdf 링크12"
  }
];

export const mockupBubbleChartData: Types.Data[] = [
  { id: 1, name: "EDA", size: 350, week: 10 },
  { id: 2, name: "API", size: 100, week: 10 },
  { id: 3, name: "결측치", size: 75, week: 1 },
  { id: 4, name: "이상치", size: 150, week: 1 },
  { id: 5, name: "정량 데이터", size: 150, week: 2 },
  { id: 6, name: "정성 데이터", size: 125, week: 5 },
  { id: 7, name: "회귀", size: 230, week: 3 },
  { id: 8, name: "군집화", size: 70, week: 3 },
  { id: 9, name: "분류", size: 70, week: 15 },
  { id: 10, name: "확률", size: 70, week: 4 },
  { id: 11, name: "질적자료", size: 70, week: 4 },
  { id: 12, name: "양적자료", size: 50, week: 6 },
  { id: 13, name: "웹크롤링", size: 60, week: 13 },
  { id: 14, name: "Python", size: 70, week: 5 },
  { id: 15, name: "DIKW", size: 80, week: 7 },
  { id: 16, name: "빅데이터", size: 90, week: 8 },
  { id: 17, name: "numpy", size: 100, week: 12 },
  { id: 18, name: "matplotlib", size: 150, week: 9 },
  { id: 19, name: "Series", size: 150, week: 14 },
  { id: 20, name: "DataFrame", size: 150, week: 11 }
];

export const mockupQuizList: QuizType[] = [
  {
    question: "퀴즈 질문1",
    definition: "관련 정의1",
    option: ["선지1", "선지2", "선지3", "선지4"]
  },
  {
    question: "퀴즈 질문2",
    definition: "관련 정의2",
    option: ["선지1", "선지2", "선지3", "선지4"]
  },
  {
    question: "퀴즈 질문3",
    definition: "관련 정의3",
    option: ["선지1", "선지2", "선지3", "선지4"]
  }
];

export const mockupQuizResult: QuizResultType = {
  totalQuizNum: 4,
  correctQuizNum: 3,
  userAnswer: [0, 2, 3, 1],
  correctAnswer: [2, 2, 3, 1]
};
export const mockupMetaverseList: string[] = [
  "https://app.gather.town/app/NJSpYMXBYuorIwIx/DIHYEOKGONG?spawnTok",
  "https://app.gather.town/app/NJSpYMXBYuorIwIx/DIHYEOKGONG?spawnTok",
  "https://app.gather.town/app/NJSpYMXBYuorIwIx/DIHYEOKGONG?spawnTok",
  "https://app.gather.town/app/NJSpYMXBYuorIwIx/DIHYEOKGONG?spawnTok",
  "https://app.gather.town/app/NJSpYMXBYuorIwIx/DIHYEOKGONG?spawnTok",
  "https://app.gather.town/app/NJSpYMXBYuorIwIx/DIHYEOKGONG?spawnTok"
];
