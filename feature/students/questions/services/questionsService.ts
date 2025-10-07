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

export interface SliderRangeQuestion {
  id: string;
  text: string;
  min: number;
  max: number;
  step: number;
  minLabel: string;
  maxLabel: string;
  correctAnswer: number;
  unit?: string;
  tolerance?: number;
}

export interface SliderRangeData {
  title: string;
  instructions: string;
  questions: SliderRangeQuestion[];
}

export interface MultipleCorrectOption {
  id: string;
  text: string;
}

export interface MultipleCorrectQuestion {
  id: string;
  text: string;
  options: MultipleCorrectOption[];
  correctAnswers: string[];
  explanation?: string;
}

export interface MultipleCorrectData {
  title: string;
  instructions: string;
  questions: MultipleCorrectQuestion[];
}

export interface PracticalBasedQuestion {
  id: string;
  text: string;
  videoUrl?: string;
  imageUrl?: string;
  placeholder?: string;
  sampleAnswer?: string;
  minWords?: number;
}

export interface PracticalBasedData {
  title: string;
  instructions?: string;
  questions: PracticalBasedQuestion[];
}

export interface OrderingItem {
  id: string;
  text: string;
  correctPosition: number;
}

export interface OrderingQuestion {
  id: string;
  text: string;
  items: OrderingItem[];
  explanation?: string;
}

export interface OrderingData {
  title: string;
  instructions: string;
  questions: OrderingQuestion[];
}

export interface QuestionSet {
  id: string;
  type: "fill-blanks" | "word-bank" | "true-false" | "matching" | "odd-one-out" | "slider-range" | "multiple-correct" | "practical-based" | "ordering";
  data: FillInTheBlanksData | GapFillData | TrueFalseData | MatchingData | OddOneOutData | SliderRangeData | MultipleCorrectData | PracticalBasedData | OrderingData;
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
  },
  {
    id: "set6",
    type: "slider-range",
    data: {
      title: "Slider/Range Questions",
      instructions: "Perfect for numerical ranges, percentages, and continuous values",
      questions: [
        {
          id: "q1",
          text: "What is the approximate pH level of pure water?",
          min: 0,
          max: 14,
          step: 1,
          minLabel: "Acidic",
          maxLabel: "Basic",
          correctAnswer: 7,
          unit: "PH",
          tolerance: 0
        },
        {
          id: "q2",
          text: "At what temperature does water boil at sea level?",
          min: 0,
          max: 150,
          step: 5,
          minLabel: "Freezing",
          maxLabel: "Very Hot",
          correctAnswer: 100,
          unit: "°C",
          tolerance: 5
        },
        {
          id: "q3",
          text: "What percentage of Earth's surface is covered by water?",
          min: 0,
          max: 100,
          step: 5,
          minLabel: "None",
          maxLabel: "All",
          correctAnswer: 70,
          unit: "%",
          tolerance: 5
        }
      ]
    }
  },
  {
    id: "set7",
    type: "multiple-correct",
    data: {
      title: "MCQ multiple select",
      instructions: "Tick two boxes.",
      questions: [
        {
          id: "q1",
          text: "Which two statements are correct about nuclear fission?",
          options: [
            {
              id: "a",
              text: "It happens when small nuclei join together."
            },
            {
              id: "b",
              text: "It releases energy when heavy nuclei split."
            },
            {
              id: "c",
              text: "It is the process that powers the Sun."
            },
            {
              id: "d",
              text: "It is used in nuclear power stations."
            }
          ],
          correctAnswers: ["b", "d"],
          explanation: "Nuclear fission occurs when heavy nuclei split, releasing energy. This process is used in nuclear power stations."
        },
        {
          id: "q2",
          text: "Which three of the following are renewable energy sources?",
          options: [
            {
              id: "a",
              text: "Coal"
            },
            {
              id: "b",
              text: "Solar power"
            },
            {
              id: "c",
              text: "Wind power"
            },
            {
              id: "d",
              text: "Natural gas"
            },
            {
              id: "e",
              text: "Hydroelectric power"
            }
          ],
          correctAnswers: ["b", "c", "e"],
          explanation: "Solar, wind, and hydroelectric power are renewable energy sources that naturally replenish."
        }
      ]
    }
  },
  {
    id: "set8",
    type: "ordering",
    data: {
      title: "Matching/Joining Questions",
      instructions: "Ordering/Sequencing",
      questions: [
        {
          id: "q1",
          text: "Arrange the steps of mitosis in the correct order:",
          items: [
            { id: "prophase", text: "Prophase", correctPosition: 0 },
            { id: "metaphase", text: "Metaphase", correctPosition: 1 },
            { id: "anaphase", text: "Anaphase", correctPosition: 2 },
            { id: "telophase", text: "Telophase", correctPosition: 3 }
          ],
          explanation: "Mitosis proceeds through Prophase, Metaphase, Anaphase, and Telophase in that order."
        }
      ]
    }
  },
  {
    id: "set9",
    type: "practical-based",
    data: {
      title: "Practical-Based Questions",
      questions: [
        {
          id: "q1",
          text: "You are conducting an experiment to test the effect of temperature on enzyme activity. Design an experiment including materials needed, procedure, and expected results. What safety precautions would you take?",
          placeholder: "Describe your experimental design, procedure, and analysis ...",
          minWords: 50,
          sampleAnswer: "Materials needed:\n- Enzyme solution (e.g., catalase)\n- Hydrogen peroxide substrate\n- Test tubes and water baths at different temperatures (0°C, 20°C, 37°C, 60°C, 100°C)\n- Thermometer\n- Timer\n- Safety goggles and lab coat\n\nProcedure:\n1. Set up water baths at different temperatures\n2. Add equal amounts of enzyme solution to test tubes\n3. Place tubes in water baths for 5 minutes to equilibrate\n4. Add equal amounts of hydrogen peroxide to each tube\n5. Measure reaction rate by observing oxygen bubble formation\n6. Record results at 30-second intervals for 5 minutes\n\nExpected results:\n- Optimal activity around 37°C (human body temperature)\n- Reduced activity at low temperatures\n- Denaturation at high temperatures (>60°C)\n\nSafety precautions:\n- Wear safety goggles and lab coat\n- Handle hydrogen peroxide carefully as it's an oxidizing agent\n- Be cautious with hot water baths\n- Clean up spills immediately\n- Dispose of materials properly"
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
    answers: Record<string, string | boolean | number | string[]> | MatchingPair[]
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
      } else if (questionSet.type === 'slider-range') {
        const data = questionSet.data as SliderRangeData;
        const numberAnswers = answers as Record<string, number>;
        data.questions.forEach(question => {
          correctAnswers[question.id] = question.correctAnswer.toString();
          const tolerance = question.tolerance || 0;
          if (Math.abs(numberAnswers[question.id] - question.correctAnswer) <= tolerance) {
            correctCount++;
          }
        });
      } else if (questionSet.type === 'multiple-correct') {
        const data = questionSet.data as MultipleCorrectData;
        const arrayAnswers = answers as Record<string, string[]>;
        data.questions.forEach(question => {
          correctAnswers[question.id] = question.correctAnswers.join(', ');
          const userAnswers = arrayAnswers[question.id] || [];
          // Check if arrays have same length and same elements
          if (userAnswers.length === question.correctAnswers.length &&
              question.correctAnswers.every(ans => userAnswers.includes(ans))) {
            correctCount++;
          }
        });
      } else if (questionSet.type === 'ordering') {
        const data = questionSet.data as OrderingData;
        const arrayAnswers = answers as Record<string, string[]>;
        data.questions.forEach(question => {
          const correctOrder = [...question.items]
            .sort((a, b) => a.correctPosition - b.correctPosition)
            .map(item => item.id);
          correctAnswers[question.id] = correctOrder.join(' → ');
          const userOrder = arrayAnswers[question.id] || [];
          if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
            correctCount++;
          }
        });
      } else if (questionSet.type === 'practical-based') {
        const data = questionSet.data as PracticalBasedData;
        const stringAnswers = answers as Record<string, string>;
        data.questions.forEach(question => {
          correctAnswers[question.id] = "Submitted for review";
          // For practical-based questions, just check if answer is provided
          if (stringAnswers[question.id] && stringAnswers[question.id].trim().length > 0) {
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
        : questionSet.type === 'slider-range'
        ? (questionSet.data as SliderRangeData).questions.length
        : questionSet.type === 'multiple-correct'
        ? (questionSet.data as MultipleCorrectData).questions.length
        : questionSet.type === 'ordering'
        ? (questionSet.data as OrderingData).questions.length
        : questionSet.type === 'practical-based'
        ? (questionSet.data as PracticalBasedData).questions.length
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
