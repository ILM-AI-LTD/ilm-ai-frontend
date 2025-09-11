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

// export type SubChapter = {
//   id: string;
//   subChapter: string;
//   progress: number;
//   icon: string;
// };

export interface SubTopic {
  subTopic_id: string;
  subTopic_name: string;
  progress: number;
  icon: string;
}

// export type Chapter = {
//   name: string;
//   icon: string;
//   data: SubChapter[];
//   progress: number;
// };

export interface Topic {
  topic_id: string;
  topic_name: string;
  icon: string;
  progress: number;
  data: SubTopic[];
}

export type Subject = {
  name: string;
  chapters: Topic[];
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
  board: string;
  subject: string;
  paper: number;
  topic: string;
  subtopic: string;
  goal?: string;
};

export type GetGoalsDTO = {
  board: string;
  subject: string;
  paper: number;
  topic: string;
  subtopic: string;
};

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

export interface ChatbotRequest {
  board: string;
  subject: string;
  paper: number;
  topic: string;
  subtopic: string;
  question: string;
}

export interface ChatbotResponse {
  status: "success" | "error";
  message: string;
  data: {
    answer: string;
  };
}

export interface GenerateScriptRequest {
  board: string;
  subject: string;
  paper: number;
  topic: string;
  subtopic: string;
  goal: string;
}

export interface ScriptApiResponse {
  status: string;
  message: string;
  data: string;
}

export interface SampleQuestionsRequest {
  board: string;
  subject: string;
  paper: number;
  topic: string;
  subtopic: string;
  goal: string;
}

export interface SampleQuestionsResponse {
  status: string;
  message: string;
  data: {
    questions: {
      set: number;
      question_type: string;
      question_list: {
        question: string;
        answer: string;
      }[];
    }[];
  };
}

export interface EvaluateAnswerDTO {
  question: string;
  student_answer: string;
  correct_answer: string;
  question_type: string;
  image: Blob | null;
}

export interface EvaluateAnswerResponse {
  status: string;
  message: string;
  data: {
    score?: number;
    explanation?: string;
    is_correct?: boolean;
  };
}

export interface SampleQuestionsRequest {
  board: string;
  subject: string;
  paper: number;
  topic: string;
  subtopic: string;
  goal: string;
}

export interface SampleQuestionsResponse {
  status: string;
  message: string;
  data: {
    questions: {
      set: number;
      question_type: string;
      question_list: {
        question: string;
        answer: string;
      }[];
    }[];
  };
}

export interface SubtopicProgress {
  subtopic_name: string;
  is_completed: boolean;
  progress: number;
}

export interface TopicProgress {
  topic_name: string;
  is_completed: boolean;
  progress: number;
  subtopics: SubtopicProgress[];
}

export interface SubjectProgressResponse {
  status: string;
  message: string;
  data: {
    topics: TopicProgress[];
  };
}

export interface MathFormattedQuestion {
  id: string;
  name: string;
  questionText: string;
  stepCount: number;
  hint: string;
  createdAt: string;
  correctAnswer: string;
  nextStepCount?: string | number;
  evaluation?: string;
  is_finished?: boolean;
  chatHistory: null | string;
}

export interface MathSampleQuestionsResponse {
  status: string;
  message: string;
  data: MathFormattedQuestion[];
}

export interface MathEvaluateAnswerDTO {
  question: string;
  image: Blob | null;
  currentStepCount: string;
  correctAnswer: string;
  chatHistory: string;
}

export interface EvaluateMathAnswerResponse {
  status: string;
  message: string;
  data: {
    error: null;
    extracted_text: string;
    nextStepCount: string | number;
    evaluation: string;
    hint: string;
    is_finished: boolean;
    success: true;
    chatHistory: null | string;
  };
}
