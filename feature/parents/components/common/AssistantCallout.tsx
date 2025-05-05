import React from 'react';

export interface AssistantCalloutProps {
    message: string;
    className?: string;
    orientation: 'top' | 'bottom' | 'left' | 'right';
}



const AssistantCallout: React.FC<AssistantCalloutProps> = ({ message, orientation, className = '' }) => {
    return (
        <div className={`relative ${className}`}>
            <div className="bg-brand-color-parent text-white px-6 py-4 md:py-6 text-xl font-normal rounded-xl ">
                {message}
            </div>
            <div
                className={`absolute transform w-4 h-4 bg-brand-color-parent rotate-45  ${orientation ==='bottom' ? "-translate-x-1/2 left-1/2 -bottom-2" : orientation === 'top' ? "-translate-x-1/2 left-1/2 -top-2" : orientation === 'left' ? "-left-2   top-1/2  -translate-y-1/2" : orientation === 'right' ? "-right-2  top-1/2  -translate-y-1/2" : ""}`}
                aria-hidden="true">
                    
                </div>
            
        </div>        
    );
};

export default AssistantCallout;