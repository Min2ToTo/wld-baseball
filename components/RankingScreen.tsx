import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import { RankEntry } from '../types';

type RankingTab = 'attempts' | 'homeruns';

// Mock Data
const attemptsRanking: RankEntry[] = [
    { rank: 1, player: '0x1234...abcd', record: '3.25 tries', reward: '1,000 WGT' },
    { rank: 2, player: 'Player_Two', record: '3.50 tries', reward: '500 WGT' },
    { rank: 3, player: 'BaseballFan', record: '3.75 tries', reward: '250 WGT' },
    { rank: 4, player: 'Rookie', record: '4.00 tries', reward: '100 WGT' },
];

const homerunsRanking: RankEntry[] = [
    { rank: 1, player: 'HomerunKing', record: '125 HRs', reward: '1,000 WGT' },
    { rank: 2, player: '0x1234...abcd', record: '110 HRs', reward: '500 WGT' },
    { rank: 3, player: 'SultanOfSwat', record: '98 HRs', reward: '250 WGT' },
];

const RankingRow: React.FC<{ entry: RankEntry }> = ({ entry }) => {
    const getRankIcon = (rank: number) => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return <span className="font-bold">{rank}</span>;
    };

    return (
        <div className="grid grid-cols-10 gap-2 items-center text-center p-2 rounded-lg odd:bg-brand-blue/30 even:bg-transparent">
            <div className="col-span-1 text-lg">{getRankIcon(entry.rank)}</div>
            <div className="col-span-4 text-left truncate">{entry.player}</div>
            <div className="col-span-2 text-sm font-mono">{entry.record}</div>
            <div className="col-span-3 text-sm font-bold text-yellow-400">{entry.reward}</div>
        </div>
    );
};

export const RankingScreen: React.FC = () => {
    // FIX: Replaced non-existent `setMainView` with `quitGame` from GameContext to handle navigation.
    const { t, quitGame } = useGame();
    const [activeTab, setActiveTab] = useState<RankingTab>('attempts');
    const [timeLeft, setTimeLeft] = useState('');

     useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const nextSunday = new Date();
            nextSunday.setUTCDate(now.getUTCDate() + (7 - now.getUTCDay()));
            nextSunday.setUTCHours(0, 0, 0, 0);

            const diff = nextSunday.getTime() - now.getTime();
            const d = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
            const h = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
            const m = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0');
            const s = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
            setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const currentData = activeTab === 'attempts' ? attemptsRanking : homerunsRanking;

    return (
        <div className="flex flex-col h-full">
            <header className="flex items-center p-4 border-b-2 border-brand-blue">
                <button onClick={quitGame} className="text-gray-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2 className="text-xl font-bold text-center flex-grow" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {t('ranking.title')}
                </h2>
                 <div className="w-6"></div> {/* Spacer */}
            </header>

            <div className="p-4">
                <div className="text-center bg-brand-dark p-2 rounded-lg mb-4">
                    <p className="text-sm text-gray-400">{t('ranking.timeLeft', { time: timeLeft })}</p>
                </div>

                <div className="flex bg-brand-dark rounded-lg p-1 mb-4">
                    <button onClick={() => setActiveTab('attempts')} className={`flex-1 p-2 rounded-md text-sm font-bold transition-colors ${activeTab === 'attempts' ? 'bg-brand-accent text-white' : 'text-gray-400'}`}>
                        {t('ranking.minimumAttempts')}
                    </button>
                    <button onClick={() => setActiveTab('homeruns')} className={`flex-1 p-2 rounded-md text-sm font-bold transition-colors ${activeTab === 'homeruns' ? 'bg-brand-accent text-white' : 'text-gray-400'}`}>
                        {t('ranking.mostHomeruns')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-10 gap-2 text-center text-xs text-gray-400 font-bold px-4 pb-2 border-b border-brand-blue">
                <div className="col-span-1">{t('ranking.rank')}</div>
                <div className="col-span-4 text-left">{t('ranking.player')}</div>
                <div className="col-span-2">{t('ranking.record')}</div>
                <div className="col-span-3">{t('ranking.reward')}</div>
            </div>

            <div className="flex-grow p-4 overflow-y-auto space-y-1">
                {currentData.map(entry => <RankingRow key={entry.rank} entry={entry} />)}
            </div>

            <footer className="p-3 bg-brand-dark mt-auto border-t-2 border-brand-blue text-center">
                <p className="font-bold text-brand-light">{t('ranking.myRank', { rank: '1,234th' })}</p>
            </footer>
        </div>
    );
};
