"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Loader2 } from "lucide-react";
import FillInTheBlanks from "@/components/questions/FillInTheBlanks";
import GapFillWithWordBank from "@/components/questions/GapFillWithWordBank";
import TrueFalse from "@/components/questions/TrueFalse";
import Matching from "@/components/questions/Matching";
import OddOneOut from "@/components/questions/OddOneOut";
import SliderRange from "@/components/questions/SliderRange";
import MultipleCorrect from "@/components/questions/MultipleCorrect";
import Ordering from "@/components/questions/Ordering";
import PracticalBased from "@/components/questions/PracticalBased";
import CustomButton from "@/components/global/CustomButton";
import { 
  QuestionsService, 
  type QuestionSet, 
  type FillInTheBlanksData, 
  type GapFillData,
  type TrueFalseData,
  type MatchingData,
  type MatchingPair,
  type OddOneOutData,
  type SliderRangeData,
  type MultipleCorrectData,
  type OrderingData,
  type PracticalBasedData
} from "@/feature/students/questions/services/questionsService";


// Example of how to use with different parameters
// You can pass subjectId and difficulty to filter questions
// const questions = await QuestionsService.fetchQuestionSets('physics', 'medium');

export default function QuestionsPage() {
  const [questionSets, setQuestionSets] = useState<QuestionSet[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string | boolean | number | string[]> | MatchingPair[]>({});
  const [error, setError] = useState<string | null>(null);

  // Fetch questions from backend
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // You can customize this call with parameters:
        // const questions = await QuestionsService.fetchQuestionSets('physics', 'medium');
        const questions = await QuestionsService.fetchQuestionSets();
        setQuestionSets(questions);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load questions. Please try again.");
        console.error("Error loading questions:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const currentQuestion = questionSets[currentQuestionIndex];

  const handleQuestionComplete = (answers: Record<string, string | boolean | number | string[]> | MatchingPair[]) => {
    setUserAnswers(answers);
    setIsCompleted(true);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionSets.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // All questions completed - could redirect or show completion message
      console.log("All questions completed!");
      // Reset to first question for demo
      setCurrentQuestionIndex(0);
    }
    setIsCompleted(false);
    setShowFeedback(false);
    setUserAnswers({});
  };

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    // Retry loading questions
    const loadQuestions = async () => {
      try {
        const questions = await QuestionsService.fetchQuestionSets();
        setQuestionSets(questions);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load questions. Please try again.");
        console.error("Error loading questions:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadQuestions();
  };


  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col w-full h-full min-h-screen bg-background">
        <div className="flex flex-col w-full flex-1 gap-4 p-2 sm:p-4">
          <div className="flex-1 max-w-4xl mx-auto flex items-center justify-center">
            <Card className="border-0 bg-transparent shadow-none">
              <CardContent className="p-8 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-foreground/80">Loading questions...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col w-full h-full min-h-screen bg-background">
        <div className="flex flex-col w-full flex-1 gap-4 p-2 sm:p-4">
          <div className="flex-1 max-w-4xl mx-auto flex items-center justify-center">
            <Card className="border-0 bg-transparent shadow-none">
              <CardContent className="p-8 text-center">
                <p className="text-red-500 mb-4">{error}</p>
                <CustomButton
                  onClick={handleRetry}
                  label="Try Again"
                  active={true}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // No questions available
  if (!currentQuestion) {
    return (
      <div className="flex flex-col w-full h-full min-h-screen bg-background">
        <div className="flex flex-col w-full flex-1 gap-4 p-2 sm:p-4">
          <div className="flex-1 max-w-4xl mx-auto flex items-center justify-center">
            <Card className="border-0 bg-transparent shadow-none">
              <CardContent className="p-8 text-center">
                <p className="text-foreground/80">No questions available.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-background">
      <div className="flex flex-col w-full flex-1 gap-4 p-2 sm:p-4">
        {/* Progress indicator */}
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-foreground/70">
              Question {currentQuestionIndex + 1} of {questionSets.length}
            </span>
            <span className="text-sm text-foreground/70">
              {currentQuestion.type === "fill-blanks" ? "Fill in the Blanks" : 
               currentQuestion.type === "word-bank" ? "Gap Fill with Word Bank" : 
               currentQuestion.type === "true-false" ? "True or False" :
               currentQuestion.type === "matching" ? "Matching/Joining Questions" :
               currentQuestion.type === "slider-range" ? "Slider/Range Questions" :
               currentQuestion.type === "multiple-correct" ? "MCQ Multiple Select" :
               currentQuestion.type === "ordering" ? "Ordering/Sequencing" :
               currentQuestion.type === "practical-based" ? "Practical-Based Questions" :
               "Odd One Out"}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questionSets.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 max-w-4xl mx-auto">
          <Card className="border-0 bg-transparent shadow-none">
            <CardContent className="p-4 sm:p-6">
              {currentQuestion.type === "fill-blanks" ? (
                <FillInTheBlanks
                  title={(currentQuestion.data as FillInTheBlanksData).title}
                  instructions={(currentQuestion.data as FillInTheBlanksData).instructions}
                  questions={(currentQuestion.data as FillInTheBlanksData).questions}
                  onComplete={handleQuestionComplete}
                  isCompleted={isCompleted}
                  showFeedback={showFeedback}
                />
              ) : currentQuestion.type === "word-bank" ? (
                <GapFillWithWordBank
                  title={(currentQuestion.data as GapFillData).title}
                  instructions={(currentQuestion.data as GapFillData).instructions}
                  wordBank={(currentQuestion.data as GapFillData).wordBank}
                  questions={(currentQuestion.data as GapFillData).questions}
                  onComplete={handleQuestionComplete}
                  isCompleted={isCompleted}
                  showFeedback={showFeedback}
                />
              ) : currentQuestion.type === "true-false" ? (
                <TrueFalse
                  title={(currentQuestion.data as TrueFalseData).title}
                  instructions={(currentQuestion.data as TrueFalseData).instructions}
                  questions={(currentQuestion.data as TrueFalseData).questions}
                  onComplete={handleQuestionComplete}
                  isCompleted={isCompleted}
                  showFeedback={showFeedback}
                />
              ) : currentQuestion.type === "matching" ? (
                <Matching
                  title={(currentQuestion.data as MatchingData).title}
                  instructions={(currentQuestion.data as MatchingData).instructions}
                  leftItems={(currentQuestion.data as MatchingData).leftItems}
                  rightItems={(currentQuestion.data as MatchingData).rightItems}
                  correctPairs={(currentQuestion.data as MatchingData).correctPairs}
                  explanation={(currentQuestion.data as MatchingData).explanation}
                  onComplete={handleQuestionComplete}
                  isCompleted={isCompleted}
                  showFeedback={showFeedback}
                />
              ) : currentQuestion.type === "slider-range" ? (
                <SliderRange
                  title={(currentQuestion.data as SliderRangeData).title}
                  instructions={(currentQuestion.data as SliderRangeData).instructions}
                  questions={(currentQuestion.data as SliderRangeData).questions}
                  onComplete={handleQuestionComplete}
                  isCompleted={isCompleted}
                  showFeedback={showFeedback}
                />
              ) : currentQuestion.type === "multiple-correct" ? (
                <MultipleCorrect
                  title={(currentQuestion.data as MultipleCorrectData).title}
                  instructions={(currentQuestion.data as MultipleCorrectData).instructions}
                  questions={(currentQuestion.data as MultipleCorrectData).questions}
                  onComplete={handleQuestionComplete}
                  isCompleted={isCompleted}
                  showFeedback={showFeedback}
                />
              ) : currentQuestion.type === "ordering" ? (
                <Ordering
                  title={(currentQuestion.data as OrderingData).title}
                  instructions={(currentQuestion.data as OrderingData).instructions}
                  questions={(currentQuestion.data as OrderingData).questions}
                  onComplete={handleQuestionComplete}
                  isCompleted={isCompleted}
                  showFeedback={showFeedback}
                />
              ) : currentQuestion.type === "practical-based" ? (
                <PracticalBased
                  title={(currentQuestion.data as PracticalBasedData).title}
                  instructions={(currentQuestion.data as PracticalBasedData).instructions}
                  questions={(currentQuestion.data as PracticalBasedData).questions}
                  onComplete={handleQuestionComplete}
                  isCompleted={isCompleted}
                  showFeedback={showFeedback}
                />
              ) : (
                <OddOneOut
                  title={(currentQuestion.data as OddOneOutData).title}
                  instructions={(currentQuestion.data as OddOneOutData).instructions}
                  questions={(currentQuestion.data as OddOneOutData).questions}
                  onComplete={handleQuestionComplete}
                  isCompleted={isCompleted}
                  showFeedback={showFeedback}
                />
              )}

              {/* Navigation Button */}
              {isCompleted && (
                <div className="mt-6 flex justify-center">
                  <CustomButton
                    onClick={handleNextQuestion}
                    icon={<ArrowRight size={16} />}
                    label={currentQuestionIndex < questionSets.length - 1 ? "Next Question" : "Complete"}
                    active={true}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
