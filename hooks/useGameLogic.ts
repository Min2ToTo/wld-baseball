import { useState, useEffect, useCallback } from 'react';
import { GuessResult, GameMode, GameResult } from '../types';
import { SECRET_CODE_LENGTH, MAX_GUESSES } from '../constants';
import { useGame } from '../contexts/GameContext';

const generateSecretCode = (): number[] => { /* ... 동일 ... */ };

// ★ quitGame 콜백을 다시 받도록 변경 (결과만 전달)
export const useGameLogic = (mode: GameMode, quitGame: (result: GameResult, hintsUsed: number) => void) => {
    const { wgt, t, walletAddress } = useGame();
    const [secretCode, setSecretCode] = useState<number[]>([]);
    const [guesses, setGuesses] = useState<GuessResult[]>([]);
    const [currentGuess, setCurrentGuess] = useState<number[]>([]);
    const [gameResult, setGameResult] = useState<GameResult>(null);
    const [revealedHints, setRevealedHints] = useState<number[]>([]);
    const [hintsUsed, setHintsUsed] = useState(0);
    const [commentary, setCommentary] = useState<string>('');

    const storageKey = `wld-baseball-game-${walletAddress}-${mode}`;

    const resetGame = useCallback(() => {
        setSecretCode(generateSecretCode());
        setGuesses([]);
        setCurrentGuess([]);
        setGameResult(null);
        setRevealedHints([]);
        setHintsUsed(0);
        setCommentary(t('commentary.ready'));
    }, [t]);

    // ★ 이어하기 로직은 GameScreen에서 처리하도록 단순화
    useEffect(() => {
        const savedGame = localStorage.getItem(storageKey);
        if (mode === 'daily' && savedGame) {
            const { secretCode: savedSecret, guesses: savedGuesses, revealedHints: savedRevealed, hintsUsed: savedHints } = JSON.parse(savedGame);
            setSecretCode(savedSecret);
            setGuesses(savedGuesses);
            setRevealedHints(savedRevealed);
            setHintsUsed(savedHints);
        } else {
            resetGame();
        }
    }, [mode, storageKey, resetGame]);

    // ★ 상태 저장 로직도 GameScreen에서 처리하도록 단순화
    useEffect(() => {
        if (mode === 'daily' && secretCode.length > 0 && !gameResult) {
            const gameState = JSON.stringify({ secretCode, guesses, revealedHints, hintsUsed });
            localStorage.setItem(storageKey, gameState);
        }
    }, [guesses, secretCode, revealedHints, hintsUsed, storageKey, gameResult, mode]);

    const endGame = useCallback((result: GameResult) => {
        setGameResult(result);
        if (mode === 'daily') {
            localStorage.removeItem(storageKey);
        }
        // ★ API 호출 없이, 결과만 부모에게 전달
        quitGame(result, hintsUsed);
    }, [mode, storageKey, hintsUsed, quitGame]);

    const handleGuessSubmit = useCallback(() => {
        if (currentGuess.length !== SECRET_CODE_LENGTH || gameResult) return;
        let hits = 0; let fouls = 0;
        currentGuess.forEach((digit, index) => {
            if (digit === secretCode[index]) hits++;
            else if (secretCode.includes(digit)) fouls++;
        });

        const strikes = hits === 0 && fouls === 0 ? 1 : 0;
        const newGuessResult: GuessResult = { guess: currentGuess, hits, fouls, strikes };
        setGuesses(prev => [...prev, newGuessResult]);
        setCurrentGuess([]);

        if (hits === SECRET_CODE_LENGTH) {
            setCommentary(t('commentary.dynamic.homerun'));
            endGame('homerun');
        } else if (guesses.length + 1 >= MAX_GUESSES) {
            setCommentary(t('commentary.dynamic.strikeout'));
            endGame('strikeout');
        } else {
            } else {
                updateCommentary(hits, fouls, strikes);
            }
        }
    }, [currentGuess, secretCode, guesses, gameResult, endGame, t]);

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
