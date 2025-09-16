
import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { DAILY_CHALLENGE_WGT_REWARDS } from '../../constants';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="text-xl font-bold text-accent mb-3 border-b-2 border-surface-inset pb-2">{title}</h3>
        <div className="space-y-2 text-text-muted">{children}</div>
    </div>
);

const NumberBox: React.FC<{ number: number }> = ({ number }) => (
    <div className="w-10 h-10 bg-surface-base rounded-md flex items-center justify-center text-xl font-bold text-text-base font-orbitron">
        {number}
    </div>
);

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
    const { t } = useGame();

    const rewardTiers = DAILY_CHALLENGE_WGT_REWARDS.map((reward, index) => ({
        inning: index + 1,
        reward,
    }));

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <div className="relative">
                <h2 className="text-2xl font-bold text-center mb-4 text-text-base font-orbitron">
                    {t('help.title')}
                </h2>
                <button onClick={onClose} className="absolute top-0 right-0 text-text-muted hover:text-text-base transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="max-h-[65vh] overflow-y-auto pr-3 -mr-3">
                    <Section title={t('help.objective.title')}>
                        <p>{t('help.objective.description')}</p>
                        <div className="flex justify-center items-center gap-2 pt-2">
                            <NumberBox number={8} />
                            <NumberBox number={1} />
                            <NumberBox number={5} />
                        </div>
                    </Section>

                    <Section title={t('help.results.title')}>
                        <ul className="list-disc list-inside space-y-2">
                            <li><span className="font-bold text-success">⚾ {t('help.results.hit')}</span></li>
                            <li><span className="font-bold text-commentary">⚾ {t('help.results.foul')}</span></li>
                            <li><span className="font-bold text-danger">⚾ {t('help.results.strike')}</span></li>
                        </ul>
                        <div className="mt-4 p-3 bg-surface-base rounded-lg">
                            <div className="grid grid-cols-3 gap-2 items-center text-center">
                                <div>
                                    <p className="text-sm font-bold text-text-muted">{t('help.results.example.answer')}</p>
                                    <div className="flex gap-1 mt-1 justify-center"><NumberBox number={8} /><NumberBox number={1} /><NumberBox number={5} /></div>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-text-muted">{t('help.results.example.guess')}</p>
                                    <div className="flex gap-1 mt-1 justify-center"><NumberBox number={8} /><NumberBox number={5} /><NumberBox number={2} /></div>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-text-muted">{t('help.results.example.result')}</p>
                                    <p className="text-lg font-bold mt-2">1 {t('game.hit_short')}, 1 {t('game.foul_short')}</p>
                                </div>
                            </div>
                        </div>
                    </Section>

                    <Section title={t('help.currency.title')}>
                        <p>💎 <span className="font-bold text-accent">WGT</span>: {t('help.currency.wgt')}</p>
                    </Section>

                    <Section title={t('help.rewards.title')}>
                        <p>{t('help.rewards.description')}</p>
                        <div className="mt-2 space-y-1">
                            {rewardTiers.map(tier => (
                                <div key={tier.inning} className="flex justify-between p-2 rounded-md bg-success/10">
                                    <span>{t('help.rewards.inning', { count: tier.inning })}</span>
                                    <span className="font-bold text-success">
                                        {t('help.rewards.reward', { reward: tier.reward })}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Section>
                </div>

                <div className="mt-6 text-center">
                    <Button onClick={onClose}>{t('common.close')}</Button>
                </div>
            </div>
        </Modal>
    );
};