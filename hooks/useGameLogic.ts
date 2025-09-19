import { useState, useCallback } from 'react';
import { GuessResult, GameMode, GameResult } from '../types';
import { SECRET_CODE_LENGTH, MAX_GUESSES } from '../constants';
import { useGame } from '../contexts/GameContext';

const generateSecretCode = (): number[] => {
    const digits = Array.from({ length: 10 }, (_, i) => i);
    const code: number[] = [];
    while (code.length < SECRET_CODE_LENGTH) {
        const idx = Math.floor(Math.random() * digits.length);
        code.push(digits.splice(idx, 1)[0]);
    }
    return code;
};

type QuitGameCallback = (result: GameResult, hintsUsed: number, finalInning: number) => void;

// Pure game logic hook: no API/localStorage side effects
export const useGameLogic = (mode: GameMode, quitGame: QuitGameCallback) => {
    const { wgt, t } = useGame();
    const [secretCode, setSecretCode] = useState<number[]>(generateSecretCode());
    const [guesses, setGuesses] = useState<GuessResult[]>([]);
    const [currentGuess, setCurrentGuess] = useState<number[]>([]);
    const [gameResult, setGameResult] = useState<GameResult>(null);
    const [revealedHints, setRevealedHints] = useState<number[]>([]);
    const [hintsUsed, setHintsUsed] = useState(0);
    const [commentary, setCommentary] = useState<string>(t('commentary.ready'));

    const resetGame = useCallback(() => {
        setSecretCode(generateSecretCode());
        setGuesses([]);
        setCurrentGuess([]);
        setGameResult(null);
        setRevealedHints([]);
        setHintsUsed(0);
        setCommentary(t('commentary.ready'));
    }, [t]);

    const updateCommentary = useCallback((hits: number, fouls: number, strikes: number) => {
        if (hits > 0) setCommentary(t('commentary.dynamic.hit', { hits }));
        else if (fouls > 0) setCommentary(t('commentary.dynamic.foul', { fouls }));
        else if (strikes > 0) setCommentary(t('commentary.dynamic.strike', { strikes }));
        else setCommentary(t('commentary.dynamic.nothing'));
    }, [t]);

    const endGame = useCallback((result: GameResult) => {
        setGameResult(result);
        const finalInning = guesses.length + (result === 'homerun' ? 1 : 0);
        quitGame(result, hintsUsed, finalInning);
    }, [guesses.length, hintsUsed, quitGame]);

    const handleGuessSubmit = useCallback(() => {
        if (currentGuess.length !== SECRET_CODE_LENGTH || gameResult) return;

        let hits = 0;
        let fouls = 0;

        currentGuess.forEach((digit, index) => {
            if (digit === secretCode[index]) {
                hits++;
            } else if (secretCode.includes(digit)) {
                fouls++;
            }
        });

        const strikes = hits === 0 && fouls === 0 ? 1 : 0;

        const newGuessResult: GuessResult = {
            guess: [...currentGuess],
            hits,
            fouls,
            strikes,
        };

        setGuesses(prevGuesses => [...prevGuesses, newGuessResult]);
        setCurrentGuess([]);

        if (hits === SECRET_CODE_LENGTH) {
            setCommentary(t('commentary.dynamic.homerun'));
            endGame('homerun');
        } else {
            if (guesses.length + 1 >= MAX_GUESSES) {
                setCommentary(t('commentary.dynamic.strikeout'));
                endGame('strikeout');
            } else {
                updateCommentary(hits, fouls, strikes);
            }
        }
    }, [currentGuess, secretCode, guesses.length, gameResult, endGame, updateCommentary, t]);

    const useHint = useCallback(() => {
        // Example: you may want to check for hint limits, etc.
        if (gameResult) return;

        const availableDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const nonSecretDigits = availableDigits.filter(
            d => !secretCode.includes(d) && !revealedHints.includes(d)
        );

        if (nonSecretDigits.length > 0) {
            const hint = nonSecretDigits[Math.floor(Math.random() * nonSecretDigits.length)];
            setRevealedHints(prev => [...prev, hint]);
            setHintsUsed(prev => prev + 1);
            setCommentary(t('commentary.dynamic.hintUsed', { hint: hint }));
        }
    }, [gameResult, secretCode, revealedHints, t]);

    return {
        secretCode,
        guesses,
        currentGuess,
        setCurrentGuess,
        gameResult,
        revealedHints,
        hintsUsed,
        handleGuessSubmit,
        useHint,
        resetGame,
        commentary,
    };
};