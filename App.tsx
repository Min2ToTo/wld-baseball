import React, { useState, useRef, useMemo } from 'react';
import { ethers } from 'ethers';
import { IDKitWidget, ISuccessResult, IDKitWidgetRef } from '@worldcoin/idkit';
import { LoadingSpinner } from './components/common';
import { WGT_CONTRACT_ADDRESS, WGT_CONTRACT_ABI, SEPOLIA_RPC_URL } from './constants';
import { GameScreen } from './components/GameScreen';
import { MainScreen } from './components/MainScreen';
import { GameContext, GameContextType } from './contexts/GameContext';
import { GameMode, Language, Theme } from './types';
import { translations } from './i18n/translations';
import { LanguageSelectionModal } from './components/modals/LanguageSelectionModal';
import { HelpModal } from './components/modals/HelpModal';
import { Button } from './components/ui/Button';

declare global {
  interface Window { ethereum?: any }
}

const App: React.FC = () => {
    // --- State ---
    const [isLoading, setIsLoading] = useState(false); // 초기값 false!
    const [screen, setScreen] = useState<'main' | 'game'>('main');
    const [gameMode, setGameMode] = useState<GameMode | null>(null);
    const [language, setLanguage] = useState<Language>('en');
    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [theme, setTheme] = useState<Theme>('light');
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [wgt, setWgt] = useState(0);
    const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
    const idKitRef = useRef<IDKitWidgetRef>(null);

    // --- handleIDKitSuccess manages authentication and data fetching ---
    const handleIDKitSuccess = async (result: ISuccessResult) => {
        setIsLoading(true); // 버튼 클릭 후에만 로딩!
        let foundAddress: string | null = null;
        if (result.credential_payload) {
            for (const key in result.credential_payload) {
                if (key.startsWith('eip155:')) {
                    foundAddress = result.credential_payload[key].address;
                    break;
                }
            }
        }
        if (foundAddress) {
            try {
                const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
                const contract = new ethers.Contract(WGT_CONTRACT_ADDRESS, WGT_CONTRACT_ABI, provider);
                const wgtBalance = await contract.balanceOf(foundAddress);
                const formattedBalance = Number(ethers.formatUnits(wgtBalance, 18));
                setWgt(formattedBalance);
            } catch (error) {
                setWgt(0); 
            } finally {
                setWalletAddress(foundAddress);
                setIsLoading(false); 
            }
        } else {
            alert("Could not extract a valid wallet address.");
            setIsLoading(false);
        }
    };

    const t = (key: string, params?: { [key: string]: string | number }) => {
        const keys = key.split('.');
        let result: any = translations[language];
        for (const k of keys) {
            result = result?.[k];
            if (result === undefined) return key;
        }
        if (Array.isArray(result)) {
            result = result[Math.floor(Math.random() * result.length)];
        }
        if (typeof result !== 'string') return key;
        if (params) {
            return result.replace(/\{\{(\w+)\}\}/g, (match, placeholder) => {
                return params[placeholder] !== undefined ? String(params[placeholder]) : match;
            });
        }
        return result;
    };

    const startGame = (mode: GameMode) => {
        setGameMode(mode);
        setScreen('game');
    };

    const quitGame = async (result: string, hintsUsed: number, finalInning: number) => {
        // ...기존 quitGame 로직...
        setGameMode(null);
        setScreen('main');
    };

    const contextValue: GameContextType = useMemo(() => ({
        wgt,
        setWgt,
        startGame,
        quitGame,
        t,
        language,
        setLanguage,
        isLanguageModalOpen,
        setIsLanguageModalOpen,
        isHelpModalOpen,
        setIsHelpModalOpen,
        walletAddress,
        isAuthenticated: !!walletAddress,
        theme,
        setTheme,
    }), [wgt, startGame, quitGame, t, language, isLanguageModalOpen, isHelpModalOpen, walletAddress, theme]);

    // --- LoadingView ---
    const LoadingView = () => (
        <div className="flex items-center justify-center h-full">
            <LoadingSpinner />
        </div>
    );

    // --- AuthView ---
    const AuthView = () => (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <h1 className="text-4xl font-bold text-center font-orbitron">
                {t('common.title')}
            </h1>
            <p className="my-8 text-text-muted">
                Please sign in with your World ID to play the game and manage your assets.
            </p>
            <IDKitWidget
                ref={idKitRef}
                app_id="app_e18331f89f35a634aab08d5cdfc15b2c"
                action="game-login"
                onSuccess={handleIDKitSuccess}
                credential_types={['orb']}
            >
                {({ open }) => (
                    <button className="btn btn-primary" onClick={open}>
                        Sign in with World ID
                    </button>
                )}
            </IDKitWidget>
        </div>
    );

    // --- Main Rendering Logic ---
    return (
        <GameContext.Provider value={contextValue}>
            <div className="min-h-screen bg-surface-base font-sans flex items-center justify-center p-4">
                <div className="w-full max-w-md mx-auto bg-surface-raised rounded-2xl shadow-2xl overflow-hidden border-2 border-surface-inset flex flex-col" style={{height: '90vh', maxHeight: '800px'}}>
                    {isLoading ? (
                        <LoadingView />
                    ) : !walletAddress ? (
                        <AuthView />
                    ) : screen === 'game' && gameMode ? (
                        <GameScreen mode={gameMode} onGameEnd={quitGame} />
                    ) : (
                        <MainScreen />
                    )}
                </div>
            </div>
            <LanguageSelectionModal isOpen={isLanguageModalOpen} />
            <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
        </GameContext.Provider>
    );
};

export default App;