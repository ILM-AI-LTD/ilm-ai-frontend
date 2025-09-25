// Types for question data
export interface FillInTheBlanksQuestion {
  id: string;
  text: string;
  placeholder: string;
  correctAnswer: string;
}

export interface GapFillQuestion {
  id: string;
  text: string;
  correctAnswer: string;
}

export interface FillInTheBlanksData {
  title: string;
  instructions: string;
  questions: FillInTheBlanksQuestion[];
}

export interface GapFillData {
  title: string;
  instructions: string;
  wordBank: string[];
  questions: GapFillQuestion[];
}

export interface TrueFalseQuestion {
  id: string;
  text: string;
  correctAnswer: boolean;
}

export interface TrueFalseData {
  title: string;
  instructions: string;
  questions: TrueFalseQuestion[];
}

export interface MatchingItem {
  id: string;
  text: string;
}

export interface MatchingPair {
  leftId: string;
  rightId: string;
}

export interface MatchingData {
  title: string;
  instructions: string;
  leftItems: MatchingItem[];
  rightItems: MatchingItem[];
  correctPairs: MatchingPair[];
  explanation?: string;
}

export interface OddOneOutOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface OddOneOutQuestion {
  id: string;
  text: string;
  options: OddOneOutOption[];
  correctAnswer: string;
  explanation?: string;
}

export interface OddOneOutData {
  title: string;
  instructions: string;
  questions: OddOneOutQuestion[];
}

export interface QuestionSet {
  id: string;
  type: "fill-blanks" | "word-bank" | "true-false" | "matching" | "odd-one-out";
  data: FillInTheBlanksData | GapFillData | TrueFalseData | MatchingData | OddOneOutData;
}

// API endpoints
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

// Mock data for development - replace with actual API calls
const mockQuestionSets: QuestionSet[] = [
  {
    id: "set1",
    type: "fill-blanks",
    data: {
      title: "Fill in the blanks",
      instructions: "Fill in the blanks. Fill the correct answers.",
      questions: [
        {
          id: "q1",
          text: "The distance between the particles in steam is `blank` the distance between the particles in liquid water.",
          placeholder: "mass",
          correctAnswer: "greater than",
        },
        {
          id: "q2",
          text: "The density of steam is `blank` the density of liquid water.",
          placeholder: "acceleration",
          correctAnswer: "less than",
        },
      ],
    },
  },
  {
    id: "set2",
    type: "word-bank",
    data: {
      title: "Gap-fill with Word Bank",
      instructions: "Gap-fill with Word Bank. Choose answers from the box.",
      wordBank: ["greater than", "less than", "the same as"],
      questions: [
        {
          id: "q1",
          text: "The distance between the particles in steam is `blank` the distance between the particles in liquid water.",
          correctAnswer: "greater than",
        },
        {
          id: "q2",
          text: "The density of steam is `blank` the density of liquid water.",
          correctAnswer: "less than",
        },
      ],
    },
  },
  {
    id: "set3",
    type: "true-false",
    data: {
      title: "True or False",
      instructions: "Choose the correct answer. Select True or False for each statement.",
      questions: [
        {
          id: "q1",
          text: "The Law of Conservation of Energy states that energy cannot be created or destroyed, only transformed from one form to another.",
          correctAnswer: true,
        },
        {
          id: "q2",
          text: "Water boils at 100°C at all atmospheric pressures.",
          correctAnswer: false,
        },
        {
          id: "q3",
          text: "Photosynthesis is the process by which plants convert sunlight into chemical energy.",
          correctAnswer: true,
        },
      ],
    },
  },
  {
    id: "set4",
    type: "matching",
    data: {
      title: "Matching/Joining Questions",
      instructions: "Match the organelles with their functions:",
      leftItems: [
        { id: "mitochondria", text: "Mitochondria" },
        { id: "nucleus", text: "Nucleus" },
        { id: "ribosomes", text: "Ribosomes" },
        { id: "chloroplast", text: "Chloroplast" },
      ],
      rightItems: [
        { id: "protein-synthesis", text: "Protein synthesis" },
        { id: "energy-production", text: "Energy production" },
        { id: "photosynthesis", text: "Photosynthesis" },
        { id: "controls-cell", text: "Controls cell activities" },
      ],
      correctPairs: [
        { leftId: "mitochondria", rightId: "energy-production" },
        { leftId: "nucleus", rightId: "controls-cell" },
        { leftId: "ribosomes", rightId: "protein-synthesis" },
        { leftId: "chloroplast", rightId: "photosynthesis" },
      ],
      explanation: "Energy cannot be created or destroyed, only changed from one form to another.",
    },
  },
  {
    id: "set5",
    type: "odd-one-out",
    data: {
      title: "Odd One Out",
      instructions: "Identify which of the following statements is NOT correct or does NOT belong:",
      questions: [
        {
          id: "q1",
          text: "Which of the following statements about mechanical energy transfer is NOT correct?",
          options: [
            {
              id: "a",
              text: "A ball slows down as it rises after being thrown."
            },
            {
              id: "b", 
              text: "A stretched spring stores energy when twisted or stretched."
            },
            {
              id: "c",
              text: "A person eating food gets energy for muscles."
            },
            {
              id: "d",
              text: "Heat moves from hot tea to a metal spoon."
            }
          ],
          correctAnswer: "d",
          explanation: "Heat transfer is not mechanical, it's thermal energy transfer. The other options all involve mechanical energy transfer or storage."
        },
        {
          id: "q2",
          text: "Which of the following statements about mechanical energy transfer is NOT correct?",
          options: [
            {
              id: "a",
              text: "Pushing a swing transfers energy mechanically."
            },
            {
              id: "b",
              text: "Pulling a door open involves mechanical energy transfer."
            },
            {
              id: "c",
              text: "Twisting a rubber band stores mechanical energy."
            },
            {
              id: "d",
              text: "Sunlight warming the Earth is an example of mechanical energy transfer."
            }
          ],
          correctAnswer: "d",
          explanation: "Sunlight warming the Earth is radiation (electromagnetic energy), not mechanical energy transfer. The other options all involve mechanical energy transfer or storage."
        }
      ]
    }
  }
];

// API service functions
export class QuestionsService {
  /**
   * Fetch all question sets from the backend
   * @param subjectId - Optional subject ID to filter questions
   * @param difficulty - Optional difficulty level
   * @returns Promise<QuestionSet[]>
   */
  static async fetchQuestionSets(
    subjectId?: string, 
    difficulty?: 'easy' | 'medium' | 'hard'
  ): Promise<QuestionSet[]> {
    try {
      // For now, return mock data
      // Replace with actual API call:
      // const response = await fetch(`${API_BASE_URL}/questions?subject=${subjectId}&difficulty=${difficulty}`);
      // if (!response.ok) throw new Error('Failed to fetch questions');
      // return await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockQuestionSets;
    } catch (error) {
      console.error('Error fetching question sets:', error);
      throw new Error('Failed to load questions. Please try again.');
    }
  }

  /**
   * Fetch a specific question set by ID
   * @param questionSetId - The ID of the question set
   * @returns Promise<QuestionSet>
   */
  static async fetchQuestionSet(questionSetId: string): Promise<QuestionSet> {
    try {
      // Replace with actual API call:
      // const response = await fetch(`${API_BASE_URL}/questions/${questionSetId}`);
      // if (!response.ok) throw new Error('Failed to fetch question set');
      // return await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const questionSet = mockQuestionSets.find(set => set.id === questionSetId);
      if (!questionSet) {
        throw new Error('Question set not found');
      }
      return questionSet;
    } catch (error) {
      console.error('Error fetching question set:', error);
      throw new Error('Failed to load question set. Please try again.');
    }
  }

  /**
   * Submit answers for a question set
   * @param questionSetId - The ID of the question set
   * @param answers - User's answers
   * @returns Promise<{ score: number; feedback: string }>
   */
  static async submitAnswers(
    questionSetId: string, 
    answers: Record<string, string | boolean> | MatchingPair[]
  ): Promise<{ score: number; feedback: string; correctAnswers: Record<string, string> }> {
    try {
      // Replace with actual API call:
      // const response = await fetch(`${API_BASE_URL}/questions/${questionSetId}/submit`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ answers })
      // });
      // if (!response.ok) throw new Error('Failed to submit answers');
      // return await response.json();
      
      // Mock scoring logic
      const questionSet = mockQuestionSets.find(set => set.id === questionSetId);
      if (!questionSet) {
        throw new Error('Question set not found');
      }

      let correctCount = 0;
      const correctAnswers: Record<string, string> = {};

      if (questionSet.type === 'fill-blanks') {
        const data = questionSet.data as FillInTheBlanksData;
        const stringAnswers = answers as Record<string, string | boolean>;
        data.questions.forEach(question => {
          correctAnswers[question.id] = question.correctAnswer;
          if (typeof stringAnswers[question.id] === 'string' && (stringAnswers[question.id] as string).toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()) {
            correctCount++;
          }
        });
      } else if (questionSet.type === 'word-bank') {
        const data = questionSet.data as GapFillData;
        const stringAnswers = answers as Record<string, string | boolean>;
        data.questions.forEach(question => {
          correctAnswers[question.id] = question.correctAnswer;
          if (typeof stringAnswers[question.id] === 'string' && (stringAnswers[question.id] as string).toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()) {
            correctCount++;
          }
        });
      } else if (questionSet.type === 'true-false') {
        const data = questionSet.data as TrueFalseData;
        const booleanAnswers = answers as Record<string, string | boolean>;
        data.questions.forEach(question => {
          correctAnswers[question.id] = question.correctAnswer.toString();
          if (booleanAnswers[question.id] === question.correctAnswer) {
            correctCount++;
          }
        });
      } else if (questionSet.type === 'matching') {
        const data = questionSet.data as MatchingData;
        const userPairs = answers as MatchingPair[];
        data.correctPairs.forEach(correctPair => {
          const userMatch = userPairs.find(pair => 
            pair.leftId === correctPair.leftId && pair.rightId === correctPair.rightId
          );
          if (userMatch) {
            correctCount++;
          }
        });
        // Store correct pairs as string for consistency
        data.correctPairs.forEach(pair => {
          correctAnswers[`${pair.leftId}-${pair.rightId}`] = `${pair.leftId}-${pair.rightId}`;
        });
      } else if (questionSet.type === 'odd-one-out') {
        const data = questionSet.data as OddOneOutData;
        const stringAnswers = answers as Record<string, string>;
        data.questions.forEach(question => {
          correctAnswers[question.id] = question.correctAnswer;
          if (stringAnswers[question.id] === question.correctAnswer) {
            correctCount++;
          }
        });
      }

      const totalQuestions = questionSet.type === 'fill-blanks' 
        ? (questionSet.data as FillInTheBlanksData).questions.length 
        : questionSet.type === 'word-bank'
        ? (questionSet.data as GapFillData).questions.length
        : questionSet.type === 'true-false'
        ? (questionSet.data as TrueFalseData).questions.length
        : questionSet.type === 'matching'
        ? (questionSet.data as MatchingData).correctPairs.length
        : (questionSet.data as OddOneOutData).questions.length;
      
      const score = Math.round((correctCount / totalQuestions) * 100);
      
      return {
        score,
        feedback: score >= 80 ? 'Excellent work!' : score >= 60 ? 'Good job!' : 'Keep practicing!',
        correctAnswers
      };
    } catch (error) {
      console.error('Error submitting answers:', error);
      throw new Error('Failed to submit answers. Please try again.');
    }
  }

  /**
   * Get user's progress for a specific subject or all subjects
   * @param subjectId - Optional subject ID
   * @returns Promise<{ completed: number; total: number; averageScore: number }>
   */
  static async getUserProgress(subjectId?: string): Promise<{
    completed: number;
    total: number;
    averageScore: number;
  }> {
    try {
      // Replace with actual API call:
      // const response = await fetch(`${API_BASE_URL}/progress?subject=${subjectId}`);
      // if (!response.ok) throw new Error('Failed to fetch progress');
      // return await response.json();
      
      // Mock progress data
      return {
        completed: 5,
        total: 10,
        averageScore: 85
      };
    } catch (error) {
      console.error('Error fetching progress:', error);
      throw new Error('Failed to load progress. Please try again.');
    }
  }
}

// Types are already exported as interfaces above
