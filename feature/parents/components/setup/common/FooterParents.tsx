import CustomButton from '@/components/global/CustomButton';
import React from 'react';

export interface FooterButton {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    isPending?: boolean;
}

export interface FooterParentsProps {
    leftButton?: FooterButton;
    rightButton: FooterButton;
    className?: string;
}


const FooterParents: React.FC<FooterParentsProps> = ({
    leftButton,
    rightButton,
    className = ''
}) => {
    const justifyClass = leftButton ? 'justify-between' : 'justify-end';

    return (
        <div className={`flex items-center ${justifyClass} py-6 bg-transparent ${className}`}>
            {leftButton && (
                <CustomButton
                    label={leftButton.label}
                    onClick={leftButton.onClick}
                    disabled={leftButton.disabled}
                    className="h-[52px]  text-white py-2 px-8 font-bold text-base rounded-full disabled:opacity-70"

                />
            )}

            <CustomButton
                label={rightButton.label}
                onClick={rightButton.onClick}
                disabled={rightButton.disabled}
                isLoading={rightButton.isPending}
                className="h-[52px]  text-white py-2 px-8 font-bold text-base rounded-full disabled:opacity-70"

            />
        </div>
    );
};

export default FooterParents;
