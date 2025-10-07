import { useState, useEffect } from 'react';
import { QuestionsService, type QuestionSet } from '../services/questionsService';

interface UseQuestionsOptions {
  subjectId?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  autoLoad?: boolean;
}

interface UseQuestionsReturn {
  questionSets: QuestionSet[];
  currentQuestionIndex: number;
  currentQuestion: QuestionSet | null;
  isLoading: boolean;
  error: string | null;
  isCompleted: boolean;
  showFeedback: boolean;
  userAnswers: Record<string, string | number>;
  setCurrentQuestionIndex: (index: number) => void;
  handleQuestionComplete: (answers: Record<string, string | number>) => void;
  handleNextQuestion: () => void;
  handleRetry: () => void;
  resetAnswers: () => void;
  submitAnswers: () => Promise<{ score: number; feedback: string; correctAnswers: Record<string, string> }>;
}

export const useQuestions = (options: UseQuestionsOptions = {}): UseQuestionsReturn => {
  const { subjectId, difficulty, autoLoad = true } = options;
  
  const [questionSets, setQuestionSets] = useState<QuestionSet[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string | number>>({});

  const currentQuestion = questionSets[currentQuestionIndex] || null;

  const loadQuestions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const questions = await QuestionsService.fetchQuestionSets(subjectId, difficulty);
      setQuestionSets(questions);
      setCurrentQuestionIndex(0); // Reset to first question
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load questions. Please try again.");
      console.error("Error loading questions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionComplete = (answers: Record<string, string | number>) => {
    setUserAnswers(answers);
    setIsCompleted(true);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionSets.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // All questions completed
      console.log("All questions completed!");
      // You could emit an event or call a callback here
    }
    setIsCompleted(false);
    setShowFeedback(false);
    setUserAnswers({});
  };

  const handleRetry = () => {
    loadQuestions();
  };

  const resetAnswers = () => {
    setUserAnswers({});
    setIsCompleted(false);
    setShowFeedback(false);
  };

  const submitAnswers = async () => {
    if (!currentQuestion) {
      throw new Error('No current question to submit answers for');
    }
    
    try {
      const result = await QuestionsService.submitAnswers(currentQuestion.id, userAnswers);
      return result;
    } catch (err) {
      console.error("Error submitting answers:", err);
      throw err;
    }
  };

  // Auto-load questions on mount if enabled
  useEffect(() => {
    if (autoLoad) {
      loadQuestions();
    }
  }, [subjectId, difficulty, autoLoad]);

  return {
    questionSets,
    currentQuestionIndex,
    currentQuestion,
    isLoading,
    error,
    isCompleted,
    showFeedback,
    userAnswers,
    setCurrentQuestionIndex,
    handleQuestionComplete,
    handleNextQuestion,
    handleRetry,
    resetAnswers,
    submitAnswers,
  };
};
