import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { Achievement } from '../types';
import { Button } from './ui/Button';

// Mock data for achievements
const initialAchievements: Achievement[] = [
    { id: 'firstHomerun', icon: '🏆', titleKey: 'achievements.firstHomerun.title', descriptionKey: 'achievements.firstHomerun.description', status: 'claimable', reward: 100 },
    { id: 'perfectGame', icon: '💎', titleKey: 'achievements.perfectGame.title', descriptionKey: 'achievements.perfectGame.description', status: 'locked', reward: 500 },
    { id: 'win100', icon: '🏅', titleKey: 'achievements.win100.title', descriptionKey: 'achievements.win100.description', status: 'locked', reward: 1000 },
    { id: 'perfectWeek', icon: '📅', titleKey: 'achievements.perfectWeek.title', descriptionKey: 'achievements.perfectWeek.description', status: 'claimed', reward: 250 },
];

const AchievementCard: React.FC<{ achievement: Achievement, onClaim: (id: string, reward: number) => void }> = ({ achievement, onClaim }) => {
    const { t } = useGame();
    const isLocked = achievement.status === 'locked';

    return (
        <div className={`p-4 rounded-lg flex items-center gap-4 transition-all ${isLocked ? 'bg-brand-dark opacity-60' : 'bg-brand-blue'}`}>
            <div className={`text-4xl ${isLocked ? 'filter grayscale' : ''}`}>{achievement.icon}</div>
            <div className="flex-grow">
                <h3 className="font-bold text-brand-light">{t(achievement.titleKey)}</h3>
                <p className="text-sm text-gray-400">{t(achievement.descriptionKey)}</p>
            </div>
            {achievement.status === 'claimable' && (
                <Button onClick={() => onClaim(achievement.id, achievement.reward)} className="!text-sm !py-2 !px-3 whitespace-nowrap">
                    {t('achievements.claimReward')} +{achievement.reward}
                </Button>
            )}
            {achievement.status === 'claimed' && (
                <Button disabled className="!text-sm !py-2 !px-3 whitespace-nowrap !bg-gray-600">
                    {t('achievements.claimed')}
                </Button>
            )}
        </div>
    );
}

export const AchievementsScreen: React.FC = () => {
    // FIX: Replaced non-existent `setMainView` with `quitGame` from GameContext to handle navigation.
    const { t, quitGame, setWgt } = useGame();
    const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);

    const handleClaim = (id: string, reward: number) => {
        setAchievements(prev => prev.map(ach => ach.id === id ? { ...ach, status: 'claimed' } : ach));
        setWgt(prev => prev + reward);
        // Here you would typically also make an API call to update the backend
    };

    return (
        <div className="flex flex-col h-full">
            <header className="flex items-center p-4 border-b-2 border-brand-blue">
                <button onClick={quitGame} className="text-gray-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2 className="text-xl font-bold text-center flex-grow" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {t('achievements.title')}
                </h2>
                <div className="w-6"></div> {/* Spacer */}
            </header>
            <div className="flex-grow p-4 overflow-y-auto space-y-3">
                {achievements.map(ach => (
                    <AchievementCard key={ach.id} achievement={ach} onClaim={handleClaim} />
                ))}
            </div>
        </div>
    );
};
