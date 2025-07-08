export interface CountryResponse {
  id: string;
  image: string;
  label: string;
  initial: string;
}

export interface CountryBoardDetails {
  //   child: {
  _id: string;
  fullName: string;
  username: string;
  country: string;
  board: string;
  //   };
}

export interface CountryBoardResponse {
  status: string;
  message: string;
  data: {
    child: CountryBoardDetails;
  };
}

export interface CountryBoardPayload {
  id: string;
  country: string;
  board: string;
}

export interface BoardResponse {
  id: number;
  name: string;
}

export type SubChapter = {
  id: string;
  subChapter: string;
  progress: number;
  icon: string;
};

export type Chapter = {
  name: string;
  icon: string;
  data: SubChapter[];
  progress: number;
};

export type Subject = {
  name: string;
  chapters: Chapter[];
};

export type Connection = {
  from: string;
  to: string;
  startYOffset?: number;
};

export type LayoutItem =
  | {
    type: "single";
    topicId: string;
    hidden?: boolean;
    className?: string;
    top?: boolean;
  }
  | { type: "branch"; leftTopicId: string; junctionKey: string };


export type StreamServiceParams = {
  board: string
  subject: string
  paper: number
  topic: string
  subtopic: string
  goal?: string
}


export type GetGoalsDTO = {
  board: string
  subject: string
  paper: number
  topic: string
  subtopic: string
}


export interface Goals {
  goal_name: string;
  script_history: [];
  is_completed: boolean;
  is_started: boolean;
}

export interface GoalsApiResponse {
  status: string;
  message: string;
  data: {
    goals: Goals[];
  };
}