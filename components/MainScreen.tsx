
import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { SettingsModal } from './modals/SettingsModal';
import { Language } from '../types';
import { ethers } from 'ethers';

const LanguageSwitcher: React.FC = () => {
    const { language, setIsLanguageModalOpen } = useGame();

    const languages: { code: Language; flag: string }[] = [
        { code: 'en', flag: '🇺🇸' }, { code: 'ru', flag: '🇷🇺' }, { code: 'ar', flag: '🇸🇦' },
        { code: 'es', flag: '🇪🇸' }, { code: 'pt', flag: '🇧🇷' }, { code: 'fr', flag: '🇫🇷' },
        { code: 'hi', flag: '🇮🇳' }, { code: 'ur', flag: '🇵🇰' }, { code: 'bn', flag: '🇧🇩' }, 
        { code: 'id', flag: '🇮🇩' }, { code: 'am', flag: '🇪🇹' }, { code: 'ja', flag: '🇯🇵' }, 
        { code: 'zh', flag: '🇨🇳' }, { code: 'tl', flag: '🇵🇭' }, { code: 'vi', flag: '🇻🇳' }, 
        { code: 'ko', flag: '🇰🇷' }, { code: 'de', flag: '🇩🇪' },
    ];

    const currentFlag = languages.find(l => l.code === language)?.flag;

    return (
        <button
            onClick={() => setIsLanguageModalOpen(true)}
            className="text-2xl"
            aria-label="Select language"
        >
            {currentFlag}
        </button>
    );
};


const DailyChallengeTimer: React.FC = () => {
    const { t } = useGame();
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setUTCHours(24, 0, 0, 0);
            const diff = tomorrow.getTime() - now.getTime();

            const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
            const minutes = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0');
            const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

            setTimeLeft(`${hours}:${minutes}:${seconds}`);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="text-center bg-surface-base p-2 rounded-lg mt-4">
            <p className="text-sm text-text-muted">{t('main.remainingTime', { time: timeLeft })}</p>
            <p className="text-lg font-bold text-accent font-orbitron">{timeLeft}</p>
        </div>
    );
};


const ReferralModal: React.FC<{isOpen: boolean, onClose: () => void}> = ({ isOpen, onClose }) => {
    const { t, walletAddress, setWgt } = useGame();
    const [referrerId, setReferrerId] = useState('');
    const [copyButtonText, setCopyButtonText] = useState(t('modal.referral.copyId'));
    const [message, setMessage] = useState('');

    const handleCopy = () => {
        if (walletAddress) {
            navigator.clipboard.writeText(walletAddress);
            setCopyButtonText(t('modal.referral.copied'));
            setTimeout(() => setCopyButtonText(t('modal.referral.copyId')), 2000);
        }
    };
    
    const handleClaim = () => {
        if (!ethers.isAddress(referrerId)) {
            setMessage(t('modal.referral.invalidId'));
            return;
        }

        const claimedStatus = localStorage.getItem('referralBonusClaimed');
        if (claimedStatus) {
            setMessage(t('modal.referral.alreadyClaimed'));
            return;
        }

        // Simulate on-chain transaction
        console.log(`Claiming referral bonus for ${walletAddress} with referrer ${referrerId}`);
        setWgt(prev => prev + 10); // Bonus for the user
        // In a real app, you would also trigger a transaction to reward the referrer.
        localStorage.setItem('referralBonusClaimed', 'true');
        setMessage(t('modal.referral.claimSuccess'));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-bold text-center mb-2">{t('modal.referral.title')}</h2>
            <p className="text-center mb-4 text-sm text-text-muted">{t('modal.referral.description')}</p>
            
            <div className="space-y-4">
                <input 
                    type="text"
                    value={referrerId}
                    onChange={(e) => setReferrerId(e.target.value)}
                    placeholder={t('modal.referral.enterId')}
                    className="w-full bg-surface-base p-3 rounded-lg text-text-base border-2 border-surface-inset focus:outline-none focus:border-accent"
                />
                <Button onClick={handleClaim} className="w-full">{t('modal.referral.claimBonus')}</Button>
            </div>

            <hr className="border-surface-inset my-6" />
            
            <div className="text-center space-y-2">
                <p className="text-sm text-text-muted">{t('modal.referral.yourId')}</p>
                <p className="font-mono bg-surface-base p-2 rounded-md truncate">{walletAddress}</p>
                <Button onClick={handleCopy} variant="secondary">{copyButtonText}</Button>
            </div>
             { message && <p className="text-center text-commentary mt-4 text-sm">{message}</p> }
             <div className="mt-6 text-center">
                <Button variant="danger" onClick={onClose}>{t('common.close')}</Button>
            </div>
        </Modal>
    );
};


export const MainScreen: React.FC = () => {
    const { wgt, startGame, t, setIsHelpModalOpen } = useGame();
    const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    const [isDailyPlayed, setIsDailyPlayed] = useState(() => {
        const lastPlayed = localStorage.getItem('dailyChallengeLastPlayed');
        if (!lastPlayed) return false;
        const lastDate = new Date(lastPlayed).getUTCDate();
        const todayDate = new Date().getUTCDate();
        return lastDate === todayDate;
    });

    const handleStartDaily = () => {
        localStorage.setItem('dailyChallengeLastPlayed', new Date().toUTCString());
        setIsDailyPlayed(true);
        startGame('daily');
    };
    
    return (
        <>
            <div className="p-6 relative flex-grow flex flex-col overflow-y-auto">
                <header className="absolute top-4 right-4 flex items-center gap-4">
                    <button onClick={() => setIsSettingsModalOpen(true)} className="text-text-muted hover:text-text-base transition-colors" aria-label="Settings">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </button>
                    <LanguageSwitcher />
                </header>
                <div className="flex justify-center items-center gap-2 mb-2 mt-8">
                    <h1 className="text-4xl font-bold text-center text-text-base font-orbitron">
                        {t('common.title')}
                    </h1>
                    <button onClick={() => setIsHelpModalOpen(true)} className="text-text-muted hover:text-text-base transition-colors" aria-label="How to play">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.546-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
                <p className="text-center text-text-muted mb-6">{t('main.assets')}</p>

                <div className="grid grid-cols-1 gap-4 mb-8 text-center">
                    <div className="bg-surface-base p-3 rounded-lg">
                        <p className="font-bold text-lg text-accent">{wgt.toLocaleString()}</p>
                        <p className="text-xs text-text-muted">{t('common.wgt', { count: '' })}</p>
                    </div>
                </div>

                <div className="space-y-4">
                     <div className="bg-surface-inset p-4 rounded-lg text-center">
                        <h2 className="text-xl font-bold">{t('main.dailyChallenge')}</h2>
                        {isDailyPlayed ? (
                             <DailyChallengeTimer />
                        ) : (
                             <Button onClick={handleStartDaily} className="mt-4 w-full">{t('main.play')}</Button>
                        )}
                    </div>
                    <div className="bg-surface-inset p-4 rounded-lg text-center">
                        <h2 className="text-xl font-bold">{t('main.practiceMode')}</h2>
                        <Button onClick={() => startGame('practice')} className="mt-4 w-full">{t('main.play')}</Button>
                    </div>
                    <div className="bg-surface-inset p-4 rounded-lg text-center">
                        <h2 className="text-xl font-bold">{t('main.referral')}</h2>
                        <Button onClick={() => setIsReferralModalOpen(true)} className="mt-4 w-full">{t('main.referral')}</Button>
                    </div>
                </div>
                
                <ReferralModal isOpen={isReferralModalOpen} onClose={() => setIsReferralModalOpen(false)} />
                <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} />
            </div>
        </>
    );
};