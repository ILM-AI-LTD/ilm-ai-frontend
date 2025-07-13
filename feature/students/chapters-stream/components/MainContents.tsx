import CustomButton from '@/components/global/CustomButton';
import ILMIAssistantv2 from '@/feature/parents/components/setup/common/ILMIAssistantv2';
import { useGenerateScript } from '@/feature/students/chapters-stream/hooks/useGenerateScript';
import { useQueryClient } from '@tanstack/react-query';
import { Play } from 'lucide-react';
import React, { useState } from 'react';
import CalloutHistoryContent from './CalloutHistoryContent';
import CalloutScriptStream from './CalloutScriptStream';

interface Goal {
    id: number;
    title: string;
    goalHistory: any[];
    isCompleted: boolean;
    isStarted: boolean;
}

interface MainContentProps {
    subject: string;
    topic: string;
    subtopic: string;
    paper: number;
    board: string;
    goals: Goal[];
    isLoading: boolean;
    selectedGoalId: number;
}

const MainContent: React.FC<MainContentProps> = ({
    subject,
    topic,
    subtopic,
    paper,
    board,
    goals,
    isLoading,
    selectedGoalId
}) => {
    const allNotStarted = goals.every(g => !g.isStarted);
    const selectedGoal = goals.find(g => g.id === selectedGoalId);
    const { mutate: generateScriptMutation, isPending, error } = useGenerateScript();
    const [scriptData, setScriptData] = useState<string>('');
    const [showNextButton, setShowNextButton] = useState(false);
    const queryClient = useQueryClient();

    const handleGenerateScript = () => {
        const firstGoal = goals[0];
        if (!firstGoal) return;

        generateScriptMutation({
            board,
            subject,
            paper,
            topic,
            subtopic,
            goal: firstGoal.title,
        }, {
            onSuccess: (res) => {
                setScriptData(res.data);

                setTimeout(() => {
                    queryClient.invalidateQueries({
                        queryKey: ['goals', board, subject, paper, topic, subtopic],
                    });
                }, 10000);
            },
            onError: (err) => {
                console.error('Script generation failed', err);
            },
        });
    };

    if (isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (allNotStarted) {
        return (
            <>
                {!scriptData ? (
                    <div className="w-full h-full flex items-center justify-center">
                        {
                            isPending ? (
                                <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <button
                                    className="size-20 bg-primary rounded-full cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out"
                                    onClick={handleGenerateScript}
                                >
                                    <Play size={40} fill='white' className='mx-auto' />
                                </button>
                            )
                        }
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-start justify-center">

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <ILMIAssistantv2 height={40} width={40} className="mt-2" />
                                <CalloutScriptStream
                                    title={goals[0].title}
                                    message={scriptData}
                                    orientation="left"
                                    className="w-full"
                                    onStreamEnd={() => setShowNextButton(true)}
                                />
                            </div>

                            {showNextButton && (
                                <div className="flex justify-end mt-4">
                                    <CustomButton
                                        label='Let’s go to question'
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                )}
            </>
        );
    }

    return (
        <div className="w-full h-full flex flex-col justify-start">
            {selectedGoal && selectedGoal.goalHistory.length > 0 ? (
                <div className="space-y-8">
                    {selectedGoal.goalHistory.map((entry, index) => (
                        <div>
                            <div key={index} className="flex items-start gap-4">
                                <ILMIAssistantv2 height={40} width={40} className="mt-2" />
                                <CalloutHistoryContent
                                    title={selectedGoal.title}
                                    message={
                                        typeof entry === 'string'
                                            ? entry
                                            : entry?.message || JSON.stringify(entry, null, 2)
                                    }
                                    orientation="left"
                                    className="w-full"
                                />
                            </div>

                            <div className="flex justify-end mt-4">
                                <CustomButton
                                    label='Let’s go to question'
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-muted">Select an available goal to see its content.</p>
                </div>
            )}
        </div>
    );
};

export default MainContent;