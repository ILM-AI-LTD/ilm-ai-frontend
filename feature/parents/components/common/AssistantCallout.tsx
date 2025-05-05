import React from 'react';

export interface AssistantCalloutProps {
    message: string;
    className?: string;
}

const AssistantCallout: React.FC<AssistantCalloutProps> = ({ message, className = '' }) => {
    return (
        <div className={`relative inline-block ${className}`}>
            <div className="bg-brand-color-parent text-white px-6 py-3 text-lg font-normal rounded-xl ">
                {message}
            </div>
            <div
                className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-4 h-4 bg-brand-color-parent rotate-45"
                aria-hidden="true"
            />
        </div>
    );
};

export default AssistantCallout;