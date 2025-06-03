import CustomButton from '@/components/global/CustomButton';
import React from 'react';

export interface FooterButton {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    isPending?: boolean;
}

export interface FooterStudentsProps {
    leftButton?: FooterButton;
    rightButton: FooterButton;
    className?: string;
}


const FooterStudents: React.FC<FooterStudentsProps> = ({
    leftButton,
    rightButton,
    className = ''
}) => {
    const justifyClass = leftButton ? 'justify-between' : 'justify-end';

    return (
        <div className={`flex items-center border-t-1 border-button-hover-color ${justifyClass} py-6 bg-transparent ${className}`}>
            {leftButton && (
                <CustomButton
                    label={leftButton.label}
                    onClick={leftButton.onClick}
                    disabled={leftButton.disabled}
                    className="h-[52px] bg-button-hover-color text-white py-2 px-8 font-bold text-base rounded-full hover:bg-brand-color disabled:opacity-50 shadow-[0px_8px_0px_0px_#0077cc] hover:shadow-[0px_8px_0px_0px_#0077cc]"

                />
            )}

            <CustomButton
                label={rightButton.label}
                onClick={rightButton.onClick}
                disabled={rightButton.disabled}
                isLoading={rightButton.isPending}
                className="h-[52px] bg-button-hover-color text-white py-2 px-8 font-bold text-base rounded-full hover:bg-brand-color disabled:opacity-50 shadow-[0px_8px_0px_0px_#0077cc] hover:shadow-[0px_8px_0px_0px_#0077cc]"

            />
        </div>
    );
};

export default FooterStudents;
