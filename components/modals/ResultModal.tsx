
import React, { useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { GameResult, GameMode } from '../../types';
import { useGame } from '../../contexts/GameContext';
import { DAILY_CHALLENGE_WGT_REWARDS, HINT_COST } from '../../constants';

interface ResultModalProps {
    result: GameResult;
    mode: GameMode;
    secretCode: number[];
    guessesCount: number;
    hintsUsed: number;
}

export const ResultModal: React.FC<ResultModalProps> = ({ result, mode, secretCode, guessesCount, hintsUsed }) => {
    const { quitGame, t, setWgt } = useGame();

    const isHomerun = result === 'homerun';
    const inningIndex = guessesCount > 0 ? guessesCount - 1 : 0;

    useEffect(() => {
        if (!result) return;

        let reward = 0;
        if (isHomerun && mode === 'daily') {
            reward = DAILY_CHALLENGE_WGT_REWARDS[inningIndex] ?? 0;
        }
        
        const cost = mode === 'daily' ? hintsUsed * HINT_COST : 0;
        const netWgtChange = reward - cost;

        if (netWgtChange !== 0) {
            setWgt(prev => Math.max(0, prev + netWgtChange));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result]); // Only run once when result is set

    if (!result) return null;

    const title = isHomerun ? t('modal.result.homerun') : t('modal.result.strikeout');
    
    let reward = 0;
    if (isHomerun && mode === 'daily') {
        reward = DAILY_CHALLENGE_WGT_REWARDS[inningIndex] ?? 0;
    }

    return (
        <Modal isOpen={true}>
            <div className="text-center">
                <h2 className={`text-3xl font-bold mb-4 ${isHomerun ? 'text-success' : 'text-danger'}`}>{title}</h2>
                <p className="mb-2">{isHomerun ? t('modal.result.congrats') : t('modal.result.nextTime')}</p>
                
                {isHomerun && mode === 'daily' && (
                    <div className="my-6 p-4 bg-surface-base rounded-lg space-y-3">
                         <div className="flex justify-between items-center">
                            <span className="text-text-muted">{t('modal.result.totalWinnings')}</span>
                            <span className="font-bold text-2xl text-success">+{reward.toLocaleString()}</span>
                        </div>
                    </div>
                )}

                {!isHomerun && (
                    <>
                        <p className="my-4">{t('modal.result.correctAnswer')}</p>
                        <div className="flex justify-center items-center gap-2 mb-6 bg-surface-base p-3 rounded-lg">
                            {secretCode.map((digit, index) => (
                                <span key={index} className="text-3xl font-bold text-accent w-10 h-10 flex items-center justify-center">
                                    {digit}
                                </span>
                            ))}
                        </div>
                    </>
                )}

                <div className="flex flex-col space-y-2 mt-6">
                    <Button onClick={quitGame} variant="secondary">{t('common.returnToMain')}</Button>
                </div>
            </div>
        </Modal>
    );
};