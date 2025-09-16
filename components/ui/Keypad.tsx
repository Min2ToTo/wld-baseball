
import React from 'react';
import { useGame } from '../../contexts/GameContext';

interface KeypadProps {
    onKeyPress: (key: number | 'backspace' | 'enter') => void;
    disabledKeys: number[];
    currentGuessLength: number;
    maxGuessLength: number;
}

const Key: React.FC<{ value: string | JSX.Element; onClick: () => void; className?: string; disabled?: boolean }> = ({ value, onClick, className, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`h-14 rounded-lg font-bold text-xl flex items-center justify-center transition-colors transform active:scale-95 disabled:opacity-30 ${className}`}
    >
        {value}
    </button>
);

export const Keypad: React.FC<KeypadProps> = ({ onKeyPress, disabledKeys, currentGuessLength, maxGuessLength }) => {
    const { theme } = useGame();
    const numberKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // Dynamically adjust text color for better contrast on certain themes
    const enterKeyTextColor = (theme === 'dark' || theme === 'dusk' || theme === 'sakura') ? 'text-black' : 'text-white';

    return (
        <div className="grid grid-cols-3 gap-2 p-2">
            {numberKeys.map(num => (
                <Key
                    key={num}
                    value={num.toString()}
                    onClick={() => onKeyPress(num)}
                    disabled={disabledKeys.includes(num)}
                    className="bg-surface-inset text-text-base hover:bg-opacity-80"
                />
            ))}
            <Key
                value={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 002.828 0L21 12M3 12l6.414-6.414a2 2 0 012.828 0L21 12" />
                  </svg>
                }
                onClick={() => onKeyPress('backspace')}
                className="bg-danger text-white hover:bg-opacity-80"
            />
            <Key
                key={0}
                value="0"
                onClick={() => onKeyPress(0)}
                disabled={disabledKeys.includes(0)}
                className="bg-surface-inset text-text-base hover:bg-opacity-80"
            />
            <Key
                value={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                }
                onClick={() => onKeyPress('enter')}
                disabled={currentGuessLength !== maxGuessLength}
                className={`bg-accent ${enterKeyTextColor} hover:bg-accent-hover`}
            />
        </div>
    );
};