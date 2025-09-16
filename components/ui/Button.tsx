
import React from 'react';
import { useGame } from '../../contexts/GameContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', ...props }) => {
    const { theme } = useGame();
    const baseClasses = 'px-4 py-2 font-bold rounded-lg transition-transform transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md';
    
    // Dynamically adjust text color for better contrast on certain themes
    const primaryTextColor = (theme === 'dark' || theme === 'dusk' || theme === 'sakura') ? 'text-black' : 'text-white';

    const variantClasses = {
        primary: `bg-accent ${primaryTextColor} hover:bg-accent-hover`,
        secondary: 'bg-surface-inset text-text-base hover:bg-opacity-80',
        danger: 'bg-danger text-white hover:bg-opacity-80',
    };

    return (
        <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};