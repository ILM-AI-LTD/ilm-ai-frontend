"use client"

import { kebabToTitleCase } from '@/lib/utils';
import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';

export interface CalloutContentHistoryProps {
    title: string;
    message: string;
    className?: string;
    orientation: 'top' | 'bottom' | 'left' | 'right';
}
const CalloutContentHistory: React.FC<CalloutContentHistoryProps> = ({ message, orientation, className = '', title }) => {

    return (
        <div className={`relative ${className}`}>
            <div className="bg-background border text-white px-6 py-4 rounded-lg">

                <p className='text-[#049F6C] font-normal text-lg'>{kebabToTitleCase(title)}</p>

                <MarkdownRenderer content={message} />
            </div>
            <div
                className={`absolute  transform w-4 h-4 bg-background rotate-45 border-l border-b
    ${orientation === 'bottom' ? '-translate-x-1/2 left-1/2 -bottom-2' :
                        orientation === 'top' ? '-translate-x-1/2 left-1/2 -top-2' :
                            orientation === 'left' ? '-left-2 top-4' :
                                orientation === 'right' ? '-right-2 top-4' : ''
                    }`}
                aria-hidden="true"
            />

        </div>
    );
};

export default CalloutContentHistory;