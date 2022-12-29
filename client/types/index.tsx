export interface User {
  userName: string;
  userId: number;
  userEmail: string;
  type: number;
}

export interface Type {
  type: number;
}

export interface TypeDescriptionType {
  type: string;
  description: string;
}

export interface TypeCardType extends TypeDescriptionType {
  link: string;
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

export interface CourseLayoutProps {
  title: string;
  type: number;
  metaverse: string;
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

export interface ScoreList {
  score: number[];
}

export interface Id {
  id: number;
}

export interface Content extends Id {
  week: number;
  contentType: number;
  link: string;
}

export interface LineProps {
  data: number[];
  color: string;
}

export interface ChartProps {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
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
export interface IBubbleChartProps {
  bubblesData: Types.Data[];
  width: number;
  height: number;
  backgroundColor: string;
  textFillColor: string;
  minValue: number;
  maxValue: number;
  metaverse: string[];
  type: number;
}

export interface IBubbleChartState {
  data: Types.ForceData[];
}

export interface QuizType {
  question: string;
  definition: string;
  option: string[];
}
