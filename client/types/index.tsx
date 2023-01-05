export interface User extends Type {
  userName?: string;
  userId?: number;
  userEmail?: string;
  token?: string;
  step?: number;
}

export interface Type {
  type?: number;
}

export interface TypeDescriptionType {
  type: string;
  content: string;
  description: string;
  characteristic: string;
  dependency: string;
  recommend: string;
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
