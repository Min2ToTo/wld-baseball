import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { GameScreen } from './components/GameScreen';
import { MainScreen } from './components/MainScreen';
import { GameContext, GameContextType } from './contexts/GameContext';
import { GameMode, Language, Theme } from './types';
import { translations } from './i18n/translations';
import { LanguageSelectionModal } from './components/modals/LanguageSelectionModal';
import { HelpModal } from './components/modals/HelpModal';
import { IDKitWidget, ISuccessResult, IDKitWidgetRef } from '@worldcoin/idkit';
import { Button } from './components/ui/Button';
import { ethers } from 'ethers';
import { WGT_CONTRACT_ADDRESS, WGT_CONTRACT_ABI, SEPOLIA_RPC_URL } from './constants';
import { DAILY_CHALLENGE_WGT_REWARDS, WGT_MODE_REWARDS } from './constants';

declare global {
  interface Window { ethereum?: any }
}

const App: React.FC = () => {
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
    
    useEffect(() => {
        const savedLang = localStorage.getItem('wld-baseball-lang') as Language;
        if (savedLang && translations[savedLang]) {
            setLanguage(savedLang);
        } else {
            setIsLanguageModalOpen(true);
        }

        const savedTheme = localStorage.getItem('wld-baseball-theme') as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);
    
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('wld-baseball-theme', theme);
    }, [theme]);

    useEffect(() => {
        if (!walletAddress) return;

        const fetchBalances = async () => {
            console.log(`Attempting to fetch balances for ${walletAddress}...`);
            try {
                const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
                
                const contract = new ethers.Contract(WGT_CONTRACT_ADDRESS, WGT_CONTRACT_ABI, provider);
                
                const wgtBalance = await contract.balanceOf(walletAddress);
                const formattedBalance = Number(ethers.formatUnits(wgtBalance, 18));
                
                console.log('Successfully fetched balance from contract:', formattedBalance);
                setWgt(formattedBalance);

            } catch (error) {
                console.error("Could not fetch balance from contract. Check RPC URL and contract address.", error);
                setWgt(0); 
            }
        };

        fetchBalances();
    }, [walletAddress]);
    
    const handleIDKitSuccess = (result: ISuccessResult) => {
        if (result.nullifier_hash) {
            const tempId = '0x' + result.nullifier_hash.slice(0, 40);
            setWalletAddress(tempId);
            console.log('Temporary user identifier set from nullifier_hash:', tempId);
        } else {
            alert("nullifier_hash not found. Login failed.");
        }
    };

    const t = useCallback((key: string, params?: { [key: string]: string | number }) => {
        const keys = key.split('.');
        let result: any = translations[language];
        for (const k of keys) {
            result = result?.[k];
            if (result === undefined) return key;
        }

        if (Array.isArray(result)) {
            result = result[Math.floor(Math.random() * result.length)];
        }

        if (typeof result !== 'string') {
             console.error(`Translation for key '${key}' is not a string.`);
             return key;
        }

        if (params) {
            return result.replace(/\{\{(\w+)\}\}/g, (match, placeholder) => {
                return params[placeholder] !== undefined ? String(params[placeholder]) : match;
            });
        }
        
        return result;
    }, [language]);

    const startGame = useCallback((mode: GameMode) => {
        setGameMode(mode);
        setScreen('game');
    }, []);

    const quitGame = useCallback(
        async (result: string, hintsUsed: number, finalInning: number) => {
            console.log(`Game ended: ${result}, Hints used: ${hintsUsed}, Final Inning: ${finalInning}`);

            if (gameMode === 'daily') {
                let rewardAmount = 0;
                if (result === 'homerun') {
                    if (finalInning > 0 && finalInning <= DAILY_CHALLENGE_WGT_REWARDS.length) {
                        rewardAmount = DAILY_CHALLENGE_WGT_REWARDS[finalInning - 1];
                    }
                } else if (gameMode === 'wgt') {
                    if (result === 'homerun') {
                        if (finalInning > 0 && finalInning <= WGT_MODE_REWARDS.length) {
                            rewardAmount = WGT_MODE_REWARDS[finalInning - 1];
                        }
                    }
                }
                // Multiply by 1e18 if needed for on-chain integer representation
                const requestBody = {
                    userAddress: walletAddress,
                    hintsUsed,
                    rewardAmount,
                };
                try {
                    const response = await fetch('/api/adjust-balance', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(requestBody),
                    });
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.message || 'API request failed');
                    console.log("API call successful:", data);
                    fetchBalances(); // Re-fetch after transaction
                } catch (error) {
                    console.error("API call failed:", error);
                }
            }

            setGameMode(null);
            setScreen('main');
        },
        [gameMode, walletAddress]
    );

    const handleWGTModeStart = async () => {
      if (freePlayAvailable) {
        startGame('wgt');
      } else if (wgt >= 1) {
        // Call backend relayer to deduct 1 WGT on-chain
        const res = await fetch('/api/deduct-wgt', {
          method: 'POST',
          body: JSON.stringify({ userAddress: walletAddress, amount: 1 }),
          headers: { 'Content-Type': 'application/json' }
        });
        if (res.ok) {
          setWgt(wgt - 1);
          startGame('wgt');
        } else {
          // Show error toast
        }
      } else {
        // Show "Not enough WGT" toast
      }
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
                {() => <span>{t('common.loading')}</span>}
            </IDKitWidget>
        </div>
    );

    useEffect(() => {
        if (!isLanguageModalOpen && isFirstTimeUser) {
            setIsHelpModalOpen(true);
        }
    }, [isLanguageModalOpen, isFirstTimeUser]);

    const handleHelpModalClose = () => {
        setIsHelpModalOpen(false);
        setIsFirstTimeUser(false);
    };

    return (
        <GameContext.Provider value={contextValue}>
            <div className="min-h-screen bg-surface-base font-sans flex items-center justify-center p-4">
                <div className="w-full max-w-md mx-auto bg-surface-raised rounded-2xl shadow-2xl overflow-hidden border-2 border-surface-inset flex flex-col" style={{height: '90vh', maxHeight: '800px'}}>
                    {!walletAddress ? (
                        <AuthView />
                    ) : screen === 'game' && gameMode ? (
                        <GameScreen mode={gameMode} />
                    ) : (
                        <MainScreen />
                    )}
                </div>
            </div>
            <LanguageSelectionModal isOpen={isLanguageModalOpen} />
            <HelpModal isOpen={isHelpModalOpen} onClose={handleHelpModalClose} />
        </GameContext.Provider>
    );
};

export default App;