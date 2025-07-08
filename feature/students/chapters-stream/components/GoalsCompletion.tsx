import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { kebabToTitleCase } from '@/lib/utils'
import { Check } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type GoalsCompletionProps = {
    chapter: string;
    subChapters: string;
    goals: {
        id: number;
        title: string;
        isCompleted: boolean;
    }[];
}

const GoalsCompletion = ({ chapter, subChapters, goals }: GoalsCompletionProps) => {

    return (
        <Card className='hidden md:block max-w-[320px] w-full sticky top-10 bg-secondary border gap-2'>
            <CardHeader className='text-primary font-bold text-2xl capitalize'>
                {chapter}
            </CardHeader>

            <CardDescription className='text-primary font-bold text-base capitalize px-6'>
                {subChapters.replace(/-/g, ' ')}
            </CardDescription>

            <CardContent className='mt-4'>
                <ScrollArea className='h-72 w-full'>
                    <div className='relative pr-4'>
                        {goals.map((goal, index) => (
                            <div key={`${goal.id}-${index}`} className="relative flex items-start mb-4">
                                {index < goals.length - 1 && (
                                    <div className="absolute left-3 top-6 w-0.5 bg-gray-600"
                                        style={{ height: 'calc(100% + 1rem)' }}></div>
                                )}

                                <div className="relative z-10 flex-shrink-0 mr-3 sm:mr-4">
                                    {goal.isCompleted ? (
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                            <Check size={18} className="text-white" />
                                        </div>
                                    ) : (
                                        <div className="w-6 h-6 border-2 border-gray-400 rounded-full bg-secondary"></div>
                                    )}
                                </div>

                                <Link href={'/#'} className="flex-1 pt-0.5">
                                    <p className={`sm:text-lg -mt-1 ${goal.isCompleted ? 'text-foreground' : 'text-foreground/50'
                                        }`}>
                                        {kebabToTitleCase(goal.title)}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}

export default GoalsCompletion