import CustomButton from '@/components/global/CustomButton';
import React from 'react';

export interface FooterButton {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
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
        <div className={`flex items-center border-t-1 border-brand-color-parent ${justifyClass} py-6 md:py-14 bg-transparent ${className}`}>
            {leftButton && (
                <CustomButton
                    label={leftButton.label}
                    onClick={leftButton.onClick}
                    disabled={leftButton.disabled}
                    className="h-[52px] bg-brand-color-parent text-white py-2 px-8 font-bold text-base rounded-full hover:bg-brand-color-parent disabled:opacity-50"

                />
            )}

            <CustomButton
                label={rightButton.label}
                onClick={rightButton.onClick}
                disabled={rightButton.disabled}
                className="h-[52px] bg-brand-color-parent text-white py-2 px-8 font-bold text-base rounded-full hover:bg-brand-color-parent disabled:opacity-50"

            />
        </div>
    );
};

export default FooterParents;
