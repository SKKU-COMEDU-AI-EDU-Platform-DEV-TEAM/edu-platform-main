export interface User extends Type {
  userName?: string;
  userId?: number;
  userEmail?: string;
  token?: string;
}

export interface Type {
  type?: number;
}

export interface TypeDescriptionType {
  type: string;
  description: string;
}

export interface Point {
  level: number;
  expValue: number;
}

export interface LoginValue {
  id: string;
  password: string;
}

export interface LayoutDefaultProps {
  children?: React.ReactElement;
}

export interface WeekData {
  subject: string;
  contents: {
    video: string[];
    quiz: string;
    metaverse: string;
  };
  isdone: { video: number[]; quiz: number };
}

export interface Id {
  id: number;
}

export interface Content extends Id {
  week: number;
  contentType: number;
  link: string;
}

export interface Lecture {
  title: string;
  videoTitle: string;
  video: string;
  pdf: string;
}

export namespace Types {
  export type Data = {
    id: number;
    name: string;
    size: number;
    week: number;
  };

  export type ForceData = {
    size: number;
  };
}

export interface QuizType {
  question: string;
  definition: string;
  option: string[];
}

export interface QuizResultType {
  totalQuizNum: number;
  correctQuizNum: number;
  userAnswer: number[];
  correctAnswer: number[];
}
