
import React, { useCallback, useState } from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import { GameMode, GuessResult } from '../types';
import { useGame } from '../contexts/GameContext';
import { Keypad } from './ui/Keypad';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { ResultModal } from './modals/ResultModal';
import { SECRET_CODE_LENGTH, MAX_GUESSES, HINT_COST, MAX_HINTS } from '../constants';

interface GameScreenProps {
    mode: GameMode;
}

const GuessDisplay: React.FC<{ guess: number[] }> = ({ guess }) => (
    <div className="flex gap-2">
        {Array.from({ length: SECRET_CODE_LENGTH }).map((_, i) => (
            <div key={i} className="w-10 h-12 bg-surface-base rounded-md flex items-center justify-center text-2xl font-bold font-orbitron">
                {guess[i] ?? ''}
            </div>
        ))}
    </div>
);

const ResultPill: React.FC<{ type: 'hit' | 'foul' | 'strike', count: number, t: (key: string) => string }> = ({ type, count, t }) => {
    if (count === 0) return null;
    const colors = {
        hit: 'bg-success',
        foul: 'bg-commentary',
        strike: 'bg-danger',
    };
    const labels: {[key: string]: string} = {
        hit: t('game.hit_short'),
        foul: t('game.foul_short'),
        strike: t('game.strike_short'),
    }
    return <span className={`px-3 py-1 text-xs font-bold text-white rounded-full ${colors[type]}`}>{`${count}${labels[type]}`}</span>;
}

const HistoryRow: React.FC<{ result: GuessResult, inning: number, t: (key: string, params?: any) => string }> = ({ result, inning, t }) => (
    <div className="flex items-center justify-between p-2 rounded-lg odd:bg-surface-raised/30 even:bg-transparent">
        <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-text-muted">{inning}</span>
            <span className="text-lg font-mono tracking-widest">{result.guess.join(' ')}</span>
        </div>
        <div className="flex gap-2">
             {result.strikes > 0 ? (
                <ResultPill type="strike" count={result.strikes * 3} t={t} />
             ) : (
                <>
                    <ResultPill type="hit" count={result.hits} t={t} />
                    <ResultPill type="foul" count={result.fouls} t={t} />
                </>
             )}
        </div>
    </div>
);

export const GameScreen: React.FC<GameScreenProps> = ({ mode }) => {
    const { quitGame, t, setWgt } = useGame();
    const {
        secretCode,
        guesses,
        currentGuess,
        setCurrentGuess,
        gameResult,
        revealedHints,
        hintsUsed,
        handleGuessSubmit,
        useHint,
        commentary,
    } = useGameLogic(mode);
    const [isGiveUpModalOpen, setIsGiveUpModalOpen] = useState(false);

    const handleKeyPress = useCallback((key: number | 'backspace' | 'enter') => {
        if (gameResult) return;
        if (key === 'enter') {
            handleGuessSubmit();
        } else if (key === 'backspace') {
            setCurrentGuess(prev => prev.slice(0, -1));
        } else if (typeof key === 'number' && currentGuess.length < SECRET_CODE_LENGTH && !currentGuess.includes(key)) {
            setCurrentGuess(prev => [...prev, key]);
        }
    }, [currentGuess, handleGuessSubmit, gameResult]);
    
    const handleConfirmGiveUp = () => {
        const cost = hintsUsed * HINT_COST;
        if (mode === 'daily' && cost > 0) {
            setWgt(prev => Math.max(0, prev - cost));
        }
        setIsGiveUpModalOpen(false);
        quitGame();
    };
    
    return (
        <div className="p-4 flex flex-col h-full">
            <header className="flex justify-between items-center mb-2">
                <div>
                    <h2 className="text-xl font-bold">{mode === 'daily' ? t('game.dailyChallengeTitle') : t('game.practiceModeTitle')}</h2>
                    <p className="text-sm text-text-muted">{t('game.inning', { inning: guesses.length + 1, max: MAX_GUESSES })}</p>
                </div>
                <Button onClick={() => setIsGiveUpModalOpen(true)} variant="danger" className="text-xs !py-1 !px-2">{t('game.giveUp')}</Button>
            </header>

            <div className="h-16 bg-surface-base rounded-lg p-2 mb-2 flex items-center justify-center text-center text-commentary italic shrink-0">
                <p>{commentary}</p>
            </div>
            
            <div className="flex-grow bg-surface-base rounded-lg p-2 overflow-y-auto mb-4 custom-scrollbar">
                {guesses.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-text-muted">...</div>
                ) : (
                    [...guesses].reverse().map((g, i) => <HistoryRow key={i} result={g} inning={guesses.length - i} t={t} />)
                )}
            </div>

            <div className="shrink-0">
                <div className="flex items-center justify-between mb-2">
                    <GuessDisplay guess={currentGuess} />
                    <div className="text-center">
                        <Button onClick={useHint} disabled={mode === 'practice' || hintsUsed >= MAX_HINTS} className="text-xs !py-1 !px-2">
                            {t('game.useHint')}
                        </Button>
                        { mode === 'daily' && <p className="text-xs text-text-muted mt-1">{t('game.hintCost', { count: HINT_COST })}</p> }
                    </div>
                </div>
                
                <Keypad 
                    onKeyPress={handleKeyPress}
                    disabledKeys={[...currentGuess, ...revealedHints]}
                    currentGuessLength={currentGuess.length}
                    maxGuessLength={SECRET_CODE_LENGTH}
                />
            </div>

            <ResultModal 
                result={gameResult} 
                mode={mode}
                secretCode={secretCode}
                guessesCount={guesses.length}
                hintsUsed={hintsUsed}
            />
            
            <Modal isOpen={isGiveUpModalOpen} onClose={() => setIsGiveUpModalOpen(false)}>
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-4">{t('modal.giveUp.title')}</h2>
                    <p>{mode === 'daily' ? t('modal.giveUp.message') : t('modal.giveUp.messagePractice')}</p>
                    <div className="flex justify-center gap-4 mt-6">
                        <Button variant="secondary" onClick={() => setIsGiveUpModalOpen(false)}>{t('common.cancel')}</Button>
                        <Button variant="danger" onClick={handleConfirmGiveUp}>{t('common.confirm')}</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};