
import { useState, useEffect, useCallback } from 'react';
import { GuessResult, GameMode, GameResult } from '../types';
import { SECRET_CODE_LENGTH, MAX_GUESSES, HINT_COST, MAX_HINTS, DAILY_CHALLENGE_WGT_REWARDS } from '../constants';
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

export const useGameLogic = (mode: GameMode, quitGame: (result: GameResult, hintsUsed: number) => void) => {
    const { wgt, t, walletAddress } = useGame();
    const [secretCode, setSecretCode] = useState<number[]>([]);
    const [guesses, setGuesses] = useState<GuessResult[]>([]);
    const [currentGuess, setCurrentGuess] = useState<number[]>([]);
    const [gameResult, setGameResult] = useState<GameResult>(null);
    const [revealedHints, setRevealedHints] = useState<number[]>([]);
    const [hintsUsed, setHintsUsed] = useState(0);
    const [commentary, setCommentary] = useState<string>('');

    const storageKey = `wld-baseball-game-${walletAddress}-${mode}`; // ★ 유저별로 저장되도록 키 변경

    const resetGame = useCallback((newSecret: boolean = true) => {
        if (newSecret) {
            setSecretCode(generateSecretCode());
        }
        setGuesses([]);
        setCurrentGuess([]);
        setGameResult(null);
        setRevealedHints([]);
        setHintsUsed(0);
        setCommentary(t('commentary.ready'));
    }, [t]);

    // ★ 이어하기 로직 개선
    useEffect(() => {
        if (mode === 'daily') {
            const savedGame = localStorage.getItem(storageKey);
            if (savedGame) {
                const { secretCode: savedSecret, guesses: savedGuesses, revealedHints: savedRevealed, hintsUsed: savedHints } = JSON.parse(savedGame);
                setSecretCode(savedSecret);
                setGuesses(savedGuesses);
                setRevealedHints(savedRevealed);
                setHintsUsed(savedHints);
                setCommentary(t('commentary.ready'));
            } else {
                resetGame(true);
            }
        } else {
            resetGame(true);
        }
    }, [mode, storageKey, resetGame, t]);

    useEffect(() => {
        if (mode === 'daily' && secretCode.length > 0 && !gameResult) {
            const gameState = JSON.stringify({ secretCode, guesses, revealedHints, hintsUsed });
            localStorage.setItem(storageKey, gameState);
        }
    }, [guesses, secretCode, revealedHints, hintsUsed, storageKey, gameResult, mode]);

    // ★ 게임 종료 로직 개선
    const endGame = useCallback(async (result: GameResult) => { 
        setGameResult(result);
        if (mode === 'daily') {
            localStorage.removeItem(storageKey);
        }
        // 1. 오직 '오늘의 도전' 모드가 끝났을 때만 릴레이어를 호출합니다.
        if (mode === 'daily') {
        const rewardTable = DAILY_CHALLENGE_WGT_REWARDS;
        let rewardAmount = 0;
        
        if (result === 'homerun') {
            // guesses 배열의 길이가 현재 성공한 이닝(횟수)입니다. (0부터 시작)
            const successInning = guesses.length + 1;
            if(successInning > 0 && successInning <= rewardTable.length) {
            rewardAmount = rewardTable[successInning - 1];
            }
        }

        // 2. 우리 앱의 API 주소로 보낼 데이터를 준비합니다.
        const requestBody = {
            userAddress: walletAddress,
            hintsUsed: hintsUsed,
            rewardAmount: rewardAmount,
        };

        try {
            // 3. fetch를 사용하여 우리 API에 POST 요청을 보냅니다.
            const response = await fetch('/api/adjust-balance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (!response.ok) {
            throw new Error(data.message || 'API request failed');
            }

            console.log("API call successful:", data);
            alert("보상 지급이 블록체인에 기록되었습니다!");

        } catch (error) {
            console.error("API call failed:", error);
            alert("보상 지급에 실패했습니다. 콘솔을 확인해주세요.");
        }
        }

        // 4. quitGame을 호출하여 App.tsx에 게임이 완전히 끝났음을 알립니다.
        quitGame(result, hintsUsed);
    }, [mode, storageKey, hintsUsed, quitGame, walletAddress, guesses]); // 의존성 배열에 walletAddress와 guesses 추가

    // ★ 해설 로직 리팩토링
    const updateCommentary = useCallback((hits: number, fouls: number, strikes: number) => {
        const keyMap: { [key: number]: string } = { 1: '1', 2: '2', 3: '3' };
        if (strikes > 0) return setCommentary(t('commentary.dynamic.strike'));
        if (hits > 0) return setCommentary(t(`commentary.dynamic.hit${keyMap[hits]}`));
        if (fouls > 0) return setCommentary(t(`commentary.dynamic.foul${keyMap[fouls]}`));
        setCommentary(t('commentary.result', { hits, fouls }));
    }, [t]);

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
            setCommentary(t('commentary.dynamic.homerun'));
            endGame('homerun');
        } else {
            if (newGuesses.length >= MAX_GUESSES) {
                setCommentary(t('commentary.dynamic.strikeout'));
                endGame('strikeout');
            } else {
                updateCommentary(hits, fouls, strikes);
            }
        }
    }, [currentGuess, secretCode, guesses, endGame, updateCommentary, t]);

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
