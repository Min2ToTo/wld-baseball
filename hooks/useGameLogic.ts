
import { useState, useEffect, useCallback } from 'react';
import { GuessResult, GameMode, GameResult } from '../types';
import { SECRET_CODE_LENGTH, MAX_GUESSES, HINT_COST, MAX_HINTS } from '../constants';
import { useGame } from '../contexts/GameContext';

const generateSecretCode = (): number[] => {
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const secret: number[] = [];
    for (let i = 0; i < SECRET_CODE_LENGTH; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        secret.push(digits.splice(randomIndex, 1)[0]);
    }
    return secret;
};

export const useGameLogic = (mode: GameMode) => {
    const { wgt, t } = useGame();
    const [secretCode, setSecretCode] = useState<number[]>([]);
    const [guesses, setGuesses] = useState<GuessResult[]>([]);
    const [currentGuess, setCurrentGuess] = useState<number[]>([]);
    const [gameResult, setGameResult] = useState<GameResult>(null);
    const [revealedHints, setRevealedHints] = useState<number[]>([]);
    const [hintsUsed, setHintsUsed] = useState(0);
    const [commentary, setCommentary] = useState<string>('');

    const storageKey = `wld-baseball-game-${mode}`;

    const resetGame = useCallback(() => {
        const newSecretCode = generateSecretCode();
        setSecretCode(newSecretCode);
        setGuesses([]);
        setCurrentGuess([]);
        setGameResult(null);
        setRevealedHints([]);
        setHintsUsed(0);
        setCommentary(t('commentary.ready'));
        if (mode === 'daily') {
            localStorage.removeItem(storageKey);
        }
    }, [storageKey, t, mode]);

    useEffect(() => {
        if (mode === 'daily') {
            const savedGame = localStorage.getItem(storageKey);
            if (savedGame) {
                const { secretCode, guesses, revealedHints, hintsUsed } = JSON.parse(savedGame);
                setSecretCode(secretCode);
                setGuesses(guesses);
                setRevealedHints(revealedHints);
                setHintsUsed(hintsUsed);
                setCommentary(t('commentary.ready'));
            } else {
                resetGame();
            }
        } else {
            resetGame();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode, resetGame]);

    useEffect(() => {
        if (mode === 'daily' && secretCode.length > 0 && !gameResult) {
            const gameState = JSON.stringify({ secretCode, guesses, revealedHints, hintsUsed });
            localStorage.setItem(storageKey, gameState);
        }
    }, [guesses, secretCode, revealedHints, hintsUsed, storageKey, gameResult, mode]);

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
        const newGuessResult: GuessResult = { guess: currentGuess, hits, fouls, strikes };
        const newGuesses = [...guesses, newGuessResult];
        setGuesses(newGuesses);
        setCurrentGuess([]);

        if (hits === SECRET_CODE_LENGTH) {
            setGameResult('homerun');
            setCommentary(t('commentary.dynamic.homerun'));
            if(mode === 'daily') localStorage.removeItem(storageKey);
        } else {
            if (newGuesses.length >= MAX_GUESSES) {
                setGameResult('strikeout');
                setCommentary(t('commentary.dynamic.strikeout'));
                if(mode === 'daily') localStorage.removeItem(storageKey);
            } else if (strikes > 0) {
                 setCommentary(t('commentary.dynamic.strike'));
            } else if (fouls === 3) {
                setCommentary(t('commentary.dynamic.foul3'));
            } else if (fouls === 2) {
                setCommentary(t('commentary.dynamic.foul2'));
            } else if (fouls === 1) {
                setCommentary(t('commentary.dynamic.foul1'));
            } else if (hits === 2) {
                setCommentary(t('commentary.dynamic.hit2'));
            } else if (hits === 1) {
                setCommentary(t('commentary.dynamic.hit1'));
            } else {
                setCommentary(t('commentary.result', { hits, fouls }));
            }
        }
    }, [currentGuess, secretCode, guesses, gameResult, storageKey, t, mode]);

    const useHint = useCallback(() => {
        if (mode !== 'daily' || gameResult) return;

        if (wgt < HINT_COST) {
            setCommentary(t('commentary.notEnoughWgt'));
            return;
        }
        if (hintsUsed >= MAX_HINTS) {
            setCommentary(t('commentary.noMoreHintInGame'));
            return;
        }

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
    }, [wgt, hintsUsed, gameResult, secretCode, revealedHints, t, mode]);

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
