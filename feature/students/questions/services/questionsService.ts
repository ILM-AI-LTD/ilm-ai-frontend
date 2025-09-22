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

export interface QuestionSet {
  id: string;
  type: "fill-blanks" | "word-bank";
  data: FillInTheBlanksData | GapFillData;
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
    answers: Record<string, string>
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
        data.questions.forEach(question => {
          correctAnswers[question.id] = question.correctAnswer;
          if (answers[question.id]?.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()) {
            correctCount++;
          }
        });
      } else {
        const data = questionSet.data as GapFillData;
        data.questions.forEach(question => {
          correctAnswers[question.id] = question.correctAnswer;
          if (answers[question.id]?.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()) {
            correctCount++;
          }
        });
      }

      const totalQuestions = questionSet.type === 'fill-blanks' 
        ? (questionSet.data as FillInTheBlanksData).questions.length 
        : (questionSet.data as GapFillData).questions.length;
      
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

// Export types for use in components
export type {
  FillInTheBlanksQuestion,
  GapFillQuestion,
  FillInTheBlanksData,
  GapFillData,
  QuestionSet
};
