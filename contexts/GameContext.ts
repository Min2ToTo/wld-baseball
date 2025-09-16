
import { createContext, useContext, Dispatch, SetStateAction } from 'react';
import { GameMode, Language, Theme } from '../types';

export interface GameContextType {
    wgt: number;
    setWgt: Dispatch<SetStateAction<number>>;
    startGame: (mode: GameMode) => void;
    quitGame: () => void;
    t: (key: string, params?: { [key: string]: string | number }) => string;
    language: Language;
    setLanguage: Dispatch<SetStateAction<Language>>;
    isLanguageModalOpen: boolean;
    setIsLanguageModalOpen: Dispatch<SetStateAction<boolean>>;
    isHelpModalOpen: boolean;
    setIsHelpModalOpen: Dispatch<SetStateAction<boolean>>;
    walletAddress: string | null;
    isAuthenticated: boolean;
    theme: Theme;
    setTheme: Dispatch<SetStateAction<Theme>>;
}

export const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
